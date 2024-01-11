import { kll } from "../main";
import { createChronicleElement } from "../utils/createChronicleElement";

export const chronicles = {
  async render(state, el, listen) {
    // ===== LISTEN =====
    if (listen && listen.key === "broadcast") {
      const broadcast = listen.value;
      if (!broadcast.id) return;

      if (broadcast.chronicles.length === 0) {
        el.innerHTML =
          '<div data-trans="no_chronicle" class="text-center italic text-rc-info"></div>';
      } else {
        const loader = el.querySelector('[kll-id="loader"]');
        if (loader) loader.remove();

        broadcast.chronicles.sort((a, b)=> a.position - b.position)
        
        const wrapper  = document.createElement("div");
   

        for (const chronicle of broadcast.chronicles) {
          //TODO arrêter si dans DOM et ectouer etat dans chronicle 
          const chronicleEl = await createChronicleElement(chronicle);
          wrapper.appendChild(chronicleEl);
        }

        el.innerHTML = wrapper.innerHTML;
        kll.reload(el)
      }
    }

    kll.plugins.translate(el);
  },
};
