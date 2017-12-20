import React from 'react';
import styled from 'styled-components';
import FormattedMessage from './FormattedMessage';

const SubTitleStyle = styled.h3`
  color: ${props => props.theme.color.primary};
  margin-bottom:  ${props => props.theme.spaces.main};
`;

function SubTitle({ text }) {
  return (
    <SubTitleStyle>
      <FormattedMessage id={text} />
    </SubTitleStyle>
  );
}
export default SubTitle;
