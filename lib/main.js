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
  else if (typeof arg === "HTMLElement") {
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

window.$l = $l
