  /**
   * -----------------------------------------------------
   * Public Class (AppFlags)
   * -----------------------------------------------------
   * @desc The flags that explain states of the environment in the app.
   * @param {boolean} pass - Indicates whether the user's supplied settings
   *   were the correct data types.
   * @constructor
   */
  var AppFlags = function(pass) {

    this.debug = aIV.debug('AppFlags');

    this.debug.start('init', pass);

    this.debug.args('init', pass, 'boolean');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (AppFlags.initArgs)
     * -----------------------------------------------
     * @desc Indicates whether the app was initialized with correct arguments.
     * @type {boolean}
     * @private
     */
    var initArgs;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    initArgs = pass;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.get)
     * -----------------------------------------------
     * @desc Gets a flag.
     * @param {string} prop - The name of the flag to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var flags = {
        initArgs: initArgs
      };

      debugCheck = flags.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return flags[ prop ];
    };

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.set)
     * -----------------------------------------------
     * @desc Sets a flag.
     * @param {string} prop - The name of the flag to set.
     * @param {boolean} val - The value to set the flag to.
     */
    this.set = function(prop, val) {

      this.debug.start('set', prop, val);
      this.debug.args('set', prop, 'string', val, 'boolean');

      /** @type {Object<string, function>} */
      var flags = {
        initArgs: function () { initArgs = val; }
      };

      debugCheck = flags.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      flags[ prop ]();
    };

    // Freeze all of the methods
    Object.freeze(this.get);
    Object.freeze(this.set);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  AppFlags.prototype.constructor = AppFlags;
