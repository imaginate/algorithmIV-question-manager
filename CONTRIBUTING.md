#Contributing

###Welcome Algorithm IV Contributors!

##The More Problems, The Better
The goal of this project is to host a plethora of practice problems for developers to review and attempt for free to improve their skills. Contributions of well explained problems and solutions will be greatly appreciated!

When designing or choosing a set of questions to submit for addition to the library please follow the formatting guidelines outlined in [problemsFormat.js](https://github.com/imaginate/algorithmIV/blob/master/problems-lib/problemsFormat.js). Questions with clear categories, sources, solutions, and links to extra explanations will receive priority.

##Making The Module More Effective
Help maintaining and improving the module core will also be appreciated. Simply fork and clone the repo, add your code, ensure it does not break any other functionality (more [test resources](https://github.com/imaginate/algorithmIV/tree/master/test) will be added as time allows), and submit a pull request.

Make sure your code is easy to read, well-documented with [Closure Compiler specific JSDoc](http://developers.google.com/closure/compiler/docs/js-for-compiler), includes appropriately defined console calls (see [Debugging Conventions](#debugging-conventions)), and follows similar style conventions as the source already displays (reference [Google's style guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Code_formatting#Code_formatting) for similar conventions).

##Closing
I will do my best to timely review all practice problems, patches, and emails. Thank you for contributing!

-------------------------------------------------------------------------------------------

###Debugging Conventions
Algorithm IV was built with the standard of implementing regular [console calls](https://developer.chrome.com/devtools/docs/console-api) using a custom class, Debug. Every other class within the module contains an instance of Debug located at Class.debug. The following methods can be called via the property:
```javascript
/**
 * -----------------------------------------------------
 * Debug.prototype.start
 * -----------------------------------------------------
 * it is called at the start of every method
 * logs: 'START: Class.method(arg, arg)'
 */
Class.debug.start('methodName', arg, arg, ...);

/**
 * -----------------------------------------------------
 * Debug.prototype.args
 * -----------------------------------------------------
 * it is called at the start of every method with arguments
 * it verifies that the arguments are the correct operand 
 * if assert fails, logs: 'ARGS: Class.method() | ' +
 *                        'Error: Incorrect argument operand.'
 */
Class.debug.args('methodName', arg, 'object', arg, 'number', ...);

/**
 * -----------------------------------------------------
 * Debug.prototype.fail
 * -----------------------------------------------------
 * it is used to catch script failures
 * it verifies that the provided value is true 
 * if assert fails, logs: 'FAIL: Class.method() | ' +
 *                        'Error: customErrorMessage'
 */
Class.debug.fail('methodName', !!testValue, 'customErrorMessage');

/**
 * -----------------------------------------------------
 * Debug.prototype.group
 * -----------------------------------------------------
 * it is used to group console logs
 * logs: 'GROUP: Class.method() | var= varValue, var= varValue'
 */
Class.debug.group('methodName', !!openNewGroup, 'varName', var, 'varName', var, ...);

/**
 * -----------------------------------------------------
 * Debug.prototype.state
 * -----------------------------------------------------
 * it is used to log the state of variables and properties
 * logs: 'STATE: Class.method() | var= varValue, var= varValue'
 */
Class.debug.state('methodName', 'varName', var, 'varName', var, ...);
```