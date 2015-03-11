  /**
   * -----------------------------------------------------
   * Public Class (Category)
   * -----------------------------------------------------
   * @desc An object containing the details of a category.
   * @param {string} name - The name of the category.
   * @param {?Object=} subs - The sub categories for a main category.
   * @constructor
   */
  var Category = function(name, subs) {

    /**
     * @type {string}
     * @private
     */
    var url;
    /**
     * @type {nums}
     * @private
     */
    var qIds;

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
     * Public Property (Category.name)
     * -----------------------------------------------
     * @desc The name of the category.
     * @return {string}
     */
    this.name = function() {
      return name;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Category.url)
     * -----------------------------------------------
     * @desc The name to use for the url for this category.
     * @return {string}
     */
    this.url = function() {
      return url;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Category.qIds)
     * -----------------------------------------------
     * @desc The indexes of the questions containing this category.
     * @return {nums}
     */
    this.qIds = function() {
      return qIds;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Category.addId)
     * -----------------------------------------------
     * @desc Add a question id to this category.
     * @param {number} index - The index to add.
     */
    this.addId = function(index) {
      qIds.push(index);
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Category.subs)
     * -----------------------------------------------
     * @desc This category's sub ids if they exist. If null then category
     *   is a sub category.
     * @return {?strings}
     */
    this.subs = function() {
      return subs;
    };


    // Set the properties
    if (typeof name !== 'string') {
      name = url = '';
    }
    else {
      url = name.toLowerCase();
      url = url.replace(/[^0-9a-z\-\s]/g, '');
      url = url.replace(/\s/g, '-');
    }
    qIds = [];
    subs = subs || null;
  };

  // Ensure constructor is set to this class.
  Category.prototype.constructor = Category;
