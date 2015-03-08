  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {?Object} questions - The user's questions.
   * @constructor
   */
  var Questions = function(questions) {

    /**
     * ---------------------------------------------------
     * Private Property (Questions.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Questions') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'questions', questions);
      this.debug.start('init', questions);
      this.debug.args('init', questions, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.data)
     * -----------------------------------------------
     * @desc The array of question objects.
     * @type {questions}
     */
    this.data = null;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The number of questions supplied to this app istance.
     * @type {number}
     */
    this.len = 0;

    if ( Array.isArray(questions) ) {

      this.data = questions.map(function(/** Object */ question) {

        //
      });

      this.len = this.data.length;
    }

    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Questions.prototype.constructor = Questions;

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.)
   * -----------------------------------------------------
   * @desc .
   * @param {}  - .
   * @param {}  - .
   * @param {}  - .
   */
  Questions.prototype.method = function() {

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
