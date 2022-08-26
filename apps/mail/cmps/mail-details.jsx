const { Link, NavLink, withRouter } = ReactRouterDOM


function _MailDetails({ mail, onReturn, onTrashMail, history }) {

    function onTrashInsideMail(ev, mailId) {
        history.push('/mail/inbox')
        onTrashMail(ev, mailId)
    }

    function getDate() {
        let date = new Date(mail.sentAt)
        date = date.toDateString()


        return date
    }


    return <section className="mail-details">
        <div className="buttons">
            <button onClick={onReturn}><i className="fa-solid fa-arrow-left"></i></button>
            <button onClick={(ev) => { onTrashInsideMail(ev, mail.id) }}><i className="fa-regular fa-trash-can"></i></button>
        </div>
        {/* <hr /> */}
        <h2>{mail.subject}</h2>
        <div className="flex space-between contact-details">
            <div className="contact">
                <span className="fullname">{mail.fullName}</span>
                <span>{' <'}{mail.from}{'> '}</span>
            </div>
            <span>{getDate()}</span>
        </div>
        <h6 className="to">to {' <'}{mail.to}{'> '}</h6>
        <p>{mail.body}</p>
    </section>
}

export const MailDetails = withRouter(_MailDetails)
