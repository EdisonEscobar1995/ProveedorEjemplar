import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.h1`  
  color: ${props => props.theme.color.primary};
  text-transform: uppercase;
  display: inline-block;
  margin-left: 30px;
  font-size: 40px;
`;
const ContainerStyle = styled.div`  
  display: flex;
  align-items:center;
  margin-bottom: 30px;
`;

function SurveyText() {
  return (
    <ContainerStyle>
      <img src="assets/images/SurveyIcon.png" alt="survey" />
      <TitleStyle>
        Encuesta
      </TitleStyle>
    </ContainerStyle>
  );
}
export default SurveyText;
