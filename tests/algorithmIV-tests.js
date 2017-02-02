/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Question Manager Tests (v1.1.2)
 * -----------------------------------------------------------------------------
 * @file The module used to run all tests for aIV's  question manager app.
 * @module aIVAppTests
 * @version 1.1.2
 * @author Adam Smith [adam@imaginate.life]{@link http://imaginate.life}
 * @copyright 2017 Adam A Smith [http://imaginate.life]{@link http://imaginate.life}
 * @license The Apache License [algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license}
 * @desc More details about the module for aIV.tests:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See the guideline]{@link https://github.com/imaginate/algorithmIV-question-manager/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {Array<*>} vals
 * @typedef {Array<string>} strings
 * @typedef {Array<number>} numbers
 * @typedef {Array<Object>} objects
 */

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

;(function setupTheTestsPublicAPI(testsModuleAPI, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------
   * Global Variable (aIV)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Method (aIV.tests)
   * ---------------------------------------------------
   * @desc Runs the tests for aIV.app.
   * @type {function}
   * @global
   */
  aIV.runTests = testsModuleAPI.startTests;

})(

////////////////////////////////////////////////////////////////////////////////
// The Tests Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheTestsModule(undefined) {
  "use strict"; 

/* -----------------------------------------------------------------------------
 * The Tests Module API (module-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (testsModuleAPI)
   * -----------------------------------------------------
   * @desc The API for the Tests Module.
   * @type {!Object<string, function>}
   */
  var testsModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Method (testsModuleAPI.startTests)
   * -----------------------------------------------------
   * @desc Initializes the aIV.app tests.
   * @type {function}
   */
  testsModuleAPI.startTests = function() {

    if (!appHasBeenInitialized) {

      appHasBeenInitialized = true;

      // Setup the tests app
      app = new App();

      // Run the tests
      app.runTests();
    }
  };

  aIV.utils.freezeObj(testsModuleAPI, true);

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (appHasBeenInitialized)
   * -----------------------------------------------------
   * @desc Indicates whether the Tests app has been initialized.
   * @type {boolean}
   */
  var appHasBeenInitialized = false;

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The instance of App for the tests.
   * @type {App}
   */
  var app;

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------
   * Public Method (getElemById)
   * ---------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @return {!HTMLElement} The DOM element with the given id.
   */
  var getElemById = aIV.utils.getElemById;

  /**
   * ---------------------------------------------------
   * Public Method (getElemByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName[ [index] ].
   * @param {string} classname - The class name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByClassRoot: [DOM Node] }).
   * @return {!HTMLElement} The selected DOM element.
   */
  var getElemByClass = aIV.utils.getElemByClass;

  /**
   * ---------------------------------------------------
   * Public Method (getElemsByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName.
   * @param {string} classname - The class name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByClassRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  var getElemsByClass = aIV.utils.getElemsByClass;

  /**
   * ---------------------------------------------------
   * Public Method (freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with a deep freeze option.
   * @param {!(Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {!(Object|function)} The frozen object.
   */
  var freezeObj = aIV.utils.freezeObj;

  /**
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!object|function} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  var hasOwnProp = aIV.utils.hasOwnProp;

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/checkType.js}.
   * @param {boolean=} noTypeValCheck - If true skips the data type string checks.
   *   The default is false. Use to avoid duplicating checks.
   * @return {boolean} The evaluation result.
   */
  var checkType = aIV.utils.checkType;

  /**
   * ---------------------------------------------------
   * Public Method (isValidTypeString)
   * ---------------------------------------------------
   * @desc Evaluates whether a string is a valid data type string.
   * @param {string} type - The string to evaluate.
   * @return {boolean} The evaluation result.
   */
  var isValidTypeString = aIV.utils.isValidTypeString;

  /**
   * ---------------------------------------------
   * Public Method (copyObj)
   * ---------------------------------------------
   * @desc A shortcut that creates a new object with the same properties and
   *   values as the given object.
   * @param {!Object} oldObj - The object to copy from.
   * @return {!Object} The new copied object.
   */
  var copyObj = (function setup_copyObj() {

    /** @type {string} */
    var errorMsg;
    /** @type {function} */
    var throwTypeError;

    errorMsg = 'An aIV.tests copyObj call received an invalid oldObj param.';
    throwTypeError = function() {
      throw new TypeError(errorMsg);
    };

    return function copyObj(oldObj) {

      /** @type {!Object} */
      var newObj;
      /** @type {string} */
      var prop;

      if ( !checkType(oldObj, '!object|function') ) {
        throwTypeError();
        oldObj = {};
      }

      newObj = {};

      for (prop in oldObj) {
        if ( hasOwnProp(oldObj, prop) ) {
          newObj[ prop ] = oldObj[ prop ];
        }
      }

      return newObj;
    };
  })();

  /**
   * ---------------------------------------------
   * Public Method (makeObj)
   * ---------------------------------------------
   * @desc A shortcut that creates a new object with the given keys and
   *   values.
   * @param {(string|!strings)} keys - The new object's keys.
   * @param {*} val - The value to set the new object's properties to.
   * @return {!Object} The new object.
   */
  var makeObj = (function setup_makeObj() {

    /** @type {string} */
    var errorMsg;
    /** @type {function} */
    var throwTypeError;

    errorMsg = 'An aIV.tests makeObj call received an invalid keys param.';
    throwTypeError = function() {
      throw new TypeError(errorMsg);
    };

    return function makeObj(keys, val) {

      /** @type {string} */
      var prop;
      /** @type {!Object} */
      var obj;
      /** @type {number} */
      var i;

      if ( checkType(keys, 'string') ) {
        keys = keys.split(' ');
      }

      obj = {};

      if ( checkType(keys, '!strings') ) {
        i = keys.length;
        while (i--) {
          prop = keys[i];
          obj[ prop ] = val;
        }
      }
      else {
        throwTypeError();
      }

      return obj;
    };
  })();

  /**
   * ---------------------------------------------
   * Public Method (concatObj)
   * ---------------------------------------------
   * @desc A shortcut that copies an object's properties and
   *   values to an existing object.
   * @param {!Object} baseObj - The object to copy to.
   * @param {!Object} addObj - The object to copy from.
   * @return {!Object} The base object.
   */
  var concatObj = (function setup_concatObj() {

    /** @type {string} */
    var errorMsg;
    /** @type {function} */
    var throwTypeError;

    errorMsg = 'An aIV.tests concatObj call received an invalid param type.';
    throwTypeError = function() {
      throw new TypeError(errorMsg);
    };

    return function concatObj(baseObj, addObj) {

      /** @type {string} */
      var prop;

      if (!checkType(baseObj, '!object|function') ||
          !checkType(addObj, '!object|function')) {
        throwTypeError();
        baseObj = {};
        addObj = {};
      }

      for (prop in addObj) {
        if (hasOwnProp(addObj, prop) && !hasOwnProp(baseObj, prop)) {
          baseObj[ prop ] = addObj[ prop ];
        }
      }

      return baseObj;
    };
  })();

/* -----------------------------------------------------------------------------
 * The App Class (classes/app.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for the app.
   * @constructor
   */
  var App = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (App.elems)
     * ---------------------------------------------------
     * @desc The elements for this app.
     * @type {Object<string, HTMLElement>}
     */
    this.elems = new Elems();

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.runTests)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function}
   */
  App.prototype.runTests = function() {

    this.elems.ui.style.opacity = '0';

    setTimeout(function() {

      // Remove the body's current elements
      while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
      }

      Tests.runApp();
    }, 500);
  };

/* -----------------------------------------------------------------------------
 * The MockAjax Class (classes/mock-ajax.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (MockAjax)
   * -----------------------------------------------------
   * @desc Mocks the XMLHttpRequest class for testing.
   * @param {Array<ajaxResults>=} results - .
   * @param {ajaxResults=} defaults - .
   * @constructor
   */
  var MockAjax = (function setup_MockAjax(/** function */ orgXMLHttpRequest) {

    /**
     * -----------------------------------------------------
     * Mock Results AJAX Object Definition
     * -----------------------------------------------------
     * @desc This typedef defines the results object for each new XMLHttpRequest
     *   call. Note that timeTillDone is the number of milliseconds to wait
     *   until calling the onreadystatechange function. The remaining properties
     *   are the read only properties defined by the native XMLHttpRequest
     *   object. For details on each of XMLHttpRequest's read only properties
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest}.
     *   For a list of the valid values for the status property
     *   [see MSDN]{@link https://msdn.microsoft.com/en-us/library/ms767625%28v=vs.85%29.aspx#sectionToggle2}.
     * @typedef {{
     *   timeTillDone: (number|undefined),
     *   readyState  : (number|undefined),
     *   response    : ?(ArrayBuffer|Blob|Document|Object|string|undefined),
     *   responseText: ?(string|undefined),
     *   responseXML : ?(Document|undefined),
     *   status      : (number|undefined),
     *   statusText  : (string|undefined)
     * }} ajaxResults
     */

    /**
     * -----------------------------------------------------
     * Default Mock Results AJAX Object Definition
     * -----------------------------------------------------
     * @desc The same as the defined ajaxResults object except undefined
     *   values are not allowed.
     * @typedef {!{
     *   timeTillDone: number,
     *   readyState  : number,
     *   response    : ?(ArrayBuffer|Blob|Document|Object|string),
     *   responseText: ?string,
     *   responseXML : ?Document,
     *   status      : number,
     *   statusText  : string
     * }} defaultAjaxResults
     */

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private MockAjax Variables
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Private Variable (DEFAULT_RESULTS)
     * -----------------------------------------------
     * @desc The default values for a mock XMLHttpRequest call.
     * @type {defaultAjaxResults}
     * @const
     */
    var DEFAULT_RESULTS = {
      timeTillDone: 500,
      readyState  : 4,
      response    : null,
      responseText: null,
      responseXML : null,
      status      : 404,
      statusText  : '404 Not Found'
    };

    freezeObj(DEFAULT_RESULTS);

    /**
     * ----------------------------------------------- 
     * Private Variable (RESULTS_TYPES)
     * -----------------------------------------------
     * @desc The acceptable types for each results object property.
     * @type {!Object<string, string>}
     * @const
     */
    var RESULTS_TYPES = {
      timeTillDone: 'number',
      readyState  : 'number',
      response    : '?object|string|document',
      responseText: '?string',
      responseXML : '?document',
      status      : 'number',
      statusText  : 'string'
    };

    freezeObj(RESULTS_TYPES);

    /**
     * ----------------------------------------------- 
     * Private Variable (RESULTS_VALUES)
     * -----------------------------------------------
     * @desc The acceptable values for each results object property.
     * @type {!Object<string, !Object<string, boolean>>}
     * @const
     */
    var RESULTS_VALUES = {
      readyState  : makeObj('0 1 2 3 4', true),
      status      : makeObj('100 101 200 201 202 203 204 205 206 300 ' +
                    '301 302 303 304 305 307 400 401 402 403 404 405 ' +
                    '406 407 408 409 410 411 412 413 414 415 416 417 ' +
                    '500 501 502 503 504 505', true)
    };

    freezeObj(RESULTS_VALUES, true);

    /**
     * ----------------------------------------------- 
     * Private Variable (defaultResults)
     * -----------------------------------------------
     * @desc The default values for a mock XMLHttpRequest call.
     * @type {defaultAjaxResults}
     */
    var defaultResults = copyObj(DEFAULT_RESULTS);

    /**
     * ----------------------------------------------- 
     * Private Variable (counter)
     * -----------------------------------------------
     * @desc Maintains a count of the number of times a new MockAjax instance
     *   is created.
     * @type {number}
     */
    var counter = 0;

    /**
     * ----------------------------------------------- 
     * Private Variable (results)
     * -----------------------------------------------
     * @desc An array of the results for each AJAX request made during this mock
     *   instance's lifetime. If the array is null then all AJAX requests will
     *   use the default results. Otherwise each property of the array will be
     *   used for each AJAX call in order. If a property of the array is null
     *   then the default results will be used.
     * @type {Array<ajaxResults>}
     */
    var results = null;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private XMLHttpRequest Helpers
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Private Variable (openMethods)
     * -----------------------------------------------
     * @desc The available options for XMLHttpRequest.open's method parameter.
     * @type {!Object<string, boolean>} */
    var openMethods = makeObj('GET HEAD POST PUT DELETE TRACE CONNECT', true);

    /**
     * ----------------------------------------------- 
     * Private Variable (throwOpenTypeError)
     * -----------------------------------------------
     * @desc A helper that throws a TypeError for invalid XMLHttpRequest.open
     *   parameters.
     * @type {function} */
    var throwOpenTypeError = (function() {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'An XMLHttpRequest.open call received an invalid param type.';

      return function throwOpenTypeError() {
        throw new TypeError(errorMsg);
      };
    })();

    /**
     * ----------------------------------------------- 
     * Private Variable (throwOpenMethodError)
     * -----------------------------------------------
     * @desc A helper that throws an Error for invalid XMLHttpRequest.open
     *   method parameters.
     * @type {function} */
    var throwOpenMethodError = (function() {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'An XMLHttpRequest.open call received an invalid method ';
      errorMsg += 'param value.';

      return function throwOpenMethodError() {
        throw new Error(errorMsg);
      };
    })();

    /**
     * ----------------------------------------------- 
     * Private Variable (throwOnChangeError)
     * -----------------------------------------------
     * @desc A helper that throws an Error for an invalid
     *   XMLHttpRequest.onreadystatechange property.
     * @type {function} */
    var throwOnChangeError = (function() {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'The XMLHttpRequest.onreadystatechange property was not a ';
      errorMsg += 'valid function when an XMLHttpRequest.send call was made.';

      return function throwOnChangeError() {
        throw new Error(errorMsg);
      };
    })();

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The MockAjax Constructor
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------------
     * Public Class (MockAjax)
     * -----------------------------------------------------
     * @desc Mocks the XMLHttpRequest class for testing.
     * @param {Array<ajaxResults>=} newResults - An array of the results for
     *   each AJAX request made during this mock instance's lifetime. If the
     *   array is null then all AJAX requests will use the default results.
     *   Otherwise each property of the array will be used for each AJAX call
     *   in order. If a property of the array is null then the defaults will
     *   be used.
     * @param {ajaxResults=} newDefaults - Allows you to modify the default
     *   results values used.
     * @constructor
     */
    var MockAjax = function(newResults, newDefaults) {

      /** @type {string} */
      var errorMsg;

      if (this.constructor !== MockAjax) {
        errorMsg = 'An aIV.tests MockAjax call was made without the new keyword.';
        throw new Error(errorMsg);
      }

      if (!checkType(newResults, 'objects=') || !checkType(newDefaults, 'object=')) {
        errorMsg = 'An aIV.tests MockAjax call received an invalid param type.';
        throw new TypeError(errorMsg);
      }

      //////////////////////////////////////////////////////////////////////////
      // Update The Results
      //////////////////////////////////////////////////////////////////////////

      results = newResults;

      //////////////////////////////////////////////////////////////////////////
      // Update The Default Values For Mock XMLHttpRequest Results
      //////////////////////////////////////////////////////////////////////////

      /** @type {string} */
      var propName;
      /** @type {*} */
      var propVal;

      if (newDefaults) {
        for (propName in newDefaults) {
          if (hasOwnProp(newDefaults, propName) &&
              hasOwnProp(defaultResults, propName)) {
            propVal = newDefaults[ propName ];
            if ( checkType(propVal, RESULTS_TYPES[ propName ]) ) {
              if ( hasOwnProp(RESULTS_VALUES, propName) ) {
                if ( RESULTS_VALUES[ propName ].hasOwnProperty(propVal) ) {
                  defaultResults[ propName ] = propVal;
                }
              }
              else {
                defaultResults[ propName ] = propVal;
              }
            }
          }
        }
      }

      //////////////////////////////////////////////////////////////////////////
      // Setup The XMLHttpRequest Constructor
      //////////////////////////////////////////////////////////////////////////

      /**
       * -----------------------------------------------
       * Global Class (XMLHttpRequest)
       * -----------------------------------------------
       * @desc Mocks the global XMLHttpRequest class for testing.
       * @constructor
       */
      XMLHttpRequest = function() {

        /** @type {string} */
        var errorMsg;
        /** @type {string} */
        var propName;
        /** @type {*} */
        var propVal;

        if (this.constructor !== XMLHttpRequest) {
          errorMsg = 'An aIV.tests XMLHttpRequest call was made without the ';
          errorMsg += 'new keyword.';
          throw new Error(errorMsg);
        }

        // Add the default properties to this object
        concatObj(this, defaultResults);

        // Add any specified values for this AJAX call
        if (checkType(results, '!object') &&
            checkType(results[ counter ], '!object')) {
          for (propName in results[ counter ]) {
            if ( hasOwnProp(defaultResults, propName) ) {
              propVal = results[ counter ][ propName ];
              if ( checkType(propVal, RESULTS_TYPES[ propName ]) ) {
                if ( hasOwnProp(RESULTS_VALUES, propName) ) {
                  if ( RESULTS_VALUES[ propName ].hasOwnProperty(propVal) ) {
                    this[ propName ] = propVal;
                  }
                }
                else {
                  this[ propName ] = propVal;
                }
              }
            }
          }
        }

        this.onreadystatechange = function(){};

        ++counter;
      };

      //////////////////////////////////////////////////////////////////////////
      // Setup The XMLHttpRequest Prototype
      //////////////////////////////////////////////////////////////////////////

      XMLHttpRequest.prototype.constructor = XMLHttpRequest;

      /**
       * ------------------------------------------------------------
       * Public Method (XMLHttpRequest.prototype.open)
       * ------------------------------------------------------------
       * @param {string} method
       * @param {string} url
       * @param {boolean=} async
       * @param {string=} user
       * @param {string=} password
       */
      XMLHttpRequest.prototype.open = function(method, url, async,
                                               user, password) {
        if (!checkType(method, 'string') ||
            !checkType(url, 'string') ||
            !checkType(async, 'boolean=') ||
            !checkType(user, 'string=') ||
            !checkType(password, 'string=')) {
          throwOpenTypeError();
        }

        if ( !hasOwnProp(openMethods, method) ) {
          throwOpenMethodError();
        }
      };

      /**
       * ------------------------------------------------------------
       * Public Method (XMLHttpRequest.prototype.send)
       * ------------------------------------------------------------
       * @type {function}
       */
      XMLHttpRequest.prototype.send = function() {

        /** @type {number} */
        var ms;
        /** @type {function} */
        var onreadystatechange;

        ms = this.timeTillDone;
        onreadystatechange = this.onreadystatechange;

        if ( checkType(onreadystatechange, 'function') ) {
          setTimeout(function() {
            onreadystatechange();
          }, ms);
        }
        else {
          throwOnChangeError();
        }
      };

      //////////////////////////////////////////////////////////////////////////
      // End Of The MockAjax Constructor & XMLHttpRequest Prototype Setup
      //////////////////////////////////////////////////////////////////////////

      freezeObj(this, true);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The MockAjax Prototype
    ////////////////////////////////////////////////////////////////////////////

    MockAjax.prototype.constructor = MockAjax;

    /**
     * ----------------------------------------------- 
     * Public Method (MockAjax.prototype.reset)
     * -----------------------------------------------
     * @desc Resets the global XMLHttpRequest constructor to its original
     *   native constructor and resets the private MockAjax variables.
     * @type {function}
     */
    MockAjax.prototype.reset = function() {
      XMLHttpRequest = orgXMLHttpRequest;
      defaultResults = copyObj(DEFAULT_RESULTS);
      counter = 0;
      results = null;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The MockAjax Prototype Setup
    ////////////////////////////////////////////////////////////////////////////

    return MockAjax;

  })(XMLHttpRequest);

/* -----------------------------------------------------------------------------
 * The Elems Class (classes/elems.js)
 * -------------------------------------------------------------------------- */

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

/* -----------------------------------------------------------------------------
 * The Tests Class (classes/tests.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @struct
   */
  var Tests = {};

  /**
   * -----------------------------------------------------
   * Public Method (Tests.runApp)
   * -----------------------------------------------------
   * @desc Runs the question manager app with test data.
   * @type {function}
   */
  Tests.runApp = (function() {

    // These calls run immediately to ensure that desired
    // settings are set before the app is processed

    aIV.debug.set({
      addBreakpoints: 'args fail',
      turnOnGroups  : true,
      turnOnProfiles: false,
      turnOnTimers  : true
    });

    aIV.debug({
      classTitle    : 'prettify',
      turnOffMethods: 'all',
      turnOnGroups  : false,
      turnOnTimers  : false
    });

    aIV.debug({
      classTitle    : 'highlightSyntax',
      turnOffMethods: 'all',
      turnOnGroups  : false,
      turnOnTimers  : false
    });

    // END of immediate calls

    return function runApp() {

      /** @type {!MockAjax} */
      var mockAjax;
      /** @type {!ajaxResults} */
      var ajaxResults;

      ajaxResults = {
        responseText: TestData.exampleResource,
        status      : 200,
        statusText  : '200 OK'
      };
      mockAjax = new MockAjax([ ajaxResults ]);
      aIV.app(TestData.example);
      mockAjax.reset();
    };
  })();

  freezeObj(Tests, true);

/* -----------------------------------------------------------------------------
 * The Test Data Class (classes/test-data.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------
   * Public Class (TestData)
   * -----------------------------------------------
   * @desc Contains the test data for different tests.
   * @type {!Object<string, *>}
   */
  var TestData = {};
  
  /**
   * -----------------------------------------------
   * Public Property (TestData.example)
   * -----------------------------------------------
   * @desc Contains the example data.
   * @type {!Object}
   */
  TestData.example = (function() {

  /**
   * -----------------------------------------------
   * The Settings Object
   * -----------------------------------------------
   * @desc Contains all of the settings for running this example
   *   of Algorithm IV's question manager. For more details see
   *   [Algorithm IV's online documentation]{@link algorithmiv.com/docs/start}.
   * @type {Object}
   */
  var settings = {};


/* -----------------------------------------------------------------------------
 * | The Configuration                                                         |
 * v ------------------------------------------------------------------------- v
                             example/pre-compiled-settings/configuration.js */
  /**
   * -----------------------------------------------
   * The Configuration
   * -----------------------------------------------
   * @desc An object property of settings that allows you to run
   *   the question manager like you want. For more details see the
   *   [online documentation for configuration]{@link algorithmiv.com/docs/configuration}.
   * @type {{
   *   searchSettings: Object,
   *   searchDefaults: Object,
   *   questionFormat: Object,
   *   prettifyFormat: Object,
   *   showLinks     : Object
   * }}
   */
  settings.config = {};

  /**
   * -----------------------------------------------
   * The Search Settings
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to enable or
   *   disable different search options in the app. For more details see the
   *   [online documentation for search settings]{@link algorithmiv.com/docs/configuration/search-settings}.
   * @type {{
   *   stage   : boolean,
   *   source  : boolean,
   *   category: boolean,
   *   subCat  : boolean
   * }}
   */
  settings.config.searchSettings = {
    stage   : true,
    source  : true,
    category: true,
    subCat  : true
  };

  /**
   * -----------------------------------------------
   * The Search Defaults
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to set the
   *   default search values for a new app init. For more details see the
   *   [online documentation for search defaults]{@link algorithmiv.com/docs/configuration/search-defaults}.
   * @type {{
   *   view   : string,
   *   order  : string,
   *   stage  : string,
   *   source : string,
   *   mainCat: string,
   *   subCat : string,
   *   startID: number
   * }}
   */
  settings.config.searchDefaults = {
    view   : 'one',
    order  : 'asc',
    stage  : 'all',
    source : 'all',
    mainCat: 'all',
    subCat : 'all',
    startID: 0
  };

  /**
   * -----------------------------------------------
   * The Question Format
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to enable or
   *   disable different parts of a question's display. For more details see the
   *   [online documentation for question format]{@link algorithmiv.com/docs/configuration/question-format}.
   * @type {{
   *   id      : boolean,
   *   complete: boolean,
   *   source  : boolean,
   *   category: boolean,
   *   subCat  : boolean,
   *   links   : boolean,
   *   problem : boolean,
   *   descr   : boolean,
   *   output  : boolean
   * }}
   */
  settings.config.questionFormat = {
    id      : true,
    complete: true,
    source  : true,
    category: true,
    subCat  : true,
    links   : true,
    problem : true,
    descr   : false,
    output  : true
  };

  /**
   * -----------------------------------------------
   * The Prettify Format
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to configure
   *   the built-in prettifier to your liking. For more details see the
   *   [online documentation for prettify format]{@link algorithmiv.com/docs/configuration/prettify-format}.
   * @type {{
   *   trimSpace   : number,
   *   tabLength   : number,
   *   commentLinks: boolean
   * }}
   */
  settings.config.prettifyFormat = {
    trimSpace   : 4,
    tabLength   : 2,
    commentLinks: true
  };

  /**
   * -----------------------------------------------
   * The Show Links
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to enable or
   *   disable whether question parts have shortcut links. For more details see the
   *   [online documentation for show links]{@link algorithmiv.com/docs/configuration/show-links}.
   * @type {{
   *   id      : boolean,
   *   source  : boolean,
   *   category: boolean
   * }}
   */
  settings.config.showLinks = {
    id      : true,
    source  : true,
    category: true
  };


/* -----------------------------------------------------------------------------
 * | The Sources                                                               |
 * v ------------------------------------------------------------------------- v
                                                                            */
  /**
   * -----------------------------------------------
   * The Sources
   * -----------------------------------------------
   * @desc An object property of settings that contains all of the
   *   question manager's source ids and names. For more details see the
   *   [online documentation for sources]{@link algorithmiv.com/docs/sources}.
   * @type {Object<string, string>}
   */
  settings.sources = {
    'am': 'Amazon',
    'bl': 'Bloomberg',
    'fb': 'Facebook',
    'go': 'Google'
  };


/* -----------------------------------------------------------------------------
 * | The Categories                                                            |
 * v ------------------------------------------------------------------------- v
                                                                            */
  /**
   * -----------------------------------------------
   * The Categories
   * -----------------------------------------------
   * @desc An object property of settings that contains all of the
   *   question manager's category ids and names. For more details see the
   *   [online documentation for categories]{@link algorithmiv.com/docs/categories}.
   * @type {(Object<string, string>|{
   *   main: Object<string, string>,
   *   sub : Object<string, Object<string, string>>
   * })}
   */
  settings.categories = {};

  /**
   * -----------------------------------------------
   * The Main Categories
   * -----------------------------------------------
   * @desc An object property of categories that contains all of the
   *   question manager's main category ids and names. For more details see the
   *   [online documentation for categories]{@link algorithmiv.com/docs/categories}.
   * @type {Object<string, string>}
   */
  settings.categories.main = {
    'array' : 'Arrays',
    'graph' : 'Graphs',
    'hash'  : 'Hashes',
    'list'  : 'Linked Lists',
    'search': 'Searching Algorithms',
    'sort'  : 'Sorting Algorithms',
    'tree'  : 'Trees'
  };

  /**
   * -----------------------------------------------
   * The Sub Categories
   * -----------------------------------------------
   * @desc An object property of categories that contains all of the
   *   question manager's sub category ids and names. For more details see the
   *   [online documentation for categories]{@link algorithmiv.com/docs/categories}.
   * @type {Object<string, Object<string, string>>}
   */
  settings.categories.sub = {
    'graph': {
      'adjList': 'Adjacency Lists',
      'adjMtrx': 'Adjacency Matrices',
      'arb'    : 'Arborescences',
      'digraph': 'Directed Graphs',
      'incList': 'Incidence Lists',
      'incMtrx': 'Incidence Matrices',
      'ungraph': 'Undirected Graphs'
    },
    'hash': {
      'dblHash': 'Double Hashing',
      'fnv'    : 'FNV Hash Algorithms',
      'hTable' : 'Hash Tables'
    },
    'list': {
      'sList': 'Singly-Linked Lists',
      'dList': 'Doubly-Linked Lists'
    },
    'search': {
      'back'   : 'Backtracking',
      'binSrch': 'Binary Search',
      'bfs'    : 'Breadth First Search',
      'brute'  : 'Brute Force Search',
      'dfs'    : 'Depth First Search',
      'dynam'  : 'Dynamic Programming'
    },
    'sort': {
      'bucket': 'Bucket Sort',
      'heapS' : 'Heapsort',
      'insert': 'Insertion Sort',
      'intro' : 'Introsort',
      'merge' : 'Mergesort',
      'quick' : 'Quicksort',
      'radix' : 'Radix Sort',
      'select': 'Select Sort',
      'smooth': 'Smoothsort'
    },
    'tree': {
      'binHeap': 'Binary Heaps',
      'binTree': 'Binary Trees',
      'bst'    : 'Binary Search Trees',
      'bnmHeap': 'Binomial Heaps',
      'fibHeap': 'Fibonacci Heaps',
      'red'    : 'Red-Black Trees',
      'splay'  : 'Splay Trees',
      'trie'   : 'Tries'
    }
  };


/* -----------------------------------------------------------------------------
 * | The Resources                                                             |
 * v ------------------------------------------------------------------------- v
                                 example/pre-compiled-settings/resources.js */
  /**
   * -----------------------------------------------
   * The Resources
   * -----------------------------------------------
   * @desc An object property of settings that contains all of the JSON
   *   resources that are made available for use in the questions via the
   *   public method aIV.app.getResource(resourceName). For more details see the
   *   [online documentation for resources]{@link algorithmiv.com/docs/resources}.
   * @type {(string|Array<string>)}
   */
  settings.resources = 'words';


/* -----------------------------------------------------------------------------
 * | The Questions                                                             |
 * v ------------------------------------------------------------------------- v
                                                                            */
  /**
   * -----------------------------------------------
   * The Questions
   * -----------------------------------------------
   * @desc An array property of settings that allows you to add your
   *   questions to the app. Each example question is taken from
   *   Algorithm IV's library of questions and solutions. For more
   *   details on questions and how to use them see the
   *   [online documentation for questions]{@link algorithmiv.com/docs/questions}.
   *   For more details on the library of questions see the
   *   [library's repo on GitHub]{@link github.com/imaginate/algorithmIV-answers-in-javascript}.
   * @type {Array<Object>}
   */
  settings.questions = new Array(10);

  /**
   * -----------------------------------------------
   * The Question Object
   * -----------------------------------------------
   * @desc The properties for a question object. For more details see the
   *   [online documentation for questions]{@link algorithmiv.com/docs/questions}.
   * @typedef {{
   *   url     : string,
   *   complete: boolean,
   *   source  : string,
   *   mainCat : Array<string>,
   *   subCat  : Array<string>,
   *   links   : Array<{ name: string, href: string }>,
   *   problem : string,
   *   descr   : string,
   *   solution: function
   * }} Question
   */

  /**
   * -----------------------------------------------
   * Question 1
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[0] = {
    complete: true,
    source  : 'fb',
    mainCat : [ 'search', 'tree', 'list', 'array' ],
    subCat  : [ 'bfs', 'binTree', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution1
  };

  settings.questions[0].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=4505011482525696'
  };

  settings.questions[0].problem = '' +
  'Given an array of values, create a balanced binary tree and print each ' +
  'row of the tree in order. Terminate each row with a carriage return.';

  function solution1() {
    /*
     ** Solution:
     *  - Step 1: A Breadth First Search algorithm is used
     *    to create a balanced binary tree. A linked list
     *    of nodes containing their value and references
     *    to their left and right children is used to
     *    represent the binary tree.
     *  - Step 2: A Breadth First Search algorithm is used
     *    to traverse the tree and add the nodes in order
     *    by row to the result.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Breadth First Search (BFS)](http://en.wikipedia.org/wiki/Breadth-first_search)
     *  - Data Structures:
     *    -- [Binary Tree](http://en.wikipedia.org/wiki/Binary_tree)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The given values
    // The binary tree
    // The node rows to be printed
    var vals, tree, result;

    // Set variables
    vals = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O' ];
    tree = {
      val  : vals[0],
      left : null,
      right: null
    };
    result = '';

    // Creates the binary tree
    function createTree() {
      // A function that adds children to a node
      // The temporary holder for each row of nodes
      // The index of the current value
      // The current tree's depth
      // The tree's max depth
      // The current node
      var addNodes, row, val, d, depth, node;

      // Adds children to the provided node
      // param: The node to add the children
      addNodes = function(prtNode) {

        // Create the nodes and increase the value
        prtNode.left = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;
        prtNode.right = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;

        // Add the nodes to temp holder
        row.next.push(prtNode.left, prtNode.right);
      };

      // Set the temp holders, value, and max depth
      row = {
        now : [tree],
        next: []
      };
      val = 1;
      depth = 4;

      // Add the nodes to tree
      d = 0;
      while (++d < depth) {
        // Add nodes
        row.now.forEach(function(node) {
          addNodes(node);
        });
        // Reset temp arrays
        row.now = row.next.slice(0);
        row.next = [];
      }
    }

    // Saves a string of the binary tree's nodes
    //   in order with a line break for each row
    function printNodes() {
      // The current and next row of nodes
      // The current node being searched
      // The left child
      // The right child
      var row, node, left, right;

      // Set final result
      result = tree.val;

      // Set temp holder for each row
      row = {
          now   : [tree],
          next  : [],
          string: ''
        };

      // Loop through nodes
      loop:
      while (true) {

        // Set and remove node
        node = row.now.shift();

        // If (child exists)
        // Then {add child to next row and result}
        if (!!node.left) {
          row.next.push(node.left);
          row.string += (row.next.length > 1) ? ',' : '';
          row.string += node.left.val;
        }
        if (!!node.right) {
          row.next.push(node.right);
          row.string += (row.next.length > 1) ? ',' : '';
          row.string += node.right.val;
        }

        // If (current row finished)
        // Then {check, update, and reset rows}
        // Else {end search}
        if (row.now.length === 0) {
          if (row.next.length > 0) {
            result += '<br />' + row.string;
            row.now = row.next.slice(0);
            row.next = [];
            row.string = '';
          }
          else {
            break loop;
          }
        }
      }
    }

    // Create tree and print nodes
    createTree();
    printNodes();
    return result;
  }

  /**
   * -----------------------------------------------
   * Question 2
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[1] = {
    complete: true,
    source  : 'am',
    mainCat : [ 'search', 'graph', 'list', 'array' ],
    subCat  : [ 'back', 'dynam', 'dfs', 'digraph', 'incList', 'sList', 'dList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution2
  };

  settings.questions[1].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6031402409656320'
  };

  settings.questions[1].problem = '' +
  'Imagine a large city like Los Angeles. Suppose someone shows up at ' +
  'location A, then N minutes later at location B. Design a function '  +
  'that approximates the probability they passed a Starbucks.';

  function solution2() {
    /*
     ** Solution:
     *  - Step 1: A time weighted digraph of locations
     *    and a boolean value for whether a Starbucks is
     *    passed for each edge is created. An array of
     *    vertex nodes (storing its value and a reference
     *    to each of its edges) and edge nodes (storing
     *    its weight, Starbuck's value, and a reference
     *    to each of its connecting nodes) is used to
     *    implement the digraph.
     *  - Step 2: A recursive dynamic backtracking DFS
     *    algorithm is applied to traverse the digraph
     *    and find all of the paths possible to the
     *    destination within the provided maximum time
     *    frame and whether a Starbucks was passed on
     *    each path.
     *  - Step 3: The probability of passing a Starbucks
     *    is calculated.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Backtracking](http://en.wikipedia.org/wiki/Backtracking)
     *    -- [Dynamic Programming](http://en.wikipedia.org/wiki/Dynamic_programming)
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- [Directed Graph (Digraph)](http://en.wikipedia.org/wiki/Directed_graph)
     *    -- [Weighted Graph](http://en.wikipedia.org/wiki/Glossary_of_graph_theory#Weighted_graphs_and_networks)
     *    -- [Incidence List](http://www.algorithmist.com/index.php/Graph_data_structures#Incidence_List)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Doubly-Linked List](http://en.wikipedia.org/wiki/Doubly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The time weighted digraph
    // The starting vertex (starting location)
    // The final vertex (final destination)
    // The maximum weight of a path (minutes of time)
    // The final paths
    // The probability of passing a Starbucks
    // The visually prepared final results
    var graph, start, end, max, paths, prob, results;

    // Set variables
    graph = {
      verti: new Array(10),
      edges: new Array(16)
    };
    start =  0;
    end   =  9;
    max   = 50;
    paths = {
      list  : [],
      starbk: 0
    };
    prob  = 0;
    results = {
      count: {
        all   : '',
        starbk: ''
      },
      prob : '',
      paths: {
        all   : '',
        starbk: ''
      }
    };

    // Creates the weighted digraph
    function createGraph() {
      // The vertex index
      // The edge index
      // The edge's parent vertex
      // The edge's child vertex
      // The edge's weight
      // The edge's Starbuck's value
      var v, e, prt, child, weight, starbk;
      // The parent index
      // The child index
      // A function that adds edge
      //   pointers to vertices
      var p, c, addPointer;
      
      // Adds a vertex's edge references
      // param: The vertex's index
      // param: An array of edge indexes
      addPointer = function(vertex, edges) {
        // The number of edges
        // The loop index
        // The edge node
        var len, i, node;
        
        // Save edges count
        len = edges.length;
        // Add each edge
        i = -1;
        while (++i < len) {
          node = graph.edges[ edges[i] ];
          graph.verti[vertex].edges.push(node);
        }
      };

      // Add vertices to graph
      v = 10;
      while (v--) {
        graph.verti[v] = { val: v, edges: [] };
      }

      // Add edges to graph
      e = -1;
      while (++e < 16) {

        // Set weight and starbucks
        weight = 5;
        starbk = (e === 5);
        // Set parent and child
        switch (true) {
           case (e < 3):
             p = 0;
             c = (e === 0) ? 1 : ++c;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 5):
             p = 1;
             c = e;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 7):
             p = 2;
             c = e;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e === 7):
             p = 3;
             c = 6;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e === 8):
             p = 4;
             c = 6;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 12):
             p = 5;
             c = ++c;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 14):
             p = 6;
             c = (e === 12) ? 7 : 9;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e === 14):
             p = 7;
             c = 8;
             prt = graph.verti[p];
            child = graph.verti[c];
          break;
          case (e === 15):
            p = 8;
            c = 9;
            prt = graph.verti[p];
            child = graph.verti[c];
          break;
        }
        // Add edge
        graph.edges[e] = {
          prt   : prt,
          child : child,
          weight: weight,
          starbk: starbk
        };
      }

      // Add edge pointers to vertices
      addPointer(0, [ 0,1,2 ]);
      addPointer(1, [ 3,4 ]);
      addPointer(2, [ 5,6 ]);
      addPointer(3, [ 7 ]);
      addPointer(4, [ 8 ]);
      addPointer(5, [ 9,10,11 ]);
      addPointer(6, [ 12,13 ]);
      addPointer(7, [ 14 ]);
      addPointer(8, [ 15 ]);
    }

    // Finds all of the paths possible
    //   within the max time
    function findPaths() {
      // The path being currently reviewed
      // A function that is called recursively
      //   to find each path
      var path, buildPaths;

      // Set the recursive DFS
      // param: The current node
      // param: The current cumulative weight
      // param: Whether a starbucks currently exists
      buildPaths = function(node, weight, starbk) {
        // The string for the current path
        // The count of the node's edges
        // The edges index
        // The current edge's node
        // The new total path weight
        // The new starbucks value
        var edges, e, edge, newWeight, newStarbk;

        // If (weight is greater than max weight)
        // Then {end this path traversal}
        if (weight > max) {
          return;
        }

        // If (node is destination)
        // Then {add path to results and end traversal}
        if (node.val === end) {

          // Save string of path
          path.string = '[ ' +
            path.values.join(',') + ',' + end +
          ' ]';

          // Add path to final list of paths
          paths.list.push({
            val   : path.string,
            starbk: starbk
          });
          // Adjust count of Starbucks paths
          paths.starbk += (starbk) ? 1 : 0;

          // End this path traversal
          return;
        }

        // Add node to current path
        path.nodes.push(node);
        path.values.push(node.val);

        // Save the node's count of edges
        edges = node.edges.length;
        // Traverse each path rooting with each edge
        e = -1;
        while (++e < edges) {
          // Save reference of edge's object
          edge = node.edges[e];
          // Set new weight total
          newWeight = weight + edge.weight;
          // Set new value for starbucks
          newStarbk = (starbk || edge.starbk);
          // Continue search
          buildPaths(edge.child, newWeight, newStarbk);
        }

        // Remove current node from path
        path.nodes.pop();
        path.values.pop();
      };

      // Set path to empty
      path = {
        nodes : [],
        values: [],
        string: ''
      };

      // Find the paths
      buildPaths(graph.verti[start], 0, false);
    }

    // Calculates the probability of passing a Starbucks
    function calcProbability() {
      // Divide the number of paths with starbucks
      //   by the number of all paths and round up
      //   to the nearest whole percent
      prob = (paths.starbk / paths.list.length) * 100;
      prob = Math.ceil(prob);
    }

    // Prepares an output for visual appeal
    function prepareResults() {
      // The count of paths
      // The first Starbucks path flag
      // The loop index
      var len, flag, i;

      // Save count of paths
      len = paths.list.length;
          
      // Set count results
      results.count.all = 'Count of All Paths: ' + len + '<br />';
      results.count.starbk = 'Count of All Paths with Starbucks: ';
      results.count.starbk += paths.starbk + '<br />';

      // Set probability result
      results.prob = 'Probability of Passing Starbucks: ' + prob + '%<br />';

      // Set path result headers
      results.paths.all = 'List of All Paths:';
      results.paths.starbk = 'List of All Paths with Starbucks:';
      // Set path result containers
      results.paths.all += '<span style="display:block;margin-left:30px">';
      results.paths.starbk += '<span style="display:block;margin-left:30px">';
      // Set first Starbucks flag
      flag = true;
      // Set path results
      i = -1;
      while (++i < len) {
        results.paths.all += (i > 0) ? '<br />' : '';
        results.paths.all += paths.list[i].val;
        if (paths.list[i].starbk) {
          // If (first path with Starbucks)
          // Then {change flag}
          // Else {add line break}
          if (flag) {
            flag = false;
          }
          else {
            results.paths.starbk += '<br />';
          }
          results.paths.starbk += paths.list[i].val;
        }
      }
      // Close path result containers
      results.paths.all += '</span>';
      results.paths.starbk += '</span>';
    }

    // Create digraph, find paths,
    //   calculate probability, and
    //   return the prepared results
    createGraph();
    findPaths();
    calcProbability();
    prepareResults();
    return results.count.all + results.count.starbk +
    results.prob + results.paths.all + results.paths.starbk;
  }

  /**
   * -----------------------------------------------
   * Question 3
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[2] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'hash', 'search' ],
    subCat  : [ 'hTable', 'dblHash', 'fnv', 'brute' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution3
  };

  settings.questions[2].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5724911848914944'
  };

  settings.questions[2].problem = '' +
  'Given a table of [Url =&gt; Content] pairs produce a new table of ' +
  '[Url =&gt; Duplicate Urls] pairs.<br /><br />' +
  'Example Input:<br />' +
  'a.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br />' +
  'b.com =&gt; &lt;html&gt;beta&lt;/html&gt;<br />' +
  'c.com =&gt; &lt;html&gt;gamma&lt;/html&gt;<br />' +
  'd.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br />' +
  'e.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br /><br />' +
  'Example Output:<br />' +
  'a.com =&gt; [ d.com, e.com ]<br />' +
  'b.com =&gt; []<br />' +
  'c.com =&gt; []';

  function solution3() {
    /*
     ** Solution:
     *  - Step 1: A hash table using the original
     *    urls as the keys and their page's content
     *    as the values is created.
     *  - Step 2: A hash table using a 32 bit hash
     *    of the page's content for each key and the
     *    content itself as the value is created. A
     *    modified FNV-1a hash algorithm is used to
     *    hash the content. After each new hash
     *    creation the original hash table is
     *    modified (i.e. the content is replaced
     *    with its hash).
     *  - Step 3: An optimized brute force algorithm
     *    is applied to visit each url and identify
     *    any urls with the duplicate content until
     *    all urls have been marked as unique or
     *    duplicated.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [FNV Hash Algorithm](http://www.isthe.com/chongo/tech/comp/fnv/)
     *    -- [Double Hashing](http://en.wikipedia.org/wiki/Double_hashing)
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *  - Data Structures:
     *    -- [Hash Table](http://en.wikipedia.org/wiki/Hash_table)
     */
        
    // The supplied urls and their page's content
    // The hash table of all page's content
    // The list of urls and their duplicated content
    // The visually prepared duplicate results
    var inputs, hashes, duplicates, results;

    // Set variables
    inputs = {
      // 'url': 'content'
      /// CONVERTED TO
      // 'url': 'hashOfContent'
    };
    hashes = {
      // 'hashOfContent': {
      //   collisions: number,
      //   content   : 'content'
      // }
    };
    duplicates = {
      // 'url': [ 'duplicateUrl', ...]
    };
    results = [];

    // Adds the original list of urls
    function setupInputs() {
      // Add urls to inputs
      inputs['a.com'] = '<html>alpha</html>';
      inputs['b.com'] = '<html>beta</html>';
      inputs['c.com'] = '<html>gamma</html>';
      inputs['d.com'] = '<html>alpha</html>';
      inputs['e.com'] = '<html>alpha</html>';
    }

    // Hashes a string with the FNV-1a hash algorithm
    // param: The string to be hashed
    // param: A previous hash that collided (optional)
    // param: Extra iterations to resolve a collision (optional)
    function createHash(string, hash, extras) {
      // The FNV offset basis for the hash
      // The loop length (extras or string length)
      // The loop index
      var offset, len, i;

      // Set offset to the 32 bit FNV offset_value
      offset = 0x811c9dc5;
      hash = hash || offset;

      // Set loop length
      len = (!extras) ? string.length : extras;
      // Complete fnv hashing (xor and prime multiplication)
      i = -1;
      while (++i < len) {
        hash ^= string.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) +
        (hash << 7) + (hash << 8) + (hash << 24);
      }

      // Zero-fill shift hash
      hash = hash >>> 0;

      return hash;
    }

    // Creates a hash table for the url page's content
    function createHashTable() {
      // Function that adds hash to table
      // The current url
      // The current url's content
      // The current content's hash
      var addHash, url, content, hash;

      // Set addHash function
      addHash = function(theUrl, theContent, theHash) {

        // If (hash does not exist in table)
        if (typeof hashes[theHash] === 'undefined') {
          // Add hash key to table
          hashes[theHash] = {
            collisions: 0,
            content: theContent
          };
          // Replace inputs content with hash
          inputs[theUrl] = theHash;
        }
        else {
          // If (no collision)
          // Then {replace inputs content with hash}
          // Else {add collision, create new hash, and repeat process}
          if (theContent === hashes[theHash].content) {
            inputs[theUrl] = theHash;
          }
          else {
            ++hashes[theHash].collisions;
            theHash = createHash(theContent, theHash, hashes[theHash].collisions);
            addHash(theUrl, theContent, theHash);
          }
        }
      };

      // Loop through supplied inputs
      for (url in inputs) {
        // Filter out default javascript properties
        if ( inputs.hasOwnProperty(url) ) {

          // Save, hash, and add the content and 
          //   hash to the hash table
          content = inputs[url];
          hash = createHash(content);
          addHash(url, content, hash);
        }
      }
    }

    // Finds the duplicated url page's content
    function findDuplicates() {
      // The list of the urls to check
      // The current url
      // The current length of the url list
      // The loop index
      // The next url
      // The loop count
      var urls, url, len, i, next, l;

      // Set the url list to empty then
      //   add all the urls to it
      urls = [];
      for (url in inputs) {
        if ( inputs.hasOwnProperty(url) ) {
          urls.push(url);
        }
      }

      // Loop through url list
      while (urls.length > 0) {

        // Save and remove first url on list
        url = urls.shift();
        // Add a property to the duplicates
        //   object with the url as the key
        duplicates[url] = [];

        // Save the current url list length
        len = urls.length;
        // Set index and loop count to 0
        i = l = 0;
        // Loop through url list
        for (; l<len; l++) {

          // Save the next url
          next = urls[i];

          // If (urls content matches)
          // Then {save to duplicates and remove from url list}
          // Else {increase index}
          if (inputs[url] === inputs[next]) {
            duplicates[url].push(next);
            urls.splice(i, 1);
          }
          else {
            ++i;
          }
        }
      }
    }

    // Prepares the results to be returned
    function prepareResults() {
      // The current url
      var url;

      // Add each url to the results array
      for (url in duplicates) {
        if ( duplicates.hasOwnProperty(url) ) {
          results.push(url + ' => [ ' + duplicates[url].join(',') + ' ]');
        }
      }
    }

    // Setup data structures, find duplicated
    //   content, and return visually
    //   prepared results
    setupInputs();
    createHashTable();
    findDuplicates();
    prepareResults();
    return results.join('<br />');
  }

  /**
   * -----------------------------------------------
   * Question 4
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[3] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'search', 'tree', 'graph', 'hash', 'list', 'array' ],
    subCat  : [ 'brute', 'back', 'dfs', 'trie', 'arb', 'digraph', 'adjList', 'hTable', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution4
  };

  settings.questions[3].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6270813198090240'
  };

  settings.questions[3].problem = '' +
  'You are given a string of four lower case characters and a dictionary of ' +
  'english words. Choose a data structure to represent the dictionary and ' +
  'write an algorithm that returns all the words from the dictionary that ' +
  'can be formed by the characters of the string.<br />' +
  'Example:<br />' +
  'string = \'ogeg\'<br />' +
  'words = [ \'egg\',\'ego\', ... ]';

  function solution4() {
    /*
     ** Solution:
     *  - Step 1: A json dictionary of English words is
     *    downloaded for use via ajax.
     *  - Step 2: A brute force search algorithm is used
     *    to create a trie of only the words from the
     *    dictionary that have a max of 4 characters
     *    and begin with a letter from the given string.
     *    A hash table with the key set to the current
     *    substring and the value set to a node
     *    containing a boolean value for whether the
     *    substring is a word, the string value of the
     *    substring, and an array of references to its
     *    child nodes is used to represent the trie.
     *  - Step 3: An arborescence is constructed for all
     *    of the characters in the supplied string.
     *  - Step 4: A backtracking algorithm is used to
     *    find all of the possible words resulting from
     *    the arborescence of the supplied string.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *    -- [Backtracking](http://en.wikipedia.org/wiki/Backtracking)
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- [Trie](http://www.geeksforgeeks.org/trie-insert-and-search/)
     *    -- Arborescence: http://en.wikipedia.org/wiki/Arborescence_(graph_theory)
     *    -- [Directed Graph (Digraph)](http://en.wikipedia.org/wiki/Directed_graph)
     *    -- [Adjacency List](http://en.wikipedia.org/wiki/Adjacency_list)
     *    -- [Hash Table](http://en.wikipedia.org/wiki/Hash_table)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     *
     ** Copyright Notice:
     *  - The list of English words used to create the test data
     *    for this question was derived from the EOWL and UKACD.
     *  - See [aIV JSON resource](github.com/imaginate/algorithmIV-question-manager/blob/master/example/resources/words.json)
     *  - See [EOWL](http://dreamsteep.com/projects/the-english-open-word-list.html)
     *  - Copyright (c) J Ross Beresford 1993-1999. All Rights Reserved.
     *  - See [Copyright Details](http://cfajohnson.com/wordfinder/UKACD17.shtml)
     */

    /**
     * A hash map of letter to English words.
     * @type {Object<string, Array<string>>}
     * @example
     * var words = { 'letter': [ 'word', ... ], ... };
     */
    var words;
    // An array of all the string's letters and an
    //   indicator of how many duplicates exist
    // A trie of words with a max length of 4
    //   characters and starting with each of
    //   the string's characters
    // The input string
    // The arborescence of the string's characters
    // The resulting possible words from the string
    var letters, wordTrie, string, graph, results;

    // Setup variables
    words = Object.freeze( aIV.app.getResource('words') );
    letters = {
      list: [],
      dupl: 0
    };
    wordTrie = {
      // 'current word part': {
      //   isWord: true||false,
      //   value : 'current word part',
      //   kids  : [ reference to child in hash map, ...]
      // }
    };
    string = 'ogeg';
    graph  = {
      val : '',
      kids: []
    };
    results = [];

    // Removes string's duplicate letters
    function setLetters() {
      // The loop index
      // The list of letter duplicates
      // The current letter
      var i, duplList, letter;

      // Set duplicate list
      duplList = [];

      // Save letters and duplicates
      for (i=0; i<4; i++) {

        // Save letter
        letter = string.charAt(i);
        // If (no duplicates exist)
        // Then {add letter to list}
        // Else {add letter to duplicates and trigger flag}
        if (letters.list.indexOf(letter) === -1) {
          letters.list.push(letter);
        }
        else {
          duplList.push(letter);
          ++letters.dupl;
        }
      }

      // Sort lists
      letters.list.sort();
      duplList.sort();
      // Append duplicates to main list
      letters.list = letters.list.concat(duplList);
    }

    // Create the trie of words
    function createWordTrie() {
      // The count of unique letters
      // The letter index
      var len, i;

      // Save the letters count
      len = letters.list.length - letters.dupl;
      // Add a branch to the trie for each letter
      for (i=0; i<len; i++) {
        addTrieBranch(letters.list[i]);
      }
    }

    // Adds a branch to the root of trie
    // param: the starting value of the branch
    function addTrieBranch(letter) {
      // The word loop index
      // The count of words
      // The current word
      // The current word length
      // The substring loop index
      // The last character index
      var i, wordsLen, word, wordLen, c, last;
      // The previous word substring
      // The new word substring
      var pNode, child;
      
      // Add branch to trie
      wordTrie[letter] = {
        isWord: false,
        value : letter,
        kids  : []
      };
      // Save words length
      wordsLen = words[letter].length;

      // Loop through words
      for (i=0; i<wordsLen; i++) {
            
        // Save word and word length
        word = words[letter][i];
        wordLen = word.length;

        // If (word has less than 5 characters)
        // Then {add word to trie}
        if (wordLen < 5) {

          // If (word is one character)
          // Then {set root end prop to true}
          // Else {add word to trie}
          if (wordLen === 1) {
            wordTrie[letter].isWord = true;
          }
          else {

            // Save last index
            last = wordLen - 1;
            // Save child start
            child = letter;
            // Loop through the word's characters
            for (c=1; c<=last; c++) {

              // Save current string
              pNode = child;
              child += word.charAt(c);

              // If (child does not exist)
              // Then {add to trie}
              // Else {update isWord}
              if (typeof wordTrie[child] === 'undefined') {
                wordTrie[child] = {
                  isWord: (c === last),
                   value: child,
                    kids: []
                };
                wordTrie[pNode].kids.push(wordTrie[child]);
              }
              else {
                wordTrie[child].isWord = wordTrie[child].isWord || (c === last);
              }
            }
          }
        }
      }
    }

    // Create arborescence for the supplied string
    function createGraph() {
      // A function to add the letter nodes
      var addKids;

      // Adds each letter's child nodes recursively
      // param: The parent node
      // param: The remaining list
      // param: Indicates whether this is the first pass
      //   and whether list duplicates exist (optional)
      addKids = function(node, list, unique) {
        // The count of the remaining letters
        // The loop index
        // The new substring
        // The child node
        // The newList copy
        var len, i, word, child, copy;

        // Set unique
        unique = unique || false;
        // Set count
        len = list.length - ( (unique) ?
          letters.dupl : 0
        );
        // For each remaining letter
        for (i=0; i<len; i++) {

          // Save new value and child
          word  = node.val + list[i];
          child = { val: word, kids: [] };
          // Add child to parent
          node.kids.push(child);
          // If (remaining letters)
          if (len > 1) {

            // Save modified list
            copy = list.slice(0);
            copy.splice(i, 1);
            // Call recursive function
            addKids(child, copy);
          }
        }
      }

      // Add branches
      addKids(graph, letters.list, !letters.dupl);
    }

    // Finds all of the possible words resulting from the string
    function findWords() {
      // A function to recursively handle the DFS
      var backtrack;

      // Recursively backtrack to find words
      // param: The current node
      backtrack = function(node) {
        // The count of children
        // The loop index
        // The current child
        var len, i, child;

        // Set count
        len = node.kids.length;
        // Loop through children
        for (i=0; i<len; i++) {

          // Set child node
          child = node.kids[i];

          // If (partial word exists)
          // Then {continue search}
          if (!!wordTrie[child.val]) {

            // If (partial word is complete)
            // Then {add word to results}
            if (wordTrie[child.val].isWord &&
                results.indexOf(child.val) === -1) {
              results.push(child.val);
            }

            // Continue DFS
            backtrack(child);
          }
        }
      }

      // Start recursive search
      backtrack(graph);
    }

    // Create a trie of the words, create an arborescence of the input string
    //   characters, find the possible words, and return the results
    setLetters();
    createWordTrie();
    createGraph();
    findWords();
    return '[ ' + results.sort().join(',') + ' ]';
  }

  /**
   * -----------------------------------------------
   * Question 5
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[4] = {
    complete: true,
    source  : 'bl',
    mainCat : [ 'search', 'graph', 'hash', 'list', 'array' ],
    subCat  : [ 'dfs', 'brute', 'arb', 'digraph', 'adjList', 'hTable', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution5
  };

  settings.questions[4].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5768610725232640'
  };

  settings.questions[4].problem = '' +
  'Using the below node list find the path that uses all the nodes without duplicating one.<br />' +
  '[ JFK,LXA,SNA,RKJ,LXA,SNA ]<br />' +
  'Note: Each pair of nodes define a directed edge like so:<br />' +
  '[ (JFK -&gt; LXA),(SNA -&gt; RKJ),(LXA -&gt; SNA) ]<br />';

  function solution5() {
    /*
     ** Solution:
     *  - Step 1: A brute force search algorithm is
     *    used to create an arborescence of the nodes
     *    in the vector while simultaneously building
     *    an array containing the two node values
     *    that are not duplicated (i.e. the
     *    possible arborescence roots). A hash table
     *    of nodes forming a singly-linked list is
     *    used to represent the arborescence.
     *  - Step 2: The two possible root node values
     *    are checked, and the root node is saved.
     *  - Step 3: One pass of a DFS algorithm is
     *    used to print the path of the nodes.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- Arborescence: http://en.wikipedia.org/wiki/Arborescence_(graph_theory)
     *    -- [Directed Graph (Digraph)](http://en.wikipedia.org/wiki/Directed_graph)
     *    -- [Adjacency List](http://en.wikipedia.org/wiki/Adjacency_list)
     *    -- [Hash Table](http://en.wikipedia.org/wiki/Hash_table)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // Original node list
    // Arborescence of nodes
    // Possible root nodes
    // Final node path
    var vector, graph, root, result;

    // Set variables
    vector = [ 'JFK','LXA','SNA','RKJ','LXA','SNA' ];
    graph  = {
      // val : 'location name',
      // edge: node reference
    };
    root   = [];
    result = [];

    // Adds unique node keys to the roots list
    //   and removes duplicates
    // param: node value to check
    function addRoot(nodeVal) {
      // Index of node in roots array
      var i;

      // Save node index
      i = root.indexOf(nodeVal);

      // If (node value is not in roots)
      // Then {add to roots}
      // Else {remove from roots}
      if (i === -1) {
        root.push(nodeVal);
      }
      else {
        root.splice(i, 1);
      }

      return (i === -1);
    }

    // Creates an arborescence of the nodes
    function createGraph() {
      // The vector length
      // The loop index
      // The current node value
      // Indicates whether to add new node
      // The vertex node
      // The edge node
      var len, i, val, check, vertex, edge;

      // Save vector length
      len = vector.length;

      // Add nodes
      for (i=0; i<len; i++) {

        // Set and check node value
        val = vector[i];
        check = addRoot(val);
        // If (node value does not exist)
        // Then {add node}
        if (check) {
          graph[val] = {
            val : val,
            edge: null
          }
        }
      }

      // Add edges
      for (i=0; i<len; i++) {

        // Set vertex and edge
        vertex = graph[ vector[i] ];
        edge   = graph[ vector[++i] ];
        // Add edge to vertex
        vertex.edge = edge;
      }
    }

    // Finds the root node
    function findRoot() {
      // The loop index
      // The current node
      var i, node;

      // Loop through roots
      for (i=0; i<2; i++) {

        // Save node reference
        node = graph[ root[i] ];
        // If (node has edge)
        // Then {set root to it}
        if (!!node.edge) {
          root = node;
          return;
        }
      }
    }

    // Finds the resulting path
    function findPath() {
      // The current node
      var node;

      // Set node to root node
      node = root;

      // Run DFS
      while (!!node) {

        // Add current node value to results
        result.push(node.val);
        // If (node has edge)
        // Then {set next node to edge}
        // Else {end loop}
        node = ( (!!node.edge) ?
          node.edge : !node
        );
      }
    }

    // Create arborescence, find root
    //   node, find final path, and
    //   return the result
    createGraph();
    findRoot();
    findPath();
    return result.join(' -&gt; ');
  }

  /**
   * -----------------------------------------------
   * Question 6
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[5] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'sort', 'tree', 'search', 'list', 'array' ],
    subCat  : [ 'heapS', 'binHeap', 'bst', 'back', 'bfs', 'brute', 'sList', 'dList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution6
  };

  settings.questions[5].links[0] = {
    name: 'More on Converting a Binary Search Tree into a Doubly-Linked List',
    href: 'http://www.careercup.com/question?id=4863668900593664'
  };

  settings.questions[5].problem = '' +
  'Given an array of random numbers, create a binary search tree with the median ' +
  'as the root. Then convert the binary search tree into a doubly-linked list ' +
  'that is sorted in ascending or descending order and return the first node in ' +
  'the list. Do the sort and conversion in place<span style="margin:0 12px">' +
  '&ndash;</span>i.e. the memory complexity of your algorithms should be ' +
  '<em style="margin:0 2px">&Omicron;</em>(1).' +
  '<span style="display:block;margin:15px 0 10px">Example diagram of conversion:</span>'  +
  '<style>' +
    '.aIV-exQ6-table {padding:0;margin:0;text-align:center;border-collapse:collapse;border:0}' +
    '.aIV-exQ6-table tr {padding:0;margin:0;text-align:center;border:0}' +
    '.aIV-exQ6-table td {padding:0;margin:0;text-align:center;verticle-align:middle;border:0}' +
    '.aIV-exQ6-table span.lineContainer {position:relative;display:block;width:100%;height:100%;overflow:hidden}' +
    '.aIV-exQ6-table span.lineFiller {opacity:0}' +
    '.aIV-exQ6-table span.topLine {position:absolute;top:2px;left:0;display:block;width:100%;height:1px;background:#192037}' +
    '.aIV-exQ6-table span.leftLine, .aIV-exQ6-table span.rightLine {position:absolute;top:50%;left:-50%;display:block;width:200%;height:1px;background:#192037}' +
    '.aIV-exQ6-table span.leftLine {-ms-transform:rotate(-45deg);-moz-transform:rotate(-45deg);webkit-transform:rotate(-45deg);transform:rotate(-45deg)}' +
    '.aIV-exQ6-table span.rightLine {-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);webkit-transform:rotate(45deg);transform:rotate(45deg)}' +
  '</style>' +
  '<table class="aIV-exQ6-table">' +
    '<tr>' +
      '<td><u>Unsorted Array</u></td>' +
      '<td></td>' +
      '<td><u>Binary Search Tree</u></td>' +
      '<td></td>' +
      '<td><u>Doubly-Linked List</u></td>' +
    '</tr>' +
    '<tr>'  +
      '<td>[&nbsp;&nbsp;7,3,9&nbsp;&nbsp;]</td>' +
      '<td style="padding:0 20px">&rArr;<br />&rArr;</td>'     +
      '<td>' +
        '<table class="aIV-exQ6-table" style="margin:5px auto 0;">' +
          '<tr>'  +
            '<td></td>'  +
            '<td></td>'  +
            '<td>7</td>' +
            '<td></td>'  +
            '<td></td>'  +
          '</tr>' +
          '<tr>'  +
            '<td></td>' +
            '<td>&sol;</td>'  +
            '<td></td>' +
            '<td>&bsol;</td>' +
            '<td></td>' +
          '</tr>' +
          '<tr>'  +
            '<td>3</td>' +
            '<td></td>'  +
            '<td></td>'  +
            '<td></td>'  +
            '<td>9</td>' +
          '</tr>' +
        '</table>' +
      '</td>' +
      '<td style="padding:0 20px">&rArr;<br />&rArr;</td>'     +
      '<td>3&nbsp;&nbsp;&lrarr;&nbsp;&nbsp;7&nbsp;&nbsp;&lrarr;&nbsp;&nbsp;9</td>' +
    '</tr>' +
  '</table>';

  function solution6() {
    /*
     ** Solution:
     *  - Step 1: A string of the supplied unsorted
     *    array of values is created for the results.
     *  - Step 2: The array of unsorted values is
     *    sorted to reflect the binary heap property.
     *  - Step 3: The array representing the binary
     *    heap is sorted in ascending order (heapsort).
     *  - Step 4: A balanced binary search tree is
     *    created from the heap. A linked list of
     *    nodes containing their value and references
     *    to their left and right children is used to
     *    represent the binary search tree.
     *  - Step 5: A breadth first search algorithm is
     *    used to create a string of the binary search
     *    tree for the results.
     *  - Step 6: A backtracking algorithm is used to
     *    convert the binary search tree into to a
     *    doubly-linked list.
     *  - Step 7: A brute force search algorithm is
     *    used to create a string of the values in
     *    the doubly-linked list for the results.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Heapsort](http://en.wikipedia.org/wiki/Heapsort)
     *    -- [Breadth First Search (BFS)](http://en.wikipedia.org/wiki/Breadth-first_search)
     *    -- [Backtracking](http://en.wikipedia.org/wiki/Backtracking)
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *  - Data Structures:
     *    -- [Binary Heap](http://en.wikipedia.org/wiki/Binary_heap)
     *    -- [Binary Search Tree](http://en.wikipedia.org/wiki/Binary_search_tree)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Doubly-Linked List](http://en.wikipedia.org/wiki/Doubly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The provided array of random numbers
    // The binary search tree
    // The starting node for the doubly-linked list
    // The final results
    var vals, tree, list, results;

    // Set variables
    vals = [ 88,97,56,41,27,16,95,54,28 ];
    tree = {
      val  : null,
      left : null,
      right: null
    };
    list = {
      val  : null,
      left : null,
      right: null
    };
    results = {
      vals: null,
      tree: null,
      list: null,
      show: ''
    };

    // Sorts the array of random numbers
    function sortValues() {
      // A function to convert the unsorted
      //   array into a heap
      // A function to construct the heap
      // A function to sort the heap
      var createHeap, heapify, sortHeap;

      // Creates a binary heap of the values
      createHeap = function() {
        // The number of provided values
        // The last value's index
        // The current value
        var len, last, val;

        // Save count of values
        len = vals.length;
        // Save last index
        last = len - 1;
        // Save first parent index
        val = (len - 2) / 2;
        val = Math.floor(val);

        // Build heap
        ++val;
        while (val--) {
          heapify(val, last);
        }
      }

      // Ensures the nodes are in heap order
      // param: The index of the starting node
      // param: The index of the ending node
      heapify = function(start, end) {
        // The parent index
        // The left child index
        // The right child index
        // The index of the biggest value
        var prt, left, right, max;

        // Set the first parent and child
        prt  = start;
        left = (prt * 2) + 1;

        // Check each parent node
        while (left <= end) {

          // Set max
          max = (vals[left] > vals[prt]) ? left : prt;

          // Set right child
          right = left + 1;
          // If (right child exists)
          // Then {check max value}
          if (right <= end) {
            max = (vals[right] > vals[max]) ? right : max;
          }

          // If (parent is max)
          // Then {end heapify}
          if (prt === max) {
            return;
          }

          // Swap parent and child values
          vals[max] = ( vals[prt] + (vals[prt] = vals[max]) ) - vals[max];

          // Set new parent and child indexes
          prt  = max;
          left = (prt * 2) + 1;
        }
      }

      // Sorts the heap
      sortHeap = function() {
        // The last index of the heap size
        var i;

        // Set index to the heap's last
        i = vals.length - 1;
        // Sort heap
        while (i > 0) {
            
          // Move the max (root) value to the end of the heap
          vals[i] = ( vals[0] + (vals[0] = vals[i]) ) - vals[i];

          // Reduce the heap size by 1
          --i;

          // Repair the heap missing its root
          heapify(0, i);
        }
      }
          
      // Run heapsort on array of values
      createHeap();
      sortHeap();
    }

    // Creates the binary search tree
    function createTree() {
      // A recursive function to set left children
      // A recursive function to set right children
      // The median heap index
      // The last index of the heap
      var setLeft, setRight, median, last;

      // Sets the left children
      // param: the parent node
      // param: the parent index
      // param: the starting index
      setLeft = function(node, prt, start) {
        // The nodes in the provided range (start to parent)
        // The index of the left child
        // The ending index for a right child
        var nodes, left, end;

        // Find the count of nodes
        nodes = prt - start;

        // If (no nodes)
        // Then {end traversal}
        if (nodes < 1) {
          return;
        }

        // Set the left child index and node
        left = ( (nodes < 3) ?
          prt - 1 : ( (nodes < 5) ?
            prt - 2 : start + Math.ceil(nodes / 2)
          )
        );
        node.left = {
          val  : vals[left],
          left : null,
          right: null
        };

        // If (no next child)
        // Then {end traversal}
        if (nodes === 1) {
          return;
        }

        // Set the next left child
        setLeft(node.left, left, start);

        // If (right child exists)
        // Then {set the right child}
        if (nodes > 2) {
          end = prt - 1;
          setRight(node.left, left, end);
        }
      };

      // Sets the right children
      // param: the parent node
      // param: the parent index
      // param: the ending index
      setRight = function(node, prt, end) {
        // The nodes in the provided range (parent to end)
        // The index of the right child
        // The starting index for a left child
        var nodes, right, start;

        // Find the count of nodes
        nodes = end - prt;

        // If (no nodes)
        // Then {end traversal}
        if (nodes < 1) {
          return;
        }

        // Set the right child index and node
        right = ( (nodes < 3) ?
          prt + 1 : ( (nodes < 6) ?
            prt + 2 : prt + Math.floor(nodes / 2)
          )
        );
        node.right = {
          val  : vals[right],
          left : null,
          right: null
        };

        // If (no next child)
        // Then {end traversal}
        if (nodes === 1) {
          return;
        }

        // Set the next right child
        setRight(node.right, right, end);

        // If (left child exists)
        // Then {set the left child}
        if (nodes > 2) {
          start = prt + 1;
          setLeft(node.right, right, start);
        }
      };

      // Find and set root to median value
      median = vals.length / 2;
      median = Math.floor(median);
      tree.val = vals[median];

      // Set root's left and right children
      setLeft(tree, median, 0);
      last = vals.length - 1;
      setRight(tree, median, last);
    }
        
    // Creates the doubly-linked list
    function createList() {
      // A function that moves the  BST's left root
      //   branch to the doubly-linked list
      // A function that moves the  BST's right root
      //   branch to the doubly-linked list
      var moveLeft, moveRight;

      // Moves the left root branch of the BST to the
      //   doubly-linked list
      moveLeft = function() {
        // The node with the minimum value
        //   remaining in the left branch
        // The min node's parent
        // The last node in the linked list
        var minNode, prtNode, listNode;

        // Set the last node in the linked
        //   list to the beginning
        listNode = list;

        // Find, remove, and replace the min node
        while (!!tree.left) {

          // Set the parent node to the tree root
          prtNode = tree;

          // Find the min node's parent and save both
          while (!!prtNode.left.left) {
            prtNode = prtNode.left;
          }
          minNode = prtNode.left;

          // Remove min node from tree and repair the BST
          prtNode.left = (!minNode.right) ? null : minNode.right;
          minNode.right = null;

          // Add min node to linked list
          listNode.right = minNode;
          minNode.left = listNode;
          listNode = minNode;
        }

        // Add root to linked list
        listNode.right = tree;
        tree.left = listNode;
      };
          
      // Moves the right root branch of the BST to the
      //   doubly-linked list
      moveRight = function() {
        // The node with the maximum value
        //   remaining in the right branch
        // The max node's parent
        // The last node in the linked list
        var maxNode, prtNode, listNode;

        // Set the last node in the linked
        //   list to the end
        listNode = list;

        // Find, remove, and replace the max node
        while (!!tree.right) {

          // Set the parent node to the tree root
          prtNode = tree;

          // Find the max node's parent and save both
          while (!!prtNode.right.right) {
            prtNode = prtNode.right;
          }
          maxNode = prtNode.right;

          // Remove max node from tree and repair the BST
          prtNode.right = (!maxNode.left) ? null : maxNode.left;
          maxNode.left = null;

          // Add max node to linked list
          listNode.left = maxNode;
          maxNode.right = listNode;
          listNode = maxNode;
        }

        // Add root to linked list
        listNode.left = tree;
        tree.right = listNode;
      };

      // Make the doubly-linked list
      moveLeft();
      moveRight();
    }
        
    // Prepares the results for display
    function setResults() {
      // Set final results
      results.show = '' +
      '<span style="display:block;overflow-x:auto">' +
      '<table class="aIV-exQ6-table">' +
        '<tr>' +
          '<td>' +
            '<u>Unsorted Array</u>' +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="padding:15px 0 0;">' +
            results.vals +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="padding:15px 0 20px;">' +
            '<span style="margin:0 15px;">&dArr;</span>' +
            '<span style="margin:0 15px;">&dArr;</span>' +
            '<span style="margin:0 15px;">&dArr;</span>' +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td>' +
            '<u>Binary Search Tree</u>' +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="padding:15px 0 0;">' +
            results.tree +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="padding:15px 0 20px;">' +
            '<span style="margin:0 15px;">&dArr;</span>' +
            '<span style="margin:0 15px;">&dArr;</span>' +
            '<span style="margin:0 15px;">&dArr;</span>' +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td>' +
            '<u>Doubly-Linked List</u>' +
          '</td>' +
        '</tr>' +
        '<tr>' +
          '<td style="padding:15px 0;">' +
            results.list +
          '</td>' +
        '</tr>' +
      '</table>' +
      '</span>';
    }

    // Prepares the final string for the unsorted
    //   array to add to the results
    setResults.vals = function() {
      results.vals = '[&nbsp;&nbsp;' + vals.join(',') + '&nbsp;&nbsp;]';
    };

    // Prepares the final string for the binary
    //   search tree to add to the results
    setResults.tree = function() {
      // A function that creates a matrix of the
      //   rows of nodes
      // A function that creates the final string
      var createMatrix, createString;

      // Creates the matrix of nodes for the BST
      createMatrix = function() {
        // The temporary container for the nodes waiting
        //   to be searched
        // The current node being searched
        // The left child
        // The right child
        var row, node, left, right;

        // Set tree results and row properties
        results.tree = [ [tree] ];
        row = {
          now  : [tree],
          next : [],
          isRow: true
        };

        // Loop through BST
        loop:
        while (true) {

          // Set and remove node
          node = row.now.shift();

          // If (node not null)
          // Then {check children}
          left = ( (!node) ?
            null : ( (!node.left) ?
              null : node.left
            )
          );
          right = ( (!node) ?
            null : ( (!node.right) ?
              null : node.right
            )
          );
          // Add children to next row
          row.next.push(left, right);
          // If (child exists)
          // Then {remove next row flag}
          row.isRow = row.isRow || (!!left || !!right);

          // If (current row finished)
          // Then {check and set next}
          if (row.now.length === 0) {
            if (row.isRow) {
              row.now = row.next.slice(0);
              row.next = [];
              results.tree.push( row.now.slice(0) );
              row.isRow = false;
            }
            else {
              break loop;
            }
          }
        }
      }

      // Creates the final string for the BST
      createString = function() {
        // The final string
        // The number of BST rows
        // The number of BST columns
        // The number of dashes from the root
        // The number of rows more than 3
        // The loop index for rows over three
        // The loop index for the rows
        // The current row
        var string, rows, columns, dashes, over, o, r, row;
        // The number of cells from the edge
        //   to the first node
        // The number of cells between children
        // The number of cells between each branch
        // The index of the last dash
        // The loop index for dashes
        // The number of nodes in the row
        // The last node in row
        // The loop index for the nodes
        // The width of each cell
        var side, gap, mGap, lastD, d, nodes, last, n, width;

        // Set the count of tree items
        rows = results.tree.length;
        dashes = ( (rows < 2) ?
          0 : ( (rows === 2) ?
            1 : 2
          )
        );
        if (rows > 3) {
          over = rows - 3;
          for (o=0; o<over; o++) {
            dashes = (dashes * 2) + 1;
          }
        }
        columns = (rows < 2) ? 1 : (dashes * 4) + 3;
        // Set the last row
        last = rows - 1;
        // Set each cells width
        width = 30;
        // Set the final string
        string = '<table class="aIV-exQ6-table" style="width:' +
        (width * columns) + 'px;margin:0 auto;">';

        // Add table cells for the BST
        for (r=0; r<rows; r++) {

          // Set row, count of nodes in row, and
          //   the index of the last node
          row = results.tree[r];
          nodes = row.length;
          last = nodes - 1;

          // Set the number of empty cells to be
          //   added to the side, the index of
          //   the middle dash, and the gap of
          //   cells between children
          side = ( (r === 0) ?
            Math.floor(columns / 2) : ( (dashes > 1) ?
              dashes : 0
            )
          );
          gap = (dashes * 2) + 1;
          lastD = (r === 0) ? 0 : dashes - 1;

          // If (not the root row)
          // Then {add a row of dashes to the string}
          if (r > 0) {

            // Open the row
            string += '<tr>' + '<td colspan="' + (side + 1) + '" ' +
            'style="width:' + ( (side + 1) * width) + 'px">&nbsp;</td>';

            // Loop through row nodes
            for (n=0; n<nodes; n++) {

              // Add dashes for left child
              if (!!row[n]) {
                for (d=0; d<dashes; d++) {
                  string += '' +
                  '<td style="width:' + width + 'px">' +
                    '<span class="lineContainer">' +
                      '<span class="lineFiller">&sol;</span>' +
                      ( (d === 0) ?
                        '<span class="leftLine"></span>' :
                        '<span class="topLine"></span>'
                      ) +
                    '</span>' +
                  '</td>';
                }
              }
              else {
                string += '<td colspan="' + dashes + '" ' +
                'style="width:' + (dashes * width) + 'px">&nbsp;</td>';
              }

              // Add blank cell for parent
              string += '<td style="width:' + width + 'px">&nbsp;</td>';

              // Move to the right child
              ++n;
              // Add dashes for right child
              if (!!row[n]) {
                for (d=0; d<dashes; d++) {
                  string += '' +
                  '<td style="width:' + width + 'px">' +
                    '<span class="lineContainer">' +
                      '<span class="lineFiller">&bsol;</span>' +
                      ( (d === lastD) ?
                        '<span class="rightLine"></span>' :
                        '<span class="topLine"></span>'
                      ) +
                    '</span>' +
                  '</td>';
                }
              }
              else {
                string += '<td colspan="' + dashes + '" ' +
                'style="width:' + (dashes * width) + 'px">&nbsp;</td>';
              }

              // If (not the last node in row)
              // Then {add blank space for children and parent's parent}
              if (n !== last) {
                string += '<td colspan="' + (mGap + 2) + '" ' +
                'style="width:' + ((mGap + 2) * width) + 'px">&nbsp;</td>';
              }
            }

            // Close the row
            string += '<td colspan="' + (side + 1) + '" style="width:' +
            ( (side + 1) * width) + 'px">&nbsp;</td>' + '</tr>';
          }

          // Add a row of nodes to the string
          string += '<tr>' +
          ( (side > 0) ?
            '<td colspan="' + side + '" style="width:' +
            (side * width) + 'px">&nbsp;</td>' : ''
          );

          // If (root)
          // Then {add root node}
          // Else {loop through row nodes}
          if (r === 0) {
            string += '' +
            '<td style="width:' + width + 'px">' +
              row[0].val +
            '</td>';
          }
          else {
            for (n=0; n<nodes; n++) {

              // Add left child
              string += '' +
              '<td style="width:' + width + 'px">' +
                ( (!!row[n]) ? row[n].val : '&nbsp;' ) +
              '</td>';

              // Add gap cell
              string += '<td colspan="' + gap + '" style="width:' +
              (gap * width) + 'px">&nbsp;</td>';

              // Move to the right child
              ++n;
              // Add right child
              string += '' +
              '<td style="width:' + width + 'px">' +
                ( (!!row[n]) ? row[n].val : '&nbsp;' ) +
              '</td>';

              // If (not the last node in row)
              // Then {add blank space for the parent's parent}
              if (n !== last) {
                string += '<td colspan="' + mGap + '" style="width:' +
                (mGap * width) + 'px">&nbsp;</td>';
              }
            }
          }

          // Close the row
          string += '' +
          ( (side > 0) ?
            '<td colspan="' + side + '" style="width:' +
            (side * width) + 'px">&nbsp;</td>' : ''
          ) + '</tr>';
          
          // Recalculate the mid gap and dashes
          mGap = dashes;
          dashes = ( (r === 0) ?
            dashes : ( (dashes > 2) ?
              Math.floor(dashes / 2) : 1
            )
          );
          mGap = ( (r === 0) ?
            0 : ( (mGap > 2) ?
              mGap : 1
            )
          );
        }
        
        // Save results string
        results.tree = string + '</table>';
      }

      // Make the string
      createMatrix();
      createString();
    };

    // Prepares the final string for the
    //   doubly-linked list to add to
    //   the results
    setResults.list = function() {
      // The current node
      var node;

      // Set list results to empty
      results.list = '';
      // Set node to list start
      node = list.right;

      // Add each node value and arrows
      loop:
      while (true) {
        results.list += node.val;
        if (node.right.val === null) {
          break loop;
        }
        results.list += '&nbsp;&nbsp;&lrarr;&nbsp;&nbsp;';
        node = node.right;
      }
    };

    // Sort the values, create the BST,
    //   convert the BST to a list,
    //   and share the results
    setResults.vals();
    sortValues();
    createTree();
    setResults.tree();
    createList();
    setResults.list();
    setResults();
    return results.show;
  }

  /**
   * -----------------------------------------------
   * Question 7
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[6] = {
    complete: true,
    source  : 'fb',
    mainCat : [ 'search', 'tree', 'list', 'array' ],
    subCat  : [ 'bfs', 'binTree', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution7
  };

  settings.questions[6].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5748231105413120'
  };

  settings.questions[6].problem = '' +
  'Given a Tree:<br />' +
  '<style>' +
    '.aIV-exQ7-table {width:' + (35 * 11) + 'px;padding:0;margin:0;text-align:center;border-collapse:collapse;border:0}' +
    '.aIV-exQ7-table tr {padding:0;margin:0;text-align:center;border:0}' +
    '.aIV-exQ7-table td {width:35px;padding:0;margin:0;text-align:center;verticle-align:middle;border:0}' +
    '.aIV-exQ7-table span.lineContainer {position:relative;display:block;width:100%;height:100%;overflow:hidden}' +
    '.aIV-exQ7-table span.lineFiller {opacity:0}' +
    '.aIV-exQ7-table span.topLine {position:absolute;top:0;left:0;display:block;width:100%;height:1px;background:#192037}' +
    '.aIV-exQ7-table span.leftLine, .aIV-exQ7-table span.rightLine {position:absolute;top:50%;left:-50%;display:block;width:200%;height:1px;background:#192037}' +
    '.aIV-exQ7-table span.leftLine {-ms-transform:rotate(-45deg);-moz-transform:rotate(-45deg);webkit-transform:rotate(-45deg);transform:rotate(-45deg)}' +
    '.aIV-exQ7-table span.rightLine {-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);webkit-transform:rotate(45deg);transform:rotate(45deg)}' +
  '</style>' +
  '<table class="aIV-exQ7-table">' +
    '<tr>' +
      '<td colspan="5">&nbsp;</td>' +
      '<td>A</td>' +
      '<td colspan="5">&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="leftLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="topLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="topLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="rightLine"></span>' +
        '</span>' +
      '</td>' +
      '<td colspan="3">&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td colspan="2">&nbsp;</td>' +
      '<td>B</td>' +
      '<td colspan="5">&nbsp;</td>' +
      '<td>C</td>' +
      '<td colspan="2">&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="leftLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="rightLine"></span>' +
        '</span>' +
      '</td>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="leftLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="rightLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td>D</td>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>E</td>' +
      '<td>&nbsp;</td>' +
      '<td>F</td>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>G</td>' +
    '</tr>' +
  '</table><br />' +
  'Write a function that prints:<br />' +
  'A<br />' +
  'BC<br />' +
  'DEFG';

  function solution7() {
    /*
     ** Solution:
     *  - Step 1: A Breadth First Search algorithm is used
     *    to create a balanced binary tree. A linked list
     *    of nodes containing their value and references
     *    to their left and right children is used to
     *    represent the binary tree.
     *  - Step 2: A Breadth First Search algorithm is used
     *    to traverse the tree and add the nodes in order
     *    by row to the result.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Breadth First Search (BFS)](http://en.wikipedia.org/wiki/Breadth-first_search)
     *  - Data Structures:
     *    -- [Binary Tree](http://en.wikipedia.org/wiki/Binary_tree)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The given values
    // The binary tree
    // The node rows to be printed
    var vals, tree, result;

    // Set variables
    vals = [ 'A','B','C','D','E','F','G' ];
    tree = {
      val  : vals[0],
      left : null,
      right: null
    };
    result = '';

    // Creates the binary tree
    function createTree() {
      // A function that adds children to a node
      // The temporary holder for each row of nodes
      // The index of the current value
      // The current tree's depth
      // The tree's max depth
      // The current node
      var addNodes, row, val, d, depth, node;

      // Adds children to the provided node
      // param: The node to add the children
      addNodes = function(prtNode) {

        // Create the nodes and increase the value
        prtNode.left = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;
        prtNode.right = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;

        // Add the nodes to temp holder
        row.next.push(prtNode.left, prtNode.right);
      };

      // Set the temp holders, value, and max depth
      row = {
        now : [tree],
        next: []
      };
      val = 1;
      depth = 3;

      // Add the nodes to tree
      for (d=1; d<depth; d++) {
        // Add nodes
        row.now.forEach(function(node) {
          addNodes(node);
        });
        // Reset temp arrays
        row.now = row.next.slice(0);
        row.next = [];
      }
    }

    // Saves a string of the binary tree's nodes
    //   in order with a line break for each row
    function printNodes() {
      // The current and next row of nodes
      // The current node being searched
      // The left child
      // The right child
      var row, node, left, right;

      // Set final result
      result = tree.val;

      // Set temp holder for each row
      row = {
          now   : [tree],
          next  : [],
          string: ''
        };

      // Loop through nodes
      loop:
      while (true) {

        // Set and remove node
        node = row.now.shift();

        // If (child exists)
        // Then {add child to next row and result}
        if (!!node.left) {
          row.next.push(node.left);
          row.string += node.left.val;
        }
        if (!!node.right) {
          row.next.push(node.right);
          row.string += node.right.val;
        }

        // If (current row finished)
        // Then {check, update, and reset rows}
        // Else {end search}
        if (row.now.length === 0) {
          if (row.next.length > 0) {
            result += '<br />' + row.string;
            row.now = row.next.slice(0);
            row.next = [];
            row.string = '';
          }
          else {
            break loop;
          }
        }
      }
    }

    // Create tree and print nodes
    createTree();
    printNodes();
    return result;
  }

  /**
   * -----------------------------------------------
   * Question 8
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[7] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'search', 'tree', 'list', 'array' ],
    subCat  : [ 'dfs', 'dList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution8
  };

  settings.questions[7].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6295449935806464'
  };

  settings.questions[7].problem = '' +
  'Represent the following in a data structure:' +
  '<ol style="padding:0;margin:0;list-style-type:none">' +
    '<li>&lt;html&gt;</li>' +
    '<li style="padding-left:20px">&lt;body&gt;</li>' +
    '<li style="padding-left:40px">&lt;div&gt;</li>' +
    '<li style="padding-left:60px">&lt;span&gt;Lorem Ipsum&lt;/span&gt;</li>' +
    '<li style="padding-left:60px">&lt;br /&gt;</li>' +
    '<li style="padding-left:40px">&lt;/div&gt;</li>' +
    '<li style="padding-left:20px">&lt;/body&gt;</li>' +
    '<li>&lt;/html&gt;</li>' +
  '</ol>';

  function solution8() {
    /*
     ** Solution:
     *  - Step 1: A doubly-linked list of nodes
     *    containing their tag name, content, and
     *    an array of child node references (in
     *    order by appearance) is created to represent
     *    a plane tree of the DOM elements where the
     *    html tag is the root node.
     *  - Step 2: A depth first search algorithm is
     *    used to add each element to a final result
     *    string.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- Plane Trees: http://en.wikipedia.org/wiki/Tree_(graph_theory)#Plane_tree
     *    -- [Doubly-Linked List](http://en.wikipedia.org/wiki/Doubly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The data structure for the DOM nodes
    // The final string output of the nodes
    var html, result;

    // Set data structures
    html = {
      tag    : 'html',
      _parent: null,
      content: '',
      kids   : []
    };
    result = '';

    // Adds the elements to the html page
    function addElements() {
      // A function that adds an element
      // The current element
      // The span element
      var addElement, elem, span;

      // Adds an element to the page
      // param: The new tag name (string)
      // param: The parent node
      addElement = function(tag, prt) {
        // The new element
        var newElem;

        // Create the new element
        newElem = {
          tag    : tag,
          _parent: prt,
          content: '',
          kids   : []
        };

        // Append it to the parent
        prt.kids.push(newElem);
            
        return newElem;
      };

      // Add nodes to the html tree
      elem = addElement('body', html);
      elem = addElement('div', elem);
      span = addElement('span', elem);
      addElement('br', elem);

      // Add content to nodes
      span.content = 'Lorem Ipsum';
    }

    // Creates a string output of the DOM nodes
    function prepareResult() {
      // A function that adds an element and
      //   its children to the result
      // A function that returns the string
      //   value for an element
      // A function that returns the padding
      //   value for a line
      // The padding amount for each indent
      var addElement, getString, getPadding, padding;

      // Adds an element and its children
      //   to the result
      // param: The element node
      // param: The current depth
      addElement = function(elem, depth) {
        // The number of children
        // The child node
        var kids, kid;

        // Set the count of children
        kids = elem.kids.length;

        // Add the element to the result
        result += '' +
        '<li style="' + getPadding(depth) + '">' +
          getString(elem.tag) +
          ( (kids === 0) ?
            elem.content +
            getString(elem.tag, true) :
            ''
          ) +
        '</li>';

        // If (no children)
        // Then {end addition}
        if (kids === 0) {
          return;
        }

        // Increase the depth
        ++depth;

        // Add the element's content and
        //   children to the result
        result += ( (elem.content !== '') ?
          '<li style="' + getPadding(depth) + '">' +
            elem.content +
          '</li>' :
          ''
        );
        elem.kids.forEach(function(kid) {
          addElement(kid, depth);
        });

        // Decrease the depth
        --depth;

        // Add the element closing tag
        result += '' +
        '<li style="' + getPadding(depth) + '">' +
          getString(elem.tag, true) +
        '</li>';

        return;
      };

      // Returns a string value for the element
      // param: The element's tag name
      // param: Indicates if element is closing (optional)
      getString = function(tag, end) {
        return ( (tag === 'br') ?
          ( (!end) ? '&lt;br /&gt;' : '' ) :
          '&lt;' + ( (!!end) ? '/' : '' ) +
          tag + '&gt;'
        );
      };

      // Returns the padding value for a line
      // param: The current depth
      getPadding = function(depth) {
        return 'padding-left:' +
        (padding * depth) + 'px';
      };

      // Set the padding px amount for each indent
      padding = 20;

      // Set the result
      result = '<ol style="padding:0;margin:0;list-style-type:none">';
      addElement(html, 1);
      result += '</ol>';
    }

    // Create the DOM data structure
    //   and print the elements
    addElements();
    prepareResult();
    return result;
  }

  /**
   * -----------------------------------------------
   * Question 9
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[8] = {
    complete: false,
    source  : 'am',
    mainCat : [],
    subCat  : [],
    links   : new Array(1),
    problem : 'See below',
    solution: solution9
  };

  settings.questions[8].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5082499984130048'
  };

  settings.questions[8].problem = '' +
  'Design a data structure that can do the following operations in ' +
  '<em style="margin:0 2px">&Omicron;</em>(1) time:<br />' +
  'Insert, Delete, Search, Return Max';

  function solution9() {
    /*
     ** Overview:
     *  - [explanation]
     *
     ** Solution:
     *  - [explanation]
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [term](link)
     *  - Data Structures:
     *    -- [term](link)
     */
  }

  /**
   * -----------------------------------------------
   * Question 10
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[9] = {
    complete: false,
    source  : 'am',
    mainCat : [ 'array' ],
    subCat  : [],
    links   : new Array(1),
    problem : 'See below',
    solution: solution10
  };

  settings.questions[9].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6260358392053760'
  };

  settings.questions[9].problem = '' +
  'You are given two integer arrays, A and B. Consider the following:<br />' +
  '1 &lt;= x &lt;= len(A) &nbsp;&nbsp;so x is iterator of array A<br />' +
  '1 &lt;= z &lt;= len(B) &nbsp;&nbsp;so z is iterator of array B<br /><br />' +
  'Find all the pairs (x,z) such that : x &lt; z &nbsp;&nbsp;and&nbsp;&nbsp; A[x] &gt; B[z]';

  function solution10() {
    /*
     ** Overview:
     *  - [explanation]
     *
     ** Solution:
     *  - [explanation]
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [term](link)
     *  - Data Structures:
     *    -- [term](link)
     */
  }


/* -----------------------------------------------------------------------------
 * | The TestData Return                                                       |
 * v ------------------------------------------------------------------------- v
                                                                            */
  return settings;

})();

  /**
   * -----------------------------------------------
   * Public Property (TestData.exampleResource)
   * -----------------------------------------------
   * @desc Contains the example resource data.
   * @type {!Object}
   */
  TestData.exampleResource = JSON.stringify({
  "a": ["aa","aah","aal","ab","aba","abba","abbe","abed","abet","able","ably","abut","aby","abye","ace","aced","aces","ache","achy","acid","acme","acne","acre","act","acta","acts","acyl","ad","adaw","add","adds","adiÛs","adit","ado","ados","adry","ads","adz","adze","ae","aeon","aero","aery","aesc","afar","affy","afro","aft","aga","agaÁant","agaÁante","agar","agas","age","aged","agee","agen","ages","agha","agin","agio","agma","ago","agog","agon","ague","ah","aha","ahas","ahem","ahoy","ahs","ai","aia","aias","aid","aide","aids","ail","ails","aim","aims","ain","aÓne","aÓnee","aÔoli","air","airn","airs","airt","airy","ais","ait","aits","aitu","ajar","ajee","ake","aked","akee","akes","akin","ala","alae","alap","alar","alas","alay","alb","albe","albs","alc·zar","alc·zars","ale","alee","ales","alew","alfa","alga","alit","alky","all","ally","alma","alme","alms","alod","aloe","alow","alp","alps","als","also","alt","alto","alts","alum","am","amah","ambo","amen","ami","amid","amie","amir","amis","amla","ammo","amok","amp","amps","amyl","an","ana","anal","anan","anas","ance","and","ands","ane","anes","anew","ani","anil","anis","ankh","ann","anna","anno","anns","anoa","anon","ant","anta","ante","anti","ants","anus","any","apay","ape","aped","aperÁu","aperÁus","apes","apex","apod","aprËs","apse","apt","aqua","ar","arak","arar","arb","arba","arbs","arc","arch","arco","arcs","ard","ards","are","area","ared","areg","ares","aret","arÍte","arÍtes","arew","aria","arid","aril","ark","arks","arle","arm","arms","army","arna","arow","arrÍt","arrÍts","arse","art","arts","arty","arum","arvo","ary","aryl","as","Âsar","asci","ash","ashy","ask","asks","asp","asps","ass","at","atap","ate","atoc","atok","atom","atop","auf","aufs","auk","auks","aula","auld","aune","aunt","aura","auto","ava","aval","avas","ave","aver","aves","avid","avow","aw","awa","away","awdl","awe","awed","awes","awl","awls","awn","awns","awny","awry","aws","ax","axe","axed","axel","axes","axil","axis","axle","axon","ay","ayah","aye","ayes","ayre","ays","ayu","ayus","azan"],
  "b": ["ba","bas","baa","baas","baal","baas","baba","babe","babu","baby","bach","back","bad","bade","bael","baff","baft","bag","bags","bah","bahs","baht","bail","bait","baju","bake","bald","bale","balk","ball","balm","balu","bam","bams","ban","banc","band","bane","bang","bani","bank","bans","bant","bap","baps","bapu","bar","barb","bard","bare","barf","bark","barm","barn","bars","base","bash","bask","bass","bast","bat","bate","bath","bats","batt","baud","baur","bawd","bawl","bawn","bawr","bay","bays","be","bead","beak","beam","bean","bear","beat","beau","beck","bed","bede","beds","bee","beef","been","beep","beer","bees","beet","beg","bego","begs","bein","bel","bell","bels","belt","bema","ben","bend","bene","beni","benj","bens","bent","bere","berg","bergËre","bergËres","berk","berm","best","bet","beta","bete","beth","bÍtise","bets","bevy","bey","beys","bhel","bi","bias","bib","bibs","bice","bid","bide","bids","bien","bier","biff","big","biga","bigg","bigs","bike","bile","bilk","bill","bin","bind","bine","bing","bink","bins","bint","bio","biog","bios","bird","birk","birl","birr","bis","bise","bish","bisk","bit","bite","bito","bits","bitt","biz","blab","blad","blae","blag","blah","blat","blay","bleb","bled","blee","blet","bleu‚tre","blew","blin","blip","blob","bloc","blot","blow","blub","blue","blur","bo","boa","boak","boar","boas","boat","bob","boba","bobs","bock","bod","bode","bods","body","boff","bog","bogs","bogy","boh","bohs","boil","bok","boke","boko","boks","bola","bold","bole","boll","bolo","bolt","boma","bomb","bona","bond","bone","bong","bonk","bony","boo","boob","book","boom","boon","boor","boos","boot","bop","bops","bor","bora","bord","bore","born","bors","bort","bos","bosh","bosk","boss","bot","both","bots","bott","bouk","bout","bow","bowl","bows","box","boxy","boy","boyo","boys","bozo","bra","brad","brae","brag","bran","bras","brat","braw","bray","bred","bree","bren","brew","brig","brim","brio","brit","bro","brog","broo","bros","brow","brrr","br˚le","brut","buat","bub","buba","bubo","bubs","buck","bud","buds","buff","bufo","bug","bugs","buhl","bulb","bulk","bull","bum","bumf","bump","bums","bun","buna","bund","bung","bunk","buns","bunt","buoy","bur","burd","burg","burk","burl","burn","burp","burr","burs","bury","bus","bush","busk","buss","bust","busy","but","bute","buts","butt","buy","buys","buzz","by","bye","byes","byke","byre","bys","byte"],
  "c": ["cab","cabs","cad","cade","cadi","cads","cafe","caff","cage","cagy","cain","cake","caky","calf","calk","call","calm","calp","calx","cam","camaÔeu","camaÔeux","came","camp","cams","can","caÒada","caÒadas","cane","cang","cann","cans","cant","cany","cap","capa","cape","capo","caps","car","carb","card","care","carÍme","cark","carl","carp","carr","cars","cart","casa","case","cash","cask","cast","cat","cate","cats","cauk","caul","cave","cavy","caw","cawk","caws","cay","cays","ceas","ceca","cede","cedi","cee","cees","ceil","cel","cell","cels","celt","cens","cent","cep","ceps","cere","cert","cess","cete","ch","cha","chad","chai","chaÓne","chal","cham","chap","char","chas","chat","ch‚teau","chaw","chay","che","chef","chËvre","chew","chez","chi","chic","chid","chin","chip","chis","chit","chiv","chiz","choc","chon","chop","chou","chow","chub","chug","chum","chut","ciao","cig","cigs","cill","cion","cire","cirl","cist","cit","cite","cits","city","cive","clad","clag","clam","clan","clap","claw","clay","clef","cleg","clem","clew","clip","clod","clog","clop","clot","clou","clow","cloy","club","clue","cly","coal","coat","coax","cob","cobb","cobs","coca","cock","coco","cod","coda","code","cods","coed","coff","coft","cog","cogs","coho","coif","coil","coin","coir","coit","coke","coky","col","cola","cold","cole","coll","cols","colt","coma","comb","come","commËre","commËres","comp","compËre","compËred","compËres","compËring","coms","con","cond","cone","conk","conn","cons","cony","coo","coof","cook","cool","coom","coon","coop","coos","coot","cop","cope","cops","copy","cor","cord","core","corf","cork","corm","corn","cors","cortËge","cortËges","cory","cos","cose","cosh","coss","cost","cosy","cot","cote","coth","cots","cott","coup","cove","cow","cowl","cowp","cows","cox","coxa","coxy","coy","coz","coze","cozy","crab","crag","cram","cran","crap","craw","cray","crËche","crËches","cred","cree","crew","crib","crit","croc","crop","cro˚te","cro˚tes","cro˚ton","cro˚tons","crow","cru","crud","crux","cry","cs·rd·s","cs·rd·ses","cub","cube","cubs","cud","cuds","cue","cued","cues","cuff","cuif","cuit","cull","culm","cult","cum","cunt","cup","cups","cur","curaÁao","curaÁaos","curaÁoa","curaÁoas","curb","curd","cure","curl","curn","curr","curs","curt","cush","cusk","cusp","cuss","cut","cute","cuts","cuz","cwm","cwms","cyan","cyma","cyme","cyst","cyte","czar"],
  "d": ["da","dab","dabs","dace","dad","dado","dads","dae","daff","daft","dag","dago","dags","dah","dahl","dahs","dais","dak","daks","dal","dale","dali","dals","dalt","dam","dame","damn","damp","dams","dan","dang","dank","dans","dap","daps","dare","darg","dari","dark","darn","dart","das","dash","data","date","daub","daud","daur","daut","daw","dawk","dawn","daws","dawt","day","days","daze","dead","deaf","deal","dean","dear","deb","debs","debt","deck","deco","dee","deed","deek","deem","deep","deer","dees","def","deft","defy","deid","deil","del","dele","delf","deli","dell","dels","deme","demo","demy","den","dene","dens","dent","deny","depÍche","dere","derm","dern","derv","desk","deus","deva","dew","dews","dewy","dey","deys","dhak","dhal","dhow","dial","dib","dibs","dice","dich","dick","dict","did","dido","die","dieb","died","diËdre","diËdres","dies","diet","dig","digs","dika","dike","dill","dim","dime","dims","din","dine","ding","dink","dins","dint","dip","dips","dire","dirk","dirl","dirt","disc","dish","disk","diss","dit","dita","dite","dits","ditt","div","diva","dive","divi","divs","dixy","do","doab","doat","dob","doc","dock","docs","dod","dodo","dods","doe","doek","doer","does","doff","dog","doge","dogs","dogy","doh","dohs","doit","dojo","dole","doll","dolt","dome","domy","don","dona","done","dong","dons","doo","doob","dook","dool","doom","door","doos","dop","dopa","dope","dops","dopy","dor","dork","dorm","dorp","dorr","dors","dort","dory","dos","dose","dosh","doss","dost","dot","dote","doth","dots","doty","douc","doum","doup","dour","dove","dow","dowd","dowf","dowl","down","dowp","dows","doxy","doze","dozy","drab","drad","drag","dram","drap","drat","draw","dray","dree","dreg","drek","drew","drey","drib","drip","drÙle","drÙles","drop","drow","drub","drug","drum","dry","dso","dsos","duad","dual","duan","dub","dubs","duce","duck","duct","dud","dude","duds","due","duel","dues","duet","duff","dug","dugs","duke","dule","dull","duly","duma","dumb","dump","dun","dune","dung","dunk","duns","dunt","duo","duos","dup","dupe","dura","dure","durn","duro","dusk","dust","duty","dux","dwam","dyad","dye","dyed","dyer","dyes","dyke","dyne","dzho","dzo","dzos"],
  "e": ["each","ear","earl","earn","ears","eas","ease","east","easy","eat","eath","eats","eau","eaus","ebb","ebbs","ebon","ecad","ecce","ecco","eche","echo","echt","ecod","ecru","ecu","ecus","eddo","eddy","edge","edgy","edh","edit","eel","eels","eely","een","eery","ef","eff","effs","eft","efts","egad","egal","eger","egg","eggs","eggy","egis","egma","ego","egos","eh","ehs","eild","eke","eked","ekes","ekka","el","elan","eld","elds","elf","elk","elks","ell","ells","elm","elms","elmy","els","else","elt","elts","elul","em","eme","emes","emeu","emir","emit","emma","ems","emu","emus","emys","en","end","ends","ene","enow","ens","entrEe","entrEes","envy","eoan","eon","eons","eorl","epee","epha","epic","epos","er","era","eras","ere","erf","erg","ergo","ergs","eric","erk","erks","ern","erne","erns","err","errs","ers","erst","es","esne","espiËgle","espy","ess","esse","est","eta","Etape","etas","etch","eten","eth","ethe","etna","etui","euge","euk","euks","euoi","euro","eve","even","ever","eves","evet","evil","evoe","ewe","ewer","ewes","ewk","ewks","ex","exam","exes","exit","exon","expo","exul","eyas","eye","eyed","eyes","eyne","eyot","eyra","eyre","eyry"],
  "f": ["fa","fab","face","faÁonne","fact","fad","fade","fado","fads","fady","faff","fag","fags","fah","fahs","faÔence","fail","fain","fair","fake","fall","falx","fame","fan","fand","fane","fang","fans","far","fard","fare","farl","farm","faro","fart","fas","fash","fast","fat","fate","fats","faun","faux","fave","fawn","fax","fay","fays","faze","feal","fear","feat","feck","fed","feds","fee","feed","feel","feer","fees","feet","fegs","feis","fell","felt","feme","fen","fend","feni","fens","fent","feod","fere","ferm","fern","fess","fest","fet","feta","fÍte","fÍtes","feu","feud","feus","few","fey","fez","fiar","fiat","fib","fibs","fico","fid","fide","fids","fie","fief","fies","fife","fig","figo","figs","fil","file","fill","film","filo","fils","fin","find","fine","fink","fino","fins","fir","fire","firm","firn","firs","fisc","fish","fisk","fist","fit","fits","fitt","five","fix","fiz","fizz","flab","flag","flak","flam","flan","fl‚neur","flap","flat","flaw","flax","flay","flea","flËche","flËches","fled","flee","flew","flex","fley","flic","flip","flit","flix","floe","flog","flop","flor","flow","flu","flub","flue","flus","flux","fly","foal","foam","fob","fobs","foci","foe","foes","fog","fogs","fogy","foh","fˆhn","fˆhns","fohs","foid","foil","foin","fold","folk","fon","fond","fone","font","food","fool","foot","fop","fops","for","fora","forb","forÁat","forÁats","ford","fore","fork","form","fort","foss","fou","foud","foul","four","fowl","fox","foxy","foy","foys","fozy","fra","frae","frag","frap","frau","fray","free","frËre","frËres","fret","frig","frit","friz","fro","froe","frog","from","frow","fry","fub","fubs","fuci","fuck","fud","fuds","fuel","fug","fugs","full","fum","fume","fums","fumy","fun","fund","funËbre","funk","funs","fur","furl","furs","fury","fusc","fuse","fuss","fust","fuze","fuzz","fy","fyke","fyrd","fys"],
  "g": ["gab","gabs","gaby","gad","gade","gadi","gads","gae","gaed","gaes","gaff","gag","gaga","gage","gags","gaid","gain","gair","gait","gal","gala","gale","galËre","galËres","gall","gals","gam","gamb","game","gamp","gams","gamy","gan","gane","gang","gant","gaol","gap","gape","gapÛ","gapÛs","gaps","gar","garb","garÁon","garÁons","gare","gars","gas","gash","gasp","gast","gat","gate","gats","gau","gaud","gaum","gaun","gaup","gaur","gaus","gave","gawk","gawp","gay","gays","gaze","gazy","geal","gean","gear","geat","geck","ged","geds","gee","geed","geek","geep","gees","gel","geld","gels","gelt","gem","gems","gen","gena","gene","gens","gent","genu","geo","geos","gere","germ","gest","get","geta","gets","geum","gey","ghat","ghee","ghi","ghis","gi","gib","gibe","gibs","gid","gie","gied","gien","gies","gif","gift","gig","giga","gigs","gila","gild","gill","gilt","gimp","gin","ging","gink","ginn","gins","gio","gios","gip","gips","gird","girl","girn","giro","girr","girt","gis","gist","git","gite","gits","give","gizz","gju","gjus","glad","glam","gled","glee","gleg","glei","glen","gley","glia","glib","glim","glob","glom","glop","glow","glue","glug","glum","glut","gnar","gnat","gnaw","gnu","gnus","go","goad","goaf","goal","goat","gob","gobo","gobs","goby","god","gods","goe","goel","goer","goes","goff","gogo","gold","golf","gone","gong","gonk","goo","good","goof","goog","gook","gool","goon","goop","goos","gore","gorp","gory","gosh","got","gougËre","gout","gov","govs","gowd","gowk","gowl","gown","goy","goys","grab","grad","gram","gran","grat","gray","gree","grËge","grew","grey","grid","grig","grim","grin","grip","gris","grit","grog","grot","grow","grub","grue","grum","gu","guan","guar","guck","gude","gue","gues","guff","guga","guid","gula","gule","gulf","gull","gulp","guly","gum","gums","gun","gunk","guns","gup","gups","gur","gurl","gurn","guru","gus","gush","gust","gut","guts","guv","guy","guys","gyal","gybe","gym","gyms","gyny","gyp","gyps","gyre","gyro","gyte","gyve"],
  "h": ["ha","haaf","haar","hack","had","hade","hadj","hae","haed","haem","haes","haet","haff","haft","hag","hags","hah","hahs","haik","hail","hain","hair","haj","haji","hajj","haka","hake","hale","half","hall","halm","halo","halt","ham","hame","hams","han","hand","hang","hank","hap","haps","hard","hare","hark","harl","harm","harn","harp","hart","has","hash","hask","hasp","hast","hat","hate","hath","hats","haud","haul","haut","ha¸yne","have","haw","hawk","haws","hay","hays","haze","hazy","he","head","heal","heap","hear","heat","hech","heck","heed","heel","heft","heid","heir","held","hele","hell","helm","help","hem","heme","hemp","hems","hen","hend","hens","hent","hep","heps","her","herb","herd","here","herl","herm","hern","hero","hers","hery","hes","hest","het","hete","hets","hew","hewn","hews","hex","hey","hi","hic","hick","hics","hid","hide","hie","hied","hies","high","hike","hila","hili","hill","hilt","him","hin","hind","hing","hins","hint","hip","hips","hire","his","hisn","hiss","hist","hit","hits","hive","hiya","hizz","ho","hoa","hoar","hoas","hoax","hob","hobo","hobs","hoc","hock","hod","hods","hoe","hoed","hoer","hoes","hog","hogg","hogs","hoh","hohs","hoi","hoik","hoke","hoki","hold","hole","holm","holp","hols","holt","holy","home","homo","homy","hon","hond","hone","hong","honk","hoo","hood","hoof","hook","hoon","hoop","hoot","hop","hope","hops","hore","horn","hors","hos","hose","hoss","host","hot","hote","hots","hour","hout","hove","how","howe","howf","howk","howl","hows","hox","hoy","hoya","hoys","hub","hubs","huck","hue","hued","huer","hues","huff","hug","huge","hugs","hugy","huh","huhs","hui","huia","hula","hule","hulk","hull","hum","huma","humf","hump","hums","hung","hunk","huns","hunt","hup","hups","hurl","hurt","hush","husk","huso","huss","hut","huts","hwyl","hye","hyke","hyle","hymn","hyp","hype","hypo","hyps"],
  "i": ["iamb","ibex","ibis","ice","iced","icer","ices","ich","icky","icon","icy","id","ide","idea","idem","ides","idle","idly","idol","ids","idyl","if","iff","iffy","ifs","igad","igapÛ","igapÛs","iglu","ikat","ikon","ilea","ilex","ilia","ilk","ilka","ilks","ill","ills","illy","imam","imp","impi","imps","in","inby","inch","info","ingo","inia","ink","inks","inky","inly","inn","inns","inro","ins","inti","into","io","ion","ions","ios","iota","ire","ires","irid","iris","irk","irks","iron","is","ish","isle","ism","isms","ismy","it","ita","itas","itch","item","its","ivy","iwis","ixia"],
  "j": ["jab","jabs","jack","jade","jag","j‰ger","j‰gers","jags","jail","jake","jam","jamb","jams","jane","jann","jap","jape","japs","jar","jark","jarl","jars","jasp","jass","jato","jaup","jaw","jaws","jay","jays","jazz","jean","jee","jeed","jeep","jeer","jees","jeff","jell","jerk","jess","jest","jet","jets","jeu","jeux","jiao","jib","jibe","jibs","jiff","jig","jigs","jill","jilt","jimp","jink","jinn","jinx","jism","jive","jizz","jo","job","jobs","jock","joe","joes","joey","jog","jogs","john","join","joke","joky","jole","joll","jolt","jomo","jook","jor","josh","joss","jot","jota","jots","jouk","jour","jow","jowl","jows","joy","joys","juba","jube","jud","judo","juds","judy","jug","juga","jugs","juju","juke","jump","junk","jura","jure","jury","jus","just","jut","jute","juts","juve","jynx"],
  "k": ["ka","kadi","kae","kaes","kago","kai","kaid","kaif","kail","kaim","kain","kaka","kaki","kale","kali","kam","kame","kami","kana","kang","kans","kant","kaon","kara","kart","kas","kat","kata","kats","kava","kaw","kaws","kay","kayo","kays","kazi","kea","keas","keck","ked","keds","keek","keel","keen","keep","kef","kefs","keg","kegs","keir","keks","kell","kelp","kelt","kemp","ken","keno","kens","kent","kep","kepi","keps","kept","kerb","kerf","kern","kesh","ket","keta","kets","kex","key","keys","khan","khat","khud","kibe","kick","kid","kids","kier","kif","kifs","kike","kill","kiln","kilo","kilp","kilt","kin","kina","kind","kine","king","kink","kino","kins","kip","kipe","kipp","kips","kir","kiri","kirk","kirn","kish","kiss","kist","kit","kite","kith","kits","kiva","kiwi","knag","knap","knar","knee","knew","knit","knob","knop","knot","know","knub","knur","knut","ko","koa","koan","koas","kob","kobs","koel","koff","kohl","koi","kola","kolo","kon","konk","kook","kop","koph","kora","kore","kos","koss","koto","krab","kris","krÛna","krÛnur","ksar","kudu","kuku","k¸mmel","kuri","kuru","kuzu","ky","kyat","kye","kyle","kyte","kyu","kyus"],
  "l": ["la","lab","labs","lac","lace","lack","lacs","lacy","lad","lade","lads","lady","laer","lag","lags","lah","lahs","laic","laid","laik","lain","lair","lake","lakh","laky","lam","lama","lamb","lame","lamp","lams","lana","land","lane","lang","lank","lant","lanx","lap","laps","lar","lard","lare","lark","larn","las","lase","lash","lass","last","lat","late","lath","lats","laud","lauf","lav","lava","lave","lavs","law","lawk","lawn","laws","lax","lay","lays","laze","lazy","lea","lead","leaf","leak","leal","leam","lean","leap","lear","leas","leat","lech","led","lee","leed","leek","leep","leer","lees","leet","left","leg","legs","lehr","lei","leir","leis","lek","leks","lem","leme","lend","leng","leno","lens","lent","lep","leps","lere","lerp","les","less","lest","let","lets","leu","lev","leva","leve","levy","lew","lewd","lex","ley","leys","lez","li","liar","lib","libs","lice","lich","lick","lid","lido","lids","lie","lied","lief","lien","lier","lies","lieu","life","lift","lig","ligs","like","lill","lilt","lily","lima","limaÁon","limaÁons","limb","lime","limn","limo","limp","limy","lin","lind","line","ling","link","linn","lino","lins","lint","liny","lion","lip","lips","lira","lire","lirk","lis","lisk","lisp","list","lit","lite","lith","live","lo","load","loaf","loam","loan","lob","lobe","lobi","lobo","lobs","loch","loci","lock","loco","lode","loft","log","loge","logo","logs","logy","loin","loir","loke","loll","loma","lome","lone","long","loo","loof","look","loom","loon","loop","loor","loos","loot","lop","lope","lops","lor","lord","lore","lorn","lors","lory","los","lose","losh","loss","lost","lot","lota","lote","loth","loto","lots","loud","loup","lour","lout","love","low","lowe","lown","lows","lox","loy","loys","luau","luce","luck","lud","ludo","luds","lues","luff","lug","luge","lugs","luke","lull","lulu","lum","lump","lums","luna","lune","lung","lunt","lur","lure","lurk","lurs","lush","lusk","lust","lute","lutz","luv","luvs","lux","luxe","lyam","lye","lyes","lym","lyme","lynx","lyre","lyse"],
  "m": ["ma","maa","maar","maas","mac","mace","mack","macs","mad","made","mads","mae","mag","mage","magi","mags","maid","maik","mail","maim","main","mair","mak","make","mako","maks","mal","male","mali","mall","malm","malt","mam","mama","mams","man","mana","maÒana","mand","mane","manËge","manËged","manËges","manËging","mang","mani","mano","mans","many","map","maps","mar","mara","marc","mare","marg","mark","marl","marm","mars","mart","mas","masa","mase","mash","mask","mass","mast","masu","mat","mate","math","mats","matt","maty","maud","maul","maun","maw","mawk","mawr","maws","max","maxi","may","maya","mays","maze","mazy","me","mead","meal","mean","meat","meed","meek","meer","meet","mega","mein","mel","mela","meld","mell","mels","melt","memo","men","mend","mene","meng","ment","menu","meow","mere","meri","merk","merl","mes","mesa","mese","mesh","mess","met","mete","meu","meus","meve","mew","mewl","mews","meze","mho","mhos","mi","mica","mice","mick","mico","mid","midi","mids","mien","miff","mike","mil","mild","mile","milk","mill","milo","mils","milt","mim","mime","mina","mind","mine","ming","mini","mink","mino","mint","minx","miny","mir","mire","miri","mirk","mirs","mirv","miry","mis","mise","misËre","misËres","miso","miss","mist","mite","mitt","mity","mix","mixt","mixy","miz","mizz","mna","mnas","mo","moa","moan","moas","moat","mob","mobs","mock","mod","mode","modi","mods","moe","moed","moes","mog","mogs","mohr","moi","moil","moit","mojo","moke","moki","moko","mol","mola","mold","mole","moll","molt","moly","mom","mome","moms","mon","mona","mong","monk","mono","mony","moo","mood","mooi","mool","moon","moop","moor","moos","moot","mop","mope","mops","mopy","mor","mora","more","morn","mors","mort","mose","moss","most","mot","mote","moth","mott","mou","moue","moup","mous","move","mow","mown","mows","moxa","moy","moya","moyl","moz","moze","mozz","mu","much","muck","mud","muds","muff","mug","mugs","muid","muir","mule","mull","mum","mumm","mump","mums","mun","mung","munt","muon","mure","murk","muse","mush","musk","muso","muss","must","mute","muti","mutt","mux","my","mya","myal","myna","mys","myth","mzee"],
  "n": ["na","naam","naan","nab","nabk","nabs","nach","nada","nae","naff","nag","naga","nags","naif","naik","nail","nain","nala","nam","name","nams","nan","nana","nans","naoi","naos","nap","napa","nape","naps","narc","nard","nare","nark","nary","nas","nat","nats","nave","navy","nay","nays","naze","ne","neal","neap","near","neat","neb","nebs","neck","ned","neds","need","neem","neep","nef","nefs","neif","nek","nene","neon","nep","neps","nerd","nerk","nesh","ness","nest","net","nete","nets","nett","neuk","neum","new","news","newt","next","nib","nibs","nice","nick","nid","nide","nidi","nids","nief","nife","niff","nigh","nil","nill","nils","nim","nimb","nims","nine","nip","nips","nirl","nis","nisi","nit","nite","nits","nix","nixy","no","nob","nobs","nock","nod","node","nodi","nods","noes","nog","nogg","nogs","noh","noil","nole","noll","noma","nome","non","none","nong","nook","noon","noop","nope","nor","nori","nork","norm","nos","nose","nosh","nosy","not","note","nott","noun","noup","nous","nova","now","nows","nowt","nowy","noy","noys","nth","nu","nub","nubs","nude","nuff","nuke","null","numb","nun","nuns","nur","nurd","nurl","nurr","nurs","nut","nuts","ny","nyas","nye","nyes","nyet"],
  "o": ["oaf","oafs","oak","oaks","oaky","oar","oars","oary","oast","oat","oath","oats","ob","oba","obas","obey","obi","obia","obis","obit","obo","oboe","obol","obos","obs","oca","ocas","och","oche","ochs","octa","od","oda","odal","odas","odd","odds","ode","odea","odes","odic","odor","ods","odso","odyl","oe","oes","of","ofay","off","offs","oft","ogam","ogee","ogle","ogre","oh","ohm","ohms","oho","ohos","ohs","oi","oik","oiks","oil","oils","oily","oink","oint","ois","okay","oke","okes","okra","old","olds","oldy","oleo","olid","olio","olla","olm","olms","olpe","om","ombu","omen","omer","omit","oms","on","once","one","oner","ones","only","ons","onst","onto","onus","onyx","oo","oof","oofs","oofy","ooh","oohs","oom","oon","oons","oont","oops","oos","oose","oosy","ooze","oozy","op","opah","opal","ope","oped","open","opes","oppo","ops","opt","opts","opus","or","oral","orb","orbs","orby","orc","orcs","ord","ords","ore","ores","orf","orfe","orgy","orle","orra","ort","orts","oryx","os","ossa","otic","otto","ou","ouch","ouph","our","ourn","ours","ous","oust","out","outs","ouzo","ova","oval","oven","over","ovum","ow","owe","owed","ower","owes","owl","owls","owly","own","owns","owre","ows","owt","ox","oxen","oxer","oy","oye","oyer","oyes","oyez","oys"],
  "p": ["pa","paca","pace","pack","paco","pact","pacy","pad","pads","page","pah","pahs","paid","paik","pail","pain","pair","pais","pal","pale","pall","palm","palp","pals","paly","pam","pams","pan","pand","pane","pang","pans","pant","pap","papa","pape","paps","par","para","pard","pare","park","parp","parr","pars","part","pas","pash","pass","past","pat","pate","path","pats","paua","paul","pave","paw","pawa","pawk","pawl","pawn","paws","pax","pay","pays","pea","peag","peak","peal","pean","pear","peas","peat","peba","pec","pech","peck","pecs","ped","peds","pee","peed","peek","peel","peen","peep","peer","pees","peg","pegh","pegs","pein","peke","pela","pelf","pell","pelt","pen","pend","pene","peni","penk","pens","pent","peon","pep","pepo","peps","per","pËre","pËres","peri","perk","perm","pern","pert","perv","peso","pest","pet","pets","pew","pews","phat","phew","phi","phiz","pho","phoh","phon","phos","phot","phut","pi","pia","pias","pic","pica","pice","pick","pics","pie","pied","pier","pies","piet","piet‡","piet‡s","pig","pigs","pika","pike","pila","pile","pili","pill","pimp","pin","piÒa","piÒata","piÒatas","pine","ping","pink","piÒon","piÒons","pins","pint","piny","pion","pioy","pip","pipa","pipe","pipi","pips","pipy","piraÒa","piraÒas","pirl","pirn","pis","pish","piss","pit","pita","pith","pits","pity","pi˘","pium","pix","pixy","pize","plan","plap","plat","play","plea","pleb","pled","plim","plod","plop","plot","plow","ploy","plug","plum","plus","ply","po","poa","poas","pock","poco","pod","pods","poem","poet","pogo","pogy","poh","pohs","poi","pois","poke","poky","pole","polk","poll","polo","polt","poly","pom","pome","pomp","poms","pond","pone","pong","pons","pont","pony","poo","pood","poof","pooh","pook","pool","poon","poop","poor","poot","pop","pope","pops","pore","pork","porn","port","pory","pos","pose","posh","poss","post","posy","pot","pote","pots","pott","pouf","pouk","pour","pout","pow","pows","pox","poxy","poz","pozz","prad","pram","prat","prau","pray","pre","pree","prep","prex","prey","prig","prim","pro","proa","prod","prof","prog","prom","proo","prop","pros","prow","pruh","pry","prys","psi","psis","psst","pst","psts","pub","pubs","puce","puck","pud","puds","pudu","puff","pug","pugh","pugs","puir","puja","puke","puku","pula","pule","pulk","pull","pulp","pulu","puly","puma","pump","pun","puna","punk","puns","punt","puny","pup","pupa","pups","pur","pure","puri","purl","purr","purs","pus","push","puss","put","puts","putt","putz","puy","puys","pyat","pye","pyes","pyet","pyot","pyre","pyro","pyx"],
  "q": ["qadi","qat","qi","qoph","qua","quad","quag","quat","quay","quey","quid","quim","quin","quip","quit","quiz","quod","quop"],
  "r": ["rabi","raca","race","rach","rack","racy","rad","rads","raff","raft","rag","raga","rage","ragg","ragi","rags","rah","rahs","rai","raid","rail","rain","rait","raj","raja","rake","raki","raku","rale","ram","rami","ramp","rams","ran","rana","rand","rang","rani","rank","rant","rap","rape","raps","rapt","rare","ras","rase","rash","rasp","rat","rata","rate","rath","rats","raun","rave","raw","rawn","raws","rax","ray","rays","raze","razz","re","read","reak","real","ream","rean","reap","rear","rec","reck","recs","red","redd","rede","reds","ree","reed","reef","reek","reel","reen","rees","ref","refs","reft","rego","reh","rehs","reif","rein","reis","rejÛn","rely","rem","rems","ren","rend","rens","rent","reny","rep","repo","repp","reps","res","rest","ret","rete","rets","rev","rÍveur","revs","rew","rex","rez","rhea","rho","rhos","rhus","ria","rial","rias","rib","ribs","rice","rich","rick","ricy","rid","ride","rids","riel","riem","rife","riff","rift","rig","rigg","rigs","rile","rill","rim","rima","rime","rims","rimu","rimy","rin","rind","rine","ring","rink","rins","riot","rip","ripe","rips","ript","rise","risk","risp","rit","rite","rits","ritt","riva","rive","riviËre","riviËres","rivo","riza","road","roam","roan","roar","rob","robe","robs","roc","rock","rocs","rod","rode","rods","roe","roed","roes","roil","roin","rok","roke","roks","roky","role","roll","rom","roma","romp","roms","rone","rong","roo","rood","roof","rook","room","roon","roop","roos","root","rope","ropy","rore","rort","rory","rose","rosy","rot","rota","rote","roti","rotl","rots","roup","rout","roux","rove","row","rows","rub","rube","rubs","ruby","ruc","ruck","rucs","rud","rudd","rude","ruds","rue","rued","rues","ruff","rug","rugs","ruin","rukh","rule","ruly","rum","rump","rums","run","rund","rune","rung","runs","runt","rurp","ruru","rusa","ruse","rush","rusk","rust","rut","ruth","ruts","rya","ryal","ryas","rye","ryes","ryfe","ryke","rynd","ryot","rype"],
  "s": ["sab","sabs","sac","sack","sacs","sad","sade","sae","safe","sag","saga","sage","sago","sags","sagy","sai","saic","said","sail","saim","sain","sair","sais","sake","saki","sal","sale","salp","sals","salt","sam","same","samp","san","sand","sane","sang","sank","sans","sant","sap","saps","sar","sard","sari","sark","sars","sash","sass","sat","sate","sati","saul","saut","save","saw","sawn","saws","sax","say","says","scab","scad","scag","scam","scan","scar","scat","scaw","schl‰ger","schl‰gers","scog","scop","scot","scow","scry","scud","scug","scul","scum","scup","scur","scut","scye","sea","seal","seam","sean","sear","seas","seat","sec","sech","secs","sect","sed","see","seed","seek","seel","seem","seen","seep","seer","sees","seg","sego","segs","sei","seif","seik","seil","seir","seis","sel","seld","sele","self","sell","sels","semi","sen","sena","send","sens","sent","seps","sept","sera","sere","serf","serk","serr","sese","sess","set","seta","sets","sett","sew","sewn","sews","sex","sext","sexy","sey","seys","sh","shad","shag","shah","sham","shan","shat","shaw","shay","she","shea","shed","shes","shet","shew","shim","shin","ship","shit","shiv","shmo","shod","shoe","shog","shoo","shop","shot","show","shul","shun","shut","shwa","shy","si","sial","sib","sibs","sic","sice","sich","sick","sida","side","sift","sigh","sign","sika","sike","sild","sile","silk","sill","silo","silt","sim","sima","simi","simp","sims","sin","sind","sine","sing","sinh","sink","sins","sip","sipe","sips","sir","sire","siri","sirs","sis","siss","sist","sit","site","sith","sits","six","size","sizy","ska","skag","skat","skaw","skeg","skeo","skep","sker","skew","ski","skid","skim","skin","skip","skis","skit","skol","skua","sky","slab","slae","slag","sl‡inte","slam","slap","slat","slaw","slay","sled","slee","slew","sley","slid","slim","slip","slit","slob","sloe","slog","slop","slot","slow","slub","slue","slug","slum","slur","slut","sly","smee","smew","smir","smit","smog","smug","smur","smut","snab","snag","snap","sneb","sned","snee","snib","snig","snip","snit","snob","snod","snog","snot","snow","snub","snug","sny","snye","so","soak","soap","soar","sob","sobs","soc","soca","sock","socs","sod","soda","sods","sofa","soft","sog","sogs","soh","sohs","soil","soja","soke","sol","sola","sold","sole","solfËge","solfËges","soli","solo","sols","soma","some","son","sone","song","sons","sook","sool","soon","soot","sop","soph","sops","sora","sorb","sord","sore","sori","sorn","sort","sos","soss","sot","sots","sou","souk","soul","soum","soup","soupÁon","soupÁons","sour","sous","sov","sovs","sow","sowf","sowl","sown","sows","sox","soy","soya","soys","spa","spae","spam","span","spar","spas","spat","spay","spec","sped","spek","spet","spew","spic","spik","spin","spit","spiv","spot","spry","spud","spue","spun","spur","spy","st","stab","stag","stap","star","staw","stay","sted","stem","sten","step","stet","stew","stey","stir","stoa","stob","stop","stot","stow","stub","stud","stum","stun","sty","stye","sub","subs","succËs","such","suck","sud","sudd","suds","sue","sued","suer","sues","suet","sui","suid","suit","suk","sukh","suks","sulk","sum","sumo","sump","sums","sun","sung","sunk","sunn","suns","sup","sups","suq","suqs","sura","surd","sure","surf","sus","suss","swab","swad","swag","swam","swan","swap","swat","sway","swig","swim","swiz","swob","swop","swot","swum","swy","sybo","syce","sye","syed","syes","syke","sync","synd","syne","sype"],
  "t": ["ta","taal","tab","tabs","tabu","tace","tach","tack","taco","tact","tad","tads","tae","tael","tag","tags","taha","tahr","tai","taig","tail","tais","tait","taj","taka","take","taky","tala","talc","tale","tali","talk","tall","tam","tame","tamp","tams","tan","tana","tane","tang","tanh","tank","tans","tao","tap","tapa","tape","taps","tapu","tar","tara","tare","tarn","taro","tarp","tars","tart","tas","tash","task","tass","tat","tate","tath","tats","tatt","tatu","tau","taus","taut","taw","tawa","taws","tax","taxa","taxi","tay","te","tea","tead","teak","teal","team","tear","teas","teat","tech","ted","teds","tee","teed","teel","teem","teen","teer","tees","tef","teff","tefs","teg","tegs","teil","tel","tela","teld","tell","tels","telt","teme","temp","tems","ten","tend","tene","tens","tent","term","tern","tes","test","tÍte","tew","tews","text","thae","than","thar","that","thaw","the","thee","them","then","thew","they","thig","thin","thir","this","tho","thon","thou","thro","thru","thud","thug","thus","thy","ti","tiar","tic","tice","tich","tick","tics","tid","tide","tids","tidy","tie","tied","tier","ties","tiff","tift","tig","tige","tigs","tike","tiki","til","tile","till","tils","tilt","timbÛ","timbÛs","time","tin","tind","tine","ting","tink","tins","tint","tiny","tip","tipi","tips","tire","tirl","tiro","tirr","tis","tit","tite","titi","tits","tizz","to","toad","toby","tock","toco","tod","tods","tody","toe","toea","toed","toes","toey","toff","toft","tofu","tog","toga","togs","toho","toil","toke","toko","tola","told","tole","toll","tolt","tolu","tom","tomb","tome","toms","ton","tone","tong","tonk","tons","tony","too","took","tool","toom","toon","toot","top","tope","topi","tops","tor","torc","tore","tori","torn","torr","tors","tort","tosa","tose","tosh","toss","tost","tot","tote","tots","toun","tour","tout","tow","town","tows","towy","toy","toys","toze","trad","tram","trap","trat","tray","tree","tref","trek","trËs","tret","trey","trie","trig","trim","trin","trio","trip","trod","trog","tron","trot","trow","troy","true","trug","try","tsar","tuan","tub","tuba","tube","tubs","tuck","tufa","tuff","tuft","tug","tugs","tui","tuis","tule","tum","tump","tums","tun","tuna","tund","tune","tung","tuns","tuny","tup","tups","turd","turf","turm","turn","tush","tusk","tut","tuts","tutu","tux","tuyËre","tuyËres","twa","twae","twal","twas","twat","tway","twee","twig","twin","twit","two","twos","twp","tyde","tye","tyed","tyes","tyg","tygs","tyke","tymp","tynd","tyne","type","typo","tyre","tyro","tzar"],
  "u": ["udal","udo","udos","uds","uey","ueys","ufo","ufos","ug","ugh","ughs","ugli","ugly","ugs","uke","ukes","ule","ules","ulex","ulna","ult","ulva","um","umbo","umph","ums","un","unau","unbe","unce","unci","unco","unde","undo","uni","unis","unit","uns","unto","up","upas","upby","upgo","upon","ups","upsy","ur","urao","urd","urds","ure","urea","ures","urge","uric","urn","urns","urs","urus","urva","us","use","used","user","uses","ut","utas","uts","utu","uva","uvas","uvea"],
  "v": ["vac","vacs","vade","vagi","vail","vain","vair","vale","vali","vamp","van","vane","vang","vans","vant","vara","vare","vary","vas","vasa","vase","vast","vat","vats","vatu","vau","veal","vee","veep","veer","vees","veg","vega","veil","vein","vela","veld","vell","vena","vend","vent","verb","vers","vert","very","vest","vet","veto","vets","vex","vext","via","vial","vibe","vibs","vice","vicuÒa","vicuÒas","vid","vide","vids","vie","vied","vier","vies","view","vild","vile","vill","vim","vims","vin","vina","vine","vino","vins","vint","viny","viol","vire","virl","vis","visa","vise","vita","vite","viva","vive","vivo","viz","vlei","voar","voe","voes","void","voil‡","vol","vola","vole","volk","vols","volt","vote","vow","vows","vox","vril","vrow","vug","vugs","vuln","vum"],
  "w": ["wack","wad","wade","wadi","wads","wady","wae","waff","waft","wag","wage","wags","waif","wail","wain","wait","waka","wake","wakf","wald","wale","wali","walk","wall","waly","wame","wan","wand","wane","wang","wank","wans","want","wany","wap","waps","waqf","war","ward","ware","wark","warm","warn","warp","wars","wart","wary","was","wase","wash","wasm","wasp","wast","wat","wats","watt","wauk","waul","waur","wave","wavy","waw","wawl","waws","wax","waxy","way","ways","we","weak","weal","wean","wear","web","webs","wed","weds","wee","weed","week","weel","weem","ween","weep","weer","wees","weet","weft","weil","weir","weka","weld","welk","well","welt","wem","wems","wen","wend","wens","went","wept","were","wert","west","wet","weta","wets","wey","weys","wha","wham","whap","what","whee","when","whet","whew","whey","whid","whig","whim","whin","whip","whir","whit","whiz","who","whoa","whom","whop","why","whys","wice","wich","wick","wide","wife","wig","wigs","wild","wile","will","wilt","wily","wimp","win","wind","wine","wing","wink","wino","wins","winy","wipe","wire","wiry","wis","wise","wish","wisp","wist","wit","wite","with","wits","wive","wo","woad","woe","woes","wog","wogs","wok","woke","woks","wold","wolf","womb","won","wons","wont","woo","wood","woof","wool","woon","woos","wop","wops","word","wore","work","worm","worn","wort","wos","wost","wot","wots","wove","wow","wows","wrap","wren","writ","wry","wud","wuds","wull","wus","wuss","wych","wye","wyes","wyn","wynd","wynn","wyns","wyte"],
  "x": ["xi","xu","xyst"],
  "y": ["yack","yaff","yah","yahs","yak","yaks","yald","yale","yam","yams","yang","yank","yap","yapp","yaps","yard","yare","yarn","yarr","yate","yaud","yaup","yaw","yawl","yawn","yawp","yaws","yawy","ye","yea","yeah","yean","year","yeas","yech","yede","yegg","yeld","yelk","yell","yelm","yelp","yelt","yen","yens","yep","yeps","yerd","yerk","yes","yest","yet","yeti","yett","yeuk","yew","yews","yex","ygo","ygoe","yike","yill","yin","yins","yip","yips","yird","yirk","yite","ylem","ylke","yo","yob","yobs","yock","yod","yode","yoga","yogh","yogi","yok","yoke","yoks","yolk","yomp","yon","yond","yoni","yont","yoof","yoop","yore","york","yos","you","youk","your","yow","yowe","yowl","yows","yuan","yuca","yuck","yuft","yug","yuga","yugs","yuk","yuke","yuko","yuks","yule","yup","yups","yurt","yus","ywis"],
  "z": ["zag","zags","zany","zap","zaps","zarf","zati","zax","zea","zeal","zebu","zed","zeds","zee","zees","zein","zek","zeks","zel","zels","zen","zero","zest","zeta","zho","zhos","ziff","zig","zigs","zila","zimb","zinc","zine","zing","zip","zips","zit","zite","ziti","zits","ziz","zizz","zo","zoa","zobo","zoea","zoic","zona","zone","zonk","zoo","zoom","zoon","zoos","zos","zouk","zyme"]
});

////////////////////////////////////////////////////////////////////////////////
// The Tests Module End
////////////////////////////////////////////////////////////////////////////////

  return testsModuleAPI;

})());
