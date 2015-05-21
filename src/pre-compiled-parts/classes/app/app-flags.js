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

    checkArgs(pass, 'boolean');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (AppFlags.initArgs)
     * -----------------------------------------------
     * @desc Indicates whether the app was initialized with correct arguments.
     * @type {boolean}
     * @private
     */
    var initArgs = pass;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.get)
     * -----------------------------------------------
     * @desc Gets an AppFlags protected property.
     * @param {string} prop - The name of the flag to get.
     * @return {boolean} The flag's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        initArgs: initArgs
      };

      return getter.call(props, prop);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.set)
     * -----------------------------------------------
     * @desc Sets an AppFlags protected property.
     * @param {string} prop - The name of the flag to set.
     * @param {boolean} val - The value to set the flag to.
     * @return {boolean} The setter's success.
     */
    this.set = function(prop, val) {

      /** @type {Object<string, function(*): boolean>} */
      var setters = {
        initArgs: function(val) {
          initArgs = val;
          return checkType(val, 'boolean');
        }
      };

      return setter.call(setters, prop, val);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  AppFlags.prototype.constructor = AppFlags;
