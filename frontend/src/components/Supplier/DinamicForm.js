import React from 'react';
import { Row, Col, Form, Input, Select, Radio, Upload, Button, Icon } from 'antd';
import styled from 'styled-components';
import SubTitle from '../shared/SubTitle';
import GenericForm from '../shared/GenericForm';
import Field from './Field';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Group } = Radio;

const ParagraphStyle = styled.p`
  margin-bottom: ${props => props.theme.spaces.main};
`;

function DinamicForm({ content, getFieldDecorator }) {
  return (
    <div>
      {
        content.map(item => (
          <Row key={item.key}>
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
                  colummns,
                  handleChange,
                  disabled,
                } = current;
                label = label ? `${label}${required ? '(*)' : ''}` : '';
                span = span || 24;
                switch (type) {
                  case 'input':
                  case 'textarea':
                  case 'radio':
                  case 'select': {
                    let fieldContent;
                    switch (type) {
                      case 'input':
                        fieldContent = <Input disabled={disabled} type={inputType || 'text'} />;
                        break;
                      case 'textarea':
                        fieldContent = <TextArea disabled={disabled} />;
                        break;
                      case 'select':
                        fieldContent = (
                          <Select
                            disabled={disabled}
                            showSearch
                            allowClear
                            notFoundContent="No se encontraron resultados"
                            onChange={handleChange}
                          >
                            {
                              options.map(option => (
                                <Option key={option.id} value={option.id}>{option.name}</Option>
                              ))
                            }
                          </Select>);
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
                  case 'table':
                    rowValue = (
                      <GenericForm
                        loading={false}
                        colummns={colummns}
                        data={[]}
                        actual={{}}
                      />
                    );
                    break;
                  case 'upload':
                    rowValue = (
                      <Field label={label}>
                        <Upload
                          disabled={disabled}
                          accept=".doc, .png, .jpg, .jpeg, .pdf, .ppt"
                        >
                          <Button disabled={disabled}>
                            <Icon type="upload" />Adjuntar archivo
                          </Button>
                        </Upload>
                      </Field>
                    );
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
