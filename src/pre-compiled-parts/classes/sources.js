  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?stringMap} sources - The user's sources.
   * @constructor
   */
  var Sources = function(sources) {

    /**
     * ----------------------------------------------- 
     * Protected Property (Sources.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the source objects using the ids as keys.
     * @type {Object<string, Source>}
     * @private
     */
    var data;

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
     * @desc Get a source object or property.
     * @param {string} id - The source id to get.
     * @param {string=} prop - If only one property is desired
     *   state it here.
     * @return {(Source|string|nums)}
     */
    this.get = function(id, prop) {



      return (!!prop) ? data[id].get(prop) : data[id];
    };
    Object.freeze(this.get);


    // Check the argument data types
    if ( !checkType(sources, '!stringMap') ) {
      sources = {};
    }

    // Setup the properties
    this.ids = Object.keys(sources);
    this.len = this.ids.length;
    data = {};

    if (this.len) {

      // Sort the ids
      this.ids = sortKeys(this.ids, sources);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {
        data[id] = new Source(sources[id]);
      });
    }

    Object.freeze(this.ids);
    Object.freeze(data);

  };

  // Ensure constructor is set to this class.
  Sources.prototype.constructor = Sources;