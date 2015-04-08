/** @preserve blank line for custom compile (sed scripting) */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Question Manager - App Module (v1.1.0)
 * -----------------------------------------------------------------------------
 * @file The module for implementing the aIV question management app with
 *   debugging code included and turned on.
 * @module aIVApp
 * @version 1.1.0
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The MIT License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 **
 * @desc More details about aIV's question manager:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See the guideline]{@link https://github.com/imaginate/algorithmIV/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {number} num
 * @typedef {HTMLElement} elem
 * @typedef {Array<*>} vals
 * @typedef {Array<number>} nums
 * @typedef {Array<string>} strings
 * @typedef {Array<Object>} objects
 * @typedef {Array<Question>} questions
 * @typedef {Array<HTMLElement>} elems
 * @typedef {Array<{name: string, href: string}>} links
 * @typedef {Object<string, string>} stringMap
 * @typedef {Object<string, number>} numberMap
 * @typedef {Object<string, object>} objectMap
 * @typedef {Object<string, boolean>} booleanMap
 * @typedef {Object<string, HTMLElement>} elemMap
 * @typedef {Object<string, strings>} stringsMap
 */

(function(/** Window */ window, /** function(Object) */ core) {
  "use strict";


/* -----------------------------------------------------------------------------
 * | The Public API                                                            |
 * v ------------------------------------------------------------------------- v
                                                              public-api.js */
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
   * Global Method (aIV.app)
   * ---------------------------------------------------
   * @desc Initializes the aIV question management app.
   * @param {Object} settings - The app's settings.
   * @param {objectMap=} settings.config - The app's configuration.
   * @param {stringMap=} settings.sources - The app's sources.
   * @param {(objectMap|stringMap)=} settings.categories - The app's categories.
   * @param {objects} settings.questions - The app's questions.
   * @param {(string|strings)=} settings.resources - The app's resources.
   * @global
   */
  aIV.app = core;

})(window, (function(/** Window */ window, /** Document */ document) {
  "use strict"; 


/* -----------------------------------------------------------------------------
 * | The Public Variables for the Module                                       |
 * v ------------------------------------------------------------------------- v
                                                             module-vars.js */
  /**
   * ----------------------------------------------- 
   * Public Variable (debug)
   * -----------------------------------------------
   * @desc The Debug instance for the module's public methods.
   * @type {Debug}
   */
  var debug = aIV.debug('module');

  /**
   * ----------------------------------------------- 
   * Public Variable (events.debug)
   * -----------------------------------------------
   * @desc The Debug instance for the app's DOM events.
   * @type {{ debug: Debug }}
   */
  var events = { debug: aIV.debug('Events') };

  /**
   * ----------------------------------------------- 
   * Public Variable (polyfill.debug)
   * -----------------------------------------------
   * @desc The Debug instance for the app's polyfilled methods.
   * @type {{ debug: Debug }}
   */
  var polyfill = { debug: aIV.debug('polyfill') };

  /**
   * ----------------------------------------------- 
   * Public Variable (resources)
   * -----------------------------------------------
   * @desc The resources for the app.
   * @type {Object}
   */
  var resources = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The app instance.
   * @type {App}
   */
  var app;

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps)
   * -----------------------------------------------
   * @desc Regular expressions that are used multiple times
   *   by the debugger (avoid re-creating multiple times).
   * @type {Object<string, Object>}
   */
  var regexps = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types)
   * -----------------------------------------------
   * @desc Regular expressions that contain types.
   * @type {Object<string, RegExp>}
   */
  regexps.types = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.all)
   * -----------------------------------------------
   * @desc All the types available.
   * @type {RegExp}
   */
  regexps.types.all = (function() {
    /** @type {string} */
    var types;

    types = '' +
    '^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|'          +
    '^undefined$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|'   +
    '^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|' +
    '^functionmap$|^elemmap$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.basic)
   * -----------------------------------------------
   * @desc The basic types available.
   * @type {RegExp}
   */
  regexps.types.basic = (function() {
    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^object$|' +
            '^function$|^elem$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.arrays)
   * -----------------------------------------------
   * @desc The array types available.
   * @type {RegExp}
   */
  regexps.types.arrays = (function() {
    /** @type {string} */
    var types;

    types = '^array$|^strings$|^numbers$|^booleans$|' +
            '^objects$|^arrays$|^elems$|^functions$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.maps)
   * -----------------------------------------------
   * @desc The hash map types available.
   * @type {RegExp}
   */
  regexps.types.maps = (function() {
    /** @type {string} */
    var types;

    types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|' +
            '^arraymap$|^functionmap$|^elemmap$';

    return new RegExp(types);
  })();


/* -----------------------------------------------------------------------------
 * | The Public Methods for the Module                                         |
 * v ------------------------------------------------------------------------- v
                                                          module-methods.js */
  /**
   * ---------------------------------------------
   * Public Method (getResource)
   * ---------------------------------------------
   * @desc Completes AJAX calls for downloading resources, parses
   *   and saves the JSON file, and calls the callback function.
   * @param {string} jsonFile - The JSON file to download.
   * @param {function} callback - The callback function.
   */
  function getResource(jsonFile, callback) {

    debug.start('getResource', jsonFile, callback);
    debug.args('getResource', jsonFile, 'string', callback, 'function');

    /** @type {XMLHttpRequest} */
    var http;
    /** @type {string} */
    var msg;

    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        if (http.status === 200) {
          resources[ jsonFile ] = JSON.parse(http.responseText);
          debug.state('getResource', 'parsed responseText= $$', resources[ jsonFile ]);
        }
        else {
          msg = 'Your resource - resources/' + jsonFile + '.json - ';
          msg += 'failed to load. Please ensure your resources folder ';
          msg += 'is in the same directory as algorithmIV-app.js. ';
          msg += 'XMLHttpRequest.statusText= ' + http.statusText;
          console.error(msg);
        }
        callback();
      }
    };
    http.open('GET', 'resources/' + jsonFile + '.json', true);
    http.send();
  }

  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * @desc A shortcut for getElementById.
   * @param {string} title - The name of the id of the element to select.
   * @return {elem} A reference to element with the given id.
   */
  function getID(title) {

    debug.start('getID', title);
    debug.args('getID', title, 'string');

    return document.getElementById(title);
  }

  /**
   * ---------------------------------------------
   * Public Method (getTag)
   * ---------------------------------------------
   * @desc A shortcut for getElementsByTagName.
   * @param {string} title - The name of the tags to select.
   * @param {elem=} root - The root element to use.
   * @return {elems} References to the elements with the tag.
   */
  function getTag(title, root) {

    debug.start('getTag', title, root);
    debug.args('getTag', title, 'string', root, 'elem=');

    root = root || app.elems.root;

    return root.getElementsByTagName(title);
  }

  /**
   * ---------------------------------------------
   * Public Method (getClass)
   * ---------------------------------------------
   * @desc A shortcut for getElementsByClassName.
   * @param {string} title - The name of the class to select.
   * @param {elem=} root - The root element to use.
   * @return {elems} References to the elements with the class.
   */
  function getClass(title, root) {

    debug.start('getClass', title, root);
    debug.args('getClass', title, 'string', root, 'elem=');

    root = root || app.elems.root;

    return root.getElementsByClassName(title);
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @param {val} val - The value to be evaluated.
   * @param {string} type - The type to evaluate the value against. The
   *   optional types are 'string', 'number', 'boolean', 'object',
   *   'function', 'elem', 'undefined', 'array', 'strings', 'numbers',
   *   'booleans', 'objects', 'functions', 'arrays', 'elems', 'stringMap',
   *   'numberMap', 'booleanMap', 'objectMap', 'functionMap', 'arrayMap', and
   *   'elemMap'. Use '|' as the separator for multiple types (e.g.
   *   'strings|numbers'). Use '=' to indicate the value is optional (e.g.
   *   'array=' or 'string|number='). Use '!' to indicate that null is not a
   *   possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  function checkType(val, type) {

    // Debugging vars
    var errorMsg, failCheck;
    debug.start('checkType', val, type);
    debug.args('checkType', type, 'string');
    // Error message for checking the type value of each input
    errorMsg = 'Error: A given type was the wrong value. The incorrect ';
    errorMsg += 'value was \'$$\'. See the docs for acceptable values.';

    /**
     * @type {strings}
     * @private
     */
    var types;

    type = type.toLowerCase().replace(/[^a-z\|\=\!]/g, '');

    types = ( /\|/.test(type) ) ? type.split('|') : [ type ];

    return types.some(function(/** string */ type) {
      /**
       * @type {string}
       * @private
       */
      var cleanType;

      cleanType = type.replace(/\!|\=/g, '');

      failCheck = regexps.types.all.test(cleanType);
      debug.fail('checkType', failCheck, errorMsg, type);

      // Handle undefined val
      if (val === undefined) {
        type = type.replace(/\!/g, '');
        return /\=|^undefined$/.test(type);
      }
      else {

        // Evaluate null
        if (val === null) {
          return !(/\!/.test(type));
        }

        if (cleanType === 'undefined') {
          return false;
        }

        // Evaluate array types
        if ( regexps.types.arrays.test(cleanType) ) {

          if ( !Array.isArray(val) ) {
            return false;
          }

          // Evaluate a basic array
          if (cleanType === 'array') {
            return true;
          }

          // Evaluate an array of arrays
          if (cleanType === 'arrays') {
            return val.every(function(subVal) {
              return ( Array.isArray(subVal) );
            });
          }

          // Evaluate an array of elements
          if (cleanType === 'elems') {
            return val.every(function(subVal) {
              return (subVal instanceof HTMLElement);
            });
          }

          // Evaluate each value of the array
          cleanType = cleanType.replace(/s$/, '');
          return val.every(function(subVal) {
            return (typeof subVal === cleanType);
          });
        }

        // Evaluate element
        if (cleanType === 'elem') {
          return (val instanceof HTMLElement);
        }

        // Evaluate string, number, boolean, object, and function types
        if ( regexps.types.basic.test(cleanType) ) {
          return (typeof val === cleanType);
        }

        // Evaluate hash map types
        if ( regexps.types.maps.test(cleanType) ) {

          if (typeof val !== 'object') {
            return false;
          }

          // Evaluate a hash map of arrays
          if (cleanType === 'arraymap') {
            return Object.keys(val).every(function(subVal) {
              return ( Array.isArray(val[ subVal ]) );
            });
          }

          // Evaluate a hash map of elements
          if (cleanType === 'elemmap') {
            return Object.keys(val).every(function(subVal) {
              return (val[ subVal ] instanceof HTMLElement);
            });
          }

          // Evaluate each value of the hash map
          cleanType = cleanType.replace(/map$/, '');
          return Object.keys(val).every(function(subVal) {
            return (typeof val[ subVal ] === cleanType);
          });
        }
      }

      return false;
    });
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkTypes)
   * ---------------------------------------------------
   * @param {vals} vals - An array of the value(s) to be evaluated.
   *   Note that the values must be provided in an array.
   * @param {(string|strings)} types - The type(s) to evaluate the value(s)
   *   against. The optional types are 'string', 'number', 'boolean', 'object',
   *   'function', 'elem', 'undefined', 'array', 'strings', 'numbers',
   *   'booleans', 'objects', 'functions', 'arrays', 'elems', 'stringMap',
   *   'numberMap', 'booleanMap', 'objectMap', 'functionMap', 'arrayMap', and
   *   'elemMap'. Use '|' as the separator for multiple types (e.g.
   *   'strings|numbers'). Use '=' to indicate the value is optional (e.g.
   *   'array=' or 'string|number='). Use '!' to indicate that null is not a
   *   possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  function checkTypes(vals, types) {

    // Debugging vars
    var errorMsg, failCheck;
    debug.start('checkTypes', vals, types);
    debug.args('checkTypes', vals, 'array', types, 'string|strings');

    /**
     * @type {val}
     * @private
     */
    var val;

    if (typeof types === 'string') {
      types = vals.map(function() {
        return types;
      });
    }

    errorMsg = 'Error: The length of the arguments to be checked ';
    errorMsg += 'were not the same. vals= $$, types= $$';
    failCheck = (vals.length === types.length);
    debug.fail('checkTypes', failCheck, errorMsg, vals, types);

    // Error message for checking the type value of each input
    errorMsg = 'Error: A given type was the wrong value. The incorrect ';
    errorMsg += 'value was \'$$\'. See the docs for acceptable values.';

    return types.every(function(/** string */ _type, /** number */ i) {
      /**
       * @type {strings}
       * @private
       */
      var _types;

      val = vals[i];
      _type = _type.toLowerCase().replace(/[^a-z\|\=\!]/g, '');
      _types = ( /\|/.test(_type) ) ? _type.split('|') : [ _type ];

      return _types.some(function(/** string */ type) {
        /**
         * @type {string}
         * @private
         */
        var cleanType;

        cleanType = type.replace(/\!|\=/g, '');

        failCheck = regexps.types.all.test(cleanType);
        debug.fail('checkTypes', failCheck, errorMsg, type);

        // Handle undefined val
        if (val === undefined) {
          type = type.replace(/\!/g, '');
          return /\=|^undefined$/.test(type);
        }
        else {

          // Evaluate null
          if (val === null) {
            return !(/\!/.test(type));
          }

          if (cleanType === 'undefined') {
            return false;
          }

          // Evaluate array types
          if ( regexps.types.arrays.test(cleanType) ) {

            if ( !Array.isArray(val) ) {
              return false;
            }

            // Evaluate a basic array
            if (cleanType === 'array') {
              return true;
            }

            // Evaluate an array of arrays
            if (cleanType === 'arrays') {
              return val.every(function(subVal) {
                return ( Array.isArray(subVal) );
              });
            }

            // Evaluate an array of elements
            if (cleanType === 'elems') {
              return val.every(function(subVal) {
                return (subVal instanceof HTMLElement);
              });
            }

            // Evaluate each value of the array
            cleanType = cleanType.replace(/s$/, '');
            return val.every(function(subVal) {
              return (typeof subVal === cleanType);
            });
          }

          // Evaluate element
          if (cleanType === 'elem') {
            return (val instanceof HTMLElement);
          }

          // Evaluate string, number, boolean, object, and function types
          if ( regexps.types.basic.test(cleanType) ) {
            return (typeof val === cleanType);
          }

          // Evaluate hash map types
          if ( regexps.types.maps.test(cleanType) ) {

            if (typeof val !== 'object') {
              return false;
            }

            // Evaluate a hash map of arrays
            if (cleanType === 'arraymap') {
              return Object.keys(val).every(function(subVal) {
                return ( Array.isArray(val[ subVal ]) );
              });
            }

            // Evaluate a hash map of elements
            if (cleanType === 'elemmap') {
              return Object.keys(val).every(function(subVal) {
                return (val[ subVal ] instanceof HTMLElement);
              });
            }

            // Evaluate each value of the hash map
            cleanType = cleanType.replace(/map$/, '');
            return Object.keys(val).every(function(subVal) {
              return (typeof val[ subVal ] === cleanType);
            });
          }
        }

        return false;
      });
    });
  }

  /**
   * ---------------------------------------------------
   * Public Method (sortKeys)
   * ---------------------------------------------------
   * @desc A helper method that sorts the keys of an object.
   * @param {strings} ids - The unsorted keys.
   * @param {stringMap} data - A hash map of ids and names.
   * @return {strings} The sorted keys.
   */
  function sortKeys(ids, data) {

    debug.start('sortKeys', ids, data);
    debug.args('sortKeys', ids, 'strings', data, 'stringMap');

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
     * @type {num}
     * @private
     */
    var id;
    /**
     * @type {num}
     * @private
     */
    var i;
    /**
     * @type {num}
     * @private
     */
    var len;
    /**
     * @type {num}
     * @private
     */
    var ii;

    keys  = [];
    names = [];

    // Add the first key and its name to keys and names
    i    = ids.length - 1;
    id   = ids[i];
    name = data[id].toLowerCase();

    keys.push(id);
    names.push(name);

    // Add the remaining keys and their names in order
    while (i--) {
      id   = ids[i];
      name = data[id].toLowerCase();

      // The sorting logic (pre-sorted keys get linear time)
      len = names.length;
      ii  = 0;
      while (true) {

        if (ii === len) {
          keys.push(id);
          names.push(name);
          break;
        }

        if (name <= names[ii]) {
          keys.splice(ii, 0, id);
          names.splice(ii, 0, name);
          break;
        }

        ++ii;
      }
    }

    return keys;
  }

  /**
   * ---------------------------------------------------
   * Public Method (capFirst)
   * ---------------------------------------------------
   * @desc A helper method that capitalizes the first letter of a string.
   * @param {string} str - The original string.
   * @return {string} The capitalized string.
   */
  function capFirst(str) {

    debug.start('capFirst', str);
    debug.args('capFirst', str, 'string');

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * ---------------------------------------------------
   * Public Method (camelCase)
   * ---------------------------------------------------
   * @desc A helper method that converts a string with dashes to
   *   camel case (e.g. 'example-case' to 'exampleCase').
   * @param {string} str - The original string.
   * @return {string} The camel case string.
   */
  function camelCase(str) {

    debug.start('camelCase', str);
    debug.args('camelCase', str, 'string');

    /**
     * @type {strings}
     * @private
     */
    var arr;
    /**
     * @type {num}
     * @private
     */
    var i;

    arr = str.split('-');

    // Capitalize the first letter in every word (except the first one)
    i = arr.length;
    while (--i) {
      arr[i] = capFirst(arr[i]);
    }

    return arr.join('');
  }

  /**
   * ---------------------------------------------------
   * Public Method (trimFunctionWrapper)
   * ---------------------------------------------------
   * @desc A helper method that removes a wrapper function from a string.
   * @param {string} str - The original string.
   * @return {string} The trimmed string.
   */
  var trimFunctionWrapper = (function() {

    /** @type{RegExp} */
    var funcCheck;
    /** @type{RegExp} */
    var endCheck;

    funcCheck = /^function[\s\w]*\(\)\s*\{\s*[\r\n]{1,2}/;
    endCheck = /[\r\n]{1,2}\s*\}\;?$/;

    return function(str) {

      debug.group('trimFunctionWrapper', 'coll');
      debug.start('trimFunctionWrapper', str);
      debug.group('trimFunctionWrapper', 'end');
      debug.args('trimFunctionWrapper', str, 'string');

      if (funcCheck.test(str) && endCheck.test(str)) {
        str = str.replace(funcCheck, '');
        str = str.replace(endCheck, '');
      }

      return str;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (isLink)
   * ---------------------------------------------------
   * @desc A helper method that checks if a string is a link.
   * @param {string} str - The string to check.
   * @return {boolean} The evaluation result.
   */
  var isLink = (function() {

    /** @type{RegExp} */
    var http;

    http = /^https?\:\/\//;

    return function(str) {

      debug.start('isLink', str);
      debug.args('isLink', str, 'string');

      return http.test(str);
    };
  })();


/* -----------------------------------------------------------------------------
 * | The App Class                                                             |
 * v ------------------------------------------------------------------------- v
                                                         classes/app/app.js */
  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {?objects} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    /** @type {booleanMap} */
    var tmpConfig;
    /** @type {?Object<string, (string|num)>} */
    var defaults;
    /** @type {Object<string, stringMap>} */
    var names;
    /** @type {stringsMap} */
    var ids;
    /** @type {number} */
    var len;

    /**
     * ---------------------------------------------------
     * Public Property (App.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the App class.
     * @type {Debug}
     */
    this.debug = aIV.debug('App');

    // Debugging vars
    var args, msg;
    msg = 'Error: No questions were provided to this app\'s init.';
    this.debug.fail('init', !!questions, msg);

    msg = 'config= $$, sources= $$, categories= $$, questions= $$';
    args = [ 'init', 'open', msg ];
    args.push(config, sources, categories, questions);
    this.debug.group(args);

    this.debug.start('init', config, sources, categories, questions);

    args = [ 'init' ];
    args.push(config, 'object', sources, 'object');
    args.push(categories, 'object', questions, 'objects');
    this.debug.args(args);

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags)
     * -----------------------------------------------
     * @desc Saves flags that explain the current state of the app.
     * @type {AppFlags}
     * @struct
     */
    this.flags;

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems)
     * -----------------------------------------------
     * @desc Saves a reference to key DOM nodes for this app.
     * @type {AppElems}
     */
    this.elems;

    /**
     * ----------------------------------------------- 
     * Public Property (App.vals)
     * -----------------------------------------------
     * @desc Saves the current values for this app.
     * @type {AppVals}
     */
    this.vals;

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {Config}
     */
    this.config;

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {Sources}
     */
    this.sources;

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {Categories}
     */
    this.categories;

    /**
     * ---------------------------------------------------
     * Public Property (App.searchBar)
     * ---------------------------------------------------
     * @type {SearchBar}
     */
    this.searchBar;

    /**
     * ---------------------------------------------------
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions;

    // Setup the properties
    this.flags   = new AppFlags(!!questions);
    this.elems   = new AppElems();
    len = (!!questions) ? questions.length : 0;
    this.vals    = new AppVals(len);
    this.config  = new Config(config);
    this.sources = new Sources(sources);
    this.categories = new Categories(categories);

    Object.freeze(this.flags);
    Object.freeze(this.elems);
    Object.freeze(this.vals);
    Object.freeze(this.config);
    Object.freeze(this.sources);
    Object.freeze(this.categories);

    tmpConfig = {
      trimSpace   : this.config.prettifier.get('trimSpace'),
      tabLength   : this.config.prettifier.get('tabLength'),
      commentLinks: this.config.prettifier.get('commentLinks')
    };
    prettify.setConfig(tmpConfig);

    tmpConfig = {
      stage   : this.config.searchBar.get('stage'),
      source  : this.config.searchBar.get('source'),
      category: this.config.searchBar.get('category'),
      subCat  : this.config.searchBar.get('subCat')
    };
    this.searchBar = new SearchBar(tmpConfig, this.sources, this.categories);

    tmpConfig = {
      id      : this.config.questions.get('id'),
      complete: this.config.questions.get('complete'),
      source  : this.config.questions.get('source'),
      category: this.config.questions.get('category'),
      subCat  : this.config.questions.get('subCat'),
      links   : this.config.questions.get('links'),
      output  : this.config.questions.get('output')
    };
    this.questions = new Questions(questions, tmpConfig, this.sources, this.categories);

    Object.freeze(this.searchBar);
    Object.freeze(this.questions);

    // Set the search defaults
    defaults = ( (!!config && !!config.searchDefaults) ?
      config.searchDefaults : null
    );
    names = this.searchBar.names;
    ids = this.searchBar.ids.subCat;
    len = this.questions.len;
    this.config.searchBar.defaults.update(defaults, names, ids, len);

    // Set the search bar to the defaults
    this.searchBar.setToDefaults(this.config.searchBar.defaults);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.setupDisplay)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function()}
   */
  App.prototype.setupDisplay = function() {

    this.debug.group('setupDisplay', 'open');
    this.debug.start('setupDisplay');

    /** @type {number} */
    var renderTime;

    if ( this.flags.get('initArgs') ) {
      this.elems.appendNav();
      this.searchBar.setMainElems();
      this.searchBar.setOptElems();
      this.searchBar.appendElems();
      this.questions.addIdsToSearch();
      this.questions.appendElems();
      renderTime = this.questions.len * 30;
      this.debug.state('setupDisplay', 'renderTime= $$', renderTime);
      setTimeout(function() {
        /** @type {boolean} */
        var flip;

        app.questions.addCodeExts();
        app.elems.hold.style.display = 'none';
        flip = (app.searchBar.vals.order === 'desc');
        app.updateDisplay({ flip: flip, oldView: 'one' });

        app.debug.group('setupDisplay', 'end');
      }, renderTime);
    }
    else {
      this.elems.appendError();
      this.debug.group('setupDisplay', 'end');
    }
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.updateDisplay)
   * -----------------------------------------------
   * @desc Show the current matching questions for the app.
   * @param {Object=} settings - Settings to change the update actions.
   * @param {boolean=} settings.noVals - If set to true it indicates
   *   that new matching values should NOT be calculated.
   * @param {boolean=} settings.flip - If set to true it indicates that
   *   the order of each question's element should be flipped.
   * @param {string=} settings.oldView - The value of view before the
   *   update. Defaults to the value of the new view.
   * @param {boolean=} settings.reset - If set to true it indicates
   *   that the ids and index should be reset.
   * @param {boolean=} settings.index - If set to true it indicates
   *   that the index should NOT be changed.
   */
  App.prototype.updateDisplay = function(settings) {

    this.debug.group('updateDisplay', 'coll', 'settings= $$', settings);
    this.debug.start('updateDisplay', settings);
    this.debug.args('updateDisplay', settings, 'object=');

    /**
     * @type {?nums}
     * @private
     */
    var oldIds;
    /**
     * @type {num}
     * @private
     */
    var oldIndex;
    /**
     * @type {?nums}
     * @private
     */
    var resetIds;
    /**
     * @type {num}
     * @private
     */
    var resetIndex;
    /**
     * @type {?nums}
     * @private
     */
    var newIds;
    /**
     * @type {num}
     * @private
     */
    var newIndex;
    /**
     * @type {string}
     * @private
     */
    var view;

    settings = settings || {};

    // Save the old matching question ids and index
    oldIds = this.vals.get('len');
    oldIds = (oldIds) ? this.vals.get('ids').slice(0) : null;
    oldIndex = this.vals.get('index');

    // Update the current matching question ids and index
    if (!!settings.noVals) {
      if (!!settings.reset) {
        resetIds = (oldIds) ? oldIds.slice(0) : null;
        if (!!settings.flip && resetIds) {
          resetIds.reverse();
        }
        resetIndex = (!!settings.index) ? oldIndex : 0;
        this.vals.reset(resetIds, resetIndex);
      }
    }
    else {
      this.updateValues();
    }

    // Save the new matching question ids and index
    newIds = this.vals.get('len');
    newIds = (newIds) ? this.vals.get('ids').slice(0) : null;
    newIndex = this.vals.get('index');

    // Hide the question's main element
    this.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      view = app.searchBar.vals.view;
      app.elems.nav.style.display = ( (view === 'all') ?
        'none' : (view === 'ten' && app.vals.get('len') > 10) ?
          'block' : (view === 'one' && app.vals.get('len') > 1) ?
            'block' : 'none'
      );

      // Check if the questions order should be flipped
      if (!!settings.flip) {
        app.questions.reverseElems();
      }

      // Hide the old questions
      if (!!settings.oldView) {
        view = settings.oldView;
      }
      app.questions.hideElems(oldIds, oldIndex, view);

      // Show the new questions
      app.questions.showElems(newIds, newIndex);

      // Show the question's main element
      app.elems.main.style.opacity = '1';
        
      app.debug.group('updateDisplay', 'end');
    }, 520);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.updateValues)
   * -----------------------------------------------
   * @desc Updates the current selected values for the app.
   * @type {function()}
   */
  App.prototype.updateValues = function() {

    this.debug.start('updateValues');

    /**
     * @type {nums}
     * @private
     */
    var stage;
    /**
     * @type {nums}
     * @private
     */
    var source;
    /**
     * @type {nums}
     * @private
     */
    var mainCat;
    /**
     * @type {nums}
     * @private
     */
    var subCat;
    /**
     * @type {num}
     * @private
     */
    var len;
    /**
     * @type {num}
     * @private
     */
    var i;
    /**
     * @type {nums}
     * @private
     */
    var newIds;
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    // Save the current values
    stage   = this.searchBar.vals.stage;
    source  = this.searchBar.vals.source;
    mainCat = this.searchBar.vals.mainCat;
    subCat  = this.searchBar.vals.subCat;

    // Save the matching ids
    stage   = (stage   === 'all') ? null : this.searchBar.ques.stage[ stage ];
    source  = (source  === 'all') ? null : this.sources.get(source).get('ids');
    mainCat = (mainCat === 'all') ? null : this.categories.get(mainCat).get('ids');
    subCat  = (subCat  === 'all') ? null : this.categories.get(subCat).get('ids');

    // Copy the arrays or add empty objects
    if (stage) {
      stage = (stage.length) ? stage.slice(0) : { length: 0 };
    }
    if (source) {
      source = (source.length) ? source.slice(0) : { length: 0 };
    }
    if (mainCat) {
      mainCat = (mainCat.length) ? mainCat.slice(0) : { length: 0 };
    }
    if (subCat) {
      subCat = (subCat.length) ? subCat.slice(0) : { length: 0 };
    }

    // Check for empty arrays
    if ((stage   && !stage.length)   ||
        (source  && !source.length)  ||
        (mainCat && !mainCat.length) ||
        (subCat  && !subCat.length)) {
      this.vals.reset([]);
      return;
    }

    // Setup needed vars
    newIds = [];
    len = this.questions.len;
    i = 0;

    // Get the current matching question ids
    while (true) {
      ++i;
      pass = true;

      if (stage) {
        if (!stage.length) {
          break;
        }
        if (stage[0] === i) {
          stage.shift();
        }
        else {
          pass = false;
        }
      }

      if (source) {
        if (!source.length) {
          break;
        }
        if (source[0] === i) {
          source.shift();
        }
        else {
          pass = false;
        }
      }

      if (mainCat) {
        if (!mainCat.length) {
          break;
        }
        if (mainCat[0] === i) {
          mainCat.shift();
        }
        else {
          pass = false;
        }
      }

      if (subCat) {
        if (!subCat.length) {
          break;
        }
        if (subCat[0] === i) {
          subCat.shift();
        }
        else {
          pass = false;
        }
      }

      if (pass) {
        newIds.push(i);
      }

      if (i === len) {
        break;
      }
    }

    // Check if results should be reversed
    if (this.searchBar.vals.order === 'desc') {
      newIds.reverse();
    }

    // Update the values
    this.vals.reset(newIds);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.moveDisplay)
   * -----------------------------------------------
   * @desc Show the prev, next, or a specific question(s).
   * @param {(string|number)} way - The location to show.
   *   The options are 'prev', 'next', or a question id.
   */
  App.prototype.moveDisplay = function(way) {

    this.debug.group('moveDisplay', 'coll', 'way= $$', way);
    this.debug.start('moveDisplay', way);
    this.debug.args('moveDisplay', way, 'string|number');

    /**
     * @type {?nums}
     * @private
     */
    var ids;
    /**
     * @type {num}
     * @private
     */
    var oldIndex;
    /**
     * @type {num}
     * @private
     */
    var newIndex;
    /**
     * @type {string}
     * @private
     */
    var oldView;

    ids = this.vals.get('len');
    ids = (ids) ? this.vals.get('ids').slice(0) : null;

    oldView = this.searchBar.vals.view;

    oldIndex = this.vals.get('index');
    newIndex = this.vals.move(way);

    // Hide the question's main element
    this.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      app.elems.nav.style.display = ( (app.vals.get('len') > 1) ?
        'block' : 'none'
      );

      // Hide the old questions
      app.questions.hideElems(ids, oldIndex, oldView);

      // Show the new questions
      app.questions.showElems(ids, newIndex);

      // Show the question's main element
      app.elems.main.style.opacity = '1';
        
      app.debug.group('moveDisplay', 'end');
    }, 520);
  };


/* -----------------------------------------------------------------------------
 * | The App Flags Class                                                       |
 * v ------------------------------------------------------------------------- v
                                                   classes/app/app-flags.js */
  /**
   * -----------------------------------------------------
   * Public Class (AppFlags)
   * -----------------------------------------------------
   * @desc The flags that explain states of the environment in the app.
   * @param {boolean} pass - Indicates whether the user's supplied settings
   *   were the correct data types.
   * @constructor
   */
  var AppFlags = function(pass) {

    /**
     * ---------------------------------------------------
     * Public Property (AppFlags.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the AppFlags class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'AppFlags',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', pass);
    this.debug.args('init', pass, 'boolean');

    /**
     * ----------------------------------------------- 
     * Protected Property (AppFlags.initArgs)
     * -----------------------------------------------
     * @desc Indicates whether the app was initialized with correct arguments.
     * @type {boolean}
     * @private
     */
    var initArgs;

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.get)
     * -----------------------------------------------
     * @desc Gets a flag.
     * @param {string} prop - The name of the flag to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var flags = {
        initArgs: initArgs
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', flags.hasOwnProperty(prop), errorMsg, prop);

      return flags[prop];
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.set)
     * -----------------------------------------------
     * @desc Sets a flag.
     * @param {string} prop - The name of the flag to set.
     * @param {boolean} val - The value to set the flag to.
     */
    this.set = function(prop, val) {

      // Debugging vars
      var errorMsg;
      this.debug.start('set', prop, val);
      this.debug.args('set', prop, 'string', val, 'boolean');

      /** @private */
      var flags = {
        initArgs: function () {
          initArgs = val;
        }
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', flags.hasOwnProperty(prop), errorMsg, prop);

      flags[prop]();
    };
    Object.freeze(this.set);


    // Setup the properties
    initArgs = pass;
  };

  // Ensure constructor is set to this class.
  AppFlags.prototype.constructor = AppFlags;


/* -----------------------------------------------------------------------------
 * | The App Elems Class                                                       |
 * v ------------------------------------------------------------------------- v
                                                   classes/app/app-elems.js */
  /**
   * -----------------------------------------------------
   * Public Class (AppElems)
   * -----------------------------------------------------
   * @desc The key DOM nodes for this app.
   * @constructor
   */
  var AppElems = function() {

    /** @type {elem} */
    var elem;
    /** @type {elem} */
    var code;
    /** @type {elem} */
    var ol;
    /** @type {elem} */
    var li;

    /**
     * ---------------------------------------------------
     * Public Property (AppElems.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the AppElems class.
     * @type {Debug}
     */
    this.debug = aIV.debug('AppElems');

    // Debugging vars
    var debugCheck, debugMsg;
    this.debug.group('init', 'coll');
    this.debug.start('init');

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.root)
     * -----------------------------------------------
     * @desc The #aIV element.
     * @type {elem}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.sel)
     * -----------------------------------------------
     * @desc The #aIV-selections element.
     * @type {elem}
     */
    this.sel;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.main)
     * -----------------------------------------------
     * @desc The #aIV-main element.
     * @type {elem}
     */
    this.main;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.nav)
     * -----------------------------------------------
     * @desc The #aIV-nav element.
     * @type {elem}
     */
    this.nav;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.ques)
     * -----------------------------------------------
     * @desc The #aIV-questions element.
     * @type {elem}
     */
    this.ques;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.hold)
     * -----------------------------------------------
     * @desc The img.loader element.
     * @type {elem}
     */
    this.hold;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.none)
     * -----------------------------------------------
     * @desc The section.empty element.
     * @type {elem}
     */
    this.none;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.scrl)
     * -----------------------------------------------
     * @desc Saves the height of the browser's DOM loaded scrollbar.
     * @type {{ height: number }}
     * @struct
     */
    this.scrl;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.code)
     * -----------------------------------------------
     * @desc Saves values of the DOM loaded prettified list elements.
     * @type {{
     *   ol: { height: number },
     *   li: { height: number }
     * }}
     * @struct
     */
    this.code;


    // Setup the app's elements
    this.root = document.createElement('div');
    this.sel  = document.createElement('nav');
    this.main = document.createElement('div');
    this.nav  = document.createElement('nav');
    this.ques = document.createElement('section');
    this.hold = document.createElement('img');
    this.none = document.createElement('section');

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

    this.root.innerHTML = '<h1>Algorithm IV</h1>';
    this.none.innerHTML = 'No question(s) found.';

    this.hold.src = 'images/loading.gif';

    // Append the app's elements to their parents
    this.root.appendChild(this.sel);
    this.root.appendChild(this.main);
    this.main.appendChild(this.nav);
    this.main.appendChild(this.ques);
    this.ques.appendChild(this.hold);
    this.ques.appendChild(this.none);

    document.body.appendChild(this.root);

    // Setup the scrollbar details
    elem = document.createElement('div');
    elem.className = 'aIV-scrollbar';
    document.body.appendChild(elem);

    this.scrl = {};
    this.scrl.height = elem.offsetWidth - elem.clientWidth;
    Object.freeze(this.scrl);

    this.debug.state('init', 'this.scrl.height= $$', this.scrl.height);

    document.body.removeChild(elem);

    // Setup the code element details
    elem = document.createElement('pre');
    code = document.createElement('code');
    ol   = document.createElement('ol');
    li   = document.createElement('li');

    elem.style.opacity = '0';

    li.innerHTML = 'test';

    elem.appendChild(code);
    code.appendChild(ol);
    ol.appendChild(li);

    this.root.appendChild(elem);

    this.code = {};
    this.code.ol = {};
    this.code.li = {};
    this.code.ol.height = ol.offsetHeight - li.offsetHeight;
    this.code.li.height = li.offsetHeight;

    debugMsg = 'this.code.ol.height= $$, this.code.li.height= $$';
    this.debug.state('init', debugMsg, this.code.ol.height, this.code.li.height);
    debugCheck = (this.code.ol.height > 0 && this.code.li.height > 0);
    debugMsg = 'The code list or list item\'s height failed to compute.';
    this.debug.fail('init', debugCheck, debugMsg);

    this.root.removeChild(elem);

    Object.freeze(this.code);
    Object.freeze(this.code.ol);
    Object.freeze(this.code.li);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  AppElems.prototype.constructor = AppElems;

  /**
   * -----------------------------------------------
   * Public Method (AppElems.prototype.appendNav)
   * -----------------------------------------------
   * @desc Creates and appends the navigation elements.
   * @type {function()}
   */
  AppElems.prototype.appendNav = function() {

    this.debug.start('appendNav');

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
    pArrow.className = 'arrow';
    nArrow.className = 'arrow';
    pBG.className = 'bg';
    nBG.className = 'bg';
    pTitle.className = 'title';
    nTitle.className = 'title';

    pTitle.innerHTML = 'Previous';
    pArrow.innerHTML = 'Previous';
    nTitle.innerHTML = 'Next';
    nArrow.innerHTML = 'Next';

    pArrow.onclick = function() {
      events.debug.group('prev.onclick', 'coll');
      app.moveDisplay('prev');
      events.debug.group('prev.onclick', 'end');
    };
    nArrow.onclick = function() {
      events.debug.group('next.onclick', 'coll');
      app.moveDisplay('next');
      events.debug.group('next.onclick', 'end');
    };

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
   * Public Method (AppElems.prototype.appendError)
   * -------------------------------------------------
   * @desc Creates and appends the error elements.
   * @type {function()}
   */
  AppElems.prototype.appendError = function() {

    this.debug.start('appendError');

    /**
     * @type {string}
     * @private
     */
    var errorMsg;
    /**
     * @type {string}
     * @private
     */
    var example;
    /**
     * @type {num}
     * @private
     */
    var exampleLineCount;
    /**
     * @type {num}
     * @private
     */
    var divHeight;
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
    /**
     * @type {elem}
     * @private
     */
    var exampleDiv;
    /**
     * @type {elem}
     * @private
     */
    var h3;
    /**
     * @type {elem}
     * @private
     */
    var div;
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

    errorMsg = '' +
      'Algorithm IV\'s question (or code sample) management app was '        +
      'initialized without any questions. Please ensure you correctly gave ' +
      'your settings to this app. The app should be initialized with '       +
      'an object that contains properties for all of your settings (see '    +
      'below). If this error persists please open an issue with '            +
      '<a href="https://github.com/imaginate/algorithmiv/issues" '           +
      'class="dark">aIV on GitHub</a> or send an email to <a href="mailto:'  +
      'learn@algorithmiv.com" class="dark">learn@algorithmiv.com</a>. We '   +
      'will solve your problem or answer your question as quickly as we '    +
      'can. We hope aIV\'s apps, tools, and libraries are able to help you ' +
      'maximize your development skills and projects!&NewLine;'              +
      'Best,&NewLine;'                                                       +
      '&ndash; Adam from Algorithm IV';

    example = '' +
      '<li>' +
        '<span class="cmt">// Create an empty object for your settings</span>' +
      '</li>' +
      '<li>'  +
        '<span class="defKey">var</span> <span class="idt">settings</span> ' +
        '<span class="opr">=</span> <span class="brc">{}</span>'             +
        '<span class="smc">;</span>'                                         +
      '</li>' +
      '<li>&nbsp;</li>' +
      '<li>'  +
        '<span class="cmt">/*</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * If you want to change the default configuration' +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * settings, add sources, add categories, or add'   +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * questions simply add one or all of the matching' +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * properties to your empty settings object. Note'  +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * that the names of your properties must match'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * the correct names for each setting - config,'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * sources, categories, and questions. You can'     +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * get in-depth details about creating a config,'   +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * sources, categories, or questions object by'     +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * visiting ' + // ...v.com/docs.'                  +
          '<a href="http://www.algorithmiv.com/docs/questions"' +
          ' target="_blank">algorithmiv.com/docs</a>.' +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> */</span>' +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.config</span> <span class="opr">=</span> ' +
        '<span class="idt">yourConfig</span><span class="smc">;</span>'        +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.sources</span> <span class="opr">=</span>' +
        ' <span class="idt">yourSources</span><span class="smc">;</span>'      +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.categories</span> <span class="opr">=</sp' +
        'an> <span class="idt">yourCategories</span><span class="smc">;</span>'+
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.questions</span> <span class="opr">=</sp'  +
        'an> <span class="idt">yourQuestions</span><span class="smc">;</span>' +
      '</li>' +
      '<li>&nbsp;</li>' +
      '<li><span class="cmt">// Initialize Algorithm IV\'s app</span></li>'    +
      '<li>'  +
        '<span class="idt">aIV</span><span class="per">.</span><span class="'  +
        'idt">app</span><span class="brc">(</span><span class="idt">settings'  +
        '</span><span class="brc">)</span><span class="smc">;</span>'          +
      '</li>';

    exampleLineCount = 22;

    divHeight = exampleLineCount * app.elems.code.li.height;
    divHeight += app.elems.code.ol.height;

    // Create the error elements
    errorDiv = document.createElement('div');
    h2 = document.createElement('h2');
    p  = document.createElement('p');

    // Create the example elements
    exampleDiv = document.createElement('div');
    h3   = document.createElement('h3');
    div  = document.createElement('div');
    pre  = document.createElement('pre');
    code = document.createElement('code');
    ol   = document.createElement('ol');

    // Assign the class names
    errorDiv.className   = 'initError';
    exampleDiv.className = 'initExample';
    div.className = 'containExample';

    // Add the content
    h2.innerHTML = 'Initialization Error';
    p.innerHTML    = message;
    h3.innerHTML = 'App Init Example';
    ol.innerHTML   = example;

    // Complete all dynamic formatting
    div.style.height = height + 'px';

    // Append initError's children
    errorDiv.appendChild(h2);
    errorDiv.appendChild(p);
    errorDiv.appendChild(exampleDiv);
    exampleDiv.appendChild(h3);
    exampleDiv.appendChild(div);
    div.appendChild(pre);
    pre.appendChild(code);
    code.appendChild(ol);

    // Append initError to #aIV-questions
    this.ques.appendChild(errorDiv);

    // Hide the loader
    this.hold.style.display = 'none';
  };


/* -----------------------------------------------------------------------------
 * | The App Vals Class                                                        |
 * v ------------------------------------------------------------------------- v
                                                    classes/app/app-vals.js */
  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @param {number} quesLen - The number of questions for the app.
   * @constructor
   */
  var AppVals = function(quesLen) {

    /** @type {number} */
    var i;

    /**
     * ---------------------------------------------------
     * Public Property (AppVals.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the AppVals class.
     * @type {Debug}
     */
    this.debug = aIV.debug('AppVals');

    this.debug.start('init');
    this.debug.args('init', quesLen, 'number');

    /**
     * ----------------------------------------------- 
     * Protected Property (AppVals.ids)
     * -----------------------------------------------
     * @desc The ids of the questions that match the current search
     *   criteria.
     * @type {nums}
     * @private
     */
    var ids;

    /**
     * ----------------------------------------------- 
     * Protected Property (AppVals.len)
     * -----------------------------------------------
     * @desc The number of questions that match the current search
     *   criteria.
     * @type {num}
     * @private
     */
    var len;

    /**
     * ----------------------------------------------- 
     * Protected Property (AppVals.index)
     * -----------------------------------------------
     * @desc The current index of the ids array being displayed.
     *   If the view = 'all' or no ids match then index = -1.
     * @type {num}
     * @private
     */
    var index;

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.get)
     * -----------------------------------------------
     * @desc Gets an app value.
     * @param {string} prop - The name of the value to get.
     * @return {(num|nums)}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (num|nums)>} */
      var values = {
        ids  : ids,
        len  : len,
        index: index
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', values.hasOwnProperty(prop), errorMsg, prop);

      return values[prop];
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.reset)
     * -----------------------------------------------
     * @desc Resets the app values.
     * @param {nums} newIds - The new matching question ids.
     * @param {num=} newIndex - The starting index.
     */
    this.reset = function(newIds, newIndex) {

      this.debug.start('reset', newIds, newIndex);
      this.debug.args('reset', newIds, 'numbers', newIndex, 'number=');

      /**
       * @type {num}
       * private
       */
      var newLen;

      newLen = newIds.length || 0;

      // Set newIndex
      if (app.searchBar.vals.view === 'all') {
        newIndex = -1;
      }
      else {
        if (newLen) {
          if (typeof newIndex !== 'number' ||
              newIndex < 0 || newIndex >= newLen) {
            newIndex = 0;
          }
        }
        else {
          newIndex = -1;
        }
      }

      // Reset the values
      ids = (newLen) ? newIds.slice(0) : [];
      len = newLen;
      index = newIndex;
    };
    Object.freeze(this.reset);

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.move)
     * -----------------------------------------------
     * @desc Go to the prev, next, or a specific index.
     * @param {(string|number)} way - The location to move the index.
     *   The options are 'prev', 'next', or a question id.
     * @return {num} The new index.
     */
    this.move = function(way) {

      // Debugging vars
      var errorMsg, failCheck;
      this.debug.start('move', way);
      this.debug.args('move', way, 'string|number');
      // Error message for initial value checks
      errorMsg = 'Error: An incorrect value was given for way. way= $$';

      /**
       * @type {string}
       * private
       */
      var view;
      /**
       * @type {num}
       * private
       */
      var last;

      // Check the value for way
      if (typeof way === 'string' &&
          way !== 'prev' && way !== 'next') {
        way = way.replace(/[^0-9]/g, '');
        this.debug.fail('move', !!way, errorMsg, way);
        way = Number(way);
      }

      if (typeof way !== 'string') {
        failCheck = (way > 0 && way <= app.questions.len);
        this.debug.fail('move', failCheck, errorMsg, way);
      }

      // Save the value of the current view
      view = app.searchBar.vals.view;

      if (typeof way === 'number') {
        if (view !== 'one') {
          app.searchBar.vals.view = 'one';
        }
        index = ids.indexOf(way);
        this.debug.fail('move', (index !== -1), errorMsg, way);
        return index;
      }

      errorMsg = 'Error: This method should not have been called now. ';
      errorMsg += 'The nav elements should be hidden.';

      // Save the last index
      last = len - 1;

      // The single view actions
      if (view === 'one') {

        this.debug.fail('move', (len > 1), errorMsg);

        if (way === 'prev') {
          index = (index === 0) ? last : --index;
        }
        else if (way === 'next') {
          index = (index === last) ? 0 : ++index;
        }

        return index;
      }

      // The ten view actions
      if (view === 'ten') {

        this.debug.fail('move', (len > 10), errorMsg);

        // Update the last index
        last -= (last % 10);

        if (way === 'prev') {
          index = (index === 0) ? last : (index - 10);
        }
        else if (way === 'next') {
          index = (index === last) ? 0 : (index + 10);
        }

        return index;
      }

      errorMsg = 'Error: An incorrect view was parsed. ';
      errorMsg += 'app.searchBar.vals.view= $$';
      this.debug.fail('move', false, errorMsg, view);
    };
    Object.freeze(this.move);


    // Setup the properties
    ids = new Array(quesLen);
    len = quesLen;
    index = 0;

    i = quesLen;
    while (i--) {
      ids[i] = i + 1;
    }
  };

  // Ensure constructor is set to this class.
  AppVals.prototype.constructor = AppVals;


/* -----------------------------------------------------------------------------
 * | The Config Class                                                          |
 * v ------------------------------------------------------------------------- v
                                                   classes/config/config.js */
  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {?Object} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (Config.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Config class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Config',
      turnOnDebuggers: 'args fail'
    });

    this.debug.group('init', 'coll', 'config= $$', config);
    this.debug.start('init', config);

    /**
     * ----------------------------------------------- 
     * Public Property (Config.searchBar)
     * -----------------------------------------------
     * @desc The search bar's configuration settings.
     * @type {SearchBarConfig}
     * @struct
     */
    this.searchBar;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.questions)
     * -----------------------------------------------
     * @desc The question's formatting settings.
     * @type {QuestionsConfig}
     * @struct
     */
    this.questions;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.prettifier)
     * -----------------------------------------------
     * @desc The prettifier's settings.
     * @type {PrettyConfig}
     * @struct
     */
    this.prettifier;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.url)
     * -----------------------------------------------
     * @desc Whether to create formatted urls for the questions.
     * @type {UrlConfig}
     */
    this.url;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.links)
     * -----------------------------------------------
     * @desc Whether to display search links for each question.
     * @type {LinksConfig}
     */
    this.links;


    // Check the user config settings
    if (!config || typeof config !== 'object') {
      config = {};
    }

    if (!config.searchSettings || typeof config.searchSettings !== 'object') {
      config.searchSettings = {};
    }
    if (!config.questionFormat || typeof config.questionFormat !== 'object') {
      config.questionFormat = {};
    }
    if (!config.prettifyFormat || typeof config.prettifyFormat !== 'object') {
      config.prettifyFormat = {};
    }
    if (!config.showURL || typeof config.showURL !== 'object') {
      if (!!config.showUrl && typeof config.showUrl === 'object') {
        config.showURL = config.showUrl;
      }
      else {
        config.showURL = {};
      }
    }
    if (!config.showLinks || typeof config.showLinks !== 'object') {
      config.showLinks = {};
    }

    // Setup the properties
    this.searchBar  = new SearchBarConfig(config.searchSettings);
    this.questions  = new QuestionsConfig(config.questionFormat);
    this.prettifier = new PrettyConfig(config.prettifyFormat);
    this.url        = new UrlConfig(config.showURL);
    this.links      = new LinksConfig(config.showLinks);

    Object.freeze(this.searchBar);
    Object.freeze(this.questions);
    Object.freeze(this.prettifier);
    Object.freeze(this.url);
    Object.freeze(this.links);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Config.prototype.constructor = Config;


/* -----------------------------------------------------------------------------
 * | The Search Bar Config Class                                               |
 * v ------------------------------------------------------------------------- v
                                        classes/config/search-bar-config.js */
  /**
   * -----------------------------------------------------
   * Public Class (SearchBarConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the search bar in this app.
   * @param {Object} config - The user's search bar config settings.
   * @constructor
   */
  var SearchBarConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (SearchBarConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the SearchBarConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug('SearchBarConfig');

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.stage)
     * -----------------------------------------------
     * @desc Whether to display the stage search option.
     * @type {boolean}
     * @private
     */
    var stage;

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.source)
     * -----------------------------------------------
     * @desc Whether to display the source search option.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.category)
     * -----------------------------------------------
     * @desc Whether to display the category search option.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.subCat)
     * -----------------------------------------------
     * @desc Whether to display the sub category search option.
     * @type {boolean}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.defaults)
     * -----------------------------------------------
     * @desc The default search options to display upon app init.
     * @type {DefaultsSearchBarConfig}
     */
    this.defaults;

    /**
     * ----------------------------------------------- 
     * Public Method (SearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var settings = {
        stage   : stage,
        source  : source,
        category: category,
        subCat  : subCat
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Setup the properties
    stage    = true;
    source   = true;
    category = true;
    subCat   = true;

    if (config.hasOwnProperty('stage') && config.stage === false) {
      stage = false;
    }
    if (config.hasOwnProperty('source') && config.source === false) {
      source = false;
    }
    if (config.hasOwnProperty('category') && config.category === false) {
      category = false;
    }
    if (config.hasOwnProperty('subCat') && config.subCat === false) {
      subCat = false;
    }

    this.defaults = new DefaultsSearchBarConfig();
    Object.freeze(this.defaults);
  };

  // Ensure constructor is set to this class.
  SearchBarConfig.prototype.constructor = SearchBarConfig;


/* -----------------------------------------------------------------------------
 * | The Defaults Search Bar Config Class                                      |
 * v ------------------------------------------------------------------------- v
                               classes/config/defaults-search-bar-config.js */
  /**
   * -----------------------------------------------------
   * Public Class (DefaultsSearchBarConfig)
   * -----------------------------------------------------
   * @desc The onLoad search defaults for this app.
   * @constructor
   */
  var DefaultsSearchBarConfig = function() {

    /**
     * ---------------------------------------------------
     * Public Property (DefaultsSearchBarConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the DefaultsSearchBarConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'DefaultsSearchBarConfig',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init');

    /**
     * ---------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.startID)
     * ---------------------------------------------------
     * @desc The first question to display.
     * @type {number}
     * @private
     */
    var startID;

    /**
     * ----------------------------------------------- 
     * Protected Property (DefaultsSearchBarConfig.view)
     * -----------------------------------------------
     * @desc The search view option to load the app with.
     * @type {string}
     * @private
     */
    var view;

    /**
     * ------------------------------------------------- 
     * Protected Property (DefaultsSearchBarConfig.order)
     * -------------------------------------------------
     * @desc The search order option to load the app with.
     * @type {string}
     * @private
     */
    var order;

    /**
     * ------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.stage)
     * ------------------------------------------------
     * @desc The search stage option to load the app with.
     * @type {string}
     * @private
     */
    var stage;

    /**
     * ------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.source)
     * ------------------------------------------------
     * @desc The search source option to load the app with.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ---------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.mainCat)
     * ---------------------------------------------------
     * @desc The search main category option to load the app with.
     * @type {string}
     * @private
     */
    var mainCat;

    /**
     * -------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.subCat)
     * -------------------------------------------------
     * @desc The search sub category option to load the app with.
     * @type {string}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {(string|number)}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (string|number)>} */
      var settings = {
        startID: startID,
        view   : view,
        order  : order,
        stage  : stage,
        source : source,
        mainCat: mainCat,
        subCat : subCat
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.set)
     * -----------------------------------------------
     * @desc Sets a config setting.
     * @param {string} prop - The name of the setting to set.
     * @param {(string|number)} val - The value to set the
     *   property to.
     */
    this.set = function(prop, val) {

      // Debugging vars
      var errorMsg;
      this.debug.start('set', prop, val);
      this.debug.args('set', prop, 'string', val, 'string|number');

      /** @private */
      var settings = {
        startID: function() { startID = val; },
        view   : function() { view    = val; },
        order  : function() { order   = val; },
        stage  : function() { stage   = val; },
        source : function() { source  = val; },
        mainCat: function() { mainCat = val; },
        subCat : function() { subCat  = val; }
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('set', settings.hasOwnProperty(prop), errorMsg, prop);

      settings[prop]();
    };
    Object.freeze(this.set);


    // Setup the properties
    startID = 0;
    view    = 'one';
    order   = 'asc';
    stage   = 'all';
    source  = 'all';
    mainCat = 'all';
    subCat  = 'all';
  };

  // Ensure constructor is set to this class.
  DefaultsSearchBarConfig.prototype.constructor = DefaultsSearchBarConfig;

  /**
   * ---------------------------------------------------------
   * Public Method (DefaultsSearchBarConfig.prototype.update)
   * ---------------------------------------------------------
   * @desc Sets the search defaults to the user's settings.
   * @param {Object} defaults - The user's search defaults.
   * @param {Object} names - The available search ids and names.
   * @param {Object} ids - The available sub category ids.
   * @param {number} quesLen - The number of user's questions.
   */
  DefaultsSearchBarConfig.prototype.update = function(defaults, names,
                                                      ids, quesLen) {
    // Debugging vars
    var args;
    this.debug.start('update', defaults, names, ids, quesLen);
    args = [ 'update' ];
    args.push(defaults, 'object', names, 'object');
    args.push(ids, 'object', quesLen, 'number');
    this.debug.args(args);

    // Check the user supplied defaults
    if (!defaults || typeof defaults !== 'object') {
      defaults = {};
    }

    // Set the startID
    if (!!defaults.startID && typeof defaults.startID === 'number' &&
        defaults.startID <= quesLen) {
      this.set('startID', defaults.startID);
    }

    // Set the view
    if (!!defaults.view && typeof defaults.view === 'string' &&
        !!names.view[defaults.view]) {
      this.set('view', defaults.view);
    }

    // Set the order
    if (!!defaults.order && typeof defaults.order === 'string' &&
        !!names.order[defaults.order]) {
      this.set('order', defaults.order);
    }

    // Set the stage
    if (!!defaults.stage && typeof defaults.stage === 'string' &&
        !!names.stage[defaults.stage]) {
      this.set('stage', defaults.stage);
    }

    // Set the source
    if (!!defaults.source && typeof defaults.source === 'string' &&
        !!names.source[defaults.source]) {
      this.set('source', defaults.source);
    }

    // Set the main category
    if (!!defaults.mainCat && typeof defaults.mainCat === 'string' &&
        !!names.mainCat[defaults.mainCat]) {
      this.set('mainCat', defaults.mainCat);
    }

    // Set the sub category
    if (!!defaults.subCat && typeof defaults.subCat === 'string' &&
        defaults.subCat !== 'all' && !!names.subCat[defaults.subCat]) {
      if (this.get('mainCat') === 'all') {
        this.set('subCat', defaults.subCat);
      }
      else {
        if (ids.subCat[this.get('mainCat')].indexOf(defaults.subCat) !== -1) {
          this.set('subCat', defaults.subCat);
        }
      }
    }
  };


/* -----------------------------------------------------------------------------
 * | The Questions Config Class                                                |
 * v ------------------------------------------------------------------------- v
                                         classes/config/questions-config.js */
  /**
   * -----------------------------------------------------
   * Public Class (QuestionsConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for formatting questions in this app.
   * @param {Object} config - The user's question format config settings.
   * @constructor
   */
  var QuestionsConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (QuestionsConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the QuestionsConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug('QuestionsConfig');

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.id)
     * -----------------------------------------------
     * @desc Whether to display any question's id.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.complete)
     * -----------------------------------------------
     * @desc Whether to display any question's completion status.
     * @type {boolean}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.source)
     * -----------------------------------------------
     * @desc Whether to display any question's source.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.category)
     * -----------------------------------------------
     * @desc Whether to display any question's categories.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.subCat)
     * -----------------------------------------------
     * @desc Whether to display any question's sub categories.
     * @type {boolean}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.links)
     * -----------------------------------------------
     * @desc Whether to display any question's links.
     * @type {boolean}
     * @private
     */
    var links;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.problem)
     * -----------------------------------------------
     * @desc Whether to display any question's problem.
     * @type {boolean}
     * @private
     */
    var problem;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.descr)
     * -----------------------------------------------
     * @desc Whether to display any question's description.
     * @type {boolean}
     * @private
     */
    var descr;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.output)
     * -----------------------------------------------
     * @desc Whether to display the solution's output for any question.
     * @type {boolean}
     * @private
     */
    var output;

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionsConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var settings = {
        id      : id,
        complete: complete,
        source  : source,
        category: category,
        subCat  : subCat,
        links   : links,
        problem : problem,
        descr   : descr,
        output  : output
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Setup the properties
    id       = true;
    complete = true;
    source   = true;
    category = true;
    subCat   = true;
    links    = true;
    problem  = true;
    descr    = false;
    output   = true;

    if (config.hasOwnProperty('id') && config.id === false) {
      id = false;
    }
    if (config.hasOwnProperty('complete') && config.complete === false) {
      complete = false;
    }
    if (config.hasOwnProperty('source') && config.source === false) {
      source = false;
    }
    if (config.hasOwnProperty('category') && config.category === false) {
      category = false;
    }
    if (config.hasOwnProperty('subCat') && config.subCat === false) {
      subCat = false;
    }
    if (config.hasOwnProperty('links') && config.links === false) {
      links = false;
    }
    if (config.hasOwnProperty('problem') && config.problem === false) {
      problem = false;
    }
    if (config.hasOwnProperty('descr') && config.descr === true) {
      descr = true;
    }
    if (config.hasOwnProperty('output') && config.output === false) {
      output = false;
    }
  };

  // Ensure constructor is set to this class.
  QuestionsConfig.prototype.constructor = QuestionsConfig;


/* -----------------------------------------------------------------------------
 * | The Pretty Config Class                                                   |
 * v ------------------------------------------------------------------------- v
                                            classes/config/pretty-config.js */
  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {Object<string, (string|num|boolean)>} config - The user's
   *   prettifier config settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (PrettyConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the PrettyConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug('PrettyConfig');

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

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

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {(number|boolean)}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (number|boolean)>} */
      var settings = {
        trimSpace   : trimSpace,
        tabLength   : tabLength,
        commentLinks: commentLinks
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Setup the properties
    trimSpace = 0;
    tabLength = 2;
    commentLinks = false;

    if ( config.hasOwnProperty('trimSpace') ) {
      if (typeof config.trimSpace === 'number' && config.trimSpace >= 0) {
        trimSpace = Math.floor(config.trimSpace);
      }
      else if (typeof config.trimSpace === 'string') {
        trimSpace = Number( config.trimSpace.replace(/[^0-9]/g, '') );
      }
    }
    if ( config.hasOwnProperty('tabLength') ) {
      if (typeof config.tabLength === 'number') {
        tabLength = config.tabLength;
      }
      else if (typeof config.tabLength === 'string') {
        tabLength = Number( config.tabLength.replace(/[^0-9]/g, '') );
      }
    }
    if (config.hasOwnProperty('commentLinks') && config.commentLinks === true) {
      commentLinks = true;
    }
  };

  // Ensure constructor is set to this class.
  PrettyConfig.prototype.constructor = PrettyConfig;


/* -----------------------------------------------------------------------------
 * | The URL Config Class                                                      |
 * v ------------------------------------------------------------------------- v
                                               classes/config/url-config.js */
  /**
   * -----------------------------------------------------
   * Public Class (UrlConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for creating urls for the questions.
   * @param {Object} config - The user's config settings for url searches.
   * @constructor
   */
  var UrlConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (UrlConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the UrlConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug('UrlConfig');

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

    /**
     * ----------------------------------------------- 
     * Protected Property (UrlConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option in the url.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (UrlConfig.category)
     * -----------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Public Method (UrlConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var settings = {
        id      : id,
        category: category
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Set the properties
    id       = false;
    category = false;

    if (config.hasOwnProperty('id') && config.id === true) {
      id = true;
    }
    if (config.hasOwnProperty('category') && config.category === true) {
      category = true;
    }
  };

  // Ensure constructor is set to this class.
  UrlConfig.prototype.constructor = UrlConfig;


/* -----------------------------------------------------------------------------
 * | The Links Config Class                                                    |
 * v ------------------------------------------------------------------------- v
                                             classes/config/links-config.js */
  /**
   * -----------------------------------------------------
   * Public Class (LinksConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for whether to show search links for
   *   portions of each question.
   * @param {Object} config - The user's config settings for search link
   *   formatting.
   * @constructor
   */
  var LinksConfig = function(config) {

    /**
     * ---------------------------------------------------
     * Public Property (LinksConfig.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the LinksConfig class.
     * @type {Debug}
     */
    this.debug = aIV.debug('LinksConfig');

    this.debug.start('init', config);
    this.debug.args('init', config, 'object');

    /**
     * ----------------------------------------------- 
     * Protected Property (LinksConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option for every question.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ------------------------------------------------- 
     * Protected Property (LinksConfig.source)
     * -------------------------------------------------
     * @desc Whether to display a source search option for every question.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------------
     * Protected Property (LinksConfig.category)
     * ----------------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Public Method (LinksConfig.get)
     * -----------------------------------------------
     * @desc Gets a config setting.
     * @param {string} prop - The name of the setting to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var settings = {
        id      : id,
        source  : source,
        category: category
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', settings.hasOwnProperty(prop), errorMsg, prop);

      return settings[prop];
    };
    Object.freeze(this.get);


    // Set the properties
    id       = true;
    source   = false;
    category = true;

    if (config.hasOwnProperty('id') && config.id === false) {
      id = false;
    }
    if (config.hasOwnProperty('source') && config.source === true) {
      source = true;
    }
    if (config.hasOwnProperty('category') && config.category === false) {
      category = false;
    }
  };

  // Ensure constructor is set to this class.
  LinksConfig.prototype.constructor = LinksConfig;


/* -----------------------------------------------------------------------------
 * | The Sources Class                                                         |
 * v ------------------------------------------------------------------------- v
                                                         classes/sources.js */
  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?stringMap} sources - The user's sources.
   * @constructor
   */
  var Sources = function(sources) {

    /**
     * ---------------------------------------------------
     * Public Property (Sources.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Sources class.
     * @type {Debug}
     */
    this.debug = aIV.debug('Sources');

    this.debug.group('init', 'coll', 'sources= $$', sources);
    this.debug.start('init', sources);
    this.debug.args('init', sources, 'stringMap');

    /**
     * ----------------------------------------------- 
     * Protected Property (Sources.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the source objects using the ids as keys.
     * @type {Object<string, Source>}
     * @private
     */
    var data;

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the source ids in alphabetical order.
     * @type {strings}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.len)
     * -----------------------------------------------
     * @desc Saves the count of sources.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Method (Sources.get)
     * -----------------------------------------------
     * @desc Get a source object or property.
     * @param {string} id - The source id to get.
     * @param {string=} prop - If only one property is desired
     *   state it here.
     * @return {(Source|string|nums)}
     */
    this.get = function(id, prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', id, prop);
      this.debug.args('get', id, 'string', prop, 'string=');

      errorMsg = 'Error: The given source does not exist. sourceID= $$';
      this.debug.fail('get', data.hasOwnProperty(id), errorMsg, id);

      return (!!prop) ? data[id].get(prop) : data[id];
    };
    Object.freeze(this.get);


    // Check the argument data types
    if ( !checkType(sources, '!stringMap') ) {
      sources = {};
    }

    // Setup the properties
    this.ids = Object.keys(sources);
    this.len = this.ids.length;
    data = {};

    if (this.len) {

      // Sort the ids
      this.ids = sortKeys(this.ids, sources);

      // Build the hash map
      this.ids.forEach(function(/** string */ id) {
        data[id] = new Source(sources[id]);
      });
    }

    Object.freeze(this.ids);
    Object.freeze(data);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Sources.prototype.constructor = Sources;


/* -----------------------------------------------------------------------------
 * | The Source Class                                                          |
 * v ------------------------------------------------------------------------- v
                                                          classes/source.js */
  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc An object containing the details of a source.
   * @param {string} name - The source's name.
   * @constructor
   */
  var Source = function(name) {

    /**
     * ---------------------------------------------------
     * Public Property (Source.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Source class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Source',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', name);
    this.debug.args('init', name, 'string');

    /**
     * ----------------------------------------------- 
     * Protected Property (Source.url)
     * -----------------------------------------------
     * @desc The source's url name.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Source.ids)
     * -----------------------------------------------
     * @desc The ids of the questions containing this source.
     * @type {nums}
     * @private
     */
    var ids;

    /**
     * ----------------------------------------------- 
     * Public Method (Source.get)
     * -----------------------------------------------
     * @desc Gets a detail for the source.
     * @param {string} prop - The name of the property to get.
     * @return {(string|nums)}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, function>} */
      var source = {
        name: function() { return name; },
        url : function() { return url; },
        ids : function() {
          return Object.freeze( ids.slice(0) );
        }
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', source.hasOwnProperty(prop), errorMsg, prop);

      return source[prop]();
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (Source.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this source.
     * @param {number} id - The index to add.
     */
    this.addId = function(id) {

      this.debug.start('addId', id);
      this.debug.args('addId', id, 'number');

      if (typeof id === 'number' && id > 0) {
        ids.push(id);
      }
    };
    Object.freeze(this.addId);


    // Setup the properties
    if (!name || typeof name !== 'string') {
      name = '';
      url  = '';
    }
    else {
      url = name.toLowerCase();
      url = url.replace(/[^0-9a-z\-\s]/g, '');
      url = url.replace(/\s/g, '-');
    }
    ids = [];
  };

  // Ensure constructor is set to this class.
  Source.prototype.constructor = Source;


/* -----------------------------------------------------------------------------
 * | The Categories Class                                                      |
 * v ------------------------------------------------------------------------- v
                                                      classes/categories.js */
  /**
   * -----------------------------------------------------
   * Public Class (Categories)
   * -----------------------------------------------------
   * @desc The available categories for each question.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @constructor
   */
  var Categories = function(categories) {

    /** @type {strings} */
    var subIds;

    /**
     * ---------------------------------------------------
     * Public Property (Categories.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Categories class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Categories',
      turnOnDebuggers: 'args fail'
    });

    this.debug.group('init', 'coll', 'categories= $$', categories);
    this.debug.start('init', categories);
    this.debug.args('init', categories, 'objectMap|stringMap');

    /**
     * ----------------------------------------------- 
     * Protected Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the category objects using the ids as keys.
     * @type {Object<string, Category>}
     * @private
     */
    var data;

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the main category ids in alphabetical order.
     * @type {strings}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.len)
     * -----------------------------------------------
     * @desc Saves the count of main categories.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.get)
     * -----------------------------------------------
     * @desc Get a category object or property.
     * @param {string} id - The category id to get.
     * @param {string=} prop - If only one property is desired
     *   state it here.
     * @return {(Category|string|nums)}
     */
    this.get = function(id, prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', id, prop);
      this.debug.args('get', id, 'string', prop, 'string=');

      errorMsg = 'Error: The given category does not exist. catID= $$';
      this.debug.fail('get', data.hasOwnProperty(id), errorMsg, id);

      return ( ( !data.hasOwnProperty(id) ) ?
        false : (!!prop) ?
          data[id].get(prop) : data[id]
      );
    };
    Object.freeze(this.get);


    // Check the argument data types
    if ( checkType(categories, '!stringMap') ) {
      categories = {
        main: categories,
        sub : {}
      };
    }
    else {
      if (!categories) {
        categories = {};
      }
      if (!categories.main || !checkType(categories.main, '!stringMap')) {
        categories.main = {};
      }
      if (!categories.sub || !checkType(categories.sub, '!objectMap')) {
        categories.sub = {};
      }
    }

    // Setup the properties
    this.ids = Object.keys(categories.main);
    this.len = this.ids.length;
    data = {};

    if (this.len) {

      // Sort the main category ids
      this.ids = sortKeys(this.ids, categories.main);

      // Build the hash map
      this.ids.forEach(function(/** string */ mainId) {

        // Save and sort the sub category ids if they exist
        subIds = null;
        if ( categories.sub.hasOwnProperty(mainId) ) {
          subIds = Object.keys(categories.sub[ mainId ]);
          if (subIds && subIds.length) {
            subIds = sortKeys(subIds, categories.sub[ mainId ]);
          }
        }

        // Add main category to the hash map
        data[ mainId ] = new Category(categories.main[ mainId ], subIds);
        Object.freeze(data[ mainId ]);

        // Add the sub categories to the hash map
        if (subIds && subIds.length) {
          subIds.forEach(function(/** string */ subId) {
            data[ subId ] = new Category(categories.sub[ mainId ][ subId ]);
            Object.freeze(data[ subId ]);
          });
        } 
      });
    }

    Object.freeze(this.ids);
    Object.freeze(data);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Categories.prototype.constructor = Categories;


/* -----------------------------------------------------------------------------
 * | The Category Class                                                        |
 * v ------------------------------------------------------------------------- v
                                                        classes/category.js */
  /**
   * -----------------------------------------------------
   * Public Class (Category)
   * -----------------------------------------------------
   * @desc An object containing the details of a category.
   * @param {string} name - The name of the category.
   * @param {?strings=} subs - This category's sub ids if they exist.
   *   If null then category is a sub category.
   * @constructor
   */
  var Category = function(name, subs) {

    /**
     * ---------------------------------------------------
     * Public Property (Category.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Category class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Category',
      turnOnDebuggers: 'args fail'
    });

    this.debug.start('init', name, subs);
    this.debug.args('init', name, 'string', subs, 'strings=');

    /**
     * ----------------------------------------------- 
     * Protected Property (Category.url)
     * -----------------------------------------------
     * @desc The url name for this category.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Category.ids)
     * -----------------------------------------------
     * @desc The ids of the questions containing this category.
     * @type {nums}
     * @private
     */
    var ids;

    /**
     * ----------------------------------------------- 
     * Public Method (Category.get)
     * -----------------------------------------------
     * @desc Gets a property from the category.
     * @param {string} prop - The name of the detail to get.
     * @return {(string|nums)}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, function>} */
      var category = {
        name: function() { return name; },
        url : function() { return url; },
        ids : function() {
          return Object.freeze( ids.slice(0) );
        },
        subs: function() { return subs; }
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', category.hasOwnProperty(prop), errorMsg, prop);

      return category[prop]();
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (Category.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this category.
     * @param {number} id - The id to add.
     */
    this.addId = function(id) {

      this.debug.start('addId', id);
      this.debug.args('addId', id, 'number');

      if (typeof id === 'number' && id > 0) {
        ids.push(id);
      }
    };
    Object.freeze(this.addId);


    // Setup the properties
    if (!name || typeof name !== 'string') {
      name = '';
      url  = '';
    }
    else {
      url = name.toLowerCase();
      url = url.replace(/[^0-9a-z\-\s]/g, '');
      url = url.replace(/\s/g, '-');
    }
    ids = [];
    subs = (!!subs) ? Object.freeze(subs) : null;
  };

  // Ensure constructor is set to this class.
  Category.prototype.constructor = Category;


/* -----------------------------------------------------------------------------
 * | The Search Bar Class                                                      |
 * v ------------------------------------------------------------------------- v
                                                      classes/search-bar.js */
  /**
   * -----------------------------------------------------
   * Public Class (SearchBar)
   * -----------------------------------------------------
   * @desc The search bar's values and elements for this app.
   * @todo Break this class down into smaller pieces with appropriate
   *   getters and setters.
   * @param {booleanMap} config - The app's search bar config settings.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var SearchBar = function(config, sources, categories) {

    /** @type {boolean} */
    var pass;

    /**
     * ---------------------------------------------------
     * Public Property (SearchBar.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the SearchBar class.
     * @type {Debug}
     */
    this.debug = aIV.debug('SearchBar');

    // Debugging vars
    var msg, args;
    msg = 'config= $$, sources= $$, categories= $$';
    this.debug.group('init', 'coll', msg, config, sources, categories);
    this.debug.start('init', config, sources, categories);
    args = [ 'init' ];
    args.push(config, 'booleanMap', sources, 'object', categories, 'object');
    this.debug.args(args);

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.names)
     * -----------------------------------------------
     * @desc The hash map of the search bar's ids and names.
     * @type {{
     *   view   : stringMap,
     *   order  : stringMap,
     *   stage  : stringMap,
     *   source : stringMap,
     *   mainCat: stringMap,
     *   subCat : stringMap
     * }}
     */
    this.names;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ids)
     * -----------------------------------------------
     * @desc The search bar's ids in order of appearance.
     * @type {{
     *   view   : strings,
     *   order  : strings,
     *   stage  : strings,
     *   source : strings,
     *   mainCat: strings,
     *   subCat : Object<string, strings>
     * }}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ques)
     * -----------------------------------------------
     * @desc The question ids matching the search property values.
     * @type {{
     *   stage: Object<string, nums>
     * }}
     */
    this.ques;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.vals)
     * -----------------------------------------------
     * @desc The current selected values.
     * @type {{
     *   view   : string,
     *   order  : string,
     *   stage  : string,
     *   source : string,
     *   mainCat: string,
     *   subCat : string
     * }}
     * @dict
     */
    this.vals;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.elems)
     * -----------------------------------------------
     * @desc The select HTMLELements.
     * @type {{
     *   view   : elem,
     *   order  : elem,
     *   stage  : ?elem,
     *   source : ?elem,
     *   mainCat: ?elem,
     *   subCat : ?elem
     * }}
     * @dict
     */
    this.elems;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.opts)
     * -----------------------------------------------
     * @desc The option elements for the search bar.
     * @type {{
     *   view   : elems,
     *   order  : elems,
     *   stage  : elems,
     *   source : elems,
     *   mainCat: elems,
     *   subCat : Object<string, elems>
     * }}
     */
    this.opts;


    // Setup the names, ids, and opts properties
    this.names = {
      view: {
        'one': 'View One',
        'ten': 'View Ten',
        'all': 'View All'
      },
      order: {
        'asc' : 'ASC',
        'desc': 'DESC'
      },
      stage: {
        'all': 'All Stages',
        'com': 'Completed',
        'inc': 'Incomplete'
      },
      source: {
        'all': 'All Sources'
      },
      mainCat: {
        'all': 'All Main Categories'
      },
      subCat: {
        'all': 'All Sub Categories'
      }
    };
    this.ids = {
      view   : [ 'one','ten','all' ],
      order  : [ 'asc','desc' ],
      stage  : [ 'all','com','inc' ],
      source : sources.ids.slice(0),
      mainCat: categories.ids.slice(0),
      subCat : {}
    };
    this.ids.source.unshift('all');
    this.ids.mainCat.unshift('all');
    this.opts = {
      view   : [],
      order  : [],
      stage  : [],
      source : [],
      mainCat: [],
      subCat : {
        'all': []
      }
    };

    this.debug.state('init', 'sources.ids= $$', sources.ids);
    this.debug.state('init', 'this.ids= $$', this.ids);
    this.debug.state('init', 'this.ids.source= $$', this.ids.source);

    // Add the source names
    if (sources.len) {
      sources.ids.forEach(function(/** string */ sourceId) {
        this.names.source[ sourceId ] = sources.get(sourceId, 'name');
      }, this);
    }

    // Add category names and ids
    if (categories.len) {

      categories.ids.forEach(function(/** string */ mainId) {
        /** @type {Category} */
        var mainCat;
        /** @type {strings} */
        var subs;

        // Add the main category names
        mainCat = categories.get(mainId);
        this.names.mainCat[ mainId ] = mainCat.get('name');

        // Add the sub categories names and ids
        subs = mainCat.get('subs');
        if (subs && subs.length) {
          this.ids.subCat[ mainId ] = subs.slice(0);
          this.ids.subCat[ mainId ].unshift('all');
          this.opts.subCat[ mainId ] = [];
          subs.forEach(function(/** string */ subId) {
            this.names.subCat[ subId ] = categories.get(subId, 'name');
          }, this);
        }
      }, this);
    }

    Object.freeze(this.names);
    Object.freeze(this.ids);
    Object.freeze(this.opts);

    // Setup the question ids property
    this.ques = {};
    this.ques.stage = {};
    this.ques.stage.com = [];
    this.ques.stage.inc = [];

    Object.freeze(this.ques.stage);
    Object.freeze(this.ques);

    // Setup the current values property
    this.vals = {
      view   : 'one',
      order  : 'asc',
      stage  : 'all',
      source : 'all',
      mainCat: 'all',
      subCat : 'all'
    };

    // Setup the select elements property
    this.elems = {};
    this.elems.view = document.createElement('select');
    this.elems.order = document.createElement('select');
    this.elems.stage = ( (config.stage) ?
      document.createElement('select') : null
    );
    this.elems.source = ( (config.source && sources.len) ?
      document.createElement('select') : null
    );
    this.elems.mainCat = ( (config.category && categories.len) ?
      document.createElement('select') : null
    );
    pass = (this.elems.mainCat && config.subCat);
    pass = pass && categories.ids.some(function(/** string */ id) {
      return !!this.ids.subCat[id];
    }, this);
    this.elems.subCat = ( (pass) ?
      document.createElement('select') : null
    );

    Object.freeze(this.elems);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  SearchBar.prototype.constructor = SearchBar;

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setToDefaults)
   * -----------------------------------------------------
   * @desc Updates the current search bar's values to the defaults.
   * @param {Object} defaults - The default values.
   */
  SearchBar.prototype.setToDefaults = function(defaults) {

    this.debug.start('setToDefaults', defaults);
    this.debug.args('setToDefaults', defaults, 'object');

    this.vals.view    = defaults.get('view');
    this.vals.order   = defaults.get('order');
    this.vals.stage   = defaults.get('stage');
    this.vals.source  = defaults.get('source');
    this.vals.mainCat = defaults.get('mainCat');
    this.vals.subCat  = defaults.get('subCat');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setMainElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's select elements.
   * @type {function()}
   */
  SearchBar.prototype.setMainElems = function() {

    this.debug.group('setMainElems', 'coll');
    this.debug.start('setMainElems');

    /** @type {boolean} */
    var pass;

    // Set view search element
    this.elems.view.id = 'aIV-view';
    this.elems.view.className = 'showView';
    this.elems.view.value = this.vals.view;
    this.elems.view.onchange = function(event) {
      /** @type {string} */
      var oldVal;

      if (app.searchBar.vals.view != event.target.value) {
        events.debug.group('searchBar.view.onchange', 'coll');

        oldVal = app.searchBar.vals.view;
        app.searchBar.vals.view = event.target.value;
        app.updateDisplay({
          noVals: true,
          reset : true,
          oldVal: oldVal
        });

        events.debug.group('searchBar.view.onchange', 'end');
      }
    };

    // Set order search element
    this.elems.order.id = 'aIV-order';
    this.elems.order.className = 'showOrder';
    this.elems.order.value = this.vals.order;
    this.elems.order.onchange = function(event) {

      if (app.searchBar.vals.order != event.target.value) {
        events.debug.group('searchBar.order.onchange', 'coll');

        app.searchBar.vals.order = event.target.value;
        app.updateDisplay({
          noVals: true,
          reset : true,
          flip  : true,
          index : true
        });

        events.debug.group('searchBar.order.onchange', 'end');
      }
    };

    // Set stage search element
    if (this.elems.stage) {
      this.elems.stage.id = 'aIV-stage';
      this.elems.stage.className = 'showStage';
      this.elems.stage.value = this.vals.stage;
      this.elems.stage.onchange = function(event) {

        if (app.searchBar.vals.stage != event.target.value) {
          events.debug.group('searchBar.stage.onchange', 'coll');

          app.searchBar.vals.stage = event.target.value;
          app.updateDisplay();

          events.debug.group('searchBar.stage.onchange', 'end');
        }
      };
    }

    // Set source search element
    if (this.elems.source) {
      this.elems.source.id = 'aIV-source';
      this.elems.source.className = 'showSource';
      this.elems.source.value = this.vals.source;
      this.elems.source.onchange = function(event) {

        if (app.searchBar.vals.source != event.target.value) {
          events.debug.group('searchBar.source.onchange', 'coll');

          app.searchBar.vals.source = event.target.value;
          app.updateDisplay();

          events.debug.group('searchBar.source.onchange', 'end');
        }
      };
    }

    // Set main category search element
    if (this.elems.mainCat) {
      this.elems.mainCat.id = 'aIV-mainCat';
      this.elems.mainCat.className = 'showMainCat';
      this.elems.mainCat.value = this.vals.mainCat;
      this.elems.mainCat.onchange = function(event) {

        if (app.searchBar.vals.mainCat != event.target.value) {
          events.debug.group('searchBar.mainCat.onchange', 'coll');

          app.searchBar.vals.mainCat = event.target.value;
          app.searchBar.updateSubCatOpts();
          app.updateDisplay();

          events.debug.group('searchBar.mainCat.onchange', 'end');
        }
      };
    }

    // Set sub category search element
    if (this.elems.subCat) {
      this.elems.subCat.id = 'aIV-subCat';
      this.elems.subCat.className = 'showSubCat';
      this.elems.subCat.value = this.vals.subCat;
      this.elems.subCat.onchange = function(event) {

        if (app.searchBar.vals.subCat != event.target.value) {
          events.debug.group('searchBar.subCat.onchange', 'coll');

          app.searchBar.vals.subCat = event.target.value;
          app.updateDisplay();

          events.debug.group('searchBar.subCat.onchange', 'end');
        }
      };
    }

    this.debug.group('setMainElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOptElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   * @type {function()}
   */
  SearchBar.prototype.setOptElems = function() {

    this.debug.group('setOptElems', 'coll');
    this.debug.start('setOptElems');

    /**
     * ---------------------------------------------------
     * Private Method (makeOptElem)
     * ---------------------------------------------------
     * @desc A helper function that creates option elements.
     * @param {string} id - The search item's id. If blank then the
     *   option is disabled.
     * @param {string} name - The search item's name.
     * @return {elem}
     * @private
     */
    var makeOptElem = function(id, name) {
      /** @type {elem} */
      var elem;

      elem = document.createElement('option');
      elem.textContent = name;
      if (id) {
        elem.value = id;
      }
      else {
        elem.disabled = true;
      }
      return elem;
    };

    // Set view search options
    this.ids.view.forEach(function(/** string */ id) {
      /** @type {string} */
      var name;
      /** @type {elem} */
      var elem;

      name = this.names.view[id];
      elem = makeOptElem(id, name);
      this.opts.view.push(elem);
      this.elems.view.appendChild(elem);
    }, this);

    // Set order search options
    this.ids.order.forEach(function(/** string */ id) {
      /** @type {string} */
      var name;
      /** @type {elem} */
      var elem;

      name = this.names.order[id];
      elem = makeOptElem(id, name);
      this.opts.order.push(elem);
      this.elems.order.appendChild(elem);
    }, this);

    // Set stage search options
    if (this.elems.stage) {
      this.ids.stage.forEach(function(/** string */ id) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        name = this.names.stage[id];
        elem = makeOptElem(id, name);
        this.opts.stage.push(elem);
        this.elems.stage.appendChild(elem);
      }, this);
    }

    // Set source search options
    if (this.elems.source) {
      this.debug.state('setOptElems', 'this.ids.source= $$', this.ids.source);
      this.ids.source.forEach(function(/** string */ id) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        name = this.names.source[id];
        elem = makeOptElem(id, name);
        this.opts.source.push(elem);
        this.elems.source.appendChild(elem);
      }, this);
    }

    // Set main category search options
    if (this.elems.mainCat) {
      this.ids.mainCat.forEach(function(/** string */ id) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        name = this.names.mainCat[id];
        elem = makeOptElem(id, name);
        this.opts.mainCat.push(elem);
        this.elems.mainCat.appendChild(elem);
      }, this);
    }

    // Set sub category search options
    if (this.elems.subCat) {
      // Create the options for each main category with subs
      Object.keys(this.ids.subCat).forEach(function(/** string */ mainId) {
        this.ids.subCat[mainId].forEach(function(/** string */ id) {
          /** @type {string} */
          var name;
          /** @type {elem} */
          var elem;

          name = this.names.subCat[id];
          elem = makeOptElem(id, name);
          this.opts.subCat[mainId].push(elem);
        }, this);
      }, this);
      // Create the options for all
      this.opts.subCat['all'].push( makeOptElem('all', this.names.subCat['all']) );
      this.ids.mainCat.forEach(function(/** string */ mainId) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        if (!!this.ids.subCat[mainId]) {

          name = this.names.mainCat[mainId];
          elem = makeOptElem('', name);
          this.opts.subCat['all'].push(elem);

          this.ids.subCat[mainId].forEach(function(/** string */ id) {
            /** @type {string} */
            var name;
            /** @type {elem} */
            var elem;

            if (id !== 'all') {
              name = this.names.subCat[id];
              elem = makeOptElem(id, name);
              this.opts.subCat['all'].push(elem);
            }
          }, this);
        }
      }, this);
      // Append the correct sub categories to the select element
      this.opts.subCat[this.vals.mainCat].forEach(function(/** elem */ elem) {
        this.elems.subCat.appendChild(elem);
      }, this);
    }

    this.debug.group('setOptElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Appends the search bar's elements to the selections root.
   * @type {function()}
   */
  SearchBar.prototype.appendElems = function() {

    this.debug.start('appendElems');

    app.elems.sel.appendChild(this.elems.view);
    app.elems.sel.appendChild(this.elems.order);
    this.elems.stage && app.elems.sel.appendChild(this.elems.stage);
    this.elems.source && app.elems.sel.appendChild(this.elems.source);
    this.elems.mainCat && app.elems.sel.appendChild(this.elems.mainCat);
    this.elems.subCat && app.elems.sel.appendChild(this.elems.subCat);
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.updateSubCatOpts)
   * -----------------------------------------------------
   * @desc Updates the children appended to the sub category select element.
   * @param {string=} val - The new value to update subCat to.
   */
  SearchBar.prototype.updateSubCatOpts = function(val) {

    this.debug.start('updateSubCatOpts', val);
    this.debug.args('updateSubCatOpts', val, 'string=');

    // Update the select value
    val = val || 'all';
    this.vals.subCat = val;
    this.elems.subCat.value = val;

    // Clear subCat's children
    while (this.elems.subCat.firstChild) {
      this.elems.subCat.removeChild(this.elems.subCat.firstChild);
    }

    // Append the new children
    this.opts.subCat[this.vals.mainCat].forEach(function(/** elem */ elem) {
      this.elems.subCat.appendChild(elem);
    }, this);
  };


/* -----------------------------------------------------------------------------
 * | The Questions Class                                                       |
 * v ------------------------------------------------------------------------- v
                                                       classes/questions.js */
  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {objects} questions - The user's questions.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var Questions = function(questions, config, sources, categories) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {number} */
    var len;
    /** @type {string} */
    var url;

    /**
     * ---------------------------------------------------
     * Public Property (Questions.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Questions class.
     * @type {Debug}
     */
    this.debug = aIV.debug('Questions');

    // Debugging vars
    var debugArgs;
    debugArgs = [ 'init', 'open' ];
    debugArgs.push('questions= $$, config= $$', questions, config);
    this.debug.group(debugArgs);
    this.debug.start('init', questions, config, sources, categories);
    debugArgs = [ 'init' ];
    debugArgs.push(questions, 'objects', config, 'booleanMap');
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {Object<string, Question>}
     */
    var data;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The number of questions supplied to this app instance.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.list)
     * -----------------------------------------------
     * @desc The array of question objects.
     * @return {questions}
     */
    this.list;

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question by id or url.
     * @param {(number|string)} id - The question id to get.
     * @return {Question}
     */
    this.get = function(id) {

      // Debugging vars
      var debugMsg, debugCheck;
      this.debug.start('get', id);
      this.debug.args('get', id, 'number|string');

      debugMsg = 'Error: This question id does not exist. id= $$';
      debugCheck = (this.list.hasOwnProperty(id) || data.hasOwnProperty(id));
      this.debug.fail('get', debugCheck, debugMsg, id);

      /** @type {Question} */
      var question;

      question = (typeof id === 'number') ? this.list[id] : data[id];

      if (debugCheck) {
        debugMsg = 'Error: This question id was not an instanceof ';
        debugMsg += 'Question. id= $$';
        debugCheck = (question instanceof Question);
        this.debug.fail('get', debugCheck, debugMsg, id);
      }

      return question;
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.setStyle)
     * -----------------------------------------------
     * @desc Sets the style for a question's element.
     * @param {!(number|string)} id - The question id to set.
     * @param {!(string|stringMap)} type - The style setting to set. If a
     *   string is given then another param with the value is required.
     *   If an object is provided then use key => value pairs as such
     *   styleType => newValue (e.g. { display: 'none' }).
     * @param {!(string|number)=} val - If the type param is a string then
     *   this is the new value for the it.
     */
    this.setStyle = function(id, type, val) {

      // Debugging vars
      var debugArgs, debugMsg, debugCheck;
      this.debug.start('setStyle', id, type, val);

      debugArgs = [ 'setStyle' ];
      debugArgs.push(id, '!number|string', type, '!string|stringMap');
      debugArgs.push(val, '!string|number=');
      this.debug.args(debugArgs);

      debugMsg = 'Error: An invalid question id was provided. id= $$';
      debugCheck = (this.list.hasOwnProperty(id) || data.hasOwnProperty(id));
      this.debug.fail('setStyle', debugCheck, debugMsg, id);

      if (typeof type === 'string') {
        debugMsg = 'Error: A third param (val) is required when the given type ';
        debugMsg += 'is a string. It should be a string or number. val= $$';
        debugArgs = [ 'setStyle' ];
        debugArgs.push(checkType(val, 'string|number'), debugMsg, val);
        this.debug.fail(debugArgs);
      }

      // Handle one type change
      if (typeof type === 'string') {

        // Replace dashes with camel case
        if ( /\-/.test(type) ) {
          type = camelCase(type);
        }

        this.get(id).elem.root.style[type] = val;
        return;
      }

      // Handle multiple type changes
      Object.keys(type).forEach(function(/** string */ key) {

        // Replace dashes with camel case
        if ( /\-/.test(key) ) {
          key = camelCase(key);
        }

        this.get(id).elem.root.style[key] = type[key];
      }, this);
    };
    Object.freeze(this.setStyle);


    // Check the argument data type
    if (!questions || !checkType(questions, '!objects')) {
      questions = [];
    }

    // Setup the len and list properties
    this.len = questions.length;
    len = this.len + 1;
    this.list = (this.len) ? new Array(len) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the questions
    --len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[id] = new Question(questions[i], id, config, sources, categories);
      Object.freeze(this.list[id]);
    }

    // Setup the data hash map
    data = {};

    ++i;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[url] = this.list[i];
      }
    }

    Object.freeze(this.list);
    Object.freeze(data);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Questions.prototype.constructor = Questions;

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addIdsToSearch)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function}
   */
  Questions.prototype.addIdsToSearch = function() {

    this.debug.group('addIdsToSearch', 'coll');
    this.debug.start('addIdsToSearch');

    /** @type {booleanMap} */
    var config;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    config = {
      stage   : app.config.searchBar.get('stage'),
      source  : app.config.searchBar.get('source'),
      category: app.config.searchBar.get('category'),
      subCat  : app.config.searchBar.get('subCat')
    };

    len = this.len + 1;
    i = 0;
    while (++i < len) {
      this.get(i).addToSearch(config);
    }

    this.debug.group('addIdsToSearch', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function()}
   */
  Questions.prototype.appendElems = function() {

    this.debug.group('appendElems', 'open');
    this.debug.start('appendElems');

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {Question} */
    var question;

    len = this.len + 1;

    i = 0;
    while (++i < len) {
      question = this.get(i);
      app.elems.ques.appendChild(question.elem.root);
      question.addElemContent();
    }

    this.debug.group('appendElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addCodeExts)
   * -----------------------------------------------------
   * @desc If overflow occurs in a question's code element it enables
   *   the auto extend button for the question.
   * @type {function}
   */
  Questions.prototype.addCodeExts = function() {

    this.debug.group('addCodeExts', 'open');
    this.debug.start('addCodeExts');

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    len = this.len + 1;

    i = 0;
    while (++i < len) {
      this.debug.group('addCodeExts', 'coll', 'questionID= $$', i);
      this.get(i).elem.addCodeExt();
      this.debug.group('addCodeExts', 'end');
    }

    this.debug.group('addCodeExts', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.reverseElems)
   * -----------------------------------------------------
   * @desc Appends each question's element to #aIV-questions in the direction
   *   of the current search order.
   * @type {function()}
   */
  Questions.prototype.reverseElems = function() {

    this.debug.start('reverseElems');

    /**
     * @type {string}
     * @private
     */
    var direction;
    /**
     * @type {Question}
     * @private
     */
    var question;
    /**
     * @type {num}
     * @private
     */
    var len;
    /**
     * @type {num}
     * @private
     */
    var i;

    direction = app.searchBar.vals.order;
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      i = 0;
      while (++i < len) {
        question = this.get(i);
        app.elems.ques.appendChild(question.elem.root);
      }
    }
    // Appends in desc order
    else {
      i = len;
      while (--i) {
        question = this.get(i);
        app.elems.ques.appendChild(question.elem.root);
      }
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.hideElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'none' for the provided questions.
   * @param {?nums} ids - The previous active question ids.
   * @param {num} index - The index of the ids to hide from view.
   * @param {string=} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    // Debugging vars
    var debugArgs, debugMsg;
    this.debug.start('hideElems', ids, index, view);
    debugArgs = [ 'hideElems' ];
    debugArgs.push(ids, 'numbers', index, 'number', view, 'string=');
    this.debug.args(debugArgs);

    /**
     * @type {num}
     * @private
     */
    var i;

    if (index === -1) {

      // No questions to hide (i.e. hide the empty message)
      if (!ids) {
        app.elems.none.style.display = 'none';
        return;
      }

      // Hide all of the provided ids
      i = ids.length;
      while (i--) {
        this.setStyle(ids[i], 'display', 'none');
      }

      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index. ids= $$';
    this.debug.fail('hideElems', (!!ids && !!ids.length), debugMsg, ids);
    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugArgs = [ 'hideElems' ];
    debugArgs.push((index > -1 && index < ids.length), debugMsg, ids, index);
    this.debug.fail(debugArgs);

    view = view || app.searchBar.vals.view;

    // Hide only the index of the provided ids
    if (view === 'one') {
      this.setStyle(ids[index], 'display', 'none');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {
      ids = ( (ids.length < (index + 11)) ?
        ids.slice(index) : ids.slice(index, (index + 11))
      );
      i = ids.length;
      while (i--) {
        this.setStyle(ids[i], 'display', 'none');
      }
      return;
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.showElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'block' for the provided questions.
   * @param {?nums} ids - The new active question ids.
   * @param {num} index - The index of the ids to show.
   */
  Questions.prototype.showElems = function(ids, index) {

    // Debugging vars
    var debugArgs, debugMsg;
    this.debug.start('showElems', ids, index);
    this.debug.args('showElems', ids, 'numbers', index, 'number');

    /**
     * @type {string}
     * @private
     */
    var view;
    /**
     * @type {num}
     * @private
     */
    var i;

    if (index === -1) {

      // No questions to show (i.e. show the empty message)
      if (!ids) {
        app.elems.none.style.display = 'block';
        return;
      }

      // Show all of the provided ids
      i = ids.length;
      while (i--) {
        this.get(ids[i]).elem.root.className = ( (i % 2) ?
          'question shade2' : 'question shade1'
        );
        this.setStyle(ids[i], 'display', 'block');
      }

      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index. ids= $$';
    this.debug.fail('showElems', (!!ids && !!ids.length), debugMsg, ids);
    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugArgs = [ 'showElems' ];
    debugArgs.push((index > -1 && index < ids.length), debugMsg, ids, index);
    this.debug.fail(debugArgs);

    view = app.searchBar.vals.view;

    // Hide only the index of the provided ids
    if (view === 'one') {
      this.get(ids[index]).elem.root.className = 'question shade1 hideLink';
      this.setStyle(ids[index], 'display', 'block');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {
      ids = ( (ids.length < (index + 11)) ?
        ids.slice(index) : ids.slice(index, (index + 11))
      );
      i = ids.length;
      while (i--) {
        this.get(ids[i]).elem.root.className = ( (i % 2) ?
          'question shade2' : 'question shade1'
        );
        this.setStyle(ids[i], 'display', 'block');
      }
      return;
    }
  };


/* -----------------------------------------------------------------------------
 * | The Question Class                                                        |
 * v ------------------------------------------------------------------------- v
                                               classes/question/question.js */
  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {Object} question - The details of a new question.
   * @param {number} id - The id for the question.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var Question = function(question, id, config, sources, categories) {

    /**
     * ---------------------------------------------------
     * Public Property (Question.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the Question class.
     * @type {Debug}
     */
    this.debug = aIV.debug({
      classTitle     : 'Question',
      turnOnDebuggers: 'args fail'
    });

    // Debugging vars
    var args;
    this.debug.group('init', 'coll', 'questionID= $$', id);
    this.debug.start('init', question, id, config, sources, categories);
    args = [ 'init', question, 'object', id, 'number', config, 'booleanMap' ];
    args.push(sources, 'object', categories, 'object');
    this.debug.args(args);

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.url)
     * -----------------------------------------------
     * @desc The url name for this question.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {boolean}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.source)
     * -----------------------------------------------
     * @desc The id for this question's source.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.mainCat)
     * -----------------------------------------------
     * @desc The ids for this question's main categories.
     * @type {strings}
     * @private
     */
    var mainCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.subCat)
     * -----------------------------------------------
     * @desc The ids for this question's sub categories.
     * @type {strings}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @type {links}
     * @private
     */
    var links;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.problem)
     * -----------------------------------------------
     * @desc This question's problem.
     * @type {string}
     * @private
     */
    var problem;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.descr)
     * -----------------------------------------------
     * @desc This question's description.
     * @type {string}
     * @private
     */
    var descr;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {string}
     * @private
     */
    var solution;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.output)
     * -----------------------------------------------
     * @desc The solution's output for this question.
     * @type {string}
     * @private
     */
    var output;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.format)
     * -----------------------------------------------
     * @desc The formatted details for the question.
     * @type {QuestionFormat}
     */
    this.format;

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question element.
     * @type {elem}
     */
    this.elem;

    /**
     * ----------------------------------------------- 
     * Public Method (Question.get)
     * -----------------------------------------------
     * @desc Gets info for a question.
     * @param {string} prop - The name of the property to get.
     * @return {val}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, val>} */
      var details = {
        id      : id,
        url     : url,
        complete: complete,
        source  : source,
        mainCat : mainCat,
        subCat  : subCat,
        links   : links,
        problem : problem,
        descr   : descr,
        solution: solution,
        output  : output
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', details.hasOwnProperty(prop), errorMsg, prop);

      return details[prop];
    };
    Object.freeze(this.get);


    // Setup the question's element
    this.elem = new QuestionElem(id);

    // Setup the protected properties
    url = '';
    if (!!question.url && typeof question.url === 'string') {
      url = question.url.toLowerCase();
      url = url.replace(/[^0-9a-z\-\s]/g, '');
      url = url.replace(/\s/g, '-');
    }

    complete = (!!question.complete && question.complete === true);

    source = ( (!!question.source && typeof question.source === 'string') ?
      question.source : ''
    );
    if ( !sources.get(source, 'name') ) {
      source = '';
    }

    mainCat = ( (!question.mainCat || !checkType(question.mainCat, 'strings')) ?
      [] : (question.mainCat.length) ?
        question.mainCat.slice(0) : []
    );
    mainCat.forEach(function(/** string */ catID, /** number */ i) {
      if ( !categories.get(catID, 'name') ) {
        mainCat.splice(i, 1);
      }
    });
    Object.freeze(mainCat);

    subCat = ( (!question.subCat || !checkType(question.subCat, 'strings')) ?
      [] : (question.subCat.length) ?
        question.subCat.slice(0) : []
    );
    subCat.forEach(function(/** string */ catID, /** number */ i) {
      if ( !categories.get(catID, 'name') ) {
        subCat.splice(i, 1);
      }
    });
    Object.freeze(subCat);

    links = ( (!config.links || !question.links ||
               !checkType(question.links, 'objects') ||
               !question.links.length) ?
      [] : question.links.slice(0)
    );
    if (links.length) {
      links.forEach(function(/** stringMap */ linkObj, /** number */ i) {
        if (!linkObj.name || !linkObj.href ||
            !checkTypes([ linkObj.name, linkObj.href ], 'string') ||
            !isLink(linkObj.href)) {
          links.splice(i, 1);
        }
      });
    }
    Object.freeze(links);

    problem = ( (!!question.problem && typeof question.problem === 'string') ?
      question.problem : ''
    );

    descr = ( (!!question.descr && typeof question.descr === 'string') ?
      question.descr : ''
    );

    solution = '';
    output = '';
    if (!!question.solution && typeof question.solution === 'function') {

      solution = String(question.solution);

      if (solution) {
        solution = trimFunctionWrapper(solution);
      }

      if (solution && config.output) {
        try {
          output = String( question.solution() );
        }
        catch (errorMsg) {
          args = [ 'init', false ];
          args.push('The question\'s solution produced an error. questionID= $$, error= $$');
          args.push(id, errorMsg);
          this.debug.fail(args);

          output = 'The solution returned an error.';
        }
      }
    }

    // Setup the question format
    this.format = new QuestionFormat({
      id      : id,
      complete: complete,
      source  : source,
      mainCat : mainCat,
      subCat  : subCat,
      solution: solution
    }, config, sources, categories);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  Question.prototype.constructor = Question;

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addToSearch)
   * -----------------------------------------------------
   * @desc Adds the question id to its matching search properties.
   * @param {booleanMap} config - The needed format config.
   */
  Question.prototype.addToSearch = function(config) {

    this.debug.start('addToSearch');

    /** @type {number} */
    var id;
    /** @type {boolean} */
    var complete;
    /** @type {string} */
    var source;
    /** @type {strings} */
    var mainCat;
    /** @type {strings} */
    var subCat;

    id       = this.get('id');
    complete = this.get('complete');
    source   = this.get('source');
    mainCat  = this.get('mainCat');
    subCat   = this.get('subCat');

    if (config.stage) {

      if (complete) {
        app.searchBar.ques.stage['com'].push(id);
      }
      else {
        app.searchBar.ques.stage['inc'].push(id);
      }
    }

    if (config.source && source) {
      app.sources.get(source).addId(id);
    }

    if (config.category && mainCat.length) {
      mainCat.forEach(function(/** string */ catId) {
        app.categories.get(catId).addId(id);
      });
    }

    if (config.category && config.subCat && subCat.length) {
      subCat.forEach(function(/** string */ catId) {
        app.categories.get(catId).addId(id);
      });
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addElemContent)
   * -----------------------------------------------------
   * @desc Adds the formatted content to the question element.
   * @type {function}
   */
  Question.prototype.addElemContent = function() {

    this.debug.group('addElemContent', 'coll', 'questionID= $$', this.get('id'));
    this.debug.start('addElemContent');

    this.elem.addContent({
      id      : this.format.get('id'),
      url     : this.get('url'),
      complete: this.format.get('complete'),
      source  : {
        id  : this.get('source'),
        name: this.format.get('source')
      },
      mainCat : {
        ids  : this.get('mainCat'),
        h3   : this.format.get('mainCat').h3,
        names: this.format.get('mainCat').names
      },
      subCat  : {
        ids  : this.get('subCat'),
        h3   : this.format.get('subCat').h3,
        names: this.format.get('subCat').names
      },
      links   : this.get('links'),
      problem : this.get('problem'),
      descr   : this.get('descr'),
      solution: this.format.get('solution'),
      output  : this.get('output')
    });

    this.debug.group('addElemContent', 'end');
  };


/* -----------------------------------------------------------------------------
 * | The Question Format Class                                                 |
 * v ------------------------------------------------------------------------- v
                                        classes/question/question-format.js */
  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {Object} question - The pre-formatted details of the question.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var QuestionFormat = function(question, config, sources, categories) {

    /** @type {{ result: string, lineCount: number }} */
    var code;

    /**
     * ---------------------------------------------------
     * Public Property (QuestionFormat.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the QuestionFormat class.
     * @type {Debug}
     */
    this.debug = aIV.debug('QuestionFormat');

    // Debugging vars
    var args;
    args = [ 'init', 'coll' ];
    args.push('id= $$, question= $$', question.id, question);
    this.debug.group(args);
    this.debug.start('init', question, config, sources, categories);
    args = [ 'init' ];
    args.push(question, 'object', config, 'booleanMap');
    args.push(sources, 'object', categories, 'object');
    this.debug.args(args);

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.id)
     * -----------------------------------------------
     * @desc The id for this question.
     * @type {string}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.source)
     * -----------------------------------------------
     * @desc This question's source.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {string}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.mainCat)
     * -----------------------------------------------
     * @desc This question's main categories.
     * @type {{
     *   h3   : ?string,
     *   names: ?strings
     * }}
     * @private
     */
    var mainCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.subCat)
     * -----------------------------------------------
     * @desc This question's sub categories.
     * @type {{
     *   h3   : ?string,
     *   names: ?strings
     * }}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {{
     *   prettyCode: string,
     *   lineCount : number
     * }}
     * @private
     */
    var solution;

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionFormat.get)
     * -----------------------------------------------
     * @desc Gets info for a question.
     * @param {string} prop - The name of the property to get.
     * @return {val}
     */
    this.get = function(prop) {

      // Debugging vars
      var errorMsg;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, val>} */
      var details = {
        id      : id,
        source  : source,
        complete: complete,
        mainCat : mainCat,
        subCat  : subCat,
        solution: solution
      };

      errorMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', details.hasOwnProperty(prop), errorMsg, prop);

      return details[prop];
    };
    Object.freeze(this.get);


    // Format the id
    id = (config.id && question.id) ? question.id : '';
    if (id) {
      id = ( (id < 10) ?
        '00' + id : (id < 100) ?
          '0' + id : '' + id
      );
    }

    // Format the source
    source = ( (sources.len && config.source && question.source) ?
      sources.get(question.source, 'name') : ''
    );

    // Format the completion status
    complete = ( (!config.complete) ?
      '' : (question.complete) ?
        'Yes' : 'No'
    );

    // Format the categories
    mainCat = {
      h3   : null,
      names: null
    };
    subCat = {
      h3   : null,
      names: null
    };
    if (categories.len && config.category) {

      // Format the main category
      if (question.mainCat.length) {
        mainCat.h3 = ( (question.mainCat.length > 1) ?
          'Main Categories:' : 'Main Category:'
        );
        mainCat.names = question.mainCat.map(function(/** string */ catID) {
          return categories.get(catID, 'name');
        });
      }

      // Format the sub category
      if (config.subCat && question.subCat.length) {
        subCat.h3 = ( (question.subCat.length > 1) ?
          'Sub Categories:' : 'Sub Category:'
        );
        subCat.names = question.subCat.map(function(/** string */ catID) {
          return categories.get(catID, 'name');
        });
      }
    }

    // Format the solution
    solution = {};
    if (question.solution) {
      code = prettify(question.solution);
      solution.prettyCode = code.result;
      solution.lineCount = code.lineCount;
    }

    Object.freeze(mainCat);
    Object.freeze(subCat);
    Object.freeze(solution);


    this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  QuestionFormat.prototype.constructor = QuestionFormat;


/* -----------------------------------------------------------------------------
 * | The Question Elem Class                                                   |
 * v ------------------------------------------------------------------------- v
                                          classes/question/question-elem.js */
  /**
   * -----------------------------------------------------
   * Public Class (QuestionElem)
   * -----------------------------------------------------
   * @desc An object containing the question's html element.
   * @param {number} id - The id of the question.
   * @constructor
   */
  var QuestionElem = function(id) {

    /**
     * ---------------------------------------------------
     * Public Property (QuestionElem.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the QuestionElem class.
     * @type {Debug}
     */
    this.debug = aIV.debug('QuestionElem');

    this.debug.start('init', id);
    this.debug.args('init', id, 'number');

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.root)
     * -----------------------------------------------
     * @desc The question's root element.
     * @type {elem}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {elem}
     */
    this.info;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.solution)
     * -----------------------------------------------
     * @desc The question's div.solution element.
     * @type {elem}
     */
    this.solution;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.pre)
     * -----------------------------------------------
     * @desc The question's div.preContain element.
     * @type {elem}
     */
    this.pre;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.code)
     * -----------------------------------------------
     * @desc The question's code element.
     * @type {elem}
     */
    this.code;


    // Setup the elements
    this.root = document.createElement('section');
    this.info = document.createElement('div');

    this.root.id = 'aIV-q' + id;

    this.root.className = 'question';
    this.info.className = 'info';

    this.root.appendChild(this.info);
  };

  // Ensure constructor is set to this class.
  QuestionElem.prototype.constructor = QuestionElem;

  /**
   * -----------------------------------------------------
   * Public Method (QuestionElem.prototype.addContent)
   * -----------------------------------------------------
   * @desc Adds the question's contents to its element.
   * @param {{
   *   id      : string,
   *   url     : string,
   *   complete: string,
   *   source  : {
   *     id  : string,
   *     name: string
   *   },
   *   mainCat : {
   *     ids  : strings,
   *     h3   : ?string,
   *     names: ?strings
   *   },
   *   subCat  : {
   *     ids  : strings,
   *     h3   : ?string,
   *     names: ?strings
   *   },
   *   links   : links,
   *   problem : string,
   *   descr   : string,
   *   solution: {
   *     prettyCode: string,
   *     lineCount : number
   *   },
   *   output  : string
   * }} question - The formatted question details.
   */
  QuestionElem.prototype.addContent = function(question) {

    this.debug.group('addContent', 'coll', 'questionID= $$', question.id);
    this.debug.start('addContent', question);
    this.debug.args('addContent', question, 'object');

    /** @type {elem} */
    var root;
    /** @type {elem} */
    var info;
    /** @type {boolean} */
    var testTextContent;

    root = this.root;
    info = this.info;
    testTextContent = !!document.body.textContent;

    // Append all the sections of the question
    // Note: See the below private helper methods for more details

    if (question.id) {
      appendID.call(this, question.id, question.url);
    }

    if (question.source.name) {
      appendSource.call(this, question.source);
    }

    if (question.complete) {
      appendComplete.call(this, question.complete);
    }

    if (question.mainCat.h3 || question.subCat.h3) {
      appendCategory.call(this, question.mainCat, question.subCat);
    }

    if (question.problem || question.descr) {
      appendProblem.call(this, question.problem, question.descr);
    }

    if ( question.solution.hasOwnProperty('prettyCode') ) {
      appendSolution.call(this, question.solution);
    }

    if (question.output) {
      appendOutput.call(this, question.output);
    }

    if (question.links.length) {
      appendLinks.call(this, question.links);
    }


    this.debug.group('addContent', 'end');


    /**
     * ---------------------------------------------
     * Private Method (appendID)
     * ---------------------------------------------
     * @desc Appends the question id.
     * @todo Add url parsing logic.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @private
     */
    function appendID(id, url) {

      this.debug.start('appendID', id, url);
      this.debug.args('appendID', id, 'string', url, 'string');

      /** @type {boolean} */
      var config;
      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {elem} */
      var a;
      /** @type {boolean} */
      var urlConfig;

      config = app.config.links.get('id');

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'idContain';

      if (testTextContent) {
        h3.textContent = 'Question:';
        if (!config) {
          p.textContent = id;
        }
      }
      else {
        h3.innerHTML = 'Question:';
        if (!config) {
          p.innerHTML = id;
        }
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      // Add the anchor link
      if (config) {

        if (!url) {
          url = Number(id);
        }
        urlConfig = app.config.url.get('id');

        a = document.createElement('a');
        a.href = 'id/' + url;
        if (testTextContent) {
          a.textContent = id;
        }
        else {
          a.innerHTML = id;
        }
        a.onclick = function() {

          events.debug.group('questionID.onclick', 'coll', 'id= $$', id);
          events.debug.start('questionID.onclick', id);

          app.moveDisplay(id);

          if (urlConfig) {
            // ADD URL LOGIC HERE
          }

          events.debug.group('questionID.onclick', 'end');

          return false;
        };

        p.appendChild(a);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSource)
     * ---------------------------------------------
     * @desc Appends the question's source.
     * @param {stringMap} source - The id and name of the source.
     * @private
     */
    function appendSource(source) {

      this.debug.start('appendSource', source);
      this.debug.args('appendSource', source, 'stringMap');

      /** @type {boolean} */
      var config;
      /** @type {string} */
      var url;
      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {elem} */
      var a;

      config = app.config.links.get('source');

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'source';

      if (testTextContent) {
        h3.textContent = 'Source:';
        if (!config) {
          p.textContent = source.name;
        }
      }
      else {
        h3.innerHTML = 'Source:';
        if (!config) {
          p.innerHTML = source.name;
        }
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      // Format the anchor link
      if (config) {

        url = app.categories.get(source.id, 'url');

        a = document.createElement('a');
        a.href = 'source/' + url;
        a.className = 'dark';
        if (testTextContent) {
          a.textContent = source.name;
        }
        else {
          a.innerHTML = source.name;
        }
        a.onclick = function() {

          events.debug.start('source.onclick', source.id);

          if (app.searchBar.vals.source != source.id) {

            events.debug.group('source.onclick', 'coll', 'source= $$', source);

            app.searchBar.vals.source = source.id;
            app.updateDisplay();

            events.debug.group('source.onclick', 'end');
          }

          return false;
        };

        p.appendChild(a);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendComplete)
     * ---------------------------------------------
     * @desc Appends the question's completion status.
     * @param {string} complete - The question's status.
     * @private
     */
    function appendComplete(complete) {

      this.debug.start('appendComplete', complete);
      this.debug.args('appendComplete', complete, 'string');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'stage';

      if (testTextContent) {
        h3.textContent = 'Completed:';
        p.textContent  = complete;
      }
      else {
        h3.innerHTML = 'Completed:';
        p.innerHTML = complete;
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendCategory)
     * ---------------------------------------------
     * @desc Appends the question's categories.
     * @param {Object} main - The question's main categories.
     * @param {Object} sub - The question's sub categories.
     * @private
     */
    function appendCategory(main, sub) {

      this.debug.start('appendCategory', main, sub);
      this.debug.args('appendCategory', main, 'object', sub, 'object');

      /** @type {elem} */
      var contain;
      /** @type {elem} */
      var mainDiv;
      /** @type {elem} */
      var subDiv;

      contain = document.createElement('div');
      contain.className = 'category';

      // Add the main categories
      if (main.h3) {

        mainDiv = document.createElement('div');
        mainDiv.className = 'mainCategory';

        appendMainCategories.call(this, main, mainDiv);

        contain.appendChild(mainDiv);
      }

      // Add the sub categories
      if (sub.h3) {

        subDiv = document.createElement('div');
        subDiv.className = 'subCategory';

        appendSubCategories.call(this, sub, subDiv);

        contain.appendChild(subDiv);
      }

      root.appendChild(contain);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendMainCategories)
     * ---------------------------------------------
     * @desc Appends the question's main categories.
     * @param {Object} main - The question's main categories.
     * @param {elem} div - The DOM container for the main categories.
     * @private
     */
    function appendMainCategories(main, div) {

      var debugMsg;
      this.debug.start('appendMainCategories', main, div);
      this.debug.args('appendMainCategories', main, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {elem} */
      var a;

      config = app.config.links.get('category');

      h3 = document.createElement('h3');
      p  = document.createElement('p');

      if (testTextContent) {
        h3.textContent = main.h3;
        if (!config) {
          p.textContent = main.names.join(', ');
        }
      }
      else {
        h3.innerHTML = main.h3;
        if (!config) {
          p.innerHTML = main.names.join(', ');
        }
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each main category's anchor tag
      if (config) {
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        len = main.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeMainCatLink.call(this, main.ids[i], main.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.innerHTML += ',&nbsp;&nbsp;';
          }
          this.debug.state('appendMainCategories', debugMsg, p, a, a.onclick);
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSubCategories)
     * ---------------------------------------------
     * @desc Appends the question's sub categories.
     * @param {Object} sub - The question's sub categories.
     * @param {elem} div - The DOM container for the sub categories.
     * @private
     */
    function appendSubCategories(sub, div) {

      var debugMsg;
      this.debug.start('appendSubCategories', sub, div);
      this.debug.args('appendSubCategories', sub, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {elem} */
      var a;

      config = app.config.links.get('category');

      h3 = document.createElement('h3');
      p  = document.createElement('p');

      if (testTextContent) {
        h3.textContent = sub.h3;
        if (!config) {
          p.textContent = sub.names.join(', ');
        }
      }
      else {
        h3.innerHTML = sub.h3;
        if (!config) {
          p.innerHTML = sub.names.join(', ');
        }
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each sub category's anchor tag
      if (config) {
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        len = sub.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeSubCatLink.call(this, sub.ids[i], sub.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.innerHTML += ',&nbsp;&nbsp;';
          }
          this.debug.state('appendSubCategories', debugMsg, p, a, a.onclick);
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeMainCatLink)
     * ---------------------------------------------
     * @desc Creates a main category link.
     * @todo Add url parsing logic.
     * @param {string} id - The main category's id.
     * @param {string} name - The main category's name.
     * @return {elem} The anchor link.
     * @private
     */
    function makeMainCatLink(id, name) {

      this.debug.start('makeMainCatLink', id, name);
      this.debug.args('makeMainCatLink', id, 'string', name, 'string');

      /** @type {boolean} */
      var urlConfig;
      /** @type {string} */
      var url;
      /** @type {elem} */
      var a;

      urlConfig = app.config.url.get('category');
      url = app.categories.get(id, 'url');

      a = document.createElement('a');
      a.href = 'category/' + url;
      a.className = 'dark';
      a.innerHTML = name;
      a.onclick = function() {
        events.debug.start('mainCat.onclick', id);

        if (app.searchBar.vals.mainCat != id) {
          events.debug.group('mainCat.onclick', 'coll', 'mainCat= $$', id);

          app.searchBar.vals.mainCat = id;
          app.searchBar.updateSubCatOpts();
          app.updateDisplay();

          if (urlConfig) {
            // ADD URL LOGIC HERE
          }

          events.debug.group('mainCat.onclick', 'end');
        }

        return false;
      };

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeSubCatLink)
     * ---------------------------------------------
     * @desc Creates a sub category link.
     * @todo Add url parsing logic and remove the use of
     *   indexOf to find the sub category's parent.
     * @param {string} id - The sub category's id.
     * @param {string} name - The sub category's name.
     * @return {elem} The anchor link.
     * @private
     */
    function makeSubCatLink(id, name) {

      this.debug.start('makeSubCatLink', id, name);
      this.debug.args('makeSubCatLink', id, 'string', name, 'string');

      /** @type {boolean} */
      var urlConfig;
      /** @type {string} */
      var url;
      /** @type {elem} */
      var a;
      /** @type {string} */
      var parentId;
      /** @type {string} */
      var parentUrl;

      urlConfig = app.config.url.get('category');

      // Set the sub category's parent id and url
      app.categories.ids.some(function(/** string */ catId) {
        /** @private */
        var category;
        /** @private */
        var subs;

        category = app.categories.get(catId);
        subs = category.get('subs');
        if (subs && subs.indexOf(id) !== -1) {
          parentId  = catId;
          parentUrl = category.get('url');
          return true;
        }

        return false;
      });

      url = app.categories.get(id, 'url');

      a = document.createElement('a');
      a.href = 'category/' + parentUrl + '/' + url;
      a.className = 'dark';
      a.innerHTML = name;
      a.onclick = function() {
        events.debug.start('subCat.onclick', id);

        if (app.searchBar.vals.subCat != id) {
          events.debug.group('subCat.onclick', 'coll', 'subCat= $$', id);

          // Check the main category and update the values and options
          if (app.searchBar.vals.mainCat !== 'all' ||
              app.searchBar.vals.mainCat !== parentId) {
            app.searchBar.vals.mainCat = 'all';
            app.searchBar.updateSubCatOpts(id);
          }
          else {
            app.searchBar.vals.subCat = id;
          }

          if (urlConfig) {
            // ADD URL LOGIC HERE
          }

          // Finish the display update
          app.updateDisplay();

          events.debug.group('subCat.onclick', 'end');
        }

        return false;
      };

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendProblem)
     * ---------------------------------------------
     * @desc Appends the question's problem or description.
     * @param {string} problem - The question's problem.
     * @param {string} descr - The question's description.
     * @private
     */
    function appendProblem(problem, descr) {

      this.debug.start('appendProblem', problem, descr);
      this.debug.args('appendProblem', problem, 'string', descr, 'string');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'problem';

      if (testTextContent) {
        h3.textContent = (problem) ? 'Problem:' : 'Description:';
      }
      else {
        h3.innerHTML = (problem) ? 'Problem:' : 'Description:';
      }
      p.innerHTML = (problem) ? problem : descr;

      div.appendChild(h3);
      div.appendChild(p);

      root.appendChild(div);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSolution)
     * ---------------------------------------------
     * @desc Appends the question's solution.
     * @param {Object} solution - The question's solution.
     * @private
     */
    function appendSolution(solution) {

      this.debug.start('appendSolution', solution);
      this.debug.args('appendSolution', solution, 'object');

      /** @type {elem} */
      var contain;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var preDiv;
      /** @type {elem} */
      var pre;
      /** @type {elem} */
      var code;
      /** @type {elem} */
      var ol;
      /** @type {number} */
      var height;

      contain  = document.createElement('div');
      h3       = document.createElement('h3');
      preDiv   = document.createElement('div');
      pre      = document.createElement('pre');
      code     = document.createElement('code');
      ol       = document.createElement('ol');

      contain.className = 'solution';
      preDiv.className     = 'preContain';

      ol.innerHTML = solution.prettyCode;

      if (testTextContent) {
        h3.textContent = 'Solution:';
      }
      else {
        h3.innerHTML = 'Solution:';
      }

      height = solution.lineCount * app.elems.code.li.height;
      height += app.elems.code.ol.height;
      preDiv.style.height = height + 'px';

      contain.appendChild(h3);
      contain.appendChild(preDiv);
      preDiv.appendChild(pre);
      pre.appendChild(code);
      code.appendChild(ol);

      root.appendChild(contain);

      this.solution = contain;
      this.pre = preDiv;
      this.code = code;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendOutput)
     * ---------------------------------------------
     * @desc Appends the solution's output for this question.
     * @param {string} output - The solution's output.
     * @private
     */
    function appendOutput(output) {

      this.debug.start('appendOutput', output);
      this.debug.args('appendOutput', output, 'string');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'output';

      if (testTextContent) {
        h3.textContent = 'Output:';
      }
      else {
        h3.innerHTML = 'Output:';
      }

      p.innerHTML    = output;

      div.appendChild(h3);
      div.appendChild(p);

      root.appendChild(div);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendLinks)
     * ---------------------------------------------
     * @desc Appends the question's links.
     * @param {links} links - The question's links.
     * @private
     */
    function appendLinks(links) {

      this.debug.start('appendLinks', links);
      this.debug.args('appendLinks', links, 'objects');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'links';

      if (testTextContent) {
        h3.textContent = 'Links:';
      }
      else {
        h3.innerHTML = 'Links:';
      }

      div.appendChild(h3);
      div.appendChild(p);

      links.forEach(function(/** Object */ linkObj) {
        /** @type {elem} */
        var a;

        a = document.createElement('a');
        a.href = linkObj.href;
        a.target = '_blank';
        if (testTextContent) {
          a.textContent = linkObj.name;
        }
        else {
          a.innerHTML = linkObj.name;
        }
        p.appendChild(a);
      });

      root.appendChild(div);
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (QuestionElem.prototype.addCodeExt)
   * -----------------------------------------------------
   * @desc If overflow occurs in a code element it enables the auto
   *   extend button for the question.
   * @type {function}
   */
  QuestionElem.prototype.addCodeExt = function() {

    var debugMsg, debugArgs;
    this.debug.start('addCodeExt');

    /** @type {number} */
    var overflow;
    /** @type {number} */
    var scrollbar;
    /** @type {elem} */
    var code;
    /** @type {elem} */
    var ext;
    /** @type {elem} */
    var extClose;
    /** @type {elem} */
    var extOpen;
    /** @type {elem} */
    var extBG;
    /** @type {elem} */
    var extHov;
    /** @type {elem} */
    var extHovC;
    /** @type {elem} */
    var extHovO;
    /** @type {boolean} */
    var testTextContent;

    code = this.code;

    overflow = code.scrollWidth - code.clientWidth;
    debugMsg = 'this.code= $$, scrollWidth= $$, clientWidth= $$, overflow= $$';
    debugArgs = [ 'addCodeExt', debugMsg, code, code.scrollWidth ];
    debugArgs.push(code.clientWidth, overflow);
    this.debug.state(debugArgs);

    if (overflow < 1) {
      this.root.style.display = 'none';
      this.root.style.opacity = '1';
      return;
    }

    scrollbar = app.elems.scrl.height;
    this.debug.state('addCodeExt', 'scrollbar= $$', scrollbar);
    if (scrollbar > 0) {
      this.solution.style.paddingBottom = scrollbar + 'px';
    }

    testTextContent = !!document.body.textContent;

    ext      = document.createElement('div');
    extClose = document.createElement('div');
    extOpen  = document.createElement('div');
    extBG    = document.createElement('div');
    extHov   = document.createElement('div');
    extHovC  = document.createElement('span');
    extHovO  = document.createElement('span');

    ext.className      = 'extContain';
    extClose.className = 'extCloseArrow';
    extOpen.className  = 'extOpenArrow';
    extBG.className    = 'extBG';
    extHov.className   = 'extHover';
    extHovC.className  = 'closeExt';
    extHovO.className  = 'openExt';

    if (testTextContent) {
      extOpen.textContent = 'open';
      extHovC.textContent = 'Close Extended Code View';
      extHovO.textContent = 'Extend Code View';
    }
    else {
      extOpen.innerHTML = 'open';
      extHovC.innerHTML = 'Close Extended Code View';
      extHovO.innerHTML = 'Extend Code View';
    }

    extOpen.onmouseover = function() {
      extHov.style.opacity = '1';
    };

    extOpen.onmouseout = function() {
      extHov.style.opacity = '0';
    };

    extOpen.onclick = function() {
      events.debug.group('extCodeView', 'coll');
      events.debug.start('extCodeView');

      /** @type {number} */
      var newWidth;
      /** @type {number} */
      var newRight;

      newWidth = code.clientWidth;
      events.debug.state('extCodeView', 'orgWidth= $$', newWidth);

      if (extOpen.innerHTML === 'close') {

        extClose.style.opacity = '0.0';

        ext.style.right = '-4px';

        newWidth -= overflow;
        code.style.width = newWidth + 'px';

        setTimeout(function() {
          extOpen.style.opacity = '0.8';
          setTimeout(function() {
            extOpen.innerHTML = 'open';
            extHovC.style.display = 'none';
            extHovO.style.display = 'block';
          }, 600);
        }, 400);
      }
      else if (extOpen.innerHTML === 'open') {

        extOpen.style.opacity = '0.0';

        newRight = overflow + 4;
        ext.style.right = '-' + newRight + 'px';
        events.debug.state('extCodeView', 'newRight= $$', newRight);

        newWidth += overflow;
        events.debug.state('extCodeView', 'newWidth= $$', newWidth);
        code.style.width = newWidth + 'px';

        setTimeout(function() {
          extClose.style.opacity = '0.8';
          setTimeout(function() {
            extOpen.innerHTML = 'close';
            extHovO.style.display = 'none';
            extHovC.style.display = 'block';
          }, 600);
        }, 400);
      }
      events.debug.group('extCodeView', 'end');
    };

    ext.appendChild(extClose);
    ext.appendChild(extOpen);
    ext.appendChild(extBG);
    extHov.appendChild(extHovC);
    extHov.appendChild(extHovO);

    this.pre.appendChild(ext);
    this.pre.appendChild(extHov);

    this.root.style.display = 'none';
    this.root.style.opacity = '1';
  };


/* -----------------------------------------------------------------------------
 * | The Prettifier Class                                                      |
 * v ------------------------------------------------------------------------- v
                                                                prettify.js */
  /**
   * -----------------------------------------------------
   * Public Method (prettify)
   * -----------------------------------------------------
   * @desc The prettifier for this app.
   * @param {string} solution - The problem's solution to be formatted.
   * @return {{
   *   result   : string,
   *   lineCount: number
   * }}
   */
  var prettify = (function() {

    var prettify = function(solution) {

      prettify.debug.group('init', 'coll');
      prettify.debug.group('init', 'coll', 'Open to see original string');
      prettify.debug.start('init', solution);
      prettify.debug.group('init', 'end');
      prettify.debug.args('init', solution, 'string');

      /** @type {{ result: string, lineCount: number }} */
      var result;

      // Format the solution
      result = applyFormatting( prepareLines(solution) );

      prettify.debug.group('init', 'end');

      return result;
    };

/* -----------------------------------------------------------------------------
 * | The Prettifier Vars                                                       |
 * v ------------------------------------------------------------------------- v
                                                           prettify-vars.js */
    /**
     * ---------------------------------------------------
     * Public Property (prettify.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the prettifier.
     * @type {Debug}
     */
    prettify.debug = aIV.debug('prettify');

    /**
     * ---------------------------------------------
     * Private Variable (config)
     * ---------------------------------------------
     * @desc The config settings.
     * @type {Object<string, (number|boolean)>}
     * @private
     */
    var config;

    /**
     * ---------------------------------------------
     * Private Variable (htmlEntity)
     * ---------------------------------------------
     * @desc The characters to replace with a html entity.
     * @const
     * @type {stringMap}
     * @private
     */
    var htmlEntity = {
      '<': '&lt;',
      '>': '&gt;'
    };
    Object.freeze(htmlEntity);

    /**
     * ---------------------------------------------
     * Private Variable (preRegex)
     * ---------------------------------------------
     * @desc The characters that if preceding a '/' could be a
     *   regular expression. The characters 'n', 'e', and 'f' are
     *   evaluated for the following possible keywords 'return',
     *   'case', 'typeof', 'instanceof', and 'in'.
     * @const
     * @type {RegExp}
     * @private
     */
    var preRegex = /[\(\)\[\{\};\*\/%\+\-<>&\^\|=!:\?nef]/;
    Object.freeze(preRegex);

    /**
     * ---------------------------------------------
     * Private Variable (regexFlags)
     * ---------------------------------------------
     * @desc The flags for js regular expressions.
     * @const
     * @type {RegExp}
     * @private
     */
    var regexFlags = /[gimy]/;
    Object.freeze(regexFlags);

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * @desc List of valid plain number characters.
     * @const
     * @type {RegExp}
     * @private
     */
    var plainNumbers = /[0-9\.]/;
    Object.freeze(plainNumbers);

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * @desc List of valid hex number characters.
     * @const
     * @type {RegExp}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;
    Object.freeze(hexNumbers);

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * @desc List of valid starting identifier characters.
     * @const
     * @type {RegExp}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;
    Object.freeze(identifierStart);

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * @desc List of valid identifier characters.
     * @const
     * @type {RegExp}
     * @private
     */
    var identifiers = /[a-z0-9_\$]/i;
    Object.freeze(identifiers);

    /**
     * ---------------------------------------------
     * Private Variable (commentOpen)
     * ---------------------------------------------
     * @desc Tells whether a comment is open.
     * @type {boolean}
     * @private
     */
    var commentOpen;

    /**
     * ---------------------------------------------
     * Private Variable (commentLinks)
     * ---------------------------------------------
     * @desc Valid link syntax within comments.
     * @type {RegExp}
     * @private
     */
    var commentLinks = /\s\[([^\[\]]+)\]\(([^\s\(\)]+)\)/;
    Object.freeze(commentLinks);

    /**
     * ---------------------------------------------
     * Private Variable (keywordCategories)
     * ---------------------------------------------
     * @desc The keyword categories and their DOM class names.
     * @const
     * @type {stringMap}
     * @private
     */
    var keywordCategories = {
      def: 'defKey', // Defining Keywords
      res: 'resKey', // Reserved Keywords
      nat: 'natKey', // Native Objects & Methods
      val: 'valKey', // Values
      cli: 'cliKey', // Client Objects & Methods
      jqu: 'jquKey'  // jQuery Objects
    };
    Object.freeze(keywordCategories);

    prettify.debug.group('makeKeywordObjects', 'coll');

    /**
     * ---------------------------------------------
     * Private Variable (keywords)
     * ---------------------------------------------
     * @desc The available keywords, objects, and methods. Objects
     *   also include their properties.
     * @const
     * @type {objectMap}
     * @private
     */
    var keywords = {

      // Defining Keywords
      _class   : makeKeywordObj('def', ''),
      _const   : makeKeywordObj('def', ''),
      _function: makeKeywordObj('def', ''),
      _var     : makeKeywordObj('def', ''),

      // Reserved Keywords
      _abstract    : makeKeywordObj('res', ''),
      _arguments   : makeKeywordObj('res', ''),
      _boolean     : makeKeywordObj('res', ''),
      _break       : makeKeywordObj('res', ''),
      _byte        : makeKeywordObj('res', ''),
      _case        : makeKeywordObj('res', ''),
      _catch       : makeKeywordObj('res', ''),
      _char        : makeKeywordObj('res', ''),
      _continue    : makeKeywordObj('res', ''),
      _debugger    : makeKeywordObj('res', ''),
      _default     : makeKeywordObj('res', ''),
      _delete      : makeKeywordObj('res', ''),
      _do          : makeKeywordObj('res', ''),
      _double      : makeKeywordObj('res', ''),
      _else        : makeKeywordObj('res', ''),
      _enum        : makeKeywordObj('res', ''),
      _export      : makeKeywordObj('res', ''),
      _extends     : makeKeywordObj('res', ''),
      _final       : makeKeywordObj('res', ''),
      _finally     : makeKeywordObj('res', ''),
      _float       : makeKeywordObj('res', ''),
      _for         : makeKeywordObj('res', ''),
      _goto        : makeKeywordObj('res', ''),
      _if          : makeKeywordObj('res', ''),
      _implements  : makeKeywordObj('res', ''),
      _import      : makeKeywordObj('res', ''),
      _in          : makeKeywordObj('res', ''),
      _instanceof  : makeKeywordObj('res', ''),
      _int         : makeKeywordObj('res', ''),
      _interface   : makeKeywordObj('res', ''),
      _item        : makeKeywordObj('res', ''),
      _let         : makeKeywordObj('res', ''),
      _long        : makeKeywordObj('res', ''),
      _native      : makeKeywordObj('res', ''),
      _new         : makeKeywordObj('res', ''),
      _package     : makeKeywordObj('res', ''),
      _private     : makeKeywordObj('res', ''),
      _protected   : makeKeywordObj('res', ''),
      _public      : makeKeywordObj('res', ''),
      _return      : makeKeywordObj('res', ''),
      _short       : makeKeywordObj('res', ''),
      _static      : makeKeywordObj('res', ''),
      _super       : makeKeywordObj('res', ''),
      _switch      : makeKeywordObj('res', ''),
      _synchronized: makeKeywordObj('res', ''),
      _this        : makeKeywordObj('res', ''),
      _throw       : makeKeywordObj('res', ''),
      _throws      : makeKeywordObj('res', ''),
      _transient   : makeKeywordObj('res', ''),
      _try         : makeKeywordObj('res', ''),
      _typeof      : makeKeywordObj('res', ''),
      _void        : makeKeywordObj('res', ''),
      _volatile    : makeKeywordObj('res', ''),
      _while       : makeKeywordObj('res', ''),
      _with        : makeKeywordObj('res', ''),
      _yield       : makeKeywordObj('res', ''),

      // Native Objects & Methods
      _apply               : makeKeywordObj('nat', ''),
      _Array               : makeKeywordObj('nat', '', true),
      _ArrayBuffer         : makeKeywordObj('nat', '', true),
      _bind                : makeKeywordObj('nat', ''),
      _Boolean             : makeKeywordObj('nat', ''),
      _call                : makeKeywordObj('nat', ''),
      _charAt              : makeKeywordObj('nat', ''),
      _charCodeAt          : makeKeywordObj('nat', ''),
      _clearInterval       : makeKeywordObj('nat', ''),
      _clearTimeout        : makeKeywordObj('nat', ''),
      _concat              : makeKeywordObj('nat', ''),
      _constructor         : makeKeywordObj('nat', ''),
      _DataView            : makeKeywordObj('nat', ''),
      _Date                : makeKeywordObj('nat', '', true),
      _decodeURI           : makeKeywordObj('nat', ''),
      _decodeURIComponent  : makeKeywordObj('nat', ''),
      _encodeURI           : makeKeywordObj('nat', ''),
      _encodeURIComponent  : makeKeywordObj('nat', ''),
      _Error               : makeKeywordObj('nat', ''),
      _escape              : makeKeywordObj('nat', ''),
      _eval                : makeKeywordObj('nat', ''),
      _EvalError           : makeKeywordObj('nat', ''),
      _every               : makeKeywordObj('nat', ''),
      _filter              : makeKeywordObj('nat', ''),
      _forEach             : makeKeywordObj('nat', ''),
      _fromCharCode        : makeKeywordObj('nat', ''),
      _Function            : makeKeywordObj('nat', ''),
      _Generator           : makeKeywordObj('nat', ''),
      _GeneratorFunction   : makeKeywordObj('nat', ''),
      _getDate             : makeKeywordObj('nat', ''),
      _getDay              : makeKeywordObj('nat', ''),
      _getFullYear         : makeKeywordObj('nat', ''),
      _getHours            : makeKeywordObj('nat', ''),
      _getMilliseconds     : makeKeywordObj('nat', ''),
      _getMinutes          : makeKeywordObj('nat', ''),
      _getMonth            : makeKeywordObj('nat', ''),
      _getSeconds          : makeKeywordObj('nat', ''),
      _getTime             : makeKeywordObj('nat', ''),
      _getTimezoneOffset   : makeKeywordObj('nat', ''),
      _getUTCDate          : makeKeywordObj('nat', ''),
      _getUTCDay           : makeKeywordObj('nat', ''),
      _getUTCFullYear      : makeKeywordObj('nat', ''),
      _getUTCHours         : makeKeywordObj('nat', ''),
      _getUTCMilliseconds  : makeKeywordObj('nat', ''),
      _getUTCMinutes       : makeKeywordObj('nat', ''),
      _getUTCMonth         : makeKeywordObj('nat', ''),
      _getUTCSeconds       : makeKeywordObj('nat', ''),
      _getYear             : makeKeywordObj('nat', ''),
      _hasOwnProperty      : makeKeywordObj('nat', ''),
      _indexOf             : makeKeywordObj('nat', ''),
      _isFinite            : makeKeywordObj('nat', ''),
      _isNaN               : makeKeywordObj('nat', ''),
      _isPrototypeOf       : makeKeywordObj('nat', ''),
      _join                : makeKeywordObj('nat', ''),
      _JSON                : makeKeywordObj('nat', '', true),
      _lastIndexOf         : makeKeywordObj('nat', ''),
      _length              : makeKeywordObj('nat', ''),
      _map                 : makeKeywordObj('nat', ''),
      _match               : makeKeywordObj('nat', ''),
      _Math                : makeKeywordObj('nat', '', true),
      _Number              : makeKeywordObj('nat', '', true),
      _Object              : makeKeywordObj('nat', '', true),
      _parse               : makeKeywordObj('nat', ''),
      _parseFloat          : makeKeywordObj('nat', ''),
      _parseInt            : makeKeywordObj('nat', ''),
      _pop                 : makeKeywordObj('nat', ''),
      _preference          : makeKeywordObj('nat', ''),
      _print               : makeKeywordObj('nat', ''),
      _propertyIsEnumerable: makeKeywordObj('nat', ''),
      _prototype           : makeKeywordObj('nat', ''),
      _push                : makeKeywordObj('nat', ''),
      _RegExp              : makeKeywordObj('nat', ''),
      _replace             : makeKeywordObj('nat', ''),
      _reset               : makeKeywordObj('nat', ''),
      _resizeBy            : makeKeywordObj('nat', ''),
      _resizeTo            : makeKeywordObj('nat', ''),
      _reverse             : makeKeywordObj('nat', ''),
      _search              : makeKeywordObj('nat', ''),
      _setDate             : makeKeywordObj('nat', ''),
      _setFullYear         : makeKeywordObj('nat', ''),
      _setHours            : makeKeywordObj('nat', ''),
      _setMilliseconds     : makeKeywordObj('nat', ''),
      _setInterval         : makeKeywordObj('nat', ''),
      _setMinutes          : makeKeywordObj('nat', ''),
      _setMonth            : makeKeywordObj('nat', ''),
      _setSeconds          : makeKeywordObj('nat', ''),
      _setTime             : makeKeywordObj('nat', ''),
      _setTimeout          : makeKeywordObj('nat', ''),
      _setUTCDate          : makeKeywordObj('nat', ''),
      _setUTCFullYear      : makeKeywordObj('nat', ''),
      _setUTCHours         : makeKeywordObj('nat', ''),
      _setUTCMilliseconds  : makeKeywordObj('nat', ''),
      _setUTCMinutes       : makeKeywordObj('nat', ''),
      _setUTCMonth         : makeKeywordObj('nat', ''),
      _setUTCSeconds       : makeKeywordObj('nat', ''),
      _setYear             : makeKeywordObj('nat', ''),
      _shift               : makeKeywordObj('nat', ''),
      _slice               : makeKeywordObj('nat', ''),
      _some                : makeKeywordObj('nat', ''),
      _sort                : makeKeywordObj('nat', ''),
      _splice              : makeKeywordObj('nat', ''),
      _split               : makeKeywordObj('nat', ''),
      _String              : makeKeywordObj('nat', '', true),
      _substr              : makeKeywordObj('nat', ''),
      _substring           : makeKeywordObj('nat', ''),
      _Symbol              : makeKeywordObj('nat', '', true),
      _test                : makeKeywordObj('nat', ''),
      _toGMTString         : makeKeywordObj('nat', ''),
      _toLocaleString      : makeKeywordObj('nat', ''),
      _toLowerCase         : makeKeywordObj('nat', ''),
      _toSource            : makeKeywordObj('nat', ''),
      _toString            : makeKeywordObj('nat', ''),
      _toUpperCase         : makeKeywordObj('nat', ''),
      _toUTCString         : makeKeywordObj('nat', ''),
      _TypedArray          : makeKeywordObj('nat', '', true),
      _unescape            : makeKeywordObj('nat', ''),
      _unshift             : makeKeywordObj('nat', ''),
      _unwatch             : makeKeywordObj('nat', ''),
      _UTC                 : makeKeywordObj('nat', ''),
      _valueOf             : makeKeywordObj('nat', ''),
      _watch               : makeKeywordObj('nat', ''),
      _write               : makeKeywordObj('nat', ''),
      _writeln             : makeKeywordObj('nat', ''),

      // Values
      _false    : makeKeywordObj('val', ''),
      _Infinity : makeKeywordObj('val', ''),
      _Nan      : makeKeywordObj('val', ''),
      _null     : makeKeywordObj('val', ''),
      _true     : makeKeywordObj('val', ''),
      _undefined: makeKeywordObj('val', ''),

      // Client Objects & Methods
      _alert                 : makeKeywordObj('cli', ''),
      _anchor                : makeKeywordObj('cli', ''),
      _anchors               : makeKeywordObj('cli', ''),
      _appendChild           : makeKeywordObj('cli', ''),
      _area                  : makeKeywordObj('cli', ''),
      _assign                : makeKeywordObj('cli', ''),
      _back                  : makeKeywordObj('cli', ''),
      _big                   : makeKeywordObj('cli', ''),
      _blink                 : makeKeywordObj('cli', ''),
      _blur                  : makeKeywordObj('cli', ''),
      _body                  : makeKeywordObj('cli', ''),
      _bold                  : makeKeywordObj('cli', ''),
      _button                : makeKeywordObj('cli', ''),
      _byteToString          : makeKeywordObj('cli', ''),
      _captureEvents         : makeKeywordObj('cli', ''),
      _checkbox              : makeKeywordObj('cli', ''),
      _className             : makeKeywordObj('cli', ''),
      _click                 : makeKeywordObj('cli', ''),
      _clientHeight          : makeKeywordObj('cli', ''),
      _clientInformation     : makeKeywordObj('cli', ''),
      _clientWidth           : makeKeywordObj('cli', ''),
      _close                 : makeKeywordObj('cli', ''),
      _closed                : makeKeywordObj('cli', ''),
      _confirm               : makeKeywordObj('cli', ''),
      _console               : makeKeywordObj('cli', '', true),
      _createElement         : makeKeywordObj('cli', ''),
      _crypto                : makeKeywordObj('cli', ''),
      _defaultStatus         : makeKeywordObj('cli', ''),
      _disableExternalCapture: makeKeywordObj('cli', ''),
      _document              : makeKeywordObj('cli', ''),
      _element               : makeKeywordObj('cli', ''),
      _elements              : makeKeywordObj('cli', ''),
      _embed                 : makeKeywordObj('cli', ''),
      _embeds                : makeKeywordObj('cli', ''),
      _enableExternalCapture : makeKeywordObj('cli', ''),
      _event                 : makeKeywordObj('cli', ''),
      _fileUpload            : makeKeywordObj('cli', ''),
      _find                  : makeKeywordObj('cli', ''),
      _fixed                 : makeKeywordObj('cli', ''),
      _focus                 : makeKeywordObj('cli', ''),
      _fontcolor             : makeKeywordObj('cli', ''),
      _fontsize              : makeKeywordObj('cli', ''),
      _form                  : makeKeywordObj('cli', ''),
      _forms                 : makeKeywordObj('cli', ''),
      _forward               : makeKeywordObj('cli', ''),
      _frame                 : makeKeywordObj('cli', ''),
      _frames                : makeKeywordObj('cli', ''),
      _frameRate             : makeKeywordObj('cli', ''),
      _getComputedStyle      : makeKeywordObj('cli', ''),
      _getElementById        : makeKeywordObj('cli', ''),
      _getElementsByClassName: makeKeywordObj('cli', ''),
      _getElementsByTagName  : makeKeywordObj('cli', ''),
      _getOptionValueCount   : makeKeywordObj('cli', ''),
      _getOptionValue        : makeKeywordObj('cli', ''),
      _getPropertyValue      : makeKeywordObj('cli', ''),
      _getSelection          : makeKeywordObj('cli', ''),
      _go                    : makeKeywordObj('cli', ''),
      _handleEvent           : makeKeywordObj('cli', ''),
      _hidden                : makeKeywordObj('cli', ''),
      _history               : makeKeywordObj('cli', ''),
      _home                  : makeKeywordObj('cli', ''),
      _id                    : makeKeywordObj('cli', ''),
      _image                 : makeKeywordObj('cli', ''),
      _ImageData             : makeKeywordObj('cli', '', true),
      _images                : makeKeywordObj('cli', ''),
      _innerHeight           : makeKeywordObj('cli', ''),
      _innerHTML             : makeKeywordObj('cli', ''),
      _innerWidth            : makeKeywordObj('cli', ''),
      _italics               : makeKeywordObj('cli', ''),
      _javaEnabled           : makeKeywordObj('cli', ''),
      _layer                 : makeKeywordObj('cli', ''),
      _layers                : makeKeywordObj('cli', ''),
      _link                  : makeKeywordObj('cli', ''),
      _location              : makeKeywordObj('cli', ''),
      _mimeTypes             : makeKeywordObj('cli', ''),
      _moveAbove             : makeKeywordObj('cli', ''),
      _moveBelow             : makeKeywordObj('cli', ''),
      _moveBy                : makeKeywordObj('cli', ''),
      _moveTo                : makeKeywordObj('cli', ''),
      _moveToAbsolute        : makeKeywordObj('cli', ''),
      _navigate              : makeKeywordObj('cli', ''),
      _navigator             : makeKeywordObj('cli', ''),
      _offscreenBuffering    : makeKeywordObj('cli', ''),
      _offsetHeight          : makeKeywordObj('cli', ''),
      _offsetWidth           : makeKeywordObj('cli', ''),
      _open                  : makeKeywordObj('cli', ''),
      _opener                : makeKeywordObj('cli', ''),
      _options               : makeKeywordObj('cli', ''),
      _outerHeight           : makeKeywordObj('cli', ''),
      _outerWidth            : makeKeywordObj('cli', ''),
      _packages              : makeKeywordObj('cli', ''),
      _pageXOffset           : makeKeywordObj('cli', ''),
      _pageYOffset           : makeKeywordObj('cli', ''),
      _parent                : makeKeywordObj('cli', ''),
      _password              : makeKeywordObj('cli', ''),
      _pkcs11                : makeKeywordObj('cli', ''),
      _plugins               : makeKeywordObj('cli', ''),
      _prompt                : makeKeywordObj('cli', ''),
      _propertyIsEnum        : makeKeywordObj('cli', ''),
      _radio                 : makeKeywordObj('cli', ''),
      _refresh               : makeKeywordObj('cli', ''),
      _releaseEvents         : makeKeywordObj('cli', ''),
      _reload                : makeKeywordObj('cli', ''),
      _removeChild           : makeKeywordObj('cli', ''),
      _routeEvent            : makeKeywordObj('cli', ''),
      _screen                : makeKeywordObj('cli', ''),
      _screenX               : makeKeywordObj('cli', ''),
      _screenY               : makeKeywordObj('cli', ''),
      _scroll                : makeKeywordObj('cli', ''),
      _scrollBy              : makeKeywordObj('cli', ''),
      _scrollTo              : makeKeywordObj('cli', ''),
      _secure                : makeKeywordObj('cli', ''),
      _select                : makeKeywordObj('cli', ''),
      _self                  : makeKeywordObj('cli', ''),
      _small                 : makeKeywordObj('cli', ''),
      _status                : makeKeywordObj('cli', ''),
      _stop                  : makeKeywordObj('cli', ''),
      _strike                : makeKeywordObj('cli', ''),
      _style                 : makeKeywordObj('cli', ''),
      _submit                : makeKeywordObj('cli', ''),
      _sup                   : makeKeywordObj('cli', ''),
      _taint                 : makeKeywordObj('cli', ''),
      _taintEnabled          : makeKeywordObj('cli', ''),
      _text                  : makeKeywordObj('cli', ''),
      _textContent           : makeKeywordObj('cli', ''),
      _textarea              : makeKeywordObj('cli', ''),
      _top                   : makeKeywordObj('cli', ''),
      _untaint               : makeKeywordObj('cli', ''),
      _window                : makeKeywordObj('cli', ''),

      // jQuery Objects
      _$     : makeKeywordObj('jqu', ''),
      _jQuery: makeKeywordObj('jqu', '')
    };

    Object.freeze(keywords);

    ////////////////////////////////////////////////////////////////////////////
    // Setup the keyword properties

    // Array
    keywords._Array.props._from    = makePropObj('');
    keywords._Array.props._isArray = makePropObj('');
    keywords._Array.props._observe = makePropObj('');
    keywords._Array.props._of      = makePropObj('');
    Object.freeze(keywords._Array.props);

    // ArrayBuffer
    keywords._ArrayBuffer.props._isView   = makePropObj('');
    keywords._ArrayBuffer.props._transfer = makePropObj('');
    Object.freeze(keywords._ArrayBuffer.props);

    // Date
    keywords._Date.props._UTC   = makePropObj('');
    keywords._Date.props._now   = makePropObj('');
    keywords._Date.props._parse = makePropObj('');
    Object.freeze(keywords._Date.props);

    // JSON
    keywords._JSON.props._parse     = makePropObj('');
    keywords._JSON.props._stringify = makePropObj('');
    Object.freeze(keywords._JSON.props);

    // Math
    keywords._Math.props._abs    = makePropObj('');
    keywords._Math.props._acos   = makePropObj('');
    keywords._Math.props._asin   = makePropObj('');
    keywords._Math.props._atan   = makePropObj('');
    keywords._Math.props._atan2  = makePropObj('');
    keywords._Math.props._ceil   = makePropObj('');
    keywords._Math.props._cos    = makePropObj('');
    keywords._Math.props._exp    = makePropObj('');
    keywords._Math.props._floor  = makePropObj('');
    keywords._Math.props._log    = makePropObj('');
    keywords._Math.props._max    = makePropObj('');
    keywords._Math.props._min    = makePropObj('');
    keywords._Math.props._pow    = makePropObj('');
    keywords._Math.props._random = makePropObj('');
    keywords._Math.props._round  = makePropObj('');
    keywords._Math.props._sin    = makePropObj('');
    keywords._Math.props._sqrt   = makePropObj('');
    keywords._Math.props._tan    = makePropObj('');
    Object.freeze(keywords._Math.props);

    // Number
    keywords._Number.props._EPSILON           = makePropObj('');
    keywords._Number.props._isNaN             = makePropObj('');
    keywords._Number.props._isFinite          = makePropObj('');
    keywords._Number.props._isInteger         = makePropObj('');
    keywords._Number.props._isSafeInteger     = makePropObj('');
    keywords._Number.props._MAX_SAFE_INTEGER  = makePropObj('');
    keywords._Number.props._MAX_VALUE         = makePropObj('');
    keywords._Number.props._MIN_SAFE_INTEGER  = makePropObj('');
    keywords._Number.props._MIN_VALUE         = makePropObj('');
    keywords._Number.props._NaN               = makePropObj('');
    keywords._Number.props._NEGATIVE_INFINITY = makePropObj('');
    keywords._Number.props._parseFloat        = makePropObj('');
    keywords._Number.props._parseInt          = makePropObj('');
    keywords._Number.props._POSITIVE_INFINITY = makePropObj('');
    Object.freeze(keywords._Number.props);

    // Object
    keywords._Object.props._assign                   = makePropObj('');
    keywords._Object.props._create                   = makePropObj('');
    keywords._Object.props._defineProperty           = makePropObj('');
    keywords._Object.props._defineProperties         = makePropObj('');
    keywords._Object.props._freeze                   = makePropObj('');
    keywords._Object.props._getOwnPropertyDescriptor = makePropObj('');
    keywords._Object.props._getOwnPropertyNames      = makePropObj('');
    keywords._Object.props._getOwnPropertySymbols    = makePropObj('');
    keywords._Object.props._getPrototypeOf           = makePropObj('');
    keywords._Object.props._is                       = makePropObj('');
    keywords._Object.props._isExtensible             = makePropObj('');
    keywords._Object.props._isFrozen                 = makePropObj('');
    keywords._Object.props._isSealed                 = makePropObj('');
    keywords._Object.props._keys                     = makePropObj('');
    keywords._Object.props._observe                  = makePropObj('');
    keywords._Object.props._preventExtensions        = makePropObj('');
    keywords._Object.props._seal                     = makePropObj('');
    keywords._Object.props._setPrototypeOf           = makePropObj('');
    Object.freeze(keywords._Object.props);

    // String
    keywords._String.props._fromCharCode  = makePropObj('');
    keywords._String.props._fromCodePoint = makePropObj('');
    keywords._String.props._raw           = makePropObj('');
    Object.freeze(keywords._String.props);

    // Symbol
    keywords._Symbol.props._for    = makePropObj('');
    keywords._Symbol.props._keyFor = makePropObj('');
    Object.freeze(keywords._Symbol.props);

    // TypedArray
    keywords._TypedArray.props._BYTES_PER_ELEMENT = makePropObj('');
    keywords._TypedArray.props._from              = makePropObj('');
    keywords._TypedArray.props._name              = makePropObj('');
    keywords._TypedArray.props._of                = makePropObj('');
    Object.freeze(keywords._TypedArray.props);

    // console
    keywords._console.props._assert         = makePropObj('');
    keywords._console.props._group          = makePropObj('');
    keywords._console.props._groupCollapsed = makePropObj('');
    keywords._console.props._groupEnd       = makePropObj('');
    keywords._console.props._log            = makePropObj('');
    keywords._console.props._trace          = makePropObj('');
    Object.freeze(keywords._console.props);

    // ImageData
    keywords._ImageData.props._data   = makePropObj('');
    keywords._ImageData.props._height = makePropObj('');
    keywords._ImageData.props._width  = makePropObj('');
    Object.freeze(keywords._ImageData.props);

    prettify.debug.group('makeKeywordObjects', 'end');

/* -----------------------------------------------------------------------------
 * | The Prettifier Methods                                                    |
 * v ------------------------------------------------------------------------- v
                                                        prettify-methods.js */
    /**
     * ---------------------------------------------
     * Public Method (prettify.setConfig)
     * ---------------------------------------------
     * @desc Sets the config settings for the prettifier.
     * @param {Object<string, (number|boolean)>} newConfig - The config
     *   settings for the prettifier.
     * @private
     */
    prettify.setConfig = function(newConfig) {

      prettify.debug.start('setConfig', newConfig);
      prettify.debug.args('setConfig', newConfig, 'object');

      config = newConfig;
      Object.freeze(config);
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLines)
     * ---------------------------------------------
     * @desc Standardizes all line breaks and replaces tabs with spaces.
     * @param {string} solution - The problem's solution to be formatted.
     * @return {strings}
     * @private
     */
    function prepareLines(solution) {

      prettify.debug.group('init', 'coll', 'Open to see original string');
      prettify.debug.start('prepareLines', solution);
      prettify.debug.group('init', 'end');
      prettify.debug.args('prepareLines', solution, 'string');

      /** @type {string} */
      var spaces;
      /** @type {number} */
      var spaceCount;

      // Standardize all line breaks
      solution = solution.replace(/\r\n?/g, '\n');

      // Replace all tabs with spaces
      spaces = '';
      spaceCount = config.tabLength;
      while (spaceCount--) {
        spaces += ' ';
      }
      if (spaces) {
        solution = solution.replace(/\t/g, '  ');
      }

      return solution.split('\n');
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormatting)
     * ---------------------------------------------
     * @desc Applies the prettifier formats.
     * @param {strings} lines - An array of code lines.
     * @return {{
     *   result   : string,
     *   lineCount: number
     * }}
     * @private
     */
    function applyFormatting(lines) {

      // Debugging vars
      var msg;
      prettify.debug.start('applyFormatting', lines);
      prettify.debug.args('applyFormatting', lines, 'strings');

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {} */
      var line;

      commentOpen = false;
      len = lines.length;

      i = -1;
      while (++i < len) {

        msg = 'lineNumber= $$';
        prettify.debug.group('applyFormatting', 'coll', msg, (i + 1));

        line = prepareLine(lines[i]);

        if (line) {
          line = highlightSyntax(line, i);
        }

        lines[i] = '<li>'+ line +'</li>';

        prettify.debug.state('applyFormatting', 'lineOutput= $$', lines[i]);
        prettify.debug.group('applyFormatting', 'end');
      }

      return {
        result   : lines.join(''),
        lineCount: len
      };
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLine)
     * ---------------------------------------------
     * @desc Removes whitespaces from line beginning and end.
     * @param {string} line - The line of code to prepare.
     * @return {string}
     * @private
     */
    function prepareLine(line) {

      prettify.debug.start('prepareLine', line);
      prettify.debug.args('prepareLine', line, 'string');

      /** @type {number} */
      var i;
      /** @type {number} */
      var frontTrimCount;
      /** @type {string} */
      var trimPart;

      // Trim ending whitespaces
      if (line) {
        i = line.length - 1;
        if (line.charAt(i) === ' ') {
          --i;
          while (line.charAt(i) === ' ') {
            --i;
          }
          line = line.substr(0, i);
        }
      }

      // Trim beginning whitespaces
      frontTrimCount = config.trimSpace;
      if (line && frontTrimCount) {

        trimPart = ( (frontTrimCount < line.length) ?
          line.substr(0, frontTrimCount) : ''
        );
        if (trimPart && !/[^\s]/.test(trimPart)) {
          // Trim full count
          line = line.substr(frontTrimCount);
        }
        else {
          // Trim partial count
          i = 0;
          while (line.charAt(i) === ' ') {
            ++i;
          }
          line = line.substr(i);
        }
      }

      return line;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeKeywordObj)
     * ---------------------------------------------
     * @desc Creates a keyword object.
     * @param {string} cat - The keyword's category.
     * @param {string=} href - The keyword's details link.
     * @param {boolean=} props - Whether the keyword has properties.
     * @return {Object<string, (string|numberMap)>}
     * @private
     */
    function makeKeywordObj(cat, href, props) {

      // Debugging vars
      var args;
      prettify.debug.start('makeKeywordObj', cat, href, props);
      args = [ 'makeKeywordObj' ];
      args.push(cat, 'string', href, 'string=', props, 'boolean=');
      prettify.debug.args(args);

      /** @type {Object<string, (string|numberMap)>} */
      var obj;

      href = href || '';
      props = props || false;

      obj = {};

      obj.cat = cat;
      obj.href = href;
      obj.props = (props) ? {} : false;

      return Object.freeze(obj);
    }

    /**
     * ---------------------------------------------
     * Private Method (makePropObj)
     * ---------------------------------------------
     * @desc Creates a keyword property object.
     * @param {string=} href - The keyword's details link.
     * @return {stringMap}
     * @private
     */
    function makePropObj(href) {

      prettify.debug.start('makePropObj', href);
      prettify.debug.args('makePropObj', href, 'string=');

      /** @type {stringMap} */
      var obj;

      href = href || '';

      obj = {};
      obj.href = href;

      return Object.freeze(obj);
    }

/* -----------------------------------------------------------------------------
 * | The Highlight Syntax Method                                               |
 * v ------------------------------------------------------------------------- v
                                                        highlight-syntax.js */
    /**
     * ---------------------------------------------
     * Private Method (highlightSyntax)
     * ---------------------------------------------
     * @desc Adds spans around reserved code characters to highlight
     *   specific syntax for a line of code.
     * @param {string} line - The line of code to highlight.
     * @return {string}
     * @private
     */
    var highlightSyntax = (function() {

      var highlightSyntax = function(line) {

        highlightSyntax.debug.start('init', line);
        highlightSyntax.debug.args('init', line, 'string');

        prepareLine(line);
        formatLine();

        return newLine.join('');
      };

/* -----------------------------------------------------------------------------
 * | The Syntax Highlighter Vars                                               |
 * v ------------------------------------------------------------------------- v
                                                   highlight-syntax-vars.js */
      /**
       * ---------------------------------------------------
       * Public Property (highlight.debug)
       * ---------------------------------------------------
       * @desc The Debug instance for the syntax highlighter.
       * @type {Debug}
       */
      highlightSyntax.debug = aIV.debug('highlightSyntax');

      /**
       * ---------------------------------------------
       * Private Variable (newLine)
       * ---------------------------------------------
       * @desc The formatted line of code.
       * @type {strings}
       * @private
       */
      var newLine;

      /**
       * ---------------------------------------------
       * Private Variable (orgLine)
       * ---------------------------------------------
       * @desc The original line of code.
       * @type {strings}
       * @private
       */
      var orgLine;

      /**
       * ---------------------------------------------
       * Private Variable (lineLen)
       * ---------------------------------------------
       * @desc The length of the line of code.
       * @type {number}
       * @private
       */
      var lineLen;

      /**
       * ---------------------------------------------
       * Private Variable (lastIndex)
       * ---------------------------------------------
       * @desc The last index of the line of code.
       * @type {number}
       * @private
       */
      var lastIndex;

      /**
       * ---------------------------------------------
       * Private Variable (router)
       * ---------------------------------------------
       * @desc A hash map that stores the matching character
       *  formatting methods.
       * @type {objectMap}
       * @private
       */
      var router = {
        "'": formatString,
        '"': formatString,
        ' ': formatSpace,
        '{': formatBracket,
        '[': formatBracket,
        '(': formatBracket,
        ')': formatBracket,
        ']': formatBracket,
        '}': formatBracket,
        '*': formatOperator,
        '%': formatOperator,
        '+': formatOperator,
        '-': formatOperator,
        '<': formatOperator,
        '>': formatOperator,
        '&': formatOperator,
        '^': formatOperator,
        '|': formatOperator,
        '=': formatOperator,
        '!': formatOperator,
        '~': formatOperator,
        '?': formatOperator,
        ',': formatComma,
        ';': formatSemicolon,
        ':': formatColon,
        '.': formatPeriod,
        '0': formatNumber,
        '1': formatNumber,
        '2': formatNumber,
        '3': formatNumber,
        '4': formatNumber,
        '5': formatNumber,
        '6': formatNumber,
        '7': formatNumber,
        '8': formatNumber,
        '9': formatNumber,
        '/': handleSlash
      };
      Object.freeze(router);

/* -----------------------------------------------------------------------------
 * | The Syntax Highlighter Methods                                            |
 * v ------------------------------------------------------------------------- v
                                                highlight-syntax-methods.js */
      /**
       * ---------------------------------------------
       * Private Method (prepareLine)
       * ---------------------------------------------
       * @desc Prepares the line to be highlighted.
       * @param {string} line - The line of code to prepare.
       * @private
       */
      function prepareLine(line) {

        // Debugging vars
        var msg;
        highlightSyntax.debug.start('prepareLine', line);
        highlightSyntax.debug.args('prepareLine', line, 'string');

        orgLine = line.split('');
        Object.freeze(orgLine);
        newLine = line.split('');
        lineLen = line.length;
        lastIndex = (lineLen) ? lineLen - 1 : 0;

        msg = 'lineLen= $$, lastIndex= $$';
        highlightSyntax.debug.state('prepareLine', msg, lineLen, lastIndex);
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLine)
       * ---------------------------------------------
       * @desc Adds highlighting spans to line of code.
       * @type {function}
       * @private
       */
      function formatLine() {

        highlightSyntax.debug.start('formatLine');

        /** @type {number} */
        var i;
        /** @type {function} */
        var format;

        i = -1;

        if (commentOpen) {
          i = formatCommentStart();
        }

        // Format the line (add the spans)
        while (++i < lineLen) {
          format = ( ( router.hasOwnProperty(orgLine[i]) ) ?
            router[ orgLine[i] ] : identifierStart.test(orgLine[i]) ?
              formatIdentifier : formatMisc
          );
          i = format(i);
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (handleSlash)
       * ---------------------------------------------
       * @desc Handles which formatting method a slash should use.
       * @param {number} i - The current line index being formatted.
       * @return {number} The index's new location.
       * @private
       */
      function handleSlash(i) {

        highlightSyntax.debug.start('handleSlash', i);
        highlightSyntax.debug.args('handleSlash', i, 'number');

        /** @type {val} */
        var preceding;
        /** @type {number} */
        var end;

        // Handle line comment
        if (orgLine[i + 1] === '/') {
          return formatLineComment(i);
        }

        // Handle comment opening
        if (orgLine[i + 1] === '*') {
          return formatCommentOpen(i);
        }

        // Save preceding character
        preceding = ( (orgLine[i - 1] === ' ') ?
          orgLine[i - 2] : orgLine[i - 1]
        );

        // Handle RegExp
        if (i === 0 || preRegex.test(preceding)) {
          end = isRegex(i);
          if (end) {
            return formatRegex(i, end);
          }
        }

        // Handle operator
        return formatOperator(i);
      }

      /**
       * ---------------------------------------------
       * Private Method (isRegex)
       * ---------------------------------------------
       * @desc Determines if the given index is a regular expression.
       * @param {number} i - The line index to check.
       * @return {number} The last index of the RegExp if RegExp check
       *   passes or 0 if RegExp check fails.
       * @private
       */
      function isRegex(i) {

        // Debugging vars
        var msg;
        highlightSyntax.debug.start('isRegex', i);
        highlightSyntax.debug.args('isRegex', i, 'number');

        /** @type {number} */
        var end;
        /** @type {string} */
        var regexBody;

        end = i + 1;

        if (orgLine[end] === '/') {
          return 0;
        }

        // Find regex end index
        while (true) {

          if (end >= lineLen) {
            return 0;
          }

          sanitizeCharacter(end);

          if (orgLine[end] === '\\') {
            ++end;
            continue;
          }

          if (orgLine[end] === '/') {
            break;
          }

          ++end;
        }

        regexBody = orgLine.slice(++i, end).join('');

        try {
          new RegExp(regexBody);
        }
        catch (e) {
          msg = 'new RegExp(regexBody) error= $$';
          highlightSyntax.debug.state('isRegex', msg, e);
          end = 0;
        }

        return end;
      }

      /**
       * ---------------------------------------------
       * Private Method (sanitizeCharacter)
       * ---------------------------------------------
       * @desc Inserts html entities when needed.
       * @param {number} i - The line index to check.
       * @private
       */
      function sanitizeCharacter(i) {

        highlightSyntax.debug.start('sanitizeCharacter', i);
        highlightSyntax.debug.args('sanitizeCharacter', i, 'number');

        if ( htmlEntity.hasOwnProperty(orgLine[i]) ) {
          newLine[i] = htmlEntity[ orgLine[i] ];
        };
      }

      /**
       * ---------------------------------------------
       * Private Method (skipComment)
       * ---------------------------------------------
       * @desc Moves the index to the end of comment.
       * @param {number} i - The starting line index.
       * @return {number} The comment's end index.
       * @private
       */
      function skipComment(i) {

        highlightSyntax.debug.start('skipComment', i);
        highlightSyntax.debug.args('skipComment', i, 'number');

        while (true) {
          ++i;

          if (i >= lineLen) {
            return i;
          }

          sanitizeCharacter(i);

          if (orgLine[i] === '*' && i !== lastIndex && orgLine[i + 1] === '/') {
            return ++i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipString)
       * ---------------------------------------------
       * @desc Moves the index to the end of the string.
       * @param {number} i - The starting line index.
       * @return {number} The string's end index.
       * @private
       */
      function skipString(i) {

        highlightSyntax.debug.start('skipString', i);
        highlightSyntax.debug.args('skipString', i, 'number');

        /** @type {string} */
        var stringType;

        stringType = orgLine[i];

        while (true) {
          ++i;

          if (i >= lineLen) {
            return lastIndex;
          }

          sanitizeCharacter(i);

          if (orgLine[i] === '\\') {
            ++i;
            continue;
          }

          if (orgLine[i] === stringType) {
            return i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipSpace)
       * ---------------------------------------------
       * @desc Moves the index to the end of the sequence of spaces.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipSpace(i) {

        highlightSyntax.debug.start('skipSpace', i);
        highlightSyntax.debug.args('skipSpace', i, 'number');

        while (true) {
          ++i;

          if (orgLine[i] !== ' ') {
            return --i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipNumber)
       * ---------------------------------------------
       * @desc Moves the index to the end of the number.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipNumber(i) {

        highlightSyntax.debug.start('skipNumber', i);
        highlightSyntax.debug.args('skipNumber', i, 'number');

        /** @type {string} */
        var hexStart;
        /** @type {RegExp} */
        var numberOpts;

        hexStart = (i !== lastIndex) ? orgLine[i] + orgLine[i + 1] : '';
        numberOpts = ( (hexStart === '0x' || hexStart === '0X') ?
          hexNumbers : plainNumbers
        );

        while (true) {
          ++i;

          if (i === lineLen) {
            return lastIndex;
          }

          if ( !numberOpts.test(orgLine[i]) ) {
            return --i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * @desc Moves the index to the end of the identifier.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipIdentifier(i) {

        highlightSyntax.debug.start('skipIdentifier', i);
        highlightSyntax.debug.args('skipIdentifier', i, 'number');

        /** @type {string} */
        var name;
        /** @type {boolean} */
        var propFollows;

        name = '_' + orgLine[i];

        while (true) {
          ++i;

          if (i === lineLen) {
            return {
              endIndex   : --i,
              name       : name,
              propFollows: false
            };
          }

          if ( identifiers.test(orgLine[i]) ) {
            name += orgLine[i];
            continue;
          }

          propFollows = (orgLine[i] === '.');
          return {
            endIndex   : --i,
            name       : name,
            propFollows: propFollows
          };
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentLinks)
       * ---------------------------------------------
       * @desc Formats links in a comment.
       * @param {number} start - The line index for the comment start.
       * @param {number} end - The line index for the comment end.
       * @private
       */
      function formatCommentLinks(start, end) {

        // Debugging vars
        var args;
        highlightSyntax.debug.start('formatCommentLinks', start, end);
        args = [ 'formatCommentLinks' ];
        args.push(start, 'number', end, 'number');
        highlightSyntax.debug.args(args);

        /** @type {string} */
        var comment;
        /** @type {number} */
        var i;
        /** @type {string} */
        var href;
        /** @type {string} */
        var content;

        if (end === lastIndex) {
          ++end;
        }

        comment = orgLine.slice(start, end).join('');

        if ( !commentLinks.test(comment) ) {
          return;
        }

        while (true) {
          i = comment.search(commentLinks);

          if (i === -1) {
            return;
          }

          i += start + 1;

          args = [ 'formatCommentLinks' ];
          args.push('i= $$, start= $$, newLine[i]= $$');
          args.push(i, start, newLine[i]);
          highlightSyntax.debug.state(args);

          newLine[i] = '';
          ++i;

          href = '';
          content = '';

          // Get the content
          while (orgLine[i] !== ']') {
            newLine[i] = '';
            content += orgLine[i];
            ++i;
          }

          newLine[i] = '';
          ++i;
          newLine[i] = '';
          ++i;

          // Get the href
          while (orgLine[i] !== ')') {
            newLine[i] = '';
            href += orgLine[i];
            ++i;
          }

          // Save the link
          newLine[i] = '<a href="' + href + '" target="_blank">' + content + '</a>';

          // Remove that link from the comment string
          comment = comment.substr(i);
          start = i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentOpen)
       * ---------------------------------------------
       * @desc Opens a comment, adds comment spans, and 
       *   moves the index to the end of comment.
       * @param {number} i - The current line index.
       * @return {number} The comment's end index.
       * @private
       */
      function formatCommentOpen(i) {

        highlightSyntax.debug.start('formatCommentOpen', i);
        highlightSyntax.debug.args('formatCommentOpen', i, 'number');

        /** @type {number} */
        var start;

        start = i;

        newLine[i] = '<span class="cmt">/';
        ++i;
        i = (i < lastIndex) ? skipComment(i) : ++i;

        if (i >= lineLen) {
          commentOpen = true;
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if (config.commentLinks) {
          formatCommentLinks(start, i);
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentStart)
       * ---------------------------------------------
       * @desc Adds comment spans and moves the index to the end
       *   of the comment for a line inheriting an already open
       *   comment (i.e. line began as a comment).
       * @return {number} 
       * @private
       */
      function formatCommentStart() {

        highlightSyntax.debug.start('formatCommentStart');

        /** @type {number} */
        var i;

        newLine[0] = '<span class="cmt">' + orgLine[0];

        if (orgLine[0] === '*' && orgLine[1] === '/') {
          commentOpen = false;
          newLine[1] += '</span>';
          return 3;
        }

        i = skipComment(0);
        commentOpen = (i < lineLen) ? false : true;

        if (i > lastIndex) {
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if (config.commentLinks) {
          formatCommentLinks(0, i);
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLineComment)
       * ---------------------------------------------
       * @desc Adds comment spans and moves index to line end.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatLineComment(i) {

        highlightSyntax.debug.start('formatLineComment', i);
        highlightSyntax.debug.args('formatLineComment', i, 'number');

        if (config.commentLinks) {
          formatCommentLinks(i, lastIndex);
        }

        newLine[i] = '<span class="cmt">/';
        i = lastIndex;
        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatString)
       * ---------------------------------------------
       * @desc Adds string spans and moves the index to the
       *   end of string.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatString(i) {

        highlightSyntax.debug.start('formatString', i);
        highlightSyntax.debug.args('formatString', i, 'number');

        newLine[i] = '<span class="str">' + orgLine[i];

        i = skipString(i);

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatRegex)
       * ---------------------------------------------
       * @desc Adds RegExp spans and moves the index to the
       *   end of RegExp.
       * @param {number} i - The current line index.
       * @param {number} end - The last index of the RegExp.
       * @return {number} The last index.
       * @private
       */
      function formatRegex(i, end) {

        highlightSyntax.debug.start('formatRegex', i, end);
        highlightSyntax.debug.args('formatRegex', i, 'number', end, 'number');

        /** @type {string} */
        var usedFlags;
        /** @type {string} */
        var character;

        newLine[i] = '<span class="rgx">/';

        i = end;
        usedFlags = '';

        // Check for RegExp flags
        while (true) {
          ++i;

          character = orgLine[i];

          if (regexFlags.test(character) &&
              usedFlags.indexOf(character) === -1) {
            usedFlags += character;
            if (usedFlags.length < 4) {
              continue;
            }
          }

          --i;
          break;
        }

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSpace)
       * ---------------------------------------------
       * @desc Adds space spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatSpace(i) {

        highlightSyntax.debug.start('formatSpace', i);
        highlightSyntax.debug.args('formatSpace', i, 'number');

        newLine[i] = '<span class="spc"> ';

        i = skipSpace(i);

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatBracket)
       * ---------------------------------------------
       * @desc Adds bracket spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatBracket(i) {

        highlightSyntax.debug.start('formatBracket', i);
        highlightSyntax.debug.args('formatBracket', i, 'number');

        newLine[i] = '<span class="brc">' + orgLine[i] + '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatOperator)
       * ---------------------------------------------
       * @desc Adds operator spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatOperator(i) {

        highlightSyntax.debug.start('formatOperator', i);
        highlightSyntax.debug.args('formatOperator', i, 'number');

        sanitizeCharacter(i);

        newLine[i] = '<span class="opr">' + newLine[i] + '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatComma)
       * ---------------------------------------------
       * @desc Adds comma spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatComma(i) {

        highlightSyntax.debug.start('formatComma', i);
        highlightSyntax.debug.args('formatComma', i, 'number');

        newLine[i] = '<span class="cmm">,</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSemicolon)
       * ---------------------------------------------
       * @desc Adds semicolon spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatSemicolon(i) {

        highlightSyntax.debug.start('formatSemicolon', i);
        highlightSyntax.debug.args('formatSemicolon', i, 'number');

        newLine[i] = '<span class="smc">;</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatColon)
       * ---------------------------------------------
       * @desc Adds colon spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatColon(i) {

        highlightSyntax.debug.start('formatColon', i);
        highlightSyntax.debug.args('formatColon', i, 'number');

        newLine[i] = '<span class="cln">:</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatPeriod)
       * ---------------------------------------------
       * @desc Adds period spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatPeriod(i) {

        highlightSyntax.debug.start('formatPeriod', i);
        highlightSyntax.debug.args('formatPeriod', i, 'number');

        newLine[i] = '<span class="per">.</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatNumber)
       * ---------------------------------------------
       * @desc Adds number spans and moves the index to the
       *   end of number.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatNumber(i) {

        highlightSyntax.debug.start('formatNumber', i);
        highlightSyntax.debug.args('formatNumber', i, 'number');

        newLine[i] = '<span class="num">' + orgLine[i];

        i = skipNumber(i);

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatIdentifier)
       * ---------------------------------------------
       * @desc Finds complete identifier, checks whether it is a keyword,
       *   adds the correct span tags, and moves the index to the end of
       *   the identifier.
       * @param {number} i - The current line index.
       * @param {string=} extras - The id for the keyword object to get
       *   extra keywords to include in check.
       * @return {number} The last index.
       * @private
       */
      function formatIdentifier(i, extras) {

        // Debugging vars
        var args;
        highlightSyntax.debug.start('formatIdentifier', i, extras);
        args = [ 'formatIdentifier' ];
        args.push(i, 'number', extras, 'string=');
        highlightSyntax.debug.args(args);

        /** @type {{ endIndex: number, name: string, propFollows: boolean }} */
        var identifier;
        /** @type {string} */
        var catID;
        /** @type {string} */
        var keyClassName;

        identifier = skipIdentifier(i);

        // Setup the keyword category and class name
        if ( keywords.hasOwnProperty(identifier.name) ) {

          catID = keywords[identifier.name].cat;
          keyClassName = keywordCategories[catID];

          // Special case for the function keyword
          if (identifier.name === '_function' &&
              (orgLine[identifier.endIndex + 1] === '(' ||
               (orgLine[identifier.endIndex + 1] === ' ' &&
                orgLine[identifier.endIndex + 2] === '('))) {
            keyClassName = keywordCategories['res'];
          }
        }

        if (!keyClassName && !!extras) {
          if ( keywords[extras].props.hasOwnProperty(identifier.name) ) {
            catID = keywords[extras].cat;
            keyClassName = keywordCategories[catID];
          }
        }

        if (!keyClassName) {
          keyClassName = 'idt';
        }

        newLine[i] = '<span class="' + keyClassName + '">' + orgLine[i];

        i = identifier.endIndex;

        newLine[i] += '</span>';

        // Format the identifier's property (dot notation only)
        if (identifier.propFollows) {
          formatPeriod(++i);
          extras = ( ( !keywords.hasOwnProperty(identifier.name) ) ?
            '' : (!keywords[identifier.name].props) ?
              '' : identifier.name
          );
          i = formatIdentifier(++i, extras);
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatMisc)
       * ---------------------------------------------
       * @desc Adds misc spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatMisc(i) {

        highlightSyntax.debug.start('formatMisc', i);
        highlightSyntax.debug.args('formatMisc', i, 'number');

        newLine[i] = '<span class="msc">' + orgLine[i] + '</span>';

        return i;
      }

      return highlightSyntax;
    })();

    return prettify;
  })();


/* -----------------------------------------------------------------------------
 * | The Polyfill Methods                                                      |
 * v ------------------------------------------------------------------------- v
                                                        polyfill-methods.js */
  if (!Object.keys) {
    /**
     * ---------------------------------------------
     * Public Method (Object.keys)
     * ---------------------------------------------
     * @desc A polyfill for the native method. For method details
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
     * @param {!Object} obj
     * @return {vals}
     */
    Object.keys = (function(obj) {

      /** @type {Object} */
      var testObj;
      /** @type {boolean} */
      var enumBug;
      /** @type {strings} */
      var notEnum;

      testObj = { toString: null };
      enumBug = !( testObj.propertyIsEnumerable('toString') );
      notEnum = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ];

      return function(obj) {

        polyfill.debug.start('Object.keys', obj);
        polyfill.debug.args('Object.keys', obj, '!object|function');

        if (typeof obj !== 'object' && typeof obj !== 'function') {
          throw new TypeError('Object.keys only accepts objects.');
          return;
        }

        if (obj === null) {
          throw new TypeError('Object.keys does not accept null types.');
          return;
        }

        /** @type {string} */
        var prop;
        /** @type {number} */
        var i;
        /** @type {vals} */
        var result;

        result = [];

        for (prop in obj) {
          if ( obj.hasOwnProperty(prop) ) {
            result.push(prop);
          }
        }

        if (enumBug) {
          i = notEnum.length;
          while (i--) {
            if ( obj.hasOwnProperty(notEnum[i]) ) {
              result.push(notEnum[i]);
            }
          }
        }

        return result;
      };
    })();
  }

  if (!Object.freeze) {
    /**
     * ---------------------------------------------
     * Public Method (Object.freeze)
     * ---------------------------------------------
     * @desc A polyfill for the native method. For method details
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}
     * @param {Object} obj
     * @return {Object}
     */
    Object.freeze = function(obj) {

      polyfill.debug.start('Object.freeze', obj);
      polyfill.debug.args('Object.freeze', obj, 'object|function');

      if (typeof obj !== 'object' && typeof obj !== 'function') {
        throw new TypeError('Object.freeze only accepts objects.');
        return;
      }

      return obj;
    };
  }

  // Fix Object.freeze function param bug
  try {
    Object.freeze(function() {});
  }
  catch (e) {
    Object.freeze = (function(originalFreeze) {
      return function(obj) {
        if (typeof obj === 'function') {
          return obj;
        }
        else {
          return originalFreeze(obj);
        }
      };
    }(Object.freeze));
  }


/* -----------------------------------------------------------------------------
 * | The External API for the Module                                           |
 * v ------------------------------------------------------------------------- v
                                                            external-api.js */
  /**
   * -----------------------------------------------------
   * Private Variable (_initialized)
   * -----------------------------------------------------
   * @desc Indicates whether the app has been initialized.
   * @type {boolean}
   * @private
   */
  var _initialized = false;

  /**
   * -----------------------------------------------------
   * Public Method (_init)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {Object} settings - The app's settings.
   */
  var _init = function(settings) {

    // Debugging vars
    var errorMsg, failCheck;
    debug.start('init', settings);
    debug.args('init', settings, 'object');
    errorMsg = 'Error: A second attempt to init this app occurred.';
    debug.fail('init', (!_initialized), errorMsg);

    /**
     * @type {?(string|strings)}
     * @private
     */
    var resourceList;
    /**
     * @type {?objectMap}
     * @private
     */
    var config;
    /**
     * @type {?stringMap}
     * @private
     */
    var sources;
    /**
     * @type {?(objectMap|stringMap)}
     * @private
     */
    var categories;
    /**
     * @type {?objects}
     * @private
     */
    var questions;
    /**
     * @type {function}
     * @private
     */
    var setup;
    /**
     * @type {function}
     * @private
     */
    var callback;
    /**
     * @type {number}
     * @private
     */
    var i;

    // Check if app has been initialized
    if (_initialized) {
      return;
    }

    // Save the init of this app to prevent second init
    _initialized = true;

    // Check the settings arg
    if (!settings || !checkType(settings, 'object')) {
      settings = {};
    }

    // Setup the app arguments
    resourceList = ( ( settings.hasOwnProperty('resources') ) ?
      settings.resources : null
    );
    config = ( ( settings.hasOwnProperty('config') ) ?
      settings.config : ( settings.hasOwnProperty('configuration') ) ?
        settings.configuration : null
    );
    sources = ( ( settings.hasOwnProperty('sources') ) ?
      settings.sources : ( settings.hasOwnProperty('source') ) ?
        settings.source : null
    );
    categories = ( ( settings.hasOwnProperty('categories') ) ?
      settings.categories : ( settings.hasOwnProperty('category') ) ?
        settings.category : null
    );
    questions = ( ( settings.hasOwnProperty('questions') ) ?
      settings.questions : ( settings.hasOwnProperty('question') ) ?
        settings.question : null
    );

    failCheck = checkType(resourceList, 'string|strings');
    errorMsg = 'Error: The given resources property was an ';
    errorMsg += 'incorrect data type. resources= $$';
    debug.fail('init', failCheck, errorMsg, resourceList);

    failCheck = checkType(config, 'objectMap');
    errorMsg = 'Error: The given config property was an ';
    errorMsg += 'incorrect data type. config= $$';
    debug.fail('init', failCheck, errorMsg, config);

    failCheck = checkType(sources, 'stringMap');
    errorMsg = 'Error: The given sources property was an ';
    errorMsg += 'incorrect data type. sources= $$';
    debug.fail('init', failCheck, errorMsg, sources);

    failCheck = checkType(categories, 'stringMap|objectMap');
    errorMsg = 'Error: The given categories property was an ';
    errorMsg += 'incorrect data type. categories= $$';
    debug.fail('init', failCheck, errorMsg, categories);

    errorMsg = 'Error: No questions were provided.';
    debug.fail('init', (!!questions), errorMsg);

    if (questions) {
      failCheck = (checkType(questions, 'objects') && !!questions.length);
      errorMsg = 'Error: The given questions property was an ';
      errorMsg += 'incorrect data type. questions= $$';
      debug.fail('init', failCheck, errorMsg, questions);
    }

    // Check the types of the arguments
    if ( !checkType(resourceList, 'string|strings') ) {
      resourceList = null;
    }
    if ( !checkType(config, 'objectMap') ) {
      config = null;
    }
    if ( !checkType(sources, 'stringMap') ) {
      sources = null;
    }
    if ( !checkType(categories, 'stringMap|objectMap') ) {
      categories = null;
    }
    if ( checkType(questions, 'objects') ) {
      if (!questions.length) {
        questions = null;
      }
    }
    else {
      questions = null;
    }

    // Setup and start the app
    setup = function() {
      Object.freeze(resources);
      app = new App(config, sources, categories, questions);
      Object.freeze(app);
      app.setupDisplay();
    };

    // Save the resources
    if (resourceList) {

      if (typeof resourceList === 'string') {
        getResource(resourceList, setup);
        return;
      }

      callback = setup;
      console.log(callback);
      i = resourceList.length;
      while (--i) {
        callback = (function() {
          /** @type {function} */
          var _callback;
          /** @type {number} */
          var _i;

          _callback = callback;
          _i = i;
          
          return function() {
            getResource(resourceList[_i], _callback);
          };
        })();
      }
      getResource(resourceList[0], callback);
      return;
    }

    setup();
  };

  /**
   * -----------------------------------------------------
   * Public Method (_init.getResource)
   * -----------------------------------------------------
   * @desc Makes the app's resources publically available.
   * @param {string=} prop - The specific resource to retrieve.
   * @return {val} Either the entire resources object or one of its properties.
   */
  _init.getResource = function(prop) {

    debug.start('init.getResource', prop);
    debug.args('init.getResource', prop, 'string=');
    debug.state('init.getResource', 'resources= $$', resources);

    return (!!prop) ? resources[ prop ] : resources;
  }

  Object.freeze(_init);
  Object.freeze(_init.getResource);


/* -----------------------------------------------------------------------------
 * | End of module                                                             |
 * v ------------------------------------------------------------------------- v
                                                                            */
  return _init;

})(window, document));