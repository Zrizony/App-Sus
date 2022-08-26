import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'

export class NoteApp extends React.Component {
  state = {
    filterBy: '',
    notes: null,
    selectedNote: null,
  }

  componentDidMount() {
    console.log('didMount')

    if (!this.state.notes) return this.loadNotes()
  }

  componentDidUpdate(prevProps, filterBy) {
    console.log('didUpdate')

    if (prevProps) {
      this.loadNotes
    }
  }

  onPinNote = (ev, noteId) => {
    ev.preventDefault()
    noteService
      .togglePin(noteId)
      .then((notes) => this.setState((prevState) => ({ ...prevState, notes })))
  }

  onDeleteNote = (noteId) => {
    noteService
      .deleteNote(noteId)
      .then((notes) => this.setState((prevState) => ({ ...prevState, notes })))
  }

  onDuplicateNote = (noteId) => {
    console.log('noteId:', noteId)
    noteService
      .duplicateNote(noteId)
      .then((notes) => this.setState((prevState) => ({ ...prevState, notes })))
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => {
      this.loadNotes()
    })
  }

  loadNotes = () => {
    const { filterBy } = this.state
    console.log('load filterBy', filterBy)

    noteService.query(filterBy).then((notes) => {
      this.setState({ notes }),
        () => {
          console.log('this.state', this.state)
        }
    })
  }

  render() {
    const { notes } = this.state
    if (!notes) return <div>loading...</div>
    return (
      <React.Fragment>
        <section className="note-app">
          <NoteFilter onSetFilter={this.onSetFilter} />
          <NoteAdd loadNotes={this.loadNotes} />
          <NoteList
            notes={notes}
            onDeleteNote={this.onDeleteNote}
            onDuplicateNote={this.onDuplicateNote}
            onPinNote={this.onPinNote}
          />
        </section>
      </React.Fragment>
    )
  }
}
