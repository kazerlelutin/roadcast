function _setElement(elToUpdate, content, attrs) {
  if (!elToUpdate) return
  if (content) elToUpdate.innerHTML = content
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value !== undefined) elToUpdate.setAttribute(key, value)
    }
  }
}

export function setElement(el, name, content, attrs) {
  const elToUpdate = el.querySelector(`[data-${name}]`)

  _setElement(elToUpdate, content, attrs)
}

export function setElements(el, params) {
  for (const [name, content, attrs] of params) {
    setElement(el, name, content, attrs)
  }
}

export function setAttributes(el, attrs) {
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value)
  }
}

export function setKllAttributes(el, attrs) {
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(`kll-${key}`, value)
  }
}

export function setElementbyKllId(el, name, content, attrs) {
  const elToUpdate = el.querySelector(`[kll-id='${name}']`)
  _setElement(elToUpdate, content, attrs)
}

export function setElementbyKllTc(el, name, content, attrs) {
  const elToUpdate = el.querySelector(`[kll-tc='${name}']`)
  _setElement(elToUpdate, content, attrs)
}

export function setElementbyKllT(el, name, content, attrs) {
  const elToUpdate = el.querySelector(`[kll-t='${name}']`)
  _setElement(elToUpdate, content, attrs)
}
