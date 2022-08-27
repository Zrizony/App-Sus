import { eventBusService } from '../../../services/event-bus.service.js'
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'

export class NoteApp extends React.Component {
  unsubscribe
  state = {
    filterBy: '',
    notes: null,
    selectedNote: null,
  }

  componentDidMount() {
    console.log('didMount')
    this.unsubscribe = eventBusService.on('send-mail-to-notes', (mail) => {
      console.log("mail:", mail);
      this.onAddMailNote(mail)
    })
    if (!this.state.notes) return this.loadNotes()
  }

  componentDidUpdate(prevProps, filterBy) {
    console.log('didUpdate')

    if (prevProps || this.props.onAddNote) {
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

    noteService.query(filterBy)
      .then((notes) => {
        this.setState({ notes })
        // ,
        //   () => {
        //   }
      })
  }

  onAddMailNote = (mail) => {
    const newMail = mail

    const newNote = {
      key: '',
      isActive: false,
      noteType: 'note-txt',
      noteInfo: {
        title: newMail.mail.subject,
        txt: newMail.mail.body,
        url: '',
        todo: [''],
      }
    }

    noteService.addNote(newNote).then(() => {
      this.loadNotes()
      this.unsubscribe()
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
