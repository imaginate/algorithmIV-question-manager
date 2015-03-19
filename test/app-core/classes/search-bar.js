  /**
   * -----------------------------------------------------
   * Public Class (SearchBar)
   * -----------------------------------------------------
   * @desc The search bar's values and elements for this app.
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
      this.debug.group('init', 'coll', 'sources= $$, categories= $$', sources, categories);
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
   * Public Method (SearchBar.prototype.setMainElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's select elements.
   */
  SearchBar.prototype.setMainElems = function() {

    if (DEBUG) {
      this.debug.group('setMainElems', 'coll');
      this.debug.start('setMainElems');
    }

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
    this.elems.view.value = this.vals.view;
    this.elems.view.onchange = function(event) {
      if (app.searchBar.vals.view != event.target.value) {
        DEBUG && debug.group('searchBar.view.onchange', 'coll');
        app.searchBar.vals.view = event.target.value;
        app.updateDisplay();
        DEBUG && debug.group('searchBar.view.onchange', 'end');
      }
    };

    // Set order search element
    this.elems.order = document.createElement('select');
    this.elems.order.id = 'aIV-order';
    this.elems.order.className = 'showOrder';
    this.elems.order.value = this.vals.order;
    this.elems.order.onchange = function(event) {
      if (app.searchBar.vals.order != event.target.value) {
        DEBUG && debug.group('searchBar.order.onchange', 'coll');
        app.searchBar.vals.order = event.target.value;
        app.updateDisplay();
        DEBUG && debug.group('searchBar.order.onchange', 'end');
      }
    };

    // Set stage search element
    if (stage) {
      this.elems.stage = document.createElement('select');
      this.elems.stage.value = this.vals.stage;
      this.elems.stage.onchange = function(event) {
        if (app.searchBar.vals.stage != event.target.value) {
          DEBUG && debug.group('searchBar.stage.onchange', 'coll');
          app.searchBar.vals.stage = event.target.value;
          app.updateDisplay();
          DEBUG && debug.group('searchBar.stage.onchange', 'end');
        }
      };
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
      this.elems.source.value = this.vals.source;
      this.elems.source.onchange = function(event) {
        if (app.searchBar.vals.source != event.target.value) {
          DEBUG && debug.group('searchBar.source.onchange', 'coll');
          app.searchBar.vals.source = event.target.value;
          app.updateDisplay();
          DEBUG && debug.group('searchBar.source.onchange', 'end');
        }
      };
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
      this.elems.mainCat.value = this.vals.mainCat;
      this.elems.mainCat.onchange = function(event) {
        if (app.searchBar.vals.mainCat != event.target.value) {
          DEBUG && debug.group('searchBar.mainCat.onchange', 'coll');
          app.searchBar.vals.mainCat = event.target.value;
          app.searchBar.updateSubCatOpts();
          app.updateDisplay();
          DEBUG && debug.group('searchBar.mainCat.onchange', 'end');
        }
      };

      if (subCat) {
        pass = app.categories.ids.some(function(/** string */ id) {
          return !!app.categories.get(id).get('subs').length;
        });
        if (pass) {
          this.elems.subCat = document.createElement('select');
          this.elems.subCat.value = this.vals.subCat;
          this.elems.subCat.onchange = function(event) {
            if (app.searchBar.vals.subCat != event.target.value) {
              DEBUG && debug.group('searchBar.subCat.onchange', 'coll');
              app.searchBar.vals.subCat = event.target.value;
              app.updateDisplay();
              DEBUG && debug.group('searchBar.subCat.onchange', 'end');
            }
          };
        }
      }
      else {
        pass = false;
      }
      if (!pass) {
        this.elems.subCat = document.createElement('input');
        this.elems.subCat.type = 'hidden';
        this.elems.subCat.value = 'all';
      }
    }
    else {
      this.elems.mainCat = document.createElement('input');
      this.elems.mainCat.type = 'hidden';
      this.elems.mainCat.value = 'all';

      this.elems.subCat = document.createElement('input');
      this.elems.subCat.type = 'hidden';
      this.elems.subCat.value = 'all';
    }
    this.elems.mainCat.id = 'aIV-mainCat';
    this.elems.mainCat.className = 'showMainCat';

    this.elems.subCat.id = 'aIV-subCat';
    this.elems.subCat.className = 'showSubCat';

    DEBUG && this.debug.group('setMainElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOptElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   */
  SearchBar.prototype.setOptElems = function() {

    if (DEBUG) {
      this.debug.group('setOptElems', 'coll');
      this.debug.start('setOptElems');
    }

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
    var mainCat;
    /**
     * @type {boolean}
     * @private
     */
    var subCat;

    stage   = ('select' === this.elems.stage.tagName.toLowerCase());
    source  = ('select' === this.elems.source.tagName.toLowerCase());
    mainCat = ('select' === this.elems.mainCat.tagName.toLowerCase());
    subCat  = ('select' === this.elems.subCat.tagName.toLowerCase());

    /**
     * @desc A helper function that creates option elements.
     * @param {string} id - The search item's id. If blank then the
     *   option is disabled.
     * @param {string} name - The search item's name.
     * @return {elem}
     * @private
     */
    var makeOptElem = function(id, name) {
      /** @type {elem} */
      var elem;

      elem = document.createElement('option');
      elem.textContent = name;
      if (id) {
        elem.value = id;
      }
      else {
        elem.disabled = true;
      }
      return elem;
    };

    // Set view search options
    this.ids.view.forEach(function(/** string */ id) {
      /** @type {string} */
      var name;
      /** @type {elem} */
      var elem;

      name = this.names.view[id];
      elem = makeOptElem(id, name);
      this.opts.view.push(elem);
      this.elems.view.appendChild(elem);
    }, this);

    // Set order search options
    this.ids.order.forEach(function(/** string */ id) {
      /** @type {string} */
      var name;
      /** @type {elem} */
      var elem;

      name = this.names.order[id];
      elem = makeOptElem(id, name);
      this.opts.order.push(elem);
      this.elems.order.appendChild(elem);
    }, this);

    // Set stage search options
    if (stage) {
      this.ids.stage.forEach(function(/** string */ id) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        name = this.names.stage[id];
        elem = makeOptElem(id, name);
        this.opts.stage.push(elem);
        this.elems.stage.appendChild(elem);
      }, this);
    }

    // Set source search options
    if (source) {
      this.ids.source.forEach(function(/** string */ id) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        name = this.names.source[id];
        elem = makeOptElem(id, name);
        this.opts.source.push(elem);
        this.elems.source.appendChild(elem);
      }, this);
    }

    // Set main category search options
    if (mainCat) {
      this.ids.mainCat.forEach(function(/** string */ id) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        name = this.names.mainCat[id];
        elem = makeOptElem(id, name);
        this.opts.mainCat.push(elem);
        this.elems.mainCat.appendChild(elem);
      }, this);
    }

    // Set sub category search options
    if (subCat) {
      // Create the options for each main category with subs
      Object.keys(this.ids.subCat).forEach(function(/** string */ mainId) {
        this.ids.subCat[mainId].forEach(function(/** string */ id) {
          /** @type {string} */
          var name;
          /** @type {elem} */
          var elem;

          name = this.names.subCat[id];
          elem = makeOptElem(id, name);
          this.opts.subCat[mainId].push(elem);
        }, this);
      }, this);
      // Create the options for all
      this.opts.subCat['all'].push( makeOptElem('all', this.names.subCat['all']) );
      this.ids.mainCat.forEach(function(/** string */ mainId) {
        /** @type {string} */
        var name;
        /** @type {elem} */
        var elem;

        if (!!this.ids.subCat[mainId]) {

          name = this.names.mainCat[mainId];
          elem = makeOptElem('', name);
          this.opts.subCat['all'].push(elem);

          this.ids.subCat[mainId].forEach(function(/** string */ id) {
            /** @type {string} */
            var name;
            /** @type {elem} */
            var elem;

            if (id !== 'all') {
              name = this.names.subCat[id];
              elem = makeOptElem(id, name);
              this.opts.subCat['all'].push(elem);
            }
          }, this);
        }
      }, this);
      // Append the correct sub categories to the select element
      this.opts.subCat[this.vals.mainCat].forEach(function(/** elem */ elem) {
        this.elems.subCat.appendChild(elem);
      }, this);
    }

    DEBUG && this.debug.group('setOptElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Appends the search bar's elements to the selections root.
   */
  SearchBar.prototype.appendElems = function() {

    DEBUG && this.debug.start('appendElems');

    app.elems.sel.appendChild(this.elems.view);
    app.elems.sel.appendChild(this.elems.order);
    app.elems.sel.appendChild(this.elems.stage);
    app.elems.sel.appendChild(this.elems.source);
    app.elems.sel.appendChild(this.elems.mainCat);
    app.elems.sel.appendChild(this.elems.subCat);
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.updateSubCatOpts)
   * -----------------------------------------------------
   * @desc Updates the children appended to the sub category select element.
   */
  SearchBar.prototype.updateSubCatOpts = function() {

    DEBUG && this.debug.start('updateSubCatOpts');

    // Update the select value and clear its children
    this.vals.subCat = 'all';
    this.elems.subCat.value = 'all';
    while (this.elems.subCat.firstChild) {
      this.elems.subCat.removeChild(this.elems.subCat.firstChild);
    }
    // Append the new children
    this.opts.subCat[this.vals.mainCat].forEach(function(/** elem */ elem) {
      this.elems.subCat.appendChild(elem);
    }, this);
  };
