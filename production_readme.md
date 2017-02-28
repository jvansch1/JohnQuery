#JohnQuery

## Overview

JohnQuery is a JavaScript library which allows for easy DOM manipulation, event handling and AJAX. Users can easily append HTML elements to any existing DOM element, remove existing DOM elements, and add and remove CSS classes. In addition to editing the DOM, JohnQuery simplifies the process of traversing the DOM, providing functions to find the parent or children of any element or group of elements. While these are all things that possible using only JavaScript, JohnQuery streamlines these processes and greatly reduces the amount of code necessary.


## Key Features

JohnQuery's main function is a wrapper which will convert any argument entered into a DOMNodeCollection, a data-type which can be operated on by any other JohnQuery function. This wrapper provides the basis for the JohnQuery library.

```
const $l = function(arg) {
  if (arg instanceof Function) {
    handleFunction(arg)
  }

  if (typeof arg === "string") {
    const DOMArray = Array.from(document.querySelectorAll(arg))
    return new DOMNodeCollection(DOMArray)
  }
  else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg])
  }
}

```
