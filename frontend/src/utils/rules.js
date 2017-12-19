const intValidation = { pattern: /^[0-9]+$/, message: 'Ingrese un valor entero' };
const emailMessage = 'Ingrese un correo electrónico válido';
const validateEmail = (values) => {
  const regex = /^[a-zA-Z0-9\\.]+@[a-zA-Z0-9]+(\\-)?[a-zA-Z0-9]+(\.)?[a-zA-Z0-9]{2,6}?\.[a-zA-Z]{2,6}$/;
  let resultTotal = true;
  values.forEach((element) => {
    const result = regex.test(element);
    resultTotal = resultTotal && result;
  });
  return resultTotal;
};

const mailValitationMultiple = {
  validator: (rule, values, cb) => {
    const resultTotal = validateEmail(values);
    if (!resultTotal) {
      cb(emailMessage);
    }
    cb();
  },
};

const mailValitation = {
  validator: (rule, values, cb) => {
    const resultTotal = validateEmail([values]);
    if (!resultTotal) {
      cb(emailMessage);
    }
    cb();
  },
};
export {
  intValidation,
  mailValitation,
  mailValitationMultiple,
};
