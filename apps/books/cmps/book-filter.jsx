export class BookFilter extends React.Component {

    state = {
        filterBy: {
            bookName: '',
            maxPrice: '',
            minPrice: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value

            }

        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })


    }

    onClear = (ev) => {
        ev.preventDefault()
        this.setState({
            filterBy: {
                bookName: '',
                maxPrice: '',
                minPrice: ''
            }
        }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }



    render() {
        const { bookName, maxPrice, minPrice } = this.state.filterBy

        return <section className="book-filter">
            <form onSubmit={this.onClear}>
                <label htmlFor="by-name">Filter by Name:</label>
                <input
                    type="text"
                    placeholder="Enter Book Name..."
                    id="by-name"
                    name="bookName"
                    value={bookName}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-max-price">Max Price:</label>
                <input
                    type="text"
                    placeholder="Enter Max Price..."
                    id="by-max-price"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-min-price">Minimum Price:</label>
                <input
                    type="text"
                    placeholder="Enter Minimum Price..."
                    id="by-min-price"
                    name="minPrice"
                    value={minPrice}
                    onChange={this.handleChange}
                />

                <button>Clear All</button>

            </form>
        </section>
    }
}