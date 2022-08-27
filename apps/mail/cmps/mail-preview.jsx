import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
const { Link, NavLink, withRouter } = ReactRouterDOM



export class MailPreview extends React.Component {

    state = {
        mail: null
    }

    componentDidMount() {
        this.setState({ mail: this.props.mail })
    }

    componentDidUpdate() {
        // console.log("Mail preview did update");
    }

    renderDate = () => {
        const { sentAt } = this.props.mail
        const currTime = Date.now()

        if (currTime - sentAt > 86400000) {
            // more then a day
            const date = utilService.getFullDate(sentAt)
            return date
        } else {
            // less then a day
            const time = utilService.getTime(sentAt)
            return time
        }
    }

    onEnvelopClick = (ev) => {
        ev.stopPropagation()

        mailService.envelopClick(this.state.mail.id)
            .then(() => {
                this.setState(({ mail }) => ({
                    mail: { ...mail, isRead: !this.state.mail.isRead }
                }))
            })
    }

    isEnvelopOpen = () => {
        if (this.state.mail.isRead) {
            return <i className="fa-regular fa-envelope-open"></i>
        } else {
            return <i className="fa-regular fa-envelope"></i>
        }
    }

    checkIfRead = () => {
        if (this.state.mail.isRead) {
            return true
        } else {
            return false
        }
    }

    onStarMail = (ev) => {
        ev.stopPropagation()

        console.log("star Clicked");
        mailService.starMail(this.state.mail.id)
            .then(() => {
                this.setState(({ mail }) => ({
                    mail: { ...mail, isStared: !this.state.mail.isStared }
                }), () => {
                    console.log(this.state.mail);
                })
            })
    }

    checkIfStared = () => {
        if (this.state.mail.isStared) {
            return <i className="stared fa-solid fa-star"></i>
        } else {
            return <i className="star fa-regular fa-star"></i>
        }
    }



    render() {
        if (!this.state.mail) return <div>Loading...</div>
        const { id, fullName, subject, body, isRead, isStared } = this.state.mail

        return <li onClick={() => { this.props.onOpenMail(this.state.mail) }} className={`mail-item ${(isRead ? "read" : '')}`}>
            <span onClick={this.onStarMail} className="gen-star">
                {this.checkIfStared()}
            </span>
            <span className="full-name">
                {fullName}
            </span>
            <span className="subject">
                {subject}
            </span>
            <span className="seperator"> - </span>
            <span className="body">
                {body}
            </span>
            <div className="details">
                <span onClick={(ev) => { this.props.onTrashMail(ev, id) }} className="delete">
                    <i className="fa-regular fa-trash-can"></i>
                </span>
                <span onClick={(ev) => { this.onEnvelopClick(ev, id) }} className="envelop">
                    {this.isEnvelopOpen()}
                </span>
                <span className="date">
                    {this.renderDate()}
                </span>
            </div>
        </li>
    }
}