  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {Object} config - The user's prettifier config settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (PrettyConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the PrettyConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'PrettyConfig',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.)
     * -----------------------------------------------
     * @desc .
     * @type {boolean}
     * @private
     */
    var _;

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
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

      /** @type {Object} */
      var settings = {};

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Set the properties
    
  };

  // Ensure constructor is set to this class.
  PrettyConfig.prototype.constructor = PrettyConfig;
