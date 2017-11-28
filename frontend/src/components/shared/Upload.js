import React from 'react';
import { Upload as UploadAnt } from 'antd';
import message from './Message';


function Upload(props) {
  const {
    children,
    list,
    disabled,
    multiple,
    uploadExtensions,
    uploadMaxFilesize,
    datakey,
    baseUrl,
    onChange,
    onRemove,
  } = props;
  const value = list.map(file => (
    {
      uid: file.id,
      url: file.url,
      name: file.name,
      disabled,
    }
  ));
  return (
    <UploadAnt
      defaultFileList={value}
      action={baseUrl}
      disabled={disabled}
      accept={uploadExtensions.join(',')}
      multiple={multiple}
      beforeUpload={(file) => {
        const isValidSize = file.size / 1024 / 1024 < uploadMaxFilesize;
        if (!isValidSize) {
          message({ text: `El archivo debe ser menor a ${uploadMaxFilesize} MB`, type: 'error' });
          message.error('Image must smaller than 2MB!');
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
        if (onRemove) {
          onRemove(file.uid, datakey);
        }
      }}
    >
      {
        children
      }
    </UploadAnt>
  );
}
export default Upload;
