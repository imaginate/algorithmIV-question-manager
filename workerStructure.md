##Algorithm IV Web Worker Structure (v1.0.0)
####An outline of all the variables, methods, and classes contained within the [Algorithm IV Web Worker](https://github.com/imaginate/SalgorithmIV/blob/master/src/algorithmIVData.js#L123-136).


##Web Worker Overview
Public Variables   | Public Classes
:----------------- | :-----------------
qLen               | [FormatQuestions](#formatquestions-class)
configuration      | [PrettifyCode](#prettifycode-class)
categories         |
sources            | 
questions          |

##FormatQuestions Class
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
init               | formatted          | init
                   |                    | clearFormat
                   |                    | formatID
                   |                    | formatSource
                   |                    | formatComplete
                   |                    | formatCategory
                   |                    | formatSolution
                   |                    | formatOutput
                   |                    | formatLinks

##PrettifyCode Class
Public Methods     | Private Variables  | Private Methods    | Private Classes
:----------------- | :----------------- | :----------------- | :-----------------
init               | linePadding        | init               | [HighlightSyntax](#highlightsyntax-class)
                   | paddingLevel       | setPadding         |
                   | likelyRegex        | prepareLine        |
                   | plainNumbers       | formatLines        |
                   | hexNumbers         | prepareArray       |
                   | identifierStart    |                    |
                   | identifiers        |                    |
                   | keywords           |                    |
                   | commentOpen        |                    |

##HighlightSyntax Class
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
init               | newLine            | _init
                   | line               | setLine
                   | len                | sanitizeCharacter
                   | router             | skipComment
                   |                    | skipString
                   |                    | skipSpace
                   |                    | skipNumber
                   |                    | skipIdentifier
                   |                    | formatCommentOpen
                   |                    | formatCommentClose
                   |                    | formatLineComment
                   |                    | formatString
                   |                    | formatRegex
                   |                    | formatSpace
                   |                    | formatBracket
                   |                    | formatOperator
                   |                    | formatComma
                   |                    | formatSemicolon
                   |                    | formatColon
                   |                    | formatPeriod
                   |                    | formatNumber
                   |                    | formatIdentifier
                   |                    | formatMisc