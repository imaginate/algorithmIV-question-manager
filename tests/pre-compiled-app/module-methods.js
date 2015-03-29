  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * @desc A shortcut for getElementById.
   * @param {string} title - The name of the id of the element to select.
   * @return {elem} A reference to element with the given id.
   */
  function getID(title) {

    if (DEBUG) {
      debug.start('getID', title);
      debug.args('getID', title, 'string');
    }

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

    if (DEBUG) {
      debug.start('getTag', title, root);
      debug.args('getTag', title, 'string', root, 'elem=');
    }

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

    if (DEBUG) {
      debug.start('getClass', title, root);
      debug.args('getClass', title, 'string', root, 'elem=');
    }

    root = root || app.elems.root;

    return root.getElementsByClassName(title);
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @param {vals} vals - An array of the value(s) to be evaluated.
   *   Note that the values must be provided in an array.
   * @param {(string|strings)} types - The type(s) to evaluate the
   *   value(s) against. The optional types are 'string', 'number',
   *   'boolean', 'object', 'elem', 'undefined', 'array', 'strings',
   *   'numbers', 'booleans' 'objects', and 'elems'. Use '|' as the
   *   separator for multiple types (e.g. 'strings|numbers'). Use '='
   *   to indicate the value is optional (e.g. 'array=' or
   *   'string|number='). Use '!' to indicate that null is not a
   *   possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  function checkType(vals, types) {

    // Debugging
    var msg;
    if (DEBUG) {
      debug.start('checkType', vals, types);
      debug.args('checkType', vals, 'array', types, 'string|strings');
      // Error message for type check
      msg = 'Error: A given type was the wrong value. The incorrect ';
      msg += 'value was \'$$\'. See the docs for acceptable values.';
    }

    /**
     * @type {RegExp}
     * @private
     */
    var arrays;
    /**
     * @type {RegExp}
     * @private
     */
    var simple;
    /**
     * @type {RegExp}
     * @private
     */
    var allTypes;
    /**
     * @type {*}
     * @private
     */
    var val;

    arrays = /^array$|^strings$|^numbers$|^booleans$|^objects$|^elems$/;
    simple = /^string$|^number$|^boolean$|^object$/;
    allTypes = '^elem$|^undefined$|' + simple.source + '|' + arrays.source;
    allTypes = new RegExp(allTypes);

    if (typeof types === 'string') {
      types = vals.map(function() {
        return types;
      });
    }

    if (vals.length !== types.length) {
      return false;
    }

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

        // Ensure a correct type was given
        if ( !allTypes.test(cleanType) ) {
          DEBUG && debug.fail('checkType', false, msg, type);
          return false;
        }

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
          if ( arrays.test(cleanType) ) {

            if ( !Array.isArray(val) ) {
              return false;
            }

            if (cleanType === 'array') {
              return true;
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

          // Evaluate string, number, boolean, and object types
          if ( simple.test(cleanType) ) {
            return (typeof val === cleanType);
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
   * @param {hashMap} hMap - The object acting as a hash map.
   * @return {strings} The sorted keys.
   */
  function sortKeys(ids, hMap) {

    if (DEBUG) {
      debug.start('sortKeys', ids, hMap);
      debug.args('sortKeys', ids, 'strings', hMap, 'object');
    }

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
    var len;
    /**
     * @type {num}
     * @private
     */
    var ii;

    keys = [];
    names = [];

    // Add the first key and its name to keys and names
    i = ids.length - 1;
    id = ids[i];
    name = hMap[id].toLowerCase();

    keys.push(id);
    names.push(name);

    // Add the remaining keys and their names in order
    while (i--) {
      id = ids[i];
      name = hMap[id].toLowerCase();

      // The sorting logic (pre-sorted keys get linear time)
      len = names.length;
      ii = 0;
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

    if (DEBUG) {
      debug.start('capFirst', str);
      debug.args('capFirst', str, 'string');
    }

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

    if (DEBUG) {
      debug.start('camelCase', str);
      debug.args('camelCase', str, 'string');
    }

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
