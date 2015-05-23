  /**
   * -----------------------------------------------
   * The Questions
   * -----------------------------------------------
   * @desc An array property of settings that allows you to add your
   *   questions to the app. Each example question is taken from
   *   Algorithm IV's library of questions and solutions.
   * @type {!Array<!Object>}
   */
  settings.questions = new Array(10);

  /**
   * -----------------------------------------------
   * The Question Object
   * -----------------------------------------------
   * @desc The properties for a question object.
   * @typedef {!{
   *   complete: boolean,
   *   source  : string,
   *   mainCat : Array<string>,
   *   subCat  : Array<string>,
   *   links   : Array<{ name: string, href: string }>,
   *   problem : string,
   *   descr   : string,
   *   solution: function
   * }} Question
   */

  /**
   * -----------------------------------------------
   * Question 1
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[0] = {
    complete: true,
    source  : 'fb',
    mainCat : [ 'search', 'tree', 'list', 'array' ],
    subCat  : [ 'bfs', 'binTree', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution1
  };

  settings.questions[0].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=4505011482525696'
  };

  settings.questions[0].problem = '' +
  'Given an array of values, create a balanced binary tree and print each ' +
  'row of the tree in order. Terminate each row with a carriage return.';

  function solution1() {
    /*
     ** Solution:
     *  - Step 1: A Breadth First Search algorithm is used
     *    to create a balanced binary tree. A linked list
     *    of nodes containing their value and references
     *    to their left and right children is used to
     *    represent the binary tree.
     *  - Step 2: A Breadth First Search algorithm is used
     *    to traverse the tree and add the nodes in order
     *    by row to the result.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Breadth First Search (BFS)](http://en.wikipedia.org/wiki/Breadth-first_search)
     *  - Data Structures:
     *    -- [Binary Tree](http://en.wikipedia.org/wiki/Binary_tree)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The given values
    // The binary tree
    // The node rows to be printed
    var vals, tree, result;

    // Set variables
    vals = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O' ];
    tree = {
      val  : vals[0],
      left : null,
      right: null
    };
    result = '';

    // Creates the binary tree
    function createTree() {
      // A function that adds children to a node
      // The temporary holder for each row of nodes
      // The index of the current value
      // The current tree's depth
      // The tree's max depth
      // The current node
      var addNodes, row, val, d, depth, node;

      // Adds children to the provided node
      // param: The node to add the children
      addNodes = function(prtNode) {

        // Create the nodes and increase the value
        prtNode.left = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;
        prtNode.right = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;

        // Add the nodes to temp holder
        row.next.push(prtNode.left, prtNode.right);
      };

      // Set the temp holders, value, and max depth
      row = {
        now : [tree],
        next: []
      };
      val = 1;
      depth = 4;

      // Add the nodes to tree
      d = 0;
      while (++d < depth) {
        // Add nodes
        row.now.forEach(function(node) {
          addNodes(node);
        });
        // Reset temp arrays
        row.now = row.next.slice(0);
        row.next = [];
      }
    }

    // Saves a string of the binary tree's nodes
    //   in order with a line break for each row
    function printNodes() {
      // The current and next row of nodes
      // The current node being searched
      // The left child
      // The right child
      var row, node, left, right;

      // Set final result
      result = tree.val;

      // Set temp holder for each row
      row = {
          now   : [tree],
          next  : [],
          string: ''
        };

      // Loop through nodes
      loop:
      while (true) {

        // Set and remove node
        node = row.now.shift();

        // If (child exists)
        // Then {add child to next row and result}
        if (!!node.left) {
          row.next.push(node.left);
          row.string += (row.next.length > 1) ? ',' : '';
          row.string += node.left.val;
        }
        if (!!node.right) {
          row.next.push(node.right);
          row.string += (row.next.length > 1) ? ',' : '';
          row.string += node.right.val;
        }

        // If (current row finished)
        // Then {check, update, and reset rows}
        // Else {end search}
        if (row.now.length === 0) {
          if (row.next.length > 0) {
            result += '<br />' + row.string;
            row.now = row.next.slice(0);
            row.next = [];
            row.string = '';
          }
          else {
            break loop;
          }
        }
      }
    }

    // Create tree and print nodes
    createTree();
    printNodes();
    return result;
  }

  /**
   * -----------------------------------------------
   * Question 2
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[1] = {
    complete: true,
    source  : 'am',
    mainCat : [ 'search', 'graph', 'list', 'array' ],
    subCat  : [ 'back', 'dynam', 'dfs', 'digraph', 'incList', 'sList', 'dList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution2
  };

  settings.questions[1].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6031402409656320'
  };

  settings.questions[1].problem = '' +
  'Imagine a large city like Los Angeles. Suppose someone shows up at ' +
  'location A, then N minutes later at location B. Design a function '  +
  'that approximates the probability they passed a Starbucks.';

  function solution2() {
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
     *    -- [Backtracking](http://en.wikipedia.org/wiki/Backtracking)
     *    -- [Dynamic Programming](http://en.wikipedia.org/wiki/Dynamic_programming)
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- [Directed Graph (Digraph)](http://en.wikipedia.org/wiki/Directed_graph)
     *    -- [Weighted Graph](http://en.wikipedia.org/wiki/Glossary_of_graph_theory#Weighted_graphs_and_networks)
     *    -- [Incidence List](http://www.algorithmist.com/index.php/Graph_data_structures#Incidence_List)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Doubly-Linked List](http://en.wikipedia.org/wiki/Doubly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
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
      verti: new Array(10),
      edges: new Array(16)
    };
    start =  0;
    end   =  9;
    max   = 50;
    paths = {
      list  : [],
      starbk: 0
    };
    prob  = 0;
    results = {
      count: {
        all   : '',
        starbk: ''
      },
      prob : '',
      paths: {
        all   : '',
        starbk: ''
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
      var v, e, prt, child, weight, starbk;
      // The parent index
      // The child index
      // A function that adds edge
      //   pointers to vertices
      var p, c, addPointer;
      
      // Adds a vertex's edge references
      // param: The vertex's index
      // param: An array of edge indexes
      addPointer = function(vertex, edges) {
        // The number of edges
        // The loop index
        // The edge node
        var len, i, node;
        
        // Save edges count
        len = edges.length;
        // Add each edge
        i = -1;
        while (++i < len) {
          node = graph.edges[ edges[i] ];
          graph.verti[vertex].edges.push(node);
        }
      };

      // Add vertices to graph
      v = 10;
      while (v--) {
        graph.verti[v] = { val: v, edges: [] };
      }

      // Add edges to graph
      e = -1;
      while (++e < 16) {

        // Set weight and starbucks
        weight = 5;
        starbk = (e === 5);
        // Set parent and child
        switch (true) {
           case (e < 3):
             p = 0;
             c = (e === 0) ? 1 : ++c;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 5):
             p = 1;
             c = e;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 7):
             p = 2;
             c = e;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e === 7):
             p = 3;
             c = 6;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e === 8):
             p = 4;
             c = 6;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 12):
             p = 5;
             c = ++c;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e < 14):
             p = 6;
             c = (e === 12) ? 7 : 9;
             prt = graph.verti[p];
             child = graph.verti[c];
           break;
           case (e === 14):
             p = 7;
             c = 8;
             prt = graph.verti[p];
            child = graph.verti[c];
          break;
          case (e === 15):
            p = 8;
            c = 9;
            prt = graph.verti[p];
            child = graph.verti[c];
          break;
        }
        // Add edge
        graph.edges[e] = {
          prt   : prt,
          child : child,
          weight: weight,
          starbk: starbk
        };
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
      buildPaths = function(node, weight, starbk) {
        // The string for the current path
        // The count of the node's edges
        // The edges index
        // The current edge's node
        // The new total path weight
        // The new starbucks value
        var edges, e, edge, newWeight, newStarbk;

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
            val   : path.string,
            starbk: starbk
          });
          // Adjust count of Starbucks paths
          paths.starbk += (starbk) ? 1 : 0;

          // End this path traversal
          return;
        }

        // Add node to current path
        path.nodes.push(node);
        path.values.push(node.val);

        // Save the node's count of edges
        edges = node.edges.length;
        // Traverse each path rooting with each edge
        e = -1;
        while (++e < edges) {
          // Save reference of edge's object
          edge = node.edges[e];
          // Set new weight total
          newWeight = weight + edge.weight;
          // Set new value for starbucks
          newStarbk = (starbk || edge.starbk);
          // Continue search
          buildPaths(edge.child, newWeight, newStarbk);
        }

        // Remove current node from path
        path.nodes.pop();
        path.values.pop();
      };

      // Set path to empty
      path = {
        nodes : [],
        values: [],
        string: ''
      };

      // Find the paths
      buildPaths(graph.verti[start], 0, false);
    }

    // Calculates the probability of passing a Starbucks
    function calcProbability() {
      // Divide the number of paths with starbucks
      //   by the number of all paths and round up
      //   to the nearest whole percent
      prob = (paths.starbk / paths.list.length) * 100;
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
      results.count.starbk = 'Count of All Paths with Starbucks: ';
      results.count.starbk += paths.starbk + '<br />';

      // Set probability result
      results.prob = 'Probability of Passing Starbucks: ' + prob + '%<br />';

      // Set path result headers
      results.paths.all = 'List of All Paths:';
      results.paths.starbk = 'List of All Paths with Starbucks:';
      // Set path result containers
      results.paths.all += '<span style="display:block;margin-left:30px">';
      results.paths.starbk += '<span style="display:block;margin-left:30px">';
      // Set first Starbucks flag
      flag = true;
      // Set path results
      i = -1;
      while (++i < len) {
        results.paths.all += (i > 0) ? '<br />' : '';
        results.paths.all += paths.list[i].val;
        if (paths.list[i].starbk) {
          // If (first path with Starbucks)
          // Then {change flag}
          // Else {add line break}
          if (flag) {
            flag = false;
          }
          else {
            results.paths.starbk += '<br />';
          }
          results.paths.starbk += paths.list[i].val;
        }
      }
      // Close path result containers
      results.paths.all += '</span>';
      results.paths.starbk += '</span>';
    }

    // Create digraph, find paths,
    //   calculate probability, and
    //   return the prepared results
    createGraph();
    findPaths();
    calcProbability();
    prepareResults();
    return results.count.all + results.count.starbk +
    results.prob + results.paths.all + results.paths.starbk;
  }

  /**
   * -----------------------------------------------
   * Question 3
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[2] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'hash', 'search' ],
    subCat  : [ 'hTable', 'dblHash', 'fnv', 'brute' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution3
  };

  settings.questions[2].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5724911848914944'
  };

  settings.questions[2].problem = '' +
  'Given a table of [Url =&gt; Content] pairs produce a new table of ' +
  '[Url =&gt; Duplicate Urls] pairs.<br /><br />' +
  'Example Input:<br />' +
  'a.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br />' +
  'b.com =&gt; &lt;html&gt;beta&lt;/html&gt;<br />' +
  'c.com =&gt; &lt;html&gt;gamma&lt;/html&gt;<br />' +
  'd.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br />' +
  'e.com =&gt; &lt;html&gt;alpha&lt;/html&gt;<br /><br />' +
  'Example Output:<br />' +
  'a.com =&gt; [ d.com, e.com ]<br />' +
  'b.com =&gt; []<br />' +
  'c.com =&gt; []';

  function solution3() {
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
     *    -- [FNV Hash Algorithm](http://www.isthe.com/chongo/tech/comp/fnv/)
     *    -- [Double Hashing](http://en.wikipedia.org/wiki/Double_hashing)
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *  - Data Structures:
     *    -- [Hash Table](http://en.wikipedia.org/wiki/Hash_table)
     */
        
    // The supplied urls and their page's content
    // The hash table of all page's content
    // The list of urls and their duplicated content
    // The visually prepared duplicate results
    var inputs, hashes, duplicates, results;

    // Set variables
    inputs = {
      // 'url': 'content'
      /// CONVERTED TO
      // 'url': 'hashOfContent'
    };
    hashes = {
      // 'hashOfContent': {
      //   collisions: number,
      //   content   : 'content'
      // }
    };
    duplicates = {
      // 'url': [ 'duplicateUrl', ...]
    };
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
    // param: A previous hash that collided (optional)
    // param: Extra iterations to resolve a collision (optional)
    function createHash(string, hash, extras) {
      // The FNV offset basis for the hash
      // The loop length (extras or string length)
      // The loop index
      var offset, len, i;

      // Set offset to the 32 bit FNV offset_value
      offset = 0x811c9dc5;
      hash = hash || offset;

      // Set loop length
      len = (!extras) ? string.length : extras;
      // Complete fnv hashing (xor and prime multiplication)
      i = -1;
      while (++i < len) {
        hash ^= string.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) +
        (hash << 7) + (hash << 8) + (hash << 24);
      }

      // Zero-fill shift hash
      hash = hash >>> 0;

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

  /**
   * -----------------------------------------------
   * Question 4
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[3] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'search', 'tree', 'graph', 'hash', 'list', 'array' ],
    subCat  : [ 'brute', 'back', 'dfs', 'trie', 'arb', 'digraph', 'adjList', 'hTable', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution4
  };

  settings.questions[3].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6270813198090240'
  };

  settings.questions[3].problem = '' +
  'You are given a string of four lower case characters and a dictionary of ' +
  'english words. Choose a data structure to represent the dictionary and ' +
  'write an algorithm that returns all the words from the dictionary that ' +
  'can be formed by the characters of the string.<br />' +
  'Example:<br />' +
  'string = \'ogeg\'<br />' +
  'words = [ \'egg\',\'ego\', ... ]';

  function solution4() {
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
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *    -- [Backtracking](http://en.wikipedia.org/wiki/Backtracking)
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- [Trie](http://www.geeksforgeeks.org/trie-insert-and-search/)
     *    -- Arborescence: http://en.wikipedia.org/wiki/Arborescence_(graph_theory)
     *    -- [Directed Graph (Digraph)](http://en.wikipedia.org/wiki/Directed_graph)
     *    -- [Adjacency List](http://en.wikipedia.org/wiki/Adjacency_list)
     *    -- [Hash Table](http://en.wikipedia.org/wiki/Hash_table)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     *
     ** Copyright Notice:
     *  - The list of English words used to create the test data
     *    for this question was derived from the EOWL and UKACD.
     *  - See [aIV JSON resource](github.com/imaginate/algorithmIV-question-manager/blob/master/example/resources/words.json)
     *  - See [EOWL](http://dreamsteep.com/projects/the-english-open-word-list.html)
     *  - Copyright (c) J Ross Beresford 1993-1999. All Rights Reserved.
     *  - See [Copyright Details](http://cfajohnson.com/wordfinder/UKACD17.shtml)
     */

    /**
     * A hash map of letter to English words.
     * @type {Object<string, Array<string>>}
     * @example
     * var words = { 'letter': [ 'word', ... ], ... };
     */
    var words;
    // An array of all the string's letters and an
    //   indicator of how many duplicates exist
    // A trie of words with a max length of 4
    //   characters and starting with each of
    //   the string's characters
    // The input string
    // The arborescence of the string's characters
    // The resulting possible words from the string
    var letters, wordTrie, string, graph, results;

    // Setup variables
    words = Object.freeze( aIV.app.getResource('words') );
    letters = {
      list: [],
      dupl: 0
    };
    wordTrie = {
      // 'current word part': {
      //   isWord: true||false,
      //   value : 'current word part',
      //   kids  : [ reference to child in hash map, ...]
      // }
    };
    string = 'ogeg';
    graph  = {
      val : '',
      kids: []
    };
    results = [];

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
        value : letter,
        kids  : []
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

    // Create a trie of the words, create an arborescence of the input string
    //   characters, find the possible words, and return the results
    setLetters();
    createWordTrie();
    createGraph();
    findWords();
    return '[ ' + results.sort().join(',') + ' ]';
  }

  /**
   * -----------------------------------------------
   * Question 5
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[4] = {
    complete: true,
    source  : 'bl',
    mainCat : [ 'search', 'graph', 'hash', 'list', 'array' ],
    subCat  : [ 'dfs', 'brute', 'arb', 'digraph', 'adjList', 'hTable', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution5
  };

  settings.questions[4].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5768610725232640'
  };

  settings.questions[4].problem = '' +
  'Using the below node list find the path that uses all the nodes without duplicating one.<br />' +
  '[ JFK,LXA,SNA,RKJ,LXA,SNA ]<br />' +
  'Note: Each pair of nodes define a directed edge like so:<br />' +
  '[ (JFK -&gt; LXA),(SNA -&gt; RKJ),(LXA -&gt; SNA) ]<br />';

  function solution5() {
    /*
     ** Solution:
     *  - Step 1: A brute force search algorithm is
     *    used to create an arborescence of the nodes
     *    in the vector while simultaneously building
     *    an array containing the two node values
     *    that are not duplicated (i.e. the
     *    possible arborescence roots). A hash table
     *    of nodes forming a singly-linked list is
     *    used to represent the arborescence.
     *  - Step 2: The two possible root node values
     *    are checked, and the root node is saved.
     *  - Step 3: One pass of a DFS algorithm is
     *    used to print the path of the nodes.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- Arborescence: http://en.wikipedia.org/wiki/Arborescence_(graph_theory)
     *    -- [Directed Graph (Digraph)](http://en.wikipedia.org/wiki/Directed_graph)
     *    -- [Adjacency List](http://en.wikipedia.org/wiki/Adjacency_list)
     *    -- [Hash Table](http://en.wikipedia.org/wiki/Hash_table)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // Original node list
    // Arborescence of nodes
    // Possible root nodes
    // Final node path
    var vector, graph, root, result;

    // Set variables
    vector = [ 'JFK','LXA','SNA','RKJ','LXA','SNA' ];
    graph  = {
      // val : 'location name',
      // edge: node reference
    };
    root   = [];
    result = [];

    // Adds unique node keys to the roots list
    //   and removes duplicates
    // param: node value to check
    function addRoot(nodeVal) {
      // Index of node in roots array
      var i;

      // Save node index
      i = root.indexOf(nodeVal);

      // If (node value is not in roots)
      // Then {add to roots}
      // Else {remove from roots}
      if (i === -1) {
        root.push(nodeVal);
      }
      else {
        root.splice(i, 1);
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
      var len, i, val, check, vertex, edge;

      // Save vector length
      len = vector.length;

      // Add nodes
      for (i=0; i<len; i++) {

        // Set and check node value
        val = vector[i];
        check = addRoot(val);
        // If (node value does not exist)
        // Then {add node}
        if (check) {
          graph[val] = {
            val : val,
            edge: null
          }
        }
      }

      // Add edges
      for (i=0; i<len; i++) {

        // Set vertex and edge
        vertex = graph[ vector[i] ];
        edge   = graph[ vector[++i] ];
        // Add edge to vertex
        vertex.edge = edge;
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
        node = graph[ root[i] ];
        // If (node has edge)
        // Then {set root to it}
        if (!!node.edge) {
          root = node;
          return;
        }
      }
    }

    // Finds the resulting path
    function findPath() {
      // The current node
      var node;

      // Set node to root node
      node = root;

      // Run DFS
      while (!!node) {

        // Add current node value to results
        result.push(node.val);
        // If (node has edge)
        // Then {set next node to edge}
        // Else {end loop}
        node = ( (!!node.edge) ?
          node.edge : !node
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

  /**
   * -----------------------------------------------
   * Question 6
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[5] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'sort', 'tree', 'search', 'list', 'array' ],
    subCat  : [ 'heapS', 'binHeap', 'bst', 'back', 'bfs', 'brute', 'sList', 'dList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution6
  };

  settings.questions[5].links[0] = {
    name: 'More on Converting a Binary Search Tree into a Doubly-Linked List',
    href: 'http://www.careercup.com/question?id=4863668900593664'
  };

  settings.questions[5].problem = '' +
  'Given an array of random numbers, create a binary search tree with the median ' +
  'as the root. Then convert the binary search tree into a doubly-linked list ' +
  'that is sorted in ascending or descending order and return the first node in ' +
  'the list. Do the sort and conversion in place<span style="margin:0 12px">' +
  '&ndash;</span>i.e. the memory complexity of your algorithms should be ' +
  '<em style="margin:0 2px">&Omicron;</em>(1).' +
  '<span style="display:block;margin:15px 0 10px">Example diagram of conversion:</span>'  +
  '<style>' +
    '.aIV-exQ6-table {padding:0;margin:0;text-align:center;border-collapse:collapse;border:0}' +
    '.aIV-exQ6-table tr {padding:0;margin:0;text-align:center;border:0}' +
    '.aIV-exQ6-table td {padding:0;margin:0;text-align:center;verticle-align:middle;border:0}' +
    '.aIV-exQ6-table span.lineContainer {position:relative;display:block;width:100%;height:100%;overflow:hidden}' +
    '.aIV-exQ6-table span.lineFiller {opacity:0}' +
    '.aIV-exQ6-table span.topLine {position:absolute;top:2px;left:0;display:block;width:100%;height:1px;background:#192037}' +
    '.aIV-exQ6-table span.leftLine, .aIV-exQ6-table span.rightLine {position:absolute;top:50%;left:-50%;display:block;width:200%;height:1px;background:#192037}' +
    '.aIV-exQ6-table span.leftLine {-ms-transform:rotate(-45deg);-moz-transform:rotate(-45deg);webkit-transform:rotate(-45deg);transform:rotate(-45deg)}' +
    '.aIV-exQ6-table span.rightLine {-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);webkit-transform:rotate(45deg);transform:rotate(45deg)}' +
  '</style>' +
  '<table class="aIV-exQ6-table">' +
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
        '<table class="aIV-exQ6-table" style="margin:5px auto 0;">' +
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
  '</table>';

  function solution6() {
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
     *    -- [Heapsort](http://en.wikipedia.org/wiki/Heapsort)
     *    -- [Breadth First Search (BFS)](http://en.wikipedia.org/wiki/Breadth-first_search)
     *    -- [Backtracking](http://en.wikipedia.org/wiki/Backtracking)
     *    -- [Brute Force Search](http://en.wikipedia.org/wiki/Brute-force_search)
     *  - Data Structures:
     *    -- [Binary Heap](http://en.wikipedia.org/wiki/Binary_heap)
     *    -- [Binary Search Tree](http://en.wikipedia.org/wiki/Binary_search_tree)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Doubly-Linked List](http://en.wikipedia.org/wiki/Doubly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
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
        ++val;
        while (val--) {
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
      '<table class="aIV-exQ6-table">' +
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
        string = '<table class="aIV-exQ6-table" style="width:' +
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

  /**
   * -----------------------------------------------
   * Question 7
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[6] = {
    complete: true,
    source  : 'fb',
    mainCat : [ 'search', 'tree', 'list', 'array' ],
    subCat  : [ 'bfs', 'binTree', 'sList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution7
  };

  settings.questions[6].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5748231105413120'
  };

  settings.questions[6].problem = '' +
  'Given a Tree:<br />' +
  '<style>' +
    '.aIV-exQ7-table {width:' + (35 * 11) + 'px;padding:0;margin:0;text-align:center;border-collapse:collapse;border:0}' +
    '.aIV-exQ7-table tr {padding:0;margin:0;text-align:center;border:0}' +
    '.aIV-exQ7-table td {width:35px;padding:0;margin:0;text-align:center;verticle-align:middle;border:0}' +
    '.aIV-exQ7-table span.lineContainer {position:relative;display:block;width:100%;height:100%;overflow:hidden}' +
    '.aIV-exQ7-table span.lineFiller {opacity:0}' +
    '.aIV-exQ7-table span.topLine {position:absolute;top:0;left:0;display:block;width:100%;height:1px;background:#192037}' +
    '.aIV-exQ7-table span.leftLine, .aIV-exQ7-table span.rightLine {position:absolute;top:50%;left:-50%;display:block;width:200%;height:1px;background:#192037}' +
    '.aIV-exQ7-table span.leftLine {-ms-transform:rotate(-45deg);-moz-transform:rotate(-45deg);webkit-transform:rotate(-45deg);transform:rotate(-45deg)}' +
    '.aIV-exQ7-table span.rightLine {-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);webkit-transform:rotate(45deg);transform:rotate(45deg)}' +
  '</style>' +
  '<table class="aIV-exQ7-table">' +
    '<tr>' +
      '<td colspan="5">&nbsp;</td>' +
      '<td>A</td>' +
      '<td colspan="5">&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="leftLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="topLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="topLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="rightLine"></span>' +
        '</span>' +
      '</td>' +
      '<td colspan="3">&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td colspan="2">&nbsp;</td>' +
      '<td>B</td>' +
      '<td colspan="5">&nbsp;</td>' +
      '<td>C</td>' +
      '<td colspan="2">&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="leftLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="rightLine"></span>' +
        '</span>' +
      '</td>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="leftLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
      '<td>' +
        '<span class="lineContainer">' +
          '<span class="lineFiller">&sol;</span>' +
          '<span class="rightLine"></span>' +
        '</span>' +
      '</td>' +
      '<td>&nbsp;</td>' +
    '</tr>' +
    '<tr>' +
      '<td>D</td>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>E</td>' +
      '<td>&nbsp;</td>' +
      '<td>F</td>' +
      '<td colspan="3">&nbsp;</td>' +
      '<td>G</td>' +
    '</tr>' +
  '</table><br />' +
  'Write a function that prints:<br />' +
  'A<br />' +
  'BC<br />' +
  'DEFG';

  function solution7() {
    /*
     ** Solution:
     *  - Step 1: A Breadth First Search algorithm is used
     *    to create a balanced binary tree. A linked list
     *    of nodes containing their value and references
     *    to their left and right children is used to
     *    represent the binary tree.
     *  - Step 2: A Breadth First Search algorithm is used
     *    to traverse the tree and add the nodes in order
     *    by row to the result.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Breadth First Search (BFS)](http://en.wikipedia.org/wiki/Breadth-first_search)
     *  - Data Structures:
     *    -- [Binary Tree](http://en.wikipedia.org/wiki/Binary_tree)
     *    -- [Singly-Linked Lists](http://en.wikipedia.org/wiki/Linked_list#Singly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The given values
    // The binary tree
    // The node rows to be printed
    var vals, tree, result;

    // Set variables
    vals = [ 'A','B','C','D','E','F','G' ];
    tree = {
      val  : vals[0],
      left : null,
      right: null
    };
    result = '';

    // Creates the binary tree
    function createTree() {
      // A function that adds children to a node
      // The temporary holder for each row of nodes
      // The index of the current value
      // The current tree's depth
      // The tree's max depth
      // The current node
      var addNodes, row, val, d, depth, node;

      // Adds children to the provided node
      // param: The node to add the children
      addNodes = function(prtNode) {

        // Create the nodes and increase the value
        prtNode.left = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;
        prtNode.right = {
          val  : vals[val],
          left : null,
          right: null
        };
        ++val;

        // Add the nodes to temp holder
        row.next.push(prtNode.left, prtNode.right);
      };

      // Set the temp holders, value, and max depth
      row = {
        now : [tree],
        next: []
      };
      val = 1;
      depth = 3;

      // Add the nodes to tree
      for (d=1; d<depth; d++) {
        // Add nodes
        row.now.forEach(function(node) {
          addNodes(node);
        });
        // Reset temp arrays
        row.now = row.next.slice(0);
        row.next = [];
      }
    }

    // Saves a string of the binary tree's nodes
    //   in order with a line break for each row
    function printNodes() {
      // The current and next row of nodes
      // The current node being searched
      // The left child
      // The right child
      var row, node, left, right;

      // Set final result
      result = tree.val;

      // Set temp holder for each row
      row = {
          now   : [tree],
          next  : [],
          string: ''
        };

      // Loop through nodes
      loop:
      while (true) {

        // Set and remove node
        node = row.now.shift();

        // If (child exists)
        // Then {add child to next row and result}
        if (!!node.left) {
          row.next.push(node.left);
          row.string += node.left.val;
        }
        if (!!node.right) {
          row.next.push(node.right);
          row.string += node.right.val;
        }

        // If (current row finished)
        // Then {check, update, and reset rows}
        // Else {end search}
        if (row.now.length === 0) {
          if (row.next.length > 0) {
            result += '<br />' + row.string;
            row.now = row.next.slice(0);
            row.next = [];
            row.string = '';
          }
          else {
            break loop;
          }
        }
      }
    }

    // Create tree and print nodes
    createTree();
    printNodes();
    return result;
  }

  /**
   * -----------------------------------------------
   * Question 8
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[7] = {
    complete: true,
    source  : 'go',
    mainCat : [ 'search', 'tree', 'list', 'array' ],
    subCat  : [ 'dfs', 'dList' ],
    links   : new Array(1),
    problem : 'See below',
    solution: solution8
  };

  settings.questions[7].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6295449935806464'
  };

  settings.questions[7].problem = '' +
  'Represent the following in a data structure:' +
  '<ol style="padding:0;margin:0;list-style-type:none">' +
    '<li>&lt;html&gt;</li>' +
    '<li style="padding-left:20px">&lt;body&gt;</li>' +
    '<li style="padding-left:40px">&lt;div&gt;</li>' +
    '<li style="padding-left:60px">&lt;span&gt;Lorem Ipsum&lt;/span&gt;</li>' +
    '<li style="padding-left:60px">&lt;br /&gt;</li>' +
    '<li style="padding-left:40px">&lt;/div&gt;</li>' +
    '<li style="padding-left:20px">&lt;/body&gt;</li>' +
    '<li>&lt;/html&gt;</li>' +
  '</ol>';

  function solution8() {
    /*
     ** Solution:
     *  - Step 1: A doubly-linked list of nodes
     *    containing their tag name, content, and
     *    an array of child node references (in
     *    order by appearance) is created to represent
     *    a plane tree of the DOM elements where the
     *    html tag is the root node.
     *  - Step 2: A depth first search algorithm is
     *    used to add each element to a final result
     *    string.
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [Depth First Search (DFS)](http://en.wikipedia.org/wiki/Depth-first_search)
     *  - Data Structures:
     *    -- Plane Trees: http://en.wikipedia.org/wiki/Tree_(graph_theory)#Plane_tree
     *    -- [Doubly-Linked List](http://en.wikipedia.org/wiki/Doubly_linked_list)
     *    -- [Linked Lists](http://en.wikipedia.org/wiki/Linked_list)
     *    -- [Arrays](http://en.wikipedia.org/wiki/Array_data_structure)
     */

    // The data structure for the DOM nodes
    // The final string output of the nodes
    var html, result;

    // Set data structures
    html = {
      tag    : 'html',
      _parent: null,
      content: '',
      kids   : []
    };
    result = '';

    // Adds the elements to the html page
    function addElements() {
      // A function that adds an element
      // The current element
      // The span element
      var addElement, elem, span;

      // Adds an element to the page
      // param: The new tag name (string)
      // param: The parent node
      addElement = function(tag, prt) {
        // The new element
        var newElem;

        // Create the new element
        newElem = {
          tag    : tag,
          _parent: prt,
          content: '',
          kids   : []
        };

        // Append it to the parent
        prt.kids.push(newElem);
            
        return newElem;
      };

      // Add nodes to the html tree
      elem = addElement('body', html);
      elem = addElement('div', elem);
      span = addElement('span', elem);
      addElement('br', elem);

      // Add content to nodes
      span.content = 'Lorem Ipsum';
    }

    // Creates a string output of the DOM nodes
    function prepareResult() {
      // A function that adds an element and
      //   its children to the result
      // A function that returns the string
      //   value for an element
      // A function that returns the padding
      //   value for a line
      // The padding amount for each indent
      var addElement, getString, getPadding, padding;

      // Adds an element and its children
      //   to the result
      // param: The element node
      // param: The current depth
      addElement = function(elem, depth) {
        // The number of children
        // The child node
        var kids, kid;

        // Set the count of children
        kids = elem.kids.length;

        // Add the element to the result
        result += '' +
        '<li style="' + getPadding(depth) + '">' +
          getString(elem.tag) +
          ( (kids === 0) ?
            elem.content +
            getString(elem.tag, true) :
            ''
          ) +
        '</li>';

        // If (no children)
        // Then {end addition}
        if (kids === 0) {
          return;
        }

        // Increase the depth
        ++depth;

        // Add the element's content and
        //   children to the result
        result += ( (elem.content !== '') ?
          '<li style="' + getPadding(depth) + '">' +
            elem.content +
          '</li>' :
          ''
        );
        elem.kids.forEach(function(kid) {
          addElement(kid, depth);
        });

        // Decrease the depth
        --depth;

        // Add the element closing tag
        result += '' +
        '<li style="' + getPadding(depth) + '">' +
          getString(elem.tag, true) +
        '</li>';

        return;
      };

      // Returns a string value for the element
      // param: The element's tag name
      // param: Indicates if element is closing (optional)
      getString = function(tag, end) {
        return ( (tag === 'br') ?
          ( (!end) ? '&lt;br /&gt;' : '' ) :
          '&lt;' + ( (!!end) ? '/' : '' ) +
          tag + '&gt;'
        );
      };

      // Returns the padding value for a line
      // param: The current depth
      getPadding = function(depth) {
        return 'padding-left:' +
        (padding * depth) + 'px';
      };

      // Set the padding px amount for each indent
      padding = 20;

      // Set the result
      result = '<ol style="padding:0;margin:0;list-style-type:none">';
      addElement(html, 1);
      result += '</ol>';
    }

    // Create the DOM data structure
    //   and print the elements
    addElements();
    prepareResult();
    return result;
  }

  /**
   * -----------------------------------------------
   * Question 9
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[8] = {
    complete: false,
    source  : 'am',
    mainCat : [],
    subCat  : [],
    links   : new Array(1),
    problem : 'See below',
    solution: solution9
  };

  settings.questions[8].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=5082499984130048'
  };

  settings.questions[8].problem = '' +
  'Design a data structure that can do the following operations in ' +
  '<em style="margin:0 2px">&Omicron;</em>(1) time:<br />' +
  'Insert, Delete, Search, Return Max';

  function solution9() {
    /*
     ** Overview:
     *  - [explanation]
     *
     ** Solution:
     *  - [explanation]
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [term](link)
     *  - Data Structures:
     *    -- [term](link)
     */
  }

  /**
   * -----------------------------------------------
   * Question 10
   * -----------------------------------------------
   * @type {Question}
   */
  settings.questions[9] = {
    complete: false,
    source  : 'am',
    mainCat : [ 'array' ],
    subCat  : [],
    links   : new Array(1),
    problem : 'See below',
    solution: solution10
  };

  settings.questions[9].links[0] = {
    name: 'Further Discussion',
    href: 'http://www.careercup.com/question?id=6260358392053760'
  };

  settings.questions[9].problem = '' +
  'You are given two integer arrays, A and B. Consider the following:<br />' +
  '1 &lt;= x &lt;= len(A) &nbsp;&nbsp;so x is iterator of array A<br />' +
  '1 &lt;= z &lt;= len(B) &nbsp;&nbsp;so z is iterator of array B<br /><br />' +
  'Find all the pairs (x,z) such that : x &lt; z &nbsp;&nbsp;and&nbsp;&nbsp; A[x] &gt; B[z]';

  function solution10() {
    /*
     ** Overview:
     *  - [explanation]
     *
     ** Solution:
     *  - [explanation]
     *
     ** Need to Know Terms:
     *  - Algorithms:
     *    -- [term](link)
     *  - Data Structures:
     *    -- [term](link)
     */
  }
