import { NoteBgColor } from './note-bg-color.jsx'

export function NoteEditor(props) {

  //-- deconstructing for easier life
  const { noteId, onChangeNoteColor, onDeleteNote, onDuplicateNote } = props

  //---- returning note editor icons on the note itself (while hovering on it) ----//
  return (
    <div className="note-editor">
      <button
        onClick={() => onDeleteNote(noteId)}
        className="fa-regular fa-trash-can"
      ></button>
      <button
        onClick={() => onDuplicateNote(noteId)}
        className="fa-regular fa-clone"
      ></button>
      <NoteBgColor noteId={noteId} onChangeNoteColor={onChangeNoteColor} />
    </div>
  )
}
