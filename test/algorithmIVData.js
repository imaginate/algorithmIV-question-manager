/* Algorithm IV (v1.0.1) (learn@algorithmiv.com)
 * Section: User Data, App Initialization, & Web Worker
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The MIT License (algorithmiv.com/docs/license) */

/**
 * ------------------------------------------------------------------
 * Algorithm IV User Data (v1.0.1)
 * ------------------------------------------------------------------
 * manages a list of practice questions and detailed solutions
    for learning computer science focused algorithms and data
    structures, improving programming skillsets, and preparing
    for technical interviews
 * settings: configuration, categories, sources, and questions
 * directions:
   - see algorithmiv.com/docs/start
 */
(function() {
  "use strict";

  /**
   * -----------------------------------------------
   * Public Variable (configuration)
   * -----------------------------------------------
   * an object containing the configuration settings
      for this module
   * details:
     - see algorithmiv.com/docs/configuration
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
        id: true,
    worker: true
  };

  /**
   * -----------------------------------------------
   * Public Variable (sources)
   * -----------------------------------------------
   * an object containing all of the problem sources
   * details:
     - see algorithmiv.com/docs/sources
   */
  var sources = {
    'am': 'Amazon',
    'bl': 'Bloomberg',
    'fb': 'Facebook',
    'go': 'Google'
  };

  /**
   * -----------------------------------------------
   * Public Variable (categories)
   * -----------------------------------------------
   * an object containing each main and sub question
     category
   * details:
     - see algorithmiv.com/docs/categories
   */
  var categories = {
    main: {
      'array' : 'Arrays',
      'graph' : 'Graphs',
      'hash'  : 'Hashes',
      'list'  : 'Linked Lists',
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
      'list': {
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
        'binHeap': 'Binary Heaps',
        'binTree': 'Binary Trees',
        'bst'    : 'Binary Search Trees',
        'bnmHeap': 'Binomial Heaps',
        'fibHeap': 'Fibonacci Heaps',
        'red'    : 'Red-Black Trees',
        'splay'  : 'Splay Trees',
        'trie'   : 'Tries'
      }
    }
  };

  /**
   * ---------------------------------------------
   * Public Variable (questions)
   * ---------------------------------------------
   * an array of objects containing each question,
      its details, and your solution for it
   * details:
     - see algorithmiv.com/docs/questions
   */
  var questions = [
    {
      // Question: 1
      complete: true,
        source: 'fb',
       mainCat: [ 'search', 'tree', 'array' ],
        subCat: [ 'bfs', 'binTree' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=4505011482525696'
           }
         ],
       problem: 'Write a function that prints the rows of a binary tree, terminating each row with a carriage return.',
      solution: function() {
        /*
         ** Solution:
         *  - Step 1: A binary tree is created. An array of
         *    nodes storing their value and a reference to
         *    their children is used to implement the tree.
         *  - Step 2: A Breadth First Search algorithm is used
         *    to traverse the tree and add the nodes in order
         *    by row to the result.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Breadth First Search (BFS): http://en.wikipedia.org/wiki/Breadth-first_search
         *  - Data Structures:
         *    -- Binary Tree: http://en.wikipedia.org/wiki/Binary_tree
         *    -- Arrays: http://en.wikipedia.org/wiki/Array_data_structure
         */

        // The binary tree
        // The node rows to be printed
        var tree, result;

        // Set variables
        tree = [];
        result = '';

        // Creates the binary tree
        function createTree() {
          // Node index
          // Edge index
          var n, e;

          // Add empty nodes to tree
          for (n=0; n<15; n++) {
              tree.push({ val: n, edges: [] });
          }

          // Set edge index
          e = 1;
          // Add edges to tree
          for (n=0; n<7; n++) {
            tree[n].edges.push(tree[e],tree[e+1]);
            e += 2;
          }
        }

        // Saves a string of the binary tree's nodes
        //   in order with a line break for each row
        function printNodes() {
          // The list of current nodes to be searched
          // The current node being searched
          // The max nodes possible in the current row
          // The count of nodes in the current row
          // The count of the node's edges
          // The edges index
          var list, node, rowMax, rowCount, edges, e;

          // Set list to array with tree root
          list = [ tree[0] ];
          // Set max of first row
          rowMax = 1;
          // Set current row count
          rowCount = 0;

          // Loop through nodes
          while (list.length > 0) {

            // Set node and remove first item
            node = list.shift();
            // Increase the count by one
            ++rowCount;
            // Set result
            result += node.val + ( (rowMax === rowCount) ? '<br />' : ',' );

            // If (row finished)
            // Then {double max and reset count}
            if (rowMax === rowCount) {
              rowMax = rowMax * 2;
              rowCount = 0;
            }

            // Save node's edge count
            edges = node.edges.length;
            // Add node's edges to list
            for (e=0; e<edges; e++) {
              list.push(node.edges[e]);
            }
          }
        }
        
        // Create tree and print nodes
        createTree();
        printNodes();
        return result;
      }
    },
    {
      // Question: 2
      complete: true,
        source: 'am',
       mainCat: [ 'search', 'graph', 'array' ],
        subCat: [ 'back', 'dynam', 'dfs', 'digraph', 'incList' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=6031402409656320'
           }
         ],
       problem: 'Imagine a large city like Los Angeles. Suppose someone shows up at location A, then N minutes later at location B. Design a function that approximates the probability they passed a Starbucks.',
      solution: function() {
        /*
         ** Solution:
         *  - Step 1: A time weighted digraph of locations
         *    and a boolean value for whether a Starbucks is
         *    passed for each edge is created. An array of
         *    vertex nodes (storing its value and a reference
         *    to each of its edges) and edge nodes (storing
         *    its weight, Starbuck's value, and a reference
         *    to each of its connecting nodes) is used to
         *    implement the digraph.
         *  - Step 2: A recursive dynamic backtracking DFS
         *    algorithm is applied to traverse the digraph
         *    and find all of the paths possible to the
         *    destination within the provided maximum time
         *    frame and whether a Starbucks was passed on
         *    each path.
         *  - Step 3: The probability of passing a Starbucks
         *    is calculated.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Backtracking: http://en.wikipedia.org/wiki/Backtracking
         *    -- Dynamic Programming: http://en.wikipedia.org/wiki/Dynamic_programming
         *    -- Depth First Search (DFS): http://en.wikipedia.org/wiki/Depth-first_search
         *  - Data Structures:
         *    -- Directed Graph (Digraph): http://en.wikipedia.org/wiki/Directed_graph
         *    -- Weighted Graph: http://en.wikipedia.org/wiki/Glossary_of_graph_theory#Weighted_graphs_and_networks
         *    -- Incidence List: http://www.algorithmist.com/index.php/Graph_data_structures#Incidence_List
         *    -- Arrays: http://en.wikipedia.org/wiki/Array_data_structure
         */

        // The time weighted digraph
        // The starting vertex (starting location)
        // The final vertex (final destination)
        // The maximum weight of a path (minutes of time)
        // The final paths
        // The probability of passing a Starbucks
        // The visually prepared final results
        var graph, start, end, max, paths, prob, results;

        // Set variables
        graph = {
          vertices: [],
          edges: []
        };
        start =  0;
        end   =  9;
        max   = 50;
        paths = {
          list: [],
          starbucks: 0
        };
        prob  = 0;
        results = {
          count: {
            all: '',
            starbucks: ''
          },
          prob: '',
          paths: {
            all: '',
            starbucks: ''
          }
        };

        // Creates the weighted digraph
        function createGraph() {
          // The vertex index
          // The edge index
          // The edge's parent vertex
          // The edge's child vertex
          // The edge's weight
          // The edge's Starbuck's value
          var v, e, pNode, child, weight, starbucks;
          // The parent index
          // The child index
          // A shortcut function to add edge
          //   pointers to vertices
          var p, c, addPointer;
          
          // Set shortcut function
          // param: The vertex's index
          // param: An array of the edge's indexes
          addPointer = function(vertex, edges) {
            // The number of edges
            // The loop index
            // The edge node
            var len, i, node;
            
            // Save edges count
            len = edges.length;
            // Add each edge
            for (i=0; i<len; i++) {
              node = graph.edges[ edges[i] ];
              graph.vertices[vertex].edges.push(node);
            }
          }

          // Add vertices to graph
          for (v=0; v<10; v++) {
            graph.vertices.push({ val: v, edges: [] });
          }

          // Add edges to graph
          for (e=0; e<16; e++) {

            // Set weight and starbucks
            weight = 5;
            starbucks = (e === 5) ? true : false;
            // Set parent and child
            switch (true) {
              case (e < 3):
                p = 0;
                c = (e === 0) ? 1 : ++c;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e < 5):
                p = 1;
                c = e;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e < 7):
                p = 2;
                c = e;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e === 7):
                p = 3;
                c = 6;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e === 8):
                p = 4;
                c = 6;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e < 12):
                p = 5;
                c = ++c;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e < 14):
                p = 6;
                c = (e === 12) ? 7 : 9;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e === 14):
                p = 7;
                c = 8;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
              case (e === 15):
                p = 8;
                c = 9;
                pNode = graph.vertices[p];
                child = graph.vertices[c];
              break;
            }
            // Add edge
            graph.edges.push({
              pNode: pNode,
              child : child,
              weight: weight,
              starbucks: starbucks
            });
          }

          // Add edge pointers to vertices
          addPointer(0, [ 0,1,2 ]);
          addPointer(1, [ 3,4 ]);
          addPointer(2, [ 5,6 ]);
          addPointer(3, [ 7 ]);
          addPointer(4, [ 8 ]);
          addPointer(5, [ 9,10,11 ]);
          addPointer(6, [ 12,13 ]);
          addPointer(7, [ 14 ]);
          addPointer(8, [ 15 ]);
        }

        // Finds all of the paths possible
        //   within the max time
        function findPaths() {
          // The path being currently reviewed
          // A function that is called recursively
          //   to find each path
          var path, buildPaths;

          // Set the recursive DFS
          // param: The current node
          // param: The current cumulative weight
          // param: Whether a starbucks currently exists
          buildPaths = function(node, weight, starbucks) {
            // The string for the current path
            // The count of the node's edges
            // The edges index
            // The current edge's node
            // The new total path weight
            // The new starbucks value
            var edges, e, edge, newWeight, newStarbucks;

            // If (weight is greater than max weight)
            // Then {end this path traversal}
            if (weight > max) {
              return;
            }

            // If (node is destination)
            // Then {add path to results and end traversal}
            if (node.val === end) {

              // Save string of path
              path.string = '[ ' +
                path.values.join(',') + ',' + end +
              ' ]';

              // Add path to final list of paths
              paths.list.push({
                val: path.string,
                starbucks: starbucks
              });
              // Adjust count of Starbucks paths
              paths.starbucks += (starbucks) ? 1 : 0;

              // End this path traversal
              return;
            }

            // Add node to current path
            path.nodes.push(node);
            path.values.push(node.val);

            // Save the node's count of edges
            edges = node.edges.length;
            // Traverse each path rooting with each edge
            for (e=0; e<edges; e++) {
              // Save reference of edge's object
              edge = node.edges[e];
              // Set new weight total
              newWeight = weight + edge.weight;
              // Set new value for starbucks
              newStarbucks = (starbucks || edge.starbucks);
              // Continue search
              buildPaths(edge.child, newWeight, newStarbucks);
            }

            // Remove current node from path
            path.nodes.pop();
            path.values.pop();
          }

          // Set path to empty
          path = {
            nodes : [],
            values: [],
            string: ''
          };
          // Find the paths
          buildPaths(graph.vertices[start], 0, false);
        }

        // Calculates the probability of passing a Starbucks
        function calcProbability() {
          // Divide the number of paths with starbucks
          //   by the number of all paths and round up
          //   to the nearest whole percent
          prob = (paths.starbucks / paths.list.length) * 100;
          prob = Math.ceil(prob);
        }

        // Prepares an output for visual appeal
        function prepareResults() {
          // The count of paths
          // The first Starbucks path flag
          // The loop index
          var len, flag, i;

          // Save count of paths
          len = paths.list.length;
          
          // Set count results
          results.count.all = 'Count of All Paths: ' + len + '<br />';
          results.count.starbucks  = 'Count of All Paths with Starbucks: ';
          results.count.starbucks += paths.starbucks + '<br />';

          // Set probability result
          results.prob = 'Probability of Passing Starbucks: ' + prob + '%<br />';

          // Set path result headers
          results.paths.all = 'List of All Paths:';
          results.paths.starbucks = 'List of All Paths with Starbucks:';
          // Set path result containers
          results.paths.all += '<span style="display:block;margin-left:30px">';
          results.paths.starbucks += '<span style="display:block;margin-left:30px">';
          // Set first Starbucks flag
          flag = true;
          // Set path results
          for (i=0; i<len; i++) {
            results.paths.all += (i > 0) ? '<br />' : '';
            results.paths.all += paths.list[i].val;
            if (paths.list[i].starbucks) {
              // If (first path with Starbucks)
              // Then {change flag}
              // Else {add line break}
              if (flag) {
                flag = false;
              }
              else {
                results.paths.starbucks += '<br />';
              }
              results.paths.starbucks += paths.list[i].val;
            }
          }
          // Close path result containers
          results.paths.all += '</span>';
          results.paths.starbucks += '</span>';
        }

        // Create digraph, find paths,
        //   calculate probability, and
        //   return the prepared results
        createGraph();
        findPaths();
        calcProbability();
        prepareResults();
        return results.count.all + results.count.starbucks +
        results.prob + results.paths.all + results.paths.starbucks;
      }
    },
    {
      // Question: 3
      complete: true,
        source: 'go',
       mainCat: [ 'hash', 'search' ],
        subCat: [ 'hTable', 'dblHash', 'fnv', 'brute' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=5724911848914944'
           }
         ],
       problem: 'Given a table of [Url =&gt; Content] pairs produce a new table of [Url =&gt; Duplicate Urls] pairs.<br /><br />' +
                'Example Input:<br />' +
                'a.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br />' +
                'b.com =&gt; &lt;html&gt;beta&lt;/html&gt;<br />' +
                'c.com =&gt; &lt;html&gt;gamma&lt;/html&gt;<br />' +
                'd.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br />' +
                'e.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br /><br />' +
                'Example Output:<br />' +
                'a.com =&gt; [ d.com, e.com ]<br />' +
                'b.com =&gt; []<br />' +
                'c.com =&gt; []',
      solution: function() {
        /*
         ** Solution:
         *  - Step 1: A hash table using the original
         *    urls as the keys and their page's content
         *    as the values is created.
         *  - Step 2: A hash table using a 32 bit hash
         *    of the page's content for each key and the
         *    content itself as the value is created. A
         *    modified FNV-1a hash algorithm is used to
         *    hash the content. After each new hash
         *    creation the original hash table is
         *    modified (i.e. the content is replaced
         *    with its hash).
         *  - Step 3: An optimized brute force algorithm
         *    is applied to visit each url and identify
         *    any urls with the duplicate content until
         *    all urls have been marked as unique or
         *    duplicated.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- FNV Hash Algorithm: http://www.isthe.com/chongo/tech/comp/fnv/
         *    -- Double Hashing: http://en.wikipedia.org/wiki/Double_hashing
         *    -- Brute Force Search: http://en.wikipedia.org/wiki/Brute-force_search
         *  - Data Structures:
         *    -- Hash Table: http://en.wikipedia.org/wiki/Hash_table
         */
        
        // The supplied urls and their page's content
        // The hash table of all page's content
        // The list of urls and their duplicated content
        // The visually prepared duplicate results
        var inputs, hashes, duplicates, results;

        // Set variables
        inputs = {};
        hashes = {};
        duplicates = {};
        results = [];

        // Adds the original list of urls
        function setupInputs() {
          // Add urls to inputs
          inputs['a.com'] = '<html>alpha</html>';
          inputs['b.com'] = '<html>beta</html>';
          inputs['c.com'] = '<html>gamma</html>';
          inputs['d.com'] = '<html>alpha</html>';
          inputs['e.com'] = '<html>alpha</html>';
        }

        // Hashes a string with the FNV-1a hash algorithm
        // param: The string to be hashed
        // param: The hashed collision
        // param: The extra rotations to resolve a collision
        function createHash(string, hash, extras) {
          // The FNV offset basis for the hash
          // The FNV prime number to use for multiplication
          // The string length
          // The loop index
          var offset, prime, len, i;

          // Set offset and prime to the 32 bit FNV values
          offset = 2166136261;
          prime  = 16777619;

          // If (no hash supplied)
          // Then {create new hash}
          // Else {resolve collision}
          if (typeof hash === 'undefined') {

            // Offset the hash
            hash = offset;

            // Save string length
            len = string.length;
            // Loop through each string character
            for (i=0; i<len; i++) {
              // XOR and multiply by prime
              hash = hash ^ string.charAt(i);
              hash = hash * prime;
            }
          }
          else {

            // Loop through each extra time
            for (i=0; i<extras; i++) {
              // XOR and multiply by prime
              hash = hash ^ string.charAt(i);
              hash = hash * prime;
            }
          }

          return hash;
        }

        // Creates a hash table for the url page's content
        function createHashTable() {
          // Function that adds hash to table
          // The current url
          // The current url's content
          // The current content's hash
          var addHash, url, content, hash;

          // Set addHash function
          addHash = function(theUrl, theContent, theHash) {

            // If (hash does not exist in table)
            if (typeof hashes[theHash] === 'undefined') {
              // Add hash key to table
              hashes[theHash] = {
                collisions: 0,
                content: theContent
              };
              // Replace inputs content with hash
              inputs[theUrl] = theHash;
            }
            else {
              // If (no collision)
              // Then {replace inputs content with hash}
              // Else {add collision, create new hash, and repeat process}
              if (theContent === hashes[theHash].content) {
                inputs[theUrl] = theHash;
              }
              else {
                ++hashes[theHash].collisions;
                theHash = createHash(theContent, theHash, hashes[theHash].collisions);
                addHash(theUrl, theContent, theHash);
              }
            }
          };

          // Loop through supplied inputs
          for (url in inputs) {
            // Filter out default javascript properties
            if ( inputs.hasOwnProperty(url) ) {

              // Save, hash, and add the content and 
              //   hash to the hash table
              content = inputs[url];
              hash = createHash(content);
              addHash(url, content, hash);
            }
          }
        }

        // Finds the duplicated url page's content
        function findDuplicates() {
          // The list of the urls to check
          // The current url
          // The current length of the url list
          // The loop index
          // The next url
          // The loop count
          var urls, url, len, i, next, l;

          // Set the url list to empty then
          //   add all the urls to it
          urls = [];
          for (url in inputs) {
            if ( inputs.hasOwnProperty(url) ) {
              urls.push(url);
            }
          }

          // Loop through url list
          while (urls.length > 0) {

            // Save and remove first url on list
            url = urls.shift();
            // Add a property to the duplicates
            //   object with the url as the key
            duplicates[url] = [];

            // Save the current url list length
            len = urls.length;
            // Set index and loop count to 0
            i = l = 0;
            // Loop through url list
            for (; l<len; l++) {

              // Save the next url
              next = urls[i];

              // If (urls content matches)
              // Then {save to duplicates and remove from url list}
              // Else {increase index}
              if (inputs[url] === inputs[next]) {
                duplicates[url].push(next);
                urls.splice(i, 1);
              }
              else {
                ++i;
              }
            }
          }
        }

        // Prepares the results to be returned
        function prepareResults() {
          // The current url
          var url;

          // Add each url to the results array
          for (url in duplicates) {
            if ( duplicates.hasOwnProperty(url) ) {
              results.push(url + ' => [ ' + duplicates[url].join(',') + ' ]');
            }
          }
        }

        // Setup data structures, find duplicated
        //   content, and return visually
        //   prepared results
        setupInputs();
        createHashTable();
        findDuplicates();
        prepareResults();
        return results.join('<br />');
      }
    },
    {
      // Question: 4
      complete: true,
        source: 'go',
       mainCat: [ 'search', 'tree', 'graph', 'hash', 'array' ],
        subCat: [ 'brute', 'back', 'dfs', 'trie', 'arb', 'digraph', 'adjList', 'hTable' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=6270813198090240'
           }
         ],
       problem: 'You are given a string of four lower case characters and a dictionary of english words. Choose a data structure to represent the dictionary and write an algorithm that returns all the words from the dictionary that can be formed by the characters of the string.<br />' +
                'Example:<br />' +
                'string = \'ogeg\'<br />' +
                'words = [ \'egg\',\'ego\', ... ]',
      solution: function() {
        /*
         ** Solution:
         *  - Step 1: A json dictionary of English words is
         *    downloaded for use via ajax.
         *  - Step 2: A brute force search algorithm is used
         *    to create a trie of only the words from the
         *    dictionary that have a max of 4 characters
         *    and begin with a letter from the given string.
         *    A hash table with the key set to the current
         *    substring and the value set to a node
         *    containing a boolean value for whether the
         *    substring is a word, the string value of the
         *    substring, and an array of references to its
         *    child nodes is used to represent the trie.
         *  - Step 3: An arborescence is constructed for all
         *    of the characters in the supplied string.
         *  - Step 4: A backtracking algorithm is used to
         *    find all of the possible words resulting from
         *    the arborescence of the supplied string.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Brute Force Search: http://en.wikipedia.org/wiki/Brute-force_search
         *    -- Backtracking: http://en.wikipedia.org/wiki/Backtracking
         *    -- Depth First Search (DFS): http://en.wikipedia.org/wiki/Depth-first_search
         *  - Data Structures:
         *    -- Trie: http://www.geeksforgeeks.org/trie-insert-and-search/
         *    -- Arborescence: http://en.wikipedia.org/wiki/Arborescence_(graph_theory)
         *    -- Directed Graph (Digraph): http://en.wikipedia.org/wiki/Directed_graph
         *    -- Adjacency List: http://en.wikipedia.org/wiki/Adjacency_list
         *    -- Hash Table: http://en.wikipedia.org/wiki/Hash_table
         *    -- Arrays: http://en.wikipedia.org/wiki/Array_data_structure
         *
         ** Copyright Notice:
         *  - The list of English words used to create the test data
         *    for this question was derived from the EOWL and UKACD.
         *  - See github.com/imaginate/algorithmIV/blob/master/example/resources/words.json
         *  - See http://dreamsteep.com/projects/the-english-open-word-list.html
         *  - Copyright (c) J Ross Beresford 1993-1999. All Rights Reserved.
         *  - Copyright Details: http://cfajohnson.com/wordfinder/UKACD17.shtml 
         */

        // A list of English words for this test
        // An array of all the string's letters and an
        //   indicator of how many duplicates exist
        // A trie of words with a max length of 4
        //   characters and starting with each of
        //   the string's characters
        // The input string
        // The arborescence of the string's characters
        // The resulting possible words from the string
        var words, letters, wordTrie, string, graph, results;

        // Setup variables
        words    = {};
        letters  = {
          list: [],
          dupl: 0
        }
        wordTrie = {};
        string   = 'ogeg';
        graph    = {};
        results  = [];

        // Download the json dictionary
        function makeAjaxCall() {
          // Contains the ajax call
          var http;

          http = new XMLHttpRequest();
          http.onreadystatechange = function() {
            // If (ajax finished)
            if (http.readyState === 4 && http.status === 200) {
              // Sanitize and set the words list
              words = JSON.parse(http.responseText);
            }
          };
          http.open('GET', 'resources/words.json', false);
          http.send();
        }

        // Removes string's duplicate letters
        function setLetters() {
          // The loop index
          // The list of letter duplicates
          // The current letter
          var i, duplList, letter;

          // Set duplicate list
          duplList = [];

          // Save letters and duplicates
          for (i=0; i<4; i++) {

            // Save letter
            letter = string.charAt(i);
            // If (no duplicates exist)
            // Then {add letter to list}
            // Else {add letter to duplicates and trigger flag}
            if (letters.list.indexOf(letter) === -1) {
              letters.list.push(letter);
            }
            else {
              duplList.push(letter);
              ++letters.dupl;
            }
          }

          // Sort lists
          letters.list.sort();
          duplList.sort();
          // Append duplicates to main list
          letters.list = letters.list.concat(duplList);
        }

        // Create the trie of words
        function createWordTrie() {
          // The count of unique letters
          // The letter index
          var len, i;

          // Save the letters count
          len = letters.list.length - letters.dupl;
          // Add a branch to the trie for each letter
          for (i=0; i<len; i++) {
            addTrieBranch(letters.list[i]);
          }
        }

        // Adds a branch to the root of trie
        // param: the starting value of the branch
        function addTrieBranch(letter) {
          // The word loop index
          // The count of words
          // The current word
          // The current word length
          // The substring loop index
          // The last character index
          var i, wordsLen, word, wordLen, c, last;
          // The previous word substring
          // The new word substring
          var pNode, child;
          
          // Add branch to trie
          wordTrie[letter] = {
            isWord: false,
             value: letter,
              kids: []
          };
          // Save words length
          wordsLen = words[letter].length;

          // Loop through words
          for (i=0; i<wordsLen; i++) {
            
            // Save word and word length
            word = words[letter][i];
            wordLen = word.length;

            // If (word has less than 5 characters)
            // Then {add word to trie}
            if (wordLen < 5) {

              // If (word is one character)
              // Then {set root end prop to true}
              // Else {add word to trie}
              if (wordLen === 1) {
                wordTrie[letter].isWord = true;
              }
              else {

                // Save last index
                last = wordLen - 1;
                // Save child start
                child = letter;
                // Loop through the word's characters
                for (c=1; c<=last; c++) {

                  // Save current string
                  pNode = child;
                  child += word.charAt(c);

                  // If (child does not exist)
                  // Then {add to trie}
                  // Else {update isWord}
                  if (typeof wordTrie[child] === 'undefined') {
                    wordTrie[child] = {
                      isWord: (c === last),
                       value: child,
                        kids: []
                    };
                    wordTrie[pNode].kids.push(wordTrie[child]);
                  }
                  else {
                    wordTrie[child].isWord = wordTrie[child].isWord || (c === last);
                  }
                }
              }
            }
          }
        }

        // Create arborescence for the supplied string
        function createGraph() {
          // A function to add the letter nodes
          var addKids;

          // Adds each letter's child nodes recursively
          // param: The parent node
          // param: The remaining list
          // param: Indicates whether this is the first pass
          //   and whether list duplicates exist (optional)
          addKids = function(node, list, unique) {
            // The count of the remaining letters
            // The loop index
            // The new substring
            // The child node
            // The newList copy
            var len, i, word, child, copy;

            // Set unique
            unique = unique || false;
            // Set count
            len = list.length - ( (unique) ?
              letters.dupl : 0
            );
            // For each remaining letter
            for (i=0; i<len; i++) {

              // Save new value and child
              word  = node.val + list[i];
              child = { val: word, kids: [] };
              // Add child to parent
              node.kids.push(child);
              // If (remaining letters)
              if (len > 1) {

                // Save modified list
                copy = list.slice(0);
                copy.splice(i, 1);
                // Call recursive function
                addKids(child, copy);
              }
            }
          }

          // Setup graph base
          graph = { val: '', kids: [] };
          // Add branches
          addKids(graph, letters.list, !letters.dupl);
        }

        // Finds all of the possible words resulting from the string
        function findWords() {
          // A function to recursively handle the DFS
          var backtrack;

          // Recursively backtrack to find words
          // param: The current node
          backtrack = function(node) {
            // The count of children
            // The loop index
            // The current child
            var len, i, child;

            // Set count
            len = node.kids.length;
            // Loop through children
            for (i=0; i<len; i++) {

              // Set child node
              child = node.kids[i];

              // If (partial word exists)
              // Then {continue search}
              if (!!wordTrie[child.val]) {

                // If (partial word is complete)
                // Then {add word to results}
                if (wordTrie[child.val].isWord &&
                    results.indexOf(child.val) === -1) {
                    results.push(child.val);
                }

                // Continue DFS
                backtrack(child);
              }
            }
          }

          // Start recursive search
          backtrack(graph);
        }

        // Download dictionary, create trie of words,
        //   create arborescence of input string
        //   characters, find the possible words, and
        //   return the results
        makeAjaxCall();
        setLetters();
        createWordTrie();
        createGraph();
        findWords();
        return '[ ' + results.sort().join(',') + ' ]';
      }
    },
    {
      // Question: 5
      complete: true,
        source: 'bl',
       mainCat: [ 'search', 'graph', 'hash', 'array' ],
        subCat: [ 'dfs', 'brute', 'digraph', 'adjList', 'hTable' ],
         links: [
           {
             name: 'Further Discussion',
             href: 'http://www.careercup.com/question?id=5768610725232640'
           }
         ],
       problem: 'Using the below node list find the path that uses all the nodes without duplicating one.<br />' +
                '[ JFK,LXA,SNA,RKJ,LXA,SNA ]<br />' +
                'Note: Each pair of nodes define a directed edge like so:<br />' +
                '[ (JFK -&gt; LXA),(SNA -&gt; RKJ),(LXA -&gt; SNA) ]<br />',
      solution: function() {
        /*
         ** Solution:
         *  - Step 1: A brute force search algorithm is
         *    used to create an arborescence of the nodes
         *    in a vector while simultaneously building
         *    an array containing the two node values
         *    that are not duplicated (i.e. the
         *    possible arborescence roots). A hash
         *    table with a key set to the location
         *    string and a value set to a node
         *    containing the location string and edge
         *    references is used to represent the
         *    arborescence.
         *  - Step 2: The two possible root node
         *    values are checked, and the node value
         *    that is not the root is removed from the
         *    array.
         *  - Step 3: One pass of a DFS algorithm is
         *    used to print the path of the nodes.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Brute Force Search: http://en.wikipedia.org/wiki/Brute-force_search
         *    -- Depth First Search (DFS): http://en.wikipedia.org/wiki/Depth-first_search
         *  - Data Structures:
         *    -- Arborescence: http://en.wikipedia.org/wiki/Arborescence_(graph_theory)
         *    -- Directed Graph (Digraph): http://en.wikipedia.org/wiki/Directed_graph
         *    -- Adjacency List: http://en.wikipedia.org/wiki/Adjacency_list
         *    -- Hash Table: http://en.wikipedia.org/wiki/Hash_table
         *    -- Arrays: http://en.wikipedia.org/wiki/Array_data_structure
         */

        // Original node list
        // Arborescence of nodes
        // Possible root nodes
        // Final node path
        var vector, graph, roots, result;

        // Set variables
        vector = [ 'JFK','LXA','SNA','RKJ','LXA','SNA' ];
        graph  = {};
        roots  = [];
        result = [];

        // Adds unique node keys to the roots list
        //   and removes duplicates
        // param: node value to check
        function addRoot(nodeVal) {
          // Index of node in roots array
          var i;

          // Save node index
          i = roots.indexOf(nodeVal);

          // If (node value is not in roots)
          // Then {add to roots}
          // Else {remove from roots}
          if (i === -1) {
            roots.push(nodeVal);
          }
          else {
            roots.splice(i, 1);
          }

          return (i === -1);
        }

        // Creates an arborescence of the nodes
        function createGraph() {
          // The vector length
          // The loop index
          // The current node value
          // Indicates whether to add new node
          // The vertex node
          // The edge node
          var len, i, nodeVal, check, vertex, edge;

          // Save vector length
          len = vector.length;

          // Add nodes
          for (i=0; i<len; i++) {

            // Set and check node value
            nodeVal = vector[i];
            check   = addRoot(nodeVal);
            // If (node value does not exist)
            // Then {add node}
            if (check) {
              graph[nodeVal] = {
                value: nodeVal,
                edges: []
              }
            }
          }

          // Add edges
          for (i=0; i<len; i++) {

            // Set vertex and edge
            vertex = graph[ vector[i] ];
            edge   = graph[ vector[++i] ];
            // Add edge to vertex
            vertex.edges.push(edge);
          }
        }

        // Finds the root node
        function findRoot() {
          // The loop index
          // The current node
          var i, node;

          // Loop through roots
          for (i=0; i<2; i++) {

            // Save node reference
            node = graph[ roots[i] ];
            // If (node does not have an edge)
            // Then {remove it from roots}
            if (node.edges.length === 0) {
              roots.splice(i, 1);
            }
          }
        }

        // Finds the resulting path
        function findPath() {
          // The current node
          // The count of edges
          var node, edges;

          // Set node to root node
          node = graph[ roots[0] ];

          // Run DFS
          while (!!node) {

            // Add current node value to results
            result.push(node.value);
            // Save count of edges
            edges = node.edges.length;
            // If (node has edge)
            // Then {set next node to edge}
            // Else {end loop}
            node = ( (edges > 0) ?
              node.edges[0] : !node
            );
          }
        }

        // Create arborescence, find root
        //   node, find final path, and
        //   return the result
        createGraph();
        findRoot();
        findPath();
        return result.join(' -&gt; ');
      }
    },
    {
      // Question: 6
      complete: true,
        source: 'go',
       mainCat: [ 'sort', 'tree', 'search', 'list', 'array' ],
        subCat: [ 'heapS', 'binHeap', 'bst', 'back', 'bfs', 'brute', 'dList' ],
         links: [
           {
             name: 'More on Converting a Binary Search Tree into a Doubly-Linked List',
             href: 'http://www.careercup.com/question?id=4863668900593664'
           }
         ],
       problem: 'Given an array of random numbers, create a binary search tree with the median as the root. Then convert the binary search tree into a doubly-linked list that is sorted in ascending or descending order and return the first node in the list. Do the sort and conversion in place<span style="margin:0 12px">&ndash;</span>i.e. the memory complexity of your algorithms should be <em style="margin:0 2px">&Omicron;</em>(1).' +
                '<span style="display:block;margin:15px 0 10px">Example diagram of conversion:</span>'  +
                '<style>' +
                  '.aIV-exQ3-table {padding:0;margin:0;text-align:center;border-collapse:collapse;border:0}' +
                  '.aIV-exQ3-table tr {padding:0;margin:0;text-align:center;border:0}' +
                  '.aIV-exQ3-table td {padding:0;margin:0;text-align:center;verticle-align:middle;border:0}' +
                  '.aIV-exQ3-table span.lineContainer {position:relative;display:block;width:100%;height:100%;overflow:hidden}' +
                  '.aIV-exQ3-table span.lineFiller {opacity:0}' +
                  '.aIV-exQ3-table span.topLine {position:absolute;top:2px;left:0;display:block;width:100%;height:1px;background:#192037}' +
                  '.aIV-exQ3-table span.leftLine, .aIV-exQ3-table span.rightLine {position:absolute;top:50%;left:-50%;display:block;width:200%;height:1px;background:#192037}' +
                  '.aIV-exQ3-table span.leftLine {-ms-transform:rotate(-45deg);-moz-transform:rotate(-45deg);webkit-transform:rotate(-45deg);transform:rotate(-45deg)}' +
                  '.aIV-exQ3-table span.rightLine {-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);webkit-transform:rotate(45deg);transform:rotate(45deg)}' +
                '</style>' +
                '<table class="aIV-exQ3-table">' +
                  '<tr>' +
                    '<td><u>Unsorted Array</u></td>' +
                    '<td></td>' +
                    '<td><u>Binary Search Tree</u></td>' +
                    '<td></td>' +
                    '<td><u>Doubly-Linked List</u></td>' +
                  '</tr>' +
                  '<tr>'  +
                    '<td>[&nbsp;&nbsp;7,3,9&nbsp;&nbsp;]</td>' +
                    '<td style="padding:0 20px">&rArr;<br />&rArr;</td>'     +
                    '<td>' +
                      '<table class="aIV-exQ3-table" style="margin:5px auto 0;">' +
                        '<tr>'  +
                          '<td></td>'  +
                          '<td></td>'  +
                          '<td>7</td>' +
                          '<td></td>'  +
                          '<td></td>'  +
                        '</tr>' +
                        '<tr>'  +
                          '<td></td>' +
                          '<td>&sol;</td>'  +
                          '<td></td>' +
                          '<td>&bsol;</td>' +
                          '<td></td>' +
                        '</tr>' +
                        '<tr>'  +
                          '<td>3</td>' +
                          '<td></td>'  +
                          '<td></td>'  +
                          '<td></td>'  +
                          '<td>9</td>' +
                        '</tr>' +
                      '</table>' +
                    '</td>' +
                    '<td style="padding:0 20px">&rArr;<br />&rArr;</td>'     +
                    '<td>3&nbsp;&nbsp;&lrarr;&nbsp;&nbsp;7&nbsp;&nbsp;&lrarr;&nbsp;&nbsp;9</td>' +
                  '</tr>' +
                '</table>',
      solution: function() {
        /*
         ** Solution:
         *  - Step 1: A string of the supplied unsorted
         *    array of values is created for the results.
         *  - Step 2: The array of unsorted values is
         *    sorted to reflect the binary heap property.
         *  - Step 3: The array representing the binary
         *    heap is sorted in ascending order (heapsort).
         *  - Step 4: A balanced binary search tree is
         *    created from the heap. A linked list of
         *    nodes containing their value and references
         *    to their left and right children is used to
         *    represent the binary search tree.
         *  - Step 5: A breadth first search algorithm is
         *    used to create a string of the binary search
         *    tree for the results.
         *  - Step 6: A backtracking algorithm is used to
         *    convert the binary search tree into to a
         *    doubly-linked list.
         *  - Step 7: A brute force search algorithm is
         *    used to create a string of the values in
         *    the doubly-linked list for the results.
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- Heapsort: http://en.wikipedia.org/wiki/Heapsort
         *    -- Breadth First Search (BFS): http://en.wikipedia.org/wiki/Breadth-first_search
         *    -- Backtracking: http://en.wikipedia.org/wiki/Backtracking
         *    -- Brute Force Search: http://en.wikipedia.org/wiki/Brute-force_search
         *  - Data Structures:
         *    -- Binary Heap: http://en.wikipedia.org/wiki/Binary_heap
         *    -- Binary Search Tree: http://en.wikipedia.org/wiki/Binary_search_tree
         *    -- Doubly-Linked List: http://en.wikipedia.org/wiki/Doubly_linked_list
         *    -- Arrays: http://en.wikipedia.org/wiki/Array_data_structure
         */

        // The provided array of random numbers
        // The binary search tree
        // The starting node for the doubly-linked list
        // The final results
        var vals, tree, list, results;

        // Set variables
        vals = [ 88,97,56,41,27,16,95,54,28 ];
        tree = {
          val  : null,
          left : null,
          right: null
        };
        list = {
          val  : null,
          left : null,
          right: null
        };
        results = {
          vals: null,
          tree: null,
          list: null,
          show: ''
        };

        // Sorts the array of random numbers
        function sortValues() {
          // A function to convert the unsorted
          //   array into a heap
          // A function to construct the heap
          // A function to sort the heap
          var createHeap, heapify, sortHeap;

          // Creates a binary heap of the values
          createHeap = function() {
            // The number of provided values
            // The last value's index
            // The current value
            var len, last, val;

            // Save count of values
            len = vals.length;
            // Save last index
            last = len - 1;
            // Save first parent index
            val = (len - 2) / 2;
            val = Math.floor(val);

            // Build heap
            for (; val>=0; val--) {
              heapify(val, last);
            }
          }

          // Ensures the nodes are in heap order
          // param: The index of the starting node
          // param: The index of the ending node
          heapify = function(start, end) {
            // The parent index
            // The left child index
            // The right child index
            // The index of the biggest value
            var prt, left, right, max;

            // Set the first parent and child
            prt  = start;
            left = (prt * 2) + 1;

            // Check each parent node
            while (left <= end) {

              // Set max
              max = (vals[left] > vals[prt]) ? left : prt;

              // Set right child
              right = left + 1;
              // If (right child exists)
              // Then {check max value}
              if (right <= end) {
                max = (vals[right] > vals[max]) ? right : max;
              }

              // If (parent is max)
              // Then {end heapify}
              if (prt === max) {
                return;
              }

              // Swap parent and child values
              vals[max] = ( vals[prt] + (vals[prt] = vals[max]) ) - vals[max];

              // Set new parent and child indexes
              prt  = max;
              left = (prt * 2) + 1;
            }
          }

          // Sorts the heap
          sortHeap = function() {
            // The last index of the heap size
            var i;

            // Set index to the heap's last
            i = vals.length - 1;
            // Sort heap
            while (i > 0) {
            
              // Move the max (root) value to the end of the heap
              vals[i] = ( vals[0] + (vals[0] = vals[i]) ) - vals[i];

              // Reduce the heap size by 1
              --i;

              // Repair the heap missing its root
              heapify(0, i);
            }
          }
          
          // Run heapsort on array of values
          createHeap();
          sortHeap();
        }

        // Creates the binary search tree
        function createTree() {
          // A recursive function to set left children
          // A recursive function to set right children
          // The median heap index
          // The last index of the heap
          var setLeft, setRight, median, last;

          // Sets the left children
          // param: the parent node
          // param: the parent index
          // param: the starting index
          setLeft = function(node, prt, start) {
            // The nodes in the provided range (start to parent)
            // The index of the left child
            // The ending index for a right child
            var nodes, left, end;

            // Find the count of nodes
            nodes = prt - start;

            // If (no nodes)
            // Then {end traversal}
            if (nodes < 1) {
              return;
            }

            // Set the left child index and node
            left = ( (nodes < 3) ?
              prt - 1 : ( (nodes < 5) ?
                prt - 2 : start + Math.ceil(nodes / 2)
              )
            );
            node.left = {
              val  : vals[left],
              left : null,
              right: null
            };

            // If (no next child)
            // Then {end traversal}
            if (nodes === 1) {
              return;
            }

            // Set the next left child
            setLeft(node.left, left, start);

            // If (right child exists)
            // Then {set the right child}
            if (nodes > 2) {
              end = prt - 1;
              setRight(node.left, left, end);
            }
          };

          // Sets the right children
          // param: the parent node
          // param: the parent index
          // param: the ending index
          setRight = function(node, prt, end) {
            // The nodes in the provided range (parent to end)
            // The index of the right child
            // The starting index for a left child
            var nodes, right, start;

            // Find the count of nodes
            nodes = end - prt;

            // If (no nodes)
            // Then {end traversal}
            if (nodes < 1) {
              return;
            }

            // Set the right child index and node
            right = ( (nodes < 3) ?
              prt + 1 : ( (nodes < 6) ?
                prt + 2 : prt + Math.floor(nodes / 2)
              )
            );
            node.right = {
              val  : vals[right],
              left : null,
              right: null
            };

            // If (no next child)
            // Then {end traversal}
            if (nodes === 1) {
              return;
            }

            // Set the next right child
            setRight(node.right, right, end);

            // If (left child exists)
            // Then {set the left child}
            if (nodes > 2) {
              start = prt + 1;
              setLeft(node.right, right, start);
            }
          };

          // Find and set root to median value
          median = vals.length / 2;
          median = Math.floor(median);
          tree.val = vals[median];

          // Set root's left and right children
          setLeft(tree, median, 0);
          last = vals.length - 1;
          setRight(tree, median, last);
        }
        
        // Creates the doubly-linked list
        function createList() {
          // A function that moves the  BST's left root
          //   branch to the doubly-linked list
          // A function that moves the  BST's right root
          //   branch to the doubly-linked list
          var moveLeft, moveRight;

          // Moves the left root branch of the BST to the
          //   doubly-linked list
          moveLeft = function() {
            // The node with the minimum value
            //   remaining in the left branch
            // The min node's parent
            // The last node in the linked list
            var minNode, prtNode, listNode;

            // Set the last node in the linked
            //   list to the beginning
            listNode = list;

            // Find, remove, and replace the min node
            while (!!tree.left) {

              // Set the parent node to the tree root
              prtNode = tree;

              // Find the min node's parent and save both
              while (!!prtNode.left.left) {
                prtNode = prtNode.left;
              }
              minNode = prtNode.left;

              // Remove min node from tree and repair the BST
              prtNode.left = (!minNode.right) ? null : minNode.right;
              minNode.right = null;

              // Add min node to linked list
              listNode.right = minNode;
              minNode.left = listNode;
              listNode = minNode;
            }

            // Add root to linked list
            listNode.right = tree;
            tree.left = listNode;
          };
          
          // Moves the right root branch of the BST to the
          //   doubly-linked list
          moveRight = function() {
            // The node with the maximum value
            //   remaining in the right branch
            // The max node's parent
            // The last node in the linked list
            var maxNode, prtNode, listNode;

            // Set the last node in the linked
            //   list to the end
            listNode = list;

            // Find, remove, and replace the max node
            while (!!tree.right) {

              // Set the parent node to the tree root
              prtNode = tree;

              // Find the max node's parent and save both
              while (!!prtNode.right.right) {
                prtNode = prtNode.right;
              }
              maxNode = prtNode.right;

              // Remove max node from tree and repair the BST
              prtNode.right = (!maxNode.left) ? null : maxNode.left;
              maxNode.left = null;

              // Add max node to linked list
              listNode.left = maxNode;
              maxNode.right = listNode;
              listNode = maxNode;
            }

            // Add root to linked list
            listNode.left = tree;
            tree.right = listNode;
          };

          // Make the doubly-linked list
          moveLeft();
          moveRight();
        }
        
        // Prepares the results for display
        function setResults() {
          // Set final results
          results.show = '' +
          '<span style="display:block;overflow-x:auto">' +
          '<table class="aIV-exQ3-table">' +
            '<tr>' +
              '<td>' +
                '<u>Unsorted Array</u>' +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding:15px 0 0;">' +
                results.vals +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding:15px 0 20px;">' +
                '<span style="margin:0 15px;">&dArr;</span>' +
                '<span style="margin:0 15px;">&dArr;</span>' +
                '<span style="margin:0 15px;">&dArr;</span>' +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td>' +
                '<u>Binary Search Tree</u>' +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding:15px 0 0;">' +
                results.tree +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding:15px 0 20px;">' +
                '<span style="margin:0 15px;">&dArr;</span>' +
                '<span style="margin:0 15px;">&dArr;</span>' +
                '<span style="margin:0 15px;">&dArr;</span>' +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td>' +
                '<u>Doubly-Linked List</u>' +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td style="padding:15px 0;">' +
                results.list +
              '</td>' +
            '</tr>' +
          '</table>' +
          '</span>';
        }

        // Prepares the final string for the unsorted
        //   array to add to the results
        setResults.vals = function() {
          results.vals = '[&nbsp;&nbsp;' + vals.join(',') + '&nbsp;&nbsp;]';
        };

        // Prepares the final string for the binary
        //   search tree to add to the results
        setResults.tree = function() {
          // A function that creates a matrix of the
          //   rows of nodes
          // A function that creates the final string
          var createMatrix, createString;

          // Creates the matrix of nodes for the BST
          createMatrix = function() {
            // The temporary container for the nodes waiting
            //   to be searched
            // The current node being searched
            // The left child
            // The right child
            var row, node, left, right;

            // Set tree results and row properties
            results.tree = [ [tree] ];
            row = {
              now  : [tree],
              next : [],
              isRow: true
            };

            // Loop through BST
            loop:
            while (true) {

              // Set and remove node
              node = row.now.shift();

              // If (node not null)
              // Then {check children}
              left = ( (!node) ?
                null : ( (!node.left) ?
                  null : node.left
                )
              );
              right = ( (!node) ?
                null : ( (!node.right) ?
                  null : node.right
                )
              );
              // Add children to next row
              row.next.push(left, right);
              // If (child exists)
              // Then {remove next row flag}
              row.isRow = row.isRow || (!!left || !!right);

              // If (current row finished)
              // Then {check and set next}
              if (row.now.length === 0) {
                if (row.isRow) {
                  row.now = row.next.slice(0);
                  row.next = [];
                  results.tree.push( row.now.slice(0) );
                  row.isRow = false;
                }
                else {
                  break loop;
                }
              }
            }
          }

          // Creates the final string for the BST
          createString = function() {
            // The final string
            // The number of BST rows
            // The number of BST columns
            // The number of dashes from the root
            // The number of rows more than 3
            // The loop index for rows over three
            // The loop index for the rows
            // The current row
            var string, rows, columns, dashes, over, o, r, row;
            // The number of cells from the edge
            //   to the first node
            // The number of cells between children
            // The number of cells between each branch
            // The index of the last dash
            // The loop index for dashes
            // The number of nodes in the row
            // The last node in row
            // The loop index for the nodes
            // The width of each cell
            var side, gap, mGap, lastD, d, nodes, last, n, width;

            // Set the count of tree items
            rows = results.tree.length;
            dashes = ( (rows < 2) ?
              0 : ( (rows === 2) ?
                1 : 2
              )
            );
            if (rows > 3) {
              over = rows - 3;
              for (o=0; o<over; o++) {
                dashes = (dashes * 2) + 1;
              }
            }
            columns = (rows < 2) ? 1 : (dashes * 4) + 3;
            // Set the last row
            last = rows - 1;
            // Set each cells width
            width = 30;
            // Set the final string
            string = '<table class="aIV-exQ3-table" style="width:' +
            (width * columns) + 'px;margin:0 auto;">';

            // Add table cells for the BST
            for (r=0; r<rows; r++) {

              // Set row, count of nodes in row, and
              //   the index of the last node
              row = results.tree[r];
              nodes = row.length;
              last = nodes - 1;

              // Set the number of empty cells to be
              //   added to the side, the index of
              //   the middle dash, and the gap of
              //   cells between children
              side = ( (r === 0) ?
                Math.floor(columns / 2) : ( (dashes > 1) ?
                  dashes : 0
                )
              );
              gap = (dashes * 2) + 1;
              lastD = (r === 0) ? 0 : dashes - 1;

              // If (not the root row)
              // Then {add a row of dashes to the string}
              if (r > 0) {

                // Open the row
                string += '<tr>' + '<td colspan="' + (side + 1) + '" ' +
                'style="width:' + ( (side + 1) * width) + 'px">&nbsp;</td>';

                // Loop through row nodes
                for (n=0; n<nodes; n++) {

                  // Add dashes for left child
                  if (!!row[n]) {
                    for (d=0; d<dashes; d++) {
                      string += '' +
                      '<td style="width:' + width + 'px">' +
                        '<span class="lineContainer">' +
                          '<span class="lineFiller">&sol;</span>' +
                          ( (d === 0) ?
                            '<span class="leftLine"></span>' :
                            '<span class="topLine"></span>'
                          ) +
                        '</span>' +
                      '</td>';
                    }
                  }
                  else {
                    string += '<td colspan="' + dashes + '" ' +
                    'style="width:' + (dashes * width) + 'px">&nbsp;</td>';
                  }

                  // Add blank cell for parent
                  string += '<td style="width:' + width + 'px">&nbsp;</td>';

                  // Move to the right child
                  ++n;
                  // Add dashes for right child
                  if (!!row[n]) {
                    for (d=0; d<dashes; d++) {
                      string += '' +
                      '<td style="width:' + width + 'px">' +
                        '<span class="lineContainer">' +
                          '<span class="lineFiller">&bsol;</span>' +
                          ( (d === lastD) ?
                            '<span class="rightLine"></span>' :
                            '<span class="topLine"></span>'
                          ) +
                        '</span>' +
                      '</td>';
                    }
                  }
                  else {
                    string += '<td colspan="' + dashes + '" ' +
                    'style="width:' + (dashes * width) + 'px">&nbsp;</td>';
                  }

                  // If (not the last node in row)
                  // Then {add blank space for children and parent's parent}
                  if (n !== last) {
                    string += '<td colspan="' + (mGap + 2) + '" ' +
                    'style="width:' + ((mGap + 2) * width) + 'px">&nbsp;</td>';
                  }
                }

                // Close the row
                string += '<td colspan="' + (side + 1) + '" style="width:' +
                ( (side + 1) * width) + 'px">&nbsp;</td>' + '</tr>';
              }

              // Add a row of nodes to the string
              string += '<tr>' +
              ( (side > 0) ?
                '<td colspan="' + side + '" style="width:' +
                (side * width) + 'px">&nbsp;</td>' : ''
              );

              // If (root)
              // Then {add root node}
              // Else {loop through row nodes}
              if (r === 0) {
                string += '' +
                '<td style="width:' + width + 'px">' +
                  row[0].val +
                '</td>';
              }
              else {
                for (n=0; n<nodes; n++) {

                  // Add left child
                  string += '' +
                  '<td style="width:' + width + 'px">' +
                    ( (!!row[n]) ? row[n].val : '&nbsp;' ) +
                  '</td>';

                  // Add gap cell
                  string += '<td colspan="' + gap + '" style="width:' +
                  (gap * width) + 'px">&nbsp;</td>';

                  // Move to the right child
                  ++n;
                  // Add right child
                  string += '' +
                  '<td style="width:' + width + 'px">' +
                    ( (!!row[n]) ? row[n].val : '&nbsp;' ) +
                  '</td>';

                  // If (not the last node in row)
                  // Then {add blank space for the parent's parent}
                  if (n !== last) {
                    string += '<td colspan="' + mGap + '" style="width:' +
                    (mGap * width) + 'px">&nbsp;</td>';
                  }
                }
              }

              // Close the row
              string += '' +
              ( (side > 0) ?
                '<td colspan="' + side + '" style="width:' +
                (side * width) + 'px">&nbsp;</td>' : ''
              ) + '</tr>';
              
              // Recalculate the mid gap and dashes
              mGap = dashes;
              dashes = ( (r === 0) ?
                dashes : ( (dashes > 2) ?
                  Math.floor(dashes / 2) : 1
                )
              );
              mGap = ( (r === 0) ?
                0 : ( (mGap > 2) ?
                  mGap : 1
                )
              );
            }
            
            // Save results string
            results.tree = string + '</table>';
          }

          // Make the string
          createMatrix();
          createString();
        };

        // Prepares the final string for the
        //   doubly-linked list to add to
        //   the results
        setResults.list = function() {
          // The current node
          var node;

          // Set list results to empty
          results.list = '';
          // Set node to list start
          node = list.right;

          // Add each node value and arrows
          loop:
          while (true) {
            results.list += node.val;
            if (node.right.val === null) {
              break loop;
            }
            results.list += '&nbsp;&nbsp;&lrarr;&nbsp;&nbsp;';
            node = node.right;
          }
        };

        // Sort the values, create the BST,
        //   convert the BST to a list,
        //   and share the results
        setResults.vals();
        sortValues();
        createTree();
        setResults.tree();
        createList();
        setResults.list();
        setResults();
        return results.show;
      }
    },
    {
      // Question: 7
      complete: false,
        source: 'fb',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=5748231105413120'
                  }
                ],
       problem: 'Given a Tree:<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\<br />&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C<br />&nbsp;&nbsp;/ \\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ \\<br />D&nbsp;&nbsp;E&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;G<br /><br />Write a function that prints:<br />A<br />BC<br />DEFG',
      solution: function() {
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    },
    {
      // Question: 8
      complete: false,
        source: 'go',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=6295449935806464'
                  }
                ],
       problem: 'Represent the following in a data structure:<br />&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;span&gt;TEXT1&lt;/span&gt;&lt;br/&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;<br /><br />Do I do the same using a stack or create a tree for the same?',
      solution: function() {
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    },
    {
      // Question: 9
      complete: false,
        source: 'am',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=5082499984130048'
                  }
                ],
       problem: 'Design a data structure that can do the following operations in O(1) time:<br />Insert, Delete, Search, Max (returns the maximum number)<br /><br />I know delete, search and insert can be done O(1) time in a hashmap with a proper hash function, but not sure Max is even possible in O(1) with the presence of delete operation?',
      solution: function() {
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    },
    {
      // Question: 10
      complete: false,
        source: 'am',
       mainCat: [],
        subCat: [],
         links: [
                  {
                    name: 'Discussion on careercup',
                    href: 'http://www.careercup.com/question?id=6260358392053760'
                  }
                ],
       problem: 'You are given two integer arrays A and B.<br /><br />1&lt;=i&lt;=len(A) so i is iterator of array A<br />1&lt;=j&lt;=len(B) so j is iterator of array B<br /><br />Find all the pairs (i,j) such that : i &lt; j and A[i]&gt;B[j].',
      solution: function() { 
        /*
         ** Solution:
         *  - [explanation]
         *
         ** Need to Know Terms:
         *  - Algorithms:
         *    -- [term]: [link]
         *  - Data Structures:
         *    -- [term]: [link]
         */
      }
    }
  ];

/* ---------------------------- *
 * -- DO NOT EDIT BELOW HERE -- *
 * ---------------------------- */
//sedFlagMinifyInsert
//sedFlagWorkerStart

/**
 * ---------------------------------------------
 * Initialize Algorithm IV (v1.0.1)
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
  newCategories.main = categories.main || {};
  newCategories.sub  = categories.sub  || {};
  // Trigger Algorithm IV
  if (typeof window !== 'undefined') {
    algorithmIV.init(newConfiguration, newCategories, newSources, newQuestions);
  }
}(configuration, categories, sources, questions));

/**
 * ------------------------------------------------------------------
 * Algorithm IV Web Worker (v1.0.1)
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
         olHeight: number,
         liHeight: number
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
          flag   : false,
          content: ''
        },
        source: {
          flag   : false,
          content: ''
        },
        complete: {
          flag   : false,
          content: ''
        },
        category: {
          flag: false,
          main: {
            flag: false,
            h3  : '',
            p   : ''
          },
          sub: {
            flag: false,
            h3  : '',
            p   : ''
          }
        },
        solution: {
          error : false,
          code  : '',
          height: 0
        },
        output: {
          flag   : false,
          content: ''
        },
        links: {
          flag   : false,
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
        height  = code.lineCount * configuration.prettyCode.liHeight;
        height += configuration.prettyCode.olHeight;
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
     * a hash map of keyword categories and keyword
     *  objects and methods containing their
     *  category and properties
     * @const
     * @type {{
        categories: Object,
           objects: Object
       }}
     * @private
     */
    var keywords = {
      categories: {
        // Defining
        'def': 'defKey',
        // Reserved
        'res': 'resKey',
        // Natives
        'nat': 'natKey',
        // Values
        'val': 'valKey',
        // Client
        'cli': 'cliKey',
        // jQuery
        'jqu': 'jquKey'
      },
      objects: {
        '-class'   : { cat: 'def', props: null },
        '-const'   : { cat: 'def', props: null },
        '-function': { cat: 'def', props: null },
        '-var'     : { cat: 'def', props: null },
        '-abstract'    : { cat: 'res', props: null },
        '-arguments'   : { cat: 'res', props: null },
        '-boolean'     : { cat: 'res', props: null },
        '-break'       : { cat: 'res', props: null },
        '-byte'        : { cat: 'res', props: null },
        '-case'        : { cat: 'res', props: null },
        '-catch'       : { cat: 'res', props: null },
        '-char'        : { cat: 'res', props: null },
        '-continue'    : { cat: 'res', props: null },
        '-debugger'    : { cat: 'res', props: null },
        '-default'     : { cat: 'res', props: null },
        '-delete'      : { cat: 'res', props: null },
        '-do'          : { cat: 'res', props: null },
        '-double'      : { cat: 'res', props: null },
        '-else'        : { cat: 'res', props: null },
        '-enum'        : { cat: 'res', props: null },
        '-export'      : { cat: 'res', props: null },
        '-extends'     : { cat: 'res', props: null },
        '-final'       : { cat: 'res', props: null },
        '-finally'     : { cat: 'res', props: null },
        '-float'       : { cat: 'res', props: null },
        '-for'         : { cat: 'res', props: null },
        '-goto'        : { cat: 'res', props: null },
        '-if'          : { cat: 'res', props: null },
        '-implements'  : { cat: 'res', props: null },
        '-import'      : { cat: 'res', props: null },
        '-in'          : { cat: 'res', props: null },
        '-instanceof'  : { cat: 'res', props: null },
        '-int'         : { cat: 'res', props: null },
        '-interface'   : { cat: 'res', props: null },
        '-item'        : { cat: 'res', props: null },
        '-let'         : { cat: 'res', props: null },
        '-long'        : { cat: 'res', props: null },
        '-native'      : { cat: 'res', props: null },
        '-new'         : { cat: 'res', props: null },
        '-package'     : { cat: 'res', props: null },
        '-private'     : { cat: 'res', props: null },
        '-protected'   : { cat: 'res', props: null },
        '-public'      : { cat: 'res', props: null },
        '-return'      : { cat: 'res', props: null },
        '-short'       : { cat: 'res', props: null },
        '-static'      : { cat: 'res', props: null },
        '-super'       : { cat: 'res', props: null },
        '-switch'      : { cat: 'res', props: null },
        '-synchronized': { cat: 'res', props: null },
        '-this'        : { cat: 'res', props: null },
        '-throw'       : { cat: 'res', props: null },
        '-throws'      : { cat: 'res', props: null },
        '-transient'   : { cat: 'res', props: null },
        '-try'         : { cat: 'res', props: null },
        '-typeof'      : { cat: 'res', props: null },
        '-void'        : { cat: 'res', props: null },
        '-volatile'    : { cat: 'res', props: null },
        '-while'       : { cat: 'res', props: null },
        '-with'        : { cat: 'res', props: null },
        '-yield'       : { cat: 'res', props: null },
        '-apply'              : { cat: 'nat', props: null },
        '-Array'              : { cat: 'nat', props: {
          '-from'   : 1,
          '-isArray': 1,
          '-observe': 1,
          '-of'     : 1
        } },
        '-ArrayBuffer'        : { cat: 'nat', props: {
          '-isView'  : 1,
          '-transfer': 1
        } },
        '-bind'               : { cat: 'nat', props: null },
        '-Boolean'            : { cat: 'nat', props: null },
        '-call'               : { cat: 'nat', props: null },
        '-charAt'             : { cat: 'nat', props: null },
        '-charCodeAt'         : { cat: 'nat', props: null },
        '-clearInterval'      : { cat: 'nat', props: null },
        '-clearTimeout'       : { cat: 'nat', props: null },
        '-concat'             : { cat: 'nat', props: null },
        '-constructor'        : { cat: 'nat', props: null },
        '-DataView'           : { cat: 'nat', props: null },
        '-Date'               : { cat: 'nat', props: {
          '-UTC'  : 1,
          '-now'  : 1,
          '-parse': 1
        } },
        '-decodeURI'          : { cat: 'nat', props: null },
        '-decodeURIComponent' : { cat: 'nat', props: null },
        '-encodeURI'          : { cat: 'nat', props: null },
        '-encodeURIComponent' : { cat: 'nat', props: null },
        '-Error'              : { cat: 'nat', props: null },
        '-escape'             : { cat: 'nat', props: null },
        '-eval'               : { cat: 'nat', props: null },
        '-EvalError'          : { cat: 'nat', props: null },
        '-fromCharCode'       : { cat: 'nat', props: null },
        '-Function'           : { cat: 'nat', props: null },
        '-Generator'          : { cat: 'nat', props: null },
        '-GeneratorFunction'  : { cat: 'nat', props: null },
        '-getDate'            : { cat: 'nat', props: null },
        '-getDay'             : { cat: 'nat', props: null },
        '-getFullYear'        : { cat: 'nat', props: null },
        '-getHours'           : { cat: 'nat', props: null },
        '-getMilliseconds'    : { cat: 'nat', props: null },
        '-getMinutes'         : { cat: 'nat', props: null },
        '-getMonth'           : { cat: 'nat', props: null },
        '-getSeconds'         : { cat: 'nat', props: null },
        '-getTime'            : { cat: 'nat', props: null },
        '-getTimezoneOffset'  : { cat: 'nat', props: null },
        '-getUTCDate'         : { cat: 'nat', props: null },
        '-getUTCDay'          : { cat: 'nat', props: null },
        '-getUTCFullYear'     : { cat: 'nat', props: null },
        '-getUTCHours'        : { cat: 'nat', props: null },
        '-getUTCMilliseconds' : { cat: 'nat', props: null },
        '-getUTCMinutes'      : { cat: 'nat', props: null },
        '-getUTCMonth'        : { cat: 'nat', props: null },
        '-getUTCSeconds'      : { cat: 'nat', props: null },
        '-getYear'            : { cat: 'nat', props: null },
        '-hasOwnProperty'     : { cat: 'nat', props: null },
        '-indexOf'            : { cat: 'nat', props: null },
        '-isFinite'           : { cat: 'nat', props: null },
        '-isNaN'              : { cat: 'nat', props: null },
        '-isPrototypeOf'      : { cat: 'nat', props: null },
        '-join'               : { cat: 'nat', props: null },
        '-JSON'               : { cat: 'nat', props: {
          '-parse'    : 1,
          '-stringify': 1
        } },
        '-lastIndexOf'        : { cat: 'nat', props: null },
        '-length'             : { cat: 'nat', props: null },
        '-match'              : { cat: 'nat', props: null },
        '-Math'               : { cat: 'nat', props: {
          '-abs'   : 1,
          '-acos'  : 1,
          '-asin'  : 1,
          '-atan'  : 1,
          '-atan2' : 1,
          '-ceil'  : 1,
          '-cos'   : 1,
          '-exp'   : 1,
          '-floor' : 1,
          '-log'   : 1,
          '-max'   : 1,
          '-min'   : 1,
          '-pow'   : 1,
          '-random': 1,
          '-round' : 1,
          '-sin'   : 1,
          '-sqrt'  : 1,
          '-tan'   : 1
        } },
        '-Number'             : { cat: 'nat', props: {
          '-EPSILON'           : 1,
          '-isNaN'             : 1,
          '-isFinite'          : 1,
          '-isInteger'         : 1,
          '-isSafeInteger'     : 1,
          '-MAX_SAFE_INTEGER'  : 1,
          '-MAX_VALUE'         : 1,
          '-MIN_SAFE_INTEGER'  : 1,
          '-MIN_VALUE'         : 1,
          '-NaN'               : 1,
          '-NEGATIVE_INFINITY' : 1,
          '-parseFloat'        : 1,
          '-parseInt'          : 1,
          '-POSITIVE_INFINITY' : 1
        } },
        '-Object'             : { cat: 'nat', props: {
          '-assign'                  : 1,
          '-create'                  : 1,
          '-defineProperty'          : 1,
          '-defineProperties'        : 1,
          '-freeze'                  : 1,
          '-getOwnPropertyDescriptor': 1,
          '-getOwnPropertyNames'     : 1,
          '-getOwnPropertySymbols'   : 1,
          '-getPrototypeOf'          : 1,
          '-is'                      : 1,
          '-isExtensible'            : 1,
          '-isFrozen'                : 1,
          '-isSealed'                : 1,
          '-keys'                    : 1,
          '-observe'                 : 1,
          '-preventExtensions'       : 1,
          '-seal'                    : 1,
          '-setPrototypeOf'          : 1
        } },
        '-parse'              : { cat: 'nat', props: null },
        '-parseFloat'         : { cat: 'nat', props: null },
        '-parseInt'           : { cat: 'nat', props: null },
        '-pop'                : { cat: 'nat', props: null },
        '-preference'         : { cat: 'nat', props: null },
        '-print'              : { cat: 'nat', props: null },
        '-prototype'          : { cat: 'nat', props: null },
        '-push'               : { cat: 'nat', props: null },
        '-RegExp'             : { cat: 'nat', props: null },
        '-replace'            : { cat: 'nat', props: null },
        '-reset'              : { cat: 'nat', props: null },
        '-resizeBy'           : { cat: 'nat', props: null },
        '-resizeTo'           : { cat: 'nat', props: null },
        '-reverse'            : { cat: 'nat', props: null },
        '-search'             : { cat: 'nat', props: null },
        '-setDate'            : { cat: 'nat', props: null },
        '-setFullYear'        : { cat: 'nat', props: null },
        '-setHours'           : { cat: 'nat', props: null },
        '-setMilliseconds'    : { cat: 'nat', props: null },
        '-setInterval'        : { cat: 'nat', props: null },
        '-setMinutes'         : { cat: 'nat', props: null },
        '-setMonth'           : { cat: 'nat', props: null },
        '-setSeconds'         : { cat: 'nat', props: null },
        '-setTime'            : { cat: 'nat', props: null },
        '-setTimeout'         : { cat: 'nat', props: null },
        '-setUTCDate'         : { cat: 'nat', props: null },
        '-setUTCFullYear'     : { cat: 'nat', props: null },
        '-setUTCHours'        : { cat: 'nat', props: null },
        '-setUTCMilliseconds' : { cat: 'nat', props: null },
        '-setUTCMinutes'      : { cat: 'nat', props: null },
        '-setUTCMonth'        : { cat: 'nat', props: null },
        '-setUTCSeconds'      : { cat: 'nat', props: null },
        '-setYear'            : { cat: 'nat', props: null },
        '-shift'              : { cat: 'nat', props: null },
        '-slice'              : { cat: 'nat', props: null },
        '-sort'               : { cat: 'nat', props: null },
        '-splice'             : { cat: 'nat', props: null },
        '-split'              : { cat: 'nat', props: null },
        '-String'             : { cat: 'nat', props: {
          '-fromCharCode' : 1,
          '-fromCodePoint': 1,
          '-raw'          : 1
        } },
        '-substr'             : { cat: 'nat', props: null },
        '-substring'          : { cat: 'nat', props: null },
        '-Symbol'             : { cat: 'nat', props: {
          '-for'   : 1,
          '-keyFor': 1
        } },
        '-test'               : { cat: 'nat', props: null },
        '-toGMTString'        : { cat: 'nat', props: null },
        '-toLocaleString'     : { cat: 'nat', props: null },
        '-toLowerCase'        : { cat: 'nat', props: null },
        '-toSource'           : { cat: 'nat', props: null },
        '-toString'           : { cat: 'nat', props: null },
        '-toUpperCase'        : { cat: 'nat', props: null },
        '-toUTCString'        : { cat: 'nat', props: null },
        '-TypedArray'         : { cat: 'nat', props: {
          '-BYTES_PER_ELEMENT': 1,
          '-from'             : 1,
          '-name'             : 1,
          '-of'               : 1
        } },
        '-unescape'           : { cat: 'nat', props: null },
        '-unshift'            : { cat: 'nat', props: null },
        '-unwatch'            : { cat: 'nat', props: null },
        '-UTC'                : { cat: 'nat', props: null },
        '-valueOf'            : { cat: 'nat', props: null },
        '-watch'              : { cat: 'nat', props: null },
        '-write'              : { cat: 'nat', props: null },
        '-writeln'            : { cat: 'nat', props: null },
        '-false'    : { cat: 'val', props: null },
        '-Infinity' : { cat: 'val', props: null },
        '-Nan'      : { cat: 'val', props: null },
        '-null'     : { cat: 'val', props: null },
        '-true'     : { cat: 'val', props: null },
        '-undefined': { cat: 'val', props: null },
        '-alert'                 : { cat: 'cli', props: null },
        '-anchor'                : { cat: 'cli', props: null },
        '-anchors'               : { cat: 'cli', props: null },
        '-appendChild'           : { cat: 'cli', props: null },
        '-area'                  : { cat: 'cli', props: null },
        '-assign'                : { cat: 'cli', props: null },
        '-back'                  : { cat: 'cli', props: null },
        '-big'                   : { cat: 'cli', props: null },
        '-blink'                 : { cat: 'cli', props: null },
        '-blur'                  : { cat: 'cli', props: null },
        '-body'                  : { cat: 'cli', props: null },
        '-bold'                  : { cat: 'cli', props: null },
        '-button'                : { cat: 'cli', props: null },
        '-byteToString'          : { cat: 'cli', props: null },
        '-captureEvents'         : { cat: 'cli', props: null },
        '-checkbox'              : { cat: 'cli', props: null },
        '-className'             : { cat: 'cli', props: null },
        '-click'                 : { cat: 'cli', props: null },
        '-clientHeight'          : { cat: 'cli', props: null },
        '-clientInformation'     : { cat: 'cli', props: null },
        '-clientWidth'           : { cat: 'cli', props: null },
        '-close'                 : { cat: 'cli', props: null },
        '-closed'                : { cat: 'cli', props: null },
        '-confirm'               : { cat: 'cli', props: null },
        '-console'               : { cat: 'cli', props: {
          '-assert'        : 1,
          '-group'         : 1,
          '-groupCollapsed': 1,
          '-groupEnd'      : 1,
          '-log'           : 1,
          '-trace'         : 1
        } },
        '-createElement'         : { cat: 'cli', props: null },
        '-crypto'                : { cat: 'cli', props: null },
        '-defaultStatus'         : { cat: 'cli', props: null },
        '-disableExternalCapture': { cat: 'cli', props: null },
        '-document'              : { cat: 'cli', props: null },
        '-element'               : { cat: 'cli', props: null },
        '-elements'              : { cat: 'cli', props: null },
        '-embed'                 : { cat: 'cli', props: null },
        '-embeds'                : { cat: 'cli', props: null },
        '-enableExternalCapture' : { cat: 'cli', props: null },
        '-event'                 : { cat: 'cli', props: null },
        '-fileUpload'            : { cat: 'cli', props: null },
        '-find'                  : { cat: 'cli', props: null },
        '-fixed'                 : { cat: 'cli', props: null },
        '-focus'                 : { cat: 'cli', props: null },
        '-fontcolor'             : { cat: 'cli', props: null },
        '-fontsize'              : { cat: 'cli', props: null },
        '-form'                  : { cat: 'cli', props: null },
        '-forms'                 : { cat: 'cli', props: null },
        '-forward'               : { cat: 'cli', props: null },
        '-frame'                 : { cat: 'cli', props: null },
        '-frames'                : { cat: 'cli', props: null },
        '-frameRate'             : { cat: 'cli', props: null },
        '-getComputedStyle'      : { cat: 'cli', props: null },
        '-getElementById'        : { cat: 'cli', props: null },
        '-getElementsByClassName': { cat: 'cli', props: null },
        '-getElementsByTagName'  : { cat: 'cli', props: null },
        '-getOptionValueCount'   : { cat: 'cli', props: null },
        '-getOptionValue'        : { cat: 'cli', props: null },
        '-getPropertyValue'      : { cat: 'cli', props: null },
        '-getSelection'          : { cat: 'cli', props: null },
        '-go'                    : { cat: 'cli', props: null },
        '-handleEvent'           : { cat: 'cli', props: null },
        '-hidden'                : { cat: 'cli', props: null },
        '-history'               : { cat: 'cli', props: null },
        '-home'                  : { cat: 'cli', props: null },
        '-id'                    : { cat: 'cli', props: null },
        '-image'                 : { cat: 'cli', props: null },
        '-ImageData'             : { cat: 'cli', props: {
          '-data'  : 1,
          '-height': 1,
          '-width' : 1
        } },
        '-images'                : { cat: 'cli', props: null },
        '-innerHeight'           : { cat: 'cli', props: null },
        '-innerHTML'             : { cat: 'cli', props: null },
        '-innerWidth'            : { cat: 'cli', props: null },
        '-italics'               : { cat: 'cli', props: null },
        '-javaEnabled'           : { cat: 'cli', props: null },
        '-layer'                 : { cat: 'cli', props: null },
        '-layers'                : { cat: 'cli', props: null },
        '-link'                  : { cat: 'cli', props: null },
        '-location'              : { cat: 'cli', props: null },
        '-mimeTypes'             : { cat: 'cli', props: null },
        '-moveAbove'             : { cat: 'cli', props: null },
        '-moveBelow'             : { cat: 'cli', props: null },
        '-moveBy'                : { cat: 'cli', props: null },
        '-moveTo'                : { cat: 'cli', props: null },
        '-moveToAbsolute'        : { cat: 'cli', props: null },
        '-navigate'              : { cat: 'cli', props: null },
        '-navigator'             : { cat: 'cli', props: null },
        '-offscreenBuffering'    : { cat: 'cli', props: null },
        '-offsetHeight'          : { cat: 'cli', props: null },
        '-offsetWidth'           : { cat: 'cli', props: null },
        '-open'                  : { cat: 'cli', props: null },
        '-opener'                : { cat: 'cli', props: null },
        '-options'               : { cat: 'cli', props: null },
        '-outerHeight'           : { cat: 'cli', props: null },
        '-outerWidth'            : { cat: 'cli', props: null },
        '-packages'              : { cat: 'cli', props: null },
        '-pageXOffset'           : { cat: 'cli', props: null },
        '-pageYOffset'           : { cat: 'cli', props: null },
        '-parent'                : { cat: 'cli', props: null },
        '-password'              : { cat: 'cli', props: null },
        '-pkcs11'                : { cat: 'cli', props: null },
        '-plugins'               : { cat: 'cli', props: null },
        '-prompt'                : { cat: 'cli', props: null },
        '-propertyIsEnum'        : { cat: 'cli', props: null },
        '-radio'                 : { cat: 'cli', props: null },
        '-refresh'               : { cat: 'cli', props: null },
        '-releaseEvents'         : { cat: 'cli', props: null },
        '-reload'                : { cat: 'cli', props: null },
        '-removeChild'           : { cat: 'cli', props: null },
        '-routeEvent'            : { cat: 'cli', props: null },
        '-screen'                : { cat: 'cli', props: null },
        '-screenX'               : { cat: 'cli', props: null },
        '-screenY'               : { cat: 'cli', props: null },
        '-scroll'                : { cat: 'cli', props: null },
        '-scrollBy'              : { cat: 'cli', props: null },
        '-scrollTo'              : { cat: 'cli', props: null },
        '-secure'                : { cat: 'cli', props: null },
        '-select'                : { cat: 'cli', props: null },
        '-self'                  : { cat: 'cli', props: null },
        '-small'                 : { cat: 'cli', props: null },
        '-status'                : { cat: 'cli', props: null },
        '-stop'                  : { cat: 'cli', props: null },
        '-strike'                : { cat: 'cli', props: null },
        '-style'                 : { cat: 'cli', props: null },
        '-submit'                : { cat: 'cli', props: null },
        '-sup'                   : { cat: 'cli', props: null },
        '-taint'                 : { cat: 'cli', props: null },
        '-taintEnabled'          : { cat: 'cli', props: null },
        '-text'                  : { cat: 'cli', props: null },
        '-textContent'           : { cat: 'cli', props: null },
        '-textarea'              : { cat: 'cli', props: null },
        '-top'                   : { cat: 'cli', props: null },
        '-untaint'               : { cat: 'cli', props: null },
        '-window'                : { cat: 'cli', props: null },
        '-$'     : { cat: 'jqu', props: null },
        '-jQuery': { cat: 'jqu', props: null }
      }
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
          var preceding;
          switch (line[i + 1]) {
            case '/': return formatLineComment(i); break;
            case '*': return formatCommentOpen(i); break;
            default :
              // Save preceding character
              // If (index is line start)
              // Then {set preceding to force regex= true}
              preceding = ( (i === 0) ?
                '(' : (line[i - 1] === ' ') ?
                  line[i - 2] : line[i - 1]
              );
              // If (regex statement)
              // Then {set to regex statement}
              // Else {set to division operator}
              if (likelyRegex.indexOf(preceding) !== -1) {
               return formatRegex(i);
              }
              return formatOperator(i);
            /* ---------------------------------------------------------- *
             * EXISTING BUG (Identifying a RegEx)
             * ---------------------------------------------------------- *
             * Issue 1: identifying the preceding binary operators 'in'
             *          and 'instanceof'                                  *
             * Issue 2: one line if statements (e.g. if (i) /foo/.exec()) *
             * Issue 3: the use of the preceding unary operators '++'
             *          and '--' (e.g. i++ / x)                           *
             * ---------------------------------------------------------- */
          }
        }
      };

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
          if (i === (len - 1)) {
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
        // Add comment span
        newLine[i] = '<span class="cmt">/';
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
        newLine[i] = '<span class="cmt">/';
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
       * @type {function(number): number}
       * @private
       */
      function formatRegex(i) {
        var u;
        // Add regex span
        newLine[i] = '<span class="rgx">/';
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
        // Add bracket spans
        newLine[i] = '<span class="brc">'+ line[i] +'</span>';
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
        '<span class="opr">' +
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
        // Add misc spans
        newLine[i] = '<span class="msc">' + line[i] + '</span>';
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