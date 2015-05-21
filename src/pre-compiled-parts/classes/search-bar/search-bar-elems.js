  /**
   * -----------------------------------------------------
   * Public Class (SearchBarElems)
   * -----------------------------------------------------
   * @desc The search bar's values and elements for this app.
   * @param {!booleanMap} config - The app's search bar config settings.
   * @constructor
   */
  var SearchBarElems = function(config) {

    checkArgs(config, '!booleanMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.view)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-view.
     * @type {!HTMLSelectElement}
     */
    this.view;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.order)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-order.
     * @type {!HTMLSelectElement}
     */
    this.order;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.stage)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-stage.
     * @type {?HTMLSelectElement}
     */
    this.stage;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.source)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-source.
     * @type {?HTMLSelectElement}
     */
    this.source;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.mainCat)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-mainCat.
     * @type {?HTMLSelectElement}
     */
    this.mainCat;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.subCat)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-subCat.
     * @type {?HTMLSelectElement}
     */
    this.subCat;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.view = makeElem({
      tag      : 'select',
      id       : 'aIV-view',
      className: 'showView'
    });
    this.view.onchange = function(event) {
      Events.searchView(event.target.value);
    };

    this.order = makeElem({
      tag      : 'select',
      id       : 'aIV-order',
      className: 'showOrder'
    });
    this.order.onchange = function(event) {
      Events.searchOrder(event.target.value);
    };

    this.stage = null;
    if (config.stage) {
      this.stage = makeElem({
        tag      : 'select',
        id       : 'aIV-stage',
        className: 'showStage'
      });
      this.stage.onchange = function(event) {
        Events.searchStage(event.target.value);
      };
    }

    this.source = null;
    if (config.source) {
      this.source = makeElem({
        tag      : 'select',
        id       : 'aIV-source',
        className: 'showSource'
      });
      this.source.onchange = function(event) {
        Events.searchSource(event.target.value);
      };
    }

    this.mainCat = null;
    if (config.category) {
      this.mainCat = makeElem({
        tag      : 'select',
        id       : 'aIV-mainCat',
        className: 'showMainCat'
      });
      this.mainCat.onchange = function(event) {
        Events.searchMainCat(event.target.value);
      };
    }

    this.subCat = null;
    if (config.subCat) {
      this.subCat = makeElem({
        tag      : 'select',
        id       : 'aIV-subCat',
        className: 'showSubCat'
      });
      this.subCat.onchange = function(event) {
        Events.searchSubCat(event.target.value);
      };
    }

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBarElems.prototype.constructor = SearchBarElems;

  /**
   * --------------------------------------------------------------
   * Public Method (SearchBarElems.prototype.setValuesToDefaults)
   * --------------------------------------------------------------
   * @desc Updates the search bar's values to the defaults.
   * @param {!Object<string, string>} defaults - The default values.
   */
  SearchBarElems.prototype.setValuesToDefaults = function(defaults) {

    checkArgs(defaults, '!stringMap');

    this.view.value  = defaults.view;
    this.order.value = defaults.order;
    if (this.stage) {
      this.stage.value = defaults.stage;
    }
    if (this.source) {
      this.source.value = defaults.source;
    }
    if (this.mainCat) {
      this.mainCat.value = defaults.mainCat;
    }
    if (this.subCat) {
      this.subCat.value = defaults.subCat;
    }

  };

  /**
   * -------------------------------------------------------
   * Public Method (SearchBarElems.prototype.appendToMain)
   * -------------------------------------------------------
   * @desc Appends the search bar's elements to the selections root.
   * @type {function}
   */
  SearchBarElems.prototype.appendToMain = function() {

    /** @type {!Element} */
    var sel;

    sel = app.elems.sel;

    sel.appendChild(this.view);
    sel.appendChild(this.order);
    this.stage   && sel.appendChild(this.stage);
    this.source  && sel.appendChild(this.source);
    this.mainCat && sel.appendChild(this.mainCat);
    this.subCat  && sel.appendChild(this.subCat);

  };
