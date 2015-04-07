  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {objects} questions - The user's questions.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var Questions = function(questions, config, sources, categories) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {number} */
    var len;
    /** @type {string} */
    var url;

    /**
     * ---------------------------------------------------
     * Public Property (Questions.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Questions class.
     * @type {Debug}
     */
    this.debug = aIV.debug('Questions');

    // Debugging vars
    var args;
    args = [ 'init', 'open' ];
    args.push('questions= $$, config= $$', questions, config);
    this.debug.group(args);
    this.debug.start('init', questions, config, sources, categories);
    args = [ 'init' ];
    args.push(questions, 'objects', config, 'booleanMap');
    args.push(sources, 'object', categories, 'object');
    this.debug.args(args);

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {Object<string, Question>}
     */
    var data;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The number of questions supplied to this app instance.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.list)
     * -----------------------------------------------
     * @desc The array of question objects.
     * @return {questions}
     */
    this.list;

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question by id or url.
     * @param {(number|string)} id - The question id to get.
     * @return {Question}
     */
    this.get = function(id) {

      // Debugging vars
      var errorMsg, failCheck;
      this.debug.start('get', id);
      this.debug.args('get', id, 'number|string');

      errorMsg = 'Error: This question id does not exist. id= $$';
      failCheck = (this.list.hasOwnProperty(id) || data.hasOwnProperty(id));
      this.debug.fail('get', failCheck, errorMsg, id);

      /** @type {Question} */
      var question;

      question = (typeof id === 'number') ? this.list[id] : data[id];

      if (failCheck) {
        errorMsg = 'Error: This question id was not an instanceof ';
        errorMsg += 'Question. id= $$';
        failCheck = (question instanceof Question);
        this.debug.fail('get', failCheck, errorMsg, id);
      }

      return question;
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.setStyle)
     * -----------------------------------------------
     * @desc Sets the style for a question's element.
     * @param {!(number|string)} id - The question id to set.
     * @param {!(string|stringMap)} type - The style setting to set. If a
     *   string is given then another param with the value is required.
     *   If an object is provided then use key => value pairs as such
     *   styleType => newValue (e.g. { display: 'none' }).
     * @param {!(string|number)=} val - If the type param is a string then
     *   this is the new value for the it.
     */
    this.setStyle = function(id, type, val) {

      // Debugging vars
      var args, errorMsg, failCheck;
      this.debug.start('setStyle', id, type, val);

      args = [ 'setStyle' ];
      args.push(id, '!number|string', type, '!string|stringMap');
      args.push(val, '!string|number=');
      this.debug.args(args);

      errorMsg = 'Error: An invalid question id was provided. id= $$';
      failCheck = (this.list.hasOwnProperty(id) || data.hasOwnProperty(id));
      this.debug.fail('setStyle', failCheck, errorMsg, id);

      if (typeof type === 'string') {
        errorMsg = 'Error: A third param (val) is required when the given type ';
        errorMsg += 'is a string. It should be a string or number. val= $$';
        args = [ 'setStyle' ];
        args.push(checkType(val, 'string|number'), errorMsg, val);
        this.debug.fail(args);
      }

      // Handle one type change
      if (typeof type === 'string') {

        // Replace dashes with camel case
        if ( /\-/.test(type) ) {
          type = camelCase(type);
        }

        this.get(id).elem.root.style[type] = val;
        return;
      }

      // Handle multiple type changes
      Object.keys(type).forEach(function(/** string */ key) {

        // Replace dashes with camel case
        if ( /\-/.test(key) ) {
          key = camelCase(key);
        }

        this.get(id).elem.root.style[key] = type[key];
      }, this);
    };
    Object.freeze(this.setStyle);


    // Check the argument data type
    if (!questions || !checkType(questions, '!objects')) {
      questions = [];
    }

    // Setup the len and list properties
    this.len = questions.length;
    len = this.len + 1;
    this.list = (this.len) ? new Array(len) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the questions
    --len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[id] = new Question(questions[i], id, config, sources, categories);
      Object.freeze(this.list[id]);
    }

    // Setup the data hash map
    data = {};

    ++i;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[url] = this.list[i];
      }
    }

    Object.freeze(this.list);
    Object.freeze(data);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Questions.prototype.constructor = Questions;

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addIdsToSearch)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function}
   */
  Questions.prototype.addIdsToSearch = function() {

    this.debug.group('addIdsToSearch', 'coll');
    this.debug.start('addIdsToSearch');

    /** @type {booleanMap} */
    var config;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    config = {
      stage   : app.config.searchBar.get('stage'),
      source  : app.config.searchBar.get('source'),
      category: app.config.searchBar.get('category'),
      subCat  : app.config.searchBar.get('subCat')
    };

    len = this.len + 1;
    i = 0;
    while (++i < len) {
      this.get(i).addToSearch(config);
    }

    this.debug.group('addIdsToSearch', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function()}
   */
  Questions.prototype.appendElems = function() {

    this.debug.group('appendElems', 'open');
    this.debug.start('appendElems');

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {Question} */
    var question;

    len = this.len + 1;

    i = 0;
    while (++i < len) {
      question = this.get(i);
      app.elems.ques.appendChild(question.elem.root);
      question.addElemContent();
    }

    this.debug.group('appendElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.reverseElems)
   * -----------------------------------------------------
   * @desc Appends each question's element to #aIV-questions in the direction
   *   of the current search order.
   * @type {function()}
   */
  Questions.prototype.reverseElems = function() {

    this.debug.start('reverseElems');

    /**
     * @type {string}
     * @private
     */
    var direction;
    /**
     * @type {Question}
     * @private
     */
    var question;
    /**
     * @type {num}
     * @private
     */
    var len;
    /**
     * @type {num}
     * @private
     */
    var i;

    direction = app.searchBar.vals.order;
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      i = 0;
      while (++i < len) {
        question = this.get(i);
        app.elems.ques.appendChild(question.elem.root);
      }
    }
    // Appends in desc order
    else {
      i = len;
      while (--i) {
        question = this.get(i);
        app.elems.ques.appendChild(question.elem.root);
      }
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.hideElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'none' for the provided questions.
   * @param {?nums} ids - The previous active question ids.
   * @param {num} index - The index of the ids to hide from view.
   * @param {string=} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    // Debugging vars
    var args, errorMsg;
    this.debug.start('hideElems', ids, index, view);
    args = [ 'hideElems' ];
    args.push(ids, 'numbers', index, 'number', view, 'string=');
    this.debug.args(args);

    /**
     * @type {num}
     * @private
     */
    var i;

    if (index === -1) {

      // No questions to hide (i.e. hide the empty message)
      if (!ids) {
        app.elems.none.style.display = 'none';
        return;
      }

      // Hide all of the provided ids
      i = ids.length;
      while (i--) {
        this.setStyle(ids[i], 'display', 'none');
      }

      return;
    }

    errorMsg = 'Error: No ids were provided with a non-negative index. ids= $$';
    this.debug.fail('hideElems', (!!ids && !!ids.length), errorMsg, ids);
    errorMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    args = [ 'hideElems' ];
    args.push((index > -1 && index < ids.length), errorMsg, ids, index);
    this.debug.fail(args);

    view = view || app.searchBar.vals.view;

    // Hide only the index of the provided ids
    if (view === 'one') {
      this.setStyle(ids[index], 'display', 'none');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {
      ids = ( (ids.length < (index + 11)) ?
        ids.slice(index) : ids.slice(index, (index + 11))
      );
      i = ids.length;
      while (i--) {
        this.setStyle(ids[i], 'display', 'none');
      }
      return;
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.showElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'block' for the provided questions.
   * @param {?nums} ids - The new active question ids.
   * @param {num} index - The index of the ids to show.
   */
  Questions.prototype.showElems = function(ids, index) {

    // Debugging vars
    var args, errorMsg;
    this.debug.start('showElems', ids, index);
    this.debug.args('showElems', ids, 'numbers', index, 'number');

    /**
     * @type {string}
     * @private
     */
    var view;
    /**
     * @type {num}
     * @private
     */
    var i;

    if (index === -1) {

      // No questions to show (i.e. show the empty message)
      if (!ids) {
        app.elems.none.style.display = 'block';
        return;
      }

      // Show all of the provided ids
      i = ids.length;
      while (i--) {
        this.get(ids[i]).elem.root.className = ( (i % 2) ?
          'question shade2' : 'question shade1'
        );
        this.setStyle(ids[i], 'display', 'block');
      }

      return;
    }

    errorMsg = 'Error: No ids were provided with a non-negative index. ids= $$';
    this.debug.fail('showElems', (!!ids && !!ids.length), errorMsg, ids);
    errorMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    args = [ 'showElems' ];
    args.push((index > -1 && index < ids.length), errorMsg, ids, index);
    this.debug.fail(args);

    view = app.searchBar.vals.view;

    // Hide only the index of the provided ids
    if (view === 'one') {
      this.get(ids[index]).elem.root.className = 'question shade1 hideLink';
      this.setStyle(ids[index], 'display', 'block');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {
      ids = ( (ids.length < (index + 11)) ?
        ids.slice(index) : ids.slice(index, (index + 11))
      );
      i = ids.length;
      while (i--) {
        this.get(ids[i]).elem.root.className = ( (i % 2) ?
          'question shade2' : 'question shade1'
        );
        this.setStyle(ids[i], 'display', 'block');
      }
      return;
    }
  };
