  /**
   * -----------------------------------------------------
   * Public Class (AppElems)
   * -----------------------------------------------------
   * @desc The key DOM nodes for this app.
   * @constructor
   */
  var AppElems = function() {

    /**
     * ---------------------------------------------------
     * Private Property (AppElems.debug)
     * ---------------------------------------------------
     * @type {?Debug}
     */
    this.debug = (DEBUG) ? new Debug('AppElems') : null;

    DEBUG && this.debug.start('init');

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.root)
     * -----------------------------------------------
     * @desc The #aIV element.
     * @type {elem}
     */
    this.root = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.sel)
     * -----------------------------------------------
     * @desc The #aIV-selections element.
     * @type {elem}
     */
    this.sel = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.main)
     * -----------------------------------------------
     * @desc The #aIV-main element.
     * @type {elem}
     */
    this.main = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.nav)
     * -----------------------------------------------
     * @desc The #aIV-nav element.
     * @type {elem}
     */
    this.nav = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.ques)
     * -----------------------------------------------
     * @desc The #aIV-questions element.
     * @type {elem}
     */
    this.ques = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.hold)
     * -----------------------------------------------
     * @desc The img.loader element.
     * @type {elem}
     */
    this.hold = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.none)
     * -----------------------------------------------
     * @desc The section.empty element.
     * @type {elem}
     */
    this.none = null;

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.scrl)
     * -----------------------------------------------
     * @desc Saves the height of the browser's DOM loaded scrollbar.
     * @type {{
     *   height: number
     * }}
     * @struct
     */
    this.scrl = {
      height: 0
    };

    /**
     * ----------------------------------------------- 
     * Public Property (AppElems.code)
     * -----------------------------------------------
     * @desc Saves values of the DOM loaded prettified list elements.
     * @type {{
     *   ol: {
     *     height: number
     *   },
     *   li: {
     *     height: number
     *   }
     * }}
     * @struct
     
     */
    this.code = {
      ol: {
        height: 0
      },
      li: {
        height: 0
      }
    };
  };

  // Ensure constructor is set to this class.
  AppElems.prototype.constructor = AppElems;

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
     * @type {elem}
     * @private
     */
    var h1;

    this.root = document.createElement('div');
    h1 = document.createElement('h1');
    this.sel  = document.createElement('nav');
    this.main = document.createElement('div');
    this.nav  = document.createElement('nav');
    this.ques = document.createElement('section');
    this.hold = document.createElement('img');
    this.none = document.createElement('section');

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

    h1.textContent = 'Algorithm IV';
    this.none.textContent = 'No question(s) found.';

    this.hold.src = 'images/loading.gif';

    this.root.appendChild(h1);
    this.root.appendChild(this.sel);
    this.root.appendChild(this.main);
    this.main.appendChild(this.nav);
    this.main.appendChild(this.ques);
    this.ques.appendChild(this.hold);
    this.ques.appendChild(this.none);

    document.body.appendChild(this.root);
  };

  /**
   * -----------------------------------------------
   * Public Method (AppElems.prototype.appendNav)
   * -----------------------------------------------
   * @desc Creates and appends the navigation elements.
   * @type {function()}
   */
  AppElems.prototype.appendNav = function() {

    DEBUG && this.debug.start('appendNav');

    /**
     * @type {elem}
     * @private
     */
    var prev;
    /**
     * @type {elem}
     * @private
     */
    var pArrow;
    /**
     * @type {elem}
     * @private
     */
    var pBG;
    /**
     * @type {elem}
     * @private
     */
    var pTitle;
    /**
     * @type {elem}
     * @private
     */
    var next;
    /**
     * @type {elem}
     * @private
     */
    var nArrow;
    /**
     * @type {elem}
     * @private
     */
    var nBG;
    /**
     * @type {elem}
     * @private
     */
    var nTitle;

    prev   = document.createElement('div');
    pArrow = document.createElement('div');
    pBG    = document.createElement('div');
    pTitle = document.createElement('div');
    next   = document.createElement('div');
    nArrow = document.createElement('div');
    nBG    = document.createElement('div');
    nTitle = document.createElement('div');

    pArrow.id = 'aIV-prev';
    nArrow.id = 'aIV-next';

    prev.className = 'prev';
    next.className = 'next';
    pArrow.className = nArrow.className = 'arrow';
    pBG.className    = nBG.className    = 'bg';
    pTitle.className = nTitle.className = 'title';

    pTitle.textContent = pArrow.textContent = 'Previous';
    nTitle.textContent = nArrow.textContent = 'Next';

    pArrow.onclick = function() {
      DEBUG && debug.group('prev.onclick', 'coll');
      app.moveDisplay('prev');
      DEBUG && debug.group('prev.onclick', 'end');
    };
    nArrow.onclick = function() {
      DEBUG && debug.group('next.onclick', 'coll');
      app.moveDisplay('next');
      DEBUG && debug.group('next.onclick', 'end');
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
   * ------------------------------------------------------
   * Public Method (AppElems.prototype.setScrollbarHeight)
   * ------------------------------------------------------
   * @desc Saves the width of the browser's scrollbar.
   * @type {function()}
   */
  AppElems.prototype.setScrollbarHeight = function() {

    DEBUG && this.debug.start('setScrollbarHeight');

    /**
     * @type {elem}
     * @private
     */
    var div;

    div = document.createElement('div');
    div.className = 'aIV-scrollbar';
    document.body.appendChild(div);

    this.scrl.height = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);
  };

  /**
   * -----------------------------------------------------
   * Public Method (AppElems.prototype.setCodeListHeight)
   * -----------------------------------------------------
   * @desc Saves the height for list and list items in code elements.
   * @type {function()}
   */
  AppElems.prototype.setCodeListHeight = function() {

    DEBUG && this.debug.start('setCodeListHeight');

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
     * @type {elem}
     * @private
     */
    var li;

    pre  = document.createElement('pre');
    code = document.createElement('code');
    ol   = document.createElement('ol');
    li   = document.createElement('li');

    pre.style.opacity = '0';

    li.textContent = 'test';

    pre.appendChild(code);
    code.appendChild(ol);
    ol.appendChild(li);

    this.root.appendChild(pre);

    this.code.ol.height = ol.offsetHeight - li.offsetHeight;
    this.code.li.height = li.offsetHeight;

    this.root.removeChild(pre);
  };

  /**
   * -------------------------------------------------
   * Public Method (AppElems.prototype.appendError)
   * -------------------------------------------------
   * @desc Creates and appends the error elements.
   * @type {function()}
   */
  AppElems.prototype.appendError = function() {

    DEBUG && this.debug.start('appendError');

    /**
     * @type {string}
     * @private
     */
    var errorMsg;
    /**
     * @type {string}
     * @private
     */
    var example;
    /**
     * @type {num}
     * @private
     */
    var exampleLineCount;
    /**
     * @type {num}
     * @private
     */
    var divHeight;
    /**
     * @type {elem}
     * @private
     */
    var errorDiv;
    /**
     * @type {elem}
     * @private
     */
    var h2;
    /**
     * @type {elem}
     * @private
     */
    var p;
    /**
     * @type {elem}
     * @private
     */
    var exampleDiv;
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

    errorMsg = '' +
      'Algorithm IV\'s question (or code sample) management app was '        +
      'initialized without any questions. Please ensure you correctly gave ' +
      'your settings to this app. The app should be initialized with '       +
      'an object that contains properties for all of your settings (see '    +
      'below). If this error persists please open an issue with '            +
      '<a href="https://github.com/imaginate/algorithmiv/issues" '           +
      'class="dark">aIV on GitHub</a> or send an email to <a href="mailto:'  +
      'learn@algorithmiv.com" class="dark">learn@algorithmiv.com</a>. We '   +
      'will solve your problem or answer your question as quickly as we '    +
      'can. We hope aIV\'s apps, tools, and libraries are able to help you ' +
      'maximize your development skills and projects!&NewLine;'              +
      'Best,&NewLine;'                                                       +
      '&ndash; Adam from Algorithm IV';
//aIV.app({ config: yourConfig, sources: yourSources, categories: yourCategories, questions: yourQuestions })

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
        '<span class="cmt"> * settings, add sources, add categories, or add'   +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * questions simply add one or all of the matching' +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * properties to your empty settings object. Note'  +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * that the names of your properties must match'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * the correct names for each setting - config,'    +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * sources, categories, and questions. You can'     +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * get in-depth details about creating a config,'   +
        '</span>' +
      '</li>' +
      '<li>'  +
        '<span class="cmt"> * sources, categories, or questions object by'     +
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
        '<span class="idt">settings.config</span> <span class="opr">=</span> ' +
        '<span class="idt">yourConfig</span><span class="smc">;</span>'        +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.sources</span> <span class="opr">=</span>' +
        ' <span class="idt">yourSources</span><span class="smc">;</span>'      +
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.categories</span> <span class="opr">=</sp' +
        'an> <span class="idt">yourCategories</span><span class="smc">;</span>'+
      '</li>' +
      '<li>'  +
        '<span class="idt">settings.questions</span> <span class="opr">=</sp'  +
        'an> <span class="idt">yourQuestions</span><span class="smc">;</span>' +
      '</li>' +
      '<li>&nbsp;</li>' +
      '<li><span class="cmt">// Initialize Algorithm IV\'s app</span></li>'    +
      '<li>'  +
        '<span class="idt">aIV</span><span class="per">.</span><span class="'  +
        'idt">app</span><span class="brc">(</span><span class="idt">settings'  +
        '</span><span class="brc">)</span><span class="smc">;</span>'          +
      '</li>';

    exampleLineCount = 22;

    divHeight = exampleLineCount * app.elems.code.li.height;
    divHeight += app.elems.code.ol.height;

    // Create the error elements
    errorDiv = document.createElement('div');
    h2 = document.createElement('h2');
    p  = document.createElement('p');

    // Create the example elements
    exampleDiv = document.createElement('div');
    h3   = document.createElement('h3');
    div  = document.createElement('div');
    pre  = document.createElement('pre');
    code = document.createElement('code');
    ol   = document.createElement('ol');

    // Assign the class names
    errorDiv.className   = 'initError';
    exampleDiv.className = 'initExample';
    div.className = 'containExample';

    // Add the content
    h2.textContent = 'Initialization Error';
    p.textContent  = message;
    h3.textContent = 'App Init Example';
    ol.innerHTML   = example;

    // Complete all dynamic formatting
    div.style.height = height + 'px';

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
