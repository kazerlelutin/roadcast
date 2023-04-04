import styles from './editor.module.css'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { useTranslate } from '../../hooks/translate.hook'

interface EditorProps {
  onChange: (value: string) => void
  defaultValue: string
}

export const Editor: React.FC<EditorProps> = ({ onChange, defaultValue }) => {
  const t = useTranslate({
    bold: {
      en: 'bold',
      fr: 'gras',
    },
    italic: {
      en: 'italic',
      fr: 'italique',
    },
    strike: {
      en: 'strike',
      fr: 'barré',
    },
    code: {
      en: 'code',
      fr: 'code',
    },
    clearMarks: {
      en: 'clear marks',
      fr: 'effacer les marques',
    },
    clearNodes: {
      en: 'clear nodes',
      fr: 'effacer les noeuds',
    },
    paragraph: {
      en: 'paragraph',
      fr: 'paragraphe',
    },
    heading: {
      en: 'heading',
      fr: 'titre',
    },
    blockquote: {
      en: 'blockquote',
      fr: 'citation',
    },
    codeBlock: {
      en: 'code block',
      fr: 'bloc de code',
    },
    bulletList: {
      en: 'bullet list',
      fr: 'liste à puces',
    },
    orderedList: {
      en: 'ordered list',
      fr: 'liste ordonnée',
    },
    todoList: {
      en: 'todo list',
      fr: 'liste à faire',
    },
    horizontalRule: {
      en: 'horizontal rule',
      fr: 'ligne horizontale',
    },
    link: {
      en: 'link',
      fr: 'lien',
    },
    image: {
      en: 'image',
      fr: 'image',
    },
    table: {
      en: 'table',
      fr: 'tableau',
    },
    tableCell: {
      en: 'table cell',
      fr: 'cellule de tableau',
    },
    tableHeader: {
      en: 'table header',
      fr: 'en-tête de tableau',
    },
    tableRow: {
      en: 'table row',
      fr: 'ligne de tableau',
    },
    hardBreak: {
      en: 'hard break',
      fr: 'saut de ligne',
    },
    history: {
      en: 'history',
      fr: 'historique',
    },
    undo: {
      en: 'undo',
      fr: 'annuler',
    },
    redo: {
      en: 'redo',
      fr: 'rétablir',
    },
    clearHistory: {
      en: 'clear history',
      fr: 'effacer l’historique',
    },
    text: {
      en: 'text',
      fr: 'texte',
    },
    heading1: {
      en: 'heading 1',
      fr: 'titre 1',
    },
    heading2: {
      en: 'heading 2',
      fr: 'titre 2',
    },
    heading3: {
      en: 'heading 3',
      fr: 'titre 3',
    },
    heading4: {
      en: 'heading 4',
      fr: 'titre 4',
    },
    heading5: {
      en: 'heading 5',
      fr: 'titre 5',
    },
    heading6: {
      en: 'heading 6',
      fr: 'titre 6',
    },
  })
  const editor = useEditor({
    extensions: [
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
    onUpdate(props) {
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
              {t('undo')}
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              {t('redo')}
            </button>
          </div>
          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
            >
              {t('bold')}
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              {t('italic')}
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              {t('strike')}
            </button>
          </div>

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
              {t('heading1')}
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
              {t('heading2')}
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
              {t('heading3')}
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
              {t('heading4')}
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
              {t('heading5')}
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
              {t('heading6')}
            </button>
          </div>

          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
              {t('paragraph')}
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              {t('bulletList')}
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              {t('orderedList')}
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
              {t('blockquote')}
            </button>
          </div>
          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              code
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              {t('codeBlock')}
            </button>
          </div>

          <div className={styles.section}>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              {t('horizontalRule')}
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHardBreak().run()}
            >
              {t('hardBreak')}
            </button>
          </div>
        </div>
        <EditorContent editor={editor} autoFocus />
      </div>
    </>
  )
}
