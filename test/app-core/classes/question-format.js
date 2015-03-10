  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {Object} question - The pre-formatted details of the question.
   * @param {number=} index - This question's index (used solely for debug).
   * @constructor
   */
  var QuestionFormat = function(question, index) {

    /**
     * ---------------------------------------------------
     * Private Property (QuestionFormat.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('QuestionFormat') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'question', question, 'id', ++index);
      this.debug.start('init', question, index);
      this.debug.args('init', question, 'object', index, 'number=');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.id)
     * -----------------------------------------------
     * @desc The id for this question.
     * @type {{
     *   flag   : boolean,
     *   content: string
     * }}
     */
    this.id = {
      flag   : false,
      content: ''
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.source)
     * -----------------------------------------------
     * @desc This question's source.
     * @type {{
     *   flag   : boolean,
     *   content: string
     * }}
     */
    this.source = {
      flag   : false,
      content: ''
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {{
     *   flag   : boolean,
     *   content: string
     * }}
     */
    this.complete = {
      flag   : false,
      content: ''
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.category)
     * -----------------------------------------------
     * @desc This question's categories.
     * @type {{
     *   flag: boolean,
     *   main: {
     *     flag: boolean,
     *     h3  : string,
     *     p   : string
     *   },
     *   sub: {
     *     flag: boolean,
     *     h3  : string,
     *     p   : string
     *   }
     * }}
     */
    this.category = {
      flag: false,
      main: {
        flag: false,
        h3  : '',
        p   : ''
      },
      sub: {
        flag: false,
        h3  : '',
        p   : ''
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {{
     *   sError: boolean,
     *   code  : string,
     *   height: number
     * }}
     */
    this.solution = {
      error : false,
      code  : '',
      height: 0
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.output)
     * -----------------------------------------------
     * @desc The solution's output for this question.
     * @type {{
     *   flag   : boolean,
     *   content: string
     * }}
     */
    this.output = {
      flag   : false,
      content: ''
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @type {{
     *   flag   : boolean,
     *   content: Array.<{
     *     href: string,
     *     name: string
     *   }>
     * }}
     */
    this.links = {
      flag   : false,
      content: []
    };


    //


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  QuestionFormat.prototype.constructor = QuestionFormat;

  /**
   * -----------------------------------------------------
   * Public Method (QuestionFormat.prototype.)
   * -----------------------------------------------------
   * @desc .
   * @param {}  - .
   * @param {}  - .
   * @param {}  - .
   */
  QuestionFormat.prototype.method = function() {

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
