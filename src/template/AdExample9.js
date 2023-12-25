import React, { useRef, useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import "../styles/Template_styles/AdExample9.css";
import { saveAs } from "file-saver";
import '../styles/fonts.css';
import html2canvas from 'html2canvas';


const AdExample9 = ({ formData }) => {
  const { logo, currentImageSrc: image, headline, subheadline, callToAction, textBackgroundColor, textColor } = formData;
  console.log('Data received from child:', formData);
  const adContainerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = adContainerRef.current.querySelectorAll("img");

    const waitForImages = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        img.onload = resolve;
      });
    });

    Promise.all(waitForImages).then(() => {
      setImagesLoaded(true);
    });
    
  }, [formData]);

  const styles = {
    fontFamily: "'CoreSansN65Bold', sans-serif",
  };
  const handleDownload = async () => {
    if (adContainerRef.current && imagesLoaded) {
      html2canvas(adContainerRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, 'template.png');
        });
      });
    }
//     await saveTemplateToServer({
//       "logo": logo,
// "headline": headline,
// "subheadline": subheadline,
// "image": formData.currentImageSrc,
// "templateName": "AdTemplate3"
//     });
  };

  return (
    <div style={styles}>
      <div className="ad-example-9" ref={adContainerRef}>
        <img className="primary-image-placeholder-1" alt="" src={image} />
        <div className="logo-group">
          <img className="logo-placeholder-1" alt="" src={logo} />
        </div>
        <div className="headline-parent">
          <div className="text-container">
            <div className="headline">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {headline}
              </div>
            </div>
            <div className="punchline">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {subheadline}
              </div>
            </div>
            <div className="callToAction">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {callToAction}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleDownload}>Download Template</button>
    </div>
  );
};

export default AdExample9;