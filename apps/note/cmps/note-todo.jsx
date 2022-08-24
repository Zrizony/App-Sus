import { noteService } from '../services/note.service.jNoteEditors'
import { NoteEditor } from './note-editor.jsx'

export class NoteTodo extends React.Component {
  state = {
    todo: [],
  }

  componentDidMount() {
    const { todos } = this.props.note.info
    this.setState({ todos })
  }

  onToggleCheck = (todoIdx, noteId) => {
    noteService
      .toggleTodoCheck(todoIdx, noteId)
      .then((todos) => this.setState({ todos }))
  }

  render() {
    const { todo: todos } = this.state
    const { note } = this.props
    return (
      <div className="todos-container">
        {note.info.title && (
          <div className="todos-title">{note.info.title}</div>
        )}
        <ul>
          <button
            className={`fa-solid fa-thumbtack pin-btn ${
              this.props.isPinned ? 'pinned' : ''
            }`}
            onClick={(ev) => this.props.onPin(ev, this.props.note.id)}
          ></button>
          {todos.map((todo, idx) => (
            <li
              key={idx}
              className={`${
                todos[idx + 1]
                  ? todos[idx + 1].isChecked && !todo.isChecked && 'seperator'
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
                {todo.txt}
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