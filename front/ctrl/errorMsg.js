import { kll } from "../main";

export const errorMsg = {
  render(_, el, listen) {
    if (!listen.key) return;
    const {value} = listen;
    if (el.innerText !== value) {
      el.setAttribute("data-trans", value);
    }
    kll.plugins.translate(el);
  },
};
