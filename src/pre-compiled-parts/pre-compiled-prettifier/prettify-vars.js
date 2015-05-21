
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

