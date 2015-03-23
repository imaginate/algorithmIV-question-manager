  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {objects} questions - The user's questions.
   * @param {boolean} outputConfig - The config setting for formatting
   *   the output of a question's solution.
   * @constructor
   */
  var Questions = function(questions, outputConfig) {

    /**
     * ---------------------------------------------------
     * Private Property (Questions.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Questions') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'questions= $$', questions);
      this.debug.start('init', questions, outputConfig);
      this.debug.args('init', questions, 'objects', outputConfig, 'boolean');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The number of questions supplied to this app instance.
     * @type {number}
     */
    this.len = 0;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.list)
     * -----------------------------------------------
     * @desc The array of question objects.
     * @type {?questions}
     */
    var list = null;

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {?Object<string, question>}
     */
    var data = null;

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.list)
     * -----------------------------------------------
     * @desc Get the array of question objects.
     * @return {?questions}
     */
    this.list = function() {
      return list;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question.
     * @param {(number|string)} id - The question id to get.
     * @return {?Question}
     */
    this.get = function(id) {
      /** @private */
      var result;

      result = ( (typeof id === 'number') ?
        list[id] || null : (typeof id === 'string') ?
          data[id] || null : null
      );

      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.setStyle)
     * -----------------------------------------------
     * @desc Sets the style for a question's element.
     * @param {(number|string)} id - The question id to set.
     * @param {(string|hashMap)} type - The style setting to set. If a
     *   string is given then another param with the value is required.
     *   If an object is provided then use key => value pairs as such
     *   styleType => newValue (e.g. { display: 'none' }).
     * @param {(string|number)=} val - If the type param is a string then
     *   this is the new value for the it.
     */
    this.setStyle = function(id, type, val) {

      // Debugging
      var args, msg;
      if (DEBUG) {
        this.debug.start('setStyle', id, type, val);

        args = [ 'setStyle' ];
        args.push(id, '!number|string', type, '!string|object');
        args.push(val, 'string|number=');
        this.debug.args(args);

        msg = 'Error: An invalid question id was provided. id= $$';
        this.debug.fail('setStyle', !!this.get(id), msg, id);

        if (typeof type === 'string') {
          msg = 'Error: A third param (val) is required when the given type ';
          msg += 'is a string. It should be a string or number. val= $$';
          args = [ 'setStyle' ]
          args.push(checkType([ val ], 'string|number'), msg, val);
          this.debug.fail(args);
        }
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
      Object.keys().forEach(function(/** string */ key) {

        // Replace dashes with camel case
        if ( /\-/.test(key) ) {
          key = camelCase(key);
        }

        this.get(id).elem.root.style[key] = type[key];
      }, this);
    };


    // Set the list
    list = questions.map(function(/** Object */ question, /** number */ i) {
      /**
       * @type {number}
       * @private
       */
      var id;

      id = i + 1;
      return new Question(question, id, outputConfig);
    });

    // Set the data
    data = {};
    list.forEach(function(/** Object */ question) {
      if (question.url) {
        data[question.url] = question;
      }
    });

    // Add blank to beginning of list so ids and indexes match
    list.unshift(null);

    // Set the len
    this.len = list.length || 0;
    if (this.len) {
      --this.len;
    }


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Questions.prototype.constructor = Questions;

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.setFormats)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function()}
   */
  Questions.prototype.setFormats = function() {

    DEBUG && this.debug.start('setFormats');

    /**
     * @type {Object<string, boolean>}
     * @private
     */
    var config;

    config = {
      id      : app.config.questions.get('id'),
      complete: app.config.questions.get('complete'),
      source  : app.config.questions.get('source'),
      category: app.config.questions.get('category'),
      subCat  : app.config.questions.get('subCat'),
      links   : app.config.questions.get('links')
    };

    this.list().forEach(function(/** Question */ question) {
      if (question) {
        question.setFormat(config);
        question.addToSearch(config);
      }
    });
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function()}
   */
  Questions.prototype.appendElems = function() {

    DEBUG && this.debug.start('appendElems');

    this.list().forEach(function(/** Question */ question) {
      if (question) {
        app.elems.ques.appendChild(question.elem.root);
        question.addElemContent();
      }
    });
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

    // Debugging
    var msg;
    if (DEBUG) {
      this.debug.start('reverseElems');
      // Error message for finding null questions
      msg = 'Error: A null question exists in the list of questions. id= $$';
    }

    /**
     * @type {string}
     * @private
     */
    var direction;
    /**
     * @type {?questions}
     * @private
     */
    var list;
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
    list = this.list();
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      i = 0;
      while (++i < len) {
        DEBUG && this.debug.fail('reverseElems', !!list[i], msg, i);
        app.elems.ques.appendChild(list[i].elem.root);
      }
    }
    // Appends in desc order
    else {
      i = len;
      while (--i) {
        DEBUG && this.debug.fail('reverseElems', !!list[i], msg, i);
        app.elems.ques.appendChild(list[i].elem.root);
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

    // Debugging
    var args, msg, nullMsg;
    if (DEBUG) {
      this.debug.start('hideElems', ids, index, view);
      args = [ 'hideElems' ];
      args.push(ids, 'numbers', index, 'number', view, 'string=');
      this.debug.args(args);
      // Error message for finding null questions
      nullMsg = 'Error: A null question was found. id= $$';
    }

    /**
     * @type {num}
     * @private
     */
    var id;
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
        id = ids[i];
        DEBUG && this.debug.fail('hideElems', !!this.get(id), nullMsg, id);
        this.setStyle(id, 'display', 'none');
      }

      return;
    }

    if (DEBUG) {
      msg = 'Error: No ids were provided with a non-negative index. ids= $$';
      this.debug.fail('hideElems', (!!ids && !!ids.length), msg, ids);
      msg = 'Error: An incorrect index was provided. ids= $$, index= $$';
      args = [ 'hideElems' ];
      args.push((index > -1 && index < ids.length), msg, ids, index);
      this.debug.fail(args);
    }

    view = view || app.searchBar.vals.view;

    // Hide only the index of the provided ids
    if (view === 'one') {
      id = ids[index];
      DEBUG && this.debug.fail('hideElems', !!this.get(id), nullMsg, id);
      this.setStyle(id, 'display', 'none');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {
      ids = ( (ids.length < (index + 11)) ?
        ids.slice(index) : ids.slice(index, (index + 11))
      );
      i = ids.length;
      while (i--) {
        id = ids[i];
        DEBUG && this.debug.fail('hideElems', !!this.get(id), nullMsg, id);
        this.setStyle(id, 'display', 'none');
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

    // Debugging
    var args, msg, nullMsg;
    if (DEBUG) {
      this.debug.start('showElems', ids, index);
      this.debug.args('showElems', ids, 'numbers', index, 'number');
      // Error message for finding null questions
      nullMsg = 'Error: A null question was found. id= $$';
    }

    /**
     * @type {string}
     * @private
     */
    var view;
    /**
     * @type {num}
     * @private
     */
    var id;
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
        id = ids[i];
        DEBUG && this.debug.fail('hideElems', !!this.get(id), nullMsg, id);
        this.get(id).elem.root.className = ( (i % 2) ?
          'question shade2' : 'question shade1'
        );
        this.setStyle(id, 'display', 'block');
      }

      return;
    }

    if (DEBUG) {
      msg = 'Error: No ids were provided with a non-negative index. ids= $$';
      this.debug.fail('showElems', (!!ids && !!ids.length), msg, ids);
      msg = 'Error: An incorrect index was provided. ids= $$, index= $$';
      args = [ 'showElems' ];
      args.push((index > -1 && index < ids.length), msg, ids, index);
      this.debug.fail(args);
    }

    view = app.searchBar.vals.view;

    // Hide only the index of the provided ids
    if (view === 'one') {
      id = ids[index];
      DEBUG && this.debug.fail('hideElems', !!this.get(id), nullMsg, id);
      this.get(id).elem.root.className = 'question shade1';
      this.setStyle(id, 'display', 'block');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {
      ids = ( (ids.length < (index + 11)) ?
        ids.slice(index) : ids.slice(index, (index + 11))
      );
      i = ids.length;
      while (i--) {
        id = ids[i];
        DEBUG && this.debug.fail('hideElems', !!this.get(id), nullMsg, id);
        this.get(id).elem.root.className = ( (i % 2) ?
          'question shade2' : 'question shade1'
        );
        this.setStyle(id, 'display', 'block');
      }
      return;
    }
  };
