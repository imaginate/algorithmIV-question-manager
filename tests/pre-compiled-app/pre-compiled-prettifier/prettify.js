  /**
   * -----------------------------------------------------
   * Public Method (prettify)
   * -----------------------------------------------------
   * @desc The prettifier for this app.
   * @param {string} solution - The problem's solution to be formatted.
   * @return {{
   *   result   : string,
   *   lineCount: number
   * }}
   */
  var prettify = (function() {

/* -----------------------------------------------------------------------------
 * | The Prettifier Vars                                                       |
 * v ------------------------------------------------------------------------- v
                                                           prettify-vars.js */

/* -----------------------------------------------------------------------------
 * | The Prettifier Methods                                                    |
 * v ------------------------------------------------------------------------- v
                                                        prettify-methods.js */

/* -----------------------------------------------------------------------------
 * | The Highlight Syntax Method                                               |
 * v ------------------------------------------------------------------------- v
                                                        highlight-syntax.js */

    return function(solution) {

      prettify.debug.group('init', 'coll', 'solution= $$', solution);
      prettify.debug.start('init', solution);
      prettify.debug.args('init', solution, 'string');

      /** @type {{ result: string, lineCount: number }} */
      var result;

      // Format the solution
      result = applyFormatting( prepareLines(solution) );

      prettify.debug.group('init', 'end');

      return result;
    };
  })();
