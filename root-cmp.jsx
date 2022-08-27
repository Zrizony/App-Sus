import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailApp } from "./apps/mail/views/mail-app.jsx"
import { NoteApp } from "./apps/note/views/note-app.jsx"
import { BookApp } from "./apps/books/views/book-app.jsx"
import { BookDetails } from './apps/books/views/book-details.jsx'
import { ReviewAdd } from './apps/books/views/review-add.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Switch>
                <Route path="/books/review-add/:bookId" component={ReviewAdd} />
                <Route path="/books/:bookId" component={BookDetails} />
                <Route path="/mail/:folder" component={MailApp} />
                <Route path="/books" component={BookApp} />
                <Route path="/note" component={NoteApp} />
                <Route path="/about" component={About} />
                <Route exact path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
