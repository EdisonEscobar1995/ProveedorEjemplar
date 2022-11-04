import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';

function FormattedMessage({ id }) {
  return (
    <FormattedHTMLMessage id={id} defaultMessage={id} />
  );
}
export default FormattedMessage;
