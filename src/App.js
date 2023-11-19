// src/App.js
import React, { useEffect, useRef, useCallback, useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar.js';
import ImageCropper from './components/ImageCropper.js';
import LabellingView from './components/LabellingView.js';
import ArtworkInfo from './components/ArtworkInfo.js'

function HistoryCard({
  images,
  setImageSrc,
}) {
  return (
    <div className="card" >
      <div className="card-header">切片历史</div>
      <div className="image-list">
        <div className="scrollable-images">
          {images.map((image, index) => (
            <img
              src={image}
              alt={`Image ${index}`}

              key={index}
              onClick={() => (setImageSrc(image))} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Convert DataURL to Blob
function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


function App() {
  const [historicalImages, setHistoricalImages] = useState([]);


  const [imageSrc, setImageSrc] = useState('./P330.jpg');
  const [fragmentSrc, setFragmentSrc] = useState('./P330_1.png');
  const [paintings, setPaintings] = useState([{ ImageID: "", PaintingID: '选择画作...' }]); // [ { PID: 1, title: '山水（十二開）' }, ...
  const cropperParentRef = useRef(null);

  const [selectedPainting, setSelectedPainting] = useState("D006500"); 
  const [selectedPaintingData, setSelectedPaintingData] = useState({}); // [ { PID: 1, title: '山水（十二開）' }, ...
  const [labelData, setLabelData] = useState({
    compositionTags: [],
    categoryTags: [],
    cunFaTags: [],
    dianFaTags: [],
    sheSeTags: [],
    dianJingTags: []
  });

  const [windowSize, setWindowsSize] = useState({
    width: document.documentElement.clientWidth, height: document.documentElement.clientHeight
  })
  const onResize = useCallback(() => {
    setWindowsSize({
      width: document.documentElement.clientWidth, height: document.documentElement.clientHeight,
    })
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return (() => {
      window.removeEventListener('resize', onResize)
    })
  }, [])

  // Fetch paintings from backend
  useEffect(() => {
    fetch('/api/getAllPaintings')
      .then(res => res.json())
      .then(data => {
        console.log("Got Images");
        setPaintings(data);
      })
      .catch(err => {
        console.log("failed:", err);
      });
  }, []);

  // Fetch painting data from backend
  useEffect(() => {
    fetch('/api/getPaintingData/' + selectedPainting)
      .then(res => res.json())
      .then(data => {
        console.log("Got Painting Data");
        console.log(data[0]);
        setSelectedPaintingData(data[0]);
      })
      .catch(err => {
        console.log("failed:", err);
      });
  }, [selectedPainting]);

  // tracking the change of labelData
  useEffect(() => {
    console.log("labelData changed", labelData);
  }, [labelData]);

  // 函数来处理保存按钮的点击事件
  const handleSaveButtonClick = async () => {
    if (historicalImages.length === 0) {
      console.error('No historical images to save!');
      return;
    }
    // 假设您已经有一个用来获取最新历史图片地址的逻辑 (例如，您可能有一个状态来跟踪当前编辑的图片)
    const latestImage = historicalImages[historicalImages.length - 1];
    const dataUrl = latestImage; // 假设 latestImage 就是 dataUrl，根据您的实际情况来调整

    // 转换 dataUrl 为 Blob
    const imageBlob = dataURLtoBlob(dataUrl);

    // 整理标签数据
    const formData = new FormData();
    formData.append('paintingID', selectedPainting); // 选择的画作ID
    formData.append('category', labelData.categoryTags.join(',')); // 类别标签
    formData.append('cunFa', labelData.cunFaTags.join(',')); // 皴法标签
    formData.append('dianFa', labelData.dianFaTags.join(',')); // 点法标签
    formData.append('sheSe', labelData.sheSeTags.join(',')); // 设色标签
    formData.append('dianJing', labelData.dianJingTags.join(',')); // 点睛标签
    formData.append('imageData', imageBlob); // 图片数据

    console.log("sent data", 
      selectedPainting,
      labelData.categoryTags.join(','),
      labelData.cunFaTags.join(','),
      labelData.dianFaTags.join(','),
      labelData.sheSeTags.join(','),
      labelData.dianJingTags.join(','),
      imageBlob);

    // 发送数据到后端
    try {
      const response = await fetch('/api/saveFragmentLabelData', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log('Save result:', result);
      // 处理结果，例如更新 UI 或通知用户
    } catch (error) {
      console.error('Error saving data:', error);
      // 处理错误情况
    }
  }

  return (
    <div className="app-container">
      <Toolbar
        setImageSrc={setImageSrc}
        setSelectedPainting={setSelectedPainting}
        paintings={paintings}
        handleSaveButtonClick = {handleSaveButtonClick}
      />
      <div className="main-content">
        {/* <ImageUploader /> */}
        <div className='left-panel'>
          <div id='image-container' ref={cropperParentRef}>
            <ImageCropper
              file={{ url: imageSrc }}
              setHistoricalImages={setHistoricalImages}
              contentRef={cropperParentRef}
              parentHeight={windowSize.height * 0.70 /* = 70vh */}
              setImageSrc={setFragmentSrc}
            />
          </div>
          <div id='history-container'>
            <HistoryCard images={historicalImages} setImageSrc={setImageSrc} />
          </div>
        </div>
        {/* <ImageCropper /> */}
        <div className="right-panel">
          <ArtworkInfo imageSrc={imageSrc} data={selectedPaintingData} />
          <LabellingView setLabelData={setLabelData} />
        </div>
      </div>
    </div>
  );
}


export default App;
