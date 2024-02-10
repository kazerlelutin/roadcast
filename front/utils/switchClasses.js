export function switchClasses(el, add, remove) {
  if (Array.isArray(add)) {
    el.classList.add(...add)
  } else {
    el.classList.add(add)
  }

  if (Array.isArray(remove)) {
    el.classList.remove(...remove)
  } else {
    el.classList.remove(remove)
  }
}
