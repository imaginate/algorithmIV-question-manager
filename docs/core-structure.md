##Algorithm IV Core Module Structure (v1.1.0)
####An outline of all the variables, methods, and classes contained within the [Algorithm IV Core Module](https://github.com/imaginate/algorithmIV/blob/master/src/algorithmIVCore.js).


##Module Overview
External API | Variables    | Methods     | Public Classes
:----------- | :----------- | :---------- | :-----------------
init         | _core        | getID       | [App](#app)
             | _initialized | getTag      | [Sources](#sources)
             | app          | getClass    | [Categories](#categories)
             | DEBUG        |             | [Config](#config)
             | _debug       |             | [Questions](#questions)
             |              |             | 
             |              |             | [WebWorker](#webworker-class)
             |              |             | [AddEvents](#addevents-class)
             |              |             | [DisplaySearchBar](#displaysearchbar-class)
             |              |             | [FormatQuestions](#formatquestions-class)
             |              |             | [AppendQuestions](#appendquestions-class)
             |              |             | [DisplayQuestions](#displayquestions-class)
             |              |             | [PrettifyCode](#prettifycode-class)
             |              |             | [Debug](#debug-class)

##<a name="app"></a>Public Class: App
Init Arguments     | Private Methods
:----------------- | :-----------------
config             | init
sources            | 
categories         | setScrollbar
questions          | setPrettyCode
                   | appendMain
                   | appendNav
                   | appendError
                   | loadModule

##SetConfiguration Class
Public Methods     | Private Methods
:----------------- | :-----------------
init               | init
                   | setCategories
                   | addSortedCategories
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

##WebWorker Class
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
init               | scripts            | init
                   | worker             | findWorker
                   |                    | startWorker
                   |                    | setListeners
                   |                    | loadComplete
                   |                    | loadError

##AddEvents Class
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

##DisplaySearchBar Class
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

##FormatQuestions Class
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

##AppendQuestions Class
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

##DisplayQuestions Class
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

##PrettifyCode Class
Public Methods     | Private Variables  | Private Methods    | Private Classes
:----------------- | :----------------- | :----------------- | :-----------------
init               | linePadding        | init               | [HighlightSyntax](#highlightsyntax-class)
                   | paddingLevel       | setPadding         |
                   | htmlEntity         | prepareLine        |
                   | preRegex           | formatLines        |
                   | regexFlags         | prepareArray       |
                   | plainNumbers       |                    |
                   | hexNumbers         |                    |
                   | identifierStart    |                    |
                   | identifiers        |                    |
                   | keywords           |                    |
                   | commentOpen        |                    |

##HighlightSyntax Class
Public Methods     | Private Variables  | Private Methods
:----------------- | :----------------- | :-----------------
init               | newLine            | _init
                   | line               | formatLine
                   | lLen               | isRegex
                   | lLast              | sanitizeCharacter
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
