  /**
   * -----------------------------------------------------
   * Public Class (SearchBar)
   * -----------------------------------------------------
   * @desc The search bar's values and elements for this app.
   * @todo Break this class down into smaller pieces with appropriate
   *   getters and setters.
   * @param {booleanMap} config - The app's search bar config settings.
   * @param {Sources} sources - The app's sources.
   * @param {Categories} categories - The app's categories.
   * @constructor
   */
  var SearchBar = function(config, sources, categories) {

    /** @type {boolean} */
    var pass;

    /**
     * ---------------------------------------------------
     * Public Property (SearchBar.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the SearchBar class.
     * @type {Debug}
     */
    this.debug = aIV.debug('SearchBar');

    // Debugging vars
    var msg, args;
    msg = 'config= $$, sources= $$, categories= $$';
    this.debug.group('init', 'coll', msg, config, sources, categories);
    this.debug.start('init', config, sources, categories);
    args = [ 'init' ];
    args.push(config, 'booleanMap', sources, 'object', categories, 'object');
    this.debug.args(args);

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.names)
     * -----------------------------------------------
     * @desc The hash map of the search bar's ids and names.
     * @type {{
     *   view   : stringMap,
     *   order  : stringMap,
     *   stage  : stringMap,
     *   source : stringMap,
     *   mainCat: stringMap,
     *   subCat : stringMap
     * }}
     */
    this.names;

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
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ques)
     * -----------------------------------------------
     * @desc The question ids matching the search property values.
     * @type {{
     *   stage: Object<string, nums>
     * }}
     */
    this.ques;

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
    this.vals;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.elems)
     * -----------------------------------------------
     * @desc The select HTMLELements.
     * @type {{
     *   view   : elem,
     *   order  : elem,
     *   stage  : ?elem,
     *   source : ?elem,
     *   mainCat: ?elem,
     *   subCat : ?elem
     * }}
     * @dict
     */
    this.elems;

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
    this.opts;


    // Setup the names, ids, and opts properties
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
    this.ids = {
      view   : [ 'one','ten','all' ],
      order  : [ 'asc','desc' ],
      stage  : [ 'all','com','inc' ],
      source : sources.ids.slice(0),
      mainCat: categories.ids.slice(0),
      subCat : {}
    };
    this.ids.source.unshift('all');
    this.ids.mainCat.unshift('all');
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

    this.debug.state('init', 'sources.ids= $$', sources.ids);
    this.debug.state('init', 'this.ids= $$', this.ids);
    this.debug.state('init', 'this.ids.source= $$', this.ids.source);

    // Add the source names
    if (sources.len) {
      sources.ids.forEach(function(/** string */ sourceId) {
        this.names.source[ sourceId ] = sources.get(sourceId, 'name');
      }, this);
    }

    // Add category names and ids
    if (categories.len) {

      categories.ids.forEach(function(/** string */ mainId) {
        /** @type {Category} */
        var mainCat;
        /** @type {strings} */
        var subs;

        // Add the main category names
        mainCat = categories.get(mainId);
        this.names.mainCat[ mainId ] = mainCat.get('name');

        // Add the sub categories names and ids
        subs = mainCat.get('subs');
        if (subs && subs.length) {
          this.ids.subCat[ mainId ] = subs.slice(0);
          this.ids.subCat[ mainId ].unshift('all');
          this.opts.subCat[ mainId ] = [];
          subs.forEach(function(/** string */ subId) {
            this.names.subCat[ subId ] = categories.get(subId, 'name');
          }, this);
        }
      }, this);
    }

    Object.freeze(this.names);
    Object.freeze(this.ids);
    Object.freeze(this.opts);

    // Setup the question ids property
    this.ques = {};
    this.ques.stage = {};
    this.ques.stage.com = [];
    this.ques.stage.inc = [];

    Object.freeze(this.ques.stage);
    Object.freeze(this.ques);

    // Setup the current values property
    this.vals = {
      view   : 'one',
      order  : 'asc',
      stage  : 'all',
      source : 'all',
      mainCat: 'all',
      subCat : 'all'
    };

    // Setup the select elements property
    this.elems = {};
    this.elems.view = document.createElement('select');
    this.elems.order = document.createElement('select');
    this.elems.stage = ( (config.stage) ?
      document.createElement('select') : null
    );
    this.elems.source = ( (config.source && sources.len) ?
      document.createElement('select') : null
    );
    this.elems.mainCat = ( (config.category && categories.len) ?
      document.createElement('select') : null
    );
    pass = (this.elems.mainCat && config.subCat);
    pass = pass && categories.ids.some(function(/** string */ id) {
      return !!this.ids.subCat[id];
    }, this);
    this.elems.subCat = ( (pass) ?
      document.createElement('select') : null
    );

    Object.freeze(this.elems);


    this.debug.group('init', 'end');
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

    this.debug.start('setToDefaults', defaults);
    this.debug.args('setToDefaults', defaults, 'object');

    this.vals.view    = defaults.get('view');
    this.vals.order   = defaults.get('order');
    this.vals.stage   = defaults.get('stage');
    this.vals.source  = defaults.get('source');
    this.vals.mainCat = defaults.get('mainCat');
    this.vals.subCat  = defaults.get('subCat');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setMainElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's select elements.
   * @type {function()}
   */
  SearchBar.prototype.setMainElems = function() {

    this.debug.group('setMainElems', 'coll');
    this.debug.start('setMainElems');

    /** @type {boolean} */
    var pass;

    // Set view search element
    this.elems.view.id = 'aIV-view';
    this.elems.view.className = 'showView';
    this.elems.view.value = this.vals.view;
    this.elems.view.onchange = function(event) {
      /** @type {string} */
      var oldVal;

      if (app.searchBar.vals.view != event.target.value) {
        events.debug.group('searchBar.view.onchange', 'coll');

        oldVal = app.searchBar.vals.view;
        app.searchBar.vals.view = event.target.value;
        app.updateDisplay({
          noVals: true,
          reset : true,
          oldVal: oldVal
        });

        events.debug.group('searchBar.view.onchange', 'end');
      }
    };

    // Set order search element
    this.elems.order.id = 'aIV-order';
    this.elems.order.className = 'showOrder';
    this.elems.order.value = this.vals.order;
    this.elems.order.onchange = function(event) {

      if (app.searchBar.vals.order != event.target.value) {
        events.debug.group('searchBar.order.onchange', 'coll');

        app.searchBar.vals.order = event.target.value;
        app.updateDisplay({
          noVals: true,
          reset : true,
          flip  : true,
          index : true
        });

        events.debug.group('searchBar.order.onchange', 'end');
      }
    };

    // Set stage search element
    if (this.elems.stage) {
      this.elems.stage.id = 'aIV-stage';
      this.elems.stage.className = 'showStage';
      this.elems.stage.value = this.vals.stage;
      this.elems.stage.onchange = function(event) {

        if (app.searchBar.vals.stage != event.target.value) {
          events.debug.group('searchBar.stage.onchange', 'coll');

          app.searchBar.vals.stage = event.target.value;
          app.updateDisplay();

          events.debug.group('searchBar.stage.onchange', 'end');
        }
      };
    }

    // Set source search element
    if (this.elems.source) {
      this.elems.source.id = 'aIV-source';
      this.elems.source.className = 'showSource';
      this.elems.source.value = this.vals.source;
      this.elems.source.onchange = function(event) {

        if (app.searchBar.vals.source != event.target.value) {
          events.debug.group('searchBar.source.onchange', 'coll');

          app.searchBar.vals.source = event.target.value;
          app.updateDisplay();

          events.debug.group('searchBar.source.onchange', 'end');
        }
      };
    }

    // Set main category search element
    if (this.elems.mainCat) {
      this.elems.mainCat.id = 'aIV-mainCat';
      this.elems.mainCat.className = 'showMainCat';
      this.elems.mainCat.value = this.vals.mainCat;
      this.elems.mainCat.onchange = function(event) {

        if (app.searchBar.vals.mainCat != event.target.value) {
          events.debug.group('searchBar.mainCat.onchange', 'coll');

          app.searchBar.vals.mainCat = event.target.value;
          app.searchBar.updateSubCatOpts();
          app.updateDisplay();

          events.debug.group('searchBar.mainCat.onchange', 'end');
        }
      };
    }

    // Set sub category search element
    if (this.elems.subCat) {
      this.elems.subCat.id = 'aIV-subCat';
      this.elems.subCat.className = 'showSubCat';
      this.elems.subCat.value = this.vals.subCat;
      this.elems.subCat.onchange = function(event) {

        if (app.searchBar.vals.subCat != event.target.value) {
          events.debug.group('searchBar.subCat.onchange', 'coll');

          app.searchBar.vals.subCat = event.target.value;
          app.updateDisplay();

          events.debug.group('searchBar.subCat.onchange', 'end');
        }
      };
    }

    this.debug.group('setMainElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOptElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   * @type {function()}
   */
  SearchBar.prototype.setOptElems = function() {

    this.debug.group('setOptElems', 'coll');
    this.debug.start('setOptElems');

    /**
     * ---------------------------------------------------
     * Private Method (makeOptElem)
     * ---------------------------------------------------
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
    if (this.elems.stage) {
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
    if (this.elems.source) {
      this.debug.state('setOptElems', 'this.ids.source= $$', this.ids.source);
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
    if (this.elems.mainCat) {
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
    if (this.elems.subCat) {
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

    this.debug.group('setOptElems', 'end');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Appends the search bar's elements to the selections root.
   * @type {function()}
   */
  SearchBar.prototype.appendElems = function() {

    this.debug.start('appendElems');

    app.elems.sel.appendChild(this.elems.view);
    app.elems.sel.appendChild(this.elems.order);
    this.elems.stage && app.elems.sel.appendChild(this.elems.stage);
    this.elems.source && app.elems.sel.appendChild(this.elems.source);
    this.elems.mainCat && app.elems.sel.appendChild(this.elems.mainCat);
    this.elems.subCat && app.elems.sel.appendChild(this.elems.subCat);
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.updateSubCatOpts)
   * -----------------------------------------------------
   * @desc Updates the children appended to the sub category select element.
   * @param {string=} val - The new value to update subCat to.
   */
  SearchBar.prototype.updateSubCatOpts = function(val) {

    this.debug.start('updateSubCatOpts', val);
    this.debug.args('updateSubCatOpts', val, 'string=');

    // Update the select value
    val = val || 'all';
    this.vals.subCat = val;
    this.elems.subCat.value = val;

    // Clear subCat's children
    while (this.elems.subCat.firstChild) {
      this.elems.subCat.removeChild(this.elems.subCat.firstChild);
    }

    // Append the new children
    this.opts.subCat[this.vals.mainCat].forEach(function(/** elem */ elem) {
      this.elems.subCat.appendChild(elem);
    }, this);
  };
