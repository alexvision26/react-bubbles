import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, update }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`colors/${colorToEdit.id}`, colorToEdit).then(res => {
      // console.log(res.data)
      updateColors(colors)
      update(true)
      setEditing(false)
      update(false)
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`colors/${color.id}`).then(res => {
      console.log(res)
      updateColors(colors.filter(item => item.id !== color.id))
      setEditing(false)
    }).catch(err => console.log(err))
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post('colors', newColor).then(res => {
      update(true)
      update(false)
    })
    .catch(err => console.log(err))
  }

  const handleColor = e => {
    console.log(e.target.value)
    setNewColor({
      ...newColor,
      color: e.target.value
    })
  }

  const handleHex = e => {
    setNewColor({
      ...newColor,
      code: {
        ...newColor.code,
        hex: e.target.value
      }
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            {/* <button onClick={() => deleteColor()}>delete</button> */}
          </div>
        </form>
      )}
      <p>add new color</p>
      <form className='new-colors' onSubmit={addColor}>
        <input type='text' onChange={handleColor} name='addColor' placeholder='Color name..'/>
        <input type='color' name='colorhex' onChange={handleHex} placeholder='#000000'/>
        <button>Add color</button>
      </form>
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      
    </div>
  );
};

export default ColorList;
