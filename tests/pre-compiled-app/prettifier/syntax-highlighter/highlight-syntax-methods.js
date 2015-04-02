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

        if (end === lastIndex) {
          ++end;
        }

        comment = orgLine.slice(start, end).join('');

        if ( !commentLinks.test(comment) ) {
          return;
        }

        while (true) {
          i = comment.search(commentLinks);

          if (i === -1) {
            return;
          }

          i += start;

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
          start = i;
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
       * @desc Adds string spans and moves the index to the
       *   end of string.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatString(i) {

        highlightSyntax.debug.start('formatString', i);
        highlightSyntax.debug.args('formatString', i, 'number');

        newLine[i] = '<span class="str">' + orgLine[i];

        i = skipString(i);

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatRegex)
       * ---------------------------------------------
       * @desc Adds RegExp spans and moves the index to the
       *   end of RegExp.
       * @param {number} i - The current line index.
       * @param {number} end - The last index of the RegExp.
       * @return {number} The last index.
       * @private
       */
      function formatRegex(i, end) {

        highlightSyntax.debug.start('formatRegex', i, end);
        highlightSyntax.debug.args('formatRegex', i, 'number', end, 'number');

        /** @type {string} */
        var usedFlags;
        /** @type {string} */
        var character;

        newLine[i] = '<span class="rgx">/';

        i = end;
        usedFlags = '';

        // Check for RegExp flags
        while (true) {
          ++i;

          character = orgLine[i];

          if (regexFlags.test(character) &&
              usedFlags.indexOf(character) === -1) {
            usedFlags += character;
            if (usedFlags.length < 4) {
              continue;
            }
          }

          --i;
          break;
        }

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSpace)
       * ---------------------------------------------
       * @desc Adds space spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatSpace(i) {

        highlightSyntax.debug.start('formatSpace', i);
        highlightSyntax.debug.args('formatSpace', i, 'number');

        newLine[i] = '<span class="spc"> ';

        i = skipSpace(i);

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatBracket)
       * ---------------------------------------------
       * @desc Adds bracket spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatBracket(i) {

        highlightSyntax.debug.start('formatBracket', i);
        highlightSyntax.debug.args('formatBracket', i, 'number');

        newLine[i] = '<span class="brc">' + orgLine[i] + '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatOperator)
       * ---------------------------------------------
       * @desc Adds operator spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatOperator(i) {

        highlightSyntax.debug.start('formatOperator', i);
        highlightSyntax.debug.args('formatOperator', i, 'number');

        sanitizeCharacter(i);

        newLine[i] = '<span class="opr">' + newLine[i] + '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatComma)
       * ---------------------------------------------
       * @desc Adds comma spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatComma(i) {

        highlightSyntax.debug.start('formatComma', i);
        highlightSyntax.debug.args('formatComma', i, 'number');

        newLine[i] = '<span class="cmm">,</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSemicolon)
       * ---------------------------------------------
       * @desc Adds semicolon spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatSemicolon(i) {

        highlightSyntax.debug.start('formatSemicolon', i);
        highlightSyntax.debug.args('formatSemicolon', i, 'number');

        newLine[i] = '<span class="smc">;</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatColon)
       * ---------------------------------------------
       * @desc Adds colon spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatColon(i) {

        highlightSyntax.debug.start('formatColon', i);
        highlightSyntax.debug.args('formatColon', i, 'number');

        newLine[i] = '<span class="cln">:</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatPeriod)
       * ---------------------------------------------
       * @desc Adds period spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatPeriod(i) {

        highlightSyntax.debug.start('formatPeriod', i);
        highlightSyntax.debug.args('formatPeriod', i, 'number');

        newLine[i] = '<span class="per">.</span>';

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
