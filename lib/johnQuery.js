/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (string !== undefined) {
      this.array.forEach(element => {
        element.innerHTML = string;
      });
    } else {
      return this.array[0].innerHTML;
    }
  }

  empty() {
    this.array.forEach(element => {
      element.innerHTML = "";
    });
  }

  remove() {
    this.array.forEach(element => {
      element.remove();
    });
  }

  append(element) {
    if (typeof element === "string") {
      this.array.forEach(DOMElement => {
        DOMElement.appendChild(document.createElement(element));
      });
    } else if (element instanceof DOMNodeCollection) {
      this.array.forEach(DOMElement => {
        element.array.forEach(el2 => {
          DOMElement.innerHTML += el2.innerHTML;
        });
      });
    } else {
      this.array.forEach(DOMelement => {
        DOMelement.appendChild(element);
      });
    }
  }

  attr(elementName, value) {
    if (value === undefined) {
      this.array[0].getAttribute();
    } else {
      this.array.forEach(element => {
        element.setAttribute(elementName, value);
      });
    }
  }

  addClass(className) {
    this.array.forEach(element => {
      element.setAttribute("class", className);
    });
  }

  removeClass(className) {
    this.array.forEach(element => {
      element.classList.remove(className);
    });
  }

  children() {
    let childArray = [];
    this.array.forEach(element => {
      childArray = childArray.concat(Array.from(element.children));
    });
    return new DOMNodeCollection(childArray);
  }

  parent() {
    let parentArray = [];
    this.array.forEach(element => {
      parentArray.push(element.parentElement);
    });
    return new DOMNodeCollection(parentArray);
  }

  find(selector) {
    let descendentArray = [];
    this.array.forEach(element => {
      descendentArray = descendentArray.concat(Array.from(element.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(descendentArray);
  }

  on(eventName, callback) {
    this.array.forEach(element => {
      element.addEventListener(eventName, callback);
      element.eventName = callback;
    });
  }

  off(eventName) {
    this.array.forEach(element => {
      element.removeEventListener(eventName, element.eventName);
    });
  }
}

module.exports = DOMNodeCollection;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

let fnArray = [];

document.addEventListener("DOMContentLoaded", () => {
  fnArray.forEach(fn => fn());
});

const $l = function (arg) {
  if (arg instanceof Function) {
    handleFunction(arg);
  }

  if (typeof arg === "string") {
    const DOMArray = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(DOMArray);
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }
};

const handleFunction = function (arg) {
  if (arg instanceof Function) {
    if (document.readyState === "complete") {
      arg();
    } else {
      fnArray.push(arg);
    }
  }
};

$l.extend = function (...objects) {
  newObject = {};
  objects.forEach(object => {
    Object.keys(object).forEach(key => newObject[key] = object[key]);
  });
  return newObject;
};

const setAJAXDefaults = function () {
  const defaults = {
    method: 'GET',
    success: function (text) {
      return text;
    },
    error: text => console.log("error"),
    data: null,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  };
  return defaults;
};

$l.ajax = function (url, callback, options = {}) {
  const defaults = setAJAXDefaults();
  const params = $l.extend(defaults, options);
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      return callback(JSON.parse(xmlhttp.responseText));
    } else {
      console.log("error");
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

window.$l = $l;

/***/ })
/******/ ]);