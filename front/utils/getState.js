export function getState(id) {
  const el = document.querySelector(`[kll-id='${id}']`)
  if (!el) return
  return el.state
}

export function getStateByCtrl(ctrl) {
  const el = document.querySelector(`[kll-ctrl='${ctrl}']`)
  if (!el) return
  return el.state
}
