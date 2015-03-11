  /**
   * -----------------------------------------------------
   * Public Class (SearchBar)
   * -----------------------------------------------------
   * @desc The available searchBar for each question.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var SearchBar = function(sources, categories) {

    /**
     * ---------------------------------------------------
     * Private Property (SearchBar.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('SearchBar') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'sources', sources, 'categories', categories);
      this.debug.start('init', sources, categories);
      this.debug.args('init', sources, 'object', categories, 'object');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.names)
     * -----------------------------------------------
     * @desc The hash map of the search bar's ids and names.
     * @type {{
     *   view   : hashMap,
     *   order  : hashMap,
     *   stage  : hashMap,
     *   source : hashMap,
     *   mainCat: hashMap,
     *   subCat : hashMap
     * }}
     */
    this.names = {
      view: {
        'one': 'View One',
        'ten': 'View Ten',
        'all': 'View All'
      },
      order: {
        'asc' : 'ASC',
        'desc': 'DESC'
      },
      stage: {
        'all': 'All Stages',
        'com': 'Completed',
        'inc': 'Incomplete'
      },
      source: {
        'all': 'All Sources'
      },
      mainCat: {
        'all': 'All Main Categories'
      },
      subCat: {
        'all': 'All Sub Categories'
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ids)
     * -----------------------------------------------
     * @desc The search bar's ids in order of appearance.
     * @type {{
     *   view   : strings,
     *   order  : strings,
     *   stage  : strings,
     *   source : strings,
     *   mainCat: strings,
     *   subCat : Object<string, strings>
     * }}
     */
    this.ids = {
      view   : [ 'one','ten','all' ],
      order  : [ 'asc','desc' ],
      stage  : [ 'all','com','inc' ],
      source : sources.ids.slice(0).unshift('all'),
      mainCat: categories.ids.slice(0).unshift('all'),
      subCat : {}
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ques)
     * -----------------------------------------------
     * @desc The question ids matching the search property values.
     * @type {{
     *   stage: Object<string, nums>
     * }}
     */
    this.ques = {
      stage: {
        'com': [],
        'inc': []
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.vals)
     * -----------------------------------------------
     * @desc The current selected values.
     * @type {{
     *   view   : string,
     *   order  : string,
     *   stage  : string,
     *   source : string,
     *   mainCat: string,
     *   subCat : string
     * }}
     * @dict
     */
    this.vals = {
      view   : 'one',
      order  : 'asc',
      stage  : 'all',
      source : 'all',
      mainCat: 'all',
      subCat : 'all'
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.elems)
     * -----------------------------------------------
     * @desc The select HTMLELements.
     * @type {{
     *   view   : elem,
     *   order  : elem,
     *   stage  : elem,
     *   source : elem,
     *   mainCat: elem,
     *   subCat : elem
     * }}
     * @dict
     */
    this.elems = {
      view   : null,
      order  : null,
      stage  : null,
      source : null,
      mainCat: null,
      subCat : null,
    };

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.opts)
     * -----------------------------------------------
     * @desc The option elements for the search bar.
     * @type {{
     *   view   : elems,
     *   order  : elems,
     *   stage  : elems,
     *   source : elems,
     *   mainCat: elems,
     *   subCat : Object<string, elems>
     * }}
     */
    this.opts = {
      view   : [],
      order  : [],
      stage  : [],
      source : [],
      mainCat: [],
      subCat : {
        'all': []
      }
    };

    // Add source names
    if (sources.len) {
      sources.ids.forEach(function(/** string */ id) {
        this.names.source[id] = sources.get(id).get('name');
      }, this);
    }

    // Add category names and ids
    if (categories.len) {

      categories.ids.forEach(function(/** string */ id) {
        /**
         * @type {Category}
         * @private
         */
        var mainCat;
        /**
         * @type {strings}
         * @private
         */
        var subs;

        // Add the main category
        mainCat = categories.get(id);
        this.names.mainCat[id] = mainCat.get('name');

        // Add the sub categories
        subs = mainCat.get('subs');
        if (subs.length) {
          this.ids.subCat[id] = subs.slice(0).unshift('all');
          this.opts.subCat[id] = [];
          subs.forEach(function(/** string */ id) {
            this.names.subCat[id] = categories.get(id).get('name');
          }, this);
        }
      }, this);
    }


    DEBUG && this.debug.group('init', 'end');
  };

  // Ensure constructor is set to this class.
  SearchBar.prototype.constructor = SearchBar;

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.updateVals)
   * -----------------------------------------------------
   * @desc Updates the current search bar's values.
   * @param {Object} vals - The new search bar's values.
   */
  SearchBar.prototype.updateVals = function(vals) {

    if (DEBUG) {
      this.debug.start('updateVals', vals);
      this.debug.args('updateVals', vals, 'object');
    }

    if (typeof vals.view === 'string' &&
        !!this.names.view[vals.view]) {
      this.vals.view = vals.view;
    }

    if (typeof vals.order === 'string' &&
        !!this.names.order[vals.order]) {
      this.vals.order = vals.order;
    }

    if (typeof vals.stage === 'string' &&
        !!this.names.stage[vals.stage]) {
      this.vals.stage = vals.stage;
    }

    if (typeof vals.source === 'string' &&
        !!this.names.source[vals.source]) {
      this.vals.source = vals.source;
    }

    if (typeof vals.mainCat === 'string' &&
        !!this.names.mainCat[vals.mainCat]) {
      this.vals.mainCat = vals.mainCat;
    }

    if (typeof vals.subCat === 'string') {

      if (this.vals.subCat === 'all') {
        this.vals.subCat = vals.subCat;
      }
      else {

        if (!!this.names.subCat[vals.subCat]) {

          if (this.vals.mainCat === 'all') {
            this.vals.subCat = vals.subCat;
          }
          else {
            if (this.ids.subCat[mainCat].indexOf(vals.subCat) !== -1) {
              this.vals.subCat = vals.subCat;
            }
          }
        }
      }
    }
  };
