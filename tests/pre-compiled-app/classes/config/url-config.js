  /**
   * -----------------------------------------------------
   * Public Class (UrlConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for creating urls for the questions.
   * @param {Object} config - The user's config settings for url searches.
   * @constructor
   */
  var UrlConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (UrlConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the UrlConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'UrlConfig',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

    /**
     * ----------------------------------------------- 
     * Protected Property (UrlConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option in the url.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (UrlConfig.category)
     * -----------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Public Method (UrlConfig.get)
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

      /** @type {Object<string, boolean> */
      var settings = {
        id      : id,
        category: category
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Set the properties
    id       = false;
    category = false;

    if (config.hasOwnProperty(id) && config.id === true) {
      id = true;
    }
    if (config.hasOwnProperty(category) && config.category === true) {
      category = true;
    }
  };

  // Ensure constructor is set to this class.
  UrlConfig.prototype.constructor = UrlConfig;
