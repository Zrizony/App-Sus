import { BooksResultPreview } from './book-result-preview.jsx'

export function BooksResultList({ booksResult, onAddBook }) {
    return <ul className="books-result-list animate__animated animate__slideInDown">
        {booksResult.map(book => {

            return <BooksResultPreview key={book.title} onAddBook={onAddBook} bookResult={book} />
        })}
    </ul>

}