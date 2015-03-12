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

    var that = this;

    if (DEBUG) {
      this.debug.start('addContent', question);
      this.debug.args('addContent', question, 'object');
    }

    /** @type {elem} */
    var root = this.root;
    /** @type {elem} */
    var info = this.info;

    // See the below private helper methods for more details

    if (question.id) {
      appendID(question.id, question.url);
    }

    if (question.source) {
      appendSource(question.source);
    }

    if (question.complete) {
      appendComplete(question.complete);
    }

    if (!!question.mainCat.h3 || !!question.subCat.h3) {
      appendCategory(question.mainCat, question.subCat);
    }

    // START HERE *************************************
    // appendLinks

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
        that.debug.start('appendID', id, url);
        that.debug.args('appendID', id, 'string', url, 'strinsg');
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
     * @desc Appends the question's source.
     * @param {string} source - The name of the source.
     * @private
     */
    function appendSource(source) {

      if (DEBUG) {
        that.debug.start('appendSource', source);
        that.debug.args('appendSource', source, 'string');
      }

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

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'source';

      h3.textContent = 'Source:';
      p.textContent  = source;

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendComplete)
     * ---------------------------------------------
     * @desc Appends the question's completion status.
     * @param {string} complete - The question's status.
     * @private
     */
    function appendComplete(complete) {

      if (DEBUG) {
        that.debug.start('appendComplete', complete);
        that.debug.args('appendComplete', complete, 'string');
      }

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

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'stage';

      h3.textContent = 'Completed:';
      p.textContent  = complete;

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendCategory)
     * ---------------------------------------------
     * @desc Appends the question's categories.
     * @param {Object} main - The question's main categories.
     * @param {Object} sub - The question's sub categories.
     * @private
     */
    function appendCategory(main, sub) {

      if (DEBUG) {
        that.debug.start('appendCategory', main, sub);
        that.debug.args('appendCategory', main, 'object', sub, 'object');
      }

      /**
       * @type {elem}
       * @private
       */
      var contain;
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

      var contain, div, h3, p;

      contain = document.createElement('div');
      contain.className = 'category';

      if (!!main.h3) {
        div = document.createElement('div');
        h3  = document.createElement('h3');
        p   = document.createElement('p');

        div.className  = 'mainCategory';
        h3.textContent = main.h3;
        p.textContent  = main.p;

        div.appendChild(h3);
        div.appendChild(p);

        contain.appendChild(div);
      }

      if (!!sub.h3) {
        div = document.createElement('div');
        h3  = document.createElement('h3');
        p   = document.createElement('p');

        div.className  = 'subCategory';
        h3.textContent = sub.h3;
        p.textContent  = sub.p;

        div.appendChild(h3);
        div.appendChild(p);

        contain.appendChild(div);
      }

      root.appendChild(contain);
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
