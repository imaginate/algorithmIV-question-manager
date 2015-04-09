  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {Object} question - The pre-formatted details of the question.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var QuestionFormat = function(question, config, sources, categories) {

    /** @type {{ result: string, lineCount: number }} */
    var code;

    // $s$
    /**
     * ---------------------------------------------------
     * Public Property (QuestionFormat.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the QuestionFormat class.
     * @type {Debug}
     */
    this.debug = aIV.debug('QuestionFormat');

    var debugArgs;
    debugArgs = [ 'init', 'coll' ];
    debugArgs.push('id= $$, question= $$', question.id, question);
    this.debug.group(debugArgs);
    this.debug.start('init', question, config, sources, categories);
    debugArgs = [ 'init' ];
    debugArgs.push(question, 'object', config, 'booleanMap');
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);
    // $e$
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

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionFormat.get)
     * -----------------------------------------------
     * @desc Gets info for a question.
     * @param {string} prop - The name of the property to get.
     * @return {val}
     */
    this.get = function(prop) {

      var debugMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, val>} */
      var details = {
        id      : id,
        source  : source,
        complete: complete,
        mainCat : mainCat,
        subCat  : subCat,
        solution: solution
      };

      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', details.hasOwnProperty(prop), debugMsg, prop);

      return details[prop];
    };
    Object.freeze(this.get);


    // Format the id
    id = (config.id && question.id) ? question.id : '';
    if (id) {
      id = ( (id < 10) ?
        '00' + id : (id < 100) ?
          '0' + id : '' + id
      );
    }

    // Format the source
    source = ( (sources.len && config.source && question.source) ?
      sources.get(question.source, 'name') : ''
    );

    // Format the completion status
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
    if (categories.len && config.category) {

      // Format the main category
      if (question.mainCat.length) {
        mainCat.h3 = ( (question.mainCat.length > 1) ?
          'Main Categories:' : 'Main Category:'
        );
        mainCat.names = question.mainCat.map(function(/** string */ catID) {
          return categories.get(catID, 'name');
        });
      }

      // Format the sub category
      if (config.subCat && question.subCat.length) {
        subCat.h3 = ( (question.subCat.length > 1) ?
          'Sub Categories:' : 'Sub Category:'
        );
        subCat.names = question.subCat.map(function(/** string */ catID) {
          return categories.get(catID, 'name');
        });
      }
    }

    // Format the solution
    solution = {};
    if (question.solution) {
      code = prettify(question.solution);
      solution.prettyCode = code.result;
      solution.lineCount = code.lineCount;
    }

    Object.freeze(mainCat);
    Object.freeze(subCat);
    Object.freeze(solution);

    // Close this debug console group
    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  QuestionFormat.prototype.constructor = QuestionFormat;
