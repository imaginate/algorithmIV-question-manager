  /**
   * -----------------------------------------------------
   * Public Class (Categories)
   * -----------------------------------------------------
   * @desc The available categories for each question.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @constructor
   */
  var Categories = function(categories) {

    var thisDebug;

    this.debug = aIV.debug('Categories');
    thisDebug = this.debug;

    this.debug.start('init', categories);

    checkArgs(categories, 'objectMap|stringMap');

    ////////////////////////////////////////////////////////////////////////////
    // Prepare The User Supplied Params
    ////////////////////////////////////////////////////////////////////////////

    if ( checkType(categories, '!stringMap') ) {
      categories = {
        main: categories,
        sub : {}
      };
    }
    else {
      if (!categories) {
        categories = {};
      }
      if (!categories.main || !checkType(categories.main, '!stringMap')) {
        categories.main = {};
      }
      if (!categories.sub || !checkType(categories.sub, '!objectMap')) {
        categories.sub = {};
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the main category ids in alphabetical order.
     * @type {!strings}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.len)
     * -----------------------------------------------
     * @desc Saves the count of main categories.
     * @type {number}
     */
    this.len;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var allIndex;

    this.ids = Object.keys(categories.main);
    this.len = this.ids.length;

    // Sort the main category ids
    if (this.len) {
      this.ids = sortKeys(this.ids, categories.main);
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
     * Protected Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the category objects using the ids as keys.
     * @type {!Object<string, !Category>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {strings} */
    var subIds;
    /** @type {string} */
    var mainId;
    /** @type {string} */
    var subId;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    data = {};

    // Build the data hash map
    i = this.len;
    while (i--) {
      mainId = this.ids[i];

      // Save and sort the sub category ids if they exist
      subIds = ( (hasOwnProp(categories.sub, mainId)) ?
        Object.keys(categories.sub[ mainId ]) : []
      );
      if (subIds.length) {
        subIds = sortKeys(subIds, categories.sub[ mainId ]);
      }

      // Add main category to the hash map
      data[ mainId ] = new Category(categories.main[ mainId ], subIds);

      // Add the sub categories to the hash map
      ii = subIds.length;
      while (ii--) {
        subId = subIds[ii];
        data[ subId ] = new Category(categories.sub[ mainId ][ subId ]);
      }
    }

    // Deep freeze
    freezeObj(data, true);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.get)
     * -----------------------------------------------
     * @desc Get a Catgory's object or protected property.
     * @param {string} id - The category id to get.
     * @param {string=} prop - The property to get.
     * @return {!(Category|string|numbers)}
     */
    this.get = function(id, prop) {

      thisDebug.start('get', id, prop);

      /** @type {string} */
      var errorMsg;
      /** @type {!Category} */
      var category;
      /** @type {!(Category|string|numbers)} */
      var result;

      checkArgs(id, 'string', prop, 'string=');

      if ( !hasOwnProp(data, id) ) {
        errorMsg = 'An aIV.app internal error occurred. A Categories.get call ';
        errorMsg += 'was given an invalid category id to get. catID= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      category = data[ id ];
      result = (prop) ? category.get(prop) : category;

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

  Categories.prototype.constructor = Categories;

  /**
   * -----------------------------------------------------
   * Public Method (Categories.prototype.freezeIds)
   * -----------------------------------------------------
   * @desc Freezes the ids array for each category.
   * @type {function}
   */
  Categories.prototype.freezeIds = function() {

    this.debug.start('freezeIds');

    /** @type {string} */
    var id;
    /** @type {number} */
    var i;

    i = this.len;
    while (i--) {
      id = this.ids[i];
      this.get(id).freezeIds();
    }

    this.debug.end('freezeIds');
  };
