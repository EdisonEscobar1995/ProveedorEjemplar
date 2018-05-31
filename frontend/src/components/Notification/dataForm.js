
const dataForm =
({
  dataOption,
  data,
  users,
  updateAttachment,
  getNotificationById,
  form,
  fetching,
  cleanData,
  getUsersByKey,
  deleteAttachment }) => {
  const uploadMaxFilesize = 10;
  const uploadExtensions = [
    '.jpg',
    '.png',
    '.jpeg',
  ];

  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue({ id: '' });
    cleanData();
  };

  const formData = [
    {
      key: 1.1,
      value: [
        {
          span: 24,
          type: 'select',
          options: data,
          label: 'Por favor seleccione la notificación a configurar',
          key: 'id',
          required: true,
          handleChange: getNotificationById,
          value: dataOption.id,
        },
      ],
    }];

  if (Object.keys(dataOption).length !== 0) {
    formData.splice(1, 0,
      {
        key: 1.2,
        value: [
          {
            span: 12,
            type: 'title',
            value: 'Notificación envío de correo a proveedores',
            key: 'generalInformation',
          },
        ],
      },
      {
        key: 1.3,
        value: [
          {
            label: 'Banner: (Adjuntar imágenes en formato PNG. JPG, JPEG)',
            span: 12,
            type: 'upload',
            name: 'idBanner',
            key: 'idBanner',
            style: { marginBottom: '20px' },
            fileList: [dataOption.banner],
            unique: true,
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
            label: 'Pie de página: (Adjuntar imágenes en formato PNG. JPG, JPEG)',
            span: 12,
            type: 'upload',
            name: 'idFooter',
            key: 'idFooter',
            style: { marginBottom: '20px' },
            fileList: [dataOption.footer],
            unique: true,
            uploadMaxFilesize,
            uploadExtensions,
            onChange: updateAttachment,
            onRemove: deleteAttachment,
            required: true,
          },
        ],
      },
      {
        key: 1.5,
        value: [
          {
            span: 24,
            type: 'input',
            label: 'Asunto',
            key: 'subject',
            value: dataOption.subject,
            required: true,
          },
        ],
      },
      {
        key: 1.6,
        value: [
          {
            span: 24,
            type: 'textarea',
            label: 'Mensaje',
            key: 'message',
            value: dataOption.message,
            required: true,
          },
        ],
      },
      {
        key: 1.7,
        value: [
          {
            span: 24,
            type: 'select',
            mode: 'multiple',
            autoComplete: true,
            options: users,
            label: 'Notificación adicional a',
            key: 'withCopy',
            value: dataOption.withCopy,
            required: true,
            onSearch: getUsersByKey,
            fetching,
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
      });
  }
  return formData;
};

export default dataForm;
