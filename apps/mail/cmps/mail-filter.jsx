export class MailFilter extends React.Component {

    state = {
        filterBy: {
            searchInput: ''
        }
    }
    myInterval = null

    handleChange = (ev) => {
        clearInterval(this.myInterval)

        const field = ev.target.name
        const value = ev.target.value

        this.myInterval = setTimeout(() => {
            this.props.onSetFilter(this.state.filterBy)

        }, 300)
        this.setState(({ filterBy }) => ({
            filterBy: {
                ...filterBy,
                [field]: value
            }
        }))
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