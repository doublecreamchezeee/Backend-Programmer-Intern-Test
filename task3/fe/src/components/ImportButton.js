import React, { useRef } from 'react';

function ImportButton({ onUpload }) {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        onUpload(contents);
      };
      reader.readAsText(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
      <button className='button' onClick={handleBrowseClick}>Import JSON</button>
    </div>
  );
}

export default ImportButton;
