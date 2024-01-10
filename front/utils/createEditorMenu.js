

export function createEditorMenu(editor) {
    console.log("createEditorMenu", editor);
  const bubbleMenuElement = document.createElement("div");
  bubbleMenuElement.classList.add(
    "bg-rc-bg-dark",
    "p-2",
    "rounded",
    "text-xs",
    "flex",
    "gap-2"
  );

    items.forEach((item) => {
        const btn = document.createElement("button");
        btn.innerHTML = item.label;
        btn.addEventListener("click", () => {
            editor.chain().focus()[item.command](item.param).run();
        });
        bubbleMenuElement.appendChild(btn);
        }
    );

    return bubbleMenuElement;
}
