  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {Object} question - The details of a new question.
   * @param {number} id - The id for the question.
   * @param {boolean} outputConfig - The config settings for output.
   * @constructor
   */
  var Question = function(question, id, outputConfig) {

    var that = this;

    /**
     * ---------------------------------------------------
     * Private Property (Question.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Question') : null;

    var args;
    if (DEBUG) {
      this.debug.start('init', question, id, outputConfig);
      args = [ 'init' ];
      args.push(question, 'object', id, 'number', outputConfig, 'boolean');
      this.debug.args(args);
    }

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.url)
     * -----------------------------------------------
     * @desc The url name for this question.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {boolean}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.source)
     * -----------------------------------------------
     * @desc The id for this question's source.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.mainCat)
     * -----------------------------------------------
     * @desc The ids for this question's main categories.
     * @type {strings}
     * @private
     */
    var mainCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.subCat)
     * -----------------------------------------------
     * @desc The ids for this question's sub categories.
     * @type {strings}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @type {links}
     * @private
     */
    var links;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.problem)
     * -----------------------------------------------
     * @desc This question's problem.
     * @type {string}
     * @private
     */
    var problem;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.descr)
     * -----------------------------------------------
     * @desc This question's description.
     * @type {string}
     * @private
     */
    var descr;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {string}
     * @private
     */
    var solution;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.output)
     * -----------------------------------------------
     * @desc The solution's output for this question.
     * @type {string}
     * @private
     */
    var output;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.codeWidth)
     * -----------------------------------------------
     * @desc The amount of width overflow for this question's code element.
     * @type {number}
     * @private
     */
    var overflow;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.format)
     * -----------------------------------------------
     * @desc The formatted details for the question.
     * @type {?QuestionFormat}
     */
    this.format = null;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question element.
     * @type {elem}
     */
    this.elem = new QuestionElem(id);

    /**
     * ----------------------------------------------- 
     * Public Method (Question.get)
     * -----------------------------------------------
     * @desc Gets info for a question.
     * @param {string} part - The name of the part to get.
     * @return {*}
     */
    this.get = function(part) {
      /** @private */
      var result;
      /** @private */
      var details = {
        id      : id,
        url     : url,
        complete: complete,
        source  : source,
        mainCat : mainCat,
        subCat  : subCat,
        links   : links,
        problem : problem,
        descr   : descr,
        solution: solution,
        output  : output,
        overflow: overflow,
        elem    : elem
      };

      result = (details[part] !== undefined) ? details[part] : null;
      return result;
    };


    // Set the properties
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
   * @param {Object<string, boolean>} config - The needed format config.
   */
  Question.prototype.setFormat = function(config) {

    DEBUG && this.debug.start('setFormat');

    this.format = new QuestionFormat({
      id      : this.get('id'),
      complete: this.get('complete'),
      source  : this.get('source'),
      mainCat : this.get('mainCat'),
      subCat  : this.get('subCat'),
      links   : this.get('links'),
      solution: this.get('solution')
    }, config);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addToSearch)
   * -----------------------------------------------------
   * @desc Adds the question id to its matching search properties.
   * @param {Object<string, boolean>} config - The needed format config.
   */
  Question.prototype.addToSearch = function(config) {

    DEBUG && this.debug.start('addToSearch');

    /**
     * @type {number}
     * @private
     */
    var id;
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

    id = this.get('id');
    complete = this.get('complete');
    source = this.get('source');
    mainCat = this.get('mainCat');
    subCat = this.get('subCat');

    if (config.complete) {

      if (complete) {
        app.searchBar.ques.stage['com'].push(id);
      }
      else {
        app.searchBar.ques.stage['inc'].push(id);
      }
    }

    if (config.source && source) {
      app.sources.get(source).addId(id);
    }

    if (config.category && mainCat.length) {
      mainCat.forEach(function(/** string */ catId) {
        app.categories.get(catId).addId(id);
      });
    }

    if (config.category && config.subCat && subCat.length) {
      subCat.forEach(function(/** string */ catId) {
        app.categories.get(catId).addId(id);
      });
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addElemContent)
   * -----------------------------------------------------
   * @desc Adds the formatted content to the question element.
   */
  Question.prototype.addElemContent = function() {

    DEBUG && this.debug.start('addElemContent');

    this.elem.addContent({
      id      : this.format.get('id'),
      url     : this.get('url'),
      complete: this.format.get('complete'),
      source  : this.format.get('source'),
      mainCat : this.format.get('mainCat'),
      subCat  : this.format.get('subCat'),
      links   : this.format.get('links'),
      problem : this.get('problem'),
      descr   : this.get('descr'),
      solution: this.format.get('solution'),
      output  : this.get('output')
    });
  };
