import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailSideBar } from '../cmps/mail-sidebar.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailDetails } from '../cmps/mail-details.jsx'
import { MailPages } from '../cmps/mail-pages.jsx'


export class MailApp extends React.Component {

    state = {
        inbox: null,
        filterBy: null,
        isComposing: null,
        mailShown: null,
        currPage: 0
    }

    componentDidMount() {
        console.log(this.props.match);
        console.log("Component Did Mount");
        this.loadInbox()
    }

    componentDidUpdate(prevProps) {
        console.log("Component Did Update!");
        if (prevProps.match.params.folder !== this.props.match.params.folder) {
            console.log(prevProps.match.params.folder);
            console.log(this.props.match.params.folder);
            this.loadInbox()

        }
    }

    PAGE_SIZE = 5

    loadInbox = () => {
        // return null
        const { filterBy } = this.state
        mailService.query(filterBy)
            .then((res) => {
                return this.sortMailsForDisplay(res)
            })
            .then((res) => {
                if (res === []) return res
                const startIdx = this.state.currPage * this.PAGE_SIZE
                res = res.slice(startIdx, startIdx + this.PAGE_SIZE)
                console.log(res);
                return res
            })
            .then((res) => {
                this.setState({ inbox: res }, () => {
                    console.log(this.state);
                })
            })
    }

    sortMailsForDisplay = (mails) => {
        const { folder } = this.props.match.params
        console.log(folder);

        if (folder.toLowerCase() === "inbox") {
            this.setState({ mailShown: null })
            return mails.filter((mail) => {
                return (!mail.isTrashed && !mail.isSent)
            })
        } else if (folder.toLowerCase() === "starred") {
            this.setState({ mailShown: null })
            return mails.filter((mail) => {
                return (mail.isStared && !mail.isTrashed)
            })
        } else if (folder.toLowerCase() === "sent") {
            this.setState({ mailShown: null })
            return mails.filter((mail) => {
                return (mail.isSent && !mail.isTrashed)
            })
        } else if (folder.toLowerCase() === "trash") {
            this.setState({ mailShown: null })
            return mails.filter((mail) => {
                return (mail.isTrashed)
            })
        } else if (folder === this.state.mailShown.id) {

            return []

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

    onCompose = () => {
        console.log("trying to compose");
        this.setState({ isComposing: true })
    }

    onSubmitCompose = (ev, newMail) => {
        ev.preventDefault()
        const { to, subject, bodyText } = newMail
        mailService.addSentMail(to, subject, bodyText)
            .then(() => {
                this.loadInbox()
                this.setState({ isComposing: false })
            })
        console.log("submited");
        console.log(newMail);
    }

    // onUnreadMails = () => {
    //     const length = mailService.unreadMails()
    //     console.log(length);
    //     return length
    // }

    onReturn = () => {
        this.props.history.push('/mail/inbox')
    }

    onCloseCompose = () => {
        console.log("tring to close compose");
        this.setState({ isComposing: !this.state.isComposing })
    }

    onOpenMail = (mail) => {
        this.setState({ mailShown: mail }, () => {
            this.props.history.push('/mail/' + mail.id)

        })
        console.log("mail shown: ", mail);

    }

    render() {
        const { inbox } = this.state

        if (!inbox) { return <div>Loading...</div> }
        return <section className="full mail-app">

            <MailFilter onSetFilter={this.onSetFilter} />
            <MailSideBar
                onCompose={this.onCompose}
            />
            {(this.state.isComposing) ? <MailCompose
                onSubmitCompose={this.onSubmitCompose}
                onCloseCompose={this.onCloseCompose} /> : ''}

            {(this.state.mailShown) ?

                <MailDetails
                    mail={this.state.mailShown}
                    onReturn={this.onReturn}
                    onTrashMail={this.onTrashMail}
                />
                :
                <React.Fragment>
                    <MailPages />

                    <MailList
                        inbox={inbox}
                        onTrashMail={this.onTrashMail}
                        onOpenMail={this.onOpenMail}
                    />

                </React.Fragment>
            }


        </section>
    }
}