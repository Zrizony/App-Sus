export function About() {

    return (
        <section className="full about">
            <h1>Pssst... Hey you... Yeah you!</h1>
            <h2>This amazing and useful site was created with user comfort as high piority in mind</h2>
            <h2>▼ If you wish to explore more about our other projects. Please! be our guest and see them all down below! ▼</h2>

            <section className="about-us">
                <article className="about-me barak">
                    <h2>Barak Kaldess</h2>
                    <p>Musician and Web Developer</p>
                    <ul className="clean-list flex">
                        <li>
                            <a href="https://github.com/ibarak2">
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://bit.ly/3PP8LdP">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://bit.ly/3D72Uta">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://bit.ly/3E4rJHn"
                                target="_blank">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </li>
                    </ul>
                </article>

                <article className="about-me roy">
                    <h2>Roy Yam</h2>
                    <p>Illustrator and Web Developer</p>
                    <ul className="clean-list flex">
                        <li>
                            <a href="https://github.com/Zrizony">
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/roy-yam/">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/royyam99/">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </article>
            </section>

            <article className="newsletter">
                <h3>Join us and get our latest news right here!</h3>
                <form className="newsletter-form" onSubmit={() => console.log('subscribed')}>
                    <div className="form-inputs">
                        <input type="text" placeholder="Full Name" />
                        <div className="input-seperator"> </div>
                        <input type="email" placeholder="Email" />
                        .</div>
                    <button
                        className="btn btn-newsletter"
                    >Subscribe</button>
                </form>
            </article>
        </section>
    )
}