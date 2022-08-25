export class MailCompose extends React.Component {

    state = {
        newMail:
        {
            to: '',
            subject: '',
            bodyText: '',
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState(({ newMail }) => ({
            newMail: {
                ...newMail,
                [field]: value
            }
        }), () => {

        })

    }

    render() {
        const { to, subject, bodyText } = this.state

        return <section className="mail-compose">
            <div className="compose title">New Message<button>X</button></div>
            <form>
                <label className="to">To</label>
                <input
                    className="toInput"
                    type="text"
                    name="to"
                    value={to}
                    onChange={this.handleChange}
                />
                <input
                    className="subject"
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <textarea
                    className="bodyText"
                    type="textarea"
                    name="bodyText"
                    value={subject}
                    onChange={this.handleChange}
                />
                <button>Send</button>







            </form>
        </section>
    }

}