export class NoteBgColor extends React.Component {

  //---- states ----//
  state = {
    isActive: false,
  }

  //---- toggeling background palette display ----//
  togglePalette = (ev) => {
    ev.stopPropagation()

    const { isActive } = this.state
    this.setState({ isActive: !isActive })
  }

  //---- rendering color palette colors to the user ----//
  render() {

    //-- color palette
    const colors = [
      '#FFFFFF',
      '#F28B82',
      '#FBBC04',
      '#FFF475',
      '#CCFF90',
      '#A7FFEB',
      '#CBF0F8',
      '#F1E4DE',
      '#D7AEFB',
      '#FDCFE8',
      '#E6C9A8',
      '#E8EAED',
    ]

    //-- deconstructing for easier life
    const { noteId, onChangeNoteColor } = this.props
    const { isActive } = this.state

    //---- returning the color palette icon on the note and its color palette display ----//
    return (
      <React.Fragment>
        <button
          onClick={this.togglePalette}
          className="fa-solid fa-palette"
        ></button>
        {isActive && (
          <div className="color-palette">
            {colors.map((color, idx) => (
              <span
                className="color-ball"
                key={idx}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChangeNoteColor(noteId, color)
                }}
              ></span>
            ))}
          </div>
        )}
      </React.Fragment>
    )
  }
}