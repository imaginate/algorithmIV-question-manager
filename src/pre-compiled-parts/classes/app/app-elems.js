  /**
   * -----------------------------------------------------
   * Public Class (AppElems)
   * -----------------------------------------------------
   * @desc The key DOM nodes for this app.
   * @constructor
   */
  var AppElems = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.root)
     * -----------------------------------------------
     * @desc The #aIV element.
     * @type {!Element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.sel)
     * -----------------------------------------------
     * @desc The #aIV-selections element.
     * @type {!Element}
     */
    this.sel;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.main)
     * -----------------------------------------------
     * @desc The #aIV-main element.
     * @type {!Element}
     */
    this.main;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.nav)
     * -----------------------------------------------
     * @desc The #aIV-nav element.
     * @type {!Element}
     */
    this.nav;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.ques)
     * -----------------------------------------------
     * @desc The #aIV-questions element.
     * @type {!Element}
     */
    this.ques;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.hold)
     * -----------------------------------------------
     * @desc The img.loader element.
     * @type {!Element}
     */
    this.hold;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.none)
     * -----------------------------------------------
     * @desc The section.empty element.
     * @type {!Element}
     */
    this.none;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.scrl)
     * -----------------------------------------------
     * @desc Saves the height of the browser's DOM loaded scrollbar.
     * @type {{ height: number }}
     * @struct
     */
    this.scrl;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.code)
     * -----------------------------------------------
     * @desc Saves values of the DOM loaded prettified list elements.
     * @type {{
     *   ol: { height: number },
     *   li: { height: number }
     * }}
     * @struct
     */
    this.code;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {?Element} */
    var elem;
    /** @type {?Element} */
    var code;
    /** @type {?Element} */
    var ol;
    /** @type {?Element} */
    var li;

    this.root = makeElem({ id: 'aIV', html: '<h1>Algorithm IV</h1>' });
    this.sel  = makeElem({
      tag      : 'nav',
      id       : 'aIV-selections',
      className: 'selections'
    });
    this.main = makeElem({ id: 'aIV-main', className: 'main' });
    this.nav  = makeElem({ tag: 'nav', id: 'aIV-nav' });
    this.ques = makeElem({
      tag      : 'section',
      id       : 'aIV-questions',
      className: 'questions'
    });
    this.hold = makeElem({ tag: 'img', className: 'loader' });
    this.none = makeElem({
      tag      : 'section',
      text     : 'No question(s) found.',
      className: 'empty'
    });

    this.hold.src = 'images/loading.gif';

    // Append the app's elements to their parents
    this.root.appendChild(this.sel);
    this.root.appendChild(this.main);
    this.main.appendChild(this.nav);
    this.main.appendChild(this.ques);
    this.ques.appendChild(this.hold);
    this.ques.appendChild(this.none);

    document.body.appendChild(this.root);

    // Setup the scrollbar details
    elem = makeElem({ className: 'aIV-scrollbar' });
    document.body.appendChild(elem);

    this.scrl = {};
    this.scrl.height = elem.offsetWidth - elem.clientWidth;
    freezeObj(this.scrl);

    document.body.removeChild(elem);

    // Setup the code element details
    elem = makeElem('pre');
    code = makeElem('code');
    ol   = makeElem('ol');
    li   = makeElem('li');

    elem.style.opacity = '0';

    setElemText(li, 'test');

    elem.appendChild(code);
    code.appendChild(ol);
    ol.appendChild(li);

    this.root.appendChild(elem);

    this.code = {};
    this.code.ol = {};
    this.code.li = {};
    this.code.ol.height = ol.offsetHeight - li.offsetHeight;
    this.code.li.height = li.offsetHeight;

    this.root.removeChild(elem);
    elem = null;
    code = null;
    ol   = null;
    li   = null;

    freezeObj(this.code);
    freezeObj(this.code.ol);
    freezeObj(this.code.li);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  AppElems.prototype.constructor = AppElems;

  /**
   * -----------------------------------------------
   * Public Method (AppElems.prototype.appendNav)
   * -----------------------------------------------
   * @desc Creates and appends the navigation elements.
   * @type {function()}
   */
  AppElems.prototype.appendNav = function() {

    /** @type {!Element} */
    var prev;
    /** @type {!Element} */
    var pArrow;
    /** @type {!Element} */
    var pBG;
    /** @type {!Element} */
    var pTitle;
    /** @type {!Element} */
    var next;
    /** @type {!Element} */
    var nArrow;
    /** @type {!Element} */
    var nBG;
    /** @type {!Element} */
    var nTitle;

    prev = makeElem({ className: 'prev' });
    next = makeElem({ className: 'next' });
    pBG  = makeElem({ className: 'bg' });
    nBG  = makeElem({ className: 'bg' });
    pTitle = makeElem({
      text     : 'Previous',
      className: 'title'
    });
    nTitle = makeElem({
      text     : 'Next',
      className: 'title'
    });
    pArrow = makeElem({
      id       : 'aIV-prev',
      text     : 'Previous',
      className: 'arrow'
    });
    nArrow = makeElem({
      id       : 'aIV-next',
      text     : 'Next',
      className: 'arrow'
    });

    pArrow.onclick = function() {
      Events.prev();
    };
    nArrow.onclick = function() {
      Events.next();
    };

    prev.appendChild(pArrow);
    prev.appendChild(pBG);
    prev.appendChild(pTitle);
    next.appendChild(nArrow);
    next.appendChild(nBG);
    next.appendChild(nTitle);

    this.nav.appendChild(prev);
    this.nav.appendChild(next);

  };

  /**
   * -------------------------------------------------
   * Public Method (AppElems.prototype.appendError)
   * -------------------------------------------------
   * @desc Creates and appends the error elements.
   * @type {function}
   */
  AppElems.prototype.appendError = function() {

    /** @type {string} */
    var errorMsg;
    /** @type {string} */
    var example;
    /** @type {number} */
    var exampleLineCount;
    /** @type {number} */
    var divHeight;
    /** @type {!Element} */
    var errorDiv;
    /** @type {!Element} */
    var h2;
    /** @type {!Element} */
    var p;
    /** @type {!Element} */
    var exampleDiv;
    /** @type {!Element} */
    var h3;
    /** @type {!Element} */
    var div;
    /** @type {!Element} */
    var pre;
    /** @type {!Element} */
    var code;
    /** @type {!Element} */
    var ol;

    errorMsg = '' +
      'Algorithm IV\'s question (or code sample) management app was '        +
      'initialized without any questions. Please ensure you correctly gave ' +
      'your settings to this app. The app should be initialized with '       +
      'an object that contains properties for all of your settings (see '    +
      'below). If this error persists please open an issue on our '          +
      '<a href="https://github.com/imaginate/algorithmiv/issues" '           +
      'class="dark">GitHub repository</a> or send an email to '              +
      '<a href="mailto:imagineadamsmith@gmail.com" class="dark">'            +
      'imagineadamsmith@gmail.com</a>. We will solve your problem or answer '+
      'your question as quickly as we can. We hope aIV\'s apps, tools, and ' +
      'libraries are able to help you maximize your development skills and ' +
      'projects!<br />'                                                      +
      '<span>Best,<br />'                                                    +
      '&ndash; Adam from Algorithm IV</span>';

    example = '' +
      '<li>' +
        '<span class="cmt">// Create an empty object for your settings</span>' +
      '</li>' +
      '<li>'  +
        '<span class="defKey">var</span> <span class="idt">settings</span> ' +
        '<span class="opr">=</span> <span class="brc">{}</span>'             +
        '<span class="smc">;</span>'                                         +
      '</li>' +
      '<li>&nbsp;</li>' +
      '<li>'  +
        '<span class="cmt">/*</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * If you want to change the default configuration' +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * settings, add sources, add categories, add'      +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * resources, or add questions simply add one or'   +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * all of the matching properties to your empty'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * settings object. Note that the names of your'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * properties must match the correct names for'     +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * each setting - config, sources, categories,'     +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * resources, and questions. You can get in-depth'  +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * details about creating a config, sources,'       +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * resources, categories, or questions object by'   +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * visiting ' + // ...v.com/docs.'                  +
          '<a href="http://www.algorithmiv.com/docs/questions"' +
          ' target="_blank">algorithmiv.com/docs</a>.' +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> */</span>' +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.config</span>     <span class="opr">=</sp' +
        'an> <span class="idt">yourConfig</span><span class="smc">;</span>'    +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.sources</span>    <span class="opr">=</sp' +
        'an> <span class="idt">yourSources</span><span class="smc">;</span>'   +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.categories</span> <span class="opr">=</sp' +
        'an> <span class="idt">yourCategories</span><span class="smc">;</span>'+
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.resources</span>  <span class="opr">=</sp' +
        'an> <span class="idt">yourResources</span><span class="smc">;</span>' +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.questions</span>  <span class="opr">=</sp' +
        'an> <span class="idt">yourQuestions</span><span class="smc">;</span>' +
      '</li>' +
      '<li>&nbsp;</li>' +
      '<li><span class="cmt">// Initialize Algorithm IV\'s app</span></li>'    +
      '<li>'  +
        '<span class="idt">aIV</span><span class="per">.</span><span class="'  +
        'idt">app</span><span class="brc">(</span><span class="idt">settings'  +
        '</span><span class="brc">)</span><span class="smc">;</span>'          +
      '</li>';

    exampleLineCount = 24;

    divHeight = exampleLineCount * app.elems.code.li.height;
    divHeight += app.elems.code.ol.height;

    // Create the error elements
    errorDiv = makeElem({ className: 'initError' });
    h2 = makeElem({ tag: 'h2', text: 'Initialization Error' });
    p  = makeElem({ tag: 'p' , html: errorMsg });

    // Create the example elements
    exampleDiv = makeElem({ className: 'initExample' });
    h3   = makeElem({ tag: 'h3', text: 'Correct Initialization Example' });
    div  = makeElem({ className: 'containExample' });
    pre  = makeElem('pre');
    code = makeElem('code');
    ol   = makeElem({ tag: 'ol', html: example });

    // Complete all dynamic formatting
    div.style.height = divHeight + 'px';

    // Append initError's children
    errorDiv.appendChild(h2);
    errorDiv.appendChild(p);
    errorDiv.appendChild(exampleDiv);
    exampleDiv.appendChild(h3);
    exampleDiv.appendChild(div);
    div.appendChild(pre);
    pre.appendChild(code);
    code.appendChild(ol);

    // Append initError to #aIV-questions
    this.ques.appendChild(errorDiv);

    // Hide the loader
    this.hold.style.display = 'none';

  };
