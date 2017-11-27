import React from 'react';
import {
  Row, Col, Form, Input, Select, Radio, Button, Icon, DatePicker,
} from 'antd';
import styled from 'styled-components';
import SubTitle from './SubTitle';
import Field from '../Supplier/Field';
import Upload from '../shared/Upload';

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
                  format,
                  rules = [],
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
                    const { fileList, onChange, onRemove } = current;
                    rowValue = (
                      <Field label={label}>
                        <Upload
                          datakey={key}
                          list={fileList}
                          disabled={disabled}
                          multiple
                          onChange={onChange}
                          onRemove={onRemove}
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
