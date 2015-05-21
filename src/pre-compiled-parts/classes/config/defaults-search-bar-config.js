  /**
   * -----------------------------------------------------
   * Public Class (DefaultsSearchBarConfig)
   * -----------------------------------------------------
   * @desc The onLoad search defaults for this app.
   * @constructor
   */
  var DefaultsSearchBarConfig = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    startID = 0;
    view    = 'one';
    order   = 'asc';
    stage   = 'all';
    source  = 'all';
    mainCat = 'all';
    subCat  = 'all';

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from DefaultsSearchBarConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(string|number)} The property's value.
     */
    this.get = function(prop) {

      /** @type {Object<string, (string|number)>} */
      var props = {
        startID: startID,
        view   : view,
        order  : order,
        stage  : stage,
        source : source,
        mainCat: mainCat,
        subCat : subCat
      };

      return getter.call(props, prop);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.set)
     * -----------------------------------------------
     * @desc Sets a protected property's value for DefaultsSearchBarConfig.
     * @param {string} prop - The name of the property to set.
     * @param {(string|number)} val - The value to set the property to.
     * @return {boolean} The setter's success.
     */
    this.set = function(prop, val) {

      /** @type {Object<string, function(*): boolean>} */
      var setters = {
        startID: function(val) { startID = val; return true; },
        view   : function(val) { view    = val; return true; },
        order  : function(val) { order   = val; return true; },
        stage  : function(val) { stage   = val; return true; },
        source : function(val) { source  = val; return true; },
        mainCat: function(val) { mainCat = val; return true; },
        subCat : function(val) { subCat  = val; return true; }
      };

      return setter.call(setters, prop, val);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  DefaultsSearchBarConfig.prototype.constructor = DefaultsSearchBarConfig;

  /**
   * ---------------------------------------------------------
   * Public Method (DefaultsSearchBarConfig.prototype.update)
   * ---------------------------------------------------------
   * @desc Sets the search defaults to the user's settings.
   * @param {Object} defaults - The user's search defaults.
   * @param {!Object<string, stringMap>} names - The available search ids and names.
   * @param {!Object} ids - The available sub category ids.
   * @param {number} quesLen - The number of user's questions.
   */
  DefaultsSearchBarConfig.prototype.update = function(defaults, names,
                                                      ids, quesLen) {

    /** @type {number} */
    var i;
    /** @type {!Array<*>} */
    var args;
    /** @type {string} */
    var prop;
    /** @type {!Array<string>} */
    var props;
    /** @type {(number|string)} */
    var startID;
    /** @type {string} */
    var mainCat;

    args = [ defaults, 'object', names, 'object', ids, 'object' ];
    args.push(quesLen, 'number');
    checkArgs.apply(null, args);

    // Check the user supplied defaults
    if ( !checkType(defaults, '!object') ) {
      defaults = {};
    }

    // Set the view, order, stage, source, & main category
    props = 'view order stage source mainCat'.split(' ');
    i = props.length;
    while (i--) {
      prop = props[i];
      if (checkType(defaults[ prop ], 'string') &&
          hasOwnProp(names[ prop ], defaults[ prop ])) {
        this.set(prop, defaults[ prop ]);
      }
    }

    // Set the startID
    if ( checkType(defaults.startID, 'number|string') ) {
      startID = defaults.startID;
      if ( checkType(startID, 'string') ) {
        startID = startID.replace(/[^0-9]/g, '');
        startID = startID && Number(startID);
      }
      if (startID && startID <= quesLen) {
        this.set('startID', startID);
      }
    }

    // Set the sub category
    if (checkType(defaults.subCat, 'string') && defaults.subCat !== 'all' &&
        hasOwnProp(names.subCat, defaults.subCat)) {
      mainCat = this.get('mainCat');
      if (mainCat === 'all') {
        this.set('subCat', defaults.subCat);
      }
      else {
        if (ids.subCat[ mainCat ].indexOf(defaults.subCat) !== -1) {
          this.set('subCat', defaults.subCat);
        }
      }
    }

  };
