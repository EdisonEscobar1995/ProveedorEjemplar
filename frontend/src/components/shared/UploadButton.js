import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import FormattedMessage from './FormattedMessage';

const ButtonStyle = styled(Button)`
  font-weight: normal;
  background-color: ${props => props.theme.color.secondary};
  color: ${props => props.theme.color.normal};
  &:hover, :focus {
    background-color: ${props => props.theme.color.secondary};
    color: ${props => props.theme.color.normal};
    border-color: ${props => props.theme.color.secondary};
  }
`;

function UploadButton({ disabled }) {
  return (
    <ButtonStyle icon="upload" disabled={disabled}>
      <FormattedMessage id="Button.uploadFile" />
    </ButtonStyle>
  );
}
export default UploadButton;
