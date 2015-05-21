  /**
   * -----------------------------------------------------
   * Public Class (QuestionsConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for formatting questions in this app.
   * @param {!Object} config - The user's question format config settings.
   * @constructor
   */
  var QuestionsConfig = function(config) {

    checkArgs(config, '!object');

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

    id       = !(config.id       === false);
    complete = !(config.complete === false);
    source   = !(config.source   === false);
    category = !(config.category === false);
    subCat   = !(config.subCat   === false);
    links    = !(config.links    === false);
    problem  = !(config.problem  === false);
    descr    =  (config.descr    === true );
    output   = !(config.output   === false);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionsConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from QuestionsConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
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

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  QuestionsConfig.prototype.constructor = QuestionsConfig;
