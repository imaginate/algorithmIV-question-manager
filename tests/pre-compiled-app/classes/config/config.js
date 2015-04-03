  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {?Object} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (Config.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Config class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Config',
      turnOnDebuggers: 'args fail'
    });

    this.debug.group('init', 'coll', 'config= $$', config);
    this.debug.start('init', config);

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
     * Public Property (Config.url)
     * -----------------------------------------------
     * @desc Whether to create formatted urls for the questions.
     * @type {UrlConfig}
     */
    this.url;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.links)
     * -----------------------------------------------
     * @desc Whether to display search links for each question.
     * @type {LinksConfig}
     */
    this.links;


    // Check the user config settings
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
    if (!config.showURL || typeof config.showURL !== 'object') {
      if (!!config.showUrl && typeof config.showUrl === 'object') {
        config.showURL = config.showUrl;
      }
      else {
        config.showURL = {};
      }
    }
    if (!config.showLinks || typeof config.showLinks !== 'object') {
      config.showLinks = {};
    }

    // Setup the properties
    this.searchBar  = new SearchBarConfig(config.searchSettings);
    this.questions  = new QuestionsConfig(config.questionFormat);
    this.prettifier = new PrettyConfig(config.prettifyFormat);
    this.url        = new UrlConfig(config.showURL);
    this.links      = new LinksConfig(config.showLinks);

    Object.freeze(this.searchBar);
    Object.freeze(this.questions);
    Object.freeze(this.prettifier);
    Object.freeze(this.url);
    Object.freeze(this.links);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Config.prototype.constructor = Config;
