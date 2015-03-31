    /**
     * ---------------------------------------------
     * Private Method (setPadding)
     * ---------------------------------------------
     * saves the line's padding level
     * param: the first line character (string)
     * param: the last line character (string)
     * @type {function(string, string): number}
     * @private
     */
    function setPadding(first, last) {
      // Debuggers
      DEBUG.PrettifyCode.call && console.log(
        'CALL: PrettifyCode.setPadding(%s, %s)', first, last
      );
      DEBUG.PrettifyCode.fail && console.assert(
        (typeof first === 'string' &&
         typeof last  === 'string'),
        'FAIL: PrettifyCode.setPadding() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var padding;
      // Adjust padding level
      switch (first) {
        case '}':
        case ']':
        case ')':
          --paddingLevel;
      }
      // Set current padding
      padding = paddingLevel * linePadding;
      // Adjust padding level
      switch (last) {
        case '{':
        case '[':
        case '(':
        case '?':
         ++paddingLevel;
      }
      return padding;
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLine)
     * ---------------------------------------------
     * removes extra spaces, sets the first and last
        line character, and registers empty lines
        for the supplied line of code
     * param: line of code (string)
     * @type {function(string): {
            line: string,
           first: string,
            last: string,
         padding: number,
           empty: boolean
       }}
     * @private
     */
    function prepareLine(l) {
      // Debuggers
      DEBUG.PrettifyCode.call && console.log(
        'CALL: PrettifyCode.prepareLine()'
      );
      DEBUG.PrettifyCode.fail && console.assert(
        typeof l === 'string',
        'FAIL: PrettifyCode.prepareLine() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var i, len, last, line;
      // Convert line to array
      l = l.split('');
      // Save array length
      len  = l.length;
      // Save last index
      last = len - 1;
      // Set object with all line properties
      line = {
           code: '',
          first: '',
           last: '',
        padding:  0,
          empty: false
      };
      // Trim starting whitespace
      looper1:
      for(i=0; i<len; i++) {
        if (l[i] === ' ') {
          l[i] = '';
        }
        else {
          line.first = l[i];
          break looper1;
        }
        if (i === last) {
          line.empty = true;
        }
      }
      // If (line is not empty)
      // Then {trim end whitespace}
      if (!line.empty) {
        looper2:
        for(i=last; i>=0; i--) {
          if (l[i] === ' ') {
            l[i] = '';
          }
          else {
            line.last = l[i];
            break looper2;
          }
        }
      }
      // Save line string
      line.code = l.join('');
      return line;
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormatting)
     * ---------------------------------------------
     * @desc Applies the prettifier formats.
     * @param {strings} lines - An array of pre-formatted code lines.
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

      paddingLevel = 0;
      commentOpen  = false;
      len = lines.length;

      i = -1;
      while (++i < len) {

        line = prepareLine(lines[i]);

        // Set line padding and highlight syntax
        if (!line.empty) {
          line.padding = setPadding(line.first, line.last);
          line.code = HighlightSyntax.init(line.code, i);
        }
        lines[i] = '<li style="padding-left:' +
        line.padding +'px">'+ line.code +'</li>';

        prettify.debug.state('applyFormatting', 'lines[i]= $$', lines[i]);
      }

      return { result: lines.join(''), lineCount: len };
    }
