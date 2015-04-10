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

        prepareLine(line);
        formatLine();

        return newLine.join('');
      };

/* -----------------------------------------------------------------------------
 * | The Syntax Highlighter Vars                                               |
 * v ------------------------------------------------------------------------- v
                                                   highlight-syntax-vars.js */

/* -----------------------------------------------------------------------------
 * | The Syntax Highlighter Methods                                            |
 * v ------------------------------------------------------------------------- v
                                                highlight-syntax-methods.js */

      return highlightSyntax;
    })();
