import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx'

export class MailApp extends React.Component {

    state = {
        inbox: null
    }

    componentDidMount() {
        console.log("Component Did Mount");
        this.loadInbox()

    }

    loadInbox = () => {
        mailService.getMails()
            .then((res) => {
                this.setState({ inbox: res }, () => {
                    console.log(this.state);
                })
            })
    }

    render() {
        const { inbox } = this.state
        if (!inbox) { return <div>Loading...</div> }
        return <section className="mail-app">
            <h1>hello from EmailApp</h1>
            <MailList inbox={inbox} />

        </section>
    }
}