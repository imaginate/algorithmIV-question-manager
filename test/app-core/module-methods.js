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
      debug.args('getTag', title, 'string', root, 'object=');
    }

    root = root || roots.root;

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
      debug.args('getClass', title, 'string', root, 'object=');
    }

    root = root || roots.root;

    return root.getElementsByClassName(title);
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @param {vals} vals - The value(s) to be evaluated.
   * @param {(string|strings)} _types - The type(s) to evaluate the
   *   value(s) against. The optional types are 'string', 'number',
   *   'boolean', 'object', 'undefined', and 'array'. Use '|' as the
   *   separator for multiple types (e.g. 'string|number'). Use '=' to
   *   indicate the value is optional (e.g. 'array=' or 'string|number=').
   *   Use '!' to indicate that null is not a possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  function checkType(vals, _types) {

    if (DEBUG) {
      debug.start('checkType', vals, _types);
      debug.args('checkType', vals, 'array', _types, 'string|array');
    }

    /**
     * @type {boolean}
     * @private
     */
    var pass;
    /**
     * @type {*}
     * @private
     */
    var val;

    if (typeof _types === 'string') {
      _types = vals.map(function() {
        return _types;
      });
    }

    if (vals.length !== _types.length) {
      return false;
    }

    pass = _types.every(function(/** string */ _type, /** number */ i) {

      val = vals[i];
      _type = _type.toLowerCase().replace(/[^a-zA-Z\|\=\!]/g, '');
      types = ( /\|/.test(_type) ) ? _type.split('|') : [ _type ];

      return types.some(function(/** string */ type) {

        if (val === undefined) {
          if (/\=/.test(type) || type === 'undefined') {
            return true;
          }
        }
        else {

          if (val === null && /\!/.test(type) === false) {
            return true;
          }
          type = type.replace(/\!|\=/g, '');

          if (type === 'array' && Array.isArray(val)) {
            return true;
          }

          if (/(string)|(number)|(boolean)|(object)/.test(type) &&
              typeof val === type) {
            return true;
          }
        }

        return false;
      });
    });

    return pass;
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
      debug.args('sortKeys', ids, 'array', hMap, 'object');
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
     * @type {number}
     * @private
     */
    var ii;

    keys = [];
    names = [];

    ids.forEach(function(/** string */ id, /** number */ i) {

      name = hMap[id].toLowerCase();

      if (!i) {
        keys.push(id);
        names.push(name);
      }
      else {

        ii = i - 1;
        while (true) {

          if (name >= names[ii]) {
            ++ii;
            keys.splice(ii, 0, id);
            names.splice(ii, 0, name);
            break;
          }

          if (ii === 0) {
            keys.unshift(id);
            names.unshift(name);
            break;
          }
          --ii;
        }
      }
    });

    return keys;
  }
