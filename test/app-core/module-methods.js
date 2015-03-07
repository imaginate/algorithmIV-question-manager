  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * @desc A shortcut for getElementById.
   * @param {string} title - The name of the id of the element to select.
   * @return {HTMLElement} A reference to element with the given id.
   */
  function getID(title) {

    if (DEBUG) {
      debug.start('getID', title);
      debug.args('getID', title, 'string');
    }

    return document.getElementById(title);
  }

  /**
   * ---------------------------------------------
   * Public Method (getTag)
   * ---------------------------------------------
   * @desc A shortcut for getElementsByTagName.
   * @param {string} title - The name of the tags to select.
   * @param {HTMLElement=} root - The root element to use.
   * @return {Array<HTMLElement>} References to the elements with the tag.
   */
  function getTag(title, root) {

    if (DEBUG) {
      debug.start('getTag', title, root);
      debug.args('getTag', title, 'string', root, 'object=');
    }

    root = root || roots.root;

    return root.getElementsByTagName(title);
  }

  /**
   * ---------------------------------------------
   * Public Method (getClass)
   * ---------------------------------------------
   * @desc A shortcut for getElementsByClassName.
   * @param {string} title - The name of the class to select.
   * @param {HTMLElement=} root - The root element to use.
   * @return {Array<HTMLElement>} References to the elements with the class.
   */
  function getClass(title, root) {

    if (DEBUG) {
      debug.start('getClass', title, root);
      debug.args('getClass', title, 'string', root, 'object=');
    }

    root = root || roots.root;

    return root.getElementsByClassName(title);
  }
