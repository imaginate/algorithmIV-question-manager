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

    /**
     * ---------------------------------------------------
     * Public Property (AppFlags.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the AppFlags class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'AppFlags',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', pass);
    this.debug.args('init', pass, 'boolean');

    /**
     * ----------------------------------------------- 
     * Protected Property (AppFlags.initArgs)
     * -----------------------------------------------
     * @desc Indicates whether the app was initialized with correct arguments.
     * @type {boolean}
     * @private
     */
    var initArgs;

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.get)
     * -----------------------------------------------
     * @desc Gets a flag.
     * @param {string} prop - The name of the flag to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var flags = {
        initArgs: initArgs
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', flags.hasOwnProperty(prop), errorMsg, prop);

      return flags[prop];
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.set)
     * -----------------------------------------------
     * @desc Sets a flag.
     * @param {string} prop - The name of the flag to set.
     * @param {boolean} val - The value to set the flag to.
     */
    this.set = function(prop, val) {

      // Debugging vars
      var errorMsg;
      this.debug.start('set', prop, val);
      this.debug.args('set', prop, 'string', val, 'boolean');

      /** @private */
      var flags = {
        initArgs: function () {
          initArgs = val;
        }
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', flags.hasOwnProperty(prop), errorMsg, prop);

      flags[prop]();
    };
    Object.freeze(this.set);


    // Setup the properties
    initArgs = pass;
  };

  // Ensure constructor is set to this class.
  AppFlags.prototype.constructor = AppFlags;
