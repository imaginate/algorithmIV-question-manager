  /**
   * -----------------------------------------------------
   * Public Class (Category)
   * -----------------------------------------------------
   * @desc An object containing the details of a category.
   * @param {string} name - The name of the category.
   * @param {?strings=} subs - This category's sub ids if they exist.
   *   If null then category is a sub category.
   * @constructor
   */
  var Category = function(name, subs) {

    var thisDebug;

    this.debug = aIV.debug('Category');
    thisDebug = this.debug;

    this.debug.start('init', name, subs);

    checkArgs(name, 'string', subs, 'strings=');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Protected Property (Category.url)
     * -----------------------------------------------
     * @desc The url name for this category.
     * @type {string}
     * @private
     */
    var url;

    /**
     * -----------------------------------------------
     * Protected Property (Category.ids)
     * -----------------------------------------------
     * @desc The ids of the questions containing this category.
     * @type {!numbers}
     * @private
     */
    var ids;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    if (!name || !checkType(name, 'string')) {
      name = '';
      url  = '';
    }
    else {
      url = makeUrl(name);
    }
    ids = [];
    subs = (subs) ? freezeObj(subs) : null;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Public Method (Category.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the category.
     * @param {string} propName - The name of the property to get.
     * @return {(string|!numbers)}
     */
    this.get = function(propName) {

      /** @type {Object<string, (string|!numbers)>} */
      var props = {
        debug: thisDebug,
        name: name,
        url : url,
        subs: subs,
        ids : ids
      };

      return getter.call(props, propName);
    };

    /**
     * -----------------------------------------------
     * Public Method (Category.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this category.
     * @param {number} id - The id to add.
     */
    this.addId = function(id) {

      this.debug.start('addId', id);

      /** @type {string} */
      var errorMsg;

      checkArgs(id, 'number');

      if (id < 1) {
        errorMsg = 'An aIV.app internal error occurred. A Category.addId ';
        errorMsg += 'call was given an invalid question id to add. id= ' + id;
        throw new Error(errorMsg);
      }

      ids.push(id);

      this.debug.end('addId');
    };

    /**
     * -----------------------------------------------
     * Public Method (Category.freezeIds)
     * -----------------------------------------------
     * @desc Freezes this category's question ids.
     * @type {function}
     */
    this.freezeIds = function() {

      this.debug.start('freezeIds');

      freezeObj(ids);

      this.debug.end('freezeIds');
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Category.prototype.constructor = Category;
