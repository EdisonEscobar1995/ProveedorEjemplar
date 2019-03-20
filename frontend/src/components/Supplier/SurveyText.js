import React from 'react';
import styled from 'styled-components';
import FormattedMessage from '../shared/FormattedMessage';

const TitleStyle = styled.h1`  
  color: ${props => props.theme.color.primary};
  text-transform: uppercase;
  display: inline-block;
  margin-left: 30px;
  font-size: 40px;
`;
const DeadlineStyle = styled.h6`  
  display: inline-block;
  font-size: 20px;
`;
const ContainerStyle = styled.div`  
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  justify-content: space-between;
`;

function SurveyText(props) {
  return (
    <ContainerStyle>
      <div>
        <img src="assets/images/SurveyIcon.png" alt="survey" />
        <TitleStyle>
          <FormattedMessage id="Survey.title" />
        </TitleStyle>
      </div>
      <div>
        {
          props.deadline && (
            <DeadlineStyle>
              <FormattedMessage id="Survey.deadline" /><span>{props.deadline}</span>
            </DeadlineStyle>
          )
        }
      </div>
    </ContainerStyle>
  );
}
export default SurveyText;
