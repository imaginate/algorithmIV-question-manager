  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {Object} question - The details of a new question.
   * @constructor
   */
  var Question = function(question) {

    /**
     * ---------------------------------------------------
     * Private Property (Question.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Question') : null;

    if (DEBUG) {
      this.debug.start('init', question);
      this.debug.args('init', question, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Question.url)
     * -----------------------------------------------
     * @desc The url name for this question.
     * @type {string}
     */
    this.url = '';

    /**
     * ----------------------------------------------- 
     * Public Property (Question.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {boolean}
     */
    this.complete = false;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.source)
     * -----------------------------------------------
     * @desc The id for this question's source.
     * @type {string}
     */
    this.source = '';

    /**
     * ----------------------------------------------- 
     * Public Property (Question.mainCat)
     * -----------------------------------------------
     * @desc The ids for this question's main categories.
     * @type {strings}
     */
    this.mainCat = [];

    /**
     * ----------------------------------------------- 
     * Public Property (Question.subCat)
     * -----------------------------------------------
     * @desc The ids for this question's sub categories.
     * @type {strings}
     */
    this.subCat = [];

    /**
     * ----------------------------------------------- 
     * Public Property (Question.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @type {Array<{
     *   name: string,
     *   href: string
     * }>}
     */
    this.links = [];

    /**
     * ----------------------------------------------- 
     * Public Property (Question.problem)
     * -----------------------------------------------
     * @desc This question's problem.
     * @type {string}
     */
    this.problem = '';

    /**
     * ----------------------------------------------- 
     * Public Property (Question.descr)
     * -----------------------------------------------
     * @desc This question's description.
     * @type {string}
     */
    this.descr = '';

    /**
     * ----------------------------------------------- 
     * Public Property (Question.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {?Object}
     */
    this.solution = null;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.codeWidth)
     * -----------------------------------------------
     * @desc The amount of width overflow for this question's code element.
     * @type {number}
     */
    this.codeWidth = 0;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.format)
     * -----------------------------------------------
     * @desc The formatted details for the question.
     * @type {?QuestionFormat}
     */
    this.format = null;


    if (typeof question.url === 'string') {
      this.url = question.url;
    }

    if (typeof question.complete === 'boolean') {
      this.complete = question.complete;
    }

    if (typeof question.source === 'string') {
      this.source = question.source;
    }

    if ( Array.isArray(question.mainCat) ) {
      this.mainCat = question.mainCat;
    }

    if ( Array.isArray(question.subCat) ) {
      this.subCat = question.subCat;
    }

    if ( Array.isArray(question.links) ) {
      this.links = question.links;
    }

    if (typeof question.problem === 'string') {
      this.problem = question.problem;
    }

    if (typeof question.descr === 'string') {
      this.descr = question.descr;
    }

    if (typeof question.solution === 'function') {
      this.solution = question.solution;
    }
  };

  // Ensure constructor is set to this class.
  Question.prototype.constructor = Question;

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.)
   * -----------------------------------------------------
   * @desc .
   * @param {}  - .
   * @param {}  - .
   * @param {}  - .
   */
  Question.prototype.method = function() {

    if (DEBUG) {
      this.debug.start('method', args);
      this.debug.args('method', arg, '?object');
    }

    /**
     * @type {boolean}
     * @private
     */
    var arg;

    //
  };
