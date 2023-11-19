import React from 'react';

function ArtworkInfo({
    imageSrc = './P330.jpg',
    data = {title: '山水（十二開）', author_name: '石濤', era: '清', material: '紙本設色', dimensions: '各47.5×31.4', collection_institution: '波士頓藝術博物館'},
  }) {
  
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
          <h2>{data.title}</h2>
            <p><strong>作者:</strong> {data.author_name} <strong>朝代:</strong> {data.era}</p>
            <p><strong>材質:</strong> {data.material} </p>
            <p><strong>尺寸:</strong> {data.dimensions}</p>
            <p><strong>收藏:</strong> {data.collection_institution}</p>
            <p><strong>题跋:</strong> {data.commentary}</p>
  
        </div>
      </div>
    );
  };

export default ArtworkInfo