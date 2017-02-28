class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (string !== undefined) {
      this.array.forEach(element => {
        element.innerHTML = string
      })
    }
    else {
      return this.array[0].innerHTML
    }
  }


  empty() {
    this.array.forEach(element => {
      element.innerHTML = ""
    })
  }

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

  children() {
    let childArray = [];
    this.array.forEach(element => {
      childArray = childArray.concat(Array.from(element.children))
    });
    return new DOMNodeCollection(childArray);
  }

  parent() {
    let parentArray = [];
    this.array.forEach(element => {
      parentArray.push(element.parentElement)
    })
    return new DOMNodeCollection(parentArray);
  }

  find(selector) {
    let descendentArray = [];
    this.array.forEach(element => {
      descendentArray = descendentArray.concat(Array.from(element.querySelectorAll(selector)))
    })
    return new DOMNodeCollection(descendentArray);
  }


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
}

module.exports = DOMNodeCollection;
