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
   *   source  : {
   *     id  : string,
   *     name: string
   *   },
   *   mainCat : {
   *     ids  : strings,
   *     h3   : string,
   *     names: strings
   *   },
   *   subCat  : {
   *     ids  : strings,
   *     h3   : string,
   *     names: strings
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

    // Append all the sections of the question
    // Note: See the below private helper methods for more details

    if (question.id) {
      appendID(question.id, question.url);
    }

    if (question.source.name) {
      appendSource(question.source);
    }

    if (question.complete) {
      appendComplete(question.complete);
    }

    if (!!question.mainCat.h3 || !!question.subCat.h3) {
      appendCategory(question.mainCat, question.subCat);
    }

    if (question.problem || question.descr) {
      appendProblem(question.problem, question.descr);
    }

    if (question.solution) {
      appendSolution(question.solution);
    }

    if (question.output) {
      appendOutput(question.output);
    }

    if (question.links.length) {
      appendLinks(question.links);
    }


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
        that.debug.args('appendID', id, 'string', url, 'string');
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
                app.config.searchBar.links.get('id'));

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

        url = url || Number(id);

        a = document.createElement('a');
        a.href = '/id/' + url;
        // ADD URL LOGIC HERE ******
        //a.href = app.url + '/id/' + url;
        // TO HERE *****************
        a.textContent = id;
        a.onclick = function() {
          DEBUG && debug.group('QuestionElem.id.onclick', 'coll', 'id= $$', id);

          app.moveDisplay(id);
          // ADD URL LOGIC HERE ******

          DEBUG && debug.group('QuestionElem.id.onclick', 'end');
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
     * @param {Object} source - The id and name of the source.
     * @private
     */
    function appendSource(source) {

      if (DEBUG) {
        that.debug.start('appendSource', source);
        that.debug.args('appendSource', source, 'object');
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
                app.config.searchBar.links.get('source'));

      div = document.createElement('div');
      h3  = document.createElement('h3');
      p   = document.createElement('p');

      div.className = 'source';

      h3.textContent = 'Source:';
      p.textContent  = source.name;

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      if (config) {

        p.textContent = '';

        a = document.createElement('a');
        a.href = 'javascript: void(0);';
        a.className = 'dark';
        a.textContent = source.name;
        a.onclick = function() {
          if (app.searchBar.vals.source != source.id) {
            // Debugging
            var args;
            if (DEBUG) {
              args = [ 'QuestionElem.source.onclick' ];
              args.push('coll', 'source= $$', source);
              debug.group(args);
            }

            app.searchBar.vals.source = source.id;
            app.updateDisplay();

            DEBUG && debug.group('QuestionElem.source.onclick', 'end');
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
       * @type {boolean}
       * @private
       */
      var config;
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
      /**
       * @type {num}
       * @private
       */
      var i;
      /**
       * @type {string}
       * @private
       */
      var url;
      /**
       * @type {elem}
       * @private
       */
      var a;
      /**
       * @type {Object}
       * @private
       */
      var subParent;

      config = (app.config.get('showLinks') &&
                app.config.searchBar.links.get('category'));

      contain = document.createElement('div');
      contain.className = 'category';

      if (!!main.h3) {
        div = document.createElement('div');
        h3  = document.createElement('h3');
        p   = document.createElement('p');

        div.className  = 'mainCategory';
        h3.textContent = main.h3;
        p.textContent  = main.names.join(',');

        div.appendChild(h3);
        div.appendChild(p);

        contain.appendChild(div);

        if (config) {
          p.textContent = '';

          main.ids.reverse();
          main.names.reverse();

          // Add the each main category's anchor tag
          i = main.ids.length;
          while (i--) {
            a = document.createElement('a');
            url = app.categories.get(main.ids[i]).get('url');
            a.href = '/category/' + url;
            // ADD URL LOGIC HERE ******
            //a.href = app.url + '/category/' + url;
            // TO HERE *****************
            a.className = 'dark';
            a.textContent = main.names[i];
            a.onclick = function() {
              if (app.searchBar.vals.mainCat != main.ids[i]) {
                // Debugging
                var args;
                if (DEBUG) {
                  args = [ 'QuestionElem.mainCat.onclick' ];
                  args.push('coll', 'mainCat= $$', mainCat);
                  debug.group(args);
                }

                app.searchBar.vals.mainCat = main.ids[i];
                app.searchBar.updateSubCatOpts();
                app.updateDisplay();

                DEBUG && debug.group('QuestionElem.mainCat.onclick', 'end');
              }
              return false;
            };

            p.appendChild(a);
          }
        }
      }

      if (!!sub.h3) {
        div = document.createElement('div');
        h3  = document.createElement('h3');
        p   = document.createElement('p');

        div.className  = 'subCategory';
        h3.textContent = sub.h3;
        p.textContent  = sub.names.join(',');

        div.appendChild(h3);
        div.appendChild(p);

        contain.appendChild(div);

        if (config) {
          p.textContent = '';

          sub.ids.reverse();
          sub.names.reverse();
          subParent = {};

          // Add the each sub category's anchor tag
          i = sub.ids.length;
          while (i--) {
            app.categories.some(function(/** string */ id) {
              /** @private */
              var category;
              /** @private */
              var subs;

              category = app.categories.get(id);
              subs = category.get('subs');
              if (subs && !!subs[ sub.ids[i] ]) {
                subParent.id = id;
                subParent.url = category.get('url');
                subParent.name = category.get('name');
                return true;
              }
              return false;
            });
            a = document.createElement('a');
            url = app.categories.get(sub.ids[i]).get('url');
            a.href = '/category/' + subParent.url + '/' + url;
            // ADD URL LOGIC HERE ******
            //a.href = app.url + '/category/' + subParent.url + '/' + url;
            // TO HERE *****************
            a.className = 'dark';
            a.textContent = sub.names[i];
            a.onclick = function() {
              if (app.searchBar.vals.subCat != sub.ids[i]) {
                // Debugging
                var args;
                if (DEBUG) {
                  args = [ 'QuestionElem.subCat.onclick' ];
                  args.push('coll', 'subCat= $$, subParent= $$');
                  args.push(subCat, subParent);
                  debug.group(args);
                }

                // Check the main category and update the values and options
                if (app.searchBar.vals.mainCat !== 'all' ||
                    app.searchBar.vals.mainCat !== subParent.id) {
                  app.searchBar.vals.mainCat === 'all';
                  app.searchBar.updateSubCatOpts(sub.ids[i]);
                }
                else {
                  app.searchBar.vals.subCat = sub.ids[i];
                }

                // Finish the display update
                app.updateDisplay();

                DEBUG && debug.group('QuestionElem.subCat.onclick', 'end');
              }

              return false;
            };

            p.appendChild(a);
          }
        }
      }

      root.appendChild(contain);
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

      if (DEBUG) {
        that.debug.start('appendProblem', problem, descr);
        that.debug.args('appendProblem', problem, 'string', descr, 'string');
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

      div.className = 'problem';

      if (problem) {
        h3.textContent = 'Problem:';
        p.innerHTML  = problem;
      }
      else {
        h3.textContent = 'Description:';
        p.innerHTML  = descr;
      }

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

      if (DEBUG) {
        that.debug.start('appendSolution', solution);
        that.debug.args('appendSolution', solution, 'object');
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
      var h3;
      /**
       * @type {elem}
       * @private
       */
      var div;
      /**
       * @type {elem}
       * @private
       */
      var pre;
      /**
       * @type {elem}
       * @private
       */
      var code;
      /**
       * @type {elem}
       * @private
       */
      var ol;
      /**
       * @type {number}
       * @private
       */
      var overflow;
      /**
       * @type {number}
       * @private
       */
      var scrollbar;

      contain  = document.createElement('div');
      h3       = document.createElement('h3');
      div      = document.createElement('div');
      pre      = document.createElement('pre');
      code     = document.createElement('code');
      ol       = document.createElement('ol');

      contain.className = 'solution';
      div.className     = 'preContain';

      ol.innerHTML = solution.code;

      h3.textContent = 'Solution:';

      div.style.height = solution.height + 'px';

      contain.appendChild(h3);
      contain.appendChild(div);
      div.appendChild(pre);
      pre.appendChild(code);
      code.appendChild(ol);

      root.appendChild(contain);

      overflow = code.scrollWidth - code.clientWidth;

      if (overflow) {

        appendCodeExt(div, overflow);

        scrollbar = app.elems.scrl.height;
        if (scrollbar) {
          contain.style.padding = '0 0 ' + scrollbar + 'px';
        }
      }

      root.style.display = 'none';
      root.style.opacity = '1';
    }

    /**
     * ---------------------------------------------
     * Private Method (appendCodeExt)
     * ---------------------------------------------
     * @desc Appends the code view extender for the question's solution.
     * @param {elem} div - The div container for the code.
     * @param {number} overflow - The number of pixels to extend the code view by.
     * @private
     */
    function appendCodeExt(div, overflow) {

      if (DEBUG) {
        that.debug.start('appendCodeExt', div, overflow);
        that.debug.args('appendCodeExt', div, 'elem', overflow, 'number');
      }

      /**
       * @type {elem}
       * @private
       */
      var ext;
      /**
       * @type {elem}
       * @private
       */
      var extClose;
      /**
       * @type {elem}
       * @private
       */
      var extOpen;
      /**
       * @type {elem}
       * @private
       */
      var extBG;
      /**
       * @type {elem}
       * @private
       */
      var extHov;
      /**
       * @type {elem}
       * @private
       */
      var extHovC;
      /**
       * @type {elem}
       * @private
       */
      var extHovO;

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

      extOpen.textContent = 'open';
      extHovC.textContent = 'Close Extended Code View';
      extHovO.textContent = 'Extend Code View';  

      extOpen.onmouseover = function() {
        ext.style.opacity = '1';
      };

      extOpen.onmouseout = function() {
        ext.style.opacity = '0';
      };

      extOpen.onclick = function() {

        DEBUG && that.debug.start('extCodeView');

        /**
         * @type {number}
         * @private
         */
        var newWidth;

        newWidth = String(code.style.width);
        newWidth = newWidth.replace(/[^0-9\.\-]/g, '');
        newWidth = Number(newWidth);

        if (extOpen.textContent === 'close') {

          extClose.style.opacity = '0.0';

          ext.style.right = '-4px';

          newWidth -= overflow;
          code.style.width = newWidth + 'px';

          setTimeout(function() {
            extOpen.style.opacity = '0.8';
            setTimeout(function() {
              extOpen.textContent = 'open';
              extHovC.style.display = 'none';
              extHovO.style.display = 'block';
            }, 600);
          }, 400);
        }
        else if (extOpen.textContent === 'open') {

          extOpen.style.opacity = '0.0';

          ext.style.right = '-' + (4 + overflow) + 'px';

          newWidth += overflow;
          code.style.width = newWidth + 'px';

          setTimeout(function() {
            extClose.style.opacity = '0.8';
            setTimeout(function() {
              extOpen.textContent = 'close';
              extHovO.style.display = 'none';
              extHovC.style.display = 'block';
            }, 600);
          }, 400);
        }
      };

      ext.appendChild(extClose);
      ext.appendChild(extOpen);
      ext.appendChild(extBG);
      extHov.appendChild(extHovC);
      extHov.appendChild(extHovO);

      div.appendChild(ext);
      div.appendChild(extHov);
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

      if (DEBUG) {
        that.debug.start('appendOutput', output);
        that.debug.args('appendOutput', output, 'string');
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

      div.className = 'output';

      h3.textContent = 'Output:';

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

      if (DEBUG) {
        that.debug.start('appendOutput', links);
        that.debug.args('appendOutput', links, 'objects');
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

      div.className = 'links';

      h3.textContent = 'Links:';

      div.appendChild(h3);
      div.appendChild(p);

      links.forEach(function(/** Object */ l) {
        /**
         * @type {elem}
         * @private
         */
        var a;

        a = document.createElement('a');
        a.href = l.href;
        a.target = '_blank';
        a.textContent = l.name;
        p.appendChild(a);
      });

      root.appendChild(div);
    }
  };
