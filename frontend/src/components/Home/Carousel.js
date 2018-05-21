import React from 'react';
import { Carousel as CarouselResponsive } from 'react-responsive-carousel';
import styled from 'styled-components';

const CarouselResponsiveStyle = styled(CarouselResponsive)`
  & .carousel .slide {
    margin: auto 0;
  }

  & .carousel:hover .slide .legend {
    opacity: 1 !important;
  }

  & .legend {
    opacity: 0.15 !important;
  }

  & .legend:hover {
    opacity: 1 !important;
  }
`;

const Slider = styled.div`
  margin: auto 0;
  max-height: 60vh;
  overflow: auto;
`;

function Carousel({ data }) {
  return (
    <div>
      {data.document && data.document.length === 0 ? (
        <span>No hay imágenes configuradas.</span>
      ) : null}
      <CarouselResponsiveStyle
        showArrows={false}
        autoPlay
        infiniteLoop
        stopOnHover
        interval={data.rotationTime * 1000}
        showStatus={false}
      >
        {
          data.document && data.document.map(element => (
            <Slider key={element.id} >
              <img src={element.url} alt={element.name} />
              <div className="legend">
                <span>
                  {data.title}
                </span>
                <div>
                  <p>{data.content}</p>
                </div>
              </div>
            </Slider>
          ))
        }
      </CarouselResponsiveStyle>
    </div>
  );
}

export default Carousel;
