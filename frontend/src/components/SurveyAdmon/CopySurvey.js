import React from 'react';
import copySurveyData from './copySurveyData';
import GenericForm from '../shared/GenericForm';

function CopySurvey(props) {
  return (
    <GenericForm
      {...props}
      formData={copySurveyData}
      submitMethod={props.copySurvey}
      validate
    />
  );
}
export default CopySurvey;
