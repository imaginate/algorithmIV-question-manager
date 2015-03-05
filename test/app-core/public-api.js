  /**
   * ---------------------------------------------------
   * Global Variable (aIV)
   * ---------------------------------------------------
   * @desc Holds the publically available api
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Method (aIV.app)
   * ---------------------------------------------------
   * @desc Initializes this app
   * @param {?Object} config - The user's settings
   * @param {?Object} sources - The user's settings
   * @param {?Object} categories - The user's settings
   * @param {?Object} questions - The user's settings
   * @global
   */
  aIV.app = function(config, sources, categories, questions) {
    core.init(config, sources, categories, questions);
  };
