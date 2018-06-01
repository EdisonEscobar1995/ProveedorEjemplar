
const dataForm = ({ data, updateAttachment, form, cleanFields, deleteAttachment }) => {
  const uploadExtensions = [
    '.jpg',
    '.png',
    '.jpeg',
  ];

  const {
    uploadMaxFilesize,
    id,
    rotationTime,
    title,
    content,
    document,
    informationProgram,
    messageByChangeSizeCompany,
    inputPoll,
  } = data;

  const handleReset = () => {
    form.resetFields();
    cleanFields();
  };
  return [
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
          value: id,
          style: { display: 'none' },
        },
        {
          span: 12,
          type: 'input',
          label: 'Tiempo de rotación (Seg)',
          key: 'rotationTime',
          value: rotationTime,
          required: true,
        },
        {
          span: 12,
          type: 'input',
          label: 'Título',
          key: 'title',
          value: title,
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
          value: content,
          required: true,
          rules: [{
            max: 200,
            message: 'Máximo 200 caracteres',
          }],
        },
      ],
    },
    {
      key: 1.3,
      value: [
        {
          label: 'Imagen (600 x 480): Solo formatos PNG. JPG, JPEG',
          span: 12,
          type: 'upload',
          name: 'images',
          key: 'images',
          fileList: document,
          uploadMaxFilesize,
          uploadExtensions,
          onChange: updateAttachment,
          onRemove: deleteAttachment,
          required: true,
        },
      ],
    },
    {
      key: 1.4,
      value: [
        {
          span: 24,
          type: 'input',
          label: 'Cambio de tamaño de empresa',
          key: 'messageByChangeSizeCompany',
          value: messageByChangeSizeCompany,
          required: true,
          style: { marginTop: 20 },
        },
      ],
    },
    {
      key: 1.5,
      value: [
        {
          span: 24,
          type: 'textarea',
          label: 'Información del Programa',
          style: { marginTop: '20px' },
          key: 'informationProgram',
          value: informationProgram,
          required: true,
        },
      ],
    },
    {
      key: 1.7,
      value: [
        {
          span: 24,
          type: 'textarea',
          label: 'Información de la encuesta',
          key: 'inputPoll',
          value: inputPoll,
          required: true,
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
          value: uploadMaxFilesize,
          required: true,
        },
      ],
    },
    {
      key: 2,
      justify: 'center',
      value: [
        {
          span: 2,
          type: 'button',
          label: 'Limpiar',
          key: 'clear',
          buttonType: 'primary',
          handleclick: handleReset,
        },
        {
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
};


export default dataForm;
