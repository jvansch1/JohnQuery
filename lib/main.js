const DOMNodeCollection = require('./dom_node_collection.js')

let fnArray = []

document.addEventListener("DOMContentLoaded", () => {
  fnArray.forEach(fn => fn())
})

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

const handleFunction = function(arg) {
  if (arg instanceof Function) {
    if (document.readyState === "complete") {
      arg();
    }
    else {
      fnArray.push(arg)
    }
  }
}

$l.extend = function(...objects) {
  newObject = {};
  objects.forEach(object => {
    Object.keys(object).forEach(key => newObject[key] = object[key])
  })
  return newObject;
}

const setAJAXDefaults = function() {
  const defaults = {
    method: 'GET',
    success: function(text) {
      return text;
    },
    error: (text) => console.log("error"),
    data: null,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  }
  return defaults
}

$l.ajax = function(url, callback, options = {}) {
  const defaults = setAJAXDefaults()
  const params = $l.extend(defaults, options)
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      return callback(JSON.parse(xmlhttp.responseText));
    }
    else {
      console.log("error")
    }
  }
  xmlhttp.open("GET", url, true)
  xmlhttp.send()

}

window.$l = $l
