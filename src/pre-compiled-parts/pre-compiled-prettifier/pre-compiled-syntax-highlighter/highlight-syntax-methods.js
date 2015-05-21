      /**
       * ---------------------------------------------
       * Private Method (prepareLine)
       * ---------------------------------------------
       * @desc Prepares the line to be highlighted.
       * @param {string} line - The line of code to prepare.
       * @private
       */
      function prepareLine(line) {

        checkArgs(line, 'string');

        orgLine = line.split('');
        freezeObj(orgLine);
        newLine = line.split('');
        lineLen = line.length;
        lastIndex = (lineLen) ? lineLen - 1 : 0;

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

        /** @type {number} */
        var i;
        /** @type {function} */
        var format;

        i = -1;

        if (commentOpen) {
          i = formatCommentStart();
        }

        // Format the line (add the spans)
        while (++i < lineLen) {
          format = ( ( router.hasOwnProperty(orgLine[i]) ) ?
            router[ orgLine[i] ] : identifierStart.test(orgLine[i]) ?
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

        /** @type {*} */
        var preceding;
        /** @type {number} */
        var end;
        /** @type {number} */
        var ii;

        checkArgs(i, 'number');

        // Handle line comment
        if (orgLine[i + 1] === '/') {
          ii = formatLineComment(i);
        }
        // Handle comment opening
        else if (orgLine[i + 1] === '*') {
          ii = formatCommentOpen(i);
        }
        else {

          // Save preceding character
          preceding = ( (orgLine[i - 1] === ' ') ?
            orgLine[i - 2] : orgLine[i - 1]
          );

          // Handle RegExp
          if (i === 0 || preRegex.test(preceding)) {
            end = isRegex(i);
            if (end) {
              ii = formatRegex(i, end);
            }
          }
        }

        // Handle operator
        if (!ii) {
          ii = formatOperator(i);
        }

        return ii;
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

        /** @type {number} */
        var end;
        /** @type {string} */
        var regexBody;

        checkArgs(i, 'number');

        end = (orgLine[i + 1] === '/') ? -1 : i;

        // Find regex end index
        while (++end && end < lineLen && orgLine[end] !== '/') {

          sanitizeCharacter(end);

          if (orgLine[end] === '\\') {
            ++end;
          }
        }

        if (end >= lineLen) {
          end = 0;
        }

        regexBody = orgLine.slice(++i, end).join('');

        try {
          new RegExp(regexBody);
        }
        catch (e) {
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

        checkArgs(i, 'number');

        if ( hasOwnProp(htmlEntity, orgLine[i]) ) {
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

        checkArgs(i, 'number');

        while (++i < lineLen) {

          sanitizeCharacter(i);

          if (orgLine[i] === '*' && i !== lastIndex && orgLine[i + 1] === '/') {
            ++i;
            break;
          }
        }

        return i;
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

        /** @type {string} */
        var strCharacter;

        checkArgs(i, 'number');

        strCharacter = orgLine[i];

        while (++i < lineLen && orgLine[i] !== strCharacter) {

          sanitizeCharacter(i);

          if (orgLine[i] === '\\') {
            ++i;
          }
        }

        if (i >= lineLen) {
          i = lastIndex;
        }

        return i;
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

        checkArgs(i, 'number');

        while (orgLine[i + 1] === ' ') {
          ++i;
        }

        return i;
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

        /** @type {string} */
        var hexStart;
        /** @type {RegExp} */
        var numberOpts;

        checkArgs(i, 'number');

        hexStart = (i !== lastIndex) ? orgLine[i] + orgLine[i + 1] : '';
        numberOpts = ( (hexStart === '0x' || hexStart === '0X') ?
          hexNumbers : plainNumbers
        );

        while (++i < lineLen && numberOpts.test(orgLine[i])) {}
        --i;

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * @desc Moves the index to the end of the identifier.
       * @param {number} i - The starting line index.
       * @return {!{
       *   endIndex   : number,
       *   name       : string,
       *   propFollows: boolean
       * }}
       * @private
       */
      function skipIdentifier(i) {

        /** @type {string} */
        var name;
        /** @type {!Object} */
        var result;
        /** @type {boolean} */
        var propFollows;

        checkArgs(i, 'number');

        name = '_' + orgLine[i];

        while (++i < lineLen && identifiers.test(orgLine[i])) {
          name += orgLine[i];
        }

        propFollows = (i !== lineLen && orgLine[i] === '.');
        result = {
          endIndex   : --i,
          name       : name,
          propFollows: propFollows
        };

        return result;
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

        /** @type {number} */
        var i;
        /** @type {boolean} */
        var pass;
        /** @type {string} */
        var href;
        /** @type {string} */
        var content;
        /** @type {string} */
        var comment;

        checkArgs(start, 'number', end, 'number');

        if (end === lastIndex) {
          ++end;
        }

        comment = orgLine.slice(start, end).join('');
        pass = commentLinks.test(comment);

        while (pass) {
          i = comment.search(commentLinks);

          if (i === -1) {
            break;
          }

          i += start + 1;

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
          newLine[i] = '<a href="' + href + '" target="_blank">' + content + '</a>';

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

        /** @type {number} */
        var start;

        checkArgs(i, 'number');

        start = i;
        newLine[i] = '<span class="cmt">/';
        i = (++i < lastIndex) ? skipComment(i) : ++i;

        if (i >= lineLen) {
          commentOpen = true;
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if (config.commentLinks) {
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

        /** @type {number} */
        var i;

        newLine[0] = '<span class="cmt">' + orgLine[0];

        if (orgLine[0] === '*' && orgLine[1] === '/') {
          commentOpen = false;
          newLine[1] += '</span>';
          i = 3;
        }
        else {

          i = skipComment(0);
          commentOpen = (i > lastIndex);

          if (commentOpen) {
            i = lastIndex;
          }

          newLine[i] += '</span>';

          if (config.commentLinks) {
            formatCommentLinks(0, i);
          }
        }

        return i;
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

        checkArgs(i, 'number');

        if (config.commentLinks) {
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

        checkArgs(i, 'number');

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

        /** @type {string} */
        var usedFlags;
        /** @type {string} */
        var character;

        checkArgs(i, 'number', end, 'number');

        newLine[i] = '<span class="rgx">/';

        i = end;
        usedFlags = '';

        // Check for RegExp flags
        while (++i) {
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

        checkArgs(i, 'number');

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

        checkArgs(i, 'number');

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

        checkArgs(i, 'number');

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

        checkArgs(i, 'number');

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

        checkArgs(i, 'number');

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

        checkArgs(i, 'number');

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="per">.</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatNumber)
       * ---------------------------------------------
       * @desc Adds number spans and moves the index to the
       *   end of number.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatNumber(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="num">' + orgLine[i];
        i = skipNumber(i);
        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatIdentifier)
       * ---------------------------------------------
       * @desc Finds complete identifier, checks whether it is a keyword,
       *   adds the correct span tags, and moves the index to the end of
       *   the identifier.
       * @param {number} i - The current line index.
       * @param {string=} extras - The id for the keyword object to get
       *   extra keywords to include in check.
       * @return {number} The last index.
       * @private
       */
      function formatIdentifier(i, extras) {

        /** @type {!{ endIndex: number, name: string, propFollows: boolean }} */
        var identifier;
        /** @type {string} */
        var catID;
        /** @type {string} */
        var keyClassName;

        checkArgs(i, 'number', extras, 'string=');

        identifier = skipIdentifier(i);

        // Setup the keyword category and class name
        if ( hasOwnProp(keywords, identifier.name) ) {

          catID = keywords[ identifier.name ].cat;
          keyClassName = keywordCategories[ catID ];

          // Special case for the function keyword
          if (identifier.name === '_function' &&
              (orgLine[identifier.endIndex + 1] === '(' ||
               (orgLine[identifier.endIndex + 1] === ' ' &&
                orgLine[identifier.endIndex + 2] === '('))) {
            keyClassName = keywordCategories[ 'res' ];
          }
        }

        if (!keyClassName && !!extras) {
          if ( hasOwnProp(keywords[ extras ].props, identifier.name) ) {
            catID = keywords[ extras ].cat;
            keyClassName = keywordCategories[ catID ];
          }
        }

        if (!keyClassName) {
          keyClassName = 'idt';
        }

        newLine[i] = '<span class="' + keyClassName + '">' + orgLine[i];

        i = identifier.endIndex;

        newLine[i] += '</span>';

        // Format the identifier's property (dot notation only)
        if (identifier.propFollows) {
          formatPeriod(++i);
          extras = ( (!hasOwnProp(keywords, identifier.name)) ?
            '' : (!keywords[ identifier.name ].props) ?
              '' : identifier.name
          );
          i = formatIdentifier(++i, extras);
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatMisc)
       * ---------------------------------------------
       * @desc Adds misc spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatMisc(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="msc">' + orgLine[i] + '</span>';

        return i;
      }
