// App.js
import React, { useState, useEffect } from 'react';
function App() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        const formattedImages = data.map(img => ({
          thumbnail: `https://picsum.photos/id/${img.id}/50/50`,
          fullsize: `https://picsum.photos/id/${img.id}/300/300`
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);


  const showFullSize = index => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-gallery">
      {/* Main Image */}
      {currentIndex !== null && (
        <div className="main-image">
          <img src={images[currentIndex].fullsize} alt="Main image" />
        </div>
      )}

      {/* Thumbnails */}
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.thumbnail}
            alt="Thumbnail"
            onClick={() => showFullSize(index)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;