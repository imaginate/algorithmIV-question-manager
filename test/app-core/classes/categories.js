  /**
   * -----------------------------------------------------
   * Public Class (Categories)
   * -----------------------------------------------------
   * @desc The available categories for each question.
   * @param {?Object} categories - The user's categories.
   * @constructor
   */
  var Categories = function(categories) {

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
     * @type {Object<string, Category>}
     * @private
     */
    var data;
    /**
     * @type {strings}
     * @private
     */
    var subIds;

    /**
     * ---------------------------------------------------
     * Private Property (Categories.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Categories') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'categories', categories);
      this.debug.start('init', categories);
      this.debug.args('init', categories, 'object');
    }

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
     * @desc Returns the category object from a saved hash map of all the
     *   categories. The category ids are used as the hash map's keys and
     *   object literals containing their names, question ids, url name,
     *   and a list of the ids of their sub categories (in alphabetical
     *   order if they exist) as the values.
     * @param {string} id - The category id to get.
     * @return {?Category}
     */
    this.get = function(id) {
      return data[id] || null;
    };


    // Set the properties
    ids = ( (categories && !!categories.main) ?
      Object.keys(categories.main) : []
    );
    len = ids.length;

    if (len) {

      // Sort the main category ids
      ids = sortKeys(ids, categories.main);

      // Build the hash map
      ids.forEach(function(/** string */ id) {

        // Save and sort the sub category ids if they exist
        subIds = null;
        if (!!categories.sub[id]) {
          subIds = Object.keys(categories.sub[id]);
          if (subIds.length) {
            subIds = sortKeys(subIds, categories.sub[id])
          }
        }

        // Add main category to the hash map
        data[id] = new Category(categories.main[id], subIds);

        // Add the sub categories to the hash map
        if (subIds.length) {
          subIds.forEach(function(/** string */ subId) {
            data[id] = new Category(categories.sub[id][subId]);
          });
        } 
      });
    }

    this.ids = ids;
    this.len = len;


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Categories.prototype.constructor = Categories;
