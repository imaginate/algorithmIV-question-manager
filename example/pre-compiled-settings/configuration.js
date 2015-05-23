  /**
   * -----------------------------------------------
   * The Configuration
   * -----------------------------------------------
   * @desc An object property of settings that allows you to run
   *   the question manager like you want.
   * @type {{
   *   searchSettings: Object,
   *   searchDefaults: Object,
   *   questionFormat: Object,
   *   prettifyFormat: Object,
   *   showLinks     : Object
   * }}
   */
  settings.config = {};

  /**
   * -----------------------------------------------
   * The Search Settings
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to enable or
   *   disable different search options in the app.
   * @type {{
   *   stage   : boolean,
   *   source  : boolean,
   *   category: boolean,
   *   subCat  : boolean
   * }}
   */
  settings.config.searchSettings = {
    stage   : true,
    source  : true,
    category: true,
    subCat  : true
  };

  /**
   * -----------------------------------------------
   * The Search Defaults
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to set the
   *   default search values for a new app init.
   * @type {{
   *   view   : string,
   *   order  : string,
   *   stage  : string,
   *   source : string,
   *   mainCat: string,
   *   subCat : string,
   *   startID: number
   * }}
   */
  settings.config.searchDefaults = {
    view   : 'one',
    order  : 'asc',
    stage  : 'all',
    source : 'all',
    mainCat: 'all',
    subCat : 'all',
    startID: 0
  };

  /**
   * -----------------------------------------------
   * The Question Format
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to enable or
   *   disable different parts of a question's display.
   * @type {{
   *   id      : boolean,
   *   complete: boolean,
   *   source  : boolean,
   *   category: boolean,
   *   subCat  : boolean,
   *   links   : boolean,
   *   problem : boolean,
   *   descr   : boolean,
   *   output  : boolean
   * }}
   */
  settings.config.questionFormat = {
    id      : true,
    complete: true,
    source  : true,
    category: true,
    subCat  : true,
    links   : true,
    problem : true,
    descr   : false,
    output  : true
  };

  /**
   * -----------------------------------------------
   * The Prettify Format
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to configure
   *   the built-in prettifier to your liking.
   * @type {{
   *   trimSpace   : number,
   *   tabLength   : number,
   *   commentLinks: boolean
   * }}
   */
  settings.config.prettifyFormat = {
    trimSpace   : 0,
    tabLength   : 2,
    commentLinks: true
  };

  /**
   * -----------------------------------------------
   * The Show Links
   * -----------------------------------------------
   * @desc An object property of configuration that allows you to enable or
   *   disable whether question parts have shortcut links.
   * @type {{
   *   id      : boolean,
   *   source  : boolean,
   *   category: boolean
   * }}
   */
  settings.config.showLinks = {
    id      : true,
    source  : false,
    category: true
  };
