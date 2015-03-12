  /**
   * -----------------------------------------------------
   * Public Class (QuestionElem)
   * -----------------------------------------------------
   * @desc An object containing the question's html element.
   * @param {number} id - The id of the question.
   * @constructor
   */
  var QuestionElem = function(id) {

    /**
     * ---------------------------------------------------
     * Private Property (QuestionElem.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('QuestionElem') : null;

    if (DEBUG) {
      this.debug.start('init', id);
      this.debug.args('init', id, 'number');
    }

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.root)
     * -----------------------------------------------
     * @desc The question's root element.
     * @type {elem}
     */
    this.root = null;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {elem}
     */
    this.info = null;


    // Setup the elements
    this.root = document.createElement('section');
    this.info = document.createElement('div');

    this.root.id = 'aIV-q' + id;

    this.root.className = 'question';
    this.info.className = 'info';

    this.root.appendChild(this.info);
  };

  // Ensure constructor is set to this class.
  QuestionElem.prototype.constructor = QuestionElem;

  /**
   * -----------------------------------------------------
   * Public Method (QuestionElem.prototype.addContent)
   * -----------------------------------------------------
   * @desc Adds the question's contents to its element.
   * @param {{
   *   id      : string,
   *   url     : string,
   *   complete: string,
   *   source  : string,
   *   mainCat : {
   *     h3: string,
   *     p : string
   *   },
   *   subCat  : {
   *     h3: string,
   *     p : string
   *   },
   *   links   : links,
   *   problem : string,
   *   descr   : string,
   *   solution: {
   *     code  : string,
   *     height: number
   *   },
   *   output  : string
   * }} question - The formatted question details.
   */
  QuestionElem.prototype.addContent = function(question) {

    if (DEBUG) {
      this.debug.start('addContent', question);
      this.debug.args('addContent', question, 'object');
    }

    /** @type {elem} */
    var root = this.root;
    /** @type {elem} */
    var info = this.info;

    // See the below private helper methods for more details

    // Add the question id
    if (question.id) {
      appendID(question.id, question.url);
    }

    // START HERE ***************************************
    // appendSource

    /**
     * ---------------------------------------------
     * Private Method (appendID)
     * ---------------------------------------------
     * @desc Appends the question id.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @private
     */
    function appendID(id, url) {

      if (DEBUG) {
        this.debug.start('appendID', id);
        this.debug.args('appendID', id, 'string');
      }

      /**
       * @type {boolean}
       * @private
       */
      var config;
      /**
       * @type {elem}
       * @private
       */
      var div;
      /**
       * @type {elem}
       * @private
       */
      var h3;
      /**
       * @type {elem}
       * @private
       */
      var p;
      /**
       * @type {elem}
       * @private
       */
      var a;

      config = (app.config.get('showLinks') &&
                app.config.searchBar.url.get('id'));

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'idContain';

      h3.textContent = 'Question:';
      p.textContent = id;

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      if (config) {
        p.textContent = '';
        a = document.createElement('a');
        url = url || Number(id);
        a.href = app.url + '/id/' + url;
        a.className = 'dark';
        a.textContent = id;
        p.appendChild(a);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSource)
     * ---------------------------------------------
     * appends the question source
     * param: the question source (string)
     * @type {function(string)}
     * @private
     */
    function appendSource(source) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendSource()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof source === 'string',
        'FAIL: AppendQuestions.appendSource() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'source';
      // Add content
      h3.textContent = 'Source:';
      p.textContent  = source;
      // Append elements
      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendComplete)
     * ---------------------------------------------
     * appends the question completed status
     * param: the question status (string)
     * @type {function(string)}
     * @private
     */
    function appendComplete(complete) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendComplete()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof complete === 'string',
        'FAIL: AppendQuestions.appendComplete() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'stage';
      // Add content
      h3.textContent = 'Completed:';
      p.textContent  = complete;
      // Append elements
      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendCategory)
     * ---------------------------------------------
     * appends the question categories
     * param: the question's main categories (object)
     * param: the question's sub categories (object)
     * @type {function(Object)}
     * @private
     */
    function appendCategory(main, sub) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendCategory()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        (typeof main === 'object' &&
         typeof sub  === 'object'),
        'FAIL: AppendQuestions.appendCategory() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p, mdiv, mh3, mp, sdiv, sh3, sp;
      // Create elements
      div = document.createElement('div');
      if (!main.flag && !sub.flag) {
        h3 = document.createElement('h3');
        p  = document.createElement('p');
      }
      if (main.flag) {
        mdiv = document.createElement('div');
        mh3  = document.createElement('h3');
        mp   = document.createElement('p');
      }
      if (sub.flag) {
        sdiv = document.createElement('div');
        sh3  = document.createElement('h3');
        sp   = document.createElement('p');
      }
      // Add classes and content
      div.className = 'category';
      if (!main.flag && !sub.flag) {
        h3.textContent = 'Category:';
        p.textContent  = 'None';
      }
      if (main.flag) {
        mdiv.className  = 'mainCategory';
        mh3.textContent = main.h3;
        mp.textContent  = main.p;
      }
      if (sub.flag) {
        sdiv.className  = 'subCategory';
        sh3.textContent = sub.h3;
        sp.textContent  = sub.p;
      }
      // Append elements
      q.appendChild(div);
      if (!main.flag && !sub.flag) {
        div.appendChild(h3);
        div.appendChild(p);
      }
      if (main.flag) {
        div.appendChild(mdiv);
        mdiv.appendChild(mh3);
        mdiv.appendChild(mp);
      }
      if (sub.flag) {
        div.appendChild(sdiv);
        sdiv.appendChild(sh3);
        sdiv.appendChild(sp);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendProblem)
     * ---------------------------------------------
     * appends the question problem
     * param: the question problem (string)
     * @type {function(string)}
     * @private
     */
    function appendProblem(problem) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendProblem()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof problem === 'string',
        'FAIL: AppendQuestions.appendProblem() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'problem';
      // Add content
      h3.textContent = 'Problem:';
      p.innerHTML  = problem;
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSolution)
     * ---------------------------------------------
     * appends the question solution
     * param: the question's solution (object)
     * param: the question index (number)
     * @type {function(Object, number)}
     * @private
     */
    function appendSolution(solution, i) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendSolution()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        (typeof solution === 'object' &&
         typeof i        === 'number'),
        'FAIL: AppendQuestions.appendSolution() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p, pdiv, pre, code, ol, ext,
          extClose, extOpen, extBG, extHov,
          extHovC, extHovO;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      // Add classes
      div.className = 'solution';
      // Add content
      h3.textContent = 'Solution:';
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      // If (no error)
      // Then {add solution code}
      // Else {add error}
      if (!solution.error) {
        // Create elements
        pdiv = document.createElement('div');
        pre  = document.createElement('pre');
        code = document.createElement('code');
        ol   = document.createElement('ol');
        ext  = document.createElement('div');
        extClose = document.createElement('div');
        extOpen  = document.createElement('div');
        extBG    = document.createElement('div');
        extHov   = document.createElement('div');
        extHovC  = document.createElement('span');
        extHovO  = document.createElement('span');
        // Add ids
        extOpen.id = 'aIV-extCode' + i;
        // Add classes
        pdiv.className = 'preContain';
        ext.className  = 'extContain';
        extClose.className = 'extCloseArrow';
        extOpen.className  = 'extOpenArrow';
        extBG.className    = 'extBG';
        extHov.className   = 'extHover';
        extHovC.className  = 'closeExt';
        extHovO.className  = 'openExt';
        // Add content
        ol.innerHTML = solution.code;
        extOpen.textContent = i;
        extHovC.textContent = 'Close Extended Code View';
        extHovO.textContent = 'Extend Code View';
        // Set preContain height
        pdiv.style.height = solution.height + 'px';
        // Add events
        extOpen.onmouseover = function() { AddEvents.extHoverIn(i) };
        extOpen.onmouseout  = function() { AddEvents.extHoverOut(i) };
        // Append elements
        div.appendChild(pdiv);
        pdiv.appendChild(pre);
        pre.appendChild(code);
        code.appendChild(ol);
        pdiv.appendChild(ext);
        ext.appendChild(extClose);
        ext.appendChild(extOpen);
        ext.appendChild(extBG);
        pdiv.appendChild(extHov);
        extHov.appendChild(extHovC);
        extHov.appendChild(extHovO);
      }
      else {
        // Create and append error element
        p = document.createElement('p');
        p.className = 'error';
        p.textContent = 'Error: This solution was not wrapped in an anonymous function.';
        div.appendChild(p);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendOutput)
     * ---------------------------------------------
     * appends the question's solution output
     * param: the question's solution output (string)
     * @type {function(string)}
     * @private
     */
    function appendOutput(output) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendOutput()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        typeof output === 'string',
        'FAIL: AppendQuestions.appendOutput() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'output';
      // Add content
      h3.textContent = 'Output:';
      p.innerHTML    = output;
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendLinks)
     * ---------------------------------------------
     * appends the question links
     * param: the question links (array of objects)
     * @type {function(Array.<Object>)}
     * @private
     */
    function appendLinks(links) {
      // Debuggers
      DEBUG.AppendQuestions.call && console.log(
        'CALL: AppendQuestions.appendLinks()'
      );
      DEBUG.AppendQuestions.fail && console.assert(
        Array.isArray(links),
        'FAIL: AppendQuestions.appendLinks() ' +
        'Note: Incorrect argument operand.'
      );
      // Declare method variables
      var div, h3, p, linksLen, i, a;
      // Create elements
      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');
      // Add classes
      div.className = 'links';
      // Add content
      h3.textContent = 'Links:';
      // Append elements
      q.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
      // Save link length
      linksLen = links.length;
      // Create and append links
      for (i=0; i<linksLen; i++) {
        a = document.createElement('a');
        a.href = links[i].href;
        a.target = '_blank';
        a.textContent = links[i].name;
        p.appendChild(a);
      }
    }
  };
