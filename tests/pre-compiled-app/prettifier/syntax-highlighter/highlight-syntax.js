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

/* -----------------------------------------------------------------------------
 * | The Syntax Highlighter Vars                                               |
 * v ------------------------------------------------------------------------- v
                     prettifier/syntax-highlighter/highlight-syntax-vars.js */

/* -----------------------------------------------------------------------------
 * | The Syntax Highlighter Methods                                            |
 * v ------------------------------------------------------------------------- v
                  prettifier/syntax-highlighter/highlight-syntax-methods.js */

      return function(line) {

        highlightSyntax.debug.start('init', inputLine);
        highlightSyntax.debug.args('init', inputLine, 'string');

        prepareLine(line);
        formatLine();

        return newLine.join('');
      };
    })();
