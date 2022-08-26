const { Link, NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {

    return <header className="full">
        <div className="app-header">
            <Link to="/">
                <img src="../assets/img/logo.PNG" alt="logo" />
            </Link>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/mail/inbox">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </div>
    </header>
}


