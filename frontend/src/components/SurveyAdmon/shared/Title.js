import React from 'react';
import styled from 'styled-components';
import FormattedMessage from './FormattedMessage';

const TitleStyle = styled.span`
  margin-left: 10px;
`;

function Title({ text, translate }) {
  return (
    <TitleStyle>
      {
        translate ?
          <FormattedMessage id={text} />
          :
          text
      }
    </TitleStyle>
  );
}
export default Title;
