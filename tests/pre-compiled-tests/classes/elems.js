  /**
   * -----------------------------------------------------
   * Public Class (Elems)
   * -----------------------------------------------------
   * @desc Important app elements.
   * @constructor
   */
  var Elems = function() {

    console.log('Elems is being setup.');

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
  };

  // Ensure constructor is set to this class.
  Elems.prototype.constructor = Elems;
