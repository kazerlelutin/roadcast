import { kll } from "../main";

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
        const chronicleTemplate = await kll.processTemplate("chronicle");
        for (const chronicle of broadcast.chronicles) {
          const container = document.createElement("div");

          container.setAttribute("data-position", chronicle.position);

          container.innerHTML = chronicleTemplate.outerHTML;
       

          const chronicleEl = container.firstChild;

          // === ids ===
          const titleId = `title_${chronicle.id}`;
          const sourceId = `source_${chronicle.id}`;
          const addButtonId = `add_${chronicle.id}`;

          // === chronicle ===
          chronicleEl.setAttribute("kll-id", chronicle.id);
          chronicleEl.setAttribute(
            "kll-b",
            `${titleId}.value,${sourceId}.value`
          );

          // === title ===
          const titleEl = container.querySelector("[data-type=title]");
          titleEl.setAttribute("kll-id", titleId);

          // === source ===
          const sourceEl = container.querySelector("[data-type=source]");
          sourceEl.setAttribute("kll-id", sourceId);

          // === Add button ===
          const addButton = container.querySelector("[data-type=add]");
          addButton.setAttribute("kll-id", addButtonId);
          addButton.setAttribute("kll-s-position", chronicle.position + 1);


          // === Inject Values ===
          if (chronicle.title)
            titleEl.setAttribute("kll-s-value", chronicle.title);

          if(chronicle.source)sourceEl.setAttribute("kll-s-value", chronicle.source );
          kll.plugins.translate(chronicleEl);

          // === Hydrate ===
          wrapper.appendChild(chronicleEl);
        }

        el.innerHTML = wrapper.innerHTML;

        console.log("render chronicles", el);
        kll.reload(el)
      }
    }

    kll.plugins.translate(el);
  },
};
