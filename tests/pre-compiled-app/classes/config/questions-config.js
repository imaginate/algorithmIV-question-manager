  /**
   * -----------------------------------------------------
   * Public Class (QuestionsConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for formatting questions in this app.
   * @param {Object} config - The user's question format config settings.
   * @constructor
   */
  var QuestionsConfig = function(config) {

    this.debug = aIV.debug('QuestionsConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.id)
     * -----------------------------------------------
     * @desc Whether to display any question's id.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.complete)
     * -----------------------------------------------
     * @desc Whether to display any question's completion status.
     * @type {boolean}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.source)
     * -----------------------------------------------
     * @desc Whether to display any question's source.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.category)
     * -----------------------------------------------
     * @desc Whether to display any question's categories.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.subCat)
     * -----------------------------------------------
     * @desc Whether to display any question's sub categories.
     * @type {boolean}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.links)
     * -----------------------------------------------
     * @desc Whether to display any question's links.
     * @type {boolean}
     * @private
     */
    var links;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.problem)
     * -----------------------------------------------
     * @desc Whether to display any question's problem.
     * @type {boolean}
     * @private
     */
    var problem;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.descr)
     * -----------------------------------------------
     * @desc Whether to display any question's description.
     * @type {boolean}
     * @private
     */
    var descr;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.output)
     * -----------------------------------------------
     * @desc Whether to display the solution's output for any question.
     * @type {boolean}
     * @private
     */
    var output;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    id       = true;
    complete = true;
    source   = true;
    category = true;
    subCat   = true;
    links    = true;
    problem  = true;
    descr    = false;
    output   = true;

    if (config.hasOwnProperty('id') && config.id === false) {
      id = false;
    }
    if (config.hasOwnProperty('complete') && config.complete === false) {
      complete = false;
    }
    if (config.hasOwnProperty('source') && config.source === false) {
      source = false;
    }
    if (config.hasOwnProperty('category') && config.category === false) {
      category = false;
    }
    if (config.hasOwnProperty('subCat') && config.subCat === false) {
      subCat = false;
    }
    if (config.hasOwnProperty('links') && config.links === false) {
      links = false;
    }
    if (config.hasOwnProperty('problem') && config.problem === false) {
      problem = false;
    }
    if (config.hasOwnProperty('descr') && config.descr === true) {
      descr = true;
    }
    if (config.hasOwnProperty('output') && config.output === false) {
      output = false;
    }


    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionsConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from QuestionsConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var props = {
        id      : id,
        complete: complete,
        source  : source,
        category: category,
        subCat  : subCat,
        links   : links,
        problem : problem,
        descr   : descr,
        output  : output
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
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

  QuestionsConfig.prototype.constructor = QuestionsConfig;
