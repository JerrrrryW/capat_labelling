import React, {useState} from 'react';
import MultiSelectTags from './MultiSelectTags.js';

const LabellingView = ({setLabelData}) => {

  // 更新标注数据的函数
  const updateLabelData = (tagType, selectedTags) => {
    setLabelData(prevData => ({
      ...prevData,
      [tagType]: selectedTags
    }));
  };

  // 画作整体特征标签
  const compositionTags = [
    '三叠式构图', '两段式构图', '倒景式构图', '截景式构图', 'S形构图', 
    'C形构图', '之字形构图', '甲字形构图', '由字形构图', '则字形构图', 
    '须字形构图', '三角形构图', '对角线构图', '全景式构图'
  ]; 

  // 局部切片特征标签
  const categoryTags = ['树木', '石头', '云气', '水', '植物', '鸟兽', '人物', '建筑'];
  const cunFaTags = [
    '折带皴', '解索皴', '披麻皴', '斧劈皴', 
    '牛毛皴', '拖泥带水皴', '卷云皴', '乱柴皴'
  ];
  
  const dianFaTags = [
    '介子点', '个字点', '胡椒点', '品字点', '分字点'
  ];
  
  const sheSeTags = ['浅绛', '水墨'];
  const dianJingTags = ['主景', '点景'];

  return (
    <div style={{padding:'15px'}}>
      <MultiSelectTags tags={compositionTags} title='画作构图' onTagChange={tags => updateLabelData('compositionTags', tags)}/>
      {/* <MultiSelectTags tags={materialTags} title='材质' /> */}

      <h2>局部切片特征</h2>
      <MultiSelectTags tags={categoryTags} title='类别' onTagChange={tags => updateLabelData('categoryTags', tags)}/>
      <MultiSelectTags tags={cunFaTags} title='皴法' multiple='ture' onTagChange={tags => updateLabelData('cunFaTags', tags)}/>
      <MultiSelectTags tags={dianFaTags} title='点法' multiple='ture' onTagChange={tags => updateLabelData('dianFaTags', tags)}/>
      <MultiSelectTags tags={sheSeTags} title='设色' multiple='ture' onTagChange={tags => updateLabelData('sheSeTags', tags)}/>
      <MultiSelectTags tags={dianJingTags} title='点景' onTagChange={tags => updateLabelData('dianJingTags', tags)}/>
    </div>
  );
};

export default LabellingView;
