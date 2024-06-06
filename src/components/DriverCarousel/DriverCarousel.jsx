// DriverCarousel.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DriverCarousel.css';

const DriverCarousel = ({ images }) => {
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

export default DriverCarousel;
