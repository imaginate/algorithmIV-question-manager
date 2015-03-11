  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {?Object} questions - The user's questions.
   * @param {boolean} outputConfig - The config settings for output.
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
      this.debug.group('init', 'coll', 'questions', questions);
      this.debug.start('init', questions, outputConfig);
      this.debug.args('init', questions, 'object', outputConfig, 'boolean');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The number of questions supplied to this app istance.
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


    // Set the properties
    if ( Array.isArray(questions) ) {

      // Set list
      list = questions.map(function(/** Object */ question, /** number */ i) {
        return new Question(question, i, outputConfig);
      });

      // Set data
      data = {};
      list.forEach(function(/** Object */ question) {
        if (question.url) {
          data[question.url] = question;
        }
      });
    }
    // Set len
    this.len = list.length || 0;


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Questions.prototype.constructor = Questions;

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.setFormats)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
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
      question.setFormat(config);
      question.addToSearch(config);
    });
  };
