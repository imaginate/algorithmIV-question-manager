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
                                        classes/prettifier/prettify-vars.js */

/* -----------------------------------------------------------------------------
 * | The Prettifier Methods                                                    |
 * v ------------------------------------------------------------------------- v
                                     classes/prettifier/prettify-methods.js */

/* -----------------------------------------------------------------------------
 * | The Line Class                                                            |
 * v ------------------------------------------------------------------------- v
                                           classes/prettifier/line-class.js */

    return function(solution) {

      prettify.debug.group('init', 'coll', 'solution= $$', solution);
      prettify.debug.start('init', solution);
      prettify.debug.args('init', solution, 'string');

      /** @type {{ result: string, lineCount: number }} */
      var result;

      // Standardize all line breaks
      solution = solution.replace(/\r\n?/g, '\n');
      // Replace all tabs with spaces
      solution = solution.replace(/\t/g, '  ');
      // Trim the anonymous function
      solution = solution.replace(/^function\s?\(\)\s?\{|\}\;$/g, '');

      // Format the solution
      result = applyFormatting( solution.split('\n') );

      prettify.debug.group('init', 'end');

      return result;
    };
  })();
