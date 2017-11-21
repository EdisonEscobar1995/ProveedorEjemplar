import React from 'react';
import styled from 'styled-components';

const SubTitleStyle = styled.h3`
  color: ${props => props.theme.color.primary};
  margin-bottom:  ${props => props.theme.spaces.main};
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
