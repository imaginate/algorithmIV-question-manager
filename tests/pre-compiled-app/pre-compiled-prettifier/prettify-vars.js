    /**
     * ---------------------------------------------------
     * Public Property (prettify.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the prettifier.
     * @type {Debug}
     */
    var prettify = {
      debug: aIV.debug({
        classTitle     : 'prettify',
        turnOnDebuggers: 'args fail'
      })
    };

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
      _class_   : makeKeywordObj('def', ''),
      _const_   : makeKeywordObj('def', ''),
      _function_: makeKeywordObj('def', ''),
      _var_     : makeKeywordObj('def', ''),

      // Reserved Keywords
      _abstract_    : makeKeywordObj('res', ''),
      _arguments_   : makeKeywordObj('res', ''),
      _boolean_     : makeKeywordObj('res', ''),
      _break_       : makeKeywordObj('res', ''),
      _byte_        : makeKeywordObj('res', ''),
      _case_        : makeKeywordObj('res', ''),
      _catch_       : makeKeywordObj('res', ''),
      _char_        : makeKeywordObj('res', ''),
      _continue_    : makeKeywordObj('res', ''),
      _debugger_    : makeKeywordObj('res', ''),
      _default_     : makeKeywordObj('res', ''),
      _delete_      : makeKeywordObj('res', ''),
      _do_          : makeKeywordObj('res', ''),
      _double_      : makeKeywordObj('res', ''),
      _else_        : makeKeywordObj('res', ''),
      _enum_        : makeKeywordObj('res', ''),
      _export_      : makeKeywordObj('res', ''),
      _extends_     : makeKeywordObj('res', ''),
      _final_       : makeKeywordObj('res', ''),
      _finally_     : makeKeywordObj('res', ''),
      _float_       : makeKeywordObj('res', ''),
      _for_         : makeKeywordObj('res', ''),
      _goto_        : makeKeywordObj('res', ''),
      _if_          : makeKeywordObj('res', ''),
      _implements_  : makeKeywordObj('res', ''),
      _import_      : makeKeywordObj('res', ''),
      _in_          : makeKeywordObj('res', ''),
      _instanceof_  : makeKeywordObj('res', ''),
      _int_         : makeKeywordObj('res', ''),
      _interface_   : makeKeywordObj('res', ''),
      _item_        : makeKeywordObj('res', ''),
      _let_         : makeKeywordObj('res', ''),
      _long_        : makeKeywordObj('res', ''),
      _native_      : makeKeywordObj('res', ''),
      _new_         : makeKeywordObj('res', ''),
      _package_     : makeKeywordObj('res', ''),
      _private_     : makeKeywordObj('res', ''),
      _protected_   : makeKeywordObj('res', ''),
      _public_      : makeKeywordObj('res', ''),
      _return_      : makeKeywordObj('res', ''),
      _short_       : makeKeywordObj('res', ''),
      _static_      : makeKeywordObj('res', ''),
      _super_       : makeKeywordObj('res', ''),
      _switch_      : makeKeywordObj('res', ''),
      _synchronized_: makeKeywordObj('res', ''),
      _this_        : makeKeywordObj('res', ''),
      _throw_       : makeKeywordObj('res', ''),
      _throws_      : makeKeywordObj('res', ''),
      _transient_   : makeKeywordObj('res', ''),
      _try_         : makeKeywordObj('res', ''),
      _typeof_      : makeKeywordObj('res', ''),
      _void_        : makeKeywordObj('res', ''),
      _volatile_    : makeKeywordObj('res', ''),
      _while_       : makeKeywordObj('res', ''),
      _with_        : makeKeywordObj('res', ''),
      _yield_       : makeKeywordObj('res', ''),

      // Native Objects & Methods
      _apply_               : makeKeywordObj('nat', ''),
      _Array_               : makeKeywordObj('nat', '', true),
      _ArrayBuffer_         : makeKeywordObj('nat', '', true),
      _bind_                : makeKeywordObj('nat', ''),
      _Boolean_             : makeKeywordObj('nat', ''),
      _call_                : makeKeywordObj('nat', ''),
      _charAt_              : makeKeywordObj('nat', ''),
      _charCodeAt_          : makeKeywordObj('nat', ''),
      _clearInterval_       : makeKeywordObj('nat', ''),
      _clearTimeout_        : makeKeywordObj('nat', ''),
      _concat_              : makeKeywordObj('nat', ''),
      _constructor_         : makeKeywordObj('nat', ''),
      _DataView_            : makeKeywordObj('nat', ''),
      _Date_                : makeKeywordObj('nat', '', true),
      _decodeURI_           : makeKeywordObj('nat', ''),
      _decodeURIComponent_  : makeKeywordObj('nat', ''),
      _encodeURI_           : makeKeywordObj('nat', ''),
      _encodeURIComponent_  : makeKeywordObj('nat', ''),
      _Error_               : makeKeywordObj('nat', ''),
      _escape_              : makeKeywordObj('nat', ''),
      _eval_                : makeKeywordObj('nat', ''),
      _EvalError_           : makeKeywordObj('nat', ''),
      _every_               : makeKeywordObj('nat', ''),
      _filter_              : makeKeywordObj('nat', ''),
      _forEach_             : makeKeywordObj('nat', ''),
      _fromCharCode_        : makeKeywordObj('nat', ''),
      _Function_            : makeKeywordObj('nat', ''),
      _Generator_           : makeKeywordObj('nat', ''),
      _GeneratorFunction_   : makeKeywordObj('nat', ''),
      _getDate_             : makeKeywordObj('nat', ''),
      _getDay_              : makeKeywordObj('nat', ''),
      _getFullYear_         : makeKeywordObj('nat', ''),
      _getHours_            : makeKeywordObj('nat', ''),
      _getMilliseconds_     : makeKeywordObj('nat', ''),
      _getMinutes_          : makeKeywordObj('nat', ''),
      _getMonth_            : makeKeywordObj('nat', ''),
      _getSeconds_          : makeKeywordObj('nat', ''),
      _getTime_             : makeKeywordObj('nat', ''),
      _getTimezoneOffset_   : makeKeywordObj('nat', ''),
      _getUTCDate_          : makeKeywordObj('nat', ''),
      _getUTCDay_           : makeKeywordObj('nat', ''),
      _getUTCFullYear_      : makeKeywordObj('nat', ''),
      _getUTCHours_         : makeKeywordObj('nat', ''),
      _getUTCMilliseconds_  : makeKeywordObj('nat', ''),
      _getUTCMinutes_       : makeKeywordObj('nat', ''),
      _getUTCMonth_         : makeKeywordObj('nat', ''),
      _getUTCSeconds_       : makeKeywordObj('nat', ''),
      _getYear_             : makeKeywordObj('nat', ''),
      _hasOwnProperty_      : makeKeywordObj('nat', ''),
      _indexOf_             : makeKeywordObj('nat', ''),
      _isFinite_            : makeKeywordObj('nat', ''),
      _isNaN_               : makeKeywordObj('nat', ''),
      _isPrototypeOf_       : makeKeywordObj('nat', ''),
      _join_                : makeKeywordObj('nat', ''),
      _JSON_                : makeKeywordObj('nat', '', true),
      _lastIndexOf_         : makeKeywordObj('nat', ''),
      _length_              : makeKeywordObj('nat', ''),
      _map_                 : makeKeywordObj('nat', ''),
      _match_               : makeKeywordObj('nat', ''),
      _Math_                : makeKeywordObj('nat', '', true),
      _Number_              : makeKeywordObj('nat', '', true),
      _Object_              : makeKeywordObj('nat', '', true),
      _parse_               : makeKeywordObj('nat', ''),
      _parseFloat_          : makeKeywordObj('nat', ''),
      _parseInt_            : makeKeywordObj('nat', ''),
      _pop_                 : makeKeywordObj('nat', ''),
      _preference_          : makeKeywordObj('nat', ''),
      _print_               : makeKeywordObj('nat', ''),
      _propertyIsEnumerable_: makeKeywordObj('nat', ''),
      _prototype_           : makeKeywordObj('nat', ''),
      _push_                : makeKeywordObj('nat', ''),
      _RegExp_              : makeKeywordObj('nat', ''),
      _replace_             : makeKeywordObj('nat', ''),
      _reset_               : makeKeywordObj('nat', ''),
      _resizeBy_            : makeKeywordObj('nat', ''),
      _resizeTo_            : makeKeywordObj('nat', ''),
      _reverse_             : makeKeywordObj('nat', ''),
      _search_              : makeKeywordObj('nat', ''),
      _setDate_             : makeKeywordObj('nat', ''),
      _setFullYear_         : makeKeywordObj('nat', ''),
      _setHours_            : makeKeywordObj('nat', ''),
      _setMilliseconds_     : makeKeywordObj('nat', ''),
      _setInterval_         : makeKeywordObj('nat', ''),
      _setMinutes_          : makeKeywordObj('nat', ''),
      _setMonth_            : makeKeywordObj('nat', ''),
      _setSeconds_          : makeKeywordObj('nat', ''),
      _setTime_             : makeKeywordObj('nat', ''),
      _setTimeout_          : makeKeywordObj('nat', ''),
      _setUTCDate_          : makeKeywordObj('nat', ''),
      _setUTCFullYear_      : makeKeywordObj('nat', ''),
      _setUTCHours_         : makeKeywordObj('nat', ''),
      _setUTCMilliseconds_  : makeKeywordObj('nat', ''),
      _setUTCMinutes_       : makeKeywordObj('nat', ''),
      _setUTCMonth_         : makeKeywordObj('nat', ''),
      _setUTCSeconds_       : makeKeywordObj('nat', ''),
      _setYear_             : makeKeywordObj('nat', ''),
      _shift_               : makeKeywordObj('nat', ''),
      _slice_               : makeKeywordObj('nat', ''),
      _some_                : makeKeywordObj('nat', ''),
      _sort_                : makeKeywordObj('nat', ''),
      _splice_              : makeKeywordObj('nat', ''),
      _split_               : makeKeywordObj('nat', ''),
      _String_              : makeKeywordObj('nat', '', true),
      _substr_              : makeKeywordObj('nat', ''),
      _substring_           : makeKeywordObj('nat', ''),
      _Symbol_              : makeKeywordObj('nat', '', true),
      _test_                : makeKeywordObj('nat', ''),
      _toGMTString_         : makeKeywordObj('nat', ''),
      _toLocaleString_      : makeKeywordObj('nat', ''),
      _toLowerCase_         : makeKeywordObj('nat', ''),
      _toSource_            : makeKeywordObj('nat', ''),
      _toString_            : makeKeywordObj('nat', ''),
      _toUpperCase_         : makeKeywordObj('nat', ''),
      _toUTCString_         : makeKeywordObj('nat', ''),
      _TypedArray_          : makeKeywordObj('nat', '', true),
      _unescape_            : makeKeywordObj('nat', ''),
      _unshift_             : makeKeywordObj('nat', ''),
      _unwatch_             : makeKeywordObj('nat', ''),
      _UTC_                 : makeKeywordObj('nat', ''),
      _valueOf_             : makeKeywordObj('nat', ''),
      _watch_               : makeKeywordObj('nat', ''),
      _write_               : makeKeywordObj('nat', ''),
      _writeln_             : makeKeywordObj('nat', ''),

      // Values
      _false_    : makeKeywordObj('val', ''),
      _Infinity_ : makeKeywordObj('val', ''),
      _Nan_      : makeKeywordObj('val', ''),
      _null_     : makeKeywordObj('val', ''),
      _true_     : makeKeywordObj('val', ''),
      _undefined_: makeKeywordObj('val', ''),

      // Client Objects & Methods
      _alert_                 : makeKeywordObj('cli', ''),
      _anchor_                : makeKeywordObj('cli', ''),
      _anchors_               : makeKeywordObj('cli', ''),
      _appendChild_           : makeKeywordObj('cli', ''),
      _area_                  : makeKeywordObj('cli', ''),
      _assign_                : makeKeywordObj('cli', ''),
      _back_                  : makeKeywordObj('cli', ''),
      _big_                   : makeKeywordObj('cli', ''),
      _blink_                 : makeKeywordObj('cli', ''),
      _blur_                  : makeKeywordObj('cli', ''),
      _body_                  : makeKeywordObj('cli', ''),
      _bold_                  : makeKeywordObj('cli', ''),
      _button_                : makeKeywordObj('cli', ''),
      _byteToString_          : makeKeywordObj('cli', ''),
      _captureEvents_         : makeKeywordObj('cli', ''),
      _checkbox_              : makeKeywordObj('cli', ''),
      _className_             : makeKeywordObj('cli', ''),
      _click_                 : makeKeywordObj('cli', ''),
      _clientHeight_          : makeKeywordObj('cli', ''),
      _clientInformation_     : makeKeywordObj('cli', ''),
      _clientWidth_           : makeKeywordObj('cli', ''),
      _close_                 : makeKeywordObj('cli', ''),
      _closed_                : makeKeywordObj('cli', ''),
      _confirm_               : makeKeywordObj('cli', ''),
      _console_               : makeKeywordObj('cli', ''),
      _createElement_         : makeKeywordObj('cli', ''),
      _crypto_                : makeKeywordObj('cli', ''),
      _defaultStatus_         : makeKeywordObj('cli', ''),
      _disableExternalCapture_: makeKeywordObj('cli', ''),
      _document_              : makeKeywordObj('cli', ''),
      _element_               : makeKeywordObj('cli', ''),
      _elements_              : makeKeywordObj('cli', ''),
      _embed_                 : makeKeywordObj('cli', ''),
      _embeds_                : makeKeywordObj('cli', ''),
      _enableExternalCapture_ : makeKeywordObj('cli', ''),
      _event_                 : makeKeywordObj('cli', ''),
      _fileUpload_            : makeKeywordObj('cli', ''),
      _find_                  : makeKeywordObj('cli', ''),
      _fixed_                 : makeKeywordObj('cli', ''),
      _focus_                 : makeKeywordObj('cli', ''),
      _fontcolor_             : makeKeywordObj('cli', ''),
      _fontsize_              : makeKeywordObj('cli', ''),
      _form_                  : makeKeywordObj('cli', ''),
      _forms_                 : makeKeywordObj('cli', ''),
      _forward_               : makeKeywordObj('cli', ''),
      _frame_                 : makeKeywordObj('cli', ''),
      _frames_                : makeKeywordObj('cli', ''),
      _frameRate_             : makeKeywordObj('cli', ''),
      _getComputedStyle_      : makeKeywordObj('cli', ''),
      _getElementById_        : makeKeywordObj('cli', ''),
      _getElementsByClassName_: makeKeywordObj('cli', ''),
      _getElementsByTagName_  : makeKeywordObj('cli', ''),
      _getOptionValueCount_   : makeKeywordObj('cli', ''),
      _getOptionValue_        : makeKeywordObj('cli', ''),
      _getPropertyValue_      : makeKeywordObj('cli', ''),
      _getSelection_          : makeKeywordObj('cli', ''),
      _go_                    : makeKeywordObj('cli', ''),
      _handleEvent_           : makeKeywordObj('cli', ''),
      _hidden_                : makeKeywordObj('cli', ''),
      _history_               : makeKeywordObj('cli', ''),
      _home_                  : makeKeywordObj('cli', ''),
      _id_                    : makeKeywordObj('cli', ''),
      _image_                 : makeKeywordObj('cli', ''),
      _ImageData_             : makeKeywordObj('cli', ''),
      _images_                : makeKeywordObj('cli', ''),
      _innerHeight_           : makeKeywordObj('cli', ''),
      _innerHTML_             : makeKeywordObj('cli', ''),
      _innerWidth_            : makeKeywordObj('cli', ''),
      _italics_               : makeKeywordObj('cli', ''),
      _javaEnabled_           : makeKeywordObj('cli', ''),
      _layer_                 : makeKeywordObj('cli', ''),
      _layers_                : makeKeywordObj('cli', ''),
      _link_                  : makeKeywordObj('cli', ''),
      _location_              : makeKeywordObj('cli', ''),
      _mimeTypes_             : makeKeywordObj('cli', ''),
      _moveAbove_             : makeKeywordObj('cli', ''),
      _moveBelow_             : makeKeywordObj('cli', ''),
      _moveBy_                : makeKeywordObj('cli', ''),
      _moveTo_                : makeKeywordObj('cli', ''),
      _moveToAbsolute_        : makeKeywordObj('cli', ''),
      _navigate_              : makeKeywordObj('cli', ''),
      _navigator_             : makeKeywordObj('cli', ''),
      _offscreenBuffering_    : makeKeywordObj('cli', ''),
      _offsetHeight_          : makeKeywordObj('cli', ''),
      _offsetWidth_           : makeKeywordObj('cli', ''),
      _open_                  : makeKeywordObj('cli', ''),
      _opener_                : makeKeywordObj('cli', ''),
      _options_               : makeKeywordObj('cli', ''),
      _outerHeight_           : makeKeywordObj('cli', ''),
      _outerWidth_            : makeKeywordObj('cli', ''),
      _packages_              : makeKeywordObj('cli', ''),
      _pageXOffset_           : makeKeywordObj('cli', ''),
      _pageYOffset_           : makeKeywordObj('cli', ''),
      _parent_                : makeKeywordObj('cli', ''),
      _password_              : makeKeywordObj('cli', ''),
      _pkcs11_                : makeKeywordObj('cli', ''),
      _plugins_               : makeKeywordObj('cli', ''),
      _prompt_                : makeKeywordObj('cli', ''),
      _propertyIsEnum_        : makeKeywordObj('cli', ''),
      _radio_                 : makeKeywordObj('cli', ''),
      _refresh_               : makeKeywordObj('cli', ''),
      _releaseEvents_         : makeKeywordObj('cli', ''),
      _reload_                : makeKeywordObj('cli', ''),
      _removeChild_           : makeKeywordObj('cli', ''),
      _routeEvent_            : makeKeywordObj('cli', ''),
      _screen_                : makeKeywordObj('cli', ''),
      _screenX_               : makeKeywordObj('cli', ''),
      _screenY_               : makeKeywordObj('cli', ''),
      _scroll_                : makeKeywordObj('cli', ''),
      _scrollBy_              : makeKeywordObj('cli', ''),
      _scrollTo_              : makeKeywordObj('cli', ''),
      _secure_                : makeKeywordObj('cli', ''),
      _select_                : makeKeywordObj('cli', ''),
      _self_                  : makeKeywordObj('cli', ''),
      _small_                 : makeKeywordObj('cli', ''),
      _status_                : makeKeywordObj('cli', ''),
      _stop_                  : makeKeywordObj('cli', ''),
      _strike_                : makeKeywordObj('cli', ''),
      _style_                 : makeKeywordObj('cli', ''),
      _submit_                : makeKeywordObj('cli', ''),
      _sup_                   : makeKeywordObj('cli', ''),
      _taint_                 : makeKeywordObj('cli', ''),
      _taintEnabled_          : makeKeywordObj('cli', ''),
      _text_                  : makeKeywordObj('cli', ''),
      _textContent_           : makeKeywordObj('cli', ''),
      _textarea_              : makeKeywordObj('cli', ''),
      _top_                   : makeKeywordObj('cli', ''),
      _untaint_               : makeKeywordObj('cli', ''),
      _window_                : makeKeywordObj('cli', ''),

      // jQuery Objects
      _$_     : makeKeywordObj('jqu', ''),
      _jQuery_: makeKeywordObj('jqu', '')
    };

    Object.freeze(keywords);

    ////////////////////////////////////////////////////////////////////////////
    // Setup the keyword properties

    // Array
    keywords._Array_.props._from_    = makePropObj('');
    keywords._Array_.props._isArray_ = makePropObj('');
    keywords._Array_.props._observe_ = makePropObj('');
    keywords._Array_.props._of_      = makePropObj('');
    Object.freeze(keywords._Array_.props);

    // ArrayBuffer
    keywords._ArrayBuffer_.props._isView_   = makePropObj('');
    keywords._ArrayBuffer_.props._transfer_ = makePropObj('');
    Object.freeze(keywords._ArrayBuffer_.props);

    // Date
    keywords._Date_.props._UTC_   = makePropObj('');
    keywords._Date_.props._now_   = makePropObj('');
    keywords._Date_.props._parse_ = makePropObj('');
    Object.freeze(keywords._Date_.props);

    // JSON
    keywords._JSON_.props._parse_     = makePropObj('');
    keywords._JSON_.props._stringify_ = makePropObj('');
    Object.freeze(keywords._JSON_.props);

    // Math
    keywords._Math_.props._abs_    = makePropObj('');
    keywords._Math_.props._acos_   = makePropObj('');
    keywords._Math_.props._asin_   = makePropObj('');
    keywords._Math_.props._atan_   = makePropObj('');
    keywords._Math_.props._atan2_  = makePropObj('');
    keywords._Math_.props._ceil_   = makePropObj('');
    keywords._Math_.props._cos_    = makePropObj('');
    keywords._Math_.props._exp_    = makePropObj('');
    keywords._Math_.props._floor_  = makePropObj('');
    keywords._Math_.props._log_    = makePropObj('');
    keywords._Math_.props._max_    = makePropObj('');
    keywords._Math_.props._min_    = makePropObj('');
    keywords._Math_.props._pow_    = makePropObj('');
    keywords._Math_.props._random_ = makePropObj('');
    keywords._Math_.props._round_  = makePropObj('');
    keywords._Math_.props._sin_    = makePropObj('');
    keywords._Math_.props._sqrt_   = makePropObj('');
    keywords._Math_.props._tan_    = makePropObj('');
    Object.freeze(keywords._Math_.props);

    // Number
    keywords._Number_.props._EPSILON_           = makePropObj('');
    keywords._Number_.props._isNaN_             = makePropObj('');
    keywords._Number_.props._isFinite_          = makePropObj('');
    keywords._Number_.props._isInteger_         = makePropObj('');
    keywords._Number_.props._isSafeInteger_     = makePropObj('');
    keywords._Number_.props._MAX_SAFE_INTEGER_  = makePropObj('');
    keywords._Number_.props._MAX_VALUE_         = makePropObj('');
    keywords._Number_.props._MIN_SAFE_INTEGER_  = makePropObj('');
    keywords._Number_.props._MIN_VALUE_         = makePropObj('');
    keywords._Number_.props._NaN_               = makePropObj('');
    keywords._Number_.props._NEGATIVE_INFINITY_ = makePropObj('');
    keywords._Number_.props._parseFloat_        = makePropObj('');
    keywords._Number_.props._parseInt_          = makePropObj('');
    keywords._Number_.props._POSITIVE_INFINITY_ = makePropObj('');
    Object.freeze(keywords._Number_.props);

    // Object
    keywords._Object_.props._assign_                   = makePropObj('');
    keywords._Object_.props._create_                   = makePropObj('');
    keywords._Object_.props._defineProperty_           = makePropObj('');
    keywords._Object_.props._defineProperties_         = makePropObj('');
    keywords._Object_.props._freeze_                   = makePropObj('');
    keywords._Object_.props._getOwnPropertyDescriptor_ = makePropObj('');
    keywords._Object_.props._getOwnPropertyNames_      = makePropObj('');
    keywords._Object_.props._getOwnPropertySymbols_    = makePropObj('');
    keywords._Object_.props._getPrototypeOf_           = makePropObj('');
    keywords._Object_.props._is_                       = makePropObj('');
    keywords._Object_.props._isExtensible_             = makePropObj('');
    keywords._Object_.props._isFrozen_                 = makePropObj('');
    keywords._Object_.props._isSealed_                 = makePropObj('');
    keywords._Object_.props._keys_                     = makePropObj('');
    keywords._Object_.props._observe_                  = makePropObj('');
    keywords._Object_.props._preventExtensions_        = makePropObj('');
    keywords._Object_.props._seal_                     = makePropObj('');
    keywords._Object_.props._setPrototypeOf_           = makePropObj('');
    Object.freeze(keywords._Object_.props);

    // String
    keywords._String_.props._fromCharCode_  = makePropObj('');
    keywords._String_.props._fromCodePoint_ = makePropObj('');
    keywords._String_.props._raw_           = makePropObj('');
    Object.freeze(keywords._String_.props);

    // Symbol
    keywords._Symbol_.props._for_    = makePropObj('');
    keywords._Symbol_.props._keyFor_ = makePropObj('');
    Object.freeze(keywords._Symbol_.props);

    // TypedArray
    keywords._TypedArray_.props._BYTES_PER_ELEMENT_ = makePropObj('');
    keywords._TypedArray_.props._from_              = makePropObj('');
    keywords._TypedArray_.props._name_              = makePropObj('');
    keywords._TypedArray_.props._of_                = makePropObj('');
    Object.freeze(keywords._TypedArray_.props);

    // console
    keywords._console_.props._assert_         = makePropObj('');
    keywords._console_.props._group_          = makePropObj('');
    keywords._console_.props._groupCollapsed_ = makePropObj('');
    keywords._console_.props._groupEnd_       = makePropObj('');
    keywords._console_.props._log_            = makePropObj('');
    keywords._console_.props._trace_          = makePropObj('');
    Object.freeze(keywords._console_.props);

    // ImageData
    keywords._ImageData_.props._data_   = makePropObj('');
    keywords._ImageData_.props._height_ = makePropObj('');
    keywords._ImageData_.props._width_  = makePropObj('');
    Object.freeze(keywords._ImageData_.props);
