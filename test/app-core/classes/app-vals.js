  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @constructor
   */
  var AppVals = function() {

    /**
     * ---------------------------------------------------
     * Private Property (AppVals.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('AppVals') : null;

    DEBUG && this.debug.start('init');

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
     * @param {string} part - The name of the value to get.
     * @return {(num|nums)}
     */
    this.get = function(part) {
      /** @private */
      var values = {
        ids  : ids,
        len  : len,
        index: index
      };

      return ( values.hasOwnProperty(part) ) ? values[part] : null;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (AppVals.reset)
     * -----------------------------------------------
     * @desc Resets the app values.
     * @param {nums} newIds - The new matching question ids.
     * @param {num=} newIndex - The starting index.
     */
    this.reset = function(newIds, newIndex) {

      var msg;
      if (DEBUG) {
        this.debug.start('reset', newIds, newIndex);
        this.debug.args('reset', newIds, 'numbers', newIndex, 'number=');
      }

      /**
       * @type {num}
       * private
       */
      var len;
      /**
       * @type {boolean}
       * @private
       */
      var checkIds;
      /**
       * @type {string}
       * private
       */
      var view;

      len = newIds.length || 0;

      // Check newIds
      checkIds = Array.isArray(newIds);
      if (checkIds && len) {
        checkIds = newIds.every(function(/** number */ val) {
          return (typeof val === 'number');
        });
      }
      if (!checkIds) {
        if (DEBUG) {
          msg = 'Error: The newIds given were not an array of numbers. newIds= $$';
          this.debug.fail('reset', false, msg, newIds);
        }
        return;
      }

      // Save the value of the current view
      view = app.searchBar.vals.view;

      // Set newIndex
      if (view === 'all') {
        newIndex = -1;
      }
      else {
        if (len) {
          if (typeof newIndex !== 'number' || newIndex < 0 || newIndex >= len) {
            newIndex = 0;
          }
        }
        else {
          newIndex = -1;
        }
      }

      // Reset the values
      ids = (newIds.length) ? newIds.slice(0) : [];
      len = ids.length;
      index = newIndex;
    };

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

      // Debugging
      var msg, pass;
      if (DEBUG) {
        this.debug.start('move', way);
        this.debug.args('move', way, 'string|number');
        // Error message for initial value checks
        msg = 'Error: An incorrect value was given for way. way= $$';
      }

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
        DEBUG && this.debug.fail('move', !!way, msg, way);
        way = Number(way);
      }

      if (DEBUG && typeof way !== 'string') {
        pass = (way > 0 && way <= app.questions.len);
        this.debug.fail('move', pass, msg, way);
      }

      // Save the value of the current view
      view = app.searchBar.vals.view;

      if (typeof way === 'number') {
        if (view !== 'one') {
          app.searchBar.vals.view = 'one';
        }
        index = ids.indexOf(way);
        DEBUG && this.debug.fail('move', (index !== -1), msg, way);
        return index;
      }

      if (DEBUG) {
        // Error message for remaining debugging
        msg = 'Error: This method should not have been called now. ';
        msg += 'The nav elements should be hidden.';
      }

      // Save the last index
      last = len - 1;

      // The single view actions
      if (view === 'one') {

        DEBUG && this.debug.fail('move', (len > 1), msg);

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

        DEBUG && this.debug.fail('move', (len > 10), msg);

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

      if (DEBUG) {
        msg = 'Error: An incorrect view was parsed. ';
        msg += 'app.searchBar.vals.view= $$';
        this.debug.fail('move', false, msg, view);
      }
    };


    // Setup the properties
    ids = [];
    len = 0;
    index = 0;
  };

  // Ensure constructor is set to this class.
  AppVals.prototype.constructor = AppVals;
