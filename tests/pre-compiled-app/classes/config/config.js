  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {?Object} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    this.debug = aIV.debug('Config');

    this.debug.group('init', 'coll', 'config= $$', config);

    this.debug.start('init', config);

    this.debug.args('init', config, 'objectMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Config.searchBar)
     * -----------------------------------------------
     * @desc The search bar's configuration settings.
     * @type {SearchBarConfig}
     * @struct
     */
    this.searchBar;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.questions)
     * -----------------------------------------------
     * @desc The question's formatting settings.
     * @type {QuestionsConfig}
     * @struct
     */
    this.questions;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.prettifier)
     * -----------------------------------------------
     * @desc The prettifier's settings.
     * @type {PrettyConfig}
     * @struct
     */
    this.prettifier;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.links)
     * -----------------------------------------------
     * @desc Whether to display search links for each question.
     * @type {LinksConfig}
     */
    this.links;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    // Check the given user's config object
    if (!config || typeof config !== 'object') {
      config = {};
    }

    if (!config.searchSettings || typeof config.searchSettings !== 'object') {
      config.searchSettings = {};
    }
    if (!config.questionFormat || typeof config.questionFormat !== 'object') {
      config.questionFormat = {};
    }
    if (!config.prettifyFormat || typeof config.prettifyFormat !== 'object') {
      config.prettifyFormat = {};
    }
    if (!config.showLinks || typeof config.showLinks !== 'object') {
      config.showLinks = {};
    }

    // Setup the properties
    this.searchBar  = new SearchBarConfig(config.searchSettings);
    this.questions  = new QuestionsConfig(config.questionFormat);
    this.prettifier = new PrettyConfig(config.prettifyFormat);
    this.links      = new LinksConfig(config.showLinks);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.group('init', 'end');

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Config.prototype.constructor = Config;
