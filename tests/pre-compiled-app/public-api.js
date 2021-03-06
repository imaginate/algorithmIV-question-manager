  /**
   * ---------------------------------------------------
   * Global Variable (aIV)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Method (aIV.app)
   * ---------------------------------------------------
   * @desc Initializes the aIV question management app.
   * @param {!Object} settings - The app's settings.
   * @param {objectMap=} settings.config - The app's configuration.
   * @param {stringMap=} settings.sources - The app's sources.
   * @param {(objectMap|stringMap)=} settings.categories - The app's categories.
   * @param {!objects} settings.questions - The app's questions.
   * @param {(string|strings)=} settings.resources - The app's resources.
   * @global
   */
  aIV.app = appModuleAPI.startApp;

  /**
   * ---------------------------------------------------
   * Global Method (aIV.app.getResource)
   * ---------------------------------------------------
   * @desc Makes the app's resources publically available.
   * @param {string=} prop - The specific resource to retrieve.
   * @return {*} Either the entire resources object or one of its properties.
   * @global
   */
  aIV.app.getResource = appModuleAPI.getResource;
