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
     * @type {strings}
     * @private
     */
    var ids;
    /**
     * @type {number}
     * @private
     */
    var len;
    /**
     * @type {Object<string, Source>}
     * @private
     */
    var data;

    /**
     * ---------------------------------------------------
     * Private Property (Sources.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Sources') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'sources', sources);
      this.debug.start('init', sources);
      this.debug.args('init', sources, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the source ids in alphabetical order.
     * @type {strings}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.len)
     * -----------------------------------------------
     * @desc Saves the count of sources.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Method (Sources.get)
     * -----------------------------------------------
     * @desc Returns the source object from a saved hash map of the sources.
     *   The source ids are used as the hash map's keys and object literals
     *   containing their names, question ids, and url names as the values.
     * @param {string} id - The source id to get.
     * @return {?Source}
     */
    this.get = function(id) {
      return data[id] || null;
    };


    // Set the properties
    ids = (sources) ? Object.keys(sources) : [];
    len = ids.length;

    if (len) {

      // Sort the ids
      ids = sortKeys(ids, sources);

      // Build the hash map
      ids.forEach(function(/** string */ id) {
        data = new Source(sources[id]);
      });
    }

    this.ids = ids;
    this.len = len;


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Sources.prototype.constructor = Sources;
