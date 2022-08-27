import { noteService } from '../services/note.service.js'
import { NoteEditor } from './note-editor.jsx'

export class NoteText extends React.Component {

  //---- states ----//
  state = {
    noteTitle: '',
    noteText: '',
  }

  //---- first render of the text note comopnent ----//
  componentDidMount() {
    const { note } = this.props
    this.setState({
      noteTitle: note.info.title,
      noteText: note.info.txt,
    })
  }

  //---- handeling text note title input change ----//
  handleTitleChange = ({ target }) => {
    const { value } = target
    this.setState({ noteTitle: value })
  }

  //---- handeling text note text input change ----//
  handleTextChange = ({ target }) => {
    const { value } = target
    this.setState({ noteText: value })
  }

  //---- saving changes after input loses focus (user clicked out of the input) ----//
  onSaveChange = () => {
    const { note } = this.props
    const { noteText } = this.state
    const { noteTitle } = this.state
    noteService.updateNoteText(note, noteText, noteTitle)
  }

  //---- adjusting note size by text length ----//
  onResize = ({ target }) => {
    target.style.height = 'inherit'
    target.style.height = `${target.scrollHeight}px`
  }

  //---- rendering text note with the desired values ----//
  render() {
    const { noteText, noteTitle } = this.state

    //-- returning the note layout and content
    return (
      <div className="note-text-container">
        {noteTitle && (
          <textarea
            rows={1}
            spellCheck="false"
            onChange={this.handleTitleChange}
            onBlur={this.onSaveChange}
            value={noteTitle}
            className="note-title"
          >
            {noteTitle}
          </textarea>
        )}
        <textarea
          className="note-text"
          onInput={this.onResize}
          spellCheck="false"
          onBlur={this.onSaveChange}
          value={noteText}
          onChange={this.handleTextChange}
        ></textarea>
        <button
          className={`fa-solid fa-thumbtack pin-btn ${
            this.props.isPinned ? 'pinned' : ''
          }`}
          onClick={(ev) => this.props.onPin(ev, this.props.note.id)}
        ></button>
        <NoteEditor
          noteId={this.props.note.id}
          onChangeNoteColor={this.props.onChangeNoteColor}
          onDeleteNote={this.props.onDeleteNote}
          onDuplicateNote={this.props.onDuplicateNote}
        />
      </div>
    )
  }
}
