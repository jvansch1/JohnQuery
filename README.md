#JohnQuery

## Overview

JohnQuery is a JavaScript library which allows for easy DOM manipulation, event handling and AJAX. Users can easily append HTML elements to any existing DOM element, remove existing DOM elements, and add and remove CSS classes. In addition to editing the DOM, JohnQuery simplifies the process of traversing the DOM, providing functions to find the parent or children of any element or group of elements. While these are all things that possible using only JavaScript, JohnQuery streamlines these processes and greatly reduces the amount of code necessary.


## Key Features

### DOM Manipulation

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

Once the target element has been made into a DOMNodeCollection object, it becomes very easy to manipulate the DOM with JohnQuery and make the user experience interactive and dynamic. Below are the functions responsible for the creation and removal of DOM elements. The append element will check for various input types and dispatch the correct action accordingly.

```
remove() {
  this.array.forEach(element => {
    element.remove()
  })
}

append(element) {
  if (typeof element === "string") {
    this.array.forEach(DOMElement => {
      DOMElement.appendChild(document.createElement(element))
    })
  }
  else if(element instanceof DOMNodeCollection) {
    this.array.forEach(DOMElement => {
      element.array.forEach(el2 => {
        DOMElement.innerHTML += el2.innerHTML
      })
    })
  }
  else {
    this.array.forEach(DOMelement => {
      DOMelement.appendChild(element)
    })
  }
}

```

JohnQuery not only allows for DOM elements to be created and destroyed, but also gives the user the ability to edit existing DOM elements. The following gives the user the ability to add and remove CSS classes on any DOM element, as well as add other HTML attributes.

```

attr(elementName, value) {
  if (value === undefined) {
    this.array[0].getAttribute()
  }
  else {
    this.array.forEach(element => {
      element.setAttribute(elementName, value)
    })
  }
}

addClass(className) {
  this.array.forEach(element => {
    element.setAttribute("class", className)
  })
}

removeClass(className) {
  this.array.forEach(element => {
    element.classList.remove(className)
  })
}

```

In addition, JohnQuery provides functions to allow for easy traversal of the DOM. These include functions to to find the children, parent or descendants of a specified type of any target. This  element. This ensure that finding the correct DOM element is a simple process.

### Event Handling

JohnQuery also handles JavaScript events in order to create an interactive experience. Any JavaScript event can be added or removed through JohnQuery's on and off functions. JohnQuery saves any active events as a property on the DOM element, allowing for easy removal.

```

on(eventName, callback) {
  this.array.forEach(element => {
    element.addEventListener(eventName, callback)
    element.eventName = callback
  })
}

off(eventName) {
  this.array.forEach(element => {
    element.removeEventListener(eventName, element.eventName)
  })
}

```

### AJAX

JohnQuery also allows for users to make HTTP requests through AJAX. Defaults are provided for AJAX operations, but these can be manually overwritten by the user.

```
const setAJAXDefaults = function() {
  const defaults = {
    method: 'GET',
    success: (text) => console.log(text),
    error: (text) => console.log(text),
    data: null,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  }
  return defaults
}

$l.ajax = function(url, options = {}) {

  const defaults = setAJAXDefaults()
  const params = $l.extend(defaults, options)
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      params.success(JSON.parse(xmlhttp.responseText))
    }
    else {
      params.error(xmlhttp.responseText)
    }
  }

  xmlhttp.open("GET", url, true)
  xmlhttp.send()
}
```
