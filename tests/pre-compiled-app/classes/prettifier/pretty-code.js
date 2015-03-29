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
     * Private Variable (htmlEntity)
     * ---------------------------------------------
     * the characters to replace with a html entity
     * @const
     * @type {Object}
     * @private
     */
    var htmlEntity = {
      '<': '&lt;',
      '>': '&gt;'
    };

    /**
     * ---------------------------------------------
     * Private Variable (preRegex)
     * ---------------------------------------------
     * characters that if preceding a '/' could be a
        regular expression
     * the characters 'n', 'e', and 'f' are evaluated
        for the following possible keywords 'return',
        'case', 'typeof', 'instanceof', and 'in'
     * @const
     * @type {Object}
     * @private
     */
    var preRegex = /[\(\)\[\{\};\*\/%\+\-<>&\^\|=!:\?nef]/;

    /**
     * ---------------------------------------------
     * Private Variable (regexFlags)
     * ---------------------------------------------
     * the flags for js regular expressions
     * @const
     * @type {Object}
     * @private
     */
    var regexFlags = /[gimy]/;

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * list of valid plain number characters
     * @const
     * @type {Object}
     * @private
     */
    var plainNumbers = /[0-9\.]/;

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * list of valid hex number characters
     * @const
     * @type {Object}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * list of valid starting identifier characters
     * @const
     * @type {Object}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * list of valid identifier characters
     * @const
     * @type {Object}
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
        '-every'              : { cat: 'nat', props: null },
        '-filter'             : { cat: 'nat', props: null },
        '-forEach'            : { cat: 'nat', props: null },
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
        '-map'                : { cat: 'nat', props: null },
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
        '-some'               : { cat: 'nat', props: null },
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
        // Set line padding and highlight syntax
        if (!line.empty) {
          line.padding = setPadding(line.first, line.last);
          line.code = HighlightSyntax.init(line.code, i);
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
        init: function (l, i) {
          // OPEN: HighlightSyntax Group
          DEBUG.HighlightSyntax.group && console.groupCollapsed(
            'GROUP: HighlightSyntax ' +
            'Note: lineNumber= %d', (i + 1)
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
       * Private Variable (lLen)
       * ---------------------------------------------
       * the length of the line of code
       * @type {number}
       * @private
       */
      var lLen;

      /**
       * ---------------------------------------------
       * Private Variable (lLast)
       * ---------------------------------------------
       * the last index of the line of code
       * @type {number}
       * @private
       */
      var lLast;

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
          // Declare function variables
          var preceding, end;
          // If (line comment)
          if (line[i + 1] === '/') {
            return formatLineComment(i);
          }
          // If (comment opening)
          if (line[i + 1] === '*') {
            return formatCommentOpen(i);
          }
          // Save preceding character
          preceding = ( (line[i - 1] === ' ') ?
            line[i - 2] : line[i - 1]
          );
          // If (regex statement)
          if (i === 0 || preRegex.test(preceding)) {
            end = isRegex(i);
            if (end > 0) {
              return formatRegex(i, end);
            }
          }
          return formatOperator(i);
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
        // Save line array length and last index
        lLen = line.length;
        lLast = (lLen > 0) ? lLen - 1 : 0;
        // Debugger
        DEBUG.HighlightSyntax.state && console.log(
          'STATE: HighlightSyntax.init() ' +
          'Note: lLen= %d, lLast= %d', lLen, lLast
        );
        // Save copy of line array
        // for final output
        newLine = line.slice(0);
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
          if (i === lLen) {
            return newLine.join('');
          }
        }
        // Find and label comments, strings,
        // regexs, spaces, brackets, operators,
        // commas, semicolons, colons, periods,
        // numbers, keywords, identifiers, and
        // miscellaneous
        for(; i<lLen; i++) {
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
       * Private Method (isRegex)
       * ---------------------------------------------
       * if given index is a regex it returns the end
       *  index of the regex otherwise it returns 0
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function isRegex(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.isRegex(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.isRegex() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var end, regexBody;
        // Set end to start
        end = i;
        // Find regex end index
        while (true) {
          ++end;
          // If (line terminates)
          // Then {return fail}
          if (end >= lLen) {
            return 0;
          }
          // Sanitize the character
          sanitizeCharacter(end);
          // If (escaped character)
          // Then {skip ahead}
          if (line[end] === '\\') {
            ++end;
            continue;
          }
          // If (end of regex body)
          // Then {end loop}
          if (line[end] === '/') {
            break;
          }
        }
        // Save body of potential regex
        regexBody = line.slice(++i, end).join('');
        // If (not regex)
        // Then {set end to fail}
        end = ( !RegExp(regexBody) ) ? 0 : end;
        return end;
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
        // Declare method variables
        var c;
        // Save character
        c = line[i];
        // If (html entity property exists)
        // Then {replace the character in the new line with it}
        if (!!htmlEntity[c]) {
          newLine[i] = htmlEntity[c];
        };
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
          if (i >= lLen) {
            return i;
          }
          // Sanitize the character
          sanitizeCharacter(i);
          // If (comment ends)
          // Then {return index}
          if (i !== lLast) {
            if (line[i] === '*' &&
                line[i + 1] === '/') {
              return ++i;
            }
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
        var s;
        // Save string type
        s = line[i];
        // Find string end
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return last index}
          if (i >= lLen) {
            return lLast;
          }
          // Sanitize the character
          sanitizeCharacter(i);
          // If (escaped character)
          // Then {skip ahead}
          if (line[i] === '\\') {
            ++i;
            continue;
          }
          // If (end of string)
          // Then {return the index}
          if (line[i] === s) {
            return i;
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
          if (i === lLast) {
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
          if (i === lLast) {
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
        // Increase index
        ++i;
        // Move index to end of comment
        i = (i < lLast) ? skipComment(i) : ++i;
        // If (comment not closed by line end)
        if (i >= lLen) {
          // Set commentOpen to true
          commentOpen = true;
          // Move index to last value
          i = lLast;
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
        newLine[i]  = (line[i] === '*') ? ' ' : '';
        newLine[i] += '<span class="cmt">' + line[i];
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
        if (i < lLen) {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[i] += '</span>';
          // Move index to next value
          ++i;
        }
        else {
          // Add closing span to line end
          newLine[lLast] += '</span>';
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
        i = lLast;
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
       * param: the last index of regex (number)
       * @type {function(number): number}
       * @private
       */
      function formatRegex(i, end) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatRegex(%d, %d)', i, end
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          (typeof i   === 'number' &&
           typeof end === 'number'),
          'FAIL: HighlightSyntax.formatRegex() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var usedFlags, c;
        // Add regex span
        newLine[i] = '<span class="rgx">/';
        // Move index to the closing forward slash
        i = end;
        // Start empty string to contain
        //  each used regex flags
        usedFlags = '';
        // Check for regex flags after
        //  closing forward slash
        loop:
        while (true) {
          c = line[i + 1];
          if (regexFlags.test(c) &&
              usedFlags.indexOf(c) === -1) {
            usedFlags += c;
            ++i;
            if (usedFlags.length === 4) {
              break loop;
            }
          }
          break loop;
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
        // Sanitize the character
        sanitizeCharacter(i);
        // Add operator spans
        newLine[i] = '' +
        '<span class="opr">' +
          newLine[i] +
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
