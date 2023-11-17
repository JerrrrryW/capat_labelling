import React, { useState } from 'react';

const MultiSelectTags = ({ title = "请选择", tags, multiple = false }) => {
  // 状态管理选中的标签
  const [selectedTags, setSelectedTags] = useState([]);

  // 处理标签点击事件
  const handleTagClick = tag => {
    if (multiple) {
      // 多选逻辑
      setSelectedTags(prevSelectedTags =>
        prevSelectedTags.includes(tag)
          ? prevSelectedTags.filter(t => t !== tag)
          : [...prevSelectedTags, tag]
      );
    } else {
      // 单选逻辑
      setSelectedTags(prevSelectedTags =>
        prevSelectedTags[0] === tag ? [] : [tag]
      );
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            style={{
              margin: '5px',
              padding: '5px',
              border: selectedTags.includes(tag) ? '2px solid blue' : '1px solid grey',
              backgroundColor: selectedTags.includes(tag) ? 'lightblue' : 'white',
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectTags;
