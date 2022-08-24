import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote, onPinNote }) {
  return (
    <div className='note-list'>
      {notes.map((note) => (
        <NotePreview
          note={note}
          key={note.id}
          onDeleteNote={onDeleteNote}
          onPinNote={onPinNote}
        />
      ))}
    </div>
  )
}