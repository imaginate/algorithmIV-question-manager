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
     * Public Property (Sources.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the sources. The source ids are used as
     *   the hash map's keys and object literals containing their names,
     *   question ids, and url names as the values.
     * @type {Object<string, Source>}
     */
    this.data = {};


    if (!!this.len) {

      // Sort the ids
      this.ids = sortKeys(this.ids, sources);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {
        this.data = new Source(sources[id]);
      }, this);
    }


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Sources.prototype.constructor = Sources;
