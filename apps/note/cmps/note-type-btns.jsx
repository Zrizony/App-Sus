export function NoteTypeBtns({ onChangeType }) {

  //---- add new note buttons. each one changing the input value with onClick ----//
  return (
    <div className="type-btns">
      <button
        className="btn-text fa-solid fa-font"
        value="note-txt"
        onClick={onChangeType}
        ></button>
      <button
        className="btn-img fa-solid fa-image"
        value="note-img"
        onClick={onChangeType}
        ></button>
      <button
        className="btn-todo fa-solid fa-list"
        value="note-todo"
        onClick={onChangeType}
      ></button>
      <button
        className="btn-video fa-brands fa-youtube"
        value="note-video"
        onClick={onChangeType}
      ></button>
    </div>
  )
}