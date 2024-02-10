import { switchClasses } from '../utils/switchClasses'

export const LS_KEY_LOCK = 'rc___lock'

function toogleEditors(status) {
  const editors = document.querySelectorAll('.ProseMirror')
  for (const editor of editors) {
    if (status === 'lock') {
      editor.setAttribute('contenteditable', 'false')
    } else {
      editor.setAttribute('contenteditable', 'true')
    }
  }
}
export function getLsLock() {
  return localStorage.getItem(LS_KEY_LOCK) || 'unlock'
}

function toogle(status, el) {
  const elToKeep = el.querySelector(`[data-type="${status}"]`)
  const elToHide = el.querySelector(
    `[data-type="${status === 'lock' ? 'unlock' : 'lock'}"]`
  )

  elToHide.classList.add('hidden')
  elToKeep.classList.remove('hidden')
  status === 'lock'
    ? switchClasses(document.documentElement, 'lock', 'unlock')
    : switchClasses(document.documentElement, 'unlock', 'lock')

  toogleEditors(status)
  localStorage.setItem(LS_KEY_LOCK, status)
}

export const lock = {
  state: {
    lock: undefined
  },
  onInit(state, el) {
    const ls = getLsLock()
    state.lock = ls === 'lock'
    toogle(ls, el)
  },
  onClick(state, el) {
    const status = el.getAttribute('data-type')
    toogle(status === 'lock' ? 'unlock' : 'lock', el.parentElement)
    state.lock = !state.lock
  }
}
