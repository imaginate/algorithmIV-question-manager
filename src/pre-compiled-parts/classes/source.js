  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc An object containing the details of a source.
   * @param {string} name - The source's name.
   * @constructor
   */
  var Source = function(name) {

    checkArgs(name, 'string');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Source.url)
     * -----------------------------------------------
     * @desc The source's url name.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Source.ids)
     * -----------------------------------------------
     * @desc The ids of the questions containing this source.
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

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Source.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the source.
     * @param {string} propName - The name of the property to get.
     * @return {(string|!numbers)}
     */
    this.get = function(propName) {

      /** @type {Object<string, (string|!numbers)>} */
      var props = {
        name: name,
        url : url,
        ids : ids
      };

      return getter.call(props, propName);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this source.
     * @param {number} id - The index to add.
     */
    this.addId = function(id) {

      /** @type {string} */
      var errorMsg;

      checkArgs(id, 'number');

      if (id < 1) {
        errorMsg = 'An aIV.app internal error occurred. A Source.addId call ';
        errorMsg += 'was given an invalid question id to add. id= ' + id;
        throw new Error(errorMsg);
      }

      ids.push(id);

    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.freezeIds)
     * -----------------------------------------------
     * @desc Freezes this category's question ids.
     * @type {function}
     */
    this.freezeIds = function() {

      freezeObj(ids);

    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Source.prototype.constructor = Source;
