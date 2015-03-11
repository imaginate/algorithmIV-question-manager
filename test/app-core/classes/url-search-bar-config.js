  /**
   * -----------------------------------------------------
   * Public Class (UrlSearchBarConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the search bar's use of the url.
   * @param {Object} config - The user's config settings for url searches.
   * @constructor
   */
  var UrlSearchBarConfig = function(config) {

    /**
     * @type {boolean}
     * @private
     */
    var id;
    /**
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ---------------------------------------------------
     * Private Property (UrlSearchBarConfig.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('UrlSearchBarConfig') : null;

    if (DEBUG) {
      this.debug.start('init', config);
      this.debug.args('init', config, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (UrlSearchBarConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option in the url.
     * @return {boolean}
     */
    this.id = function() {
      return id;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (UrlSearchBarConfig.category)
     * -----------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @return {boolean}
     */
    this.category = function() {
      return category;
    };


    // Set the properties
    id       = (config.id       !== false);
    category = (config.category !== false);
  };

  // Ensure constructor is set to this class.
  UrlSearchBarConfig.prototype.constructor = UrlSearchBarConfig;
