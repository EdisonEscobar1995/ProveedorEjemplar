import React from 'react';
import { Upload as UploadAnt } from 'antd';
import message from './Message';

function Upload(props) {
  const {
    children,
    list,
    disabled,
    multiple,
    uploadMaxFilesize,
    datakey,
    baseUrl,
    max,
    onChange,
    onRemove,
  } = props;
  let { uploadExtensions } = props;
  if (!uploadExtensions) {
    uploadExtensions = [];
  }
  let value = [];
  if (list) {
    value = list.map(file => (
      {
        uid: file.id,
        url: file.url,
        name: file.name,
        disabled,
      }
    ));
  }
  return (
    <UploadAnt
      action={baseUrl}
      disabled={disabled}
      accept={uploadExtensions.join(',')}
      showUploadList={value.length > 0}
      multiple={multiple}
      beforeUpload={(file) => {
        if (max) {
          if (list.length >= max) {
            message({ text: `El maximo número de archivos es ${max}`, type: 'error' });
            return false;
          }
        }
        const nameFile = file.name.split('.');
        const nameExtension = nameFile[nameFile.length - 1];
        const extension = `.${nameExtension}`;
        if (uploadExtensions.indexOf(extension) < 0) {
          message({ text: `Extensión ${extension} no válida`, type: 'error' });
          return false;
        }
        const isValidSize = file.size / 1024 / 1024 < uploadMaxFilesize;
        if (!isValidSize) {
          message({ text: `El archivo debe ser menor a ${uploadMaxFilesize} MB`, type: 'error' });
        }
        return isValidSize;
      }}
      onChange={(info) => {
        const { file } = info;
        const messageConfig = { text: '', type: 'error' };
        if (file.status === 'done') {
          const { status, data } = file.response;
          if (status) {
            messageConfig.text = `${file.name} archivo cargado exitosamente`;
            messageConfig.type = 'success';
            message(messageConfig);
            if (onChange) {
              onChange(data, datakey);
            }
          } else {
            messageConfig.text = `${file.name} fallo en la carga`;
            message(messageConfig);
          }
        } else if (file.status === 'error') {
          messageConfig.text = `${file.name} fallo en la carga`;
          message(messageConfig);
        }
      }}
      onRemove={(file) => {
        if (!disabled) {
          if (onRemove) {
            const response = file.response;
            let id;
            if (response) {
              id = response.data.id;
            } else {
              id = file.uid;
            }
            onRemove(id, datakey);
          }
        }
        return false;
      }}
      defaultFileList={value}
    >
      {
        !disabled ?
          children
          :
          ''
      }
    </UploadAnt>
  );
}
export default Upload;
