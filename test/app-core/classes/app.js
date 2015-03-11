  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?Object} config - The user's config settings.
   * @param {?hashMap} sources - The user's sources.
   * @param {?Object} categories - The user's categories.
   * @param {?Object} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    /**
     * @type {(vals|boolean)}
     * @private
     */
    var pass;

    // Check the user inputs
    pass = [ config, sources, categories, questions ];
    pass = checkType(pass, 'object');

    /**
     * ---------------------------------------------------
     * Private Property (App.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('App') : null;

    var args;
    if (DEBUG) {
      this.debug.start('init', config, sources, categories, questions);
      args = [ 'init' ];
      args.push(config, 'object', sources, 'object');
      args.push(categories, 'object', questions, 'object');
      this.debug.args(args);
    }

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags)
     * -----------------------------------------------
     * @desc Saves flags that explain the current state of the app.
     * @type {AppFlags}
     * @struct
     */
    this.flags = new AppFlags(pass);

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems)
     * -----------------------------------------------
     * @desc Saves a reference to key DOM nodes for this app.
     *   <ol>
     *     <li>root: #aIV</li>
     *     <li>sel: #aIV-selections</li>
     *     <li>main: #aIV-main</li>
     *     <li>nav: #aIV-nav</li>
     *     <li>qs: #aIV-questions</li>
     *   </ol>
     * @type {{
     *   root: HTMLElement,
     *   sel : HTMLElement,
     *   main: HTMLElement,
     *   nav : HTMLElement,
     *   ques: HTMLElement,
     *   hold: HTMLElement,
     *   scrl: {
     *     height: number
     *   },
     *   code: {
     *     ol: {
     *       height: number
     *     },
     *     li: {
     *       height: number
     *     }
     *   }
     * }}
     * @struct
     */
    this.elems = {
      root: null,
      sel : null,
      main: null,
      nav : null,
      ques: null,
      scrl: {},
      code: {}
    };

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.scrl.height)
     * -----------------------------------------------
     * @desc Saves the height of the browser's DOM loaded scrollbar.
     * @type {number}
     */
    this.elems.scrl.height = 0;

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.code)
     * -----------------------------------------------
     * @desc Saves values of the DOM loaded prettified list tags.
     * @type {{
     *   ol: Object,
     *   li: Object
     * }}
     * @struct
     
     */
    this.elems.code = {
      ol: {},
      li: {}
    };

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.code.ol.height)
     * -----------------------------------------------
     * @desc Saves the height of the DOM loaded prettified ordered list.
     * @type {number}
     */
    this.elems.code.ol.height = 0;

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.code.li.height)
     * -----------------------------------------------
     * @desc Saves the height of the DOM loaded prettified list item.
     * @type {number}
     */
    this.elems.code.li.height = 0;

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {Config}
     */
    this.config = (pass) ? new Config(config) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {Sources}
     */
    this.sources = (pass) ? new Sources(sources) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {Categories}
     */
    this.categories = (pass) ? new Categories(categories) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.searchBar)
     * ---------------------------------------------------
     * @type {SearchBar}
     */
    this.searchBar = ( (pass) ?
      new SearchBar(this.sources, this.categories) : null
    );

    /**
     * ---------------------------------------------------
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions = ( (pass) ?
      new Questions(questions, this.config.questions.get('output')) : null
    );

    // Update the config and search bar
    if (pass) {
      config.searchDefaults = config.searchDefaults || null;
      this.config.searchBar.setDefaults(config.searchDefaults,
                                        this.searchBar.names,
                                        this.searchBar.ids.subCat,
                                        this.questions.len);
      this.searchBar.setToDefaults(this.config.searchBar.defaults);
    }
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.appendMainElems)
   * -----------------------------------------------
   * @desc Creates and appends the main html elements for this app.
   * @type {function()}
   */
  App.prototype.appendMainElems = function() {

    DEBUG && this.debug.start('appendMainElems');

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

    this.elems.root = document.createElement('div');
    h1 = document.createElement('h1');
    this.elems.sel  = document.createElement('nav');
    this.elems.main = document.createElement('div');
    this.elems.nav  = document.createElement('nav');
    this.elems.ques = document.createElement('section');
    this.elems.hold = document.createElement('img');
    errorDiv = document.createElement('div');
    h2 = document.createElement('h2');
    p  = document.createElement('p');

    this.elems.root.id = 'aIV';
    this.elems.sel.id  = 'aIV-selections';
    this.elems.main.id = 'aIV-main';
    this.elems.nav.id  = 'aIV-nav';
    this.elems.ques.id = 'aIV-questions';

    this.elems.sel.className  = 'selections';
    this.elems.main.className = 'main';
    this.elems.ques.className = 'questions';
    this.elems.hold.className = 'loader';
    errorDiv.className = 'loadError';

    h1.textContent = 'Algorithm IV';
    h2.textContent = 'Load Error';
    p.textContent  = errorMsg;

    this.elems.hold.src = 'images/loading.gif';

    this.elems.root.appendChild(h1);
    this.elems.root.appendChild(this.elems.sel);
    this.elems.root.appendChild(this.elems.main);
    this.elems.main.appendChild(this.elems.nav);
    this.elems.main.appendChild(this.elems.ques);
    this.elems.ques.appendChild(errorDiv);
    this.elems.ques.appendChild(this.elems.hold);
    errorDiv.appendChild(h2);
    errorDiv.appendChild(p);

    document.body.appendChild(this.elems.root);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.appendNavElems)
   * -----------------------------------------------
   * @desc Creates and appends the main html elements for this app.
   * @type {function()}
   */
  App.prototype.appendNavElems = function() {

    DEBUG && this.debug.start('appendNavElems');

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

    this.elems.nav.appendChild(prev);
    this.elems.nav.appendChild(next);
  };

  /**
   * -------------------------------------------------
   * Public Method (App.prototype.setScrollbarHeight)
   * -------------------------------------------------
   * @desc Saves the width of the browser's scrollbar.
   * @type {function()}
   */
  App.prototype.setScrollbarHeight = function() {

    DEBUG && this.debug.start('setScrollbarHeight');

    /**
     * @type {elem}
     * @private
     */
    var div;

    div = document.createElement('div');
    div.className = 'aIV-scrollbar';
    document.body.appendChild(div);

    this.elems.scrl.height = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);
  };

  /**
   * -------------------------------------------------
   * Public Method (App.prototype.setCodeListHeight)
   * -------------------------------------------------
   * @desc Saves the height for list and list items in code elements.
   * @type {function()}
   */
  App.prototype.setCodeListHeight = function() {

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

    this.elems.root.appendChild(pre);

    this.elems.code.ol.height = ol.offsetHeight - li.offsetHeight;
    this.elems.code.li.height = li.offsetHeight;

    this.elems.root.removeChild(pre);
  };

  /**
   * -------------------------------------------------
   * Public Method (App.prototype.appendErrorElems)
   * -------------------------------------------------
   * @desc Creates and appends the error html elements for this app.
   * @type {function()}
   */
  App.prototype.appendErrorElems = function() {

    DEBUG && this.debug.start('appendErrorElems');

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

    this.elems.ques.appendChild(errorDiv);

    this.elems.hold.style.display = 'none';
  };
