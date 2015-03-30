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
     * ---------------------------------------------------
     * Public Property (Sources.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Sources class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Sources',
      turnOnDebuggers: 'args fail'
    });

    this.debug.group('init', 'coll', 'sources= $$', sources);
    this.debug.start('init', sources);
    this.debug.args('init', sources, 'stringMap');

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
     * @desc Returns the source object from a saved hash map of the sources.
     *   The source ids are used as the hash map's keys and object literals
     *   containing their names, question ids, and url names as the values.
     * @param {string} id - The source id to get.
     * @return {Source}
     */
    this.get = function(id) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', id);
      this.debug.args('get', id, 'string');

      errorMsg = 'Error: The given source does not exist. sourceID= $$';
      this.debug.fail('get', data.hasOwnProperty(id), errorMsg, id);

      return data[id];
    };
    Object.freeze(this.get);


    // Check the argument data types
    if ( !checkType(sources, '!stringMap') ) {
      sources = {};
    }

    // Setup the properties
    this.ids = Object.keys(sources);
    this.len = this.ids.length;

    if (this.len) {

      // Sort the ids
      this.ids = sortKeys(this.ids, sources);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {
        data = new Source(sources[id]);
      });
    }

    Object.freeze(this.ids);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Sources.prototype.constructor = Sources;
