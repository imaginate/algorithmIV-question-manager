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
   * details:
     - see algorithmiv.com/docs/sources
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
   * details:
     - see algorithmiv.com/docs/categories
   */
  var categories = {
    main: {
      'array' : 'Arrays',
      'graph' : 'Graphs',
      'hash'  : 'Hashes',
      'lists' : 'Linked Lists',
      'search': 'Searching Algorithms',
      'sort'  : 'Sorting Algorithms',
      'tree'  : 'Trees'
    },
    sub: {
      'graph': {
        'adjList': 'Adjacency Lists',
        'adjMtrx': 'Adjacency Matrices',
        'digraph': 'Directed Graphs',
        'incList': 'Incidence Lists',
        'incMtrx': 'Incidence Matrices',
        'ungraph': 'Undirected Graphs'
      },
      'hash': {
        'dblHash': 'Double Hashing',
        'fnv'    : 'FNV Hash Algorithms',
        'hTable' : 'Hash Tables'
      },
      'lists': {
        'sList': 'Singly-Linked Lists',
        'dList': 'Doubly-Linked Lists'
      },
      'search': {
        'back'   : 'Backtracking',
        'binSrch': 'Binary Search',
        'bfs'    : 'Breadth First Search',
        'brute'  : 'Brute Force Search',
        'dfs'    : 'Depth First Search',
        'dynam'  : 'Dynamic Programming'
      },
      'sort': {
        'bucket': 'Bucket Sort',
        'heapS' : 'Heapsort',
        'insert': 'Insertion Sort',
        'merge' : 'Mergesort',
        'quick' : 'Quicksort',
        'radix' : 'Radix Sort',
        'select': 'Select Sort'
      },
      'tree': {
        'binTree': 'Binary Trees',
        'bst'    : 'Binary Search Trees',
        'heap'   : 'Heaps',
        'red'    : 'Red-Black Trees',
        'splay'  : 'Splay Trees',
        'trie'   : 'Tries'
      }
    }
  };

  /**
   * ---------------------------------------------
   * Questions
   * ---------------------------------------------
   * add your problems here
   * please consider that problems being added to
      the library will be done with the intention
      of helping others learn - as a result please
      try to make your problems clear and add
      generous comments to your solutions
   * standard js formatting practices will be
      expected - Google's style guide is a great
      reference for awesome formatting:
      - see google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Code_formatting#Code_formatting
   * details:
     - see algorithmiv.com/docs/questions
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
         *  - Step 1: [An explanation of the actions you
         *    made to solve the problem in this step.]
         *  - Step 2: [...]
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