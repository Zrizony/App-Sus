const { Link, NavLink, withRouter } = ReactRouterDOM


export function MailSideBar({ onCompose }) {


    return <div className="mail-sidebar">
        <div className="compose">
            <button onClick={onCompose}>Compose</button>
        </div>

        <NavLink to='/mail/inbox'>
            <div className="sidebar-inbox">
                <i className="fa-solid fa-inbox"></i>
                <span>Inbox</span>
                <span>5</span>
            </div>
        </NavLink>
        <NavLink to='/mail/starred'>
            <div className="sidebar-Starred">
                <i className="star fa-regular fa-star"></i>
                <span>Starred</span>
            </div>
        </NavLink>
        <NavLink to='/mail/sent'>
            <div className="sidebar-Sent">
                <i className="fa-solid fa-paper-plane"></i>
                <span>Sent</span>
            </div>
        </NavLink>
        <NavLink to='/mail/trash'>
            <div className="sidebar-Trash">
                <i className="fa-solid fa-trash-can"></i>
                <span>Trash</span>
            </div>
        </NavLink>
    </div>

}