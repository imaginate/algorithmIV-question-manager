  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {Object<string, (string|number|boolean)>} config - The user's
   *   prettifier configuration settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    this.debug = aIV.debug('PrettyConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.trimSpace)
     * -----------------------------------------------
     * @desc The number of spaces to trim from the beginning of lines.
     * @type {number}
     * @private
     */
    var trimSpace;

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.tabLength)
     * -----------------------------------------------
     * @desc The number of spaces to convert tab characters.
     * @type {number}
     * @private
     */
    var tabLength;

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.commentLinks)
     * -----------------------------------------------
     * @desc Whether to allow links in prettified comments.
     * @type {boolean}
     * @private
     */
    var commentLinks;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    trimSpace = 0;
    tabLength = 2;
    commentLinks = false;

    if ( config.hasOwnProperty('trimSpace') ) {
      if (typeof config.trimSpace === 'number' && config.trimSpace >= 0) {
        trimSpace = Math.floor(config.trimSpace);
      }
      else if (typeof config.trimSpace === 'string') {
        trimSpace = Number( config.trimSpace.replace(/[^0-9]/g, '') );
      }
    }
    if ( config.hasOwnProperty('tabLength') ) {
      if (typeof config.tabLength === 'number') {
        tabLength = config.tabLength;
      }
      else if (typeof config.tabLength === 'string') {
        tabLength = Number( config.tabLength.replace(/[^0-9]/g, '') );
      }
    }
    if (config.hasOwnProperty('commentLinks') && config.commentLinks === true) {
      commentLinks = true;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from PrettyConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(number|boolean)}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (number|boolean)>} */
      var props = {
        trimSpace   : trimSpace,
        tabLength   : tabLength,
        commentLinks: commentLinks
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

  PrettyConfig.prototype.constructor = PrettyConfig;
