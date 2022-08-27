import { bookService } from '../services/books.service.js'
import { googleBooksService } from '../services/google-books.service.js'
import { BooksResultList } from './books-result-list.jsx'

export class AddBook extends React.Component {

    state = {
        searchText: '',
        booksResult: null
    }

    handleChange = (ev) => {
        ev.preventDefault()
        const value = ev.target.value
        this.setState({ searchText: value })

    }

    onSearchBook = (ev) => {
        ev.preventDefault()
        googleBooksService.getGoogleBooks(this.state.searchText)
            .then((res) => {
                this.setState({ booksResult: res }, () => {
                    // console.log(this.state.booksResult);
                })
            })
    }

    render() {
        const { searchText, booksResult } = this.state

        return <section className="add-book">
            <form onSubmit={this.onSearchBook} className="add-book-search">
                <label className="flex column align-center" htmlFor="search-text">
                    Search New Book:
                    <input
                        type="text"
                        id="search-text"
                        placeholder="Search new Book here..."
                        name="searchText"
                        value={searchText}
                        onChange={this.handleChange}
                    />

                    <button>Search</button>
                </label>

            </form>
            {booksResult && <BooksResultList onAddBook={this.props.onAddBook} booksResult={booksResult} />}
        </section>
    }
}