  /**
   * -----------------------------------------------------
   * Public Class (DefaultsSearchBarConfig)
   * -----------------------------------------------------
   * @desc The onLoad search defaults for this app.
   * @constructor
   */
  var DefaultsSearchBarConfig = function() {

    // $s$
    /**
     * ---------------------------------------------------
     * Public Property (DefaultsSearchBarConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the DefaultsSearchBarConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug('DefaultsSearchBarConfig');

    this.debug.start('init');
    // $e$

    /**
     * ---------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.startID)
     * ---------------------------------------------------
     * @desc The first question to display.
     * @type {number}
     * @private
     */
    var startID;

    /**
     * ----------------------------------------------- 
     * Protected Property (DefaultsSearchBarConfig.view)
     * -----------------------------------------------
     * @desc The search view option to load the app with.
     * @type {string}
     * @private
     */
    var view;

    /**
     * ------------------------------------------------- 
     * Protected Property (DefaultsSearchBarConfig.order)
     * -------------------------------------------------
     * @desc The search order option to load the app with.
     * @type {string}
     * @private
     */
    var order;

    /**
     * ------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.stage)
     * ------------------------------------------------
     * @desc The search stage option to load the app with.
     * @type {string}
     * @private
     */
    var stage;

    /**
     * ------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.source)
     * ------------------------------------------------
     * @desc The search source option to load the app with.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ---------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.mainCat)
     * ---------------------------------------------------
     * @desc The search main category option to load the app with.
     * @type {string}
     * @private
     */
    var mainCat;

    /**
     * -------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.subCat)
     * -------------------------------------------------
     * @desc The search sub category option to load the app with.
     * @type {string}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {(string|number)}
     */
    this.get = function(prop) {

      var debugMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (string|number)>} */
      var settings = {
        startID: startID,
        view   : view,
        order  : order,
        stage  : stage,
        source : source,
        mainCat: mainCat,
        subCat : subCat
      };

      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), debugMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.set)
     * -----------------------------------------------
     * @desc Sets a config setting.
     * @param {string} prop - The name of the setting to set.
     * @param {(string|number)} val - The value to set the
     *   property to.
     */
    this.set = function(prop, val) {

      var debugMsg;
      this.debug.start('set', prop, val);
      this.debug.args('set', prop, 'string', val, 'string|number');

      /** @private */
      var settings = {
        startID: function() { startID = val; },
        view   : function() { view    = val; },
        order  : function() { order   = val; },
        stage  : function() { stage   = val; },
        source : function() { source  = val; },
        mainCat: function() { mainCat = val; },
        subCat : function() { subCat  = val; }
      };

      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('set', settings.hasOwnProperty(prop), debugMsg, prop);

      settings[prop]();
    };
    Object.freeze(this.set);


    // Setup the properties
    startID = 0;
    view    = 'one';
    order   = 'asc';
    stage   = 'all';
    source  = 'all';
    mainCat = 'all';
    subCat  = 'all';
  };

  // Ensure constructor is set to this class.
  DefaultsSearchBarConfig.prototype.constructor = DefaultsSearchBarConfig;

  /**
   * ---------------------------------------------------------
   * Public Method (DefaultsSearchBarConfig.prototype.update)
   * ---------------------------------------------------------
   * @desc Sets the search defaults to the user's settings.
   * @param {Object} defaults - The user's search defaults.
   * @param {Object} names - The available search ids and names.
   * @param {Object} ids - The available sub category ids.
   * @param {number} quesLen - The number of user's questions.
   */
  DefaultsSearchBarConfig.prototype.update = function(defaults, names,
                                                      ids, quesLen) {
    var debugArgs;
    this.debug.start('update', defaults, names, ids, quesLen);
    debugArgs = [ 'update' ];
    debugArgs.push(defaults, 'object', names, 'object');
    debugArgs.push(ids, 'object', quesLen, 'number');
    this.debug.args(debugArgs);

    // Check the user supplied defaults
    if (!defaults || typeof defaults !== 'object') {
      defaults = {};
    }

    // Set the startID
    if (!!defaults.startID && typeof defaults.startID === 'number' &&
        defaults.startID <= quesLen) {
      this.set('startID', defaults.startID);
    }

    // Set the view
    if (!!defaults.view && typeof defaults.view === 'string' &&
        !!names.view[defaults.view]) {
      this.set('view', defaults.view);
    }

    // Set the order
    if (!!defaults.order && typeof defaults.order === 'string' &&
        !!names.order[defaults.order]) {
      this.set('order', defaults.order);
    }

    // Set the stage
    if (!!defaults.stage && typeof defaults.stage === 'string' &&
        !!names.stage[defaults.stage]) {
      this.set('stage', defaults.stage);
    }

    // Set the source
    if (!!defaults.source && typeof defaults.source === 'string' &&
        !!names.source[defaults.source]) {
      this.set('source', defaults.source);
    }

    // Set the main category
    if (!!defaults.mainCat && typeof defaults.mainCat === 'string' &&
        !!names.mainCat[defaults.mainCat]) {
      this.set('mainCat', defaults.mainCat);
    }

    // Set the sub category
    if (!!defaults.subCat && typeof defaults.subCat === 'string' &&
        defaults.subCat !== 'all' && !!names.subCat[defaults.subCat]) {
      if (this.get('mainCat') === 'all') {
        this.set('subCat', defaults.subCat);
      }
      else {
        if (ids.subCat[this.get('mainCat')].indexOf(defaults.subCat) !== -1) {
          this.set('subCat', defaults.subCat);
        }
      }
    }
  };
