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

    /**
     * ---------------------------------------------------
     * Public Property (Category.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Category class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Category',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', name, subs);
    this.debug.args('init', name, 'string', subs, 'strings=');

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
     * @type {nums}
     * @private
     */
    var ids;

    /**
     * ----------------------------------------------- 
     * Public Method (Category.get)
     * -----------------------------------------------
     * @desc Gets a property from the category.
     * @param {string} prop - The name of the detail to get.
     * @return {(string|nums)}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, function>} */
      var category = {
        name: function() { return name; },
        url : function() { return url; },
        ids : function() {
          return Object.freeze( ids.slice(0) );
        },
        subs: function() {
          return (subs) ? Object.freeze( subs.slice(0) ) : null;
        }
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', category.hasOwnProperty(prop), errorMsg, prop);

      return category[prop]();
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (Category.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this category.
     * @param {number} id - The id to add.
     */
    this.addId = function(id) {

      this.debug.start('addId', id);
      this.debug.args('addId', id, 'number');

      if (typeof id === 'number' && id > 0) {
        ids.push(id);
      }
    };
    Object.freeze(this.addId);


    // Setup the properties
    if (!name || typeof name !== 'string') {
      name = '';
      url  = '';
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
