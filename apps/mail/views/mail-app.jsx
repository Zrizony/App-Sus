import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailSideBar } from '../cmps/mail-sidebar.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailDetails } from '../cmps/mail-details.jsx'
import { MailPages } from '../cmps/mail-pages.jsx'
import { eventBusService } from '../../../services/event-bus.service.js';


export class MailApp extends React.Component {
    // state
    state = {
        inbox: null,
        inboxToDisplay: null,
        filterBy: null,
        isComposing: null,
        mailShown: null,
        currPage: 0,
        isModalShown: false
    }
    // unchangble
    PAGE_SIZE = 20

    componentDidMount() {
        console.log("Component Did Mount");

        this.loadInbox()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Component Did Update!");
        if (prevProps.match.params.folder !== this.props.match.params.folder) {
            this.loadInbox()
            return
        }
    }

    // load content
    loadInbox = () => {
        const { filterBy } = this.state
        // get mail inbox from service
        mailService.query(filterBy)
            .then((res) => {
                // sorting inbox by query params
                return this.sortMailsForDisplay(res)
            })
            .then((res) => {
                // setting inbox in the state
                this.setState({ inbox: res, }, () => {
                    this.setCurrPages()
                })
            })
    }

    // this function filters the inbox by the query params 
    sortMailsForDisplay = (mails) => {
        const { folder } = this.props.match.params

        if (folder.toLowerCase() === "inbox") {
            this.setState({ mailShown: null, currPage: 0 })
            return mails.filter((mail) => {
                return (!mail.isTrashed && !mail.isSent)
            })
        } else if (folder.toLowerCase() === "starred") {
            this.setState({ mailShown: null, currPage: 0 })
            return mails.filter((mail) => {
                return (mail.isStared && !mail.isTrashed)
            })
        } else if (folder.toLowerCase() === "sent") {
            this.setState({ mailShown: null, currPage: 0 })
            return mails.filter((mail) => {
                return (mail.isSent && !mail.isTrashed)
            })
        } else if (folder.toLowerCase() === "trash") {
            this.setState({ mailShown: null, currPage: 0 })
            return mails.filter((mail) => {
                return (mail.isTrashed)
            })
        } else if (this.state.mailShown === null) {
            this.props.history.push('/mail/inbox')
            this.setState({ mailShown: null, currPage: 0 })
            return mails.filter((mail) => {
                return (!mail.isTrashed && !mail.isSent)
            })
        } else if (folder === this.state.mailShown.id) {
            return []
        }
    }

    // this function sets the search filter and renders the mail inbox
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadInbox()
        })
    }

    // set current inbox page
    setCurrPages = () => {
        const startIdx = this.state.currPage * this.PAGE_SIZE
        let res = this.state.inbox
        res = res.slice(startIdx, startIdx + this.PAGE_SIZE)
        this.setState({ inboxToDisplay: res })
    }

    // render next inbox page
    onNextPage = () => {
        this.setState({ currPage: this.state.currPage += 1 }, () => {
            this.setCurrPages()
        })
    }

    // render previous inbox page
    onPreviewsPage = () => {
        this.setState({ currPage: this.state.currPage -= 1 }, () => {
            this.setCurrPages()
        })
    }

    // trash mail
    onTrashMail = (ev, mailId) => {
        ev.stopPropagation()

        mailService.trashMail(mailId)
            .then(() => {
                this.loadInbox()
            })
    }

    // this function calls the compose window
    onCompose = () => {
        this.setState({ isComposing: true })
    }

    // this function submit new compose
    onSubmitCompose = (ev, newMail) => {
        ev.preventDefault()
        const { to, subject, bodyText } = newMail
        mailService.addSentMail(to, subject, bodyText)
            .then(() => {
                this.loadInbox()
                this.setState({ isComposing: false })
            })
    }

    // this function closes the copose window
    onCloseCompose = () => {
        this.setState({ isComposing: !this.state.isComposing })
    }

    // this function renders the clicked mail
    onOpenMail = (mail) => {
        mailService.setReadOpenedMail(mail.id)
            .then(() => {
                this.setState({ mailShown: mail }, () => {
                    this.props.history.push('/mail/' + mail.id)
                })
            })
    }

    // return the last page
    onReturn = () => {
        this.props.history.goBack()
    }

    render() {
        const { inbox, inboxToDisplay, isComposing, mailShown, currPage } = this.state

        if (!inboxToDisplay) return <div>Loading...</div>

        return <section className="full mail-app">

            <MailFilter
                onSetFilter={this.onSetFilter} />
            <MailSideBar
                onCompose={this.onCompose}
            />
            {(isComposing) ? <MailCompose
                onSubmitCompose={this.onSubmitCompose}
                onCloseCompose={this.onCloseCompose} /> : ''}

            {(mailShown) ?

                <MailDetails
                    mail={mailShown}
                    onReturn={this.onReturn}
                    onTrashMail={this.onTrashMail}
                />
                :
                <React.Fragment>
                    <MailPages
                        currPageIdx={currPage}
                        onNextPage={this.onNextPage}
                        onPreviewsPage={this.onPreviewsPage}
                        pageSize={this.PAGE_SIZE}
                        inboxLength={inbox.length}
                    />

                    <MailList
                        inbox={inboxToDisplay}
                        onTrashMail={this.onTrashMail}
                        onOpenMail={this.onOpenMail}
                    />
                </React.Fragment>
            }
        </section>
    }
}