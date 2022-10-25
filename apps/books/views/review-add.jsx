import { bookService } from "../services/books.service.js"


export class ReviewAdd extends React.Component {

    state = {
        bookId: null,
        review: null
    }

    componentDidMount() {
        const currDate = this.currentDate()

        this.setState({
            review: {
                fullName: '',
                rate: '',
                readAt: currDate,
                freeText: ''
            }
        })
        this.loadReview()
    }

    currentDate = () => {
        const now = new Date()
        let day = now.getDate()
        let month = now.getMonth()
        if (day < 10) { day = "0" + day }
        if (month < 10) { month = "0" + month }
        const date = now.getFullYear() + '-' + month + '-' + day
        return date
    }

    loadReview = () => {
        const { bookId } = this.props.match.params

        bookService.getBookById(bookId)
            .then(() => {
                this.setState({ bookId })
            })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value

        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
    }

    onAddReview = (ev) => {
        ev.preventDefault()

        bookService.addReview(this.state.bookId, this.state.review)
            .then(() => {
                this.props.history.push('/books/' + this.state.bookId)
            })
    }

    render() {
        const { bookId, review } = this.state
        if (!bookId) { return <div>Loading...</div> }
        return <section className="review-add">
            <form className="flex column align-center" onSubmit={this.onAddReview}>

                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    value={review.fullName}
                    id="fullName"
                    onChange={this.handleChange}
                    placeholder="Your Name..."
                    required
                />

                <label htmlFor="rate">Review 1-5:</label>
                <select id="rate" name="rate" onChange={this.handleChange} required>
                    <option value=''>select</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>

                <label htmlFor="readAt">Read At: </label>
                <input
                    onChange={this.handleChange}
                    type="date"
                    id="readAt"
                    name="readAt"
                    value={review.readAt}
                    required
                />

                <label htmlFor="freeText">Your Honest Review:</label>
                <textarea
                    rows={4}
                    type="text"
                    name="freeText"
                    value={review.freeText}
                    id="freeText"
                    onChange={this.handleChange}
                    placeholder="Your honest review..."
                    required
                />

                <button>Add Review</button>

            </form>
        </section>
    }
}
