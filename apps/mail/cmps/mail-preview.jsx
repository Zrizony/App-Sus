export function MailPreview({ mail }) {
    const { id, fullName, subject, body, sentAt, isRead } = mail


    return <li className="mail-item">
        <i className="star fa-regular fa-star"></i>
        <span>
            {mail.fullName}

        </span>
        <span>
            {mail.subject}
        </span>
    </li>
}