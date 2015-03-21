  /**
   * -----------------------------------------------------
   * Public Class (LinksSearchBarConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for whether to show search links for
   *   portions of each question.
   * @param {Object} config - The user's config settings for search link
   *   formatting.
   * @constructor
   */
  var LinksSearchBarConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Private Property (LinksSearchBarConfig.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('LinksSearchBarConfig') : null;

    if (DEBUG) {
      this.debug.start('init', config);
      this.debug.args('init', config, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Protected Property (LinksSearchBarConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option for every question.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ------------------------------------------------- 
     * Protected Property (LinksSearchBarConfig.source)
     * -------------------------------------------------
     * @desc Whether to display a source search option for every question.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------------
     * Protected Property (LinksSearchBarConfig.category)
     * ----------------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Public Method (LinksSearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} part - The name of the setting to get.
     * @return {?boolean}
     */
    this.get = function(part) {
      /** @private */
      var settings = {
        id      : id,
        source  : source,
        category: category
      };
 
      return ( settings.hasOwnProperty(part) ) ? settings[part] : null;
    };


    // Set the properties
    id       = (config.id       !== false);
    category = (config.category !== false);
  };

  // Ensure constructor is set to this class.
  LinksSearchBarConfig.prototype.constructor = LinksSearchBarConfig;
