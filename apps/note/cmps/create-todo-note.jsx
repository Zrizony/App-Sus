// export class CreateTodo extends React.Component {
//   state = {
//     todo: [''],
//   }

//   clearTodoLine = () => {
//     const { todo } = this.state
//     return todo.filter((task) => {
//       return task !== ''
//     })
//   }

//   handleChangeTodo = (ev, idx) => {
//     const { handleChange } = this.props
//     let { todo } = this.state
//     todo[idx] = ev.target.value
//     todo = this.clearTodoLine()
//     handleChange({ target: { value: todo, name: 'todo' } })
//     console.log('todo', todo)
//     console.log('task', task)
//     todo.push('')
//     this.setState({ todo })
//   }

//   render() {
//     const { todo } = this.state

//     return (
//       <React.Fragment>
//         {todo.map((task, idx) => (
//           <input
//             key={idx}
//             name="todo"
//             autoComplete="off"
//             type="text"
//             placeholder="List item"
//             value={task}
//             className="todo-line"
//             onFocus={(ev) => this.onExpandInput(ev, true)}
//             onChange={(ev) => this.handleChangeTodo(ev, idx)}
//             ref={this.inputRef}
//           />
//         ))}
//       </React.Fragment>
//     )
//   }
// }
