  /**
   * -----------------------------------------------------
   * Public Class (Categories)
   * -----------------------------------------------------
   * @desc The available categories for each question.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @constructor
   */
  var Categories = function(categories) {

    this.debug = aIV.debug('Categories');

    this.debug.group('init', 'coll', 'categories= $$', categories);

    this.debug.start('init', categories);

    this.debug.args('init', categories, 'objectMap|stringMap');

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
     * @type {strings}
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

    freezeObj(this.ids);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the category objects using the ids as keys.
     * @type {Object<string, Category>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {strings} */
    var subIds;

    data = {};

    if (this.len) {

      // Build the data hash map
      this.ids.forEach(function(/** string */ mainId) {

        // Save and sort the sub category ids if they exist
        subIds = null;
        if ( categories.sub.hasOwnProperty(mainId) ) {
          subIds = Object.keys(categories.sub[ mainId ]);
          if (subIds && subIds.length) {
            subIds = sortKeys(subIds, categories.sub[ mainId ]);
          }
        }

        // Add main category to the hash map
        data[ mainId ] = new Category(categories.main[ mainId ], subIds);

        // Add the sub categories to the hash map
        if (subIds && subIds.length) {
          subIds.forEach(function(/** string */ subId) {
            data[ subId ] = new Category(categories.sub[ mainId ][ subId ]);
          });
        } 
      });
    }

    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.get)
     * -----------------------------------------------
     * @desc Get a catgory's Category object or property.
     * @param {string} id - The category id to get.
     * @param {string=} prop - The property to get.
     * @return {(Category|string|numbers)}
     */
    this.get = function(id, prop) {

      this.debug.start('get', id, prop);
      this.debug.args('get', id, 'string', prop, 'string=');

      /** @type {Category} */
      var category;

      if (typeof prop !== 'string') {
        prop = '';
      }

      debugCheck = data.hasOwnProperty(id);
      debugMsg = 'Error: The given category does not exist. catID= $$';
      this.debug.fail('get', debugCheck, debugMsg, id);

      category = ( data.hasOwnProperty(id) ) ? data[ id ] : false;

      return (prop) ? category.get(prop) : category;
    };

    // Freeze all of the methods
    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.group('init', 'end');

    // Freeze this class instance
    freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Categories.prototype.constructor = Categories;
