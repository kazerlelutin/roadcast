export const textareaAutoResize = {
  state: {
    value: ''
  },
  onInit(_state, el) {
    el.render()
  },
  onInput(_state, el) {
    el.render()
  },
  render(_state, el) {
    el.style.height = '1px' // force recalculation of scrollHeight

    const scrollHeight = el.scrollHeight
    const minHeight = 3 // rem
    const baseHeight = minHeight * 16 // convert rem to pixels

    const finalHeight = Math.max(baseHeight, scrollHeight)

    el.style.height = `${finalHeight}px`
  }
}
