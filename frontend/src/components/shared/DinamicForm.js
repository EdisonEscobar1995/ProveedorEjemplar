import React from 'react';
import {
  Row, Col, Form, Input, Select, Radio, Upload, Button, Icon, DatePicker,
} from 'antd';
import styled from 'styled-components';
import SubTitle from './SubTitle';
import Field from '../Supplier/Field';
import message from '../shared/Message';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Group } = Radio;
const { MonthPicker } = DatePicker;

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
                let { label, span } = current;
                const {
                  key,
                  type,
                  inputType,
                  options,
                  value,
                  required,
                  handleChange,
                  disabled,
                } = current;
                label = label ? `${label}${required ? '(*)' : ''}` : '';
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
                        fieldContent = <MonthPicker disabled={disabled} format={'YYYY'} style={{ width: '100%' }} />;
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
                            allowClear
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
                            rules: [{ required, message: 'Por favor diligencia el campo' }],
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
                    const { name, action, headers, onChange } = current;
                    rowValue = (
                      <Field label={label}>
                        <Upload
                          name={name}
                          action={action}
                          disabled={disabled}
                          accept=".doc, .png, .jpg, .jpeg, .pdf, .ppt"
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
                                  console.log(info);
                                  onChange(data);
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
                          headers={headers}
                          multiple
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
