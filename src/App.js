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
              onClick={() => setImageSrc(image)} />
          ))}
        </div>
      </div>
    </div>
  );
}




function App() {
  const [historicalImages, setHistoricalImages] = useState([
    // '/fragments/P330_1.png',
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
  const [selectedPainting, setSelectedPainting] = useState("D006500"); // [ { PID: 1, title: '山水（十二開）' }, ...
  const [selectedPaintingData, setSelectedPaintingData] = useState({}); // [ { PID: 1, title: '山水（十二開）' }, ...

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

  // Fetch painting data from backend
  useEffect(() => {
    fetch('/api/getPaintingData/'+selectedPainting)
      .then(res => res.json())
      .then(data => {
        console.log("Got Painting Data");
        console.log(data[0]);
        setSelectedPaintingData(data[0]);
      })
      .catch(err => {
        console.log("failed:",err);
      });
  }, [selectedPainting]);

  return (
    <div className="app-container">
      <Toolbar
        setImageSrc={setImageSrc}
        setSelectedPainting={setSelectedPainting}
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
          <ArtworkInfo imageSrc={imageSrc} data={selectedPaintingData}/>
          <LabellingView />
        </div>
      </div>
    </div>
  );
}


export default App;
