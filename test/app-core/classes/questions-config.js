  /**
   * -----------------------------------------------------
   * Public Class (QuestionsConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for formatting questions in this app.
   * @param {Object} config - The user's question format config settings.
   * @constructor
   */
  var QuestionsConfig = function(config) {

    /**
     * @type {boolean}
     * @private
     */
    var id;
    /**
     * @type {boolean}
     * @private
     */
    var complete;
    /**
     * @type {boolean}
     * @private
     */
    var source;
    /**
     * @type {boolean}
     * @private
     */
    var category;
    /**
     * @type {boolean}
     * @private
     */
    var subCat;
    /**
     * @type {boolean}
     * @private
     */
    var links;
    /**
     * @type {boolean}
     * @private
     */
    var problem;
    /**
     * @type {boolean}
     * @private
     */
    var descr;
    /**
     * @type {boolean}
     * @private
     */
    var output;

    /**
     * ---------------------------------------------------
     * Private Property (QuestionsConfig.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('QuestionsConfig') : null;

    if (DEBUG) {
      this.debug.start('init', config);
      this.debug.args('init', config, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.id)
     * -----------------------------------------------
     * @desc Whether to display any question's id.
     * @return {boolean}
     */
    this.id = function() {
      return id;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.complete)
     * -----------------------------------------------
     * @desc Whether to display any question's completion status.
     * @return {boolean}
     */
    this.complete = function() {
      return complete;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.source)
     * -----------------------------------------------
     * @desc Whether to display any question's source.
     * @return {boolean}
     */
    this.source = function() {
      return source;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.category)
     * -----------------------------------------------
     * @desc Whether to display any question's categories.
     * @return {boolean}
     */
    this.category = function() {
      return category;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.subCat)
     * -----------------------------------------------
     * @desc Whether to display any question's sub categories.
     * @return {boolean}
     */
    this.subCat = function() {
      return subCat;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.links)
     * -----------------------------------------------
     * @desc Whether to display any question's links.
     * @return {boolean}
     */
    this.links = function() {
      return links;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.problem)
     * -----------------------------------------------
     * @desc Whether to display any question's problem.
     * @return {boolean}
     */
    this.problem = function() {
      return problem;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.descr)
     * -----------------------------------------------
     * @desc Whether to display any question's description.
     * @return {boolean}
     */
    this.descr = function() {
      return descr;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionsConfig.output)
     * -----------------------------------------------
     * @desc Whether to display the solution's output for any question.
     * @return {boolean}
     */
    this.output = function() {
      return output;
    };


    // Set the properties
    id       = (config.id       !== false);
    complete = (config.complete !== false);
    source   = (config.source   !== false);
    category = (config.category !== false);
    subCat   = (config.subCat   !== false);
    links    = (config.links    !== false);
    problem  = (config.problem  !== false);
    descr    = (config.descr    === true );
    output   = (config.output   !== false);
  };

  // Ensure constructor is set to this class.
  QuestionsConfig.prototype.constructor = QuestionsConfig;
