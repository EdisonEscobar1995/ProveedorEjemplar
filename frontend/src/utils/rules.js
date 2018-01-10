const intValidation = { pattern: /^[0-9]+$/, message: 'Ingrese un valor entero' };
const emailMessage = 'Ingrese un correo electrónico válido';
const validateEmail = (values) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
