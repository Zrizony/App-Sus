import { storageService } from './../../../services/storage.service.js'
import { utilService } from './../../../services/util.service.js'

export const mailService = {
    getMails,
    starMail,
    trashMail
}

const STORAGE_KEY = 'mailDB'

// let gMails;

function getMails() {
    let gMails = storageService.loadFromStorage(STORAGE_KEY) || null
    if (!gMails) {
        console.log("!mails");
        gMails = _createMails()
    }
    storageService.saveToStorage(STORAGE_KEY, gMails)
    return Promise.resolve(gMails)
}

function starMail(mailId) {
    let gMails = storageService.loadFromStorage(STORAGE_KEY)
    const mailIdx = gMails.findIndex((mail) => {
        return mailId === mail.id
    })
    gMails[mailIdx].isStared = !gMails[mailIdx].isStared
    storageService.saveToStorage(STORAGE_KEY, gMails)
    console.log("stars changed", gMails[mailIdx].isStared);
    return Promise.resolve()
}

function trashMail(mailId) {
    const mailIdx = gMails.findIndex((mail) => { mail.id === mailId })
    gMails[mailIdx].isTrashed = true
    storageService.saveToStorage(STORAGE_KEY, gMails)
    return Promise.resolve(mailId, "trashed")
}

function deleteMail(mailId) {
    const mailIdx = gMails.findIndex((mail) => { mail.id === mailId })
    gMails.splice(mailIdx, 1)
    storageService.saveToStorage(STORAGE_KEY, gMails)
    return Promise.resolve(mailId, "deleted")
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
        fullName: "barak",
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
    }]
}