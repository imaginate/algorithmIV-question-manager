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

      prettify.debug.start('prepareLines', solution);
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

        line = prepareLine(lines[i]);

        if (line) {
          line = highlightSyntax(line, i);
        }

        lines[i] = '<li>'+ line +'</li>';

        prettify.debug.state('applyFormatting', 'lines[i]= $$', lines[i]);
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
     * @param {number} i - The current line number for the debug group.
     * @return {string}
     * @private
     */
    var highlightSyntax = (function() {

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
      var highlightSyntax = {
        debug: aIV.debug({
          classTitle     : 'highlightSyntax',
          turnOnDebuggers: 'args fail'
        })
      };

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

        i = 0;

        if (commentOpen) {
          i = formatCommentStart();
        }

        --i;
        while (++i < lineLen) {
          format = ( ( router.hasOwnProperty(orgline[i]) ) ?
            router[ orgline[i] ] : identifierStart.test(orgline[i]) ?
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

          if (i !== lastIndex && orgLine[i] === '*' && orgLine[i + 1] === '/') {
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

        name = '_' + orgLine[i] + '_';

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
        highlightSyntax.debug.start('formatCommentLinks', start);
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

          i += start;

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
          newLine[i] = '<a href="' + href + '">' + content + '</a>';

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
        i = (i < lastindex) ? skipComment(i) : ++i;

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
        commentOpen = (i < lastIndex) ? false : true;

        if (i > lastIndex) {
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if (config.commentLinks) {
          formatCommentLinks(0, i);
        }

        return ++i;
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
          keyClassName = keywordsCategories[catID];

          // Special case for the function keyword
          if (identifier.name === '_function_' &&
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

      return function(line, i) {

        // Debugging vars
        var msg;
        msg = 'lineNumber= $$';
        highlightSyntax.debug.group('init', 'coll', msg, i);
        highlightSyntax.debug.start('init', line, i);
        highlightSyntax.debug.args('init', line, 'string', i, 'number');

        prepareLine(line);
        formatLine();

        highlightSyntax.debug.group('init', 'end');

        return newLine.join('');
      };
    })();

    return function(solution) {

      prettify.debug.group('init', 'coll', 'solution= $$', solution);
      prettify.debug.start('init', solution);
      prettify.debug.args('init', solution, 'string');

      /** @type {{ result: string, lineCount: number }} */
      var result;

      // Format the solution
      result = applyFormatting( prepareLines(solution) );

      prettify.debug.group('init', 'end');

      return result;
    };
  })();
