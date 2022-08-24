import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'

export class NoteApp extends React.Component {
    state = {
      filterBy: '',
      notes: [],
      selectedNote: null,
    }
  
    componentDidMount() {
      let searchQuery = new URLSearchParams(this.props.location.search).get(
        'search'
      )
      if (!searchQuery) this.loadNotes()
      this.setState(
        (prevState) => ({ ...prevState, filterBy: searchQuery }),
        this.loadNotes
      )
    }
  
    componentDidUpdate(prevProps, prevState) {
      let searchQuery = new URLSearchParams(this.props.location.search).get(
        'search'
      )
      let prevSearch = new URLSearchParams(prevProps.location.search).get(
        'search'
      )
      if (prevSearch !== searchQuery) {
        this.setState(
          (prevState) => ({ ...prevState, filterBy: searchQuery }),
          this.loadNotes
        )
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
      noteService
        .duplicateNote(noteId)
        .then((notes) => this.setState((prevState) => ({ ...prevState, notes })))
    }
  
    loadNotes = () => {
      const { filterBy } = this.state
      noteService.query(filterBy).then((notes) => {
        this.setState((prevState) => ({ ...prevState, notes }))
      })
    }
  
    render() {
      const { notes } = this.state
      return (
        <React.Fragment>
          <section className='note-app'>
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
  