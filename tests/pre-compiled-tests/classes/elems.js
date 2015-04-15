  /**
   * -----------------------------------------------------
   * Public Class (Elems)
   * -----------------------------------------------------
   * @desc Important app elements.
   * @constructor
   */
  var Elems = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Property (Elems.root)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests
     * @type {HTMLElement}
     */
    this.root = getID('aIV-tests');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.msg)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests .msg
     * @type {HTMLElement}
     */
    this.msg = getClass('msg')[0];

    /**
     * ---------------------------------------------------
     * Private Property (Elems.ui)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests .ui
     * @type {HTMLElement}
     */
    this.ui = getClass('ui')[0];

    /**
     * ---------------------------------------------------
     * Private Property (Elems.start)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests .start
     * @type {HTMLElement}
     */
    this.start = getClass('start')[0];

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Elems.prototype.constructor = Elems;
