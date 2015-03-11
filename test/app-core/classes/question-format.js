  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {Object} question - The pre-formatted details of the question.
   * @param {Object<string, boolean>} config - The needed format config.
   * @constructor
   */
  var QuestionFormat = function(question, config) {

    /**
     * @type {PrettyCode}
     * @private
     */
    var code;

    /**
     * ---------------------------------------------------
     * Private Property (QuestionFormat.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('QuestionFormat') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'id', question.id, 'question', question);
      this.debug.start('init', question);
      this.debug.args('init', question, 'object');
    }

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
     *   h3: string,
     *   p : string
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
     *   h3: string,
     *   p : string
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
     *   code  : string,
     *   height: number
     * }}
     * @private
     */
    var solution;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @type {links}
     * @private
     */
    var links;

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionFormat.get)
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
        source  : source,
        complete: complete,
        mainCat : mainCat,
        subCat  : subCat,
        solution: solution,
        links   : links
      };

      result = (details[part] !== undefined) ? details[part] : null;
      return result;
    };


    // Set the formats

    // Format the id
    id = (config.id && question.id) ? question.id : '';
    if (id) {
      id = ( (id < 10) ?
        '00' + id : (id < 100) ?
          '0' + id : '' + id
      );
    }

    // Format the source
    source = ( (app.sources.len && config.source && question.source) ?
      app.sources.get('question.source').get('name') : ''
    );

    // Format the completion status
    complete = ( (!config.complete) ?
      '' : (question.complete) ?
        'Yes' : 'No'
    );

    // Format the categories
    mainCat = {};
    subCat  = {};
    if (app.categories.len && config.category) {

      if (question.mainCat.length) {
        // Set main category header
        mainCat.h3 = 'Main ' +
        ( (question.mainCat.length > 1) ? 'Categories:' : 'Category:' );
        // Set main category names
        question.mainCat.forEach(function(/** string */ id, /** number */ i) {
          mainCat.p += (i === 0) ? '' : ', ';
          mainCat.p += app.categories.get('id').get('name');
        });
      }

      if (config.subCat && question.subCat.length) {
        // Set sub category header
        subCat.h3 = 'Sub ' +
        ( (question.subCat.length > 1) ? 'Categories:' : 'Category:' );
        // Set sub category names
        question.subCat.forEach(function(/** string */ id, /** number */ i) {
          subCat.p += (i === 0) ? '' : ', ';
          subCat.p += app.categories.get('id').get('name');
        });
      }
    }

    // Format the solution
    solution = {};
    if (question.solution) {

      code = new PrettyCode(solution);

      solution.code = String(code.result);
      solution.height = code.lineCount * app.elems.code.li.height;
      solution.height += app.elems.code.ol.height;
    }

    // Format the links
    links = [];
    if (config.links && question.links.length) {

      question.links.forEach(function(/** string */ data) {
        if (typeof data.name === 'string' &&
            typeof data.href === 'string' &&
            /(^http\:\/\/)|(^https\:\/\/)/.test(data.href)) {
          links.push(data);
        }
      });
    }


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  QuestionFormat.prototype.constructor = QuestionFormat;
