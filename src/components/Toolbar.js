// src/components/Toolbar.js
import React, {useState} from 'react';
import './Toolbar.css';

function Toolbar({
  setImageSrc,
  setSelectedPainting,
  paintings,
}) {

  const [selectedItemIndex, setSelectedItemIndex] = useState(0); // 选中的图片索引

  const handleImageChange = (event) => {
    const paintingName = event.target.value
    const index = event.target.selectedIndex

    if (index) {
      console.log("selectedItemIndex",index);
      setImageSrc("./img2/" + paintings[index].ImageID + ".png")
      setSelectedPainting(paintingName)
      setSelectedItemIndex(index);
    }
  }

  const handlePrevButtonClick = () => {
    const newIndex = Math.max(0, selectedItemIndex - 1);
    setSelectedItemIndex(newIndex);
    setSelectedPainting(paintings[newIndex].PaintingID)
    setImageSrc("./img2/" + paintings[newIndex].ImageID + ".png")
  };

  const handleNextButtonClick = () => {
    const newIndex = Math.min(paintings.length - 1, selectedItemIndex + 1);
    setSelectedItemIndex(newIndex);
    setSelectedPainting(paintings[newIndex].PaintingID)
    setImageSrc("./img2/" + paintings[newIndex].ImageID + ".png")
  };

  const handleSaveButtonClick = () => {
    alert("暂存成功")
  }

  return (
    <div className="toolbar">
      <div id="toolbar-left">
        <a >
          <select 
            className="file" 
            style={{ width: '150px' }} 
            onChange={handleImageChange}
            value={paintings[selectedItemIndex].PaintingID}
          >
            {/* {paintings.map((painting) => (
              <option key={painting.PID} value={painting.PID}>{painting.title}</option>
            ))} */
              // console.log(paintings)
              paintings.map((painting) => (
                <option key={painting.ImageID} value={painting.PaintingID}>{painting.ImageID + " " + painting.PaintingID}</option>
              ))
            }
          </select>
        </a>
        <button className="file" onClick={handlePrevButtonClick}>上一副</button>
        <button className="file" onClick={handleNextButtonClick}>下一副</button>
      </div>
      <div id="toolbar-center">
        中国传统绘画图像数据特征标注系统
      </div>
      <div id="toolbar-right">
        <button className="file" onClick={handleSaveButtonClick}>暂存</button>
      </div>
    </div>
  );
}

export default Toolbar;
