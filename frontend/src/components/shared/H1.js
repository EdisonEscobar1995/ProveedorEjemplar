import React from 'react';
import styled from 'styled-components';
import FormattedMessage from './FormattedMessage';

const H1Style = styled.h1`
  color: ${props => props.theme.color.primary};
  margin-bottom: ${props => props.theme.spaces.main};
`;

function H1({ text, translate }) {
  return (
    <H1Style>
      {
        translate ?
          <FormattedMessage id={text} />
          :
          text
      }
    </H1Style>
  );
}
export default H1;
