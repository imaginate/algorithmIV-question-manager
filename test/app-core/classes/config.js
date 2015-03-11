  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {?Object} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    config = config || {};
    config.searchSettings = config.searchSettings || {};
    config.questionFormat = config.questionFormat || {};

    /**
     * @type {boolean}
     * @private
     */
    var url;
    /**
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ---------------------------------------------------
     * Private Property (Config.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Config') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'config', config);
      this.debug.start('init', config);
      this.debug.args('init', config, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Config.searchBar)
     * -----------------------------------------------
     * @desc The search bar's configuration settings.
     * @type {SearchBarConfig}
     * @struct
     */
    this.searchBar = new SearchBarConfig(config.searchSettings);

    /**
     * ----------------------------------------------- 
     * Public Property (Config.questions)
     * -----------------------------------------------
     * @desc The question's formatting settings.
     * @type {QuestionsConfig}
     * @struct
     */
    this.questions = new QuestionsConfig(config.questionFormat);

    /**
     * ----------------------------------------------- 
     * Public Property (Config.pretty)
     * -----------------------------------------------
     * @desc The prettifier's settings.
     * @type {PrettyConfig}
     * @struct
     */
    //this.pretty = new PrettyConfig(config.prettyCode);

    /**
     * ----------------------------------------------- 
     * Public Property (Config.showURL)
     * -----------------------------------------------
     * @desc Indicates if formatted urls should be created for question
     *   ids and categories.
     * @type {boolean}
     */
    this.showURL = function() {
      return url;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Config.linkID)
     * -----------------------------------------------
     * @desc Indicates if the question's id should be linked.
     * @type {boolean}
     */
    this.linkID = function() {
      return id;
    };


    // Set the properties
    url = (config.showURL === true);
    id = !(config.id === false || config.linkID === false);


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Config.prototype.constructor = Config;
