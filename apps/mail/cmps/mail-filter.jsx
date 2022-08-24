export class MailFilter extends React.Component {

    state = {
        filterBy: {
            inputSearch: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(({ filterBy }) => ({
            filterBy: {
                [field]: value
            }
        }))

    }

    render() {
        const { inputSearch } = this.state.filterBy

        return <section className="mail-filter">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                type="text"
                placeholder="Search mail..."
                name="inputSearch"
                value={inputSearch}
                onChange={this.handleChange}
            />
        </section>
    }
}