
const dataForm = ({ data }) => [
  {
    key: 1,
    value: [
      {
        span: 12,
        type: 'title',
        value: 'Home',
        key: 'Home',
      },
    ],
  },
  {
    key: 1.1,
    value: [
      {
        span: 24,
        type: 'input',
        label: 'Id',
        key: 'id',
        value: data && data.id,
        style: { display: 'none' },
      },
      {
        span: 12,
        type: 'input',
        label: 'Tiempo de rotación (Seg)',
        key: 'rotationName',
        value: data && data.rotationTime,
        required: true,
      },
      {
        span: 12,
        type: 'input',
        label: 'Título',
        key: 'title',
        value: data && data.title,
        required: true,
      },
    ],
  },
  {
    key: 1.2,
    value: [
      {
        span: 24,
        type: 'textarea',
        label: 'Contenido',
        key: 'content',
        value: data && data.content,
      },
    ],
  },
  {
    key: 1.3,
    value: [
      {
        label: 'Imagen',
        span: 12,
        type: 'upload',
        name: 'file',
        key: 'document',
        fileList: data.images,
      },
    ],
  },
  {
    key: 1.4,
    value: [
      {
        span: 12,
        type: 'title',
        value: 'Información del Programa',
        key: 'programInformation',
      },
    ],
  },
  {
    key: 1.5,
    value: [
      {
        span: 24,
        type: 'textarea',
        label: ' ',
        key: 'informationProgram',
        value: data && data.informationProgram,
      },
    ],
  },
  {
    key: 1.6,
    value: [
      {
        span: 12,
        type: 'title',
        value: 'Información de la encuesta',
        key: 'poolInformation',
      },
    ],
  },
  {
    key: 1.7,
    value: [
      {
        span: 24,
        type: 'textarea',
        label: ' ',
        key: 'inputPoll',
        value: data && data.inputPoll,
      },
    ],
  },
  {
    key: 1.8,
    value: [
      {
        span: 12,
        type: 'title',
        value: 'Información General',
        key: 'generalInformation',
      },
    ],
  },
  {
    key: 1.9,
    value: [
      {
        span: 24,
        type: 'inputNumber',
        label: 'Tamaño total de los archivos (MB)',
        key: 'uploadMaxFilesize',
        value: data && data.uploadMaxFilesize,
        required: true,
      },
    ],
  },
  {
    key: 2,
    justify: 'center',
    value: [
      {
        span: 4,
        type: 'button',
        label: 'Limpiar',
        key: 'cancel',
        buttonType: 'primary',
        handleclick: '',
      }, {
        span: 4,
        type: 'button',
        label: 'Guardar',
        key: 'save',
        buttonType: 'primary',
        htmlType: 'submit',
      },
    ],
  },
];

export default dataForm;
