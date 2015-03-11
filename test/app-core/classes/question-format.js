  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {Object} question - The pre-formatted details of the question.
   * @constructor
   */
  var QuestionFormat = function(question) {

    /**
     * @type {PrettifiedList}
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
     * Public Property (QuestionFormat.id)
     * -----------------------------------------------
     * @desc The id for this question.
     * @type {string}
     */
    this.id = '';

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.source)
     * -----------------------------------------------
     * @desc This question's source.
     * @type {string}
     */
    this.source = '';

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {string}
     */
    this.complete = '';

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.category)
     * -----------------------------------------------
     * @desc This question's categories.
     * @type {{
     *   main: {
     *     h3: string,
     *     p : string
     *   },
     *   sub: {
     *     h3: string,
     *     p : string
     *   }
     * }}
     */
    this.category = {
      main: {
        h3: '',
        p : ''
      },
      sub: {
        h3: '',
        p : ''
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {{
     *   code  : string,
     *   height: number
     * }}
     */
    this.solution = {
      code  : '',
      height: 0
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionFormat.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @type {links}
     */
    this.links = [];


    // Save the formats

    // Format the id
    if (app.config.questions.id && question.id) {
      this.id = ( (question.id < 10) ?
        '00' + question.id : (question.id < 100) ?
          '0' + question.id : '' + question.id
      );
    }

    // Format the source
    if (app.sources.len && app.config.questions.source && question.source) {
      this.source = app.sources.data[question.source].name;
    }

    // Format the completion status
    if (app.configuration.questions.complete) {
      this.complete = (question.complete) ? 'Yes' : 'No';
    }

    // Format the category
    if (app.categories.len && app.config.questions.category) {

      if (question.mainCat.length) {
        // Set main category header
        this.category.main.h3 = 'Main ' +
        ( (question.mainCat.length > 1) ? 'Categories:' : 'Category:' );
        // Set main category names
        question.mainCat.forEach(function(/** string */ id, /** number */ i) {
          this.category.main.p += (i === 0) ? '' : ', ';
          this.category.main.p += app.categories.data[id].name;
        }, this);
      }

      if (app.config.questions.subCat && question.subCat.length) {
        // Set sub category header
        this.category.sub.h3 = 'Sub ' +
        ( (question.subCat.length > 1) ? 'Categories:' : 'Category:' );
        // Set sub category names
        question.subCat.forEach(function(/** string */ id, /** number */ i) {
          this.category.sub.p += (i === 0) ? '' : ', ';
          this.category.sub.p += app.categories.data[id].name;
        }, this);
      }
    }

    // Format the solution
    if (question.solution) {

      code = new PrettifiedList(solution);

      this.solution.code = code.result;
      this.solution.height = code.lineCount * app.elems.code.li.height;
      this.solution.height += app.elems.code.ol.height;
    }

    // Format the links
    if (app.config.questions.links && question.links.length) {

      question.links.forEach(function(/** string */ data) {
        if (typeof data.name === 'string' &&
            typeof data.href === 'string' &&
            /(^http\:\/\/)|(^https\:\/\/)/.test(data.href)) {
          this.links.push(data);
        }
      }, this);
    }


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  QuestionFormat.prototype.constructor = QuestionFormat;
