import React from 'react';
import styled from 'styled-components';

const SubTitleStyle = styled.h3`
  color: ${props => props.theme.color.primary}
`;

function SubTitle({ text }) {
  return (
    <SubTitleStyle>
      {
        text
      }
    </SubTitleStyle>
  );
}
export default SubTitle;
