import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
  return (
    <div>
      <SketchPicker color={color} onChange={onChange} style={{ width: '100px' }}/>
    </div>
  );
};

export default ColorPicker;
