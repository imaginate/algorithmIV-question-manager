    /**
     * ---------------------------------------------
     * Private Class (HighlightSyntax)
     * ---------------------------------------------
     * adds spans around reserved code characters to
        highlight specific syntax for a line of code
     * @type {function(): {
         execute: function(string): string
       }}
     * @private
     */
    var HighlightSyntax = (function() {

      /**
       * ---------------------------------------------
       * Private Variable (__return)
       * ---------------------------------------------
       * the public methods of this class
       * @type {{
           init: function(string): string
         }}
       * @private
       */
      var __return = {
        /**
         * ---------------------------------------------
         * Public Method (HighlightSyntax.init)
         * ---------------------------------------------
         * initializes HighlightSyntax
         * param: a line of code (string)
         */
        init: function (l, i) {
          // OPEN: HighlightSyntax Group
          DEBUG.HighlightSyntax.group && console.groupCollapsed(
            'GROUP: HighlightSyntax ' +
            'Note: lineNumber= %d', (i + 1)
          );
          // Declare method variables
          var result;
          // Run class
          result = _init(l);
          // CLOSE: HighlightSyntax Group
          DEBUG.HighlightSyntax.group && console.groupEnd();
          // Return formatted question
          return result;
        }
      };

      /**
       * ---------------------------------------------
       * Private Variable (newLine)
       * ---------------------------------------------
       * the current line of code
       * @type {string|Array.<string>}
       * @private
       */
      var newLine;

      /**
       * ---------------------------------------------
       * Private Variable (line)
       * ---------------------------------------------
       * the original line of code
       * @type {string|Array.<string>}
       * @private
       */
      var line;

      /**
       * ---------------------------------------------
       * Private Variable (lLen)
       * ---------------------------------------------
       * the length of the line of code
       * @type {number}
       * @private
       */
      var lLen;

      /**
       * ---------------------------------------------
       * Private Variable (lLast)
       * ---------------------------------------------
       * the last index of the line of code
       * @type {number}
       * @private
       */
      var lLast;

      /**
       * ---------------------------------------------
       * Private Variable (router)
       * ---------------------------------------------
       * a hash map that stores the matching character
       *  formatting methods
       * @type {Object}
       * @private
       */
      var router = {
        "'": function(i) { return formatString(i);    },
        '"': function(i) { return formatString(i);    },
        ' ': function(i) { return formatSpace(i);     },
        '{': function(i) { return formatBracket(i);   },
        '[': function(i) { return formatBracket(i);   },
        '(': function(i) { return formatBracket(i);   },
        ')': function(i) { return formatBracket(i);   },
        ']': function(i) { return formatBracket(i);   },
        '}': function(i) { return formatBracket(i);   },
        '*': function(i) { return formatOperator(i);  },
        '%': function(i) { return formatOperator(i);  },
        '+': function(i) { return formatOperator(i);  },
        '-': function(i) { return formatOperator(i);  },
        '<': function(i) { return formatOperator(i);  },
        '>': function(i) { return formatOperator(i);  },
        '&': function(i) { return formatOperator(i);  },
        '^': function(i) { return formatOperator(i);  },
        '|': function(i) { return formatOperator(i);  },
        '=': function(i) { return formatOperator(i);  },
        '!': function(i) { return formatOperator(i);  },
        '~': function(i) { return formatOperator(i);  },
        '?': function(i) { return formatOperator(i);  },
        ',': function(i) { return formatComma(i);     },
        ';': function(i) { return formatSemicolon(i); },
        ':': function(i) { return formatColon(i);     },
        '.': function(i) { return formatPeriod(i);    },
        '0': function(i) { return formatNumber(i);    },
        '1': function(i) { return formatNumber(i);    },
        '2': function(i) { return formatNumber(i);    },
        '3': function(i) { return formatNumber(i);    },
        '4': function(i) { return formatNumber(i);    },
        '5': function(i) { return formatNumber(i);    },
        '6': function(i) { return formatNumber(i);    },
        '7': function(i) { return formatNumber(i);    },
        '8': function(i) { return formatNumber(i);    },
        '9': function(i) { return formatNumber(i);    },
        '/': function(i) {
          // Declare function variables
          var preceding, end;
          // If (line comment)
          if (line[i + 1] === '/') {
            return formatLineComment(i);
          }
          // If (comment opening)
          if (line[i + 1] === '*') {
            return formatCommentOpen(i);
          }
          // Save preceding character
          preceding = ( (line[i - 1] === ' ') ?
            line[i - 2] : line[i - 1]
          );
          // If (regex statement)
          if (i === 0 || preRegex.test(preceding)) {
            end = isRegex(i);
            if (end > 0) {
              return formatRegex(i, end);
            }
          }
          return formatOperator(i);
        }
      };

      /**
       * ---------------------------------------------
       * Private Method (_init)
       * ---------------------------------------------
       * adds highlighting spans to a line of code
       * param: a line of code (string)
       * @type {function(string): string}
       * @private
       */
      function _init(l) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.init()'
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof l === 'string',
          'FAIL: HighlightSyntax.init() ' +
          'Note: Incorrect argument operand.'
        );
        // Convert line from string to array
        line = l.split('');
        // Save line array length and last index
        lLen = line.length;
        lLast = (lLen > 0) ? lLen - 1 : 0;
        // Debugger
        DEBUG.HighlightSyntax.state && console.log(
          'STATE: HighlightSyntax.init() ' +
          'Note: lLen= %d, lLast= %d', lLen, lLast
        );
        // Save copy of line array
        // for final output
        newLine = line.slice(0);
        // Return formatted line
        return formatLine();
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLine)
       * ---------------------------------------------
       * adds highlighting spans to line of code
       * @type {function(): string}
       * @private
       */
      function formatLine() {
        // Debugger
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatLine()'
        );
        // Declare method variables
        var i, preceding;
        // Set index to start
        i = 0;
        // If (comment is already open by prior line)
        // Then {handle line comment start}
        if (commentOpen) {
          i = formatCommentClose(i);
          // If (whole line is comment)
          // Then {return newLine}
          if (i === lLen) {
            return newLine.join('');
          }
        }
        // Find and label comments, strings,
        // regexs, spaces, brackets, operators,
        // commas, semicolons, colons, periods,
        // numbers, keywords, identifiers, and
        // miscellaneous
        for(; i<lLen; i++) {
          // If (router property exists)
          // Then {use router prop to format and update index}
          // Else If (identifier)
          i = ( (!!router[ line[i] ]) ?
            router[ line[i] ](i) : identifierStart.test(line[i]) ?
              formatIdentifier(i) : formatMisc(i)
          );
        }
        return newLine.join('');
      }

      /**
       * ---------------------------------------------
       * Private Method (isRegex)
       * ---------------------------------------------
       * if given index is a regex it returns the end
       *  index of the regex otherwise it returns 0
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function isRegex(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.isRegex(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.isRegex() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var end, regexBody;
        // Set end to start
        end = i;
        // Find regex end index
        while (true) {
          ++end;
          // If (line terminates)
          // Then {return fail}
          if (end >= lLen) {
            return 0;
          }
          // Sanitize the character
          sanitizeCharacter(end);
          // If (escaped character)
          // Then {skip ahead}
          if (line[end] === '\\') {
            ++end;
            continue;
          }
          // If (end of regex body)
          // Then {end loop}
          if (line[end] === '/') {
            break;
          }
        }
        // Save body of potential regex
        regexBody = line.slice(++i, end).join('');
        // If (not regex)
        // Then {set end to fail}
        end = ( !RegExp(regexBody) ) ? 0 : end;
        return end;
      }

      /**
       * ---------------------------------------------
       * Private Method (sanitizeCharacter)
       * ---------------------------------------------
       * inserts html entities when needed
       * param: the current line array index (number)
       * @type {function(number)}
       * @private
       */
      function sanitizeCharacter(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.sanitizeCharacter(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.sanitizeCharacter() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var c;
        // Save character
        c = line[i];
        // If (html entity property exists)
        // Then {replace the character in the new line with it}
        if (!!htmlEntity[c]) {
          newLine[i] = htmlEntity[c];
        };
      }

      /**
       * ---------------------------------------------
       * Private Method (skipComment)
       * ---------------------------------------------
       * moves the index to the end of comment
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipComment(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipComment(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipComment() ' +
          'Note: Incorrect argument operand.'
        );
        // Loop through line starting at index
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return index}
          if (i >= lLen) {
            return i;
          }
          // Sanitize the character
          sanitizeCharacter(i);
          // If (comment ends)
          // Then {return index}
          if (i !== lLast) {
            if (line[i] === '*' &&
                line[i + 1] === '/') {
              return ++i;
            }
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipString)
       * ---------------------------------------------
       * moves the index to the end of the string
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipString(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipString(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipString() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var s;
        // Save string type
        s = line[i];
        // Find string end
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return last index}
          if (i >= lLen) {
            return lLast;
          }
          // Sanitize the character
          sanitizeCharacter(i);
          // If (escaped character)
          // Then {skip ahead}
          if (line[i] === '\\') {
            ++i;
            continue;
          }
          // If (end of string)
          // Then {return the index}
          if (line[i] === s) {
            return i;
          }
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipSpace)
       * ---------------------------------------------
       * moves the index to the end of the space sequence
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipSpace(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipSpace(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipSpace() ' +
          'Note: Incorrect argument operand.'
        );
        // Loop through line starting at index
        while (true) {
          // If (next index not space)
          // Then {return index}
          if (line[i + 1] !== ' ') {
            return i;
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipNumber)
       * ---------------------------------------------
       * moves the index to the end of the number
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipNumber(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipNumber(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipNumber() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var start, numbers;
        // Save first two spots in number sequence
        start = line[i] + line[i + 1];
        // Set number reference list
        numbers = ( (start === '0x' || start === '0X') ?
          hexNumbers : plainNumbers
        );
        while (true) {
          // If (last index)
          // Then {return index}
          if (i === lLast) {
            return i;
          }
          // If (next index not number)
          // Then {return index}
          if ( !numbers.test(line[i + 1]) ) {
            return i;
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * moves the index to the end of the identifier
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function skipIdentifier(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.skipIdentifier(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.skipIdentifier() ' +
          'Note: Incorrect argument operand.'
        );
        // Declare method variables
        var iName;
        // Start string for the identifier name
        iName = '-';
        // Find the name
        while (true) {
          // Add character to iName
          iName += line[i];
          // If (last index)
          // Then {return index and name}
          if (i === lLast) {
            return { index: i, name: iName };
          }
          // If (next index not identifier)
          // Then {return index and name}
          if ( !identifiers.test(line[i + 1]) ) {
            return {
              index: i,
               name: iName,
              props: (line[i + 1] === '.')
            };
          }
          ++i;
        }
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentOpen)
       * ---------------------------------------------
       * opens a comment, adds comment spans, and 
          moves the index to the end of comment
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatCommentOpen(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatCommentOpen(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatCommentOpen() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comment span
        newLine[i] = '<span class="cmt">/';
        // Increase index
        ++i;
        // Move index to end of comment
        i = (i < lLast) ? skipComment(i) : ++i;
        // If (comment not closed by line end)
        if (i >= lLen) {
          // Set commentOpen to true
          commentOpen = true;
          // Move index to last value
          i = lLast;
        }
        // Add closing span
        newLine[i] += '</span>';
        // Return index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentClose)
       * ---------------------------------------------
       * adds comment spans and moves the index to the
          end of the comment for a line inheriting an
          already open comment (i.e. line began as a
          comment)
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatCommentClose(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatCommentClose(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatCommentClose() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comment span to line start
        newLine[i]  = (line[i] === '*') ? ' ' : '';
        newLine[i] += '<span class="cmt">' + line[i];
        // If (start is a comment end)
        // Then {update line and return next index}
        if (line[0] === '*' && line[1] === '/') {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[1] += '</span>';
          // Return next index
          return 3;
        }
        // Move index to comment end
        i = skipComment(i);
        // If (index exists)
        if (i < lLen) {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[i] += '</span>';
          // Move index to next value
          ++i;
        }
        else {
          // Add closing span to line end
          newLine[lLast] += '</span>';
        }
        // Return next index
        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLineComment)
       * ---------------------------------------------
       * adds comment spans and moves index to line end
       * param: the current line array index (number)
       * @type {function(number): number}
       * @private
       */
      function formatLineComment(i) {
        // Debuggers
        DEBUG.HighlightSyntax.call && console.log(
          'CALL: HighlightSyntax.formatLineComment(%d)', i
        );
        DEBUG.HighlightSyntax.fail && console.assert(
          typeof i === 'number',
          'FAIL: HighlightSyntax.formatLineComment() ' +
          'Note: Incorrect argument operand.'
        );
        // Add comment span
        newLine[i] = '<span class="cmt">/';
        // Moves index to line end
        i = lLast;
        // Add closing span
        newLine[i] += '</span>';
        // Return index
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

      // END CLASS: HighlightSyntax
      return __return;
    }());
