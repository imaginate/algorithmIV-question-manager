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
        }
        else {
          errorMsg = 'Your aIV.app resource - resources/' + jsonFile + '.json - ';
          errorMsg += 'failed to load. Please ensure your resources folder ';
          errorMsg += 'is in the same directory as algorithmIV-app.js. ';
          errorMsg += 'XMLHttpRequest.statusText= ' + http.statusText;
          throw new Error(errorMsg);
        }
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
   * Public Method (makeOptElem)
   * ---------------------------------------------------
   * @desc A helper function that creates option elements.
   * @param {string} id - The search item's id. If blank then the
   *   option is disabled.
   * @param {string} name - The search item's name.
   * @return {!Element}
   */
  var makeOptElem = function(id, name) {

    /** @type {!Element} */
    var elem;

    checkArgs(id, 'string', name, '^string');

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

  /**
   * ---------------------------------------------------
   * Public Method (setSearchSection)
   * ---------------------------------------------------
   * @desc A helper function that sets option elements for a search section.
   * @param {?HTMLSelectElement} sel - The search section's select element.
   * @param {!strings} ids - The search section's ids.
   * @param {!stringMap} names - The search section's names.
   * @param {!elements} opts - The search section's option elements.
   * @param {boolean=} noAll - Indicates that the id of 'all' should be
   *   skipped.
   */
  var setSearchSection = function(sel, ids, names, opts, noAll) {

    /** @type {!Array<*>} */
    var args;
    /** @type {!Element} */
    var elem;
    /** @type {string} */
    var name;
    /** @type {number} */
    var len;
    /** @type {string} */
    var id;
    /** @type {number} */
    var i;

    args = [ sel, 'element', ids, '!strings', names, '!stringMap' ];
    args.push(opts, '!elements', noAll, 'boolean=');
    checkArgs.apply(null, args);

    len = ids.length;
    i = -1;
    while (++i < len) {
      id = ids[i];
      if (noAll && id === 'all') {
        continue;
      }
      name = names[ id ];
      elem = makeOptElem(id, name);
      opts.push(elem);
      sel && sel.appendChild(elem);
    }

  };

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

    checkArgs(str, 'string');

    str = str.charAt(0).toUpperCase() + str.slice(1);

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

      checkArgs(str, 'string');

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
  var isLink = (function setup_isLink() {

    /** @type{!RegExp} */
    var http;

    http = /^https?\:\/\//;

    return function isLink(str) {

      /** @type {boolean} */
      var result;

      checkArgs(str, 'string');

      result = http.test(str);

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

      /** @type {string} */
      var url;

      checkArgs(name, 'string');

      url = name.toLowerCase();
      url = url.replace(invalidCharacters, '');
      url = url.replace(spaces, '-');

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

    /** @type {string} */
    var errorMsg;

    checkArgs(prop, 'string', shouldBeType, 'string', wasType, 'string');

    errorMsg = 'Your aIV.app settings property, ' + prop + ', was an ';
    errorMsg += 'incorrect data type. It should be ' + shouldBeType + '. ';
    errorMsg += 'The given typeof ' + prop + ' was \'' + wasType + '\'.';

    console.error(errorMsg);

  }
