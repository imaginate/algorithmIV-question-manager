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
   * Public Method (SearchBar.prototype.setToDefaults)
   * -----------------------------------------------------
   * @desc Updates the current search bar's values to the defaults.
   * @param {Object} defaults - The default values.
   */
  SearchBar.prototype.setToDefaults = function(defaults) {

    if (DEBUG) {
      this.debug.start('setToDefaults', defaults);
      this.debug.args('setToDefaults', defaults, 'object');
    }

    /**
     * @type {string}
     * @private
     */
    var view;
    /**
     * @type {string}
     * @private
     */
    var order;
    /**
     * @type {string}
     * @private
     */
    var stage;
    /**
     * @type {string}
     * @private
     */
    var source;
    /**
     * @type {string}
     * @private
     */
    var mainCat;
    /**
     * @type {string}
     * @private
     */
    var subCat;

    view    = defaults.get('view');
    order   = defaults.get('order');
    stage   = defaults.get('stage');
    source  = defaults.get('source');
    mainCat = defaults.get('mainCat');
    subCat  = defaults.get('subCat');

    this.vals.view    = view;
    this.vals.order   = order;
    this.vals.stage   = stage;
    this.vals.source  = source;
    this.vals.mainCat = mainCat;
    this.vals.subCat  = subCat;
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's select elements.
   */
  SearchBar.prototype.setElems = function() {

    DEBUG && this.debug.start('setElems');

    /**
     * @type {boolean}
     * @private
     */
    var stage;
    /**
     * @type {boolean}
     * @private
     */
    var source;
    /**
     * @type {boolean}
     * @private
     */
    var category;
    /**
     * @type {boolean}
     * @private
     */
    var subCat;
    /**
     * @type {boolean}
     * @private
     */
    var pass;

    stage    = app.config.searchBar.get('stage');
    source   = app.config.searchBar.get('source');
    category = app.config.searchBar.get('category');
    subCat   = app.config.searchBar.get('subCat');

    // Set view search element
    this.elems.view = document.createElement('select');
    this.elems.view.id = 'aIV-view';
    this.elems.view.className = 'showView';

    // Set order search element
    this.elems.order = document.createElement('select');
    this.elems.order.id = 'aIV-order';
    this.elems.order.className = 'showOrder';

    // Set stage search element
    if (stage) {
      this.elems.stage = document.createElement('select');
    }
    else {
      this.elems.stage = document.createElement('input');
      this.elems.stage.type = 'hidden';
      this.elems.stage.value = 'all';
    }
    this.elems.stage.id = 'aIV-stage';
    this.elems.stage.className = 'showStage';

    // Set source search element
    if (source && app.sources.len) {
      this.elems.source = document.createElement('select');
    }
    else {
      this.elems.source = document.createElement('input');
      this.elems.source.type = 'hidden';
      this.elems.source.value = 'all';
    }
    this.elems.source.id = 'aIV-source';
    this.elems.source.className = 'showSource';

    // Set main and sub category search elements
    if (category && app.categories.len) {

      this.elems.mainCat = document.createElement('select');

      if (subCat) {
        pass = app.categories.ids.some(function(/** string */ id) {
          return !!app.categories.get(id).get('subs').length;
        });
        if (pass) {
          this.elems.subCat = document.createElement('select');
        }
      }
      else {
        pass = false;
      }
      if (!pass) {
        this.elems.subCat.type = 'hidden';
        this.elems.subCat.value = 'all';
      }
    }
    else {
      this.elems.mainCat.type = 'hidden';
      this.elems.mainCat.value = 'all';

      this.elems.subCat.type = 'hidden';
      this.elems.subCat.value = 'all';
    }
    this.elems.mainCat.id = 'aIV-mainCat';
    this.elems.mainCat.className = 'showMainCat';

    this.elems.subCat.id = 'aIV-subCat';
    this.elems.subCat.className = 'showSubCat';
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOpts)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   */
  SearchBar.prototype.setOpts = function() {

    DEBUG && this.debug.start('setOpts');

    /**
     * @type {boolean}
     * @private
     */
    var stage;
    /**
     * @type {boolean}
     * @private
     */
    var source;
    /**
     * @type {boolean}
     * @private
     */
    var category;
    /**
     * @type {boolean}
     * @private
     */
    var subCat;

    stage    = ('select' === this.elems.stage.tagName.toLowerCase());
    source   = ('select' === this.elems.source.tagName.toLowerCase());
    category = ('select' === this.elems.mainCat.tagName.toLowerCase());
    subCat   = ('select' === this.elems.subCat.tagName.toLowerCase());

    // Set view search element
    this.elems.view = document.createElement('select');
    this.elems.view.id = 'aIV-view';
    this.elems.view.className = 'showView';

    // Set order search element
    this.elems.order = document.createElement('select');
    this.elems.order.id = 'aIV-order';
    this.elems.order.className = 'showOrder';

    // Set stage search element
    if (stage) {
      this.elems.stage = document.createElement('select');
    }
    else {
      this.elems.stage = document.createElement('input');
      this.elems.stage.type = 'hidden';
      this.elems.stage.value = 'all';
    }
    this.elems.stage.id = 'aIV-stage';
    this.elems.stage.className = 'showStage';

    // Set source search element
    if (source && app.sources.len) {
      this.elems.source = document.createElement('select');
    }
    else {
      this.elems.source = document.createElement('input');
      this.elems.source.type = 'hidden';
      this.elems.source.value = 'all';
    }
    this.elems.source.id = 'aIV-source';
    this.elems.source.className = 'showSource';

    // Set main and sub category search elements
    if (category && app.categories.len) {

      this.elems.mainCat = document.createElement('select');

      if (subCat) {
        pass = app.categories.ids.some(function(/** string */ id) {
          return !!app.categories.get(id).get('subs').length;
        });
        if (pass) {
          this.elems.subCat = document.createElement('select');
        }
      }
      else {
        pass = false;
      }
      if (!pass) {
        this.elems.subCat.type = 'hidden';
        this.elems.subCat.value = 'all';
      }
    }
    else {
      this.elems.mainCat.type = 'hidden';
      this.elems.mainCat.value = 'all';

      this.elems.subCat.type = 'hidden';
      this.elems.subCat.value = 'all';
    }
    this.elems.mainCat.id = 'aIV-mainCat';
    this.elems.mainCat.className = 'showMainCat';

    this.elems.subCat.id = 'aIV-subCat';
    this.elems.subCat.className = 'showSubCat';
  };
