  /**
   * -----------------------------------------------------
   * Public Class (DefaultsSearchBarConfig)
   * -----------------------------------------------------
   * @desc The onLoad search defaults for this app.
   * @param {Object} defaults - The user's search defaults.
   * @param {Object} names - The available search option names.
   * @param {Object} ids - The available sub category ids.
   * @param {number} quesLen - The number of questions for this app.
   * @constructor
   */
  var DefaultsSearchBarConfig = function(defaults, names, ids, quesLen) {

    /**
     * ---------------------------------------------------
     * Private Property (DefaultsSearchBarConfig.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('DefaultsSearchBarConfig') : null;

    var args;
    if (DEBUG) {
      this.debug.start('init', defaults, names, ids, quesLen);
      args = [ 'init' ];
      args.push(defaults, 'object', names, 'object');
      args.push(ids, 'object', quesLen, 'number');
      this.debug.args(args);
    }

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
     * @param {string} part - The name of the setting to get.
     * @return {(string|number)}
     */
    this.get = function(part) {
      /** @private */
      var result;
      /** @private */
      var settings = {
        startID: startID,
        view   : view,
        order  : order,
        stage  : stage,
        source : source,
        mainCat: mainCat,
        subCat : subCat
      };

      result = (settings[part] !== undefined) ? settings[part] : null;
      return result;
    };


    // Set the properties

    startID = ( (typeof defaults.startID === 'number' &&
                 defaults.startID && defaults.startID <= quesLen) ?
      defaults.startID : 0
    );

    view = ( (typeof defaults.view === 'string' &&
              !!names.view[defaults.view]) ?
      defaults.view : 'one'
    );

    order = ( (typeof defaults.order === 'string' &&
               !!names.order[defaults.order]) ?
      defaults.order : 'asc'
    );

    stage = ( (typeof defaults.stage === 'string' &&
               !!names.stage[defaults.stage]) ?
      defaults.stage : 'all'
    );

    source = ( (typeof defaults.source === 'string' &&
                !!names.source[defaults.source]) ?
      defaults.source : 'all'
    );

    mainCat = ( (typeof defaults.mainCat === 'string' &&
                 !!names.mainCat[defaults.mainCat]) ?
      defaults.mainCat : 'all'
    );

    subCat = 'all';
    // Check the user default for the subCat property
    if (typeof defaults.subCat === 'string' && defaults.subCat !== 'all') {

      if (!!names.subCat[defaults.subCat]) {
        if (mainCat === 'all') {
          subCat = defaults.subCat;
        }
        else {
          if (ids.subCat[mainCat].indexOf(defaults.subCat) !== -1) {
            subCat = defaults.subCat;
          }
        }
      }
    }
  };

  // Ensure constructor is set to this class.
  DefaultsSearchBarConfig.prototype.constructor = DefaultsSearchBarConfig;
