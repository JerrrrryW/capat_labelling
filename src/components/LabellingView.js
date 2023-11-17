import React from 'react';
import MultiSelectTags from './MultiSelectTags.js';

const LabellingView = () => {
  // 画作整体特征标签
  const compositionTags = [
    '三叠式构图', '两段式构图', '倒景式构图', '截景式构图', 'S形构图', 
    'C形构图', '之字形构图', '甲字形构图', '由字形构图', '则字形构图', 
    '须字形构图', '三角形构图', '对角线构图', '全景式构图'
  ];  
  const materialTags = ['绢本', '纸本', '泥金', '缂丝'];

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
  const dianJingTags = ['是', '否'];

  return (
    <div>
      <h2>画作整体特征</h2>
      <MultiSelectTags tags={compositionTags} title='构图' />
      <MultiSelectTags tags={materialTags} title='材质' />

      <h2>局部切片特征</h2>
      <MultiSelectTags tags={categoryTags} title='类别' />
      <MultiSelectTags tags={cunFaTags} title='皴法' multiple='ture'/>
      <MultiSelectTags tags={dianFaTags} title='点法' multiple='ture'/>
      <MultiSelectTags tags={sheSeTags} title='设色' multiple='ture'/>
      <MultiSelectTags tags={dianJingTags} title='点景' />
    </div>
  );
};

export default LabellingView;
