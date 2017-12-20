import React from 'react';
import { FormattedMessage as FormattedMessageIntl } from 'react-intl';

function FormattedMessage({ id }) {
  return (
    <FormattedMessageIntl id={id} defaultMessage="No found for label" />
  );
}
export default FormattedMessage;
