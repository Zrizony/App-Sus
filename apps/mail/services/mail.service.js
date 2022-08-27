import { storageService } from './../../../services/storage.service.js'
import { utilService } from './../../../services/util.service.js'

export const mailService = {
    query,
    starMail,
    trashMail,
    envelopClick,
    addSentMail,
    setReadOpenedMail
}

// Variables 
const STORAGE_KEY = 'mailDB'

// Functions //

// this function returns the database infomation 
function query(filterBy) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)
    if (!gMails) {
        gMails = _createMails()
    }
    gMails.sort((a, b) => b.sentAt - a.sentAt)
    storageService.saveToStorage(STORAGE_KEY, gMails)

    // filtering by filter input if it was given
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

// setting 'isStared' true/false 
function starMail(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mailId === mail.id })
    gMails[mailIdx].isStared = !gMails[mailIdx].isStared
    storageService.saveToStorage(STORAGE_KEY, gMails)

    return Promise.resolve()
}

//setting 'isRead' true/false
function envelopClick(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mailId === mail.id })
    gMails[mailIdx].isRead = !gMails[mailIdx].isRead
    storageService.saveToStorage(STORAGE_KEY, gMails)

    return Promise.resolve()
}

// setting 'isRead = true' when reading new mail
function setReadOpenedMail(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mailId === mail.id })
    gMails[mailIdx].isRead = true
    storageService.saveToStorage(STORAGE_KEY, gMails)

    return Promise.resolve()
}

// this function trash and delete mails
function trashMail(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)

    const mailIdx = gMails.findIndex((mail) => { return mail.id === mailId })
    if (gMails[mailIdx].isTrashed === true) {
        gMails.splice(mailIdx, 1)
        if (gMails.length === 0) { gMails = null }
        storageService.saveToStorage(STORAGE_KEY, gMails)
        return Promise.resolve("deleted")
    } else {
        gMails[mailIdx].isTrashed = true
        storageService.saveToStorage(STORAGE_KEY, gMails)
        return Promise.resolve("trashed")
    }
}

// add new user sent mails
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

// create demo database
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
        sentAt: 1455555901939,
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
        subject: "Not a Chance",
        body: "Let's rock this Climbing Session",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1555555901939,
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
        sentAt: 1361319901939,
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
        sentAt: 1661659901939,
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
        sentAt: 1661399901939,
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
        isStared: true,
        isSent: false,
        labels: [],
        sentAt: 1661199901939,
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
        labels: [],
        sentAt: 1661099901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "google@appsus.com",
        to: "me@appsus.com",
        fullName: "Google",
        subject: "התראת אבטחה",
        body: "כניסה חדשה באחד החשבונות המקושרים שלך, בדוק האם זה אתה",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1660501899939,
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
        labels: [],
        sentAt: 1660299901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "reddit@appsus.com",
        to: "me@appsus.com",
        fullName: "Reddit",
        subject: "Webb Telescope Shatters Distance Records, Challenges Big Bang Theory",
        body: "Space is Amazing!!",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1660699901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "LinkedIn@appsus.com",
        to: "me@appsus.com",
        fullName: "LinkedIn",
        subject: "New jobs similar to Junior Full Stack Developer at Playtika",
        body: "Check out jobs like Junior Full Stack Developer at our website",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1660799901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "Slack@appsus.com",
        to: "me@appsus.com",
        fullName: "Slack",
        subject: "Your notifications are now mobile",
        body: "You’ve enabled push notifications on your mobile device for the User workspace, so we’ve disabled email notifications for you. That way you won’t get notified twice. It’s easy to re-enable email notifications, if you’d prefer.",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1660099901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "Ryanair@appsus.com",
        to: "me@appsus.com",
        fullName: "Ryanair",
        subject: "LH4PJK | Pre-order breakfast for your flight to Bari",
        body: "Pre-order your breakfast before you fly!",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1659000901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "Apple@appsus.com",
        to: "me@appsus.com",
        fullName: "Apple",
        subject: "הקבלה שלך מ-אפל",
        body: " קיבלת קבלה חדשה מ-אפל מוסיקה ראה עוד בקישור הזה: קישור.",
        isRead: false,
        isStared: true,
        isSent: false,
        labels: [],
        sentAt: 1660099901800,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "galkaldess@appsus.com",
        to: "me@appsus.com",
        fullName: "Gal Kaldess",
        subject: "Check this out!",
        body: "You should check out this new video I've created yesterday! I'm pretty sure you gonna like it: https://www.youtube.com/watch?v=o-YBDTqX_ZU",
        isRead: true,
        isStared: true,
        isSent: false,
        labels: [],
        sentAt: 1656000901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "me@appsus.com",
        to: "royyam@appsus.com",
        fullName: "Barak",
        subject: "Important App Updates",
        body: "I have finished my js functionallity and also checked your App and its amazing!!!",
        isRead: true,
        isStared: false,
        isSent: true,
        labels: [],
        sentAt: 1631299901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "me@appsus.com",
        to: "jobs@jobs.jobs",
        fullName: "Barak",
        subject: "קורות חיים",
        body: "היי , מצרף קורות חיים מעודכנים , המשך יום מקסים",
        isRead: false,
        isStared: false,
        isSent: true,
        labels: [],
        sentAt: 1621299901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "me@appsus.com",
        to: "me@appsus.com",
        fullName: "Barak",
        subject: "Future me",
        body: "This is a Future message to me when I'm getting better at proggramming and prove it :*)",
        isRead: false,
        isStared: false,
        isSent: true,
        labels: [],
        sentAt: 1635599901939,
        isTrashed: false
    },
    {
        id: utilService.makeId(),
        from: "spamforlife@appsus.com",
        to: "me@appsus.com",
        fullName: "ספאם",
        subject: "ספאם",
        body: "החלטנו לשלוח לך הודעה שאין בה שום תוכן מעבר לספאם, תהנה",
        isRead: true,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1611299901939,
        isTrashed: true
    },
    {
        id: utilService.makeId(),
        from: "harambe@appsus.com",
        to: "me@appsus.com",
        fullName: "Harambe",
        subject: "Harambe RIP",
        body: "This mail is a piece of memory to remember Harambe the monke",
        isRead: false,
        isStared: false,
        isSent: false,
        labels: [],
        sentAt: 1601200901939,
        isTrashed: true
    },


    ]
}