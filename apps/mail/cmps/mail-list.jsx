import { MailPreview } from './mail-preview.jsx'

export function MailList({ inbox }) {


    return <ul className="mail-list clean-list">
        {inbox.map((mail) => {
            return <MailPreview key={mail.id} mail={mail} />
        })}


    </ul>
}