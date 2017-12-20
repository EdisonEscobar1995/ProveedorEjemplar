import React from 'react';
import styled from 'styled-components';
import FormattedMessage from '../shared/FormattedMessage';

const ErrorStyle = styled.p`
  color: ${props => props.theme.color.error};
`;
function ErrorTable({ visible = false, text = 'Survey.error' }) {
  let content = '';
  if (visible) {
    content = (
      <ErrorStyle>
        <FormattedMessage id={text} />
      </ErrorStyle>
    );
  }
  return (
    <div>
      {
        content
      }
    </div>
  );
}
export default ErrorTable;
