import { storageService } from "../../../services/storage.service.js"

export const googleBooksService = {
    getGoogleBooks
}

const STORAGE_KEY = 'googleBooksDB'
let gGoogleBooks = storageService.loadFromStorage(STORAGE_KEY) || []

function getGoogleBooks(val) {
    if (!val) return Promise.resolve(null)
    if (gGoogleBooks[val]) { return Promise.resolve(gGoogleBooks[val]) }
    const API_URL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${val}`

    return axios.get(API_URL)
        .then(res => res.data.items.map(item => item.volumeInfo))
        .then((books) => {
            gGoogleBooks[val] = books
            storageService.saveToStorage(STORAGE_KEY, gGoogleBooks)
            console.log("from API", books);
            return books
        })
}
