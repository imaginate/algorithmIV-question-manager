  /**
   * -----------------------------------------------------
   * Public Class (SearchBar)
   * -----------------------------------------------------
   * @desc The available searchBar for each question.
   * @param {?hashMap} searchBar - The user's searchBar.
   * @constructor
   */
  var SearchBar = function(sources, categories) {

    /** x
     * ---------------------------------------------------
     * Private Property (SearchBar.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('SearchBar') : null;

    if (DEBUG) {
      this.debug.group('init', 'coll', 'searchBar', searchBar);
      this.debug.start('init', searchBar);
      this.debug.args('init', searchBar, 'object');
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
     * Public Property (SearchBar.opts)
     * -----------------------------------------------
     * @desc The option elements for the search bar.
     * @type {{
     *   view   : Array<HTMLElement>,
     *   order  : Array<HTMLElement>,
     *   stage  : Array<HTMLElement>,
     *   source : Array<HTMLElement>,
     *   mainCat: Array<HTMLElement>,
     *   subCat : Object<string, Array<HTMLElement>>
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
    if (!!sources.len) {
      sources.ids.forEach(function(/** string */ id) {
        this.names.source[id] = sources.hMap[id].name;
      }, this);
    }

    // Add category names and ids
    if (!!categories.len) {
      categories.ids.forEach(function(/** string */ id) {
        this.names.mainCat[id] = categories.hMap[id].name;
        if (!!categories.hMap[id].subs) {
          this.ids.subCat[id] = categories.hMap[id].subs.slice(0).unshift('all');
          this.opts.subCat[id] = [];
          categories.hMap[id].subs.forEach(function(/** string */ id) {
            this.names.subCat[id] = categories.hMap[id].name;
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

    /**
     * @type {boolean}
     * @private
     */
    var pass;

    if (typeof vals.view === 'string' &&
        this.ids.view.indexOf(vals.view) !== -1) {
      this.vals.view = vals.view;
    }

    if (typeof vals.order === 'string' &&
        this.ids.order.indexOf(vals.order) !== -1) {
      this.vals.order = vals.order;
    }

    if (typeof vals.stage === 'string' &&
        this.ids.stage.indexOf(vals.stage) !== -1) {
      this.vals.stage = vals.stage;
    }

    if (typeof vals.source === 'string' &&
        this.ids.source.indexOf(vals.source) !== -1) {
      this.vals.source = vals.source;
    }

    if (typeof vals.mainCat === 'string' &&
        this.ids.mainCat.indexOf(vals.mainCat) !== -1) {
      this.vals.mainCat = vals.mainCat;
    }

    if (typeof vals.subCat === 'string') {

      if (this.vals.subCat === 'all') {
        pass = true;
      }
      else if (this.vals.mainCat === 'all') {
        pass = this.ids.mainCat.some(function(/** string */ id) {
          return !!this.ids.subCat[id] &&
                 this.ids.subCat[id].some(function(/** string */ id) {
            return id === vals.subCat;
          });
        });
      }
      else {
        pass = !!this.ids.subCat[this.vals.mainCat] &&
               this.ids.subCat[this.vals.mainCat].
               some(function(/** string */ id) {
          return id === vals.subCat;
        });
      }

      if (!!pass) {
        this.vals.subCat = vals.subCat;
      }
    }
  };
