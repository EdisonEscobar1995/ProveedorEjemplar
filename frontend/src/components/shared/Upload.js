import React, { Component } from 'react';
import { Upload as UploadAnt } from 'antd';
import styled from 'styled-components';
import message from './message';
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

const validateSpecialCharacter = (str) => {
  const from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛ%&$';
  const to = 'AAAAAEEEEIIIIOOOOUUUU%&$';
  const mapping = {};

  for (let i = 0, j = from.length; i < j; i += 1) {
    mapping[from.charAt(i)] = to.charAt(i);
  }
  let validate = false;
  for (let i = 0, j = str.length; i < j; i += 1) {
    if (Object.prototype.hasOwnProperty.call(mapping, str.charAt(i))) {
      validate = true;
    }
  }
  return validate;
};

const mapValue = (list, disabled) => {
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
  return value;
};

class Upload extends Component {
  state = {
    listValue: mapValue(this.props.list, this.props.disabled),
    key: this.props.datakey,
  }

  onRemove = (file) => {
    const onRemove = this.props.onRemove;
    if (onRemove && !this.props.disabled) {
      onRemove(file.uid, this.props.datakey);
      const unique = this.props.unique;
      if (unique) {
        this.setState({ listValue: [] });
      }
    }
  }
  onChange = (info, setFields = null) => {
    if (info.file.status) {
      let fileList;
      const unique = this.props.unique;
      if (unique) {
        fileList = [info.file];
      } else {
        fileList = info.fileList;
      }
      const messageConfig = { text: '', type: 'error' };
      if (info.file.status === 'done') {
        fileList = fileList.map((file) => {
          if (file.response) {
            const { status, data } = file.response;
            if (status) {
              // messageConfig.text = 'Validation.successUpload';
              // messageConfig.type = 'success';
              // messageConfig.aditionalInfo = file.name;
              // message(messageConfig);
              file.url = data.url;
              file.uid = data.id;
              file.name = file.name;
            }
          }
          return file;
        });
        fileList = fileList.filter((file) => {
          if (file.response) {
            const { status } = file.response;
            return status;
          }
          return true;
        });
        const { listValue } = this.state;
        const onChange = this.props.onChange;
        if (onChange) {
          if (unique) {
            onChange(fileList.map(item => ({ id: item.uid })), this.props.datakey, listValue);
          } else {
            onChange(listValue.map(item => ({ id: item.uid })), this.props.datakey, listValue);
          }
        }
      } else if (info.file.status === 'error') {
        messageConfig.text = 'Validation.uploadFail';
        message(messageConfig);
      }
      if (setFields && info.file.status === 'removed') {
        setFields({
          [this.state.key]: {
            value: fileList,
          },
        });
      }
      this.setState({ listValue: fileList });
    }
  }
  beforeUpload = (file) => {
    const max = this.props.max;
    if (max) {
      if (this.state.listValue.length >= max) {
        message({ text: 'Validation.maxFilesNumber', aditionalInfo: max, type: 'error' });
        return false;
      }
    }
    const nameFile = file.name.split('.');
    const nameExtension = nameFile[nameFile.length - 1];
    const extension = `.${nameExtension}`;
    if (validateSpecialCharacter(file.name)) {
      message({ text: 'Validation.validNameFile', type: 'error' });
      return false;
    }
    if (this.props.uploadExtensions.indexOf(extension) < 0
      && this.props.uploadExtensions.indexOf(extension.toLowerCase()) < 0) {
      message({ text: 'Validation.validExtension', type: 'error' });
      return false;
    }
    const uploadMaxFilesize = this.props.uploadMaxFilesize;
    const isValidSize = file.size / 1024 / 1024 < uploadMaxFilesize;
    if (!isValidSize) {
      message({
        text: 'Validation.maxFileSize',
        aditionalInfo: `${uploadMaxFilesize} MB`,
        type: 'error',
      });
    }
    return isValidSize;
  }
  render() {
    const {
      children,
      disabled,
      multiple,
      baseUrl,
      setFields = null,
    } = this.props;
    const content = children || <UploadButton />;
    let { uploadExtensions } = this.props;
    if (!uploadExtensions) {
      uploadExtensions = [];
    }
    return (
      <UploadStyle
        action={baseUrl}
        disabled={disabled}
        accept={uploadExtensions.join(',')}
        multiple={multiple}
        showUploadList={{ showRemoveIcon: !disabled }}
        beforeUpload={this.beforeUpload}
        onChange={info => this.onChange(info, setFields)}
        onRemove={this.onRemove}
        fileList={this.state.listValue}
        defaultFileList={this.state.listValue}
      >
        {
          !disabled && content
        }
      </UploadStyle>
    );
  }
}

Upload.defaultProps = {
  unique: false,
};

export default Upload;
