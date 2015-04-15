  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @param {number} questionsLen - The total number of questions.
   * @constructor
   */
  var AppVals = function(questionsLen) {

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

      /** @type {Object<string, (number|numbers)>} */
      var props = {
        allIds: allIds,
        ids   : ids,
        len   : len,
        index : index
      };

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
        return;
      }
    }

    view = app.searchBar.vals.view;

    // Handle moving to a specific question id
    if (id) {

      if (view !== 'one') {
        app.searchBar.vals.view = 'one';
      }

      index = this.get('ids').indexOf(way);

      this.set(null, index);

      return index;
    }

    // Save the last index
    last = this.get('len') - 1;

    // Handle moving the index one spot
    if (view === 'one') {

      if (way === 'prev') {
        index = (index === 0) ? last : --index;
      }
      else if (way === 'next') {
        index = (index === last) ? 0 : ++index;
      }

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

  };
