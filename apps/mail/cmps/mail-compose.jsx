export class MailCompose extends React.Component {

    state = {
        newMail:
        {
            to: '',
            subject: '',
            bodyText: '',
        }
    }

    myRef = React.createRef()

    componentDidMount() {
        this.myRef.current.focus()
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(({ newMail }) => ({
            newMail: {
                ...newMail,
                [field]: value
            }
        }))

    }



    render() {
        const { to, subject, bodyText } = this.state

        return <section className="mail-compose">
            <div className="compose-title"><span>New Message</span><button
                onClick={this.props.onCloseCompose}><i className="fa-solid fa-xmark"></i></button></div>
            <form onSubmit={(ev) => { this.props.onSubmitCompose(ev, this.state.newMail) }}>
                <label className="to">To</label>
                <input
                    ref={this.myRef}
                    className="toInput"
                    placeholder="Recipient"
                    type="email"
                    name="to"
                    value={to}
                    onChange={this.handleChange}
                    required
                />
                <input
                    className="subject"
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                    required
                />
                <textarea
                    className="bodyText"
                    type="textarea"
                    name="bodyText"
                    value={bodyText}
                    onChange={this.handleChange}
                    required
                />
                <button className="send-button">Send</button>







            </form>
        </section>
    }

}