import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailSideBar } from '../cmps/mail-sidebar.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

export class MailApp extends React.Component {

    state = {
        inbox: null,
        filterBy: null,
        isComposing: false
    }

    componentDidMount() {
        console.log(this.props.match);
        console.log("Component Did Mount");
        this.loadInbox()
    }

    componentDidUpdate(prevProps) {
        console.log("Component Did Update!");
        if (prevProps.match.params.folder !== this.props.match.params.folder) {
            this.loadInbox()

        }
    }

    loadInbox = () => {
        const { filterBy } = this.state
        mailService.query(filterBy)
            .then((res) => {
                return this.sortMailsForDisplay(res)
            })
            .then((res) => {
                this.setState({ inbox: res }, () => {
                    console.log(this.state);
                })
            })
    }

    sortMailsForDisplay = (mails) => {
        const { folder } = this.props.match.params

        if (folder.toLowerCase() === "inbox") {
            return mails.filter((mail) => {
                return (!mail.isTrashed && !mail.isSent)
            })
        } else if (folder.toLowerCase() === "starred") {
            return mails.filter((mail) => {
                return (mail.isStared && !mail.isTrashed)
            })
        } else if (folder.toLowerCase() === "sent") {
            return mails.filter((mail) => {
                return (mail.isSent && !mail.isTrashed)
            })
        } else if (folder.toLowerCase() === "trash") {
            return mails.filter((mail) => {
                return (mail.isTrashed)
            })
        }
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

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadInbox()
        })
    }

    // onUnreadMails = () => {
    //     const length = mailService.unreadMails()
    //     console.log(length);
    //     return length
    // }


    render() {
        const { inbox } = this.state

        if (!inbox) { return <div>Loading...</div> }
        return <section className="mail-app">

            <MailFilter onSetFilter={this.onSetFilter} />
            <MailSideBar />

            <MailCompose />
            <h1>hello from EmailApp</h1>
            <MailList inbox={inbox} onTrashMail={this.onTrashMail} />
            <div className='flex mail-main-container'>

            </div>

        </section>
    }
}