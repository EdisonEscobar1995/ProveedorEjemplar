import React from 'react';
import { Row, Col, Form, Input, Select, Upload, Button, Icon } from 'antd';
import SubTitle from '../shared/SubTitle';
import Field from './Field';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

function DinamicForm({ content, getFieldDecorator }) {
  return (
    <div>
      {
        content.map(item => (
          <Row key={item.key}>
            {
              item.value.map((current) => {
                let rowValue;
                const { label, key, span, type, options, value } = current;
                switch (type) {
                  case 'input':
                    rowValue = (
                      <Field label={label}>
                        <Item>
                          {getFieldDecorator(key, {
                            rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                            <Input />,
                          )}
                        </Item>
                      </Field>
                    );
                    break;
                  case 'textarea':
                    rowValue = (
                      <Field label={label}>
                        <Item>
                          {getFieldDecorator(key, {
                            rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                            <TextArea />,
                          )}
                        </Item>
                      </Field>
                    );
                    break;
                  case 'select':
                    rowValue = (
                      <Field label={label}>
                        <Item>
                          {getFieldDecorator(key, {
                            rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                            <Select
                              showSearch
                              allowClear
                              notFoundContent="No se encontraron resultados"
                            >
                              {
                                options.map(option => (
                                  <Option key={option.id} value={option.id}>{option.text}</Option>
                                ))
                              }
                            </Select>,
                          )}
                        </Item>
                      </Field>
                    );
                    break;
                  case 'title':
                    rowValue = (
                      <SubTitle text={value} />
                    );
                    break;
                  case 'upload':
                    rowValue = (
                      <Field label={label}>
                        <Upload>
                          <Button>
                            <Icon type="upload" />Adjuntar archivo
                          </Button>
                        </Upload>
                      </Field>
                    );
                    break;
                  default:
                    rowValue = (<p>{value}</p>);
                    break;
                }
                return (
                  <Col key={key} span={span}>
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
