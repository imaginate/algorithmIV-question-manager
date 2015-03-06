  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?hashMap} sources - The user's sources.
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

    if (DEBUG) {
      this._debug.group('init', 'coll', 'sources', sources);
      this._debug.start('init', sources);
      this._debug.args('init', sources, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the source ids in alphabetical order.
     * @type {strings}
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
     * @desc Saves a hash map of the sources. The source ids are used as
     *   the hash map's keys and object literals containing their names,
     *   question ids, and url names as the values.
     * @type {Object<string, {
     *   name: string,
     *   url : string,
     *   ids : nums
     * }>}
     * @dict
     */
    this.hMap = {};

    if (!!this.len) {

      // Sort the ids
      this.ids = App.sortKeys(this.ids, sources);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {
        cleanURL = sources[id].toLowerCase();
        cleanURL = cleanURL.replace(/[^0-9a-z\-\s]/g, '');
        cleanURL = cleanURL.replace(/\s/g, '-');
        this.hMap = {
          name: sources[id],
          url : cleanURL,
          ids : []
        };
      }, this);
    }

    DEBUG && this._debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Sources.prototype.constructor = Sources;
