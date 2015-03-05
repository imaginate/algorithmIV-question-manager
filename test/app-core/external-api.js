  /**
   * -----------------------------------------------------
   * Private Variable (_core)
   * -----------------------------------------------------
   * @desc Holds the public methods for the core module.
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
   * @desc Indicates whether the app has been initialized.
   * @type {boolean}
   * @private
   */
  var _initialized = false;

  /**
   * -----------------------------------------------------
   * Public Method (_core.init)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {?Object} config - The user's config settings.
   * @param {?Object} sources - The user's sources.
   * @param {?Object} categories - The user's categories.
   * @param {?Object} questions - The user's questions.
   */
  _core.init = function(config, sources, categories, questions) {

    DEBUG && _debug.args('init', config, 'object', sources, 'object',
                          categories, 'object', questions, 'object');
    DEBUG && _debug.fail('init', !_initialized,
                         'A second attempt to init this app occurred.');
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    pass = (typeof config === 'object') && (typeof categories === 'object') &&
           (typeof sources === 'object') && (typeof questions === 'object') &&
           (!_initialized);

    if (pass) {
      DEBUG && _debug.group('init', true, 'config', config, 'sources', sources,
                            'categories', categories, 'questions', questions);
      _initialized = true;
      app = new App(config, sources, categories, questions);
    }
  };
