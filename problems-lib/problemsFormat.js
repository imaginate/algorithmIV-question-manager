/* Algorithm IV (v1.0.0) (learn@algorithmiv.com)
 * Section: Problems Format
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The MIT License (algorithmiv.com/docs/license) */

/**
 * ------------------------------------------------------------------
 * Algorithm IV Problems Format (v1.0.0)
 * ------------------------------------------------------------------
 * an outline for developers who would like to contribute new
    practice problems to this app
 */
(function() {
  "use strict";
  
  /**
   * -----------------------------------------------
   * Sources
   * -----------------------------------------------
   * add the sources of all of your questions here
   * object format:
      var sources = {
        'sourceID': 'Source Name'
      }
   */
  var sources = {
    'customID': 'sourceName'
  };
  
  /**
   * -----------------------------------------------
   * Categories
   * -----------------------------------------------
   * you can create your own set of categories, use
      mine, or start with mine and add more
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
  var categories = {
    main: {
      'graph' : 'Graphs',
      'hash'  : 'Hash Tables',
      'heap'  : 'Heaps',
      'search': 'Searching Algorithms',
      'sort'  : 'Sorting Algorithms',
      'tree'  : 'Trees'
    },
    sub: {
      'graph': {
        'digraph': 'Directed Graphs'
      },
      'hash': {
        'dblHash': 'Double Hashing'
      },
      'search': {
        'back' : 'Backtracking',
        'bfs'  : 'Breadth First Search',
        'brute': 'Brute Force Search',
        'dfs'  : 'Depth First Search'
      },
      'tree': {
        'binTree': 'Binary Trees',
        'trie'   : 'Tries'
      }
    }
  };

  /**
   * ---------------------------------------------
   * Questions
   * ---------------------------------------------
   * add your problems here (please consider that
      problems being added to the library will be
      done with the intention of helping others
      learn - as a result please try to make your
      problems clear and add generous comments to
      your solutions) (standard js formatting
      practices will be expected - refer to aIV's
      source for preferred js conventions)
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
  var questions = [
    {
      // Question: 1
      complete: true || false,
        source: 'sourceID',
       mainCat: [ 'mainCatID' ],
        subCat: [ 'subCatID','subCatID' ],
         links: [
           {
             name: 'A Helpful Link',
             href: 'http://www.algorithmiv.com'
           }
         ],
       problem: 'Write a function that solves this cool problem.',
      solution: function() {
        /*
         ** Solution:
         *  - [A general introduction to how you solved the problem.]
         *
         ** Need to Know Terms:
         *  - [Important term in your solution]: [a link to a description of this term (no marketing links allowed)]
         */
        
        // [first var description]
        // [second var description]
        var check, result;
        // Set check
        check = false;
        // If (the world spins)
        // Then {check is true}
        if (!!777) {
          check = true;
        }
        // Set result
        result = ( (check) ?
          'Pass' : 'Fail'
        );
        // Return the result
        return result;
      }
    }
  ];
}());