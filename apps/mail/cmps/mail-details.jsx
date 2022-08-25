const { Link, NavLink, withRouter } = ReactRouterDOM


function _MailDetails({ mail, onReturn, onTrashMail, history }) {

    function onTrashInsideMail(ev, mailId) {
        history.push('/mail/inbox')
        onTrashMail(ev, mailId)
    }


    return <section className="mail-details">
        <button onClick={onReturn}>←</button>
        <button onClick={(ev) => { onTrashInsideMail(ev, mail.id) }}>trash</button>
        <hr />
        <h2>{mail.subject}</h2>
        <h5>{mail.fullName}<span>{mail.from}</span><span>{mail.sentAt}</span></h5>
        <h6>to {mail.to}</h6>
        <p>{mail.body}</p>
    </section>
}

export const MailDetails = withRouter(_MailDetails)
