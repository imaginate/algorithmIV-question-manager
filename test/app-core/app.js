  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?Object} config - The user's settings
   * @param {?Object} sources - The user's settings
   * @param {?Object} categories - The user's settings
   * @param {?Object} questions - The user's settings
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {Sources}
     */
    this.sources = new Sources(sources);

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {Categories}
     */
    this.categories = new Categories(categories);

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {Config}
     */
    this.config = new Config(config);

    /**
     * ---------------------------------------------------
     * Public Property (App.)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions = new Questions(questions);
  };
