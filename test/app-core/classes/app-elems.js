  /**
   * -----------------------------------------------------
   * Public Class (AppElems)
   * -----------------------------------------------------
   * @desc The key DOM nodes for this app.
   * @constructor
   */
  var AppElems = function() {

    /**
     * ---------------------------------------------------
     * Private Property (AppElems.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('AppElems') : null;

    DEBUG && this.debug.start('init');

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.root)
     * -----------------------------------------------
     * @desc The #aIV element.
     * @type {elem}
     */
    this.root = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.sel)
     * -----------------------------------------------
     * @desc The #aIV-selections element.
     * @type {elem}
     */
    this.sel = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.main)
     * -----------------------------------------------
     * @desc The #aIV-main element.
     * @type {elem}
     */
    this.main = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.nav)
     * -----------------------------------------------
     * @desc The #aIV-nav element.
     * @type {elem}
     */
    this.nav = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.ques)
     * -----------------------------------------------
     * @desc The #aIV-questions element.
     * @type {elem}
     */
    this.ques = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.hold)
     * -----------------------------------------------
     * @desc The img.loader element.
     * @type {elem}
     */
    this.hold = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.none)
     * -----------------------------------------------
     * @desc The section.empty element.
     * @type {elem}
     */
    this.none = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.scrl)
     * -----------------------------------------------
     * @desc Saves the height of the browser's DOM loaded scrollbar.
     * @type {{
     *   height: number
     * }}
     * @struct
     */
    this.scrl = {
      height: 0
    };

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.code)
     * -----------------------------------------------
     * @desc Saves values of the DOM loaded prettified list elements.
     * @type {{
     *   ol: {
     *     height: number
     *   },
     *   li: {
     *     height: number
     *   }
     * }}
     * @struct
     
     */
    this.code = {
      ol: {
        height: 0
      },
      li: {
        height: 0
      }
    };
  };

  // Ensure constructor is set to this class.
  AppElems.prototype.constructor = AppElems;

  /**
   * -----------------------------------------------
   * Public Method (AppElems.prototype.appendMain)
   * -----------------------------------------------
   * @desc Creates and appends the main html elements.
   * @type {function()}
   */
  AppElems.prototype.appendMain = function() {

    DEBUG && this.debug.start('appendMain');

    /**
     * @type {string}
     * @private
     */
    var errorMsg;
    /**
     * @type {elem}
     * @private
     */
    var h1;
    /**
     * @type {elem}
     * @private
     */
    var errorDiv;
    /**
     * @type {elem}
     * @private
     */
    var h2;
    /**
     * @type {elem}
     * @private
     */
    var p;

    errorMsg = 'The web worker failed. Please wait ' +
               'while the app is being loaded manually.';

    this.root = document.createElement('div');
    h1 = document.createElement('h1');
    this.sel  = document.createElement('nav');
    this.main = document.createElement('div');
    this.nav  = document.createElement('nav');
    this.ques = document.createElement('section');
    this.hold = document.createElement('img');
    this.none = document.createElement('section');
    errorDiv = document.createElement('div');
    h2 = document.createElement('h2');
    p  = document.createElement('p');

    this.root.id = 'aIV';
    this.sel.id  = 'aIV-selections';
    this.main.id = 'aIV-main';
    this.nav.id  = 'aIV-nav';
    this.ques.id = 'aIV-questions';

    this.sel.className  = 'selections';
    this.main.className = 'main';
    this.ques.className = 'questions';
    this.hold.className = 'loader';
    this.none.className = 'empty';
    errorDiv.className = 'loadError';

    h1.textContent = 'Algorithm IV';
    h2.textContent = 'Load Error';
    p.textContent  = errorMsg;
    this.none.textContent = 'No question(s) found.';

    this.hold.src = 'images/loading.gif';

    this.root.appendChild(h1);
    this.root.appendChild(this.sel);
    this.root.appendChild(this.main);
    this.main.appendChild(this.nav);
    this.main.appendChild(this.ques);
    this.ques.appendChild(errorDiv);
    this.ques.appendChild(this.hold);
    this.ques.appendChild(this.none);
    errorDiv.appendChild(h2);
    errorDiv.appendChild(p);

    document.body.appendChild(this.root);
  };

  /**
   * -----------------------------------------------
   * Public Method (AppElems.prototype.appendNav)
   * -----------------------------------------------
   * @desc Creates and appends the navigation elements.
   * @type {function()}
   */
  AppElems.prototype.appendNav = function() {

    DEBUG && this.debug.start('appendNav');

    /**
     * @type {elem}
     * @private
     */
    var prev;
    /**
     * @type {elem}
     * @private
     */
    var pArrow;
    /**
     * @type {elem}
     * @private
     */
    var pBG;
    /**
     * @type {elem}
     * @private
     */
    var pTitle;
    /**
     * @type {elem}
     * @private
     */
    var next;
    /**
     * @type {elem}
     * @private
     */
    var nArrow;
    /**
     * @type {elem}
     * @private
     */
    var nBG;
    /**
     * @type {elem}
     * @private
     */
    var nTitle;

    prev   = document.createElement('div');
    pArrow = document.createElement('div');
    pBG    = document.createElement('div');
    pTitle = document.createElement('div');
    next   = document.createElement('div');
    nArrow = document.createElement('div');
    nBG    = document.createElement('div');
    nTitle = document.createElement('div');

    pArrow.id = 'aIV-prev';
    nArrow.id = 'aIV-next';

    prev.className = 'prev';
    next.className = 'next';
    pArrow.className = nArrow.className = 'arrow';
    pBG.className    = nBG.className    = 'bg';
    pTitle.className = nTitle.className = 'title';

    pTitle.textContent = pArrow.textContent = 'Previous';
    nTitle.textContent = nArrow.textContent = 'Next';

    prev.appendChild(pArrow);
    prev.appendChild(pBG);
    prev.appendChild(pTitle);
    next.appendChild(nArrow);
    next.appendChild(nBG);
    next.appendChild(nTitle);

    this.nav.appendChild(prev);
    this.nav.appendChild(next);
  };

  /**
   * -------------------------------------------------
   * Public Method (AppElems.prototype.setScrollbarHeight)
   * -------------------------------------------------
   * @desc Saves the width of the browser's scrollbar.
   * @type {function()}
   */
  AppElems.prototype.setScrollbarHeight = function() {

    DEBUG && this.debug.start('setScrollbarHeight');

    /**
     * @type {elem}
     * @private
     */
    var div;

    div = document.createElement('div');
    div.className = 'aIV-scrollbar';
    document.body.appendChild(div);

    this.scrl.height = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);
  };

  /**
   * -------------------------------------------------
   * Public Method (AppElems.prototype.setCodeListHeight)
   * -------------------------------------------------
   * @desc Saves the height for list and list items in code elements.
   * @type {function()}
   */
  AppElems.prototype.setCodeListHeight = function() {

    DEBUG && this.debug.start('setCodeListHeight');

    /**
     * @type {elem}
     * @private
     */
    var pre;
    /**
     * @type {elem}
     * @private
     */
    var code;
    /**
     * @type {elem}
     * @private
     */
    var ol;
    /**
     * @type {elem}
     * @private
     */
    var li;

    pre  = document.createElement('pre');
    code = document.createElement('code');
    ol   = document.createElement('ol');
    li   = document.createElement('li');

    pre.style.opacity = '0';

    li.textContent = 'test';

    pre.appendChild(code);
    code.appendChild(ol);
    ol.appendChild(li);

    this.root.appendChild(pre);

    this.code.ol.height = ol.offsetHeight - li.offsetHeight;
    this.code.li.height = li.offsetHeight;

    this.root.removeChild(pre);
  };

  /**
   * -------------------------------------------------
   * Public Method (AppElems.prototype.appendError)
   * -------------------------------------------------
   * @desc Creates and appends the error elements.
   * @type {function()}
   */
  AppElems.prototype.appendError = function() {

    DEBUG && this.debug.start('appendError');

    /**
     * @type {string}
     * @private
     */
    var errorMsg;
    /**
     * @type {elem}
     * @private
     */
    var errorDiv;
    /**
     * @type {elem}
     * @private
     */
    var h2;
    /**
     * @type {elem}
     * @private
     */
    var p;

    errorMsg = '' +
      'Algorithm IV\'s initialization was triggered '   +
      'with an incorrect argument. Please do not edit ' +
      'the initialization function located at the '     +
      'bottom of algorithmIVData.js. If this error '    +
      'persists please <a href="https://github.com'     +
      '/imaginate/algorithmiv/issues" class="dark">'    +
      'open an issue</a> on the Algorithm IV GitHub '   +
      'repo. I hope Algorithm IV is able to help you '  +
      'learn more!&NewLine;- Adam';

    errorDiv = document.createElement('div');
    h2 = document.createElement('h2');
    p  = document.createElement('p');

    errorDiv.className = 'initError';

    h2.textContent = 'Setup Error';
    p.textContent  = message;

    errorDiv.appendChild(h2);
    errorDiv.appendChild(p);

    this.ques.appendChild(errorDiv);

    this.hold.style.display = 'none';
  };
