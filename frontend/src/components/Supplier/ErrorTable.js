import React from 'react';
import styled from 'styled-components';

const ErrorStyle = styled.p`
  color: ${props => props.theme.color.error};
`;
function ErrorTable({ visible = false, text = '' }) {
  let content = '';
  if (visible) {
    content = (
      <ErrorStyle>
        {
          text
        }
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
