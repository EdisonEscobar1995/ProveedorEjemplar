import React from 'react';
import { Upload as UploadAnt } from 'antd';
import message from './Message';


function Upload(props) {
  const { children, list, disabled, multiple, datakey, onChange, onRemove } = props;
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
      action="http://saescudero.cognox.com/Aplicaciones/ProveedorEjemplar/exemplaryProvider.nsf/xsp/Attachment?action=save"
      disabled={disabled}
      accept=".doc, .png, .jpg, .jpeg, .pdf, .ppt"
      multiple={multiple}
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
