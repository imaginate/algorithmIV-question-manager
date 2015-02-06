/* Algorithm IV (v1.0.0) (learn@algorithmiv.com)
 * Section: User Data, App Initialization, & Web Worker
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The MIT License (algorithmiv.com/docs/license) */

/**
 * ------------------------------------------------------------------
 * Algorithm IV User Data (v1.0.0)
 * ------------------------------------------------------------------
 * manages a list of practice questions and detailed solutions
    for learning computer science focused algorithms and data
    structures, improving programming skillsets, and preparing
    for technical interviews
 * settings: configuration, categories, sources, and questions
 * directions to use app:
   - fill in the four settings variables located within
      algorithmIVData.js with your preferences
   - include the Algorithm IV script tags in your html head as
      shown below (tags must be added in the below order):
      <head>
        <link href="algorithmIV.css" rel="stylesheet" />
        <script src="js/algorithmIVCore.js"></script>
        <script src="js/algorithmIVData.js"></script>
      </head>
 * directions to enable the Algorithm IV fonts:
   - ensure the root http address being used is 
      http://localhost/algorithmIV/[anything]
   - include the Typekit script tags in your html head as
      shown below (tags must be added in the below order
      before the main Algorithm IV tags):
       <head>
        <script src="//use.typekit.net/rcb8bni.js"></script>
        <script>try{Typekit.load();}catch(e){}</script>
        [the three above Algorithm IV tags]
      </head>
 */
(function() {
  "use strict";

  /**
   * -----------------------------------------------
   * Public Variable (configuration)
   * -----------------------------------------------
   * an object containing the configuration settings
      for this module
   * set the configuration to your preferred options
      or leave it blank to use the default settings
   * object properties:
     - searchSettings:
       -- stage:
          ~ description:
            ~~ allows you to disable the search by stage
                functionality if set to false
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: enable search by stage
            ~~ false: disable search by stage
       -- source:
          ~ description:
            ~~ allows you to disable the search by source
                functionality if set to false
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: enable search by source
            ~~ false: disable search by source
       -- category:
          ~ description:
            ~~ allows you to disable the search by
                category functionality
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: enable search by category
            ~~ false: disable search by category
       -- subCat:
          ~ description:
            ~~ allows you to disable the search by
                sub category functionality
            ~~ only works if this.searchSettings.category
                is set to true
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: enable search by sub category
            ~~ false: disable search by sub category
     - searchDefaults:
       -- view:
          ~ description:
            ~~ sets the default view
          ~ value type: string
          ~ default option: 'one'
          ~ options:
            ~~ 'one': view one question at a time
            ~~ 'all': view all at once
       -- order:
          ~ description:
            ~~ sets the default list order
          ~ value type: string
          ~ default option: 'asc'
          ~ options:
            ~~ 'asc': ascending
            ~~ 'desc': descending
       -- stage:
          ~ description:
            ~~ sets the default stage shown on app load
            ~~ only works if this.searchSettings.stage
                is set to true
          ~ value type: string
          ~ default option: 'all'
          ~ options:
            ~~ 'all': show all questions
            ~~ 'com': show completed questions
            ~~ 'inc': show unfinished questions
       -- source:
          ~ description:
            ~~ sets the default source shown on app load
            ~~ only works if this.searchSettings.source
                is set to true
          ~ value type: string
          ~ default option: 'all'
          ~ options:
            ~~ 'all': show all questions
            ~~ "your source id": show specific source
       -- mainCat:
          ~ description:
            ~~ sets the default main category shown on
                app load
            ~~ only works if this.searchSettings.category
                is set to true
          ~ value type: string
          ~ default option: 'all'
          ~ options:
            ~~ 'all': show all questions
            ~~ "your category id": show specific category
       -- subCat:
          ~ description:
            ~~ sets the default sub category shown on app
                load
            ~~ only works if this.searchSettings.category
                and this.searchSettings.subCat is set to
                true
          ~ value type: string
          ~ default option: 'all'
          ~ options:
            ~~ 'all': show all questions
            ~~ "your category id": show specific category
       -- startID:
          ~ description:
            ~~ choose which question you want to be shown
                on app load (choose by question id)
            ~~ only works if this.searchDefaults.view is
                set to 'one'
            ~~ a question's id is its index within the
                questions array plus 1
          ~ value type: number
          ~ default option: 0
          ~ options:
            ~~ 0: show the first question matching the search 
            ~~ "your question id": show a specific question
                                    upon app load
     - questionFormat:
       -- id:
          ~ description:
            ~~ show or hide the question's id
            ~~ a question's id is its index from the questions
                array plus 1
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: show question id
            ~~ false: hide question id
       -- complete:
          ~ description:
            ~~ show or hide question's completion status
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: show question's completion status
            ~~ false: hide question's completion status
       -- source:
          ~ description:
            ~~ show or hide question's source
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: show question's source
            ~~ false: hide question's source
       -- category:
          ~ description:
            ~~ show or hide question's categories
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: show question's categories
            ~~ false: hide question's categories
       -- links:
          ~ description:
            ~~ show or hide additional links
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: show additional links
            ~~ false: hide additional links
       -- output:
          ~ description:
            ~~ show or hide the solution output
          ~ value type: boolean
          ~ default option: true
          ~ options:
            ~~ true: show your solution output
            ~~ false: hide your solution output
     - prettyCode:
       -- prePadding:
          ~ description:
            ~~ an object holding the total padding values
                for the pre element's ordered list
                containing the prettified solution code
            ~~ the padding must match the css stylesheet to
                work correctly. simply add the padding and
                margin values of #aIV pre ol and li to
                obtain the correct numbers. the default css
                sets all except ol's padding to 0
                example css:
                #aIV pre ol { padding:30px 35px 30px 75px }
                example totals:
                { top:30, right:35, bottom:30, left:75 }
            ~~ value type (for all properties): number
            ~~ properties:
               > top: the top padding value
                 >> default value: 30
               > right: the right padding value
                 >> default value: 35
               > bottom: the bottom padding value
                 >> default value: 30
               > left: the left padding value
                 >> default value: 75
            ~~ options:
               > "value between 0 and 250": the pixel count for the
                                             pre list padding totals
       -- lineHeight:
          ~ description:
            ~~ the height of each code line list item within
                the prettified solution code
            ~~ the height must match the css stylesheet to
                work correctly - see below css example:
                #aIV pre li { height:26px }
          ~ value type: number
          ~ default value: 26
          ~ options:
            ~~ "value between 10 and 50": the pixel count for the
                                          pre list item height
     - id:
       -- description:
          ~ enable or disable the onClick action for
             the question's id
          ~ when search view is set to 'all' the id
             onClick action allows you to pick a
             question from a list to view by itself.
             this action automatically switches the
             search view to 'one' once a question
             has been clicked
       -- value type: boolean
       -- default option: true
       -- options:
          ~ true: enable question's id onClick action
          ~ false: disable question's id onClick action
     - worker:
       -- description:
          ~ enable or disable web worker
          ~ web workers cannot parse any DOM objects
             including the window, document, and console
             objects. if you want to use DOM oriented
             objects in your solutions set this setting
             to false. otherwise Algorithm IV will be
             forced to wait until receiving an error to
             reset and load your questions without a web
             worker
       -- value type: boolean
       -- default option: true
       -- options:
          ~ true: enable app web worker to load questions
          ~ false: disable app web worker
   */
  var configuration = {
    searchSettings: {
         stage: true,
        source: true,
      category: true,
        subCat: true
    },
    searchDefaults: {
         view: 'one',
        order: 'asc',
        stage: 'all',
       source: 'all',
      mainCat: 'all',
       subCat: 'all',
      startID:  0
    },
    questionFormat: {
            id: true,
      complete: true,
        source: true,
      category: true,
         links: true,
        output: true
    },
    prettyCode: {
      prePadding: {
           top: 30,
         right: 35,
        bottom: 30,
          left: 75
      },
      lineHeight: 26
    },
        id: true,
    worker: true
  };

  /**
   * -----------------------------------------------
   * Public Variable (sources)
   * -----------------------------------------------
   * an object containing all of the sources that
      created each of the problems included on this
      page
   * every source id must be unique
   * if object is empty the source functionality is
      disabled
   * object format:
      var sources = {
        'sourceID': 'Source Name'
      }
   */
  var sources = {};

  /**
   * -----------------------------------------------
   * Public Variable (categories)
   * -----------------------------------------------
   * an object containing each main and sub question
     category
   * every category id must be unique (a sub category
      id cannot be the same as any main category id)
   * if the main property is empty the category
      functionality is fully disabled
   * if the sub property is empty only the sub category
      functionality is disabled
   * object format:
      var categories = {
        main: {
          'mainCategoryID': 'Category Name'
        },
        sub: {
          'mainCategoryID': {
            'subCategoryID': 'Category Name'
          } 
        }
      }
   */
  var categories = { main:{}, sub:{} };

  /**
   * ---------------------------------------------
   * Public Variable (questions)
   * ---------------------------------------------
   * an array of objects containing each question,
      its details, and your solution for it
   * all below properties are required for every
      object
   * object format:
    {
      complete: false,
        source: 'sourceID',
       mainCat: [ 'mainCatID' ],
        subCat: [ 'subCatID','subCatID' ],
         links: [
           {
             name: 'Algorithm IV Website',
             href: 'http://www.algorithmiv.com'
           }
         ],
       problem: 'Can You Learn More',
      solution: function() {
        return 'No Problem';
      }
    }
   * object properties:
     - complete:
       -- description:
          ~ indicates whether solution is finished
       -- value type: boolean
       -- options:
          ~ true: question is finished
          ~ false: question is incomplete
     - source:
       -- description:
          ~ the id for the question's source
       -- value type: string
     - mainCat:
       -- description:
          ~ the ids for every matching main category
       -- value type: array of strings
     - subCat:
       -- description:
          ~ the ids for every matching sub category
       -- value type: array of strings
     - links:
       -- description:
          ~ links to more details on question
       -- value type: array of objects
       -- object properties:
          ~ name:
            ~~ the displayed name of the link
            ~~ value type: string
          ~ href:
            ~~ the http address for the link
            ~~ value type: string
     - problem:
       -- description:
          ~ the practice problem
          ~ accepts html markup
          ~ use html entities to show reserved html
       -- value type: string
     - solution:
       -- description:
          ~ the code for the solution of the problem
          ~ must be wrapped in an anonymous function
       -- value type: function
   */
  var questions = [];

/* ---------------------------- *
 * -- DO NOT EDIT BELOW HERE -- *
 * ---------------------------- */
//sedFlagMinifyInsert
//sedFlagWorkerStart

/**
 * ---------------------------------------------
 * Initialize Algorithm IV (v1.0.0)
 * ---------------------------------------------
 * triggers module init with user settings
 * @type {function(Object, Object, Object, Object)}
 * @private
 */
(function(configuration, categories, sources, questions) {
  // Verify objects have been set
  var newConfiguration = configuration || {}, 
      newCategories    = categories    || {},
      newSources       = sources       || {},
      newQuestions     = questions     || [];
  newConfiguration.searchSettings = configuration.searchSettings || {};
  newConfiguration.searchDefaults = configuration.searchDefaults || {};
  newConfiguration.questionFormat = configuration.questionFormat || {};
  newConfiguration.prettyCode     = configuration.prettyCode     || {};
  newConfiguration.prettyCode.prePadding = configuration.prettyCode.prePadding || {};
  newCategories.main = categories.main || {};
  newCategories.sub  = categories.sub  || {};
  // Trigger Algorithm IV
  if (typeof window !== 'undefined') {
    algorithmIV.init(newConfiguration, newCategories, newSources, newQuestions);
  }
}(configuration, categories, sources, questions));

/**
 * ------------------------------------------------------------------
 * Algorithm IV Web Worker (v1.0.0)
 * ------------------------------------------------------------------
 * handles converting your list of questions into a string of html
 * annotation:
   - Closure Compiler specific JSDoc: developers.google.com/closure/compiler/
 * structure:
   - see github.com/imaginate/algorithmIV/blob/master/workerStructure.md
   - contains an outline of all the variables, methods, and classes
      used in this web worker
 * contributing:
   - see github.com/imaginate/algorithmIV/blob/master/CONTRIBUTING.md
 */
(function(questions) {
  /**
   * -----------------------------------------------
   * Initialize Worker
   * -----------------------------------------------
   * initializes the web worker
   */
  onmessage = function(event) {
    // Declare method variables
    var args;
    // Save event.data reference
    args = event.data;
    // Set question length
    qLen = args.qLen;
    // Set configuration
    configuration = args.configuration;
    // Set sources
    sources = args.sources;
    // Set categories
    categories = args.categories;
    // Format the questions
    FormatQuestions.init();
    // Return formatted questions
    self.postMessage(configuration.content);
  };

  /**
   * ----------------------------------------------- 
   * Public Variable (qLen)
   * -----------------------------------------------
   * the length of the questions array
   * @type {number}
   * @private
   */
  var qLen;

  /**
   * -----------------------------------------------
   * Public Variable (configuration)
   * -----------------------------------------------
   * an object containing the display configuration
      settings for the module
   * @type {{
       searchSettings: {
            stage: boolean,
           source: boolean,
         category: boolean,
           subCat: boolean
       },
       searchDefaults: {
            view: string,
           order: string,
           stage: string,
          source: string,
         mainCat: string,
          subCat: string,
         startID: number
       },
       questionFormat: {
               id: boolean,
         complete: boolean,
           source: boolean,
         category: boolean,
            links: boolean,
           output: boolean
       },
       prettyCode: {
         prePadding: {
              top: number,
            right: number,
           bottom: number,
             left: number
         },
         lineHeight: number
       },
              id: boolean,
          worker: boolean,
         content: Array.<Object>,
       scrollbar: number
     }}
   * @private
   */
  var configuration = {};

  /**
   * -----------------------------------------------
   * Public Variable (sources)
   * -----------------------------------------------
   * an array of objects containing the question
      sources
   * @type {{
        list: Object,
         len: number,
         ids: Array.<string>
     }}
   * @private
   */
  var sources = {};

  /**
   * -----------------------------------------------
   * Public Variable (categories)
   * -----------------------------------------------
   * an array of objects containing the question
      categories
   * @type {{
       main: Object,
        sub: Object,
        opt: Object,
        len: {
          main: number,
           sub: Object
        },
        ids: {
          main: Array.<string>,
           sub: Array.<string>
        }
     }}
   * @private
   */
  var categories = {};

  /**
   * ---------------------------------------------
   * Public Class (FormatQuestions)
   * ---------------------------------------------
   * formats questions for live view
   * @type {function(): {
       init: function(),
       formatCodeView: function()
     }}
   * @private
   */
  var FormatQuestions = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(),
         formatCodeView: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (FormatQuestions.init)
       * ---------------------------------------------
       * initialize FormatQuestions
       */
      init: function() {
        init();
      }
    };

    /**
     * ---------------------------------------------
     * Private Format (formatted)
     * ---------------------------------------------
     * saves the content for each question
     * @type {{
         id: {
           flag: boolean,
           content: string
         },
         source: {
           flag: boolean,
           content: string
         },
         complete: {
           flag: boolean,
           content: string
         },
         category: {
           flag: boolean,
           main: {
             flag: boolean,
             h3: string,
             p: string
           },
           sub: {
             flag: boolean,
             h3: string,
             p: string
           }
         },
         solution: {
           error: boolean,
           code: string,
           height: number
         },
         output: {
           flag: boolean,
           content: string
         },
         links: {
           flag: boolean,
           content: Array.<{
             href: string,
             name: string
           }>
         }
       }}
     * @private
     */
    var formatted;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * converts questions to html
     * @type {function()}
     * @private
     */
    function init() {
      // Declare method variables
      var i;
      // Format the questions
      for (i=0; i<qLen; i++) {
        clearFormat();
        formatID(i);
        formatSource(questions[i].source);
        formatComplete(questions[i].complete);
        formatCategory(questions[i].mainCat, questions[i].subCat);
        formatSolution(questions[i].solution, i);
        formatOutput(questions[i].solution);
        formatLinks(questions[i].links);
        // Save formatted question
        configuration.content.push(formatted);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (clearFormat)
     * ---------------------------------------------
     * clears the previous question format
     * @type {function()}
     * @private
     */
    function clearFormat() {
      // Clear formatted
      formatted = {
        id: {
          flag: false,
          content: ''
        },
        source: {
          flag: false,
          content: ''
        },
        complete: {
          flag: false,
          content: ''
        },
        category: {
         flag: false,
          main: {
            flag: false,
            h3: '',
            p: ''
          },
          sub: {
            flag: false,
            h3: '',
            p: ''
          }
        },
        solution: {
          error: false,
          code: '',
          height: 0
        },
        output: {
          flag: false,
          content: ''
        },
        links: {
          flag: false,
          content: []
        }
      };
    }

    /**
     * ---------------------------------------------
     * Private Method (formatID)
     * ---------------------------------------------
     * formats the question id
     * param: the question index (number)
     * @type {function(number)}
     * @private
     */
    function formatID(i) {
      // Declare method variables
      var flag, id;
      // Set flag and id
      flag = configuration.questionFormat.id;
      id = '';
      if (flag) {
        // Save question id
        id = i + 1;
        // Ensure id length is min of 3
        id = ( (id < 10) ?
          '00' + id : (id < 100) ?
            '0' + id : '' + id
        );
      }
      // Save format
      formatted.id.flag = flag;
      formatted.id.content = id;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSource)
     * ---------------------------------------------
     * formats the question source
     * param: the question source (string)
     * @type {function(string)}
     * @private
     */
    function formatSource(sourceID) {
      // Declare method variables
      var sLen, flag;
      // Save app sources length and flag
      sLen = sources.len;
      flag = (sLen > 0 && configuration.questionFormat.source);
      // Save format
      formatted.source.flag = flag;
      formatted.source.content = ( (flag) ?
        sources.list[sourceID] : ''
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (formatComplete)
     * ---------------------------------------------
     * formats the question completion status
     * param: the question complete value (boolean)
     * @type {function(boolean)}
     * @private
     */
    function formatComplete(completed) {
      // Declare method variables
      var flag;
      // Save flag
      flag = configuration.questionFormat.complete;
      // Save format
      formatted.complete.flag = flag;
      formatted.complete.content = ( (!configuration.questionFormat.complete) ?
        '' : (completed) ? 'Yes' : 'No'
      );
    }

    /**
     * ---------------------------------------------
     * Private Method (formatCategory)
     * ---------------------------------------------
     * formats the question categories
     * param: the main question's categories (array of strings)
     * param: the sub question's categories (array of strings)
     * @type {function(Array.<string>, Array.<string>)}
     * @private
     */
    function formatCategory(main, sub) {
      // Declare method variables
      var flag, cLen, mLen, sLen, i, id, subCats;
      // Save the length of all the main categories and
      //  the question's main and sub categories
      cLen = categories.len.main;
      mLen = main.length;
      sLen = sub.length;
      // Save flags
      flag = {
         cat: (cLen > 0 && configuration.questionFormat.category),
        main: (mLen > 0),
         sub: (sLen > 0)
      };
      formatted.category.flag = flag.cat;
      formatted.category.main.flag = flag.main;
      formatted.category.sub.flag  = flag.sub;
      // If (a main category exists and category config enabled)
      if (flag.cat) {
        // If (question has main categories)
        // Then {save main category format}
        if (flag.main) {
          formatted.category.main.h3 = 'Main ' +
          ( (mLen > 1) ? 'Categories:' : 'Category:' );
          // Find matching main category names
          for (i=0; i<mLen; i++) {
            formatted.category.main.p += (i === 0) ? '' : ', ';
            formatted.category.main.p += categories.main[main[i]];
          }
        }
        // If (question has sub categories)
        // Then {save sub category format}
        if (sLen > 0) {
          formatted.category.sub.h3 = 'Sub ' +
          ( (sLen > 1) ? 'Categories:' : 'Category:' );
          // Find matching sub category names
          for (i=0; i<sLen; i++) {
            formatted.category.sub.p += (i === 0) ? '' : ', ';
            loop:
            for (id in categories.sub) {
              // If (property not native)
              if ( categories.sub.hasOwnProperty(id) ) {
                // Save sub category objects
                subCats = categories.sub[id];
                // If (property exists)
                if (typeof subCats[sub[i]] === 'string') {
                  formatted.category.sub.p += subCats[sub[i]];
                  break loop;
                }
              }
            }
          }
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (formatSolution)
     * ---------------------------------------------
     * formats the question solution
     * param: the question solution (function)
     * param: the question index (number)
     * @type {function(Object, number)}
     * @private
     */
    function formatSolution(solution, i) {
      // Declare method variables
      var error, code, height;
      // Save error
      error = (typeof solution !== 'function');
      // If (no error)
      // Then {prettify code}
      if (!error) {
        code = PrettifyCode.init(solution);
        // Calculate the pre element's div container height
        height = code.lineCount * configuration.prettyCode.lineHeight +
        configuration.prettyCode.prePadding.top + configuration.prettyCode.prePadding.bottom;
      }
      // Save format
      formatted.solution.error  = error;
      formatted.solution.code   = (error) ? '' : code.result;
      formatted.solution.height = (error) ?  0 : height;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatOutput)
     * ---------------------------------------------
     * formats the output of the question solution
     * param: the question solution (function)
     * @type {function(Object)}
     * @private
     */
    function formatOutput(solution) {
      // Declare method variables
      var flag, output;
      // Save flag
      flag = (typeof solution === 'function' &&
              configuration.questionFormat.output);
      // Save output
      output = (flag) ? solution() : '';
      output = (typeof output !== 'string') ? String(output) : output;
      // Save format
      formatted.output.flag = flag;
      formatted.output.content = output;
    }

    /**
     * ---------------------------------------------
     * Private Method (formatLinks)
     * ---------------------------------------------
     * formats the question links
     * param: the links (array of objects)
     * @type {function(Array.<Object>)}
     * @private
     */
    function formatLinks(links) {
      // Declare method variables
      var flag, linksLen, i;
      // Save link length
      linksLen = links.length;
      // Save flag
      flag = (linksLen > 0 && configuration.questionFormat.links);
      // Save formatted links
      if (flag) {
        for (i=0; i<linksLen; i++) {
          formatted.links.content.push({
            href: links[i].href,
            name: links[i].name
          });
        }
      }
      else {
        formatted.links.content = [];
      }
      formatted.links.flag = flag;
    }

    // END CLASS: FormatQuestions
    return _return;
  }());

  /**
   * ---------------------------------------------
   * Public Class (PrettifyCode)
   * ---------------------------------------------
   * converts a javascript function to a formatted
      string of html list items where each item is
      a line of code and adds span tags to each
      line to mark every piece of js syntax
   * @type {function(): {
       init: function(Object): {
            result: string,
         lineCount: number
       }
     }}
   * @private
   */
  var PrettifyCode = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function(Object): {
              result: string,
           lineCount: number
         }
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (PrettifyCode.init)
       * ---------------------------------------------
       * initialize PrettifyCode
       * param: a js function (function)
       */
      init: function(f) {
        return init(f);
      }
    };

    /**
     * ---------------------------------------------
     * Private Variable (linePadding)
     * ---------------------------------------------
     * the pixel count for the padding of each line
     * @const
     * @type {number}
     * @private
     */
    var linePadding = 20;

    /**
     * ---------------------------------------------
     * Private Variable (paddingLevel)
     * ---------------------------------------------
     * the current line padding level
     * @type {number}
     * @private
     */
    var paddingLevel;

    /**
     * ---------------------------------------------
     * Private Variable (likelyRegex)
     * ---------------------------------------------
     * characters that if preceding a '/' are likely
        a regular expression
     * @const
     * @type {Array.<string>}
     * @private
     */
    var likelyRegex = ['(','[','{',';','*','/','%',
                       '+','-','<','>','&','^','|',
                       '=', '!'];

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * list of valid plain number characters
     * @const
     * @type {string}
     * @private
     */
    var plainNumbers = /[0-9\.]/;

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * list of valid hex number characters
     * @const
     * @type {string}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * list of valid starting identifier characters
     * @const
     * @type {string}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * list of valid identifier characters
     * @const
     * @type {string}
     * @private
     */
    var identifiers = /[a-z0-9_\$]/i;

    /**
     * ---------------------------------------------
     * Private Variable (keywords)
     * ---------------------------------------------
     * list of keywords
     * @const
     * @type {{
         defining: Array.<string>,
         reserved: Array.<string>,
         natives: Array.<string>,
         values: Array.<string>,
         client: Array.<string>,
         jquery: Array.<string>
       }}
     * @private
     */
    var keywords = {
      defining: ['class', 'const', 'function', 'var'],
      reserved: ['abstract', 'arguments', 'boolean',
        'break', 'byte', 'case', 'catch', 'char',
        'const', 'continue', 'debugger', 'default',
        'delete', 'do', 'double', 'else', 'enum',
        'export', 'extends', 'final', 'finally',
        'float', 'for', 'goto', 'if', 'implements',
        'import', 'in', 'instanceof', 'int', 'interface',
        'item', 'let', 'long', 'native', 'new','package',
        'private', 'protected', 'public', 'return',
        'short', 'static', 'super', 'switch',
        'synchronized', 'this', 'throw', 'throws',
        'transient', 'try', 'typeof', 'void', 'volatile',
        'while', 'with', 'yield'],
      natives: ['abs', 'acos', 'Array', 'asin', 'atan',
        'atan2', 'Boolean', 'ceil', 'charAt', 'charCodeAt',
        'clearInterval', 'clearTimeout', 'concat', 'cos',
        'Date', 'decodeURI', 'decodeURIComponent',
        'encodeURI', 'encodeURIComponent', 'escape', 'eval',
        'exp', 'floor', 'fromCharCode', 'getDate', 'getDay',
        'getFullYear', 'getHours', 'getMilliseconds',
        'getMinutes', 'getMonth', 'getSeconds',
        'getSelection', 'getTime', 'getTimezoneOffset',
        'getUTCDate', 'getUTCDay', 'getUTCFullYear',
        'getUTCHours', 'getUTCMilliseconds', 'getUTCMinutes',
        'getUTCMonth', 'getUTCSeconds', 'getYear',
        'hasOwnProperty', 'Image', 'indexOf', 'isArray',
        'isFinite', 'isNaN', 'isPrototypeOf', 'join',
        'lastIndexOf', 'length', 'match', 'Math', 'max', 'min',
        'Number', 'Object', 'parse', 'parseFloat',
        'parseInt', 'pop', 'pow', 'preference', 'print',
        'prototype', 'push', 'random', 'RegExp', 'replace',
        'reset', 'resizeBy', 'resizeTo', 'reverse', 'round',
        'search', 'select', 'setDate', 'setFullYear',
        'setHours', 'setMilliseconds', 'setInterval',
        'setMinutes', 'setMonth', 'setSeconds', 'setTime',
        'setTimeout', 'setUTCDate', 'setUTCFullYear',
        'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes',
        'setUTCMonth', 'setUTCSeconds', 'setYear', 'shift',
        'sin', 'slice', 'sort', 'splice', 'split', 'sqrt',
        'String', 'substr', 'substring', 'tan', 'test',
        'toGMTString', 'toLocaleString', 'toLowerCase',
        'toSource', 'toString', 'toUpperCase', 'toUTCString',
        'unescape', 'unshift', 'unwatch', 'UTC', 'valueOf',
        'watch', 'write', 'writeln'],
      values: ['false', 'Infinity', 'Nan', 'null', 'true',
        'undefined'],
      client: ['alert', 'all', 'anchor', 'anchors', 'appendChild',
        'area', 'assert', 'assign', 'back', 'big', 'blink', 'blur',
        'body', 'bold', 'button', 'byteToString', 'captureEvents',
        'checkbox', 'className', 'clearInterval', 'clearTimeout', 'click',
        'clientInformation', 'close', 'closed', 'confirm', 'console',
        'constructor', 'createElement', 'crypto', 'decodeURI',
        'decodeURIComponent', 'defaultStatus', 'disableExternalCapture',
        'document', 'element', 'elements', 'embed', 'embeds',
        'enableExternalCapture', 'encodeURI', 'encodeURIComponent',
        'escape', 'event', 'fileUpload', 'find', 'fixed', 'focus',
        'fontcolor', 'fontsize', 'form', 'forms', 'forward',
        'frame', 'frames', 'frameRate', 'getElementById',
        'getElementsByClassName', 'getElementsByTagName',
        'getOptionValueCount', 'getOptionValue', 'go', 'group',
        'groupCollapsed', 'groupEnd', 'handleEvent', 'hidden',
        'history', 'home', 'id', 'image', 'images', 'innerHeight',
        'innerHTML', 'innerWidth', 'italics', 'javaEnabled', 'layer',
        'layers', 'link', 'location', 'log', 'mimeTypes', 'moveAbove',
        'moveBelow', 'moveBy', 'moveTo', 'moveToAbsolute',
        'navigate', 'navigator', 'offscreenBuffering', 'open',
        'opener', 'options', 'outerHeight', 'outerWidth',
        'packages', 'pageXOffset', 'pageYOffset', 'parent',
        'password', 'pkcs11', 'plugins', 'prompt', 'propertyIsEnum',
        'radio', 'refresh', 'releaseEvents', 'reload', 'reset',
        'routeEvent', 'screen', 'screenX', 'screenY', 'scroll',
        'scrollBy', 'scrollTo', 'secure', 'select', 'self',
        'small', 'status', 'stop', 'strike', 'submit', 'sup',
        'taint', 'taintEnabled', 'text', 'textContent', 'textarea',
        'top', 'trace', 'unescape', 'untaint', 'window'],
      jquery: ['$', 'jQuery']
    };

    /**
     * ---------------------------------------------
     * Private Variable (commentOpen)
     * ---------------------------------------------
     * is a comment open
     * @type {boolean}
     * @private
     */
    var commentOpen;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * converts a javascript function to string with
        html markup
     * param: a function (function)
     * @type {function(Object): {
            result: string,
         lineCount: number
       }}
     * @private
     */
    function init(f) {
      // First: convert function to array of lines
      // Then: convert array of lines to a formatted string
      return formatLines( prepareArray(f) );
    }

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
     * Private Method (formatLines)
     * ---------------------------------------------
     * formats the supplied lines of code
     * param: array of code lines (array)
     * @type {function(Array.<string>): {
            result: string,
         lineCount: number
       }}
     * @private
     */
    function formatLines(lines) {
      // Declare method variables
      var i, line, lineCount;
      // Set level of padding to 0
      paddingLevel = 0;
      // Set open comment indicator to false
      commentOpen  = false;
      // Save the count of lines
      lineCount = lines.length;
      // Loop through lines
      for (i=0; i<lines.length; i++) {
        // Prepare line for formatting
        line = prepareLine(lines[i]);
        // Set line padding
        if (!line.empty) {
          line.padding = setPadding(line.first, line.last);
        }
        // Highlight syntax
        if (!line.empty) {
          line.code = HighlightSyntax.init(line.code);
        }
        lines[i] = '<li style="padding-left:' +
        line.padding +'px">'+ line.code +'</li>';
      }
      return { result: lines.join(''), lineCount: lineCount };
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareArray)
     * ---------------------------------------------
     * converts a function into an array of strings
        where each value represents a line of code
        and replaces all tabs with spaces
     * param: a function (function)
     * @type {function(Object): Array.<string>}
     * @private
     */
    function prepareArray(f) {
      var code;
      // First: convert function to string
      // Then: standardize all line breaks
      code = String(f).replace(/\r\n?/g, '\n');
      // First: replace all tabs with spaces
      // Then: convert string to array of lines
      // Then: return result
      return code.replace(/\t/g, ' ').split('\n');
    }

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
        init: function (l) {
          return _init(l);
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
       * Private Variable (len)
       * ---------------------------------------------
       * the length of the line of code
       * @type {number}
       * @private
       */
      var len;

      /**
       * ---------------------------------------------
       * Private Method (_init)
       * ---------------------------------------------
       * adds highlighting spans to a line of code
       * @type {function(string): string}
       * @private
       */
      function _init(l) {
        // Convert line from string to array
        line = l.split('');
        // Save line array length
        len  = line.length;
        // Save copy of line array
        // for final output
        newLine = line.slice();
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
        var i, preceding;
        // Set index to start
        i = 0;
        // If (comment is already open by prior line)
        // Then {handle line comment start}
        if (commentOpen) {
          i = formatCommentClose(i);
          // If (whole line is comment)
          // Then {return newLine}
          if (i === len) {
            return newLine.join('');
          }
        }
        // Find and label comments, strings,
        // regexs, spaces, brackets, operators,
        // commas, semicolons, colons, periods,
        // numbers, keywords, identifiers, and
        // miscellaneous
        for(; i<len; i++) {
          switch (line[i]) {
            case '/':
              // Check if comment, regex, or division
              switch (line[i + 1]) {
                // Handle line comments
                case '/':
                  i = formatLineComment(i);
                break;
                // Handle comment opens
                case '*':
                  i = formatCommentOpen(i);
                break;
                default:
                  // Save preceding character
                  // If (index is line start)
                  // Then {set preceding to force regex= true}
                  preceding = ( (i === 0) ?
                    '(' : (line[i - 1] === ' ') ?
                      line[i - 2] : line[i - 1]
                  );
                  // If (regex statement)
                  // Then {handle regex statement}
                  // Else {handle division operator}
                  // Note: Current bugs include identifying
                  // the preceding binary operators 'in' and
                  // 'instanceof' as well as a one line if
                  // statement (e.g. if (i) /foo/.exec())
                  // and the use of the preceding unary
                  // operators '++' and '--' (e.g. i++ / x)
                  if (likelyRegex.indexOf(preceding) !== -1) {
                    i = formatRegex(i);
                  }
                  else {
                    i = formatOperator(i);
                  }
              }
            break;
            // Handle strings
            case '\'':
            case '"':
              i = formatString(i);
            break;
            // Handle spaces
            case ' ':
              i = formatSpace(i);
            break;
            // Handle brackets
            case '{':
            case '[':
            case '(':
            case ')':
            case ']':
            case '}':
              i = formatBracket(i);
            break;
            // Handle operators
            case '*':
            case '%':
            case '+':
            case '-':
            case '<':
            case '>':
            case '&':
            case '^':
            case '|':
            case '=':
            case '!':
            case '~':
            case '?':
              i = formatOperator(i);
            break;
            // Handle commas
            case ',':
              i = formatComma(i);
            break;
            // Handle semicolons
            case ';':
              i = formatSemicolon(i);
            break;
            // Handle colons
            case ':':
              i = formatColon(i);
            break;
            // Handle periods
            case '.':
              i = formatPeriod(i);
            break;
            // Handle numbers
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
              i = formatNumber(i);
            break;
            default:
              // If (character is an identifier start)
              // Then {handle identifiers and keywords}
              // Else {handle miscellaneous}
              if ( identifierStart.test(line[i]) ) {
                i = formatIdentifier(i);
              }
              else {
                i = formatMisc(i);
              }
          }
        }
        return newLine.join('');
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
        // Replace character with html entity
        switch (line[i]) {
          case '>':
            newLine[i] = '&gt;';
          break;
          case '<':
            newLine[i] = '&lt;';
          break;
        }
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
        // Loop through line starting at index
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return index}
          if (i >= len) {
            return i;
          }
          // Check character
          switch (line[i]) {
            // Possible comment end
            case '*':
              // If (comment ends)
              // Then {return index}
              if (line[i + 1] === '/') {
                return ++i;
              }
            break;
            // Sanitization needed
            case '>':
            case '<':
              sanitizeCharacter(i);
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
        // Declare method variables
        var b;
        // Save bracket type
        b = line[i];
        // Find string end
        while (true) {
          ++i;
          // If (line terminates)
          // Then {return last index}
          if (i === len) {
            return --i;
          }
          // Check character
          switch (line[i]) {
            // Possible string end
            case b:
              // If (string ends)
              // Then {return index}
              if (line[i - 1] !== '\\') {
                return i;
              }
            break;
            // Sanitization needed
            case '>':
            case '<':
              sanitizeCharacter(i);
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
          if (i === (len - 1)) {
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
        var iName;
        // Start empty array to contain each
        // character of the identifier name
        iName = [];
        while (true) {
          // Add character to iName
          iName.push(line[i]);
          // If (last index)
          // Then {return index and name}
          if (i === (len - 1)) {
            return { index: i, name: iName.join('') };
          }
          // If (next index not identifier)
          // Then {return index and name}
          if ( !identifiers.test(line[i + 1]) ) {
            return { index: i, name: iName.join('') };
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
        // Add comment span
        newLine[i] = '<span class="comment">/';
        // Move index to end of comment
        i = skipComment(++i);
        // If (comment not closed by line end)
        if (i === len) {
          // Set commentOpen to true
          commentOpen = true;
          // Move index to last value
          --i;
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
        // Add comment span to line start
        newLine[i] = ( (line[i] === '*') ?
          ' <span class="comment">*' :
          '<span class="comment">' + line[i]
        );
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
        if (i < len) {
          // Set commentOpen to false
          commentOpen = false;
          // Add closing span
          newLine[i] += '</span>';
          // Move index to next value
          ++i;
        }
        else {
          // Add closing span to line end
          newLine[i - 1] += '</span>';
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
        // Add comment span
        newLine[i] = '<span class="comment">/';
        // Moves index to line end
        i = len - 1;
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
        // Add string span
        newLine[i] = '<span class="string">' + line[i];
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
       * @type {function(number): number}
       * @private
       */
      function formatRegex(i) {
        var u;
        // Add regex span
        newLine[i] = '<span class="regex">/';
        // Move index to the closing forward slash
        i = skipString(i);
        // Start empty array to contain
        // each used regex flags
        u = [];
        // Check for regex flags after
        // closing forward slash
        looper:
        while (true) {
          // All regex flags have been used
          if (u.length === 3) {
            break looper;
          }
          switch (line[i + 1]) {
            case 'g':
            case 'i':
            case 'm':
              // Verify flag has not been repeated
              if (u.indexOf(line[i + 1]) !== -1) {
                break looper;
              }
              // Add flag to used flags array
              u.push(line[i + 1]);
              ++i;
            break;
            default:
              break looper;
          } 
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
        // Add space span
        newLine[i] = '<span class="space"> ';
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
        // Add bracket spans
        newLine[i] = '<span class="bracket">'+ line[i] +'</span>';
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
        // Declare method variables
        var sanitized;
        // Sanitize the operator
        sanitized = ( (line[i] === '<') ?
          '&lt;' : (line[i] === '>') ?
            '&gt;' : line[i]
        );
        // Add operator spans
        newLine[i] = '' +
        '<span class="operator">' +
          sanitized +
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
        // Add comma spans
        newLine[i] = '<span class="comma">,</span>';
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
        // Add semicolon spans
        newLine[i] = '<span class="semicolon">;</span>';
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
        // Add colon spans
        newLine[i] = '<span class="colon">:</span>';
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
        // Add period spans
        newLine[i] = '<span class="period">.</span>';
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
        // Add number span
        newLine[i] = '<span class="number">' + line[i];
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
       * @type {function(number): number}
       * @private
       */
      function formatIdentifier(i) {
        var identifier;
        // Save identifier name and index end
        // { index: 0, name: '' }
        identifier = skipIdentifier(i);
        // Check if keyword exists
        // Add corresponding span
        switch (true) {
          case (keywords.defining.indexOf(identifier.name) !== -1):
            if (identifier.name == 'function') {
              if ((line[identifier.index + 1] === '(') ||
                  (line[identifier.index + 1] === ' ' &&
                   line[identifier.index + 2] === '(')) {
                newLine[i] = '<span class="reservedKeyword">' + line[i];
              }
              else {
                newLine[i] = '<span class="definingKeyword">' + line[i];
              }
            }
            else {
              newLine[i] = '<span class="definingKeyword">' + line[i];
            }
          break;
          case (keywords.reserved.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="reservedKeyword">' + line[i];
          break;
          case (keywords.natives.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="nativeKeyword">' + line[i];
          break;
          case (keywords.values.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="valueKeyword">' + line[i];
          break;
          case (keywords.client.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="clientKeyword">' + line[i];
          break;
          case (keywords.jquery.indexOf(identifier.name) !== -1):
            newLine[i] = '<span class="jqueryKeyword">' + line[i];
          break;
          default:
            newLine[i] = '<span class="identifier">' + line[i];
        }
        // Add close span
        newLine[identifier.index] += '</span>';
        // Return index
        return identifier.index;
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
        // Add misc spans
        newLine[i] = '<span class="misc">' + line[i] + '</span>';
        // Return index
        return i;
      }

      // END CLASS: HighlightSyntax
      return __return;
    }());

    // END CLASS: PrettifyCode
    return _return;
  }());

// END WEB WORKER
}(questions));
//sedFlagWorkerEnd
// END USER DATA
}());
//sedFlagEnd