  /**
   * -----------------------------------------------------
   * Public Class (SearchBarConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the search bar in this app.
   * @param {Object} config - The user's search bar config settings.
   * @constructor
   */
  var SearchBarConfig = function(config) {

    config.url = config.url || {};

    /**
     * @type {boolean}
     * @private
     */
    var stage;
    /**
     * @type {boolean}
     * @private
     */
    var source;
    /**
     * @type {boolean}
     * @private
     */
    var category;
    /**
     * @type {boolean}
     * @private
     */
    var subCat;

    /**
     * ---------------------------------------------------
     * Private Property (SearchBarConfig.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('SearchBarConfig') : null;

    if (DEBUG) {
      this.debug.start('init', config);
      this.debug.args('init', config, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.url)
     * -----------------------------------------------
     * @desc Whether to display a search option in the url.
     * @type {UrlSearchBarConfig}
     */
    this.url = new UrlSearchBarConfig(config.url);

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.defaults)
     * -----------------------------------------------
     * @desc The default search options to display upon app init.
     * @type {?DefaultsSearchBarConfig}
     */
    this.defaults = null;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.stage)
     * -----------------------------------------------
     * @desc Whether to display the stage search option.
     * @return {boolean}
     */
    this.stage = function() {
      return stage;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.source)
     * -----------------------------------------------
     * @desc Whether to display the source search option.
     * @return {boolean}
     */
    this.source = function() {
      return source;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.category)
     * -----------------------------------------------
     * @desc Whether to display the category search option.
     * @return {boolean}
     */
    this.category = function() {
      return category;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.subCat)
     * -----------------------------------------------
     * @desc Whether to display the sub category search option.
     * @return {boolean}
     */
    this.subCat = function() {
      return subCat;
    };

    // Set the properties
    stage    = (config.stage    !== false);
    source   = (config.source   !== false);
    category = (config.category !== false);
    subCat   = (config.subCat   !== false);
  };

  // Ensure constructor is set to this class.
  SearchBarConfig.prototype.constructor = SearchBarConfig;

  /**
   * -------------------------------------------------------
   * Public Method (SearchBarConfig.prototype.setDefaults)
   * -------------------------------------------------------
   * @desc Sets the search defaults to the user's settings.
   * @param {Object} defaults - The user's search defaults.
   * @param {Object} ids - The available search ids.
   * @param {number} quesLen - The number of user's questions.
   */
  SearchBarConfig.prototype.setDefaults = function(defaults, ids, quesLen) {

    var args;
    if (DEBUG) {
      this.debug.start('init', defaults, ids, quesLen);
      args = [ 'init' ];
      args.push(defaults, 'object', ids, 'object', quesLen, 'number');
      this.debug.args(args);
    }

    this.defaults = new DefaultsSearchBarConfig(defaults, ids, quesLen);
  };
