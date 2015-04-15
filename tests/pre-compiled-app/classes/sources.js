  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?stringMap} sources - The user's sources.
   * @constructor
   */
  var Sources = function(sources) {

    this.debug = aIV.debug('Sources');

    this.debug.group('init', 'coll', 'sources= $$', sources);

    this.debug.start('init', sources);

    this.debug.args('init', sources, 'stringMap');

    ////////////////////////////////////////////////////////////////////////////
    // Prepare The User Supplied Params
    ////////////////////////////////////////////////////////////////////////////

    if ( !checkType(sources, '!stringMap') ) {
      sources = {};
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.ids = Object.keys(sources);
    this.len = this.ids.length;

    // Sort the ids
    if (this.len) {
      this.ids = sortKeys(this.ids, sources);
    }

    Object.freeze(this.ids);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Sources.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the source objects using the ids as keys.
     * @type {Object<string, Source>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    data = {};

    // Build the data hash map
    if (this.len) {
      this.ids.forEach(function(/** string */ sourceId) {
        data[ sourceId ] = new Source(sources[ sourceId ]);
      });
    }

    Object.freeze(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Sources.get)
     * -----------------------------------------------
     * @desc Get a source's Source object or property.
     * @param {string} id - The source id to get.
     * @param {string=} prop - The property to get.
     * @return {(Source|string|numbers)}
     */
    this.get = function(id, prop) {

      this.debug.start('get', id, prop);
      this.debug.args('get', id, 'string', prop, 'string=');

      /** @type {Source} */
      var source;

      if (typeof prop !== 'string') {
        prop = '';
      }

      debugCheck = data.hasOwnProperty(id);
      debugMsg = 'Error: The given source does not exist. sourceID= $$';
      this.debug.fail('get', debugCheck, debugMsg, id);

      source = ( data.hasOwnProperty(id) ) ? data[ id ] : false;

      return (prop) ? source.get(prop) : source;
    };

    // Freeze all of the methods
    Object.freeze(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.group('init', 'end');

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Sources.prototype.constructor = Sources;
