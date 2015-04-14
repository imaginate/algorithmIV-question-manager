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

    this.debug = aIV.debug('Questions');

    debugMsg = 'questions= $$, config= $$';
    this.debug.group('init', 'open', debugMsg, questions, config);

    this.debug.start('init', questions, config, sources, categories);

    debugArgs = [ 'init', questions, 'objects', config, 'booleanMap' ];
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);

    this.debug = aIV.debug('Question');

    this.debug.group('init', 'coll', 'questionID= $$', id);

    this.debug.start('init', question, id, config, sources, categories);

    debugArgs = [ 'init', question, 'object', id, 'number', config, 'booleanMap' ];
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The total number of questions.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.list)
     * -----------------------------------------------
     * @desc An array of all the question objects.
     * @return {questions}
     */
    this.list;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {number} */
    var len;

    this.len = questions.length;

    len = this.len + 1;
    this.list = (this.len) ? new Array(len) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    --len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config, sources, categories);
    }

    // Freeze the public properties that are objects
    Object.freeze(this.list);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {Object<string, Question>}
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var url;

    data = {};

    // Build the data hash map
    ++i;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[ url ] = this.list[i];
      }
    }

    // Freeze the protected properties
    Object.freeze(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question's object or property.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {val}
     */
    this.get = function(id, prop, formatted) {

      var debugArgs, debugMsg, debugCheck;
      this.debug.start('get', id, prop, formatted);

      debugArgs = [ 'get', id, 'number|string', prop, 'string=' ];
      debugArgs.push(formatted, 'boolean=');
      this.debug.args(debugArgs);

      debugMsg = 'Error: This question id does not exist. id= $$';
      debugCheck = (this.list.hasOwnProperty(id) || data.hasOwnProperty(id));
      this.debug.fail('get', debugCheck, debugMsg, id);

      /** @type {Question} */
      var question;

      prop = prop || '';
      formatted = formatted || false;

      question = (typeof id === 'number') ? this.list[ id ] : data[ id ];

      return ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : question.get(prop, formatted)
      );
    };

    // Freeze all of the methods
    Object.freeze(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.group('init', 'end');

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Questions.prototype.constructor = Questions;

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemStyle)
   * ---------------------------------------------------
   * @desc Sets the style for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {!(string|stringMap)} type - The style setting to set.
   *   If a string is given then another param with the value is
   *   required. If an object is provided then use key => value
   *   pairs like styleType => newValue (see below example).
   * @param {(string|number)=} val - If the type param is a string then
   *   this is the new value for the it.
   * @example
   *   app.questions.setElemStyle(5, { display: 'none' });
   *   // OR
   *   app.questions.setElemStyle(5, 'display', 'none');
   */
  Questions.prototype.setElemStyle = function(id, type, val) {

    this.debug.start('setElemStyle', id, type, val);

    debugArgs = [ 'setElemStyle', id, 'number|string' ];
    debugArgs.push(type, '!string|stringMap', val, 'string|number=');
    this.debug.args(debugArgs);

    // Handle one update
    if (typeof type === 'string') {

      debugMsg = 'Error: A third param (val) is required when the given type ';
      debugMsg += 'is a string. It should be a string or number. val= $$';
      debugCheck = checkType(val, 'string|number');
      this.debug.fail('setElemStyle', debugCheck, debugMsg, val);

      // Replace dashes with camel case
      if ( /\-/.test(type) ) {
        type = camelCase(type);
      }

      this.get(id).elem.root.style[ type ] = val;
      return;
    }

    // Handle multiple updates
    Object.keys(type).forEach(function(/** string */ key) {

      // Replace dashes with camel case
      if ( /\-/.test(key) ) {
        key = camelCase(key);
      }

      this.get(id).elem.root.style[ key ] = type[ key ];
    }, this);
  };

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemClass)
   * ---------------------------------------------------
   * @desc Sets the class name for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {string} newClassName - The new class name.
   */
  Questions.prototype.setElemClass = function(id, newClassName) {

    this.debug.start('setElemClass', id, newClassName);

    debugArgs = [ 'setElemClass', id, 'number|string' ];
    debugArgs.push(newClassName, 'string');
    this.debug.args(debugArgs);

    this.get(id).elem.root.className = newClassName;
  };

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
   * Public Method (Questions.prototype.addCodeExts)
   * -----------------------------------------------------
   * @desc If overflow occurs in a question's code element it enables
   *   the auto extend button for the question.
   * @type {function}
   */
  Questions.prototype.addCodeExts = function() {

    this.debug.group('addCodeExts', 'open');
    this.debug.start('addCodeExts');

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = this.len + 1;

    i = 0;
    while (++i < len) {
      this.debug.group('addCodeExts', 'coll', 'questionID= $$', i);
      this.get(i).elem.addCodeExt();
      this.debug.group('addCodeExts', 'end');
    }

    this.debug.group('addCodeExts', 'end');
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

    /** @type {string} */
    var direction;
    /** @type {Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
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
   * @param {!numbers} ids - The previous active question ids.
   * @param {number} index - The index of the ids to hide from view.
   * @param {string} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    this.debug.start('hideElems', ids, index, view);

    debugArgs = [ 'hideElems', ids, '!numbers', index, 'number' ];
    debugArgs.push(view, 'string');
    this.debug.args(debugArgs);

    /** @type {number} */
    var i;

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
        return;
      }

      // Hide all of the provided ids
      i = ids.length;
      while (i--) {
        this.setElemStyle(ids[i], 'display', 'none');
      }

      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index.';
    debugCheck = (ids.length > 0);
    this.debug.fail('hideElems', debugCheck, debugMsg);

    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugCheck = (index > -1 && index < ids.length);
    this.debug.fail('hideElems', debugCheck, debugMsg, ids, index);

    // Hide only the index of the provided ids
    if (view === 'one') {
      this.setElemStyle(ids[ index ], 'display', 'none');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {

      // Remove all ids from the array that should NOT be hidden
      i = index + 11;
      ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

      i = ids.length;
      while (i--) {
        this.setElemStyle(ids[i], 'display', 'none');
      }

      return;
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.showElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'block' for the provided questions.
   * @param {!numbers} ids - The new active question ids.
   * @param {number} index - The index of the ids to show.
   */
  Questions.prototype.showElems = function(ids, index) {

    this.debug.start('showElems', ids, index);
    this.debug.args('showElems', ids, '!numbers', index, 'number');

    /** @type {string} */
    var view;
    /** @type {number} */
    var i;
    /** @type {string} */
    var newClassName;

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
        return;
      }

      // Show all of the provided ids
      i = ids.length;
      while (i--) {
        newClassName = (i % 2) ? 'question shade2' : 'question shade1';
        this.setElemClass(ids[i], newClassName);
        this.setElemStyle(ids[i], 'display', 'block');
      }

      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index.';
    debugCheck = (ids.length > 0);
    this.debug.fail('showElems', debugCheck, debugMsg);

    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugCheck = (index > -1 && index < ids.length);
    this.debug.fail('showElems', debugCheck, debugMsg, ids, index);

    view = app.searchBar.vals.view;

    // Show only the index of the provided ids
    if (view === 'one') {
      this.setElemClass(ids[ index ], 'question shade1 hideLink');
      this.setElemStyle(ids[ index ], 'display', 'block');
      return;
    }

    // Show the index plus ten (or to the array end)
    if (view === 'ten') {

      // Remove all ids from the array that should NOT be shown
      i = index + 11;
      ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

      i = ids.length;
      while (i--) {
        newClassName = (i % 2) ? 'question shade2' : 'question shade1';
        this.setElemClass(ids[i], newClassName);
        this.setElemStyle(ids[i], 'display', 'block');
      }

      return;
    }
  };
