/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Question Manager App (v1.1.2)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's question manager is a JavaScript app designed to manage
 *   practice questions and JavaScript coded solutions for learning computer
 *   science focused algorithms and data structures, improving programming
 *   skill-sets, and preparing for technical interviews.
 * @module aIVApp
 * @version 1.1.2
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The Apache License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 * @desc More details about aIV's question manager:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
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
 * @typedef {Array<*>} vals
 * @typedef {Array<number>} numbers
 * @typedef {Array<string>} strings
 * @typedef {Array<Object>} objects
 * @typedef {Array<Element>} elements
 * @typedef {Array<Question>} questions
 * @typedef {Array<{name: string, href: string}>} links
 * @typedef {Object<string, string>} stringMap
 * @typedef {Object<string, number>} numberMap
 * @typedef {Object<string, object>} objectMap
 * @typedef {Object<string, boolean>} booleanMap
 * @typedef {Object<string, Element>} elementMap
 * @typedef {Object<string, strings>} stringsMap
 */

////////////////////////////////////////////////////////////////////////////////
// The Dependencies
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (dependencies/algorithmIV-utils.min.js)
 * -------------------------------------------------------------------------- */

/* Algorithm IV JavaScript Polyfills (v0.0.1) (learn@algorithmiv.com)
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/docs/license) */
(function(h,m,n){h.console=h.console||{};(function(a,b){a.log||(a.log=b);a.error||(a.error=a.log);a.assert||(a.assert=function(b){var c;if(!b)return c=1<arguments.length?Array.prototype.slice.call(arguments,1):["A console.assert call failed."],a.error.apply(this,c)});a.clear||(a.clear=b);a.count||(a.count=b);a.debug||(a.debug=a.log);a.dir||(a.dir=a.log);a.dirxml||(a.dirxml=a.log);a.exception||(a.exception=a.error);a.group||(a.group=b);a.groupCollapsed||(a.groupCollapsed=a.group);a.groupEnd||(a.groupEnd=
b);a.info||(a.info=a.log);a.markTimeline||(a.markTimeline=a.timeStamp?a.timeStamp:b);a.profile||(a.profile=b);a.profileEnd||(a.profileEnd=b);a.table||(a.table=b);a.time||(a.time=b);a.timeEnd||(a.timeEnd=b);a.timeline||(a.timeline=b);a.timelineEnd||(a.timelineEnd=b);a.timeStamp||(a.timeStamp=a.markTimeline);a.trace||(a.trace=a.log);a.warn||(a.warn=a.error);(function(b,c,f,h){var d,k,l,g;if(b)if(l=["assert","error","info","log","warn"],g=["clear","dir","profile","profileEnd"],g=l.concat(g),c)for(d=
g.length;d--;)k=a[g[d]],a[g[d]]=c.call(k,a);else for(d=l.length;d--;)k=a[l[d]],f.call(k,a,h.call(arguments))})("object"===typeof a.log,Function.prototype.bind,Function.prototype.call,Array.prototype.slice)})(h.console,function(){});Object.keys||(Object.keys=function(){var a,b;a=!{toString:null}.propertyIsEnumerable("toString");b="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" ");return function(e){var c,f;if(!e||"object"!==typeof e&&"function"!==
typeof e)throw new TypeError("An Object.keys call received an invalid object parameter. Note: It only accepts non-null objects and functions.");f=[];for(c in e)e.hasOwnProperty(c)&&f.push(c);if(a)for(c=b.length;c--;)e.hasOwnProperty(b[c])&&f.push(b[c]);return f}}());Object.freeze||(Object.freeze=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.freeze call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return a});
try{Object.freeze(function(){})}catch(p){Object.freeze=function(a){return function(b){return"function"===typeof b?b:a(b)}}(Object.freeze)}Object.isFrozen||(Object.isFrozen=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.isFrozen call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return!0});Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)})})(window,document);

/* Algorithm IV JavaScript Shortcuts (v1.0.4) (learn@algorithmiv.com)
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/docs/license) */
(function(u,n){u.aIV=u.aIV||{};aIV.utils=aIV.utils||n})(window,function(u,n,y){var e={},f={checkArgsErrorMsg:"A function call had an invalid parameter data type.",getElemByClassRoot:n,getElemsByClassRoot:n,getElemByTagRoot:n,getElemsByTagRoot:n,types:{checkArgsErrorMsg:"string|function",getElemByClassRoot:"!(Document|Element)",getElemsByClassRoot:"!(Document|Element)",getElemByTagRoot:"!(Document|Element)",getElemsByTagRoot:"!(Document|Element)"}};Object.freeze(f);Object.freeze(f.types);var m={checkArgsErrorMsg:f.checkArgsErrorMsg,
getElemByClassRoot:f.getElemByClassRoot,getElemsByClassRoot:f.getElemsByClassRoot,getElemByTagRoot:f.getElemByTagRoot,getElemsByTagRoot:f.getElemsByTagRoot};e.checkType=function(){var b=/^string$|^number$|^boolean$|^function$|^undefined$/,a=/^string$|^number$|^boolean$|^object$|^function$|^undefined$/,c=/^elem$|^element$|^document$/,e=/^array$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$/,z=/^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,
k=/\!/,m=/\?/,l=/\=/,n=/\*/,f=function(a,b){return null===a?!1:typeof a===b},u=function(a,b){return a&&f(a,"object")&&a.nodeType?a.nodeType==={elem:1,element:1,document:9}[b]:!1};return function(h,d,r){var p,v,q,g;if(!f(d,"string"))throw new TypeError("An aIV.utils.checkType call received an invalid (a non-string) type parameter.");if(p=n.test(d)){if(1<d.length)throw h="An aIV.utils.checkType call received an invalid type string. When using an asterisk, '*', no other values should be given as the asterisk guarantees the check will ",
h+="pass.",Error(h);return!0}if(p=h===y&&l.test(d))g=!0;else{g=d;var t;t=(q=null===h)?k.test(g):!0;q&&m.test(g)&&(t=!t);g=t}q=p||!g||k.test(d)?!1:m.test(d);p=p||q&&g;if(!r||!p)if(d=d.toLowerCase(),d=d.replace(w.exceptLowerAlphaAndPipe,""),v=d.split("|"),!r)for(d=v,t=!0,r=d.length;t&&r--;)if(t=w.allDataTypes.test(d[r]),!t)throw h=void 0,h="An aIV.utils.checkType call received an invalid type ",h+="string. The value '"+d[r]+"' was incorrect. ",h+="Check aIV.utils.checkType's documentation for a ",h+=
"list of acceptable type strings.",Error(h);if(!p){if(null===h){h=v;p=q;d=!1;for(v=h.length;!d&&v--;)g||(p=!b.test(h[v])),d=p;h=d}else{p=v;g=!1;for(v=p.length;!g&&v--;){d=p[v];if("any"===d){g=!0;break}if(a.test(d))g=f(h,d);else if(c.test(d))g=u(h,d);else if(e.test(d))if(g=h,t=q=r=void 0,Array.isArray(g))if("array"===d)g=!0;else{d=d.slice(0,-1);t="array"===d?Array.isArray:c.test(d)?u:f;q=!0;for(r=g.length;q&&r--;)q=t(g[r],d);g=q}else g=!1;else if(z.test(d))if(g=h,t=q=r=void 0,f(g,"object")){d=d.slice(0,
-3);t="array"===d?Array.isArray:c.test(d)?u:f;q=!0;for(r in g)if(g.hasOwnProperty(r)&&(q=t(g[r],d),!q))break;g=q}else g=!1}h=g}p=h}return p}}();e.isValidTypeString=function(b){var a,c;if("string"!==typeof b)throw new TypeError("An aIV.utils.isValidTypeString call received an invalid (a non-string) typeString parameter.");b=b.toLowerCase();b=b.replace(w.exceptLowerAlphaAndPipe,"");c=b.split("|");a=!0;for(b=c.length;a&&b--;)a=w.allDataTypes.test(c[b]);return a};e.checkArgs=function(){var b=e.checkType,
a=e.isValidTypeString;return function(){var c,e,f,k,n,l,u;e=arguments.length;if(2>e||e%2)throw Error("An aIV.utils.checkArgs call was missing parameters.");n=Array.prototype.slice.call(arguments,0);l=!0;for(c=-1;++c<e;)if(c%2){k=n[c];u=(u=b(k,"string",!0))&&a(k);if(!u)throw l=void 0,l="An aIV.utils.checkArgs call received an invalid type ",l+="string. The value '"+k+"' was incorrect. ",l+="Check aIV.utils.checkType's documentation for a ",l+="list of acceptable type strings.",Error(l);l=l&&b(f,k,
!0)}else f=n[c];if(!l&&(k=m.checkArgsErrorMsg,(k=b(k,"string")?k:k())&&b(k,"string")))throw new TypeError(k);return l}}();e.getTypeOf=function(){var b=e.checkType;return function(a){var c;c=typeof a;"object"===c&&b(a,"document|element|array")&&(c=null===a?"null":Array.isArray(a)?"array":1===a.nodeType?"element":"document");return c}}();e.freezeObj=function(){var b=function(a){var c;Object.freeze(a);for(c in a)a.hasOwnProperty(c)&&a[c]&&("object"===typeof a[c]||"function"===typeof a[c])&&b(a[c])};
return function(a,c){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An aIV.utils.freezeObj call received an invalid obj parameter.");"boolean"!==typeof c&&(c=!1);c?b(a):Object.freeze(a);return a}}();e.hasOwnProp=function(b,a){var c;if(!b||"object"!==typeof b&&"function"!==typeof b)throw new TypeError("An aIV.utils.hasOwnProp call received an invalid obj parameter.");if(!a||"string"!==typeof a)throw c="An aIV.utils.hasOwnProp call received an invalid prop parameter.",new TypeError(c);
return b.hasOwnProperty(a)};var w={allDataTypes:/^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|^element$|^undefined$|^null$|^document$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,exceptLowerAlphaAndPipe:/[^a-z\|]/g};e.freezeObj(w,!0);e.getElemById=function(b){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemById call received an invalid id parameter (should be a string).");
b=n.getElementById(b);if(!b)throw b="An aIV.utils.getElemById call received an invalid id parameter (i.e. no element with the id was found).",new RangeError(b);return b};e.getElemByClass=function(b,a,c){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemByClass call received an invalid class name parameter.");a="number"!==typeof a||-1>a?0:Math.floor(a);c&&"object"===typeof c&&(c instanceof Element||c instanceof Document)||(c=m.getElemByClassRoot);b=c.getElementsByClassName?c.getElementsByClassName(b):
x.getElementsByClassNameAlt(b,c);if(0>a||a>=b.length)a=b.length-1;a=b[a];if(!a)throw a="An aIV.utils.getElemByClass call received an invalid class name parameter ",a+="(i.e. no element with the class name was found).",new RangeError(a);return a};e.getElemsByClass=function(b,a){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemsByClass call received an invalid class name parameter.");a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=m.getElemsByClassRoot);
return a.getElementsByClassName?a.getElementsByClassName(b):x.getElementsByClassNameAlt(b,a)};e.getElemByTag=function(b,a,c){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemByTag call received an invalid tag name parameter.");a="number"!==typeof a||-1>a?0:Math.floor(a);c&&"object"===typeof c&&(c instanceof Element||c instanceof Document)||(c=m.getElemByTagRoot);b=c.getElementsByTagName(b);if(0>a||a>=b.length)a=b.length-1;a=b[a];if(!a)throw a="An aIV.utils.getElemByTag call received an invalid tag name parameter ",
a+="(i.e. no element with the tag name was found).",new RangeError(a);return a};e.getElemsByTag=function(b,a){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemsByTag call received an invalid tag name parameter.");a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=m.getElemsByTagRoot);return a.getElementsByTagName(b)};e.makeElem=function(b){var a;b&&"string"===typeof b?(a=b,b=null):b&&"object"===typeof b?b.hasOwnProperty("tag")&&b.tag&&"string"===typeof b.tag?
a=b.tag:b.hasOwnProperty("tagName")&&b.tagName&&"string"===typeof b.tagName&&(a=b.tagName):b=null;a||(a="div");a=n.createElement(a);b&&(b.hasOwnProperty("text")&&b.text&&"string"===typeof b.text&&(a.textContent?a.textContent=b.text:a.innerText=b.text),b.hasOwnProperty("html")&&b.html&&"string"===typeof b.html&&(a.innerHTML=b.html),b.hasOwnProperty("id")&&b.id&&"string"===typeof b.id&&(a.id=b.id),b.hasOwnProperty("className")&&b.className&&"string"===typeof b.className&&(a.className=b.className));
return a};e.setElemText=function(b,a){var c;if(!(b&&"object"===typeof b&&b instanceof Element))throw new TypeError("An aIV.utils.setElemText call received an invalid elem parameter (should be a DOM Element).");if(!a||"string"!==typeof a)throw c="An aIV.utils.setElemText call received an invalid text parameter (should be a string).",new TypeError(c);b.textContent?b.textContent=a:b.innerText=a;return b};e.addElemText=function(b,a){var c;if(!(b&&"object"===typeof b&&b instanceof Element))throw new TypeError("An aIV.utils.addElemText call received an invalid elem parameter (should be a DOM Element).");
if(!a||"string"!==typeof a)throw c="An aIV.utils.addElemText call received an invalid text parameter (should be a string).",new TypeError(c);b.textContent?b.textContent+=a:b.innerText+=a;return b};var x={getElementsByClassNameAlt:function(b,a){var c,e,f,k,m,l;if(a.querySelectorAll)k=a.querySelectorAll("."+b);else if(n.evaluate)for(k=[],f='"'+(" "+b+" ")+'")]',c=n.evaluate(f,a,null,0,null),f=c.iterateNext();f;)k.push(f),f=c.iterateNext();else for(l=new RegExp("(^|s)"+b+"(s|$)"),m=a.getElementsByTagName("*"),
k=[],e=m.length,c=-1;++c<e;)f=m[c],l.test(f.className)&&k.push(f);return k}};e.freezeObj(x,!0);e.set=function(){var b=e.checkType;return function(a){var c;if(!a||"object"!==typeof a)throw new TypeError("An aIV.utils.set call received an invalid settings parameter (should be an object).");for(c in m)if(m.hasOwnProperty(c)&&a.hasOwnProperty(c))if(b(a[c],f.types[c]))m[c]=a[c];else throw a=void 0,a="An aIV.utils.set call received an invalid "+c,a+=" settings parameter (should be a "+f.types[c],a+=").",
new TypeError(a);return!0}}();e.reset=function(){var b,a,c;b=(b=arguments.length)?1<b?Array.prototype.slice.call(arguments,0):Array.isArray(arguments[0])?arguments[0]:[arguments[0]]:Object.keys(m);if(!e.checkType(b,"!strings"))throw new TypeError("An aIV.utils.reset call received an invalid setting parameter (should be a string or an array of strings).");for(c=b.length;c--;)a=b[c],m.hasOwnProperty(a)&&(m[a]=f[a]);return!0};e.freezeObj(e,!0);return e}(window,document));

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

(function setupTheAppPublicAPI(window, appModuleAPI) {
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
   * Global Method (aIV.app)
   * ---------------------------------------------------
   * @desc Initializes the aIV question management app.
   * @param {!Object} settings - The app's settings.
   * @param {objectMap=} settings.config - The app's configuration.
   * @param {stringMap=} settings.sources - The app's sources.
   * @param {(objectMap|stringMap)=} settings.categories - The app's categories.
   * @param {!objects} settings.questions - The app's questions.
   * @param {(string|strings)=} settings.resources - The app's resources.
   * @global
   */
  aIV.app = appModuleAPI.startApp;

  /**
   * ---------------------------------------------------
   * Global Method (aIV.app.getResource)
   * ---------------------------------------------------
   * @desc Makes the app's resources publically available.
   * @param {string=} prop - The specific resource to retrieve.
   * @return {*} Either the entire resources object or one of its properties.
   * @global
   */
  aIV.app.getResource = appModuleAPI.getResource;

})(window,

////////////////////////////////////////////////////////////////////////////////
// The App Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheAppModule(window, document, undefined) {
  "use strict"; 

/* -----------------------------------------------------------------------------
 * Set The TypeError Message For Invalid Arguments
 * -------------------------------------------------------------------------- */

aIV.utils.set({
  checkArgsErrorMsg: 'An aIV.app internal call received an invalid parameter.'
});

/* -----------------------------------------------------------------------------
 * The App Module API (module-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (appModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the app module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var appModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Method (appModuleAPI.startApp)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {Object} settings - The app's settings.
   */
  appModuleAPI.startApp = function(settings) {

    debug.start('startApp', settings);
    debug.args('startApp', settings, 'object');

    /** @type {?(string|strings)} */
    var resourceList;
    /** @type {objectMap} */
    var config;
    /** @type {stringMap} */
    var sources;
    /** @type {(objectMap|stringMap)} */
    var categories;
    /** @type {!objects} */
    var questions;
    /** @type {function} */
    var setup;
    /** @type {function} */
    var callback;
    /** @type {string} */
    var types;
    /** @type {number} */
    var i;

    if (appHasBeenInitialized) {
      throw new Error('The aIV.app init call was made a second time.');
    }

    // Save the init of this app to prevent second init
    appHasBeenInitialized = true;

    if ( !checkType(settings, '!object') ) {
      settings = {};
    }

    // Setup the app arguments
    resourceList = ( ( hasOwnProp(settings, 'resources') ) ?
      settings.resources : null
    );
    config = ( ( hasOwnProp(settings, 'config') ) ?
      settings.config : ( hasOwnProp(settings, 'configuration') ) ?
        settings.configuration : null
    );
    sources = ( ( hasOwnProp(settings, 'sources') ) ?
      settings.sources : ( hasOwnProp(settings, 'source') ) ?
        settings.source : null
    );
    categories = ( ( hasOwnProp(settings, 'categories') ) ?
      settings.categories : ( hasOwnProp(settings, 'category') ) ?
        settings.category : null
    );
    questions = ( ( hasOwnProp(settings, 'questions') ) ?
      settings.questions : ( hasOwnProp(settings, 'question') ) ?
        settings.question : []
    );

    // Check the types of the arguments
    if ( !checkType(resourceList, 'string|strings') ) {
      types = 'null, a string, or an array of strings';
      logStartAppTypeError('resources', types, getTypeOf(resourceList));
      resourceList = null;
    }
    if ( !checkType(config, 'objectMap') ) {
      types = 'null or an object with string => object pairs';
      logStartAppTypeError('config', types, getTypeOf(config));
      config = null;
    }
    if ( !checkType(sources, 'stringMap') ) {
      types = 'null or an object with string => string pairs';
      logStartAppTypeError('sources', types, getTypeOf(sources));
      sources = null;
    }
    if ( !checkType(categories, 'stringMap|objectMap') ) {
      types = 'null or an object with string => object or ';
      types += 'string => string pairs';
      logStartAppTypeError('categories', types, getTypeOf(categories));
      categories = null;
    }
    if ( !checkType(questions, '!objects') ) {
      types = 'an array of question objects';
      logStartAppTypeError('questions', types, getTypeOf(questions));
      questions = [];
    }

    // Setup and start the app
    setup = function() {
      freezeObj(resources);
      app = new App(config, sources, categories, questions);
      app.setupDisplay();
    };

    // Save the resources
    if (resourceList) {

      if ( checkType(resourceList, 'string') ) {
        getResource(resourceList, setup);
        return;
      }

      callback = setup;
      i = resourceList.length;
      while (--i) {
        callback = (function(jsonFile, callback) {         
          return function() {
            getResource(jsonFile, callback);
          };
        })(resourceList[i], callback);
      }
      getResource(resourceList[0], callback);
    }
    else {
      setup();
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (appModuleAPI.getResource)
   * -----------------------------------------------------
   * @desc Makes the app's resources publically available.
   * @param {string=} prop - The specific resource to retrieve.
   * @return {*} Either the entire resources object or one of its properties.
   */
  appModuleAPI.getResource = function(prop) {

    debug.start('getResource', prop);
    debug.args('getResource', prop, 'string=');
    debug.state('getResource', 'resources= $$', resources);

    /** @type {string} */
    var errorMsg;
    /** @type {*} */
    var result;

    prop = prop || '';

    if (prop && !hasOwnProp(resources, prop)) {
      errorMsg = 'The resource you requested does not exist. Please verify that \'';
      errorMsg += prop + '\' is a correct json file name in the resources folder ';
      errorMsg += 'and that the file name was included in the setup of the app ';
      errorMsg += '(see algorithmiv.com/docs/resources).';
      console.error(errorMsg);
      debugger;
    }
    else {
      result = (!!prop) ? resources[ prop ] : resources;
    }

    debug.end('getResource', result);

    return result;
  }

  aIV.utils.freezeObj(appModuleAPI);

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */


  var debug = aIV.debug('appModule');
  var debugArgs, debugMsg, debugCheck;

  /**
   * -----------------------------------------------------
   * Public Variable (appHasBeenInitialized)
   * -----------------------------------------------------
   * @desc Indicates whether the app has been initialized.
   * @type {boolean}
   */
  var appHasBeenInitialized = false;

  /**
   * ----------------------------------------------- 
   * Public Variable (resources)
   * -----------------------------------------------
   * @desc The resources for the app.
   * @type {!Object}
   */
  var resources = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The app instance.
   * @type {!App}
   */
  var app;

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */

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

    /** @type {!XMLHttpRequest} */
    var http;
    /** @type {string} */
    var errorMsg;

    checkArgs(jsonFile, 'string', callback, 'function');

    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        if (http.status === 200) {
          resources[ jsonFile ] = JSON.parse(http.responseText);
          debug.state('getResource', 'parsed responseText= $$', resources[ jsonFile ]);
        }
        else {
          errorMsg = 'Your aIV.app resource - resources/' + jsonFile + '.json - ';
          errorMsg += 'failed to load. Please ensure your resources folder ';
          errorMsg += 'is in the same directory as algorithmIV-app.js. ';
          errorMsg += 'XMLHttpRequest.statusText= ' + http.statusText;
          throw new Error(errorMsg);
        }
        debug.end('getResource');
        callback();
      }
    };
    http.open('GET', 'resources/' + jsonFile + '.json', true);
    http.send();
  }

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
   * Public Method (getElemByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName[ [index] ].
   * @param {string} tag - The tag name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByTagRoot: [DOM Node] }).
   * @return {!HTMLElement} The selected DOM element.
   */
  var getElemByTag = aIV.utils.getElemByTag;

  /**
   * ---------------------------------------------------
   * Public Method (getElemsByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName.
   * @param {string} tag - The tag name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByTagRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  var getElemsByTag = aIV.utils.getElemsByTag;

  /**
   * ---------------------------------------------------
   * Public Method (makeElem)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.createElement.
   * @param {(string|!Object<string, string>)=} settings - A string of the
   *   element's tag name or an object hash map of the element's details.
   *   The default tag name is 'div'.
   * @param {string=} settings.tag - The element's tag name.
   * @param {string=} settings.tagName - The element's tag name.
   * @param {string=} settings.text - The element's textContent or innerText.
   * @param {string=} settings.html - The element's innerHTML.
   * @param {string=} settings.id - The element's id.
   * @param {string=} settings.className - The element's class name.
   * @return {!HTMLElement} The DOM element with the given id.
   */
  var makeElem = aIV.utils.makeElem;

  /**
   * ---------------------------------------------------
   * Public Method (setElemText)
   * ---------------------------------------------------
   * @desc A shortcut that sets the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to set the DOM element's textContent or
   *   innerText to.
   * @return {!Element} The updated DOM element.
   */
  var setElemText = aIV.utils.setElemText;

  /**
   * ---------------------------------------------------
   * Public Method (addElemText)
   * ---------------------------------------------------
   * @desc A shortcut that adds to the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to add to the DOM element's textContent or
   *   innerText.
   * @return {!Element} The updated DOM element.
   */
  var addElemText = aIV.utils.addElemText;

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
   * @param {!(Object|function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  var hasOwnProp = aIV.utils.hasOwnProp;

  /**
   * ---------------------------------------------
   * Public Method (getTypeOf)
   * ---------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  var getTypeOf = aIV.utils.getTypeOf;

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}.
   * @param {boolean=} noTypeValCheck - If true skips the data type string checks.
   *   The default is false. Use to avoid duplicating checks.
   * @return {boolean} The evaluation result.
   */
  var checkType = aIV.utils.checkType;

  /**
   * ---------------------------------------------------
   * Public Method (checkArgs)
   * ---------------------------------------------------
   * @desc Catches invalid argument data types and throws an error.
   * @param {...*} val - Each argument passed to the method.
   * @param {...string} type -  Each argument's optional data types.
   *   [See aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}
   *   for the available data type strings.
   * @return {boolean} The evaluation result.
   * @example
   *   exampleMethod = function(arg1, arg2) {
   *     checkArgs(arg1, '!object', arg2, 'number=');
   *   };
   */
  var checkArgs = aIV.utils.checkArgs;

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
   * ---------------------------------------------------
   * Public Method (checkTypes)
   * ---------------------------------------------------
   * @param {!Array<*>} vals - An array of the value(s) to be evaluated.
   *   Note that the values must be provided in an array.
   * @param {!(string|strings)} types - The type(s) to evaluate the value(s)
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}.
   * @return {boolean} The evaluation result.
   */
  function checkTypes(vals, types) {

    debug.start('checkTypes', vals, types);

    /** @type {number} */
    var i;
    /** @type {*} */
    var val;
    /** @type {string} */
    var type;
    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var errorMsg;

    checkArgs(vals, '!array', types, '!string|strings');

    if ( checkType(types, 'string') ) {
      type = types;
      types = new Array(vals.length);
      i = types.length;
      while (i--) {
        types[i] = type;
      }
    }

    if (vals.length !== types.length) {
      errorMsg = 'An aIV.app internal error occurred. A checkTypes call ';
      errorMsg += 'received an invalid parameter. The length of the vals ';
      errorMsg += 'and types arrays did not match.';
      throw new Error(errorMsg);
    }

    pass = true;
    i = vals.length;
    while (pass && i--) {
      pass = checkType(vals[i], types[i]);
    }

    debug.end('checkTypes', pass);

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (sortKeys)
   * ---------------------------------------------------
   * @desc A helper method that sorts the keys of an object.
   * @param {!strings} ids - The unsorted keys.
   * @param {!stringMap} data - A hash map of ids and names.
   * @return {!strings} The sorted keys.
   */
  function sortKeys(ids, data) {

    debug.start('sortKeys', ids, data);

    /** @type {!strings} */
    var keys;
    /** @type {!strings} */
    var names;
    /** @type {string} */
    var name;
    /** @type {number} */
    var id;
    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {number} */
    var ii;

    checkArgs(ids, '!strings', data, '!stringMap');

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

    debug.end('sortKeys', keys);

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

    checkArgs(str, 'string');

    str = str.charAt(0).toUpperCase() + str.slice(1);

    debug.end('capFirst', str);

    return str;
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

    /** @type {!strings} */
    var arr;
    /** @type {number} */
    var i;

    checkArgs(str, 'string');

    arr = str.split('-');

    // Capitalize the first letter in every word (except the first one)
    i = arr.length;
    while (--i) {
      arr[i] = capFirst(arr[i]);
    }

    str = arr.join('');

    debug.end('camelCase', str);

    return str;
  }

  /**
   * ---------------------------------------------------
   * Public Method (trimFunctionWrapper)
   * ---------------------------------------------------
   * @desc A helper method that removes a wrapper function from a string.
   * @param {string} str - The original string.
   * @return {string} The trimmed string.
   */
  var trimFunctionWrapper = (function setup_trimFunctionWrapper() {

    /** @type{!RegExp} */
    var funcCheck;
    /** @type{!RegExp} */
    var endCheck;

    funcCheck = /^function[\s\w]*\(\)\s*\{\s*[\r\n]{1,2}/;
    endCheck = /[\r\n]{1,2}\s*\}\;?$/;

    return function trimFunctionWrapper(str) {

      debug.start('trimFunctionWrapper', str);

      checkArgs(str, 'string');

      if (funcCheck.test(str) && endCheck.test(str)) {
        str = str.replace(funcCheck, '');
        str = str.replace(endCheck, '');
      }

      debug.end('trimFunctionWrapper', str);

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
  var isLink = (function setup_isLink() {

    /** @type{!RegExp} */
    var http;

    http = /^https?\:\/\//;

    return function isLink(str) {

      debug.start('isLink', str);

      /** @type {boolean} */
      var result;

      checkArgs(str, 'string');

      result = http.test(str);

      debug.end('isLink', result);

      return result;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (makeUrl)
   * ---------------------------------------------------
   * @desc A helper method that converts a name into a valid URL string.
   * @param {string} name - The name.
   * @return {string} The url string.
   */
  var makeUrl = (function setup_makeUrl() {

    /** @type{!RegExp} */
    var invalidCharacters;
    /** @type{!RegExp} */
    var spaces;

    invalidCharacters = /[^0-9a-z\-\s\_]/g;
    spaces = /\s/g;

    return function makeUrl(name) {

      debug.start('makeUrl', name);

      /** @type {string} */
      var url;

      checkArgs(name, 'string');

      url = name.toLowerCase();
      url = url.replace(invalidCharacters, '');
      url = url.replace(spaces, '-');

      debug.end('makeUrl', url);

      return url;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (checkForValue)
   * ---------------------------------------------------
   * @desc A helper function that checks an array for a value & removes each
   *   value that is greater than or equal to given value from the array.
   * @param {number} checkVal - The value to check for.
   * @param {numbers} arr - The array to check & update.
   * @return {boolean} The result of the check.
   */
  function checkForValue(checkVal, arr) {

    debug.start('checkForValue', checkVal, arr);

    /** @type {number} */
    var arrVal;
    /** @type {boolean} */
    var pass;
    /** @type {number} */
    var i;

    pass = false;

    i = arr.length;
    while (i-- && arr[i] >= checkVal) {
      arrVal = arr.pop();
      if (arrVal === checkVal) {
        pass = true;
        break;
      }
    }

    debug.end('findMatches.checkForValue', pass);

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (getter)
   * ---------------------------------------------------
   * @desc The basic getter function for all the classes.
   * @this {!Object<string, *>} A hash map of the protected property names
   *   and current values for the class calling the getter.
   * @param {string} propName - The name of the protected property to get.
   * @return {*}
   */
  function getter(propName) {

    this.debug.start('get', propName);

    /** @type {string} */
    var errorMsg;
    /** @type {*} */
    var propVal;

    checkArgs(propName, 'string');

    if ( !hasOwnProp(this, propName) ) {
      errorMsg = 'An aIV.app internal error occurred. A getter was given an ';
      errorMsg += 'invalid property name to get. property= ' + propName;
      throw new Error(errorMsg);
    }

    propVal = this[ propName ];

    this.debug.end('get', propVal);

    return propVal;
  }

  /**
   * ---------------------------------------------------
   * Public Method (setter)
   * ---------------------------------------------------
   * @desc The basic setter function for all the classes.
   * @this {!Object<string, function(*)>} A hash map of the protected property
   *   names and setting functions for the class calling the setter.
   * @param {string} propName - The name of the protected property to set.
   * @param {*} propVal - The value to set the property to.
   * @return {boolean} The success of the setter.
   */
  function setter(propName, propVal) {

    this.debug.start('set', propName, propVal);

    /** @type {string} */
    var errorMsg;
    /** @type {boolean} */
    var pass;

    checkArgs(propName, 'string');

    if ( !hasOwnProp(this, propName) ) {
      errorMsg = 'An aIV.app internal error occurred. A setter was given an ';
      errorMsg += 'invalid property name. property= ' + propName;
      throw new Error(errorMsg);
    }

    pass = this[ propName ](propVal);

    if (!pass) {
      errorMsg = 'An aIV.app internal error occurred. A setter was given an ';
      errorMsg += 'invalid new property value. value= ' + propVal;
      throw new Error(errorMsg);
    }

    this.debug.end('set', pass);

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (logStartAppTypeError)
   * ---------------------------------------------------
   * @desc Logs appModuleAPI.startApp type errors for settings properties.
   * @param {string} prop - The failed settings property's name.
   * @param {string} shouldBeType - The property's acceptable data types.
   * @param {string} wasType - The property's actual data type.
   */
  function logStartAppTypeError(prop, shouldBeType, wasType) {

    debug.start('logStartAppTypeError', prop, shouldBeType, wasType);

    /** @type {string} */
    var errorMsg;

    checkArgs(prop, 'string', shouldBeType, 'string', wasType, 'string');

    errorMsg = 'Your aIV.app settings property, ' + prop + ', was an ';
    errorMsg += 'incorrect data type. It should be ' + shouldBeType + '. ';
    errorMsg += 'The given typeof ' + prop + ' was \'' + wasType + '\'.';

    console.error(errorMsg);

    debug.end('logAppInitTypeErrors');
  }

/* -----------------------------------------------------------------------------
 * The App Class (classes/app/app.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {!objects} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    this.debug = aIV.debug({
      classTitle: 'App',
      openGroups: true
    });

    this.debug.start('init', config, sources, categories, questions);

    /** @type {!Array<*>} */
    var args;

    args = [ config, 'objectMap', sources, 'stringMap' ];
    args.push(categories, 'objectMap|stringMap', questions, '!objects');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

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

    /**
     * ---------------------------------------------------
     * Public Property (App.isHistory)
     * ---------------------------------------------------
     * @desc Tells whether the browser has a usable History class.
     * @type {boolean}
     */
    this.isHistory;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {booleanMap} */
    var tmpConfig;
    /** @type {?Object<string, (string|number)>} */
    var defaults;
    /** @type {Object<string, stringMap>} */
    var names;
    /** @type {Object<string, strings>} */
    var ids;
    /** @type {number} */
    var len;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var newIndex;

    // Save the count of questions for use before questions is setup
    len = questions.length;

    // Setup the properties    
    this.flags   = new AppFlags(!!len);
    this.elems   = new AppElems();
    this.vals    = new AppVals(len);
    this.config  = new Config(config);
    this.sources = new Sources(sources);
    this.categories = new Categories(categories);

    // Setup the prettifier
    tmpConfig = {
      trimSpace   : this.config.prettifier.get('trimSpace'),
      tabLength   : this.config.prettifier.get('tabLength'),
      commentLinks: this.config.prettifier.get('commentLinks')
    };
    prettify.setConfig(tmpConfig);

    // Setup the search bar
    tmpConfig = {
      stage   : this.config.searchBar.get('stage'),
      source  : this.config.searchBar.get('source'),
      category: this.config.searchBar.get('category'),
      subCat  : this.config.searchBar.get('subCat')
    };
    this.searchBar = new SearchBar(tmpConfig, this.sources, this.categories);

    // Setup the questions
    tmpConfig = {
      id      : this.config.questions.get('id'),
      complete: this.config.questions.get('complete'),
      source  : this.config.questions.get('source'),
      category: this.config.questions.get('category'),
      subCat  : this.config.questions.get('subCat'),
      links   : this.config.questions.get('links'),
      output  : this.config.questions.get('output')
    };
    this.questions = new Questions(questions, tmpConfig, this.sources.get,
                                   this.categories.get);

    // Set the search defaults
    defaults = ( (!!config && hasOwnProp(config, 'searchDefaults')) ?
      config.searchDefaults : null
    );
    names = this.searchBar.names;
    ids = this.searchBar.ids.subCat;
    this.config.searchBar.defaults.update(defaults, names, ids, len);

    // Set the search bar to the defaults
    this.searchBar.setToDefaults(this.config.searchBar.defaults);

    // Update the current values to match the given defaults
    newIds = this.findMatches();
    newIndex = this.config.searchBar.defaults.get('startID');
    if (newIndex > 0) {
      this.searchBar.vals.view = 'one';
      newIndex = newIds.indexOf(newIndex);
    }
    len = newIds.length;
    if (this.searchBar.vals.view === 'all' || !len) {
      newIndex = -1;
    }
    else if (newIndex < 0 || newIndex >= len) {
      newIndex = 0;
    }
    this.vals.set(newIds, newIndex);

    this.debug.state('init', 'index= $$', this.vals.get('index'));

    // Setup the value of isHistory
    this.isHistory = true;
    try {
      window.history.replaceState( this.getStateObj() );
    }
    catch (e) {
      this.isHistory = false;
    }

    this.debug.state('init', 'isHistory= $$', this.isHistory);

    // Setup the onpopstate event
    if (this.isHistory) {
      window.onpopstate = function(event) {
        Events.popState( JSON.parse(event.state) );
      };
    }

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.setupDisplay)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function}
   */
  App.prototype.setupDisplay = function() {

    app.debug.start('setupDisplay');

    /** @type {number} */
    var renderTime;

    if ( app.flags.get('initArgs') ) {

      app.elems.appendNav();
      app.searchBar.setMainElems();
      app.searchBar.setOptElems();
      app.searchBar.appendElems();
      app.questions.addIdsToSearch();
      app.questions.appendElems();

      renderTime = app.questions.len * 50;
      app.debug.state('setupDisplay', 'renderTime= $$', renderTime);
      setTimeout(function() {

        /** @type {boolean} */
        var flip;

        app.questions.addCodeExts();
        app.elems.hold.style.display = 'none';
        flip = (app.searchBar.vals.order === 'desc');
        app.updateDisplay(null, null, null, flip, true);

        // $s$
        setTimeout(function() {
          app.debug.end('setupDisplay');
          debug.end('startApp');
        }, 520);
        // $e$

      }, renderTime);
    }
    else {
      app.elems.appendError();
      app.debug.end('setupDisplay');
      debug.end('startApp');
    }
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.updateDisplay)
   * -----------------------------------------------
   * @desc Show the current matching questions for the app.
   * @param {numbers=} oldIds - The old matching ids.
   * @param {?number=} oldIndex - The old ids index.
   * @param {?string=} oldView - The value of view before the
   *   update. Defaults to the value of the new view.
   * @param {boolean=} flipElems - If set to true it indicates that
   *   the order of each question's element should be flipped.
   * @param {boolean=} noPushState - If set to true it indicates
   *   that the pushState call should NOT be made.
   */
  App.prototype.updateDisplay = function(oldIds, oldIndex, oldView,
                                         flipElems, noPushState) {

    debugArgs = [ 'updateDisplay', oldIds, oldIndex, oldView, flipElems ];
    debugArgs.push(noPushState);
    app.debug.start(debugArgs);

    /** @type {!Array<*>} */
    var args;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var newView;

    args = [ oldIds, 'numbers=', oldIndex, '?number=', oldView, '?string=' ];
    args.push(flipElems, 'boolean=', noPushState, 'boolean=');
    checkArgs.apply(null, args);

    oldIds = (!!oldIds) ? oldIds : app.vals.get('ids').slice(0);
    oldIndex = ( ( checkType(oldIndex, '!number') ) ?
      oldIndex : app.vals.get('index')
    );

    newView = app.searchBar.vals.view;
    oldView = ( checkType(oldView, '!string') ) ? oldView : newView;

    flipElems = flipElems || false;
    noPushState = noPushState || false;

    // Save the new matching question ids and index
    newIds = app.vals.get('ids').slice(0);
    newIndex = app.vals.get('index');

    // Hide the question's main element
    app.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      app.elems.nav.style.display = ( (newView === 'all') ?
        'none' : (newView === 'ten' && app.vals.get('len') > 10) ?
          'block' : (newView === 'one' && app.vals.get('len') > 1) ?
            'block' : 'none'
      );

      // Check if the questions order should be flipped
      if (flipElems) {
        app.questions.reverseElems();
      }

      // Hide the old questions
      app.questions.hideElems(oldIds, oldIndex, oldView);

      // Show the new questions
      app.questions.showElems(newIds, newIndex);

      // Update the state
      if (app.isHistory && !noPushState) {
        window.history.pushState( app.getStateObj() );
      }

      // Show the question's main element
      app.elems.main.style.opacity = '1';

      app.debug.end('updateDisplay');
    }, 520);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.findMatches)
   * -----------------------------------------------
   * @desc Finds the matching question ids for the current selected search
   *   values.
   * @return {numbers} An array of the matching ids.
   */
  App.prototype.findMatches = function() {

    this.debug.start('findMatches');

    /** @type {numbers} */
    var stage;
    /** @type {numbers} */
    var source;
    /** @type {numbers} */
    var mainCat;
    /** @type {numbers} */
    var subCat;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {numbers} */
    var newIds;
    /** @type {boolean} */
    var pass;
    /** @type {function} */
    var checkForValue;

    // Save the current values
    stage   = this.searchBar.vals.stage;
    source  = this.searchBar.vals.source;
    mainCat = this.searchBar.vals.mainCat;
    subCat  = this.searchBar.vals.subCat;

    // Save the matching ids
    stage = ( (stage === 'all') ?
      null : this.searchBar.ques.stage[ stage ].slice(0)
    );
    source = ( (source === 'all') ?
      null : this.sources.get(source, 'ids').slice(0)
    );
    mainCat = ( (mainCat === 'all') ?
      null : this.categories.get(mainCat, 'ids').slice(0)
    );
    subCat = ( (subCat === 'all') ?
      null : this.categories.get(subCat, 'ids').slice(0)
    );

    // Check for empty arrays
    if ((stage   && !stage.length)   ||
        (source  && !source.length)  ||
        (mainCat && !mainCat.length) ||
        (subCat  && !subCat.length)) {
      newIds = [];
      this.debug.end('findMatches', newIds);
      return newIds;
    }

    // Check for all ids
    if (!stage && !source && !mainCat && !subCat) {
      newIds = this.vals.get('allIds').slice(0);
      if (this.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      this.debug.end('findMatches', newIds);
      return newIds;
    }

    // Find the min length array
    len = (stage) ? stage.length : this.questions.len;
    if (source && source.length < len) {
      len = source.length;
    }
    if (mainCat && mainCat.length < len) {
      len = mainCat.length;
    }
    if (subCat && subCat.length < len) {
      len = subCat.length;
    }

    // Set the newIds to the min length array
    if (stage && stage.length === len) {
      newIds = stage.slice(0);
      stage = null;
    }
    else if (source && source.length === len) {
      newIds = source.slice(0);
      source = null;
    }
    else if (mainCat && mainCat.length === len) {
      newIds = mainCat.slice(0);
      mainCat = null;
    }
    else if (subCat && subCat.length === len) {
      newIds = subCat.slice(0);
      subCat = null;
    }

    // Check for all null arrays
    if (!stage && !source && !mainCat && !subCat) {
      if (this.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      this.debug.end('findMatches', newIds);
      return newIds;
    }

    // Remove the question ids that do not exist in all other arrays
    i = newIds.length;
    while (i--) {
      pass = true;

      if (stage) {
        if (!stage.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], stage);
      }

      if (source) {
        if (!source.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], source);
      }

      if (mainCat) {
        if (!mainCat.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], mainCat);
      }

      if (subCat) {
        if (!subCat.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], subCat);
      }

      if (!pass) {
        newIds.splice(i, 1);
      }
    }

    if (this.searchBar.vals.order === 'desc') {
      newIds.reverse();
    }

    this.debug.end('findMatches', newIds);

    return newIds;
  };

  /**
   * ----------------------------------------------- 
   * Public Method (AppVals.prototype.getStateObj)
   * -----------------------------------------------
   * @desc Returns a state object for the current app values.
   * @return {Object<string, (string|number|numbers)>}
   */
  App.prototype.getStateObj = function() {

    this.debug.start('getStateObj');

    /** @type {Object<string, (string|number|numbers)>} */
    var vals;

    vals = {
      ids    : this.vals.get('ids').slice(0),
      index  : this.vals.get('index'),
      view   : this.searchBar.vals.view,
      order  : this.searchBar.vals.order,
      stage  : this.searchBar.vals.stage,
      source : this.searchBar.vals.source,
      mainCat: this.searchBar.vals.mainCat,
      subCat : this.searchBar.vals.subCat
    };

    vals = JSON.stringify(vals);

    this.debug.end('getStateObj', vals);

    return vals;
  };

/* -----------------------------------------------------------------------------
 * The AppFlags Class (classes/app/app-flags.js)
 * -------------------------------------------------------------------------- */

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

    var thisDebug;

    this.debug = aIV.debug('AppFlags');
    thisDebug = this.debug;

    this.debug.start('init', pass);

    checkArgs(pass, 'boolean');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (AppFlags.initArgs)
     * -----------------------------------------------
     * @desc Indicates whether the app was initialized with correct arguments.
     * @type {boolean}
     * @private
     */
    var initArgs = pass;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.get)
     * -----------------------------------------------
     * @desc Gets an AppFlags protected property.
     * @param {string} prop - The name of the flag to get.
     * @return {boolean} The flag's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        debug   : thisDebug,
        initArgs: initArgs
      };

      return getter.call(props, prop);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.set)
     * -----------------------------------------------
     * @desc Sets an AppFlags protected property.
     * @param {string} prop - The name of the flag to set.
     * @param {boolean} val - The value to set the flag to.
     * @return {boolean} The setter's success.
     */
    this.set = function(prop, val) {

      /** @type {Object<string, function(*): boolean>} */
      var setters = {
        debug   : thisDebug,
        initArgs: function(val) {
          initArgs = val;
          return checkType(val, 'boolean');
        }
      };

      return setter.call(setters, prop, val);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  AppFlags.prototype.constructor = AppFlags;

/* -----------------------------------------------------------------------------
 * The AppElems Class (classes/app/app-elems.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (AppElems)
   * -----------------------------------------------------
   * @desc The key DOM nodes for this app.
   * @constructor
   */
  var AppElems = function() {

    this.debug = aIV.debug('AppElems');

    this.debug.start('init');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.root)
     * -----------------------------------------------
     * @desc The #aIV element.
     * @type {Element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.sel)
     * -----------------------------------------------
     * @desc The #aIV-selections element.
     * @type {Element}
     */
    this.sel;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.main)
     * -----------------------------------------------
     * @desc The #aIV-main element.
     * @type {Element}
     */
    this.main;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.nav)
     * -----------------------------------------------
     * @desc The #aIV-nav element.
     * @type {Element}
     */
    this.nav;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.ques)
     * -----------------------------------------------
     * @desc The #aIV-questions element.
     * @type {Element}
     */
    this.ques;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.hold)
     * -----------------------------------------------
     * @desc The img.loader element.
     * @type {Element}
     */
    this.hold;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.none)
     * -----------------------------------------------
     * @desc The section.empty element.
     * @type {Element}
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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {Element} */
    var elem;
    /** @type {Element} */
    var code;
    /** @type {Element} */
    var ol;
    /** @type {Element} */
    var li;

    this.root = makeElem({ id: 'aIV', html: '<h1>Algorithm IV</h1>' });
    this.sel  = makeElem({
      tag      : 'nav',
      id       : 'aIV-selections',
      className: 'selections'
    });
    this.main = makeElem({ id: 'aIV-main', className: 'main' });
    this.nav  = makeElem({ tag: 'nav', id: 'aIV-nav' });
    this.ques = makeElem({
      tag      : 'section',
      id       : 'aIV-questions',
      className: 'questions'
    });
    this.hold = makeElem({ tag: 'img', className: 'loader' });
    this.none = makeElem({
      tag      : 'section',
      text     : 'No question(s) found.',
      className: 'empty'
    });

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
    elem = makeElem({ className: 'aIV-scrollbar' });
    document.body.appendChild(elem);

    this.scrl = {};
    this.scrl.height = elem.offsetWidth - elem.clientWidth;
    freezeObj(this.scrl);

    this.debug.state('init', 'this.scrl.height= $$', this.scrl.height);

    document.body.removeChild(elem);

    // Setup the code element details
    elem = makeElem('pre');
    code = makeElem('code');
    ol   = makeElem('ol');
    li   = makeElem('li');

    elem.style.opacity = '0';

    setElemText(li, 'test');

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

    freezeObj(this.code);
    freezeObj(this.code.ol);
    freezeObj(this.code.li);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

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

    /** @type {Element} */
    var prev;
    /** @type {Element} */
    var pArrow;
    /** @type {Element} */
    var pBG;
    /** @type {Element} */
    var pTitle;
    /** @type {Element} */
    var next;
    /** @type {Element} */
    var nArrow;
    /** @type {Element} */
    var nBG;
    /** @type {Element} */
    var nTitle;

    prev = makeElem({ className: 'prev' });
    next = makeElem({ className: 'next' });
    pBG  = makeElem({ className: 'bg' });
    nBG  = makeElem({ className: 'bg' });
    pTitle = makeElem({
      text     : 'Previous',
      className: 'title'
    });
    nTitle = makeElem({
      text     : 'Next',
      className: 'title'
    });
    pArrow = makeElem({
      id       : 'aIV-prev',
      text     : 'Previous',
      className: 'arrow'
    });
    nArrow = makeElem({
      id       : 'aIV-next',
      text     : 'Next',
      className: 'arrow'
    });

    pArrow.onclick = function() {
      Events.prev();
    };
    nArrow.onclick = function() {
      Events.next();
    };

    prev.appendChild(pArrow);
    prev.appendChild(pBG);
    prev.appendChild(pTitle);
    next.appendChild(nArrow);
    next.appendChild(nBG);
    next.appendChild(nTitle);

    this.nav.appendChild(prev);
    this.nav.appendChild(next);

    this.debug.end('appendNav');
  };

  /**
   * -------------------------------------------------
   * Public Method (AppElems.prototype.appendError)
   * -------------------------------------------------
   * @desc Creates and appends the error elements.
   * @type {function}
   */
  AppElems.prototype.appendError = function() {

    this.debug.start('appendError');

    /** @type {string} */
    var errorMsg;
    /** @type {string} */
    var example;
    /** @type {number} */
    var exampleLineCount;
    /** @type {number} */
    var divHeight;
    /** @type {Element} */
    var errorDiv;
    /** @type {Element} */
    var h2;
    /** @type {Element} */
    var p;
    /** @type {Element} */
    var exampleDiv;
    /** @type {Element} */
    var h3;
    /** @type {Element} */
    var div;
    /** @type {Element} */
    var pre;
    /** @type {Element} */
    var code;
    /** @type {Element} */
    var ol;

    errorMsg = '' +
      'Algorithm IV\'s question (or code sample) management app was '        +
      'initialized without any questions. Please ensure you correctly gave ' +
      'your settings to this app. The app should be initialized with '       +
      'an object that contains properties for all of your settings (see '    +
      'below). If this error persists please open an issue on our '          +
      '<a href="https://github.com/imaginate/algorithmiv/issues" '           +
      'class="dark">GitHub repository</a> or send an email to '              +
      '<a href="mailto:learn@algorithmiv.com" class="dark">'                 +
      'learn@algorithmiv.com</a>. We will solve your problem or answer '     +
      'your question as quickly as we can. We hope aIV\'s apps, tools, and ' +
      'libraries are able to help you maximize your development skills and ' +
      'projects!<br />'                                                      +
      '<span>Best,<br />'                                                    +
      '&ndash; Adam from Algorithm IV</span>';

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
        '<span class="cmt"> * settings, add sources, add categories, add'      +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * resources, or add questions simply add one or'   +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * all of the matching properties to your empty'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * settings object. Note that the names of your'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * properties must match the correct names for'     +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * each setting - config, sources, categories,'     +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * resources, and questions. You can get in-depth'  +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * details about creating a config, sources,'       +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * resources, categories, or questions object by'   +
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
        '<span class="idt">settings.config</span>     <span class="opr">=</sp' +
        'an> <span class="idt">yourConfig</span><span class="smc">;</span>'    +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.sources</span>    <span class="opr">=</sp' +
        'an> <span class="idt">yourSources</span><span class="smc">;</span>'   +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.categories</span> <span class="opr">=</sp' +
        'an> <span class="idt">yourCategories</span><span class="smc">;</span>'+
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.resources</span>  <span class="opr">=</sp' +
        'an> <span class="idt">yourResources</span><span class="smc">;</span>' +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.questions</span>  <span class="opr">=</sp' +
        'an> <span class="idt">yourQuestions</span><span class="smc">;</span>' +
      '</li>' +
      '<li>&nbsp;</li>' +
      '<li><span class="cmt">// Initialize Algorithm IV\'s app</span></li>'    +
      '<li>'  +
        '<span class="idt">aIV</span><span class="per">.</span><span class="'  +
        'idt">app</span><span class="brc">(</span><span class="idt">settings'  +
        '</span><span class="brc">)</span><span class="smc">;</span>'          +
      '</li>';

    exampleLineCount = 24;

    divHeight = exampleLineCount * app.elems.code.li.height;
    divHeight += app.elems.code.ol.height;

    // Create the error elements
    errorDiv = makeElem({ className: 'initError' });
    h2 = makeElem({ tag: 'h2', text: 'Initialization Error' });
    p  = makeElem({ tag: 'p' , html: errorMsg });

    // Create the example elements
    exampleDiv = makeElem({ className: 'initExample' });
    h3   = makeElem({ tag: 'h3', text: 'Correct Initialization Example' });
    div  = makeElem({ className: 'containExample' });
    pre  = makeElem('pre');
    code = makeElem('code');
    ol   = makeElem({ tag: 'ol', html: example });

    // Complete all dynamic formatting
    div.style.height = divHeight + 'px';

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

    this.debug.end('appendError');
  };

/* -----------------------------------------------------------------------------
 * The AppVals Class (classes/app/app-vals.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @param {number} questionsLen - The total number of questions.
   * @constructor
   */
  var AppVals = function(questionsLen) {

    var thisDebug;

    this.debug = aIV.debug('AppVals');
    thisDebug = this.debug;

    this.debug.start('init', questionsLen);

    checkArgs(questionsLen, 'number');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.allIds)
     * -----------------------------------------------
     * @desc The ids of all of the questions.
     * @type {!numbers}
     * @private
     */
    var allIds;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.ids)
     * -----------------------------------------------
     * @desc The ids of the questions that match the current search criteria.
     * @type {!numbers}
     * @private
     */
    var ids;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.len)
     * -----------------------------------------------
     * @desc The number of questions that match the current search criteria.
     * @type {number}
     * @private
     */
    var len;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.index)
     * -----------------------------------------------
     * @desc The current index of the ids array being displayed.
     *   If the view = 'all' or no ids match then index = -1.
     * @type {number}
     * @private
     */
    var index;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;

    allIds = new Array(questionsLen);
    i = questionsLen;
    while (i--) {
      allIds[i] = i + 1;
    }

    ids = allIds.slice(0);
    len = questionsLen;
    index = -1;

    // Freeze the needed protected properties
    freezeObj(allIds);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.get)
     * -----------------------------------------------
     * @desc Gets an AppVals protected property.
     * @param {string} prop - The name of the property to get.
     * @return {!(number|numbers)}
     */
    this.get = function(prop) {

      /** @type {Object<string, (number|numbers)>} */
      var props = {
        debug : thisDebug,
        allIds: allIds,
        ids   : ids,
        len   : len,
        index : index
      };

      return getter.call(props, prop);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.set)
     * -----------------------------------------------
     * @desc Sets the app's current values.
     * @param {numbers} newIds - The new matching question ids.
     * @param {number=} newIndex - The new starting index.
     */
    this.set = function(newIds, newIndex) {

      this.debug.start('set', newIds, newIndex);

      checkArgs(newIds, 'numbers', newIndex, 'number=');

      if (newIds) {
        ids = newIds.slice(0);
        len = ids.length;
      }

      if ( checkType(newIndex, 'number') ) {
        index = newIndex;
      }

      this.debug.end('set');
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  AppVals.prototype.constructor = AppVals;

  /**
   * ----------------------------------------------- 
   * Public Method (AppVals.prototype.reset)
   * -----------------------------------------------
   * @desc Resets the app values.
   * @param {numbers} ids - The new matching question ids.
   * @param {number=} index - The new starting index.
   */
  AppVals.prototype.reset = function(ids, index) {

    this.debug.start('reset', ids, index);

    /** @type {number} */
    var len;

    checkArgs(ids, 'numbers', index, 'number=');

    index = index || 0;

    ids = ids || this.get('allIds');
    len = ids.length;

    // Check the new index value
    if (app.searchBar.vals.view === 'all' || !len) {
      index = -1;
    }
    else if (index < 0 || index >= len) {
      index = 0;
    }

    // Reset the values
    this.set(ids, index);

    this.debug.end('reset');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (AppVals.prototype.move)
   * -----------------------------------------------
   * @desc Go to the prev, next, or a specific index.
   * @param {(string|number)} way - The location to move the index.
   *   The options are 'prev', 'next', or a question id.
   * @return {number} The new index.
   */
  AppVals.prototype.move = (function setupAppVals_move() {

    /** function(string) */
    var throwParamError = function(way) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'An aIV.app internal error occurred. An AppVals.move call ';
      errorMsg += 'received an invalid way parameter. way= ' + way;
      throw new Error(errorMsg);
    };

    return function move(way) {

      this.debug.start('move', way);

      /** @type {number} */
      var id;
      /** @type {string} */
      var view;
      /** @type {number} */
      var index;
      /** @type {number} */
      var last;

      checkArgs(way, 'string|number');

      if ( checkType(way, 'number') ) {
        id  = way;
        way = null;
      }
      else {
        id = 0;
      }

      index = this.get('index');

      // Check the value for way & convert number strings to a number
      if (typeof way === 'string' && way !== 'prev' && way !== 'next') {
        id = way.replace(/[^0-9]/g, '');
        id = id && Number(id);
        id || throwParamError(way);
        way = null;
      }

      view = app.searchBar.vals.view;

      if (way) {

        // Save the last index
        last = this.get('len') - 1;

        if (view === 'one') {

          // Handle moving the index one spot
          if (way === 'prev') {
            index = (index === 0) ? last : --index;
          }
          else if (way === 'next') {
            index = (index === last) ? 0 : ++index;
          }
        }
        else if (view === 'ten') {

          // Handle moving the index ten spots
          last = last - (last % 10);
          if (way === 'prev') {
            index = (index === 0) ? last : (index - 10);
          }
          else if (way === 'next') {
            index = (index === last) ? 0 : (index + 10);
          }
        }
      }
      else {

        // Handle moving to a specific question id
        (id) || (id <= app.questions.len) || throwParamError(id);
        if (view !== 'one') {
          app.searchBar.vals.view = 'one';
        }
        index = this.get('ids').indexOf(id);
        (index !== -1) || throwParamError(id);
      }

      this.set(null, index);

      this.debug.end('move', index);

      return index;
    };
  })();

/* -----------------------------------------------------------------------------
 * The Config Class (classes/config/config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {Object<string, Object>} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    this.debug = aIV.debug('Config');

    this.debug.start('init', config);

    checkArgs(config, 'objectMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

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
     * Public Property (Config.links)
     * -----------------------------------------------
     * @desc Whether to display search links for each question.
     * @type {LinksConfig}
     */
    this.links;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    // Check the given user's config object
    if ( !checkType(config, '!object') ) {
      config = {};
    }

    if ( !checkType(config.searchSettings, '!object') ) {
      config.searchSettings = {};
    }
    if ( !checkType(config.questionFormat, '!object') ) {
      config.questionFormat = {};
    }
    if ( !checkType(config.prettifyFormat, '!object') ) {
      config.prettifyFormat = {};
    }
    if ( !checkType(config.showLinks, '!object') ) {
      config.showLinks = {};
    }

    // Setup the properties
    this.searchBar  = new SearchBarConfig(config.searchSettings);
    this.questions  = new QuestionsConfig(config.questionFormat);
    this.prettifier = new PrettyConfig(config.prettifyFormat);
    this.links      = new LinksConfig(config.showLinks);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Config.prototype.constructor = Config;

/* -----------------------------------------------------------------------------
 * The SearchBarConfig Class (classes/config/search-bar-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (SearchBarConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the search bar in this app.
   * @param {!Object} config - The user's search bar config settings.
   * @constructor
   */
  var SearchBarConfig = function(config) {

    var thisDebug;

    this.debug = aIV.debug('SearchBarConfig');
    thisDebug = this.debug;

    this.debug.start('init', config);

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.defaults)
     * -----------------------------------------------
     * @desc The default search options to display upon app init.
     * @type {DefaultsSearchBarConfig}
     */
    this.defaults = new DefaultsSearchBarConfig();

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    stage    = !(config.stage    === false);
    source   = !(config.source   === false);
    category = !(config.category === false);
    subCat   = !(config.subCat   === false);

    if (!category && subCat) {
      subCat = false;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (SearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from SearchBarConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        debug   : thisDebug,
        stage   : stage,
        source  : source,
        category: category,
        subCat  : subCat
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBarConfig.prototype.constructor = SearchBarConfig;
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

    this.debug = aIV.debug('SearchBar');

    debugMsg = 'config= $$, sources= $$, categories= $$';
    this.debug.group('init', 'coll', debugMsg, config, sources, categories);

    this.debug.start('init', config, sources, categories);

    debugArgs = [ 'init', config, 'booleanMap', sources, 'object' ];
    debugArgs.push(categories, 'object');
    this.debug.args(debugArgs);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {boolean} */
    var pass;

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

        // Add the sub category options
        this.opts.subCat[ mainId ] = [];

        // Add the sub categories names and ids
        subs = mainCat.get('subs');
        if (subs && subs.length) {
          this.ids.subCat[ mainId ] = subs.slice(0);
          this.ids.subCat[ mainId ].unshift('all');
          subs.forEach(function(/** string */ subId) {
            this.names.subCat[ subId ] = categories.get(subId, 'name');
          }, this);
        }
        else {
          this.ids.subCat[ mainId ] = [ 'all' ];
        }
      }, this);
    }

    // Setup the question ids property
    this.ques = {};
    this.ques.stage = {};
    this.ques.stage.com = [];
    this.ques.stage.inc = [];

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
    this.elems.view = makeElem({
      tag      : 'select',
      id       : 'aIV-view',
      className: 'showView'
    });
    this.elems.order = makeElem({
      tag      : 'select',
      id       : 'aIV-order',
      className: 'showOrder'
    });
    this.elems.stage = ( (config.stage) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-stage',
        className: 'showStage'
      })
      : null
    );
    this.elems.source = ( (config.source && sources.len) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-source',
        className: 'showSource'
      })
      : null
    );
    this.elems.mainCat = ( (config.category && categories.len) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-mainCat',
        className: 'showMainCat'
      })
      : null
    );
    pass = (this.elems.mainCat && config.subCat);
    pass = pass && categories.ids.some(function(/** string */ id) {
      return !!this.ids.subCat[id];
    }, this);
    this.elems.subCat = ( (pass) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-subCat',
        className: 'showSubCat'
      })
      : null
    );

    // Freeze all of the completed properties
    freezeObj(this.names);
    freezeObj(this.ids);
    freezeObj(this.opts);
    freezeObj(this.ques.stage);
    freezeObj(this.ques);
    freezeObj(this.elems);


    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.group('init', 'end');

    // Freeze this class instance
    freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBar.prototype.constructor = SearchBar;

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setToDefaults)
   * -----------------------------------------------------
   * @desc Updates the current search bar's values to the defaults.
   * @param {Object} defaults - The default values.
   */
  SearchBar.prototype.setToDefaults = function(defaults) {

    this.debug.group('setToDefaults', 'coll', 'defaults= $$', defaults);
    this.debug.start('setToDefaults', defaults);
    this.debug.args('setToDefaults', defaults, 'object');

    /** @type {string} */
    var view;
    /** @type {string} */
    var order;
    /** @type {string} */
    var stage;
    /** @type {string} */
    var source;
    /** @type {string} */
    var mainCat;
    /** @type {string} */
    var subCat;

    view    = defaults.get('view');
    order   = defaults.get('order');
    stage   = defaults.get('stage');
    source  = defaults.get('source');
    mainCat = defaults.get('mainCat');
    subCat  = defaults.get('subCat');

    this.vals.view    = view;
    this.vals.order   = order;
    this.vals.stage   = stage;
    this.vals.source  = source;
    this.vals.mainCat = mainCat;
    this.vals.subCat  = subCat;

    this.elems.view.value = view;
    this.elems.order.value = order;
    if (this.elems.stage) {
      this.elems.stage.value = stage;
    }
    if (this.elems.source) {
      this.elems.source.value = source;
    }
    if (this.elems.mainCat) {
      this.elems.mainCat.value = mainCat;
    }
    if (this.elems.subCat) {
      this.elems.subCat.value = subCat;
    }

    this.debug.group('setToDefaults', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setMainElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's select elements.
   * @type {function}
   */
  SearchBar.prototype.setMainElems = function() {

    this.debug.group('setMainElems', 'coll');
    this.debug.start('setMainElems');

    /** @type {boolean} */
    var pass;

    // Set view search element
    this.elems.view.onchange = function(event) {
      Events.searchView(event.target.value);
    };

    // Set order search element
    this.elems.order.onchange = function(event) {
      Events.searchOrder(event.target.value);
    };

    // Set stage search element
    if (this.elems.stage) {
      this.elems.stage.onchange = function(event) {
        Events.searchStage(event.target.value);
      };
    }

    // Set source search element
    if (this.elems.source) {
      this.elems.source.onchange = function(event) {
        Events.searchSource(event.target.value);
      };
    }

    // Set main category search element
    if (this.elems.mainCat) {
      this.elems.mainCat.onchange = function(event) {
        Events.searchMainCat(event.target.value);
      };
    }

    // Set sub category search element
    if (this.elems.subCat) {
      this.elems.subCat.onchange = function(event) {
        Events.searchSubCat(event.target.value);
      };
    }

    this.debug.group('setMainElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOptElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   * @type {function}
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
     * @return {Element}
     * @private
     */
    var makeOptElem = function(id, name) {
      /** @type {Element} */
      var elem;

      elem = makeElem({
        tag : 'option',
        text: name
      });
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
      /** @type {Element} */
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
      /** @type {Element} */
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
        /** @type {Element} */
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
        /** @type {Element} */
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
        /** @type {Element} */
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
          /** @type {Element} */
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
        /** @type {Element} */
        var elem;

        if (!!this.ids.subCat[mainId]) {

          name = this.names.mainCat[mainId];
          elem = makeOptElem('', name);
          this.opts.subCat['all'].push(elem);

          this.ids.subCat[mainId].forEach(function(/** string */ id) {
            /** @type {string} */
            var name;
            /** @type {Element} */
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
   * @type {function}
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
   * @param {string=} newVal - The new value to update subCat to.
   */
  SearchBar.prototype.updateSubCatOpts = function(newVal) {

    this.debug.start('updateSubCatOpts', newVal);
    this.debug.args('updateSubCatOpts', newVal, 'string=');

    /** @type {elements} */
    var opts;

    newVal = (typeof newVal === 'string') ? newVal : 'all';

    this.vals.subCat = newVal;

    if (this.elems.subCat) {

      // Clear subCat's current option elements
      while (this.elems.subCat.firstChild) {
        this.elems.subCat.removeChild(this.elems.subCat.firstChild);
      }

      // Append the new option elements
      opts = this.opts.subCat[ this.vals.mainCat ];
      opts.forEach(function(/** element */ elem) {
        this.elems.subCat.appendChild(elem);
      }, this);

      this.elems.subCat.value = newVal;
    }
  };

/* -----------------------------------------------------------------------------
 * The DefaultsSearchBarConfig (classes/config/defaults-search-bar-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (DefaultsSearchBarConfig)
   * -----------------------------------------------------
   * @desc The onLoad search defaults for this app.
   * @constructor
   */
  var DefaultsSearchBarConfig = function() {

    var thisDebug;

    this.debug = aIV.debug('DefaultsSearchBarConfig');
    thisDebug = this.debug;

    this.debug.start('init');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    startID = 0;
    view    = 'one';
    order   = 'asc';
    stage   = 'all';
    source  = 'all';
    mainCat = 'all';
    subCat  = 'all';

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from DefaultsSearchBarConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(string|number)} The property's value.
     */
    this.get = function(prop) {

      /** @type {Object<string, (string|number)>} */
      var props = {
        debug  : thisDebug,
        startID: startID,
        view   : view,
        order  : order,
        stage  : stage,
        source : source,
        mainCat: mainCat,
        subCat : subCat
      };

      return getter.call(props, prop);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.set)
     * -----------------------------------------------
     * @desc Sets a protected property's value for DefaultsSearchBarConfig.
     * @param {string} prop - The name of the property to set.
     * @param {(string|number)} val - The value to set the property to.
     * @return {boolean} The setter's success.
     */
    this.set = function(prop, val) {

      /** @type {Object<string, function(*): boolean>} */
      var setters = {
        debug  : thisDebug,
        startID: function(val) { startID = val; return true; },
        view   : function(val) { view    = val; return true; },
        order  : function(val) { order   = val; return true; },
        stage  : function(val) { stage   = val; return true; },
        source : function(val) { source  = val; return true; },
        mainCat: function(val) { mainCat = val; return true; },
        subCat : function(val) { subCat  = val; return true; }
      };

      return setter.call(setters, prop, val);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  DefaultsSearchBarConfig.prototype.constructor = DefaultsSearchBarConfig;

  /**
   * ---------------------------------------------------------
   * Public Method (DefaultsSearchBarConfig.prototype.update)
   * ---------------------------------------------------------
   * @desc Sets the search defaults to the user's settings.
   * @param {Object} defaults - The user's search defaults.
   * @param {!Object<string, stringMap>} names - The available search ids and names.
   * @param {!Object} ids - The available sub category ids.
   * @param {number} quesLen - The number of user's questions.
   */
  DefaultsSearchBarConfig.prototype.update = function(defaults, names,
                                                      ids, quesLen) {

    this.debug.start('update', defaults, names, ids, quesLen);

    /** @type {number} */
    var i;
    /** @type {!Array<*>} */
    var args;
    /** @type {string} */
    var prop;
    /** @type {!Array<string>} */
    var props;
    /** @type {(number|string)} */
    var startID;
    /** @type {string} */
    var mainCat;

    args = [ defaults, 'object', names, 'object', ids, 'object' ];
    args.push(quesLen, 'number');
    checkArgs.apply(null, args);

    // Check the user supplied defaults
    if ( !checkType(defaults, '!object') ) {
      defaults = {};
    }

    // Set the view, order, stage, source, & main category
    props = 'view order stage source mainCat'.split(' ');
    i = props.length;
    while (i--) {
      prop = props[i];
      if (checkType(defaults[ prop ], 'string') &&
          hasOwnProp(names[ prop ], defaults[ prop ])) {
        this.set(prop, defaults[ prop ]);
      }
    }

    // Set the startID
    if ( checkType(defaults.startID, 'number|string') ) {
      startID = defaults.startID;
      if ( checkType(startID, 'string') ) {
        startID = startID.replace(/[^0-9]/g, '');
        startID = startID && Number(startID);
      }
      if (startID && startID <= quesLen) {
        this.set('startID', startID);
      }
    }

    // Set the sub category
    if (checkType(defaults.subCat, 'string') && defaults.subCat !== 'all' &&
        hasOwnProp(names.subCat, defaults.subCat)) {
      mainCat = this.get('mainCat');
      if (mainCat === 'all') {
        this.set('subCat', defaults.subCat);
      }
      else {
        if (ids.subCat[ mainCat ].indexOf(defaults.subCat) !== -1) {
          this.set('subCat', defaults.subCat);
        }
      }
    }

    this.debug.end('update');
  };

/* -----------------------------------------------------------------------------
 * The QuestionsConfig Class (classes/config/questions-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (QuestionsConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for formatting questions in this app.
   * @param {!Object} config - The user's question format config settings.
   * @constructor
   */
  var QuestionsConfig = function(config) {

    var thisDebug;

    this.debug = aIV.debug('QuestionsConfig');
    thisDebug = this.debug;

    this.debug.start('init', config);

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    id       = !(config.id       === false);
    complete = !(config.complete === false);
    source   = !(config.source   === false);
    category = !(config.category === false);
    subCat   = !(config.subCat   === false);
    links    = !(config.links    === false);
    problem  = !(config.problem  === false);
    descr    =  (config.descr    === true );
    output   = !(config.output   === false);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionsConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from QuestionsConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        debug   : thisDebug,
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

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  QuestionsConfig.prototype.constructor = QuestionsConfig;
  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {!objects} questions - The user's questions.
   * @param {!booleanMap} config - The settings for question formatting.
   * @param {function} getSource - The getter for the app's sources.
   * @param {function} getCategory - The getter for the app's categories.
   * @constructor
   */
  var Questions = function(questions, config, getSource, getCategory) {

    this.debug = aIV.debug('Questions');

    this.debug.start('init', questions, config, getSource, getCategory);

    /** @type {!Array<*>} */
    var args;

    args = [ questions, '!objects', config, '!booleanMap' ];
    args.push(getSource, 'function', getCategory, 'function');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The total number of questions.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.list)
     * -----------------------------------------------
     * @desc An array of all the question objects.
     * @return {questions}
     */
    this.list;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {number} */
    var len;

    this.len = questions.length;

    i = this.len + 1;
    this.list = (this.len) ? new Array(i) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    len = this.len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config,
                                     getSource, getCategory);
    }

    // Freeze the public properties that are objects
    freezeObj(this.list);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {Object<string, Question>}
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var url;

    data = {};

    // Build the data hash map
    i = this.len + 1;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[ url ] = this.list[i];
      }
    }

    // Freeze the protected properties
    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question's object or property value.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The Question or property value.
     */
    this.get = function(id, prop, formatted) {

      this.debug.start('get', id, prop, formatted);

      /** @type {string} */
      var errorMsg;
      /** @type {!Question} */
      var question;
      /** @type {*} */
      var result;

      checkArgs(id, 'number|string', prop, 'string=', formatted, 'boolean=');

      if (!hasOwnProp(this.list, String(id)) && !hasOwnProp(data, String(id))) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.get call was ';
        errorMsg += 'given an invalid question id to get. id= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      formatted = formatted || false;

      question = ( checkType(id, 'number') ) ? this.list[ id ] : data[ id ];
      result = ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : (prop === 'rootElem') ?
            question.elem.root : question.get(prop, formatted)
      );

      this.debug.end('get', result);

      return result;
    };

    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Questions.prototype.constructor = Questions;

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemStyle)
   * ---------------------------------------------------
   * @desc Sets the style for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {(string|!Object)} type - The style setting to set.
   *   If a string is given then another param with the value is
   *   required. If an object is provided then use key => value
   *   pairs like styleType => newValue (see below example).
   * @param {(string|number)=} val - If the type param is a string then
   *   this is the new value for the it.
   * @example
   *   app.questions.setElemStyle(5, { display: 'none' });
   *   // OR
   *   app.questions.setElemStyle(5, 'display', 'none');
   */
  Questions.prototype.setElemStyle = function(id, type, val) {

    this.debug.start('setElemStyle', id, type, val);

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<*>} */
    var args;
    /** @type {!Element} */
    var elem;
    /** @type {!RegExp} */
    var dash;
    /** @type {string} */
    var prop;
    /** @type {number} */
    var i;

    args = [ id, 'number|string', type, '!string|object' ];
    args.push(val, 'string|number=');
    checkArgs.apply(null, args);

    dash = /\-/;

    // Handle one update
    if ( checkType(type, 'string') ) {

      if ( !checkType(val, 'string|number') ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'value to set the style to. val= ' + val;
        throw new TypeError(errorMsg);
      }

      // Replace dashes with camel case
      if ( dash.test(type) ) {
        type = camelCase(type);
      }

      elem = this.get(id, 'rootElem');

      if ( !(type in elem.style) ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'style property to set. prop= ' + type;
        throw new Error(errorMsg);
      }

      elem.style[ type ] = val;
    }
    // Handle multiple updates
    else {

      elem = this.get(id, 'rootElem');

      for (prop in type) {
        if ( hasOwnProp(type, prop) ) {

          // Replace dashes with camel case
          if ( dash.test(prop) ) {
            prop = camelCase(prop);
          }

          if ( !(prop in elem.style) ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'style property to set. prop= ' + prop;
            throw new Error(errorMsg);
          }

          val = type[ prop ];

          if ( !checkType(val, 'string|number') ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'value to set a style to. prop= ' + prop + ', ';
            errorMsg += 'val= ' + val;
            throw new TypeError(errorMsg);
          }

          elem.style[ prop ] = val;
        }
      }
    }
  };

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemClass)
   * ---------------------------------------------------
   * @desc Sets the class name for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {string} newClassName - The new class name.
   */
  Questions.prototype.setElemClass = function(id, newClassName) {

    this.debug.start('setElemClass', id, newClassName);

    checkArgs(id, 'number|string', newClassName, 'string');

    this.get(id, 'rootElem').className = newClassName;

    this.debug.end('setElemClass');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addIdsToSearch)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function}
   */
  Questions.prototype.addIdsToSearch = function() {

    this.debug.start('addIdsToSearch');

    /** @type {!booleanMap} */
    var config;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    config = {
      stage   : app.config.searchBar.get('stage'),
      source  : app.config.searchBar.get('source'),
      category: app.config.searchBar.get('category'),
      subCat  : app.config.searchBar.get('subCat')
    };
    config.source = config.source || app.config.links.get('source');
    config.category = config.category || app.config.links.get('category');
    config.subCat = config.subCat || app.config.links.get('category');

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.get(id).addToSearch(config);
    }

    app.sources.freezeIds();
    app.categories.freezeIds();

    this.debug.end('addIdsToSearch');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function}
   */
  Questions.prototype.appendElems = function() {

    this.debug.start('appendElems');

    /** @type {!Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      question = this.get(id);
      app.elems.ques.appendChild(question.elem.root);
      question.addElemContent();
    }

    this.debug.end('appendElems');
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

    this.debug.start('addCodeExts');

    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.debug.group('addCodeExts', 'coll', 'questionID= $$', id);
      this.get(id, 'elem').addCodeExt();
      this.debug.group('addCodeExts', 'end');
    }

    this.debug.end('addCodeExts');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.reverseElems)
   * -----------------------------------------------------
   * @desc Appends each question's element to #aIV-questions in the direction
   *   of the current search order.
   * @type {function}
   */
  Questions.prototype.reverseElems = function() {

    this.debug.start('reverseElems');

    /** @type {string} */
    var direction;
    /** @type {!Element} */
    var elem;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    direction = app.searchBar.vals.order;
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      id = 0;
      while (++id < len) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }
    // Appends in desc order
    else {
      id = len;
      while (--id) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }

    this.debug.end('reverseElems');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.hideElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'none' for the provided questions.
   * @param {!numbers} ids - The previous active question ids.
   * @param {number} index - The index of the ids to hide from view.
   * @param {string} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    this.debug.start('hideElems', ids, index, view);

    /** @type {string} */
    var errorMsg;
    /** @type {number} */
    var i;

    checkArgs(ids, '!numbers', index, 'number', view, 'string');

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
      }
      // Hide all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      // Hide only the index of the provided ids
      if (view === 'one') {
        this.setElemStyle(ids[ index ], 'display', 'none');
      }
      // Hide the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be hidden
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }

    this.debug.end('hideElems');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.showElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'block' for the provided questions.
   * @param {!numbers} ids - The new active question ids.
   * @param {number} index - The index of the ids to show.
   */
  Questions.prototype.showElems = function(ids, index) {

    this.debug.start('showElems', ids, index);

    /** @type {number} */
    var i;
    /** @type {string} */
    var view;
    /** @type {string} */
    var errorMsg;
    /** @type {string} */
    var newClassName;

    checkArgs(ids, '!numbers', index, 'number');

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
      }
      // Show all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      view = app.searchBar.vals.view;

      // Show only the index of the provided ids
      if (view === 'one') {
        this.setElemClass(ids[ index ], 'question shade1 hideLink');
        this.setElemStyle(ids[ index ], 'display', 'block');
      }
      // Show the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be shown
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }

    this.debug.end('showElems');
  };

/* -----------------------------------------------------------------------------
 * The PrettyConfig Class (classes/config/pretty-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {!Object<string, (string|number|boolean)>} config - The user's
   *   prettifier configuration settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    var thisDebug;

    this.debug = aIV.debug('PrettyConfig');
    thisDebug = this.debug;

    this.debug.start('init', config);

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    trimSpace = 0;
    tabLength = 2;
    commentLinks = (config.commentLinks === true);

    if ( hasOwnProp(config, 'trimSpace') ) {
      if (checkType(config.trimSpace, 'number') && config.trimSpace >= 0) {
        trimSpace = Math.floor(config.trimSpace);
      }
      else if ( checkType(config.trimSpace, 'string') ) {
        config.trimSpace = config.trimSpace.replace(/[^0-9]/g, '');
        if (config.trimSpace) {
          trimSpace = Number(config.trimSpace);
        }
      }
    }

    if ( hasOwnProp(config, 'tabLength') ) {
      if (checkType(config.tabLength, 'number') && config.tabLength >= 0) {
        tabLength = Math.floor(config.tabLength);
      }
      else if ( checkType(config.tabLength, 'string') ) {
        config.tabLength = config.tabLength.replace(/[^0-9]/g, '');
        if (config.tabLength) {
          tabLength = Number(config.tabLength);
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from PrettyConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(number|boolean)} The property's value.
     */
    this.get = function(prop) {

      /** @type {Object<string, (number|boolean)>} */
      var props = {
        debug       : thisDebug,
        trimSpace   : trimSpace,
        tabLength   : tabLength,
        commentLinks: commentLinks
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  PrettyConfig.prototype.constructor = PrettyConfig;

/* -----------------------------------------------------------------------------
 * The LinksConfig Class (classes/config/links-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (LinksConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for whether to show search links for
   *   portions of each question.
   * @param {!Object<string, boolean>} config - The user's config settings
   *   for search link formatting.
   * @constructor
   */
  var LinksConfig = function(config) {

    var thisDebug;

    this.debug = aIV.debug('LinksConfig');
    thisDebug = this.debug;

    this.debug.start('init', config);

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    id       = !(config.id       === false);
    source   =  (config.source   === true );
    category = !(config.category === false);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (LinksConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from LinksConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        debug   : thisDebug,
        id      : id,
        source  : source,
        category: category
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  LinksConfig.prototype.constructor = LinksConfig;

/* -----------------------------------------------------------------------------
 * The Sources Class (classes/sources.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?stringMap} sources - The user's sources.
   * @constructor
   */
  var Sources = function(sources) {

    var thisDebug;

    this.debug = aIV.debug('Sources');
    thisDebug = this.debug;

    this.debug.start('init', sources);

    checkArgs(sources, 'stringMap');

    ////////////////////////////////////////////////////////////////////////////
    // Prepare The User Supplied Params
    ////////////////////////////////////////////////////////////////////////////

    if ( !checkType(sources, '!stringMap') ) {
      sources = {};
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var allIndex;

    this.ids = Object.keys(sources);
    this.len = this.ids.length;

    // Sort the ids
    if (this.len) {
      this.ids = sortKeys(this.ids, sources);
    }

    // Fix a category with the id of all
    allIndex = this.ids.indexOf('all');
    if (allIndex !== -1) {
      this.ids[ allIndex ] = '_all';
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Sources.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the source objects using the ids as keys.
     * @type {Object<string, Source>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var sourceId;
    /** @type {number} */
    var i;

    data = {};

    // Build the data hash map
    i = this.len;
    while (i--) {
      sourceId = this.ids[i];
      data[ sourceId ] = new Source(sources[ sourceId ]);
    }

    // Deep freeze
    freezeObj(data, true);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Sources.get)
     * -----------------------------------------------
     * @desc Get a Source's object or protected property.
     * @param {string} id - The source id to get.
     * @param {string=} prop - The property to get.
     * @return {!(Source|string|numbers)}
     */
    this.get = function(id, prop) {

      thisDebug.start('get', id, prop);

      /** @type {string} */
      var errorMsg;
      /** @type {!Source} */
      var source;
      /** @type {!(Source|string|numbers)} */
      var result;

      checkArgs(id, 'string', prop, 'string=');

      if ( !hasOwnProp(data, id) ) {
        errorMsg = 'An aIV.app internal error occurred. A Sources.get call ';
        errorMsg += 'was given an invalid source id to get. sourceID= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      source = data[ id ];
      result = (prop) ? source.get(prop) : source;

      thisDebug.end('get', result);

      return result;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    freezeObj(this, true);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Sources.prototype.constructor = Sources;

  /**
   * -----------------------------------------------------
   * Public Method (Sources.prototype.freezeIds)
   * -----------------------------------------------------
   * @desc Freezes the ids array for each source.
   * @type {function}
   */
  Sources.prototype.freezeIds = function() {

    this.debug.start('freezeIds');

    /** @type {string} */
    var id;
    /** @type {number} */
    var i;

    i = this.len;
    while (i--) {
      id = this.ids[i];
      this.get(id).freezeIds();
    }

    this.debug.end('freezeIds');
  };

/* -----------------------------------------------------------------------------
 * The Source Class (classes/source.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc An object containing the details of a source.
   * @param {string} name - The source's name.
   * @constructor
   */
  var Source = function(name) {

    var thisDebug;

    this.debug = aIV.debug('Source');
    thisDebug = this.debug;

    this.debug.start('init', name);

    checkArgs(name, 'string');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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
     * @type {!numbers}
     * @private
     */
    var ids;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    if (!name || !checkType(name, 'string')) {
      name = '';
      url  = '';
    }
    else {
      url = makeUrl(name);
    }
    ids = [];

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Source.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the source.
     * @param {string} propName - The name of the property to get.
     * @return {(string|!numbers)}
     */
    this.get = function(propName) {

      /** @type {Object<string, (string|!numbers)>} */
      var props = {
        debug: thisDebug,
        name: name,
        url : url,
        ids : ids
      };

      return getter.call(props, propName);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this source.
     * @param {number} id - The index to add.
     */
    this.addId = function(id) {

      this.debug.start('addId', id);

      /** @type {string} */
      var errorMsg;

      checkArgs(id, 'number');

      if (id < 1) {
        errorMsg = 'An aIV.app internal error occurred. A Source.addId call ';
        errorMsg += 'was given an invalid question id to add. id= ' + id;
        throw new Error(errorMsg);
      }

      ids.push(id);

      this.debug.end('addId');
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.freezeIds)
     * -----------------------------------------------
     * @desc Freezes this category's question ids.
     * @type {function}
     */
    this.freezeIds = function() {

      this.debug.start('freezeIds');

      freezeObj(ids);

      this.debug.end('freezeIds');
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Source.prototype.constructor = Source;

/* -----------------------------------------------------------------------------
 * The Categories Class (classes/categories.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Categories)
   * -----------------------------------------------------
   * @desc The available categories for each question.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @constructor
   */
  var Categories = function(categories) {

    var thisDebug;

    this.debug = aIV.debug('Categories');
    thisDebug = this.debug;

    this.debug.start('init', categories);

    checkArgs(categories, 'objectMap|stringMap');

    ////////////////////////////////////////////////////////////////////////////
    // Prepare The User Supplied Params
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the main category ids in alphabetical order.
     * @type {!strings}
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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var allIndex;

    this.ids = Object.keys(categories.main);
    this.len = this.ids.length;

    // Sort the main category ids
    if (this.len) {
      this.ids = sortKeys(this.ids, categories.main);
    }

    // Fix a category with the id of all
    allIndex = this.ids.indexOf('all');
    if (allIndex !== -1) {
      this.ids[ allIndex ] = '_all';
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the category objects using the ids as keys.
     * @type {!Object<string, !Category>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {strings} */
    var subIds;
    /** @type {string} */
    var mainId;
    /** @type {string} */
    var subId;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    data = {};

    // Build the data hash map
    i = this.len;
    while (i--) {
      mainId = this.ids[i];

      // Save and sort the sub category ids if they exist
      subIds = ( (hasOwnProp(categories.sub, mainId)) ?
        Object.keys(categories.sub[ mainId ]) : []
      );
      if (subIds.length) {
        subIds = sortKeys(subIds, categories.sub[ mainId ]);
      }

      // Add main category to the hash map
      data[ mainId ] = new Category(categories.main[ mainId ], subIds);

      // Add the sub categories to the hash map
      ii = subIds.length;
      while (ii--) {
        subId = subIds[ii];
        data[ subId ] = new Category(categories.sub[ mainId ][ subId ]);
      }
    }

    // Deep freeze
    freezeObj(data, true);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.get)
     * -----------------------------------------------
     * @desc Get a Catgory's object or protected property.
     * @param {string} id - The category id to get.
     * @param {string=} prop - The property to get.
     * @return {!(Category|string|numbers)}
     */
    this.get = function(id, prop) {

      thisDebug.start('get', id, prop);

      /** @type {string} */
      var errorMsg;
      /** @type {!Category} */
      var category;
      /** @type {!(Category|string|numbers)} */
      var result;

      checkArgs(id, 'string', prop, 'string=');

      if ( !hasOwnProp(data, id) ) {
        errorMsg = 'An aIV.app internal error occurred. A Categories.get call ';
        errorMsg += 'was given an invalid category id to get. catID= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      category = data[ id ];
      result = (prop) ? category.get(prop) : category;

      thisDebug.end('get', result);

      return result;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    freezeObj(this, true);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Categories.prototype.constructor = Categories;

  /**
   * -----------------------------------------------------
   * Public Method (Categories.prototype.freezeIds)
   * -----------------------------------------------------
   * @desc Freezes the ids array for each category.
   * @type {function}
   */
  Categories.prototype.freezeIds = function() {

    this.debug.start('freezeIds');

    /** @type {string} */
    var id;
    /** @type {number} */
    var i;

    i = this.len;
    while (i--) {
      id = this.ids[i];
      this.get(id).freezeIds();
    }

    this.debug.end('freezeIds');
  };

/* -----------------------------------------------------------------------------
 * The Category Class (classes/category.js)
 * -------------------------------------------------------------------------- */

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

    var thisDebug;

    this.debug = aIV.debug('Category');
    thisDebug = this.debug;

    this.debug.start('init', name, subs);

    checkArgs(name, 'string', subs, 'strings=');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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
     * @type {!numbers}
     * @private
     */
    var ids;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    if (!name || !checkType(name, 'string')) {
      name = '';
      url  = '';
    }
    else {
      url = makeUrl(name);
    }
    ids = [];
    subs = (subs) ? freezeObj(subs) : null;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Category.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the category.
     * @param {string} propName - The name of the property to get.
     * @return {(string|!numbers)}
     */
    this.get = function(propName) {

      /** @type {Object<string, (string|!numbers)>} */
      var props = {
        debug: thisDebug,
        name: name,
        url : url,
        subs: subs,
        ids : ids
      };

      return getter.call(props, propName);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Category.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this category.
     * @param {number} id - The id to add.
     */
    this.addId = function(id) {

      this.debug.start('addId', id);

      /** @type {string} */
      var errorMsg;

      checkArgs(id, 'number');

      if (id < 1) {
        errorMsg = 'An aIV.app internal error occurred. A Category.addId ';
        errorMsg += 'call was given an invalid question id to add. id= ' + id;
        throw new Error(errorMsg);
      }

      ids.push(id);

      this.debug.end('addId');
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Category.freezeIds)
     * -----------------------------------------------
     * @desc Freezes this category's question ids.
     * @type {function}
     */
    this.freezeIds = function() {

      this.debug.start('freezeIds');

      freezeObj(ids);

      this.debug.end('freezeIds');
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Category.prototype.constructor = Category;

/* -----------------------------------------------------------------------------
 * The SearchBar Class (classes/search-bar.js)
 * -------------------------------------------------------------------------- */

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

    this.debug = aIV.debug('SearchBar');

    debugMsg = 'config= $$, sources= $$, categories= $$';
    this.debug.group('init', 'coll', debugMsg, config, sources, categories);

    this.debug.start('init', config, sources, categories);

    debugArgs = [ 'init', config, 'booleanMap', sources, 'object' ];
    debugArgs.push(categories, 'object');
    this.debug.args(debugArgs);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {boolean} */
    var pass;

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

        // Add the sub category options
        this.opts.subCat[ mainId ] = [];

        // Add the sub categories names and ids
        subs = mainCat.get('subs');
        if (subs && subs.length) {
          this.ids.subCat[ mainId ] = subs.slice(0);
          this.ids.subCat[ mainId ].unshift('all');
          subs.forEach(function(/** string */ subId) {
            this.names.subCat[ subId ] = categories.get(subId, 'name');
          }, this);
        }
        else {
          this.ids.subCat[ mainId ] = [ 'all' ];
        }
      }, this);
    }

    // Setup the question ids property
    this.ques = {};
    this.ques.stage = {};
    this.ques.stage.com = [];
    this.ques.stage.inc = [];

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
    this.elems.view = makeElem({
      tag      : 'select',
      id       : 'aIV-view',
      className: 'showView'
    });
    this.elems.order = makeElem({
      tag      : 'select',
      id       : 'aIV-order',
      className: 'showOrder'
    });
    this.elems.stage = ( (config.stage) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-stage',
        className: 'showStage'
      })
      : null
    );
    this.elems.source = ( (config.source && sources.len) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-source',
        className: 'showSource'
      })
      : null
    );
    this.elems.mainCat = ( (config.category && categories.len) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-mainCat',
        className: 'showMainCat'
      })
      : null
    );
    pass = (this.elems.mainCat && config.subCat);
    pass = pass && categories.ids.some(function(/** string */ id) {
      return !!this.ids.subCat[id];
    }, this);
    this.elems.subCat = ( (pass) ?
      makeElem({
        tag      : 'select',
        id       : 'aIV-subCat',
        className: 'showSubCat'
      })
      : null
    );

    // Freeze all of the completed properties
    freezeObj(this.names);
    freezeObj(this.ids);
    freezeObj(this.opts);
    freezeObj(this.ques.stage);
    freezeObj(this.ques);
    freezeObj(this.elems);


    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    this.debug.group('init', 'end');

    // Freeze this class instance
    freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBar.prototype.constructor = SearchBar;

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setToDefaults)
   * -----------------------------------------------------
   * @desc Updates the current search bar's values to the defaults.
   * @param {Object} defaults - The default values.
   */
  SearchBar.prototype.setToDefaults = function(defaults) {

    this.debug.group('setToDefaults', 'coll', 'defaults= $$', defaults);
    this.debug.start('setToDefaults', defaults);
    this.debug.args('setToDefaults', defaults, 'object');

    /** @type {string} */
    var view;
    /** @type {string} */
    var order;
    /** @type {string} */
    var stage;
    /** @type {string} */
    var source;
    /** @type {string} */
    var mainCat;
    /** @type {string} */
    var subCat;

    view    = defaults.get('view');
    order   = defaults.get('order');
    stage   = defaults.get('stage');
    source  = defaults.get('source');
    mainCat = defaults.get('mainCat');
    subCat  = defaults.get('subCat');

    this.vals.view    = view;
    this.vals.order   = order;
    this.vals.stage   = stage;
    this.vals.source  = source;
    this.vals.mainCat = mainCat;
    this.vals.subCat  = subCat;

    this.elems.view.value = view;
    this.elems.order.value = order;
    if (this.elems.stage) {
      this.elems.stage.value = stage;
    }
    if (this.elems.source) {
      this.elems.source.value = source;
    }
    if (this.elems.mainCat) {
      this.elems.mainCat.value = mainCat;
    }
    if (this.elems.subCat) {
      this.elems.subCat.value = subCat;
    }

    this.debug.group('setToDefaults', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setMainElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's select elements.
   * @type {function}
   */
  SearchBar.prototype.setMainElems = function() {

    this.debug.group('setMainElems', 'coll');
    this.debug.start('setMainElems');

    /** @type {boolean} */
    var pass;

    // Set view search element
    this.elems.view.onchange = function(event) {
      Events.searchView(event.target.value);
    };

    // Set order search element
    this.elems.order.onchange = function(event) {
      Events.searchOrder(event.target.value);
    };

    // Set stage search element
    if (this.elems.stage) {
      this.elems.stage.onchange = function(event) {
        Events.searchStage(event.target.value);
      };
    }

    // Set source search element
    if (this.elems.source) {
      this.elems.source.onchange = function(event) {
        Events.searchSource(event.target.value);
      };
    }

    // Set main category search element
    if (this.elems.mainCat) {
      this.elems.mainCat.onchange = function(event) {
        Events.searchMainCat(event.target.value);
      };
    }

    // Set sub category search element
    if (this.elems.subCat) {
      this.elems.subCat.onchange = function(event) {
        Events.searchSubCat(event.target.value);
      };
    }

    this.debug.group('setMainElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOptElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   * @type {function}
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
     * @return {Element}
     * @private
     */
    var makeOptElem = function(id, name) {
      /** @type {Element} */
      var elem;

      elem = makeElem({
        tag : 'option',
        text: name
      });
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
      /** @type {Element} */
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
      /** @type {Element} */
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
        /** @type {Element} */
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
        /** @type {Element} */
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
        /** @type {Element} */
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
          /** @type {Element} */
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
        /** @type {Element} */
        var elem;

        if (!!this.ids.subCat[mainId]) {

          name = this.names.mainCat[mainId];
          elem = makeOptElem('', name);
          this.opts.subCat['all'].push(elem);

          this.ids.subCat[mainId].forEach(function(/** string */ id) {
            /** @type {string} */
            var name;
            /** @type {Element} */
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
   * @type {function}
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
   * @param {string=} newVal - The new value to update subCat to.
   */
  SearchBar.prototype.updateSubCatOpts = function(newVal) {

    this.debug.start('updateSubCatOpts', newVal);
    this.debug.args('updateSubCatOpts', newVal, 'string=');

    /** @type {elements} */
    var opts;

    newVal = (typeof newVal === 'string') ? newVal : 'all';

    this.vals.subCat = newVal;

    if (this.elems.subCat) {

      // Clear subCat's current option elements
      while (this.elems.subCat.firstChild) {
        this.elems.subCat.removeChild(this.elems.subCat.firstChild);
      }

      // Append the new option elements
      opts = this.opts.subCat[ this.vals.mainCat ];
      opts.forEach(function(/** element */ elem) {
        this.elems.subCat.appendChild(elem);
      }, this);

      this.elems.subCat.value = newVal;
    }
  };

/* -----------------------------------------------------------------------------
 * The Questions Class (classes/questions.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {!objects} questions - The user's questions.
   * @param {!booleanMap} config - The settings for question formatting.
   * @param {function} getSource - The getter for the app's sources.
   * @param {function} getCategory - The getter for the app's categories.
   * @constructor
   */
  var Questions = function(questions, config, getSource, getCategory) {

    this.debug = aIV.debug('Questions');

    this.debug.start('init', questions, config, getSource, getCategory);

    /** @type {!Array<*>} */
    var args;

    args = [ questions, '!objects', config, '!booleanMap' ];
    args.push(getSource, 'function', getCategory, 'function');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The total number of questions.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.list)
     * -----------------------------------------------
     * @desc An array of all the question objects.
     * @return {questions}
     */
    this.list;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {number} */
    var len;

    this.len = questions.length;

    i = this.len + 1;
    this.list = (this.len) ? new Array(i) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    len = this.len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config,
                                     getSource, getCategory);
    }

    // Freeze the public properties that are objects
    freezeObj(this.list);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {Object<string, Question>}
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var url;

    data = {};

    // Build the data hash map
    i = this.len + 1;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[ url ] = this.list[i];
      }
    }

    // Freeze the protected properties
    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question's object or property value.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The Question or property value.
     */
    this.get = function(id, prop, formatted) {

      this.debug.start('get', id, prop, formatted);

      /** @type {string} */
      var errorMsg;
      /** @type {!Question} */
      var question;
      /** @type {*} */
      var result;

      checkArgs(id, 'number|string', prop, 'string=', formatted, 'boolean=');

      if (!hasOwnProp(this.list, String(id)) && !hasOwnProp(data, String(id))) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.get call was ';
        errorMsg += 'given an invalid question id to get. id= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      formatted = formatted || false;

      question = ( checkType(id, 'number') ) ? this.list[ id ] : data[ id ];
      result = ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : (prop === 'rootElem') ?
            question.elem.root : question.get(prop, formatted)
      );

      this.debug.end('get', result);

      return result;
    };

    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Questions.prototype.constructor = Questions;

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemStyle)
   * ---------------------------------------------------
   * @desc Sets the style for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {(string|!Object)} type - The style setting to set.
   *   If a string is given then another param with the value is
   *   required. If an object is provided then use key => value
   *   pairs like styleType => newValue (see below example).
   * @param {(string|number)=} val - If the type param is a string then
   *   this is the new value for the it.
   * @example
   *   app.questions.setElemStyle(5, { display: 'none' });
   *   // OR
   *   app.questions.setElemStyle(5, 'display', 'none');
   */
  Questions.prototype.setElemStyle = function(id, type, val) {

    this.debug.start('setElemStyle', id, type, val);

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<*>} */
    var args;
    /** @type {!Element} */
    var elem;
    /** @type {!RegExp} */
    var dash;
    /** @type {string} */
    var prop;
    /** @type {number} */
    var i;

    args = [ id, 'number|string', type, '!string|object' ];
    args.push(val, 'string|number=');
    checkArgs.apply(null, args);

    dash = /\-/;

    // Handle one update
    if ( checkType(type, 'string') ) {

      if ( !checkType(val, 'string|number') ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'value to set the style to. val= ' + val;
        throw new TypeError(errorMsg);
      }

      // Replace dashes with camel case
      if ( dash.test(type) ) {
        type = camelCase(type);
      }

      elem = this.get(id, 'rootElem');

      if ( !(type in elem.style) ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'style property to set. prop= ' + type;
        throw new Error(errorMsg);
      }

      elem.style[ type ] = val;
    }
    // Handle multiple updates
    else {

      elem = this.get(id, 'rootElem');

      for (prop in type) {
        if ( hasOwnProp(type, prop) ) {

          // Replace dashes with camel case
          if ( dash.test(prop) ) {
            prop = camelCase(prop);
          }

          if ( !(prop in elem.style) ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'style property to set. prop= ' + prop;
            throw new Error(errorMsg);
          }

          val = type[ prop ];

          if ( !checkType(val, 'string|number') ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'value to set a style to. prop= ' + prop + ', ';
            errorMsg += 'val= ' + val;
            throw new TypeError(errorMsg);
          }

          elem.style[ prop ] = val;
        }
      }
    }
  };

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemClass)
   * ---------------------------------------------------
   * @desc Sets the class name for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {string} newClassName - The new class name.
   */
  Questions.prototype.setElemClass = function(id, newClassName) {

    this.debug.start('setElemClass', id, newClassName);

    checkArgs(id, 'number|string', newClassName, 'string');

    this.get(id, 'rootElem').className = newClassName;

    this.debug.end('setElemClass');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addIdsToSearch)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function}
   */
  Questions.prototype.addIdsToSearch = function() {

    this.debug.start('addIdsToSearch');

    /** @type {!booleanMap} */
    var config;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    config = {
      stage   : app.config.searchBar.get('stage'),
      source  : app.config.searchBar.get('source'),
      category: app.config.searchBar.get('category'),
      subCat  : app.config.searchBar.get('subCat')
    };
    config.source = config.source || app.config.links.get('source');
    config.category = config.category || app.config.links.get('category');
    config.subCat = config.subCat || app.config.links.get('category');

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.get(id).addToSearch(config);
    }

    app.sources.freezeIds();
    app.categories.freezeIds();

    this.debug.end('addIdsToSearch');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function}
   */
  Questions.prototype.appendElems = function() {

    this.debug.start('appendElems');

    /** @type {!Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      question = this.get(id);
      app.elems.ques.appendChild(question.elem.root);
      question.addElemContent();
    }

    this.debug.end('appendElems');
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

    this.debug.start('addCodeExts');

    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.debug.group('addCodeExts', 'coll', 'questionID= $$', id);
      this.get(id, 'elem').addCodeExt();
      this.debug.group('addCodeExts', 'end');
    }

    this.debug.end('addCodeExts');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.reverseElems)
   * -----------------------------------------------------
   * @desc Appends each question's element to #aIV-questions in the direction
   *   of the current search order.
   * @type {function}
   */
  Questions.prototype.reverseElems = function() {

    this.debug.start('reverseElems');

    /** @type {string} */
    var direction;
    /** @type {!Element} */
    var elem;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    direction = app.searchBar.vals.order;
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      id = 0;
      while (++id < len) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }
    // Appends in desc order
    else {
      id = len;
      while (--id) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }

    this.debug.end('reverseElems');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.hideElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'none' for the provided questions.
   * @param {!numbers} ids - The previous active question ids.
   * @param {number} index - The index of the ids to hide from view.
   * @param {string} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    this.debug.start('hideElems', ids, index, view);

    /** @type {string} */
    var errorMsg;
    /** @type {number} */
    var i;

    checkArgs(ids, '!numbers', index, 'number', view, 'string');

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
      }
      // Hide all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      // Hide only the index of the provided ids
      if (view === 'one') {
        this.setElemStyle(ids[ index ], 'display', 'none');
      }
      // Hide the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be hidden
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }

    this.debug.end('hideElems');
  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.showElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'block' for the provided questions.
   * @param {!numbers} ids - The new active question ids.
   * @param {number} index - The index of the ids to show.
   */
  Questions.prototype.showElems = function(ids, index) {

    this.debug.start('showElems', ids, index);

    /** @type {number} */
    var i;
    /** @type {string} */
    var view;
    /** @type {string} */
    var errorMsg;
    /** @type {string} */
    var newClassName;

    checkArgs(ids, '!numbers', index, 'number');

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
      }
      // Show all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      view = app.searchBar.vals.view;

      // Show only the index of the provided ids
      if (view === 'one') {
        this.setElemClass(ids[ index ], 'question shade1 hideLink');
        this.setElemStyle(ids[ index ], 'display', 'block');
      }
      // Show the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be shown
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }

    this.debug.end('showElems');
  };

/* -----------------------------------------------------------------------------
 * The Question Class (classes/question/question.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {!Object} question - The details of a new question.
   * @param {number} id - The id for the question.
   * @param {!booleanMap} config - The settings for question formatting.
   * @param {function} getSource - The getter for the app's sources.
   * @param {function} getCategory - The getter for the app's categories.
   * @constructor
   */
  var Question = function(question, id, config, getSource, getCategory) {

    this.debug = aIV.debug('Question');

    this.debug.group('init', 'coll', 'questionID= $$', id);

    this.debug.start('init', question, id, config, getSource, getCategory);

    /** @type {!Array<*>} */
    var args;

    args = [ question, '!object', id, 'number', config, '!booleanMap' ];
    args.push(getSource, 'function', getCategory, 'function');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Setup & Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question's DOM container.
     * @type {!QuestionElem}
     */
    this.elem = new QuestionElem(id);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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
     * Protected Property (Question.format)
     * -----------------------------------------------
     * @desc The formatted details for the question.
     * @type {QuestionFormat}
     */
    var format;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!stringMap} */
    var linkObj;
    /** @type {string} */
    var catId;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    url = '';
    if (question.url && checkType(question.url, 'string')) {
      url = makeUrl(question.url);
    }

    complete = (question.complete === true);

    source = ( (!checkType(question.source, 'string')) ?
      '' : (question.source === 'all') ?
        '_all' : question.source
    );
    if ( !getSource(source, 'name') ) {
      source = '';
    }

    mainCat = [];
    if ( checkType(question.mainCat, '!strings') ) {
      len = question.mainCat.length;
      i = -1;
      while (++i < len) {
        catId = question.mainCat[i];
        if (catId === 'all') {
          catId = '_all';
        }
        if ( getCategory(catId, 'name') ) {
          mainCat.push(catId);
        }
      }
    }

    subCat = [];
    if ( checkType(question.subCat, '!strings') ) {
      len = question.subCat.length;
      i = -1;
      while (++i < len) {
        catId = question.subCat[i];
        if (catId === 'all') {
          catId = '_all';
        }
        if ( getCategory(catId, 'name') ) {
          subCat.push(catId);
        }
      }
    }

    links = [];
    if (config.links && checkType(question.links, '!objects')) {
      len = question.links.length;
      i = -1;
      while (++i < len) {
        linkObj = question.links[i];
        if (checkType(linkObj, '!object') &&
            checkType(linkObj.name, 'string') &&
            checkType(linkObj.href, 'string') &&
            isLink(linkObj.href)) {
          links.push(linkObj);
        }
      }
    }

    problem = ( checkType(question.problem, 'string') ) ? question.problem : '';

    descr = ( checkType(question.descr, 'string') ) ? question.descr : '';

    solution = '';
    output = '';
    if ( checkType(question.solution, 'function') ) {

      solution = String(question.solution);
      solution = solution && trimFunctionWrapper(solution);

      if (solution && config.output) {
        try {
          output = String( question.solution() );
        }
        catch (error) {
          debugMsg = 'The question\'s solution produced an error. ';
          debugMsg += 'questionID= $$, error= $$';
          this.debug.fail('init', false, debugMsg, id, error.toString());
          output = 'The solution returned the following error - ';
          output += error.toString();
        }
      }
    }

    format = new QuestionFormat({
      id      : id,
      complete: complete,
      source  : source,
      mainCat : mainCat,
      subCat  : subCat,
      solution: solution
    }, config, getSource, getCategory);

    // Freeze some of the protected properties
    freezeObj(mainCat);
    freezeObj(subCat);
    freezeObj(links);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Question.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from a Question.
     * @param {string} propName - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The property's value.
     */
    this.get = function(propName, formatted) {

      this.debug.start('get', propName, formatted);

      /** @type {string} */
      var errorMsg;
      /** @type {*} */
      var propVal;
      /** @type {!Object<string, *>} */
      var props;

      checkArgs(propName, 'string', formatted, 'boolean=');

      props = {
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

      if ( !hasOwnProp(props, propName) ) {
        errorMsg = 'An aIV.app internal error occurred. A Question.get call was ';
        errorMsg += 'given an invalid property name to get. property= ' + propName;
        throw new Error(errorMsg);
      }

      propVal = (formatted) ? format.get(propName) : props[ propName ];

      this.debug.end('get', propVal);

      return propVal;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this.get);
    freezeObj(this);

    this.debug.end('init');
    this.debug.group('init', 'end');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Question.prototype.constructor = Question;

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addToSearch)
   * -----------------------------------------------------
   * @desc Adds the question id to its matching search properties.
   * @param {!booleanMap} config - The needed format config.
   */
  Question.prototype.addToSearch = function(config) {

    this.debug.start('addToSearch');

    /** @type {number} */
    var i;
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

    checkArgs(config, '!booleanMap');

    id       = this.get('id');
    complete = this.get('complete');
    source   = this.get('source');
    mainCat  = this.get('mainCat');
    subCat   = this.get('subCat');

    // Add the Question's id to the stage ids
    if (config.stage) {
      if (complete) {
        app.searchBar.ques.stage['com'].push(id);
      }
      else {
        app.searchBar.ques.stage['inc'].push(id);
      }
    }

    // Add the Question's id to the source ids
    if (config.source && source) {
      app.sources.get(source).addId(id);
    }

    // Add the Question's id to the main category ids
    if (config.category) {
      i = mainCat.length;
      while (i--) {
        app.categories.get(mainCat[i]).addId(id);
      }
    }

    // Add the Question's id to the sub category ids
    if (config.category && config.subCat) {
      i = subCat.length;
      while (i--) {
        app.categories.get(subCat[i]).addId(id);
      }
    }

    this.debug.end('addToSearch');
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
      id      : this.get('id', true),
      url     : this.get('url'),
      complete: this.get('complete', true),
      source  : {
        id  : this.get('source'),
        name: this.get('source', true)
      },
      mainCat : {
        ids  : this.get('mainCat'),
        h3   : this.get('mainCat', true).h3,
        names: this.get('mainCat', true).names
      },
      subCat  : {
        ids  : this.get('subCat'),
        h3   : this.get('subCat', true).h3,
        names: this.get('subCat', true).names
      },
      links   : this.get('links'),
      problem : this.get('problem'),
      descr   : this.get('descr'),
      solution: this.get('solution', true),
      output  : this.get('output')
    });

    this.debug.end('addElemContent');
    this.debug.group('addElemContent', 'end');
  };

/* -----------------------------------------------------------------------------
 * The QuestionFormat Class (classes/question/question-format.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {!Object} question - The pre-formatted details of the question.
   * @param {!booleanMap} config - The settings for question formatting.
   * @param {function} getSource - The getter for the app's sources.
   * @param {function} getCategory - The getter for the app's categories.
   * @constructor
   */
  var QuestionFormat = function(question, config, getSource, getCategory) {

    var thisDebug;

    this.debug = aIV.debug('QuestionFormat');
    thisDebug = this.debug;

    this.debug.start('init', question, config, getSource, getCategory);

    /** @type {!Array<*>} */
    var args;

    args = [ question, '!object', config, '!booleanMap' ];
    args.push(getSource, 'function', getCategory, 'function');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!{ result: string, lineCount: number }} */
    var code;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    id = (config.id && question.id) ? question.id : '';
    if (id) {
      id = ( (id < 10) ?
        '00' + id : (id < 100) ?
          '0' + id : '' + id
      );
    }

    source = ( (config.source && question.source) ?
      getSource(question.source, 'name') : ''
    );

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
    if (config.category) {

      // Format the main category
      if (question.mainCat.length) {
        mainCat.h3 = ( (question.mainCat.length > 1) ?
          'Main Categories:' : 'Main Category:'
        );
        len = question.mainCat.length;
        mainCat.names = new Array(len);
        i = -1;
        while (++i < len) {
          mainCat.names[i] = getCategory(question.mainCat[i], 'name');
        }
      }

      // Format the sub category
      if (config.subCat && question.subCat.length) {
        subCat.h3 = ( (question.subCat.length > 1) ?
          'Sub Categories:' : 'Sub Category:'
        );
        len = question.subCat.length;
        subCat.names = new Array(len);
        i = -1;
        while (++i < len) {
          subCat.names[i] = getCategory(question.subCat[i], 'name');
        }
      }
    }

    // Format the solution
    solution = {};
    if (question.solution) {
      code = prettify(question.solution);
      solution.prettyCode = code.result;
      solution.lineCount = code.lineCount;
    }

    // Freeze all of the protected properties that are objects
    freezeObj(mainCat);
    freezeObj(subCat);
    freezeObj(solution);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionFormat.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the QuestionFormat.
     * @param {string} propName - The name of the property to get.
     * @return {*} The property's value.
     */
    this.get = function(propName) {

      /** @type {Object<string, *>} */
      var props = {
        debug   : thisDebug,
        id      : id,
        source  : source,
        complete: complete,
        mainCat : mainCat,
        subCat  : subCat,
        solution: solution
      };

      return getter.call(props, propName);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  QuestionFormat.prototype.constructor = QuestionFormat;

/* -----------------------------------------------------------------------------
 * The QuestionElem Class (classes/question/question-elem.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (QuestionElem)
   * -----------------------------------------------------
   * @desc An object containing the question's html element.
   * @param {number} id - The id of the question.
   * @constructor
   */
  var QuestionElem = function(id) {

    this.debug = aIV.debug('QuestionElem');

    this.debug.start('init', id);

    this.debug.args('init', id, 'number');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.root)
     * -----------------------------------------------
     * @desc The question's root element.
     * @type {Element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {Element}
     */
    this.info;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.solution)
     * -----------------------------------------------
     * @desc The question's div.solution element.
     * @type {Element}
     */
    this.solution;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.pre)
     * -----------------------------------------------
     * @desc The question's div.preContain element.
     * @type {Element}
     */
    this.pre;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.code)
     * -----------------------------------------------
     * @desc The question's code element.
     * @type {Element}
     */
    this.code;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.root = makeElem({
      tag      : 'section',
      id       : 'aIV-q' + id,
      className: 'question'
    });
    this.info = makeElem({ className: 'info' });

    this.root.appendChild(this.info);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

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

    /** @type {Element} */
    var root;
    /** @type {Element} */
    var info;

    root = this.root;
    info = this.info;

    // Append all the sections of the question
    // Note: See the below private helper methods for more details

    if (question.id) {
      appendId.call(this, question.id, question.url);
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

    // Close this debug console group
    this.debug.group('addContent', 'end');

    /**
     * ---------------------------------------------
     * Private Method (appendId)
     * ---------------------------------------------
     * @desc Appends the question id.
     * @todo Add url parsing logic.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @private
     */
    function appendId(id, url) {

      this.debug.start('appendId', id, url);
      this.debug.args('appendId', id, 'string', url, 'string');

      /** @type {boolean} */
      var config;
      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {Element} */
      var a;

      config = app.config.links.get('id');

      div = makeElem({ className: 'idContain' });
      h3  = makeElem({ tag: 'h3', text: 'Question:' });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, id);
      }


      // Add the anchor link
      if (config) {
        a = makeIdLink.call(this, id, url);
        p.appendChild(a);
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        this.debug.state('appendId', debugMsg, p, a, a.onclick);
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (makeIdLink)
     * ---------------------------------------------
     * @desc Creates an anchor element for the question id.
     * @todo Add url parsing logic.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @return {Element} The anchor element.
     * @private
     */
    function makeIdLink(id, url) {

      this.debug.start('makeIdLink', id, url);
      this.debug.args('makeIdLink', id, 'string', url, 'string');

      /** @type {Element} */
      var a;

      if (!url) {
        url = Number(id);
      }

      a = makeElem({ tag: 'a', text: id });
      a.href = 'id/' + url;
      a.onclick = (function(id) {
        return function() {
          Events.linkId( Number(id) );
          return false;
        };
      })(id);

      return a;
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
      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {Element} */
      var a;

      config = app.config.links.get('source');

      div = makeElem({ className: 'source' });
      h3  = makeElem({ tag: 'h3', text: 'Source:' });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, source.name);
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      // Add the anchor link
      if (config) {
        a = makeSourceLink.call(this, source.id, source.name);
        p.appendChild(a);
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        this.debug.state('appendSource', debugMsg, p, a, a.onclick);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeSourceLink)
     * ---------------------------------------------
     * @desc Creates an anchor element for the question's source.
     * @param {string} id - The source's id.
     * @param {string} name - The source's name.
     * @return {Element} The anchor element.
     * @private
     */
    function makeSourceLink(id, name) {

      this.debug.start('makeSourceLink', id, name);
      this.debug.args('makeSourceLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {Element} */
      var a;

      url = app.sources.get(id, 'url');

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'source/' + url;
      a.onclick = (function(id) {
        return function() {
          Events.linkSource(id);
          return false;
        };
      })(id);

      return a;
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

      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      div = makeElem({ className: 'stage' });
      h3  = makeElem({ tag: 'h3', text: 'Completed:' });
      p   = makeElem({ tag: 'p' , text: complete });

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

      /** @type {Element} */
      var contain;
      /** @type {Element} */
      var mainDiv;
      /** @type {Element} */
      var subDiv;

      contain = makeElem({ className: 'category' });

      // Add the main categories
      if (main.h3) {
        mainDiv = makeElem({ className: 'mainCategory' });
        appendMainCategories.call(this, main, mainDiv);
        contain.appendChild(mainDiv);
      }

      // Add the sub categories
      if (sub.h3) {
        subDiv = makeElem({ className: 'subCategory' });
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
     * @param {Element} div - The DOM container for the main categories.
     * @private
     */
    function appendMainCategories(main, div) {

      this.debug.start('appendMainCategories', main, div);
      this.debug.args('appendMainCategories', main, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {Element} */
      var a;

      config = app.config.links.get('category');

      h3  = makeElem({ tag: 'h3', text: main.h3 });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, main.names.join(', '));
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each main category's anchor tag
      if (config) {
        len = main.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeMainCatLink.call(this, main.ids[i], main.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeElem({ tag: 'span', html: ',&nbsp;&nbsp;' }) );
          }
        }
        this.debug.state('appendMainCategories', 'p= $$', p);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSubCategories)
     * ---------------------------------------------
     * @desc Appends the question's sub categories.
     * @param {Object} sub - The question's sub categories.
     * @param {Element} div - The DOM container for the sub categories.
     * @private
     */
    function appendSubCategories(sub, div) {

      this.debug.start('appendSubCategories', sub, div);
      this.debug.args('appendSubCategories', sub, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {Element} */
      var a;

      config = app.config.links.get('category');

      h3  = makeElem({ tag: 'h3', text: sub.h3 });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, sub.names.join(', '));
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each sub category's anchor tag
      if (config) {
        len = sub.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeSubCatLink.call(this, sub.ids[i], sub.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeElem({ tag: 'span', html: ',&nbsp;&nbsp;' }) );
          }
        }
        this.debug.state('appendSubCategories', 'p= $$', p);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeMainCatLink)
     * ---------------------------------------------
     * @desc Creates a main category link.
     * @todo Add url parsing logic to event.
     * @param {string} id - The main category's id.
     * @param {string} name - The main category's name.
     * @return {Element} The anchor link.
     * @private
     */
    function makeMainCatLink(id, name) {

      this.debug.start('makeMainCatLink', id, name);
      this.debug.args('makeMainCatLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {Element} */
      var a;

      url = app.categories.get(id, 'url');

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'category/' + url;
      a.onclick = (function(id) {
        return function() {
          Events.linkMainCat(id);
          return false;
        };
      })(id);

      debugMsg = 'a= $$, a.onclick= $$';
      this.debug.state('makeMainCatLink', debugMsg, a, a.onclick);

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
     * @return {Element} The anchor link.
     * @private
     */
    function makeSubCatLink(id, name) {

      this.debug.start('makeSubCatLink', id, name);
      this.debug.args('makeSubCatLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {Element} */
      var a;
      /** @type {string} */
      var parentId;
      /** @type {string} */
      var parentUrl;

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

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'category/' + parentUrl + '/' + url;
      a.onclick = (function(id, parentId) {
        return function() {
          Events.linkSubCat(id, parentId);
          return false;
        };
      })(id, parentId);

      debugMsg = 'a= $$, a.onclick= $$';
      this.debug.state('makeSubCatLink', debugMsg, a, a.onclick);

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

      /** @type {string} */
      var content;
      /** @type {string} */
      var title;
      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      title = (problem) ? 'Problem:' : 'Description:';
      content = (problem) ? problem : descr;

      div = makeElem({ className: 'problem' });
      h3  = makeElem({ tag: 'h3', text: title });
      p   = makeElem({ tag: 'p' , html: content });

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

      /** @type {Element} */
      var contain;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var preDiv;
      /** @type {Element} */
      var pre;
      /** @type {Element} */
      var code;
      /** @type {Element} */
      var ol;
      /** @type {number} */
      var height;

      contain  = makeElem({ className: 'solution' });
      h3       = makeElem({ tag: 'h3', text: 'Solution:' });
      preDiv   = makeElem({ className: 'preContain' });
      pre      = makeElem('pre');
      code     = makeElem('code');
      ol       = makeElem({ tag: 'ol', html: solution.prettyCode });

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

      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      div = makeElem({ className: 'output' });
      h3  = makeElem({ tag: 'h3', text: 'Output:' });
      p   = makeElem({ tag: 'p' , html: output });

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

      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      div = makeElem({ className: 'links' });
      h3  = makeElem({ tag: 'h3', text: 'Links:' });
      p   = makeElem('p');

      div.appendChild(h3);
      div.appendChild(p);

      links.forEach(function(/** Object */ linkObj) {
        /** @type {Element} */
        var a;

        a = makeElem({ tag: 'a', text: linkObj.name });
        a.href = linkObj.href;
        a.target = '_blank';
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

    this.debug.start('addCodeExt');

    /** @type {number} */
    var overflow;
    /** @type {number} */
    var scrollbar;
    /** @type {Element} */
    var code;
    /** @type {Element} */
    var ext;
    /** @type {Element} */
    var extClose;
    /** @type {Element} */
    var extOpen;
    /** @type {Element} */
    var extBG;
    /** @type {Element} */
    var extHov;
    /** @type {Element} */
    var extHovC;
    /** @type {Element} */
    var extHovO;

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

    ext      = makeElem({ className: 'extContain' });
    extClose = makeElem({ className: 'extCloseArrow' });
    extOpen  = makeElem({ className: 'extOpenArrow', text: 'open' });
    extBG    = makeElem({ className: 'extBG' });
    extHov   = makeElem({ className: 'extHover' });
    extHovC  = makeElem({
      tag      : 'span',
      className: 'closeExt',
      text     : 'Close Extended Code View'
    });
    extHovO  = makeElem({
      tag      : 'span',
      className: 'openExt',
      text     : 'Extend Code View'
    });

    extOpen.onmouseover = function() {
      extHov.style.opacity = '1';
    };

    extOpen.onmouseout = function() {
      extHov.style.opacity = '0';
    };

    extOpen.onclick = (function(overflow, code, ext, extOpen,
                                extClose, extHovO, extHovC) {
      /** @type {elementMap} */
      var elems;

      elems = {
        code    : code,
        ext     : ext,
        extOpen : extOpen,
        extClose: extClose,
        extHovO : extHovO,
        extHovC : extHovC
      };
      freezeObj(elems);

      return function() {
        Events.extCodeView(overflow, elems);
      };
    })(overflow, code, ext, extOpen, extClose, extHovO, extHovC);

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
 * The Prettifier Module  (prettify.js)
 * -------------------------------------------------------------------------- */

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

      prettify.debug.group('init', 'coll', 'Open to see original string');
      prettify.debug.start('init', solution);
      prettify.debug.group('init', 'end');

      /** @type {{ result: string, lineCount: number }} */
      var result;

      checkArgs(solution, 'string');

      // Format the solution
      result = applyFormatting( prepareLines(solution) );

      prettify.debug.end('init', result);

      return result;
    };

/* -----------------------------------------------------------------------------
 * The Prettifier Module Variables (pre-compiled-prettifier/prettify-vars.js)
 * -------------------------------------------------------------------------- */


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

    freezeObj(htmlEntity);

    /**
     * ---------------------------------------------
     * Private Variable (preRegex)
     * ---------------------------------------------
     * @desc The characters that if preceding a '/' could be a
     *   regular expression. The characters 'n', 'e', and 'f' are
     *   evaluated for the following possible keywords 'return',
     *   'case', 'typeof', 'instanceof', and 'in'.
     * @const
     * @type {!RegExp}
     * @private
     */
    var preRegex = /[\(\)\[\{\};\*\/%\+\-<>&\^\|=!:\?nef]/;

    freezeObj(preRegex);

    /**
     * ---------------------------------------------
     * Private Variable (regexFlags)
     * ---------------------------------------------
     * @desc The flags for js regular expressions.
     * @const
     * @type {!RegExp}
     * @private
     */
    var regexFlags = /[gimy]/;

    freezeObj(regexFlags);

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * @desc List of valid plain number characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var plainNumbers = /[0-9\.]/;

    freezeObj(plainNumbers);

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * @desc List of valid hex number characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;

    freezeObj(hexNumbers);

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * @desc List of valid starting identifier characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;

    freezeObj(identifierStart);

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * @desc List of valid identifier characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var identifiers = /[a-z0-9_\$]/i;

    freezeObj(identifiers);

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
     * @const
     * @type {!RegExp}
     * @private
     */
    var commentLinks = /\s\[([^\[\]]+)\]\(([^\s\(\)]+)\)/;

    freezeObj(commentLinks);

    /**
     * ---------------------------------------------
     * Private Variable (notSpace)
     * ---------------------------------------------
     * @desc A regex that catches anything that is not a space.
     * @const
     * @type {!RegExp}
     * @private
     */
    var notSpace = /[^\s]/;

    freezeObj(notSpace);

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

    freezeObj(keywordCategories);

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

    freezeObj(keywords);

    ////////////////////////////////////////////////////////////////////////////
    // Setup the keyword properties

    // Array
    keywords._Array.props._from    = makePropObj('');
    keywords._Array.props._isArray = makePropObj('');
    keywords._Array.props._observe = makePropObj('');
    keywords._Array.props._of      = makePropObj('');
    freezeObj(keywords._Array.props);

    // ArrayBuffer
    keywords._ArrayBuffer.props._isView   = makePropObj('');
    keywords._ArrayBuffer.props._transfer = makePropObj('');
    freezeObj(keywords._ArrayBuffer.props);

    // Date
    keywords._Date.props._UTC   = makePropObj('');
    keywords._Date.props._now   = makePropObj('');
    keywords._Date.props._parse = makePropObj('');
    freezeObj(keywords._Date.props);

    // JSON
    keywords._JSON.props._parse     = makePropObj('');
    keywords._JSON.props._stringify = makePropObj('');
    freezeObj(keywords._JSON.props);

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
    freezeObj(keywords._Math.props);

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
    freezeObj(keywords._Number.props);

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
    freezeObj(keywords._Object.props);

    // String
    keywords._String.props._fromCharCode  = makePropObj('');
    keywords._String.props._fromCodePoint = makePropObj('');
    keywords._String.props._raw           = makePropObj('');
    freezeObj(keywords._String.props);

    // Symbol
    keywords._Symbol.props._for    = makePropObj('');
    keywords._Symbol.props._keyFor = makePropObj('');
    freezeObj(keywords._Symbol.props);

    // TypedArray
    keywords._TypedArray.props._BYTES_PER_ELEMENT = makePropObj('');
    keywords._TypedArray.props._from              = makePropObj('');
    keywords._TypedArray.props._name              = makePropObj('');
    keywords._TypedArray.props._of                = makePropObj('');
    freezeObj(keywords._TypedArray.props);

    // console
    keywords._console.props._assert         = makePropObj('');
    keywords._console.props._group          = makePropObj('');
    keywords._console.props._groupCollapsed = makePropObj('');
    keywords._console.props._groupEnd       = makePropObj('');
    keywords._console.props._log            = makePropObj('');
    keywords._console.props._trace          = makePropObj('');
    freezeObj(keywords._console.props);

    // ImageData
    keywords._ImageData.props._data   = makePropObj('');
    keywords._ImageData.props._height = makePropObj('');
    keywords._ImageData.props._width  = makePropObj('');
    freezeObj(keywords._ImageData.props);

    prettify.debug.group('makeKeywordObjects', 'end');

/* -----------------------------------------------------------------------------
 * The Prettifier Module Methods (pre-compiled-prettifier/prettify-methods.js)
 * -------------------------------------------------------------------------- */

    /**
     * ---------------------------------------------
     * Public Method (prettify.setConfig)
     * ---------------------------------------------
     * @desc Sets the config settings for the prettifier.
     * @param {!Object<string, (number|boolean)>} newConfig - The config
     *   settings for the prettifier.
     * @private
     */
    prettify.setConfig = function(newConfig) {

      prettify.debug.start('setConfig', newConfig);

      checkArgs(newConfig, '!object');

      config = newConfig;
      freezeObj(config);

      prettify.debug.end('setConfig');
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLines)
     * ---------------------------------------------
     * @desc Standardizes all line breaks and replaces tabs with spaces.
     * @param {string} solution - The problem's solution to be formatted.
     * @return {!strings}
     * @private
     */
    function prepareLines(solution) {

      prettify.debug.group('init', 'coll', 'Open to see original string');
      prettify.debug.start('prepareLines', solution);
      prettify.debug.group('init', 'end');

      /** @type {!strings} */
      var lines;
      /** @type {string} */
      var spaces;
      /** @type {number} */
      var spaceCount;

      checkArgs(solution, 'string');

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

      lines = solution.split('\n');

      prettify.debug.end('prepareLines', lines);

      return lines;
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormatting)
     * ---------------------------------------------
     * @desc Applies the prettifier formats.
     * @param {!strings} lines - An array of code lines.
     * @return {!{
     *   result   : string,
     *   lineCount: number
     * }}
     * @private
     */
    function applyFormatting(lines) {

      prettify.debug.start('applyFormatting', lines);

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {string} */
      var line;
      /** @type {!Object} */
      var result;

      checkArgs(lines, '!strings');

      commentOpen = false;
      len = lines.length;

      i = -1;
      while (++i < len) {

        debugMsg = 'lineNumber= $$';
        prettify.debug.group('applyFormatting', 'coll', debugMsg, (i + 1));

        line = prepareLine(lines[i]);

        if (line) {
          line = highlightSyntax(line, i);
        }

        lines[i] = '<li>'+ line +'</li>';

        prettify.debug.state('applyFormatting', 'lineOutput= $$', lines[i]);
        prettify.debug.group('applyFormatting', 'end');
      }

      result = {
        result   : lines.join(''),
        lineCount: len
      };

      prettify.debug.end('applyFormatting', result);

      return result;
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

      /** @type {number} */
      var i;
      /** @type {number} */
      var frontTrimCount;
      /** @type {string} */
      var trimPart;

      checkArgs(line, 'string');

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
        if (trimPart && !notSpace.test(trimPart)) {
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

      prettify.debug.end('prepareLine', line);

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
     * @return {!Object<string, (string|numberMap)>}
     * @private
     */
    function makeKeywordObj(cat, href, props) {

      prettify.debug.start('makeKeywordObj', cat, href, props);

      /** @type {!Object<string, (string|numberMap)>} */
      var obj;

      checkArgs(cat, 'string', href, 'string=', props, 'boolean=');

      href = href || '';
      props = props || false;

      obj = {};

      obj.cat = cat;
      obj.href = href;
      obj.props = (props) ? {} : false;

      freezeObj(obj);

      prettify.debug.end('makeKeywordObj', obj);

      return obj;
    }

    /**
     * ---------------------------------------------
     * Private Method (makePropObj)
     * ---------------------------------------------
     * @desc Creates a keyword property object.
     * @param {string=} href - The keyword's details link.
     * @return {!stringMap}
     * @private
     */
    function makePropObj(href) {

      prettify.debug.start('makePropObj', href);

      /** @type {!stringMap} */
      var obj;

      checkArgs(href, 'string=');

      href = href || '';

      obj = {};
      obj.href = href;

      freezeObj(obj);

      prettify.debug.end('makePropObj', obj);

      return obj;
    }

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Method (pre-compiled-prettifier/highlight-syntax.js)
 * -------------------------------------------------------------------------- */

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

        checkArgs(line, 'string');

        prepareLine(line);
        formatLine();

        return newLine.join('');
      };

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Variables (pre-compiled-prettifier/
 *                                 pre-compiled-syntax-highlighter/
 *                                 highlight-syntax-vars.js)
 * -------------------------------------------------------------------------- */

      // The syntax highlighter's debugger object
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
       * @type {!objectMap}
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

      freezeObj(router);

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Methods (pre-compiled-prettifier/
 *                               pre-compiled-syntax-highlighter/
 *                               highlight-syntax-methods.js)
 * -------------------------------------------------------------------------- */

      /**
       * ---------------------------------------------
       * Private Method (prepareLine)
       * ---------------------------------------------
       * @desc Prepares the line to be highlighted.
       * @param {string} line - The line of code to prepare.
       * @private
       */
      function prepareLine(line) {

        highlightSyntax.debug.start('prepareLine', line);

        checkArgs(line, 'string');

        orgLine = line.split('');
        freezeObj(orgLine);
        newLine = line.split('');
        lineLen = line.length;
        lastIndex = (lineLen) ? lineLen - 1 : 0;

        debugMsg = 'lineLen= $$, lastIndex= $$';
        highlightSyntax.debug.state('prepareLine', debugMsg, lineLen, lastIndex);

        highlightSyntax.debug.end('prepareLine');
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

        highlightSyntax.debug.end('formatLine');
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

        /** @type {*} */
        var preceding;
        /** @type {number} */
        var end;
        /** @type {number} */
        var ii;

        checkArgs(i, 'number');

        // Handle line comment
        if (orgLine[i + 1] === '/') {
          ii = formatLineComment(i);
        }
        // Handle comment opening
        else if (orgLine[i + 1] === '*') {
          ii = formatCommentOpen(i);
        }
        else {

          // Save preceding character
          preceding = ( (orgLine[i - 1] === ' ') ?
            orgLine[i - 2] : orgLine[i - 1]
          );

          // Handle RegExp
          if (i === 0 || preRegex.test(preceding)) {
            end = isRegex(i);
            if (end) {
              ii = formatRegex(i, end);
            }
          }
        }

        // Handle operator
        if (!ii) {
          ii = formatOperator(i);
        }

        highlightSyntax.debug.end('handleSlash', ii);

        return ii;
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

        highlightSyntax.debug.start('isRegex', i);

        /** @type {number} */
        var end;
        /** @type {string} */
        var regexBody;

        checkArgs(i, 'number');

        end = (orgLine[i + 1] === '/') ? -1 : i;

        // Find regex end index
        while (++end && end < lineLen && orgLine[end] !== '/') {

          sanitizeCharacter(end);

          if (orgLine[end] === '\\') {
            ++end;
          }
        }

        if (end >= lineLen) {
          end = 0;
        }

        regexBody = orgLine.slice(++i, end).join('');

        try {
          new RegExp(regexBody);
        }
        catch (e) {
          debugMsg = 'new RegExp(regexBody) error= $$';
          highlightSyntax.debug.state('isRegex', debugMsg, e.toString());
          end = 0;
        }

        highlightSyntax.debug.end('isRegex', end);

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

        checkArgs(i, 'number');

        if ( hasOwnProp(htmlEntity, orgLine[i]) ) {
          newLine[i] = htmlEntity[ orgLine[i] ];
        };

        highlightSyntax.debug.end('sanitizeCharacter');
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

        checkArgs(i, 'number');

        while (++i < lineLen) {

          sanitizeCharacter(i);

          if (orgLine[i] === '*' && i !== lastIndex && orgLine[i + 1] === '/') {
            ++i;
            break;
          }
        }

        highlightSyntax.debug.end('skipComment', i);

        return i;
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

        /** @type {string} */
        var strCharacter;

        checkArgs(i, 'number');

        strCharacter = orgLine[i];

        while (++i < lineLen && orgLine[i] !== strCharacter) {

          sanitizeCharacter(i);

          if (orgLine[i] === '\\') {
            ++i;
          }
        }

        if (i >= lineLen) {
          i = lastIndex;
        }

        highlightSyntax.debug.end('skipString', i);

        return i;
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

        checkArgs(i, 'number');

        while (orgLine[i + 1] === ' ') {
          ++i;
        }

        highlightSyntax.debug.end('skipSpace', i);

        return i;
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

        /** @type {string} */
        var hexStart;
        /** @type {RegExp} */
        var numberOpts;

        checkArgs(i, 'number');

        hexStart = (i !== lastIndex) ? orgLine[i] + orgLine[i + 1] : '';
        numberOpts = ( (hexStart === '0x' || hexStart === '0X') ?
          hexNumbers : plainNumbers
        );

        while (++i < lineLen && numberOpts.test(orgLine[i])) {}
        --i;

        highlightSyntax.debug.end('skipNumber', i);

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * @desc Moves the index to the end of the identifier.
       * @param {number} i - The starting line index.
       * @return {!{
       *   endIndex   : number,
       *   name       : string,
       *   propFollows: boolean
       * }}
       * @private
       */
      function skipIdentifier(i) {

        highlightSyntax.debug.start('skipIdentifier', i);

        /** @type {string} */
        var name;
        /** @type {!Object} */
        var result;
        /** @type {boolean} */
        var propFollows;

        checkArgs(i, 'number');

        name = '_' + orgLine[i];

        while (++i < lineLen && identifiers.test(orgLine[i])) {
          name += orgLine[i];
        }

        propFollows = (i !== lineLen && orgLine[i] === '.');
        result = {
          endIndex   : --i,
          name       : name,
          propFollows: propFollows
        };

        highlightSyntax.debug.end('skipIdentifier', result);

        return result;
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

        highlightSyntax.debug.start('formatCommentLinks', start, end);

        /** @type {number} */
        var i;
        /** @type {boolean} */
        var pass;
        /** @type {string} */
        var href;
        /** @type {string} */
        var content;
        /** @type {string} */
        var comment;

        checkArgs(start, 'number', end, 'number');

        if (end === lastIndex) {
          ++end;
        }

        comment = orgLine.slice(start, end).join('');
        pass = commentLinks.test(comment);

        while (pass) {
          i = comment.search(commentLinks);

          if (i === -1) {
            break;
          }

          i += start + 1;

          debugArgs = [ 'formatCommentLinks' ];
          debugArgs.push('i= $$, start= $$, newLine[i]= $$');
          debugArgs.push(i, start, newLine[i]);
          highlightSyntax.debug.state(debugArgs);

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

        highlightSyntax.debug.end('formatCommentLinks');
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

        /** @type {number} */
        var start;

        checkArgs(i, 'number');

        start = i;
        newLine[i] = '<span class="cmt">/';
        i = (++i < lastIndex) ? skipComment(i) : ++i;

        if (i >= lineLen) {
          commentOpen = true;
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if (config.commentLinks) {
          formatCommentLinks(start, i);
        }

        highlightSyntax.debug.end('formatCommentOpen', i);

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
          i = 3;
        }
        else {

          i = skipComment(0);
          commentOpen = (i > lastIndex);

          if (commentOpen) {
            i = lastIndex;
          }

          newLine[i] += '</span>';

          if (config.commentLinks) {
            formatCommentLinks(0, i);
          }
        }

        highlightSyntax.debug.end('formatCommentStart', i);

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

        checkArgs(i, 'number');

        if (config.commentLinks) {
          formatCommentLinks(i, lastIndex);
        }

        newLine[i] = '<span class="cmt">/';
        i = lastIndex;
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatLineComment', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="str">' + orgLine[i];
        i = skipString(i);
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatString', i);

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

        /** @type {string} */
        var usedFlags;
        /** @type {string} */
        var character;

        checkArgs(i, 'number', end, 'number');

        newLine[i] = '<span class="rgx">/';

        i = end;
        usedFlags = '';

        // Check for RegExp flags
        while (++i) {
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

        highlightSyntax.debug.end('formatRegex', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="spc"> ';
        i = skipSpace(i);
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatSpace', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="brc">' + orgLine[i] + '</span>';

        highlightSyntax.debug.end('formatBracket', i);

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

        checkArgs(i, 'number');

        sanitizeCharacter(i);

        newLine[i] = '<span class="opr">' + newLine[i] + '</span>';

        highlightSyntax.debug.end('formatOperator', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="cmm">,</span>';

        highlightSyntax.debug.end('formatComma', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="smc">;</span>';

        highlightSyntax.debug.end('formatSemicolon', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="cln">:</span>';

        highlightSyntax.debug.end('formatColon', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="per">.</span>';

        highlightSyntax.debug.end('formatPeriod', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="num">' + orgLine[i];
        i = skipNumber(i);
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatNumber', i);

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

        highlightSyntax.debug.start('formatIdentifier', i, extras);

        /** @type {!{ endIndex: number, name: string, propFollows: boolean }} */
        var identifier;
        /** @type {string} */
        var catID;
        /** @type {string} */
        var keyClassName;

        checkArgs(i, 'number', extras, 'string=');

        identifier = skipIdentifier(i);

        // Setup the keyword category and class name
        if ( hasOwnProp(keywords, identifier.name) ) {

          catID = keywords[ identifier.name ].cat;
          keyClassName = keywordCategories[ catID ];

          // Special case for the function keyword
          if (identifier.name === '_function' &&
              (orgLine[identifier.endIndex + 1] === '(' ||
               (orgLine[identifier.endIndex + 1] === ' ' &&
                orgLine[identifier.endIndex + 2] === '('))) {
            keyClassName = keywordCategories[ 'res' ];
          }
        }

        if (!keyClassName && !!extras) {
          if ( hasOwnProp(keywords[ extras ].props, identifier.name) ) {
            catID = keywords[ extras ].cat;
            keyClassName = keywordCategories[ catID ];
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
          extras = ( (!hasOwnProp(keywords, identifier.name)) ?
            '' : (!keywords[ identifier.name ].props) ?
              '' : identifier.name
          );
          i = formatIdentifier(++i, extras);
        }

        highlightSyntax.debug.end('formatIdentifier', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="msc">' + orgLine[i] + '</span>';

        highlightSyntax.debug.end('formatMisc', i);

        return i;
      }

      return highlightSyntax;

    })();

    return prettify;

  })();

/* -----------------------------------------------------------------------------
 * The Events Class (classes/events.js)
 * -------------------------------------------------------------------------- */

  /**
   * ----------------------------------------------- 
   * Public Class (Events)
   * -----------------------------------------------
   * @desc The app's event handlers.
   * @type {Object<string, function>}
   * @struct
   */
  var Events = {};

  Events.debug = aIV.debug('Events');

  /**
   * ----------------------------------------------- 
   * Public Method (Events.popState)
   * -----------------------------------------------
   * @desc The onPopState event handler for the window.
   * @param {!Object} newState - The new state to apply to the app.
   */
  Events.popState = function(newState) {

    this.debug.start('popState', newState);

    /** @type {!numbers} */
    var oldIds;
    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;
    /** @type {boolean} */
    var flipElems;

    checkArgs(newState, '!object');

    oldIds = app.vals.get('ids').slice(0);
    oldIndex = app.vals.get('index');
    oldView = app.searchBar.vals.view;
    flipElems = (app.searchBar.vals.order !== newState.order);

    app.searchBar.vals.view    = newState.view;
    app.searchBar.vals.order   = newState.order;
    app.searchBar.vals.stage   = newState.stage;
    app.searchBar.vals.source  = newState.source;
    app.searchBar.vals.mainCat = newState.mainCat;
    app.searchBar.vals.subCat  = newState.subCat;

    app.searchBar.elems.view.value = newState.view;
    app.searchBar.elems.order.value = newState.order;
    if (app.searchBar.elems.stage) {
      app.searchBar.elems.stage.value = newState.stage;
    }
    if (app.searchBar.elems.source) {
      app.searchBar.elems.source.value = newState.source;
    }
    if (app.searchBar.elems.mainCat) {
      app.searchBar.elems.mainCat.value = newState.mainCat;
    }
    if (app.searchBar.elems.subCat) {
      app.searchBar.elems.subCat.value = newState.subCat;
    }

    app.vals.reset(newState.ids, newState.index);

    app.updateDisplay(oldIds, oldIndex, oldView, flipElems, true);

    this.debug.end('popState');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.prev)
   * -----------------------------------------------
   * @desc The onClick event handler for the previous button.
   * @type {function}
   */
  Events.prev = function() {

    this.debug.start('prev.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('prev');

    app.updateDisplay(null, oldIndex);

    this.debug.end('prev.onclick');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.next)
   * -----------------------------------------------
   * @desc The onClick event handler for the next button.
   * @type {function}
   */
  Events.next = function() {

    this.debug.start('next.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('next');

    app.updateDisplay(null, oldIndex);

    this.debug.end('next.onclick');
  };


  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchView)
   * -----------------------------------------------
   * @desc The onChange event handler for the view search option.
   * @param {string} newVal - The new value for the view.
   */
  Events.searchView = function(newVal) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var oldIndex;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var oldView;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.view != newVal) {

      this.debug.start('searchView.onchange', newVal);

      len = app.vals.get('len');

      oldIndex = app.vals.get('index');
      newIndex = (newVal === 'all' || !len) ? -1 : 0;
      oldView = app.searchBar.vals.view;

      app.searchBar.vals.view = newVal;
      app.vals.set(null, newIndex);

      app.updateDisplay(null, oldIndex, oldView);

      this.debug.end('searchView.onchange');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchOrder)
   * -----------------------------------------------
   * @desc The onChange event handler for the order search option.
   * @param {string} newVal - The new value for the order.
   */
  Events.searchOrder = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.order != newVal) {

      this.debug.start('searchOrder.onchange', newVal);

      oldIds = app.vals.get('ids');
      newIds = oldIds.slice(0);
      newIds.reverse();

      app.searchBar.vals.order = newVal;
      app.vals.set(newIds);

      app.updateDisplay(oldIds, null, null, true);

      this.debug.end('searchOrder.onchange');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchStage)
   * -----------------------------------------------
   * @desc The onChange event handler for the stage search option.
   * @param {string} newVal - The new value for the stage.
   */
  Events.searchStage = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.stage != newVal) {

      this.debug.start('searchStage.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.stage = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchStage.onchange');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchSource)
   * -----------------------------------------------
   * @desc The onChange event handler for the source search option.
   * @param {string} newVal - The new value for the source.
   */
  Events.searchSource = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.source != newVal) {

      this.debug.start('searchSource.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchSource.onchange');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchMainCat)
   * -----------------------------------------------
   * @desc The onChange event handler for the main category search option.
   * @param {string} newVal - The new value for the main category.
   */
  Events.searchMainCat = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.mainCat != newVal) {

      this.debug.start('searchMainCat.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      app.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchMainCat.onchange');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchSubCat)
   * -----------------------------------------------
   * @desc The onChange event handler for the sub category search option.
   * @param {string} newVal - The new value for the sub category.
   */
  Events.searchSubCat = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.subCat != newVal) {

      this.debug.start('searchSubCat.onchange', newVal);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.subCat = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.end('searchSubCat.onchange');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkId)
   * -----------------------------------------------
   * @desc The onClick event handler for a question id.
   * @param {number} id - The question's id to link to.
   */
  Events.linkId = function(id) {

    this.debug.group('linkId.onclick', 'coll', 'questionID= $$', id);
    this.debug.start('linkId.onclick', id);

    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;

    checkArgs(id, 'number');

    oldIndex = app.vals.get('index');
    oldView = app.searchBar.vals.view;

    app.searchBar.elems.view.value = 'one';

    app.vals.move(id);

    app.updateDisplay(null, oldIndex, oldView);

    this.debug.end('linkId.onclick');
    this.debug.group('linkId.onclick', 'end');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSource)
   * -----------------------------------------------
   * @desc The onClick event handler for a question source.
   * @param {string} id - The question's source to link to.
   */
  Events.linkSource = function(id) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string');

    if (app.searchBar.vals.source != id) {

      this.debug.group('linkSource.onclick', 'coll', 'sourceID= $$', id);
      this.debug.start('linkSource.onclick', id);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = id;
      if (app.searchBar.elems.source) {
        app.searchBar.elems.source.value = id;
      }

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.end('linkSource.onclick');
      this.debug.group('linkSource.onclick', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkMainCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question main category.
   * @param {string} id - The question's category to link to.
   */
  Events.linkMainCat = function(id) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string');

    if (app.searchBar.vals.mainCat != id) {

      this.debug.group('linkMainCat.onclick', 'coll', 'mainCatID= $$', id);
      this.debug.start('linkMainCat.onclick', id);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = id;
      if (app.searchBar.elems.mainCat) {
        app.searchBar.elems.mainCat.value = id;
      }

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      app.updateDisplay(oldIds, oldIndex);

      this.debug.end('linkMainCat.onclick');
      this.debug.group('linkMainCat.onclick', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSubCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question sub category.
   * @param {string} id - The question's category to link to.
   * @param {string} parentId - The sub category's parent category.
   */
  Events.linkSubCat = function(id, parentId) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string', parentId, 'string');

    if (app.searchBar.vals.subCat != id) {

      this.debug.group('linkSubCat.onclick', 'coll', 'subCatID= $$', id);
      this.debug.start('linkSubCat.onclick', id, parentId);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      // Check the main category and update the values and options
      if (app.searchBar.vals.mainCat !== 'all' &&
          app.searchBar.vals.mainCat !== parentId) {
        app.searchBar.vals.mainCat = 'all';
        if (app.searchBar.elems.mainCat) {
          app.searchBar.elems.mainCat.value = 'all';
        }
        app.searchBar.updateSubCatOpts(id);
      }
      else {
        app.searchBar.vals.subCat = id;
        if (app.searchBar.elems.subCat) {
          app.searchBar.elems.subCat.value = id;
        }
      }

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.end('linkSubCat.onclick');
      this.debug.group('linkSubCat.onclick', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.extCodeView)
   * -----------------------------------------------
   * @desc The onClick event handler for a question code extender.
   * @param {number} overflow - The question's code view overflow pixel count.
   * @param {elementMap} elems - The code view elements.
   */
  Events.extCodeView = function(overflow, elems) {

    this.debug.start('extCodeView.onclick', overflow, elems);

    /** @type {number} */
    var newWidth;
    /** @type {number} */
    var newRight;

    checkArgs(overflow, 'number', elems, 'elemMap');

    newWidth = elems.code.clientWidth;

    this.debug.state('extCodeView.onclick', 'orgWidth= $$', newWidth);

    if (elems.extOpen.innerHTML === 'close') {

      elems.extClose.style.opacity = '0';

      elems.ext.style.right = '-4px';

      newWidth = newWidth - overflow;
      elems.code.style.width = newWidth + 'px';

      setTimeout(function() {
        elems.extOpen.style.opacity = '0.8';
        setTimeout(function() {
          setElemText(elems.extOpen, 'open');
          elems.extHovC.style.display = 'none';
          elems.extHovO.style.display = 'block';
        }, 600);
      }, 400);
    }
    else if (elems.extOpen.innerHTML === 'open') {

      elems.extOpen.style.opacity = '0';

      newRight = overflow + 4;
      elems.ext.style.right = '-' + newRight + 'px';

      this.debug.state('extCodeView.onclick', 'newRight= $$', newRight);

      newWidth = newWidth + overflow;
      elems.code.style.width = newWidth + 'px';

      this.debug.state('extCodeView.onclick', 'newWidth= $$', newWidth);

      setTimeout(function() {
        elems.extClose.style.opacity = '0.8';
        setTimeout(function() {
          setElemText(elems.extOpen, 'close');
          elems.extHovO.style.display = 'none';
          elems.extHovC.style.display = 'block';
        }, 600);
      }, 400);
    }

    this.debug.end('extCodeView.onclick');
  };

  freezeObj(Events, true);

////////////////////////////////////////////////////////////////////////////////
// The App Module End
////////////////////////////////////////////////////////////////////////////////

  return appModuleAPI;

})(window, document));