  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc An object containing the details of a source.
   * @param {string} name - The source's name.
   * @constructor
   */
  var Source = function(name) {

    var that = this;

    /**
     * ---------------------------------------------------
     * Private Property (Source.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('Source') : null;

    if (DEBUG) {
      this.debug.start('init', name);
      this.debug.args('init', name, 'string');
    }

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
     * @param {string} part - The name of the detail to get.
     * @return {(string|nums)}
     */
    this.get = function() {
      /** @private */
      var result;
      /** @private */
      var source = {
        name: name,
        url : url,
        ids : ids
      };

      result = (source[part] !== undefined) ? source[part] : null;
      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.addId)
     * -----------------------------------------------
     * @desc Add a question id to this source.
     * @param {number} id - The index to add.
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
    if (typeof name !== 'string') {
      name = url = '';
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
