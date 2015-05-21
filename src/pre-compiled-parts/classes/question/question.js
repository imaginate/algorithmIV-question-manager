  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {!Object} question - The details of a new question.
   * @param {number} id - The id for the question.
   * @param {!booleanMap} config - The settings for question formatting.
   * @param {function} getSource - The getter for the app's sources.
   * @param {function} getCategory - The getter for the app's categories.
   * @constructor
   */
  var Question = function(question, id, config, getSource, getCategory) {

    /** @type {!Array<*>} */
    var args;

    args = [ question, '!object', id, 'number', config, '!booleanMap' ];
    args.push(getSource, 'function', getCategory, 'function');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Setup & Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question's DOM container.
     * @type {!QuestionElem}
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

    /** @type {!stringMap} */
    var linkObj;
    /** @type {string} */
    var catId;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    url = '';
    if (question.url && checkType(question.url, 'string')) {
      url = makeUrl(question.url);
    }

    complete = (question.complete === true);

    source = ( (!checkType(question.source, 'string')) ?
      '' : (question.source === 'all') ?
        '_all' : question.source
    );
    if ( !getSource(source, 'name') ) {
      source = '';
    }

    mainCat = [];
    if ( checkType(question.mainCat, '!strings') ) {
      len = question.mainCat.length;
      i = -1;
      while (++i < len) {
        catId = question.mainCat[i];
        if (catId === 'all') {
          catId = '_all';
        }
        if ( getCategory(catId, 'name') ) {
          mainCat.push(catId);
        }
      }
    }

    subCat = [];
    if ( checkType(question.subCat, '!strings') ) {
      len = question.subCat.length;
      i = -1;
      while (++i < len) {
        catId = question.subCat[i];
        if (catId === 'all') {
          catId = '_all';
        }
        if ( getCategory(catId, 'name') ) {
          subCat.push(catId);
        }
      }
    }

    links = [];
    if (config.links && checkType(question.links, '!objects')) {
      len = question.links.length;
      i = -1;
      while (++i < len) {
        linkObj = question.links[i];
        if (checkType(linkObj, '!object') &&
            checkType(linkObj.name, 'string') &&
            checkType(linkObj.href, 'string') &&
            isLink(linkObj.href)) {
          links.push(linkObj);
        }
      }
    }

    problem = ( checkType(question.problem, 'string') ) ? question.problem : '';

    descr = ( checkType(question.descr, 'string') ) ? question.descr : '';

    solution = '';
    output = '';
    if ( checkType(question.solution, 'function') ) {

      solution = String(question.solution);
      solution = solution && trimFunctionWrapper(solution);

      if (solution && config.output) {
        try {
          output = String( question.solution() );
        }
        catch (error) {
          output = 'The solution returned the following error - ';
          output += error.toString();
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
    }, config, getSource, getCategory);

    // Freeze some of the protected properties
    freezeObj(mainCat);
    freezeObj(subCat);
    freezeObj(links);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Question.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from a Question.
     * @param {string} propName - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The property's value.
     */
    this.get = function(propName, formatted) {

      /** @type {string} */
      var errorMsg;
      /** @type {*} */
      var propVal;
      /** @type {!Object<string, *>} */
      var props;

      checkArgs(propName, 'string', formatted, 'boolean=');

      props = {
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

      if ( !hasOwnProp(props, propName) ) {
        errorMsg = 'An aIV.app internal error occurred. A Question.get call was ';
        errorMsg += 'given an invalid property name to get. property= ' + propName;
        throw new Error(errorMsg);
      }

      propVal = (formatted) ? format.get(propName) : props[ propName ];

      return propVal;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this.get);
    freezeObj(this);

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
   * @param {!booleanMap} config - The needed format config.
   */
  Question.prototype.addToSearch = function(config) {

    /** @type {number} */
    var i;
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

    checkArgs(config, '!booleanMap');

    id       = this.get('id');
    complete = this.get('complete');
    source   = this.get('source');
    mainCat  = this.get('mainCat');
    subCat   = this.get('subCat');

    // Add the Question's id to the stage ids
    if (config.stage) {
      if (complete) {
        app.searchBar.ques.stage['com'].push(id);
      }
      else {
        app.searchBar.ques.stage['inc'].push(id);
      }
    }

    // Add the Question's id to the source ids
    if (config.source && source) {
      app.sources.get(source).addId(id);
    }

    // Add the Question's id to the main category ids
    if (config.category) {
      i = mainCat.length;
      while (i--) {
        app.categories.get(mainCat[i]).addId(id);
      }
    }

    // Add the Question's id to the sub category ids
    if (config.category && config.subCat) {
      i = subCat.length;
      while (i--) {
        app.categories.get(subCat[i]).addId(id);
      }
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
