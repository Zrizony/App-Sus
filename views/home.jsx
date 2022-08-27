const { NavLink } = ReactRouterDOM

export function Home() {
  return (
    <section className="home">
      <img src="./assets/img/logo.PNG"></img>
      <h2>Managing documents just became easier</h2>
      <h3>Take notes, read emails and discover new books</h3>

      <section className="home-apps">

        <NavLink to="/note">
          <article className="home-notes">
            <img src="./assets/img/notes.png" alt="notes" />
            <h2>Notes</h2>
          </article>
        </NavLink>

        <NavLink to="/mail/inbox">
          <article className="home-email">
            <img src="./assets/img/email.png" alt="email" />
            <h2>Email</h2>
          </article>
        </NavLink>

        <NavLink to="/books">
          <article className="home-books">
            <img src="./assets/img/book.png" alt="book" />
            <h2>Books</h2>
          </article>
        </NavLink>

      </section>
    </section>
  )
}
