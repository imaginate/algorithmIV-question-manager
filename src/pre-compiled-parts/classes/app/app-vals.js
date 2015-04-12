  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @param {number} quesLen - The number of questions for the app.
   * @constructor
   */
  var AppVals = function(quesLen) {

    /** @type {number} */
    var i;

    /**
     * ----------------------------------------------- 
     * Protected Property (AppVals.ids)
     * -----------------------------------------------
     * @desc The ids of the questions that match the current search
     *   criteria.
     * @type {nums}
     * @private
     */
    var ids;

    /**
     * ----------------------------------------------- 
     * Protected Property (AppVals.len)
     * -----------------------------------------------
     * @desc The number of questions that match the current search
     *   criteria.
     * @type {num}
     * @private
     */
    var len;

    /**
     * ----------------------------------------------- 
     * Protected Property (AppVals.index)
     * -----------------------------------------------
     * @desc The current index of the ids array being displayed.
     *   If the view = 'all' or no ids match then index = -1.
     * @type {num}
     * @private
     */
    var index;

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.get)
     * -----------------------------------------------
     * @desc Gets an app value.
     * @param {string} prop - The name of the value to get.
     * @return {(num|nums)}
     */
    this.get = function(prop) {

      /** @type {Object<string, (num|nums)>} */
      var values = {
        ids  : ids,
        len  : len,
        index: index
      };

      return values[prop];
    };
    Object.freeze(this.get);

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.reset)
     * -----------------------------------------------
     * @desc Resets the app values.
     * @param {nums} newIds - The new matching question ids.
     * @param {number=} newIndex - The starting index.
     */
    this.reset = function(newIds, newIndex) {

      /** @type {number} */
      var newLen;

      newLen = ( checkType(newIds, 'numbers') ) ? newIds.length : 0;

      // Set newIndex
      if (app.searchBar.vals.view === 'all') {
        newIndex = -1;
      }
      else {
        if (newLen) {
          if (typeof newIndex !== 'number' ||
              newIndex < 0 || newIndex >= newLen) {
            newIndex = 0;
          }
        }
        else {
          newIndex = -1;
        }
      }

      // Reset the values
      ids = (newLen) ? newIds.slice(0) : [];
      len = newLen;
      index = newIndex;
    };
    Object.freeze(this.reset);

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.move)
     * -----------------------------------------------
     * @desc Go to the prev, next, or a specific index.
     * @param {(string|number)} way - The location to move the index.
     *   The options are 'prev', 'next', or a question id.
     * @return {num} The new index.
     */
    this.move = function(way) {

      /**
       * @type {string}
       * private
       */
      var view;
      /**
       * @type {num}
       * private
       */
      var last;

      // Check the value for way
      if (typeof way === 'string' &&
          way !== 'prev' && way !== 'next') {
        way = way.replace(/[^0-9]/g, '');
        way = Number(way);
      }

      // Save the value of the current view
      view = app.searchBar.vals.view;

      if (typeof way === 'number') {
        if (view !== 'one') {
          app.searchBar.vals.view = 'one';
        }
        index = ids.indexOf(way);
        return index;
      }

      // Save the last index
      last = len - 1;

      // The single view actions
      if (view === 'one') {

        if (way === 'prev') {
          index = (index === 0) ? last : --index;
        }
        else if (way === 'next') {
          index = (index === last) ? 0 : ++index;
        }

        return index;
      }

      // The ten view actions
      if (view === 'ten') {

        // Update the last index
        last -= (last % 10);

        if (way === 'prev') {
          index = (index === 0) ? last : (index - 10);
        }
        else if (way === 'next') {
          index = (index === last) ? 0 : (index + 10);
        }

        return index;
      }

    };
    Object.freeze(this.move);

    // Setup the properties
    ids = new Array(quesLen);
    len = quesLen;
    index = 0;

    i = quesLen;
    while (i--) {
      ids[i] = i + 1;
    }
  };

  // Ensure constructor is set to this class.
  AppVals.prototype.constructor = AppVals;
