import { storageService } from "./storage.service.js"

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

const richBooks = [
    {
        "kind": "books#volume",
        "id": "wr3lCEKeuXAC",
        "etag": "0yEQLVPfXw8",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/wr3lCEKeuXAC",
        "volumeInfo": {
            "title": "Think and Grow Rich",
            "authors": [
                "Napoleon Hill"
            ],
            "publisher": "Ballantine Books",
            "publishedDate": "1987",
            "description": "Offers the secrets of super achievers, such as Henry Ford, Andrew Carnegie, and John Rockefeller, and explains how to use their secrets for success.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0449214923"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780449214923"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 260,
            "printType": "BOOK",
            "categories": [
                "Business & Economics"
            ],
            "averageRating": 4.5,
            "ratingsCount": 9,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "2.1.2.0.preview.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=wr3lCEKeuXAC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=wr3lCEKeuXAC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=wr3lCEKeuXAC&q=rich&dq=rich&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=wr3lCEKeuXAC&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Think_and_Grow_Rich.html?hl=&id=wr3lCEKeuXAC"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=wr3lCEKeuXAC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Offers the secrets of super achievers, such as Henry Ford, Andrew Carnegie, and John Rockefeller, and explains how to use their secrets for success."
        }
    },
    {
        "kind": "books#volume",
        "id": "KfBlcGzyvf8C",
        "etag": "Y2olfRU81GE",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/KfBlcGzyvf8C",
        "volumeInfo": {
            "title": "Start Late, Finish Rich",
            "subtitle": "A No-fail Plan for Achieving Financial Freedom at Any Age",
            "authors": [
                "David Bach"
            ],
            "publisher": "Currency",
            "publishedDate": "2007",
            "description": "The best-selling author of The Automatic Millionaire offers financial hope for individuals who have forgotten to save for their retirement, sharing his secrets for achieving financial freedom regardless of one's age or status in life, using the principles of Spend Less, Save More, and Make More. Reprint. 200,000 first printing.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9780767919470"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "0767919475"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 348,
            "printType": "BOOK",
            "categories": [
                "Business & Economics"
            ],
            "averageRating": 4,
            "ratingsCount": 9,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.2.0.0.preview.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=KfBlcGzyvf8C&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=KfBlcGzyvf8C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=KfBlcGzyvf8C&dq=rich&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=KfBlcGzyvf8C&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Start_Late_Finish_Rich.html?hl=&id=KfBlcGzyvf8C"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=KfBlcGzyvf8C&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Why? Because they don&#39;t know how. You can start late and finish rich--but you need a plan. This book contains the plan. It&#39;s inspiring, easy to follow, and is based on proven financial principles."
        }
    },
    {
        "kind": "books#volume",
        "id": "7L2TtgEACAAJ",
        "etag": "jl53k7DIllQ",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/7L2TtgEACAAJ",
        "volumeInfo": {
            "title": "Trade and Grow Rich",
            "subtitle": "Adventurous Journey to Successful Trading",
            "authors": [
                "Indrazith Shantharaj",
                "Kirankumar Nayak"
            ],
            "publishedDate": "2018-04-25",
            "description": "Is it your personal quest to find out what has made some traders so successful? Why do 5% of traders take all the money from 95% of losers? The answer is nothing less than a revelation! The authors of this book have formulated their journey of studying some of the most successful traders in the world into concise principles that, when acted upon, can help one achieve their dream to become a successful trader. For over a decade, the authors have studied the world's successful traders. Based on their learnings, they started practicing it and are now part of the 5%. Trade and Grow Rich teaches not just concepts but also methods with the help of anecdotes. This book has to be read one chapter at a time, rather than just being a one-time read. If you want to enjoy an adventurous journey to become a successful trader, then this is the book you are looking for!",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "1948032201"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9781948032209"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 172,
            "printType": "BOOK",
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=7L2TtgEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=7L2TtgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=7L2TtgEACAAJ&dq=rich&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=7L2TtgEACAAJ&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Trade_and_Grow_Rich.html?hl=&id=7L2TtgEACAAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=7L2TtgEACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "This book has to be read one chapter at a time, rather than just being a one-time read. If you want to enjoy an adventurous journey to become a successful trader, then this is the book you are looking for!"
        }
    },
    {
        "kind": "books#volume",
        "id": "oFE_C0FiJcQC",
        "etag": "lNOZub0qZbM",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/oFE_C0FiJcQC",
        "volumeInfo": {
            "title": "The Big Rich",
            "subtitle": "The Rise and Fall of the Greatest Texas Oil Fortunes",
            "authors": [
                "Bryan Burrough"
            ],
            "publisher": "Penguin",
            "publishedDate": "2009-01-27",
            "description": "“Full of schadenfreude and speculation—and solid, timely history too.” —Kirkus Reviews “This is a portrait of capitalism as white-knuckle risk taking, yielding fruitful discoveries for the fathers, but only sterile speculation for the sons—a story that resonates with today's economic upheaval.” —Publishers Weekly “What's not to enjoy about a book full of monstrous egos, unimaginable sums of money, and the punishment of greed and shortsightedness?” —The Economist Phenomenal reviews and sales greeted the hardcover publication of The Big Rich, New York Times bestselling author Bryan Burrough's spellbinding chronicle of Texas oil. Weaving together the multigenerational sagas of the industry's four wealthiest families, Burrough brings to life the men known in their day as the Big Four: Roy Cullen, H. L. Hunt, Clint Murchison, and Sid Richardson, all swaggering Texas oil tycoons who owned sprawling ranches and mingled with presidents and Hollywood stars. Seamlessly charting their collective rise and fall, The Big Rich is a hugely entertaining account that only a writer with Burrough's abilities-and Texas upbringing-could have written.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781440686030"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1440686033"
                }
            ],
            "readingModes": {
                "text": true,
                "image": false
            },
            "pageCount": 480,
            "printType": "BOOK",
            "categories": [
                "History"
            ],
            "averageRating": 4,
            "ratingsCount": 18,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.7.9.0.preview.2",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=oFE_C0FiJcQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=oFE_C0FiJcQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=oFE_C0FiJcQC&printsec=frontcover&dq=rich&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=oFE_C0FiJcQC&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/The_Big_Rich.html?hl=&id=oFE_C0FiJcQC"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/The_Big_Rich-sample-epub.acsm?id=oFE_C0FiJcQC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=oFE_C0FiJcQC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "“Full of schadenfreude and speculation—and solid, timely history too.” —Kirkus Reviews “This is a portrait of capitalism as white-knuckle risk taking, yielding fruitful discoveries for the fathers, but only sterile speculation for ..."
        }
    },
    {
        "kind": "books#volume",
        "id": "Qx1pLwEACAAJ",
        "etag": "cjcUtZG++BA",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/Qx1pLwEACAAJ",
        "volumeInfo": {
            "title": "Reflechissez Et Devenez Riche / Think and Grow Rich",
            "authors": [
                "Napoleon Hill"
            ],
            "publisher": "www.bnpublishing.com",
            "publishedDate": "2012-06",
            "description": "Grâce aux révélations que contient ce livre, vous surmonterez tous les obstacles et satisferez vos ambitions, quelles qu'elles soient. Cet ouvrage est le fruit d'une étude de 20 années qui a porté sur la vie de personnalités ayant connu les succès les plus éclatants, tels Henry Ford, John D. Rockfeller et Alexander Graham Bell. Si la fortune vous intéresse, si la réussite ne vous effraie pas, ce livre vous est destiné...",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "1607964635"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9781607964636"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 204,
            "printType": "BOOK",
            "categories": [
                "Success"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=Qx1pLwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=Qx1pLwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "fr",
            "previewLink": "http://books.google.com/books?id=Qx1pLwEACAAJ&dq=rich&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=Qx1pLwEACAAJ&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Reflechissez_Et_Devenez_Riche_Think_and.html?hl=&id=Qx1pLwEACAAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=Qx1pLwEACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Grâce aux révélations que contient ce livre, vous surmonterez tous les obstacles et satisferez vos ambitions, quelles qu&#39;elles soient."
        }
    },
    {
        "kind": "books#volume",
        "id": "_alxtgAACAAJ",
        "etag": "62z5cW0PL88",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/_alxtgAACAAJ",
        "volumeInfo": {
            "title": "Rica ḍêḍa puara ḍêḍa",
            "subtitle": "paiśāsambandhāta śrīmanta loka āpalyā mulānnā asã kāya śikavatāta je garība āṇi madhyamavargīya āī-vaḍīla śikavata nāhīta",
            "authors": [
                "Robert T. Kiyosaki",
                "Robert T"
            ],
            "publishedDate": "2006",
            "description": "On the development of economic utilization.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "8183220371"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9788183220378"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 188,
            "printType": "BOOK",
            "categories": [
                "Finance, Personal"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "language": "mr",
            "previewLink": "http://books.google.com/books?id=_alxtgAACAAJ&dq=rich&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=_alxtgAACAAJ&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Rica_%E1%B8%8D%C3%AA%E1%B8%8Da_puara_%E1%B8%8D%C3%AA%E1%B8%8Da.html?hl=&id=_alxtgAACAAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=_alxtgAACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "On the development of economic utilization."
        }
    },
    {
        "kind": "books#volume",
        "id": "vRQFAAAACAAJ",
        "etag": "N7dyUrpUyjw",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/vRQFAAAACAAJ",
        "volumeInfo": {
            "title": "Rich Traditions",
            "subtitle": "Scrap Quilts to Paper Piece",
            "authors": [
                "Nancy Mahoney"
            ],
            "publisher": "That Patchwork Place",
            "publishedDate": "2002",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "1564774252"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9781564774255"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 111,
            "printType": "BOOK",
            "categories": [
                "Crafts & Hobbies"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=vRQFAAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=vRQFAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=vRQFAAAACAAJ&dq=rich&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=vRQFAAAACAAJ&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Rich_Traditions.html?hl=&id=vRQFAAAACAAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=vRQFAAAACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        }
    },
    {
        "kind": "books#volume",
        "id": "tWN9DwAAQBAJ",
        "etag": "hr7Bo2fmUac",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/tWN9DwAAQBAJ",
        "volumeInfo": {
            "title": "Rich Dad Poor Dad (Telugu)",
            "authors": [
                "Robert Kiyosaki"
            ],
            "publisher": "Manjul Publishing",
            "description": "Rich Dad Poor Dad is based mostly on Kiyosaki's young days spent in Hawaii. Enriched by Kiyosaki’s personal experience and the teachings he received from his rich dad and poor dad, the book highlights different attitudes towards money, work and life. Framed around six main teachings and lessons, the book is mostly a self-reflection. Apart from the financial benefits, the book also describes and highlights the teachings he got from his poor dad, i.e., empathy and responsibility towards society. Described as a personal finance book, it has not only challenged, but has also changed the way people think about money. The book talks about Kiyosaki’s background, his business ventures and investments and variation between possessions and liabilities and what importance they both have in terms of starting and owning a business. It also sheds light on the teachings given by rich to their kids, which is usually missed by poor as well as the middle class parents and why it is important to have financial literacy over and above all. It also provides impetus on doing work for learning and not for earning and teaches the importance of investing and building business. This path-breaking book also showcase how one must be prepared to take action and risk and communicates the idea of how one’s primary residence is a liability and not an asset. It communicates the importance of intelligence and literacy in terms of finance and how financial and entrepreneurial skills play a vital role in the success. How to use power and prosper with the help of investment skills and why it is important to possess investment skills are also written in clear and crisp words in this book. The book also talks of the importance of investment and free enterprise and urges the prospective investors and businessmen to learn from others, especially from rich people and generate new ideas to excel and succeed in life.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9788183221191"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "818322119X"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 224,
            "printType": "BOOK",
            "categories": [
                "Business & Economics"
            ],
            "averageRating": 5,
            "ratingsCount": 1,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "preview-1.0.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=tWN9DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=tWN9DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "te",
            "previewLink": "http://books.google.com/books?id=tWN9DwAAQBAJ&printsec=frontcover&dq=rich&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=tWN9DwAAQBAJ&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Rich_Dad_Poor_Dad_Telugu.html?hl=&id=tWN9DwAAQBAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.com/books/download/Rich_Dad_Poor_Dad_Telugu-sample-pdf.acsm?id=tWN9DwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=tWN9DwAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "This path-breaking book also showcase how one must be prepared to take action and risk and communicates the idea of how one’s primary residence is a liability and not an asset."
        }
    },
    {
        "kind": "books#volume",
        "id": "7kUrlwEACAAJ",
        "etag": "ZKaiEYJ6FE4",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/7kUrlwEACAAJ",
        "volumeInfo": {
            "title": "The Get Rich Quick Club",
            "authors": [
                "Dan Gutman"
            ],
            "publisher": "HarperCollins",
            "publishedDate": "2006-10-17",
            "description": "We, the members of the Get Rich Quick Club, in order to form a more perfect summer, vow that we will figure out a way to make a million dollars by September. We agree that neither rain nor snow nor gloom of night will prevent us from achieving our stated goal, till death do us part. Gina Tumolo and her Get Rich Quick Club are determined to make their summer pay off. They're going to make a pact and hatch a scheme, and their small-town life will never be the same again.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0060534427"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780060534424"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 128,
            "printType": "BOOK",
            "categories": [
                "Juvenile Fiction"
            ],
            "averageRating": 4,
            "ratingsCount": 3,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=7kUrlwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=7kUrlwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=7kUrlwEACAAJ&dq=rich&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=7kUrlwEACAAJ&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/The_Get_Rich_Quick_Club.html?hl=&id=7kUrlwEACAAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=7kUrlwEACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "We, the members of the Get Rich Quick Club, in order to form a more perfect summer, vow that we will figure out a way to make a million dollars by September."
        }
    },
    {
        "kind": "books#volume",
        "id": "XqFXmAEACAAJ",
        "etag": "Ediiz7HyVUo",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/XqFXmAEACAAJ",
        "volumeInfo": {
            "title": "The King of Oil",
            "subtitle": "The Secret Lives of Marc Rich",
            "authors": [
                "Daniel Ammann"
            ],
            "publisher": "St. Martin's Press",
            "publishedDate": "2009-10-13",
            "description": "Billionaire oil trader Marc Rich for the first time talks at length about his private life (including his expensive divorce from wife Denise); his invention of the spot oil market which made his fortune and changed the world economy; his lucrative and unpublicized dealings with Ayatollah Khomeini’s Iran, Fidel Castro’s Cuba, war-ravaged Angola, and apartheid South Africa; his quiet cooperation with the Israeli and U.S. governments (even after he was indicted for tax fraud by Rudy Guiliani) and near-comical attempts by U.S. officials to kidnap him illegally. This sure-to-make-headlines book is the first no-holds-barred biography of Rich, who was famously pardoned by Bill Clinton, and resurfaced in the news during the confirmation hearings of Attorney General Eric Holder. The King of Oil sheds stunning new light on one of the most controversial international businessmen of all time, charting Rich’s rise from the Holocaust, which he fled as a young boy, to become the wealthiest and most powerful oil and commodities trader of the century. From his earliest trading days to the present, Marc Rich’s story is astonishing and compelling.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0312570740"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780312570743"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 320,
            "printType": "BOOK",
            "categories": [
                "Biography & Autobiography"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=XqFXmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=XqFXmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.com/books?id=XqFXmAEACAAJ&dq=rich&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
            "infoLink": "http://books.google.com/books?id=XqFXmAEACAAJ&dq=rich&hl=&as_pt=BOOKS&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/The_King_of_Oil.html?hl=&id=XqFXmAEACAAJ"
        },
        "saleInfo": {
            "country": "IL",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "IL",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=XqFXmAEACAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "The King of Oil sheds stunning new light on one of the most controversial international businessmen of all time, charting Rich&#39;s rise from the Holocaust, which he fled as a young boy, to become the wealthiest and most powerful oil and ..."
        }
    }
]