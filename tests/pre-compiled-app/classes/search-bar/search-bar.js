  /**
   * -----------------------------------------------------
   * Public Class (SearchBar)
   * -----------------------------------------------------
   * @desc The search bar's values and elements for this app.
   * @todo Break this class down into smaller pieces with appropriate
   *   getters and setters.
   * @param {!booleanMap} config - The app's search bar config settings.
   * @param {!Sources} sources - The app's sources.
   * @param {!Categories} categories - The app's categories.
   * @constructor
   */
  var SearchBar = function(config, sources, categories) {

    this.debug = aIV.debug('SearchBar');

    this.debug.start('init', config, sources, categories);

    checkArgs(config, '!booleanMap', sources, '!object', categories, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.vals)
     * -----------------------------------------------
     * @desc The current selected values.
     * @type {!{
     *   view   : string,
     *   order  : string,
     *   stage  : string,
     *   source : string,
     *   mainCat: string,
     *   subCat : string
     * }}
     */
    this.vals;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.names)
     * -----------------------------------------------
     * @desc The hash map of the search bar's ids and names.
     * @type {!{
     *   view   : !stringMap,
     *   order  : !stringMap,
     *   stage  : !stringMap,
     *   source : !stringMap,
     *   mainCat: !stringMap,
     *   subCat : !stringMap
     * }}
     */
    this.names;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ids)
     * -----------------------------------------------
     * @desc The search bar's ids in order of appearance.
     * @type {!{
     *   view   : !strings,
     *   order  : !strings,
     *   stage  : !strings,
     *   source : !strings,
     *   mainCat: !strings,
     *   subCat : !Object<string, !strings>
     * }}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ques)
     * -----------------------------------------------
     * @desc The question ids matching the search property values.
     * @type {!{
     *   stage: !Object<string, !numbers>
     * }}
     */
    this.ques;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.opts)
     * -----------------------------------------------
     * @desc The option elements for the search bar.
     * @type {!{
     *   view   : !elements,
     *   order  : !elements,
     *   stage  : !elements,
     *   source : !elements,
     *   mainCat: !elements,
     *   subCat : !Object<string, !elements>
     * }}
     */
    this.opts;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.elems)
     * -----------------------------------------------
     * @desc The HTMLSelectElements for searching in the app.
     * @type {!SearchBarElems}
     */
    this.elems;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var sourceId;
    /** @type {!strings} */
    var mainSubs;
    /** @type {!Category} */
    var mainCat;
    /** @type {string} */
    var mainId;
    /** @type {string} */
    var subId;
    /** @type {boolean} */
    var pass;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    // Setup the current values
    this.vals = {
      view   : 'one',
      order  : 'asc',
      stage  : 'all',
      source : 'all',
      mainCat: 'all',
      subCat : 'all'
    };

    // Setup the names property
    this.names = {};
    this.names.view = {
      one: 'View One',
      ten: 'View Ten',
      all: 'View All'
    };
    this.names.order = {
      asc : 'ASC',
      desc: 'DESC'
    };
    this.names.stage = {
      all: 'All Stages',
      com: 'Completed',
      inc: 'Incomplete'
    };
    this.names.source = {
      all: 'All Sources'
    };
    this.names.mainCat = {
      all: 'All Main Categories'
    };
    this.names.subCat = {
      all: 'All Sub Categories'
    };

    // Add each source to the names property
    i = sources.len;
    while (i--) {
      sourceId = sources.ids[i];
      this.names.source[ sourceId ] = sources.get(sourceId, 'name');
    }

    // Setup the ids property
    this.ids = {
      view   : [ 'one','ten','all' ],
      order  : [ 'asc','desc' ],
      stage  : [ 'all','com','inc' ],
      source : [ 'all' ].concat(sources.ids),
      mainCat: [ 'all' ].concat(categories.ids),
      subCat : {}
    };

    // Setup the opts property
    this.opts = {
      view   : [],
      order  : [],
      stage  : [],
      source : [],
      mainCat: [],
      subCat : { all: [] }
    };

    debugMsg = 'Sources.ids= $$, SearchBar.ids= $$, SearchBar.ids.source= $$';
    this.debug.state('init', debugMsg, sources.ids, this.ids, this.ids.source);

    // Add each category to the names, ids, and opts properties
    i = categories.len;
    while (i--) {
      mainId = categories.ids[i];
      mainCat = categories.get(mainId);
      mainSubs = mainCat.get('subs');

      // Add each main category's name
      this.names.mainCat[ mainId ] = mainCat.get('name');

      // Add each main category to the sub category property in opts
      this.opts.subCat[ mainId ] = [];

      // Add each sub category's id for each main category
      this.ids.subCat[ mainId ] = [ 'all' ].concat(mainSubs);

      // Add each sub category's name
      ii = mainSubs.length;
      while (ii--) {
        subId = mainSubs[ii];
        this.names.subCat[ subId ] = categories.get(subId, 'name');
      }
    }

    // Setup the question ids property
    this.ques = {};
    this.ques.stage = {};
    this.ques.stage.com = [];
    this.ques.stage.inc = [];

    // Check the config values before setting up the search elements
    config.source   = (config.source   && !!sources.len);
    config.category = (config.category && !!categories.len);
    config.subCat   = (config.category && config.subCat);

    // Ensure at least one sub category exists
    pass = !config.subCat;
    i = categories.len;
    while (i-- && !pass) {
      mainId = categories.ids[i];
      pass = !!this.ids.subCat[ mainId ].length;
    }
    config.subCat = (config.subCat && pass);

    // Setup the search elements
    this.elems = new SearchBarElems(config);

    // Freeze all of the completed properties
    freezeObj(this.names);
    freezeObj(this.ids);
    freezeObj(this.opts);
    freezeObj(this.ques.stage);
    freezeObj(this.ques);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

    this.debug.end('init');
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBar.prototype.constructor = SearchBar;

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setToDefaults)
   * -----------------------------------------------------
   * @desc Updates the current search bar's values to the defaults.
   * @param {!Object<string, string>} defaults - The default values.
   */
  SearchBar.prototype.setToDefaults = function(defaults) {

    this.debug.start('setToDefaults', defaults);

    /** @type {!stringMap} */
    var vals;

    checkArgs(defaults, '!stringMap');

    vals = this.vals;

    vals.view    = defaults.view;
    vals.order   = defaults.order;
    vals.stage   = defaults.stage;
    vals.source  = defaults.source;
    vals.mainCat = defaults.mainCat;
    vals.subCat  = defaults.subCat;

    this.elems.setValuesToDefaults(defaults);

    this.debug.end('setToDefaults');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOptElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   * @type {function}
   */
  SearchBar.prototype.setOptElems = function() {

    this.debug.start('setOptElems');

    /**
     * ---------------------------------------------------
     * Private Method (makeOptElem)
     * ---------------------------------------------------
     * @desc A helper function that creates option elements.
     * @param {string} id - The search item's id. If blank then the
     *   option is disabled.
     * @param {string} name - The search item's name.
     * @return {Element}
     * @private
     */
    var makeOptElem = function(id, name) {
      /** @type {Element} */
      var elem;

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

    // Set view search options
    this.ids.view.forEach(function(/** string */ id) {
      /** @type {string} */
      var name;
      /** @type {Element} */
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
      /** @type {Element} */
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
        /** @type {Element} */
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
        /** @type {Element} */
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
        /** @type {Element} */
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
          /** @type {Element} */
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
        /** @type {Element} */
        var elem;

        if (!!this.ids.subCat[mainId]) {

          name = this.names.mainCat[mainId];
          elem = makeOptElem('', name);
          this.opts.subCat['all'].push(elem);

          this.ids.subCat[mainId].forEach(function(/** string */ id) {
            /** @type {string} */
            var name;
            /** @type {Element} */
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

    this.debug.end('setOptElems');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Appends the search bar's elements to the selections root.
   * @type {function}
   */
  SearchBar.prototype.appendElems = function() {

    this.debug.start('appendElems');

    this.elems.appendToMain();

    this.debug.end('appendElems');
  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.updateSubCatOpts)
   * -----------------------------------------------------
   * @desc Updates the children appended to the sub category select element.
   * @param {string=} newVal - The new value to update subCat to.
   */
  SearchBar.prototype.updateSubCatOpts = function(newVal) {

    this.debug.start('updateSubCatOpts', newVal);

    /** @type {elements} */
    var opts;

    checkArgs(newVal, '^string=');

    newVal = newVal || 'all';

    this.vals.subCat = newVal;

    if (this.elems.subCat) {

      // Clear subCat's current option elements
      while (this.elems.subCat.firstChild) {
        this.elems.subCat.removeChild(this.elems.subCat.firstChild);
      }

      // Append the new option elements
      opts = this.opts.subCat[ this.vals.mainCat ];
      opts.forEach(function(/** element */ elem) {
        this.elems.subCat.appendChild(elem);
      }, this);

      this.elems.subCat.value = newVal;
    }

    this.debug.end('updateSubCatOpts');
  };
