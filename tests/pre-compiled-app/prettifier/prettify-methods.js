    /**
     * ---------------------------------------------
     * Private Method (prepareLines)
     * ---------------------------------------------
     * @desc Standardizes all line breaks, replaces tabs with whitespaces,
     *   and trims the anonymous function wrapper.
     * @param {string} solution - The problem's solution to be formatted.
     * @return {strings}
     * @private
     */
    function prepareLines(solution) {

      prettify.debug.start('prepareLines', solution);
      prettify.debug.args('prepareLines', solution, 'string');

      /** @type {string} */
      var spaces;
      /** @type {number} */
      var spaceCount;

      // Standardize all line breaks
      solution = solution.replace(/\r\n?/g, '\n');

      // Replace all tabs with spaces
      spaces = '';
      spaceCount = app.config.prettifier.get('tabLength');
      while (spaceCount--) {
        spaces += ' ';
      }
      if (spaces) {
        solution = solution.replace(/\t/g, '  ');
      }

      // Trim the anonymous function
      solution = solution.replace(/^function\s?\(\)\s?\{\n|\n\}\;$/g, '');

      return solution.split('\n');
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormatting)
     * ---------------------------------------------
     * @desc Applies the prettifier formats.
     * @param {strings} lines - An array of code lines.
     * @return {{
     *   result   : string,
     *   lineCount: number
     * }}
     * @private
     */
    function applyFormatting(lines) {

      prettify.debug.start('applyFormatting', lines);
      prettify.debug.args('applyFormatting', lines, 'strings');

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {} */
      var line;

      commentOpen = false;
      len = lines.length;

      i = -1;
      while (++i < len) {

        line = prepareLine(lines[i]);

        if (line) {
          line = highlightSyntax(line, i);
        }

        lines[i] = '<li>'+ line +'</li>';

        prettify.debug.state('applyFormatting', 'lines[i]= $$', lines[i]);
      }

      return {
        result   : lines.join(''),
        lineCount: len
      };
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLine)
     * ---------------------------------------------
     * @desc Removes whitespaces from line beginning and end.
     * @param {string} line - The line of code to prepare.
     * @return {string}
     * @private
     */
    function prepareLine(line) {

      prettify.debug.start('prepareLine', line);
      prettify.debug.args('prepareLine', line, 'string');

      /** @type {number} */
      var i;
      /** @type {number} */
      var frontTrimCount;
      /** @type {string} */
      var trimPart;

      // Trim ending whitespaces
      if (line) {
        i = line.length - 1;
        if (line.charAt(i) === ' ') {
          --i;
          while (line.charAt(i) === ' ') {
            --i;
          }
          line = line.substr(0, i);
        }
      }

      // Trim beginning whitespaces
      frontTrimCount = app.config.prettifier.get('trimSpace');
      if (line && frontTrimCount) {

        trimPart = ( (frontTrimCount < line.length) ?
          line.substr(0, frontTrimCount) : ''
        );
        if (trimPart && !/[^\s]/.test(trimPart)) {
          // Trim full count
          line = line.substr(frontTrimCount);
        }
        else {
          // Trim partial count
          i = 0;
          while (line.charAt(i) === ' ') {
            ++i;
          }
          line = line.substr(i);
        }
      }

      return line;
    }
