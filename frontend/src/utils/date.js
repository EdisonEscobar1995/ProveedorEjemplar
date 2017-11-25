import moment from 'moment';

const format = 'YYYY/MM/DD';

const getMomentDate = (dateString, formatDate = format) => (
  moment(dateString, formatDate)
);

export {
  format,
  getMomentDate,
};
