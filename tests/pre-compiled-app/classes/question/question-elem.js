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

    this.debug.group('addContent', 'coll', 'questionID= $$', Number(question.id));
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
     * @todo Add url parsing logic and remove need for using
     *   indexOf to find the subCatParent.
     * @param {Object} main - The question's main categories.
     * @param {Object} sub - The question's sub categories.
     * @private
     */
    function appendCategory(main, sub) {

      this.debug.start('appendCategory', main, sub);
      this.debug.args('appendCategory', main, 'object', sub, 'object');

      /** @type {boolean} */
      var config;
      /** @type {boolean} */
      var urlConfig;
      /** @type {elem} */
      var contain;
      /** @type {elem} */
      var div;
      /** @type {elem} */
      var h3;
      /** @type {elem} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {string} */
      var url;
      /** @type {elem} */
      var a;
      /** @type {stringMap} */
      var subCatParent;

      config = app.config.links.get('category');
      urlConfig = app.config.url.get('category');

      contain = document.createElement('div');
      contain.className = 'category';

      if (main.h3) {
        div = document.createElement('div');
        h3  = document.createElement('h3');
        p   = document.createElement('p');

        div.className  = 'mainCategory';

        if (testTextContent) {
          h3.textContent = main.h3;
          if (!config) {
            p.textContent = main.names.join(',');
          }
        }
        else {
          h3.innerHTML = main.h3;
          if (!config) {
            p.innerHTML = main.names.join(',');
          }
        }

        div.appendChild(h3);
        div.appendChild(p);

        contain.appendChild(div);

        if (config) {

          // Add each main category's anchor tag
          len = main.ids.length;
          i = -1;
          while (++i < len) {

            url = app.categories.get(main.ids[i], 'url');

            a = document.createElement('a');
            a.href = 'category/' + url;
            a.className = 'dark';
            if (testTextContent) {
              a.textContent = main.names[i];
            }
            else {
              a.innerHTML = main.names[i];
            }
            a.onclick = function() {

              events.debug.start('mainCat.onclick', mainCat);

              if (app.searchBar.vals.mainCat != main.ids[i]) {

                events.debug.group('mainCat.onclick', 'coll', 'mainCat= $$', mainCat);

                app.searchBar.vals.mainCat = main.ids[i];
                app.searchBar.updateSubCatOpts();
                app.updateDisplay();

                if (urlConfig) {
                  // ADD URL LOGIC HERE
                }

                events.debug.group('mainCat.onclick', 'end');
              }

              return false;
            };

            p.appendChild(a);
            p.innerHTML += ', ';
          }
        }
      }

      if (sub.h3) {
        div = document.createElement('div');
        h3  = document.createElement('h3');
        p   = document.createElement('p');

        div.className  = 'subCategory';

        if (testTextContent) {
          h3.textContent = sub.h3;
          if (!config) {
            p.textContent = sub.names.join(',');
          }
        }
        else {
          h3.innerHTML = sub.h3;
          if (!config) {
            p.innerHTML = sub.names.join(',');
          }
        }

        div.appendChild(h3);
        div.appendChild(p);

        contain.appendChild(div);

        if (config) {

          subCatParent = {};

          // Add the each sub category's anchor tag
          len = sub.ids.length;
          i = -1;
          while (++i < len) {

            // Set the subCatParent
            app.categories.ids.some(function(/** string */ catId) {
              /** @private */
              var category;
              /** @private */
              var subs;

              category = app.categories.get(catId);
              subs = category.get('subs');
              if (subs && subs.indexOf(sub.ids[i]) !== -1) {
                subCatParent.id   = catId;
                subCatParent.url  = category.get('url');
                subCatParent.name = category.get('name');
                return true;
              }
              return false;
            });

            url = app.categories.get(sub.ids[i], 'url');

            a = document.createElement('a');
            a.href = 'category/' + subCatParent.url + '/' + url;
            a.className = 'dark';
            if (testTextContent) {
              a.textContent = sub.names[i];
            }
            else {
              a.innerHTML = sub.names[i];
            }
            a.onclick = function() {

              events.debug.start('subCat.onclick', subCat);

              if (app.searchBar.vals.subCat != sub.ids[i]) {

                events.debug.group('subCat.onclick', 'coll', 'subCat= $$', subCat);

                // Check the main category and update the values and options
                if (app.searchBar.vals.mainCat !== 'all' ||
                    app.searchBar.vals.mainCat !== subCatParent.id) {
                  app.searchBar.vals.mainCat = 'all';
                  app.searchBar.updateSubCatOpts(sub.ids[i]);
                }
                else {
                  app.searchBar.vals.subCat = sub.ids[i];
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

            p.appendChild(a);
            p.innerHTML += ', ';
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
      var div;
      /** @type {elem} */
      var pre;
      /** @type {elem} */
      var code;
      /** @type {elem} */
      var ol;
      /** @type {number} */
      var overflow;
      /** @type {number} */
      var scrollbar;
      /** @type {number} */
      var height;

      contain  = document.createElement('div');
      h3       = document.createElement('h3');
      div      = document.createElement('div');
      pre      = document.createElement('pre');
      code     = document.createElement('code');
      ol       = document.createElement('ol');

      contain.className = 'solution';
      div.className     = 'preContain';

      ol.innerHTML = solution.prettyCode;

      if (testTextContent) {
        h3.textContent = 'Solution:';
      }
      else {
        h3.innerHTML = 'Solution:';
      }

      height = solution.lineCount * app.elems.code.li.height;
      height += app.elems.code.ol.height;
      div.style.height = height + 'px';

      contain.appendChild(h3);
      contain.appendChild(div);
      div.appendChild(pre);
      pre.appendChild(code);
      code.appendChild(ol);

      root.appendChild(contain);

      overflow = code.scrollWidth - code.clientWidth;

      if (overflow) {

        appendCodeExt.call(this, div, overflow);

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

      this.debug.start('appendCodeExt', div, overflow);
      this.debug.args('appendCodeExt', div, 'elem', overflow, 'number');

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
        ext.style.opacity = '1';
      };

      extOpen.onmouseout = function() {
        ext.style.opacity = '0';
      };

      extOpen.onclick = function() {

        events.debug.start('extCodeView');

        /** @type {number} */
        var newWidth;

        newWidth = String(code.style.width);
        newWidth = newWidth.replace(/[^0-9\.\-]/g, '');
        newWidth = Number(newWidth);

        if (extOpen.innerHTML === 'close') {

          extClose.style.opacity = '0.0';

          ext.style.right = '-4px';

          newWidth -= overflow;
          code.style.width = newWidth + 'px';

          setTimeout(function() {
            extOpen.style.opacity = '0.8';
            setTimeout(function() {
              if (testTextContent) {
                extOpen.textContent = 'open';
              }
              else {
                extOpen.innerHTML = 'open';
              }
              extHovC.style.display = 'none';
              extHovO.style.display = 'block';
            }, 600);
          }, 400);
        }
        else if (extOpen.innerHTML === 'open') {

          extOpen.style.opacity = '0.0';

          ext.style.right = '-' + (4 + overflow) + 'px';

          newWidth += overflow;
          code.style.width = newWidth + 'px';

          setTimeout(function() {
            extClose.style.opacity = '0.8';
            setTimeout(function() {
              if (testTextContent) {
                extOpen.textContent = 'close';
              }
              else {
                extOpen.innerHTML = 'close';
              }
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

      this.debug.start('appendOutput', links);
      this.debug.args('appendOutput', links, 'objects');

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
