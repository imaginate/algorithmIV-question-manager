  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?stringMap} sources - The user's sources.
   * @constructor
   */
  var Sources = function(sources) {

    var thisDebug;

    this.debug = aIV.debug('Sources');
    thisDebug = this.debug;

    this.debug.start('init', sources);

    checkArgs(sources, 'stringMap');

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

    /** @type {number} */
    var allIndex;

    this.ids = Object.keys(sources);
    this.len = this.ids.length;

    // Sort the ids
    if (this.len) {
      this.ids = sortKeys(this.ids, sources);
    }

    // Fix a category with the id of all
    allIndex = this.ids.indexOf('all');
    if (allIndex !== -1) {
      this.ids[ allIndex ] = '_all';
    }

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

    /** @type {string} */
    var sourceId;
    /** @type {number} */
    var i;

    data = {};

    // Build the data hash map
    i = this.len;
    while (i--) {
      sourceId = this.ids[i];
      data[ sourceId ] = new Source(sources[ sourceId ]);
    }

    // Deep freeze
    freezeObj(data, true);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Sources.get)
     * -----------------------------------------------
     * @desc Get a Source's object or protected property.
     * @param {string} id - The source id to get.
     * @param {string=} prop - The property to get.
     * @return {!(Source|string|numbers)}
     */
    this.get = function(id, prop) {

      thisDebug.start('get', id, prop);

      /** @type {string} */
      var errorMsg;
      /** @type {!Source} */
      var source;
      /** @type {!(Source|string|numbers)} */
      var result;

      checkArgs(id, 'string', prop, 'string=');

      if ( !hasOwnProp(data, id) ) {
        errorMsg = 'An aIV.app internal error occurred. A Sources.get call ';
        errorMsg += 'was given an invalid source id to get. sourceID= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      source = data[ id ];
      result = (prop) ? source.get(prop) : source;

      thisDebug.end('get', result);

      return result;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    freezeObj(this, true);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Sources.prototype.constructor = Sources;
