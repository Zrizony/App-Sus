import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
  query,
  getNoteById,
  updateNoteText,
  addNote,
  changeNoteColor,
  duplicateNote,
  deleteNote,
  toggleTodoCheck,
  togglePin,
}

//---- notes storage key ----//
const KEY = 'notesDB'

//---- loading data from storage ----//
function query(filterBy) {
  let notes = _loadFromStorage() || _createNotes()

  notes = _sortByPinned(notes)
  notes = notes.map((note) => {
    if (note.type !== 'note-todo') return note
    else {
      const sortedTodo = _sortByChecked(note.info.todo)
      note.info.todo = sortedTodo
      return note
    }
  })

  if (filterBy !== '') {
    let { searchInput } = filterBy
    const filteredNotes = notes.filter((note) => {
      return note.info.title.toLowerCase().includes(searchInput.toLowerCase())
    })
    return Promise.resolve(filteredNotes)
  }
  
  return Promise.resolve(notes)
}

//---- catching note by his id ----//
function getNoteById(id) {
  let notes = _loadFromStorage()
  const note = notes.find((note) => note.id === id)
  return Promise.resolve(note)
}

//---- adding hardcoded to storage notes ----//
function _createNotes() {
  const notes = [
    {
      id: 'd68f4c',

      type: 'note-img',
      isPinned: false,
      info: {
        title: "Don't forget to breath",
        txt: '',
        url: 'assets/img/breath.jpg',
        todo: [],
      },
      style: {
        backgroundColor: '#FDCFE8',
      },
    },
    {
      id: '7E6d49',

      type: 'note-todo',
      isPinned: false,
      info: {
        title: 'Groceries',
        item: '',
        url: '',
        todo: [
          {
            item: 'Water',
            isChecked: false,
          },
          {
            item: 'Milk',
            isChecked: true,
          },
          {
            item: 'Bread',
            isChecked: false,
          },
          {
            item: 'Rice',
            isChecked: true,
          },
          {
            item: 'Toiler Paper',
            isChecked: false,
          },
        ],
      },
      style: {
        backgroundColor: '#F28B82',
      },
    },
    {
      id: '07c3B8',

      type: 'note-todo',
      isPinned: false,
      info: {
        title: 'Todo list for tomorrow',
        item: '',
        url: '',
        todo: [
          {
            item: 'Eat',
            isChecked: true,
          },
          {
            item: 'Sleep',
            isChecked: true,
          },
          {
            item: 'Code',
            isChecked: false,
          },
          {
            item: 'Repeat',
            isChecked: false,
          },
        ],
      },
      style: {
        backgroundColor: '#FFF475',
      },
    },
    {
      id: 'f780dc',

      type: 'note-txt',
      isPinned: true,
      info: {
        txt: 'Lets init!',
        url: '',
        todo: [],
        title: 'Hello',
      },
      style: {
        backgroundColor: '#F1E4DE',
        color: '000',
      },
    },
    {
      id: '99D62F',

      type: 'note-img',
      isPinned: false,
      info: {
        title: 'True work of art',
        text: '',
        url: 'https://m.media-amazon.com/images/M/MV5BZjRhMTBlYmEtZGI1Zi00OTRjLWEwOGEtOTY0YjIzYjljYjY4XkEyXkFqcGdeQXVyNTMyODM3MTg@._V1_FMjpg_UX1000_.jpg',
        todo: [],
      },
      style: {
        backgroundColor: '#FFF475',
      },
    },
    {
      id: '82B794',

      type: 'note-video',
      isPinned: true,
      info: {
        title: 'Childhood',
        text: '',
        url: 'https://www.youtube.com/watch?v=0Xtbnfcxxco',
        todo: [],
        videoId: '0Xtbnfcxxco',
        videoUrl: 'https://www.youtube.com/watch?v=0Xtbnfcxxco',
      },
      style: {
        backgroundColor: '#FDCFE8',
      },
    },
  ]
  _saveToStorage(notes)
  return notes
}

//---- adding new note ----//
function addNote(note) {
  const { noteInfo, noteType } = note
  switch (noteType) {
    case 'note-txt':
      if (!noteInfo.txt && !noteInfo.title) return
      break
    case 'note-img':
      if (!noteInfo.url) return
      break
    case 'note-video':
      if (!noteInfo.url) return
      break
    case 'note-todo':
      if (!noteInfo.todo.length) return
      noteInfo.todo = noteInfo.todo
        .filter((task) => task.length >= 1)
        .map((task) => ({ item: task }))
      break
  }

  const newNote = {
    id: utilService.makeId(),
    type: noteType,
    isPinned: false,
    info: { ...noteInfo },
    style: {
      backgroundColor: '#FFF475',
    },
  }

  const notes = _loadFromStorage()
  notes.unshift(newNote)
  _saveToStorage(notes)
  return Promise.resolve(newNote)
}

//---- allowing the user to update text notes directly on the note ----//
function updateNoteText(updatedNote, inputText, inputTitle) {
  updatedNote.info.txt = inputText
  updatedNote.info.title = inputTitle
  const updatedNotes = _updateNote(updatedNote)
  _saveToStorage(updatedNotes)
  return Promise.resolve()
}

//---- change note background ----//
function changeNoteColor(noteId, color) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => note.id === noteId)
  note.style.backgroundColor = color
  _saveToStorage(notes)
  return Promise.resolve()
}

//---- duplicating note ----//
function duplicateNote(noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => {
    return noteId === note.id
  })
  const duplicateNote = { ...note }

  duplicateNote.id = utilService.makeId()
  duplicateNote.isPinned = false
  notes.unshift(duplicateNote)

  if (duplicateNote.info.todo.length) {
    _sortByChecked(duplicateNote.info.todo)
  }
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

//---- removing note localstorage ----//
function deleteNote(noteId) {
  const notes = _loadFromStorage()
  const idx = notes.findIndex((note) => note.id === noteId)
  notes.splice(idx, 1)
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

//---- toggeling todo item checkbox value ----//
function toggleTodoCheck(idx, noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => noteId === note.id)
  const todo = note.info.todo
  todo[idx].isChecked = !todo[idx].isChecked
  _sortByChecked(todo)
  _saveToStorage(notes)
  return Promise.resolve(todo)
}

//---- toggeling note pin value ----//
function togglePin(noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => noteId === note.id)
  note.isPinned = !note.isPinned
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

//---- Private functions - use in this file only! ----//

//---- updating text note after change ----//
function _updateNote(updatedNote) {
  const notes = _loadFromStorage()
  return notes.map((note) => {
    if (note.id === updatedNote.id) return updatedNote
    return note
  })
}

//---- sorting notes with pinned ones being first on the list ----//
function _sortByPinned(notes) {
  return notes.sort((a, b) => {
    if (a.isPinned && !b.isPinned) {
      return -1
    }
    if (!a.isPinned && b.isPinned) {
      return 1
    }
  })
}

//---- sorting todo items by checked and unchecked ----//
function _sortByChecked(todo) {
  return todo.sort((a, b) => {
    if (!a.isChecked && b.isChecked) {
      return -1
    }
    if (!a.isChecked && b.isChecked) {
      return 1
    }
  })
}

//---- functions to communicate with local storage ----//
function _loadFromStorage() {
  return storageService.loadFromStorage(KEY)
}

function _saveToStorage(notes) {
  storageService.saveToStorage(KEY, notes)
}