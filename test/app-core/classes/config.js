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
     * Protected Property (Config.showURL)
     * -----------------------------------------------
     * @desc Indicates if formatted urls should be created for question
     *   ids and categories.
     * @type {boolean}
     * @private
     */
    var showURL;

    /**
     * ----------------------------------------------- 
     * Protected Property (Config.showLinks)
     * -----------------------------------------------
     * @desc Indicates if the question's links should be shown.
     * @type {boolean}
     * @private
     */
    var showLinks;

    /**
     * ----------------------------------------------- 
     * Public Method (Config.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} part - The name of the setting to get.
     * @return {boolean}
     */
    this.get = function(part) {
      /** @private */
      var result;
      /** @private */
      var settings = {
        showURL  : showURL,
        showLinks: showLinks
      };

      result = (settings[part] !== undefined) ? settings[part] : null;
      return result;
    };


    // Set the properties
    showURL = (config.showURL === true);
    showLinks = (showURL && config.showLinks === true);


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Config.prototype.constructor = Config;
