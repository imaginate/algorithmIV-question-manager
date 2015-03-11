  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc An object containing the details of a source.
   * @param {string} name - The source name.
   * @constructor
   */
  var Source = function(name) {

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
     * Public Property (Source.name)
     * -----------------------------------------------
     * @desc The source's name.
     * @return {string}
     */
    this.name = function() {
      return name;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Source.url)
     * -----------------------------------------------
     * @desc The source's url name.
     * @return {string}
     */
    this.url = function() {
      return url;
    };

    /**
     * ----------------------------------------------- 
     * Public Property (Source.qIds)
     * -----------------------------------------------
     * @desc The indexes of the questions containing this source.
     * @return {nums}
     */
    this.qIds = function() {
      return qIds;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.addId)
     * -----------------------------------------------
     * @desc Add a question id to this source.
     * @param {number} index - The index to add.
     */
    this.addId = function(index) {
      qIds.push(index);
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
  };

  // Ensure constructor is set to this class.
  Source.prototype.constructor = Source;
