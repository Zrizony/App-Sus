const { Link } = ReactRouterDOM

export function BookPreview({ book, onSelectBook }) {

    function currencyIcon(currency) {
        if (currency === "EUR") return "€"
        else if (currency === "USD") return "$"
        else return "₪"
    }

    return <article className="book-preview">
        <h4>{book.title}</h4>
        <Link to={"/books/" + book.id}>
            <img src={`${book.thumbnail}`}></img>
        </Link>
        <p>{book.listPrice.amount}{currencyIcon(book.listPrice.currencyCode)}</p>
    </article>
}