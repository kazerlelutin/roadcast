import { kll } from '../main'

export function toast(message, type = 'info', timeout = 6000) {
  // containers
  const container = document.getElementById('toasts')
  const toast = document.createElement('div')
  const closeBtnEl = document.createElement('button')
  const contentEl = document.createElement('div')

  // Styles
  toast.classList.add('p-1', 'rounded', 'flex', 'flex-col')

  if (type === 'info') {
    toast.classList.add('bg-rc-info-light', 'text-rc-text-dark')
    closeBtnEl.classList.add('text-rc-text-dark')
  }

  if (type === 'warning' || type === 'error') {
    toast.classList.add('bg-rc-warning-light', 'text-rc-text-dark')
    closeBtnEl.classList.add('text-rc-text-dark')
  }

  if (type === 'light') {
    toast.classList.add('bg-rc-light', 'text-rc-text-dark')
    closeBtnEl.classList.add('text-rc-text-dark')
  }

  if (type === 'highlight') {
    toast.classList.add('bg-rc-highlight-dark', 'text-rc-text-dark')
    closeBtnEl.classList.add('text-rc-text-dark')
  }

  contentEl.classList.add('p-1', 'text-left', 'text-sm')
  closeBtnEl.classList.add('self-end', 'text-rc-text-dark', 'text-sm')

  // Contents
  contentEl.setAttribute('data-trans', message)

  kll.plugins.translate(contentEl)
  closeBtnEl.textContent = '×'

  // events
  closeBtnEl.onclick = () => {
    toast.remove()
  }

  // append
  toast.appendChild(closeBtnEl)
  toast.appendChild(contentEl)
  container.appendChild(toast)

  let timeoutId

  const removeToast = () => toast.remove()
  const startTimeout = () => (timeoutId = setTimeout(removeToast, 10000))
  const resetTimeout = () => {
    clearTimeout(timeoutId)
    startTimeout()
  }

  startTimeout()

  // page focus
  document.addEventListener(
    'visibilitychange',
    () =>
      document.visibilityState === 'hidden'
        ? resetTimeout()
        : clearTimeout(timeoutId),

    { once: true }
  )

  // delete toast
  setTimeout(() => {
    if (container.contains(toast)) toast.remove()
  }, timeout)
}
