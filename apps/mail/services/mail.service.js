import { storageService } from './../../../services/storage.service.js'
import { utilService } from './../../../services/util.service.js'

export const mailService = {
    query,
    starMail,
    trashMail,
    envelopClick,
    unreadMails,
    addSentMail,
    getUnReadLength,
    setReadOpenedMail
}

const STORAGE_KEY = 'mailDB'


function query(filterBy) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)
    if (!gMails) {
        console.log("!mails");
        gMails = _createMails()
    }
    gMails.sort((a, b) => b.sentAt - a.sentAt)
    storageService.saveToStorage(STORAGE_KEY, gMails)

    if (filterBy) {
        const { searchInput } = filterBy


        gMails = gMails.filter((mail) => {
            return (
                mail.subject.toLowerCase().includes(searchInput.toLowerCase()) ||
                mail.body.toLowerCase().includes(searchInput.toLowerCase()) ||
                mail.from.toLowerCase().includes(searchInput.toLowerCase()) ||
                mail.fullName.toLowerCase().includes(searchInput.toLowerCase())
            )

        })


    }


    return Promise.resolve(gMails)
}

function starMail(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mailId === mail.id })
    gMails[mailIdx].isStared = !gMails[mailIdx].isStared
    storageService.saveToStorage(STORAGE_KEY, gMails)
    console.log("stared changed", gMails[mailIdx].isStared);
    return Promise.resolve()
}

function envelopClick(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mailId === mail.id })
    gMails[mailIdx].isRead = !gMails[mailIdx].isRead
    storageService.saveToStorage(STORAGE_KEY, gMails)

    return Promise.resolve()
}

function getUnReadLength() {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    return Promise.resolve(gMails.length)
}

function setReadOpenedMail(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mailId === mail.id })
    gMails[mailIdx].isRead = true
    storageService.saveToStorage(STORAGE_KEY, gMails)

    return Promise.resolve()
}

function trashMail(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mail.id === mailId })
    if (gMails[mailIdx].isTrashed === true) {
        console.log(gMails[mailIdx].id, "deleted from servie");
        gMails.splice(mailIdx, 1)
        if (gMails.length === 0) { gMails = null }
        storageService.saveToStorage(STORAGE_KEY, gMails)
        return Promise.resolve("deleted")
    } else {
        console.log(gMails[mailIdx].id, "trashed from servie");
        gMails[mailIdx].isTrashed = true
        storageService.saveToStorage(STORAGE_KEY, gMails)
        return Promise.resolve("trashed")
    }
}

function unreadMails() {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)
    gMails = gMails.filter((mail) => {
        return !mail.isRead
    })
    console.log("length: ", gMails.length);
    return Promise.resolve(gMails.length)
}

function addSentMail(to, subject, bodyText) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)
    const newSent = {
        id: utilService.makeId(),
        from: "me@appsus.com",
        to: to,
        fullName: 'Barak',
        subject: subject,
        body: bodyText,
        isRead: false,
        isStared: false,
        isSent: true,
        labels: [],
        sentAt: Date.now(),
        isTrashed: false
    }
    gMails.push(newSent)
    storageService.saveToStorage(STORAGE_KEY, gMails)

    return Promise.resolve()
}

function _createMails() {
    return [{
        id: utilService.makeId(),
        from: "Poppy@ohnoits336.com",
        to: "me@appsus.com",
        fullName: "Poppy",
        subject: "I'm Poppy",
        body: "Hi it's me Poppy, the time is already 3:36!",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1651339901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "RoyYam@gmail.com",
        to: "me@appsus.com",
        fullName: "Roy Yam",
        subject: "Look at the meme",
        body: "HAHA look at this funny meme",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1461329901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "RoyYam@gmail.com",
        to: "me@appsus.com",
        fullName: "Roy Yam",
        subject: "Look at the meme",
        body: "HAHA look at this funny meme",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1561329901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "microsoft@apple.com",
        to: "me@appsus.com",
        fullName: "Microsoft Inc",
        subject: "Declined",
        body: "sorry but you failed big in your interview!",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1261319901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "me@appsus.com",
        to: "jesus@jesus.com",
        fullName: "Barak",
        subject: "you know what to do!",
        body: "pls send help!",
        isRead: false,
        isStared: false,
        isSent: true,
        labels: [],
        sentAt: 1661309901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "Spam@Spam.com",
        to: "me@appsus.com",
        fullName: "Spam",
        subject: "Spam",
        body: "SpamSpamSpamSpamSpamSpamSpamSpam",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: ["Spam"],
        sentAt: 1661299901939,
        isTrashed: true
    },
    {
        id: utilService.makeId(),
        from: "LinkedIn@appsus.com",
        to: "me@appsus.com",
        fullName: "LinkedIn Job Alerts",
        subject: "1 new job for 'web developer",
        body: "you had one job.",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: ["Spam"],
        sentAt: 1661299901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "dropbox@appsus.com",
        to: "me@appsus.com",
        fullName: "Dropbox",
        subject: "So many people changed stuff",
        body: "around 849k items has been changed in your very own folder!",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: ["Spam"],
        sentAt: 1661299901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "google@appsus.com",
        to: "me@appsus.com",
        fullName: "Google",
        subject: "Some google stuff",
        body: "you have security alert ",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: ["Spam"],
        sentAt: 1661299901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "udemy@appsus.com",
        to: "me@appsus.com",
        fullName: "Udemy",
        subject: "Check out this amazing Sale!",
        body: "click here to see many many sales in udem website",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: ["Spam"],
        sentAt: 1661299901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "reddit@appsus.com",
        to: "me@appsus.com",
        fullName: "Reddit",
        subject: "Webb Telescope Shatters Distance Records, Challenges Big Bang Theory",
        body: "Space is Amazing!!",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: ["Spam"],
        sentAt: 1661299901939,
        isTrashed: false
    },
    ]
}