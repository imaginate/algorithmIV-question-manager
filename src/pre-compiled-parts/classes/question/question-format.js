  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {!Object} question - The pre-formatted details of the question.
   * @param {!booleanMap} config - The settings for question formatting.
   * @param {function} getSource - The getter for the app's sources.
   * @param {function} getCategory - The getter for the app's categories.
   * @constructor
   */
  var QuestionFormat = function(question, config, getSource, getCategory) {

    /** @type {!Array<*>} */
    var args;

    args = [ question, '!object', config, '!booleanMap' ];
    args.push(getSource, 'function', getCategory, 'function');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.id)
     * -----------------------------------------------
     * @desc The id for this question.
     * @type {string}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.source)
     * -----------------------------------------------
     * @desc This question's source.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {string}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.mainCat)
     * -----------------------------------------------
     * @desc This question's main categories.
     * @type {{
     *   h3   : ?string,
     *   names: ?strings
     * }}
     * @private
     */
    var mainCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.subCat)
     * -----------------------------------------------
     * @desc This question's sub categories.
     * @type {{
     *   h3   : ?string,
     *   names: ?strings
     * }}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {{
     *   prettyCode: string,
     *   lineCount : number
     * }}
     * @private
     */
    var solution;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!{ result: string, lineCount: number }} */
    var code;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    id = (config.id && question.id) ? question.id : '';
    if (id) {
      id = ( (id < 10) ?
        '00' + id : (id < 100) ?
          '0' + id : '' + id
      );
    }

    source = ( (config.source && question.source) ?
      getSource(question.source, 'name') : ''
    );

    complete = ( (!config.complete) ?
      '' : (question.complete) ?
        'Yes' : 'No'
    );

    // Format the categories
    mainCat = {
      h3   : null,
      names: null
    };
    subCat = {
      h3   : null,
      names: null
    };
    if (config.category) {

      // Format the main category
      if (question.mainCat.length) {
        mainCat.h3 = ( (question.mainCat.length > 1) ?
          'Main Categories:' : 'Main Category:'
        );
        len = question.mainCat.length;
        mainCat.names = new Array(len);
        i = -1;
        while (++i < len) {
          mainCat.names[i] = getCategory(question.mainCat[i], 'name');
        }
      }

      // Format the sub category
      if (config.subCat && question.subCat.length) {
        subCat.h3 = ( (question.subCat.length > 1) ?
          'Sub Categories:' : 'Sub Category:'
        );
        len = question.subCat.length;
        subCat.names = new Array(len);
        i = -1;
        while (++i < len) {
          subCat.names[i] = getCategory(question.subCat[i], 'name');
        }
      }
    }

    // Format the solution
    solution = {};
    if (question.solution) {
      code = prettify(question.solution);
      solution.prettyCode = code.result;
      solution.lineCount = code.lineCount;
    }

    // Freeze all of the protected properties that are objects
    freezeObj(mainCat);
    freezeObj(subCat);
    freezeObj(solution);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionFormat.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the QuestionFormat.
     * @param {string} propName - The name of the property to get.
     * @return {*} The property's value.
     */
    this.get = function(propName) {

      /** @type {Object<string, *>} */
      var props = {
        id      : id,
        source  : source,
        complete: complete,
        mainCat : mainCat,
        subCat  : subCat,
        solution: solution
      };

      return getter.call(props, propName);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  QuestionFormat.prototype.constructor = QuestionFormat;
