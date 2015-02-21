/** @preserve blank line for sed script to insert copyright after minify */

/* Algorithm IV (v1.0.1) (learn@algorithmiv.com)
 * Section: Core Module
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The MIT License (algorithmiv.com/docs/license) */

/**
 * ------------------------------------------------------------------
 * Algorithm IV Core Module (v1.0.1)
 * ------------------------------------------------------------------
 * manages a list of practice questions and detailed solutions
    for learning computer science focused algorithms and data
    structures, improving programming skillsets, and preparing
    for technical interviews (each practice question contains
    the following sections: categories, source, status, problem,
    solution, output, and links to more details)
 * annotation:
   - Closure Compiler specific JSDoc: developers.google.com/closure/compiler/
 * structure:
   - see github.com/imaginate/algorithmIV/blob/master/coreStructure.md
   - contains an outline of all the variables, methods, and classes
      used in this module
 * contributing:
   - see github.com/imaginate/algorithmIV/blob/master/CONTRIBUTING.md
 */
(function(window, document) {
  "use strict"; 

  /**
   * ---------------------------------------------
   * Pulbic API (algorithmIV)
   * ---------------------------------------------
   * holds the publically available api
   * @type {{
       initialize: function(Object, Object, Object, Object)
     }}
   */
  window.algorithmIV = {
    /**
     * ---------------------------------------------
     * Public Method (algorithmIV.init)
     * ---------------------------------------------
     * initialize this module
     * param: configuration
     * param: categories
     * param: sources
     * param: questions
     */
    init: function(con, cat, s, q) {
      InitializeModule.init(con, cat, s, q);
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Variable (DEBUG)
   * -----------------------------------------------
   * allows for control over app console log calls
   * note: this JSDoc type description is correct
      due to the fact that a sed call converts all
      instances of DEBUG.[property] to DEBUG to
      allow Closure Compiler to easily remove the
      debug code upon minification
   * note: ignore any sed flag comments
   * @const
   * @type {boolean}
   * @private
   */
  var DEBUG = {   //sedFlagStart
    InitializeModule: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    SetConfiguration: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    WebWorker: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    AddEvents: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    DisplaySearchBar: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    FormatQuestions: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    AppendQuestions: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    DisplayQuestions: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    PrettifyCode: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
    HighlightSyntax: {
       call: true,
       fail: true,
      group: true,
      state: true
    },
     call: true,
     fail: true,
    group: true,
    state: true
  };              //sedFlagEnd
  //sedFlagNew

  /**
   * ----------------------------------------------- 
   * Public Variable (qLen)
   * -----------------------------------------------
   * the length of the questions array
   * @type {number}
   * @private
   */
  var qLen;

  /**
   * ----------------------------------------------- 
   * Public Variable (roots)
   * -----------------------------------------------
   * the root elements for this module
   * properties:
     - root: #aIV
     - sel: #aIV-selections
     - main: #aIV-main
     - nav: #aIV-nav
     - qs: #aIV-questions
   * @type {{
       root: Object,
        sel: Object,
       main: Object,
        nav: Object,
         qs: Object
     }}
   * @private
   */
  var roots = {
    root: {},
     sel: {},
    main: {},
     nav: {},
      qs: {}
  };

  /**
   * ----------------------------------------------- 
   * Public Variable (flags)
   * -----------------------------------------------
   * saves flags that explain a current state of the
      environment for the module
   * properties:
     - workerPass: web worker completed formatting
     - workerFail: web worker produced error
     - initDone: app finished initializing
   * @type {{
       workerPass: boolean,
       workerFail: boolean,
         initDone: boolean
     }}
   * @private
   */
  var flags = {
    workerPass: false,
    workerFail: false,
      initDone: false
  };

  /**
   * -----------------------------------------------
   * Public Variable (configuration)
   * -----------------------------------------------
   * an object containing the display configuration
      settings for the module
   * @type {{
       searchSettings: {
            stage: boolean,
           source: boolean,
         category: boolean,
           subCat: boolean
       },
       searchDefaults: {
            view: string,
           order: string,
           stage: string,
          source: string,
         mainCat: string,
          subCat: string,
         startID: number
       },
       questionFormat: {
               id: boolean,
         complete: boolean,
           source: boolean,
         category: boolean,
            links: boolean,
           output: boolean
       },
       prettyCode: {
         olHeight: number,
         liHeight: number
       },
              id: boolean,
          worker: boolean,
         content: Array.<Object>,
       scrollbar: number
     }}
   * @private
   */
  var configuration = {
    searchSettings: {
         stage: true,
        source: true,
      category: true,
        subCat: true
    },
    searchDefaults: {
         view: 'one',
        order: 'asc',
        stage: 'all',
       source: 'all',
      mainCat: 'all',
       subCat: 'all',
      startID:  0
    },
    questionFormat: {
            id: true,
      complete: true,
        source: true,
      category: true,
         links: true,
        output: true
    },
    prettyCode: {
      olHeight: 0,
      liHeight: 0
    },
           id: true,
       worker: true,
      content: [],
    scrollbar: 0
  };

  /**
   * -----------------------------------------------
   * Public Variable (configOptions)
   * -----------------------------------------------
   * an object containing the options for the string
      properties of configuration
   * @type {{
       searchDefaults: {
            view: Array.<string>,
           order: Array.<string>,
           stage: Array.<string>,
          source: Array.<string>,
         mainCat: Array.<string>,
          subCat: Array.<string>
       }
     }}
   * @private
   */
  var configOptions = {
    searchDefaults: {
         view: ['one','all'],
        order: ['asc','desc'],
        stage: ['all','com','inc'],
       source: ['all'],
      mainCat: ['all'],
       subCat: ['all']
    }  
  };

  /**
   * -----------------------------------------------
   * Public Variable (searchValues)
   * -----------------------------------------------
   * an object containing the current search values
   * @type {{
          view: string,
         order: string,
         stage: string,
        source: string,
       mainCat: string,
        subCat: string
     }}
   * @private
   */
  var searchValues = {};

  /**
   * -----------------------------------------------
   * Public Variable (sources)
   * -----------------------------------------------
   * an array of objects containing the question
      sources
   * @type {{
        list: Object,
         len: number,
         ids: Array.<string>
     }}
   * @private
   */
  var sources = { list:{}, len: 0, ids:[] };

  /**
   * -----------------------------------------------
   * Public Variable (categories)
   * -----------------------------------------------
   * an array of objects containing the question
      categories
   * @type {{
       main: Object,
        sub: Object,
        opt: Object,
        len: {
          main: number,
           sub: Object
        },
        ids: {
          main: Array.<string>,
           sub: Array.<string>
        }
     }}
   * @private
   */
  var categories = {
    main:{},
     sub:{},
     opt:{},
     len:{ main: 0, sub:{} },
     ids:{ main:[], sub:{} }
  };

  /**
   * ---------------------------------------------
   * Public Variable (questions)
   * ---------------------------------------------
   * an array of objects containing each question,
      its details, and your solution for it
   * @type {Array.<{
       complete: boolean,
       category: Array.<string>,
         source: string,
          links: Array.<{ name: string, href: string }>,
        problem: string,
       solution: function(),
      codeWidth: number|undefined
     }>}
   * @private
   */
  var questions = [];

  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * getElementById shortcut
   * param: the id to be selected (string)
   * @type {function(string): Object}
   * @private
   */
  function getID(name) {
    // Debuggers
    DEBUG.call && console.log(
      'CALL: public.getID(%s)', name
    );
    DEBUG.fail && console.assert(
      typeof name === 'string',
      'FAIL: public.getID() ' +
      'Note: Incorrect argument operand.'
    );
    // Return the node
    return document.getElementById(name);
  }

  /**
   * ---------------------------------------------
   * Public Method (getTag)
   * ---------------------------------------------
   * getElementsByTagName shortcut
   * param: the tag to be selected (string)
   * param: the root element to use (optional) (object)
   * @type {function(string, Object|undefined): Object}
   * @private
   */
  function getTag(name, root) {
    // Debuggers
    DEBUG.call && console.log(
      'CALL: public.getTag(%s, %O)', name, root
    );
    DEBUG.fail && console.assert(
      (typeof name === 'string' &&
       (typeof root === 'object' ||
        typeof root === 'undefined')),
      'FAIL: public.getTag() ' +
      'Note: Incorrect argument operand.'
    );
    // Set root
    root = root || roots.root;
    // Return the node
    return root.getElementsByTagName(name);
  }

  /**
   * ---------------------------------------------
   * Public Method (getClass)
   * ---------------------------------------------
   * getElementsByClassName shortcut
   * param: the class to be selected (string)
   * param: the root element to use (optional) (object)
   * @type {function(string, Object|undefined): Object}
   * @private
   */
  function getClass(name, root) {
    // Debuggers
    DEBUG.call && console.log(
      'CALL: public.getClass(%s, %O)', name, root
    );
    DEBUG.fail && console.assert(
      (typeof name === 'string' &&
       (typeof root === 'object' ||
        typeof root === 'undefined')),
      'FAIL: public.getClass() ' +
      'Note: Incorrect argument operand.'
    );
    // Set root
    root = root || roots.root;
    // Return the node
    return root.getElementsByClassName(name);
  }

  /**
   * ---------------------------------------------
   * Public Class (InitializeModule)
   * ---------------------------------------------
   * the class containing the steps to initialize
      this module
   * @type {function(): {
       init: function(Object, Object, Object, Object)
     }}
   * @private
   */
  var InitializeModule = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(Object, Object, Object, Object),
         _reset: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (InitializeModule.init)
       * ---------------------------------------------
       * initialize InitializeModule
       * param: configuration
       * param: categories
       * param: sources
       * param: questions
       */
      init: function(config, category, source, question) {
        // OPEN: InitializeModule Group
        DEBUG.InitializeModule.group && console.groupCollapsed(
          'GROUP: InitializeModule ' +
          'Note: configuration= %O, categories= %O, ' +
          'sources= %O, questions= %O', config, category,
          source, question
        );
        // Run init
        init(config, category, source, question);
      }
    };

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * initialize Algorithm IV
     * param: configuration
     * param: categories
     * param: sources
     * param: questions
     * @type {function(Object, Object, Object, Object)}
     * @private
     */
    function init(config, category, source, question) {
      // Debuggers
      DEBUG.InitializeModule.call && console.log(
        'CALL: InitializeModule.init()'
      );
      DEBUG.InitializeModule.fail && console.assert(
        (typeof config   === 'object' &&
         typeof source   === 'object' &&
         typeof category === 'object' &&
         Array.isArray(question) &&
         typeof config.searchSettings === 'object' &&
         typeof config.searchDefaults === 'object' &&
         typeof config.questionFormat === 'object' &&
         typeof config.prettyCode     === 'object' &&
         typeof category.main === 'object' &&
         typeof category.sub  === 'object'),
        'FAIL: InitializeModule.init() ' +
        'Note: Incorrect argument operand.'
      );
      // If (module values set)
      // Then {load the module}
      // Else {display error message}
      if ( SetConfiguration.init(config, category, source, question) ) {
        // If (web worker turned on)
        // Then {load with web worker}
        // Else {load without worker}
        if (configuration.worker) {
          loadModule(true);
        }
        else {
          loadModule(false);
        }
      }
      else {
        // Wait till dom loads to insert elements
        document.addEventListener('DOMContentLoaded', function() {
          // Append main elements
          appendMain();
          // Display error
          appendError();
          // CLOSE: InitializeModule Group
          DEBUG.InitializeModule.group && console.groupEnd();
        });
      }
    }

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
      DEBUG.InitializeModule.call && console.log(
        'CALL: InitializeModule.setScrollbar()'
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
      DEBUG.InitializeModule.call && console.log(
        'CALL: InitializeModule.setPrettyCode()'
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
      DEBUG.InitializeModule.state && console.log(
        'STATE: InitializeModule.setPrettyCode() ' +
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
      DEBUG.InitializeModule.call && console.log(
        'CALL: InitializeModule.appendMain()'
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
      /*
       * Add This Functionality Later
       * HTML Format For Old Browsers:
       * <div class="old_browser">
           <h1>Browser Error</h1>
           <p>
            'Algorithm IV does not support Internet Explorer '
            '8 or less. To use this application you must use '
            'a modern browser.'
          </p>
         </div>
       */
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
      DEBUG.InitializeModule.call && console.log(
        'CALL: InitializeModule.appendNav()'
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
      DEBUG.InitializeModule.call && console.log(
        'CALL: InitializeModule.appendError()'
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

    /**
     * ---------------------------------------------
     * Private Method (loadModule)
     * ---------------------------------------------
     * load this module
     * param: load with a web worker (boolean)
     * @type {function(boolean)}
     * @private
     */
    function loadModule(worker) {
      // Debuggers
      DEBUG.InitializeModule.call && console.log(
        'CALL: InitializeModule.loadModule(%s)', worker
      );
      DEBUG.InitializeModule.fail && console.assert(
        typeof worker === 'boolean',
        'FAIL: InitializeModule.loadModule() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var message, error, h2, p, loader;
      // Initialize the web worker
      if (worker) {
        WebWorker.init();
      }
      // Wait till dom loads to insert elements
      document.addEventListener('DOMContentLoaded', function() {
        // Save the browser scrollbar width
        setScrollbar();
        // Append main html elements
        appendMain();
        // Save padding and height info for prettifier
        setPrettyCode();
        // Append nav elements
        appendNav();
        // Append search options
        DisplaySearchBar.init();
         // Attach event handlers
        AddEvents.init();
        // If (load without web worker)
        // Then {format, append, and display questions}
        if (!worker) {
          FormatQuestions.init();
          AppendQuestions.init();
          DisplayQuestions.assembleQuestions();
        }
        else {
          // Tell web worker the main app init is finished
          flags.initDone = true;
          // If (web worker produced error)
          // Then {show error message}
          if (flags.workerFail) {
            getClass('loadError')[0].style.display = 'block';
          }
          // If (web worker is finished)
          // Then {assemble questions for display}
          if (flags.workerPass || flags.workerFail) {
            DisplayQuestions.assembleQuestions();
          }
        }
        // CLOSE: InitializeModule Group
        DEBUG.InitializeModule.group && console.groupEnd();
      });
    }

    // END CLASS: InitializeModule
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (SetConfiguration)
   * ---------------------------------------------
   * set this module's configuration
   * @type {function(): {
       init: function(Object, Object, Object, Object): boolean
     }}
   * @private
   */
  var SetConfiguration = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(Object, Object, Object, Object): boolean
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (SetConfiguration.init)
       * ---------------------------------------------
       * initialize SetConfiguration
       * param: configuration
       * param: categories
       * param: sources
       * param: questions
       */
      init: function(config, category, source, question) {
        // OPEN: SetConfiguration Group
        DEBUG.SetConfiguration.group && console.groupCollapsed(
          'GROUP: SetConfiguration'
        );
        // Declare method variables
        var success;
        // Run class and save result
        success = init(config, category, source, question);
        // CLOSE: SetConfiguration Group
        DEBUG.SetConfiguration.group && console.groupEnd();
        // Return result of setting
        return success;
      }
    };

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * initialize SetConfiguration
     * param: configuration (object)
     * param: categories (objects)
     * param: sources (objects)
     * param: questions (array of objects)
     * @type {function(Object, Object, Object, Object): boolean}
     * @private
     */
    function init(config, category, source, question) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.init()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        (typeof config   === 'object' &&
         typeof source   === 'object' &&
         typeof category === 'object' &&
         Array.isArray(question) &&
         typeof config.searchSettings === 'object' &&
         typeof config.searchDefaults === 'object' &&
         typeof config.questionFormat === 'object' &&
         typeof config.prettyCode     === 'object' &&
         typeof category.main === 'object' &&
         typeof category.sub  === 'object'),
        'FAIL: SetConfiguration.init() ' +
        'Note: Incorrect argument operand.'
      );
      // If (incorrect argument entered)
      // Then {end script and return failure}
      if ( !checkConfig(config, category, source, question) ) {
        return false;
      }
      // Set configuration
      // note: category, source, and questions must be called first
      //        to set configOptions and qLen
      // note: searchSettings must be called before searchDefaults
      setCategories(category);
      setSources(source);
      setQuestions(question);
      setSearchSettings(config.searchSettings);
      setSearchDefaults(config.searchDefaults);
      setQuestionFormat(config.questionFormat);
      setPrettyCode(config.prettyCode);
      setIDAction(config.id);
      setWebWorker(config.worker);
      // Set the current searchValues to searchDefaults
      setSearchValues();
      // Return success
      return true;
    }

    /**
     * ---------------------------------------------
     * Private Method (checkConfig)
     * ---------------------------------------------
     * check the user input values
     * param: configuration (object)
     * param: categories (object)
     * param: sources (object)
     * param: questions (array of objects)
     * @type {function(Object, Object, Object, Object): boolean}
     * @private
     */
    function checkConfig(config, category, source, question) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.checkConfig()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        (typeof config   === 'object' &&
         typeof source   === 'object' &&
         typeof category === 'object' &&
         Array.isArray(question) &&
         typeof config.searchSettings === 'object' &&
         typeof config.searchDefaults === 'object' &&
         typeof config.questionFormat === 'object' &&
         typeof config.prettyCode     === 'object' &&
         typeof category.main === 'object' &&
         typeof category.sub  === 'object'),
        'FAIL: SetConfiguration.checkConfig() ' +
        'Note: Incorrect argument operand.'
      );
      // If (incorrect argument entered)
      // Then {end script and return failure}
      if (typeof config   !== 'object' ||
          typeof source   !== 'object' ||
          typeof category !== 'object' ||
          !Array.isArray(question) ||
          typeof config.searchSettings !== 'object' ||
          typeof config.searchDefaults !== 'object' ||
          typeof config.questionFormat !== 'object' ||
          typeof config.prettyCode     !== 'object' ||
          typeof category.main !== 'object' ||
          typeof category.sub  !== 'object') {
        return false;
      }
      // Return success
      return true;
    }

    /**
     * ---------------------------------------------
     * Private Method (setCategories)
     * ---------------------------------------------
     * set categories to user input
     * param: categories (object)
     * @type {function({
         main: Object,
          sub: Object
       })}
     * @private
     */
    function setCategories(newCategories) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setCategories()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof newCategories === 'object',
        'FAIL: SetConfiguration.setCategories() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var mainIds, i, cLen, id, sub, subIds, sLen;
      // Set main categories
      categories.main = newCategories.main;
      // Order main categories
      mainIds = orderCategories(newCategories.main);
      // Set ordered list of main category ids
      categories.ids.main = mainIds;
      // Save the count of main categories
      categories.len.main = cLen = mainIds.length;
      // If (a main category exists)
      // Then {update configOptions and set sub category values}
      if (cLen > 0) {
        for (i=0; i<cLen; i++) {
          // Save the current main category id
          id = mainIds[i];
          // Add category to configOptions
          configOptions.searchDefaults.mainCat.push(id);
          // Save sub category
          categories.sub[id] = sub = newCategories.sub[id] || {};
          // Verify sub category is object
          sub = (typeof sub === 'object') ? sub : {};
          // Save ordered list of sub category ids
          categories.ids.sub[id] = subIds = orderCategories(sub);
          // Save count of sub categories
          categories.len.sub[id] = sLen = subIds.length;
          // If (sub categories exist)
          // Then {format sub categories}
          categories.opt[id] = (sLen > 0) ? formatCategories(sub) : '';
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (orderCategories)
     * ---------------------------------------------
     * return ordered array of categories
     * param: categories (object)
     * @type {function(Object): Array.<string>}
     * @private
     */
    function orderCategories(newCategories) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.orderCategories()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof newCategories === 'object',
        'FAIL: SetConfiguration.orderCategories() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var sortedList, id, catName, sLen, last, x, current;
      // Set the sortedList categories to empty
      sortedList = [];
      // Loop through categories
      for (id in newCategories) {
        // If (property is not native)
        if ( newCategories.hasOwnProperty(id) ) {
          // Save current category name
          catName = newCategories[id];
          catName = catName.toLowerCase();
          // Debugger
          DEBUG.SetConfiguration.state && console.log(
            'STATE: SetConfiguration.orderCategories() ' +
            'Note: id= %s, catName= %s', id, catName
          );
          // Save the length of the sorted list
          sLen = sortedList.length;
          // If (index is 0)
          // Then {add category to sorted list}
          if (sLen === 0) {
            sortedList.push(id);
          }
          else {
            // Save last index of sorted list
            last = sLen - 1;
            // Start looping through sorted list
            loop:
            for (x=0; x<sLen; x++) {
              // Save current category name
              current = newCategories[ sortedList[x] ];
              current = current.toLowerCase();
              // Debugger
              DEBUG.SetConfiguration.state && console.log(
                'STATE: SetConfiguration.orderCategories() ' +
                'Note: x= %d, current= %s', x, current
              );
              // If (name is before current name)
              // Then {insert category here and end loop}
              if (catName < current) {
                sortedList.splice(x, 0, id);
                break loop;
              }
              // If (last name in list)
              // Then {add category to list end}
              if (x === last) {
                sortedList.push(id);
              }
            }
          }
        }
      }
      // Debugger
      DEBUG.SetConfiguration.state && console.log(
        'STATE: SetConfiguration.orderCategories() ' +
        'Note: sortedList= %O', sortedList
      );
      // Return sorted list of category objects
      return sortedList;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatCategories)
     * ---------------------------------------------
     * return a string of the option elements for
        the supplied sub categories
     * param: sub categories (object)
     * @type {function(Object): string}
     * @private
     */
    function formatCategories(newCategories) {
      // Debuggers
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.formatCategories()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof newCategories === 'object',
        'FAIL: SetConfiguration.formatCategories() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var id, catName, result;
      // Set result to empty
      result = '';
      // Loop through categories
      for (id in newCategories) {
        // If (property is not native)
        if ( newCategories.hasOwnProperty(id) ) {
          // Save category object
          catName = newCategories[id];
          // Add category to configOptions
          configOptions.searchDefaults.subCat.push(id);
          // Format the category
          result += '' +
          '<option value="' + id + '">' +
            catName +
          '</option>';
        }
      }
      // Return the string
      return result;
    }

    /**
     * ---------------------------------------------
     * Private Method (setSources)
     * ---------------------------------------------
     * set sources to user input
     * param: sources (object)
     * @type {function(Object)}
     * @private
     */
    function setSources(newSources) {
      // Debuggers
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setSources()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof newSources === 'object',
        'FAIL: SetConfiguration.setSources() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var sortedList, id, name, sLen, last, x, current;
      // Save the sources
      sources.list = newSources;
      // Set the sortedList sources to empty
      sortedList = [];
      // Loop through sources
      for (id in newSources) {
        // If (property is not native)
        if ( newSources.hasOwnProperty(id) ) {
          // Save current source name
          name = newSources[id];
          name = name.toLowerCase();
          // Add source to configOptions
          configOptions.searchDefaults.source.push(id);
          // Save the length of the sorted list
          sLen = sortedList.length;
          // If (index is 0)
          // Then {add source to sorted list}
          if (sLen === 0) {
            sortedList.push(id);
          }
          else {
            // Save last index of sorted list
            last = sLen - 1;
            // Start looping through sorted list
            loop:
            for (x=0; x<sLen; x++) {
              // Save current source name
              current = newSources[ sortedList[x] ]; 
              current = current.toLowerCase();
              // If (name is before current name)
              // Then {insert source here and end loop}
              if (name < current) {
                sortedList.splice(x, 0, id);
                break loop;
              }
              // If (last name in list)
              // Then {add source to list end}
              if (x === last) {
                sortedList.push(id);
              }
            }
          }
        }
      }
      // Save the sorted list of source ids
      sources.ids = sortedList;
      // Save the count of source ids
      sources.len = sortedList.length;
    }

    /**
     * ---------------------------------------------
     * Private Method (setQuestions)
     * ---------------------------------------------
     * set questions to user input
     * param: questions (array of objects)
     * @type {function(Object)}
     * @private
     */
    function setQuestions(question) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setQuestions()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof question === 'object',
        'FAIL: SetConfiguration.setQuestions() ' +
        'Note: Incorrect argument operand.'
      );
      // Save questions length
      qLen = question.length;
      // If (question exists)
      // Then {set question values}
      questions = (qLen > 0) ? question : [];
    }

    /**
     * ---------------------------------------------
     * Private Method (setSearchSettings)
     * ---------------------------------------------
     * set search config settings to user input
     * param: config.searchSettings (object)
     * @type {function(Object)}
     * @private
     */
    function setSearchSettings(settings) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setSearchSettings()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof settings === 'object',
        'FAIL: SetConfiguration.setSearchSettings() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration searchSettings values
      if (typeof settings.stage === 'boolean') {
        configuration.searchSettings.stage = settings.stage;
      }
      if (typeof settings.category === 'boolean') {
        configuration.searchSettings.category = settings.category;
      }
      if (typeof settings.source === 'boolean') {
        configuration.searchSettings.source = settings.source;
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (setSearchDefaults)
     * ---------------------------------------------
     * set search config defaults to user input
     * param: config.searchDefaults (object)
     * @type {function(Object)}
     * @private
     */
    function setSearchDefaults(defaults) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setSearchDefaults()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof defaults === 'object',
        'FAIL: SetConfiguration.setSearchDefaults() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var opts, flag, subCats, id;
      // Save configOptions
      opts = configOptions.searchDefaults;
      // Set configuration searchDefaults values
      if (typeof defaults.view === 'string') {
        if (opts.view.indexOf(defaults.view) !== -1) {
          configuration.searchDefaults.view = defaults.view;
        }
      }
      if (typeof defaults.order === 'string') {
        if (opts.order.indexOf(defaults.order) !== -1) {
          configuration.searchDefaults.order = defaults.order;
        }
      }
      if (typeof defaults.stage === 'string' &&
          configuration.searchSettings.stage) {
        if (opts.stage.indexOf(defaults.stage) !== -1) {
          configuration.searchDefaults.stage = defaults.stage;
        }
      }
      if (typeof defaults.source === 'string' &&
          configuration.searchSettings.source) {
        if (opts.source.indexOf(defaults.source) !== -1) {
          configuration.searchDefaults.source = defaults.source;
        }
      }
      if (typeof defaults.mainCat === 'string' &&
          configuration.searchSettings.category) {
        if (opts.mainCat.indexOf(defaults.mainCat) !== -1) {
          configuration.searchDefaults.mainCat = defaults.mainCat;
        }
      }
      if (typeof defaults.subCat === 'string' &&
          configuration.searchSettings.subCat) {
        if (opts.subCat.indexOf(defaults.subCat) !== -1) {
          // If (main and sub categories are not all)
          if (defaults.subCat !== 'all' &&
              configuration.searchDefaults.mainCat !== 'all') {
            flag = true;
            // Save default main category's sub categories
            subCats = categories.sub[configuration.searchDefaults.mainCat];
            // Check if default sub category is in main category
            loop:
            for (id in subCats) {
              // If (property is not native)
              if ( subCats.hasOwnProperty(id) ) {
                // If (category ids match)
                // Then {turn off flag}
                if (defaults.subCat == id) {
                  flag = false;
                  break loop;
                }
              }
            }
            if (!flag) {
              configuration.searchDefaults.subCat = defaults.subCat;
            }
          }
          else {
            configuration.searchDefaults.subCat = defaults.subCat;
          }
        }
      }
      if (typeof defaults.startID === 'number') {
        if (defaults.startID > 0 && defaults.startID <= qLen) {
          configuration.searchDefaults.startID = defaults.startID;
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (setQuestionFormat)
     * ---------------------------------------------
     * set question formatting config settings to
        user input
     * param: config.questionFormat (object)
     * @type {function(Object)}
     * @private
     */
    function setQuestionFormat(settings) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setQuestionFormat()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof settings === 'object',
        'FAIL: SetConfiguration.setQuestionFormat() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration questionFormat values
      if (typeof settings.id === 'boolean') {
        configuration.questionFormat.id = settings.id;
      }
      if (typeof settings.complete === 'boolean') {
        configuration.questionFormat.complete = settings.complete;
      }
      if (typeof settings.category === 'boolean') {
        configuration.questionFormat.category = settings.category;
      }
      if (typeof settings.source === 'boolean') {
        configuration.questionFormat.source = settings.source;
      }
      if (typeof settings.links === 'boolean') {
        configuration.questionFormat.links = settings.links;
      }
      if (typeof settings.output === 'boolean') {
        configuration.questionFormat.output = settings.output;
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (setPrettyCode)
     * ---------------------------------------------
     * set the config options for prettified code
     * param: pretty code config (Object)
     * @type {function(Object)}
     * @private
     */
    function setPrettyCode(prettyCode) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setPrettyCode()'
      );
      DEBUG.SetConfiguration.fail && console.assert(
        typeof prettyCode === 'object',
        'FAIL: SetConfiguration.setPrettyCode() ' +
        'Note: Incorrect argument operand.'
      );
      
    }

    /**
     * ---------------------------------------------
     * Private Method (setIDAction)
     * ---------------------------------------------
     * set question's id onClick action
     * param: config.id value (optional) (boolean)
     * @type {function(boolean|undefined)}
     * @private
     */
    function setIDAction(setting) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setIDAction(%s)', setting
      );
      DEBUG.SetConfiguration.fail && console.assert(
        (typeof setting === 'undefined' ||
         typeof setting === 'boolean'),
        'FAIL: SetConfiguration.setIDAction() ' +
        'Note: Incorrect argument operand.'
      );
      // If (setting exists)
      // Then {update configuration}
      if (typeof setting === 'boolean') {
        configuration.id = setting;
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (setWebWorker)
     * ---------------------------------------------
     * set web worker on or off
     * param: config.worker value (optional) (boolean)
     * @type {function(boolean|undefined)}
     * @private
     */
    function setWebWorker(setting) {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setWebWorker(%s)', setting
      );
      DEBUG.SetConfiguration.fail && console.assert(
        (typeof setting === 'undefined' ||
         typeof setting === 'boolean'),
        'FAIL: SetConfiguration.setWebWorker() ' +
        'Note: Incorrect argument operand.'
      );
      // If (browser supports web workers)
      // Else {tell app to not use web worker}
      if (!!window.Worker) {
        // If (worker setting exists)
        // Then {update worker configuration}
        if (typeof setting === 'boolean') {
          configuration.worker = setting;
        }
      }
      else {
        configuration.worker = false;
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (setSearchValues)
     * ---------------------------------------------
     * set current search values to search defaults
     * @type {function()}
     * @private
     */
    function setSearchValues() {
      // Debugger
      DEBUG.SetConfiguration.call && console.log(
        'CALL: SetConfiguration.setSearchValues()'
      );
      // Declare method variables
      var defaults;
      // Save search defaults
      defaults = configuration.searchDefaults;
      // Set search values
      searchValues.view    = defaults.view;
      searchValues.order   = defaults.order;
      searchValues.stage   = defaults.stage;
      searchValues.source  = defaults.source;
      searchValues.mainCat = defaults.mainCat;
      searchValues.subCat  = defaults.subCat;
    }

    // END CLASS: SetConfiguration
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (WebWorker)
   * ---------------------------------------------
   * handles the supporting web worker
   * @type {function(): {
       init: function()
     }}
   * @private
   */
  var WebWorker = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (WebWorker.init)
       * ---------------------------------------------
       * initialize WebWorker
       */
      init: function() {
        // OPEN: WebWorker.init() Group
        DEBUG.WebWorker.group && console.groupCollapsed(
          'GROUP: WebWorker.init()'
        );
        // Run class
        init();
        // CLOSE: WebWorker.init() Group
        DEBUG.WebWorker.group && console.groupEnd();
      }
    };

    /**
     * ---------------------------------------------
     * Private Variable (scripts)
     * ---------------------------------------------
     * the possible locations of the web worker
        script
     * @type {Array.<string>}
     * @private
     */
    var scripts = [
      'algorithmIVData.js',
      'algorithmIVData.min.js',
      'js/algorithmIVData.js',
      'js/algorithmIVData.min.js',
      'javascript/algorithmIVData.js',
      'javascript/algorithmIVData.min.js'
    ];
    
    /**
     * ---------------------------------------------
     * Private Variable (worker)
     * ---------------------------------------------
     * the supporting web worker
     * @type {Object}
     * @private
     */
    var worker;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * start the supporting web worker
     * @type {function()}
     * @private
     */
    function init() {
      // Debugger
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.init()'
      );
      // Find script and setup worker
      findWorker(0);
    }
    
    /**
     * ---------------------------------------------
     * Private Method (findWorker)
     * ---------------------------------------------
     * check whether js file exists
     * param: the current script location being
               checked (number)
     * @type {function(number)}
     * @private
     */
    function findWorker(i) {
      // Debuggers
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.findWorker(%d)', i
      );
      DEBUG.WebWorker.fail && console.assert(
        typeof i === 'number',
        'FAIL: WebWorker.findWorker() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var http, check;
      // Open ajax request
      http = new XMLHttpRequest();
      // Create response
      http.onreadystatechange = function() {
        // If (load complete)
        if (http.readyState === 4) {
          // If (file found)
          // Then {start web worker}
          if (http.status != 404) {
            // Debugger
            DEBUG.WebWorker.state && console.log(
              'STATE: WebWorker.findWorker() ' +
              'Note: AJAX passed. scripts[i]= %s', scripts[i]
            );
            startWorker(scripts[i]);
          }
          else {
            // Debugger
            DEBUG.WebWorker.state && console.log(
              'STATE: WebWorker.findWorker() ' +
              'Note: AJAX not passed. i= %d', i
            );
            // If (more scripts to check)
            // Then {check next script}
            // Else {reset app without web worker}
            if (++i < scripts.length) {
              findWorker(i);
            }
            else {
              loadError('Failed to find the web worker script.');
            }
          }
        }
      }
      // Make request
      http.open('HEAD', scripts[i], true);
      http.send();
    }
    
    /**
     * ---------------------------------------------
     * Private Method (startWorker)
     * ---------------------------------------------
     * start the web worker
     * param: the verified location of the web
               worker script (string)
     * @type {function(string)}
     * @private
     */
    function startWorker(script) {
      // Debuggers
      // OPEN: WebWorker.startWorker() Group
      DEBUG.WebWorker.group && console.groupCollapsed(
        'GROUP: WebWorker.startWorker()'
      );
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.startWorker(%s)', script
      );
      DEBUG.WebWorker.fail && console.assert(
        typeof script === 'string',
        'FAIL: WebWorker.startWorker() ' +
        'Note: Incorrect argument operand.'
      );
      // Set worker and load script
      worker = new Worker(script);
      // Setup worker responses
      setListeners();
      // Tell worker to start parsing questions
      worker.postMessage({
                 qLen: qLen,
        configuration: configuration,
              sources: sources,
           categories: categories
      });
    }

    /**
     * ---------------------------------------------
     * Private Method (setListeners)
     * ---------------------------------------------
     * set all of the listeners for the web worker
     * @type {function()}
     * @private
     */
    function setListeners() {
      // Debugger
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.setListeners()'
      );
      // Set success response
      worker.onmessage = function(event) {
        loadComplete(event.data);
      };
      // Set failure response
      worker.onerror = function(event) {
        loadError(event);
      };
    }
    
    /**
     * ---------------------------------------------
     * Private Method (loadComplete)
     * ---------------------------------------------
     * set the actions to execute after the web
        worker is finished loading this module's
        questions
     * param: the formatted questions (string)
     * @type {function(string)}
     * @private
     */
    function loadComplete(content) {
      // Debuggers
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.loadComplete()'
      );
      DEBUG.WebWorker.state && console.log(
        'STATE: WebWorker.loadComplete() ' +
        'Note: content= %O', content
      );
      // Save formatted questions
      configuration.content = content;
      // Tell app that worker finished
      flags.workerPass = true;
      // CLOSE: WebWorker.startWorker() Group
      DEBUG.WebWorker.group && console.groupEnd();
      // If (app init is finished)
      // Then {append and display questions}
      if (flags.initDone) {
        AppendQuestions.init();
        DisplayQuestions.assembleQuestions();
      }
      // End worker
      worker.terminate();
    }

    /**
     * ---------------------------------------------
     * Private Method (loadError)
     * ---------------------------------------------
     * set the error listener handler for the web
        worker loading this module's questions
     * param: the error response (object) (string)
     * @type {function(Object|string)}
     * @private
     */
    function loadError(error) {
      // Debugger
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.loadError()'
      );
      // Declare method variables
      var message, error, h2, p, loader;
      // Reset worker config
      configuration.worker = false;
      // Enable error flag
      flags.workerFail = true;
      // CLOSE: WebWorker.startWorker() Group
      DEBUG.WebWorker.group && console.groupEnd();
      // If (app init is finished)
      // Then {load error and reset app}
      if (flags.initDone) {
        // Show error message
        getClass('loadError')[0].style.display = 'block';
        // Format questions without worker
        FormatQuestions.init();
        AppendQuestions.init();
        DisplayQuestions.assembleQuestions();
      }
      // Debugger
      DEBUG.WebWorker.fail && console.log(
        'FAIL: WebWorker.loadError() ' +
        'Note: error= %s', error
      );
      // End worker
      worker.terminate();
    }

    // END CLASS: WebWorker
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (AddEvents)
   * ---------------------------------------------
   * add module event handlers
   * @type {function(): {
       init: function(),
       extHoverIn: function(number),
       extHoverOut: function(number)
     }}
   * @private
   */
  var AddEvents = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(),
         extHoverIn: function(number),
         extHoverOut: function(number)
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (AddEvents.init)
       * ---------------------------------------------
       * initialize AddEvents init
       */
      init: function() {
        // OPEN: AddEvents Group
        DEBUG.AddEvents.group && console.groupCollapsed(
          'GROUP: AddEvents.init()'
        );
        // Run init setup
        setInitEvents();
        // CLOSE: AddEvents Group
        DEBUG.AddEvents.group && console.groupEnd();
      },
      
      /**
       * ---------------------------------------------
       * Public Method (AddEvents.extHoverIn)
       * ---------------------------------------------
       * initialize AddEvents extHoverIn
       */
      extHoverIn: function(i) {
        // OPEN: AddEvents.extHover Group
        DEBUG.AddEvents.group && console.groupCollapsed(
          'GROUP: AddEvents.extHover'
        );
        // Run handler
        extHoverInHandler(i);
      },

      /**
       * ---------------------------------------------
       * Public Method (AddEvents.extHoverOut)
       * ---------------------------------------------
       * initialize AddEvents extHoverOut
       */
      extHoverOut: function(i) {
        // Run handler
        extHoverOutHandler(i);
        // CLOSE: AddEvents.extHover Group
        DEBUG.AddEvents.group && console.groupEnd();
      }
    };

    /**
     * ---------------------------------------------
     * Private Method (setInitEvents)
     * ---------------------------------------------
     * set module event handlers
     * @type {function()}
     * @private
     */
    function setInitEvents() {
      // Debugger
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.setInitEvents()'
      );
      // Set main view search selection event
      addEvent('change', 'aIV-view', function(x) {
        viewHandler(x);
      });
      // Set list order search selection event
      addEvent('change', 'aIV-order', function(x) {
        orderHandler(x);
      });
      // Set completion stage search selection event
      addEvent('change', 'aIV-stage', function(x) {
        stageHandler(x);
      });
      // Set source search selection event
      addEvent('change', 'aIV-source', function(x) {
        sourceHandler(x);
      });
      // Set main category search selection event
      addEvent('change', 'aIV-mainCat', function(x) {
        mainCategoryHandler(x);
      });
      // Set sub category search selection event
      addEvent('change', 'aIV-subCat', function(x) {
        subCategoryHandler(x);
      });
      // Set view one to chosen question
      addEvent('click', 'aIV-qid', function(x) {
        questionHandler(x);
      });
      // Toggle extended code view of a question
      addEvent('click', 'aIV-extCode', function(x) {
        extCodeHandler(x);
      });
      // Set view to previous question
      addEvent('click', 'aIV-prev', function() {
        prevHandler();
      });
      // Set view to next question
      addEvent('click', 'aIV-next', function() {
        nextHandler();
      });
    }

    /**
     * ---------------------------------------------
     * Private Method (addEvent)
     * ---------------------------------------------
     * add single event handler
     * param: type of event (string)
     * param: event element id (string)
     * param: event handler (function)
     * @type {function(string, string, Object)}
     * @private
     */
    function addEvent(call, id, handler) {
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.addEvent(%s, %s, %O)',
        call, id, handler
      );
      DEBUG.AddEvents.fail && console.assert(
        (typeof call    === 'string' &&
         typeof id      === 'string' &&
         typeof handler === 'function'),
        'FAIL: AddEvents.addEvent() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var targetID;
      id = id.replace(/[0-9]/g, '');
      // Add event
      roots.root.addEventListener(call, function(x) {
        targetID = x.target.id.replace(/[0-9]/g, '');
        if (targetID === id) {
          handler(x.target);
        }
      }, false);
    }

    /**
     * ---------------------------------------------
     * Private Method (viewHandler)
     * ---------------------------------------------
     * the onChange main view dropdown event handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function viewHandler(_this) {
      // OPEN: AddEvents.viewHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.viewHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.viewHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.viewHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration
      searchValues.view = _this.value;
      // Show new questions
      DisplayQuestions.showQuestions();
      // CLOSE: AddEvents.viewHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (orderHandler)
     * ---------------------------------------------
     * the onChange list order dropdown event handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function orderHandler(_this) {
      // OPEN: AddEvents.orderHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.orderHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.orderHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.orderHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration
      searchValues.order = _this.value;
      // Show new questions
      DisplayQuestions.showQuestions();
      // CLOSE: AddEvents.orderHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (stageHandler)
     * ---------------------------------------------
     * the onChange completion stage dropdown event
        handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function stageHandler(_this) {
      // OPEN: AddEvents.stageHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.stageHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.stageHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.stageHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration
      searchValues.stage = _this.value;
      // Show new questions
      DisplayQuestions.showQuestions();
      // CLOSE: AddEvents.stageHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (sourceHandler)
     * ---------------------------------------------
     * the onChange source dropdown event handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function sourceHandler(_this) {
      // OPEN: AddEvents.sourceHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.sourceHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.sourceHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.sourceHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration
      searchValues.source = _this.value;
      // Show new questions
      DisplayQuestions.showQuestions();
      // CLOSE: AddEvents.sourceHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (mainCategoryHandler)
     * ---------------------------------------------
     * the onChange main category dropdown event
        handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function mainCategoryHandler(_this) {
      // OPEN: AddEvents.mainCategoryHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.mainCategoryHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.mainCategoryHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.mainCategoryHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration
      searchValues.mainCat = _this.value;
      searchValues.subCat  = 'all';
      // Update sub category options
      DisplaySearchBar.updateSubCat();
      // Show new questions
      DisplayQuestions.showQuestions();
      // CLOSE: AddEvents.mainCategoryHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (subCategoryHandler)
     * ---------------------------------------------
     * the onChange category dropdown event handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function subCategoryHandler(_this) {
      // OPEN: AddEvents.subCategoryHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.subCategoryHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.subCategoryHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.subCategoryHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Set configuration
      searchValues.subCat = _this.value;
      // Show new questions
      DisplayQuestions.showQuestions();
      // CLOSE: AddEvents.subCategoryHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (questionHandler)
     * ---------------------------------------------
     * the onClick single mode question id event
        handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function questionHandler(_this) {
      // OPEN: AddEvents.questionHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.questionHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.questionHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.questionHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var id;
      // Set configuration
      searchValues.view = 'one';
      // Update select element value
      getID('aIV-view').value = 'one';
      // Retrieve id from text
      id = Number(_this.innerHTML);
      // Show the question
      DisplayQuestions.showQuestions(id);
      // CLOSE: AddEvents.questionHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (extCodeHandler)
     * ---------------------------------------------
     * the onClick event handler to show or hide an
        extended code view of a question solution
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function extCodeHandler(_this) {
      // OPEN: AddEvents.extCodeHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.extCodeHandler() ' +
        'Note: this= %O', _this
      );
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.extCodeHandler()'
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof _this === 'object',
        'FAIL: AddEvents.extCodeHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var i, qs, code, ext, extHov, extHovC, extHovO,
          details, openButton, closeButton, newPos;
      // Save index
      i = Number(_this.innerHTML);
      // Save this question element
      qs = getID('aIV-q' + i);
      // Save this question's preformatted code element
      code = getTag('code', qs)[0];
      // Save this question's preformatted code element
      ext = getClass('extContain', qs)[0];
      // Save this question's extension hover elements
      extHov = getClass('extHover', qs)[0];
      extHovC = getClass('closeExt', extHov)[0];
      extHovO = getClass('openExt', extHov)[0];
      // Save codeWidth values
      details = questions[i].codeWidth;
      // Save the open extension button
      openButton  = getClass('extOpenArrow', qs)[0];
      // Save the close extension button
      closeButton = getClass('extCloseArrow', qs)[0];
      // If (extension open)
      // Then {close it}
      // Else {open it}
      if (details.state) {
        // Hide close button
        closeButton.style.opacity = '0.0';
        // Update extend position
        ext.style.right = '-4px';
        // Update code width
        code.style.width = details.part + 'px';
        // Show open button
        setTimeout(function() {
          openButton.style.opacity = '0.8';
          setTimeout(function() {
            extHovC.style.display = 'none';
            extHovO.style.display = 'block';
          }, 600);
        }, 400);
      }
      else {
        // Hide open button
        openButton.style.opacity = '0.0';
        // Save and set new extend position
        newPos = 4 + details.diff;
        ext.style.right = '-' + newPos + 'px';
        // Update code width
        code.style.width = details.full + 'px';
        // Show close button
        setTimeout(function() {
          closeButton.style.opacity = '0.8';
          setTimeout(function() {
            extHovO.style.display = 'none';
            extHovC.style.display = 'block';
          }, 600);
        }, 400);
      }
      // Update state
      questions[i].codeWidth.state = !details.state;
      // Debugger
      DEBUG.AddEvents.state && console.log(
        'STATE: AddEvents.extCodeHandler() ' +
        'Note: i= %d, code= %O, ext= %O, details= %O, state= %s',
        i, code, ext, details, questions[i].codeWidth.state
      );
      // CLOSE: AddEvents.extCodeHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (extHoverInHandler)
     * ---------------------------------------------
     * the onMouseOver event handler to show 
        extended code view message
     * param: the question index (number)
     * @type {function(number)}
     * @private
     */
    function extHoverInHandler(i) {
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.extHoverInHandler(%d)', i
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof i === 'number',
        'FAIL: AddEvents.extHoverInHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var qs, ext;
      // Save question element
      qs = getID('aIV-q' + i);
      // Save hover element
      ext = getClass('extHover', qs)[0];
      // Show message
      ext.style.opacity = '1';
    }

    /**
     * ---------------------------------------------
     * Private Method (extHoverOutHandler)
     * ---------------------------------------------
     * the onMouseOut event handler to show 
        extended code view message
     * param: the question index (number)
     * @type {function(number)}
     * @private
     */
    function extHoverOutHandler(i) {
      // Debuggers
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.extHoverOutHandler(%d)', i
      );
      DEBUG.AddEvents.fail && console.assert(
        typeof i === 'number',
        'FAIL: AddEvents.extHoverOutHandler() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var qs, ext;
      // Save question element
      qs = getID('aIV-q' + i);
      // Save hover element
      ext = getClass('extHover', qs)[0];
      // Hide message
      ext.style.opacity = '0';
    }

    /**
     * ---------------------------------------------
     * Private Method (prevHandler)
     * ---------------------------------------------
     * the previous button event handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function prevHandler() {
      // OPEN: AddEvents.prevHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.prevHandler()'
      );
      // Debugger
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.prevHandler()'
      );
      // Show prev question
      DisplayQuestions.prevQuestion();
      // CLOSE: AddEvents.prevHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    /**
     * ---------------------------------------------
     * Private Method (nextHandler)
     * ---------------------------------------------
     * the next button event handler
     * param: the target element object (element)
     * @type {function(Object)}
     * @private
     */
    function nextHandler() {
      // OPEN: AddEvents.nextHandler() Group
      DEBUG.AddEvents.group && console.groupCollapsed(
        'GROUP: AddEvents.nextHandler()'
      );
      // Debugger
      DEBUG.AddEvents.call && console.log(
        'CALL: AddEvents.nextHandler()'
      );
      // Show next question
      DisplayQuestions.nextQuestion();
      // CLOSE: AddEvents.nextHandler() Group
      DEBUG.AddEvents.group && console.groupEnd();
    }

    // END CLASS: AddEvents
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (DisplaySearchBar)
   * ---------------------------------------------
   * displays the dropdown search bars for this
      module
   * @type {function(): {
       init: function()
     }}
   * @private
   */
  var DisplaySearchBar = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (DisplaySearchBar.init)
       * ---------------------------------------------
       * initialize DisplaySearchBar
       */
      init: function() {
        // OPEN: DisplaySearchBar Group
        DEBUG.DisplaySearchBar.group && console.groupCollapsed(
          'GROUP: DisplaySearchBar'
        );
        // Run init
        init();
        // CLOSE: DisplaySearchBar Group
        DEBUG.DisplaySearchBar.group && console.groupEnd();
      },

      /**
       * ---------------------------------------------
       * Public Method (DisplaySearchBar.updateSubCat)
       * ---------------------------------------------
       * update the sub category select element options
       */
      updateSubCat: function() {
        // Debugger
        DEBUG.DisplaySearchBar.call && console.log(
          'CALL: DisplaySearchBar.updateSubCat()'
        );
        // Insert element options
        getID('aIV-subCat').innerHTML = formatSubCategory();
      }
    };

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * displays the dropdown search bars for this
      module
     * @type {function()}
     * @private
     */
    function init() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.init()'
      );
      // Insert html
      roots.sel.innerHTML = applyFormat();
      // Set start values
      setValues();
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormat)
     * ---------------------------------------------
     * formats the dropdown search bars for this
        module
     * @type {function(): string}
     * @private
     */
    function applyFormat() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.applyFormat()'
      );
      // Declare method variables
      var searchBar;
      // Set the search bar
      searchBar = '' +
      formatView()   +
      formatOrder()  +
      formatStage()  +
      formatSource() +
      formatMainCategory() +
      formatSubCategory();
      // Return the search bar
      return searchBar;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatView)
     * ---------------------------------------------
     * format the main view dropdown search selection
     * @type {function(): string}
     * @private
     */
    function formatView() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.formatView()'
      );
      // Declare method variables
      var content;
      // Set content
      content = '' +
      '<select id="aIV-view" class="showView">' +
        '<option value="one">View One</option>' +
        '<option value="all">View All</option>' +
      '</select>';
      return content;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatOrder)
     * ---------------------------------------------
     * format the list order options dropdown search
        selection
     * @type {function(): string}
     * @private
     */
    function formatOrder() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.formatOrder()'
      );
      // Declare method variables
      var content;
      // Set content
      content = '' +
      '<select id="aIV-order" class="showOrder">' +
        '<option value="asc">ASC</option>' +
        '<option value="desc">DESC</option>' +
      '</select>';
      return content;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatStage)
     * ---------------------------------------------
     * format the completion stage dropdown search
        selection
     * @type {function(): string}
     * @private
     */
    function formatStage() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.formatStage()'
      );
      // Declare method variables
      var content;
      // Set content
      content = ( (configuration.searchSettings.stage) ?
        '<select id="aIV-stage" class="showStage">' +
          '<option value="all">All Stages</option>' +
          '<option value="com">Completed</option>'  +
          '<option value="inc">Incomplete</option>' +
        '</select>' :
        '<input type="hidden" id="aIV-stage" ' +
        'class="showStage" value="all">'
      );
      return content;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSource)
     * ---------------------------------------------
     * returns the html for the source dropdown
        search selection
     * @type {function(): string}
     * @private
     */
    function formatSource() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.formatSource()'
      );
      // Declare method variables
      var sLen, sOptions, flag, i, id, content;
      // Save sources array length
      sLen = sources.len;
      // Set the option elements to empty
      sOptions = '';
      // Save whether a source exists and
      //  searchSettings.source is enabled
      flag = (sLen == 0 && !configuration.searchSettings.source);
      // If (source exists and config on)
      // Then {save list of option elements}
      if (!flag) {
        for (i=0; i<sLen; i++) {
          // Save source id
          id = sources.ids[i];
          // Add option
          sOptions += '' +
          '<option value="' + id + '">' +
            sources.list[id] +
          '</option>';
        }
      }
      // Set content
      content = ( (flag) ?
        '<input type="hidden" id="aIV-source" ' +
        'class="showSource" value="all">' :
        '<select id="aIV-source" class="showSource">' +
          '<option value="all">All Sources</option>' +
          sOptions +
        '</select>'
      );
      // Return content
      return content;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatMainCategory)
     * ---------------------------------------------
     * format the main category dropdown search
        selection element
     * @type {function(): string}
     * @private
     */
    function formatMainCategory() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.formatMainCategory()'
      );
      // Declare method variables
      var cLen, cOptions, flag, i, id, content;
      // Save count of categories
      cLen = categories.len.main;
      // Set the option elements to empty
      cOptions = '';
      // Save whether a category exists and
      //  searchSettings.category is enabled
      flag = (cLen == 0 || !configuration.searchSettings.category);
      // If (a main category exists and config on)
      // Then {save list of option elements}
      if (!flag) {
        for (i=0; i<cLen; i++) {
          // Save category id
          id = categories.ids.main[i];
          // Add option
          cOptions += '' +
          '<option value="' + id + '">' +
            categories.main[id] +
          '</option>';
        }
      }
      // Set content
      content = ( (flag) ?
        '<input type="hidden" id="aIV-mainCat" ' +
        'class="showMainCat" value="all">' :
        '<select id="aIV-mainCat" class="showMainCat">' +
          '<option value="all">All Main Categories</option>' +
          cOptions +
        '</select>'
      );
      // Return content
      return content;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSubCategory)
     * ---------------------------------------------
     * format the sub category dropdown search
        selection element
     * @type {function(): string}
     * @private
     */
    function formatSubCategory() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.formatSubCategory()'
      );
      // Declare method variables
      var cLen, main, flag, cOptions, i, id, content;
      // Save count of main categories
      cLen = categories.len.main;
      // Save the selected main category id
      main = searchValues.mainCat;
      // Save whether a main category exist and
      //  searchSettings.category and searchSettings.subCat are enabled
      flag = (cLen == 0 || !configuration.searchSettings.category ||
              !configuration.searchSettings.subCat);
      // If (a main category exist and config on)
      // Then {save list of option elements}
      if (!flag) {
        if (main === 'all') {
          // Get all sub categories
          for (i=0; i<cLen; i++) {
            // Save main category id
            id = categories.ids.main[i];
            // If (subcategories exist)
            if (categories.len.sub[id] > 0) {
              // Add main category and sub categories option
              cOptions += '' +
              '<option disabled>' +
                ' -- ' + categories.main[id] +
              '</option>' +
              categories.opt[id];
            }
          }
        }
        else {
          cOptions = categories.opt[main];
        }
      }
      // Set content
      content = ( (flag) ?
        '<input type="hidden" id="aIV-subCat" ' +
        'class="showSubCat" value="all">' :
        '<select id="aIV-subCat" class="showSubCat">' +
          '<option value="all">All Sub Categories</option>' +
          cOptions +
        '</select>'
      );
      // Return content
      return content;
    }

    /**
     * ---------------------------------------------
     * Private Method (setValues)
     * ---------------------------------------------
     * selects the start-up values for each selection
     * @type {function()}
     * @private
     */
    function setValues() {
      // Debugger
      DEBUG.DisplaySearchBar.call && console.log(
        'CALL: DisplaySearchBar.setValues()'
      );
      // Set select values
      getID('aIV-view').value = searchValues.view;
      getID('aIV-order').value = searchValues.order;
      if (configuration.searchSettings.stage) {
        getID('aIV-stage').value = searchValues.stage;
      }
      if (sources.len > 0 &&
          configuration.searchSettings.source) {
        getID('aIV-source').value = searchValues.source;
      }
      if (categories.main.len > 0 &&
          configuration.searchSettings.category) {
        getID('aIV-mainCat').value = searchValues.mainCat;
      }
      if (categories.main.len > 0 &&
          configuration.searchSettings.subCat &&
          configuration.searchSettings.category) {
        getID('aIV-subCat').value = searchValues.subCat;
      }
    }

    // END CLASS: DisplaySearchBar
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (FormatQuestions)
   * ---------------------------------------------
   * formats questions for live view
   * @type {function(): {
       init: function(),
       formatCodeView: function()
     }}
   * @private
   */
  var FormatQuestions = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(),
         formatCodeView: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (FormatQuestions.init)
       * ---------------------------------------------
       * initialize FormatQuestions
       */
      init: function() {
        // OPEN: FormatQuestions Group
        DEBUG.FormatQuestions.group && console.groupCollapsed(
          'GROUP: FormatQuestions'
        );
        // Run class
        init();
        // CLOSE: FormatQuestions Group
        DEBUG.FormatQuestions.group && console.groupEnd();
      },

      /**
       * ---------------------------------------------
       * Public Method (FormatQuestions.formatCodeView)
       * ---------------------------------------------
       * check question preformatted code element width
          and turn on view extender if needed
       */
      formatCodeView: function() {
        // OPEN: FormatQuestions.formatCodeView Group
        DEBUG.FormatQuestions.group && console.groupCollapsed(
          'GROUP: FormatQuestions.formatCodeView()'
        );
        // Declare method variables
        var i, qs;
        // Format each question
        for (i=0; i<qLen; i++) {
          // OPEN: FormatQuestions.formatCodeView Group
          DEBUG.FormatQuestions.group && console.groupCollapsed(
            'GROUP: FormatQuestions.formatCodeView() ' +
            'on question index= %d', i
          );
          // Save code width
          setCodeWidth(i);
          // If (code view has scrollbar)
          // Then {format code view accordingly}
          if (questions[i].codeWidth.diff > 0) {
            formatCodeView(i);
          }
          // Save question node
          qs = getID('aIV-q' + i);
          // Set question display to none
          qs.style.display = 'none';
          qs.style.opacity = '1';
          // CLOSE: FormatQuestions.formatCodeView Group
          DEBUG.FormatQuestions.group && console.groupEnd();
        }
        // CLOSE: FormatQuestions.formatCodeView Group
        DEBUG.FormatQuestions.group && console.groupEnd();
      }
    };

    /**
     * ---------------------------------------------
     * Private Format (formatted)
     * ---------------------------------------------
     * saves the content for each question
     * @type {{
         id: {
           flag: boolean,
           content: string
         },
         source: {
           flag: boolean,
           content: string
         },
         complete: {
           flag: boolean,
           content: string
         },
         category: {
           flag: boolean,
           main: {
             flag: boolean,
             h3: string,
             p: string
           },
           sub: {
             flag: boolean,
             h3: string,
             p: string
           }
         },
         solution: {
           error: boolean,
           code: string,
           height: number
         },
         output: {
           flag: boolean,
           content: string
         },
         links: {
           flag: boolean,
           content: Array.<{
             href: string,
             name: string
           }>
         }
       }}
     * @private
     */
    var formatted;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * converts questions to html
     * @type {function()}
     * @private
     */
    function init() {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.init()'
      );
      // Declare method variables
      var i;
      // Format the questions
      for (i=0; i<qLen; i++) {
        // OPEN: FormatQuestions.init() Group
        DEBUG.FormatQuestions.group && console.groupCollapsed(
          'GROUP: FormatQuestions.init() ' +
          'on question index= %d', i
        );
        clearFormat();
        formatID(i);
        formatSource(questions[i].source);
        formatComplete(questions[i].complete);
        formatCategory(questions[i].mainCat, questions[i].subCat);
        formatSolution(questions[i].solution, i);
        formatOutput(questions[i].solution);
        formatLinks(questions[i].links);
        // Save formatted question
        configuration.content.push(formatted);
        // CLOSE: FormatQuestions.init() Group
        DEBUG.FormatQuestions.group && console.groupEnd();
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (clearFormat)
     * ---------------------------------------------
     * clears the previous question format
     * @type {function()}
     * @private
     */
    function clearFormat() {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.clearFormat()'
      );
      // Clear formatted
      formatted = {
        id: {
          flag   : false,
          content: ''
        },
        source: {
          flag   : false,
          content: ''
        },
        complete: {
          flag   : false,
          content: ''
        },
        category: {
          flag: false,
          main: {
            flag: false,
            h3  : '',
            p   : ''
          },
          sub: {
            flag: false,
            h3  : '',
            p   : ''
          }
        },
        solution: {
          error : false,
          code  : '',
          height: 0
        },
        output: {
          flag   : false,
          content: ''
        },
        links: {
          flag   : false,
          content: []
        }
      };
    }

    /**
     * ---------------------------------------------
     * Private Method (formatID)
     * ---------------------------------------------
     * formats the question id
     * param: the question index (number)
     * @type {function(number)}
     * @private
     */
    function formatID(i) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatID()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        typeof i === 'number',
        'FAIL: FormatQuestions.formatID() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var flag, id;
      // Set flag and id
      flag = configuration.questionFormat.id;
      id = '';
      if (flag) {
        // Save question id
        id = i + 1;
        // Ensure id length is min of 3
        id = ( (id < 10) ?
          '00' + id : (id < 100) ?
            '0' + id : '' + id
        );
      }
      // Save format
      formatted.id.flag = flag;
      formatted.id.content = id;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSource)
     * ---------------------------------------------
     * formats the question source
     * param: the question source (string)
     * @type {function(string)}
     * @private
     */
    function formatSource(sourceID) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatSource()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        typeof sourceID === 'string',
        'FAIL: FormatQuestions.formatSource() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var sLen, flag;
      // Save app sources length and flag
      sLen = sources.len;
      flag = (sLen > 0 && configuration.questionFormat.source);
      // Save format
      formatted.source.flag = flag;
      formatted.source.content = ( (flag) ?
        sources.list[sourceID] : ''
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (formatComplete)
     * ---------------------------------------------
     * formats the question completion status
     * param: the question complete value (boolean)
     * @type {function(boolean)}
     * @private
     */
    function formatComplete(completed) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatComplete()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        typeof completed === 'boolean',
        'FAIL: FormatQuestions.formatComplete() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var flag;
      // Save flag
      flag = configuration.questionFormat.complete;
      // Save format
      formatted.complete.flag = flag;
      formatted.complete.content = ( (!configuration.questionFormat.complete) ?
        '' : (completed) ? 'Yes' : 'No'
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (formatCategory)
     * ---------------------------------------------
     * formats the question categories
     * param: the main question's categories (array of strings)
     * param: the sub question's categories (array of strings)
     * @type {function(Array.<string>, Array.<string>)}
     * @private
     */
    function formatCategory(main, sub) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatCategory()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        (Array.isArray(main) &&
         Array.isArray(sub)),
        'FAIL: FormatQuestions.formatCategory() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var flag, cLen, mLen, sLen, i, id, subCats;
      // Save the length of all the main categories and
      //  the question's main and sub categories
      cLen = categories.len.main;
      mLen = main.length;
      sLen = sub.length;
      // Save flags
      flag = {
         cat: (cLen > 0 && configuration.questionFormat.category),
        main: (mLen > 0),
         sub: (sLen > 0)
      };
      formatted.category.flag = flag.cat;
      formatted.category.main.flag = flag.main;
      formatted.category.sub.flag  = flag.sub;
      // If (a main category exists and category config enabled)
      if (flag.cat) {
        // If (question has main categories)
        // Then {save main category format}
        if (flag.main) {
          formatted.category.main.h3 = 'Main ' +
          ( (mLen > 1) ? 'Categories:' : 'Category:' );
          // Find matching main category names
          for (i=0; i<mLen; i++) {
            formatted.category.main.p += (i === 0) ? '' : ', ';
            formatted.category.main.p += categories.main[main[i]];
          }
        }
        // If (question has sub categories)
        // Then {save sub category format}
        if (sLen > 0) {
          formatted.category.sub.h3 = 'Sub ' +
          ( (sLen > 1) ? 'Categories:' : 'Category:' );
          // Find matching sub category names
          for (i=0; i<sLen; i++) {
            formatted.category.sub.p += (i === 0) ? '' : ', ';
            loop:
            for (id in categories.sub) {
              // If (property not native)
              if ( categories.sub.hasOwnProperty(id) ) {
                // Save sub category objects
                subCats = categories.sub[id];
                // If (property exists)
                if (typeof subCats[sub[i]] === 'string') {
                  formatted.category.sub.p += subCats[sub[i]];
                  break loop;
                }
              }
            }
          }
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSolution)
     * ---------------------------------------------
     * formats the question solution
     * param: the question solution (function)
     * param: the question index (number)
     * @type {function(Object, number)}
     * @private
     */
    function formatSolution(solution, i) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatSolution(solution, %d)', i
      );
      DEBUG.FormatQuestions.fail && console.assert(
        (typeof solution === 'function' &&
         typeof i === 'number'),
        'FAIL: FormatQuestions.formatSolution() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var error, code, height;
      // Save error
      error = (typeof solution !== 'function');
      // If (no error)
      // Then {prettify code}
      if (!error) {
        code = PrettifyCode.init(solution);
        // Calculate the pre element's div container height
        height  = code.lineCount * configuration.prettyCode.liHeight;
        height += configuration.prettyCode.olHeight;
      }
      // Save format
      formatted.solution.error  = error;
      formatted.solution.code   = (error) ? '' : code.result;
      formatted.solution.height = (error) ?  0 : height;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatOutput)
     * ---------------------------------------------
     * formats the output of the question solution
     * param: the question solution (function)
     * @type {function(Object)}
     * @private
     */
    function formatOutput(solution) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatOutput()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        typeof solution === 'function',
        'FAIL: FormatQuestions.formatOutput() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var flag, output;
      // Save flag
      flag = (typeof solution === 'function' &&
              configuration.questionFormat.output);
      // Save output
      output = (flag) ? solution() : '';
      output = (typeof output !== 'string') ? String(output) : output;
      // Save format
      formatted.output.flag = flag;
      formatted.output.content = output;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatLinks)
     * ---------------------------------------------
     * formats the question links
     * param: the links (array of objects)
     * @type {function(Array.<Object>)}
     * @private
     */
    function formatLinks(links) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatLinks()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        typeof links === 'object',
        'FAIL: FormatQuestions.formatLinks() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var flag, linksLen, i;
      // Save link length
      linksLen = links.length;
      // Save flag
      flag = (linksLen > 0 && configuration.questionFormat.links);
      // Save formatted links
      if (flag) {
        for (i=0; i<linksLen; i++) {
          formatted.links.content.push({
            href: links[i].href,
            name: links[i].name
          });
        }
      }
      else {
        formatted.links.content = [];
      }
      formatted.links.flag = flag;
    }

    /**
     * ---------------------------------------------
     * Private Method (setCodeWidth)
     * ---------------------------------------------
     * prepare an object containing all of the
        element width details for the solution code
        element of the supplied question
     * param: the question index (number)
     * @type {function(number)}
     * @private
     */
    function setCodeWidth(i) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.setCodeWidth()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        typeof i === 'number',
        'FAIL: FormatQuestions.setCodeWidth() ' +
        'Note: Incorrect argument operand.'
      );
      DEBUG.FormatQuestions.state && console.log(
        'STATE: FormatQuestions.setCodeWidth() ' +
        'Note: codeWidth= %O', questions[i].codeWidth
      );
      // Declare method variables
      var qs, code, part, full, diff;
      // Save this question element
      qs = getID('aIV-q' + i);
      // Save this question's preformatted code element
      code = getTag('code', qs)[0];
      // Set width object
      questions[i].codeWidth = {};
      // Save widths
      part = code.clientWidth;
      full = code.scrollWidth;
      diff = code.scrollWidth - code.clientWidth;
      // If (difference exists)
      // Then {add 20 for padding}
      full = (diff > 0) ? (full + 20) : full;
      diff = (diff > 0) ? (diff + 20) : 0;
      // Update question's stored width values
      questions[i].codeWidth.part = part;
      questions[i].codeWidth.full = full;
      questions[i].codeWidth.diff = diff;
      questions[i].codeWidth.state = false;
      // Debugger
      DEBUG.FormatQuestions.state && console.log(
        'STATE: FormatQuestions.setCodeWidth() ' +
        'Note: codeWidth= %O', questions[i].codeWidth
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (formatCodeView)
     * ---------------------------------------------
     * apply code view extension format
     * param: the question index (number)
     * @type {function(number)}
     * @private
     */
    function formatCodeView(i) {
      // Debuggers
      DEBUG.FormatQuestions.call && console.log(
        'CALL: FormatQuestions.formatCodeView()'
      );
      DEBUG.FormatQuestions.fail && console.assert(
        typeof i === 'number',
        'FAIL: FormatQuestions.formatCodeView() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var qs, ext, solution;
      // Save this question element
      qs = getID('aIV-q' + i);
      // Save extend element
      ext = getClass('extContain', qs)[0];
      // Show extend element
      ext.style.display = 'block';
      // If (browser scrollbar width exists)
      // Then {increase the solution padding}
      if (configuration.scrollbar > 0) {
        // Save solution container
        solution = getClass('solution', qs)[0];
        // Increase padding
        solution.style.padding = '0 0 ' + configuration.scrollbar + 'px';
      }
    }

    // END CLASS: FormatQuestions
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (AppendQuestions)
   * ---------------------------------------------
   * appends the formatted questions to the doc
   * @type {function(): {
       init: function()
     }}
   * @private
   */
  var AppendQuestions = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (AppendQuestions.init)
       * ---------------------------------------------
       * initialize AppendQuestions
       */
      init: function() {
        // OPEN: AppendQuestions Group
        DEBUG.AppendQuestions.group && console.groupCollapsed(
          'GROUP: AppendQuestions'
        );
        // Run class
        init();
        // CLOSE: AppendQuestions Group
        DEBUG.AppendQuestions.group && console.groupEnd();
      }
    };

    /**
     * ---------------------------------------------
     * Private Variable (q)
     * ---------------------------------------------
     * the question element
     * @type {Object}
     * @private
     */
    var q;

    /**
     * ---------------------------------------------
     * Private Variable (info)
     * ---------------------------------------------
     * the info section element
     * @type {Object}
     * @private
     */
    var info;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * appends the formatted questions to the doc
     * @type {function()}
     * @private
     */
    function init() {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.init()'
      );
      // Declare method variables
      var i, qs;
      // Append the empty container
      appendEmpty();
      // Append each question's sections
      for (i=0; i<qLen; i++) {
        // Save reference to formatted questions
        qs = configuration.content[i];
        // OPEN: AppendQuestions.init() Group
        DEBUG.AppendQuestions.group && console.groupCollapsed(
          'GROUP: AppendQuestions.init() ' +
          'on question index= %d, formatted= %O', i, qs
        );
        // Append elements
        appendMain(i);
        if (qs.id.flag) {
          appendID(qs.id.content, i);
        }
        if (qs.source.flag) {
          appendSource(qs.source.content);
        }
        if (qs.complete.flag) {
          appendComplete(qs.complete.content);
        }
        if (qs.category.flag) {
          appendCategory(qs.category.main, qs.category.sub);
        }
        appendProblem(questions[i].problem);
        appendSolution(qs.solution, i);
        if (qs.output.flag) {
          appendOutput(qs.output.content);
        }
        if (qs.links.flag) {
          appendLinks(qs.links.content);
        }
        // CLOSE: AppendQuestions.init() Group
        DEBUG.AppendQuestions.group && console.groupEnd();
      }
      delete configuration.content;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendEmpty)
     * ---------------------------------------------
     * appends the empty container
     * @type {function()}
     * @private
     */
    function appendEmpty() {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendEmpty()'
      );
      // Declare method variables
      var e;
      // Create element
      e = document.createElement('section');
      // Add class
      e.className = 'empty';
      // Add content
      e.textContent = 'No question(s) found.';
      // Append element
      roots.qs.appendChild(e);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendMain)
     * ---------------------------------------------
     * appends the main containers for the question
     * param: the submitted question index (number)
     * @type {function(number)}
     * @private
     */
    function appendMain(i) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendMain(%d)', i
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof i === 'number',
        'FAIL: AppendQuestions.appendMain() ' +
        'Note: Incorrect argument operand.'
      );
      // Create elements
      q = document.createElement('section');
      info = document.createElement('div');
      // Add ids
      q.id = 'aIV-q' + i;
      // Add classes
      q.className = 'question';
      info.className = 'info';
      // Append elements
      roots.qs.appendChild(q);
      q.appendChild(info);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendID)
     * ---------------------------------------------
     * appends the question id
     * param: the question id (string)
     * param: the question index (number)
     * @type {function(string, number)}
     * @private
     */
    function appendID(id, i) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendID()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        (typeof id === 'string'  &&
         typeof i  === 'number'),
        'FAIL: AppendQuestions.appendID() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p, a;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'idContain';
      // Add content
      h3.textContent = 'Question:';
      if (!configuration.id) {
        p.textContent = id;
      }
      // Append elements
      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
      // If (id link enabled)
      // Then {create and append id link}
      if (configuration.id) {
        a = document.createElement('a');
        a.id = 'aIV-qid' + i;
        a.href = 'javascript: void(0);';
        a.target = '_blank';
        a.className = 'dark';
        a.textContent = id;
        p.appendChild(a);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSource)
     * ---------------------------------------------
     * appends the question source
     * param: the question source (string)
     * @type {function(string)}
     * @private
     */
    function appendSource(source) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendSource()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof source === 'string',
        'FAIL: AppendQuestions.appendSource() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'source';
      // Add content
      h3.textContent = 'Source:';
      p.textContent  = source;
      // Append elements
      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendComplete)
     * ---------------------------------------------
     * appends the question completed status
     * param: the question status (string)
     * @type {function(string)}
     * @private
     */
    function appendComplete(complete) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendComplete()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof complete === 'string',
        'FAIL: AppendQuestions.appendComplete() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'stage';
      // Add content
      h3.textContent = 'Completed:';
      p.textContent  = complete;
      // Append elements
      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendCategory)
     * ---------------------------------------------
     * appends the question categories
     * param: the question's main categories (object)
     * param: the question's sub categories (object)
     * @type {function(Object)}
     * @private
     */
    function appendCategory(main, sub) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendCategory()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        (typeof main === 'object' &&
         typeof sub  === 'object'),
        'FAIL: AppendQuestions.appendCategory() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p, mdiv, mh3, mp, sdiv, sh3, sp;
      // Create elements
      div = document.createElement('div');
      if (!main.flag && !sub.flag) {
        h3 = document.createElement('h3');
        p  = document.createElement('p');
      }
      if (main.flag) {
        mdiv = document.createElement('div');
        mh3  = document.createElement('h3');
        mp   = document.createElement('p');
      }
      if (sub.flag) {
        sdiv = document.createElement('div');
        sh3  = document.createElement('h3');
        sp   = document.createElement('p');
      }
      // Add classes and content
      div.className = 'category';
      if (!main.flag && !sub.flag) {
        h3.textContent = 'Category:';
        p.textContent  = 'None';
      }
      if (main.flag) {
        mdiv.className  = 'mainCategory';
        mh3.textContent = main.h3;
        mp.textContent  = main.p;
      }
      if (sub.flag) {
        sdiv.className  = 'subCategory';
        sh3.textContent = sub.h3;
        sp.textContent  = sub.p;
      }
      // Append elements
      q.appendChild(div);
      if (!main.flag && !sub.flag) {
        div.appendChild(h3);
        div.appendChild(p);
      }
      if (main.flag) {
        div.appendChild(mdiv);
        mdiv.appendChild(mh3);
        mdiv.appendChild(mp);
      }
      if (sub.flag) {
        div.appendChild(sdiv);
        sdiv.appendChild(sh3);
        sdiv.appendChild(sp);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendProblem)
     * ---------------------------------------------
     * appends the question problem
     * param: the question problem (string)
     * @type {function(string)}
     * @private
     */
    function appendProblem(problem) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendProblem()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof problem === 'string',
        'FAIL: AppendQuestions.appendProblem() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'problem';
      // Add content
      h3.textContent = 'Problem:';
      p.innerHTML  = problem;
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSolution)
     * ---------------------------------------------
     * appends the question solution
     * param: the question's solution (object)
     * param: the question index (number)
     * @type {function(Object, number)}
     * @private
     */
    function appendSolution(solution, i) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendSolution()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        (typeof solution === 'object' &&
         typeof i        === 'number'),
        'FAIL: AppendQuestions.appendSolution() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p, pdiv, pre, code, ol, ext,
          extClose, extOpen, extBG, extHov,
          extHovC, extHovO;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      // Add classes
      div.className = 'solution';
      // Add content
      h3.textContent = 'Solution:';
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      // If (no error)
      // Then {add solution code}
      // Else {add error}
      if (!solution.error) {
        // Create elements
        pdiv = document.createElement('div');
        pre  = document.createElement('pre');
        code = document.createElement('code');
        ol   = document.createElement('ol');
        ext  = document.createElement('div');
        extClose = document.createElement('div');
        extOpen  = document.createElement('div');
        extBG    = document.createElement('div');
        extHov   = document.createElement('div');
        extHovC  = document.createElement('span');
        extHovO  = document.createElement('span');
        // Add ids
        extOpen.id = 'aIV-extCode' + i;
        // Add classes
        pdiv.className = 'preContain';
        ext.className  = 'extContain';
        extClose.className = 'extCloseArrow';
        extOpen.className  = 'extOpenArrow';
        extBG.className    = 'extBG';
        extHov.className   = 'extHover';
        extHovC.className  = 'closeExt';
        extHovO.className  = 'openExt';
        // Add content
        ol.innerHTML = solution.code;
        extOpen.textContent = i;
        extHovC.textContent = 'Close Extended Code View';
        extHovO.textContent = 'Extend Code View';
        // Set preContain height
        pdiv.style.height = solution.height + 'px';
        // Add events
        extOpen.onmouseover = function() { AddEvents.extHoverIn(i) };
        extOpen.onmouseout  = function() { AddEvents.extHoverOut(i) };
        // Append elements
        div.appendChild(pdiv);
        pdiv.appendChild(pre);
        pre.appendChild(code);
        code.appendChild(ol);
        pdiv.appendChild(ext);
        ext.appendChild(extClose);
        ext.appendChild(extOpen);
        ext.appendChild(extBG);
        pdiv.appendChild(extHov);
        extHov.appendChild(extHovC);
        extHov.appendChild(extHovO);
      }
      else {
        // Create and append error element
        p = document.createElement('p');
        p.className = 'error';
        p.textContent = 'Error: This solution was not wrapped in an anonymous function.';
        div.appendChild(p);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendOutput)
     * ---------------------------------------------
     * appends the question's solution output
     * param: the question's solution output (string)
     * @type {function(string)}
     * @private
     */
    function appendOutput(output) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendOutput()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof output === 'string',
        'FAIL: AppendQuestions.appendOutput() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'output';
      // Add content
      h3.textContent = 'Output:';
      p.innerHTML    = output;
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendLinks)
     * ---------------------------------------------
     * appends the question links
     * param: the question links (array of objects)
     * @type {function(Array.<Object>)}
     * @private
     */
    function appendLinks(links) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendLinks()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        Array.isArray(links),
        'FAIL: AppendQuestions.appendLinks() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p, linksLen, i, a;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'links';
      // Add content
      h3.textContent = 'Links:';
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
      // Save link length
      linksLen = links.length;
      // Create and append links
      for (i=0; i<linksLen; i++) {
        a = document.createElement('a');
        a.href = links[i].href;
        a.target = '_blank';
        a.className = 'dark';
        a.textContent = links[i].name;
        p.appendChild(a);
      }
    }

    // END CLASS: AppendQuestions
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (DisplayQuestions)
   * ---------------------------------------------
   * inserts the selected question(s) to html page
   * @type {function(): {
       assembleQuestions: function(string|undefined),
            prevQuestion: function(),
            nextQuestion: function(),
           showQuestions: function(number|undefined)
     }}
   * @private
   */
  var DisplayQuestions = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         assembleQuestions: function(),
              prevQuestion: function(),
              nextQuestion: function(),
             showQuestions: function(number|undefined)
       }}
     * @private
     */
    var _return = {
      /**
       * --------------------------------------------------
       * Public Method (DisplayQuestions.assembleQuestions)
       * --------------------------------------------------
       * manually format and insert all questions
       * param: the formatted questions (optional) (string)
       */
      assembleQuestions: function() {
        // OPEN: DisplayQuestions.assembleQuestions Group
        DEBUG.DisplayQuestions.group && console.groupCollapsed(
          'GROUP: DisplayQuestions.assembleQuestions()'
        );
        // Complete action
        assembleQuestions();
      },

      /**
       * ---------------------------------------------
       * Public Method (DisplayQuestions.prevQuestion)
       * ---------------------------------------------
       * show the previous question
       */
      prevQuestion: function() {
        // OPEN: DisplayQuestions.prevQuestion Group
        DEBUG.DisplayQuestions.group && console.groupCollapsed(
          'GROUP: DisplayQuestions.prevQuestion()'
        );
        // Complete action
        prevQuestion();
      },

      /**
       * ---------------------------------------------
       * Public Method (DisplayQuestions.nextQuestion)
       * ---------------------------------------------
       * show the next question
       */
      nextQuestion: function() {
        // OPEN: DisplayQuestions.nextQuestion Group
        DEBUG.DisplayQuestions.group && console.groupCollapsed(
          'GROUP: DisplayQuestions.nextQuestion()'
        );
        // Complete action
        nextQuestion();
      },

      /**
       * ---------------------------------------------
       * Public Method (DisplayQuestions.showQuestions)
       * ---------------------------------------------
       * show the question(s) matching the new search
          settings
       * param: the question id (optional) (number)
       */
      showQuestions: function(id) {
        // If (argument undefined)
        // Then {set it}
        id = id || 0;
        // OPEN: DisplayQuestions.showQuestions Group
        DEBUG.DisplayQuestions.group && console.groupCollapsed(
          'GROUP: DisplayQuestions.showQuestions() ' +
          'Note: id= %d', id
        );
        // Set content
        showQuestions(id, false);
      }
    };

    /**
     * -----------------------------------------------
     * Private Variable (currentOrder)
     * -----------------------------------------------
     * holds the current order of the question tags
     * @type {string}
     * @private
     */
    var currentOrder = 'asc';

    /**
     * -----------------------------------------------
     * Private Variable (currentList)
     * -----------------------------------------------
     * holds the list of questions matching the current
        search settings and the current index being
        shown
     * @type {{
         index: number,
         list: Array.<number>
       }}
     * @private
     */
    var currentList = {
      index: 0,
       list: []
    };

    /**
     * ---------------------------------------------
     * Private Method (assembleQuestions)
     * ---------------------------------------------
     * prepares, inserts, and shows the formatted
        questions
     * @type {function()}
     * @private
     */
    function assembleQuestions() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.assembleQuestions()'
      );
      // Declare method variables
      var id;
      // Debugger
      DEBUG.DisplayQuestions.state && console.log(
        'STATE: DisplayQuestions.assembleQuestions() ' +
        'Note: flags.workerPass= %s', flags.workerPass
      );
      // If (view is set to one)
      // Then {id is startID}
      // Else {id is 0}
      id = ( (configuration.searchDefaults.view === 'one') ?
        configuration.searchDefaults.startID : 0
      );
      // Show the questions
      setTimeout(function() {
        showQuestions(id, true);
      }, 20);
    }

    /**
     * ---------------------------------------------
     * Private Method (showQuestions)
     * ---------------------------------------------
     * shows the current question(s)
     * param: specific question id (number)
     * param: should new content be added (boolean)
     * @type {function(number, boolean)}
     * @private
     */
    function showQuestions(id, insert) {
      // Debuggers
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.showQuestions(%d, %s)', id, insert
      );
      DEBUG.DisplayQuestions.fail && console.assert(
        typeof id === 'number',
        'FAIL: DisplayQuestions.showQuestions() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var i;
      // If (argument undefined)
      // Then {set it}
      insert = insert || false;
      // Save list of questions passing search settings
      saveCurrentList();
      // Hide main
      roots.main.style.opacity = '0.0';
      setTimeout(function() {
        // If (insert is true)
        // Then {prepare new questions}
        // Else {clear existing questions}
        if (insert) {
          prepareQuestions();
        }
        else {
          clearQuestions();
        }
        // If (view is all or only one match exists)
        // Then {hide nav}
        // Else {show nav}
        roots.nav.style.display = ( (searchValues.view === 'all') ?
          'none' : (currentList.list.length > 1) ?
            'block' : 'none'
        );
        // If (current and config questions order are different)
        // Then {flip the questions}
        if (searchValues.order !== currentOrder) {
          currentOrder = searchValues.order;
          reverseOrder();
        }
        // Display the correct questions
        changeDisplay(id);
        // Show main
        setTimeout(function() {
          roots.main.style.opacity = '1.0';
          // CLOSE: DisplayQuestions.assemble/showQuestions Group
          DEBUG.DisplayQuestions.group && console.groupEnd();
        }, 20);
      }, 500);
    }

    /**
     * ---------------------------------------------
     * Private Method (saveCurrentList)
     * ---------------------------------------------
     * saves the questions that satisfy the current
        search settings
     * @type {function()}
     * @private
     */
    function saveCurrentList() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.saveCurrentList()'
      );
      // Declare method variables
      var stage, source, mainCat, subCat,
          i, thisStage, flag, last;
      // Save last question index
      last = qLen - 1;
      // Clear list before beginning
      currentList.list = [];
      // Save configuration settings
      stage   = searchValues.stage;
      source  = searchValues.source;
      mainCat = searchValues.mainCat;
      subCat  = searchValues.subCat;
      // Debugger
      DEBUG.DisplayQuestions.state && console.log(
        'STATE: DisplayQuestions.saveCurrentList() ' +
        'Note: currentList.list= %O', currentList.list
      );
      // If (order is asc)
      // Then {index is first question}
      // Else {index is last question}
      i = ( (searchValues.order === 'asc') ?
        0 : last
      );
      // Debugger
      DEBUG.DisplayQuestions.state && console.log(
        'STATE: DisplayQuestions.saveCurrentList() ' +
        'Note: i= %d', i
      );
      // Set flag to object
      flag = {};
      // Loop through questions
      looper:
      while (true) {
        // Set question stage value
        thisStage = ( (questions[i].complete) ?
          'com' : 'inc'
        );
        // Set flags
        flag.stage   = (stage   === 'all' || stage  === thisStage);
        flag.source  = (source  === 'all' || source === questions[i].source);
        flag.mainCat = (mainCat === 'all' || questions[i].mainCat.indexOf(mainCat) !== -1);
        flag.subCat  = (subCat  === 'all' || questions[i].subCat.indexOf(subCat)   !== -1);
        // If (flags are true)
        // Then {add question to current list}
        if (flag.stage && flag.source && flag.mainCat && flag.subCat) {
          currentList.list.push(i);
        }
        // If (order is asc)
        // Then {move to next index}
        // Else {move to prev index}
        if (searchValues.order === 'asc') {
          if (i++ === last) {
            break looper;
          }
        }
        else {
          if (i-- === 0) {
            break looper;
          }
        }
      }
      // If (a question not in current list)
      // Then {set the current question index to -1}
      // If (a question in current list)
      // Then {set the current question index to the first question}
      currentList.index = ( (currentList.list.length === 0) ?
        -1 : 0
      );
      // Debugger
      DEBUG.DisplayQuestions.state && console.log(
        'STATE: DisplayQuestions.saveCurrentList() ' +
        'Note: currentList.list= %O', currentList.list
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (changeDisplay)
     * ---------------------------------------------
     * triggers correct function to update which
        questions should be displayed
     * param: specific question id (number)
     * @type {function(number)}
     * @private
     */
    function changeDisplay(id) {
      // Debuggers
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.changeDisplay(%d)', id
      );
      DEBUG.DisplayQuestions.fail && console.assert(
        typeof id === 'number',
        'FAIL: DisplayQuestions.changeDisplay() ' +
        'Note: Incorrect argument operand.'
      );
      // Trigger correct show call
      switch (true) {
        // If (no questions match search settings)
        // Then {show empty message}
        case (currentList.index === -1 && id === 0):
          showEmpty();
        break;
        // If (id exists)
        // Then {show that question}
        case (id > 0):
          showOneQuestion(id);
        break;
        // If (view is set to one)
        // Then {show current question}
        case (searchValues.view === 'one'):
          showOneQuestion(id);
        break;
        default:
          // Show current list of questions
          showAllQuestions();
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (showEmpty)
     * ---------------------------------------------
     * shows the empty message
     * @type {function()}
     * @private
     */
    function showEmpty() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.showEmpty()'
      );
      // Show empty message
      getClass('empty', roots.qs)[0].style.display = 'block';
    }

    /**
     * ---------------------------------------------
     * Private Method (showOneQuestion)
     * ---------------------------------------------
     * show a single question
     * param: question id (number)
     * @type {function(number)}
     * @private
     */
    function showOneQuestion(id) {
      // Debuggers
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.showOneQuestion(%d)', id
      );
      DEBUG.DisplayQuestions.fail && console.assert(
        typeof id === 'number',
        'FAIL: DisplayQuestions.showOneQuestion() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var i, q;
      // If (id exists)
      // Then {check if id is within search constraints}
      if (id > 0) {
        if ( !checkQuestion(id) ) {
          return;
        }
      }
      // Save question index
      i = ( (id > 0) ?
        id - 1 : currentList.list[currentList.index]
      );
      // If (id exists)
      // Then {set currentList.index}
      if (id > 0) {
        currentList.index = currentList.list.indexOf(i);
      }
      // Show question
      q = getID('aIV-q'+i);
      q.style.display = 'block';
      q.className = 'question shade1';
    }

    /**
     * ---------------------------------------------
     * Private Method (checkQuestion)
     * ---------------------------------------------
     * show a single question
     * param: question id (number)
     * @type {function(number): boolean}
     * @private
     */
    function checkQuestion(id) {
      // Debuggers
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.checkQuestion(%d)', id
      );
      DEBUG.DisplayQuestions.fail && console.assert(
        typeof id === 'number',
        'FAIL: DisplayQuestions.checkQuestion() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var i;
      // Set index
      i = id - 1;
      // If (index in currentList)
      // Then {return true}
      if (currentList.list.indexOf(i) !== -1) {
        return true;
      }
      // If (question index does not exist)
      // Then {reset config and rerun display}
      if (i < 0 || i >= qLen) {
        configuration.searchDefaults.startID = 0;
        showOneQuestion(0);
        return false;
      }
      // Set search config to all
      searchValues.stage   = 'all';
      searchValues.source  = 'all';
      searchValues.mainCat = 'all';
      searchValues.subCat  = 'all';
      getID('aIV-stage').value   = 'all';
      getID('aIV-source').value  = 'all';
      getID('aIV-mainCat').value = 'all';
      getID('aIV-subCat').value  = 'all';
      // Rerun display
      showQuestions(id, false);
      // Return false
      return false;
    }

    /**
     * ---------------------------------------------
     * Private Method (showAllQuestions)
     * ---------------------------------------------
     * shows all of the questions that satisfy the
        search settings
     * @type {function()}
     * @private
     */
    function showAllQuestions() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.showAllQuestions()'
      );
      // Declare method variables
      var cLen, c, i, node, par;
      // Save currentList length
      cLen = currentList.list.length;
      // Show questions from currentList
      for (c=0; c<cLen; c++) {
        // Save node list index
        i = currentList.list[c];
        // Debugger
        DEBUG.DisplayQuestions.state && console.log(
          'STATE: DisplayQuestions.showAllQuestions() ' +
          'Note: i= %d', i
        );
        // Save refernce to node
        node = getID('aIV-q'+i);
        // Save parity check
        par = c % 2;
        // Set question classes
        node.className = 'question ' +
        // If (node even)
        // Then {assign shade1}
        // Else {assign shade2}
        ( (par === 0) ? 'shade1' : 'shade2' );
        // Show question
        node.style.display = 'block';
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (prevQuestion)
     * ---------------------------------------------
     * retrieves the html for the previous question
     * @type {function(): string}
     * @private
     */
    function prevQuestion() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.prevQuestion()'
      );
      // Declare method variables
      var c, i;
      // Save the current question index
      c = currentList.index;
      // Save prev question index
      i = c - 1;
      // If (index does not exist)
      // Then {set to last index of currentList}
      if (i === -1) {
        i = currentList.list.length - 1;
      }
      // Save new current index
      currentList.index = i;
      // Show new question
      showNextQuestion(currentList.list[c], currentList.list[i]);
    }

    /**
     * ---------------------------------------------
     * Private Method (nextQuestion)
     * ---------------------------------------------
     * retrieves the html for the next question
     * @type {function(): string}
     * @private
     */
    function nextQuestion() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.nextQuestion()'
      );
      // Declare method variables
      var c, i;
      // Save the current question index
      c = currentList.index;
      // Save next question index
      i = c + 1;
      // If (index does not exist)
      // Then {set index to first}
      if (i === currentList.list.length) {
        i = 0;
      }
      // Save new current index
      currentList.index = i;
      // Show new question
      showNextQuestion(currentList.list[c], currentList.list[i]);
    }

    /**
     * ---------------------------------------------
     * Private Method (showNextQuestion)
     * ---------------------------------------------
     * hides an old question and shows a new
     * param: the old question index (number)
     * param: the new question index (number)
     * @type {function(number, number)}
     * @private
     */
    function showNextQuestion(o, n) {
      // Debuggers
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.nextQuestion(%d, %d)', o, n
      );
      DEBUG.DisplayQuestions.fail && console.assert(
        (typeof o === 'number' &&
         typeof n === 'number'),
        'FAIL: DisplayQuestions.nextQuestion() ' +
        'Note: Incorrect argument operand.'
      );
      // Hide questions
      roots.qs.style.opacity = '0.0';
      setTimeout(function() {
        // Hide old question
        o = getID('aIV-q'+ o);
        o.style.display = 'none';
        // Show new question
        n = getID('aIV-q'+ n);
        n.style.display = 'block';
        n.className = 'question shade1';
        // Show questions
        setTimeout(function() {
          roots.qs.style.opacity = '1.0';
          // CLOSE: DisplayQuestions.prev/nextQuestion Group
          DEBUG.DisplayQuestions.group && console.groupEnd();
        }, 20);
      }, 500);
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareQuestions)
     * ---------------------------------------------
     * set all the question's opacity to 1 and format
        their code view and remove loader
     * @type {function()}
     * @private
     */
    function prepareQuestions() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.prepareQuestions()'
      );
      // Set each question's code view
      FormatQuestions.formatCodeView();
      // Hide loadError and gif loader
      getClass('loadError')[0].style.display = 'none';
      getClass('loader')[0].style.display = 'none';
    }

    /**
     * ---------------------------------------------
     * Private Method (clearQuestions)
     * ---------------------------------------------
     * set all the question's display to none and
        clear classnames
     * @type {function()}
     * @private
     */
    function clearQuestions() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.clearQuestions()'
      );
      // Declare method variables
      var q, i;
      // Set each question display to none
      for (i=0; i<qLen; i++) {
        q = getID('aIV-q'+i);
        q.style.display = 'none';
        q.className = 'question';
      }
      // Set empty message display to none
      getClass('empty', roots.qs)[0].style.display = 'none';
    }

    /**
     * ---------------------------------------------
     * Private Method (reverseOrder)
     * ---------------------------------------------
     * reverse the order of the questions
     * @type {function()}
     * @private
     */
    function reverseOrder() {
      // Debugger
      DEBUG.DisplayQuestions.call && console.log(
        'CALL: DisplayQuestions.reverseOrder()'
      );
      // Declare method variables
      var q, i;
      // Get all questions
      q = getClass('question');
      // Set each question display to none
      for (i=(qLen-1); i>=0; i--) {
        roots.qs.appendChild(q[i]);
      }
    }

    // END CLASS: DisplayQuestions
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (PrettifyCode)
   * ---------------------------------------------
   * converts a javascript function to a formatted
      string of html list items where each item is
      a line of code and adds span tags to each
      line to mark every piece of js syntax
   * @type {function(): {
       init: function(Object): {
            result: string,
         lineCount: number
       }
     }}
   * @private
   */
  var PrettifyCode = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(Object): {
              result: string,
           lineCount: number
         }
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (PrettifyCode.init)
       * ---------------------------------------------
       * initialize PrettifyCode
       * param: a js function (function)
       */
      init: function(f) {
        // OPEN: PrettifyCode Group
        DEBUG.PrettifyCode.group && console.groupCollapsed(
          'GROUP: PrettifyCode'
        );
        // Declare method variables
        var result;
        // Run class
        result = init(f);
        // CLOSE: PrettifyCode Group
        DEBUG.PrettifyCode.group && console.groupEnd();
        // Return formatted question
        return result;
      }
    };

    /**
     * ---------------------------------------------
     * Private Variable (linePadding)
     * ---------------------------------------------
     * the pixel count for the padding of each line
     * @const
     * @type {number}
     * @private
     */
    var linePadding = 20;

    /**
     * ---------------------------------------------
     * Private Variable (paddingLevel)
     * ---------------------------------------------
     * the current line padding level
     * @type {number}
     * @private
     */
    var paddingLevel;

    /**
     * ---------------------------------------------
     * Private Variable (likelyRegex)
     * ---------------------------------------------
     * characters that if preceding a '/' are likely
        a regular expression
     * @const
     * @type {Array.<string>}
     * @private
     */
    var likelyRegex = ['(','[','{',';','*','/','%',
                       '+','-','<','>','&','^','|',
                       '=', '!'];

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * list of valid plain number characters
     * @const
     * @type {string}
     * @private
     */
    var plainNumbers = /[0-9\.]/;

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * list of valid hex number characters
     * @const
     * @type {string}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * list of valid starting identifier characters
     * @const
     * @type {string}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * list of valid identifier characters
     * @const
     * @type {string}
     * @private
     */
    var identifiers = /[a-z0-9_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (keywords)
     * ---------------------------------------------
     * a hash map of keyword categories and keyword
     *  objects and methods containing their
     *  category and properties
     * @const
     * @type {{
        categories: Object,
           objects: Object
       }}
     * @private
     */
    var keywords = {
      categories: {
        // Defining
        'def': 'defKey',
        // Reserved
        'res': 'resKey',
        // Natives
        'nat': 'natKey',
        // Values
        'val': 'valKey',
        // Client
        'cli': 'cliKey',
        // jQuery
        'jqu': 'jquKey'
      },
      objects: {
        '-class'   : { cat: 'def', props: null },
        '-const'   : { cat: 'def', props: null },
        '-function': { cat: 'def', props: null },
        '-var'     : { cat: 'def', props: null },
        '-abstract'    : { cat: 'res', props: null },
        '-arguments'   : { cat: 'res', props: null },
        '-boolean'     : { cat: 'res', props: null },
        '-break'       : { cat: 'res', props: null },
        '-byte'        : { cat: 'res', props: null },
        '-case'        : { cat: 'res', props: null },
        '-catch'       : { cat: 'res', props: null },
        '-char'        : { cat: 'res', props: null },
        '-continue'    : { cat: 'res', props: null },
        '-debugger'    : { cat: 'res', props: null },
        '-default'     : { cat: 'res', props: null },
        '-delete'      : { cat: 'res', props: null },
        '-do'          : { cat: 'res', props: null },
        '-double'      : { cat: 'res', props: null },
        '-else'        : { cat: 'res', props: null },
        '-enum'        : { cat: 'res', props: null },
        '-export'      : { cat: 'res', props: null },
        '-extends'     : { cat: 'res', props: null },
        '-final'       : { cat: 'res', props: null },
        '-finally'     : { cat: 'res', props: null },
        '-float'       : { cat: 'res', props: null },
        '-for'         : { cat: 'res', props: null },
        '-goto'        : { cat: 'res', props: null },
        '-if'          : { cat: 'res', props: null },
        '-implements'  : { cat: 'res', props: null },
        '-import'      : { cat: 'res', props: null },
        '-in'          : { cat: 'res', props: null },
        '-instanceof'  : { cat: 'res', props: null },
        '-int'         : { cat: 'res', props: null },
        '-interface'   : { cat: 'res', props: null },
        '-item'        : { cat: 'res', props: null },
        '-let'         : { cat: 'res', props: null },
        '-long'        : { cat: 'res', props: null },
        '-native'      : { cat: 'res', props: null },
        '-new'         : { cat: 'res', props: null },
        '-package'     : { cat: 'res', props: null },
        '-private'     : { cat: 'res', props: null },
        '-protected'   : { cat: 'res', props: null },
        '-public'      : { cat: 'res', props: null },
        '-return'      : { cat: 'res', props: null },
        '-short'       : { cat: 'res', props: null },
        '-static'      : { cat: 'res', props: null },
        '-super'       : { cat: 'res', props: null },
        '-switch'      : { cat: 'res', props: null },
        '-synchronized': { cat: 'res', props: null },
        '-this'        : { cat: 'res', props: null },
        '-throw'       : { cat: 'res', props: null },
        '-throws'      : { cat: 'res', props: null },
        '-transient'   : { cat: 'res', props: null },
        '-try'         : { cat: 'res', props: null },
        '-typeof'      : { cat: 'res', props: null },
        '-void'        : { cat: 'res', props: null },
        '-volatile'    : { cat: 'res', props: null },
        '-while'       : { cat: 'res', props: null },
        '-with'        : { cat: 'res', props: null },
        '-yield'       : { cat: 'res', props: null },
        '-apply'              : { cat: 'nat', props: null },
        '-Array'              : { cat: 'nat', props: {
          '-from'   : 1,
          '-isArray': 1,
          '-observe': 1,
          '-of'     : 1
        } },
        '-ArrayBuffer'        : { cat: 'nat', props: {
          '-isView'  : 1,
          '-transfer': 1
        } },
        '-bind'               : { cat: 'nat', props: null },
        '-Boolean'            : { cat: 'nat', props: null },
        '-call'               : { cat: 'nat', props: null },
        '-charAt'             : { cat: 'nat', props: null },
        '-charCodeAt'         : { cat: 'nat', props: null },
        '-clearInterval'      : { cat: 'nat', props: null },
        '-clearTimeout'       : { cat: 'nat', props: null },
        '-concat'             : { cat: 'nat', props: null },
        '-constructor'        : { cat: 'nat', props: null },
        '-DataView'           : { cat: 'nat', props: null },
        '-Date'               : { cat: 'nat', props: {
          '-UTC'  : 1,
          '-now'  : 1,
          '-parse': 1
        } },
        '-decodeURI'          : { cat: 'nat', props: null },
        '-decodeURIComponent' : { cat: 'nat', props: null },
        '-encodeURI'          : { cat: 'nat', props: null },
        '-encodeURIComponent' : { cat: 'nat', props: null },
        '-Error'              : { cat: 'nat', props: null },
        '-escape'             : { cat: 'nat', props: null },
        '-eval'               : { cat: 'nat', props: null },
        '-EvalError'          : { cat: 'nat', props: null },
        '-fromCharCode'       : { cat: 'nat', props: null },
        '-Function'           : { cat: 'nat', props: null },
        '-Generator'          : { cat: 'nat', props: null },
        '-GeneratorFunction'  : { cat: 'nat', props: null },
        '-getDate'            : { cat: 'nat', props: null },
        '-getDay'             : { cat: 'nat', props: null },
        '-getFullYear'        : { cat: 'nat', props: null },
        '-getHours'           : { cat: 'nat', props: null },
        '-getMilliseconds'    : { cat: 'nat', props: null },
        '-getMinutes'         : { cat: 'nat', props: null },
        '-getMonth'           : { cat: 'nat', props: null },
        '-getSeconds'         : { cat: 'nat', props: null },
        '-getTime'            : { cat: 'nat', props: null },
        '-getTimezoneOffset'  : { cat: 'nat', props: null },
        '-getUTCDate'         : { cat: 'nat', props: null },
        '-getUTCDay'          : { cat: 'nat', props: null },
        '-getUTCFullYear'     : { cat: 'nat', props: null },
        '-getUTCHours'        : { cat: 'nat', props: null },
        '-getUTCMilliseconds' : { cat: 'nat', props: null },
        '-getUTCMinutes'      : { cat: 'nat', props: null },
        '-getUTCMonth'        : { cat: 'nat', props: null },
        '-getUTCSeconds'      : { cat: 'nat', props: null },
        '-getYear'            : { cat: 'nat', props: null },
        '-hasOwnProperty'     : { cat: 'nat', props: null },
        '-indexOf'            : { cat: 'nat', props: null },
        '-isFinite'           : { cat: 'nat', props: null },
        '-isNaN'              : { cat: 'nat', props: null },
        '-isPrototypeOf'      : { cat: 'nat', props: null },
        '-join'               : { cat: 'nat', props: null },
        '-JSON'               : { cat: 'nat', props: {
          '-parse'    : 1,
          '-stringify': 1
        } },
        '-lastIndexOf'        : { cat: 'nat', props: null },
        '-length'             : { cat: 'nat', props: null },
        '-match'              : { cat: 'nat', props: null },
        '-Math'               : { cat: 'nat', props: {
          '-abs'   : 1,
          '-acos'  : 1,
          '-asin'  : 1,
          '-atan'  : 1,
          '-atan2' : 1,
          '-ceil'  : 1,
          '-cos'   : 1,
          '-exp'   : 1,
          '-floor' : 1,
          '-log'   : 1,
          '-max'   : 1,
          '-min'   : 1,
          '-pow'   : 1,
          '-random': 1,
          '-round' : 1,
          '-sin'   : 1,
          '-sqrt'  : 1,
          '-tan'   : 1
        } },
        '-Number'             : { cat: 'nat', props: {
          '-EPSILON'           : 1,
          '-isNaN'             : 1,
          '-isFinite'          : 1,
          '-isInteger'         : 1,
          '-isSafeInteger'     : 1,
          '-MAX_SAFE_INTEGER'  : 1,
          '-MAX_VALUE'         : 1,
          '-MIN_SAFE_INTEGER'  : 1,
          '-MIN_VALUE'         : 1,
          '-NaN'               : 1,
          '-NEGATIVE_INFINITY' : 1,
          '-parseFloat'        : 1,
          '-parseInt'          : 1,
          '-POSITIVE_INFINITY' : 1
        } },
        '-Object'             : { cat: 'nat', props: {
          '-assign'                  : 1,
          '-create'                  : 1,
          '-defineProperty'          : 1,
          '-defineProperties'        : 1,
          '-freeze'                  : 1,
          '-getOwnPropertyDescriptor': 1,
          '-getOwnPropertyNames'     : 1,
          '-getOwnPropertySymbols'   : 1,
          '-getPrototypeOf'          : 1,
          '-is'                      : 1,
          '-isExtensible'            : 1,
          '-isFrozen'                : 1,
          '-isSealed'                : 1,
          '-keys'                    : 1,
          '-observe'                 : 1,
          '-preventExtensions'       : 1,
          '-seal'                    : 1,
          '-setPrototypeOf'          : 1
        } },
        '-parse'              : { cat: 'nat', props: null },
        '-parseFloat'         : { cat: 'nat', props: null },
        '-parseInt'           : { cat: 'nat', props: null },
        '-pop'                : { cat: 'nat', props: null },
        '-preference'         : { cat: 'nat', props: null },
        '-print'              : { cat: 'nat', props: null },
        '-prototype'          : { cat: 'nat', props: null },
        '-push'               : { cat: 'nat', props: null },
        '-RegExp'             : { cat: 'nat', props: null },
        '-replace'            : { cat: 'nat', props: null },
        '-reset'              : { cat: 'nat', props: null },
        '-resizeBy'           : { cat: 'nat', props: null },
        '-resizeTo'           : { cat: 'nat', props: null },
        '-reverse'            : { cat: 'nat', props: null },
        '-search'             : { cat: 'nat', props: null },
        '-setDate'            : { cat: 'nat', props: null },
        '-setFullYear'        : { cat: 'nat', props: null },
        '-setHours'           : { cat: 'nat', props: null },
        '-setMilliseconds'    : { cat: 'nat', props: null },
        '-setInterval'        : { cat: 'nat', props: null },
        '-setMinutes'         : { cat: 'nat', props: null },
        '-setMonth'           : { cat: 'nat', props: null },
        '-setSeconds'         : { cat: 'nat', props: null },
        '-setTime'            : { cat: 'nat', props: null },
        '-setTimeout'         : { cat: 'nat', props: null },
        '-setUTCDate'         : { cat: 'nat', props: null },
        '-setUTCFullYear'     : { cat: 'nat', props: null },
        '-setUTCHours'        : { cat: 'nat', props: null },
        '-setUTCMilliseconds' : { cat: 'nat', props: null },
        '-setUTCMinutes'      : { cat: 'nat', props: null },
        '-setUTCMonth'        : { cat: 'nat', props: null },
        '-setUTCSeconds'      : { cat: 'nat', props: null },
        '-setYear'            : { cat: 'nat', props: null },
        '-shift'              : { cat: 'nat', props: null },
        '-slice'              : { cat: 'nat', props: null },
        '-sort'               : { cat: 'nat', props: null },
        '-splice'             : { cat: 'nat', props: null },
        '-split'              : { cat: 'nat', props: null },
        '-String'             : { cat: 'nat', props: {
          '-fromCharCode' : 1,
          '-fromCodePoint': 1,
          '-raw'          : 1
        } },
        '-substr'             : { cat: 'nat', props: null },
        '-substring'          : { cat: 'nat', props: null },
        '-Symbol'             : { cat: 'nat', props: {
          '-for'   : 1,
          '-keyFor': 1
        } },
        '-test'               : { cat: 'nat', props: null },
        '-toGMTString'        : { cat: 'nat', props: null },
        '-toLocaleString'     : { cat: 'nat', props: null },
        '-toLowerCase'        : { cat: 'nat', props: null },
        '-toSource'           : { cat: 'nat', props: null },
        '-toString'           : { cat: 'nat', props: null },
        '-toUpperCase'        : { cat: 'nat', props: null },
        '-toUTCString'        : { cat: 'nat', props: null },
        '-TypedArray'         : { cat: 'nat', props: {
          '-BYTES_PER_ELEMENT': 1,
          '-from'             : 1,
          '-name'             : 1,
          '-of'               : 1
        } },
        '-unescape'           : { cat: 'nat', props: null },
        '-unshift'            : { cat: 'nat', props: null },
        '-unwatch'            : { cat: 'nat', props: null },
        '-UTC'                : { cat: 'nat', props: null },
        '-valueOf'            : { cat: 'nat', props: null },
        '-watch'              : { cat: 'nat', props: null },
        '-write'              : { cat: 'nat', props: null },
        '-writeln'            : { cat: 'nat', props: null },
        '-false'    : { cat: 'val', props: null },
        '-Infinity' : { cat: 'val', props: null },
        '-Nan'      : { cat: 'val', props: null },
        '-null'     : { cat: 'val', props: null },
        '-true'     : { cat: 'val', props: null },
        '-undefined': { cat: 'val', props: null },
        '-alert'                 : { cat: 'cli', props: null },
        '-anchor'                : { cat: 'cli', props: null },
        '-anchors'               : { cat: 'cli', props: null },
        '-appendChild'           : { cat: 'cli', props: null },
        '-area'                  : { cat: 'cli', props: null },
        '-assign'                : { cat: 'cli', props: null },
        '-back'                  : { cat: 'cli', props: null },
        '-big'                   : { cat: 'cli', props: null },
        '-blink'                 : { cat: 'cli', props: null },
        '-blur'                  : { cat: 'cli', props: null },
        '-body'                  : { cat: 'cli', props: null },
        '-bold'                  : { cat: 'cli', props: null },
        '-button'                : { cat: 'cli', props: null },
        '-byteToString'          : { cat: 'cli', props: null },
        '-captureEvents'         : { cat: 'cli', props: null },
        '-checkbox'              : { cat: 'cli', props: null },
        '-className'             : { cat: 'cli', props: null },
        '-click'                 : { cat: 'cli', props: null },
        '-clientHeight'          : { cat: 'cli', props: null },
        '-clientInformation'     : { cat: 'cli', props: null },
        '-clientWidth'           : { cat: 'cli', props: null },
        '-close'                 : { cat: 'cli', props: null },
        '-closed'                : { cat: 'cli', props: null },
        '-confirm'               : { cat: 'cli', props: null },
        '-console'               : { cat: 'cli', props: {
          '-assert'        : 1,
          '-group'         : 1,
          '-groupCollapsed': 1,
          '-groupEnd'      : 1,
          '-log'           : 1,
          '-trace'         : 1
        } },
        '-createElement'         : { cat: 'cli', props: null },
        '-crypto'                : { cat: 'cli', props: null },
        '-defaultStatus'         : { cat: 'cli', props: null },
        '-disableExternalCapture': { cat: 'cli', props: null },
        '-document'              : { cat: 'cli', props: null },
        '-element'               : { cat: 'cli', props: null },
        '-elements'              : { cat: 'cli', props: null },
        '-embed'                 : { cat: 'cli', props: null },
        '-embeds'                : { cat: 'cli', props: null },
        '-enableExternalCapture' : { cat: 'cli', props: null },
        '-event'                 : { cat: 'cli', props: null },
        '-fileUpload'            : { cat: 'cli', props: null },
        '-find'                  : { cat: 'cli', props: null },
        '-fixed'                 : { cat: 'cli', props: null },
        '-focus'                 : { cat: 'cli', props: null },
        '-fontcolor'             : { cat: 'cli', props: null },
        '-fontsize'              : { cat: 'cli', props: null },
        '-form'                  : { cat: 'cli', props: null },
        '-forms'                 : { cat: 'cli', props: null },
        '-forward'               : { cat: 'cli', props: null },
        '-frame'                 : { cat: 'cli', props: null },
        '-frames'                : { cat: 'cli', props: null },
        '-frameRate'             : { cat: 'cli', props: null },
        '-getComputedStyle'      : { cat: 'cli', props: null },
        '-getElementById'        : { cat: 'cli', props: null },
        '-getElementsByClassName': { cat: 'cli', props: null },
        '-getElementsByTagName'  : { cat: 'cli', props: null },
        '-getOptionValueCount'   : { cat: 'cli', props: null },
        '-getOptionValue'        : { cat: 'cli', props: null },
        '-getPropertyValue'      : { cat: 'cli', props: null },
        '-getSelection'          : { cat: 'cli', props: null },
        '-go'                    : { cat: 'cli', props: null },
        '-handleEvent'           : { cat: 'cli', props: null },
        '-hidden'                : { cat: 'cli', props: null },
        '-history'               : { cat: 'cli', props: null },
        '-home'                  : { cat: 'cli', props: null },
        '-id'                    : { cat: 'cli', props: null },
        '-image'                 : { cat: 'cli', props: null },
        '-ImageData'             : { cat: 'cli', props: {
          '-data'  : 1,
          '-height': 1,
          '-width' : 1
        } },
        '-images'                : { cat: 'cli', props: null },
        '-innerHeight'           : { cat: 'cli', props: null },
        '-innerHTML'             : { cat: 'cli', props: null },
        '-innerWidth'            : { cat: 'cli', props: null },
        '-italics'               : { cat: 'cli', props: null },
        '-javaEnabled'           : { cat: 'cli', props: null },
        '-layer'                 : { cat: 'cli', props: null },
        '-layers'                : { cat: 'cli', props: null },
        '-link'                  : { cat: 'cli', props: null },
        '-location'              : { cat: 'cli', props: null },
        '-mimeTypes'             : { cat: 'cli', props: null },
        '-moveAbove'             : { cat: 'cli', props: null },
        '-moveBelow'             : { cat: 'cli', props: null },
        '-moveBy'                : { cat: 'cli', props: null },
        '-moveTo'                : { cat: 'cli', props: null },
        '-moveToAbsolute'        : { cat: 'cli', props: null },
        '-navigate'              : { cat: 'cli', props: null },
        '-navigator'             : { cat: 'cli', props: null },
        '-offscreenBuffering'    : { cat: 'cli', props: null },
        '-offsetHeight'          : { cat: 'cli', props: null },
        '-offsetWidth'           : { cat: 'cli', props: null },
        '-open'                  : { cat: 'cli', props: null },
        '-opener'                : { cat: 'cli', props: null },
        '-options'               : { cat: 'cli', props: null },
        '-outerHeight'           : { cat: 'cli', props: null },
        '-outerWidth'            : { cat: 'cli', props: null },
        '-packages'              : { cat: 'cli', props: null },
        '-pageXOffset'           : { cat: 'cli', props: null },
        '-pageYOffset'           : { cat: 'cli', props: null },
        '-parent'                : { cat: 'cli', props: null },
        '-password'              : { cat: 'cli', props: null },
        '-pkcs11'                : { cat: 'cli', props: null },
        '-plugins'               : { cat: 'cli', props: null },
        '-prompt'                : { cat: 'cli', props: null },
        '-propertyIsEnum'        : { cat: 'cli', props: null },
        '-radio'                 : { cat: 'cli', props: null },
        '-refresh'               : { cat: 'cli', props: null },
        '-releaseEvents'         : { cat: 'cli', props: null },
        '-reload'                : { cat: 'cli', props: null },
        '-removeChild'           : { cat: 'cli', props: null },
        '-routeEvent'            : { cat: 'cli', props: null },
        '-screen'                : { cat: 'cli', props: null },
        '-screenX'               : { cat: 'cli', props: null },
        '-screenY'               : { cat: 'cli', props: null },
        '-scroll'                : { cat: 'cli', props: null },
        '-scrollBy'              : { cat: 'cli', props: null },
        '-scrollTo'              : { cat: 'cli', props: null },
        '-secure'                : { cat: 'cli', props: null },
        '-select'                : { cat: 'cli', props: null },
        '-self'                  : { cat: 'cli', props: null },
        '-small'                 : { cat: 'cli', props: null },
        '-status'                : { cat: 'cli', props: null },
        '-stop'                  : { cat: 'cli', props: null },
        '-strike'                : { cat: 'cli', props: null },
        '-style'                 : { cat: 'cli', props: null },
        '-submit'                : { cat: 'cli', props: null },
        '-sup'                   : { cat: 'cli', props: null },
        '-taint'                 : { cat: 'cli', props: null },
        '-taintEnabled'          : { cat: 'cli', props: null },
        '-text'                  : { cat: 'cli', props: null },
        '-textContent'           : { cat: 'cli', props: null },
        '-textarea'              : { cat: 'cli', props: null },
        '-top'                   : { cat: 'cli', props: null },
        '-untaint'               : { cat: 'cli', props: null },
        '-window'                : { cat: 'cli', props: null },
        '-$'     : { cat: 'jqu', props: null },
        '-jQuery': { cat: 'jqu', props: null }
      }
    };

    /**
     * ---------------------------------------------
     * Private Variable (commentOpen)
     * ---------------------------------------------
     * is a comment open
     * @type {boolean}
     * @private
     */
    var commentOpen;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * converts a javascript function to string with
        html markup
     * param: a function (function)
     * @type {function(Object): {
            result: string,
         lineCount: number
       }}
     * @private
     */
    function init(f) {
      // Debuggers
      DEBUG.PrettifyCode.call && console.log(
        'CALL: PrettifyCode.init()'
      );
      DEBUG.PrettifyCode.fail && console.assert(
        typeof f === 'function',
        'FAIL: PrettifyCode.init() ' +
        'Note: Incorrect argument operand.'
      );
      // First: convert function to array of lines
      // Then: convert array of lines to a formatted string
      return formatLines( prepareArray(f) );
    }

    /**
     * ---------------------------------------------
     * Private Method (setPadding)
     * ---------------------------------------------
     * saves the line's padding level
     * param: the first line character (string)
     * param: the last line character (string)
     * @type {function(string, string): number}
     * @private
     */
    function setPadding(first, last) {
      // Debuggers
      DEBUG.PrettifyCode.call && console.log(
        'CALL: PrettifyCode.setPadding(%s, %s)', first, last
      );
      DEBUG.PrettifyCode.fail && console.assert(
        (typeof first === 'string' &&
         typeof last  === 'string'),
        'FAIL: PrettifyCode.setPadding() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var padding;
      // Adjust padding level
      switch (first) {
        case '}':
        case ']':
        case ')':
          --paddingLevel;
      }
      // Set current padding
      padding = paddingLevel * linePadding;
      // Adjust padding level
      switch (last) {
        case '{':
        case '[':
        case '(':
        case '?':
         ++paddingLevel;
      }
      return padding;
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLine)
     * ---------------------------------------------
     * removes extra spaces, sets the first and last
        line character, and registers empty lines
        for the supplied line of code
     * param: line of code (string)
     * @type {function(string): {
            line: string,
           first: string,
            last: string,
         padding: number,
           empty: boolean
       }}
     * @private
     */
    function prepareLine(l) {
      // Debuggers
      DEBUG.PrettifyCode.call && console.log(
        'CALL: PrettifyCode.prepareLine()'
      );
      DEBUG.PrettifyCode.fail && console.assert(
        typeof l === 'string',
        'FAIL: PrettifyCode.prepareLine() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var i, len, last, line;
      // Convert line to array
      l = l.split('');
      // Save array length
      len  = l.length;
      // Save last index
      last = len - 1;
      // Set object with all line properties
      line = {
           code: '',
          first: '',
           last: '',
        padding:  0,
          empty: false
      };
      // Trim starting whitespace
      looper1:
      for(i=0; i<len; i++) {
        if (l[i] === ' ') {
          l[i] = '';
        }
        else {
          line.first = l[i];
          break looper1;
        }
        if (i === last) {
          line.empty = true;
        }
      }
      // If (line is not empty)
      // Then {trim end whitespace}
      if (!line.empty) {
        looper2:
        for(i=last; i>=0; i--) {
          if (l[i] === ' ') {
            l[i] = '';
          }
          else {
            line.last = l[i];
            break looper2;
          }
        }
      }
      // Save line string
      line.code = l.join('');
      return line;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatLines)
     * ---------------------------------------------
     * formats the supplied lines of code
     * param: array of code lines (array)
     * @type {function(Array.<string>): {
            result: string,
         lineCount: number
       }}
     * @private
     */
    function formatLines(lines) {
      // Debuggers
      DEBUG.PrettifyCode.call && console.log(
        'CALL: PrettifyCode.formatLines()'
      );
      DEBUG.PrettifyCode.fail && console.assert(
        typeof lines === 'object',
        'FAIL: PrettifyCode.formatLines() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var i, line, lineCount;
      // Set level of padding to 0
      paddingLevel = 0;
      // Set open comment indicator to false
      commentOpen  = false;
      // Save the count of lines
      lineCount = lines.length;
      // Loop through lines
      for (i=0; i<lines.length; i++) {
        // Prepare line for formatting
        line = prepareLine(lines[i]);
        // Set line padding
        if (!line.empty) {
          line.padding = setPadding(line.first, line.last);
        }
        // Highlight syntax
        if (!line.empty) {
          line.code = HighlightSyntax.init(line.code);
        }
        lines[i] = '<li style="padding-left:' +
        line.padding +'px">'+ line.code +'</li>';
        // Debugger
        DEBUG.PrettifyCode.state && console.log(
          'STATE: PrettifyCode.formatLines() ' +
          'Note: lines[i]= %s', lines[i]
        );
      }
      return { result: lines.join(''), lineCount: lineCount };
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareArray)
     * ---------------------------------------------
     * converts a function into an array of strings
        where each value represents a line of code
        and replaces all tabs with spaces
     * param: a function (function)
     * @type {function(Object): Array.<string>}
     * @private
     */
    function prepareArray(f) {
      // Debuggers
      DEBUG.PrettifyCode.call && console.log(
        'CALL: PrettifyCode.prepareArray()'
      );
      DEBUG.PrettifyCode.fail && console.assert(
        typeof f === 'function',
        'FAIL: PrettifyCode.prepareArray() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var code;
      // First: convert function to string
      // Then: standardize all line breaks
      code = String(f).replace(/\r\n?/g, '\n');
      // First: replace all tabs with spaces
      // Then: convert string to array of lines
      // Then: return result
      return code.replace(/\t/g, ' ').split('\n');
    }

    /**
     * ---------------------------------------------
     * Private Class (HighlightSyntax)
     * ---------------------------------------------
     * adds spans around reserved code characters to
        highlight specific syntax for a line of code
     * @type {function(): {
         execute: function(string): string
       }}
     * @private
     */
    var HighlightSyntax = (function() {

      /**
       * ---------------------------------------------
       * Private Variable (__return)
       * ---------------------------------------------
       * the public methods of this class
       * @type {{
           init: function(string): string
         }}
       * @private
       */
      var __return = {
        /**
         * ---------------------------------------------
         * Public Method (HighlightSyntax.init)
         * ---------------------------------------------
         * initializes HighlightSyntax
         * param: a line of code (string)
         */
        init: function (l) {
          // OPEN: HighlightSyntax Group
          DEBUG.HighlightSyntax.group && console.groupCollapsed(
            'GROUP: HighlightSyntax'
          );
          // Declare method variables
          var result;
          // Run class
          result = _init(l);
          // CLOSE: HighlightSyntax Group
          DEBUG.HighlightSyntax.group && console.groupEnd();
          // Return formatted question
          return result;
        }
      };

      /**
       * ---------------------------------------------
       * Private Variable (newLine)
       * ---------------------------------------------
       * the current line of code
       * @type {string|Array.<string>}
       * @private
       */
      var newLine;

      /**
       * ---------------------------------------------
       * Private Variable (line)
       * ---------------------------------------------
       * the original line of code
       * @type {string|Array.<string>}
       * @private
       */
      var line;

      /**
       * ---------------------------------------------
       * Private Variable (len)
       * ---------------------------------------------
       * the length of the line of code
       * @type {number}
       * @private
       */
      var len;

      /**
       * ---------------------------------------------
       * Private Variable (router)
       * ---------------------------------------------
       * a hash map that stores the matching character
       *  formatting methods
       * @type {Object}
       * @private
       */
      var router = {
        "'": function(i) { return formatString(i);    },
        '"': function(i) { return formatString(i);    },
        ' ': function(i) { return formatSpace(i);     },
        '{': function(i) { return formatBracket(i);   },
        '[': function(i) { return formatBracket(i);   },
        '(': function(i) { return formatBracket(i);   },
        ')': function(i) { return formatBracket(i);   },
        ']': function(i) { return formatBracket(i);   },
        '}': function(i) { return formatBracket(i);   },
        '*': function(i) { return formatOperator(i);  },
        '%': function(i) { return formatOperator(i);  },
        '+': function(i) { return formatOperator(i);  },
        '-': function(i) { return formatOperator(i);  },
        '<': function(i) { return formatOperator(i);  },
        '>': function(i) { return formatOperator(i);  },
        '&': function(i) { return formatOperator(i);  },
        '^': function(i) { return formatOperator(i);  },
        '|': function(i) { return formatOperator(i);  },
        '=': function(i) { return formatOperator(i);  },
        '!': function(i) { return formatOperator(i);  },
        '~': function(i) { return formatOperator(i);  },
        '?': function(i) { return formatOperator(i);  },
        ',': function(i) { return formatComma(i);     },
        ';': function(i) { return formatSemicolon(i); },
        ':': function(i) { return formatColon(i);     },
        '.': function(i) { return formatPeriod(i);    },
        '0': function(i) { return formatNumber(i);    },
        '1': function(i) { return formatNumber(i);    },
        '2': function(i) { return formatNumber(i);    },
        '3': function(i) { return formatNumber(i);    },
        '4': function(i) { return formatNumber(i);    },
        '5': function(i) { return formatNumber(i);    },
        '6': function(i) { return formatNumber(i);    },
        '7': function(i) { return formatNumber(i);    },
        '8': function(i) { return formatNumber(i);    },
        '9': function(i) { return formatNumber(i);    },
        '/': function(i) {
          var preceding;
          switch (line[i + 1]) {
            case '/': return formatLineComment(i); break;
            case '*': return formatCommentOpen(i); break;
            default :
              // Save preceding character
              // If (index is line start)
              // Then {set preceding to force regex= true}
              preceding = ( (i === 0) ?
                '(' : (line[i - 1] === ' ') ?
                  line[i - 2] : line[i - 1]
              );
              // If (regex statement)
              // Then {set to regex statement}
              // Else {set to division operator}
              if (likelyRegex.indexOf(preceding) !== -1) {
               return formatRegex(i);
              }
              return formatOperator(i);
            /* ---------------------------------------------------------- *
             * EXISTING BUG (Identifying a RegEx)
             * ---------------------------------------------------------- *
             * Issue 1: identifying the preceding binary operators 'in'
             *          and 'instanceof'                                  *
             * Issue 2: one line if statements (e.g. if (i) /foo/.exec()) *
             * Issue 3: the use of the preceding unary operators '++'
             *          and '--' (e.g. i++ / x)                           *
             * ---------------------------------------------------------- */
          }
        }
      };

      /**
       * ---------------------------------------------
       * Private Method (_init)
       * ---------------------------------------------
       * adds highlighting spans to a line of code
       * param: a line of code (string)
       * @type {function(string): string}
       * @private
       */
      function _init(l) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.init()'
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof l === 'string',
          'FAIL: HighlightSyntax.init() ' +
          'Note: Incorrect argument operand.'
        );
        // Convert line from string to array
        line = l.split('');
        // Save line array length
        len  = line.length;
        // Save copy of line array
        // for final output
        newLine = line.slice();
        // Return formatted line
        return formatLine();
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLine)
       * ---------------------------------------------
       * adds highlighting spans to line of code
       * @type {function(): string}
       * @private
       */
      function formatLine() {
        // Debugger
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatLine()'
        );
        // Declare method variables
        var i, preceding;
        // Set index to start
        i = 0;
        // If (comment is already open by prior line)
        // Then {handle line comment start}
        if (commentOpen) {
          i = formatCommentClose(i);
          // If (whole line is comment)
          // Then {return newLine}
          if (i === len) {
            return newLine.join('');
          }
        }
        // Find and label comments, strings,
        // regexs, spaces, brackets, operators,
        // commas, semicolons, colons, periods,
        // numbers, keywords, identifiers, and
        // miscellaneous
        for(; i<len; i++) {
          // If (router property exists)
          // Then {use router prop to format and update index}
          // Else If (identifier)
          i = ( (!!router[ line[i] ]) ?
            router[ line[i] ](i) : identifierStart.test(line[i]) ?
              formatIdentifier(i) : formatMisc(i)
          );
        }
        return newLine.join('');
      }

      /**
       * ---------------------------------------------
       * Private Method (sanitizeCharacter)
       * ---------------------------------------------
       * inserts html entities when needed
       * param: the current line array index (number)
       * @type {function(number)}
       * @private
       */
      function sanitizeCharacter(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.sanitizeCharacter(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.sanitizeCharacter() ' +
          'Note: Incorrect argument operand.'
        );
        // Replace character with html entity
        switch (line[i]) {
          case '>':
            newLine[i] = '&gt;';
          break;
          case '<':
            newLine[i] = '&lt;';
          break;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipComment)
       * ---------------------------------------------
       * moves the index to the end of comment
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipComment(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipComment(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipComment() ' +
          'Note: Incorrect argument operand.'
        );
        // Loop through line starting at index
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return index}
          if (i >= len) {
            return i;
          }
          // Check character
          switch (line[i]) {
            // Possible comment end
            case '*':
              // If (comment ends)
              // Then {return index}
              if (line[i + 1] === '/') {
                return ++i;
              }
            break;
            // Sanitization needed
            case '>':
            case '<':
              sanitizeCharacter(i);
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipString)
       * ---------------------------------------------
       * moves the index to the end of the string
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipString(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipString(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipString() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var b;
        // Save bracket type
        b = line[i];
        // Find string end
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return last index}
          if (i === len) {
            return --i;
          }
          // Check character
          switch (line[i]) {
            // Possible string end
            case b:
              // If (string ends)
              // Then {return index}
              if (line[i - 1] !== '\\') {
                return i;
              }
            break;
            // Sanitization needed
            case '>':
            case '<':
              sanitizeCharacter(i);
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipSpace)
       * ---------------------------------------------
       * moves the index to the end of the space sequence
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipSpace(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipSpace(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipSpace() ' +
          'Note: Incorrect argument operand.'
        );
        // Loop through line starting at index
        while (true) {
          // If (next index not space)
          // Then {return index}
          if (line[i + 1] !== ' ') {
            return i;
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipNumber)
       * ---------------------------------------------
       * moves the index to the end of the number
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipNumber(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipNumber(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipNumber() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var start, numbers;
        // Save first two spots in number sequence
        start = line[i] + line[i + 1];
        // Set number reference list
        numbers = ( (start === '0x' || start === '0X') ?
          hexNumbers : plainNumbers
        );
        while (true) {
          // If (last index)
          // Then {return index}
          if (i === (len - 1)) {
            return i;
          }
          // If (next index not number)
          // Then {return index}
          if ( !numbers.test(line[i + 1]) ) {
            return i;
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * moves the index to the end of the identifier
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipIdentifier(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipIdentifier(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipIdentifier() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var iName;
        // Start string for the identifier name
        iName = '-';
        // Find the name
        while (true) {
          // Add character to iName
          iName += line[i];
          // If (last index)
          // Then {return index and name}
          if (i === (len - 1)) {
            return { index: i, name: iName };
          }
          // If (next index not identifier)
          // Then {return index and name}
          if ( !identifiers.test(line[i + 1]) ) {
            return {
              index: i,
               name: iName,
              props: (line[i + 1] === '.')
            };
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentOpen)
       * ---------------------------------------------
       * opens a comment, adds comment spans, and 
          moves the index to the end of comment
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatCommentOpen(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatCommentOpen(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatCommentOpen() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comment span
        newLine[i] = '<span class="cmt">/';
        // Move index to end of comment
        i = skipComment(++i);
        // If (comment not closed by line end)
        if (i === len) {
          // Set commentOpen to true
          commentOpen = true;
          // Move index to last value
          --i;
        }
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentClose)
       * ---------------------------------------------
       * adds comment spans and moves the index to the
          end of the comment for a line inheriting an
          already open comment (i.e. line began as a
          comment)
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatCommentClose(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatCommentClose(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatCommentClose() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comment span to line start
        newLine[i] = ( (line[i] === '*') ?
          ' <span class="cmt">*' :
          '<span class="cmt">' + line[i]
        );
        // If (start is a comment end)
        // Then {update line and return next index}
        if (line[0] === '*' && line[1] === '/') {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[1] += '</span>';
          // Return next index
          return 3;
        }
        // Move index to comment end
        i = skipComment(i);
        // If (index exists)
        if (i < len) {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[i] += '</span>';
          // Move index to next value
          ++i;
        }
        else {
          // Add closing span to line end
          newLine[i - 1] += '</span>';
        }
        // Return next index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLineComment)
       * ---------------------------------------------
       * adds comment spans and moves index to line end
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatLineComment(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatLineComment(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatLineComment() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comment span
        newLine[i] = '<span class="cmt">/';
        // Moves index to line end
        i = len - 1;
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatString)
       * ---------------------------------------------
       * adds string spans and moves the index to the
          end of string
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatString(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatString(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatString() ' +
          'Note: Incorrect argument operand.'
        );
        // Add string span
        newLine[i] = '<span class="str">' + line[i];
        // Move index to end of string
        i = skipString(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatRegex)
       * ---------------------------------------------
       * adds regex spans and moves the index to the
          end of regex
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatRegex(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatRegex(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatRegex() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var u;
        // Add regex span
        newLine[i] = '<span class="rgx">/';
        // Move index to the closing forward slash
        i = skipString(i);
        // Start empty array to contain
        // each used regex flags
        u = [];
        // Check for regex flags after
        // closing forward slash
        looper:
        while (true) {
          // All regex flags have been used
          if (u.length === 3) {
            break looper;
          }
          switch (line[i + 1]) {
            case 'g':
            case 'i':
            case 'm':
              // Verify flag has not been repeated
              if (u.indexOf(line[i + 1]) !== -1) {
                break looper;
              }
              // Add flag to used flags array
              u.push(line[i + 1]);
              ++i;
            break;
            default:
              break looper;
          } 
        }
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSpace)
       * ---------------------------------------------
       * adds space spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatSpace(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatSpace(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatSpace() ' +
          'Note: Incorrect argument operand.'
        );
        // Add space span
        newLine[i] = '<span class="spc"> ';
        // Move index to end of space sequence
        i = skipSpace(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatBracket)
       * ---------------------------------------------
       * adds bracket spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatBracket(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatBracket(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatBracket() ' +
          'Note: Incorrect argument operand.'
        );
        // Add bracket spans
        newLine[i] = '' +
        '<span class="brc">' +
          line[i] +
        '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatOperator)
       * ---------------------------------------------
       * adds operator spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatOperator(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatOperator(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatOperator() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var sanitized;
        // Sanitize the operator
        sanitized = ( (line[i] === '<') ?
          '&lt;' : (line[i] === '>') ?
            '&gt;' : line[i]
        );
        // Add operator spans
        newLine[i] = '' +
        '<span class="opr">' +
          sanitized +
        '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatComma)
       * ---------------------------------------------
       * adds comma spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatComma(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatComma(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatComma() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comma spans
        newLine[i] = '<span class="cmm">,</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSemicolon)
       * ---------------------------------------------
       * adds semicolon spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatSemicolon(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatSemicolon(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatSemicolon() ' +
          'Note: Incorrect argument operand.'
        );
        // Add semicolon spans
        newLine[i] = '<span class="smc">;</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatColon)
       * ---------------------------------------------
       * adds colon spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatColon(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatColon(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatColon() ' +
          'Note: Incorrect argument operand.'
        );
        // Add colon spans
        newLine[i] = '<span class="cln">:</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatPeriod)
       * ---------------------------------------------
       * adds period spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatPeriod(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatPeriod(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatPeriod() ' +
          'Note: Incorrect argument operand.'
        );
        // Add period spans
        newLine[i] = '<span class="per">.</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatNumber)
       * ---------------------------------------------
       * adds number spans and moves the index to the
          end of number
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatNumber(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatNumber(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatNumber() ' +
          'Note: Incorrect argument operand.'
        );
        // Add number span
        newLine[i] = '<span class="num">' + line[i];
        // Move index to end of number
        i = skipNumber(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatIdentifier)
       * ---------------------------------------------
       * finds complete identifier, checks whether it
          is a keyword, adds correct span tags, and
          moves the index to end of identifier
       * param: the current line array index (number)
       * param: the key for extra property keywords to
       *         include in check (optional) (string)
       * @type {function(number, undefined|string): number}
       * @private
       */
      function formatIdentifier(i, extras) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatIdentifier(%d, %s)', i, !!extras
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          (typeof i === 'number' &&
           (typeof extras === 'undefined' ||
            typeof extras === 'string')),
          'FAIL: HighlightSyntax.formatIdentifier() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var identifier, catID, keyClass;
        // Save identifier name, last index, and props val
        // { index: 0, name: '', props: false }
        identifier = skipIdentifier(i);
        // If (keyword exists)
        // Then {get corresponding key span class}
        if (!!keywords.objects[identifier.name]) {
          // Save keyword's category id and class name
          catID = keywords.objects[identifier.name].cat;
          keyClass = keywords.categories[catID];
          // Special case for the function keyword
          if (identifier.name === '-function' &&
              (line[identifier.index + 1] === '(' ||
               (line[identifier.index + 1] === ' ' &&
                line[identifier.index + 2] === '('))) {
            keyClass = keywords.categories['res'];
          }
        }
        // If (no keyword match and extra keyword list provided)
        // Then {check extra list for a match}
        if (!keyClass && !!extras) {
          // If (keyword exists)
          // Then {get corresponding key span class}
          if (!!keywords.objects[extras].props[identifier.name]) {
            catID = keywords.objects[extras].cat;
            keyClass = keywords.categories[catID];
          }
        }
        // Set class name and add spans
        keyClass = keyClass || 'idt';
        newLine[i] = '<span class="' + keyClass + '">' + line[i];
        newLine[identifier.index] += '</span>';
        // Update index
        i = identifier.index;
        // If (keyword has property)
        // Then {format it}
        if (!!identifier.props) {
          // Format the dot notation
          formatPeriod(++i);
          // Set extras for next property
          extras = ( (!keywords.objects[identifier.name]) ?
            undefined : (!keywords.objects[identifier.name].props) ?
              undefined : identifier.name
          );
          // Format the property and update the index
          i = formatIdentifier(++i, extras);
        }
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatMisc)
       * ---------------------------------------------
       * adds misc spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatMisc(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatMisc(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatMisc() ' +
          'Note: Incorrect argument operand.'
        );
        // Add misc spans
        newLine[i] = '' +
        '<span class="msc">' +
          line[i] +
        '</span>';
        // Return index
        return i;
      }

      // END CLASS: HighlightSyntax
      return __return;
    }());

    // END CLASS: PrettifyCode
    return _return;
  }());
  
// END MODULE
}(window, document));