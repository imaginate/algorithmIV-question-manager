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
 * @typedef {*} val
 * @typedef {number} num
 * @typedef {HTMLElement} elem
 * @typedef {HTMLElement} element
 * @typedef {Array<*>} vals
 * @typedef {Array<number>} nums
 * @typedef {Array<number>} numbers
 * @typedef {Array<string>} strings
 * @typedef {Array<Object>} objects
 * @typedef {Array<Question>} questions
 * @typedef {Array<HTMLElement>} elems
 * @typedef {Array<HTMLElement>} elements
 * @typedef {Array<{name: string, href: string}>} links
 * @typedef {Object<string, string>} stringMap
 * @typedef {Object<string, number>} numberMap
 * @typedef {Object<string, object>} objectMap
 * @typedef {Object<string, boolean>} booleanMap
 * @typedef {Object<string, HTMLElement>} elemMap
 * @typedef {Object<string, HTMLElement>} elementMap
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
getElemByClassRoot:f.getElemByClassRoot,getElemsByClassRoot:f.getElemsByClassRoot,getElemByTagRoot:f.getElemByTagRoot,getElemsByTagRoot:f.getElemsByTagRoot};e.set=function(){return function(a){var b=e.checkType,c;if(!a||"object"!==typeof a)throw new TypeError("An aIV.utils.set call received an invalid settings parameter (should be an object).");for(c in m)if(m.hasOwnProperty(c)&&a.hasOwnProperty(c))if(b(a[c],f.types[c]))m[c]=a[c];else throw a=void 0,a="An aIV.utils.set call received an invalid "+
c,a+=" settings parameter (should be a "+f.types[c],a+=").",new TypeError(a);return!0}}();e.reset=function(){var a,b,c;a=(a=arguments.length)?1<a?Array.prototype.slice.call(arguments,0):Array.isArray(arguments[0])?arguments[0]:[arguments[0]]:Object.keys(m);if(!e.checkType(a,"!strings"))throw new TypeError("An aIV.utils.reset call received an invalid setting parameter (should be a string or an array of strings).");for(c=a.length;c--;)b=a[c],m.hasOwnProperty(b)&&(m[b]=f[b]);return!0};e.checkType=function(){var a=
/^string$|^number$|^boolean$|^function$|^undefined$/,b=/^string$|^number$|^boolean$|^object$|^function$|^undefined$/,c=/^elem$|^element$|^document$/,e=/^array$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$/,z=/^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,k=/\!/,m=/\?/,l=/\=/,n=/\*/,f=function(a,b){return null===a?!1:typeof a===b},u=function(a,b){return a&&f(a,"object")&&a.nodeType?a.nodeType==={elem:1,element:1,
document:9}[b]:!1};return function(h,d,r){var p,v,q,g;if(!f(d,"string"))throw new TypeError("An aIV.utils.checkType call received an invalid (a non-string) type parameter.");if(p=n.test(d)){if(1<d.length)throw h="An aIV.utils.checkType call received an invalid type string. When using an asterisk, '*', no other values should be given as the asterisk guarantees the check will ",h+="pass.",Error(h);return!0}if(p=h===y&&l.test(d))g=!0;else{g=d;var t;t=(q=null===h)?k.test(g):!0;q&&m.test(g)&&(t=!t);g=
t}q=p||!g||k.test(d)?!1:m.test(d);p=p||q&&g;if(!r||!p)if(d=d.toLowerCase(),d=d.replace(w.exceptLowerAlphaAndPipe,""),v=d.split("|"),!r)for(d=v,t=!0,r=d.length;t&&r--;)if(t=w.allDataTypes.test(d[r]),!t)throw h=void 0,h="An aIV.utils.checkType call received an invalid type ",h+="string. The value '"+d[r]+"' was incorrect. ",h+="Check aIV.utils.checkType's documentation for a ",h+="list of acceptable type strings.",Error(h);if(!p){if(null===h){h=v;p=q;d=!1;for(v=h.length;!d&&v--;)g||(p=!a.test(h[v])),
d=p;h=d}else{p=v;g=!1;for(v=p.length;!g&&v--;){d=p[v];if("any"===d){g=!0;break}if(b.test(d))g=f(h,d);else if(c.test(d))g=u(h,d);else if(e.test(d))if(g=h,t=q=r=void 0,Array.isArray(g))if("array"===d)g=!0;else{d=d.slice(0,-1);t="array"===d?Array.isArray:c.test(d)?u:f;q=!0;for(r=g.length;q&&r--;)q=t(g[r],d);g=q}else g=!1;else if(z.test(d))if(g=h,t=q=r=void 0,f(g,"object")){d=d.slice(0,-3);t="array"===d?Array.isArray:c.test(d)?u:f;q=!0;for(r in g)if(g.hasOwnProperty(r)&&(q=t(g[r],d),!q))break;g=q}else g=
!1}h=g}p=h}return p}}();e.isValidTypeString=function(a){var b,c;if("string"!==typeof a)throw new TypeError("An aIV.utils.isValidTypeString call received an invalid (a non-string) typeString parameter.");a=a.toLowerCase();a=a.replace(w.exceptLowerAlphaAndPipe,"");c=a.split("|");b=!0;for(a=c.length;b&&a--;)b=w.allDataTypes.test(c[a]);return b};e.checkArgs=function(){var a=e.checkType,b=e.isValidTypeString;return function(){var c,e,f,k,n,l,u;e=arguments.length;if(2>e||e%2)throw Error("An aIV.utils.checkArgs call was missing parameters.");
n=Array.prototype.slice.call(arguments,0);l=!0;for(c=-1;++c<e;)if(c%2){k=n[c];u=(u=a(k,"string",!0))&&b(k);if(!u)throw l=void 0,l="An aIV.utils.checkArgs call received an invalid type ",l+="string. The value '"+k+"' was incorrect. ",l+="Check aIV.utils.checkType's documentation for a ",l+="list of acceptable type strings.",Error(l);l=l&&a(f,k,!0)}else f=n[c];if(!l&&(k=m.checkArgsErrorMsg,(k=a(k,"string")?k:k())&&a(k,"string")))throw new TypeError(k);return l}}();e.getTypeOf=function(){var a=e.checkType;
return function(b){var c;c=typeof b;"object"===c&&a(b,"document|element|array")&&(c=null===b?"null":Array.isArray(b)?"array":1===b.nodeType?"element":"document");return c}}();e.freezeObj=function(){var a=function(b){var c;Object.freeze(b);for(c in b)b.hasOwnProperty(c)&&b[c]&&("object"===typeof b[c]||"function"===typeof b[c])&&a(b[c])};return function(b,c){if(!b||"object"!==typeof b&&"function"!==typeof b)throw new TypeError("An aIV.utils.freezeObj call received an invalid obj parameter.");"boolean"!==
typeof c&&(c=!1);c?a(b):Object.freeze(b);return b}}();e.hasOwnProp=function(a,b){var c;if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An aIV.utils.hasOwnProp call received an invalid obj parameter.");if(!b||"string"!==typeof b)throw c="An aIV.utils.hasOwnProp call received an invalid prop parameter.",new TypeError(c);return a.hasOwnProperty(b)};var w={allDataTypes:/^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|^element$|^undefined$|^null$|^document$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,
exceptLowerAlphaAndPipe:/[^a-z\|]/g};e.freezeObj(w,!0);e.getElemById=function(a){if(!a||"string"!==typeof a)throw new TypeError("An aIV.utils.getElemById call received an invalid id parameter (should be a string).");a=n.getElementById(a);if(!a)throw a="An aIV.utils.getElemById call received an invalid id parameter (i.e. no element with the id was found).",new RangeError(a);return a};e.getElemByClass=function(a,b,c){if(!a||"string"!==typeof a)throw new TypeError("An aIV.utils.getElemByClass call received an invalid class name parameter.");
b="number"!==typeof b||-1>b?0:Math.floor(b);c&&"object"===typeof c&&(c instanceof Element||c instanceof Document)||(c=m.getElemByClassRoot);a=c.getElementsByClassName?c.getElementsByClassName(a):x.getElementsByClassNameAlt(a,c);if(0>b||b>=a.length)b=a.length-1;b=a[b];if(!b)throw b="An aIV.utils.getElemByClass call received an invalid class name parameter ",b+="(i.e. no element with the class name was found).",new RangeError(b);return b};e.getElemsByClass=function(a,b){if(!a||"string"!==typeof a)throw new TypeError("An aIV.utils.getElemsByClass call received an invalid class name parameter.");
b&&"object"===typeof b&&(b instanceof Element||b instanceof Document)||(b=m.getElemsByClassRoot);return b.getElementsByClassName?b.getElementsByClassName(a):x.getElementsByClassNameAlt(a,b)};e.getElemByTag=function(a,b,c){if(!a||"string"!==typeof a)throw new TypeError("An aIV.utils.getElemByTag call received an invalid tag name parameter.");b="number"!==typeof b||-1>b?0:Math.floor(b);c&&"object"===typeof c&&(c instanceof Element||c instanceof Document)||(c=m.getElemByTagRoot);a=c.getElementsByTagName(a);
if(0>b||b>=a.length)b=a.length-1;b=a[b];if(!b)throw b="An aIV.utils.getElemByTag call received an invalid tag name parameter ",b+="(i.e. no element with the tag name was found).",new RangeError(b);return b};e.getElemsByTag=function(a,b){if(!a||"string"!==typeof a)throw new TypeError("An aIV.utils.getElemsByTag call received an invalid tag name parameter.");b&&"object"===typeof b&&(b instanceof Element||b instanceof Document)||(b=m.getElemsByTagRoot);return b.getElementsByTagName(a)};e.makeElem=function(a){var b;
a&&"string"===typeof a?(b=a,a=null):a&&"object"===typeof a?a.hasOwnProperty("tag")&&a.tag&&"string"===typeof a.tag?b=a.tag:a.hasOwnProperty("tagName")&&a.tagName&&"string"===typeof a.tagName&&(b=a.tagName):a=null;b||(b="div");b=n.createElement(b);a&&(a.hasOwnProperty("text")&&a.text&&"string"===typeof a.text&&(b.textContent?b.textContent=a.text:b.innerText=a.text),a.hasOwnProperty("html")&&a.html&&"string"===typeof a.html&&(b.innerHTML=a.html),a.hasOwnProperty("id")&&a.id&&"string"===typeof a.id&&
(b.id=a.id),a.hasOwnProperty("className")&&a.className&&"string"===typeof a.className&&(b.className=a.className));return b};e.addElemText=function(a,b){var c;if(!(a&&"object"===typeof a&&a instanceof Element))throw new TypeError("An aIV.utils.addElemText call received an invalid elem parameter (should be a DOM Element).");if(!b||"string"!==typeof b)throw c="An aIV.utils.addElemText call received an invalid text parameter (should be a string).",new TypeError(c);a.textContent?a.textContent=b:a.innerText=
b;return a};var x={getElementsByClassNameAlt:function(a,b){var c,e,f,k,m,l;if(b.querySelectorAll)k=b.querySelectorAll("."+a);else if(n.evaluate)for(k=[],f='"'+(" "+a+" ")+'")]',c=n.evaluate(f,b,null,0,null),f=c.iterateNext();f;)k.push(f),f=c.iterateNext();else for(l=new RegExp("(^|s)"+a+"(s|$)"),m=b.getElementsByTagName("*"),k=[],e=m.length,c=-1;++c<e;)f=m[c],l.test(f.className)&&k.push(f);return k}};e.freezeObj(x,!0);e.freezeObj(e,!0);return e}(window,document));

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

  // The debugging vars
  var debug = aIV.debug({
    classTitle  : 'appModule',
    turnOnGroups: true,
    turnOnTimers: true
  });
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

    checkArgs(jsonFile, 'string', callback, 'function');

    /** @type {XMLHttpRequest} */
    var http;
    /** @type {string} */
    var errorMsg;

    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        if (http.status === 200) {
          resources[ jsonFile ] = JSON.parse(http.responseText);
          debug.state('getResource', 'parsed responseText= $$', resources[ jsonFile ]);
        }
        else {
          errorMsg = 'Your resource - resources/' + jsonFile + '.json - ';
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
   * Public Method (addElemText)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM methods - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The element.
   * @param {string} text - The element's textContent or innerText.
   * @return {!Element} The DOM element with the given text.
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

    checkArgs(vals, '!array', types, '!string|strings');

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

    if ( checkType(types, 'string') ) {
      type = types;
      types = new Array(vals.length);
      i = types.length;
      while (i--) {
        types[i] = type;
      }
    }

    if (vals.length !== types.length) {
      errorMsg = 'An aIV.app checkTypes call received an invalid parameter. ';
      errorMsg += 'The length of the vals and types arrays did not match.';
      throw new Error(errorMsg);
      return;
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

    checkArgs(ids, '!strings', data, '!stringMap');

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

    checkArgs(str, 'string');

    /** @type {!strings} */
    var arr;
    /** @type {number} */
    var i;

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
  var trimFunctionWrapper = (function() {

    /** @type{RegExp} */
    var funcCheck;
    /** @type{RegExp} */
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
  var isLink = (function() {

    /** @type{RegExp} */
    var http;

    http = /^https?\:\/\//;

    return function isLink(str) {

      debug.start('isLink', str);

      checkArgs(str, 'string');

      /** @type {boolean} */
      var result;

      result = http.test(str);

      debug.end('isLink', result);

      return result;
    };
  })();

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

    checkArgs(prop, 'string', shouldBeType, 'string', wasType, 'string');

    /** @type {string} */
    var errorMsg;

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

    this.debug = aIV.debug('App');

    debugMsg = 'Error: No questions were provided to this app\'s init.';
    debugCheck = (questions.length > 0);
    this.debug.fail('init', debugCheck, debugMsg);

    debugMsg = 'config= $$, sources= $$, categories= $$, questions= $$';
    debugArgs = [ 'init', 'open', debugMsg ];
    debugArgs.push(config, sources, categories, questions);
    this.debug.group(debugArgs);

    this.debug.start('init', config, sources, categories, questions);

    debugArgs = [ 'init', config, 'objectMap', sources, 'stringMap' ];
    debugArgs.push(categories, 'objectMap|stringMap', questions, '!objects');
    this.debug.args(debugArgs);

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
    /** @type {?Object<string, (string|num)>} */
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
    this.questions = new Questions(questions, tmpConfig, this.sources,
                                   this.categories);

    // Set the search defaults
    defaults = ( (!!config && config.hasOwnProperty('searchDefaults')) ?
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
      debugCheck = 'Oi, an old browser. Just let it die.';
      this.debug.fail('init', false, debugCheck);
      this.isHistory = false;
    }

    // Setup the onpopstate event
    if (this.isHistory) {
      window.onpopstate = function(event) {
        Events.popState( JSON.parse(event.state) );
      };
    }

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

  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.setupDisplay)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function}
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

      renderTime = this.questions.len * 32;
      this.debug.state('setupDisplay', 'renderTime= $$', renderTime);
      setTimeout(function() {

        /** @type {boolean} */
        var flip;

        app.questions.addCodeExts();
        app.elems.hold.style.display = 'none';
        flip = (app.searchBar.vals.order === 'desc');
        app.updateDisplay(null, null, null, flip, true);

        // $s$
        setTimeout(function() {
          app.debug.group('setupDisplay', 'end');
          debug.end('startApp');
        }, 520);
        // $e$

      }, renderTime);
    }
    else {
      this.elems.appendError();
      this.debug.group('setupDisplay', 'end');
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

    debugMsg = 'oldIds= $$, oldIndex= $$, oldView= $$, ';
    debugMsg += 'flipElems= $$, noPushState= $$';
    debugArgs = [ 'updateDisplay', 'coll', debugMsg, oldIds ];
    debugArgs.push(oldIndex, oldView, flipElems, noPushState);
    this.debug.group(debugArgs);

    debugArgs = [ 'updateDisplay', oldIds, oldIndex, oldView ];
    debugArgs.push(flipElems, noPushState);
    this.debug.start(debugArgs);

    debugArgs = [ 'updateDisplay', oldIds, 'numbers=' ];
    debugArgs.push(oldIndex, '?number=', oldView, '?string=');
    debugArgs.push(flipElems, 'boolean=', noPushState, 'boolean=');
    this.debug.args(debugArgs);

    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var newView;

    oldIds = (!!oldIds) ? oldIds : this.vals.get('ids').slice(0);
    oldIndex = ( ( checkType(oldIndex, '!number') ) ?
      oldIndex : this.vals.get('index')
    );

    newView = app.searchBar.vals.view;
    oldView = ( checkType(oldView, '!string') ) ? oldView : newView;

    flipElems = flipElems || false;
    noPushState = noPushState || false;

    // Save the new matching question ids and index
    newIds = this.vals.get('ids').slice(0);
    newIndex = this.vals.get('index');

    // Hide the question's main element
    this.elems.main.style.opacity = '0';

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

      app.debug.group('updateDisplay', 'end');
    }, 520);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.findMatches)
   * -----------------------------------------------
   * @desc Finds the matching question ids for the current
   *   selected search values.
   * @return {numbers} An array of the matching ids.
   */
  App.prototype.findMatches = function() {

    this.debug.start('findMatches');

    /** @type {nums} */
    var stage;
    /** @type {nums} */
    var source;
    /** @type {nums} */
    var mainCat;
    /** @type {nums} */
    var subCat;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {nums} */
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
      this.debug.state('findMatches', 'newIds= $$', []);
      return [];
    }

    // Check for all ids
    if (!stage && !source && !mainCat && !subCat) {

      newIds = this.vals.get('allIds').slice(0);

      if (this.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }

      this.debug.state('findMatches', 'newIds= $$', newIds);

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

      this.debug.state('findMatches', 'newIds= $$', newIds);

      return newIds;
    }

    // The helper function that checks each array for the
    // current value being checked & removes the checked
    // values from the array
    checkForValue = function(/** number */ val, /** numbers */ arr) {

      /** @type {boolean} */
      var pass;
      /** @type {number} */
      var i;
      /** @type {number} */
      var compareVal;

      pass = false;

      i = arr.length;
      while (i--) {

        compareVal = arr[i];

        if (compareVal >= val) {
          arr.pop();
          if (compareVal === val) {
            pass = true;
            break;
          }
        }
        else {
          break;
        }
      }

      return pass;
    };

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

    this.debug.state('findMatches', 'newIds= $$', newIds);

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

    return JSON.stringify(vals);
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

    this.debug = aIV.debug('AppFlags');

    this.debug.start('init', pass);

    this.debug.args('init', pass, 'boolean');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (AppFlags.initArgs)
     * -----------------------------------------------
     * @desc Indicates whether the app was initialized with correct arguments.
     * @type {boolean}
     * @private
     */
    var initArgs;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    initArgs = pass;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.get)
     * -----------------------------------------------
     * @desc Gets a flag.
     * @param {string} prop - The name of the flag to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var flags = {
        initArgs: initArgs
      };

      debugCheck = flags.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return flags[ prop ];
    };

    /**
     * ----------------------------------------------- 
     * Public Method (AppFlags.set)
     * -----------------------------------------------
     * @desc Sets a flag.
     * @param {string} prop - The name of the flag to set.
     * @param {boolean} val - The value to set the flag to.
     */
    this.set = function(prop, val) {

      this.debug.start('set', prop, val);
      this.debug.args('set', prop, 'string', val, 'boolean');

      /** @type {Object<string, function>} */
      var flags = {
        initArgs: function () { initArgs = val; }
      };

      debugCheck = flags.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      flags[ prop ]();
    };

    // Freeze all of the methods
    freezeObj(this.get);
    freezeObj(this.set);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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

    this.debug.group('init', 'coll');

    this.debug.start('init');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.root)
     * -----------------------------------------------
     * @desc The #aIV element.
     * @type {element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.sel)
     * -----------------------------------------------
     * @desc The #aIV-selections element.
     * @type {element}
     */
    this.sel;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.main)
     * -----------------------------------------------
     * @desc The #aIV-main element.
     * @type {element}
     */
    this.main;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.nav)
     * -----------------------------------------------
     * @desc The #aIV-nav element.
     * @type {element}
     */
    this.nav;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.ques)
     * -----------------------------------------------
     * @desc The #aIV-questions element.
     * @type {element}
     */
    this.ques;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.hold)
     * -----------------------------------------------
     * @desc The img.loader element.
     * @type {element}
     */
    this.hold;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.none)
     * -----------------------------------------------
     * @desc The section.empty element.
     * @type {element}
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

    /** @type {element} */
    var elem;
    /** @type {element} */
    var code;
    /** @type {element} */
    var ol;
    /** @type {element} */
    var li;

    this.root = makeElem({
      id  : 'aIV',
      html: '<h1>Algorithm IV</h1>'
    });
    this.sel  = makeElem({
      tag      : 'nav',
      id       : 'aIV-selections',
      className: 'selections'
    });
    this.main = makeElem({
      id       : 'aIV-main',
      className: 'main'
    });
    this.nav  = makeElem({
      tag: 'nav',
      id : 'aIV-nav'
    });
    this.ques = makeElem({
      tag      : 'section',
      id       : 'aIV-questions',
      className: 'questions'
    });
    this.hold = makeElem({
      tag      : 'img',
      className: 'loader'
    });
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

    addElemText(li, 'test');

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

    this.debug.group('init', 'end');

    // Freeze this class instance
    freezeObj(this);
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

    /** @type {element} */
    var prev;
    /** @type {element} */
    var pArrow;
    /** @type {element} */
    var pBG;
    /** @type {element} */
    var pTitle;
    /** @type {element} */
    var next;
    /** @type {element} */
    var nArrow;
    /** @type {element} */
    var nBG;
    /** @type {element} */
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
    /** @type {element} */
    var errorDiv;
    /** @type {element} */
    var h2;
    /** @type {element} */
    var p;
    /** @type {element} */
    var exampleDiv;
    /** @type {element} */
    var h3;
    /** @type {element} */
    var div;
    /** @type {element} */
    var pre;
    /** @type {element} */
    var code;
    /** @type {element} */
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

    this.debug = aIV.debug('AppVals');

    this.debug.start('init', questionsLen);

    this.debug.args('init', questionsLen, 'number');

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
     * @desc Gets an app value.
     * @param {string} prop - The name of the value to get.
     * @return {!(number|numbers)}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (number|numbers)>} */
      var props = {
        allIds: allIds,
        ids   : ids,
        len   : len,
        index : index
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
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
      this.debug.args('set', newIds, 'numbers', newIndex, 'number=');

      if (newIds) {
        ids = newIds.slice(0);
        len = ids.length;
      }

      if (typeof newIndex === 'number') {
        index = newIndex;
      }
    };

    // Freeze all of the methods
    freezeObj(this.get);
    freezeObj(this.set);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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
    this.debug.args('reset', ids, 'numbers', index, 'number=');

    /** @type {number} */
    var len;

    index = index || 0;

    if (!ids) {
      ids = this.get('allIds');
    }
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
  AppVals.prototype.move = function(way) {

    this.debug.start('move', way);
    this.debug.args('move', way, 'string|number');

    /** @type {number} */
    var id;
    /** @type {string} */
    var view;
    /** @type {number} */
    var index;
    /** @type {number} */
    var last;

    id = (typeof way === 'number') ? way : 0;
    index = this.get('index');

    // Check the value for way
    if (typeof way === 'string' && way !== 'prev' && way !== 'next') {
      try {
        id = Number( way.replace(/[^0-9]/g, '') );
      }
      catch (e) {
        debugMsg = 'Error: An incorrect value was given for way. way= $$';
        this.debug.fail('move', false, debugMsg, way);
        return;
      }
    }

    view = app.searchBar.vals.view;

    // Handle moving to a specific question id
    if (id) {

      debugCheck = (id > 0 && id <= app.questions.len);
      debugMsg = 'Error: An incorrect value was given for way. way= $$';
      this.debug.fail('move', debugCheck, debugMsg, way);

      if (view !== 'one') {
        app.searchBar.vals.view = 'one';
      }

      index = this.get('ids').indexOf(way);

      this.set(null, index);

      debugCheck = (index !== -1);
      debugMsg = 'Error: An incorrect value was given for way. way= $$';
      this.debug.fail('move', debugCheck, debugMsg, way);

      return index;
    }

    // Save the last index
    last = this.get('len') - 1;

    // Handle moving the index one spot
    if (view === 'one') {

      this.debug.state('move', 'index= $$', index);

      if (way === 'prev') {
        index = (index === 0) ? last : --index;
      }
      else if (way === 'next') {
        index = (index === last) ? 0 : ++index;
      }

      this.debug.state('move', 'index= $$', index);

      this.set(null, index);

      return index;
    }

    // Handle moving the index ten spots
    if (view === 'ten') {

      // Update the last index
      last = last - (last % 10);

      if (way === 'prev') {
        index = (index === 0) ? last : (index - 10);
      }
      else if (way === 'next') {
        index = (index === last) ? 0 : (index + 10);
      }

      this.set(null, index);

      return index;
    }

    debugMsg = 'Error: An incorrect view was parsed. ';
    debugMsg += 'app.searchBar.vals.view= $$';
    this.debug.fail('move', false, debugMsg, view);
  };

/* -----------------------------------------------------------------------------
 * The Config Class (classes/config/config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {?Object} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    this.debug = aIV.debug('Config');

    this.debug.group('init', 'coll', 'config= $$', config);

    this.debug.start('init', config);

    this.debug.args('init', config, 'objectMap');

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
    if (!config.showLinks || typeof config.showLinks !== 'object') {
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

    this.debug.group('init', 'end');

    // Freeze this class instance
    freezeObj(this);
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
   * @param {Object} config - The user's search bar config settings.
   * @constructor
   */
  var SearchBarConfig = function(config) {

    this.debug = aIV.debug('SearchBarConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

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
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var props = {
        stage   : stage,
        source  : source,
        category: category,
        subCat  : subCat
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    // Freeze all of the methods
    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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
     * @return {elem}
     * @private
     */
    var makeOptElem = function(id, name) {
      /** @type {elem} */
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

    this.debug = aIV.debug('DefaultsSearchBarConfig');

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
     * @return {(string|number)}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (string|number)>} */
      var props = {
        startID: startID,
        view   : view,
        order  : order,
        stage  : stage,
        source : source,
        mainCat: mainCat,
        subCat : subCat
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.set)
     * -----------------------------------------------
     * @desc Sets a protected property's value for DefaultsSearchBarConfig.
     * @param {string} prop - The name of the property to set.
     * @param {(string|number)} val - The value to set the property to.
     */
    this.set = function(prop, val) {

      this.debug.start('set', prop, val);
      this.debug.args('set', prop, 'string', val, 'string|number');

      /** @type {Object<string, function>} */
      var props = {
        startID: function() { startID = val; },
        view   : function() { view    = val; },
        order  : function() { order   = val; },
        stage  : function() { stage   = val; },
        source : function() { source  = val; },
        mainCat: function() { mainCat = val; },
        subCat : function() { subCat  = val; }
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('set', debugCheck, debugMsg, prop);

      props[ prop ]();
    };

    // Freeze all of the methods
    freezeObj(this.get);
    freezeObj(this.set);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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
   * @param {Object} names - The available search ids and names.
   * @param {Object} ids - The available sub category ids.
   * @param {number} quesLen - The number of user's questions.
   */
  DefaultsSearchBarConfig.prototype.update = function(defaults, names,
                                                      ids, quesLen) {

    debugMsg = 'defaults= $$, names= $$, ids= $$, quesLen= $$';
    debugArgs = [ 'update', 'coll', debugMsg, defaults, names ];
    debugArgs.push(ids, quesLen);
    this.debug.group(debugArgs);

    this.debug.start('update', defaults, names, ids, quesLen);

    debugArgs = [ 'update', defaults, 'object', names, 'object' ];
    debugArgs.push(ids, 'object', quesLen, 'number');
    this.debug.args(debugArgs);

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

    this.debug.group('update', 'end');
  };

/* -----------------------------------------------------------------------------
 * The QuestionsConfig Class (classes/config/questions-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (QuestionsConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for formatting questions in this app.
   * @param {Object} config - The user's question format config settings.
   * @constructor
   */
  var QuestionsConfig = function(config) {

    this.debug = aIV.debug('QuestionsConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

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


    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionsConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from QuestionsConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var props = {
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

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    // Freeze all of the methods
    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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
   * @param {objects} questions - The user's questions.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var Questions = function(questions, config, sources, categories) {

    this.debug = aIV.debug('Questions');

    debugMsg = 'questions= $$, config= $$';
    this.debug.group('init', 'open', debugMsg, questions, config);

    this.debug.start('init', questions, config, sources, categories);

    debugArgs = [ 'init', questions, 'objects', config, 'booleanMap' ];
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);

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

    len = this.len + 1;
    this.list = (this.len) ? new Array(len) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    --len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config, sources, categories);
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
    ++i;
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
     * @desc Gets a question's object or property.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {val}
     */
    this.get = function(id, prop, formatted) {

      var debugArgs, debugMsg, debugCheck;
      this.debug.start('get', id, prop, formatted);

      debugArgs = [ 'get', id, 'number|string', prop, 'string=' ];
      debugArgs.push(formatted, 'boolean=');
      this.debug.args(debugArgs);

      debugMsg = 'Error: This question id does not exist. id= $$';
      debugCheck = (this.list.hasOwnProperty(id) || data.hasOwnProperty(id));
      this.debug.fail('get', debugCheck, debugMsg, id);

      /** @type {Question} */
      var question;

      prop = prop || '';
      formatted = formatted || false;

      question = (typeof id === 'number') ? this.list[ id ] : data[ id ];

      return ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : question.get(prop, formatted)
      );
    };

    // Freeze all of the methods
    freezeObj(this.get);

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

  Questions.prototype.constructor = Questions;

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemStyle)
   * ---------------------------------------------------
   * @desc Sets the style for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {!(string|stringMap)} type - The style setting to set.
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

    debugArgs = [ 'setElemStyle', id, 'number|string' ];
    debugArgs.push(type, '!string|stringMap', val, 'string|number=');
    this.debug.args(debugArgs);

    // Handle one update
    if (typeof type === 'string') {

      debugMsg = 'Error: A third param (val) is required when the given type ';
      debugMsg += 'is a string. It should be a string or number. val= $$';
      debugCheck = checkType(val, 'string|number');
      this.debug.fail('setElemStyle', debugCheck, debugMsg, val);

      // Replace dashes with camel case
      if ( /\-/.test(type) ) {
        type = camelCase(type);
      }

      this.get(id).elem.root.style[ type ] = val;
      return;
    }

    // Handle multiple updates
    Object.keys(type).forEach(function(/** string */ key) {

      // Replace dashes with camel case
      if ( /\-/.test(key) ) {
        key = camelCase(key);
      }

      this.get(id).elem.root.style[ key ] = type[ key ];
    }, this);
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

    debugArgs = [ 'setElemClass', id, 'number|string' ];
    debugArgs.push(newClassName, 'string');
    this.debug.args(debugArgs);

    this.get(id).elem.root.className = newClassName;
  };

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
    config.source = config.source || app.config.links.get('source');
    config.category = config.category || app.config.links.get('category');
    config.subCat = config.subCat || app.config.links.get('category');

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

    /** @type {string} */
    var direction;
    /** @type {Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
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
   * @param {!numbers} ids - The previous active question ids.
   * @param {number} index - The index of the ids to hide from view.
   * @param {string} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    debugMsg = 'ids= $$, index= $$, view= $$';
    this.debug.group('hideElems', 'coll', debugMsg, ids, index, view);

    this.debug.start('hideElems', ids, index, view);

    debugArgs = [ 'hideElems', ids, '!numbers', index, 'number' ];
    debugArgs.push(view, 'string');
    this.debug.args(debugArgs);

    /** @type {number} */
    var i;

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
        this.debug.group('hideElems', 'end');
        return;
      }

      // Hide all of the provided ids
      i = ids.length;
      while (i--) {
        this.setElemStyle(ids[i], 'display', 'none');
      }

      this.debug.group('hideElems', 'end');
      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index.';
    debugCheck = (ids.length > 0);
    this.debug.fail('hideElems', debugCheck, debugMsg);

    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugCheck = (index > -1 && index < ids.length);
    this.debug.fail('hideElems', debugCheck, debugMsg, ids, index);

    // Hide only the index of the provided ids
    if (view === 'one') {
      this.setElemStyle(ids[ index ], 'display', 'none');
      this.debug.group('hideElems', 'end');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {

      // Remove all ids from the array that should NOT be hidden
      i = index + 11;
      ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

      i = ids.length;
      while (i--) {
        this.setElemStyle(ids[i], 'display', 'none');
      }

      this.debug.group('hideElems', 'end');
      return;
    }
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

    debugMsg = 'ids= $$, index= $$';
    this.debug.group('showElems', 'coll', debugMsg, ids, index);

    this.debug.start('showElems', ids, index);

    this.debug.args('showElems', ids, '!numbers', index, 'number');

    /** @type {string} */
    var view;
    /** @type {number} */
    var i;
    /** @type {string} */
    var newClassName;

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
        this.debug.group('showElems', 'end');
        return;
      }

      // Show all of the provided ids
      i = ids.length;
      while (i--) {
        newClassName = (i % 2) ? 'question shade2' : 'question shade1';
        this.setElemClass(ids[i], newClassName);
        this.setElemStyle(ids[i], 'display', 'block');
      }

      this.debug.group('showElems', 'end');
      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index.';
    debugCheck = (ids.length > 0);
    this.debug.fail('showElems', debugCheck, debugMsg);

    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugCheck = (index > -1 && index < ids.length);
    this.debug.fail('showElems', debugCheck, debugMsg, ids, index);

    view = app.searchBar.vals.view;

    // Show only the index of the provided ids
    if (view === 'one') {
      this.setElemClass(ids[ index ], 'question shade1 hideLink');
      this.setElemStyle(ids[ index ], 'display', 'block');
      this.debug.group('showElems', 'end');
      return;
    }

    // Show the index plus ten (or to the array end)
    if (view === 'ten') {

      // Remove all ids from the array that should NOT be shown
      i = index + 11;
      ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

      i = ids.length;
      while (i--) {
        newClassName = (i % 2) ? 'question shade2' : 'question shade1';
        this.setElemClass(ids[i], newClassName);
        this.setElemStyle(ids[i], 'display', 'block');
      }

      this.debug.group('showElems', 'end');
      return;
    }
  };

/* -----------------------------------------------------------------------------
 * The PrettyConfig Class (classes/config/pretty-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {Object<string, (string|number|boolean)>} config - The user's
   *   prettifier configuration settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    this.debug = aIV.debug('PrettyConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

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

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from PrettyConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(number|boolean)}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (number|boolean)>} */
      var props = {
        trimSpace   : trimSpace,
        tabLength   : tabLength,
        commentLinks: commentLinks
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    // Freeze all of the methods
    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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
   * @param {Object} config - The user's config settings for search link
   *   formatting.
   * @constructor
   */
  var LinksConfig = function(config) {

    this.debug = aIV.debug('LinksConfig');

    this.debug.start('init', config);

    this.debug.args('init', config, 'object');

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

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (LinksConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from LinksConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, boolean>} */
      var props = {
        id      : id,
        source  : source,
        category: category
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    // Freeze all of the methods
    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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

    this.debug = aIV.debug('Sources');

    this.debug.group('init', 'coll', 'sources= $$', sources);

    this.debug.start('init', sources);

    this.debug.args('init', sources, 'stringMap');

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

    this.ids = Object.keys(sources);
    this.len = this.ids.length;

    // Sort the ids
    if (this.len) {
      this.ids = sortKeys(this.ids, sources);
    }

    freezeObj(this.ids);

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

    data = {};

    // Build the data hash map
    if (this.len) {
      this.ids.forEach(function(/** string */ sourceId) {
        data[ sourceId ] = new Source(sources[ sourceId ]);
      });
    }

    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Sources.get)
     * -----------------------------------------------
     * @desc Get a source's Source object or property.
     * @param {string} id - The source id to get.
     * @param {string=} prop - The property to get.
     * @return {(Source|string|numbers)}
     */
    this.get = function(id, prop) {

      this.debug.start('get', id, prop);
      this.debug.args('get', id, 'string', prop, 'string=');

      /** @type {Source} */
      var source;

      if (typeof prop !== 'string') {
        prop = '';
      }

      debugCheck = data.hasOwnProperty(id);
      debugMsg = 'Error: The given source does not exist. sourceID= $$';
      this.debug.fail('get', debugCheck, debugMsg, id);

      source = ( data.hasOwnProperty(id) ) ? data[ id ] : false;

      return (prop) ? source.get(prop) : source;
    };

    // Freeze all of the methods
    freezeObj(this.get);

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

  Sources.prototype.constructor = Sources;

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

    this.debug = aIV.debug('Source');

    this.debug.start('init', name);

    this.debug.args('init', name, 'string');

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
     * @type {nums}
     * @private
     */
    var ids;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Source.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the source.
     * @param {string} prop - The name of the property to get.
     * @return {(string|numbers)}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (string|function)>} */
      var props = {
        name: name,
        url : url,
        ids : function() {
          return freezeObj( ids.slice(0) );
        }
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      prop = props[ prop ];

      return (typeof prop === 'function') ? prop() : prop;
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
      this.debug.args('addId', id, 'number');

      if (typeof id === 'number' && id > 0) {
        ids.push(id);
      }
    };

    // Freeze all of the methods
    freezeObj(this.get);
    freezeObj(this.addId);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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

    this.debug = aIV.debug('Categories');

    this.debug.group('init', 'coll', 'categories= $$', categories);

    this.debug.start('init', categories);

    this.debug.args('init', categories, 'objectMap|stringMap');

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

    freezeObj(this.ids);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the category objects using the ids as keys.
     * @type {Object<string, Category>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {strings} */
    var subIds;

    data = {};

    if (this.len) {

      // Build the data hash map
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

        // Add the sub categories to the hash map
        if (subIds && subIds.length) {
          subIds.forEach(function(/** string */ subId) {
            data[ subId ] = new Category(categories.sub[ mainId ][ subId ]);
          });
        } 
      });
    }

    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Categories.get)
     * -----------------------------------------------
     * @desc Get a catgory's Category object or property.
     * @param {string} id - The category id to get.
     * @param {string=} prop - The property to get.
     * @return {(Category|string|numbers)}
     */
    this.get = function(id, prop) {

      this.debug.start('get', id, prop);
      this.debug.args('get', id, 'string', prop, 'string=');

      /** @type {Category} */
      var category;

      if (typeof prop !== 'string') {
        prop = '';
      }

      debugCheck = data.hasOwnProperty(id);
      debugMsg = 'Error: The given category does not exist. catID= $$';
      this.debug.fail('get', debugCheck, debugMsg, id);

      category = ( data.hasOwnProperty(id) ) ? data[ id ] : false;

      return (prop) ? category.get(prop) : category;
    };

    // Freeze all of the methods
    freezeObj(this.get);

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

  Categories.prototype.constructor = Categories;

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

    this.debug = aIV.debug('Category');

    this.debug.start('init', name, subs);

    this.debug.args('init', name, 'string', subs, 'strings=');

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
     * @type {nums}
     * @private
     */
    var ids;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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
    subs = (!!subs) ? freezeObj(subs) : null;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Category.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the category.
     * @param {string} prop - The name of the property to get.
     * @return {(string|numbers)}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (string|numbers|function)>} */
      var props = {
        name: name,
        url : url,
        subs: subs,
        ids : function() {
          return freezeObj( ids.slice(0) );
        }
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      prop = props[ prop ];

      return (typeof prop === 'function') ? prop() : prop;
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
      this.debug.args('addId', id, 'number');

      if (typeof id === 'number' && id > 0) {
        ids.push(id);
      }
    };

    // Freeze all of the methods
    freezeObj(this.get);
    freezeObj(this.addId);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    freezeObj(this);
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
     * @return {elem}
     * @private
     */
    var makeOptElem = function(id, name) {
      /** @type {elem} */
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
   * @param {objects} questions - The user's questions.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var Questions = function(questions, config, sources, categories) {

    this.debug = aIV.debug('Questions');

    debugMsg = 'questions= $$, config= $$';
    this.debug.group('init', 'open', debugMsg, questions, config);

    this.debug.start('init', questions, config, sources, categories);

    debugArgs = [ 'init', questions, 'objects', config, 'booleanMap' ];
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);

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

    len = this.len + 1;
    this.list = (this.len) ? new Array(len) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    --len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config, sources, categories);
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
    ++i;
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
     * @desc Gets a question's object or property.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {val}
     */
    this.get = function(id, prop, formatted) {

      var debugArgs, debugMsg, debugCheck;
      this.debug.start('get', id, prop, formatted);

      debugArgs = [ 'get', id, 'number|string', prop, 'string=' ];
      debugArgs.push(formatted, 'boolean=');
      this.debug.args(debugArgs);

      debugMsg = 'Error: This question id does not exist. id= $$';
      debugCheck = (this.list.hasOwnProperty(id) || data.hasOwnProperty(id));
      this.debug.fail('get', debugCheck, debugMsg, id);

      /** @type {Question} */
      var question;

      prop = prop || '';
      formatted = formatted || false;

      question = (typeof id === 'number') ? this.list[ id ] : data[ id ];

      return ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : question.get(prop, formatted)
      );
    };

    // Freeze all of the methods
    freezeObj(this.get);

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

  Questions.prototype.constructor = Questions;

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemStyle)
   * ---------------------------------------------------
   * @desc Sets the style for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {!(string|stringMap)} type - The style setting to set.
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

    debugArgs = [ 'setElemStyle', id, 'number|string' ];
    debugArgs.push(type, '!string|stringMap', val, 'string|number=');
    this.debug.args(debugArgs);

    // Handle one update
    if (typeof type === 'string') {

      debugMsg = 'Error: A third param (val) is required when the given type ';
      debugMsg += 'is a string. It should be a string or number. val= $$';
      debugCheck = checkType(val, 'string|number');
      this.debug.fail('setElemStyle', debugCheck, debugMsg, val);

      // Replace dashes with camel case
      if ( /\-/.test(type) ) {
        type = camelCase(type);
      }

      this.get(id).elem.root.style[ type ] = val;
      return;
    }

    // Handle multiple updates
    Object.keys(type).forEach(function(/** string */ key) {

      // Replace dashes with camel case
      if ( /\-/.test(key) ) {
        key = camelCase(key);
      }

      this.get(id).elem.root.style[ key ] = type[ key ];
    }, this);
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

    debugArgs = [ 'setElemClass', id, 'number|string' ];
    debugArgs.push(newClassName, 'string');
    this.debug.args(debugArgs);

    this.get(id).elem.root.className = newClassName;
  };

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
    config.source = config.source || app.config.links.get('source');
    config.category = config.category || app.config.links.get('category');
    config.subCat = config.subCat || app.config.links.get('category');

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

    /** @type {string} */
    var direction;
    /** @type {Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
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
   * @param {!numbers} ids - The previous active question ids.
   * @param {number} index - The index of the ids to hide from view.
   * @param {string} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    debugMsg = 'ids= $$, index= $$, view= $$';
    this.debug.group('hideElems', 'coll', debugMsg, ids, index, view);

    this.debug.start('hideElems', ids, index, view);

    debugArgs = [ 'hideElems', ids, '!numbers', index, 'number' ];
    debugArgs.push(view, 'string');
    this.debug.args(debugArgs);

    /** @type {number} */
    var i;

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
        this.debug.group('hideElems', 'end');
        return;
      }

      // Hide all of the provided ids
      i = ids.length;
      while (i--) {
        this.setElemStyle(ids[i], 'display', 'none');
      }

      this.debug.group('hideElems', 'end');
      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index.';
    debugCheck = (ids.length > 0);
    this.debug.fail('hideElems', debugCheck, debugMsg);

    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugCheck = (index > -1 && index < ids.length);
    this.debug.fail('hideElems', debugCheck, debugMsg, ids, index);

    // Hide only the index of the provided ids
    if (view === 'one') {
      this.setElemStyle(ids[ index ], 'display', 'none');
      this.debug.group('hideElems', 'end');
      return;
    }

    // Hide the index plus ten (or to the array end)
    if (view === 'ten') {

      // Remove all ids from the array that should NOT be hidden
      i = index + 11;
      ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

      i = ids.length;
      while (i--) {
        this.setElemStyle(ids[i], 'display', 'none');
      }

      this.debug.group('hideElems', 'end');
      return;
    }
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

    debugMsg = 'ids= $$, index= $$';
    this.debug.group('showElems', 'coll', debugMsg, ids, index);

    this.debug.start('showElems', ids, index);

    this.debug.args('showElems', ids, '!numbers', index, 'number');

    /** @type {string} */
    var view;
    /** @type {number} */
    var i;
    /** @type {string} */
    var newClassName;

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
        this.debug.group('showElems', 'end');
        return;
      }

      // Show all of the provided ids
      i = ids.length;
      while (i--) {
        newClassName = (i % 2) ? 'question shade2' : 'question shade1';
        this.setElemClass(ids[i], newClassName);
        this.setElemStyle(ids[i], 'display', 'block');
      }

      this.debug.group('showElems', 'end');
      return;
    }

    debugMsg = 'Error: No ids were provided with a non-negative index.';
    debugCheck = (ids.length > 0);
    this.debug.fail('showElems', debugCheck, debugMsg);

    debugMsg = 'Error: An incorrect index was provided. ids= $$, index= $$';
    debugCheck = (index > -1 && index < ids.length);
    this.debug.fail('showElems', debugCheck, debugMsg, ids, index);

    view = app.searchBar.vals.view;

    // Show only the index of the provided ids
    if (view === 'one') {
      this.setElemClass(ids[ index ], 'question shade1 hideLink');
      this.setElemStyle(ids[ index ], 'display', 'block');
      this.debug.group('showElems', 'end');
      return;
    }

    // Show the index plus ten (or to the array end)
    if (view === 'ten') {

      // Remove all ids from the array that should NOT be shown
      i = index + 11;
      ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

      i = ids.length;
      while (i--) {
        newClassName = (i % 2) ? 'question shade2' : 'question shade1';
        this.setElemClass(ids[i], newClassName);
        this.setElemStyle(ids[i], 'display', 'block');
      }

      this.debug.group('showElems', 'end');
      return;
    }
  };

/* -----------------------------------------------------------------------------
 * The Question Class (classes/question/question.js)
 * -------------------------------------------------------------------------- */

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

    this.debug = aIV.debug('Question');

    this.debug.group('init', 'coll', 'questionID= $$', id);

    this.debug.start('init', question, id, config, sources, categories);

    debugArgs = [ 'init', question, 'object', id, 'number', config, 'booleanMap' ];
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);

    ////////////////////////////////////////////////////////////////////////////
    // Setup & Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question's DOM container.
     * @type {element}
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

    // Setup main categories
    mainCat = ( (!question.mainCat || !checkType(question.mainCat, 'strings')) ?
      [] : (question.mainCat.length) ?
        question.mainCat.slice(0) : []
    );

    // Check the main category ids accuracy
    mainCat.forEach(function(/** string */ catID, /** number */ i) {

      if (catID === 'all') {
        mainCat[i] = '_all';
        catID = '_all';
      }

      if ( !categories.get(catID, 'name') ) {
        mainCat.splice(i, 1);
      }
    });

    // Setup sub categories
    subCat = ( (!question.subCat || !checkType(question.subCat, 'strings')) ?
      [] : (question.subCat.length) ?
        question.subCat.slice(0) : []
    );

    // Check the sub category ids accuracy
    subCat.forEach(function(/** string */ catID, /** number */ i) {

      if (catID === 'all') {
        subCat[i] = '_all';
        catID = '_all';
      }

      if ( !categories.get(catID, 'name') ) {
        subCat.splice(i, 1);
      }
    });

    // Setup links
    links = ( (!config.links || !question.links ||
               !checkType(question.links, 'objects') ||
               !question.links.length) ?
      [] : question.links.slice(0)
    );

    // Check the link objects accuracy
    if (links.length) {
      links.forEach(function(/** stringMap */ linkObj, /** number */ i) {
        if (!linkObj.name || !linkObj.href ||
            !checkTypes([ linkObj.name, linkObj.href ], 'string') ||
            !isLink(linkObj.href)) {
          links.splice(i, 1);
        }
      });
    }

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
          debugArgs = [ 'init', false ];
          debugArgs.push('The question\'s solution produced an error. questionID= $$, error= $$');
          debugArgs.push(id, errorMsg);
          this.debug.fail(debugArgs);

          output = 'The solution returned an error.';
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
    }, config, sources, categories);

    // Freeze the needed protected properties
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
     * @desc Gets a protected property for the question.
     * @param {string} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {val} The property's value.
     */
    this.get = function(prop, formatted) {

      var debugMsg, debugCheck;
      this.debug.start('get', prop, formatted);
      this.debug.args('get', prop, 'string', formatted, 'boolean=');

      /** @type {Object<string, val>} */
      var props = {
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

      debugMsg = 'Error: The given property does not exist. ';
      debugMsg += 'property= $$, formatted= $$';
      debugCheck = props.hasOwnProperty(prop);
      this.debug.fail('get', debugCheck, debugMsg, prop, formatted);

      formatted = formatted || false;

      return (formatted) ? format.get(prop) : props[ prop ];
    };

    // Freeze all of the methods
    freezeObj(this.get);

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
   * @param {Object} question - The pre-formatted details of the question.
   * @param {booleanMap} config - The settings for question formatting.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var QuestionFormat = function(question, config, sources, categories) {

    this.debug = aIV.debug('QuestionFormat');

    debugArgs = [ 'init', 'coll', 'id= $$, question= $$' ];
    debugArgs.push(question.id, question);
    this.debug.group(debugArgs);

    this.debug.start('init', question, config, sources, categories);

    debugArgs = [ 'init', question, 'object', config, 'booleanMap' ];
    debugArgs.push(sources, 'object', categories, 'object');
    this.debug.args(debugArgs);

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

    /** @type {{ result: string, lineCount: number }} */
    var code;

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

    // Freeze all of the properties that are objects
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
     * @desc Gets a protected property for the question.
     * @param {string} prop - The name of the property to get.
     * @return {val} The property's value.
     */
    this.get = function(prop) {

      var debugMsg, debugCheck;
      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, val>} */
      var props = {
        id      : id,
        source  : source,
        complete: complete,
        mainCat : mainCat,
        subCat  : subCat,
        solution: solution
      };

      debugMsg = 'Error: The given property does not exist. property= $$';
      debugCheck = props.hasOwnProperty(prop);
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    // Freeze all of the methods
    freezeObj(this.get);

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
     * @type {element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {element}
     */
    this.info;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.solution)
     * -----------------------------------------------
     * @desc The question's div.solution element.
     * @type {element}
     */
    this.solution;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.pre)
     * -----------------------------------------------
     * @desc The question's div.preContain element.
     * @type {element}
     */
    this.pre;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.code)
     * -----------------------------------------------
     * @desc The question's code element.
     * @type {element}
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

    /** @type {element} */
    var root;
    /** @type {element} */
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
      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {element} */
      var a;

      config = app.config.links.get('id');

      div = makeElem({ className: 'idContain' });
      h3  = makeElem({ tag: 'h3', text: 'Question:' });
      p   = makeElem('p');

      if (!config) {
        addElemText(p, id);
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
     * @return {element} The anchor element.
     * @private
     */
    function makeIdLink(id, url) {

      this.debug.start('makeIdLink', id, url);
      this.debug.args('makeIdLink', id, 'string', url, 'string');

      /** @type {element} */
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
      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {element} */
      var a;

      config = app.config.links.get('source');

      div = makeElem({ className: 'source' });
      h3  = makeElem({ tag: 'h3', text: 'Source:' });
      p   = makeElem('p');

      if (!config) {
        addElemText(p, source.name);
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
     * @return {element} The anchor element.
     * @private
     */
    function makeSourceLink(id, name) {

      this.debug.start('makeSourceLink', id, name);
      this.debug.args('makeSourceLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {element} */
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

      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
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

      /** @type {element} */
      var contain;
      /** @type {element} */
      var mainDiv;
      /** @type {element} */
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
     * @param {element} div - The DOM container for the main categories.
     * @private
     */
    function appendMainCategories(main, div) {

      this.debug.start('appendMainCategories', main, div);
      this.debug.args('appendMainCategories', main, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {element} */
      var a;

      config = app.config.links.get('category');

      h3  = makeElem({ tag: 'h3', text: main.h3 });
      p   = makeElem('p');

      if (!config) {
        addElemText(p, main.names.join(', '));
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
     * @param {element} div - The DOM container for the sub categories.
     * @private
     */
    function appendSubCategories(sub, div) {

      this.debug.start('appendSubCategories', sub, div);
      this.debug.args('appendSubCategories', sub, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {element} */
      var a;

      config = app.config.links.get('category');

      h3  = makeElem({ tag: 'h3', text: sub.h3 });
      p   = makeElem('p');

      if (!config) {
        addElemText(p, sub.names.join(', '));
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
     * @return {element} The anchor link.
     * @private
     */
    function makeMainCatLink(id, name) {

      this.debug.start('makeMainCatLink', id, name);
      this.debug.args('makeMainCatLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {element} */
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
     * @return {element} The anchor link.
     * @private
     */
    function makeSubCatLink(id, name) {

      this.debug.start('makeSubCatLink', id, name);
      this.debug.args('makeSubCatLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {element} */
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
      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
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

      /** @type {element} */
      var contain;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var preDiv;
      /** @type {element} */
      var pre;
      /** @type {element} */
      var code;
      /** @type {element} */
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

      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
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

      /** @type {element} */
      var div;
      /** @type {element} */
      var h3;
      /** @type {element} */
      var p;

      div = makeElem({ className: 'links' });
      h3  = makeElem({ tag: 'h3', text: 'Links:' });
      p   = makeElem('p');

      div.appendChild(h3);
      div.appendChild(p);

      links.forEach(function(/** Object */ linkObj) {
        /** @type {element} */
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
    /** @type {element} */
    var code;
    /** @type {element} */
    var ext;
    /** @type {element} */
    var extClose;
    /** @type {element} */
    var extOpen;
    /** @type {element} */
    var extBG;
    /** @type {element} */
    var extHov;
    /** @type {element} */
    var extHovC;
    /** @type {element} */
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

      checkArgs(solution, 'string');

      /** @type {{ result: string, lineCount: number }} */
      var result;

      // Format the solution
      result = applyFormatting( prepareLines(solution) );

      prettify.debug.end('init', result);

      return result;
    };

/* -----------------------------------------------------------------------------
 * The Prettifier Module Variables (pre-compiled-prettifier/prettify-vars.js)
 * -------------------------------------------------------------------------- */

    // The prettifier's debugger object
    prettify.debug = aIV.debug({
      classTitle  : 'prettify',
      turnOnGroups: true,
      turnOnTimers: true
    });

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

      checkArgs(solution, 'string');

      /** @type {!strings} */
      var lines;
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

      checkArgs(lines, '!strings');

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {string} */
      var line;
      /** @type {!Object} */
      var result;

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

      checkArgs(line, 'string');

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

      checkArgs(cat, 'string', href, 'string=', props, 'boolean=');

      /** @type {!Object<string, (string|numberMap)>} */
      var obj;

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

      checkArgs(href, 'string=');

      /** @type {!stringMap} */
      var obj;

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
        highlightSyntax.debug.args('init', line, 'string');

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

        var debugMsg;
        highlightSyntax.debug.start('prepareLine', line);
        highlightSyntax.debug.args('prepareLine', line, 'string');

        orgLine = line.split('');
        freezeObj(orgLine);
        newLine = line.split('');
        lineLen = line.length;
        lastIndex = (lineLen) ? lineLen - 1 : 0;

        debugMsg = 'lineLen= $$, lastIndex= $$';
        highlightSyntax.debug.state('prepareLine', debugMsg, lineLen, lastIndex);
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

        var debugMsg;
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
          debugMsg = 'new RegExp(regexBody) error= $$';
          highlightSyntax.debug.state('isRegex', debugMsg, e);
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

        var debugArgs;
        highlightSyntax.debug.start('formatCommentLinks', start, end);
        debugArgs = [ 'formatCommentLinks' ];
        debugArgs.push(start, 'number', end, 'number');
        highlightSyntax.debug.args(debugArgs);

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

        var debugArgs;
        highlightSyntax.debug.start('formatIdentifier', i, extras);
        debugArgs = [ 'formatIdentifier' ];
        debugArgs.push(i, 'number', extras, 'string=');
        highlightSyntax.debug.args(debugArgs);

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
   * @param {Object} newState - The new state to apply to the app.
   */
  Events.popState = function(newState) {

    this.debug.group('popState', 'coll');
    this.debug.start('popState', newState);
    this.debug.args('popState', newState, 'object');

    /** @type {!numbers} */
    var oldIds;
    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;
    /** @type {boolean} */
    var flipElems;

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

    this.debug.group('popState', 'end');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.prev)
   * -----------------------------------------------
   * @desc The onClick event handler for the previous button.
   * @type {function}
   */
  Events.prev = function() {

    this.debug.group('prev.onclick', 'coll');
    this.debug.start('prev.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('prev');

    app.updateDisplay(null, oldIndex);

    this.debug.group('prev.onclick', 'end');
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.next)
   * -----------------------------------------------
   * @desc The onClick event handler for the next button.
   * @type {function}
   */
  Events.next = function() {

    this.debug.group('next.onclick', 'coll');
    this.debug.start('next.onclick');

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('next');

    app.updateDisplay(null, oldIndex);

    this.debug.group('next.onclick', 'end');
  };


  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchView)
   * -----------------------------------------------
   * @desc The onChange event handler for the view search option.
   * @param {string} newVal - The new value for the view.
   */
  Events.searchView = function(newVal) {

    this.debug.start('searchView.onchange', newVal);
    this.debug.args('searchView.onchange', newVal, 'string');

    /** @type {number} */
    var len;
    /** @type {number} */
    var oldIndex;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var oldView;

    if (app.searchBar.vals.view != newVal) {

      this.debug.group('searchView.onchange', 'coll');

      len = app.vals.get('len');

      oldIndex = app.vals.get('index');
      newIndex = (newVal === 'all' || !len) ? -1 : 0;
      oldView = app.searchBar.vals.view;

      app.searchBar.vals.view = newVal;
      app.vals.set(null, newIndex);

      app.updateDisplay(null, oldIndex, oldView);

      this.debug.group('searchView.onchange', 'end');
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

    this.debug.start('searchOrder.onchange', newVal);
    this.debug.args('searchOrder.onchange', newVal, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;

    if (app.searchBar.vals.order != newVal) {

      this.debug.group('searchOrder.onchange', 'coll');

      oldIds = app.vals.get('ids');
      newIds = oldIds.slice(0);
      newIds.reverse();

      app.searchBar.vals.order = newVal;
      app.vals.set(newIds);

      app.updateDisplay(oldIds, null, null, true);

      this.debug.group('searchOrder.onchange', 'end');
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

    this.debug.start('searchStage.onchange', newVal);
    this.debug.args('searchStage.onchange', newVal, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.stage != newVal) {

      this.debug.group('searchStage.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.stage = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.group('searchStage.onchange', 'end');
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

    this.debug.start('searchSource.onchange', newVal);
    this.debug.args('searchSource.onchange', newVal, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.source != newVal) {

      this.debug.group('searchSource.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.group('searchSource.onchange', 'end');
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

    this.debug.start('searchMainCat.onchange', newVal);
    this.debug.args('searchMainCat.onchange', newVal, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.mainCat != newVal) {

      this.debug.group('searchMainCat.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      app.updateDisplay(oldIds, oldIndex);

      this.debug.group('searchMainCat.onchange', 'end');
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

    this.debug.start('searchSubCat.onchange', newVal);
    this.debug.args('searchSubCat.onchange', newVal, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.subCat != newVal) {

      this.debug.group('searchSubCat.onchange', 'coll');

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.subCat = newVal;

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

      this.debug.group('searchSubCat.onchange', 'end');
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
    this.debug.args('linkId.onclick', id, 'number');

    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;

    oldIndex = app.vals.get('index');
    oldView = app.searchBar.vals.view;

    app.searchBar.elems.view.value = 'one';

    app.vals.move(id);

    app.updateDisplay(null, oldIndex, oldView);

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

    this.debug.start('linkSource.onclick', id);
    this.debug.args('linkSource.onclick', id, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.source != id) {

      this.debug.group('linkSource.onclick', 'coll', 'sourceID= $$', id);

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = id;
      if (app.searchBar.elems.source) {
        app.searchBar.elems.source.value = id;
      }

      newIds = app.findMatches();

      app.vals.reset(newIds);

      app.updateDisplay(oldIds, oldIndex);

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

    this.debug.start('linkMainCat.onclick', id);
    this.debug.args('linkMainCat.onclick', id, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.mainCat != id) {

      this.debug.group('linkMainCat.onclick', 'coll', 'mainCatID= $$', id);

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

    this.debug.start('linkSubCat.onclick', id, parentId);
    this.debug.args('linkSubCat.onclick', id, 'string', parentId, 'string');

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    if (app.searchBar.vals.subCat != id) {

      this.debug.group('linkSubCat.onclick', 'coll', 'subCatID= $$', id);

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

      this.debug.group('linkSubCat.onclick', 'end');
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.extCodeView)
   * -----------------------------------------------
   * @desc The onClick event handler for a question code extender.
   * @param {number} overflow - The question's code view overflow pixel count.
   * @param {elemMap} elems - The code view elements.
   */
  Events.extCodeView = function(overflow, elems) {

    debugMsg = 'overflow= $$, elems= $$'
    this.debug.group('extCodeView.onclick', 'coll', debugMsg, overflow, elems);
    this.debug.start('extCodeView.onclick', overflow, elems);
    this.debug.args('extCodeView.onclick', overflow, 'number', elems, 'elemMap');

    /** @type {number} */
    var newWidth;
    /** @type {number} */
    var newRight;

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
          addElemText(elems.extOpen, 'open');
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
          addElemText(elems.extOpen, 'close');
          elems.extHovO.style.display = 'none';
          elems.extHovC.style.display = 'block';
        }, 600);
      }, 400);
    }

    this.debug.group('extCodeView.onclick', 'end');
  };

  freezeObj(Events);

////////////////////////////////////////////////////////////////////////////////
// The App Module End
////////////////////////////////////////////////////////////////////////////////

  return appModuleAPI;

})(window, document));