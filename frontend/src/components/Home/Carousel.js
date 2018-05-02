import React from 'react';
import { Carousel as CarouselResponsive } from 'react-responsive-carousel';

function Carousel({ data }) {
  return (
    <div>
      {data.document && data.document.length === 0 ? (
        <span>No hay imágenes configuradas.</span>
      ) : null}
      <CarouselResponsive
        showArrows
        autoPlay
        infiniteLoop
        stopOnHover
        interval={data.rotationTime * 1000}
        showStatus={false}
      >
        {
          data.document && data.document.map(element => (
            <div key={element.id}>
              <img src={element.url} alt={element.name} />
              <div className="legend">
                <span>
                  {data.title}
                </span>
                <div>
                  <p>{data.content}</p>
                </div>
              </div>
            </div>
          ))
        }
      </CarouselResponsive>
    </div>
  );
}

export default Carousel;
