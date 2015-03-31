  /**
   * -----------------------------------------------------
   * Public Class (LinksConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for whether to show search links for
   *   portions of each question.
   * @param {Object} config - The user's config settings for search link
   *   formatting.
   * @constructor
   */
  var LinksConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (LinksConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the LinksConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'LinksConfig',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

    /**
     * ----------------------------------------------- 
     * Protected Property (LinksConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option for every question.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ------------------------------------------------- 
     * Protected Property (LinksConfig.source)
     * -------------------------------------------------
     * @desc Whether to display a source search option for every question.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------------
     * Protected Property (LinksConfig.category)
     * ----------------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Public Method (LinksConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var settings = {
        id      : id,
        source  : source,
        category: category
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Set the properties
    id       = true;
    source   = false;
    category = true;

    if (config.hasOwnProperty(id) && config.id === false) {
      id = false;
    }
    if (config.hasOwnProperty(source) && config.source === true) {
      source = true;
    }
    if (config.hasOwnProperty(category) && config.category === false) {
      category = false;
    }
  };

  // Ensure constructor is set to this class.
  LinksConfig.prototype.constructor = LinksConfig;
