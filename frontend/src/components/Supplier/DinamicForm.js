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
                const { label, key, span, type, inputType, options, value, required } = current;
                switch (type) {
                  case 'input':
                  case 'textarea':
                  case 'select': {
                    let fieldContent;
                    switch (type) {
                      case 'input':
                        fieldContent = <Input type={inputType || 'text'} />;
                        break;
                      case 'textarea':
                        fieldContent = <TextArea />;
                        break;
                      case 'select':
                        fieldContent = (<Select
                          showSearch
                          allowClear
                          notFoundContent="No se encontraron resultados"
                        >
                          {
                            options.map(option => (
                              <Option key={option.id} value={option.id}>{option.text}</Option>
                            ))
                          }
                        </Select>);
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
                  case 'upload':
                    rowValue = (
                      <Field label={label}>
                        <Upload
                          accept=".doc, .png, .jpg, .jpeg, .pdf, .ppt"
                        >
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
