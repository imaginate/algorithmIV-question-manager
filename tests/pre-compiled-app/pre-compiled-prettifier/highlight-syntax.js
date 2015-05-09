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

        highlightSyntax.debug.start('init', line);

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
      // The syntax highlighter's debugger object
      highlightSyntax.debug = aIV.debug('highlightSyntax');

      /**
       * ---------------------------------------------
       * Private Variable (newLine)
       * ---------------------------------------------
       * @desc The formatted line of code.
       * @type {strings}
       * @private
       */
      var newLine;

      /**
       * ---------------------------------------------
       * Private Variable (orgLine)
       * ---------------------------------------------
       * @desc The original line of code.
       * @type {strings}
       * @private
       */
      var orgLine;

      /**
       * ---------------------------------------------
       * Private Variable (lineLen)
       * ---------------------------------------------
       * @desc The length of the line of code.
       * @type {number}
       * @private
       */
      var lineLen;

      /**
       * ---------------------------------------------
       * Private Variable (lastIndex)
       * ---------------------------------------------
       * @desc The last index of the line of code.
       * @type {number}
       * @private
       */
      var lastIndex;

      /**
       * ---------------------------------------------
       * Private Variable (router)
       * ---------------------------------------------
       * @desc A hash map that stores the matching character
       *  formatting methods.
       * @type {!objectMap}
       * @private
       */
      var router = {
        "'": formatString,
        '"': formatString,
        ' ': formatSpace,
        '{': formatBracket,
        '[': formatBracket,
        '(': formatBracket,
        ')': formatBracket,
        ']': formatBracket,
        '}': formatBracket,
        '*': formatOperator,
        '%': formatOperator,
        '+': formatOperator,
        '-': formatOperator,
        '<': formatOperator,
        '>': formatOperator,
        '&': formatOperator,
        '^': formatOperator,
        '|': formatOperator,
        '=': formatOperator,
        '!': formatOperator,
        '~': formatOperator,
        '?': formatOperator,
        ',': formatComma,
        ';': formatSemicolon,
        ':': formatColon,
        '.': formatPeriod,
        '0': formatNumber,
        '1': formatNumber,
        '2': formatNumber,
        '3': formatNumber,
        '4': formatNumber,
        '5': formatNumber,
        '6': formatNumber,
        '7': formatNumber,
        '8': formatNumber,
        '9': formatNumber,
        '/': handleSlash
      };

      freezeObj(router);

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Methods (pre-compiled-prettifier/
 *                               pre-compiled-syntax-highlighter/
 *                               highlight-syntax-methods.js)
 * -------------------------------------------------------------------------- */
// insert-highlight-syntax-methods
      /**
       * ---------------------------------------------
       * Private Method (prepareLine)
       * ---------------------------------------------
       * @desc Prepares the line to be highlighted.
       * @param {string} line - The line of code to prepare.
       * @private
       */
      function prepareLine(line) {

        highlightSyntax.debug.start('prepareLine', line);

        checkArgs(line, 'string');

        orgLine = line.split('');
        freezeObj(orgLine);
        newLine = line.split('');
        lineLen = line.length;
        lastIndex = (lineLen) ? lineLen - 1 : 0;

        debugMsg = 'lineLen= $$, lastIndex= $$';
        highlightSyntax.debug.state('prepareLine', debugMsg, lineLen, lastIndex);

        highlightSyntax.debug.end('prepareLine');
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

        highlightSyntax.debug.end('formatLine');
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

        checkArgs(i, 'number');

        /** @type {*} */
        var preceding;
        /** @type {number} */
        var end;
        /** @type {number} */
        var ii;

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

        highlightSyntax.debug.end('handleSlash', ii);

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

        highlightSyntax.debug.start('isRegex', i);

        checkArgs(i, 'number');

        /** @type {number} */
        var end;
        /** @type {string} */
        var regexBody;

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
          debugMsg = 'new RegExp(regexBody) error= $$';
          highlightSyntax.debug.state('isRegex', debugMsg, e.toString());
          end = 0;
        }

        highlightSyntax.debug.end('isRegex', end);

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

        checkArgs(i, 'number');

        if ( hasOwnProp(htmlEntity, orgLine[i]) ) {
          newLine[i] = htmlEntity[ orgLine[i] ];
        };

        highlightSyntax.debug.end('sanitizeCharacter');
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

        checkArgs(i, 'number');

        while (++i < lineLen) {

          sanitizeCharacter(i);

          if (orgLine[i] === '*' && i !== lastIndex && orgLine[i + 1] === '/') {
            ++i;
            break;
          }
        }

        highlightSyntax.debug.end('skipComment', i);

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

        highlightSyntax.debug.start('skipString', i);

        checkArgs(i, 'number');

        /** @type {string} */
        var strCharacter;

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

        highlightSyntax.debug.end('skipString', i);

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

        highlightSyntax.debug.start('skipSpace', i);

        checkArgs(i, 'number');

        while (orgLine[i + 1] === ' ') {
          ++i;
        }

        highlightSyntax.debug.end('skipSpace', i);

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

        highlightSyntax.debug.start('skipNumber', i);

        checkArgs(i, 'number');

        /** @type {string} */
        var hexStart;
        /** @type {RegExp} */
        var numberOpts;

        hexStart = (i !== lastIndex) ? orgLine[i] + orgLine[i + 1] : '';
        numberOpts = ( (hexStart === '0x' || hexStart === '0X') ?
          hexNumbers : plainNumbers
        );

        while (++i < lineLen && numberOpts.test(orgLine[i])) {}
        --i;

        highlightSyntax.debug.end('skipNumber', i);

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

        highlightSyntax.debug.start('skipIdentifier', i);

        checkArgs(i, 'number');

        /** @type {string} */
        var name;
        /** @type {!Object} */
        var result;
        /** @type {boolean} */
        var propFollows;

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

        highlightSyntax.debug.end('skipIdentifier', result);

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

        highlightSyntax.debug.start('formatCommentLinks', start, end);

        checkArgs(start, 'number', end, 'number');

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

          debugArgs = [ 'formatCommentLinks' ];
          debugArgs.push('i= $$, start= $$, newLine[i]= $$');
          debugArgs.push(i, start, newLine[i]);
          highlightSyntax.debug.state(debugArgs);

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

        highlightSyntax.debug.end('formatCommentLinks');
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

        checkArgs(i, 'number');

        /** @type {number} */
        var start;

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

        highlightSyntax.debug.end('formatCommentOpen', i);

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

        highlightSyntax.debug.end('formatCommentStart', i);

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

        highlightSyntax.debug.start('formatLineComment', i);

        checkArgs(i, 'number');

        if (config.commentLinks) {
          formatCommentLinks(i, lastIndex);
        }

        newLine[i] = '<span class="cmt">/';
        i = lastIndex;
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatLineComment', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="str">' + orgLine[i];
        i = skipString(i);
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatString', i);

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

        checkArgs(i, 'number', end, 'number');

        /** @type {string} */
        var usedFlags;
        /** @type {string} */
        var character;

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

        highlightSyntax.debug.end('formatRegex', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="spc"> ';
        i = skipSpace(i);
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatSpace', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="brc">' + orgLine[i] + '</span>';

        highlightSyntax.debug.end('formatBracket', i);

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

        checkArgs(i, 'number');

        sanitizeCharacter(i);

        newLine[i] = '<span class="opr">' + newLine[i] + '</span>';

        highlightSyntax.debug.end('formatOperator', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="cmm">,</span>';

        highlightSyntax.debug.end('formatComma', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="smc">;</span>';

        highlightSyntax.debug.end('formatSemicolon', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="cln">:</span>';

        highlightSyntax.debug.end('formatColon', i);

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

        checkArgs(i, 'number');

        newLine[i] = '<span class="per">.</span>';

        highlightSyntax.debug.end('formatPeriod', i);

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

        highlightSyntax.debug.start('formatNumber', i);

        checkArgs(i, 'number');

        newLine[i] = '<span class="num">' + orgLine[i];
        i = skipNumber(i);
        newLine[i] += '</span>';

        highlightSyntax.debug.end('formatNumber', i);

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

        highlightSyntax.debug.start('formatIdentifier', i, extras);

        checkArgs(i, 'number', extras, 'string=');

        /** @type {!{ endIndex: number, name: string, propFollows: boolean }} */
        var identifier;
        /** @type {string} */
        var catID;
        /** @type {string} */
        var keyClassName;

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

        highlightSyntax.debug.end('formatIdentifier', i);

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

        highlightSyntax.debug.start('formatMisc', i);

        checkArgs(i, 'number');

        newLine[i] = '<span class="msc">' + orgLine[i] + '</span>';

        highlightSyntax.debug.end('formatMisc', i);

        return i;
      }

      return highlightSyntax;

    })();
