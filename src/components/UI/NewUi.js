import React, { useState } from "react";
import OpenAI from "openai";
import "../../styles/UI_styles/NewUi.css"
function NewUi({ sendDataToParent }) {
  const [step, setStep] = useState(1);
  const [logo, setLogo] = useState("");
  const [searchDalleQuery, setSearchDalleQuery] = useState("");
  const [dalleImageDisplay, setDalleImageDisplay] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const fontSize = useState(16);

  const [formData, setFormData] = useState({
    companyBackground: "",
    logo: null,
    prompt: "",
  });


  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFromLocal, setSelectedImageFromLocal] = useState(null);

  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const handleLocalImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImageFromLocal(reader.result);
      console.log(reader.result)
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure value is not undefined
    const inputValue = value || "";

    // Limit the input to 20 characters
    const truncatedValue = inputValue.slice(0, 25);

    setFormData({
      ...formData,
      [name]: truncatedValue,
    });
  };

  const handleDalleSearch = async () => {
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: searchDalleQuery,
    });
    const imageUrl = image.data[0]?.url;
    setDalleImageDisplay(true);
    setSelectedImageUrl(imageUrl);
    console.log('DALL-E 3 Image URL:', selectedImageUrl);
  };

  const handleNextDalleImage = async () => {
    await handleDalleSearch(searchDalleQuery);
  };

  const handleSelectImage = async () => {
    let imageUrl;

    if (dalleImageDisplay) {
      imageUrl = selectedImageUrl;
    } else {
      imageUrl = selectedImageFromLocal;
    }

    setSelectedImage(imageUrl);
    setStep(5);
  };

  const handleSubmit = () => {
    const { companyBackground, headline, subheadline, callToAction } = formData;
    const imageUrl = selectedImageFromLocal || selectedImage;


    setStep(step + 1);
    sendDataToParent({
      companyBackground,
      logo,
      headline,
      subheadline,
      callToAction,
      currentImageSrc: imageUrl,
    });
  };
  
return(  <div className="container">
    {step === 1 && (
      <div>
        <label>Enter Company background:</label>
        <br />
        <textarea
          name="companyBackground"
          value={formData.companyBackground}
          onChange={handleInputChange}
        ></textarea>
        <br/>
        <button onClick={handleNext}>Next</button>
      </div>
    )}

    {step === 2 && (
      <div>
    <label>Upload logo:</label>
    <br />
    <input
      type="file"
      name="logo"
      accept="image/*"
      onChange={handleLogoChange}
    />
    {/* {logo && <img src={logo} alt="Logo Preview" />} */}
        <br />
        <button onClick={handlePrevious} className="prev">Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    )}

    {step === 3 && (
      <div>
        <label>Enter prompt for headline and subheadline:</label>
        <br />
        <textarea
          name="prompt"
          value={formData.prompt}
          onChange={handleInputChange}
        ></textarea>
        <h1>OR</h1>
        <label>Enter headline:</label>
    <br />
    <input
      type="text"
      name="headline"
      value={formData.headline}
      onChange={handleInputChange}
      maxLength={20}
    />
  <span className="character-count">
  {formData.headline ? `${formData.headline.length}/20` : '0/20'}
</span>
    <br />
    <label>Enter subheadline:</label>
    <br />
    <input
      type="text"
      name="subheadline"
      value={formData.subheadline}
      onChange={handleInputChange}
      maxLength={25}
    />
 <span className="character-count">
  {formData.subheadline ? `${formData.subheadline.length}/25` : '0/25'}
</span>
    <br />
    <label>Enter call to action:</label>
    <br />
    <input
      type="text"
      name="callToAction"
      value={formData.callToAction}
      onChange={handleInputChange}
      maxLength={20}
      style={{ fontSize: `${fontSize}px` }}
    />
<span className="character-count">
  {formData.callToAction ? `${formData.callToAction.length}/20` : '0/20'}
</span>
        <br />
        <button onClick={handlePrevious} className="prev">Previous</button>
        <button onClick={handleNext}>Next</button>
        <br/>
      </div>
      
    )}

{step === 4 && (
        <div className="dalle-page">
          <label>Upload image locally:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleLocalImageChange(e)}
          />
          <br />
          <label>Search your images from DALL-E:</label>
          <input
            type="text"
            value={searchDalleQuery}
            onChange={(e) => setSearchDalleQuery(e.target.value)}
          />
          <button onClick={handleDalleSearch}>Search</button>
          {dalleImageDisplay && (
            <div>
              <img src={selectedImageUrl} alt="not found" />
              <br />
              <button onClick={handleNextDalleImage}>Next Image</button>
            </div>
          )}
          <button onClick={handlePrevious} className="prev">
            Previous
          </button>
          <button onClick={handleSelectImage}>Select Image</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <p>Selected Image Preview:</p>
          {dalleImageDisplay ? (
            <img src={selectedImageUrl} alt="preview" />
          ) : (
            selectedImage && (
              <img src={selectedImage} alt="Preview" />
            )
          )}
          <br />
          <button>Crop</button>
          <br />
          <button onClick={handleSubmit}>Create Template</button>
          <br />
          <button onClick={handlePrevious} className="prev">
            Previous
          </button>
        </div>
      )}

  </div>)
}
export default NewUi