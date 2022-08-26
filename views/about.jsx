export function About() {
  return (
    <section className="about">
      <h1>About Page</h1>
      <h2>Having fun? Discover more about us down below!</h2>

        <section className="about-us">
            <article className="about-me barak">
                <h2>Barak</h2>
                <ul className="clean-list">
                    <li>gitHub</li>
                    <li>linkdIn</li>
                    <li>Instagram</li>
                </ul>
            </article>

            <article className="about-me roy">
                <h2>Roy</h2>
                <ul className="clean-list">
                    <li>gitHub</li>
                    <li>linkdIn</li>
                    <li>Instagram</li>
                </ul>
            </article>
        </section>

        <article className="newsletter">
            <h3>Sign-up to our newsletter!</h3>
            <form className="newsletter-form" onSubmit={console.log('successfully sign up!')}>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email"/>
                <button className="btn btn-newsletter" >LET ME IN</button>
            </form>
        </article>
    </section>
  )
}
