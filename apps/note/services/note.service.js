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

const KEY = 'notesDB'

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
    console.log('searchInput1', searchInput)

    const filteredNotes = notes.filter((note) => {

      console.log('searchInput2' ,searchInput)
      console.log('note.info', note.info)

      return (
        note.info.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    })
    return Promise.resolve(filteredNotes)
  }
  return Promise.resolve(notes)
}

function getNoteById(id) {
  let notes = _loadFromStorage()
  const note = notes.find((note) => note.id === id)
  return Promise.resolve(note)
}

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
      isPinned: true,
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
        todo: []
      },
      style: {
        backgroundColor: '#FFF475',
      },
    },
    {
      id: '82B794',

      type: 'note-video',
      isPinned: false,
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

function updateNoteText(updatedNote, inputText, inputTitle) {
  updatedNote.info.txt = inputText
  updatedNote.info.title = inputTitle
  const updatedNotes = updateNote(updatedNote)
  _saveToStorage(updatedNotes)
  return Promise.resolve()
}

function updateNote(updatedNote) {
  const notes = _loadFromStorage()
  return notes.map((note) => {
    if (note.id === updatedNote.id) return updatedNote
    return note
  })
}

function changeNoteColor(noteId, color) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => note.id === noteId)
  note.style.backgroundColor = color
  _saveToStorage(notes)
  return Promise.resolve()
}

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

function deleteNote(noteId) {
  const notes = _loadFromStorage()
  const idx = notes.findIndex((note) => note.id === noteId)
  notes.splice(idx, 1)
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

function toggleTodoCheck(idx, noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => noteId === note.id)
  const todo = note.info.todo
  todo[idx].isChecked = !todo[idx].isChecked
  _sortByChecked(todo)
  _saveToStorage(notes)
  return Promise.resolve(todo)
}

function togglePin(noteId) {
  const notes = _loadFromStorage()
  const note = notes.find((note) => noteId === note.id)
  note.isPinned = !note.isPinned
  _sortByPinned(notes)
  _saveToStorage(notes)
  return Promise.resolve(notes)
}

//---- Private functions - use in this file only! ----//
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

// function _filterTodo(todo, filterBy) {
//   console.log('this', todo, filterBy);
//   let filteredToDos = todo.filter((task) => task.txt.toLowerCase().includes(filterBy.toLowerCase()))
//   console.log('filteredToDos', filteredToDos);
//   return
// }

function _loadFromStorage() {
  return storageService.loadFromStorage(KEY)
}

function _saveToStorage(notes) {
  storageService.saveToStorage(KEY, notes)
}
