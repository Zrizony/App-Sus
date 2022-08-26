export function Home() {
  return (
    <section className="home">
      <h1>Welcome to home page!</h1>
      <section className="home-apps">
        <article>
          <img src="../assets/img/notes.png" alt="notes" />
          <h2>notes</h2>
        </article>
        <article>
          <img src="../assets/img/email.png" alt="email" />
          <h2>email</h2>
        </article>
        <article>
          <img src="../assets/img/book.png" alt="book" />
          <h2>books</h2>
        </article>
      </section>
    </section>
  )
}
