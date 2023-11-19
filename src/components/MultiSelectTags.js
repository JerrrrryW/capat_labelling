import React, { useState } from 'react';

const MultiSelectTags = ({ title = "请选择", tags, multiple = false, onTagChange }) => {
  // 状态管理选中的标签
  const [selectedTags, setSelectedTags] = useState([]);

  // 处理标签点击事件
  const handleTagClick = tag => {
    let updatedSelectedTags;
    if (multiple) {
      // 多选逻辑
      updatedSelectedTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag];
    } else {
      // 单选逻辑
      updatedSelectedTags = selectedTags[0] === tag ? [] : [tag];
    }
    setSelectedTags(updatedSelectedTags);

    // 如果提供了onTagChange回调，当选中的标签发生变化时调用它
    if (onTagChange) {
      onTagChange(updatedSelectedTags);
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
              border: selectedTags.includes(tag) ? '2px solid chocolate' : '1px solid grey',
              backgroundColor: selectedTags.includes(tag) ? '#ffe9d0' : 'white',
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
