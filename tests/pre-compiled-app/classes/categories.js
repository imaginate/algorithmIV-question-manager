  /**
   * -----------------------------------------------------
   * Public Class (Categories)
   * -----------------------------------------------------
   * @desc The available categories for each question.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @constructor
   */
  var Categories = function(categories) {

    /** @type {strings} */
    var subIds;

    /**
     * ---------------------------------------------------
     * Public Property (Categories.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Categories class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Categories',
      turnOnDebuggers: 'args fail'
    });

    this.debug.group('init', 'coll', 'categories= $$', categories);
    this.debug.start('init', categories);
    this.debug.args('init', categories, 'objectMap|stringMap');

    /**
     * ----------------------------------------------- 
     * Protected Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the category objects using the ids as keys.
     * @type {Object<string, Category>}
     * @private
     */
    var data;

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

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.get)
     * -----------------------------------------------
     * @desc Get a category object or property.
     * @param {string} id - The category id to get.
     * @param {string=} prop - If only one property is desired
     *   state it here.
     * @return {(Category|string|nums)}
     */
    this.get = function(id, prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', id, prop);
      this.debug.args('get', id, 'string', prop, 'string=');

      errorMsg = 'Error: The given category does not exist. catID= $$';
      this.debug.fail('get', data.hasOwnProperty(id), errorMsg, id);

      return (!!prop) ? data[id].get(prop) : data[id];
    };
    Object.freeze(this.get);


    // Check the argument data types
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

    // Setup the properties
    this.ids = Object.keys(categories.main);
    this.len = this.ids.length;

    if (this.len) {

      // Sort the main category ids
      this.ids = sortKeys(this.ids, categories.main);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {

        // Save and sort the sub category ids if they exist
        subIds = null;
        if (!!categories.sub[id]) {
          subIds = Object.keys(categories.sub[id]);
          if (subIds.length) {
            subIds = sortKeys(subIds, categories.sub[id]);
          }
        }

        // Add main category to the hash map
        data[id] = new Category(categories.main[id], subIds);
        Object.freeze(data[id]);

        // Add the sub categories to the hash map
        if (subIds.length) {
          subIds.forEach(function(/** string */ subId) {
            data[id] = new Category(categories.sub[id][subId]);
            Object.freeze(data[id]);
          });
        } 
      });
    }

    Object.freeze(this.ids);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Categories.prototype.constructor = Categories;
