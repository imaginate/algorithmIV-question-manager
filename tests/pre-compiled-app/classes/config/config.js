  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {?Object} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    config = (!!config) ? config : {};

    config.searchSettings = ( (!!config.searchSettings) ?
      config.searchSettings : {}
    );
    config.questionFormat = ( (!!config.questionFormat) ?
      config.questionFormat : {}
    );
    config.prettyCode = ( (!!config.prettyCode) ?
      config.prettyCode : {}
    );
    config.showURL = ( (!!config.showURL) ?
      config.showURL : {}
    );
    config.showLinks = ( (!!config.showLinks) ?
      config.showLinks : {}
    );

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


    // Setup the properties
    this.searchBar  = new SearchBarConfig(config.searchSettings);
    this.questions  = new QuestionsConfig(config.questionFormat);
    this.prettifier = new PrettyConfig(config.prettyCode);
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
