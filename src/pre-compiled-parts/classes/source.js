  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc An object containing the details of a source.
   * @param {string} name - The source's name.
   * @constructor
   */
  var Source = function(name) {

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
     * @type {nums}
     * @private
     */
    var ids;

    /**
     * ----------------------------------------------- 
     * Public Method (Source.get)
     * -----------------------------------------------
     * @desc Gets a detail for the source.
     * @param {string} prop - The name of the property to get.
     * @return {(string|nums)}
     */
    this.get = function(prop) {

      /** @type {Object<string, function>} */
      var source = {
        name: function() { return name; },
        url : function() { return url; },
        ids : function() {
          return Object.freeze( ids.slice(0) );
        }
      };

      return source[prop]();
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (Source.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this source.
     * @param {number} id - The index to add.
     */
    this.addId = function(id) {

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
  };

  // Ensure constructor is set to this class.
  Source.prototype.constructor = Source;
