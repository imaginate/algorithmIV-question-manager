/* Algorithm IV Question Manager (v1.1.2) (learn@algorithmiv.com)
 * Section: Example's Supporting MockAjax
 * Author: Adam Smith (adamsmith@algorithmiv.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/docs/license) */

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

(function(mockModuleAPI, undefined) {

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
   * Global Method (aIV.mockAjax)
   * ---------------------------------------------------
   * @desc Initializes the aIV MockAjax class for the question management app's
   *   example (designed to avoid the need of a test server environment).
   * @type {!MockAjax}
   * @global
   */
  aIV.mockAjax = new mockModuleAPI.MockAjax([ mockModuleAPI.ajaxResults ]);

})(

////////////////////////////////////////////////////////////////////////////////
// The MockAjax Module Start
////////////////////////////////////////////////////////////////////////////////

(function(undefined) {

////////////////////////////////////////////////////////////////////////////////
// The MockAjax Module Helpers
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// The MockAjax Module API & MockAjax Class
////////////////////////////////////////////////////////////////////////////////

  /**
   * -----------------------------------------------------
   * Public Variable (mockModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the mock module's public properties and methods.
   * @type {!Object<string, *>}
   * @struct
   */
  var mockModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Class (mockModuleAPI.MockAjax)
   * -----------------------------------------------------
   * @desc Mocks the XMLHttpRequest class for testing.
   * @param {Array<ajaxResults>=} results - .
   * @param {ajaxResults=} defaults - .
   * @constructor
   */
  mockModuleAPI.MockAjax = (function setup_MockAjax(/** function */ orgXMLHttpRequest) {

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

////////////////////////////////////////////////////////////////////////////////
// The Example words.json Resource
////////////////////////////////////////////////////////////////////////////////

  /**
   * -----------------------------------------------
   * Public Property (exampleResource)
   * -----------------------------------------------
   * @desc Contains the example resource data.
   * @type {(!Object|string)}
   */
  var exampleResource = JSON.stringify({
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
// The Results Param For The Example's MockAjax Use
////////////////////////////////////////////////////////////////////////////////

  /**
   * -----------------------------------------------------
   * Public Variable (mockModuleAPI.ajaxResults)
   * -----------------------------------------------------
   * @desc Holds the example's MockAjax results parameter.
   * @type {!ajaxResults}
   */
  mockModuleAPI.ajaxResults = {
    responseText: exampleResource,
    status      : 200,
    statusText  : '200 OK'
  };

////////////////////////////////////////////////////////////////////////////////
// The MockAjax Module End
////////////////////////////////////////////////////////////////////////////////

  return mockModuleAPI;

})());