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
    this.ids = ( (!!categories && !!categories.main) ?
      Object.keys(categories.main) : []
    );

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.len)
     * -----------------------------------------------
     * @desc Saves the count of main categories.
     * @type {number}
     */
    this.len = this.ids.length;

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of all the categories. The category ids are
     *   used as the hash map's keys and object literals containing their
     *   names, question ids, url name, and a list of the ids of their sub
     *   categories (in alphabetical order if they exist) as the values.
     * @type {Object<string, Category>}
     */
    this.data = {};


    if (!!this.len) {

      // Sort the main category ids
      this.ids = sortKeys(this.ids, categories.main);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {

        // Save and sort the sub category ids if they exist
        subIds = null;
        if (!!categories.sub[id]) {
          subIds = Object.keys(categories.sub[id]);
          if (!!subIds.length) {
            subIds = sortKeys(subIds, categories.sub[id])
          }
        }

        // Add main category to the hash map
        this.data[id] = new Category(categories.main[id], subIds);

        // Add the sub categories to the hash map
        if (!!subIds.length) {
          subIds.forEach(function(/** string */ subId) {
            this.data[id] = new Category(categories.sub[id][subId]);
          }, this);
        } 
      }, this);
    }


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Categories.prototype.constructor = Categories;
