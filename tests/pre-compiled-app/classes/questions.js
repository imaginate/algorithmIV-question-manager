  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {!objects} questions - The user's questions.
   * @param {!booleanMap} config - The settings for question formatting.
   * @param {function} getSource - The getter for the app's sources.
   * @param {function} getCategory - The getter for the app's categories.
   * @constructor
   */
  var Questions = function(questions, config, getSource, getCategory) {

    this.debug = aIV.debug('Questions');

    this.debug.start('init', questions, config, getSource, getCategory);

    /** @type {!Array<*>} */
    var args;

    args = [ questions, '!objects', config, '!booleanMap' ];
    args.push(getSource, 'function', getCategory, 'function');
    checkArgs.apply(null, args);

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

    i = this.len + 1;
    this.list = (this.len) ? new Array(i) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    len = this.len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config,
                                     getSource, getCategory);
    }

    // Freeze the public properties that are objects
    freezeObj(this.list);

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
    i = this.len + 1;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[ url ] = this.list[i];
      }
    }

    // Freeze the protected properties
    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question's object or property value.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The Question or property value.
     */
    this.get = function(id, prop, formatted) {

      this.debug.start('get', id, prop, formatted);

      /** @type {string} */
      var errorMsg;
      /** @type {!Question} */
      var question;
      /** @type {*} */
      var result;

      checkArgs(id, 'number|string', prop, 'string=', formatted, 'boolean=');

      if (!hasOwnProp(this.list, String(id)) && !hasOwnProp(data, String(id))) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.get call was ';
        errorMsg += 'given an invalid question id to get. id= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      formatted = formatted || false;

      question = ( checkType(id, 'number') ) ? this.list[ id ] : data[ id ];
      result = ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : (prop === 'rootElem') ?
            question.elem.root : question.get(prop, formatted)
      );

      this.debug.end('get', result);

      return result;
    };

    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

    this.debug.end('init');
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
   * @param {(string|!Object)} type - The style setting to set.
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

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<*>} */
    var args;
    /** @type {!Element} */
    var elem;
    /** @type {!RegExp} */
    var dash;
    /** @type {string} */
    var prop;
    /** @type {number} */
    var i;

    args = [ id, 'number|string', type, '!string|object' ];
    args.push(val, 'string|number=');
    checkArgs.apply(null, args);

    dash = /\-/;

    // Handle one update
    if ( checkType(type, 'string') ) {

      if ( !checkType(val, 'string|number') ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'value to set the style to. val= ' + val;
        throw new TypeError(errorMsg);
      }

      // Replace dashes with camel case
      if ( dash.test(type) ) {
        type = camelCase(type);
      }

      elem = this.get(id, 'rootElem');

      if ( !(type in elem.style) ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'style property to set. prop= ' + type;
        throw new Error(errorMsg);
      }

      elem.style[ type ] = val;
    }
    // Handle multiple updates
    else {

      elem = this.get(id, 'rootElem');

      for (prop in type) {
        if ( hasOwnProp(type, prop) ) {

          // Replace dashes with camel case
          if ( dash.test(prop) ) {
            prop = camelCase(prop);
          }

          if ( !(prop in elem.style) ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'style property to set. prop= ' + prop;
            throw new Error(errorMsg);
          }

          val = type[ prop ];

          if ( !checkType(val, 'string|number') ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'value to set a style to. prop= ' + prop + ', ';
            errorMsg += 'val= ' + val;
            throw new TypeError(errorMsg);
          }

          elem.style[ prop ] = val;
        }
      }
    }
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

    checkArgs(id, 'number|string', newClassName, 'string');

    this.get(id, 'rootElem').className = newClassName;

    this.debug.end('setElemClass');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addIdsToSearch)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function}
   */
  Questions.prototype.addIdsToSearch = function() {

    this.debug.start('addIdsToSearch');

    /** @type {!booleanMap} */
    var config;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    config = {
      stage   : app.config.searchBar.get('stage'),
      source  : app.config.searchBar.get('source'),
      category: app.config.searchBar.get('category'),
      subCat  : app.config.searchBar.get('subCat')
    };
    config.source = config.source || app.config.links.get('source');
    config.category = config.category || app.config.links.get('category');
    config.subCat = config.subCat || app.config.links.get('category');

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.get(id).addToSearch(config);
    }

    this.debug.end('addIdsToSearch');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function}
   */
  Questions.prototype.appendElems = function() {

    this.debug.start('appendElems');

    /** @type {!Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      question = this.get(id);
      app.elems.ques.appendChild(question.elem.root);
      question.addElemContent();
    }

    this.debug.end('appendElems');
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

    this.debug.start('addCodeExts');

    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.debug.group('addCodeExts', 'coll', 'questionID= $$', id);
      this.get(id, 'elem').addCodeExt();
      this.debug.group('addCodeExts', 'end');
    }

    this.debug.end('addCodeExts');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.reverseElems)
   * -----------------------------------------------------
   * @desc Appends each question's element to #aIV-questions in the direction
   *   of the current search order.
   * @type {function}
   */
  Questions.prototype.reverseElems = function() {

    this.debug.start('reverseElems');

    /** @type {string} */
    var direction;
    /** @type {!Element} */
    var elem;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    direction = app.searchBar.vals.order;
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      id = 0;
      while (++id < len) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }
    // Appends in desc order
    else {
      id = len;
      while (--id) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }

    this.debug.end('reverseElems');
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

    /** @type {string} */
    var errorMsg;
    /** @type {number} */
    var i;

    checkArgs(ids, '!numbers', index, 'number', view, 'string');

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
      }
      // Hide all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      // Hide only the index of the provided ids
      if (view === 'one') {
        this.setElemStyle(ids[ index ], 'display', 'none');
      }
      // Hide the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be hidden
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }

    this.debug.end('hideElems');
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

    /** @type {number} */
    var i;
    /** @type {string} */
    var view;
    /** @type {string} */
    var errorMsg;
    /** @type {string} */
    var newClassName;

    checkArgs(ids, '!numbers', index, 'number');

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
      }
      // Show all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      view = app.searchBar.vals.view;

      // Show only the index of the provided ids
      if (view === 'one') {
        this.setElemClass(ids[ index ], 'question shade1 hideLink');
        this.setElemStyle(ids[ index ], 'display', 'block');
      }
      // Show the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be shown
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }

    this.debug.end('showElems');
  };
