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
     * Public Property (QuestionElem.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for the QuestionElem class.
     * @type {Debug}
     */
    this.debug = aIV.debug('QuestionElem');

    this.debug.start('init', id);
    this.debug.args('init', id, 'number');

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.root)
     * -----------------------------------------------
     * @desc The question's root element.
     * @type {elem}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {elem}
     */
    this.info;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.solution)
     * -----------------------------------------------
     * @desc The question's div.solution element.
     * @type {elem}
     */
    this.solution;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.pre)
     * -----------------------------------------------
     * @desc The question's div.preContain element.
     * @type {elem}
     */
    this.pre;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.code)
     * -----------------------------------------------
     * @desc The question's code element.
     * @type {elem}
     */
    this.code;


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
   *   source  : {
   *     id  : string,
   *     name: string
   *   },
   *   mainCat : {
   *     ids  : strings,
   *     h3   : ?string,
   *     names: ?strings
   *   },
   *   subCat  : {
   *     ids  : strings,
   *     h3   : ?string,
   *     names: ?strings
   *   },
   *   links   : links,
   *   problem : string,
   *   descr   : string,
   *   solution: {
   *     prettyCode: string,
   *     lineCount : number
   *   },
   *   output  : string
   * }} question - The formatted question details.
   */
  QuestionElem.prototype.addContent = function(question) {

    this.debug.group('addContent', 'coll', 'questionID= $$', question.id);
    this.debug.start('addContent', question);
    this.debug.args('addContent', question, 'object');

    /** @type {elem} */
    var root;
    /** @type {elem} */
    var info;
    /** @type {boolean} */
    var testTextContent;

    root = this.root;
    info = this.info;
    testTextContent = !!document.body.textContent;

    // Append all the sections of the question
    // Note: See the below private helper methods for more details

    if (question.id) {
      appendID.call(this, question.id, question.url);
    }

    if (question.source.name) {
      appendSource.call(this, question.source);
    }

    if (question.complete) {
      appendComplete.call(this, question.complete);
    }

    if (question.mainCat.h3 || question.subCat.h3) {
      appendCategory.call(this, question.mainCat, question.subCat);
    }

    if (question.problem || question.descr) {
      appendProblem.call(this, question.problem, question.descr);
    }

    if ( question.solution.hasOwnProperty('prettyCode') ) {
      appendSolution.call(this, question.solution);
    }

    if (question.output) {
      appendOutput.call(this, question.output);
    }

    if (question.links.length) {
      appendLinks.call(this, question.links);
    }


    this.debug.group('addContent', 'end');


    /**
     * ---------------------------------------------
     * Private Method (appendID)
     * ---------------------------------------------
     * @desc Appends the question id.
     * @todo Add url parsing logic.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @private
     */
    function appendID(id, url) {

      this.debug.start('appendID', id, url);
      this.debug.args('appendID', id, 'string', url, 'string');

      /** @type {boolean} */
      var config;
      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {elem} */
      var a;
      /** @type {boolean} */
      var urlConfig;

      config = app.config.links.get('id');

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'idContain';

      if (testTextContent) {
        h3.textContent = 'Question:';
        if (!config) {
          p.textContent = id;
        }
      }
      else {
        h3.innerHTML = 'Question:';
        if (!config) {
          p.innerHTML = id;
        }
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      // Add the anchor link
      if (config) {

        if (!url) {
          url = Number(id);
        }
        urlConfig = app.config.url.get('id');

        a = document.createElement('a');
        a.href = 'id/' + url;
        if (testTextContent) {
          a.textContent = id;
        }
        else {
          a.innerHTML = id;
        }
        a.onclick = function() {

          events.debug.group('questionID.onclick', 'coll', 'id= $$', id);
          events.debug.start('questionID.onclick', id);

          app.moveDisplay(id);

          if (urlConfig) {
            // ADD URL LOGIC HERE
          }

          events.debug.group('questionID.onclick', 'end');

          return false;
        };

        p.appendChild(a);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSource)
     * ---------------------------------------------
     * @desc Appends the question's source.
     * @param {stringMap} source - The id and name of the source.
     * @private
     */
    function appendSource(source) {

      this.debug.start('appendSource', source);
      this.debug.args('appendSource', source, 'stringMap');

      /** @type {boolean} */
      var config;
      /** @type {string} */
      var url;
      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {elem} */
      var a;

      config = app.config.links.get('source');

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'source';

      if (testTextContent) {
        h3.textContent = 'Source:';
        if (!config) {
          p.textContent = source.name;
        }
      }
      else {
        h3.innerHTML = 'Source:';
        if (!config) {
          p.innerHTML = source.name;
        }
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      // Format the anchor link
      if (config) {

        url = app.categories.get(source.id, 'url');

        a = document.createElement('a');
        a.href = 'source/' + url;
        a.className = 'dark';
        if (testTextContent) {
          a.textContent = source.name;
        }
        else {
          a.innerHTML = source.name;
        }
        a.onclick = function() {

          events.debug.start('source.onclick', source.id);

          if (app.searchBar.vals.source != source.id) {

            events.debug.group('source.onclick', 'coll', 'source= $$', source);

            app.searchBar.vals.source = source.id;
            app.updateDisplay();

            events.debug.group('source.onclick', 'end');
          }

          return false;
        };

        p.appendChild(a);
      }
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

      this.debug.start('appendComplete', complete);
      this.debug.args('appendComplete', complete, 'string');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'stage';

      if (testTextContent) {
        h3.textContent = 'Completed:';
        p.textContent  = complete;
      }
      else {
        h3.innerHTML = 'Completed:';
        p.innerHTML = complete;
      }

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

      this.debug.start('appendCategory', main, sub);
      this.debug.args('appendCategory', main, 'object', sub, 'object');

      /** @type {elem} */
      var contain;
      /** @type {elem} */
      var mainDiv;
      /** @type {elem} */
      var subDiv;

      contain = document.createElement('div');
      contain.className = 'category';

      // Add the main categories
      if (main.h3) {

        mainDiv = document.createElement('div');
        mainDiv.className = 'mainCategory';

        appendMainCategories.call(this, main, mainDiv);

        contain.appendChild(mainDiv);
      }

      // Add the sub categories
      if (sub.h3) {

        subDiv = document.createElement('div');
        subDiv.className = 'subCategory';

        appendSubCategories.call(this, sub, subDiv);

        contain.appendChild(subDiv);
      }

      root.appendChild(contain);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendMainCategories)
     * ---------------------------------------------
     * @desc Appends the question's main categories.
     * @param {Object} main - The question's main categories.
     * @param {elem} div - The DOM container for the main categories.
     * @private
     */
    function appendMainCategories(main, div) {

      var debugMsg;
      this.debug.start('appendMainCategories', main, div);
      this.debug.args('appendMainCategories', main, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {elem} */
      var a;

      config = app.config.links.get('category');

      h3 = document.createElement('h3');
      p  = document.createElement('p');

      if (testTextContent) {
        h3.textContent = main.h3;
        if (!config) {
          p.textContent = main.names.join(', ');
        }
      }
      else {
        h3.innerHTML = main.h3;
        if (!config) {
          p.innerHTML = main.names.join(', ');
        }
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each main category's anchor tag
      if (config) {
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        len = main.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeMainCatLink.call(this, main.ids[i], main.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.innerHTML += ',&nbsp;&nbsp;';
          }
          this.debug.state('appendMainCategories', debugMsg, p, a, a.onclick);
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSubCategories)
     * ---------------------------------------------
     * @desc Appends the question's sub categories.
     * @param {Object} sub - The question's sub categories.
     * @param {elem} div - The DOM container for the sub categories.
     * @private
     */
    function appendSubCategories(sub, div) {

      var debugMsg;
      this.debug.start('appendSubCategories', sub, div);
      this.debug.args('appendSubCategories', sub, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {elem} */
      var a;

      config = app.config.links.get('category');

      h3 = document.createElement('h3');
      p  = document.createElement('p');

      if (testTextContent) {
        h3.textContent = sub.h3;
        if (!config) {
          p.textContent = sub.names.join(', ');
        }
      }
      else {
        h3.innerHTML = sub.h3;
        if (!config) {
          p.innerHTML = sub.names.join(', ');
        }
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each sub category's anchor tag
      if (config) {
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        len = sub.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeSubCatLink.call(this, sub.ids[i], sub.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.innerHTML += ',&nbsp;&nbsp;';
          }
          this.debug.state('appendSubCategories', debugMsg, p, a, a.onclick);
        }
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeMainCatLink)
     * ---------------------------------------------
     * @desc Creates a main category link.
     * @todo Add url parsing logic.
     * @param {string} id - The main category's id.
     * @param {string} name - The main category's name.
     * @return {elem} The anchor link.
     * @private
     */
    function makeMainCatLink(id, name) {

      this.debug.start('makeMainCatLink', id, name);
      this.debug.args('makeMainCatLink', id, 'string', name, 'string');

      /** @type {boolean} */
      var urlConfig;
      /** @type {string} */
      var url;
      /** @type {elem} */
      var a;

      urlConfig = app.config.url.get('category');
      url = app.categories.get(id, 'url');

      a = document.createElement('a');
      a.href = 'category/' + url;
      a.className = 'dark';
      a.innerHTML = name;
      a.onclick = function() {
        events.debug.start('mainCat.onclick', id);

        if (app.searchBar.vals.mainCat != id) {
          events.debug.group('mainCat.onclick', 'coll', 'mainCat= $$', id);

          app.searchBar.vals.mainCat = id;
          app.searchBar.updateSubCatOpts();
          app.updateDisplay();

          if (urlConfig) {
            // ADD URL LOGIC HERE
          }

          events.debug.group('mainCat.onclick', 'end');
        }

        return false;
      };

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeSubCatLink)
     * ---------------------------------------------
     * @desc Creates a sub category link.
     * @todo Add url parsing logic and remove the use of
     *   indexOf to find the sub category's parent.
     * @param {string} id - The sub category's id.
     * @param {string} name - The sub category's name.
     * @return {elem} The anchor link.
     * @private
     */
    function makeSubCatLink(id, name) {

      this.debug.start('makeSubCatLink', id, name);
      this.debug.args('makeSubCatLink', id, 'string', name, 'string');

      /** @type {boolean} */
      var urlConfig;
      /** @type {string} */
      var url;
      /** @type {elem} */
      var a;
      /** @type {string} */
      var parentId;
      /** @type {string} */
      var parentUrl;

      urlConfig = app.config.url.get('category');

      // Set the sub category's parent id and url
      app.categories.ids.some(function(/** string */ catId) {
        /** @private */
        var category;
        /** @private */
        var subs;

        category = app.categories.get(catId);
        subs = category.get('subs');
        if (subs && subs.indexOf(id) !== -1) {
          parentId  = catId;
          parentUrl = category.get('url');
          return true;
        }

        return false;
      });

      url = app.categories.get(id, 'url');

      a = document.createElement('a');
      a.href = 'category/' + parentUrl + '/' + url;
      a.className = 'dark';
      a.innerHTML = name;
      a.onclick = function() {
        events.debug.start('subCat.onclick', id);

        if (app.searchBar.vals.subCat != id) {
          events.debug.group('subCat.onclick', 'coll', 'subCat= $$', id);

          // Check the main category and update the values and options
          if (app.searchBar.vals.mainCat !== 'all' ||
              app.searchBar.vals.mainCat !== parentId) {
            app.searchBar.vals.mainCat = 'all';
            app.searchBar.updateSubCatOpts(id);
          }
          else {
            app.searchBar.vals.subCat = id;
          }

          if (urlConfig) {
            // ADD URL LOGIC HERE
          }

          // Finish the display update
          app.updateDisplay();

          events.debug.group('subCat.onclick', 'end');
        }

        return false;
      };

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendProblem)
     * ---------------------------------------------
     * @desc Appends the question's problem or description.
     * @param {string} problem - The question's problem.
     * @param {string} descr - The question's description.
     * @private
     */
    function appendProblem(problem, descr) {

      this.debug.start('appendProblem', problem, descr);
      this.debug.args('appendProblem', problem, 'string', descr, 'string');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'problem';

      if (testTextContent) {
        h3.textContent = (problem) ? 'Problem:' : 'Description:';
      }
      else {
        h3.innerHTML = (problem) ? 'Problem:' : 'Description:';
      }
      p.innerHTML = (problem) ? problem : descr;

      div.appendChild(h3);
      div.appendChild(p);

      root.appendChild(div);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSolution)
     * ---------------------------------------------
     * @desc Appends the question's solution.
     * @param {Object} solution - The question's solution.
     * @private
     */
    function appendSolution(solution) {

      this.debug.start('appendSolution', solution);
      this.debug.args('appendSolution', solution, 'object');

      /** @type {elem} */
      var contain;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var preDiv;
      /** @type {elem} */
      var pre;
      /** @type {elem} */
      var code;
      /** @type {elem} */
      var ol;
      /** @type {number} */
      var height;

      contain  = document.createElement('div');
      h3       = document.createElement('h3');
      preDiv   = document.createElement('div');
      pre      = document.createElement('pre');
      code     = document.createElement('code');
      ol       = document.createElement('ol');

      contain.className = 'solution';
      preDiv.className     = 'preContain';

      ol.innerHTML = solution.prettyCode;

      if (testTextContent) {
        h3.textContent = 'Solution:';
      }
      else {
        h3.innerHTML = 'Solution:';
      }

      height = solution.lineCount * app.elems.code.li.height;
      height += app.elems.code.ol.height;
      preDiv.style.height = height + 'px';

      contain.appendChild(h3);
      contain.appendChild(preDiv);
      preDiv.appendChild(pre);
      pre.appendChild(code);
      code.appendChild(ol);

      root.appendChild(contain);

      this.solution = contain;
      this.pre = preDiv;
      this.code = code;
    }

    /**
     * ---------------------------------------------
     * Private Method (appendOutput)
     * ---------------------------------------------
     * @desc Appends the solution's output for this question.
     * @param {string} output - The solution's output.
     * @private
     */
    function appendOutput(output) {

      this.debug.start('appendOutput', output);
      this.debug.args('appendOutput', output, 'string');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'output';

      if (testTextContent) {
        h3.textContent = 'Output:';
      }
      else {
        h3.innerHTML = 'Output:';
      }

      p.innerHTML    = output;

      div.appendChild(h3);
      div.appendChild(p);

      root.appendChild(div);
    }

    /**
     * ---------------------------------------------
     * Private Method (appendLinks)
     * ---------------------------------------------
     * @desc Appends the question's links.
     * @param {links} links - The question's links.
     * @private
     */
    function appendLinks(links) {

      this.debug.start('appendLinks', links);
      this.debug.args('appendLinks', links, 'objects');

      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'links';

      if (testTextContent) {
        h3.textContent = 'Links:';
      }
      else {
        h3.innerHTML = 'Links:';
      }

      div.appendChild(h3);
      div.appendChild(p);

      links.forEach(function(/** Object */ linkObj) {
        /** @type {elem} */
        var a;

        a = document.createElement('a');
        a.href = linkObj.href;
        a.target = '_blank';
        if (testTextContent) {
          a.textContent = linkObj.name;
        }
        else {
          a.innerHTML = linkObj.name;
        }
        p.appendChild(a);
      });

      root.appendChild(div);
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (QuestionElem.prototype.addCodeExt)
   * -----------------------------------------------------
   * @desc If overflow occurs in a code element it enables the auto
   *   extend button for the question.
   * @type {function}
   */
  QuestionElem.prototype.addCodeExt = function() {

    var debugMsg, debugArgs;
    this.debug.start('addCodeExt');

    /** @type {number} */
    var overflow;
    /** @type {number} */
    var scrollbar;
    /** @type {elem} */
    var code;
    /** @type {elem} */
    var ext;
    /** @type {elem} */
    var extClose;
    /** @type {elem} */
    var extOpen;
    /** @type {elem} */
    var extBG;
    /** @type {elem} */
    var extHov;
    /** @type {elem} */
    var extHovC;
    /** @type {elem} */
    var extHovO;
    /** @type {boolean} */
    var testTextContent;

    code = this.code;

    overflow = code.scrollWidth - code.clientWidth;
    debugMsg = 'this.code= $$, scrollWidth= $$, clientWidth= $$, overflow= $$';
    debugArgs = [ 'addCodeExt', debugMsg, code, code.scrollWidth ];
    debugArgs.push(code.clientWidth, overflow);
    this.debug.state(debugArgs);

    if (overflow < 1) {
      this.root.style.display = 'none';
      this.root.style.opacity = '1';
      return;
    }

    scrollbar = app.elems.scrl.height;
    this.debug.state('addCodeExt', 'scrollbar= $$', scrollbar);
    if (scrollbar > 0) {
      this.solution.style.paddingBottom = scrollbar + 'px';
    }

    testTextContent = !!document.body.textContent;

    ext      = document.createElement('div');
    extClose = document.createElement('div');
    extOpen  = document.createElement('div');
    extBG    = document.createElement('div');
    extHov   = document.createElement('div');
    extHovC  = document.createElement('span');
    extHovO  = document.createElement('span');

    ext.className      = 'extContain';
    extClose.className = 'extCloseArrow';
    extOpen.className  = 'extOpenArrow';
    extBG.className    = 'extBG';
    extHov.className   = 'extHover';
    extHovC.className  = 'closeExt';
    extHovO.className  = 'openExt';

    if (testTextContent) {
      extOpen.textContent = 'open';
      extHovC.textContent = 'Close Extended Code View';
      extHovO.textContent = 'Extend Code View';
    }
    else {
      extOpen.innerHTML = 'open';
      extHovC.innerHTML = 'Close Extended Code View';
      extHovO.innerHTML = 'Extend Code View';
    }

    extOpen.onmouseover = function() {
      extHov.style.opacity = '1';
    };

    extOpen.onmouseout = function() {
      extHov.style.opacity = '0';
    };

    extOpen.onclick = function() {
      events.debug.group('extCodeView', 'coll');
      events.debug.start('extCodeView');

      /** @type {number} */
      var newWidth;
      /** @type {number} */
      var newRight;

      newWidth = code.clientWidth;
      events.debug.state('extCodeView', 'orgWidth= $$', newWidth);

      if (extOpen.innerHTML === 'close') {

        extClose.style.opacity = '0.0';

        ext.style.right = '-4px';

        newWidth -= overflow;
        code.style.width = newWidth + 'px';

        setTimeout(function() {
          extOpen.style.opacity = '0.8';
          setTimeout(function() {
            extOpen.innerHTML = 'open';
            extHovC.style.display = 'none';
            extHovO.style.display = 'block';
          }, 600);
        }, 400);
      }
      else if (extOpen.innerHTML === 'open') {

        extOpen.style.opacity = '0.0';

        newRight = overflow + 4;
        ext.style.right = '-' + newRight + 'px';
        events.debug.state('extCodeView', 'newRight= $$', newRight);

        newWidth += overflow;
        events.debug.state('extCodeView', 'newWidth= $$', newWidth);
        code.style.width = newWidth + 'px';

        setTimeout(function() {
          extClose.style.opacity = '0.8';
          setTimeout(function() {
            extOpen.innerHTML = 'close';
            extHovO.style.display = 'none';
            extHovC.style.display = 'block';
          }, 600);
        }, 400);
      }
      events.debug.group('extCodeView', 'end');
    };

    ext.appendChild(extClose);
    ext.appendChild(extOpen);
    ext.appendChild(extBG);
    extHov.appendChild(extHovC);
    extHov.appendChild(extHovO);

    this.pre.appendChild(ext);
    this.pre.appendChild(extHov);

    this.root.style.display = 'none';
    this.root.style.opacity = '1';
  };
