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
     * @desc The current index being displayed (for view 'one' and 'ten').
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
      var result;
      /** @private */
      var values = {
        ids  : ids,
        len  : len,
        index: index
      };

      result = ( values.hasOwnProperty(part) ) ? values[part] : null;
      return result;
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
        this.debug.args('reset', newIds, 'array', newIndex, 'number=');
      }

      /**
       * @type {boolean}
       * @private
       */
      var checkIds;

      // Check newIds
      checkIds = ( (Array.isArray(newIds) && newIds.length) ?
        newIds.every(function(/** number */ val) {
          return (typeof val === 'number');
        }) : Array.isArray(newIds)
      );
      if (!checkIds) {
        if (DEBUG) {
          msg = 'Error: The newIds given were not an array of numbers. newIds= $$';
          this.debug.fail('reset', false, msg, newIds);
        }
        return;
      }

      // Check newIndex
      if (typeof newIndex !== 'number' || newIndex < 1) {
        newIndex = 0;
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
     * @desc Go to the prev or next index.
     * @param {string} way - The direction to move the index (prev or next).
     * @return {(num|nums)} The question id(s) for the new index.
     */
    this.move = function(way) {

      var msg;
      if (DEBUG) {
        this.debug.start('move', way);
        this.debug.args('move', way, 'string');
        msg = 'Error: This method should not have been called now. ';
        msg += 'The nav elements should be hidden.';
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

      // Save the value of the current view
      view = app.searchBar.vals.view;

      // Check the view
      if (view !== 'one' && view !== 'ten') {
        DEBUG && this.debug.fail('move', false, msg);
        return;
      }

      // Save the last index
      last = ids.length - 1;

      // The single view actions
      if (view === 'one') {

        if (ids.length < 2) {
          DEBUG && this.debug.fail('move', false, msg);
          return;
        }

        if (way === 'prev') {
          index = (index === 0) ? last : --index;
        }
        else if (way === 'next') {
          index = (index === last) ? 0 : ++index;
        }

        return ids[index];
      }

      // The ten view actions
      if (view === 'ten') {

        if (ids.length < 11) {
          DEBUG && this.debug.fail('move', false, msg);
          return;
        }

        // Update the last index
        last -= (last % 10);

        if (way === 'prev') {
          index = (index === 0) ? last : (index - 10);
        }
        else if (way === 'next') {
          index = (index === last) ? 0 : (index + 10);
        }

        return ( (index === last) ?
          ids.slice(last) : ids.slice(index, (index + 11))
        );
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
