  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @param {?Object} config - The user's config settings.
   * @param {?hashMap} sources - The user's sources.
   * @param {?Object} categories - The user's categories.
   * @param {?Object} questions - The user's questions.
   * @constructor
   */
  var App = function(config, sources, categories, questions) {

    /**
     * @type {vals}
     * @private
     */
    var vals;
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    // Check the user inputs
    vals = [ config, sources, categories, questions ];
    pass = App.checkType(vals, 'object');

    /**
     * ---------------------------------------------------
     * Private Property (App.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('App') : null;

    // debugging var
    var args;
    if (DEBUG) {
      this.debug.start('init', config, sources, categories, questions);
      args = [ 'init' ];
      args.push(config, 'object', sources, 'object');
      args.push(categories, 'object', questions, 'object');
      this.debug.args(args);
    }

    /**
     * ----------------------------------------------- 
     * Public Property (App.flags)
     * -----------------------------------------------
     * @desc Saves flags that explain the current state of the app.
     *   <ol>
     *     <li>workerPass: Indicates the web worker has completed formatting.</li>
     *     <li>workerFail: Indicates the web worker has encountered an error.</li>
     *     <li>initDone: Indicates the app has finished initializing.</li>
     *   </ol>
     * @type {{
     *   workerPass: boolean,
     *   workerFail: boolean,
     *   initDone  : boolean
     * }}
     * @struct
     */
    this.flags = {
      workerPass: false,
      workerFail: false,
      initDone  : false
    };

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems)
     * -----------------------------------------------
     * @desc Saves a reference to key DOM nodes for this app.
     *   <ol>
     *     <li>root: #aIV</li>
     *     <li>sel: #aIV-selections</li>
     *     <li>main: #aIV-main</li>
     *     <li>nav: #aIV-nav</li>
     *     <li>qs: #aIV-questions</li>
     *   </ol>
     * @type {{
     *   root: HTMLElement,
     *   sel : HTMLElement,
     *   main: HTMLElement,
     *   nav : HTMLElement,
     *   ques: HTMLElement,
     *   scrl: {
     *     height: number
     *   },
     *   code: {
     *     ol: {
     *       height: number
     *     },
     *     li: {
     *       height: number
     *     }
     *   }
     * }}
     * @struct
     */
    this.elems = {
      root: null,
      sel : null,
      main: null,
      nav : null,
      ques: null,
      scrl: {},
      code: {}
    };

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.scrl.height)
     * -----------------------------------------------
     * @desc Saves the height of the browser's DOM loaded scrollbar.
     * @type {number}
     */
    this.elems.scrl.height = 0;

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.code)
     * -----------------------------------------------
     * @desc Saves values of the DOM loaded prettified list tags.
     * @type {{
     *   ol: Object,
     *   li: Object
     * }}
     * @struct
     
     */
    this.elems.code = {
      ol: {},
      li: {}
    };

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.code.ol.height)
     * -----------------------------------------------
     * @desc Saves the height of the DOM loaded prettified ordered list.
     * @type {number}
     */
    this.elems.code.ol.height = 0;

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems.code.li.height)
     * -----------------------------------------------
     * @desc Saves the height of the DOM loaded prettified list item.
     * @type {number}
     */
    this.elems.code.li.height = 0;

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {Config}
     */
    this.config = (pass) ? new Config(config) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {Sources}
     */
    this.sources = (pass) ? new Sources(sources) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {Categories}
     */
    this.categories = (pass) ? new Categories(categories) : null;

    /**
     * ---------------------------------------------------
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions = (pass) ? new Questions(questions) : null;

    /**
     * ---------------------------------------------------
     * Private Property (App.questions)
     * ---------------------------------------------------
     * @type {Questions}
     */
    this.questions = (pass) ? new Questions(questions) : null;

    if (pass) {
      
    }
    else {
      // Show error message
      document.addEventListener('DOMContentLoaded', function() {
        appendMain();
        appendError();
        DEBUG && debug.group('init', 'end');
      });
    }
  };

  /**
   * ---------------------------------------------------
   * Public Method (App.sortKeys)
   * ---------------------------------------------------
   * @desc A helper method that sorts the keys from an object.
   * @param {strings} ids - The unsorted keys.
   * @param {hashMap} hMap - The object acting as a hash map.
   * @return {strings} The sorted keys.
   */
  App.sortKeys = function(ids, hMap) {

    if (DEBUG) {
      this.debug.start('sortKeys', ids, hMap);
      this.debug.args('sortKeys', ids, 'array', hMap, 'object');
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
  };

  /**
   * ---------------------------------------------------
   * Public Method (App.checkType)
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
  App.checkType = function(vals, _types) {

    if (DEBUG) {
      this.debug.start('checkType', vals, _types);
      this.debug.args('checkType', vals, 'array', _types, 'string|array');
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
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;
