import React from 'react';
import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);
// import styled from 'styled-components';
// import { Col, Row, Carousel } from 'antd';

// const H3 = styled.h3`
//   color: ${props => props.theme.color.primary};
//   margin-bottom: ${props => props.theme.spaces.main};
//   font-weight: bold;
// `;

// const CarouselStyle = styled(Carousel)`
//   & .slick-track {
//     width: 90% !important;
//   }
//   text-align: center;
//   height: 513px;
//   line-height: 513px;
//   overflow: hidden;
// `;

// const Linea = styled.div`
//   border: 1px solid #37907c7a;
// `;

function HomeContainer() {
  return (
    // <Row>
    //   <Col span={12}>
    //     <H3>Galería de imágenes</H3>
    //     <CarouselStyle>
    //       <img src="assets/images/1.jpg" alt="1" />
    //       <img src="assets/images/2.jpg" alt="1" />
    //       <img src="assets/images/3.jpg" alt="1" />
    //     </CarouselStyle>
    //   </Col>
    //   {/* <Col span={12}>
    //     <Card>
    //       <H3>Porcentaje de avance</H3>
    //     </Card>
    //   </Col> */}
    // </Row>

    <PieChart donut data={{ Blueberry: 44, Strawberry: 23 }} />
  );
}

export default HomeContainer;
