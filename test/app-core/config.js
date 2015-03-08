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
     * @struct
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
     * @struct
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
     *   _: ?
     * }}
     * @struct
     */
    this.prettify = {
      //key: null
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

    if (!!window.Worker) {
      this.worker = false;
    }

    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Config.prototype.constructor = Config;

  /**
   * -----------------------------------------------------
   * Public Method (Config.prototype.setSearchDefaults)
   * -----------------------------------------------------
   * @desc Sets the search defaults to the user's settings.
   * @param {?Object} defaults - The user's search defaults.
   * @param {?SearchBar} searchBar - The search bar hash map.
   * @param {number} quesLen - The number of user's questions.
   */
  Config.prototype.setSearchDefaults = function(defaults, searchBar, quesLen) {

    var args;
    if (DEBUG) {
      this.debug.start('setSearchDefaults', defaults, searchBar);
      args = [ 'setSearchDefaults' ];
      args.push(defaults, '?object', searchBar, '?object');
      this.debug.args(args);
    }

    /**
     * @type {boolean}
     * @private
     */
    var pass;

    if (typeof defaults.view === 'string' &&
        searchBar.ids.view.indexOf(defaults.view) !== -1) {
      this.searchBar.defaults.view = defaults.view;
    }

    if (typeof defaults.order === 'string' &&
        searchBar.ids.order.indexOf(defaults.order) !== -1) {
      this.searchBar.defaults.order = defaults.order;
    }

    if (typeof defaults.stage === 'string' &&
        searchBar.ids.stage.indexOf(defaults.stage) !== -1) {
      this.searchBar.defaults.stage = defaults.stage;
    }

    if (typeof defaults.source === 'string' && this.searchBar.source &&
        searchBar.ids.source.indexOf(defaults.source) !== -1) {
      this.searchBar.defaults.source = defaults.source;
    }

    if (typeof defaults.mainCat === 'string' && this.searchBar.category &&
        searchBar.ids.mainCat.indexOf(defaults.mainCat) !== -1) {
      this.searchBar.defaults.mainCat = defaults.mainCat;
    }

    if (typeof defaults.subCat === 'string' && this.searchBar.subCat &&
        defaults.subCat !== 'all') {

      if (this.searchBar.defaults.mainCat === 'all') {
        pass = searchBar.ids.mainCat.some(function(/** string */ id) {
          return !!searchBar.ids.subCat[id] &&
                 searchBar.ids.subCat[id].some(function(/** string */ id) {
            return id === defaults.subCat;
          });
        });
      }
      else {
        pass = !!searchBar.ids.subCat[this.searchBar.defaults.mainCat] &&
               searchBar.ids.subCat[this.searchBar.defaults.mainCat].
               some(function(/** string */ id) {
          return id === defaults.subCat;
        });
      }
      if (!!pass) {
        this.searchBar.defaults.subCat = defaults.subCat;
      }
    }

    if (typeof defaults.startID === 'number' && defaults.startID > 0 &&
        defaults.startID <= quesLen) {
      this.searchBar.defaults.startID = defaults.startID;
    }
  };
