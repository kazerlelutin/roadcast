import { kll } from '../main'

function createConfirmModal(msg, subMsg, confirmCallback, cancelCallback) {
  // create elements
  const dialog = document.createElement('dialog')

  dialog.classList.add('flex', 'flex-col', 'gap-3')

  const msgEl = document.createElement('div')
  const subMsgEl = document.createElement('div')

  msgEl.classList.add('text-center', 'italic')
  msgEl.setAttribute('data-trans', msg)

  subMsgEl.classList.add('text-center', 'italic')
  subMsgEl.innerText = subMsg
  const buttons = document.createElement('div')
  buttons.classList.add('flex', 'justify-between', 'gap-2')

  // confirm button
  const confirm = document.createElement('button')
  confirm.classList.add('btn-confirm')
  confirm.setAttribute('data-trans', 'confirm')

  confirm.addEventListener('click', async () => {
    confirm.setAttribute('disabled', true)
    cancel.setAttribute('disabled', true)
    await confirmCallback()
    dialog.close()
    dialog.remove()
  })

  // cancel button
  const cancel = document.createElement('button')
  cancel.setAttribute('data-trans', 'cancel')
  cancel.classList.add('btn-cancel')

  cancel.addEventListener('click', async () => {
    confirm.setAttribute('disabled', true)
    cancel.setAttribute('disabled', true)
    if (cancelCallback) await cancelCallback()
    dialog.close()
    dialog.remove()
  })

  dialog.appendChild(msgEl)
  dialog.appendChild(subMsgEl)
  buttons.appendChild(cancel)
  buttons.appendChild(confirm)
  dialog.appendChild(buttons)
  kll.plugins.translate(dialog)
  document.body.appendChild(dialog)
  return dialog
}

export const confirmDialog = {
  state: {
    confirm: false
  },
  async onClick(state) {
    const dialog = createConfirmModal(state.text, state.subText, state.callback)
    dialog.showModal()
  },
  render() {}
}
