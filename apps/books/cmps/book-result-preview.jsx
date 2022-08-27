
export function BooksResultPreview({ bookResult, onAddBook }) {

    return <li key={bookResult.id}>
        <button onClick={() => { onAddBook(bookResult) }}><i className="fa-solid fa-plus"></i>
        </button>

        {bookResult.title}
    </li>
}