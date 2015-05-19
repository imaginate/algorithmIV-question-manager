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

    /** @type {!Element} */
    var root;

    root = getElemById('aIV-tests');

    // Set the following getElemByClass calls to use #aIV-tests as their root
    aIV.utils.set({ getElemByClassRoot: root });

    /**
     * ---------------------------------------------------
     * Private Property (Elems.root)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests
     * @type {!Element}
     */
    this.root = root;

    /**
     * ---------------------------------------------------
     * Private Property (Elems.msg)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests .msg
     * @type {!Element}
     */
    this.msg = getElemByClass('msg');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.ui)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests .ui
     * @type {!Element}
     */
    this.ui = getElemByClass('ui');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.start)
     * ---------------------------------------------------
     * @desc Element: #aIV-tests .start
     * @type {!Element}
     */
    this.start = getElemByClass('start');

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Elems.prototype.constructor = Elems;
