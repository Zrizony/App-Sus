export function Home() {
  return (
    <section className="home">
      <img src="./assets/img/logo.PNG"></img>
      <h2>Managing documentations just became easier</h2>
      <section className="home-apps">
        <article className="home-notes">
          <img src="./assets/img/notes.png" alt="notes" />
          <h2>Notes</h2>
        </article>

        <article className="home-email">
          <img src="./assets/img/email.png" alt="email" />
          <h2>Email</h2>
        </article>

        <article className="home-books">
          <img src="./assets/img/book.png" alt="book" />
          <h2>Books</h2>
        </article>
      </section>
    </section>
  )
}
