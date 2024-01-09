import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Underline from "@tiptap/extension-underline";
import { fetcher } from "../utils/fetcher";
import { getLsLock } from "./lock";

export const chronicle = {
  state: {
    init: false,
    chronicle: null,
    editor: null,
    delay: 1000,
    timeout: null,
    controller: new AbortController(),
  },
  onInit(state, el) {
    // ===== STATE =====
    const broadcastEl = document.querySelector("[kll-ctrl=broadcast]");
    if (!broadcastEl) return;

    const chronicle = broadcastEl.state.broadcast.chronicles.find(
      (c) => c.id === el.getAttribute("kll-id")
    );
    if (!chronicle) {
      el.remove();
      return;
    }

    state.chronicle = chronicle;

    //TODO exract this
    // ===== EDITOR =====

    const bubbleMenuElement = document.createElement("div");
    bubbleMenuElement.classList.add(
      "bg-rc-bg-dark",
      "p-2",
      "rounded",
      "text-xs",
      "flex",
      "gap-2"
    );

    const boldBtn = document.createElement("button");
    boldBtn.innerHTML = "B";
    boldBtn.addEventListener("click", () => {
      state.editor.chain().focus().toggleBold().run();
    });

    const italicBtn = document.createElement("button");
    italicBtn.innerHTML = "I";
    italicBtn.addEventListener("click", () => {
      state.editor.chain().focus().toggleItalic().run();
    });

    const underlineBtn = document.createElement("button");
    underlineBtn.innerHTML = "U";
    underlineBtn.addEventListener("click", () => {
      state.editor.chain().focus().toggleUnderline().run();
    });

    const strikeBtn = document.createElement("button");
    strikeBtn.innerHTML = "S";
    strikeBtn.addEventListener("click", () => {
      state.editor.chain().focus().toggleStrike().run();
    });

    bubbleMenuElement.appendChild(italicBtn);
    bubbleMenuElement.appendChild(underlineBtn);
    bubbleMenuElement.appendChild(strikeBtn);
    bubbleMenuElement.appendChild(boldBtn);

    const editor = new Editor({
      element: el.querySelector("[data-type=editor]"),
      id: `editor_${state.chronicle.id}`,
      extensions: [
        StarterKit,
        Underline.configure({
          HTMLAttributes: {
            class: "underline",
          },
        }),
        BubbleMenu.configure({
          element: bubbleMenuElement,
          tippyOptions: {
            placement: "top",
            // options de Tippy.js pour le positionnement du menu
          },
        }),
      ],
      content: state.chronicle.content,
      async onUpdate({ editor }) {
        state.chronicle.content = editor.getHTML();
        clearTimeout(state.timeout);

        state.timeout = setTimeout(() => {
          fetcher.put(
            `/api/chronicle/${chronicle.id}`,
            state.controller.signal,
            { content: editor.getHTML() }
          );
        }, state.delay);
        // optimiste update (dont change current state)
      },
    });

    state.editor = editor;

    el.render();
  },
  onClean(state) {
    clearTimeout(state.timeout);
  },
  async render(state, el, listen) {


    if (!state.init) {
      const editor = el.querySelector(".ProseMirror");
      if (!editor) return;
      const ls = getLsLock();
      if (ls === "lock") {
        editor.setAttribute("contenteditable", "false");
      } else {
        editor.setAttribute("contenteditable", "true");
      }
      state.init = true;
    }

    if(listen?.name.match(/title|source/)){
      const [key] = listen.name.split("_");
      await fetcher.put(
        `/api/chronicle/${state.chronicle.id}`,
        state.controller.signal,
        { [key]: listen.value }
      );
    }
    //console.log("chronicle", state, state.chronicle?.id, listen);
  },
};
