import styles from './editor.module.css'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import React from 'react'
import {
  BulletListIcon,
  CodeBlockIcon,
  HorizontalRuleIcon,
  OrderListIcon,
  ParagraphIcon,
  QuoteIcon,
  RedoIcon,
  ReturnIcon,
  UndoIcon,
} from '@/ui/icons'
import Image from '@tiptap/extension-image'

import { CodeIcon } from '@/ui/icons/code-icon'

import { Node, mergeAttributes, PasteRule } from '@tiptap/core'

const AutoImage = Node.create({
  name: 'autoImage',

  group: 'inline',

  inline: true,

  selectable: true,

  atom: true,

  addAttributes() {
    return {
      src: {},
      alt: { default: null },
      title: { default: null },
      class: { default: 'chronicle-img' },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addPasteRules() {
    return [
      new PasteRule({
        find: /(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|svg))/g,
        handler: ({ state, range, match }) => {
          const url = match[0]
          const { tr } = state

          tr.replaceWith(
            range.from,
            range.to,
            state.schema.nodes.autoImage.create({ src: url })
          )

          return tr
        },
      }),
    ]
  },
})
interface EditorProps {
  onChange: (value: string) => void
  defaultValue: string
}

export const Editor: React.FC<EditorProps> = ({ onChange, defaultValue }) => {
  const editor = useEditor({
    extensions: [
      Image.configure({
        inline: true,
        HTMLAttributes: { class: 'chronicle-img' },
        allowBase64: true,
      }),
      AutoImage,
      Underline.configure({
        HTMLAttributes: {
          class: 'underline',
        },
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: defaultValue,
    async onUpdate(props) {
      onChange(props.editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <div className={styles.icon}>
                <UndoIcon />
              </div>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <div className={styles.icon}>
                <RedoIcon />
              </div>
            </button>
          </div>
          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              <b>B</b>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <i>i</i>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              <s>S</s>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              <u>U</u>
            </button>
          </div>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <div className={styles.icon}>
              <ParagraphIcon />
            </div>
          </button>
          <div className={styles.section}>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
              }
            >
              <b>H1</b>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
              }
            >
              <b>H2</b>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
              }
            >
              <b>H3</b>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={
                editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
              }
            >
              <b>H4</b>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 5 }).run()
              }
              className={
                editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
              }
            >
              <b>H5</b>
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 6 }).run()
              }
              className={
                editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
              }
            >
              <b>H6</b>
            </button>
          </div>

          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              <div className={styles.icon}>
                <BulletListIcon />
              </div>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              <div className={styles.icon}>
                <OrderListIcon />
              </div>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              <div className={styles.icon}>
                <QuoteIcon />
              </div>
            </button>
          </div>
          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              <div className={styles.icon}>
                <CodeIcon />
              </div>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <div className={styles.icon}>
                <CodeBlockIcon />
              </div>
            </button>
          </div>

          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <div className={styles.icon}>
                <HorizontalRuleIcon />
              </div>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHardBreak().run()}
            >
              <div className={styles.icon}>
                <ReturnIcon />
              </div>
            </button>
          </div>
        </div>
        <EditorContent editor={editor} autoFocus />
      </div>
    </>
  )
}
