      /**
       * ---------------------------------------------
       * Private Method (prepareLine)
       * ---------------------------------------------
       * @desc Prepares the line to be highlighted.
       * @param {string} line - The line of code to prepare.
       * @private
       */
      function prepareLine(line) {

        // Debugging vars
        var msg;
        highlightSyntax.debug.start('prepareLine', line);
        highlightSyntax.debug.args('prepareLine', line, 'string');

        orgLine = line.split('');
        newLine = line.split('');
        lineLen = line.length;
        lastIndex = (lineLen) ? lineLen - 1 : 0;

        msg = 'lineLen= $$, lastIndex= $$';
        highlightSyntax.debug.state('prepareLine', msg, lineLen, lastIndex);
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLine)
       * ---------------------------------------------
       * @desc Adds highlighting spans to line of code.
       * @type {function}
       * @private
       */
      function formatLine() {

        highlightSyntax.debug.start('formatLine');

        /** @type {number} */
        var i;
        /** @type {function} */
        var format;

        i = 0;

        if (commentOpen) {
          i = formatCommentStart();
        }

        --i;
        while (++i < lineLen) {
          format = ( ( router.hasOwnProperty(orgline[i]) ) ?
            router[ orgline[i] ] : identifierStart.test(orgline[i]) ?
              formatIdentifier : formatMisc
          );
          i = format(i);
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (handleSlash)
       * ---------------------------------------------
       * @desc Handles which formatting method a slash should use.
       * @param {number} i - The current line index being formatted.
       * @return {number} The index's new location.
       * @private
       */
      function handleSlash(i) {

        highlightSyntax.debug.start('handleSlash', i);
        highlightSyntax.debug.args('handleSlash', i, 'number');

        /** @type {val} */
        var preceding;
        /** @type {number} */
        var end;

        // Handle line comment
        if (orgLine[i + 1] === '/') {
          return formatLineComment(i);
        }

        // Handle comment opening
        if (orgLine[i + 1] === '*') {
          return formatCommentOpen(i);
        }

        // Save preceding character
        preceding = ( (orgLine[i - 1] === ' ') ?
          orgLine[i - 2] : orgLine[i - 1]
        );

        // Handle RegExp
        if (i === 0 || preRegex.test(preceding)) {
          end = isRegex(i);
          if (end) {
            return formatRegex(i, end);
          }
        }

        // Handle operator
        return formatOperator(i);
      }

      /**
       * ---------------------------------------------
       * Private Method (isRegex)
       * ---------------------------------------------
       * @desc Determines if the given index is a regular expression.
       * @param {number} i - The line index to check.
       * @return {number} The last index of the RegExp if RegExp check
       *   passes or 0 if RegExp check fails.
       * @private
       */
      function isRegex(i) {

        // Debugging vars
        var msg;
        highlightSyntax.debug.start('isRegex', i);
        highlightSyntax.debug.args('isRegex', i, 'number');

        /** @type {number} */
        var end;
        /** @type {string} */
        var regexBody;

        end = i + 1;

        if (orgLine[end] === '/') {
          return 0;
        }

        // Find regex end index
        while (true) {

          if (end >= lineLen) {
            return 0;
          }

          sanitizeCharacter(end);

          if (orgLine[end] === '\\') {
            ++end;
            continue;
          }

          if (orgLine[end] === '/') {
            break;
          }

          ++end;
        }

        regexBody = orgLine.slice(++i, end).join('');

        try {
          new RegExp(regexBody);
        }
        catch (e) {
          msg = 'new RegExp(regexBody) error= $$';
          highlightSyntax.debug.state('isRegex', msg, e);
          end = 0;
        }

        return end;
      }

      /**
       * ---------------------------------------------
       * Private Method (sanitizeCharacter)
       * ---------------------------------------------
       * @desc Inserts html entities when needed.
       * @param {number} i - The line index to check.
       * @private
       */
      function sanitizeCharacter(i) {

        highlightSyntax.debug.start('sanitizeCharacter', i);
        highlightSyntax.debug.args('sanitizeCharacter', i, 'number');

        if ( htmlEntity.hasOwnProperty(orgLine[i]) ) {
          newLine[i] = htmlEntity[ orgLine[i] ];
        };
      }

      /**
       * ---------------------------------------------
       * Private Method (skipComment)
       * ---------------------------------------------
       * @desc Moves the index to the end of comment.
       * @param {number} i - The starting line index.
       * @return {number} The comment's end index.
       * @private
       */
      function skipComment(i) {

        highlightSyntax.debug.start('skipComment', i);
        highlightSyntax.debug.args('skipComment', i, 'number');

        while (true) {
          ++i;

          if (i >= lineLen) {
            return i;
          }

          sanitizeCharacter(i);

          if (i !== lastIndex && orgLine[i] === '*' && orgLine[i + 1] === '/') {
            return ++i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipString)
       * ---------------------------------------------
       * @desc Moves the index to the end of the string.
       * @param {number} i - The starting line index.
       * @return {number} The string's end index.
       * @private
       */
      function skipString(i) {

        highlightSyntax.debug.start('skipString', i);
        highlightSyntax.debug.args('skipString', i, 'number');

        /** @type {string} */
        var stringType;

        stringType = orgLine[i];

        while (true) {
          ++i;

          if (i >= lineLen) {
            return lastIndex;
          }

          sanitizeCharacter(i);

          if (orgLine[i] === '\\') {
            ++i;
            continue;
          }

          if (orgLine[i] === stringType) {
            return i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipSpace)
       * ---------------------------------------------
       * @desc Moves the index to the end of the sequence of spaces.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipSpace(i) {

        highlightSyntax.debug.start('skipSpace', i);
        highlightSyntax.debug.args('skipSpace', i, 'number');

        while (true) {
          ++i;

          if (orgLine[i] !== ' ') {
            return --i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipNumber)
       * ---------------------------------------------
       * @desc Moves the index to the end of the number.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipNumber(i) {

        highlightSyntax.debug.start('skipNumber', i);
        highlightSyntax.debug.args('skipNumber', i, 'number');

        /** @type {string} */
        var hexStart;
        /** @type {RegExp} */
        var numberOpts;

        hexStart = (i !== lastIndex) ? orgLine[i] + orgLine[i + 1] : '';
        numberOpts = ( (hexStart === '0x' || hexStart === '0X') ?
          hexNumbers : plainNumbers
        );

        while (true) {
          ++i;

          if (i === lineLen) {
            return lastIndex;
          }

          if ( !numberOpts.test(orgLine[i]) ) {
            return --i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * @desc Moves the index to the end of the identifier.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipIdentifier(i) {

        highlightSyntax.debug.start('skipIdentifier', i);
        highlightSyntax.debug.args('skipIdentifier', i, 'number');

        /** @type {string} */
        var name;
        /** @type {boolean} */
        var propFollows;

        name = '-' + orgLine[i];

        while (true) {
          ++i;

          if (i === lineLen) {
            return { index: --i, name: name };
          }

          if ( identifiers.test(orgLine[i]) ) {
            name += orgLine[i];
            continue;
          }

          propFollows = (orgLine[i] === '.');
          return {
            index: --i,
            name : name,
            props: propFollows
          };
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentLinks)
       * ---------------------------------------------
       * @desc Formats links in a comment.
       * @param {number} start - The line index for the comment start.
       * @param {number} end - The line index for the comment end.
       * @private
       */
      function formatCommentLinks(start, end) {

        // Debugging vars
        var args;
        highlightSyntax.debug.start('formatCommentLinks', start);
        args = [ 'formatCommentLinks' ];
        args.push(start, 'number', end, 'number');
        highlightSyntax.debug.args(args);

        /** @type {string} */
        var comment;
        /** @type {number} */
        var i;
        /** @type {string} */
        var href;
        /** @type {string} */
        var content;

        comment = orgLine.slice(start, end).join('');

        if ( !commentLinks.test(comment) ) {
          return;
        }

        while (true) {
          i = comment.search(commentLinks);

          if (i === -1) {
            return;
          }

          newLine[i] = '';
          ++i;

          href = '';
          content = '';

          // Get the content
          while (orgLine[i] !== ']') {
            newLine[i] = '';
            content += orgLine[i];
            ++i;
          }

          newLine[i] = '';
          ++i;
          newLine[i] = '';
          ++i;

          // Get the href
          while (orgLine[i] !== ')') {
            newLine[i] = '';
            href += orgLine[i];
            ++i;
          }

          // Save the link
          newLine[i] = '<a href="' + href + '">' + content + '</a>';

          // Remove that link from the comment string
          comment = comment.substr(i);
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentOpen)
       * ---------------------------------------------
       * @desc Opens a comment, adds comment spans, and 
       *   moves the index to the end of comment.
       * @param {number} i - The current line index.
       * @return {number} The comment's end index.
       * @private
       */
      function formatCommentOpen(i) {

        highlightSyntax.debug.start('formatCommentOpen', i);
        highlightSyntax.debug.args('formatCommentOpen', i, 'number');

        /** @type {number} */
        var start;

        start = i;

        newLine[i] = '<span class="cmt">/';
        ++i;
        i = (i < lastindex) ? skipComment(i) : ++i;

        if (i >= lineLen) {
          commentOpen = true;
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if ( app.config.prettifier.get('commentLinks') ) {
          formatCommentLinks(start, i);
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentStart)
       * ---------------------------------------------
       * @desc Adds comment spans and moves the index to the end
       *   of the comment for a line inheriting an already open
       *   comment (i.e. line began as a comment).
       * @return {number} 
       * @private
       */
      function formatCommentStart() {

        highlightSyntax.debug.start('formatCommentStart');

        /** @type {number} */
        var i;

        newLine[0] = '<span class="cmt">' + orgLine[0];

        if (orgLine[0] === '*' && orgLine[1] === '/') {
          commentOpen = false;
          newLine[1] += '</span>';
          return 3;
        }

        i = skipComment(0);
        commentOpen = (i < lastIndex) ? false : true;

        if (i > lastIndex) {
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if ( app.config.prettifier.get('commentLinks') ) {
          formatCommentLinks(0, i);
        }

        return ++i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLineComment)
       * ---------------------------------------------
       * @desc Adds comment spans and moves index to line end.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatLineComment(i) {

        highlightSyntax.debug.start('formatLineComment', i);
        highlightSyntax.debug.args('formatLineComment', i, 'number');

        if ( app.config.prettifier.get('commentLinks') ) {
          formatCommentLinks(i, lastIndex);
        }

        newLine[i] = '<span class="cmt">/';
        i = lastIndex;
        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatString)
       * ---------------------------------------------
       * adds string spans and moves the index to the
          end of string
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatString(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatString(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatString() ' +
          'Note: Incorrect argument operand.'
        );
        // Add string span
        newLine[i] = '<span class="str">' + line[i];
        // Move index to end of string
        i = skipString(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatRegex)
       * ---------------------------------------------
       * adds regex spans and moves the index to the
          end of regex
       * param: the current line array index (number)
       * param: the last index of regex (number)
       * @type {function(number): number}
       * @private
       */
      function formatRegex(i, end) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatRegex(%d, %d)', i, end
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          (typeof i   === 'number' &&
           typeof end === 'number'),
          'FAIL: HighlightSyntax.formatRegex() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var usedFlags, c;
        // Add regex span
        newLine[i] = '<span class="rgx">/';
        // Move index to the closing forward slash
        i = end;
        // Start empty string to contain
        //  each used regex flags
        usedFlags = '';
        // Check for regex flags after
        //  closing forward slash
        loop:
        while (true) {
          c = line[i + 1];
          if (regexFlags.test(c) &&
              usedFlags.indexOf(c) === -1) {
            usedFlags += c;
            ++i;
            if (usedFlags.length === 4) {
              break loop;
            }
          }
          break loop;
        }
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSpace)
       * ---------------------------------------------
       * adds space spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatSpace(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatSpace(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatSpace() ' +
          'Note: Incorrect argument operand.'
        );
        // Add space span
        newLine[i] = '<span class="spc"> ';
        // Move index to end of space sequence
        i = skipSpace(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatBracket)
       * ---------------------------------------------
       * adds bracket spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatBracket(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatBracket(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatBracket() ' +
          'Note: Incorrect argument operand.'
        );
        // Add bracket spans
        newLine[i] = '' +
        '<span class="brc">' +
          line[i] +
        '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatOperator)
       * ---------------------------------------------
       * adds operator spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatOperator(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatOperator(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatOperator() ' +
          'Note: Incorrect argument operand.'
        );
        // Sanitize the character
        sanitizeCharacter(i);
        // Add operator spans
        newLine[i] = '' +
        '<span class="opr">' +
          newLine[i] +
        '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatComma)
       * ---------------------------------------------
       * adds comma spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatComma(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatComma(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatComma() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comma spans
        newLine[i] = '<span class="cmm">,</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSemicolon)
       * ---------------------------------------------
       * adds semicolon spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatSemicolon(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatSemicolon(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatSemicolon() ' +
          'Note: Incorrect argument operand.'
        );
        // Add semicolon spans
        newLine[i] = '<span class="smc">;</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatColon)
       * ---------------------------------------------
       * adds colon spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatColon(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatColon(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatColon() ' +
          'Note: Incorrect argument operand.'
        );
        // Add colon spans
        newLine[i] = '<span class="cln">:</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatPeriod)
       * ---------------------------------------------
       * adds period spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatPeriod(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatPeriod(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatPeriod() ' +
          'Note: Incorrect argument operand.'
        );
        // Add period spans
        newLine[i] = '<span class="per">.</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatNumber)
       * ---------------------------------------------
       * adds number spans and moves the index to the
          end of number
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatNumber(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatNumber(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatNumber() ' +
          'Note: Incorrect argument operand.'
        );
        // Add number span
        newLine[i] = '<span class="num">' + line[i];
        // Move index to end of number
        i = skipNumber(i);
        // Add close span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatIdentifier)
       * ---------------------------------------------
       * finds complete identifier, checks whether it
          is a keyword, adds correct span tags, and
          moves the index to end of identifier
       * param: the current line array index (number)
       * param: the key for extra property keywords to
       *         include in check (optional) (string)
       * @type {function(number, undefined|string): number}
       * @private
       */
      function formatIdentifier(i, extras) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatIdentifier(%d, %s)', i, !!extras
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          (typeof i === 'number' &&
           (typeof extras === 'undefined' ||
            typeof extras === 'string')),
          'FAIL: HighlightSyntax.formatIdentifier() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var identifier, catID, keyClass;
        // Save identifier name, last index, and props val
        // { index: 0, name: '', props: false }
        identifier = skipIdentifier(i);
        // If (keyword exists)
        // Then {get corresponding key span class}
        if (!!keywords.objects[identifier.name]) {
          // Save keyword's category id and class name
          catID = keywords.objects[identifier.name].cat;
          keyClass = keywords.categories[catID];
          // Special case for the function keyword
          if (identifier.name === '-function' &&
              (line[identifier.index + 1] === '(' ||
               (line[identifier.index + 1] === ' ' &&
                line[identifier.index + 2] === '('))) {
            keyClass = keywords.categories['res'];
          }
        }
        // If (no keyword match and extra keyword list provided)
        // Then {check extra list for a match}
        if (!keyClass && !!extras) {
          // If (keyword exists)
          // Then {get corresponding key span class}
          if (!!keywords.objects[extras].props[identifier.name]) {
            catID = keywords.objects[extras].cat;
            keyClass = keywords.categories[catID];
          }
        }
        // Set class name and add spans
        keyClass = keyClass || 'idt';
        newLine[i] = '<span class="' + keyClass + '">' + line[i];
        newLine[identifier.index] += '</span>';
        // Update index
        i = identifier.index;
        // If (keyword has property)
        // Then {format it}
        if (!!identifier.props) {
          // Format the dot notation
          formatPeriod(++i);
          // Set extras for next property
          extras = ( (!keywords.objects[identifier.name]) ?
            undefined : (!keywords.objects[identifier.name].props) ?
              undefined : identifier.name
          );
          // Format the property and update the index
          i = formatIdentifier(++i, extras);
        }
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatMisc)
       * ---------------------------------------------
       * adds misc spans
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatMisc(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatMisc(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatMisc() ' +
          'Note: Incorrect argument operand.'
        );
        // Add misc spans
        newLine[i] = '' +
        '<span class="msc">' +
          line[i] +
        '</span>';
        // Return index
        return i;
      }
