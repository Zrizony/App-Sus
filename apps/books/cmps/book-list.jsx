import { BookPreview } from '../cmps/book-preview.jsx'


export function BookList({ books, onSelectBook }) {

    return <section className="book-list">
        {books.map((book) => {
            return <BookPreview key={book.id} book={book} />
        })}
    </section>
}