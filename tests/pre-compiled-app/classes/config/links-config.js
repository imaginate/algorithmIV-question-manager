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

    this.debug = aIV.debug('LinksConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    id       = true;
    source   = false;
    category = true;

    if (config.hasOwnProperty('id') && config.id === false) {
      id = false;
    }
    if (config.hasOwnProperty('source') && config.source === true) {
      source = true;
    }
    if (config.hasOwnProperty('category') && config.category === false) {
      category = false;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (LinksConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from LinksConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var props = {
        id      : id,
        source  : source,
        category: category
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    // Freeze all of the methods
    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  LinksConfig.prototype.constructor = LinksConfig;
