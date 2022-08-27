import { noteService } from '../services/note.service.jNoteEditors'
import { NoteEditor } from './note-editor.jsx'

export class NoteTodo extends React.Component {

  //---- states ----//
  state = {
    todo: [''],
  }

   //---- first render of the todo note comopnent ----//
  componentDidMount() {
    const { todo } = this.props.note.info
    this.setState({ todo })
  }

  //---- rendering toggleCheck on todo item with onClick ----//
  onToggleCheck = (todoIdx, noteId) => {
    noteService.toggleTodoCheck(todoIdx, noteId)
      .then((todo) => this.setState({ todo }))
  }

  //---- rendering todo note with the desired values ----//
  render() {
    const { todo } = this.state
    const { note } = this.props
    
    //-- returning the note layout and content
    return (
      <div className="note-todo-container">
        {note.info.title && (
          <div className="todo-title">{note.info.title}</div>
        )}
        <ul>
          <button
            className={`fa-solid fa-thumbtack pin-btn ${
              this.props.isPinned ? 'pinned' : ''
            }`}
            onClick={(ev) => this.props.onPin(ev, this.props.note.id)}
          ></button>
          {todo.map((todo, idx) => (
            <li
              key={idx}
              className={`${
                todo[idx + 1]
                  ? todo[idx + 1].isChecked && !todo.isChecked && 'seperator'
                  : ''
              }`}
            >
              <button
                className={`fa-regular fa-square${
                  todo.isChecked ? '-check' : ''
                } checkbox`}
                onClick={() => this.onToggleCheck(idx, note.id)}
              ></button>
              <p className={`${todo.isChecked ? 'todo-checked' : ''}`}>
                {todo.item}
              </p>
            </li>
          ))}
        </ul>
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