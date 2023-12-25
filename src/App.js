import React, {useState} from "react";
import NewUi from "./components/UI/NewUi";
import AdExample9 from "./template/AdExample9";
import AdExample3 from "./template/AdExample3";
import ColorPicker from "./components/ColourPicker";
import "./styles/App.css"

const App = () => {
  const [formData, setFormData] = useState();
  const [textBackgroundColor, setTextBackgroundColor] = useState('#f0f0f0');
  const [textColor, setTextColor] = useState('#f0f0f0');
  const receiveChildData = (data) => {
    console.log('Data received from child:', data);
    setFormData({ ...data, textBackgroundColor});
  };

  const handleColorChange = (color) => {
    setTextBackgroundColor(color.hex); // Use color.hex to get the hexadecimal value
    setFormData({ ...formData, textBackgroundColor: color.hex }); // Update textBackgroundColor in the formData
  };
  const handleTextChange = (color) => {
    setTextColor(color.hex); // Use color.hex to get the hexadecimal value
    setFormData({ ...formData, textColor: color.hex }); // Update textBackgroundColor in the formData
  };

  return (
    <div className="App">
      <NewUi sendDataToParent={receiveChildData}/>
      <div className="template-container">
        <div className="template1">
        {formData && <AdExample9 formData={formData} />}
        </div>
        <div className="template2">
        {formData && <AdExample3 formData={formData} />}
        </div>
      </div>
      <div className="background-color-picker">
        {formData &&<div className="textbackground">
          <label>Select colour for text background:</label>
          
           <ColorPicker color={textBackgroundColor} onChange={handleColorChange} />
           </div>}
           {formData &&<div className="textcolor">
          <label>Select colour for text:</label>
           <ColorPicker color={textColor} onChange={handleTextChange} />
           </div>}
      </div>
         </div>
  );
};

export default App;