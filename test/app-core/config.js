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
     * @type {Object}
     * @private
     */
    var settings;

    /**
     * ---------------------------------------------------
     * Private Property (Config._debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this._debug = (DEBUG) ? new Debug('Config') : null;

    if (DEBUG) {
      this._debug.group('init', 'coll', 'config', config);
      this._debug.start('init', config);
      this._debug.args('init', config, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Config.searchBar)
     * -----------------------------------------------
     * @desc The search bar's configuration settings.
     * @type {{
     *   stage   : boolean,
     *   source  : boolean,
     *   category: boolean,
     *   subCat  : boolean,
     *   defaults: {
     *     view   : string,
     *     order  : string,
     *     stage  : string,
     *     source : string,
     *     mainCat: string,
     *     subCat : string,
     *     startID: number
     *   }
     * }}
     */
    this.searchBar = {
      stage   : true,
      source  : true,
      category: true,
      subCat  : true,
      defaults: {
        view   : 'one',
        order  : 'asc',
        stage  : 'all',
        source : 'all',
        mainCat: 'all',
        subCat : 'all',
        startID: 0
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Config.questions)
     * -----------------------------------------------
     * @desc The question's formatting settings.
     * @type {{
     *   id      : boolean,
     *   complete: boolean,
     *   source  : boolean,
     *   category: boolean,
     *   links   : boolean,
     *   output  : boolean
     * }}
     */
    this.questions = {
      id      : true,
      complete: true,
      source  : true,
      category: true,
      links   : true,
      output  : true
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Config.prettify)
     * -----------------------------------------------
     * @desc The prettifier's settings.
     * @type {{
     *   olHeight: number,
     *   liHeight: number
     * }}
     */
    this.prettify = {
      olHeight: 0,
      liHeight: 0
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Config.linkID)
     * -----------------------------------------------
     * @desc Indicates if the question's id should be linked.
     * @type {boolean}
     */
    this.linkID = true;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.worker)
     * -----------------------------------------------
     * @desc Indicates if the questions should be formatted
     *   with the web worker.
     * @type {boolean}
     */
    this.worker = true;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.scrollbar)
     * -----------------------------------------------
     * @desc The width/height of the browser's scrollbar.
     * @type {number}
     */
    this.scrollbar = 0;

    // Add the user's search settings
    if (config && !!config.searchSettings) {

      settings = config.searchSettings;

      if (typeof settings.stage === 'boolean') {
        this.searchBar.stage = settings.stage;
      }

      if (typeof settings.source === 'boolean') {
        this.searchBar.source = settings.source;
      }

      if (typeof settings.category === 'boolean') {
        this.searchBar.category = settings.category;
      }

      if (this.searchBar.category &&
          typeof settings.subCat === 'boolean') {
        this.searchBar.subCat = settings.subCat;
      }
    }

    // Add the user's question format settings
    if (config && !!config.questionFormat) {

      settings = config.questionFormat;

      if (typeof settings.id === 'boolean') {
        this.questions.id = settings.id;
      }

      if (typeof settings.complete === 'boolean') {
        this.questions.complete = settings.complete;
      }

      if (typeof settings.source === 'boolean') {
        this.questions.source = settings.source;
      }

      if (typeof settings.category === 'boolean') {
        this.questions.category = settings.category;
      }

      if (typeof settings.links === 'boolean') {
        this.questions.links = settings.links;
      }

      if (typeof settings.output === 'boolean') {
        this.questions.output = settings.output;
      }
    }

    // Add the user's general settings
    if (typeof config.id === 'boolean') {
      this.linkID = config.id;
    }

    if (typeof config.linkID === 'boolean') {
      this.linkID = config.linkID;
    }

    if (typeof config.worker === 'boolean') {
      this.worker = config.worker;
    }

    DEBUG && this._debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Config.prototype.constructor = Config;
