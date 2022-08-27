export class NoteFilter extends React.Component {

  //---- states ----//
  state = {
    filterBy: {
      searchInput: '',
    },
  }

  //---- filtering note with each key stroke inserted to the input field ----//
  handleChange = (ev) => {
    ev.preventDefault

    const field = ev.target.name
    const value = ev.target.value

    this.props.onSetFilter(this.state.filterBy)
    this.setState(
      ({ filterBy }) => ({
        filterBy: {
          ...filterBy,
          [field]: value,
        },
      })
    )
  }

  //---- rendering notes by filter input ----//
  render() {
    const { searchInput } = this.state.filterBy

    return (
      <section className="note-filter">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="search"
          placeholder="Search in Notes"
          autoComplete="off"
          name="searchInput"
          value={searchInput}
          onChange={this.handleChange}
        />
      </section>
    )
  }
}