import { NoteEditor } from './note-editor.jsx'

export class NoteImg extends React.Component {

  //---- states ----//
  state = {
    imgReady: false,
  }

  //---- rendering image note with the desired values ----//
  render() {
    
    //-- deconstructing for easier life 
    const { url, title } = this.props.note.info
    const { imgReady } = this.state

    return (
      <div className="note-img-container">
        <button
          className={`fa-solid fa-thumbtack pin-btn image ${
            this.props.isPinned ? 'pinned' : ''
          }`}
          onClick={(ev) => this.props.onPin(ev, this.props.note.id)}
        ></button>
        <img
          className="note-img"
          onLoad={() => this.setState({ imgReady: true })}
          src={url}
          style={imgReady ? { opacity: '1' } : { opacity: '0' }}
        />
        <div className="note-img-description">
          {title && <h4>{title}</h4>}
          <NoteEditor
            noteId={this.props.note.id}
            onChangeNoteColor={this.props.onChangeNoteColor}
            onDeleteNote={this.props.onDeleteNote}
            onDuplicateNote={this.props.onDuplicateNote}
          />
        </div>
      </div>
    )
  }
}