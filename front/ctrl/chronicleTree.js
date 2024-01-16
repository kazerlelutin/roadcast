export const chronicleTree = {
  onDragstart(state, _el, e) {
    e.dataTransfer.setData('text/plain', state.chronicle_id)
  },
  render(state, _el, listen) {
    if (listen) {
      const titleEl = document.querySelector(
        `[data-title="${state.chronicle_id}"]`
      )
      if (!titleEl) return
      if (titleEl.innerText === listen.value.title) return
      titleEl.innerText = listen.value.title
    }
  }
}
