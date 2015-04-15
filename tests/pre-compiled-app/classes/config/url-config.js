/* -------------------------------------------------------------------------- *
 * ------- AS OF VERSION 1.1.1 THE URL CONFIG CLASS WAS DISCONTINUED -------- *
 * -------------------------------------------------------------------------- *
 * Due to the increased complexity in usability that url updates cost and the *
 * lack of perceived benefits this class development has been discontinued.   *
 * -------------------------------------------------------------------------- *
 * In case development for dynamic url updates is brought back the previous   *
 * development completed can be found below.                                  *
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (UrlConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for creating urls for the questions.
   * @param {Object} config - The user's config settings for url searches.
   * @constructor
   */
  var UrlConfig = function(config) {

    this.debug = aIV.debug('UrlConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    id       = false;
    category = false;

    if (config.hasOwnProperty('id') && config.id === true) {
      id = true;
    }
    if (config.hasOwnProperty('category') && config.category === true) {
      category = true;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (UrlConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from UrlConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var props = {
        id      : id,
        category: category
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    // Freeze all of the methods
    Object.freeze(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  UrlConfig.prototype.constructor = UrlConfig;
