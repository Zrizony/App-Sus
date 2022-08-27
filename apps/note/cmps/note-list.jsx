import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote, onDuplicateNote, onPinNote }) {

  //---- rendering notes components into one notes list (div) ----//
  return (
    <div className='note-list'>
      {notes.map((note) => (
        <NotePreview
          note={note}
          key={note.id}
          onDeleteNote={onDeleteNote}
          onDuplicateNote={onDuplicateNote}
          onPinNote={onPinNote}
        />
      ))}
    </div>
  )
}