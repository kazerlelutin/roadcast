import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import Underline from '@tiptap/extension-underline'
import FloatingMenu from '@tiptap/extension-floating-menu'
import { fetcher } from '../utils/fetcher'
import { getLsLock } from './lock'
import { menuItems } from '../../data/menuItems'

export const chronicle = {
  state: {
    init: false,
    chronicle: null,
    editor: null,
    delay: 1000,
    timeout: null,
    controller: new AbortController()
  },
  onInit(state, el) {
    // ===== STATE =====
    const broadcastEl = document.querySelector('[kll-id=broadcast]')
    if (!broadcastEl) return

    const chronicle = broadcastEl.state.broadcast.chronicles.find(
      (c) => c.id === el.getAttribute('kll-id')
    )
    if (!chronicle) {
      el.remove()
      return
    }

    state.chronicle = chronicle
    const medias = el.querySelector('[data-medias]')
    if (medias) medias.setAttribute('kll-b', `${state.chronicle.id}.chronicle`)

    // ===== EDITOR =====

    const bubbleMenuElement = createEditorMenu()

    const floatingMenuElement = createEditorMenu('floating')

    el.appendChild(bubbleMenuElement)
    el.appendChild(floatingMenuElement)

    function createEditorMenu(type) {
      const menuElement = document.createElement('div')
      menuElement.setAttribute('data-type', type ? type : 'bubble')
      menuElement.classList.add(
        'bg-rc-bg-dark',
        'p-1',
        'rounded',
        'text-xs',
        'flex',
        'flex-wrap',
        'gap-2',
        'fill-current'
      )

      menuItems
        .filter((el) => {
          if (type) return el.menu === type
          return true
        })
        .forEach((item) => {
          if (item.items && item.items.length > 0) {
            // Créer un dropdown pour les éléments avec des sous-items
            const select = document.createElement('select')
            select.classList.add(
              'bg-transparent',
              'text-white',
              'rounded',
              'text-right',
              'py-1',
              'px-2'
            )
            select.addEventListener('change', () => {
              const selectedItem = item.items[select.selectedIndex]
              editor
                .chain()
                .focus()
                [selectedItem.command](selectedItem.param)
                .run()
            })

            item.items.forEach((subItem, index) => {
              const option = document.createElement('option')

              option.value = subItem.name
              option.textContent = subItem.label
              if (index === 0) option.setAttribute('selected', 'selected')

              option.classList.add(
                'bg-rc-bg-dark',
                'text-white',
                'py-1',
                'px-2'
              )
              select.appendChild(option)
            })

            menuElement.appendChild(select)
          } else {
            // Créer un bouton pour les éléments sans sous-items
            const btn = document.createElement('button')
            btn.innerHTML = item.label
            btn.addEventListener('click', () => {
              editor.chain().focus()[item.command](item.param).run()
            })

            btn.classList.add('text-white', 'rounded', 'py-1', 'px-2')
            btn.setAttribute('data-command', item.name)

            if (state.editor && state.editor.isActive(item.label))
              btn.classList.add('bg-rc-bg-light')

            menuElement.appendChild(btn)
          }
        })

      return menuElement
    }

    const editor = new Editor({
      element: el.querySelector('[data-editor]'),
      id: `editor_${state.chronicle.id}`,
      extensions: [
        StarterKit,
        Underline.configure({
          HTMLAttributes: {
            class: 'underline'
          }
        }),
        BubbleMenu.configure({
          element: el.querySelector('[data-type=bubble]'),
          tippyOptions: {
            placement: 'top'
            // options de Tippy.js pour le positionnement du menu
          }
        }),
        FloatingMenu.configure({
          element: el.querySelector('[data-type=floating]')
        })
      ],
      content: state.chronicle.content,
      async onUpdate({ editor }) {
        state.chronicle.content = editor.getHTML()
        clearTimeout(state.timeout)

        state.timeout = setTimeout(() => {
          fetcher.put(
            `/api/chronicle/${chronicle.id}`,
            state.controller.signal,
            { content: editor.getHTML() }
          )
        }, state.delay)
        // optimiste update (dont change current state)
      }
    })

    state.editor = editor

    editor.on('selectionUpdate', () => updateMenuButtons())
    editor.on('update', () => updateMenuButtons(true))

    let upt
    function updateMenuButtons(up) {
      clearTimeout(upt)
      upt = setTimeout(
        () => {
          menuItems.forEach((item) => {
            // Sélectionner le bouton ou le sélecteur
            const element = document.querySelector(
              `[data-command="${item.name}"]`
            )

            if (element) {
              if (element.tagName === 'SELECT') {
                // Mise à jour pour les sélecteurs
                const activeOption = item.items.find((subItem) =>
                  state.editor.isActive(subItem.name)
                )
                if (activeOption) {
                  element.value = activeOption.name
                }
              } else {
                // Mise à jour pour les boutons
                if (state.editor.isActive(item.name)) {
                  element.classList.add('text-white', 'bg-rc-info', 'rounded')
                } else {
                  element.classList.remove(
                    'text-white',
                    'bg-rc-info',
                    'rounded'
                  )
                }
              }
            }
          })
        },
        up ? 0 : 300
      )
    }
    el.render()
  },
  onClean(state) {
    clearTimeout(state.timeout)
  },
  async render(state, el, listen) {
    if (!state.init) {
      const editor = el.querySelector('.ProseMirror')
      if (!editor) return
      getLsLock()
        ? editor.setAttribute('contenteditable', 'true')
        : editor.setAttribute('contenteditable', 'false')

      state.init = true
    }

    if (listen?.name?.match(/title|source/)) {
      const [key] = listen.name.split('_')
      state.chronicle = {
        ...state.chronicle,
        [key]: listen.value
      }
      await fetcher.put(
        `/api/chronicle/${state.chronicle.id}`,
        state.controller.signal,
        { [key]: listen.value }
      )
    }
  }
}
