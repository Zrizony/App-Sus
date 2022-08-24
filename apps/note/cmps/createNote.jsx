export class CreateTodo extends React.Component {
  state = {
    todo: [''],
  }

  clearTodoLine = () => {
    const { todo: task } = this.state
    return task.filter((todo) => {
      return todo !== ''
    })
  }

  handleChangeTodo = (ev, idx) => {
    const { handleChange } = this.props
    let { todo: todo } = this.state
    todo[idx] = ev.target.value
    todo = this.clearTodoLine()
    handleChange({ target: { value: todo, name: 'todo' } })
    todo.push('')
    this.setState({ todo: todo })
  }

  render() {
    const { todo: todo } = this.state
    return (
      <React.Fragment>
        {todo.map((todo, idx) => (
          <input
            type="text"
            key={idx}
            placeholder="List item"
            value={todo}
            className="todo-line"
            onChange={(ev) => this.handleChangeTodo(ev, idx)}
          />
        ))}
      </React.Fragment>
    )
  }
}