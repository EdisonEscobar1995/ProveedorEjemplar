import React, { Component } from 'react';
import { Upload as UploadAnt } from 'antd';
import styled from 'styled-components';
import message from './Message';
import UploadButton from './UploadButton';

const UploadStyle = styled(UploadAnt)`
  .anticon-cross  {
    border-radius: 100px;
    background: ${props => props.theme.color.primary};
    width: 20px;
    height: 20px;
    color: white;
  }
  
  .ant-upload-list-item {
    height: auto;
  }
  
  .ant-upload-list-item-name {
    white-space: normal;
  }
`;

class Upload extends Component {
  onChange = (info) => {
    const { file } = info;
    const messageConfig = { text: '', type: 'error' };
    if (file.status === 'done') {
      const { status, data } = file.response;
      if (status) {
        messageConfig.text = `${file.name} archivo cargado exitosamente`;
        messageConfig.type = 'success';
        message(messageConfig);
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(data, this.props.datakey);
        }
      } else {
        messageConfig.text = `${file.name} fallo en la carga`;
        message(messageConfig);
      }
    } else if (file.status === 'error') {
      messageConfig.text = `${file.name} fallo en la carga`;
      message(messageConfig);
    } else if (file.status === 'removed') {
      const onRemove = this.props.onRemove;
      if (onRemove && !this.props.disabled) {
        const response = file.response;
        let id;
        if (response) {
          id = response.data.id;
        } else {
          id = file.uid;
        }
        onRemove(id, this.props.datakey);
      }
    } else {
      this.props.onChange();
    }
  }
  beforeUpload = (file) => {
    const max = this.props.max;
    if (max) {
      if (this.props.list.length >= max) {
        message({ text: `El maximo número de archivos es ${max}`, type: 'error' });
        return false;
      }
    }
    const nameFile = file.name.split('.');
    const nameExtension = nameFile[nameFile.length - 1];
    const extension = `.${nameExtension}`;
    if (this.props.uploadExtensions.indexOf(extension) < 0) {
      message({ text: `Extensión ${extension} no válida`, type: 'error' });
      return false;
    }
    const uploadMaxFilesize = this.props.uploadMaxFilesize;
    const isValidSize = file.size / 1024 / 1024 < uploadMaxFilesize;
    if (!isValidSize) {
      message({ text: `El archivo debe ser menor a ${uploadMaxFilesize} MB`, type: 'error' });
    }
    return isValidSize;
  }
  render() {
    const {
      children,
      list,
      disabled,
      multiple,
      baseUrl,
    } = this.props;
    const content = children || <UploadButton />;
    let { uploadExtensions } = this.props;
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
      <UploadStyle
        defaultFileList={value}
        action={baseUrl}
        disabled={disabled}
        accept={uploadExtensions.join(',')}
        multiple={multiple}
        beforeUpload={this.beforeUpload}
        onChange={this.onChange}
      >
        {
          !disabled ?
            content
            :
            null
        }
      </UploadStyle>
    );
  }
}
export default Upload;
