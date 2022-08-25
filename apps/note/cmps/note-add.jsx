import { noteService } from '../services/note.service.js'
import { NoteTypeBtns } from './note-type-btns.jsx'
// import { CreateTodo } from './create-todo-note.jsx'

export class NoteAdd extends React.Component {

  state = {
    isActive: false,
    noteType: 'note-txt',
    noteInfo: {
      title: '',
      txt: '',
      url: '',
      todo: [],
    },
  }

  inputRef = React.createRef()

  handleChange = ({ target }) => {
    const value = target.value
    const field = target.name
    this.setState((prevState) => ({
      ...prevState,
      noteInfo: { ...prevState.noteInfo, [field]: value },
    }))
  }

  onAddNote = (ev) => {
    ev.preventDefault()
    const note = this.state
    note.noteInfo.todo = []
    if (
      !note.noteInfo.title.length &&
      !note.noteInfo.todo.length &&
      !note.noteInfo.txt.length &&
      !note.noteInfo.url.length
    ) return
    noteService.addNote(note)
      .then(
        this.setState({
          isActive: false,
          noteType: 'note-txt',
          noteInfo: {
            title: '',
            txt: '',
            url: '',
            todo: [],
          },
        })
      )
      .then(this.props.loadNotes())
      .then(this.onExpandInput(false))
  }

  onExpandInput = (ev, isOpen) => {
    if (ev.relatedTarget) return

    this.setState({ isActive: isOpen })
  }

  onChangeType = (ev) => {
    ev.preventDefault()
    this.onExpandInput(ev, true)
    const value = ev.target.value

    this.setState((prevState) => ({ ...prevState, noteType: value }))
    console.log('onChangeType', this.inputRef.current);
    this.inputRef.current.focus()
  }

  //---- for to-do note only ----//
  clearTodoLine = () => {
    const { todo } = this.state.noteInfo
    return todo.filter((task) => {
      return task !== ''
    })
  }
  handleChangeTodo = (ev, idx) => {
    let { todo } = this.state.noteInfo
    todo[idx] = ev.target.value
    // todo = this.clearTodoLine()
    this.handleChange({ target: { value: todo, name: 'todo' } })
    console.log('todo', todo);
    todo.push('')
    this.setState({ todo })
  }

  //---- render ----//
  render() {
    const { txt, title, url, todo } = this.state.noteInfo
    const { isActive, noteType } = this.state
    return (
      <div className="note-add">
        <form
          onSubmit={this.onAddNote}
          onBlur={(ev) => {
            this.onExpandInput(ev, true)
          }}>
          <input
            className={`note-add-title ${isActive ? '' : 'hide'}`}
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />

          {noteType === 'note-txt' && (
            <input
              name="txt"
              autoComplete="off"
              type="text"
              placeholder="Take a note..."
              value={txt}
              onFocus={(ev) => this.onExpandInput(ev, true)}
              onChange={this.handleChange}
              ref={this.inputRef}
            />
          )}
          {noteType === 'note-img' && (
            <input
              name="url"
              autoComplete="off"
              type="text"
              placeholder="Enter Image URL"
              value={url}
              onFocus={(ev) => this.onExpandInput(ev, true)}
              onChange={this.handleChange}
              ref={this.inputRef}
            />
          )}
          {noteType === 'note-todo' && (
            // <CreateTodo handleChange={this.handleChange} />
            todo.map((task, idx) => console.log('task', task)(
              <input
              type="text"
              key={idx}
              placeholder="List item"
              value={task}
              className="todo-line"
              autoComplete="off"
              onFocus={(ev) => this.onExpandInput(ev, true)}
              onChange={(ev) => this.handleChangeTodo(ev, idx)}
              />
            ))
          )}
          {noteType === 'note-video' && (
            <input
              name="txt"
              autoComplete="off"
              type="text"
              placeholder="Enter Video embed URL"
              value={url}
              onFocus={(ev) => this.onExpandInput(ev, true)}
              onChange={this.handleChange}
              ref={this.inputRef}
            />
          )}
          {isActive && (
            <div className="form-actions">
              <button className="note-create-btn">Create</button>
            </div>
          )}
        </form>
        <NoteTypeBtns onChangeType={this.onChangeType} />
      </div>
    )
  }
}