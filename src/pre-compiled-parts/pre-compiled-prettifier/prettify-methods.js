    /**
     * ---------------------------------------------
     * Public Method (prettify.setConfig)
     * ---------------------------------------------
     * @desc Sets the config settings for the prettifier.
     * @param {!Object<string, (number|boolean)>} newConfig - The config
     *   settings for the prettifier.
     * @private
     */
    prettify.setConfig = function(newConfig) {

      checkArgs(newConfig, '!object');

      config = newConfig;
      freezeObj(config);

    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLines)
     * ---------------------------------------------
     * @desc Standardizes all line breaks and replaces tabs with spaces.
     * @param {string} solution - The problem's solution to be formatted.
     * @return {!strings}
     * @private
     */
    function prepareLines(solution) {

      /** @type {!strings} */
      var lines;
      /** @type {string} */
      var spaces;
      /** @type {number} */
      var spaceCount;

      checkArgs(solution, 'string');

      // Standardize all line breaks
      solution = solution.replace(/\r\n?/g, '\n');

      // Replace all tabs with spaces
      spaces = '';
      spaceCount = config.tabLength;
      while (spaceCount--) {
        spaces += ' ';
      }
      if (spaces) {
        solution = solution.replace(/\t/g, '  ');
      }

      lines = solution.split('\n');

      return lines;
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormatting)
     * ---------------------------------------------
     * @desc Applies the prettifier formats.
     * @param {!strings} lines - An array of code lines.
     * @return {!{
     *   result   : string,
     *   lineCount: number
     * }}
     * @private
     */
    function applyFormatting(lines) {

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {string} */
      var line;
      /** @type {!Object} */
      var result;

      checkArgs(lines, '!strings');

      commentOpen = false;
      len = lines.length;

      i = -1;
      while (++i < len) {

        line = prepareLine(lines[i]);

        if (line) {
          line = highlightSyntax(line, i);
        }

        lines[i] = '<li>'+ line +'</li>';

      }

      result = {
        result   : lines.join(''),
        lineCount: len
      };

      return result;
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

      /** @type {number} */
      var i;
      /** @type {number} */
      var frontTrimCount;
      /** @type {string} */
      var trimPart;

      checkArgs(line, 'string');

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
      frontTrimCount = config.trimSpace;
      if (line && frontTrimCount) {

        trimPart = ( (frontTrimCount < line.length) ?
          line.substr(0, frontTrimCount) : ''
        );
        if (trimPart && !notSpace.test(trimPart)) {
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

    /**
     * ---------------------------------------------
     * Private Method (makeKeywordObj)
     * ---------------------------------------------
     * @desc Creates a keyword object.
     * @param {string} cat - The keyword's category.
     * @param {string=} href - The keyword's details link.
     * @param {boolean=} props - Whether the keyword has properties.
     * @return {!Object<string, (string|numberMap)>}
     * @private
     */
    function makeKeywordObj(cat, href, props) {

      /** @type {!Object<string, (string|numberMap)>} */
      var obj;

      checkArgs(cat, 'string', href, 'string=', props, 'boolean=');

      href = href || '';
      props = props || false;

      obj = {};

      obj.cat = cat;
      obj.href = href;
      obj.props = (props) ? {} : false;

      freezeObj(obj);

      return obj;
    }

    /**
     * ---------------------------------------------
     * Private Method (makePropObj)
     * ---------------------------------------------
     * @desc Creates a keyword property object.
     * @param {string=} href - The keyword's details link.
     * @return {!stringMap}
     * @private
     */
    function makePropObj(href) {

      /** @type {!stringMap} */
      var obj;

      checkArgs(href, 'string=');

      href = href || '';

      obj = {};
      obj.href = href;

      freezeObj(obj);

      return obj;
    }
