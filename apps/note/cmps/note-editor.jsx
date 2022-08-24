import { NoteBgColor } from './note-bg-color.jsx'

export function NoteEditor(props) {
  const { noteId, onChangeNoteColor, onDeleteNote } = props
  return (
    <div className="note-editor">
      <button
        onClick={() => onDeleteNote(noteId)}
        className="fa-regular fa-trash-can"
      ></button>
      <NoteBgColor noteId={noteId} onChangeNoteColor={onChangeNoteColor} />
    </div>
  )
}
