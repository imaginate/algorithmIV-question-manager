  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {!Object<string, (string|number|boolean)>} config - The user's
   *   prettifier configuration settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.trimSpace)
     * -----------------------------------------------
     * @desc The number of spaces to trim from the beginning of lines.
     * @type {number}
     * @private
     */
    var trimSpace;

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.tabLength)
     * -----------------------------------------------
     * @desc The number of spaces to convert tab characters.
     * @type {number}
     * @private
     */
    var tabLength;

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.commentLinks)
     * -----------------------------------------------
     * @desc Whether to allow links in prettified comments.
     * @type {boolean}
     * @private
     */
    var commentLinks;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    trimSpace = 0;
    tabLength = 2;
    commentLinks = (config.commentLinks === true);

    if ( hasOwnProp(config, 'trimSpace') ) {
      if (checkType(config.trimSpace, 'number') && config.trimSpace >= 0) {
        trimSpace = Math.floor(config.trimSpace);
      }
      else if ( checkType(config.trimSpace, 'string') ) {
        config.trimSpace = config.trimSpace.replace(/[^0-9]/g, '');
        if (config.trimSpace) {
          trimSpace = Number(config.trimSpace);
        }
      }
    }

    if ( hasOwnProp(config, 'tabLength') ) {
      if (checkType(config.tabLength, 'number') && config.tabLength >= 0) {
        tabLength = Math.floor(config.tabLength);
      }
      else if ( checkType(config.tabLength, 'string') ) {
        config.tabLength = config.tabLength.replace(/[^0-9]/g, '');
        if (config.tabLength) {
          tabLength = Number(config.tabLength);
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from PrettyConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(number|boolean)} The property's value.
     */
    this.get = function(prop) {

      /** @type {Object<string, (number|boolean)>} */
      var props = {
        trimSpace   : trimSpace,
        tabLength   : tabLength,
        commentLinks: commentLinks
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  PrettyConfig.prototype.constructor = PrettyConfig;
