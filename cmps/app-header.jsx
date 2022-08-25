const { Link, NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {

    return <header className="full">
        <div className="app-header">
            <Link to="/">
                <h3>AppSus</h3>
            </Link>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail/inbox">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </div>
    </header>
}


