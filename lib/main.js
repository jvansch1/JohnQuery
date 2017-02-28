const DOMNodeCollection = require('./dom_node_collection.js')


let fnArray = []
const $l = function(arg) {
  if (arg instanceof Function) {
    if (document.readyState === "complete") {
      callback();
    }
    else {
      fnArray.push(callback)
    }
  }

  if (typeof arg === "string") {
    const DOMArray = Array.from(document.querySelectorAll(arg))
    return new DOMNodeCollection(DOMArray)
  }
  else if (typeof arg === "HTMLElement") {
    return new DOMNodeCollection([arg])
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fnArray.forEach(fn => fn())
})

$l.extend = function(...objects) {
  newObject = {};
  objects.forEach(object => {
    Object.keys(object).forEach(key => newObject[key] = object[key])
  })
  return newObject;
}



$l.ajax = function(url, options = {}) {
  const defaults = {
    method: 'GET',
    success: (text) => console.log(text),
    error: (text) => console.log(text),
    data: null,
    dataType: 'JSON',
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  }

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
