import React from 'react';
import data from '../data.json'; // Import your JSON data here

function ExportButton() {
  const handleDownload = () => {
    // Convert JSON data to a Blob object
    const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    // Create a URL for the Blob object
    const url = URL.createObjectURL(jsonBlob);

    // Create an anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Set the filename for the downloaded file
    document.body.appendChild(a);

    // Trigger a click event on the anchor element
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <button className="button" onClick={handleDownload}>Export JSON</button>
  );
}

export default ExportButton;
