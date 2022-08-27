import { bookService } from '../services/books.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { AddBook } from '../cmps/add-book.jsx'
import { utilService } from '../../../services/util.service.js'

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,

    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then((res) => {
                this.setState({ books: res }, () => {
                    console.log("state has finished loading");
                    console.log(this.state);
                })
            })

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }

    onAddBook = (book) => {
        console.log(book);
        bookService.addBook(book)
            .then(() => {

                console.log("we came here");
                this.loadBooks()
            })
    }


    render() {
        const { books } = this.state

        return <section className="book-app">
            <h1>Book Shop Home-page</h1>
            <div className='flex align-center space-evenly books-inputs'>
                <AddBook />
                <BookFilter onSetFilter={this.onSetFilter} />
            </div>

            <BookList books={books} />


        </section>

    }
}