  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @param {number} questionsLen - The total number of questions.
   * @constructor
   */
  var AppVals = function(questionsLen) {

    this.debug = aIV.debug('AppVals');

    this.debug.start('init', questionsLen);

    this.debug.args('init', questionsLen, 'number');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.allIds)
     * -----------------------------------------------
     * @desc The ids of all of the questions.
     * @type {!numbers}
     * @private
     */
    var allIds;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.ids)
     * -----------------------------------------------
     * @desc The ids of the questions that match the current search criteria.
     * @type {!numbers}
     * @private
     */
    var ids;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.len)
     * -----------------------------------------------
     * @desc The number of questions that match the current search criteria.
     * @type {number}
     * @private
     */
    var len;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.index)
     * -----------------------------------------------
     * @desc The current index of the ids array being displayed.
     *   If the view = 'all' or no ids match then index = -1.
     * @type {number}
     * @private
     */
    var index;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;

    allIds = new Array(questionsLen);
    i = questionsLen;
    while (i--) {
      allIds[i] = i + 1;
    }

    ids = allIds.slice(0);
    len = questionsLen;
    index = -1;

    // Freeze the needed protected properties
    Object.freeze(allIds);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.get)
     * -----------------------------------------------
     * @desc Gets an app value.
     * @param {string} prop - The name of the value to get.
     * @return {!(number|numbers)}
     */
    this.get = function(prop) {

      this.debug.start('get', prop);
      this.debug.args('get', prop, 'string');

      /** @type {Object<string, (number|numbers)>} */
      var props = {
        allIds: allIds,
        ids   : ids,
        len   : len,
        index : index
      };

      debugCheck = props.hasOwnProperty(prop);
      debugMsg = 'Error: The given property does not exist. property= $$';
      this.debug.fail('get', debugCheck, debugMsg, prop);

      return props[ prop ];
    };

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.set)
     * -----------------------------------------------
     * @desc Sets the app's current values.
     * @param {numbers} newIds - The new matching question ids.
     * @param {number=} newIndex - The new starting index.
     */
    this.set = function(newIds, newIndex) {

      this.debug.start('set', newIds, newIndex);
      this.debug.args('set', newIds, 'numbers', newIndex, 'number=');

      if (newIds) {
        ids = newIds.slice(0);
        len = ids.length;
      }

      if (typeof newIndex === 'number') {
        index = newIndex;
      }
    };

    // Freeze all of the methods
    Object.freeze(this.get);
    Object.freeze(this.set);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  // Ensure constructor is set to this class.
  AppVals.prototype.constructor = AppVals;

  /**
   * ----------------------------------------------- 
   * Public Method (AppVals.prototype.reset)
   * -----------------------------------------------
   * @desc Resets the app values.
   * @param {numbers} ids - The new matching question ids.
   * @param {number=} index - The new starting index.
   */
  AppVals.prototype.reset = function(ids, index) {

    this.debug.start('reset', ids, index);
    this.debug.args('reset', ids, 'numbers', index, 'number=');

    /** @type {number} */
    var len;

    index = index || 0;

    if (!ids) {
      ids = this.get('allIds');
    }
    len = ids.length;

    // Check the new index value
    if (app.searchBar.vals.view === 'all' || !len) {
      index = -1;
    }
    else if (index < 0 || index >= len) {
      index = 0;
    }

    // Reset the values
    this.set(ids, index);
  };

  /**
   * ----------------------------------------------- 
   * Public Method (AppVals.prototype.move)
   * -----------------------------------------------
   * @desc Go to the prev, next, or a specific index.
   * @param {(string|number)} way - The location to move the index.
   *   The options are 'prev', 'next', or a question id.
   * @return {number} The new index.
   */
  AppVals.prototype.move = function(way) {

    this.debug.start('move', way);
    this.debug.args('move', way, 'string|number');

    /** @type {number} */
    var id;
    /** @type {string} */
    var view;
    /** @type {number} */
    var index;
    /** @type {number} */
    var last;

    id = (typeof way === 'number') ? way : 0;
    index = this.get('index');

    // Check the value for way
    if (typeof way === 'string' && way !== 'prev' && way !== 'next') {
      try {
        id = Number( way.replace(/[^0-9]/g, '') );
      }
      catch (e) {
        debugMsg = 'Error: An incorrect value was given for way. way= $$';
        this.debug.fail('move', false, debugMsg, way);
        return;
      }
    }

    view = app.searchBar.vals.view;

    // Handle moving to a specific question id
    if (id) {

      debugCheck = (id > 0 && id <= app.questions.len);
      debugMsg = 'Error: An incorrect value was given for way. way= $$';
      this.debug.fail('move', debugCheck, debugMsg, way);

      if (view !== 'one') {
        app.searchBar.vals.view = 'one';
      }

      index = this.get('ids').indexOf(way);

      this.set(null, index);

      debugCheck = (index !== -1);
      debugMsg = 'Error: An incorrect value was given for way. way= $$';
      this.debug.fail('move', debugCheck, debugMsg, way);

      return index;
    }

    // Save the last index
    last = this.get('len') - 1;

    // Handle moving the index one spot
    if (view === 'one') {

      this.debug.state('move', 'index= $$', index);

      if (way === 'prev') {
        index = (index === 0) ? last : --index;
      }
      else if (way === 'next') {
        index = (index === last) ? 0 : ++index;
      }

      this.debug.state('move', 'index= $$', index);

      this.set(null, index);

      return index;
    }

    // Handle moving the index ten spots
    if (view === 'ten') {

      // Update the last index
      last = last - (last % 10);

      if (way === 'prev') {
        index = (index === 0) ? last : (index - 10);
      }
      else if (way === 'next') {
        index = (index === last) ? 0 : (index + 10);
      }

      this.set(null, index);

      return index;
    }

    debugMsg = 'Error: An incorrect view was parsed. ';
    debugMsg += 'app.searchBar.vals.view= $$';
    this.debug.fail('move', false, debugMsg, view);
  };
