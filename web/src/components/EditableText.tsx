import type { CSSProperties, ElementType, FocusEvent, KeyboardEvent, ClipboardEvent } from 'react'
import { useEditor } from '../lib/editor'

/** True when rendering inside the live canvas editor (click-to-edit enabled). */
export const useIsEditable = () => useEditor().editable

interface EditableTextProps {
  path: string
  value: string
  as?: ElementType
  className?: string
  style?: CSSProperties
  placeholder?: string
  multiline?: boolean
}

/**
 * Click-to-edit text node, Canva-style.
 *
 * In the editor (EditorContext present), the node renders as contentEditable:
 * click it and type, changes commit to the resume on blur or Enter.
 * Outside the editor (thumbnails, share, PDF capture) it renders as plain
 * read-only text, and renders nothing at all when the value is empty (keeps
 * the pre-editor visuals identical).
 */
export function EditableText({
  path,
  value,
  as: Tag = 'span',
  className,
  style,
  placeholder = 'Click to edit',
  multiline = false,
}: EditableTextProps) {
  const { editable, updateField } = useEditor()

  if (!editable) {
    if (!value) return null
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    )
  }

  const commit = (el: HTMLElement) => {
    const text = multiline ? el.innerText.replace(/\n+$/, '') : (el.textContent ?? '').trim()
    if (text !== value) updateField(path, text)
  }

  const onBlur = (e: FocusEvent<HTMLElement>) => commit(e.currentTarget)

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      e.currentTarget.textContent = value
      e.currentTarget.blur()
    } else if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  const onPaste = (e: ClipboardEvent<HTMLElement>) => {
    // Insert plain text only — never HTML (keeps the CV markup clean).
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  return (
    <Tag
      className={`${className ?? ''} edt`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      role="textbox"
      aria-multiline={multiline}
      aria-label={placeholder}
      data-placeholder={placeholder}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    >
      {value}
    </Tag>
  )
}
