// src/App.js
import React, { useEffect, useRef, useCallback, useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar.js';
import ImageCropper from './components/ImageCropper.js';
import LabellingView from './components/LabellingView.js';

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
              onClick={() => setImageSrc(image)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtworkInfo({}) {
  const imageSrc = './P330.jpg'; // 图片路径

  const containerStyle = {
    margin: '20px'
  };

  const imageStyle = {
    maxWidth: '200px',
    maxHeight: '200px',
    float: 'right', // 将图片浮动到右侧
    marginLeft: '20px' // 为图片和文字之间添加一些空间
  };


  return (
    <div style={containerStyle}>
      {/* 图片容器 */}
      <div>
        <img src={imageSrc} alt="山水（十二開）" style={imageStyle} />
      </div>
      {/* 文本信息 */}
      <div >
        <h1>山水（十二開）</h1>
        <p><strong>作者:</strong> 石濤</p>
        <p><strong>时代:</strong> 清</p>
        <p><strong>材质:</strong> 紙本設色</p>
        <p><strong>尺寸:</strong> 各47.5×31.4</p>
        <p><strong>收藏机构:</strong> 波士頓藝術博物館</p>
      </div>
    </div>
  );
};




function App() {
  const [historicalImages, setHistoricalImages] = useState([
    '/fragments/P330_1.png',
    // '/fragments/P330_2.png',
    // '/fragments/P330_3.png',
    // '/fragments/P330_4.png',
    // '/fragments/P330_5.png',
    // '/fragments/P330_6.jpeg',
  ]);
  const [imageSrc, setImageSrc] = useState('./P330.jpg');
  const [fragmentSrc, setFragmentSrc] = useState('./P330_1.png');
  const [paintings, setPaintings] = useState([{ImageID: "", PaintingID:'选择画作...'}]); // [ { PID: 1, title: '山水（十二開）' }, ...
  const cropperParentRef = useRef(null);

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
        console.log("failed:",err);
      });
  }, []);

  return (
    <div className="app-container">
      <Toolbar
        setImageSrc={setImageSrc}
        paintings={paintings}
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
          <ArtworkInfo />
          <LabellingView />
        </div>
      </div>
    </div>
  );
}


export default App;
