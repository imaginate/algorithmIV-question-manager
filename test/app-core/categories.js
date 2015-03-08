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
     * @type {string}
     * @private
     */
    var cleanURL;
    /**
     * @type {strings}
     * @private
     */
    var subIds;

    /** x
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
     * Public Property (Categories.hMap)
     * -----------------------------------------------
     * @desc Saves a hash map of all the categories. The category ids are
     *   used as the hash map's keys and object literals containing their
     *   names, question ids, url name, and a list of the ids of their sub
     *   categories (in alphabetical order if they exist) as the values.
     * @type {Object<string, {
     *   name: string,
     *   url : string,
     *   ques: nums,
     *   subs: ?strings
     * }>}
     */
    this.hMap = {};

    if (!!this.len) {

      // Sort the main category ids
      this.ids = App.sortKeys.call(this, this.ids, categories.main);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {

        // Sanitize the main category name for the url
        cleanURL = categories.main[id].toLowerCase();
        cleanURL = cleanURL.replace(/[^0-9a-z\-\s]/g, '');
        cleanURL = cleanURL.replace(/\s/g, '-');

        // Save and sort the sub category ids if they exist
        subIds = null;
        if (!!categories.sub[id]) {
          subIds = Object.keys(categories.sub[id]);
          subIds = App.sortKeys.call(this, subIds, categories.sub[id])
        }

        // Add main category to the hash map
        this.hMap = {
          name: categories.main[id],
          url : cleanURL,
          ques: [],
          subs: subIds
        };

        // Add the sub categories to the hash map
        if (subIds) {
          subIds.forEach(function(/** string */ subId) {
            cleanURL = categories.sub[id][subId].toLowerCase();
            cleanURL = cleanURL.replace(/[^0-9a-z\-\s]/g, '');
            cleanURL = cleanURL.replace(/\s/g, '-');
            this.hMap = {
              name: categories.sub[id][subId],
              url : cleanURL,
              ques: [],
              subs: null
            };
          }, this);
        }       // CLOSE: if(subIds)
      }, this); // CLOSE: main category forEach()
    }           // CLOSE: if(!!this.len)

    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Categories.prototype.constructor = Categories;
