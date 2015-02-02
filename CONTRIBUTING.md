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
I follow a standard of implementing regular [console methods](https://developer.chrome.com/devtools/docs/console-api) that are categorized into specific groups. The debug categories for this app are:
```javascript
// global var
var DEBUG = {
  // every class in the module gets 
  // its own set of debug commands
  TheClass: {

    // the CALL category:
    //   used at the start of every method
    //   console methods: log
    call: true,

    // the FAIL category:
    //   used to catch errors and share error messages
    //   console methods: assert, log
    fail: true,

    // the GROUP category:
    //   used to group console commands 
    //   console methods: group, groupCollapsed, groupEnd
    group: true,

    // the STATE category:
    //   used to share the current state of an object
    //   console methods: assert, log
    state: true
  }
};
```
The format of log calls for this app are:
```javascript
DEBUG.TheClass.theDebugCategory && console.log(
  'CATEGORY: TheClass.theMethod() ' +
  'Note: theVarName= %s', theVar
);

DEBUG.TheClass.theDebugCategory && console.assert(
  typeof theVar === 'string',
  'CATEGORY: TheClass.theMethod() ' +
  'Note: The error message.'
);
```
Examples:
```javascript
// example method
function theMethod(var, element) {

  // use DEBUG.group to start a new console group
  // that will contain all of the class logs
  DEBUG.TheClass.group && console.groupCollapsed(
    'GROUP: TheClass ' +
    'Note: var= %s', var
  );

  // start method with a DEBUG.call
  DEBUG.TheClass.call && console.log(
    'CALL: TheClass.theMethod()'
  );

  // then use a DEBUG.fail to
  // catch invalid arguments
  DEBUG.TheClass.fail && console.assert(
    (typeof var     === 'string' &&
     typeof element === 'object'),
    'FAIL: TheClass.theMethod() ' +
    'Note: Incorrect argument operand.'
  );

  // use DEBUG.state to save a reference
  // of element's current state
  DEBUG.TheClass.state && console.log(
    'STATE: TheClass.theMethod() ' +
    'Note: element= %O', element
  );
}
```