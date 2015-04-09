  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {Object<string, (string|num|boolean)>} config - The user's
   *   prettifier config settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    // $s$
    /**
     * ---------------------------------------------------
     * Public Property (PrettyConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the PrettyConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug('PrettyConfig');

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');
    // $e$
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

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {(number|boolean)}
     */
    this.get = function(prop) {

      var debugMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (number|boolean)>} */
      var settings = {
        trimSpace   : trimSpace,
        tabLength   : tabLength,
        commentLinks: commentLinks
      };

      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), debugMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Setup the properties
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
  };

  // Ensure constructor is set to this class.
  PrettyConfig.prototype.constructor = PrettyConfig;
