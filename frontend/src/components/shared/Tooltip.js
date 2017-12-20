import React from 'react';
import { Tooltip as TooltipAnt } from 'antd';
import FormattedMessage from './FormattedMessage';

function Tooltip({ children, title }) {
  return (
    <TooltipAnt title={<FormattedMessage id={title} />}>
      {children}
    </TooltipAnt>
  );
}
export default Tooltip;
