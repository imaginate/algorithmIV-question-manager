  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc The available source for each question.
   * @param {string} name - The source name.
   * @constructor
   */
  var Source = function(name) {

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
     * @type {string}
     */
    this.name = (typeof name === 'string') ? name : '';

    /**
     * ----------------------------------------------- 
     * Public Property (Source.url)
     * -----------------------------------------------
     * @desc The source's url name.
     * @type {string}
     */
    this.url = this.name;

    /**
     * ----------------------------------------------- 
     * Public Property (Source.qIds)
     * -----------------------------------------------
     * @desc The indexes of the questions containing this source.
     * @type {nums}
     */
    this.qIds = [];


    // Sanitize the url
    this.url = this.url.toLowerCase();
    this.url = this.url.replace(/[^0-9a-z\-\s]/g, '');
    this.url = this.url.replace(/\s/g, '-');
  };

  // Ensure constructor is set to this class.
  Source.prototype.constructor = Source;
