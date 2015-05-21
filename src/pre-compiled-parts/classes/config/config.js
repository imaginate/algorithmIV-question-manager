  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {Object<string, Object>} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    checkArgs(config, 'objectMap');

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
    if ( !checkType(config, '!object') ) {
      config = {};
    }

    if ( !checkType(config.searchSettings, '!object') ) {
      config.searchSettings = {};
    }
    if ( !checkType(config.questionFormat, '!object') ) {
      config.questionFormat = {};
    }
    if ( !checkType(config.prettifyFormat, '!object') ) {
      config.prettifyFormat = {};
    }
    if ( !checkType(config.showLinks, '!object') ) {
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

    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Config.prototype.constructor = Config;
