/* -------------------------------------------------------------------------- *
 * ---------- AS OF VERSION 1.1.0 THE WEB WORKER WAS DISCONTINUED ----------- *
 * -------------------------------------------------------------------------- *
 * The performance gain was not enough to justify the loss in usability. For  *
 * some smaller samples the worker even produced a net loss in performance.   *
 * -------------------------------------------------------------------------- *
 * In case a web worker is brought back in the future below is code that was  *
 * used to implement it.                                                      *
 * -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- *
 * ---------------------- BELOW: AppElems.appendMain() ---------------------- *
 * -------------------------------------------------------------------------- *
 * The method before the worker load error elements and logic were removed.   *
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------
   * Public Method (AppElems.prototype.appendMain)
   * -----------------------------------------------
   * @desc Creates and appends the main html elements.
   * @type {function()}
   */
  AppElems.prototype.appendMain = function() {

    DEBUG && this.debug.start('appendMain');

    /**
     * @type {string}
     * @private
     */
    var errorMsg;
    /**
     * @type {Element}
     * @private
     */
    var h1;
    /**
     * @type {Element}
     * @private
     */
    var errorDiv;
    /**
     * @type {Element}
     * @private
     */
    var h2;
    /**
     * @type {Element}
     * @private
     */
    var p;

    errorMsg = 'The web worker failed. Please wait ' +
               'while the app is being loaded manually.';

    this.root = document.createElement('div');
    h1 = document.createElement('h1');
    this.sel  = document.createElement('nav');
    this.main = document.createElement('div');
    this.nav  = document.createElement('nav');
    this.ques = document.createElement('section');
    this.hold = document.createElement('img');
    this.none = document.createElement('section');
    errorDiv = document.createElement('div');
    h2 = document.createElement('h2');
    p  = document.createElement('p');

    this.root.id = 'aIV';
    this.sel.id  = 'aIV-selections';
    this.main.id = 'aIV-main';
    this.nav.id  = 'aIV-nav';
    this.ques.id = 'aIV-questions';

    this.sel.className  = 'selections';
    this.main.className = 'main';
    this.ques.className = 'questions';
    this.hold.className = 'loader';
    this.none.className = 'empty';
    errorDiv.className = 'loadError';

    h1.textContent = 'Algorithm IV';
    h2.textContent = 'Load Error';
    p.textContent  = errorMsg;
    this.none.textContent = 'No question(s) found.';

    this.hold.src = 'images/loading.gif';

    this.root.appendChild(h1);
    this.root.appendChild(this.sel);
    this.root.appendChild(this.main);
    this.main.appendChild(this.nav);
    this.main.appendChild(this.ques);
    this.ques.appendChild(errorDiv);
    this.ques.appendChild(this.hold);
    this.ques.appendChild(this.none);
    errorDiv.appendChild(h2);
    errorDiv.appendChild(p);

    document.body.appendChild(this.root);
  };


/* -------------------------------------------------------------------------- *
 * ---------------------------- BELOW: WebWorker ---------------------------- *
 * -------------------------------------------------------------------------- *
 * The class used to implement the web worker in version 1.0.2.               *
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------
   * Public Class (WebWorker)
   * ---------------------------------------------
   * handles the supporting web worker
   * @type {function(): {
       init: function()
     }}
   * @private
   */
  var WebWorker = (function() {

    /**
     * ---------------------------------------------
     * Private Variable (_return)
     * ---------------------------------------------
     * the public methods of this class
     * @type {{
         init: function()
       }}
     * @private
     */
    var _return = {
      /**
       * ---------------------------------------------
       * Public Method (WebWorker.init)
       * ---------------------------------------------
       * initialize WebWorker
       */
      init: function() {
        // OPEN: WebWorker.init() Group
        DEBUG.WebWorker.group && console.groupCollapsed(
          'GROUP: WebWorker.init()'
        );
        // Run class
        init();
        // CLOSE: WebWorker.init() Group
        DEBUG.WebWorker.group && console.groupEnd();
      }
    };

    /**
     * ---------------------------------------------
     * Private Variable (scripts)
     * ---------------------------------------------
     * the possible locations of the web worker
        script
     * @type {Array.<string>}
     * @private
     */
    var scripts = [
      'algorithmIVData.js',
      'algorithmIVData.min.js',
      'js/algorithmIVData.js',
      'js/algorithmIVData.min.js',
      'javascript/algorithmIVData.js',
      'javascript/algorithmIVData.min.js'
    ];
    
    /**
     * ---------------------------------------------
     * Private Variable (worker)
     * ---------------------------------------------
     * the supporting web worker
     * @type {Object}
     * @private
     */
    var worker;

    /**
     * ---------------------------------------------
     * Private Method (init)
     * ---------------------------------------------
     * start the supporting web worker
     * @type {function()}
     * @private
     */
    function init() {
      // Debugger
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.init()'
      );
      // Find script and setup worker
      findWorker(0);
    }
    
    /**
     * ---------------------------------------------
     * Private Method (findWorker)
     * ---------------------------------------------
     * check whether js file exists
     * param: the current script location being
               checked (number)
     * @type {function(number)}
     * @private
     */
    function findWorker(i) {
      // Debuggers
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.findWorker(%d)', i
      );
      DEBUG.WebWorker.fail && console.assert(
        typeof i === 'number',
        'FAIL: WebWorker.findWorker() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var http, check;
      // Open ajax request
      http = new XMLHttpRequest();
      // Create response
      http.onreadystatechange = function() {
        // If (load complete)
        if (http.readyState === 4) {
          // If (file found)
          // Then {start web worker}
          if (http.status != 404) {
            // Debugger
            DEBUG.WebWorker.state && console.log(
              'STATE: WebWorker.findWorker() ' +
              'Note: AJAX passed. scripts[i]= %s', scripts[i]
            );
            startWorker(scripts[i]);
          }
          else {
            // Debugger
            DEBUG.WebWorker.state && console.log(
              'STATE: WebWorker.findWorker() ' +
              'Note: AJAX not passed. i= %d', i
            );
            // If (more scripts to check)
            // Then {check next script}
            // Else {reset app without web worker}
            if (++i < scripts.length) {
              findWorker(i);
            }
            else {
              loadError('Failed to find the web worker script.');
            }
          }
        }
      }
      // Make request
      http.open('HEAD', scripts[i], true);
      http.send();
    }
    
    /**
     * ---------------------------------------------
     * Private Method (startWorker)
     * ---------------------------------------------
     * start the web worker
     * param: the verified location of the web
               worker script (string)
     * @type {function(string)}
     * @private
     */
    function startWorker(script) {
      // Debuggers
      // OPEN: WebWorker.startWorker() Group
      DEBUG.WebWorker.group && console.groupCollapsed(
        'GROUP: WebWorker.startWorker()'
      );
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.startWorker(%s)', script
      );
      DEBUG.WebWorker.fail && console.assert(
        typeof script === 'string',
        'FAIL: WebWorker.startWorker() ' +
        'Note: Incorrect argument operand.'
      );
      // Set worker and load script
      worker = new Worker(script);
      // Setup worker responses
      setListeners();
      // Tell worker to start parsing questions
      worker.postMessage({
                 qLen: qLen,
        configuration: configuration,
              sources: sources,
           categories: categories
      });
    }

    /**
     * ---------------------------------------------
     * Private Method (setListeners)
     * ---------------------------------------------
     * set all of the listeners for the web worker
     * @type {function()}
     * @private
     */
    function setListeners() {
      // Debugger
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.setListeners()'
      );
      // Set success response
      worker.onmessage = function(event) {
        loadComplete(event.data);
      };
      // Set failure response
      worker.onerror = function(event) {
        loadError(event);
      };
    }
    
    /**
     * ---------------------------------------------
     * Private Method (loadComplete)
     * ---------------------------------------------
     * set the actions to execute after the web
        worker is finished loading this module's
        questions
     * param: the formatted questions (string)
     * @type {function(string)}
     * @private
     */
    function loadComplete(content) {
      // Debuggers
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.loadComplete()'
      );
      DEBUG.WebWorker.state && console.log(
        'STATE: WebWorker.loadComplete() ' +
        'Note: content= %O', content
      );
      // Save formatted questions
      configuration.content = content;
      // Tell app that worker finished
      flags.workerPass = true;
      // CLOSE: WebWorker.startWorker() Group
      DEBUG.WebWorker.group && console.groupEnd();
      // If (app init is finished)
      // Then {append and display questions}
      if (flags.initDone) {
        AppendQuestions.init();
        DisplayQuestions.assembleQuestions();
      }
      // End worker
      worker.terminate();
    }

    /**
     * ---------------------------------------------
     * Private Method (loadError)
     * ---------------------------------------------
     * set the error listener handler for the web
        worker loading this module's questions
     * param: the error response (object) (string)
     * @type {function(Object|string)}
     * @private
     */
    function loadError(error) {
      // Debugger
      DEBUG.WebWorker.call && console.log(
        'CALL: WebWorker.loadError()'
      );
      // Declare method variables
      var message, error, h2, p, loader;
      // Reset worker config
      configuration.worker = false;
      // Enable error flag
      flags.workerFail = true;
      // CLOSE: WebWorker.startWorker() Group
      DEBUG.WebWorker.group && console.groupEnd();
      // If (app init is finished)
      // Then {load error and reset app}
      if (flags.initDone) {
        // Show error message
        getClass('loadError')[0].style.display = 'block';
        // Format questions without worker
        FormatQuestions.init();
        AppendQuestions.init();
        DisplayQuestions.assembleQuestions();
      }
      // Debugger
      DEBUG.WebWorker.fail && console.log(
        'FAIL: WebWorker.loadError() ' +
        'Note: error= %s', error
      );
      // End worker
      worker.terminate();
    }

    // END CLASS: WebWorker
    return _return;
  }());
