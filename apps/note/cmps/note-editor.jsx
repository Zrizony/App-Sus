import { NoteBgColor } from './note-bg-color.jsx'

export function NoteEditor(props) {
  const { noteId, onChangeNoteColor, onDeleteNote, onDuplicateNote } = props
  return (
    <div className="preview-toolbar">
      <NoteBgColor noteId={noteId} onChangeNoteColor={onChangeNoteColor} />
      <button
        onClick={() => onDeleteNote(noteId)}
        className="fa-regular fa-trash-can"
      ></button>
      <button
        onClick={() => onDuplicateNote(noteId)}
        className="fa-regular fa-clone"
      ></button>
    </div>
  )
}
