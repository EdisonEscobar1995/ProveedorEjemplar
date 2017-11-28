import React from 'react';

function StepLink({ children, onClick }) {
  return (
    <a
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {
        children
      }
    </a>
  );
}
export default StepLink;
