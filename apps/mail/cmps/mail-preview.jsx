import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

export class MailPreview extends React.Component {

    state = {
        mail: null
    }

    componentDidMount() {
        this.setState({ mail: this.props.mail })
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

    isMailRead = () => {
        if (this.state.mail.isRead) {
            return <i className="fa-regular fa-envelope-open"></i>
        } else {
            return <i className="fa-regular fa-envelope"></i>
        }
    }

    onStarMail = () => {
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

    onTrashMail = () => {
        console.log("trashed");
    }


    render() {
        if (!this.state.mail) return <div>Loading...</div>
        const { id, fullName, subject, body, isRead, isStared } = this.state.mail

        return <li className="mail-item">
            <span onClick={this.onStarMail} className="">
                {this.checkIfStared()}
            </span>
            <span className="full-name">
                {fullName}
            </span>
            <span className="subject">
                {subject}
            </span>
            <span> - </span>
            <span className="body">
                {body}
            </span>
            <span onClick={this.onTrashMail} className="delete">
                <i className="fa-regular fa-trash-can"></i>
            </span>
            <span className="envelop">
                {this.isMailRead()}
            </span>
            <span className="date">
                {this.renderDate()}
            </span>
        </li>
    }
}