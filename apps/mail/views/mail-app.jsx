import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'

export class MailApp extends React.Component {

    state = {
        inbox: null,
        filterBy: null
    }

    componentDidMount() {
        console.log("Component Did Mount");
        this.loadInbox()

    }

    loadInbox = () => {
        mailService.query()
            .then((res) => {
                this.setState({ inbox: res }, () => {
                    console.log(this.state);
                })
            })
    }

    onTrashMail = (ev, mailId) => {
        ev.stopPropagation()

        mailService.trashMail(mailId)
            .then((res) => {
                if (res === "trashed") {
                    console.log("trashed");
                    this.loadInbox()
                } else {
                    console.log("deleted")
                    this.loadInbox()

                }

            })
    }

    render() {
        const { inbox } = this.state
        if (!inbox) { return <div>Loading...</div> }
        return <section className="mail-app">
            <MailFilter />

            <h1>hello from EmailApp</h1>
            <MailList inbox={inbox} onTrashMail={this.onTrashMail} />

        </section>
    }
}