  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @param {number} questionsLen - The total number of questions.
   * @constructor
   */
  var AppVals = function(questionsLen) {

    var thisDebug;

    this.debug = aIV.debug('AppVals');
    thisDebug = this.debug;

    this.debug.start('init', questionsLen);

    checkArgs(questionsLen, 'number');

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
    freezeObj(allIds);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.get)
     * -----------------------------------------------
     * @desc Gets an AppVals protected property.
     * @param {string} prop - The name of the property to get.
     * @return {!(number|numbers)}
     */
    this.get = function(prop) {

      /** @type {Object<string, (number|numbers)>} */
      var props = {
        debug : thisDebug,
        allIds: allIds,
        ids   : ids,
        len   : len,
        index : index
      };

      return getter.call(props, prop);
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

      checkArgs(newIds, 'numbers', newIndex, 'number=');

      if (newIds) {
        ids = newIds.slice(0);
        len = ids.length;
      }

      if ( checkType(newIndex, 'number') ) {
        index = newIndex;
      }

      this.debug.end('set');
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

    this.debug.end('init');
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

    this.debug.start('reset', ids, index);

    /** @type {number} */
    var len;

    checkArgs(ids, 'numbers', index, 'number=');

    index = index || 0;

    ids = ids || this.get('allIds');
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

    this.debug.end('reset');
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
  AppVals.prototype.move = (function setupAppVals_move() {

    /** function(string) */
    var throwParamError = function(way) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'An aIV.app internal error occurred. An AppVals.move call ';
      errorMsg += 'received an invalid way parameter. way= ' + way;
      throw new Error(errorMsg);
    };

    return function move(way) {

      this.debug.start('move', way);

      /** @type {number} */
      var id;
      /** @type {string} */
      var view;
      /** @type {number} */
      var index;
      /** @type {number} */
      var last;

      checkArgs(way, 'string|number');

      if ( checkType(way, 'number') ) {
        id  = way;
        way = null;
      }
      else {
        id = 0;
      }

      index = this.get('index');

      // Check the value for way & convert number strings to a number
      if (typeof way === 'string' && way !== 'prev' && way !== 'next') {
        id = way.replace(/[^0-9]/g, '');
        id = id || Number(id);
        id || throwParamError(way);
        way = null;
      }

      view = app.searchBar.vals.view;

      if (way) {

        // Save the last index
        last = this.get('len') - 1;

        if (view === 'one') {

          // Handle moving the index one spot
          if (way === 'prev') {
            index = (index === 0) ? last : --index;
          }
          else if (way === 'next') {
            index = (index === last) ? 0 : ++index;
          }
        }
        else if (view === 'ten') {

          // Handle moving the index ten spots
          last = last - (last % 10);
          if (way === 'prev') {
            index = (index === 0) ? last : (index - 10);
          }
          else if (way === 'next') {
            index = (index === last) ? 0 : (index + 10);
          }
        }
      }
      else {

        // Handle moving to a specific question id
        (id) || (id <= app.questions.len) || throwParamError(id);
        if (view !== 'one') {
          app.searchBar.vals.view = 'one';
        }
        index = this.get('ids').indexOf(id);
        (index !== -1) || throwParamError(id);
      }

      this.set(null, index);

      this.debug.end('move', index);

      return index;
    };
  })();
