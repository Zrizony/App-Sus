export class MailFilter extends React.Component {

    state = {
        filterBy: {
            searchInput: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(({ filterBy }) => ({
            filterBy: {
                ...filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { searchInput } = this.state.filterBy

        return <section className="mail-filter">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                type="text"
                placeholder="Search in mail"
                name="searchInput"
                value={searchInput}
                onChange={this.handleChange}
            />
        </section>
    }
}