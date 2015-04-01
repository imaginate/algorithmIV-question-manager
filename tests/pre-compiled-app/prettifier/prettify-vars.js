    /**
     * ---------------------------------------------------
     * Public Property (prettify.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the prettifier.
     * @type {Debug}
     */
    prettify.debug = aIV.debug({
      classTitle     : 'prettify',
      turnOnDebuggers: 'args fail'
    });

    /**
     * ---------------------------------------------
     * Private Variable (htmlEntity)
     * ---------------------------------------------
     * @desc The characters to replace with a html entity
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
     * @desc The characters that if preceding a '/' could be a
     *   regular expression. The characters 'n', 'e', and 'f' are
     *   evaluated for the following possible keywords 'return',
     *   'case', 'typeof', 'instanceof', and 'in'.
     * @const
     * @type {Object}
     * @private
     */
    var preRegex = /[\(\)\[\{\};\*\/%\+\-<>&\^\|=!:\?nef]/;

    /**
     * ---------------------------------------------
     * Private Variable (regexFlags)
     * ---------------------------------------------
     * @desc The flags for js regular expressions.
     * @const
     * @type {Object}
     * @private
     */
    var regexFlags = /[gimy]/;

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * @desc List of valid plain number characters.
     * @const
     * @type {Object}
     * @private
     */
    var plainNumbers = /[0-9\.]/;

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * @desc List of valid hex number characters.
     * @const
     * @type {Object}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * @desc List of valid starting identifier characters.
     * @const
     * @type {Object}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * @desc List of valid identifier characters.
     * @const
     * @type {Object}
     * @private
     */
    var identifiers = /[a-z0-9_\$]/i;

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
     * Private Variable (keywords)
     * ---------------------------------------------
     * @desc A hash map of keyword categories and keyword objects/
     *   methods containing their category and properties.
     * @const
     * @type {{
     *   categories: stringMap,
     *   objects   : objectMap
     * }}
     * @private
     */
    var keywords = {
      categories: {
        def: 'defKey', // Defining Keywords
        res: 'resKey', // Reserved Keywords
        nat: 'natKey', // Native Objects
        val: 'valKey', // Values
        cli: 'cliKey', // Client Objects
        jqu: 'jquKey'  // jQuery Objects
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
        '-freeze'             : { cat: 'nat', props: null },
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
        '-keys'               : { cat: 'nat', props: null },
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
        '-propertyIsEnumerable': { cat: 'nat', props: null },
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
