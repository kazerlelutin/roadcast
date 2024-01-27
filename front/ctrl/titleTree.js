export const titleTree = {
  state: {
    chronicle_id: null
  },

  onClick(state, el, e) {
    // scroll to chronicle
    const chronicleEl = document.querySelector(
      `[kll-id="${state.chronicle_id}"]`
    )
    if (!chronicleEl) return
    chronicleEl.scrollIntoView({ behavior: 'smooth' })
  }
}
