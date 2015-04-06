  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {Object} question - The details of a new question.
   * @param {number} id - The id for the question.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var Question = function(question, id, config, sources, categories) {

    /**
     * ---------------------------------------------------
     * Public Property (Question.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Question class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Question',
      turnOnDebuggers: 'args fail'
    });

    // Debugging vars
    var args;
    this.debug.group('init', 'coll', 'questionID= $$', id);
    this.debug.start('init', question, id, config, sources, categories);
    args = [ 'init', question, 'object', id, 'number', config, 'booleanMap' ];
    args.push(sources, 'object', categories, 'object');
    this.debug.args(args);

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
     * Public Property (Question.format)
     * -----------------------------------------------
     * @desc The formatted details for the question.
     * @type {QuestionFormat}
     */
    this.format;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question element.
     * @type {elem}
     */
    this.elem;

    /**
     * ----------------------------------------------- 
     * Public Method (Question.get)
     * -----------------------------------------------
     * @desc Gets info for a question.
     * @param {string} prop - The name of the property to get.
     * @return {val}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, val>} */
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
        output  : output
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', details.hasOwnProperty(prop), errorMsg, prop);

      return details[prop];
    };
    Object.freeze(this.get);


    // Setup the question's element
    this.elem = new QuestionElem(id);
    Object.freeze(this.elem);

    // Setup the protected properties
    url = '';
    if (!!question.url && typeof question.url === 'string') {
      url = question.url.toLowerCase();
      url = url.replace(/[^0-9a-z\-\s]/g, '');
      url = url.replace(/\s/g, '-');
    }

    complete = (!!question.complete && question.complete === true);

    source = ( (!!question.source && typeof question.source === 'string') ?
      question.source : ''
    );
    if ( !sources.get(source, 'name') ) {
      source = '';
    }

    mainCat = ( (!question.mainCat || !checkType(question.mainCat, 'strings')) ?
      [] : (question.mainCat.length) ?
        question.mainCat.slice(0) : []
    );
    mainCat.forEach(function(/** string */ catID, /** number */ i) {
      if ( !categories.get(catID, 'name') ) {
        mainCat.splice(i, 1);
      }
    });
    Object.freeze(mainCat);

    subCat = ( (!question.subCat || !checkType(question.subCat, 'strings')) ?
      [] : (question.subCat.length) ?
        question.subCat.slice(0) : []
    );
    subCat.forEach(function(/** string */ catID, /** number */ i) {
      if ( !categories.get(catID, 'name') ) {
        subCat.splice(i, 1);
      }
    });
    Object.freeze(subCat);

    links = ( (!config.links || !question.links ||
               !checkType(question.links, 'objects') ||
               !question.links.length) ?
      [] : question.links.slice(0)
    );
    if (links.length) {
      links.forEach(function(/** stringMap */ linkObj, /** number */ i) {
        if (!linkObj.name || !linkObj.href ||
            !checkTypes([ linkObj.name, linkObj.href ], 'string') ||
            !isLink(linkObj.href)) {
          links.splice(i, 1);
        }
      });
    }
    Object.freeze(links);

    problem = ( (!!question.problem && typeof question.problem === 'string') ?
      question.problem : ''
    );

    descr = ( (!!question.descr && typeof question.descr === 'string') ?
      question.descr : ''
    );

    solution = '';
    output = '';
    if (!!question.solution && typeof question.solution === 'function') {

      solution = String(question.solution);

      if (solution) {
        solution = trimFunctionWrapper(solution);
      }

      if (solution && config.output) {
        try {
          output = String( question.solution() );
        }
        catch (errorMsg) {
          args = [ 'init', false ];
          args.push('The question\'s solution produced an error. questionID= $$, error= $$');
          args.push(id, errorMsg);
          this.debug.fail(args);

          output = 'The solution returned an error.';
        }
      }
    }

    // Setup the question format
    this.format = new QuestionFormat({
      id      : id,
      complete: complete,
      source  : source,
      mainCat : mainCat,
      subCat  : subCat,
      solution: solution
    }, config, sources, categories);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Question.prototype.constructor = Question;

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addToSearch)
   * -----------------------------------------------------
   * @desc Adds the question id to its matching search properties.
   * @param {booleanMap} config - The needed format config.
   */
  Question.prototype.addToSearch = function(config) {

    this.debug.start('addToSearch');

    /** @type {number} */
    var id;
    /** @type {boolean} */
    var complete;
    /** @type {string} */
    var source;
    /** @type {strings} */
    var mainCat;
    /** @type {strings} */
    var subCat;

    id       = this.get('id');
    complete = this.get('complete');
    source   = this.get('source');
    mainCat  = this.get('mainCat');
    subCat   = this.get('subCat');

    if (config.stage) {

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
   * @type {function}
   */
  Question.prototype.addElemContent = function() {

    this.debug.start('addElemContent');

    this.elem.addContent({
      id      : this.format.get('id'),
      url     : this.get('url'),
      complete: this.format.get('complete'),
      source  : {
        id  : this.get('source'),
        name: this.format.get('source')
      },
      mainCat : {
        ids  : this.get('mainCat'),
        h3   : this.format.get('mainCat').h3,
        names: this.format.get('mainCat').names
      },
      subCat  : {
        ids  : this.get('subCat'),
        h3   : this.format.get('subCat').h3,
        names: this.format.get('subCat').names
      },
      links   : this.get('links'),
      problem : this.get('problem'),
      descr   : this.get('descr'),
      solution: this.format.get('solution'),
      output  : this.get('output')
    });
  };
