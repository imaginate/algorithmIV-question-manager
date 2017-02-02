/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Question Manager App (v1.1.2)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's question manager is a JavaScript app designed to manage
 *   practice questions and JavaScript coded solutions for learning computer
 *   science focused algorithms and data structures, improving programming
 *   skill-sets, and preparing for technical interviews.
 * @module aIVApp
 * @version 1.1.2
 * @author Adam Smith [adam@imaginate.life]{@link http://imaginate.life}
 * @copyright 2017 Adam A Smith [http://imaginate.life]{@link http://imaginate.life}
 * @license The Apache License [algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license}
 * @desc More details about aIV's question manager:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See the guideline]{@link https://github.com/imaginate/algorithmIV-question-manager/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {Array<*>} vals
 * @typedef {Array<number>} numbers
 * @typedef {Array<string>} strings
 * @typedef {Array<Object>} objects
 * @typedef {Array<Element>} elements
 * @typedef {Array<Question>} questions
 * @typedef {Array<{name: string, href: string}>} links
 * @typedef {Object<string, string>} stringMap
 * @typedef {Object<string, number>} numberMap
 * @typedef {Object<string, object>} objectMap
 * @typedef {Object<string, boolean>} booleanMap
 * @typedef {Object<string, Element>} elementMap
 * @typedef {Object<string, strings>} stringsMap
 */

////////////////////////////////////////////////////////////////////////////////
// The Dependencies
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (dependencies/algorithmIV-utils.min.js)
 * -------------------------------------------------------------------------- */

/* JSON3 v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
(function(){function M(r,q){function p(a,l){try{a()}catch(c){l&&l()}}function k(a){if(null!=k[a])return k[a];var l;if("bug-string-char-index"==a)l="a"!="a"[0];else if("json"==a)l=k("json-stringify")&&k("date-serialization")&&k("json-parse");else if("date-serialization"==a){if(l=k("json-stringify")&&v){var c=q.stringify;p(function(){l='"-271821-04-20T00:00:00.000Z"'==c(new z(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==c(new z(864E13))&&'"-000001-01-01T00:00:00.000Z"'==c(new z(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==
c(new z(-1))})}}else{var b;if("json-stringify"==a){var c=q.stringify,e="function"==typeof c;e&&((b=function(){return 1}).toJSON=b,p(function(){e="0"===c(0)&&"0"===c(new B)&&'""'==c(new A)&&c(t)===u&&c(u)===u&&c()===u&&"1"===c(b)&&"[1]"==c([b])&&"[null]"==c([u])&&"null"==c(null)&&"[null,null,null]"==c([u,t,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==c({a:[b,!0,!1,null,"\x00\b\n\f\r\t"]})&&"1"===c(null,b)&&"[\n 1,\n 2\n]"==c([1,2],null,1)},function(){e=!1}));l=e}if("json-parse"==a){var n=
q.parse,d;"function"==typeof n&&p(function(){0===n("0")&&!n(!1)&&(b=n('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'),d=5==b.a.length&&1===b.a[0])&&(p(function(){d=!n('"\t"')}),d&&p(function(){d=1!==n("01")}),d&&p(function(){d=1!==n("1.")}))},function(){d=!1});l=d}}return k[a]=!!l}r||(r=f.Object());q||(q=f.Object());var B=r.Number||f.Number,A=r.String||f.String,E=r.Object||f.Object,z=r.Date||f.Date,I=r.SyntaxError||f.SyntaxError,J=r.TypeError||f.TypeError,K=r.Math||f.Math,F=r.JSON||f.JSON;"object"==
typeof F&&F&&(q.stringify=F.stringify,q.parse=F.parse);var E=E.prototype,t=E.toString,G=E.hasOwnProperty,u,v=new z(-0xc782b5b800cec);p(function(){v=-109252==v.getUTCFullYear()&&0===v.getUTCMonth()&&1===v.getUTCDate()&&10==v.getUTCHours()&&37==v.getUTCMinutes()&&6==v.getUTCSeconds()&&708==v.getUTCMilliseconds()});k["bug-string-char-index"]=k["date-serialization"]=k.json=k["json-stringify"]=k["json-parse"]=null;if(!k("json")){var N=k("bug-string-char-index"),C=function(a,b){var c=0,g,e,n;(g=function(){this.valueOf=
0}).prototype.valueOf=0;e=new g;for(n in e)G.call(e,n)&&c++;g=e=null;c?C=function(a,c){var b="[object Function]"==t.call(a),l,e;for(l in a)b&&"prototype"==l||!G.call(a,l)||(e="constructor"===l)||c(l);(e||G.call(a,l="constructor"))&&c(l)}:(e="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),C=function(a,c){var b="[object Function]"==t.call(a),l,g=!b&&"function"!=typeof a.constructor&&D[typeof a.hasOwnProperty]&&a.hasOwnProperty||G;for(l in a)b&&
"prototype"==l||!g.call(a,l)||c(l);for(b=e.length;l=e[--b];g.call(a,l)&&c(l));});return C(a,b)};if(!k("json-stringify")||!k(" date-serialization")){var L={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},x=function(a,b){return("000000"+(b||0)).slice(-a)},V=function(a){a=a.charCodeAt(0);var b=L[a];return b?b:"\\u00"+x(2,a.toString(16))},O=/[\x00-\x1f\x22\x5c]/g,S=function(a){O.lastIndex=0;return'"'+(O.test(a)?a.replace(O,V):a)+'"'},P=function(a){var b,c,g,e,n,d,h,f,m;if(v)b=function(a){c=
a.getUTCFullYear();g=a.getUTCMonth();e=a.getUTCDate();d=a.getUTCHours();h=a.getUTCMinutes();f=a.getUTCSeconds();m=a.getUTCMilliseconds()};else{var w=K.floor,k=[0,31,59,90,120,151,181,212,243,273,304,334],p=function(a,c){return k[c]+365*(a-1970)+w((a-1969+(c=+(1<c)))/4)-w((a-1901+c)/100)+w((a-1601+c)/400)};b=function(a){e=w(a/864E5);for(c=w(e/365.2425)+1970-1;p(c+1,0)<=e;c++);for(g=w((e-p(c,0))/30.42);p(c,g+1)<=e;g++);e=1+e-p(c,g);n=(a%864E5+864E5)%864E5;d=w(n/36E5)%24;h=w(n/6E4)%60;f=w(n/1E3)%60;
m=n%1E3}}P=function(a){a>-1/0&&a<1/0?(b(a),a=(0>=c||1E4<=c?(0>c?"-":"+")+x(6,0>c?-c:c):x(4,c))+"-"+x(2,g+1)+"-"+x(2,e)+"T"+x(2,d)+":"+x(2,h)+":"+x(2,f)+"."+x(3,m)+"Z",c=g=e=d=h=f=m=null):a=null;return a};return P(a)},Q=function(a,b,c,g,e,n,d){var h,f,m,k,q,r;p(function(){h=b[a]});"object"==typeof h&&h&&(h.getUTCFullYear&&"[object Date]"==t.call(h)&&h.toJSON===z.prototype.toJSON?h=P(h):"function"==typeof h.toJSON&&(h=h.toJSON(a)));c&&(h=c.call(b,a,h));if(h==u)return h===u?h:"null";f=typeof h;"object"==
f&&(m=t.call(h));switch(m||f){case "boolean":case "[object Boolean]":return""+h;case "number":case "[object Number]":return h>-1/0&&h<1/0?""+h:"null";case "string":case "[object String]":return S(""+h)}if("object"==typeof h){for(f=d.length;f--;)if(d[f]===h)throw J();d.push(h);k=[];r=n;n+=e;if("[object Array]"==m){q=0;for(f=h.length;q<f;q++)m=Q(q,h,c,g,e,n,d),k.push(m===u?"null":m);f=k.length?e?"[\n"+n+k.join(",\n"+n)+"\n"+r+"]":"["+k.join(",")+"]":"[]"}else C(g||h,function(a){var b=Q(a,h,c,g,e,n,
d);b!==u&&k.push(S(a)+":"+(e?" ":"")+b)}),f=k.length?e?"{\n"+n+k.join(",\n"+n)+"\n"+r+"}":"{"+k.join(",")+"}":"{}";d.pop();return f}};q.stringify=function(a,b,c){var g,e,f,d;if(D[typeof b]&&b)if(d=t.call(b),"[object Function]"==d)e=b;else if("[object Array]"==d){f={};for(var h=0,m=b.length,k;h<m;k=b[h++],(d=t.call(k),"[object String]"==d||"[object Number]"==d)&&(f[k]=1));}if(c)if(d=t.call(c),"[object Number]"==d){if(0<(c-=c%1))for(g="",10<c&&(c=10);g.length<c;g+=" ");}else"[object String]"==d&&(g=
10>=c.length?c:c.slice(0,10));return Q("",(k={},k[""]=a,k),e,f,g,"",[])}}if(!k("json-parse")){var W=A.fromCharCode,X={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},b,H,m=function(){b=H=null;throw I();},y=function(){for(var a=H,l=a.length,c,g,e,f,d;b<l;)switch(d=a.charCodeAt(b),d){case 9:case 10:case 13:case 32:b++;break;case 123:case 125:case 91:case 93:case 58:case 44:return c=N?a.charAt(b):a[b],b++,c;case 34:c="@";for(b++;b<l;)if(d=a.charCodeAt(b),32>d)m();else if(92==d)switch(d=
a.charCodeAt(++b),d){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:c+=X[d];b++;break;case 117:g=++b;for(e=b+4;b<e;b++)d=a.charCodeAt(b),48<=d&&57>=d||97<=d&&102>=d||65<=d&&70>=d||m();c+=W("0x"+a.slice(g,b));break;default:m()}else{if(34==d)break;d=a.charCodeAt(b);for(g=b;32<=d&&92!=d&&34!=d;)d=a.charCodeAt(++b);c+=a.slice(g,b)}if(34==a.charCodeAt(b))return b++,c;m();default:g=b;45==d&&(f=!0,d=a.charCodeAt(++b));if(48<=d&&57>=d){for(48==d&&(d=a.charCodeAt(b+1),48<=d&&57>=d)&&m();b<
l&&(d=a.charCodeAt(b),48<=d&&57>=d);b++);if(46==a.charCodeAt(b)){for(e=++b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}d=a.charCodeAt(b);if(101==d||69==d){d=a.charCodeAt(++b);43!=d&&45!=d||b++;for(e=b;e<l&&(d=a.charCodeAt(e),48<=d&&57>=d);e++);e==b&&m();b=e}return+a.slice(g,b)}f&&m();c=a.slice(b,b+4);if("true"==c)return b+=4,!0;if("fals"==c&&101==a.charCodeAt(b+4))return b+=5,!1;if("null"==c)return b+=4,null;m()}return"$"},R=function(a){var b,c;"$"==a&&m();if("string"==typeof a){if("@"==
(N?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];;){a=y();if("]"==a)break;c?","==a?(a=y(),"]"==a&&m()):m():c=!0;","==a&&m();b.push(R(a))}return b}if("{"==a){for(b={};;){a=y();if("}"==a)break;c?","==a?(a=y(),"}"==a&&m()):m():c=!0;","!=a&&"string"==typeof a&&"@"==(N?a.charAt(0):a[0])&&":"==y()||m();b[a.slice(1)]=R(y())}return b}m()}return a},U=function(a,b,c){c=T(a,b,c);c===u?delete a[b]:a[b]=c},T=function(a,b,c){var g=a[b],e;if("object"==typeof g&&g)if("[object Array]"==t.call(g))for(e=g.length;e--;U(g,
e,c));else C(g,function(a){U(g,a,c)});return c.call(a,b,g)};q.parse=function(a,f){var c,g;b=0;H=""+a;c=R(y());"$"!=y()&&m();b=H=null;return f&&"[object Function]"==t.call(f)?T((g={},g[""]=c,g),"",f):c}}}q.runInContext=M;return q}var I=typeof define==="function"&&define.amd,D={"function":!0,object:!0},A=D[typeof exports]&&exports&&!exports.nodeType&&exports,f=D[typeof window]&&window||this,p=A&&D[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!p||p.global!==p&&p.window!==
p&&p.self!==p||(f=p);if(A&&!I)M(f,A);else{var J=f.JSON,K=f.JSON3,L=!1,B=M(f,f.JSON3={noConflict:function(){L||(L=!0,f.JSON=J,f.JSON3=K,J=K=null);return B}});f.JSON={parse:B.parse,stringify:B.stringify}}I&&define(function(){return B})}).call(this);

/* Algorithm IV JavaScript Polyfills (v0.0.2) (learn@algorithmiv.com)
 * Author: Adam Smith <adam@imaginate.life>
 * Copyright (c) 2017 Adam A Smith <adam@imaginate.life>
 * The Apache License (algorithmiv.com/docs/license) */
(function(h,m,n){h.console=h.console||{};(function(a,b){a.log||(a.log=b);a.error||(a.error=a.log);a.assert||(a.assert=function(b){var c;if(!b)return c=1<arguments.length?Array.prototype.slice.call(arguments,1):["A console.assert call failed."],a.error.apply(this,c)});a.clear||(a.clear=b);a.count||(a.count=b);a.debug||(a.debug=a.log);a.dir||(a.dir=a.log);a.dirxml||(a.dirxml=a.log);a.exception||(a.exception=a.error);a.group||(a.group=b);a.groupCollapsed||(a.groupCollapsed=a.group);a.groupEnd||(a.groupEnd=
b);a.info||(a.info=a.log);a.markTimeline||(a.markTimeline=a.timeStamp?a.timeStamp:b);a.profile||(a.profile=b);a.profileEnd||(a.profileEnd=b);a.table||(a.table=b);a.time||(a.time=b);a.timeEnd||(a.timeEnd=b);a.timeline||(a.timeline=b);a.timelineEnd||(a.timelineEnd=b);a.timeStamp||(a.timeStamp=a.markTimeline);a.trace||(a.trace=a.log);a.warn||(a.warn=a.error);(function(b,c,e,h){var f,k,l,g;if(b)if(l=["assert","error","info","log","warn"],g=["clear","dir","profile","profileEnd"],g=l.concat(g),c)for(f=
g.length;f--;)k=a[g[f]],a[g[f]]=c.call(k,a);else for(f=l.length;f--;)k=a[l[f]],e.call(k,a,h.call(arguments))})("object"===typeof a.log,Function.prototype.bind,Function.prototype.call,Array.prototype.slice)})(h.console,function(){});Object.keys||(Object.keys=function(){var a,b;a=!{toString:null}.propertyIsEnumerable("toString");b="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" ");return function(d){var c,e;if(!d||"object"!==typeof d&&"function"!==
typeof d)throw new TypeError("An Object.keys call received an invalid object parameter. Note: It only accepts non-null objects and functions.");e=[];for(c in d)d.hasOwnProperty(c)&&e.push(c);if(a)for(c=b.length;c--;)d.hasOwnProperty(b[c])&&e.push(b[c]);return e}}());Object.freeze||(Object.freeze=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.freeze call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return a});
try{Object.freeze(function(){})}catch(p){Object.freeze=function(a){return function(b){return"function"===typeof b?b:a(b)}}(Object.freeze)}Object.isFrozen||(Object.isFrozen=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.isFrozen call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return!0});Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});(function(a){a&&
(a=[8,9],a=-1===a.indexOf(8,2)&&-1===a.indexOf(9,-1));return a})(!!Array.prototype.indexOf)||(Array.prototype.indexOf=function(a,b){var d,c,e;if(!Array.isArray(this))throw new TypeError("An Array.prototype.indexOf call was made on a non-array.");"number"!==typeof b&&(b=0);c=this.length;d=-1;if(0!==c&&Math.abs(b)<c)for(0>b&&(c-=b),e=0>b?-1:--b;++e<c;)if(this[e]===a){d=e;break}return d});XMLHttpRequest||(XMLHttpRequest=function(){var a;try{a=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(b){try{a=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(d){try{a=
new ActiveXObject("Microsoft.XMLHTTP")}catch(c){throw Error("Your browser does not support XMLHttpRequest.");}}}return a})})(window,document);

/* Algorithm IV JavaScript Shortcuts (v1.0.6) (learn@algorithmiv.com)
 * Author: Adam Smith <adam@imaginate.life>
 * Copyright (c) 2017 Adam A Smith <adam@imaginate.life>
 * The Apache License (algorithmiv.com/docs/license) */
(function(g,v){g.aIV=g.aIV||{};aIV.utils=aIV.utils||v})(window,function(g,v,z){var d={},l={checkArgsErrorMsg:"A function call had an invalid parameter data type.",getElemByClassRoot:v,getElemsByClassRoot:v,getElemByTagRoot:v,getElemsByTagRoot:v,types:{checkArgsErrorMsg:"string|function",getElemByClassRoot:"!(Document|Element)",getElemsByClassRoot:"!(Document|Element)",getElemByTagRoot:"!(Document|Element)",getElemsByTagRoot:"!(Document|Element)"}};Object.freeze(l);Object.freeze(l.types);var p={checkArgsErrorMsg:l.checkArgsErrorMsg,
getElemByClassRoot:l.getElemByClassRoot,getElemsByClassRoot:l.getElemsByClassRoot,getElemByTagRoot:l.getElemByTagRoot,getElemsByTagRoot:l.getElemsByTagRoot};g={};g.freezeRegExpBug=function(){var c,b;c=/0/g;Object.freeze(c);b=!0;try{"T00 many zer0s... replace them.".replace(c,"o")}catch(a){b=!1}return!b}();Object.freeze(g);d.checkType=function(){var c=/^string$|^number$|^boolean$|^function$|^undefined$/,b=/^string$|^number$|^boolean$|^object$|^function$|^undefined$/,a=/^elem$|^element$|^document$/,
f=/^array$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$/,d=/^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,m=/\!/,g=/\?/,n=/\=/,v=/\*/,p=function(a,b){return null===a?!1:typeof a===b},l=function(a,b){return a&&p(a,"object")&&a.nodeType?a.nodeType==={elem:1,element:1,document:9}[b]:!1};return function(k,e,r){var t,w,q,h;if(!p(e,"string"))throw new TypeError("An aIV.utils.checkType call received an invalid (a non-string) type parameter.");
if(v.test(e)){if(1<e.length)throw k="An aIV.utils.checkType call received an invalid type string. When using an asterisk, '*', no other values should be given as the asterisk guarantees the check will ",k+="pass.",Error(k);return!0}if(t=k===z&&n.test(e))h=!0;else{h=e;var u;u=(q=null===k)?m.test(h):!0;q&&g.test(h)&&(u=!u);h=u}q=t||!h||m.test(e)?!1:g.test(e);t=t||q&&h;if(!r||!t)if(e=e.toLowerCase(),e=e.replace(x.exceptLowerAlphaAndPipe,""),w=e.split("|"),!r)for(e=w,u=!0,r=e.length;u&&r--;)if(u=x.allDataTypes.test(e[r]),
!u)throw k=void 0,k="An aIV.utils.checkType call received an invalid type ",k+="string. The value '"+e[r]+"' was incorrect. ",k+="Check aIV.utils.checkType's documentation for a ",k+="list of acceptable type strings.",Error(k);if(!t){if(null===k){k=w;t=q;e=!1;for(w=k.length;!e&&w--;)h||(t=!c.test(k[w])),e=t;k=e}else{t=w;h=!1;for(w=t.length;!h&&w--;){e=t[w];if("any"===e){h=!0;break}if(b.test(e))h=p(k,e);else if(a.test(e))h=l(k,e);else if(f.test(e))if(h=k,u=q=r=void 0,Array.isArray(h))if("array"===
e)h=!0;else{e=e.slice(0,-1);u="array"===e?Array.isArray:a.test(e)?l:p;q=!0;for(r=h.length;q&&r--;)q=u(h[r],e);h=q}else h=!1;else if(d.test(e))if(h=k,u=q=r=void 0,p(h,"object")){e=e.slice(0,-3);u="array"===e?Array.isArray:a.test(e)?l:p;q=!0;for(r in h)if(h.hasOwnProperty(r)&&(q=u(h[r],e),!q))break;h=q}else h=!1}k=h}t=k}return t}}();d.isValidTypeString=function(c){var b,a;if("string"!==typeof c)throw new TypeError("An aIV.utils.isValidTypeString call received an invalid (a non-string) typeString parameter.");
c=c.toLowerCase();c=c.replace(x.exceptLowerAlphaAndPipe,"");a=c.split("|");b=!0;for(c=a.length;b&&c--;)b=x.allDataTypes.test(a[c]);return b};d.checkArgs=function(){var c=d.checkType,b=d.isValidTypeString;return function(){var a,f,d,m,g,n,l;f=arguments.length;if(2>f||f%2)throw Error("An aIV.utils.checkArgs call was missing parameters.");g=Array.prototype.slice.call(arguments,0);n=!0;for(a=-1;++a<f;)if(a%2){m=g[a];l=(l=c(m,"string",!0))&&b(m);if(!l)throw n=void 0,n="An aIV.utils.checkArgs call received an invalid type ",
n+="string. The value '"+m+"' was incorrect. ",n+="Check aIV.utils.checkType's documentation for a ",n+="list of acceptable type strings.",Error(n);n=n&&c(d,m,!0)}else d=g[a];if(!n&&(m=p.checkArgsErrorMsg,(m=c(m,"string")?m:m())&&c(m,"string")))throw new TypeError(m);return n}}();d.getTypeOf=function(){var c=d.checkType;return function(b){var a;a=typeof b;"object"===a&&c(b,"document|element|array")&&(a=null===b?"null":Array.isArray(b)?"array":1===b.nodeType?"element":"document");return a}}();d.freezeObj=
function(c){var b=function(a){var f;Object.freeze(a);for(f in a)!a.hasOwnProperty(f)||!a[f]||"object"!==typeof a[f]&&"function"!==typeof a[f]||c&&a[f]instanceof RegExp||b(a[f])};return function(a,f){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An aIV.utils.freezeObj call received an invalid obj parameter.");if(c&&a instanceof RegExp)return a;"boolean"!==typeof f&&(f=!1);f?b(a):Object.freeze(a);return a}}(g.freezeRegExpBug);d.hasOwnProp=function(c,b){var a;if(!c||"object"!==
typeof c&&"function"!==typeof c)throw new TypeError("An aIV.utils.hasOwnProp call received an invalid obj parameter.");if(!b||"string"!==typeof b&&"number"!==typeof b)throw a="An aIV.utils.hasOwnProp call received an invalid prop parameter.",new TypeError(a);return c.hasOwnProperty(b)};var x={allDataTypes:/^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|^element$|^undefined$|^null$|^document$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,
exceptLowerAlphaAndPipe:/[^a-z\|]/g};d.freezeObj(x,!0);g={};g.textContent="textContent"in v;Object.freeze(g);d.getElemById=function(c){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemById call received an invalid id parameter (should be a string).");c=v.getElementById(c);if(!c)throw c="An aIV.utils.getElemById call received an invalid id parameter (i.e. no element with the id was found).",new RangeError(c);return c};d.getElemByClass=function(c,b,a){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemByClass call received an invalid class name parameter.");
b="number"!==typeof b||-1>b?0:Math.floor(b);a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=p.getElemByClassRoot);c=a.getElementsByClassName?a.getElementsByClassName(c):y.getElementsByClassNameAlt(c,a);if(0>b||b>=c.length)b=c.length-1;b=c[b];if(!b)throw b="An aIV.utils.getElemByClass call received an invalid class name parameter ",b+="(i.e. no element with the class name was found).",new RangeError(b);return b};d.getElemsByClass=function(c,b){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemsByClass call received an invalid class name parameter.");
b&&"object"===typeof b&&(b instanceof Element||b instanceof Document)||(b=p.getElemsByClassRoot);return b.getElementsByClassName?b.getElementsByClassName(c):y.getElementsByClassNameAlt(c,b)};d.getElemByTag=function(c,b,a){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemByTag call received an invalid tag name parameter.");b="number"!==typeof b||-1>b?0:Math.floor(b);a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=p.getElemByTagRoot);c=a.getElementsByTagName(c);
if(0>b||b>=c.length)b=c.length-1;b=c[b];if(!b)throw b="An aIV.utils.getElemByTag call received an invalid tag name parameter ",b+="(i.e. no element with the tag name was found).",new RangeError(b);return b};d.getElemsByTag=function(c,b){if(!c||"string"!==typeof c)throw new TypeError("An aIV.utils.getElemsByTag call received an invalid tag name parameter.");b&&"object"===typeof b&&(b instanceof Element||b instanceof Document)||(b=p.getElemsByTagRoot);return b.getElementsByTagName(c)};d.setElemText=
function(c,b){return function(a,f){var d;if(!c(a,"!element"))throw new TypeError("An aIV.utils.setElemText call received an invalid elem parameter (should be a DOM Element).");if(!c(f,"string"))throw d="An aIV.utils.setElemText call received an invalid text parameter (should be a string).",new TypeError(d);b?a.textContent=f:a.innerText=f;return a}}(d.checkType,g.textContent);d.makeElem=function(c,b){return function(a){var f;c(a,"string")?f=a:c(a,"!object")?f=a.tag||a.tagName:a=null;f=v.createElement(f||
"div");a&&(a.text&&c(a.text,"string")&&b(f,a.text),a.html&&c(a.html,"string")&&(f.innerHTML=a.html),a.id&&c(a.id,"string")&&(f.id=a.id),a.className&&c(a.className,"string")&&(f.className=a.className));return f}}(d.checkType,d.setElemText);d.addElemText=function(c,b){return function(a,f){var d;if(!c(a,"!element"))throw new TypeError("An aIV.utils.addElemText call received an invalid elem parameter (should be a DOM Element).");if(!c(f,"string"))throw d="An aIV.utils.addElemText call received an invalid text parameter (should be a string).",
new TypeError(d);f&&(b?a.textContent+=f:a.innerText+=f);return a}}(d.checkType,g.textContent);var y={getElementsByClassNameAlt:function(c,b){var a,d,g,m,l,n;if(b.querySelectorAll)m=b.querySelectorAll("."+c);else if(v.evaluate)for(m=[],g='"'+(" "+c+" ")+'")]',a=v.evaluate(g,b,null,0,null),g=a.iterateNext();g;)m.push(g),g=a.iterateNext();else for(n=new RegExp("(^|s)"+c+"(s|$)"),l=b.getElementsByTagName("*"),m=[],d=l.length,a=-1;++a<d;)g=l[a],n.test(g.className)&&m.push(g);return m}};d.freezeObj(y,!0);
d.set=function(){var c=d.checkType;return function(b){var a;if(!b||"object"!==typeof b)throw new TypeError("An aIV.utils.set call received an invalid settings parameter (should be an object).");for(a in p)if(p.hasOwnProperty(a)&&b.hasOwnProperty(a))if(c(b[a],l.types[a]))p[a]=b[a];else throw b=void 0,b="An aIV.utils.set call received an invalid "+a,b+=" settings parameter (should be a "+l.types[a],b+=").",new TypeError(b);return!0}}();d.reset=function(){var c,b,a;c=(c=arguments.length)?1<c?Array.prototype.slice.call(arguments,
0):Array.isArray(arguments[0])?arguments[0]:[arguments[0]]:Object.keys(p);if(!d.checkType(c,"!strings"))throw new TypeError("An aIV.utils.reset call received an invalid setting parameter (should be a string or an array of strings).");for(a=c.length;a--;)b=c[a],p.hasOwnProperty(b)&&(p[b]=l[b]);return!0};d.freezeObj(d,!0);return d}(window,document));

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

(function(window, appModuleAPI) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

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

})(window,

////////////////////////////////////////////////////////////////////////////////
// The App Module
////////////////////////////////////////////////////////////////////////////////

(function(window, document, undefined) {
  "use strict"; 

/* -----------------------------------------------------------------------------
 * Set The TypeError Message For Invalid Arguments
 * -------------------------------------------------------------------------- */

aIV.utils.set({
  checkArgsErrorMsg: 'An aIV.app internal call received an invalid parameter.'
});

/* -----------------------------------------------------------------------------
 * The App Module API (module-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (appModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the app module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var appModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Method (appModuleAPI.startApp)
   * -----------------------------------------------------
   * @desc Initializes the app.
   * @param {Object} settings - The app's settings.
   */
  appModuleAPI.startApp = function(settings) {

    /** @type {?(string|strings)} */
    var resourceList;
    /** @type {objectMap} */
    var config;
    /** @type {stringMap} */
    var sources;
    /** @type {(objectMap|stringMap)} */
    var categories;
    /** @type {!objects} */
    var questions;
    /** @type {function} */
    var setup;
    /** @type {function} */
    var callback;
    /** @type {string} */
    var types;
    /** @type {number} */
    var i;

    if (appHasBeenInitialized) {
      throw new Error('The aIV.app init call was made a second time.');
    }

    // Save the init of this app to prevent second init
    appHasBeenInitialized = true;

    if ( !checkType(settings, '!object') ) {
      settings = {};
    }

    // Setup the app arguments
    resourceList = ( ( hasOwnProp(settings, 'resources') ) ?
      settings.resources : null
    );
    config = ( ( hasOwnProp(settings, 'config') ) ?
      settings.config : ( hasOwnProp(settings, 'configuration') ) ?
        settings.configuration : null
    );
    sources = ( ( hasOwnProp(settings, 'sources') ) ?
      settings.sources : ( hasOwnProp(settings, 'source') ) ?
        settings.source : null
    );
    categories = ( ( hasOwnProp(settings, 'categories') ) ?
      settings.categories : ( hasOwnProp(settings, 'category') ) ?
        settings.category : null
    );
    questions = ( ( hasOwnProp(settings, 'questions') ) ?
      settings.questions : ( hasOwnProp(settings, 'question') ) ?
        settings.question : []
    );

    // Check the types of the arguments
    if ( !checkType(resourceList, 'string|strings') ) {
      types = 'null, a string, or an array of strings';
      logStartAppTypeError('resources', types, getTypeOf(resourceList));
      resourceList = null;
    }
    if ( !checkType(config, 'objectMap') ) {
      types = 'null or an object with string => object pairs';
      logStartAppTypeError('config', types, getTypeOf(config));
      config = null;
    }
    if ( !checkType(sources, 'stringMap') ) {
      types = 'null or an object with string => string pairs';
      logStartAppTypeError('sources', types, getTypeOf(sources));
      sources = null;
    }
    if ( !checkType(categories, 'stringMap|objectMap') ) {
      types = 'null or an object with string => object or ';
      types += 'string => string pairs';
      logStartAppTypeError('categories', types, getTypeOf(categories));
      categories = null;
    }
    if ( !checkType(questions, '!objects') ) {
      types = 'an array of question objects';
      logStartAppTypeError('questions', types, getTypeOf(questions));
      questions = [];
    }

    // Setup and start the app
    setup = function() {
      freezeObj(resources);
      App.setup(config, sources, categories, questions);
    };

    // Save the resources
    if (resourceList) {

      if ( checkType(resourceList, 'string') ) {
        getResource(resourceList, setup);
        return;
      }

      callback = setup;
      i = resourceList.length;
      while (--i) {
        callback = (function(jsonFile, callback) {         
          return function() {
            getResource(jsonFile, callback);
          };
        })(resourceList[i], callback);
      }
      getResource(resourceList[0], callback);
    }
    else {
      setup();
    }
  };

  /**
   * -----------------------------------------------------
   * Public Method (appModuleAPI.getResource)
   * -----------------------------------------------------
   * @desc Makes the app's resources publically available.
   * @param {string=} prop - The specific resource to retrieve.
   * @return {*} Either the entire resources object or one of its properties.
   */
  appModuleAPI.getResource = function(prop) {

    /** @type {string} */
    var errorMsg;
    /** @type {*} */
    var result;

    prop = prop || '';

    if (prop && !hasOwnProp(resources, prop)) {
      errorMsg = 'The resource you requested does not exist. Please verify that \'';
      errorMsg += prop + '\' is a correct json file name in the resources folder ';
      errorMsg += 'and that the file name was included in the setup of the app ';
      errorMsg += '(see algorithmiv.com/docs/resources).';
      console.error(errorMsg);
    }
    else {
      result = (!!prop) ? resources[ prop ] : resources;
    }

    return result;
  }

  aIV.utils.freezeObj(appModuleAPI);

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */


  /**
   * -----------------------------------------------------
   * Public Variable (appHasBeenInitialized)
   * -----------------------------------------------------
   * @desc Indicates whether the app has been initialized.
   * @type {boolean}
   */
  var appHasBeenInitialized = false;

  /**
   * ----------------------------------------------- 
   * Public Variable (resources)
   * -----------------------------------------------
   * @desc The resources for the app.
   * @type {!Object}
   */
  var resources = {};

  /**
   * -----------------------------------------------
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The app instance.
   * @type {!{
   *   
   *   
   * }}
   */
  var app = {};

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------
   * Public Method (getResource)
   * ---------------------------------------------
   * @desc Completes AJAX calls for downloading resources, parses
   *   and saves the JSON file, and calls the callback function.
   * @param {string} jsonFile - The JSON file to download.
   * @param {function} callback - The callback function.
   */
  function getResource(jsonFile, callback) {

    /** @type {!XMLHttpRequest} */
    var http;
    /** @type {string} */
    var errorMsg;

    checkArgs(jsonFile, 'string', callback, 'function');

    http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (http.readyState === 4) {
        if (http.status === 200) {
          resources[ jsonFile ] = JSON.parse(http.responseText);
        }
        else {
          errorMsg = 'Your aIV.app resource - resources/' + jsonFile + '.json - ';
          errorMsg += 'failed to load. Please ensure your resources folder ';
          errorMsg += 'is in the same directory as algorithmIV-app.js. ';
          errorMsg += 'XMLHttpRequest.statusText= ' + http.statusText;
          throw new Error(errorMsg);
        }
        callback();
      }
    };
    http.open('GET', 'resources/' + jsonFile + '.json', true);
    http.send();
  }

  /**
   * ---------------------------------------------
   * Public Method (getElemById)
   * ---------------------------------------------
   * @desc A shortcut for the native DOM method - document.getElementById.
   * @param {string} id - The id of the element to select.
   * @return {!HTMLElement} The DOM element with the given id.
   */
  var getElemById = aIV.utils.getElemById;

  /**
   * ---------------------------------------------------
   * Public Method (getElemByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName[ [index] ].
   * @param {string} classname - The class name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByClassRoot: [DOM Node] }).
   * @return {!HTMLElement} The selected DOM element.
   */
  var getElemByClass = aIV.utils.getElemByClass;

  /**
   * ---------------------------------------------------
   * Public Method (getElemsByClass)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByClassName.
   * @param {string} classname - The class name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByClassRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  var getElemsByClass = aIV.utils.getElemsByClass;

  /**
   * ---------------------------------------------------
   * Public Method (getElemByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName[ [index] ].
   * @param {string} tag - The tag name of the element to select.
   * @param {number=} index - The index of the array of found elements to
   *   select. The default is 0.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemByTagRoot: [DOM Node] }).
   * @return {!HTMLElement} The selected DOM element.
   */
  var getElemByTag = aIV.utils.getElemByTag;

  /**
   * ---------------------------------------------------
   * Public Method (getElemsByTag)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method -
   *   [DOM Node].getElementsByTagName.
   * @param {string} tag - The tag name of the elements to select.
   * @param {!(Document|Element)=} root - Limit the selections to this element's
   *   children. The default is document or the element set with
   *   aIV.utils.set({ getElemsByTagRoot: [DOM Node] }).
   * @return {!Array<HTMLElement>} The selected DOM elements.
   */
  var getElemsByTag = aIV.utils.getElemsByTag;

  /**
   * ---------------------------------------------------
   * Public Method (makeElem)
   * ---------------------------------------------------
   * @desc A shortcut for the native DOM method - document.createElement.
   * @param {(string|!Object<string, string>)=} settings - A string of the
   *   element's tag name or an object hash map of the element's details.
   *   The default tag name is 'div'.
   * @param {string=} settings.tag - The element's tag name.
   * @param {string=} settings.tagName - The element's tag name.
   * @param {string=} settings.text - The element's textContent or innerText.
   * @param {string=} settings.html - The element's innerHTML.
   * @param {string=} settings.id - The element's id.
   * @param {string=} settings.className - The element's class name.
   * @return {!HTMLElement} The DOM element with the given id.
   */
  var makeElem = aIV.utils.makeElem;

  /**
   * ---------------------------------------------------
   * Public Method (makeOptElem)
   * ---------------------------------------------------
   * @desc A helper function that creates option elements.
   * @param {string} id - The search item's id. If blank then the
   *   option is disabled.
   * @param {string} name - The search item's name.
   * @return {!Element}
   */
  var makeOptElem = function(id, name) {

    /** @type {!Element} */
    var elem;

    checkArgs(id, 'string', name, '^string');

    elem = makeElem({
      tag : 'option',
      text: name
    });

    if (id) {
      elem.value = id;
    }
    else {
      elem.disabled = true;
    }

    return elem;
  };

  /**
   * ---------------------------------------------------
   * Public Method (setSearchSection)
   * ---------------------------------------------------
   * @desc A helper function that sets option elements for a search section.
   * @param {?HTMLSelectElement} sel - The search section's select element.
   * @param {!strings} ids - The search section's ids.
   * @param {!stringMap} names - The search section's names.
   * @param {!elements} opts - The search section's option elements.
   * @param {boolean=} noAll - Indicates that the id of 'all' should be
   *   skipped.
   */
  var setSearchSection = function(sel, ids, names, opts, noAll) {

    /** @type {!Array<*>} */
    var args;
    /** @type {!Element} */
    var elem;
    /** @type {string} */
    var name;
    /** @type {number} */
    var len;
    /** @type {string} */
    var id;
    /** @type {number} */
    var i;

    args = [ sel, 'element', ids, '!strings', names, '!stringMap' ];
    args.push(opts, '!elements', noAll, 'boolean=');
    checkArgs.apply(null, args);

    len = ids.length;
    i = -1;
    while (++i < len) {
      id = ids[i];
      if (noAll && id === 'all') {
        continue;
      }
      name = names[ id ];
      elem = makeOptElem(id, name);
      opts.push(elem);
      sel && sel.appendChild(elem);
    }

  };

  /**
   * ---------------------------------------------------
   * Public Method (setElemText)
   * ---------------------------------------------------
   * @desc A shortcut that sets the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to set the DOM element's textContent or
   *   innerText to.
   * @return {!Element} The updated DOM element.
   */
  var setElemText = aIV.utils.setElemText;

  /**
   * ---------------------------------------------------
   * Public Method (addElemText)
   * ---------------------------------------------------
   * @desc A shortcut that adds to the native DOM property - Element.textContent
   *   or Element.innerText.
   * @param {!Element} elem - The DOM element.
   * @param {string} text - The text to add to the DOM element's textContent or
   *   innerText.
   * @return {!Element} The updated DOM element.
   */
  var addElemText = aIV.utils.addElemText;

  /**
   * ---------------------------------------------------
   * Public Method (freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with a deep freeze option.
   * @param {!(Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {!(Object|function)} The frozen object.
   */
  var freezeObj = aIV.utils.freezeObj;

  /**
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!(Object|function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  var hasOwnProp = aIV.utils.hasOwnProp;

  /**
   * ---------------------------------------------
   * Public Method (getTypeOf)
   * ---------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  var getTypeOf = aIV.utils.getTypeOf;

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}.
   * @param {boolean=} noTypeValCheck - If true skips the data type string checks.
   *   The default is false. Use to avoid duplicating checks.
   * @return {boolean} The evaluation result.
   */
  var checkType = aIV.utils.checkType;

  /**
   * ---------------------------------------------------
   * Public Method (checkArgs)
   * ---------------------------------------------------
   * @desc Catches invalid argument data types and throws an error.
   * @param {...*} val - Each argument passed to the method.
   * @param {...string} type -  Each argument's optional data types.
   *   [See aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}
   *   for the available data type strings.
   * @return {boolean} The evaluation result.
   * @example
   *   exampleMethod = function(arg1, arg2) {
   *     checkArgs(arg1, '!object', arg2, 'number=');
   *   };
   */
  var checkArgs = aIV.utils.checkArgs;

  /**
   * ---------------------------------------------------
   * Public Method (isValidTypeString)
   * ---------------------------------------------------
   * @desc Evaluates whether a string is a valid data type string.
   * @param {string} type - The string to evaluate.
   * @return {boolean} The evaluation result.
   */
  var isValidTypeString = aIV.utils.isValidTypeString;

  /**
   * ---------------------------------------------------
   * Public Method (checkTypes)
   * ---------------------------------------------------
   * @param {!Array<*>} vals - An array of the value(s) to be evaluated.
   *   Note that the values must be provided in an array.
   * @param {!(string|strings)} types - The type(s) to evaluate the value(s)
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}.
   * @return {boolean} The evaluation result.
   */
  function checkTypes(vals, types) {

    /** @type {number} */
    var i;
    /** @type {*} */
    var val;
    /** @type {string} */
    var type;
    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var errorMsg;

    checkArgs(vals, '!array', types, '!string|strings');

    if ( checkType(types, 'string') ) {
      type = types;
      types = new Array(vals.length);
      i = types.length;
      while (i--) {
        types[i] = type;
      }
    }

    if (vals.length !== types.length) {
      errorMsg = 'An aIV.app internal error occurred. A checkTypes call ';
      errorMsg += 'received an invalid parameter. The length of the vals ';
      errorMsg += 'and types arrays did not match.';
      throw new Error(errorMsg);
    }

    pass = true;
    i = vals.length;
    while (pass && i--) {
      pass = checkType(vals[i], types[i]);
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (sortKeys)
   * ---------------------------------------------------
   * @desc A helper method that sorts the keys of an object.
   * @param {!strings} ids - The unsorted keys.
   * @param {!stringMap} data - A hash map of ids and names.
   * @return {!strings} The sorted keys.
   */
  function sortKeys(ids, data) {

    /** @type {!strings} */
    var keys;
    /** @type {!strings} */
    var names;
    /** @type {string} */
    var name;
    /** @type {number} */
    var id;
    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {number} */
    var ii;

    checkArgs(ids, '!strings', data, '!stringMap');

    keys  = [];
    names = [];

    // Add the first key and its name to keys and names
    i    = ids.length - 1;
    id   = ids[i];
    name = data[id].toLowerCase();

    keys.push(id);
    names.push(name);

    // Add the remaining keys and their names in order
    while (i--) {
      id   = ids[i];
      name = data[id].toLowerCase();

      // The sorting logic (pre-sorted keys get linear time)
      len = names.length;
      ii  = 0;
      while (true) {

        if (ii === len) {
          keys.push(id);
          names.push(name);
          break;
        }

        if (name <= names[ii]) {
          keys.splice(ii, 0, id);
          names.splice(ii, 0, name);
          break;
        }

        ++ii;
      }
    }

    return keys;
  }

  /**
   * ---------------------------------------------------
   * Public Method (capFirst)
   * ---------------------------------------------------
   * @desc A helper method that capitalizes the first letter of a string.
   * @param {string} str - The original string.
   * @return {string} The capitalized string.
   */
  function capFirst(str) {

    checkArgs(str, 'string');

    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
  }

  /**
   * ---------------------------------------------------
   * Public Method (camelCase)
   * ---------------------------------------------------
   * @desc A helper method that converts a string with dashes to
   *   camel case (e.g. 'example-case' to 'exampleCase').
   * @param {string} str - The original string.
   * @return {string} The camel case string.
   */
  function camelCase(str) {

    /** @type {!strings} */
    var arr;
    /** @type {number} */
    var i;

    checkArgs(str, 'string');

    arr = str.split('-');

    // Capitalize the first letter in every word (except the first one)
    i = arr.length;
    while (--i) {
      arr[i] = capFirst(arr[i]);
    }

    str = arr.join('');

    return str;
  }

  /**
   * ---------------------------------------------------
   * Public Method (trimFunctionWrapper)
   * ---------------------------------------------------
   * @desc A helper method that removes a wrapper function from a string.
   * @param {string} str - The original string.
   * @return {string} The trimmed string.
   */
  var trimFunctionWrapper = (function setup_trimFunctionWrapper() {

    /** @type{!RegExp} */
    var funcCheck;
    /** @type{!RegExp} */
    var endCheck;

    funcCheck = /^function[\s\w]*\(\)\s*\{\s*[\r\n]{1,2}/;
    endCheck = /[\r\n]{1,2}\s*\}\;?$/;

    return function trimFunctionWrapper(str) {

      checkArgs(str, 'string');

      if (funcCheck.test(str) && endCheck.test(str)) {
        str = str.replace(funcCheck, '');
        str = str.replace(endCheck, '');
      }

      return str;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (isLink)
   * ---------------------------------------------------
   * @desc A helper method that checks if a string is a link.
   * @param {string} str - The string to check.
   * @return {boolean} The evaluation result.
   */
  var isLink = (function setup_isLink() {

    /** @type{!RegExp} */
    var http;

    http = /^https?\:\/\//;

    return function isLink(str) {

      /** @type {boolean} */
      var result;

      checkArgs(str, 'string');

      result = http.test(str);

      return result;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (makeUrl)
   * ---------------------------------------------------
   * @desc A helper method that converts a name into a valid URL string.
   * @param {string} name - The name.
   * @return {string} The url string.
   */
  var makeUrl = (function setup_makeUrl() {

    /** @type{!RegExp} */
    var invalidCharacters;
    /** @type{!RegExp} */
    var spaces;

    invalidCharacters = /[^0-9a-z\-\s\_]/g;
    spaces = /\s/g;

    return function makeUrl(name) {

      /** @type {string} */
      var url;

      checkArgs(name, 'string');

      url = name.toLowerCase();
      url = url.replace(invalidCharacters, '');
      url = url.replace(spaces, '-');

      return url;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (checkForValue)
   * ---------------------------------------------------
   * @desc A helper function that checks an array for a value & removes each
   *   value that is greater than or equal to given value from the array.
   * @param {number} checkVal - The value to check for.
   * @param {numbers} arr - The array to check & update.
   * @return {boolean} The result of the check.
   */
  function checkForValue(checkVal, arr) {

    /** @type {number} */
    var arrVal;
    /** @type {boolean} */
    var pass;
    /** @type {number} */
    var i;

    pass = false;

    i = arr.length;
    while (i-- && arr[i] >= checkVal) {
      arrVal = arr.pop();
      if (arrVal === checkVal) {
        pass = true;
        break;
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (getter)
   * ---------------------------------------------------
   * @desc The basic getter function for all the classes.
   * @this {!Object<string, *>} A hash map of the protected property names
   *   and current values for the class calling the getter.
   * @param {string} propName - The name of the protected property to get.
   * @return {*}
   */
  function getter(propName) {

    /** @type {string} */
    var errorMsg;
    /** @type {*} */
    var propVal;

    checkArgs(propName, 'string');

    if ( !hasOwnProp(this, propName) ) {
      errorMsg = 'An aIV.app internal error occurred. A getter was given an ';
      errorMsg += 'invalid property name to get. property= ' + propName;
      throw new Error(errorMsg);
    }

    propVal = this[ propName ];

    return propVal;
  }

  /**
   * ---------------------------------------------------
   * Public Method (setter)
   * ---------------------------------------------------
   * @desc The basic setter function for all the classes.
   * @this {!Object<string, function(*)>} A hash map of the protected property
   *   names and setting functions for the class calling the setter.
   * @param {string} propName - The name of the protected property to set.
   * @param {*} propVal - The value to set the property to.
   * @return {boolean} The success of the setter.
   */
  function setter(propName, propVal) {

    /** @type {string} */
    var errorMsg;
    /** @type {boolean} */
    var pass;

    checkArgs(propName, 'string');

    if ( !hasOwnProp(this, propName) ) {
      errorMsg = 'An aIV.app internal error occurred. A setter was given an ';
      errorMsg += 'invalid property name. property= ' + propName;
      throw new Error(errorMsg);
    }

    pass = this[ propName ](propVal);

    if (!pass) {
      errorMsg = 'An aIV.app internal error occurred. A setter was given an ';
      errorMsg += 'invalid new property value. value= ' + propVal;
      throw new Error(errorMsg);
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (logStartAppTypeError)
   * ---------------------------------------------------
   * @desc Logs appModuleAPI.startApp type errors for settings properties.
   * @param {string} prop - The failed settings property's name.
   * @param {string} shouldBeType - The property's acceptable data types.
   * @param {string} wasType - The property's actual data type.
   */
  function logStartAppTypeError(prop, shouldBeType, wasType) {

    /** @type {string} */
    var errorMsg;

    checkArgs(prop, 'string', shouldBeType, 'string', wasType, 'string');

    errorMsg = 'Your aIV.app settings property, ' + prop + ', was an ';
    errorMsg += 'incorrect data type. It should be ' + shouldBeType + '. ';
    errorMsg += 'The given typeof ' + prop + ' was \'' + wasType + '\'.';

    console.error(errorMsg);

  }

/* -----------------------------------------------------------------------------
 * The App Class (classes/app/app.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for this app.
   * @type {!Object<string, *>}
   * @struct
   */
  var App = {};

  /**
   * -----------------------------------------------------
   * Public Method (App.setup)
   * -----------------------------------------------------
   * @desc Defines app's properties and checks for errors before constructing
   *   the complete app object.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {!objects} questions - The user's questions.
   */
  App.setup = function(config, sources, categories, questions) {

    /** @type {!Array<*>} */
    var args;

    args = [ config, 'objectMap', sources, 'stringMap', questions, '!objects' ];
    args.push(categories, 'objectMap|stringMap');
    checkArgs.apply(null, args);

    ////////////////////////////////////////////////////////////////////////////
    // Define app's Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (App.elems)
     * -----------------------------------------------
     * @desc Saves a reference to key DOM nodes for this app.
     * @type {!AppElems}
     */
    app.elems = new AppElems();

    /**
     * ----------------------------------------------- 
     * Public Property (App.vals)
     * -----------------------------------------------
     * @desc Saves the current values for this app.
     * @type {!AppVals}
     */
    app.vals;

    /**
     * ---------------------------------------------------
     * Public Property (App.config)
     * ---------------------------------------------------
     * @type {!Config}
     */
    app.config;

    /**
     * ---------------------------------------------------
     * Public Property (App.sources)
     * ---------------------------------------------------
     * @type {!Sources}
     */
    app.sources;

    /**
     * ---------------------------------------------------
     * Public Property (App.categories)
     * ---------------------------------------------------
     * @type {!Categories}
     */
    app.categories;

    /**
     * ---------------------------------------------------
     * Public Property (App.searchBar)
     * ---------------------------------------------------
     * @type {!SearchBar}
     */
    app.searchBar;

    /**
     * ---------------------------------------------------
     * Public Property (App.questions)
     * ---------------------------------------------------
     * @type {!Questions}
     */
    app.questions;

    /**
     * ---------------------------------------------------
     * Public Property (App.isHistory)
     * ---------------------------------------------------
     * @desc Tells whether the browser has a usable History class.
     * @type {boolean}
     */
    app.isHistory;

    ////////////////////////////////////////////////////////////////////////////
    // Check for missing questions & init the app
    ////////////////////////////////////////////////////////////////////////////

    if (questions.length) {
      App.init(config, sources, categories, questions);
    }
    else {
      app.elems.appendError();
    }

    ////////////////////////////////////////////////////////////////////////////
    // End of the app's setup routine
    ////////////////////////////////////////////////////////////////////////////

  };

  /**
   * -----------------------------------------------------
   * Public Method (App.init)
   * -----------------------------------------------------
   * @desc The constructor for App.
   * @param {?objectMap} config - The user's config settings.
   * @param {?stringMap} sources - The user's sources.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @param {!objects} questions - The user's questions.
   */
  App.init = function(config, sources, categories, questions) {

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!booleanMap} */
    var tmpConfig;
    /** @type {Object<string, (string|number)>} */
    var defaults;
    /** @type {function} */
    var get;
    
    app.vals = new AppVals(questions.length);

    app.config = new Config(config);

    app.sources = new Sources(sources);

    app.categories = new Categories(categories);

    get = app.config.prettifier.get;
    tmpConfig = {
      trimSpace   : get('trimSpace'),
      tabLength   : get('tabLength'),
      commentLinks: get('commentLinks')
    };
    prettify.setConfig(tmpConfig);

    get = app.config.searchBar.get;
    tmpConfig = {
      stage   : get('stage'),
      source  : get('source'),
      category: get('category'),
      subCat  : get('subCat')
    };
    app.searchBar = new SearchBar(tmpConfig);

    get = app.config.questions.get;
    tmpConfig = {
      id      : get('id'),
      complete: get('complete'),
      source  : get('source'),
      category: get('category'),
      subCat  : get('subCat'),
      links   : get('links'),
      output  : get('output')
    };
    app.questions = new Questions(questions, tmpConfig);

    defaults = ( (config && hasOwnProp(config, 'searchDefaults')) ?
      config.searchDefaults : null
    );
    app.config.searchBar.defaults.update(defaults);

    get = app.config.searchBar.defaults.get;
    defaults = {
      view   : get('view'),
      order  : get('order'),
      stage  : get('stage'),
      source : get('source'),
      mainCat: get('mainCat'),
      subCat : get('subCat')
    };
    app.searchBar.setToDefaults(defaults);

    App.setToDefaults(get('startID'), App.findMatches()); // index, ids);

    app.isHistory = App.setHistory();

    App.setupDisplay();

    ////////////////////////////////////////////////////////////////////////////
    // End of the app's init routine
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(app);

  };

////////////////////////////////////////////////////////////////////////////////
// The methods for setting up & updating the app's state & display
////////////////////////////////////////////////////////////////////////////////

  /**
   * -----------------------------------------------
   * Public Method (App.setupDisplay)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function}
   */
  App.setupDisplay = function() {

    /** @type {number} */
    var renderTime;
    /** @type {boolean} */
    var flip;

    renderTime = app.questions.len * 50;

    app.elems.appendNav();
    app.searchBar.setOptElems();
    app.searchBar.appendElems();
    app.questions.addIdsToSearch();
    app.questions.appendElems();

    // Allow the DOM time to process the appended elements before continuing
    setTimeout(function() {

      app.questions.addCodeExts();
      app.elems.hold.style.display = 'none';
      flip = (app.searchBar.vals.order === 'desc');
      App.updateDisplay(null, null, null, flip, true);

    }, renderTime);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.updateDisplay)
   * -----------------------------------------------
   * @desc Show the current matching questions for the app.
   * @param {numbers=} oldIds - The old matching ids.
   * @param {?number=} oldIndex - The old ids index.
   * @param {?string=} oldView - The value of view before the
   *   update. Defaults to the value of the new view.
   * @param {boolean=} flipElems - If set to true it indicates that
   *   the order of each question's element should be flipped.
   * @param {boolean=} noPushState - If set to true it indicates
   *   that the pushState call should NOT be made.
   */
  App.updateDisplay = function(oldIds, oldIndex, oldView,
                               flipElems, noPushState) {

    /** @type {!Array<*>} */
    var args;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var newView;

    args = [ oldIds, 'numbers=', oldIndex, '?number=', oldView, '?string=' ];
    args.push(flipElems, 'boolean=', noPushState, 'boolean=');
    checkArgs.apply(null, args);

    oldIds = oldIds || app.vals.get('ids').slice(0);
    if ( !checkType(oldIndex, 'number') ){
      oldIndex = app.vals.get('index');
    }

    newView = app.searchBar.vals.view;
    oldView = oldView || newView;

    newIds = app.vals.get('ids').slice(0);
    newIndex = app.vals.get('index');

    // Hide the question's main element
    app.elems.main.style.opacity = '0';

    // Wrap logic in timeout to allow css transitions to complete
    setTimeout(function() {

      // Show or hide the prev and next nav elements
      app.elems.nav.style.display = ( (newView === 'all') ?
        'none' : (newView === 'ten' && app.vals.get('len') > 10) ?
          'block' : (newView === 'one' && app.vals.get('len') > 1) ?
            'block' : 'none'
      );

      flipElems && app.questions.reverseElems();
      app.questions.hideElems(oldIds, oldIndex, oldView);
      app.questions.showElems(newIds, newIndex);

      if (app.isHistory && !noPushState) {
        window.history.pushState(App.makeStateObj(), '');
      }

      // Show the question's main element
      app.elems.main.style.opacity = '1';

    }, 520);
  };

////////////////////////////////////////////////////////////////////////////////
// The App's helper methods
////////////////////////////////////////////////////////////////////////////////

  /**
   * -----------------------------------------------
   * Public Method (App.findMatches)
   * -----------------------------------------------
   * @desc Finds the matching question ids for the current selected search
   *   values.
   * @return {!numbers} An array of the matching ids.
   */
  App.findMatches = function() {

    /** @type {numbers} */
    var stage;
    /** @type {numbers} */
    var source;
    /** @type {numbers} */
    var mainCat;
    /** @type {numbers} */
    var subCat;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {numbers} */
    var newIds;
    /** @type {boolean} */
    var pass;

    // Save the current values
    stage   = app.searchBar.vals.stage;
    source  = app.searchBar.vals.source;
    mainCat = app.searchBar.vals.mainCat;
    subCat  = app.searchBar.vals.subCat;

    // Save the matching ids
    stage = ( (stage === 'all') ?
      null : app.searchBar.ques.stage[ stage ].slice(0)
    );
    source = ( (source === 'all') ?
      null : app.sources.get(source, 'ids').slice(0)
    );
    mainCat = ( (mainCat === 'all') ?
      null : app.categories.get(mainCat, 'ids').slice(0)
    );
    subCat = ( (subCat === 'all') ?
      null : app.categories.get(subCat, 'ids').slice(0)
    );

    // Check for empty arrays
    if ((stage   && !stage.length)   ||
        (source  && !source.length)  ||
        (mainCat && !mainCat.length) ||
        (subCat  && !subCat.length)) {
      newIds = [];
      return newIds;
    }

    // Check for all ids
    if (!stage && !source && !mainCat && !subCat) {
      newIds = app.vals.get('allIds').slice(0);
      if (app.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      return newIds;
    }

    // Find the min length array
    len = (stage) ? stage.length : app.questions.len;
    if (source && source.length < len) {
      len = source.length;
    }
    if (mainCat && mainCat.length < len) {
      len = mainCat.length;
    }
    if (subCat && subCat.length < len) {
      len = subCat.length;
    }

    // Set the newIds to the min length array
    if (stage && stage.length === len) {
      newIds = stage.slice(0);
      stage = null;
    }
    else if (source && source.length === len) {
      newIds = source.slice(0);
      source = null;
    }
    else if (mainCat && mainCat.length === len) {
      newIds = mainCat.slice(0);
      mainCat = null;
    }
    else if (subCat && subCat.length === len) {
      newIds = subCat.slice(0);
      subCat = null;
    }

    // Check for all null arrays
    if (!stage && !source && !mainCat && !subCat) {
      if (app.searchBar.vals.order === 'desc') {
        newIds.reverse();
      }
      return newIds;
    }

    // Remove the question ids that do not exist in all other arrays
    i = newIds.length;
    while (i--) {
      pass = true;

      if (stage) {
        if (!stage.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], stage);
      }

      if (source) {
        if (!source.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], source);
      }

      if (mainCat) {
        if (!mainCat.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], mainCat);
      }

      if (subCat) {
        if (!subCat.length) {
          if (i) {
            newIds.splice(0, i);
          }
          break;
        }
        pass = pass && checkForValue(newIds[i], subCat);
      }

      if (!pass) {
        newIds.splice(i, 1);
      }
    }

    if (app.searchBar.vals.order === 'desc') {
      newIds.reverse();
    }

    return newIds;
  };

  /**
   * -----------------------------------------------
   * Public Method (App.setToDefaults)
   * -----------------------------------------------
   * @desc Updates the app's values to match the defaults.
   * @param {number} newIndex
   * @param {!numbers} newIds
   */
  App.setToDefaults = function(newIndex, newIds) {

    checkArgs(newIndex, 'number', newIds, '!numbers');

    if (newIndex > 0) {
      app.searchBar.vals.view = 'one';
      newIndex = newIds.indexOf(newIndex);
    }

    if (app.searchBar.vals.view === 'all' || !newIds.length) {
      newIndex = -1;
    }
    else if (newIndex < 0 || newIndex >= newIds.length) {
      newIndex = 0;
    }

    app.vals.set(newIds, newIndex);

  };

  /**
   * -----------------------------------------------
   * Public Method (App.setHistory)
   * -----------------------------------------------
   * @desc Checks whether the browser supports the native History object and if
   *   the browser supports it this method sets up its properties for the app.
   * @return {boolean} Whether the browser supports the native History object.
   */
  App.setHistory = function() {

    /** @type {boolean} */
    var pass;

    pass = true;

    try {
      window.history.replaceState(App.makeStateObj(), '');
    }
    catch (e) {
      pass = false;
    }

    if (pass) {
      window.onpopstate = function(event) {
        Events.popState( JSON.parse(event.state) );
      };
    }

    return pass;
  };

  /**
   * -----------------------------------------------
   * Public Method (App.makeStateObj)
   * -----------------------------------------------
   * @desc Returns a state object for the current app values.
   * @return {!Object<string, (string|number|!numbers)>}
   */
  App.makeStateObj = function() {

    /** @type {!Object<string, string>} */
    var searchVals;
    /** @type {!Object<string, (string|number|!numbers)>} */
    var vals;

    searchVals = app.searchBar.vals;
    vals = {
      ids    : app.vals.get('ids').slice(0),
      index  : app.vals.get('index'),
      view   : searchVals.view,
      order  : searchVals.order,
      stage  : searchVals.stage,
      source : searchVals.source,
      mainCat: searchVals.mainCat,
      subCat : searchVals.subCat
    };

    vals = JSON.stringify(vals);

    return vals;
  };

  freezeObj(App, true);

/* -----------------------------------------------------------------------------
 * The AppElems Class (classes/app/app-elems.js)
 * -------------------------------------------------------------------------- */

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
      '<a href="mailto:learn@algorithmiv.com" class="dark">'                 +
      'learn@algorithmiv.com</a>. We will solve your problem or answer '     +
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

/* -----------------------------------------------------------------------------
 * The AppVals Class (classes/app/app-vals.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (AppVals)
   * -----------------------------------------------------
   * @desc The app's current values.
   * @param {number} questionsLen - The total number of questions.
   * @constructor
   */
  var AppVals = function(questionsLen) {

    checkArgs(questionsLen, 'number');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.allIds)
     * -----------------------------------------------
     * @desc The ids of all of the questions.
     * @type {!numbers}
     * @private
     */
    var allIds;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.ids)
     * -----------------------------------------------
     * @desc The ids of the questions that match the current search criteria.
     * @type {!numbers}
     * @private
     */
    var ids;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.len)
     * -----------------------------------------------
     * @desc The number of questions that match the current search criteria.
     * @type {number}
     * @private
     */
    var len;

    /**
     * -----------------------------------------------
     * Protected Property (AppVals.index)
     * -----------------------------------------------
     * @desc The current index of the ids array being displayed.
     *   If the view = 'all' or no ids match then index = -1.
     * @type {number}
     * @private
     */
    var index;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;

    allIds = new Array(questionsLen);
    i = questionsLen;
    while (i--) {
      allIds[i] = i + 1;
    }

    ids = allIds.slice(0);
    len = questionsLen;
    index = -1;

    // Freeze the needed protected properties
    freezeObj(allIds);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------------
     * Public Method (AppVals.get)
     * ----------------------------------------------------
     * @desc Gets an AppVals protected property.
     * @param {string} prop - The name of the property to get.
     * @return {!(number|numbers)}
     */
    this.get = function(prop) {

      /** @type {Object<string, (number|numbers)>} */
      var props = {
        allIds: allIds,
        ids   : ids,
        len   : len,
        index : index
      };

      return getter.call(props, prop);
    };

    /**
     * ----------------------------------------------------
     * Public Method (AppVals.set)
     * ----------------------------------------------------
     * @desc Sets the app's current values.
     * @param {numbers} newIds - The new matching question ids.
     * @param {number=} newIndex - The new starting index.
     */
    this.set = function(newIds, newIndex) {

      checkArgs(newIds, 'numbers', newIndex, 'number=');

      if (newIds) {
        ids = newIds.slice(0);
        len = ids.length;
      }

      if ( checkType(newIndex, 'number') ) {
        index = newIndex;
      }

    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  AppVals.prototype.constructor = AppVals;

  /**
   * ----------------------------------------------------
   * Public Method (AppVals.prototype.reset)
   * ----------------------------------------------------
   * @desc Resets the app values.
   * @param {numbers} ids - The new matching question ids.
   * @param {number=} index - The new starting index.
   */
  AppVals.prototype.reset = function(ids, index) {

    /** @type {number} */
    var len;

    checkArgs(ids, 'numbers', index, 'number=');

    index = index || 0;

    ids = ids || this.get('allIds');
    len = ids.length;

    // Check the new index value
    if (app.searchBar.vals.view === 'all' || !len) {
      index = -1;
    }
    else if (index < 0 || index >= len) {
      index = 0;
    }

    // Reset the values
    this.set(ids, index);

  };

  /**
   * ----------------------------------------------------
   * Public Method (AppVals.prototype.move)
   * ----------------------------------------------------
   * @desc Go to the prev, next, or a specific index.
   * @param {(string|number)} way - The location to move the index.
   *   The options are 'prev', 'next', or a question id.
   * @return {number} The new index.
   */
  AppVals.prototype.move = (function setupAppVals_move() {

    /** function(string) */
    var throwParamError = function(way) {

      /** @type {string} */
      var errorMsg;

      errorMsg = 'An aIV.app internal error occurred. An AppVals.move call ';
      errorMsg += 'received an invalid way parameter. way= ' + way;
      throw new Error(errorMsg);
    };

    return function move(way) {

      /** @type {number} */
      var id;
      /** @type {string} */
      var view;
      /** @type {number} */
      var index;
      /** @type {number} */
      var last;

      checkArgs(way, 'string|number');

      if ( checkType(way, 'number') ) {
        id  = way;
        way = null;
      }
      else {
        id = 0;
      }

      index = this.get('index');

      // Check the value for way & convert number strings to a number
      if (typeof way === 'string' && way !== 'prev' && way !== 'next') {
        id = way.replace(/[^0-9]/g, '');
        id = id && Number(id);
        id || throwParamError(way);
        way = null;
      }

      view = app.searchBar.vals.view;

      if (way) {

        // Save the last index
        last = this.get('len') - 1;

        if (view === 'one') {

          // Handle moving the index one spot
          if (way === 'prev') {
            index = (index === 0) ? last : --index;
          }
          else if (way === 'next') {
            index = (index === last) ? 0 : ++index;
          }
        }
        else if (view === 'ten') {

          // Handle moving the index ten spots
          last = last - (last % 10);
          if (way === 'prev') {
            index = (index === 0) ? last : (index - 10);
          }
          else if (way === 'next') {
            index = (index === last) ? 0 : (index + 10);
          }
        }
      }
      else {

        // Handle moving to a specific question id
        (id) || (id <= app.questions.len) || throwParamError(id);
        if (view !== 'one') {
          app.searchBar.vals.view = 'one';
        }
        index = this.get('ids').indexOf(id);
        (index !== -1) || throwParamError(id);
      }

      this.set(null, index);

      return index;
    };
  })();

/* -----------------------------------------------------------------------------
 * The Config Class (classes/config/config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Config)
   * -----------------------------------------------------
   * @desc The configuration settings for this app.
   * @param {Object<string, Object>} config - The user's config settings.
   * @constructor
   */
  var Config = function(config) {

    checkArgs(config, 'objectMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Config.searchBar)
     * -----------------------------------------------
     * @desc The search bar's configuration settings.
     * @type {SearchBarConfig}
     * @struct
     */
    this.searchBar;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.questions)
     * -----------------------------------------------
     * @desc The question's formatting settings.
     * @type {QuestionsConfig}
     * @struct
     */
    this.questions;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.prettifier)
     * -----------------------------------------------
     * @desc The prettifier's settings.
     * @type {PrettyConfig}
     * @struct
     */
    this.prettifier;

    /**
     * ----------------------------------------------- 
     * Public Property (Config.links)
     * -----------------------------------------------
     * @desc Whether to display search links for each question.
     * @type {LinksConfig}
     */
    this.links;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    // Check the given user's config object
    if ( !checkType(config, '!object') ) {
      config = {};
    }

    if ( !checkType(config.searchSettings, '!object') ) {
      config.searchSettings = {};
    }
    if ( !checkType(config.questionFormat, '!object') ) {
      config.questionFormat = {};
    }
    if ( !checkType(config.prettifyFormat, '!object') ) {
      config.prettifyFormat = {};
    }
    if ( !checkType(config.showLinks, '!object') ) {
      config.showLinks = {};
    }

    // Setup the properties
    this.searchBar  = new SearchBarConfig(config.searchSettings);
    this.questions  = new QuestionsConfig(config.questionFormat);
    this.prettifier = new PrettyConfig(config.prettifyFormat);
    this.links      = new LinksConfig(config.showLinks);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Config.prototype.constructor = Config;

/* -----------------------------------------------------------------------------
 * The SearchBarConfig Class (classes/config/search-bar-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (SearchBarConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the search bar in this app.
   * @param {!Object} config - The user's search bar config settings.
   * @constructor
   */
  var SearchBarConfig = function(config) {

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarConfig.defaults)
     * -----------------------------------------------
     * @desc The default search options to display upon app init.
     * @type {DefaultsSearchBarConfig}
     */
    this.defaults = new DefaultsSearchBarConfig();

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.stage)
     * -----------------------------------------------
     * @desc Whether to display the stage search option.
     * @type {boolean}
     * @private
     */
    var stage;

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.source)
     * -----------------------------------------------
     * @desc Whether to display the source search option.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.category)
     * -----------------------------------------------
     * @desc Whether to display the category search option.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Protected Property (SearchBarConfig.subCat)
     * -----------------------------------------------
     * @desc Whether to display the sub category search option.
     * @type {boolean}
     * @private
     */
    var subCat;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    stage    = !(config.stage    === false);
    source   = !(config.source   === false);
    category = !(config.category === false);
    subCat   = !(config.subCat   === false);

    if (!category && subCat) {
      subCat = false;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (SearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from SearchBarConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        stage   : stage,
        source  : source,
        category: category,
        subCat  : subCat
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBarConfig.prototype.constructor = SearchBarConfig;

/* -----------------------------------------------------------------------------
 * The DefaultsSearchBarConfig (classes/config/defaults-search-bar-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (DefaultsSearchBarConfig)
   * -----------------------------------------------------
   * @desc The onLoad search defaults for this app.
   * @constructor
   */
  var DefaultsSearchBarConfig = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.startID)
     * ---------------------------------------------------
     * @desc The first question to display.
     * @type {number}
     * @private
     */
    var startID;

    /**
     * ----------------------------------------------- 
     * Protected Property (DefaultsSearchBarConfig.view)
     * -----------------------------------------------
     * @desc The search view option to load the app with.
     * @type {string}
     * @private
     */
    var view;

    /**
     * ------------------------------------------------- 
     * Protected Property (DefaultsSearchBarConfig.order)
     * -------------------------------------------------
     * @desc The search order option to load the app with.
     * @type {string}
     * @private
     */
    var order;

    /**
     * ------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.stage)
     * ------------------------------------------------
     * @desc The search stage option to load the app with.
     * @type {string}
     * @private
     */
    var stage;

    /**
     * ------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.source)
     * ------------------------------------------------
     * @desc The search source option to load the app with.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ---------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.mainCat)
     * ---------------------------------------------------
     * @desc The search main category option to load the app with.
     * @type {string}
     * @private
     */
    var mainCat;

    /**
     * -------------------------------------------------
     * Protected Property (DefaultsSearchBarConfig.subCat)
     * -------------------------------------------------
     * @desc The search sub category option to load the app with.
     * @type {string}
     * @private
     */
    var subCat;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    startID = 0;
    view    = 'one';
    order   = 'asc';
    stage   = 'all';
    source  = 'all';
    mainCat = 'all';
    subCat  = 'all';

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from DefaultsSearchBarConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(string|number)} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, (string|number)>} */
      var props = {
        startID: startID,
        view   : view,
        order  : order,
        stage  : stage,
        source : source,
        mainCat: mainCat,
        subCat : subCat
      };

      return getter.call(props, prop);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (DefaultsSearchBarConfig.set)
     * -----------------------------------------------
     * @desc Sets a protected property's value for DefaultsSearchBarConfig.
     * @param {string} prop - The name of the property to set.
     * @param {(string|number)} val - The value to set the property to.
     * @return {boolean} The setter's success.
     */
    this.set = function(prop, val) {

      /** @type {Object<string, function(*): boolean>} */
      var setters = {
        startID: function(val) { startID = val; return true; },
        view   : function(val) { view    = val; return true; },
        order  : function(val) { order   = val; return true; },
        stage  : function(val) { stage   = val; return true; },
        source : function(val) { source  = val; return true; },
        mainCat: function(val) { mainCat = val; return true; },
        subCat : function(val) { subCat  = val; return true; }
      };

      return setter.call(setters, prop, val);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  DefaultsSearchBarConfig.prototype.constructor = DefaultsSearchBarConfig;

  /**
   * ---------------------------------------------------------
   * Public Method (DefaultsSearchBarConfig.prototype.update)
   * ---------------------------------------------------------
   * @desc Sets the search defaults to the user's settings.
   * @param {Object} defaults - The user's search defaults.
   */
  DefaultsSearchBarConfig.prototype.update = function(defaults) {

    /** @type {number} */
    var i;
    /** @type {!Object} */
    var ids;
    /** @type {!Array<*>} */
    var args;
    /** @type {string} */
    var prop;
    /** @type {!Object<string, stringMap>} */
    var names;
    /** @type {!Array<string>} */
    var props;
    /** @type {(number|string)} */
    var startID;
    /** @type {string} */
    var mainCat;

    checkArgs(defaults, 'object');

    defaults = defaults || {};
    ids = app.searchBar.ids.subCat;
    names = app.searchBar.names;

    // Set the view, order, stage, source, & main category
    props = 'view order stage source mainCat'.split(' ');
    i = props.length;
    while (i--) {
      prop = props[i];
      if (checkType(defaults[ prop ], 'string') &&
          hasOwnProp(names[ prop ], defaults[ prop ])) {
        this.set(prop, defaults[ prop ]);
      }
    }

    // Set the startID
    if ( checkType(defaults.startID, 'number|string') ) {
      startID = defaults.startID;
      if ( checkType(startID, 'string') ) {
        startID = startID.replace(/[^0-9]/g, '');
        startID = startID && Number(startID);
      }
      if (startID && startID <= app.questions.len) {
        this.set('startID', startID);
      }
    }

    // Set the sub category
    if (checkType(defaults.subCat, 'string') && defaults.subCat !== 'all' &&
        hasOwnProp(names.subCat, defaults.subCat)) {
      mainCat = this.get('mainCat');
      if (mainCat === 'all') {
        this.set('subCat', defaults.subCat);
      }
      else {
        if (ids.subCat[ mainCat ].indexOf(defaults.subCat) !== -1) {
          this.set('subCat', defaults.subCat);
        }
      }
    }

  };

/* -----------------------------------------------------------------------------
 * The QuestionsConfig Class (classes/config/questions-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (QuestionsConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for formatting questions in this app.
   * @param {!Object} config - The user's question format config settings.
   * @constructor
   */
  var QuestionsConfig = function(config) {

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.id)
     * -----------------------------------------------
     * @desc Whether to display any question's id.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.complete)
     * -----------------------------------------------
     * @desc Whether to display any question's completion status.
     * @type {boolean}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.source)
     * -----------------------------------------------
     * @desc Whether to display any question's source.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.category)
     * -----------------------------------------------
     * @desc Whether to display any question's categories.
     * @type {boolean}
     * @private
     */
    var category;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.subCat)
     * -----------------------------------------------
     * @desc Whether to display any question's sub categories.
     * @type {boolean}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.links)
     * -----------------------------------------------
     * @desc Whether to display any question's links.
     * @type {boolean}
     * @private
     */
    var links;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.problem)
     * -----------------------------------------------
     * @desc Whether to display any question's problem.
     * @type {boolean}
     * @private
     */
    var problem;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.descr)
     * -----------------------------------------------
     * @desc Whether to display any question's description.
     * @type {boolean}
     * @private
     */
    var descr;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionsConfig.output)
     * -----------------------------------------------
     * @desc Whether to display the solution's output for any question.
     * @type {boolean}
     * @private
     */
    var output;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    id       = !(config.id       === false);
    complete = !(config.complete === false);
    source   = !(config.source   === false);
    category = !(config.category === false);
    subCat   = !(config.subCat   === false);
    links    = !(config.links    === false);
    problem  = !(config.problem  === false);
    descr    =  (config.descr    === true );
    output   = !(config.output   === false);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionsConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from QuestionsConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        id      : id,
        complete: complete,
        source  : source,
        category: category,
        subCat  : subCat,
        links   : links,
        problem : problem,
        descr   : descr,
        output  : output
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  QuestionsConfig.prototype.constructor = QuestionsConfig;
  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {!objects} questions - The user's questions.
   * @param {!booleanMap} config - The settings for question formatting.
   * @constructor
   */
  var Questions = function(questions, config) {

    checkArgs(questions, '!objects', config, '!booleanMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The total number of questions.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.list)
     * -----------------------------------------------
     * @desc An array of all the question objects.
     * @return {questions}
     */
    this.list;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {number} */
    var len;

    this.len = questions.length;

    i = this.len + 1;
    this.list = (this.len) ? new Array(i) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    len = this.len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config);
    }

    // Freeze the public properties that are objects
    freezeObj(this.list);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {Object<string, Question>}
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var url;

    data = {};

    // Build the data hash map
    i = this.len + 1;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[ url ] = this.list[i];
      }
    }

    // Freeze the protected properties
    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question's object or property value.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The Question or property value.
     */
    this.get = function(id, prop, formatted) {

      /** @type {string} */
      var errorMsg;
      /** @type {!Question} */
      var question;
      /** @type {*} */
      var result;

      checkArgs(id, 'number|string', prop, 'string=', formatted, 'boolean=');

      if (!hasOwnProp(this.list, id) && !hasOwnProp(data, id)) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.get call was ';
        errorMsg += 'given an invalid question id to get. id= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      formatted = formatted || false;

      question = ( checkType(id, 'number') ) ? this.list[ id ] : data[ id ];
      result = ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : (prop === 'rootElem') ?
            question.elem.root : question.get(prop, formatted)
      );

      return result;
    };

    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Questions.prototype.constructor = Questions;

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemStyle)
   * ---------------------------------------------------
   * @desc Sets the style for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {(string|!Object)} type - The style setting to set.
   *   If a string is given then another param with the value is
   *   required. If an object is provided then use key => value
   *   pairs like styleType => newValue (see below example).
   * @param {(string|number)=} val - If the type param is a string then
   *   this is the new value for the it.
   * @example
   *   app.questions.setElemStyle(5, { display: 'none' });
   *   // OR
   *   app.questions.setElemStyle(5, 'display', 'none');
   */
  Questions.prototype.setElemStyle = function(id, type, val) {

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<*>} */
    var args;
    /** @type {!Element} */
    var elem;
    /** @type {!RegExp} */
    var dash;
    /** @type {string} */
    var prop;
    /** @type {number} */
    var i;

    args = [ id, 'number|string', type, '!string|object' ];
    args.push(val, 'string|number=');
    checkArgs.apply(null, args);

    dash = /\-/;

    // Handle one update
    if ( checkType(type, 'string') ) {

      if ( !checkType(val, 'string|number') ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'value to set the style to. val= ' + val;
        throw new TypeError(errorMsg);
      }

      // Replace dashes with camel case
      if ( dash.test(type) ) {
        type = camelCase(type);
      }

      elem = this.get(id, 'rootElem');

      if ( !(type in elem.style) ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'style property to set. prop= ' + type;
        throw new Error(errorMsg);
      }

      elem.style[ type ] = val;
    }
    // Handle multiple updates
    else {

      elem = this.get(id, 'rootElem');

      for (prop in type) {
        if ( hasOwnProp(type, prop) ) {

          // Replace dashes with camel case
          if ( dash.test(prop) ) {
            prop = camelCase(prop);
          }

          if ( !(prop in elem.style) ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'style property to set. prop= ' + prop;
            throw new Error(errorMsg);
          }

          val = type[ prop ];

          if ( !checkType(val, 'string|number') ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'value to set a style to. prop= ' + prop + ', ';
            errorMsg += 'val= ' + val;
            throw new TypeError(errorMsg);
          }

          elem.style[ prop ] = val;
        }
      }
    }

  };

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemClass)
   * ---------------------------------------------------
   * @desc Sets the class name for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {string} newClassName - The new class name.
   */
  Questions.prototype.setElemClass = function(id, newClassName) {

    checkArgs(id, 'number|string', newClassName, 'string');

    this.get(id, 'rootElem').className = newClassName;

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addIdsToSearch)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function}
   */
  Questions.prototype.addIdsToSearch = function() {

    /** @type {!booleanMap} */
    var config;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    config = {
      stage   : app.config.searchBar.get('stage'),
      source  : app.config.searchBar.get('source'),
      category: app.config.searchBar.get('category'),
      subCat  : app.config.searchBar.get('subCat')
    };
    config.source = config.source || app.config.links.get('source');
    config.category = config.category || app.config.links.get('category');
    config.subCat = config.subCat || app.config.links.get('category');

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.get(id).addToSearch(config);
    }

    app.sources.freezeIds();
    app.categories.freezeIds();

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function}
   */
  Questions.prototype.appendElems = function() {

    /** @type {!Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      question = this.get(id);
      app.elems.ques.appendChild(question.elem.root);
      question.addElemContent();
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addCodeExts)
   * -----------------------------------------------------
   * @desc If overflow occurs in a question's code element it enables
   *   the auto extend button for the question.
   * @type {function}
   */
  Questions.prototype.addCodeExts = function() {

    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.get(id, 'elem').addCodeExt();
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.reverseElems)
   * -----------------------------------------------------
   * @desc Appends each question's element to #aIV-questions in the direction
   *   of the current search order.
   * @type {function}
   */
  Questions.prototype.reverseElems = function() {

    /** @type {string} */
    var direction;
    /** @type {!Element} */
    var elem;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    direction = app.searchBar.vals.order;
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      id = 0;
      while (++id < len) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }
    // Appends in desc order
    else {
      id = len;
      while (--id) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.hideElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'none' for the provided questions.
   * @param {!numbers} ids - The previous active question ids.
   * @param {number} index - The index of the ids to hide from view.
   * @param {string} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    /** @type {string} */
    var errorMsg;
    /** @type {number} */
    var i;

    checkArgs(ids, '!numbers', index, 'number', view, 'string');

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
      }
      // Hide all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      // Hide only the index of the provided ids
      if (view === 'one') {
        this.setElemStyle(ids[ index ], 'display', 'none');
      }
      // Hide the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be hidden
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.showElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'block' for the provided questions.
   * @param {!numbers} ids - The new active question ids.
   * @param {number} index - The index of the ids to show.
   */
  Questions.prototype.showElems = function(ids, index) {

    /** @type {number} */
    var i;
    /** @type {string} */
    var view;
    /** @type {string} */
    var errorMsg;
    /** @type {string} */
    var newClassName;

    checkArgs(ids, '!numbers', index, 'number');

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
      }
      // Show all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      view = app.searchBar.vals.view;

      // Show only the index of the provided ids
      if (view === 'one') {
        this.setElemClass(ids[ index ], 'question shade1 hideLink');
        this.setElemStyle(ids[ index ], 'display', 'block');
      }
      // Show the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be shown
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }

  };

/* -----------------------------------------------------------------------------
 * The PrettyConfig Class (classes/config/pretty-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (PrettyConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for the prettifier.
   * @param {!Object<string, (string|number|boolean)>} config - The user's
   *   prettifier configuration settings.
   * @constructor
   */
  var PrettyConfig = function(config) {

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.trimSpace)
     * -----------------------------------------------
     * @desc The number of spaces to trim from the beginning of lines.
     * @type {number}
     * @private
     */
    var trimSpace;

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.tabLength)
     * -----------------------------------------------
     * @desc The number of spaces to convert tab characters.
     * @type {number}
     * @private
     */
    var tabLength;

    /**
     * ----------------------------------------------- 
     * Protected Property (PrettyConfig.commentLinks)
     * -----------------------------------------------
     * @desc Whether to allow links in prettified comments.
     * @type {boolean}
     * @private
     */
    var commentLinks;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    trimSpace = 0;
    tabLength = 2;
    commentLinks = (config.commentLinks === true);

    if ( hasOwnProp(config, 'trimSpace') ) {
      if (checkType(config.trimSpace, 'number') && config.trimSpace >= 0) {
        trimSpace = Math.floor(config.trimSpace);
      }
      else if ( checkType(config.trimSpace, 'string') ) {
        config.trimSpace = config.trimSpace.replace(/[^0-9]/g, '');
        if (config.trimSpace) {
          trimSpace = Number(config.trimSpace);
        }
      }
    }

    if ( hasOwnProp(config, 'tabLength') ) {
      if (checkType(config.tabLength, 'number') && config.tabLength >= 0) {
        tabLength = Math.floor(config.tabLength);
      }
      else if ( checkType(config.tabLength, 'string') ) {
        config.tabLength = config.tabLength.replace(/[^0-9]/g, '');
        if (config.tabLength) {
          tabLength = Number(config.tabLength);
        }
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (PrettyConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from PrettyConfig.
     * @param {string} prop - The name of the property to get.
     * @return {(number|boolean)} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, (number|boolean)>} */
      var props = {
        trimSpace   : trimSpace,
        tabLength   : tabLength,
        commentLinks: commentLinks
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  PrettyConfig.prototype.constructor = PrettyConfig;

/* -----------------------------------------------------------------------------
 * The LinksConfig Class (classes/config/links-config.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (LinksConfig)
   * -----------------------------------------------------
   * @desc The configuration settings for whether to show search links for
   *   portions of each question.
   * @param {!Object<string, boolean>} config - The user's config settings
   *   for search link formatting.
   * @constructor
   */
  var LinksConfig = function(config) {

    checkArgs(config, '!object');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (LinksConfig.id)
     * -----------------------------------------------
     * @desc Whether to display an id search option for every question.
     * @type {boolean}
     * @private
     */
    var id;

    /**
     * ------------------------------------------------- 
     * Protected Property (LinksConfig.source)
     * -------------------------------------------------
     * @desc Whether to display a source search option for every question.
     * @type {boolean}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------------
     * Protected Property (LinksConfig.category)
     * ----------------------------------------------------
     * @desc Whether to display a category search option in the url.
     * @type {boolean}
     * @private
     */
    var category;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    id       = !(config.id       === false);
    source   =  (config.source   === true );
    category = !(config.category === false);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (LinksConfig.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from LinksConfig.
     * @param {string} prop - The name of the property to get.
     * @return {boolean} The property's value.
     */
    this.get = function(prop) {

      /** @type {!Object<string, boolean>} */
      var props = {
        id      : id,
        source  : source,
        category: category
      };

      return getter.call(props, prop);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  LinksConfig.prototype.constructor = LinksConfig;

/* -----------------------------------------------------------------------------
 * The Sources Class (classes/sources.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Sources)
   * -----------------------------------------------------
   * @desc The available sources for each question.
   * @param {?stringMap} sources - The user's sources.
   * @constructor
   */
  var Sources = function(sources) {

    checkArgs(sources, 'stringMap');

    ////////////////////////////////////////////////////////////////////////////
    // Prepare The User Supplied Params
    ////////////////////////////////////////////////////////////////////////////

    if ( !checkType(sources, '!stringMap') ) {
      sources = {};
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the source ids in alphabetical order.
     * @type {strings}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (Sources.len)
     * -----------------------------------------------
     * @desc Saves the count of sources.
     * @type {number}
     */
    this.len;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var allIndex;

    this.ids = Object.keys(sources);
    this.len = this.ids.length;

    // Sort the ids
    if (this.len) {
      this.ids = sortKeys(this.ids, sources);
    }

    // Fix a category with the id of all
    allIndex = this.ids.indexOf('all');
    if (allIndex !== -1) {
      this.ids[ allIndex ] = '_all';
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Sources.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the source objects using the ids as keys.
     * @type {Object<string, Source>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var sourceId;
    /** @type {number} */
    var i;

    data = {};

    // Build the data hash map
    i = this.len;
    while (i--) {
      sourceId = this.ids[i];
      data[ sourceId ] = new Source(sources[ sourceId ]);
    }

    // Deep freeze
    freezeObj(data, true);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Sources.get)
     * -----------------------------------------------
     * @desc Get a Source's object or protected property.
     * @param {string} id - The source id to get.
     * @param {string=} prop - The property to get.
     * @return {!(Source|string|numbers)}
     */
    this.get = function(id, prop) {

      /** @type {string} */
      var errorMsg;
      /** @type {!Source} */
      var source;
      /** @type {!(Source|string|numbers)} */
      var result;

      checkArgs(id, 'string', prop, 'string=');

      if ( !hasOwnProp(data, id) ) {
        errorMsg = 'An aIV.app internal error occurred. A Sources.get call ';
        errorMsg += 'was given an invalid source id to get. sourceID= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      source = data[ id ];
      result = (prop) ? source.get(prop) : source;

      return result;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Sources.prototype.constructor = Sources;

  /**
   * -----------------------------------------------------
   * Public Method (Sources.prototype.freezeIds)
   * -----------------------------------------------------
   * @desc Freezes the ids array for each source.
   * @type {function}
   */
  Sources.prototype.freezeIds = function() {

    /** @type {string} */
    var id;
    /** @type {number} */
    var i;

    i = this.len;
    while (i--) {
      id = this.ids[i];
      this.get(id).freezeIds();
    }

  };

/* -----------------------------------------------------------------------------
 * The Source Class (classes/source.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Source)
   * -----------------------------------------------------
   * @desc An object containing the details of a source.
   * @param {string} name - The source's name.
   * @constructor
   */
  var Source = function(name) {

    checkArgs(name, 'string');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Source.url)
     * -----------------------------------------------
     * @desc The source's url name.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Source.ids)
     * -----------------------------------------------
     * @desc The ids of the questions containing this source.
     * @type {!numbers}
     * @private
     */
    var ids;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    if (!name || !checkType(name, 'string')) {
      name = '';
      url  = '';
    }
    else {
      url = makeUrl(name);
    }
    ids = [];

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Source.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the source.
     * @param {string} propName - The name of the property to get.
     * @return {(string|!numbers)}
     */
    this.get = function(propName) {

      /** @type {Object<string, (string|!numbers)>} */
      var props = {
        name: name,
        url : url,
        ids : ids
      };

      return getter.call(props, propName);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this source.
     * @param {number} id - The index to add.
     */
    this.addId = function(id) {

      /** @type {string} */
      var errorMsg;

      checkArgs(id, 'number');

      if (id < 1) {
        errorMsg = 'An aIV.app internal error occurred. A Source.addId call ';
        errorMsg += 'was given an invalid question id to add. id= ' + id;
        throw new Error(errorMsg);
      }

      ids.push(id);

    };

    /**
     * ----------------------------------------------- 
     * Public Method (Source.freezeIds)
     * -----------------------------------------------
     * @desc Freezes this category's question ids.
     * @type {function}
     */
    this.freezeIds = function() {

      freezeObj(ids);

    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Source.prototype.constructor = Source;

/* -----------------------------------------------------------------------------
 * The Categories Class (classes/categories.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Categories)
   * -----------------------------------------------------
   * @desc The available categories for each question.
   * @param {?(objectMap|stringMap)} categories - The user's categories.
   * @constructor
   */
  var Categories = function(categories) {

    checkArgs(categories, 'objectMap|stringMap');

    ////////////////////////////////////////////////////////////////////////////
    // Prepare The User Supplied Params
    ////////////////////////////////////////////////////////////////////////////

    if ( checkType(categories, '!stringMap') ) {
      categories = {
        main: categories,
        sub : {}
      };
    }
    else {
      if (!categories) {
        categories = {};
      }
      if (!categories.main || !checkType(categories.main, '!stringMap')) {
        categories.main = {};
      }
      if (!categories.sub || !checkType(categories.sub, '!objectMap')) {
        categories.sub = {};
      }
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Public Property (Categories.ids)
     * -----------------------------------------------
     * @desc Saves an array of all the main category ids in alphabetical order.
     * @type {!strings}
     */
    this.ids;

    /**
     * -----------------------------------------------
     * Public Property (Categories.len)
     * -----------------------------------------------
     * @desc Saves the count of main categories.
     * @type {number}
     */
    this.len;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var allIndex;

    this.ids = Object.keys(categories.main);
    this.len = this.ids.length;

    // Sort the main category ids
    if (this.len) {
      this.ids = sortKeys(this.ids, categories.main);
    }

    // Fix a category with the id of all
    allIndex = this.ids.indexOf('all');
    if (allIndex !== -1) {
      this.ids[ allIndex ] = '_all';
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Protected Property (Categories.data)
     * -----------------------------------------------
     * @desc Saves a hash map of the category objects using the ids as keys.
     * @type {!Object<string, !Category>}
     * @private
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {strings} */
    var subIds;
    /** @type {string} */
    var mainId;
    /** @type {string} */
    var subId;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    data = {};

    // Build the data hash map
    i = this.len;
    while (i--) {
      mainId = this.ids[i];

      // Save and sort the sub category ids if they exist
      subIds = ( (hasOwnProp(categories.sub, mainId)) ?
        Object.keys(categories.sub[ mainId ]) : []
      );
      if (subIds.length) {
        subIds = sortKeys(subIds, categories.sub[ mainId ]);
      }

      // Add main category to the hash map
      data[ mainId ] = new Category(categories.main[ mainId ], subIds);

      // Add the sub categories to the hash map
      ii = subIds.length;
      while (ii--) {
        subId = subIds[ii];
        data[ subId ] = new Category(categories.sub[ mainId ][ subId ]);
      }
    }

    // Deep freeze
    freezeObj(data, true);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Public Property (Categories.get)
     * -----------------------------------------------
     * @desc Get a Catgory's object or protected property.
     * @param {string} id - The category id to get.
     * @param {string=} prop - The property to get.
     * @return {!(Category|string|numbers|boolean)}
     */
    this.get = function(id, prop) {

      /** @type {!Category} */
      var category;
      /** @type {!(Category|string|numbers)} */
      var result;

      checkArgs(id, 'string', prop, 'string=');

      if ( hasOwnProp(data, id) ) {
        prop = prop || '';
        category = data[ id ];
        result = (prop) ? category.get(prop) : category;
      }
      else {
        result = false;
      }

      return result;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Categories.prototype.constructor = Categories;

  /**
   * -----------------------------------------------------
   * Public Method (Categories.prototype.freezeIds)
   * -----------------------------------------------------
   * @desc Freezes the ids array for each category.
   * @type {function}
   */
  Categories.prototype.freezeIds = function() {

    /** @type {string} */
    var id;
    /** @type {number} */
    var i;

    i = this.len;
    while (i--) {
      id = this.ids[i];
      this.get(id).freezeIds();
    }

  };

/* -----------------------------------------------------------------------------
 * The Category Class (classes/category.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Category)
   * -----------------------------------------------------
   * @desc An object containing the details of a category.
   * @param {string} name - The name of the category.
   * @param {?strings=} subs - This category's sub ids if they exist.
   *   If null then category is a sub category.
   * @constructor
   */
  var Category = function(name, subs) {

    checkArgs(name, 'string', subs, 'strings=');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Protected Property (Category.url)
     * -----------------------------------------------
     * @desc The url name for this category.
     * @type {string}
     * @private
     */
    var url;

    /**
     * -----------------------------------------------
     * Protected Property (Category.ids)
     * -----------------------------------------------
     * @desc The ids of the questions containing this category.
     * @type {!numbers}
     * @private
     */
    var ids;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    if (!name || !checkType(name, 'string')) {
      name = '';
      url  = '';
    }
    else {
      url = makeUrl(name);
    }
    ids = [];
    subs = (subs) ? freezeObj(subs) : null;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Public Method (Category.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the category.
     * @param {string} propName - The name of the property to get.
     * @return {(string|!numbers)}
     */
    this.get = function(propName) {

      /** @type {Object<string, (string|!numbers)>} */
      var props = {
        name: name,
        url : url,
        subs: subs,
        ids : ids
      };

      return getter.call(props, propName);
    };

    /**
     * -----------------------------------------------
     * Public Method (Category.addId)
     * -----------------------------------------------
     * @desc Adds a question id to this category.
     * @param {number} id - The id to add.
     */
    this.addId = function(id) {

      /** @type {string} */
      var errorMsg;

      checkArgs(id, 'number');

      if (id < 1) {
        errorMsg = 'An aIV.app internal error occurred. A Category.addId ';
        errorMsg += 'call was given an invalid question id to add. id= ' + id;
        throw new Error(errorMsg);
      }

      ids.push(id);

    };

    /**
     * -----------------------------------------------
     * Public Method (Category.freezeIds)
     * -----------------------------------------------
     * @desc Freezes this category's question ids.
     * @type {function}
     */
    this.freezeIds = function() {

      freezeObj(ids);

    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Category.prototype.constructor = Category;

/* -----------------------------------------------------------------------------
 * The SearchBar Class (classes/search-bar/search-bar.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (SearchBar)
   * -----------------------------------------------------
   * @desc The search bar's values and elements for this app.
   * @param {!booleanMap} config - The app's search bar config settings.
   * @constructor
   */
  var SearchBar = function(config, sources, categories) {

    checkArgs(config, '!booleanMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.vals)
     * -----------------------------------------------
     * @desc The current selected values.
     * @type {!{
     *   view   : string,
     *   order  : string,
     *   stage  : string,
     *   source : string,
     *   mainCat: string,
     *   subCat : string
     * }}
     */
    this.vals;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.names)
     * -----------------------------------------------
     * @desc The hash map of the search bar's ids and names.
     * @type {!{
     *   view   : !stringMap,
     *   order  : !stringMap,
     *   stage  : !stringMap,
     *   source : !stringMap,
     *   mainCat: !stringMap,
     *   subCat : !stringMap
     * }}
     */
    this.names;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ids)
     * -----------------------------------------------
     * @desc The search bar's ids in order of appearance.
     * @type {!{
     *   view   : !strings,
     *   order  : !strings,
     *   stage  : !strings,
     *   source : !strings,
     *   mainCat: !strings,
     *   subCat : !Object<string, !strings>
     * }}
     */
    this.ids;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.ques)
     * -----------------------------------------------
     * @desc The question ids matching the search property values.
     * @type {!{
     *   stage: !Object<string, !numbers>
     * }}
     */
    this.ques;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.opts)
     * -----------------------------------------------
     * @desc The option elements for the search bar.
     * @type {!{
     *   view   : !elements,
     *   order  : !elements,
     *   stage  : !elements,
     *   source : !elements,
     *   mainCat: !elements,
     *   subCat : !Object<string, !elements>
     * }}
     */
    this.opts;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBar.elems)
     * -----------------------------------------------
     * @desc The HTMLSelectElements for searching in the app.
     * @type {!SearchBarElems}
     */
    this.elems;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!Categories} */
    var categories;
    /** @type {string} */
    var sourceId;
    /** @type {!strings} */
    var mainSubs;
    /** @type {!Category} */
    var mainCat;
    /** @type {!Sources} */
    var sources;
    /** @type {string} */
    var mainId;
    /** @type {string} */
    var subId;
    /** @type {boolean} */
    var pass;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var i;

    sources = app.sources;
    categories = app.categories;

    // Setup the current values
    this.vals = {
      view   : 'one',
      order  : 'asc',
      stage  : 'all',
      source : 'all',
      mainCat: 'all',
      subCat : 'all'
    };

    // Setup the names property
    this.names = {};
    this.names.view = {
      one: 'View One',
      ten: 'View Ten',
      all: 'View All'
    };
    this.names.order = {
      asc : 'ASC',
      desc: 'DESC'
    };
    this.names.stage = {
      all: 'All Stages',
      com: 'Completed',
      inc: 'Incomplete'
    };
    this.names.source = {
      all: 'All Sources'
    };
    this.names.mainCat = {
      all: 'All Main Categories'
    };
    this.names.subCat = {
      all: 'All Sub Categories'
    };

    // Add each source to the names property
    i = sources.len;
    while (i--) {
      sourceId = sources.ids[i];
      this.names.source[ sourceId ] = sources.get(sourceId, 'name');
    }

    // Setup the ids property
    this.ids = {
      view   : [ 'one','ten','all' ],
      order  : [ 'asc','desc' ],
      stage  : [ 'all','com','inc' ],
      source : [ 'all' ].concat(sources.ids),
      mainCat: [ 'all' ].concat(categories.ids),
      subCat : {}
    };

    // Setup the opts property
    this.opts = {
      view   : [],
      order  : [],
      stage  : [],
      source : [],
      mainCat: [],
      subCat : { all: [] }
    };

    // Add each category to the names, ids, and opts properties
    i = categories.len;
    while (i--) {
      mainId = categories.ids[i];
      mainCat = categories.get(mainId);
      mainSubs = mainCat.get('subs');

      // Add each main category's name
      this.names.mainCat[ mainId ] = mainCat.get('name');

      // Add each main category to the sub category property in opts
      this.opts.subCat[ mainId ] = [];

      // Add each sub category's id for each main category
      this.ids.subCat[ mainId ] = [ 'all' ].concat(mainSubs);

      // Add each sub category's name
      ii = mainSubs.length;
      while (ii--) {
        subId = mainSubs[ii];
        this.names.subCat[ subId ] = categories.get(subId, 'name');
      }
    }

    // Setup the question ids property
    this.ques = {};
    this.ques.stage = {};
    this.ques.stage.com = [];
    this.ques.stage.inc = [];

    // Check the config values before setting up the search elements
    config.source   = (config.source   && !!sources.len);
    config.category = (config.category && !!categories.len);
    config.subCat   = (config.category && config.subCat);

    // Ensure at least one sub category exists
    pass = !config.subCat;
    i = categories.len;
    while (i-- && !pass) {
      mainId = categories.ids[i];
      pass = (this.ids.subCat[ mainId ].length > 1);
    }
    config.subCat = (config.subCat && pass);

    // Setup the search elements
    this.elems = new SearchBarElems(config);

    // Freeze all of the completed properties
    freezeObj(this.names);
    freezeObj(this.ids);
    freezeObj(this.opts);
    freezeObj(this.ques.stage);
    freezeObj(this.ques);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBar.prototype.constructor = SearchBar;

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setToDefaults)
   * -----------------------------------------------------
   * @desc Updates the current search bar's values to the defaults.
   * @param {!stringMap} defaults - The default values.
   */
  SearchBar.prototype.setToDefaults = function(defaults) {

    /** @type {!stringMap} */
    var vals;

    checkArgs(defaults, '!object');

    vals = this.vals;

    vals.view    = defaults.view;
    vals.order   = defaults.order;
    vals.stage   = defaults.stage;
    vals.source  = defaults.source;
    vals.mainCat = defaults.mainCat;
    vals.subCat  = defaults.subCat;

    this.elems.setValuesToDefaults(defaults);

  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.setOptElems)
   * -----------------------------------------------------
   * @desc Creates the search bar's option elements.
   * @type {function}
   */
  SearchBar.prototype.setOptElems = function() {

    /** @type {string} */
    var mainId;
    /** @type {!Object<string, !stringMap>} */
    var names;
    /** @type {!SearchBarElems} */
    var elems;
    /** @type {(!Object<string, !Object>|!elements)} */
    var opts;
    /** @type {!HTMLSelectElement} */
    var sel;
    /** @type {!Object<string, !Object>} */
    var ids;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    ids = this.ids;
    opts = this.opts;
    elems = this.elems;
    names = this.names;

    setSearchSection(elems.view, ids.view, names.view, opts.view);

    setSearchSection(elems.order, ids.order, names.order, opts.order);

    if (elems.stage) {
      setSearchSection(elems.stage, ids.stage, names.stage, opts.stage);
    }

    if (elems.source) {
      setSearchSection(elems.source, ids.source, names.source, opts.source);
    }

    if (elems.mainCat) {
      setSearchSection(elems.mainCat, ids.mainCat, names.mainCat, opts.mainCat);
    }

    if (elems.subCat) {

      // Set the all option element for all main categories
      opts.subCat.all.push( makeOptElem('all', names.subCat.all) );

      len = ids.mainCat.length;
      i = 0;
      while (++i < len) {
        mainId = ids.mainCat[i];

        // Set the sub category option elements for each main category
        setSearchSection(null, ids.subCat[ mainId ], names.subCat,
                         opts.subCat[ mainId ]);

        // Set the category option elements for all main categories
        opts.subCat.all.push( makeOptElem('', names.mainCat[ mainId ]) );
        setSearchSection(null, ids.subCat[ mainId ], names.subCat,
                         opts.subCat.all, true);
      }

      // Append the correct sub categories to its select element
      opts = opts.subCat[ this.vals.mainCat ];
      sel = elems.subCat;
      len = opts.length;
      i = -1
      while (++i < len) {
        sel.appendChild(opts[i]);
      }
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Appends the search bar's elements to the selections root.
   * @type {function}
   */
  SearchBar.prototype.appendElems = function() {

    this.elems.appendToMain();

  };

  /**
   * -----------------------------------------------------
   * Public Method (SearchBar.prototype.updateSubCatOpts)
   * -----------------------------------------------------
   * @desc Updates the children appended to the sub category select element.
   * @param {string=} newVal - The new value to update subCat to.
   */
  SearchBar.prototype.updateSubCatOpts = function(newVal) {

    /** @type {!elements} */
    var opts;
    /** @type {!HTMLSelectElement} */
    var sel;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    checkArgs(newVal, '^string=');

    newVal = newVal || 'all';
    this.vals.subCat = newVal;

    sel = this.elems.subCat;
    if (sel) {

      // Clear the sub category's current option elements
      while (sel.firstChild) {
        sel.removeChild(sel.firstChild);
      }

      // Append the new option elements
      opts = this.opts.subCat[ this.vals.mainCat ];
      len = opts.length;
      i = -1
      while (++i < len) {
        sel.appendChild(opts[i]);
      }

      sel.value = newVal;
    }

  };

/* -----------------------------------------------------------------------------
 * The SearchBarElems Class (classes/search-bar/search-bar-elems.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (SearchBarElems)
   * -----------------------------------------------------
   * @desc The search bar's values and elements for this app.
   * @param {!booleanMap} config - The app's search bar config settings.
   * @constructor
   */
  var SearchBarElems = function(config) {

    checkArgs(config, '!booleanMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.view)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-view.
     * @type {!HTMLSelectElement}
     */
    this.view;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.order)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-order.
     * @type {!HTMLSelectElement}
     */
    this.order;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.stage)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-stage.
     * @type {?HTMLSelectElement}
     */
    this.stage;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.source)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-source.
     * @type {?HTMLSelectElement}
     */
    this.source;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.mainCat)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-mainCat.
     * @type {?HTMLSelectElement}
     */
    this.mainCat;

    /**
     * ----------------------------------------------- 
     * Public Property (SearchBarElems.subCat)
     * -----------------------------------------------
     * @desc The DOM HTMLSelectElement #aIV-subCat.
     * @type {?HTMLSelectElement}
     */
    this.subCat;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.view = makeElem({
      tag      : 'select',
      id       : 'aIV-view',
      className: 'showView'
    });
    this.view.onchange = function(event) {
      Events.searchView(event.target.value);
    };

    this.order = makeElem({
      tag      : 'select',
      id       : 'aIV-order',
      className: 'showOrder'
    });
    this.order.onchange = function(event) {
      Events.searchOrder(event.target.value);
    };

    this.stage = null;
    if (config.stage) {
      this.stage = makeElem({
        tag      : 'select',
        id       : 'aIV-stage',
        className: 'showStage'
      });
      this.stage.onchange = function(event) {
        Events.searchStage(event.target.value);
      };
    }

    this.source = null;
    if (config.source) {
      this.source = makeElem({
        tag      : 'select',
        id       : 'aIV-source',
        className: 'showSource'
      });
      this.source.onchange = function(event) {
        Events.searchSource(event.target.value);
      };
    }

    this.mainCat = null;
    if (config.category) {
      this.mainCat = makeElem({
        tag      : 'select',
        id       : 'aIV-mainCat',
        className: 'showMainCat'
      });
      this.mainCat.onchange = function(event) {
        Events.searchMainCat(event.target.value);
      };
    }

    this.subCat = null;
    if (config.subCat) {
      this.subCat = makeElem({
        tag      : 'select',
        id       : 'aIV-subCat',
        className: 'showSubCat'
      });
      this.subCat.onchange = function(event) {
        Events.searchSubCat(event.target.value);
      };
    }

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  SearchBarElems.prototype.constructor = SearchBarElems;

  /**
   * --------------------------------------------------------------
   * Public Method (SearchBarElems.prototype.setValuesToDefaults)
   * --------------------------------------------------------------
   * @desc Updates the search bar's values to the defaults.
   * @param {!Object<string, string>} defaults - The default values.
   */
  SearchBarElems.prototype.setValuesToDefaults = function(defaults) {

    checkArgs(defaults, '!stringMap');

    this.view.value  = defaults.view;
    this.order.value = defaults.order;
    if (this.stage) {
      this.stage.value = defaults.stage;
    }
    if (this.source) {
      this.source.value = defaults.source;
    }
    if (this.mainCat) {
      this.mainCat.value = defaults.mainCat;
    }
    if (this.subCat) {
      this.subCat.value = defaults.subCat;
    }

  };

  /**
   * -------------------------------------------------------
   * Public Method (SearchBarElems.prototype.appendToMain)
   * -------------------------------------------------------
   * @desc Appends the search bar's elements to the selections root.
   * @type {function}
   */
  SearchBarElems.prototype.appendToMain = function() {

    /** @type {!Element} */
    var sel;

    sel = app.elems.sel;

    sel.appendChild(this.view);
    sel.appendChild(this.order);
    this.stage   && sel.appendChild(this.stage);
    this.source  && sel.appendChild(this.source);
    this.mainCat && sel.appendChild(this.mainCat);
    this.subCat  && sel.appendChild(this.subCat);

  };

/* -----------------------------------------------------------------------------
 * The Questions Class (classes/questions.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Questions)
   * -----------------------------------------------------
   * @desc The questions for this app.
   * @param {!objects} questions - The user's questions.
   * @param {!booleanMap} config - The settings for question formatting.
   * @constructor
   */
  var Questions = function(questions, config) {

    checkArgs(questions, '!objects', config, '!booleanMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.len)
     * -----------------------------------------------
     * @desc The total number of questions.
     * @type {number}
     */
    this.len;

    /**
     * ----------------------------------------------- 
     * Public Property (Questions.list)
     * -----------------------------------------------
     * @desc An array of all the question objects.
     * @return {questions}
     */
    this.list;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {number} */
    var len;

    this.len = questions.length;

    i = this.len + 1;
    this.list = (this.len) ? new Array(i) : [];

    // Add blank to beginning of list so ids and indexes match
    if (this.len) {
      this.list[0] = null;
    }

    // Add the Question object references to the list
    len = this.len;
    i = -1;
    while (++i < len) {
      id = i + 1;
      this.list[ id ] = new Question(questions[i], id, config);
    }

    // Freeze the public properties that are objects
    freezeObj(this.list);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Questions.data)
     * -----------------------------------------------
     * @desc The hash map of question objects (key= url).
     * @type {Object<string, Question>}
     */
    var data;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {string} */
    var url;

    data = {};

    // Build the data hash map
    i = this.len + 1;
    while (--i) {
      url = this.list[i].get('url');
      if (url) {
        data[ url ] = this.list[i];
      }
    }

    // Freeze the protected properties
    freezeObj(data);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Questions.get)
     * -----------------------------------------------
     * @desc Gets a question's object or property value.
     * @param {(number|string)} id - The question id to get.
     * @param {string=} prop - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The Question or property value.
     */
    this.get = function(id, prop, formatted) {

      /** @type {string} */
      var errorMsg;
      /** @type {!Question} */
      var question;
      /** @type {*} */
      var result;

      checkArgs(id, 'number|string', prop, 'string=', formatted, 'boolean=');

      if (!hasOwnProp(this.list, id) && !hasOwnProp(data, id)) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.get call was ';
        errorMsg += 'given an invalid question id to get. id= ' + id;
        throw new Error(errorMsg);
      }

      prop = prop || '';
      formatted = formatted || false;

      question = ( checkType(id, 'number') ) ? this.list[ id ] : data[ id ];
      result = ( (!prop) ?
        question : (prop === 'elem') ?
          question.elem : (prop === 'rootElem') ?
            question.elem.root : question.get(prop, formatted)
      );

      return result;
    };

    freezeObj(this.get);

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Questions.prototype.constructor = Questions;

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemStyle)
   * ---------------------------------------------------
   * @desc Sets the style for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {(string|!Object)} type - The style setting to set.
   *   If a string is given then another param with the value is
   *   required. If an object is provided then use key => value
   *   pairs like styleType => newValue (see below example).
   * @param {(string|number)=} val - If the type param is a string then
   *   this is the new value for the it.
   * @example
   *   app.questions.setElemStyle(5, { display: 'none' });
   *   // OR
   *   app.questions.setElemStyle(5, 'display', 'none');
   */
  Questions.prototype.setElemStyle = function(id, type, val) {

    /** @type {string} */
    var errorMsg;
    /** @type {!Array<*>} */
    var args;
    /** @type {!Element} */
    var elem;
    /** @type {!RegExp} */
    var dash;
    /** @type {string} */
    var prop;
    /** @type {number} */
    var i;

    args = [ id, 'number|string', type, '!string|object' ];
    args.push(val, 'string|number=');
    checkArgs.apply(null, args);

    dash = /\-/;

    // Handle one update
    if ( checkType(type, 'string') ) {

      if ( !checkType(val, 'string|number') ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'value to set the style to. val= ' + val;
        throw new TypeError(errorMsg);
      }

      // Replace dashes with camel case
      if ( dash.test(type) ) {
        type = camelCase(type);
      }

      elem = this.get(id, 'rootElem');

      if ( !(type in elem.style) ) {
        errorMsg = 'An aIV.app internal error occurred. A ';
        errorMsg += 'Questions.setElemStyle call was given an invalid ';
        errorMsg += 'style property to set. prop= ' + type;
        throw new Error(errorMsg);
      }

      elem.style[ type ] = val;
    }
    // Handle multiple updates
    else {

      elem = this.get(id, 'rootElem');

      for (prop in type) {
        if ( hasOwnProp(type, prop) ) {

          // Replace dashes with camel case
          if ( dash.test(prop) ) {
            prop = camelCase(prop);
          }

          if ( !(prop in elem.style) ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'style property to set. prop= ' + prop;
            throw new Error(errorMsg);
          }

          val = type[ prop ];

          if ( !checkType(val, 'string|number') ) {
            errorMsg = 'An aIV.app internal error occurred. A Questions.';
            errorMsg += 'setElemStyle call was given an invalid ';
            errorMsg += 'value to set a style to. prop= ' + prop + ', ';
            errorMsg += 'val= ' + val;
            throw new TypeError(errorMsg);
          }

          elem.style[ prop ] = val;
        }
      }
    }

  };

  /**
   * ---------------------------------------------------
   * Public Method (Questions.prototype.setElemClass)
   * ---------------------------------------------------
   * @desc Sets the class name for a question's container element.
   * @param {(number|string)} id - The question id to set.
   * @param {string} newClassName - The new class name.
   */
  Questions.prototype.setElemClass = function(id, newClassName) {

    checkArgs(id, 'number|string', newClassName, 'string');

    this.get(id, 'rootElem').className = newClassName;

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addIdsToSearch)
   * -----------------------------------------------------
   * @desc Sets the format for all of the questions.
   * @type {function}
   */
  Questions.prototype.addIdsToSearch = function() {

    /** @type {!booleanMap} */
    var config;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    config = {
      stage   : app.config.searchBar.get('stage'),
      source  : app.config.searchBar.get('source'),
      category: app.config.searchBar.get('category'),
      subCat  : app.config.searchBar.get('subCat')
    };
    config.source = config.source || app.config.links.get('source');
    config.category = config.category || app.config.links.get('category');
    config.subCat = config.subCat || app.config.links.get('category');

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.get(id).addToSearch(config);
    }

    app.sources.freezeIds();
    app.categories.freezeIds();

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.appendElems)
   * -----------------------------------------------------
   * @desc Sets and appends the elements for all of the questions.
   * @type {function}
   */
  Questions.prototype.appendElems = function() {

    /** @type {!Question} */
    var question;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      question = this.get(id);
      app.elems.ques.appendChild(question.elem.root);
      question.addElemContent();
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.addCodeExts)
   * -----------------------------------------------------
   * @desc If overflow occurs in a question's code element it enables
   *   the auto extend button for the question.
   * @type {function}
   */
  Questions.prototype.addCodeExts = function() {

    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    len = this.len + 1;
    id = 0;
    while (++id < len) {
      this.get(id, 'elem').addCodeExt();
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.reverseElems)
   * -----------------------------------------------------
   * @desc Appends each question's element to #aIV-questions in the direction
   *   of the current search order.
   * @type {function}
   */
  Questions.prototype.reverseElems = function() {

    /** @type {string} */
    var direction;
    /** @type {!Element} */
    var elem;
    /** @type {number} */
    var len;
    /** @type {number} */
    var id;

    direction = app.searchBar.vals.order;
    len = this.len + 1;

    // Appends in asc order
    if (direction === 'asc') {
      id = 0;
      while (++id < len) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }
    // Appends in desc order
    else {
      id = len;
      while (--id) {
        elem = this.get(id, 'rootElem');
        app.elems.ques.appendChild(elem);
      }
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.hideElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'none' for the provided questions.
   * @param {!numbers} ids - The previous active question ids.
   * @param {number} index - The index of the ids to hide from view.
   * @param {string} view - The old value of app.searchBar.vals.view.
   */
  Questions.prototype.hideElems = function(ids, index, view) {

    /** @type {string} */
    var errorMsg;
    /** @type {number} */
    var i;

    checkArgs(ids, '!numbers', index, 'number', view, 'string');

    if (index === -1) {

      // Hide the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'none';
      }
      // Hide all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'hideElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      // Hide only the index of the provided ids
      if (view === 'one') {
        this.setElemStyle(ids[ index ], 'display', 'none');
      }
      // Hide the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be hidden
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          this.setElemStyle(ids[i], 'display', 'none');
        }
      }
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Questions.prototype.showElems)
   * -----------------------------------------------------
   * @desc Updates the display to 'block' for the provided questions.
   * @param {!numbers} ids - The new active question ids.
   * @param {number} index - The index of the ids to show.
   */
  Questions.prototype.showElems = function(ids, index) {

    /** @type {number} */
    var i;
    /** @type {string} */
    var view;
    /** @type {string} */
    var errorMsg;
    /** @type {string} */
    var newClassName;

    checkArgs(ids, '!numbers', index, 'number');

    if (index === -1) {

      // Show the empty message
      if (!ids.length) {
        app.elems.none.style.display = 'block';
      }
      // Show all of the provided ids
      else {
        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }
    else {

      if (!ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was not given any ids when a ';
        errorMsg += 'non-negative index was present.';
        throw new Error(errorMsg);
      }

      if (index < 0 || index >= ids.length) {
        errorMsg = 'An aIV.app internal error occurred. A Questions.';
        errorMsg += 'showElems call was given an invalid index. ';
        errorMsg += 'index= ' + index;
        throw new Error(errorMsg);
      }

      view = app.searchBar.vals.view;

      // Show only the index of the provided ids
      if (view === 'one') {
        this.setElemClass(ids[ index ], 'question shade1 hideLink');
        this.setElemStyle(ids[ index ], 'display', 'block');
      }
      // Show the index plus ten (or to the array end)
      else if (view === 'ten') {

        // Remove all ids from the array that should NOT be shown
        i = index + 11;
        ids = (ids.length < i) ? ids.slice(index) : ids.slice(index, i);

        i = ids.length;
        while (i--) {
          newClassName = (i % 2) ? 'question shade2' : 'question shade1';
          this.setElemClass(ids[i], newClassName);
          this.setElemStyle(ids[i], 'display', 'block');
        }
      }
    }

  };

/* -----------------------------------------------------------------------------
 * The Question Class (classes/question/question.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Question)
   * -----------------------------------------------------
   * @desc An object containing the details of a question.
   * @param {!Object} question - The details of a new question.
   * @param {number} id - The id for the question.
   * @param {!booleanMap} config - The settings for question formatting.
   * @constructor
   */
  var Question = function(question, id, config) {

    checkArgs(question, '!object', id, 'number', config, '!booleanMap');

    ////////////////////////////////////////////////////////////////////////////
    // Setup & Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Question.elem)
     * -----------------------------------------------
     * @desc The question's DOM container.
     * @type {!QuestionElem}
     */
    this.elem = new QuestionElem(id);

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.url)
     * -----------------------------------------------
     * @desc The url name for this question.
     * @type {string}
     * @private
     */
    var url;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {boolean}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.source)
     * -----------------------------------------------
     * @desc The id for this question's source.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.mainCat)
     * -----------------------------------------------
     * @desc The ids for this question's main categories.
     * @type {strings}
     * @private
     */
    var mainCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.subCat)
     * -----------------------------------------------
     * @desc The ids for this question's sub categories.
     * @type {strings}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.links)
     * -----------------------------------------------
     * @desc This question's links.
     * @type {links}
     * @private
     */
    var links;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.problem)
     * -----------------------------------------------
     * @desc This question's problem.
     * @type {string}
     * @private
     */
    var problem;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.descr)
     * -----------------------------------------------
     * @desc This question's description.
     * @type {string}
     * @private
     */
    var descr;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {string}
     * @private
     */
    var solution;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.output)
     * -----------------------------------------------
     * @desc The solution's output for this question.
     * @type {string}
     * @private
     */
    var output;

    /**
     * ----------------------------------------------- 
     * Protected Property (Question.format)
     * -----------------------------------------------
     * @desc The formatted details for the question.
     * @type {QuestionFormat}
     */
    var format;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {function} */
    var getCategory;
    /** @type {!stringMap} */
    var linkObj;
    /** @type {string} */
    var catId;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    url = '';
    if (question.url && checkType(question.url, 'string')) {
      url = makeUrl(question.url);
    }

    complete = (question.complete === true);

    source = ( (!checkType(question.source, 'string')) ?
      '' : (question.source === 'all') ?
        '_all' : question.source
    );
    if (!app.sources.len || !app.sources.get(source, 'name')) {
      source = '';
    }

    getCategory = (app.categories.len) ? app.categories.get : function(){};

    mainCat = [];
    if ( checkType(question.mainCat, '!strings') ) {
      len = question.mainCat.length;
      i = -1;
      while (++i < len) {
        catId = question.mainCat[i];
        if (catId === 'all') {
          catId = '_all';
        }
        if ( getCategory(catId, 'name') ) {
          mainCat.push(catId);
        }
      }
    }

    subCat = [];
    if ( checkType(question.subCat, '!strings') ) {
      len = question.subCat.length;
      i = -1;
      while (++i < len) {
        catId = question.subCat[i];
        if (catId === 'all') {
          catId = '_all';
        }
        if ( getCategory(catId, 'name') ) {
          subCat.push(catId);
        }
      }
    }

    links = [];
    if (config.links && checkType(question.links, '!objects')) {
      len = question.links.length;
      i = -1;
      while (++i < len) {
        linkObj = question.links[i];
        if (checkType(linkObj, '!object') &&
            checkType(linkObj.name, 'string') &&
            checkType(linkObj.href, 'string') &&
            isLink(linkObj.href)) {
          links.push(linkObj);
        }
      }
    }

    problem = ( checkType(question.problem, 'string') ) ? question.problem : '';

    descr = ( checkType(question.descr, 'string') ) ? question.descr : '';

    solution = '';
    output = '';
    if ( checkType(question.solution, 'function') ) {

      solution = String(question.solution);
      solution = solution && trimFunctionWrapper(solution);

      if (solution && config.output) {
        try {
          output = String( question.solution() );
        }
        catch (error) {
          output = 'The solution returned the following error - ';
          output += error.toString();
        }
      }
    }

    format = new QuestionFormat({
      id      : id,
      complete: complete,
      source  : source,
      mainCat : mainCat,
      subCat  : subCat,
      solution: solution
    }, config);

    // Freeze some of the protected properties
    freezeObj(mainCat);
    freezeObj(subCat);
    freezeObj(links);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Question.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from a Question.
     * @param {string} propName - The name of the property to get.
     * @param {boolean=} formatted - If true then gets the
     *   formatted property.
     * @return {*} The property's value.
     */
    this.get = function(propName, formatted) {

      /** @type {string} */
      var errorMsg;
      /** @type {*} */
      var propVal;
      /** @type {!Object<string, *>} */
      var props;

      checkArgs(propName, 'string', formatted, 'boolean=');

      props = {
        id      : id,
        url     : url,
        complete: complete,
        source  : source,
        mainCat : mainCat,
        subCat  : subCat,
        links   : links,
        problem : problem,
        descr   : descr,
        solution: solution,
        output  : output
      };

      if ( !hasOwnProp(props, propName) ) {
        errorMsg = 'An aIV.app internal error occurred. A Question.get call was ';
        errorMsg += 'given an invalid property name to get. property= ' + propName;
        throw new Error(errorMsg);
      }

      propVal = (formatted) ? format.get(propName) : props[ propName ];

      return propVal;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this.get);
    freezeObj(this);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Question.prototype.constructor = Question;

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addToSearch)
   * -----------------------------------------------------
   * @desc Adds the question id to its matching search properties.
   * @param {!booleanMap} config - The needed format config.
   */
  Question.prototype.addToSearch = function(config) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var id;
    /** @type {boolean} */
    var complete;
    /** @type {string} */
    var source;
    /** @type {strings} */
    var mainCat;
    /** @type {strings} */
    var subCat;

    checkArgs(config, '!booleanMap');

    id       = this.get('id');
    complete = this.get('complete');
    source   = this.get('source');
    mainCat  = this.get('mainCat');
    subCat   = this.get('subCat');

    // Add the Question's id to the stage ids
    if (config.stage) {
      if (complete) {
        app.searchBar.ques.stage['com'].push(id);
      }
      else {
        app.searchBar.ques.stage['inc'].push(id);
      }
    }

    // Add the Question's id to the source ids
    if (config.source && source) {
      app.sources.get(source).addId(id);
    }

    // Add the Question's id to the main category ids
    if (config.category) {
      i = mainCat.length;
      while (i--) {
        app.categories.get(mainCat[i]).addId(id);
      }
    }

    // Add the Question's id to the sub category ids
    if (config.category && config.subCat) {
      i = subCat.length;
      while (i--) {
        app.categories.get(subCat[i]).addId(id);
      }
    }

  };

  /**
   * -----------------------------------------------------
   * Public Method (Question.prototype.addElemContent)
   * -----------------------------------------------------
   * @desc Adds the formatted content to the question element.
   * @type {function}
   */
  Question.prototype.addElemContent = function() {

    this.elem.addContent({
      id      : this.get('id', true),
      url     : this.get('url'),
      complete: this.get('complete', true),
      source  : {
        id  : this.get('source'),
        name: this.get('source', true)
      },
      mainCat : {
        ids  : this.get('mainCat'),
        h3   : this.get('mainCat', true).h3,
        names: this.get('mainCat', true).names
      },
      subCat  : {
        ids  : this.get('subCat'),
        h3   : this.get('subCat', true).h3,
        names: this.get('subCat', true).names
      },
      links   : this.get('links'),
      problem : this.get('problem'),
      descr   : this.get('descr'),
      solution: this.get('solution', true),
      output  : this.get('output')
    });

  };

/* -----------------------------------------------------------------------------
 * The QuestionFormat Class (classes/question/question-format.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (QuestionFormat)
   * -----------------------------------------------------
   * @desc An object containing the formatted details of a question.
   * @param {!Object} question - The pre-formatted details of the question.
   * @param {!booleanMap} config - The settings for question formatting.
   * @constructor
   */
  var QuestionFormat = function(question, config) {

    checkArgs(question, '!object', config, '!booleanMap');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.id)
     * -----------------------------------------------
     * @desc The id for this question.
     * @type {string}
     * @private
     */
    var id;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.source)
     * -----------------------------------------------
     * @desc This question's source.
     * @type {string}
     * @private
     */
    var source;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.complete)
     * -----------------------------------------------
     * @desc This question's current completion status.
     * @type {string}
     * @private
     */
    var complete;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.mainCat)
     * -----------------------------------------------
     * @desc This question's main categories.
     * @type {{
     *   h3   : ?string,
     *   names: ?strings
     * }}
     * @private
     */
    var mainCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.subCat)
     * -----------------------------------------------
     * @desc This question's sub categories.
     * @type {{
     *   h3   : ?string,
     *   names: ?strings
     * }}
     * @private
     */
    var subCat;

    /**
     * ----------------------------------------------- 
     * Protected Property (QuestionFormat.solution)
     * -----------------------------------------------
     * @desc This question's solution.
     * @type {{
     *   prettyCode: string,
     *   lineCount : number
     * }}
     * @private
     */
    var solution;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /** @type {function} */
    var getCategory;
    /** @type {!{ result: string, lineCount: number }} */
    var code;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;

    id = (config.id && question.id) ? question.id : '';
    if (id) {
      id = ( (id < 10) ?
        '00' + id : (id < 100) ?
          '0' + id : '' + id
      );
    }

    source = ( (config.source && question.source) ?
      app.sources.get(question.source, 'name') : ''
    );

    complete = ( (!config.complete) ?
      '' : (question.complete) ?
        'Yes' : 'No'
    );

    getCategory = app.categories.get;

    // Format the categories
    mainCat = {
      h3   : null,
      names: null
    };
    subCat = {
      h3   : null,
      names: null
    };
    if (config.category) {

      // Format the main category
      if (question.mainCat.length) {
        mainCat.h3 = ( (question.mainCat.length > 1) ?
          'Main Categories:' : 'Main Category:'
        );
        len = question.mainCat.length;
        mainCat.names = new Array(len);
        i = -1;
        while (++i < len) {
          mainCat.names[i] = getCategory(question.mainCat[i], 'name');
        }
      }

      // Format the sub category
      if (config.subCat && question.subCat.length) {
        subCat.h3 = ( (question.subCat.length > 1) ?
          'Sub Categories:' : 'Sub Category:'
        );
        len = question.subCat.length;
        subCat.names = new Array(len);
        i = -1;
        while (++i < len) {
          subCat.names[i] = getCategory(question.subCat[i], 'name');
        }
      }
    }

    // Format the solution
    solution = {};
    if (question.solution) {
      code = prettify(question.solution);
      solution.prettyCode = code.result;
      solution.lineCount = code.lineCount;
    }

    // Freeze all of the protected properties that are objects
    freezeObj(mainCat);
    freezeObj(subCat);
    freezeObj(solution);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (QuestionFormat.get)
     * -----------------------------------------------
     * @desc Gets a protected property's value from the QuestionFormat.
     * @param {string} propName - The name of the property to get.
     * @return {*} The property's value.
     */
    this.get = function(propName) {

      /** @type {!Object<string, *>} */
      var props = {
        id      : id,
        source  : source,
        complete: complete,
        mainCat : mainCat,
        subCat  : subCat,
        solution: solution
      };

      return getter.call(props, propName);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    freezeObj(this, true);

  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  QuestionFormat.prototype.constructor = QuestionFormat;

/* -----------------------------------------------------------------------------
 * The QuestionElem Class (classes/question/question-elem.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (QuestionElem)
   * -----------------------------------------------------
   * @desc An object containing the question's html element.
   * @param {number} id - The id of the question.
   * @constructor
   */
  var QuestionElem = function(id) {

    checkArgs(id, 'number');

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.root)
     * -----------------------------------------------
     * @desc The question's root element.
     * @type {!Element}
     */
    this.root;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.info)
     * -----------------------------------------------
     * @desc The question's div.info element.
     * @type {!Element}
     */
    this.info;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.solution)
     * -----------------------------------------------
     * @desc The question's div.solution element.
     * @type {!Element}
     */
    this.solution;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.pre)
     * -----------------------------------------------
     * @desc The question's div.preContain element.
     * @type {!Element}
     */
    this.pre;

    /**
     * ----------------------------------------------- 
     * Public Property (QuestionElem.code)
     * -----------------------------------------------
     * @desc The question's code element.
     * @type {!Element}
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
   * @param {!{
   *   id      : string,
   *   url     : string,
   *   complete: string,
   *   source  : {
   *     id  : string,
   *     name: string
   *   },
   *   mainCat : {
   *     ids  : !strings,
   *     h3   : ?string,
   *     names: strings
   *   },
   *   subCat  : {
   *     ids  : !strings,
   *     h3   : ?string,
   *     names: strings
   *   },
   *   links   : !links,
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

    /** @type {!Element} */
    var root;
    /** @type {!Element} */
    var info;

    checkArgs(question, '!object');

    root = this.root;
    info = this.info;

    // Append all the sections of the question
    // Note: See the below private helper methods for more details

    if (question.id) {
      appendId(question.id, question.url);
    }

    if (question.source.name) {
      appendSource(question.source);
    }

    if (question.complete) {
      appendComplete(question.complete);
    }

    if (question.mainCat.h3 || question.subCat.h3) {
      appendCategory(question.mainCat, question.subCat);
    }

    if (question.problem || question.descr) {
      appendProblem(question.problem, question.descr);
    }

    if ( hasOwnProp(question.solution, 'prettyCode') ) {
      appendSolution.call(this, question.solution);
    }

    if (question.output) {
      appendOutput(question.output);
    }

    if (question.links.length) {
      appendLinks(question.links);
    }

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

      /** @type {boolean} */
      var config;
      /** @type {!Element} */
      var div;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;
      /** @type {!Element} */
      var a;

      checkArgs(id, 'string', url, 'string');

      config = app.config.links.get('id');

      div = makeElem({ className: 'idContain' });
      h3  = makeElem({ tag: 'h3', text: 'Question:' });
      p   = makeElem('p');

      if (!config) {
        setElemText(p, id);
      }

      // Add the anchor link
      if (config) {
        a = makeIdLink(id, url);
        p.appendChild(a);
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
     * @return {!Element} The anchor element.
     * @private
     */
    function makeIdLink(id, url) {

      /** @type {!Element} */
      var a;

      checkArgs(id, 'string', url, 'string');

      if (!url) {
        url = Number(id);
      }

      a = makeElem({ tag: 'a', text: id });
      a.href = 'id/' + url;
      a.onclick = (function(id) {
        return function onclick(event) {
          Events.linkId(id);
          event.preventDefault && event.preventDefault();
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
     * @param {!stringMap} source - The id and name of the source.
     * @private
     */
    function appendSource(source) {

      /** @type {boolean} */
      var config;
      /** @type {!Element} */
      var div;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;
      /** @type {!Element} */
      var a;

      checkArgs(source, '!stringMap');

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
        a = makeSourceLink(source.id, source.name);
        p.appendChild(a);
      }

    }

    /**
     * ---------------------------------------------
     * Private Method (makeSourceLink)
     * ---------------------------------------------
     * @desc Creates an anchor element for the question's source.
     * @param {string} id - The source's id.
     * @param {string} name - The source's name.
     * @return {!Element} The anchor element.
     * @private
     */
    function makeSourceLink(id, name) {

      /** @type {string} */
      var url;
      /** @type {!Element} */
      var a;

      checkArgs(id, 'string', name, 'string');

      url = app.sources.get(id, 'url');

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'source/' + url;
      a.onclick = (function(id) {
        return function onclick(event) {
          Events.linkSource(id);
          event.preventDefault && event.preventDefault();
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

      /** @type {!Element} */
      var div;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;

      checkArgs(complete, 'string');

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
     * @param {!Object} main - The question's main categories.
     * @param {!Object} sub - The question's sub categories.
     * @private
     */
    function appendCategory(main, sub) {

      /** @type {!Element} */
      var contain;
      /** @type {!Element} */
      var mainDiv;
      /** @type {!Element} */
      var subDiv;

      checkArgs(main, '!object', sub, '!object');

      contain = makeElem({ className: 'category' });

      // Add the main categories
      if (main.h3) {
        mainDiv = makeElem({ className: 'mainCategory' });
        appendMainCategories(main, mainDiv);
        contain.appendChild(mainDiv);
      }

      // Add the sub categories
      if (sub.h3) {
        subDiv = makeElem({ className: 'subCategory' });
        appendSubCategories(sub, subDiv);
        contain.appendChild(subDiv);
      }

      root.appendChild(contain);

    }

    /**
     * ---------------------------------------------
     * Private Method (appendMainCategories)
     * ---------------------------------------------
     * @desc Appends the question's main categories.
     * @param {!Object} main - The question's main categories.
     * @param {!Element} div - The DOM container for the main categories.
     * @private
     */
    function appendMainCategories(main, div) {

      /** @type {boolean} */
      var config;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {!Element} */
      var a;

      checkArgs(main, '!object', div, '!element');

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
          a = makeMainCatLink(main.ids[i], main.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeElem({ tag: 'span', html: ',&nbsp;&nbsp;' }) );
          }
        }
      }

    }

    /**
     * ---------------------------------------------
     * Private Method (appendSubCategories)
     * ---------------------------------------------
     * @desc Appends the question's sub categories.
     * @param {!Object} sub - The question's sub categories.
     * @param {!Element} div - The DOM container for the sub categories.
     * @private
     */
    function appendSubCategories(sub, div) {

      /** @type {boolean} */
      var config;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;
      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {number} */
      var last;
      /** @type {!Element} */
      var a;

      checkArgs(sub, '!object', div, '!element');

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
          a = makeSubCatLink(sub.ids[i], sub.names[i]);
          p.appendChild(a);
          if (i !== last) {
            p.appendChild( makeElem({ tag: 'span', html: ',&nbsp;&nbsp;' }) );
          }
        }
      }

    }

    /**
     * ---------------------------------------------
     * Private Method (makeMainCatLink)
     * ---------------------------------------------
     * @desc Creates a main category link.
     * @param {string} id - The main category's id.
     * @param {string} name - The main category's name.
     * @return {!Element} The anchor link.
     * @private
     */
    function makeMainCatLink(id, name) {

      /** @type {string} */
      var url;
      /** @type {!Element} */
      var a;

      checkArgs(id, 'string', name, 'string');

      url = app.categories.get(id, 'url');

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'category/' + url;
      a.onclick = (function(id) {
        return function onclick(event) {
          Events.linkMainCat(id);
          event.preventDefault && event.preventDefault();
          return false;
        };
      })(id);

      return a;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeSubCatLink)
     * ---------------------------------------------
     * @desc Creates a sub category link.
     * @todo Remove the use of indexOf to find the sub category's parent.
     * @param {string} subId - The sub category's id.
     * @param {string} name - The sub category's name.
     * @return {!Element} The anchor link.
     * @private
     */
    function makeSubCatLink(subId, name) {

      /** @type {string} */
      var parentUrl;
      /** @type {string} */
      var parentId;
      /** @type {!Category} */
      var category;
      /** @type {!strings} */
      var subIds;
      /** @type {string} */
      var mainId;
      /** @type {string} */
      var url;
      /** @type {!Element} */
      var a;
      /** @type {number} */
      var i;

      checkArgs(subId, 'string', name, 'string');

      // Set the sub category's parent id and url
      i = app.categories.ids.length;
      while (i--) {
        mainId = app.categories.ids[i];
        category = app.categories.get(mainId);
        subIds = category.get('subs');
        if (subIds.indexOf(subId) !== -1) {
          parentId  = mainId;
          parentUrl = category.get('url');
          break;
        }
      }

      url = app.categories.get(subId, 'url');

      a = makeElem({ tag: 'a', text: name, className: 'dark' });
      a.href = 'category/' + parentUrl + '/' + url;
      a.onclick = (function(subId, parentId) {
        return function onclick(event) {
          Events.linkSubCat(subId, parentId);
          event.preventDefault && event.preventDefault();
          return false;
        };
      })(subId, parentId);

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

      /** @type {string} */
      var content;
      /** @type {string} */
      var title;
      /** @type {!Element} */
      var div;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;

      checkArgs(problem, 'string', descr, 'string');

      title = (problem) ? 'Problem:' : 'Description:';
      content = problem || descr;

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
     * @this {!QuestionElem}
     * @param {!Object} solution - The question's solution.
     * @private
     */
    function appendSolution(solution) {

      /** @type {!Element} */
      var contain;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var preDiv;
      /** @type {!Element} */
      var pre;
      /** @type {!Element} */
      var code;
      /** @type {!Element} */
      var ol;
      /** @type {number} */
      var height;

      checkArgs(solution, '!object');

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

      /** @type {!Element} */
      var div;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;

      checkArgs(output, 'string');

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
     * @param {!links} links - The question's links.
     * @private
     */
    function appendLinks(links) {

      /** @type {!Object} */
      var linkObj;
      /** @type {number} */
      var len;
      /** @type {!Element} */
      var div;
      /** @type {!Element} */
      var h3;
      /** @type {!Element} */
      var p;
      /** @type {!Element} */
      var a;
      /** @type {number} */
      var i;

      checkArgs(links, '!objects');

      div = makeElem({ className: 'links' });
      h3  = makeElem({ tag: 'h3', text: 'Links:' });
      p   = makeElem('p');

      div.appendChild(h3);
      div.appendChild(p);

      // Append the links
      len = links.length;
      i = -1;
      while (++i < len) {
        linkObj = links[i];
        a = makeElem({ tag: 'a', text: linkObj.name });
        a.href = linkObj.href;
        a.target = '_blank';
        p.appendChild(a);
      }

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

    /** @type {number} */
    var overflow;
    /** @type {number} */
    var scrollbar;
    /** @type {!Element} */
    var code;
    /** @type {!Element} */
    var ext;
    /** @type {!Element} */
    var extClose;
    /** @type {!Element} */
    var extOpen;
    /** @type {!Element} */
    var extBG;
    /** @type {!Element} */
    var extHov;
    /** @type {!Element} */
    var extHovC;
    /** @type {!Element} */
    var extHovO;

    code = this.code;

    overflow = code.scrollWidth - code.clientWidth;

    if (overflow < 1) {
      this.root.style.display = 'none';
      this.root.style.opacity = '1';
      return;
    }

    scrollbar = app.elems.scrl.height;
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
      /** @type {!elementMap} */
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

/* -----------------------------------------------------------------------------
 * The Prettifier Module  (prettify.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (prettify)
   * -----------------------------------------------------
   * @desc The prettifier for this app.
   * @param {string} solution - The problem's solution to be formatted.
   * @return {{
   *   result   : string,
   *   lineCount: number
   * }}
   */
  var prettify = (function() {

    var prettify = function(solution) {

      /** @type {{ result: string, lineCount: number }} */
      var result;

      checkArgs(solution, 'string');

      // Format the solution
      result = applyFormatting( prepareLines(solution) );

      return result;
    };

/* -----------------------------------------------------------------------------
 * The Prettifier Module Variables (pre-compiled-prettifier/prettify-vars.js)
 * -------------------------------------------------------------------------- */


    /**
     * ---------------------------------------------
     * Private Variable (config)
     * ---------------------------------------------
     * @desc The config settings.
     * @type {Object<string, (number|boolean)>}
     * @private
     */
    var config;

    /**
     * ---------------------------------------------
     * Private Variable (htmlEntity)
     * ---------------------------------------------
     * @desc The characters to replace with a html entity.
     * @const
     * @type {stringMap}
     * @private
     */
    var htmlEntity = {
      '<': '&lt;',
      '>': '&gt;'
    };

    freezeObj(htmlEntity);

    /**
     * ---------------------------------------------
     * Private Variable (preRegex)
     * ---------------------------------------------
     * @desc The characters that if preceding a '/' could be a
     *   regular expression. The characters 'n', 'e', and 'f' are
     *   evaluated for the following possible keywords 'return',
     *   'case', 'typeof', 'instanceof', and 'in'.
     * @const
     * @type {!RegExp}
     * @private
     */
    var preRegex = /[\(\)\[\{\};\*\/%\+\-<>&\^\|=!:\?nef]/;

    freezeObj(preRegex);

    /**
     * ---------------------------------------------
     * Private Variable (regexFlags)
     * ---------------------------------------------
     * @desc The flags for js regular expressions.
     * @const
     * @type {!RegExp}
     * @private
     */
    var regexFlags = /[gimy]/;

    freezeObj(regexFlags);

    /**
     * ---------------------------------------------
     * Private Variable (plainNumbers)
     * ---------------------------------------------
     * @desc List of valid plain number characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var plainNumbers = /[0-9\.]/;

    freezeObj(plainNumbers);

    /**
     * ---------------------------------------------
     * Private Variable (hexNumbers)
     * ---------------------------------------------
     * @desc List of valid hex number characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var hexNumbers = /[a-f0-9x\.]/i;

    freezeObj(hexNumbers);

    /**
     * ---------------------------------------------
     * Private Variable (identifierStart)
     * ---------------------------------------------
     * @desc List of valid starting identifier characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var identifierStart = /[a-z_\$]/i;

    freezeObj(identifierStart);

    /**
     * ---------------------------------------------
     * Private Variable (identifiers)
     * ---------------------------------------------
     * @desc List of valid identifier characters.
     * @const
     * @type {!RegExp}
     * @private
     */
    var identifiers = /[a-z0-9_\$]/i;

    freezeObj(identifiers);

    /**
     * ---------------------------------------------
     * Private Variable (commentOpen)
     * ---------------------------------------------
     * @desc Tells whether a comment is open.
     * @type {boolean}
     * @private
     */
    var commentOpen;

    /**
     * ---------------------------------------------
     * Private Variable (commentLinks)
     * ---------------------------------------------
     * @desc Valid link syntax within comments.
     * @const
     * @type {!RegExp}
     * @private
     */
    var commentLinks = /\s\[([^\[\]]+)\]\(([^\s\(\)]+)\)/;

    freezeObj(commentLinks);

    /**
     * ---------------------------------------------
     * Private Variable (notSpace)
     * ---------------------------------------------
     * @desc A regex that catches anything that is not a space.
     * @const
     * @type {!RegExp}
     * @private
     */
    var notSpace = /[^\s]/;

    freezeObj(notSpace);

    /**
     * ---------------------------------------------
     * Private Variable (keywordCategories)
     * ---------------------------------------------
     * @desc The keyword categories and their DOM class names.
     * @const
     * @type {stringMap}
     * @private
     */
    var keywordCategories = {
      def: 'defKey', // Defining Keywords
      res: 'resKey', // Reserved Keywords
      nat: 'natKey', // Native Objects & Methods
      val: 'valKey', // Values
      cli: 'cliKey', // Client Objects & Methods
      jqu: 'jquKey'  // jQuery Objects
    };

    freezeObj(keywordCategories);

    /**
     * ---------------------------------------------
     * Private Variable (keywords)
     * ---------------------------------------------
     * @desc The available keywords, objects, and methods. Objects
     *   also include their properties.
     * @const
     * @type {objectMap}
     * @private
     */
    var keywords = {

      // Defining Keywords
      _class   : makeKeywordObj('def', ''),
      _const   : makeKeywordObj('def', ''),
      _function: makeKeywordObj('def', ''),
      _var     : makeKeywordObj('def', ''),

      // Reserved Keywords
      _abstract    : makeKeywordObj('res', ''),
      _arguments   : makeKeywordObj('res', ''),
      _boolean     : makeKeywordObj('res', ''),
      _break       : makeKeywordObj('res', ''),
      _byte        : makeKeywordObj('res', ''),
      _case        : makeKeywordObj('res', ''),
      _catch       : makeKeywordObj('res', ''),
      _char        : makeKeywordObj('res', ''),
      _continue    : makeKeywordObj('res', ''),
      _debugger    : makeKeywordObj('res', ''),
      _default     : makeKeywordObj('res', ''),
      _delete      : makeKeywordObj('res', ''),
      _do          : makeKeywordObj('res', ''),
      _double      : makeKeywordObj('res', ''),
      _else        : makeKeywordObj('res', ''),
      _enum        : makeKeywordObj('res', ''),
      _export      : makeKeywordObj('res', ''),
      _extends     : makeKeywordObj('res', ''),
      _final       : makeKeywordObj('res', ''),
      _finally     : makeKeywordObj('res', ''),
      _float       : makeKeywordObj('res', ''),
      _for         : makeKeywordObj('res', ''),
      _goto        : makeKeywordObj('res', ''),
      _if          : makeKeywordObj('res', ''),
      _implements  : makeKeywordObj('res', ''),
      _import      : makeKeywordObj('res', ''),
      _in          : makeKeywordObj('res', ''),
      _instanceof  : makeKeywordObj('res', ''),
      _int         : makeKeywordObj('res', ''),
      _interface   : makeKeywordObj('res', ''),
      _item        : makeKeywordObj('res', ''),
      _let         : makeKeywordObj('res', ''),
      _long        : makeKeywordObj('res', ''),
      _native      : makeKeywordObj('res', ''),
      _new         : makeKeywordObj('res', ''),
      _package     : makeKeywordObj('res', ''),
      _private     : makeKeywordObj('res', ''),
      _protected   : makeKeywordObj('res', ''),
      _public      : makeKeywordObj('res', ''),
      _return      : makeKeywordObj('res', ''),
      _short       : makeKeywordObj('res', ''),
      _static      : makeKeywordObj('res', ''),
      _super       : makeKeywordObj('res', ''),
      _switch      : makeKeywordObj('res', ''),
      _synchronized: makeKeywordObj('res', ''),
      _this        : makeKeywordObj('res', ''),
      _throw       : makeKeywordObj('res', ''),
      _throws      : makeKeywordObj('res', ''),
      _transient   : makeKeywordObj('res', ''),
      _try         : makeKeywordObj('res', ''),
      _typeof      : makeKeywordObj('res', ''),
      _void        : makeKeywordObj('res', ''),
      _volatile    : makeKeywordObj('res', ''),
      _while       : makeKeywordObj('res', ''),
      _with        : makeKeywordObj('res', ''),
      _yield       : makeKeywordObj('res', ''),

      // Native Objects & Methods
      _apply               : makeKeywordObj('nat', ''),
      _Array               : makeKeywordObj('nat', '', true),
      _ArrayBuffer         : makeKeywordObj('nat', '', true),
      _bind                : makeKeywordObj('nat', ''),
      _Boolean             : makeKeywordObj('nat', ''),
      _call                : makeKeywordObj('nat', ''),
      _charAt              : makeKeywordObj('nat', ''),
      _charCodeAt          : makeKeywordObj('nat', ''),
      _clearInterval       : makeKeywordObj('nat', ''),
      _clearTimeout        : makeKeywordObj('nat', ''),
      _concat              : makeKeywordObj('nat', ''),
      _constructor         : makeKeywordObj('nat', ''),
      _DataView            : makeKeywordObj('nat', ''),
      _Date                : makeKeywordObj('nat', '', true),
      _decodeURI           : makeKeywordObj('nat', ''),
      _decodeURIComponent  : makeKeywordObj('nat', ''),
      _encodeURI           : makeKeywordObj('nat', ''),
      _encodeURIComponent  : makeKeywordObj('nat', ''),
      _Error               : makeKeywordObj('nat', ''),
      _escape              : makeKeywordObj('nat', ''),
      _eval                : makeKeywordObj('nat', ''),
      _EvalError           : makeKeywordObj('nat', ''),
      _every               : makeKeywordObj('nat', ''),
      _filter              : makeKeywordObj('nat', ''),
      _forEach             : makeKeywordObj('nat', ''),
      _fromCharCode        : makeKeywordObj('nat', ''),
      _Function            : makeKeywordObj('nat', ''),
      _Generator           : makeKeywordObj('nat', ''),
      _GeneratorFunction   : makeKeywordObj('nat', ''),
      _getDate             : makeKeywordObj('nat', ''),
      _getDay              : makeKeywordObj('nat', ''),
      _getFullYear         : makeKeywordObj('nat', ''),
      _getHours            : makeKeywordObj('nat', ''),
      _getMilliseconds     : makeKeywordObj('nat', ''),
      _getMinutes          : makeKeywordObj('nat', ''),
      _getMonth            : makeKeywordObj('nat', ''),
      _getSeconds          : makeKeywordObj('nat', ''),
      _getTime             : makeKeywordObj('nat', ''),
      _getTimezoneOffset   : makeKeywordObj('nat', ''),
      _getUTCDate          : makeKeywordObj('nat', ''),
      _getUTCDay           : makeKeywordObj('nat', ''),
      _getUTCFullYear      : makeKeywordObj('nat', ''),
      _getUTCHours         : makeKeywordObj('nat', ''),
      _getUTCMilliseconds  : makeKeywordObj('nat', ''),
      _getUTCMinutes       : makeKeywordObj('nat', ''),
      _getUTCMonth         : makeKeywordObj('nat', ''),
      _getUTCSeconds       : makeKeywordObj('nat', ''),
      _getYear             : makeKeywordObj('nat', ''),
      _hasOwnProperty      : makeKeywordObj('nat', ''),
      _indexOf             : makeKeywordObj('nat', ''),
      _isFinite            : makeKeywordObj('nat', ''),
      _isNaN               : makeKeywordObj('nat', ''),
      _isPrototypeOf       : makeKeywordObj('nat', ''),
      _join                : makeKeywordObj('nat', ''),
      _JSON                : makeKeywordObj('nat', '', true),
      _lastIndexOf         : makeKeywordObj('nat', ''),
      _length              : makeKeywordObj('nat', ''),
      _map                 : makeKeywordObj('nat', ''),
      _match               : makeKeywordObj('nat', ''),
      _Math                : makeKeywordObj('nat', '', true),
      _Number              : makeKeywordObj('nat', '', true),
      _Object              : makeKeywordObj('nat', '', true),
      _parse               : makeKeywordObj('nat', ''),
      _parseFloat          : makeKeywordObj('nat', ''),
      _parseInt            : makeKeywordObj('nat', ''),
      _pop                 : makeKeywordObj('nat', ''),
      _preference          : makeKeywordObj('nat', ''),
      _print               : makeKeywordObj('nat', ''),
      _propertyIsEnumerable: makeKeywordObj('nat', ''),
      _prototype           : makeKeywordObj('nat', ''),
      _push                : makeKeywordObj('nat', ''),
      _RegExp              : makeKeywordObj('nat', ''),
      _replace             : makeKeywordObj('nat', ''),
      _reset               : makeKeywordObj('nat', ''),
      _resizeBy            : makeKeywordObj('nat', ''),
      _resizeTo            : makeKeywordObj('nat', ''),
      _reverse             : makeKeywordObj('nat', ''),
      _search              : makeKeywordObj('nat', ''),
      _setDate             : makeKeywordObj('nat', ''),
      _setFullYear         : makeKeywordObj('nat', ''),
      _setHours            : makeKeywordObj('nat', ''),
      _setMilliseconds     : makeKeywordObj('nat', ''),
      _setInterval         : makeKeywordObj('nat', ''),
      _setMinutes          : makeKeywordObj('nat', ''),
      _setMonth            : makeKeywordObj('nat', ''),
      _setSeconds          : makeKeywordObj('nat', ''),
      _setTime             : makeKeywordObj('nat', ''),
      _setTimeout          : makeKeywordObj('nat', ''),
      _setUTCDate          : makeKeywordObj('nat', ''),
      _setUTCFullYear      : makeKeywordObj('nat', ''),
      _setUTCHours         : makeKeywordObj('nat', ''),
      _setUTCMilliseconds  : makeKeywordObj('nat', ''),
      _setUTCMinutes       : makeKeywordObj('nat', ''),
      _setUTCMonth         : makeKeywordObj('nat', ''),
      _setUTCSeconds       : makeKeywordObj('nat', ''),
      _setYear             : makeKeywordObj('nat', ''),
      _shift               : makeKeywordObj('nat', ''),
      _slice               : makeKeywordObj('nat', ''),
      _some                : makeKeywordObj('nat', ''),
      _sort                : makeKeywordObj('nat', ''),
      _splice              : makeKeywordObj('nat', ''),
      _split               : makeKeywordObj('nat', ''),
      _String              : makeKeywordObj('nat', '', true),
      _substr              : makeKeywordObj('nat', ''),
      _substring           : makeKeywordObj('nat', ''),
      _Symbol              : makeKeywordObj('nat', '', true),
      _test                : makeKeywordObj('nat', ''),
      _toGMTString         : makeKeywordObj('nat', ''),
      _toLocaleString      : makeKeywordObj('nat', ''),
      _toLowerCase         : makeKeywordObj('nat', ''),
      _toSource            : makeKeywordObj('nat', ''),
      _toString            : makeKeywordObj('nat', ''),
      _toUpperCase         : makeKeywordObj('nat', ''),
      _toUTCString         : makeKeywordObj('nat', ''),
      _TypedArray          : makeKeywordObj('nat', '', true),
      _unescape            : makeKeywordObj('nat', ''),
      _unshift             : makeKeywordObj('nat', ''),
      _unwatch             : makeKeywordObj('nat', ''),
      _UTC                 : makeKeywordObj('nat', ''),
      _valueOf             : makeKeywordObj('nat', ''),
      _watch               : makeKeywordObj('nat', ''),
      _write               : makeKeywordObj('nat', ''),
      _writeln             : makeKeywordObj('nat', ''),

      // Values
      _false    : makeKeywordObj('val', ''),
      _Infinity : makeKeywordObj('val', ''),
      _Nan      : makeKeywordObj('val', ''),
      _null     : makeKeywordObj('val', ''),
      _true     : makeKeywordObj('val', ''),
      _undefined: makeKeywordObj('val', ''),

      // Client Objects & Methods
      _alert                 : makeKeywordObj('cli', ''),
      _anchor                : makeKeywordObj('cli', ''),
      _anchors               : makeKeywordObj('cli', ''),
      _appendChild           : makeKeywordObj('cli', ''),
      _area                  : makeKeywordObj('cli', ''),
      _assign                : makeKeywordObj('cli', ''),
      _back                  : makeKeywordObj('cli', ''),
      _big                   : makeKeywordObj('cli', ''),
      _blink                 : makeKeywordObj('cli', ''),
      _blur                  : makeKeywordObj('cli', ''),
      _body                  : makeKeywordObj('cli', ''),
      _bold                  : makeKeywordObj('cli', ''),
      _button                : makeKeywordObj('cli', ''),
      _byteToString          : makeKeywordObj('cli', ''),
      _captureEvents         : makeKeywordObj('cli', ''),
      _checkbox              : makeKeywordObj('cli', ''),
      _className             : makeKeywordObj('cli', ''),
      _click                 : makeKeywordObj('cli', ''),
      _clientHeight          : makeKeywordObj('cli', ''),
      _clientInformation     : makeKeywordObj('cli', ''),
      _clientWidth           : makeKeywordObj('cli', ''),
      _close                 : makeKeywordObj('cli', ''),
      _closed                : makeKeywordObj('cli', ''),
      _confirm               : makeKeywordObj('cli', ''),
      _console               : makeKeywordObj('cli', '', true),
      _createElement         : makeKeywordObj('cli', ''),
      _crypto                : makeKeywordObj('cli', ''),
      _defaultStatus         : makeKeywordObj('cli', ''),
      _disableExternalCapture: makeKeywordObj('cli', ''),
      _document              : makeKeywordObj('cli', ''),
      _element               : makeKeywordObj('cli', ''),
      _elements              : makeKeywordObj('cli', ''),
      _embed                 : makeKeywordObj('cli', ''),
      _embeds                : makeKeywordObj('cli', ''),
      _enableExternalCapture : makeKeywordObj('cli', ''),
      _event                 : makeKeywordObj('cli', ''),
      _fileUpload            : makeKeywordObj('cli', ''),
      _find                  : makeKeywordObj('cli', ''),
      _fixed                 : makeKeywordObj('cli', ''),
      _focus                 : makeKeywordObj('cli', ''),
      _fontcolor             : makeKeywordObj('cli', ''),
      _fontsize              : makeKeywordObj('cli', ''),
      _form                  : makeKeywordObj('cli', ''),
      _forms                 : makeKeywordObj('cli', ''),
      _forward               : makeKeywordObj('cli', ''),
      _frame                 : makeKeywordObj('cli', ''),
      _frames                : makeKeywordObj('cli', ''),
      _frameRate             : makeKeywordObj('cli', ''),
      _getComputedStyle      : makeKeywordObj('cli', ''),
      _getElementById        : makeKeywordObj('cli', ''),
      _getElementsByClassName: makeKeywordObj('cli', ''),
      _getElementsByTagName  : makeKeywordObj('cli', ''),
      _getOptionValueCount   : makeKeywordObj('cli', ''),
      _getOptionValue        : makeKeywordObj('cli', ''),
      _getPropertyValue      : makeKeywordObj('cli', ''),
      _getSelection          : makeKeywordObj('cli', ''),
      _go                    : makeKeywordObj('cli', ''),
      _handleEvent           : makeKeywordObj('cli', ''),
      _hidden                : makeKeywordObj('cli', ''),
      _history               : makeKeywordObj('cli', ''),
      _home                  : makeKeywordObj('cli', ''),
      _id                    : makeKeywordObj('cli', ''),
      _image                 : makeKeywordObj('cli', ''),
      _ImageData             : makeKeywordObj('cli', '', true),
      _images                : makeKeywordObj('cli', ''),
      _innerHeight           : makeKeywordObj('cli', ''),
      _innerHTML             : makeKeywordObj('cli', ''),
      _innerWidth            : makeKeywordObj('cli', ''),
      _italics               : makeKeywordObj('cli', ''),
      _javaEnabled           : makeKeywordObj('cli', ''),
      _layer                 : makeKeywordObj('cli', ''),
      _layers                : makeKeywordObj('cli', ''),
      _link                  : makeKeywordObj('cli', ''),
      _location              : makeKeywordObj('cli', ''),
      _mimeTypes             : makeKeywordObj('cli', ''),
      _moveAbove             : makeKeywordObj('cli', ''),
      _moveBelow             : makeKeywordObj('cli', ''),
      _moveBy                : makeKeywordObj('cli', ''),
      _moveTo                : makeKeywordObj('cli', ''),
      _moveToAbsolute        : makeKeywordObj('cli', ''),
      _navigate              : makeKeywordObj('cli', ''),
      _navigator             : makeKeywordObj('cli', ''),
      _offscreenBuffering    : makeKeywordObj('cli', ''),
      _offsetHeight          : makeKeywordObj('cli', ''),
      _offsetWidth           : makeKeywordObj('cli', ''),
      _open                  : makeKeywordObj('cli', ''),
      _opener                : makeKeywordObj('cli', ''),
      _options               : makeKeywordObj('cli', ''),
      _outerHeight           : makeKeywordObj('cli', ''),
      _outerWidth            : makeKeywordObj('cli', ''),
      _packages              : makeKeywordObj('cli', ''),
      _pageXOffset           : makeKeywordObj('cli', ''),
      _pageYOffset           : makeKeywordObj('cli', ''),
      _parent                : makeKeywordObj('cli', ''),
      _password              : makeKeywordObj('cli', ''),
      _pkcs11                : makeKeywordObj('cli', ''),
      _plugins               : makeKeywordObj('cli', ''),
      _prompt                : makeKeywordObj('cli', ''),
      _propertyIsEnum        : makeKeywordObj('cli', ''),
      _radio                 : makeKeywordObj('cli', ''),
      _refresh               : makeKeywordObj('cli', ''),
      _releaseEvents         : makeKeywordObj('cli', ''),
      _reload                : makeKeywordObj('cli', ''),
      _removeChild           : makeKeywordObj('cli', ''),
      _routeEvent            : makeKeywordObj('cli', ''),
      _screen                : makeKeywordObj('cli', ''),
      _screenX               : makeKeywordObj('cli', ''),
      _screenY               : makeKeywordObj('cli', ''),
      _scroll                : makeKeywordObj('cli', ''),
      _scrollBy              : makeKeywordObj('cli', ''),
      _scrollTo              : makeKeywordObj('cli', ''),
      _secure                : makeKeywordObj('cli', ''),
      _select                : makeKeywordObj('cli', ''),
      _self                  : makeKeywordObj('cli', ''),
      _small                 : makeKeywordObj('cli', ''),
      _status                : makeKeywordObj('cli', ''),
      _stop                  : makeKeywordObj('cli', ''),
      _strike                : makeKeywordObj('cli', ''),
      _style                 : makeKeywordObj('cli', ''),
      _submit                : makeKeywordObj('cli', ''),
      _sup                   : makeKeywordObj('cli', ''),
      _taint                 : makeKeywordObj('cli', ''),
      _taintEnabled          : makeKeywordObj('cli', ''),
      _text                  : makeKeywordObj('cli', ''),
      _textContent           : makeKeywordObj('cli', ''),
      _textarea              : makeKeywordObj('cli', ''),
      _top                   : makeKeywordObj('cli', ''),
      _untaint               : makeKeywordObj('cli', ''),
      _window                : makeKeywordObj('cli', ''),

      // jQuery Objects
      _$     : makeKeywordObj('jqu', ''),
      _jQuery: makeKeywordObj('jqu', '')
    };

    freezeObj(keywords);

    ////////////////////////////////////////////////////////////////////////////
    // Setup the keyword properties

    // Array
    keywords._Array.props._from    = makePropObj('');
    keywords._Array.props._isArray = makePropObj('');
    keywords._Array.props._observe = makePropObj('');
    keywords._Array.props._of      = makePropObj('');
    freezeObj(keywords._Array.props);

    // ArrayBuffer
    keywords._ArrayBuffer.props._isView   = makePropObj('');
    keywords._ArrayBuffer.props._transfer = makePropObj('');
    freezeObj(keywords._ArrayBuffer.props);

    // Date
    keywords._Date.props._UTC   = makePropObj('');
    keywords._Date.props._now   = makePropObj('');
    keywords._Date.props._parse = makePropObj('');
    freezeObj(keywords._Date.props);

    // JSON
    keywords._JSON.props._parse     = makePropObj('');
    keywords._JSON.props._stringify = makePropObj('');
    freezeObj(keywords._JSON.props);

    // Math
    keywords._Math.props._abs    = makePropObj('');
    keywords._Math.props._acos   = makePropObj('');
    keywords._Math.props._asin   = makePropObj('');
    keywords._Math.props._atan   = makePropObj('');
    keywords._Math.props._atan2  = makePropObj('');
    keywords._Math.props._ceil   = makePropObj('');
    keywords._Math.props._cos    = makePropObj('');
    keywords._Math.props._exp    = makePropObj('');
    keywords._Math.props._floor  = makePropObj('');
    keywords._Math.props._log    = makePropObj('');
    keywords._Math.props._max    = makePropObj('');
    keywords._Math.props._min    = makePropObj('');
    keywords._Math.props._pow    = makePropObj('');
    keywords._Math.props._random = makePropObj('');
    keywords._Math.props._round  = makePropObj('');
    keywords._Math.props._sin    = makePropObj('');
    keywords._Math.props._sqrt   = makePropObj('');
    keywords._Math.props._tan    = makePropObj('');
    freezeObj(keywords._Math.props);

    // Number
    keywords._Number.props._EPSILON           = makePropObj('');
    keywords._Number.props._isNaN             = makePropObj('');
    keywords._Number.props._isFinite          = makePropObj('');
    keywords._Number.props._isInteger         = makePropObj('');
    keywords._Number.props._isSafeInteger     = makePropObj('');
    keywords._Number.props._MAX_SAFE_INTEGER  = makePropObj('');
    keywords._Number.props._MAX_VALUE         = makePropObj('');
    keywords._Number.props._MIN_SAFE_INTEGER  = makePropObj('');
    keywords._Number.props._MIN_VALUE         = makePropObj('');
    keywords._Number.props._NaN               = makePropObj('');
    keywords._Number.props._NEGATIVE_INFINITY = makePropObj('');
    keywords._Number.props._parseFloat        = makePropObj('');
    keywords._Number.props._parseInt          = makePropObj('');
    keywords._Number.props._POSITIVE_INFINITY = makePropObj('');
    freezeObj(keywords._Number.props);

    // Object
    keywords._Object.props._assign                   = makePropObj('');
    keywords._Object.props._create                   = makePropObj('');
    keywords._Object.props._defineProperty           = makePropObj('');
    keywords._Object.props._defineProperties         = makePropObj('');
    keywords._Object.props._freeze                   = makePropObj('');
    keywords._Object.props._getOwnPropertyDescriptor = makePropObj('');
    keywords._Object.props._getOwnPropertyNames      = makePropObj('');
    keywords._Object.props._getOwnPropertySymbols    = makePropObj('');
    keywords._Object.props._getPrototypeOf           = makePropObj('');
    keywords._Object.props._is                       = makePropObj('');
    keywords._Object.props._isExtensible             = makePropObj('');
    keywords._Object.props._isFrozen                 = makePropObj('');
    keywords._Object.props._isSealed                 = makePropObj('');
    keywords._Object.props._keys                     = makePropObj('');
    keywords._Object.props._observe                  = makePropObj('');
    keywords._Object.props._preventExtensions        = makePropObj('');
    keywords._Object.props._seal                     = makePropObj('');
    keywords._Object.props._setPrototypeOf           = makePropObj('');
    freezeObj(keywords._Object.props);

    // String
    keywords._String.props._fromCharCode  = makePropObj('');
    keywords._String.props._fromCodePoint = makePropObj('');
    keywords._String.props._raw           = makePropObj('');
    freezeObj(keywords._String.props);

    // Symbol
    keywords._Symbol.props._for    = makePropObj('');
    keywords._Symbol.props._keyFor = makePropObj('');
    freezeObj(keywords._Symbol.props);

    // TypedArray
    keywords._TypedArray.props._BYTES_PER_ELEMENT = makePropObj('');
    keywords._TypedArray.props._from              = makePropObj('');
    keywords._TypedArray.props._name              = makePropObj('');
    keywords._TypedArray.props._of                = makePropObj('');
    freezeObj(keywords._TypedArray.props);

    // console
    keywords._console.props._assert         = makePropObj('');
    keywords._console.props._group          = makePropObj('');
    keywords._console.props._groupCollapsed = makePropObj('');
    keywords._console.props._groupEnd       = makePropObj('');
    keywords._console.props._log            = makePropObj('');
    keywords._console.props._trace          = makePropObj('');
    freezeObj(keywords._console.props);

    // ImageData
    keywords._ImageData.props._data   = makePropObj('');
    keywords._ImageData.props._height = makePropObj('');
    keywords._ImageData.props._width  = makePropObj('');
    freezeObj(keywords._ImageData.props);


/* -----------------------------------------------------------------------------
 * The Prettifier Module Methods (pre-compiled-prettifier/prettify-methods.js)
 * -------------------------------------------------------------------------- */

    /**
     * ---------------------------------------------
     * Public Method (prettify.setConfig)
     * ---------------------------------------------
     * @desc Sets the config settings for the prettifier.
     * @param {!Object<string, (number|boolean)>} newConfig - The config
     *   settings for the prettifier.
     * @private
     */
    prettify.setConfig = function(newConfig) {

      checkArgs(newConfig, '!object');

      config = newConfig;
      freezeObj(config);

    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLines)
     * ---------------------------------------------
     * @desc Standardizes all line breaks and replaces tabs with spaces.
     * @param {string} solution - The problem's solution to be formatted.
     * @return {!strings}
     * @private
     */
    function prepareLines(solution) {

      /** @type {!strings} */
      var lines;
      /** @type {string} */
      var spaces;
      /** @type {number} */
      var spaceCount;

      checkArgs(solution, 'string');

      // Standardize all line breaks
      solution = solution.replace(/\r\n?/g, '\n');

      // Replace all tabs with spaces
      spaces = '';
      spaceCount = config.tabLength;
      while (spaceCount--) {
        spaces += ' ';
      }
      if (spaces) {
        solution = solution.replace(/\t/g, '  ');
      }

      lines = solution.split('\n');

      return lines;
    }

    /**
     * ---------------------------------------------
     * Private Method (applyFormatting)
     * ---------------------------------------------
     * @desc Applies the prettifier formats.
     * @param {!strings} lines - An array of code lines.
     * @return {!{
     *   result   : string,
     *   lineCount: number
     * }}
     * @private
     */
    function applyFormatting(lines) {

      /** @type {number} */
      var i;
      /** @type {number} */
      var len;
      /** @type {string} */
      var line;
      /** @type {!Object} */
      var result;

      checkArgs(lines, '!strings');

      commentOpen = false;
      len = lines.length;

      i = -1;
      while (++i < len) {

        line = prepareLine(lines[i]);

        if (line) {
          line = highlightSyntax(line, i);
        }

        lines[i] = '<li>'+ line +'</li>';

      }

      result = {
        result   : lines.join(''),
        lineCount: len
      };

      return result;
    }

    /**
     * ---------------------------------------------
     * Private Method (prepareLine)
     * ---------------------------------------------
     * @desc Removes whitespaces from line beginning and end.
     * @param {string} line - The line of code to prepare.
     * @return {string}
     * @private
     */
    function prepareLine(line) {

      /** @type {number} */
      var i;
      /** @type {number} */
      var frontTrimCount;
      /** @type {string} */
      var trimPart;

      checkArgs(line, 'string');

      // Trim ending whitespaces
      if (line) {
        i = line.length - 1;
        if (line.charAt(i) === ' ') {
          --i;
          while (line.charAt(i) === ' ') {
            --i;
          }
          line = line.substr(0, i);
        }
      }

      // Trim beginning whitespaces
      frontTrimCount = config.trimSpace;
      if (line && frontTrimCount) {

        trimPart = ( (frontTrimCount < line.length) ?
          line.substr(0, frontTrimCount) : ''
        );
        if (trimPart && !notSpace.test(trimPart)) {
          // Trim full count
          line = line.substr(frontTrimCount);
        }
        else {
          // Trim partial count
          i = 0;
          while (line.charAt(i) === ' ') {
            ++i;
          }
          line = line.substr(i);
        }
      }

      return line;
    }

    /**
     * ---------------------------------------------
     * Private Method (makeKeywordObj)
     * ---------------------------------------------
     * @desc Creates a keyword object.
     * @param {string} cat - The keyword's category.
     * @param {string=} href - The keyword's details link.
     * @param {boolean=} props - Whether the keyword has properties.
     * @return {!Object<string, (string|numberMap)>}
     * @private
     */
    function makeKeywordObj(cat, href, props) {

      /** @type {!Object<string, (string|numberMap)>} */
      var obj;

      checkArgs(cat, 'string', href, 'string=', props, 'boolean=');

      href = href || '';
      props = props || false;

      obj = {};

      obj.cat = cat;
      obj.href = href;
      obj.props = (props) ? {} : false;

      freezeObj(obj);

      return obj;
    }

    /**
     * ---------------------------------------------
     * Private Method (makePropObj)
     * ---------------------------------------------
     * @desc Creates a keyword property object.
     * @param {string=} href - The keyword's details link.
     * @return {!stringMap}
     * @private
     */
    function makePropObj(href) {

      /** @type {!stringMap} */
      var obj;

      checkArgs(href, 'string=');

      href = href || '';

      obj = {};
      obj.href = href;

      freezeObj(obj);

      return obj;
    }

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Method (pre-compiled-prettifier/highlight-syntax.js)
 * -------------------------------------------------------------------------- */

    /**
     * ---------------------------------------------
     * Private Method (highlightSyntax)
     * ---------------------------------------------
     * @desc Adds spans around reserved code characters to highlight
     *   specific syntax for a line of code.
     * @param {string} line - The line of code to highlight.
     * @return {string}
     * @private
     */
    var highlightSyntax = (function() {

      var highlightSyntax = function(line) {

        checkArgs(line, 'string');

        prepareLine(line);
        formatLine();

        return newLine.join('');
      };

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Variables (pre-compiled-prettifier/
 *                                 pre-compiled-syntax-highlighter/
 *                                 highlight-syntax-vars.js)
 * -------------------------------------------------------------------------- */


      /**
       * ---------------------------------------------
       * Private Variable (newLine)
       * ---------------------------------------------
       * @desc The formatted line of code.
       * @type {strings}
       * @private
       */
      var newLine;

      /**
       * ---------------------------------------------
       * Private Variable (orgLine)
       * ---------------------------------------------
       * @desc The original line of code.
       * @type {strings}
       * @private
       */
      var orgLine;

      /**
       * ---------------------------------------------
       * Private Variable (lineLen)
       * ---------------------------------------------
       * @desc The length of the line of code.
       * @type {number}
       * @private
       */
      var lineLen;

      /**
       * ---------------------------------------------
       * Private Variable (lastIndex)
       * ---------------------------------------------
       * @desc The last index of the line of code.
       * @type {number}
       * @private
       */
      var lastIndex;

      /**
       * ---------------------------------------------
       * Private Variable (router)
       * ---------------------------------------------
       * @desc A hash map that stores the matching character
       *  formatting methods.
       * @type {!objectMap}
       * @private
       */
      var router = {
        "'": formatString,
        '"': formatString,
        ' ': formatSpace,
        '{': formatBracket,
        '[': formatBracket,
        '(': formatBracket,
        ')': formatBracket,
        ']': formatBracket,
        '}': formatBracket,
        '*': formatOperator,
        '%': formatOperator,
        '+': formatOperator,
        '-': formatOperator,
        '<': formatOperator,
        '>': formatOperator,
        '&': formatOperator,
        '^': formatOperator,
        '|': formatOperator,
        '=': formatOperator,
        '!': formatOperator,
        '~': formatOperator,
        '?': formatOperator,
        ',': formatComma,
        ';': formatSemicolon,
        ':': formatColon,
        '.': formatPeriod,
        '0': formatNumber,
        '1': formatNumber,
        '2': formatNumber,
        '3': formatNumber,
        '4': formatNumber,
        '5': formatNumber,
        '6': formatNumber,
        '7': formatNumber,
        '8': formatNumber,
        '9': formatNumber,
        '/': handleSlash
      };

      freezeObj(router);

/* -----------------------------------------------------------------------------
 * The Highlight Syntax Methods (pre-compiled-prettifier/
 *                               pre-compiled-syntax-highlighter/
 *                               highlight-syntax-methods.js)
 * -------------------------------------------------------------------------- */

      /**
       * ---------------------------------------------
       * Private Method (prepareLine)
       * ---------------------------------------------
       * @desc Prepares the line to be highlighted.
       * @param {string} line - The line of code to prepare.
       * @private
       */
      function prepareLine(line) {

        checkArgs(line, 'string');

        orgLine = line.split('');
        freezeObj(orgLine);
        newLine = line.split('');
        lineLen = line.length;
        lastIndex = (lineLen) ? lineLen - 1 : 0;

      }

      /**
       * ---------------------------------------------
       * Private Method (formatLine)
       * ---------------------------------------------
       * @desc Adds highlighting spans to line of code.
       * @type {function}
       * @private
       */
      function formatLine() {

        /** @type {number} */
        var i;
        /** @type {function} */
        var format;

        i = -1;

        if (commentOpen) {
          i = formatCommentStart();
        }

        // Format the line (add the spans)
        while (++i < lineLen) {
          format = ( ( router.hasOwnProperty(orgLine[i]) ) ?
            router[ orgLine[i] ] : identifierStart.test(orgLine[i]) ?
              formatIdentifier : formatMisc
          );
          i = format(i);
        }

      }

      /**
       * ---------------------------------------------
       * Private Method (handleSlash)
       * ---------------------------------------------
       * @desc Handles which formatting method a slash should use.
       * @param {number} i - The current line index being formatted.
       * @return {number} The index's new location.
       * @private
       */
      function handleSlash(i) {

        /** @type {*} */
        var preceding;
        /** @type {number} */
        var end;
        /** @type {number} */
        var ii;

        checkArgs(i, 'number');

        // Handle line comment
        if (orgLine[i + 1] === '/') {
          ii = formatLineComment(i);
        }
        // Handle comment opening
        else if (orgLine[i + 1] === '*') {
          ii = formatCommentOpen(i);
        }
        else {

          // Save preceding character
          preceding = ( (orgLine[i - 1] === ' ') ?
            orgLine[i - 2] : orgLine[i - 1]
          );

          // Handle RegExp
          if (i === 0 || preRegex.test(preceding)) {
            end = isRegex(i);
            if (end) {
              ii = formatRegex(i, end);
            }
          }
        }

        // Handle operator
        if (!ii) {
          ii = formatOperator(i);
        }

        return ii;
      }

      /**
       * ---------------------------------------------
       * Private Method (isRegex)
       * ---------------------------------------------
       * @desc Determines if the given index is a regular expression.
       * @param {number} i - The line index to check.
       * @return {number} The last index of the RegExp if RegExp check
       *   passes or 0 if RegExp check fails.
       * @private
       */
      function isRegex(i) {

        /** @type {number} */
        var end;
        /** @type {string} */
        var regexBody;

        checkArgs(i, 'number');

        end = (orgLine[i + 1] === '/') ? -1 : i;

        // Find regex end index
        while (++end && end < lineLen && orgLine[end] !== '/') {

          sanitizeCharacter(end);

          if (orgLine[end] === '\\') {
            ++end;
          }
        }

        if (end >= lineLen) {
          end = 0;
        }

        regexBody = orgLine.slice(++i, end).join('');

        try {
          new RegExp(regexBody);
        }
        catch (e) {
          end = 0;
        }

        return end;
      }

      /**
       * ---------------------------------------------
       * Private Method (sanitizeCharacter)
       * ---------------------------------------------
       * @desc Inserts html entities when needed.
       * @param {number} i - The line index to check.
       * @private
       */
      function sanitizeCharacter(i) {

        checkArgs(i, 'number');

        if ( hasOwnProp(htmlEntity, orgLine[i]) ) {
          newLine[i] = htmlEntity[ orgLine[i] ];
        };

      }

      /**
       * ---------------------------------------------
       * Private Method (skipComment)
       * ---------------------------------------------
       * @desc Moves the index to the end of comment.
       * @param {number} i - The starting line index.
       * @return {number} The comment's end index.
       * @private
       */
      function skipComment(i) {

        checkArgs(i, 'number');

        while (++i < lineLen) {

          sanitizeCharacter(i);

          if (orgLine[i] === '*' && i !== lastIndex && orgLine[i + 1] === '/') {
            ++i;
            break;
          }
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (skipString)
       * ---------------------------------------------
       * @desc Moves the index to the end of the string.
       * @param {number} i - The starting line index.
       * @return {number} The string's end index.
       * @private
       */
      function skipString(i) {

        /** @type {string} */
        var strCharacter;

        checkArgs(i, 'number');

        strCharacter = orgLine[i];

        while (++i < lineLen && orgLine[i] !== strCharacter) {

          sanitizeCharacter(i);

          if (orgLine[i] === '\\') {
            ++i;
          }
        }

        if (i >= lineLen) {
          i = lastIndex;
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (skipSpace)
       * ---------------------------------------------
       * @desc Moves the index to the end of the sequence of spaces.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipSpace(i) {

        checkArgs(i, 'number');

        while (orgLine[i + 1] === ' ') {
          ++i;
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (skipNumber)
       * ---------------------------------------------
       * @desc Moves the index to the end of the number.
       * @param {number} i - The starting line index.
       * @return {number} The end index.
       * @private
       */
      function skipNumber(i) {

        /** @type {string} */
        var hexStart;
        /** @type {RegExp} */
        var numberOpts;

        checkArgs(i, 'number');

        hexStart = (i !== lastIndex) ? orgLine[i] + orgLine[i + 1] : '';
        numberOpts = ( (hexStart === '0x' || hexStart === '0X') ?
          hexNumbers : plainNumbers
        );

        while (++i < lineLen && numberOpts.test(orgLine[i])) {}
        --i;

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (skipIdentifier)
       * ---------------------------------------------
       * @desc Moves the index to the end of the identifier.
       * @param {number} i - The starting line index.
       * @return {!{
       *   endIndex   : number,
       *   name       : string,
       *   propFollows: boolean
       * }}
       * @private
       */
      function skipIdentifier(i) {

        /** @type {string} */
        var name;
        /** @type {!Object} */
        var result;
        /** @type {boolean} */
        var propFollows;

        checkArgs(i, 'number');

        name = '_' + orgLine[i];

        while (++i < lineLen && identifiers.test(orgLine[i])) {
          name += orgLine[i];
        }

        propFollows = (i !== lineLen && orgLine[i] === '.');
        result = {
          endIndex   : --i,
          name       : name,
          propFollows: propFollows
        };

        return result;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentLinks)
       * ---------------------------------------------
       * @desc Formats links in a comment.
       * @param {number} start - The line index for the comment start.
       * @param {number} end - The line index for the comment end.
       * @private
       */
      function formatCommentLinks(start, end) {

        /** @type {number} */
        var i;
        /** @type {boolean} */
        var pass;
        /** @type {string} */
        var href;
        /** @type {string} */
        var content;
        /** @type {string} */
        var comment;

        checkArgs(start, 'number', end, 'number');

        if (end === lastIndex) {
          ++end;
        }

        comment = orgLine.slice(start, end).join('');
        pass = commentLinks.test(comment);

        while (pass) {
          i = comment.search(commentLinks);

          if (i === -1) {
            break;
          }

          i += start + 1;

          newLine[i] = '';
          ++i;

          href = '';
          content = '';

          // Get the content
          while (orgLine[i] !== ']') {
            newLine[i] = '';
            content += orgLine[i];
            ++i;
          }

          newLine[i] = '';
          ++i;
          newLine[i] = '';
          ++i;

          // Get the href
          while (orgLine[i] !== ')') {
            newLine[i] = '';
            href += orgLine[i];
            ++i;
          }

          // Save the link
          newLine[i] = '<a href="' + href + '" target="_blank">' + content + '</a>';

          // Remove that link from the comment string
          comment = comment.substr(i);
          start = i;
        }

      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentOpen)
       * ---------------------------------------------
       * @desc Opens a comment, adds comment spans, and 
       *   moves the index to the end of comment.
       * @param {number} i - The current line index.
       * @return {number} The comment's end index.
       * @private
       */
      function formatCommentOpen(i) {

        /** @type {number} */
        var start;

        checkArgs(i, 'number');

        start = i;
        newLine[i] = '<span class="cmt">/';
        i = (++i < lastIndex) ? skipComment(i) : ++i;

        if (i >= lineLen) {
          commentOpen = true;
          i = lastIndex;
        }

        newLine[i] += '</span>';

        if (config.commentLinks) {
          formatCommentLinks(start, i);
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatCommentStart)
       * ---------------------------------------------
       * @desc Adds comment spans and moves the index to the end
       *   of the comment for a line inheriting an already open
       *   comment (i.e. line began as a comment).
       * @return {number} 
       * @private
       */
      function formatCommentStart() {

        /** @type {number} */
        var i;

        newLine[0] = '<span class="cmt">' + orgLine[0];

        if (orgLine[0] === '*' && orgLine[1] === '/') {
          commentOpen = false;
          newLine[1] += '</span>';
          i = 3;
        }
        else {

          i = skipComment(0);
          commentOpen = (i > lastIndex);

          if (commentOpen) {
            i = lastIndex;
          }

          newLine[i] += '</span>';

          if (config.commentLinks) {
            formatCommentLinks(0, i);
          }
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatLineComment)
       * ---------------------------------------------
       * @desc Adds comment spans and moves index to line end.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatLineComment(i) {

        checkArgs(i, 'number');

        if (config.commentLinks) {
          formatCommentLinks(i, lastIndex);
        }

        newLine[i] = '<span class="cmt">/';
        i = lastIndex;
        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatString)
       * ---------------------------------------------
       * @desc Adds string spans and moves the index to the
       *   end of string.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatString(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="str">' + orgLine[i];
        i = skipString(i);
        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatRegex)
       * ---------------------------------------------
       * @desc Adds RegExp spans and moves the index to the
       *   end of RegExp.
       * @param {number} i - The current line index.
       * @param {number} end - The last index of the RegExp.
       * @return {number} The last index.
       * @private
       */
      function formatRegex(i, end) {

        /** @type {string} */
        var usedFlags;
        /** @type {string} */
        var character;

        checkArgs(i, 'number', end, 'number');

        newLine[i] = '<span class="rgx">/';

        i = end;
        usedFlags = '';

        // Check for RegExp flags
        while (++i) {
          character = orgLine[i];

          if (regexFlags.test(character) &&
              usedFlags.indexOf(character) === -1) {
            usedFlags += character;
            if (usedFlags.length < 4) {
              continue;
            }
          }

          --i;
          break;
        }

        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSpace)
       * ---------------------------------------------
       * @desc Adds space spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatSpace(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="spc"> ';
        i = skipSpace(i);
        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatBracket)
       * ---------------------------------------------
       * @desc Adds bracket spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatBracket(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="brc">' + orgLine[i] + '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatOperator)
       * ---------------------------------------------
       * @desc Adds operator spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatOperator(i) {

        checkArgs(i, 'number');

        sanitizeCharacter(i);

        newLine[i] = '<span class="opr">' + newLine[i] + '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatComma)
       * ---------------------------------------------
       * @desc Adds comma spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatComma(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="cmm">,</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatSemicolon)
       * ---------------------------------------------
       * @desc Adds semicolon spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatSemicolon(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="smc">;</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatColon)
       * ---------------------------------------------
       * @desc Adds colon spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatColon(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="cln">:</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatPeriod)
       * ---------------------------------------------
       * @desc Adds period spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatPeriod(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="per">.</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatNumber)
       * ---------------------------------------------
       * @desc Adds number spans and moves the index to the
       *   end of number.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatNumber(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="num">' + orgLine[i];
        i = skipNumber(i);
        newLine[i] += '</span>';

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatIdentifier)
       * ---------------------------------------------
       * @desc Finds complete identifier, checks whether it is a keyword,
       *   adds the correct span tags, and moves the index to the end of
       *   the identifier.
       * @param {number} i - The current line index.
       * @param {string=} extras - The id for the keyword object to get
       *   extra keywords to include in check.
       * @return {number} The last index.
       * @private
       */
      function formatIdentifier(i, extras) {

        /** @type {!{ endIndex: number, name: string, propFollows: boolean }} */
        var identifier;
        /** @type {string} */
        var catID;
        /** @type {string} */
        var keyClassName;

        checkArgs(i, 'number', extras, 'string=');

        identifier = skipIdentifier(i);

        // Setup the keyword category and class name
        if ( hasOwnProp(keywords, identifier.name) ) {

          catID = keywords[ identifier.name ].cat;
          keyClassName = keywordCategories[ catID ];

          // Special case for the function keyword
          if (identifier.name === '_function' &&
              (orgLine[identifier.endIndex + 1] === '(' ||
               (orgLine[identifier.endIndex + 1] === ' ' &&
                orgLine[identifier.endIndex + 2] === '('))) {
            keyClassName = keywordCategories[ 'res' ];
          }
        }

        if (!keyClassName && !!extras) {
          if ( hasOwnProp(keywords[ extras ].props, identifier.name) ) {
            catID = keywords[ extras ].cat;
            keyClassName = keywordCategories[ catID ];
          }
        }

        if (!keyClassName) {
          keyClassName = 'idt';
        }

        newLine[i] = '<span class="' + keyClassName + '">' + orgLine[i];

        i = identifier.endIndex;

        newLine[i] += '</span>';

        // Format the identifier's property (dot notation only)
        if (identifier.propFollows) {
          formatPeriod(++i);
          extras = ( (!hasOwnProp(keywords, identifier.name)) ?
            '' : (!keywords[ identifier.name ].props) ?
              '' : identifier.name
          );
          i = formatIdentifier(++i, extras);
        }

        return i;
      }

      /**
       * ---------------------------------------------
       * Private Method (formatMisc)
       * ---------------------------------------------
       * @desc Adds misc spans.
       * @param {number} i - The current line index.
       * @return {number} The last index.
       * @private
       */
      function formatMisc(i) {

        checkArgs(i, 'number');

        newLine[i] = '<span class="msc">' + orgLine[i] + '</span>';

        return i;
      }

      return highlightSyntax;

    })();

    return prettify;

  })();

/* -----------------------------------------------------------------------------
 * The Events Class (classes/events.js)
 * -------------------------------------------------------------------------- */

  /**
   * ----------------------------------------------- 
   * Public Class (Events)
   * -----------------------------------------------
   * @desc The app's event handlers.
   * @type {Object<string, function>}
   * @struct
   */
  var Events = {};

  /**
   * ----------------------------------------------- 
   * Public Method (Events.popState)
   * -----------------------------------------------
   * @desc The onPopState event handler for the window.
   * @param {!Object} newState - The new state to apply to the app.
   */
  Events.popState = function(newState) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;
    /** @type {boolean} */
    var flipElems;

    checkArgs(newState, '!object');

    oldIds = app.vals.get('ids').slice(0);
    oldIndex = app.vals.get('index');
    oldView = app.searchBar.vals.view;
    flipElems = (app.searchBar.vals.order !== newState.order);

    app.searchBar.vals.view    = newState.view;
    app.searchBar.vals.order   = newState.order;
    app.searchBar.vals.stage   = newState.stage;
    app.searchBar.vals.source  = newState.source;
    app.searchBar.vals.mainCat = newState.mainCat;
    app.searchBar.vals.subCat  = newState.subCat;

    app.searchBar.elems.view.value = newState.view;
    app.searchBar.elems.order.value = newState.order;
    if (app.searchBar.elems.stage) {
      app.searchBar.elems.stage.value = newState.stage;
    }
    if (app.searchBar.elems.source) {
      app.searchBar.elems.source.value = newState.source;
    }
    if (app.searchBar.elems.mainCat) {
      app.searchBar.elems.mainCat.value = newState.mainCat;
    }
    if (app.searchBar.elems.subCat) {
      app.searchBar.elems.subCat.value = newState.subCat;
    }

    app.vals.reset(newState.ids, newState.index);

    App.updateDisplay(oldIds, oldIndex, oldView, flipElems, true);

  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.prev)
   * -----------------------------------------------
   * @desc The onClick event handler for the previous button.
   * @type {function}
   */
  Events.prev = function() {

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('prev');

    App.updateDisplay(null, oldIndex);

  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.next)
   * -----------------------------------------------
   * @desc The onClick event handler for the next button.
   * @type {function}
   */
  Events.next = function() {

    /** @type {number} */
    var oldIndex;

    oldIndex = app.vals.get('index');

    app.vals.move('next');

    App.updateDisplay(null, oldIndex);

  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchView)
   * -----------------------------------------------
   * @desc The onChange event handler for the view search option.
   * @param {string} newVal - The new value for the view.
   */
  Events.searchView = function(newVal) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var oldIndex;
    /** @type {number} */
    var newIndex;
    /** @type {string} */
    var oldView;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.view != newVal) {

      len = app.vals.get('len');

      oldIndex = app.vals.get('index');
      newIndex = (newVal === 'all' || !len) ? -1 : 0;
      oldView = app.searchBar.vals.view;

      app.searchBar.vals.view = newVal;
      app.vals.set(null, newIndex);

      App.updateDisplay(null, oldIndex, oldView);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchOrder)
   * -----------------------------------------------
   * @desc The onChange event handler for the order search option.
   * @param {string} newVal - The new value for the order.
   */
  Events.searchOrder = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.order != newVal) {

      oldIds = app.vals.get('ids');
      newIds = oldIds.slice(0);
      newIds.reverse();

      app.searchBar.vals.order = newVal;
      app.vals.set(newIds);

      App.updateDisplay(oldIds, null, null, true);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchStage)
   * -----------------------------------------------
   * @desc The onChange event handler for the stage search option.
   * @param {string} newVal - The new value for the stage.
   */
  Events.searchStage = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.stage != newVal) {

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.stage = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchSource)
   * -----------------------------------------------
   * @desc The onChange event handler for the source search option.
   * @param {string} newVal - The new value for the source.
   */
  Events.searchSource = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.source != newVal) {

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchMainCat)
   * -----------------------------------------------
   * @desc The onChange event handler for the main category search option.
   * @param {string} newVal - The new value for the main category.
   */
  Events.searchMainCat = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.mainCat != newVal) {

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      App.updateDisplay(oldIds, oldIndex);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.searchSubCat)
   * -----------------------------------------------
   * @desc The onChange event handler for the sub category search option.
   * @param {string} newVal - The new value for the sub category.
   */
  Events.searchSubCat = function(newVal) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(newVal, 'string');

    if (app.searchBar.vals.subCat != newVal) {

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.subCat = newVal;

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkId)
   * -----------------------------------------------
   * @desc The onClick event handler for a question id.
   * @param {number} id - The question's id to link to.
   */
  Events.linkId = function(id) {

    /** @type {number} */
    var oldIndex;
    /** @type {string} */
    var oldView;

    checkArgs(id, 'number');

    oldIndex = app.vals.get('index');
    oldView = app.searchBar.vals.view;

    app.searchBar.elems.view.value = 'one';

    app.vals.move(id);

    App.updateDisplay(null, oldIndex, oldView);

  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSource)
   * -----------------------------------------------
   * @desc The onClick event handler for a question source.
   * @param {string} id - The question's source to link to.
   */
  Events.linkSource = function(id) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string');

    if (app.searchBar.vals.source != id) {

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.source = id;
      if (app.searchBar.elems.source) {
        app.searchBar.elems.source.value = id;
      }

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkMainCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question main category.
   * @param {string} id - The question's category to link to.
   */
  Events.linkMainCat = function(id) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string');

    if (app.searchBar.vals.mainCat != id) {

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      app.searchBar.vals.mainCat = id;
      if (app.searchBar.elems.mainCat) {
        app.searchBar.elems.mainCat.value = id;
      }

      newIds = App.findMatches();

      app.vals.reset(newIds);

      app.searchBar.updateSubCatOpts();
      App.updateDisplay(oldIds, oldIndex);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.linkSubCat)
   * -----------------------------------------------
   * @desc The onClick event handler for a question sub category.
   * @param {string} id - The question's category to link to.
   * @param {string} parentId - The sub category's parent category.
   */
  Events.linkSubCat = function(id, parentId) {

    /** @type {!numbers} */
    var oldIds;
    /** @type {!numbers} */
    var newIds;
    /** @type {number} */
    var oldIndex;

    checkArgs(id, 'string', parentId, 'string');

    if (app.searchBar.vals.subCat != id) {

      oldIds = app.vals.get('ids');
      oldIndex = app.vals.get('index');

      // Check the main category and update the values and options
      if (app.searchBar.vals.mainCat !== 'all' &&
          app.searchBar.vals.mainCat !== parentId) {
        app.searchBar.vals.mainCat = 'all';
        if (app.searchBar.elems.mainCat) {
          app.searchBar.elems.mainCat.value = 'all';
        }
        app.searchBar.updateSubCatOpts(id);
      }
      else {
        app.searchBar.vals.subCat = id;
        if (app.searchBar.elems.subCat) {
          app.searchBar.elems.subCat.value = id;
        }
      }

      newIds = App.findMatches();

      app.vals.reset(newIds);

      App.updateDisplay(oldIds, oldIndex);

    }
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Events.extCodeView)
   * -----------------------------------------------
   * @desc The onClick event handler for a question code extender.
   * @param {number} overflow - The question's code view overflow pixel count.
   * @param {elementMap} elems - The code view elements.
   */
  Events.extCodeView = function(overflow, elems) {

    /** @type {number} */
    var newWidth;
    /** @type {number} */
    var newRight;

    checkArgs(overflow, 'number', elems, 'elemMap');

    newWidth = elems.code.clientWidth;

    if (elems.extOpen.innerHTML === 'close') {

      elems.extClose.style.opacity = '0';

      elems.ext.style.right = '-4px';

      newWidth = newWidth - overflow;
      elems.code.style.width = newWidth + 'px';

      setTimeout(function() {
        elems.extOpen.style.opacity = '0.8';
        setTimeout(function() {
          setElemText(elems.extOpen, 'open');
          elems.extHovC.style.display = 'none';
          elems.extHovO.style.display = 'block';
        }, 600);
      }, 400);
    }
    else if (elems.extOpen.innerHTML === 'open') {

      elems.extOpen.style.opacity = '0';

      newRight = overflow + 4;
      elems.ext.style.right = '-' + newRight + 'px';

      newWidth = newWidth + overflow;
      elems.code.style.width = newWidth + 'px';

      setTimeout(function() {
        elems.extClose.style.opacity = '0.8';
        setTimeout(function() {
          setElemText(elems.extOpen, 'close');
          elems.extHovO.style.display = 'none';
          elems.extHovC.style.display = 'block';
        }, 600);
      }, 400);
    }

  };

  freezeObj(Events, true);

////////////////////////////////////////////////////////////////////////////////
// The App Module End
////////////////////////////////////////////////////////////////////////////////

  return appModuleAPI;

})(window, document));
