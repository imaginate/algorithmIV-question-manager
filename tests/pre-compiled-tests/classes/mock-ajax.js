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
