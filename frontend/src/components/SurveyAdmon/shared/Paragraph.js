import React from 'react';
import styled from 'styled-components';
import FormattedMessage from './FormattedMessage';

const ParagraphStyle = styled.p`
  margin-bottom:  ${props => props.theme.spaces.main};
`;

function Paragraph({ text, translate }) {
  return (
    <ParagraphStyle>
      {
        translate ?
          <FormattedMessage id={text} />
          :
          text
      }
    </ParagraphStyle>
  );
}
export default Paragraph;
