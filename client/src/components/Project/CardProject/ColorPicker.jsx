import React, { useState } from "react";
import "./card-project.css";

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  return randomColor;
};

const ColorPicker = ({ color, onColorChange }) => {


  const [selectedColor, setSelectedColor] = useState(color || getRandomColor());

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor); 
    onColorChange(newColor);  
  };

  return (
    <div className="color_change_block">
      <input
        type="color"
        value={selectedColor}
        className="colorChange"
        onChange={handleColorChange}
        placeholder="Оберіть колір"
      />
      Оберіть колір проєкту
    </div>
  );
};

export default ColorPicker;
