  /**
   * -----------------------------------------------------
   * Public Class (Category)
   * -----------------------------------------------------
   * @desc An object containing the details of a category.
   * @param {string} name - The name of the category.
   * @param {?Object=} subs - This category's sub ids if they exist.
   *   If null then category is a sub category.
   * @constructor
   */
  var Category = function(name, subs) {

    var that = this;

    /**
     * ---------------------------------------------------
     * Private Property (Category.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Category') : null;

    if (DEBUG) {
      this.debug.start('init', name, subs);
      this.debug.args('init', name, 'string', subs, 'object=');
    }

    /**
     * ----------------------------------------------- 
     * Protected Property (Category.url)
     * -----------------------------------------------
     * @desc The name to use for the url for this category.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Category.ids)
     * -----------------------------------------------
     * @desc The ids of the questions containing this category.
     * @type {nums}
     * @private
     */
    var ids;

    /**
     * ----------------------------------------------- 
     * Public Method (Category.get)
     * -----------------------------------------------
     * @desc Gets a detail for the category.
     * @param {string} part - The name of the detail to get.
     * @return {(string|nums)}
     */
    this.get = function() {
      /** @private */
      var result;
      /** @private */
      var category = {
        name: name,
        url : url,
        ids : ids,
        subs: subs
      };

      result = (category[part] !== undefined) ? category[part] : null;
      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Category.addId)
     * -----------------------------------------------
     * @desc Add a question id to this category.
     * @param {number} id - The id to add.
     */
    this.addId = function(id) {

      if (DEBUG) {
        that.debug.start('addId', id);
        that.debug.args('addId', id, 'number');
      }

      if (typeof id === 'number' && id > 0) {
        ids.push(id);
      }
    };


    // Set the properties
    if (typeof name !== 'string' || !name) {
      name = url = '';
    }
    else {
      url = name.toLowerCase();
      url = url.replace(/[^0-9a-z\-\s]/g, '');
      url = url.replace(/\s/g, '-');
    }
    ids = [];
    subs = subs || null;
  };

  // Ensure constructor is set to this class.
  Category.prototype.constructor = Category;
