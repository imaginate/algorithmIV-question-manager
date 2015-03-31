  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * @desc A shortcut for getElementById.
   * @param {string} title - The name of the id of the element to select.
   * @return {HTMLElement} A reference to element with the given id.
   */
  function getID(title) {
    return document.getElementById(title);
  }

  /**
   * ---------------------------------------------
   * Public Method (getClass)
   * ---------------------------------------------
   * @desc A shortcut for getElementsByClassName.
   * @param {string} title - The name of the class to select.
   * @return {elems} References to the elements with the class.
   */
  function getClass(title) {
    return getID('aIV-tests').getElementsByClassName(title);
  }

  /**
   * ---------------------------------------------
   * Public Method (generateNumbers)
   * ---------------------------------------------
   * @desc Generates a random number or array of numbers.
   * @param {?number=} amount - The amount of numbers to return.
   * @return {(number|numbers)} The random number(s).
   */
  function generateNumbers(amount) {

    /**
     * @type {number}
     * @private
     */
    var limit;
    /**
     * @type {number}
     * @private
     */
    var min;
    /**
     * @type {number}
     * @private
     */
    var max;
    /**
     * @type {number}
     * @private
     */
    var i;
    /**
     * @type {numbers}
     */
    var arr;

    amount = ( (typeof amount === 'number' && amount > 1) ?
      Math.floor(amount) : null
    );

    limit = 1000;

    if (amount && amount > limit) {
      debug.fail('generateNumbers', false, 'Error: Amount arg was over limit.');
      amount = null;
    }

    min = 1;
    max = 50;

    if (!amount) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    arr = new Array(amount);
    i = 0;

    while (++i < amount) {
      arr[i] = Math.floor(Math.random() * (max - min)) + min;
    }

    return arr;
  }
