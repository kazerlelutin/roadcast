import Image from "@tiptap/extension-image";

export function broadcastableImage(onBroadcast: (source: string) => void) {
  return Image.extend({
    addNodeView() {
      return ({ node }) => {
        const container = globalThis.document.createElement("div");
        container.className = "roadcast-image";
        const image = globalThis.document.createElement("img");
        image.src = String(node.attrs.src ?? "");
        image.alt = String(node.attrs.alt ?? "Image de la chronique");
        const button = globalThis.document.createElement("button");
        button.type = "button";
        button.className = "roadcast-image-broadcast";
        button.setAttribute("contenteditable", "false");
        button.setAttribute("aria-label", "Diffuser cette image");
        button.title = "Diffuser cette image";
        button.textContent = "Diffuser";
        button.addEventListener("mousedown", (event) => event.preventDefault());
        button.addEventListener("click", () => onBroadcast(String(node.attrs.src ?? "")));
        container.append(image, button);
        return {
          dom: container,
          update(updatedNode) {
            if (updatedNode.type !== node.type) return false;
            image.src = String(updatedNode.attrs.src ?? "");
            image.alt = String(updatedNode.attrs.alt ?? "Image de la chronique");
            return true;
          },
        };
      };
    },
  });
}
