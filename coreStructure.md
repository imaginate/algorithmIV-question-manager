##Algorithm IV Core Module Structure (v1.0.0)
####An outline of all the variables, methods, and classes contained within the [Algorithm IV Core Module](https://github.com/imaginate/algorithmIV/blob/master/src/algorithmIVCore.js).


Module Overview ||||
Public API         | Public Variables   | Public Methods     | Public Classes
:----------------- | :----------------- | :----------------- | :-----------------
init               | DEBUG              | getID              | InitializeModule
                   | qLen               | getClass           | SetConfiguration
                   | roots              |                    | WebWorker
                   | flags              |                    | AddEvents
                   | configuration      |                    | DisplaySearchBar
                   | configOptions      |                    | FormatQuestion
                   | searchValues       |                    | AppendQuestions
                   | sources            |                    | DisplayQuestions
                   | categories         |                    | PrettifyCode
                   | questions          |                    |

InitializeModule Class ||
Public Methods     | Private Methods
:----------------- | :-----------------
init               | init
                   | setRoot
                   | setScrollbar
                   | appendMain
                   | appendNav
                   | appendError
                   | loadModule

SetConfiguration Class ||
Public Methods     | Private Methods
:----------------- | :-----------------
init               | init
                   | checkConfig
                   | setCategories
                   | orderCategories
                   | formatCategories
                   | setSources
                   | setQuestions
                   | setSearchSettings
                   | setSearchDefaults
                   | setQuestionFormat
                   | setIDAction
                   | setWebWorker
                   | setPreCodeHeight
                   | setSearchValues

WebWorker Class |||
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
init               | scripts            | init
                   | worker             | findWorker
                   |                    | startWorker
                   |                    | setListeners
                   |                    | loadComplete
                   |                    | loadError

AddEvents Class ||
Public Methods     | Private Methods
:----------------- | :-----------------
init               | init
extHoverIn         | setEvents
extHoverOut        | addEvent
                   | listHandler
                   | sourceHandler
                   | mainCategoryHandler
                   | subCategoryHandler
                   | questionHandler
                   | extCodeHandler
                   | extHoverInHandler
                   | extHoverOutHandler
                   | prevHandler
                   | nextHandler

DisplaySearchBar Class ||
Public Methods     | Private Methods
:----------------- | :-----------------
init               | init
updateSubCat       | applyFormat
                   | formatView
                   | formatOrder
                   | formatStage
                   | formatSource
                   | formatMainCategory
                   | formatSubCategory
                   | setValues

FormatQuestion Class |||
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
init               | formatted          | init
formatCodeView     |                    | clearFormat
                   |                    | formatID
                   |                    | formatSource
                   |                    | formatComplete
                   |                    | formatCategory
                   |                    | formatSolution
                   |                    | formatOutput
                   |                    | formatLinks
                   |                    | setCodeWidth
                   |                    | formatCodeView

AppendQuestions Class ||
Public Methods     | Private Methods
:----------------- | :-----------------
init               | init
q                  | appendEmpty
                   | appendMain
                   | appendID
                   | appendSource
                   | appendComplete
                   | appendCategory
                   | appendProblem
                   | appendSolution
                   | appendOutput
                   | appendLinks

DisplayQuestions Class |||
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
assembleQuestions  | currentOrder       | assembleQuestions
prevQuestion       | currentList        | showQuestions
nextQuestion       |                    | saveCurrentList
showQuestions      |                    | changeDisplay
                   |                    | showEmpty
                   |                    | showOneQuestion
                   |                    | checkQuestion
                   |                    | showAllQuestions
                   |                    | prevQuestion
                   |                    | nextQuestion
                   |                    | showNextQuestion
                   |                    | clearDisplay
                   |                    | reverseOrder

PrettifyCode Class ||||
Public Methods     | Private Variables  | Private Methods    | Private Classes
:----------------- | :----------------- | :----------------- | :-----------------
init               | linePadding        | init               | HighlightSyntax
                   | paddingLevel       | setPadding         |
                   | likelyRegex        | prepareLine        |
                   | plainNumbers       | formatLines        |
                   | hexNumbers         | prepareArray       |
                   | identifierStart    |                    |
                   | identifiers        |                    |
                   | keywords           |                    |
                   | commentOpen        |                    |

HighlightSyntax Class |||
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
init               | newLine            | _init
                   | line               | setLine
                   | len                | sanitizeCharacter
                   |                    | skipComment
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