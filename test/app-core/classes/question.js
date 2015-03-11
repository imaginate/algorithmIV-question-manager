  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {Object} question - The details of a new question.
   * @param {number} index - The index of the question.
   * @param {boolean} outputConfig - The config settings for output.
   * @constructor
   */
  var Question = function(question, index, outputConfig) {

    /**
     * @type {number}
     * @private
     */
    var id;
    /**
     * @type {string}
     * @private
     */
    var url;
    /**
     * @type {boolean}
     * @private
     */
    var complete;
    /**
     * @type {string}
     * @private
     */
    var source;
    /**
     * @type {strings}
     * @private
     */
    var mainCat;
    /**
     * @type {strings}
     * @private
     */
    var subCat;
    /**
     * @type {links}
     * @private
     */
    var links;
    /**
     * @type {string}
     * @private
     */
    var problem;
    /**
     * @type {string}
     * @private
     */
    var descr;
    /**
     * @type {string}
     * @private
     */
    var solution;
    /**
     * @type {string}
     * @private
     */
    var output;

    /**
     * ---------------------------------------------------
     * Private Property (Question.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Question') : null;

    var args;
    if (DEBUG) {
      this.debug.start('init', question, index, outputConfig);
      args = [ 'init' ];
      args.push(question, 'object', index, 'number', outputConfig, 'boolean');
      this.debug.args(args);
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Question.id)
     * -----------------------------------------------
     * @desc This question's id (i.e. its index plus 1).
     * @return {number}
     */
    this.id = function() {
      return id;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.url)
     * -----------------------------------------------
     * @desc The url name for this question.
     * @return {string}
     */
    this.url = function() {
      return url;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @return {boolean}
     */
    this.complete = function() {
      return complete;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.source)
     * -----------------------------------------------
     * @desc The id for this question's source.
     * @return {string}
     */
    this.source = function() {
      return source;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.mainCat)
     * -----------------------------------------------
     * @desc The ids for this question's main categories.
     * @return {strings}
     */
    this.mainCat = function() {
      return mainCat;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.subCat)
     * -----------------------------------------------
     * @desc The ids for this question's sub categories.
     * @return {strings}
     */
    this.subCat = function() {
      return subCat;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @return {Array<{
     *   name: string,
     *   href: string
     * }>}
     */
    this.links = function() {
      return links;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.problem)
     * -----------------------------------------------
     * @desc This question's problem.
     * @return {string}
     */
    this.problem = function() {
      return problem;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.descr)
     * -----------------------------------------------
     * @desc This question's description.
     * @return {string}
     */
    this.descr = function() {
      return descr;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @return {string}
     */
    this.solution = function() {
      return solution;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Question.output)
     * -----------------------------------------------
     * @desc The solution's output for this question.
     * @return {string}
     */
    this.output = function() {
      return output;
    };

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


    // Set the properties
    id = (typeof index === 'number') ? (index + 1) : 0;

    url = '';
    if (typeof question.url === 'string' && question.url) {
      url = question.url.toLowerCase();
      url = url.replace(/[^0-9a-z\-\s]/g, '');
      url = url.replace(/\s/g, '-');
    }

    complete = (question.complete === true);

    source = ( (typeof question.source === 'string' && question.source) ?
      question.source : ''
    );

    mainCat = ( (Array.isArray(question.mainCat) && question.mainCat.length) ?
      question.mainCat.slice(0) : []
    );

    subCat = ( (Array.isArray(question.subCat) && question.subCat.length) ?
      question.subCat.slice(0) : []
    );

    links = ( (Array.isArray(question.links) && question.links.length) ?
      question.links.slice(0) : []
    );

    problem = ( (typeof question.problem === 'string' && question.problem) ?
      question.problem : ''
    );

    descr = ( (typeof question.descr === 'string' && question.descr) ?
      question.descr : ''
    );

    solution = output = '';
    if (typeof question.solution === 'function') {

      solution = String(question.solution);

      if (outputConfig) {
        try {
          output = String( question.solution() );
        }
        catch (e) {
          args = [ 'init' ];
          args.push('Question id %i\'s solution produced an error, %O.');
          args.push(id, e);
          this.debug.misc(args);

          output = '';
        }
      }
    }
  };

  // Ensure constructor is set to this class.
  Question.prototype.constructor = Question;

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.setFormat)
   * -----------------------------------------------------
   * @desc Sets the format for the question.
   */
  Question.prototype.method = function() {

    DEBUG && this.debug.start('setFormat');

    this.format = new QuestionFormat({
      id      : this.id(),
      complete: this.complete(),
      source  : this.source(),
      mainCat : this.mainCat(),
      subCat  : this.subCat(),
      links   : this.links(),
      solution: this.solution()
    });
  };

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addToSearch)
   * -----------------------------------------------------
   * @desc Adds the question id to its matching search properties.
   */
  Question.prototype.addToSearch = function() {

    DEBUG && this.debug.start('addToSearch');

    if ( app.configuration.questions.complete() ) {

      if (this.complete) {
        app.searchBar.ques.stage['com'].push(this.id);
      }
      else {
        
      }
    }

    if (this.source) {
      
    }

    if (this.mainCat.length) {
      
    }

    if (this.subCat.length) {
      
    }
  };
