import { NoteText } from './note-text.jsx'
import { NoteImg } from './note-img.jsx'
import { NoteTodo } from './note-todo.jsx'
import { NoteVideo } from './note-video.jsx'
import { noteService } from '../services/note.service.js'

export class NotePreview extends React.Component {

  //---- states ----//
  state = {
    isPinned: false,
    note: null,
    noteType: null,
  }

  //---- first render of notes preview ----//
  componentDidMount() {
    const { note } = this.props
    this.setState({ note, noteType: note.type, isPinned: note.isPinned })
  }

  //---- changing note background color with the 'changeNoteColor' function from service ----//
  onChangeNoteColor = (noteId, color) => {
    noteService.changeNoteColor(noteId, color).then(() => {
      this.setState((prevState) => ({
        note: { ...prevState.note, style: { backgroundColor: color } },
      }))
    })
  }

  //---- changing note pin state ----//
  onPin = (ev, noteId) => {
    ev.stopPropagation()
    ev.preventDefault()

    const { onPinNote } = this.props
    onPinNote(ev, noteId)
    this.setState((prevState) => ({
      ...prevState,
      isPinned: !this.state.isPinned,
    }))
  }

  //---- rendering the currect note component by noteType state as the identifier ----//
  render() {
    const { note, noteType } = this.state
    if (!note || !noteType) return ''

    //-- using DynamicCmp with switch case to render the correct component 
    const DynamicCmp = (props) => {
      if (!note) return ''
      switch (noteType) {
        case 'note-txt':
          return <NoteText {...props} />
        case 'note-img':
          return <NoteImg {...props} />
        case 'note-todo':
          return <NoteTodo {...props} />
        case 'note-video':
          return <NoteVideo {...props} />
      }
    }

    //-- rendering notes background color
    const inlineStyle = { backgroundColor: note.style.backgroundColor }

    return (
      <div className="note-preview-shadow-protection">
        <div className="note-preview"  style={inlineStyle}>
          <DynamicCmp
            note={note}
            onChangeNoteColor={this.onChangeNoteColor}
            onDuplicateNote={this.props.onDuplicateNote}
            onDeleteNote={this.props.onDeleteNote}
            onPin={this.onPin}
            isPinned={this.state.isPinned}
          />
        </div>
      </div>
    )
  }
}
