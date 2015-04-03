  /**
   * -----------------------------------------------
   * The Categories
   * -----------------------------------------------
   * @desc An object property of settings that contains all of the
   *   question manager's category ids and names. For more details see the
   *   [online documentation for categories]{@link algorithmiv.com/docs/categories}.
   * @type {(Object<string, string>|{
   *   main: Object<string, string>,
   *   sub : Object<string, Object<string, string>>
   * })}
   */
  settings.categories = {};

  /**
   * -----------------------------------------------
   * The Main Categories
   * -----------------------------------------------
   * @desc An object property of categories that contains all of the
   *   question manager's main category ids and names. For more details see the
   *   [online documentation for categories]{@link algorithmiv.com/docs/categories}.
   * @type {Object<string, string>}
   */
  settings.categories.main = {
    'array' : 'Arrays',
    'graph' : 'Graphs',
    'hash'  : 'Hashes',
    'list'  : 'Linked Lists',
    'search': 'Searching Algorithms',
    'sort'  : 'Sorting Algorithms',
    'tree'  : 'Trees'
  };

  /**
   * -----------------------------------------------
   * The Sub Categories
   * -----------------------------------------------
   * @desc An object property of categories that contains all of the
   *   question manager's sub category ids and names. For more details see the
   *   [online documentation for categories]{@link algorithmiv.com/docs/categories}.
   * @type {Object<string, Object<string, string>>}
   */
  settings.categories.sub = {
    'graph': {
      'adjList': 'Adjacency Lists',
      'adjMtrx': 'Adjacency Matrices',
      'arb'    : 'Arborescences',
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
      'intro' : 'Introsort',
      'merge' : 'Mergesort',
      'quick' : 'Quicksort',
      'radix' : 'Radix Sort',
      'select': 'Select Sort',
      'smooth': 'Smoothsort'
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
  };
