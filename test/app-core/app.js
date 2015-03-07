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
     * @type {vals}
     * @private
     */
    var vals;
    /**
     * @type {boolean}
     * @private
     */
    var pass;
    /**
     * @type {Object}
     * @private
     */
    var _this;

    // Check the user inputs
    vals = [ config, sources, categories, questions ];
    pass = App.checkType(vals, 'object');
    _this = this;

    /**
     * ---------------------------------------------------
     * Private Property (App.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('App') : null;

    // debugging var
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
     *   <ol>
     *     <li>workerPass: Indicates the web worker has completed formatting.</li>
     *     <li>workerFail: Indicates the web worker has encountered an error.</li>
     *     <li>initDone: Indicates the app has finished initializing.</li>
     *   </ol>
     * @type {{
     *   workerPass: boolean,
     *   workerFail: boolean,
     *   initDone  : boolean
     * }}
     * @struct
     */
    this.flags = {
      workerPass: false,
      workerFail: false,
      initDone  : false
    };

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
    this.questions = (pass) ? new Questions(questions) : null;

    // Initialize the app
    if (pass) {

      // Update the config and search bar
      this.config.setSearchDefaults(config.searchDefaults, this.searchBar,
                                    this.questions.length);
      this.searchBar.updateVals(this.config.searchBar.defaults);

      if (this.config.worker) {
        // --> WebWorker.init();
      }

      document.addEventListener('DOMContentLoaded', function() {
        // --> setScrollbar();
        // --> appendMain();
        // --> setPrettyCode();
        // --> appendNav();
        // --> DisplaySearchBar.init();
        // --> AddEvents.init();
        if (!_this.config.worker) {
          // --> FormatQuestions.init();
          // --> AppendQuestions.init();
          // --> DisplayQuestions.assembleQuestions();
        }
        else {
          _this.flags.initDone = true;
          if (_this.flags.workerFail) {
            getClass('loadError')[0].style.display = 'block';
          }
          if (_this.flags.workerPass || _this.flags.workerFail) {
            // --> DisplayQuestions.assembleQuestions();
          }
        }
        DEBUG && debug.group('init', 'end');
      });
    }
    else {
      // Show error message
      document.addEventListener('DOMContentLoaded', function() {
        // --> appendMain();
        // --> appendError();
        DEBUG && debug.group('init', 'end');
      });
    }
/******** CONVERT FOLLOWING PRIVATE METHODS TO FIT NEW FORMAT ****/
    /**
     * ---------------------------------------------
     * Private Method (setScrollbar)
     * ---------------------------------------------
     * saves the width of the browser's scrollbar
     * @type {function()}
     * @private
     */
    function setScrollbar() {
      // Debugger
      DEBUG.LoadApp.call && console.log(
        'CALL: LoadApp.setScrollbar()'
      );
      // Declare method variables
      var div;
      // Create temporary div
      div = document.createElement('div');
      div.className = 'aIV-scrollbar';
      // Add div to body
      document.body.appendChild(div);
      // Save the scrollbar width
      configuration.scrollbar = div.offsetWidth - div.clientWidth;
      // Remove div 
      document.body.removeChild(div);
    }

    /**
     * ---------------------------------------------
     * Private Method (setPrettyCode)
     * ---------------------------------------------
     * set the height and padding options for syntax
     *  highlighting
     * @type {function()}
     * @private
     */
    function setPrettyCode() {
      // Debugger
      DEBUG.LoadApp.call && console.log(
        'CALL: LoadApp.setPrettyCode()'
      );
      // Declare method variables
      var pre, code, ol, li, liHeight, olHeight;
      // Create temporary elements
      pre  = document.createElement('pre');
      code = document.createElement('code');
      ol   = document.createElement('ol');
      li   = document.createElement('li');
      // Hide from user view
      pre.style.opacity = '0';
      // Add dummy content
      li.textContent = 'test';
      // Append elements
      roots.root.appendChild(pre);
      pre.appendChild(code);
      code.appendChild(ol);
      ol.appendChild(li);
      // Save line and list values
      liHeight = li.offsetHeight;
      olHeight = ol.offsetHeight - liHeight;
      // Debugger
      DEBUG.LoadApp.state && console.log(
        'STATE: LoadApp.setPrettyCode() ' +
        'Note: liHeight= %d, olHeight= %d', liHeight, olHeight
      );
      // Save the heights
      configuration.prettyCode.olHeight = olHeight;
      configuration.prettyCode.liHeight = liHeight;
      // Remove elements
      roots.root.removeChild(pre);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendMain)
     * ---------------------------------------------
     * inserts the main html elements of this module
     * @type {function()}
     * @private
     */
    function appendMain() {
      // Debugger
      DEBUG.LoadApp.call && console.log(
        'CALL: LoadApp.appendMain()'
      );
      // Declare method variables
      var message, root, h1, sel, main,
          nav, qs, error, h2, p, loader;
      // Set error message
      message = '' +
      'The web worker failed. Please wait ' +
      'while the app is being loaded manually.';
      // Create tags
      root   = document.createElement('div');
      h1     = document.createElement('h1');
      sel    = document.createElement('nav');
      main   = document.createElement('div');
      nav    = document.createElement('nav');
      qs     = document.createElement('section');
      error  = document.createElement('div');
      h2     = document.createElement('h2');
      p      = document.createElement('p');
      loader = document.createElement('img');
      // Add ids
      root.id = 'aIV';
      sel.id  = 'aIV-selections';
      main.id = 'aIV-main';
      nav.id  = 'aIV-nav';
      qs.id   = 'aIV-questions';
      // Add classes
      sel.className    = 'selections';
      main.className   = 'main';
      qs.className     = 'questions';
      error.className  = 'loadError';
      loader.className = 'loader';
      // Add content
      h1.textContent = 'Algorithm IV';
      h2.textContent = 'Load Error';
      p.textContent  = message;
      loader.src     = 'images/loading.gif';
      // Append elements
      document.body.appendChild(root);
      root.appendChild(h1);
      root.appendChild(sel);
      root.appendChild(main);
      main.appendChild(nav);
      main.appendChild(qs);
      qs.appendChild(error);
      error.appendChild(h2);
      error.appendChild(p);
      qs.appendChild(loader);
      // Save root element references
      roots.root = root;
      roots.sel  = sel;
      roots.main = main;
      roots.nav  = nav;
      roots.qs   = qs;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendNav)
     * ---------------------------------------------
     * inserts the main html elements of this module
     * @type {function()}
     * @private
     */
    function appendNav() {
      // Debugger
      DEBUG.LoadApp.call && console.log(
        'CALL: LoadApp.appendNav()'
      );
      // Declare method variables
      var prev, pArrow, pBG, pTitle, nav,
          next, nArrow, nBG, nTitle;
      // Create tags
      prev   = document.createElement('div');
      pArrow = document.createElement('div');
      pBG    = document.createElement('div');
      pTitle = document.createElement('div');
      next   = document.createElement('div');
      nArrow = document.createElement('div');
      nBG    = document.createElement('div');
      nTitle = document.createElement('div');
      // Add ids
      pArrow.id = 'aIV-prev';
      nArrow.id = 'aIV-next';
      // Add classes
      prev.className = 'prev';
      next.className = 'next';
      pArrow.className = nArrow.className = 'arrow';
      pBG.className    = nBG.className    = 'bg';
      pTitle.className = nTitle.className = 'title';
      // Add content
      pTitle.textContent = pArrow.textContent = 'Previous';
      nTitle.textContent = nArrow.textContent = 'Next';
      // Set nav element
      nav = getID('aIV-nav');
      // Append elements
      nav.appendChild(prev);
      nav.appendChild(next);
      prev.appendChild(pArrow);
      prev.appendChild(pBG);
      prev.appendChild(pTitle);
      next.appendChild(nArrow);
      next.appendChild(nBG);
      next.appendChild(nTitle);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendError)
     * ---------------------------------------------
     * insert a module call error html elements
     * @type {function()}
     * @private
     */
    function appendError() {
      // Debugger
      DEBUG.LoadApp.call && console.log(
        'CALL: LoadApp.appendError()'
      );
      // Declare method variables
      var message, error, h2, q;
      // Set app error message
      message = '' +
      'Algorithm IV\'s initialization was triggered '   +
      'with an incorrect argument. Please do not edit ' +
      'the initialization function located at the '     +
      'bottom of algorithmIVData.js. If this error '    +
      'persists please <a href="https://github.com'     +
      '/imaginate/algorithmiv/issues" class="dark">'    +
      'open an issue</a> on the Algorithm IV GitHub '   +
      'repo. I hope Algorithm IV is able to help you '  +
      'learn more!&NewLine;- Adam';
      // Create tags
      error = document.createElement('div');
      h2    = document.createElement('h2');
      p     = document.createElement('p');
      // Add classes
      error.className = 'initError';
      // Add content
      h2.textContent = 'Setup Error';
      p.textContent = message;
      // Append elements
      roots.qs.appendChild(error);
      error.appendChild(h2);
      error.appendChild(p);
      // Hide loader
      getClass('loader')[0].style.display = 'none';
    }
/******** END OF PRIVATE METHODS TO CONVERT ****/
  };

  /**
   * ---------------------------------------------------
   * Public Method (App.sortKeys)
   * ---------------------------------------------------
   * @desc A helper method that sorts the keys from an object.
   * @param {strings} ids - The unsorted keys.
   * @param {hashMap} hMap - The object acting as a hash map.
   * @return {strings} The sorted keys.
   */
  App.sortKeys = function(ids, hMap) {

    if (DEBUG) {
      this.debug.start('sortKeys', ids, hMap);
      this.debug.args('sortKeys', ids, 'array', hMap, 'object');
    }

    /**
     * @type {strings}
     * @private
     */
    var keys;
    /**
     * @type {strings}
     * @private
     */
    var names;
    /**
     * @type {string}
     * @private
     */
    var name;
    /**
     * @type {number}
     * @private
     */
    var ii;

    keys = [];
    names = [];

    ids.forEach(function(/** string */ id, /** number */ i) {

      name = hMap[id].toLowerCase();

      if (!i) {
        keys.push(id);
        names.push(name);
      }
      else {

        ii = i - 1;
        while (true) {

          if (name >= names[ii]) {
            ++ii;
            keys.splice(ii, 0, id);
            names.splice(ii, 0, name);
            break;
          }

          if (ii === 0) {
            keys.unshift(id);
            names.unshift(name);
            break;
          }
          --ii;
        }
      }
    });

    return keys;
  };

  /**
   * ---------------------------------------------------
   * Public Method (App.checkType)
   * ---------------------------------------------------
   * @param {vals} vals - The value(s) to be evaluated.
   * @param {(string|strings)} _types - The type(s) to evaluate the
   *   value(s) against. The optional types are 'string', 'number',
   *   'boolean', 'object', 'undefined', and 'array'. Use '|' as the
   *   separator for multiple types (e.g. 'string|number'). Use '=' to
   *   indicate the value is optional (e.g. 'array=' or 'string|number=').
   *   Use '!' to indicate that null is not a possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  App.checkType = function(vals, _types) {

    if (DEBUG) {
      this.debug.start('checkType', vals, _types);
      this.debug.args('checkType', vals, 'array', _types, 'string|array');
    }

    /**
     * @type {boolean}
     * @private
     */
    var pass;
    /**
     * @type {*}
     * @private
     */
    var val;

    if (typeof _types === 'string') {
      _types = vals.map(function() {
        return _types;
      });
    }

    if (vals.length !== _types.length) {
      return false;
    }

    pass = _types.every(function(/** string */ _type, /** number */ i) {

      val = vals[i];
      _type = _type.toLowerCase().replace(/[^a-zA-Z\|\=\!]/g, '');
      types = ( /\|/.test(_type) ) ? _type.split('|') : [ _type ];

      return types.some(function(/** string */ type) {

        if (val === undefined) {
          if (/\=/.test(type) || type === 'undefined') {
            return true;
          }
        }
        else {

          if (val === null && /\!/.test(type) === false) {
            return true;
          }
          type = type.replace(/\!|\=/g, '');

          if (type === 'array' && Array.isArray(val)) {
            return true;
          }

          if (/(string)|(number)|(boolean)|(object)/.test(type) &&
              typeof val === type) {
            return true;
          }
        }

        return false;
      });
    });

    return pass;
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;
