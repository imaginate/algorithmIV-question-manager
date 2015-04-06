    /**
     * ---------------------------------------------
     * Private Method (highlightSyntax)
     * ---------------------------------------------
     * @desc Adds spans around reserved code characters to highlight
     *   specific syntax for a line of code.
     * @param {string} line - The line of code to highlight.
     * @param {number} i - The current line number for the debug group.
     * @return {string}
     * @private
     */
    var highlightSyntax = (function() {

      var highlightSyntax = function(line, i) {

        // Debugging vars
        var msg;
        msg = 'lineNumber= $$';
        highlightSyntax.debug.group('init', 'coll', msg, i);
        highlightSyntax.debug.start('init', line, i);
        highlightSyntax.debug.args('init', line, 'string', i, 'number');

        prepareLine(line);
        formatLine();

        highlightSyntax.debug.group('init', 'end');

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
