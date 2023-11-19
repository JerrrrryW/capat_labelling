// src/components/Toolbar.js
import React from 'react';
import './Toolbar.css';

function Toolbar({
  setImageSrc,
  paintings
}) {

  const handleImageChange = (event) => {
    const imageID = event.target.value;
    console.log(imageID);
    if (imageID) {
      setImageSrc("./img2/" + imageID + ".png")
    }
  }

  return (
    <div className="toolbar">
      <div id="toolbar-left">
        <a >
          <select className="file" style={{ width: '150px' }} onChange={handleImageChange}>
            {/* {paintings.map((painting) => (
              <option key={painting.PID} value={painting.PID}>{painting.title}</option>
            ))} */
              // console.log(paintings)
              paintings.map((painting) => (
                <option key={painting.ImageID} value={painting.ImageID}>{painting.ImageID + " " + painting.PaintingID}</option>
              ))
            }
          </select>
        </a>
        <button className="file" >上一副</button>
        <button className="file" >下一副</button>
      </div>
      <div id="toolbar-center">
        中国传统绘画图像数据特征标注系统
      </div>
      <div id="toolbar-right">

      </div>

    </div>
  );
}

export default Toolbar;
