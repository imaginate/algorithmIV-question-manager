    /**
     * ---------------------------------------------
     * Private Method (highlightSyntax)
     * ---------------------------------------------
     * @desc Adds spans around reserved code characters to highlight
     *   specific syntax for a line of code.
     * @param {string} line - The line of code to highlight.
     * @return {string}
     * @private
     */
    var highlightSyntax = (function() {

      var highlightSyntax = function(line) {

        checkArgs(line, 'string');

        prepareLine(line);
        formatLine();

        return newLine.join('');
      };

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Variables (pre-compiled-prettifier/
 *                                 pre-compiled-syntax-highlighter/
 *                                 highlight-syntax-vars.js)
 * -------------------------------------------------------------------------- */
// insert-highlight-syntax-vars

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Methods (pre-compiled-prettifier/
 *                               pre-compiled-syntax-highlighter/
 *                               highlight-syntax-methods.js)
 * -------------------------------------------------------------------------- */
// insert-highlight-syntax-methods

      return highlightSyntax;

    })();
