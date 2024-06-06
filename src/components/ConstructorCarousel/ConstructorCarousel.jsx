// ConstructorCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../DriverCarousel/DriverCarousel.css';

const ConstructorCarousel = ({ constructorId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (constructorId) {
      const imagePaths = [
        `/images/${constructorId}/${constructorId}_1.jpg`,
        `/images/${constructorId}/${constructorId}_2.jpg`,
        `/images/${constructorId}/${constructorId}_3.jpg`
      ];
      setImages(imagePaths);
    }
  }, [constructorId]);

  return (
    <div className="driver-carousel-container">
      <Carousel className="driver-carousel">
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ConstructorCarousel;
