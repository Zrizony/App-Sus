export class NoteFilter extends React.Component {
  state = {
    filterBy: {
      searchInput: '',
    },
  }

  handleChange = (ev) => {
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
