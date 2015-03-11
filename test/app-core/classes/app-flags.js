  /**
   * -----------------------------------------------------
   * Public Class (AppFlags)
   * -----------------------------------------------------
   * @desc The flags that explain states of the environment in the app.
   * @param {boolean} pass - Indicates whether the user's supplied settings
   *   were the correct operands.
   * @constructor
   */
  var AppFlags = function(pass) {

    /**
     * @type {boolean}
     * @private
     */
    var initArgs;

    /**
     * ---------------------------------------------------
     * Private Property (AppFlags.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('AppFlags') : null;

    if (DEBUG) {
      this.debug.start('init', pass);
      this.debug.args('init', pass, 'boolean');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (AppFlags.initArgs)
     * -----------------------------------------------
     * @desc Indicates whether the app was initialized with correct arguments.
     * @return {boolean}
     */
    this.initArgs = function() {
      return initArgs;
    };


    // Set the properties
    initArgs = pass;
  };

  // Ensure constructor is set to this class.
  AppFlags.prototype.constructor = AppFlags;
