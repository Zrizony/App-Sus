const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="full">
        <div className="app-header">
            <Link to="/">
                <img src="./assets/img/logo.PNG" alt="logo" />
            </Link>
            <nav>
                <section className="dropdown">
                    <button className="btn-dropdown">
                        <i className="fa-brands fa-ethereum"></i>
                    </button>
                    <div className="dropdown-content">
                        <NavLink exact to="/">Home</NavLink>
                        <NavLink to="/mail/inbox">Mail</NavLink>
                        <NavLink to="/note">Notes</NavLink>
                        <NavLink to="/books">Books</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </section>
            </nav>
        </div>
    </header>
}


