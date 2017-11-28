import React from 'react';
import {
  Row, Col, Form, Input, Select, Radio, Button, Icon, DatePicker,
} from 'antd';
import styled from 'styled-components';
import SubTitle from './SubTitle';
import Field from '../Supplier/Field';
import Upload from '../shared/Upload';
import baseUrl from '../../utils/api';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Group } = Radio;

const ParagraphStyle = styled.p`
  margin-bottom: ${props => props.theme.spaces.main};
`;

function DinamicForm({ content, getFieldDecorator, setFields }) {
  return (
    <div>
      {
        content.map(item => (
          <Row key={item.key} align="middle">
            {
              item.value.map((current) => {
                let rowValue;
                let { label, span, allowClear, options } = current;
                const {
                  key,
                  type,
                  inputType,
                  value,
                  required,
                  handleChange,
                  disabled,
                  format,
                  rules = [],
                } = current;
                allowClear = allowClear === undefined ? true : allowClear;
                label = label ? `${label}${required ? '(*)' : ''}` : '';
                options = options || [];
                span = span || 24;
                switch (type) {
                  case 'date':
                  case 'input':
                  case 'textarea':
                  case 'radio':
                  case 'select': {
                    let fieldContent;
                    switch (type) {
                      case 'date': {
                        fieldContent = <DatePicker disabled={disabled} style={{ width: '100%' }} format={format} />;
                        break;
                      }
                      case 'input':
                        fieldContent = <Input disabled={disabled} type={inputType || 'text'} />;
                        break;
                      case 'textarea':
                        fieldContent = <TextArea disabled={disabled} />;
                        break;
                      case 'select': {
                        const { valuesToClean, mode } = current;
                        fieldContent = (
                          <Select
                            disabled={disabled}
                            showSearch
                            mode={mode}
                            allowClear={allowClear}
                            notFoundContent="No se encontraron resultados"
                            onChange={(selectValue) => {
                              if (valuesToClean) {
                                setFields(valuesToClean);
                              }
                              if (handleChange) {
                                handleChange(selectValue);
                              }
                            }}
                          >
                            {
                              options.map(option => (
                                <Option key={option.id} value={option.id}>{option.name}</Option>
                              ))
                            }
                          </Select>);
                      }
                        break;
                      case 'radio':
                        fieldContent = (<Group disabled={disabled}>
                          {
                            options.map(option => (
                              <Radio key={option.id} value={option.id}>{option.name}</Radio>
                            ))
                          }
                        </Group>);
                        break;
                      default:
                        fieldContent = '';
                        break;
                    }
                    rowValue = (
                      <Field label={label}>
                        <Item>
                          {getFieldDecorator(key, {
                            rules: [
                              { required, message: 'Por favor diligencia el campo' },
                              ...rules,
                            ],
                            initialValue: value,
                          })(
                            fieldContent,
                          )}
                        </Item>
                      </Field>
                    );
                    break;
                  }
                  case 'title':
                    rowValue = (
                      <SubTitle text={value} />
                    );
                    break;
                  case 'upload': {
                    const {
                      fileList,
                      sizeAllowed,
                      onChange,
                      onRemove,
                      uploadMaxFilesize,
                      uploadExtensions,
                    } = current;
                    rowValue = (
                      <Field label={label}>
                        <Upload
                          datakey={key}
                          list={fileList}
                          disabled={disabled}
                          multiple
                          uploadExtensions={uploadExtensions}
                          uploadMaxFilesize={uploadMaxFilesize}
                          sizeAllowed={sizeAllowed}
                          onChange={onChange}
                          onRemove={onRemove}
                          baseUrl={baseUrl}
                        >
                          <Button disabled={disabled}>
                            <Icon type="upload" />Adjuntar archivo
                          </Button>
                        </Upload>
                      </Field>
                    );
                  }
                    break;
                  default:
                    rowValue = (<ParagraphStyle>{value}</ParagraphStyle>);
                    break;
                }
                return (
                  <Col xs={24} sm={24} md={24} lg={span} key={key}>
                    {
                      rowValue
                    }
                  </Col>
                );
              })
            }
          </Row>
        ))
      }
    </div>
  );
}
export default DinamicForm;
