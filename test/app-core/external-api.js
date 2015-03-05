  /**
   * -----------------------------------------------------
   * Public Variable (_core)
   * -----------------------------------------------------
   * @desc Holds the public methods for the core module
   * @typedef {{
   *   init: function(?Object, ?Object, ?Object, ?Object)
   * }}
   * @struct
   */
  var _core = {};

  /**
   * -----------------------------------------------------
   * Private Variable (_initialized)
   * -----------------------------------------------------
   * @desc Indicates whether the app has been initialized
   * @type {boolean}
   * @private
   */
  var _initialized = false;

  /**
   * -----------------------------------------------------
   * Public Method (_core.init)
   * -----------------------------------------------------
   * @desc Initializes the app
   * @param {?Object} config - The user's settings
   * @param {?Object} sources - The user's settings
   * @param {?Object} categories - The user's settings
   * @param {?Object} questions - The user's settings
   */
  _core.init = function(config, sources, categories, questions) {
    if (!_initialized) {
      _initialized = true;
      app = new App(config, sources, categories, questions);
    }
  };
