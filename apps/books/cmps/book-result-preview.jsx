
export function BooksResultPreview({ bookResult, onAddBook }) {

    return <li key={bookResult.id}>
        <button onClick={onAddBook}><i className="fa-solid fa-plus"></i>
        </button>

        {bookResult.title}
    </li>
}