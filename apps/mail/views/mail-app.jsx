import { mailService } from '../services/mail.service.js';
import { MailList } from '../cmps/mail-list.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailSideBar } from '../cmps/mail-sidebar.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailDetails } from '../cmps/mail-details.jsx'
import { MailPages } from '../cmps/mail-pages.jsx'


export class MailApp extends React.Component {
    // state
    state = {
        inbox: null,
        inboxToDisplay: null,
        filterBy: null,
        isComposing: null,
        mailShown: null,
        currPage: 0,
        unReadMails: null
    }
    // unchangble
    PAGE_SIZE = 10

    componentDidMount() {
        console.log(this.props.match);
        console.log("Component Did Mount");
        this.loadInbox()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Component Did Update!");
        if (prevProps.match.params.folder !== this.props.match.params.folder) {

            this.loadInbox()
            return
        }

        // console.log(prevState.inboxToDisplay);
        // console.log(this.state.inboxToDisplay);
        // if (prevState.inboxToDisplay !== this.state.inboxToDisplay) {
        //     console.log("this");
        //     this.setCurrPages()
        //     return
        // }
    }

    // load content
    loadInbox = () => {
        const { filterBy } = this.state
        mailService.query(filterBy)
            //  // get mail inbox from service
            .then((res) => {
                return this.sortMailsForDisplay(res)
            })
            .then((res) => {
                if (res === []) return res
                return res
            })
            .then((res) => {
                this.setState({ inbox: res, }, () => {
                    console.log("curr inbox:", this.state.inbox);
                    this.setCurrPages()

                    console.log(this.state);
                })
            })
    }

    sortMailsForDisplay = (mails) => {
        const { folder } = this.props.match.params
        console.log(folder);

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
        } else if (folder === this.state.mailShown.id) {
            return []
        }
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadInbox()
        })
    }

    setCurrPages = () => {

        const startIdx = this.state.currPage * this.PAGE_SIZE
        let res = this.state.inbox
        res = res.slice(startIdx, startIdx + this.PAGE_SIZE)
        this.setState({ inboxToDisplay: res })
    }

    onNextPage = () => {
        console.log(this.state.currPage);
        this.setState({ currPage: this.state.currPage += 1 }, () => {
            console.log(this.state.currPage);
            this.setCurrPages()
        })
    }

    onPreviewsPage = () => {
        this.setState({ currPage: this.state.currPage -= 1 }, () => {
            console.log(this.state.currPage);
            this.setCurrPages()
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

    onCloseCompose = () => {
        console.log("tring to close compose");
        this.setState({ isComposing: !this.state.isComposing })
    }

    setUnreadLength = () => {

        return
        mailService.unreadMails()
            .then((res) => {
                console.log("res", res);
                this.setState({ unReadLength: res }, () => {
                    console.log("res", res);
                })

            })


    }

    onOpenMail = (mail) => {
        mailService.setReadOpenedMail(mail.id)
            .then(() => {
                this.setState({ mailShown: mail }, () => {
                    // this.loadInbox()
                    this.props.history.push('/mail/' + mail.id)

                })
            })

    }

    onReturn = () => {

        this.props.history.push('/mail/inbox')
    }



    render() {
        const { inbox, inboxToDisplay } = this.state

        if (!inboxToDisplay) { return <div>Loading...</div> }
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
                    <MailPages
                        currPageIdx={this.state.currPage}
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