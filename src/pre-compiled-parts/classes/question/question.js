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

    ////////////////////////////////////////////////////////////////////////////
    // Setup & Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question's DOM container.
     * @type {element}
     */
    this.elem = new QuestionElem(id);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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
     * Protected Property (Question.format)
     * -----------------------------------------------
     * @desc The formatted details for the question.
     * @type {QuestionFormat}
     */
    var format;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    // Setup main categories
    mainCat = ( (!question.mainCat || !checkType(question.mainCat, 'strings')) ?
      [] : (question.mainCat.length) ?
        question.mainCat.slice(0) : []
    );

    // Check the main category ids accuracy
    mainCat.forEach(function(/** string */ catID, /** number */ i) {

      if (catID === 'all') {
        mainCat[i] = '_all';
        catID = '_all';
      }

      if ( !categories.get(catID, 'name') ) {
        mainCat.splice(i, 1);
      }
    });

    // Setup sub categories
    subCat = ( (!question.subCat || !checkType(question.subCat, 'strings')) ?
      [] : (question.subCat.length) ?
        question.subCat.slice(0) : []
    );

    // Check the sub category ids accuracy
    subCat.forEach(function(/** string */ catID, /** number */ i) {

      if (catID === 'all') {
        subCat[i] = '_all';
        catID = '_all';
      }

      if ( !categories.get(catID, 'name') ) {
        subCat.splice(i, 1);
      }
    });

    // Setup links
    links = ( (!config.links || !question.links ||
               !checkType(question.links, 'objects') ||
               !question.links.length) ?
      [] : question.links.slice(0)
    );

    // Check the link objects accuracy
    if (links.length) {
      links.forEach(function(/** stringMap */ linkObj, /** number */ i) {
        if (!linkObj.name || !linkObj.href ||
            !checkTypes([ linkObj.name, linkObj.href ], 'string') ||
            !isLink(linkObj.href)) {
          links.splice(i, 1);
        }
      });
    }

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

          output = 'The solution returned an error.';
        }
      }
    }

    format = new QuestionFormat({
      id      : id,
      complete: complete,
      source  : source,
      mainCat : mainCat,
      subCat  : subCat,
      solution: solution
    }, config, sources, categories);

    // Freeze the needed protected properties
    Object.freeze(mainCat);
    Object.freeze(subCat);
    Object.freeze(links);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Question.get)
     * -----------------------------------------------
     * @desc Gets a protected property for the question.
     * @param {string} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {val} The property's value.
     */
    this.get = function(prop, formatted) {

      /** @type {Object<string, val>} */
      var props = {
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

      formatted = formatted || false;

      return (formatted) ? format.get(prop) : props[ prop ];
    };

    // Freeze all of the methods
    Object.freeze(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Question.prototype.constructor = Question;

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addToSearch)
   * -----------------------------------------------------
   * @desc Adds the question id to its matching search properties.
   * @param {booleanMap} config - The needed format config.
   */
  Question.prototype.addToSearch = function(config) {

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

    this.elem.addContent({
      id      : this.get('id', true),
      url     : this.get('url'),
      complete: this.get('complete', true),
      source  : {
        id  : this.get('source'),
        name: this.get('source', true)
      },
      mainCat : {
        ids  : this.get('mainCat'),
        h3   : this.get('mainCat', true).h3,
        names: this.get('mainCat', true).names
      },
      subCat  : {
        ids  : this.get('subCat'),
        h3   : this.get('subCat', true).h3,
        names: this.get('subCat', true).names
      },
      links   : this.get('links'),
      problem : this.get('problem'),
      descr   : this.get('descr'),
      solution: this.get('solution', true),
      output  : this.get('output')
    });

  };
