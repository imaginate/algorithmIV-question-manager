  if (!Object.keys) {
    /**
     * ---------------------------------------------
     * Public Method (Object.keys)
     * ---------------------------------------------
     * @desc A polyfill for the native method. For method details
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
     * @param {!Object} obj
     * @return {vals}
     */
    Object.keys = (function(obj) {

      /** @type {Object} */
      var testObj;
      /** @type {boolean} */
      var enumBug;
      /** @type {strings} */
      var notEnum;

      testObj = { toString: null };
      enumBug = !( testObj.propertyIsEnumerable('toString') );
      notEnum = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ];

      return function(obj) {

        if (typeof obj !== 'object' && typeof obj !== 'function') {
          throw new TypeError('Object.keys only accepts objects.');
          return;
        }

        if (obj === null) {
          throw new TypeError('Object.keys does not accept null types.');
          return;
        }

        /** @type {string} */
        var prop;
        /** @type {number} */
        var i;
        /** @type {vals} */
        var result;

        result = [];

        for (prop in obj) {
          if ( obj.hasOwnProperty(prop) ) {
            result.push(prop);
          }
        }

        if (enumBug) {
          i = notEnum.length;
          while (i--) {
            if ( obj.hasOwnProperty(notEnum[i]) ) {
              result.push(notEnum[i]);
            }
          }
        }

        return result;
      };
    })();
  }

  if (!Object.freeze) {
    /**
     * ---------------------------------------------
     * Public Method (Object.freeze)
     * ---------------------------------------------
     * @desc A polyfill for the native method. For method details
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}
     * @param {Object} obj
     * @return {Object}
     */
    Object.freeze = function(obj) {

      if (typeof obj !== 'object' && typeof obj !== 'function') {
        throw new TypeError('Object.freeze only accepts objects.');
        return;
      }

      return obj;
    };
  }

  // Fix Object.freeze function param bug
  try {
    Object.freeze(function() {});
  }
  catch (e) {
    Object.freeze = (function(originalFreeze) {
      return function(obj) {
        if (typeof obj === 'function') {
          return obj;
        }
        else {
          return originalFreeze(obj);
        }
      };
    }(Object.freeze));
  }
