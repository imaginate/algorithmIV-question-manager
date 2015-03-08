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
     * @type {string}
     */
    this.name = (typeof name === 'string') ? name : '';

    /**
     * ----------------------------------------------- 
     * Public Property (Category.url)
     * -----------------------------------------------
     * @desc The name to use for the url for this category.
     * @type {string}
     */
    this.url = this.name;

    /**
     * ----------------------------------------------- 
     * Public Property (Category.qIds)
     * -----------------------------------------------
     * @desc The indexes of the questions containing this category.
     * @type {nums}
     */
    this.qIds = [];

    /**
     * ----------------------------------------------- 
     * Public Property (Category.subs)
     * -----------------------------------------------
     * @desc This category's sub ids if they exist. If null then category
     *   is a sub category.
     * @type {?strings}
     */
    this.subs = subs || null;


    // Sanitize the url
    this.url = this.url.toLowerCase();
    this.url = this.url.replace(/[^0-9a-z\-\s]/g, '');
    this.url = this.url.replace(/\s/g, '-');
  };

  // Ensure constructor is set to this class.
  Category.prototype.constructor = Category;
