import { bookService } from "../services/books.service.js"
const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

    state = {
        book: null
    }

    componentDidMount() {
        console.log("didMount");
        this.loadBook()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("didUpdate");
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        console.log("loading book");
        const { bookId } = this.props.match.params
        bookService.getBookById(bookId)
            .then((book) => {
                if (!book) { return this.props.history.push('/') }
                this.setState({ book: book }, () => {
                    console.log(this.state);
                })
            })
    }



    selectedCurrency = () => {
        const { currencyCode } = this.state.book.listPrice
        if (currencyCode === "EUR") return "€"
        else if (currencyCode === "USD") return "$"
        else return "₪"
    }

    selectedLanguage = () => {
        const { language } = this.state.book.language
        if (language === "sp") return "Spanish"
        else if (language === "en") return "English"
        else return "Hebrew"
    }

    isOnSale = () => {
        const { isOnSale } = this.state.book.listPrice
        if (isOnSale) return "Currently On Sale!"
        else return ""
    }

    bookPages = () => {
        const { pageCount } = this.state.book
        if (pageCount > 500) { return "Long Reading" }
        else if (pageCount > 200) { return "Decent Reading" }
        else return "Light Reading"
    }

    priceColor = () => {
        const { amount } = this.state.book.listPrice
        if (amount >= 150) { return 'red' }
        else if (amount <= 20) { return 'green' }
    }

    bookAge = () => {
        const { publishedDate } = this.state.book
        const currYear = new Date().getFullYear()
        if (currYear - publishedDate >= 10) { return "Veteran Book" }
        else if (currYear - publishedDate <= 1) { return 'New !' }
    }

    onGoBack = () => {
        this.props.history.push('/books')
    }

    render() {
        const { book } = this.state
        if (!book) { return <div>Loading...</div> }
        return <section className="book-details">
            <h2>{book.title}</h2>
            <h3>Author: {book.authors[0]}</h3>
            <p>{book.subtitle}</p>
            <p>{book.description}</p>
            <hr></hr>
            <img src={`${book.thumbnail}`}></img>

            <p>Price: <span className={this.priceColor()}>{book.listPrice.amount}</span>{this.selectedCurrency()}</p>
            <p>{this.isOnSale()}</p>
            <hr></hr>
            <p>Language: {this.selectedLanguage()}</p>
            <p>Pages: {book.pageCount} - {this.bookPages()}</p>
            <p>Published: {book.publishedDate} - {this.bookAge()}</p>




            <Link to={"/books/review-add/" + book.id}>
                <button>Add Review</button>
            </Link>
            <button onClick={this.onGoBack}>Return</button>
        </section>
    }
}

