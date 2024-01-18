export const addMedia = {
  state: {},
  onInit(state, el, e) {
    console.log('oninit', el)
  },
  async onchange(state, el, e) {
    console.log('onsubmit', e.target.files)

    //TODO ici envoyer les fichiers au serveur
    //TODO faire les dropzone
    /*

    peut être qu'il faudrait faire descendre l'input pour faire la dropzone
    */
  },
  render() {}
}
