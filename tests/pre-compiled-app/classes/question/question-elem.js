  /**
   * -----------------------------------------------------
   * Public Class (QuestionElem)
   * -----------------------------------------------------
   * @desc An object containing the question's html element.
   * @param {number} id - The id of the question.
   * @constructor
   */
  var QuestionElem = function(id) {

    this.debug = aIV.debug('QuestionElem');

    this.debug.start('init', id);

    this.debug.args('init', id, 'number');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.root)
     * -----------------------------------------------
     * @desc The question's root element.
     * @type {Element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {Element}
     */
    this.info;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.solution)
     * -----------------------------------------------
     * @desc The question's div.solution element.
     * @type {Element}
     */
    this.solution;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.pre)
     * -----------------------------------------------
     * @desc The question's div.preContain element.
     * @type {Element}
     */
    this.pre;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.code)
     * -----------------------------------------------
     * @desc The question's code element.
     * @type {Element}
     */
    this.code;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.root = makeElem({
      tag      : 'section',
      id       : 'aIV-q' + id,
      className: 'question'
    });
    this.info = makeElem({ className: 'info' });

    this.root.appendChild(this.info);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

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

    /** @type {Element} */
    var root;
    /** @type {Element} */
    var info;

    root = this.root;
    info = this.info;

    // Append all the sections of the question
    // Note: See the below private helper methods for more details

    if (question.id) {
      appendId.call(this, question.id, question.url);
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

    // Close this debug console group
    this.debug.group('addContent', 'end');

    /**
     * ---------------------------------------------
     * Private Method (appendId)
     * ---------------------------------------------
     * @desc Appends the question id.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @private
     */
    function appendId(id, url) {

      this.debug.start('appendId', id, url);
      this.debug.args('appendId', id, 'string', url, 'string');

      /** @type {boolean} */
      var config;
      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {Element} */
      var a;

      config = app.config.links.get('id');

      div = makeElem({ className: 'idContain' });
      h3  = makeElem({ tag: 'h3', text: 'Question:' });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, id);
      }


      // Add the anchor link
      if (config) {
        a = makeIdLink.call(this, id, url);
        p.appendChild(a);
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        this.debug.state('appendId', debugMsg, p, a, a.onclick);
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);
    }

    /**
     * ---------------------------------------------
     * Private Method (makeIdLink)
     * ---------------------------------------------
     * @desc Creates an anchor element for the question id.
     * @param {string} id - The question id.
     * @param {string} url - The question id url.
     * @return {Element} The anchor element.
     * @private
     */
    function makeIdLink(id, url) {

      this.debug.start('makeIdLink', id, url);
      this.debug.args('makeIdLink', id, 'string', url, 'string');

      /** @type {Element} */
      var a;

      if (!url) {
        url = Number(id);
      }

      a = makeElem({ tag: 'a', text: id });
      a.href = 'id/' + url;
      a.onclick = (function(id) {
        return function onclick(event) {
          Events.linkId(id);
          event && event.preventDefault && event.preventDefault();
          return false;
        };
      })( Number(id) );

      return a;
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
      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {Element} */
      var a;

      config = app.config.links.get('source');

      div = makeElem({ className: 'source' });
      h3  = makeElem({ tag: 'h3', text: 'Source:' });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, source.name);
      }

      info.appendChild(div);
      div.appendChild(h3);
      div.appendChild(p);

      // Add the anchor link
      if (config) {
        a = makeSourceLink.call(this, source.id, source.name);
        p.appendChild(a);
        debugMsg = 'p= $$, a= $$, a.onclick= $$';
        this.debug.state('appendSource', debugMsg, p, a, a.onclick);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeSourceLink)
     * ---------------------------------------------
     * @desc Creates an anchor element for the question's source.
     * @param {string} id - The source's id.
     * @param {string} name - The source's name.
     * @return {Element} The anchor element.
     * @private
     */
    function makeSourceLink(id, name) {

      this.debug.start('makeSourceLink', id, name);
      this.debug.args('makeSourceLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {Element} */
      var a;

      url = app.sources.get(id, 'url');

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'source/' + url;
      a.onclick = (function(id) {
        return function onclick(event) {
          Events.linkSource(id);
          event && event.preventDefault && event.preventDefault();
          return false;
        };
      })(id);

      return a;
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

      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      div = makeElem({ className: 'stage' });
      h3  = makeElem({ tag: 'h3', text: 'Completed:' });
      p   = makeElem({ tag: 'p' , text: complete });

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

      /** @type {Element} */
      var contain;
      /** @type {Element} */
      var mainDiv;
      /** @type {Element} */
      var subDiv;

      contain = makeElem({ className: 'category' });

      // Add the main categories
      if (main.h3) {
        mainDiv = makeElem({ className: 'mainCategory' });
        appendMainCategories.call(this, main, mainDiv);
        contain.appendChild(mainDiv);
      }

      // Add the sub categories
      if (sub.h3) {
        subDiv = makeElem({ className: 'subCategory' });
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
     * @param {Element} div - The DOM container for the main categories.
     * @private
     */
    function appendMainCategories(main, div) {

      this.debug.start('appendMainCategories', main, div);
      this.debug.args('appendMainCategories', main, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {Element} */
      var a;

      config = app.config.links.get('category');

      h3  = makeElem({ tag: 'h3', text: main.h3 });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, main.names.join(', '));
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each main category's anchor tag
      if (config) {
        len = main.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeMainCatLink.call(this, main.ids[i], main.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeElem({ tag: 'span', html: ',&nbsp;&nbsp;' }) );
          }
        }
        this.debug.state('appendMainCategories', 'p= $$', p);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (appendSubCategories)
     * ---------------------------------------------
     * @desc Appends the question's sub categories.
     * @param {Object} sub - The question's sub categories.
     * @param {Element} div - The DOM container for the sub categories.
     * @private
     */
    function appendSubCategories(sub, div) {

      this.debug.start('appendSubCategories', sub, div);
      this.debug.args('appendSubCategories', sub, 'object', div, 'elem');

      /** @type {boolean} */
      var config;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {Element} */
      var a;

      config = app.config.links.get('category');

      h3  = makeElem({ tag: 'h3', text: sub.h3 });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, sub.names.join(', '));
      }

      div.appendChild(h3);
      div.appendChild(p);

      // Add each sub category's anchor tag
      if (config) {
        len = sub.ids.length;
        last = len - 1;
        i = -1;
        while (++i < len) {
          a = makeSubCatLink.call(this, sub.ids[i], sub.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeElem({ tag: 'span', html: ',&nbsp;&nbsp;' }) );
          }
        }
        this.debug.state('appendSubCategories', 'p= $$', p);
      }
    }

    /**
     * ---------------------------------------------
     * Private Method (makeMainCatLink)
     * ---------------------------------------------
     * @desc Creates a main category link.
     * @param {string} id - The main category's id.
     * @param {string} name - The main category's name.
     * @return {Element} The anchor link.
     * @private
     */
    function makeMainCatLink(id, name) {

      this.debug.start('makeMainCatLink', id, name);
      this.debug.args('makeMainCatLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {Element} */
      var a;

      url = app.categories.get(id, 'url');

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'category/' + url;
      a.onclick = (function(id) {
        return function onclick(event) {
          Events.linkMainCat(id);
          event && event.preventDefault && event.preventDefault();
          return false;
        };
      })(id);

      debugMsg = 'a= $$, a.onclick= $$';
      this.debug.state('makeMainCatLink', debugMsg, a, a.onclick);

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
     * @return {Element} The anchor link.
     * @private
     */
    function makeSubCatLink(id, name) {

      this.debug.start('makeSubCatLink', id, name);
      this.debug.args('makeSubCatLink', id, 'string', name, 'string');

      /** @type {string} */
      var url;
      /** @type {Element} */
      var a;
      /** @type {string} */
      var parentId;
      /** @type {string} */
      var parentUrl;

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

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'category/' + parentUrl + '/' + url;
      a.onclick = (function(id, parentId) {
        return function onclick(event) {
          Events.linkSubCat(id, parentId);
          event && event.preventDefault && event.preventDefault();
          return false;
        };
      })(id, parentId);

      debugMsg = 'a= $$, a.onclick= $$';
      this.debug.state('makeSubCatLink', debugMsg, a, a.onclick);

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

      /** @type {string} */
      var content;
      /** @type {string} */
      var title;
      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      title = (problem) ? 'Problem:' : 'Description:';
      content = (problem) ? problem : descr;

      div = makeElem({ className: 'problem' });
      h3  = makeElem({ tag: 'h3', text: title });
      p   = makeElem({ tag: 'p' , html: content });

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

      /** @type {Element} */
      var contain;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var preDiv;
      /** @type {Element} */
      var pre;
      /** @type {Element} */
      var code;
      /** @type {Element} */
      var ol;
      /** @type {number} */
      var height;

      contain  = makeElem({ className: 'solution' });
      h3       = makeElem({ tag: 'h3', text: 'Solution:' });
      preDiv   = makeElem({ className: 'preContain' });
      pre      = makeElem('pre');
      code     = makeElem('code');
      ol       = makeElem({ tag: 'ol', html: solution.prettyCode });

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

      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      div = makeElem({ className: 'output' });
      h3  = makeElem({ tag: 'h3', text: 'Output:' });
      p   = makeElem({ tag: 'p' , html: output });

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

      /** @type {Element} */
      var div;
      /** @type {Element} */
      var h3;
      /** @type {Element} */
      var p;

      div = makeElem({ className: 'links' });
      h3  = makeElem({ tag: 'h3', text: 'Links:' });
      p   = makeElem('p');

      div.appendChild(h3);
      div.appendChild(p);

      links.forEach(function(/** Object */ linkObj) {
        /** @type {Element} */
        var a;

        a = makeElem({ tag: 'a', text: linkObj.name });
        a.href = linkObj.href;
        a.target = '_blank';
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

    this.debug.start('addCodeExt');

    /** @type {number} */
    var overflow;
    /** @type {number} */
    var scrollbar;
    /** @type {Element} */
    var code;
    /** @type {Element} */
    var ext;
    /** @type {Element} */
    var extClose;
    /** @type {Element} */
    var extOpen;
    /** @type {Element} */
    var extBG;
    /** @type {Element} */
    var extHov;
    /** @type {Element} */
    var extHovC;
    /** @type {Element} */
    var extHovO;

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

    ext      = makeElem({ className: 'extContain' });
    extClose = makeElem({ className: 'extCloseArrow' });
    extOpen  = makeElem({ className: 'extOpenArrow', text: 'open' });
    extBG    = makeElem({ className: 'extBG' });
    extHov   = makeElem({ className: 'extHover' });
    extHovC  = makeElem({
      tag      : 'span',
      className: 'closeExt',
      text     : 'Close Extended Code View'
    });
    extHovO  = makeElem({
      tag      : 'span',
      className: 'openExt',
      text     : 'Extend Code View'
    });

    extOpen.onmouseover = function() {
      extHov.style.opacity = '1';
    };

    extOpen.onmouseout = function() {
      extHov.style.opacity = '0';
    };

    extOpen.onclick = (function(overflow, code, ext, extOpen,
                                extClose, extHovO, extHovC) {
      /** @type {elementMap} */
      var elems;

      elems = {
        code    : code,
        ext     : ext,
        extOpen : extOpen,
        extClose: extClose,
        extHovO : extHovO,
        extHovC : extHovC
      };
      freezeObj(elems);

      return function() {
        Events.extCodeView(overflow, elems);
      };
    })(overflow, code, ext, extOpen, extClose, extHovO, extHovC);

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
