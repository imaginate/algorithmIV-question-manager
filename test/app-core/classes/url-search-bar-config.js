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
     * Protected Property (UrlSearchBarConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option in the url.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (UrlSearchBarConfig.category)
     * -----------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Public Method (UrlSearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} part - The name of the setting to get.
     * @return {?boolean}
     */
    this.get = function(part) {
      /** @private */
      var result;
      /** @private */
      var settings = {
        id      : id,
        category: category
      };

      result = (settings[part] !== undefined) ? settings[part] : null;
      return result;
    };


    // Set the properties
    id       = (config.id       !== false);
    category = (config.category !== false);
  };

  // Ensure constructor is set to this class.
  UrlSearchBarConfig.prototype.constructor = UrlSearchBarConfig;
