  /**
   * -----------------------------------------------
   * The Configuration
   * -----------------------------------------------
   * @desc An object property of settings that allows you to run
   *   the question manager like you want. For more details see the
   *   [online documentation for configuration]{@link algorithmiv.com/docs/configuration}.
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
   *   disable different search options in the app. For more details see the
   *   [online documentation for search settings]{@link algorithmiv.com/docs/configuration/search-settings}.
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
   *   default search values for a new app init. For more details see the
   *   [online documentation for search defaults]{@link algorithmiv.com/docs/configuration/search-defaults}.
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
   *   disable different parts of a question's display. For more details see the
   *   [online documentation for question format]{@link algorithmiv.com/docs/configuration/question-format}.
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
   *   the built-in prettifier to your liking. For more details see the
   *   [online documentation for prettify format]{@link algorithmiv.com/docs/configuration/prettify-format}.
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
   *   disable whether question parts have shortcut links. For more details see the
   *   [online documentation for show links]{@link algorithmiv.com/docs/configuration/show-links}.
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
