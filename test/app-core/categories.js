  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?Object} sources - The user's sources.
   * @constructor
   */
  var Sources = function(sources) {

    /**
     * @type {string}
     * @private
     */
    var cleanURL;

    /**
     * ---------------------------------------------------
     * Private Property (Sources._debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this._debug = (DEBUG) ? new Debug('Sources') : null;

    DEBUG && this._debug.group('init', true, 'sources', sources);
    DEBUG && this._debug.start('init', sources);
    DEBUG && this._debug.args('init', sources, 'object');

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the source ids in alphabetical order.
     * @type {Array<string>}
     */
    this.ids = (!!sources) ? Object.keys(sources) : [];

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.len)
     * -----------------------------------------------
     * @desc Saves the count of sources.
     * @type {number}
     */
    this.len = this.ids.length;

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.hMap)
     * -----------------------------------------------
     * @desc Saves a hash map of the sources using the source ids as
     *   keys and object literals containing their names and question ids
     *   as the values.
     * @type {Object<string, {
     *   name: string,
     *   ids : Array<number>,
     *   url : string
     * }>}
     * @dict
     */
    this.hMap = {};

    // Sort the ids
    this.ids = (!!this.len) ? App.sortKeys(this.ids, sources) : this.ids;

    // Build the hash map
    this.ids.forEach(function(/** string */ id) {
      cleanURL = sources[id].toLowerCase();
      cleanURL = cleanURL.replace(/[^0-9a-z\-\s]/g, '');
      cleanURL = cleanURL.replace(/\s/g, '-');
      this.hMap = {
        name: sources[id],
        ids : [],
        url : cleanURL
      };
    }, this);

    DEBUG && this._debug.group('init', false);
  };

  // Ensure constructor is set to this class.
  Sources.prototype.constructor = Sources;
