import { NoteEditor } from './note-editor.jsx'

export function NoteVideo(props) {
    console.log(props.note);
  const { videoId } = props.note.info
  const { note, onChangeNoteColor, onDeleteNote } = props
  return (
    <div className="note-video-container">
      <button
        className={`fa-solid fa-thumbtack pin-btn video ${
          props.isPinned ? 'pinned' : ''
        }`}
        onClick={(ev) => props.onPin(ev, note.id)}
      ></button>
      <iframe
        width="99%"
        height="300px"
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>
      <div className="note-img-description">
        {note.info.title && <h4>{note.info.title}</h4>}
        <NoteEditor
          noteId={note.id}
          onChangeNoteColor={onChangeNoteColor}
          onDeleteNote={onDeleteNote}
        />
      </div>
    </div>
  )
}