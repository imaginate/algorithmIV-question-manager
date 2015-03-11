  /**
   * -----------------------------------------------------
   * Public Class (DefaultsSearchBarConfig)
   * -----------------------------------------------------
   * @desc The on-load search defaults for this app.
   * @param {Object} defaults - The user's search defaults.
   * @param {Object} ids - The available search ids.
   * @param {number} quesLen - The number of user's questions.
   * @constructor
   */
  var DefaultsSearchBarConfig = function(defaults, ids, quesLen) {

    /**
     * @type {number}
     * @private
     */
    var startID;
    /**
     * @type {string}
     * @private
     */
    var view;
    /**
     * @type {string}
     * @private
     */
    var order;
    /**
     * @type {string}
     * @private
     */
    var stage;
    /**
     * @type {string}
     * @private
     */
    var source;
    /**
     * @type {string}
     * @private
     */
    var mainCat;
    /**
     * @type {string}
     * @private
     */
    var subCat;
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    /**
     * ---------------------------------------------------
     * Private Property (DefaultsSearchBarConfig.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('DefaultsSearchBarConfig') : null;

    var args;
    if (DEBUG) {
      this.debug.start('init', defaults, ids, quesLen);
      args = [ 'init' ];
      args.push(defaults, 'object', ids, 'object', quesLen, 'number');
      this.debug.args(args);
    }

    /**
     * ---------------------------------------------------
     * Public Property (DefaultsSearchBarConfig.startID)
     * ---------------------------------------------------
     * @desc The first question to display.
     * @return {boolean}
     */
    this.startID = function() {
      return startID;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (DefaultsSearchBarConfig.view)
     * -----------------------------------------------
     * @desc The search view option to load the app with.
     * @return {boolean}
     */
    this.view = function() {
      return view;
    };

    /**
     * ------------------------------------------------- 
     * Public Property (DefaultsSearchBarConfig.order)
     * -------------------------------------------------
     * @desc The search order option to load the app with.
     * @return {boolean}
     */
    this.order = function() {
      return order;
    };

    /**
     * ------------------------------------------------
     * Public Property (DefaultsSearchBarConfig.stage)
     * ------------------------------------------------
     * @desc The search stage option to load the app with.
     * @return {boolean}
     */
    this.stage = function() {
      return stage;
    };

    /**
     * ------------------------------------------------
     * Public Property (DefaultsSearchBarConfig.source)
     * ------------------------------------------------
     * @desc The search source option to load the app with.
     * @return {boolean}
     */
    this.source = function() {
      return source;
    };

    /**
     * ---------------------------------------------------
     * Public Property (DefaultsSearchBarConfig.mainCat)
     * ---------------------------------------------------
     * @desc The search main category option to load the app with.
     * @return {boolean}
     */
    this.mainCat = function() {
      return mainCat;
    };

    /**
     * -------------------------------------------------
     * Public Property (DefaultsSearchBarConfig.subCat)
     * -------------------------------------------------
     * @desc The search sub category option to load the app with.
     * @return {boolean}
     */
    this.subCat = function() {
      return subCat;
    };


    // Set the properties

    startID = ( (typeof defaults.startID === 'number' &&
                 defaults.startID && defaults.startID <= quesLen) ?
      defaults.startID : 0
    );

    view = ( (typeof defaults.view === 'string' &&
              ids.view.indexOf(defaults.view) !== -1) ?
      defaults.view : 'one'
    );

    order = ( (typeof defaults.order === 'string' &&
               ids.order.indexOf(defaults.order) !== -1) ?
      defaults.order : 'asc'
    );

    stage = ( (typeof defaults.stage === 'string' &&
               ids.stage.indexOf(defaults.stage) !== -1) ?
      defaults.stage : 'all'
    );

    source = ( (typeof defaults.source === 'string' &&
                ids.source.indexOf(defaults.source) !== -1) ?
      defaults.source : 'all'
    );

    mainCat = ( (typeof defaults.mainCat === 'string' &&
                 ids.mainCat.indexOf(defaults.mainCat) !== -1) ?
      defaults.mainCat : 'all'
    );

    subCat = 'all';
    // Check the user default for the subCat property
    if (typeof defaults.subCat === 'string' && defaults.subCat !== 'all') {

      if (mainCat === 'all') {
        pass = ids.mainCat.some(function(/** string */ id) {
          return !!ids.subCat[id] &&
                 ids.subCat[id].some(function(/** string */ id) {
            return id === defaults.subCat;
          });
        });
      }
      else {
        pass = !!ids.subCat[mainCat] &&
               ids.subCat[mainCat].some(function(/** string */ id) {
          return id === defaults.subCat;
        });
      }
      if (pass) {
        subCat = defaults.subCat;
      }
    }
  };

  // Ensure constructor is set to this class.
  DefaultsSearchBarConfig.prototype.constructor = DefaultsSearchBarConfig;
