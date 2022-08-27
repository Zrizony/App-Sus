const { Link, NavLink, withRouter } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'


export function MailSideBar({ onCompose }) {

    function onUnread() {
        let length
        mailService.unreadMails()
            .then((res) => {
                length = res
            })
        return length
    }

    return <div className="mail-sidebar">
        <button className="compose" onClick={onCompose}><i className="fa-solid fa-pen"></i><span className="compose-text">Compose</span></button>

        <NavLink to='/mail/inbox'>
            <div className="sidebar-item sidebar-inbox">
                <i className="sidebar-icon fa-solid fa-inbox"></i>
                <span className="sidebar-text">Inbox</span>
                <span>{onUnread()}</span>
            </div>
        </NavLink>
        <NavLink to='/mail/starred'>
            <div className="sidebar-item sidebar-Starred">
                <i className="sidebar-icon star fa-regular fa-star"></i>
                <span className="sidebar-text">Starred</span>
            </div>
        </NavLink>
        <NavLink to='/mail/sent'>
            <div className="sidebar-item sidebar-Sent">
                <i className="sidebar-icon fa-solid fa-paper-plane"></i>
                <span className="sidebar-text">Sent</span>
            </div>
        </NavLink>
        <NavLink to='/mail/trash'>
            <div className="sidebar-item sidebar-Trash">
                <i className="sidebar-icon fa-solid fa-trash-can"></i>
                <span className="sidebar-text">Trash</span>
            </div>
        </NavLink>
    </div>

}