  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?Object} config - The user's config settings.
   * @param {?Object} sources - The user's sources.
   * @param {?Object} categories - The user's categories.
   * @param {?Object} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    /**
     * ---------------------------------------------------
     * Private Property (App._debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this._debug = (DEBUG) ? new Debug('App') : null;

    DEBUG && this._debug.start('init', config, sources, categories, questions);
    DEBUG && this._debug.args('init', config, 'object', sources, 'object',
                              categories, 'object', questions, 'object');

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags)
     * -----------------------------------------------
     * @desc Saves flags that explain a current state of the
     *   module environment.
     * @type {{
     *   workerPass: boolean,
     *   workerFail: boolean,
     *   initDone  : boolean
     * }}
     * @struct
     */
    this.flags = {};

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags.workerPass)
     * -----------------------------------------------
     * @desc Indicates the web worker has completed formatting.
     * @type {boolean}
     * @default false
     */
    this.flags.workerPass = false;

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags.workerFail)
     * -----------------------------------------------
     * @desc Indicates the web worker has encountered an error.
     * @type {boolean}
     * @default false
     */
    this.flags.workerFail = false;

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags.initDone)
     * -----------------------------------------------
     * @desc Indicates the app has finished initializing.
     * @type {boolean}
     * @default false
     */
    this.flags.initDone = false;

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
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions = new Questions(questions);
  };

  /**
   * ---------------------------------------------------
   * Public Method (App.sortKeys)
   * ---------------------------------------------------
   * @desc A helper method that sorts the keys from an object.
   * @param {Array<string>} ids - The unsorted keys.
   * @param {Object<string, string>} hMap - The object acting as a hash map.
   * @return {Array<string>} The sorted keys.
   */
  App.sortKeys = function(ids, hMap) {

    /**
     * @type {Array<string>}
     * @private
     */
    var keys;
    /**
     * @type {Array<string>}
     * @private
     */
    var names;
    /**
     * @type {string}
     * @private
     */
    var name;
    /**
     * @type {number}
     * @private
     */
    var ii;

    keys = [];
    names = [];

    ids.forEach(function(/** string */ id, /** number */ i) {

      name = hMap[id].toLowerCase();

      if (!i) {
        keys.push(id);
        names.push(name);
      }
      else {

        ii = i - 1;
        while (true) {

          if (name >= names[ii]) {
            keys.splice(ii, 0, id);
            names.splice(ii, 0, name);
            break;
          }

          if (ii === 0) {
            keys.unshift(id);
            names.unshift(name);
            break;
          }
          --ii;
        }
      }
    });

    return keys;
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;
