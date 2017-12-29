import React from 'react';
import {
  Row, Col, Form, Input, InputNumber, Select, Radio, Button, DatePicker,
} from 'antd';
import styled from 'styled-components';
import SubTitle from './SubTitle';
import Field from '../Supplier/Field';
import Upload from '../shared/Upload';
import TableForm from '../shared/TableForm';
import FormattedMessage from '../shared/FormattedMessage';
import { baseUrl } from '../../utils/api';
import { getIntl } from '../../utils/translate';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Group } = Radio;
const message = getIntl().formatMessage({ id: 'Validation.requiredField' });

const ParagraphStyle = styled.p`
  margin-bottom: ${props => props.theme.spaces.main};
`;

const ItemStyle = styled(Item)`
  & .ant-form-item-control {
    line-height: 16px;
    color: ${props => props.theme.color.info};
  }
`;
const TextStyle = styled.div`
  text-align: justify;
`;
const InputNumberStyle = styled(InputNumber)`
  width: 100%;
`;

function DinamicForm({ content, getFieldDecorator, setFields }) {
  return (
    <div>
      {
        content.map(item => (
          <Row key={item.key} align="middle" type="flex" gutter={24}>
            {
              item.value.map((current) => {
                let rowValue;
                let { span, allowClear, options } = current;
                const {
                  key,
                  type,
                  label,
                  inputType,
                  value,
                  help,
                  required,
                  handleChange,
                  disabled,
                  format,
                  rules = [],
                  hidden,
                } = current;
                allowClear = allowClear === undefined ? true : allowClear;
                options = options || [];
                span = span || 24;
                switch (type) {
                  case 'date':
                  case 'input':
                  case 'inputNumber':
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
                        fieldContent = (
                          <Input
                            disabled={disabled}
                            type={inputType || 'text'}
                            onChange={(inputValue) => {
                              if (handleChange) {
                                handleChange(inputValue.target.value);
                              }
                            }}
                          />
                        );
                        break;
                      case 'inputNumber':
                        fieldContent = (
                          <InputNumberStyle
                            min={0}
                            disabled={disabled}
                            formatter={numberValue => ` ${numberValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            parser={numberValue => numberValue.replace(/\$\s?|(\.*)/g, '')}
                          />
                        );
                        break;
                      case 'textarea':
                        if (disabled) {
                          fieldContent = <TextStyle>{value}</TextStyle>;
                        } else {
                          fieldContent = <TextArea rows="4" disabled={disabled} />;
                        }
                        break;
                      case 'select': {
                        const { valuesToClean, mode, noSearch } = current;
                        if (!noSearch) {
                          fieldContent = (
                            <Select
                              disabled={disabled}
                              showSearch
                              mode={mode}
                              allowClear={allowClear}
                              filterOption={(input, option) => (
                                option.props.children.toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              )}
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
                                  <Option
                                    key={option.id}
                                    value={option.id}
                                  >
                                    <FormattedMessage id={option.name} />
                                  </Option>
                                ))
                              }
                            </Select>);
                        } else {
                          fieldContent = (
                            <Select
                              disabled={disabled}
                              showSearch
                              mode={mode}
                              allowClear={allowClear}
                              filterOption={selectValue => selectValue.startsWith(' ') || selectValue.endsWith(' ')}
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
                                  <Option
                                    key={option.id}
                                    value={option.id}
                                  >
                                    {option.name}
                                  </Option>
                                ))
                              }
                            </Select>);
                        }
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
                      <div>
                        {
                          !hidden ?
                            <Field label={label} help={help} required={required}>
                              <ItemStyle>
                                {getFieldDecorator(key, {
                                  rules: [
                                    { required, message },
                                    ...rules,
                                  ],
                                  initialValue: value,
                                })(
                                  fieldContent,
                                )}
                              </ItemStyle>
                            </Field>
                            :
                            null
                        }
                      </div>
                    );
                    break;
                  }
                  case 'title':
                    rowValue = (
                      <SubTitle text={value} />
                    );
                    break;
                  case 'table': {
                    const {
                      data,
                      colummns,
                      addData,
                      saveData,
                      editData,
                      deleteData,
                      cancelData,
                      loading,
                    } = current;
                    rowValue = (
                      <TableForm
                        data={data}
                        colummns={colummns}
                        addData={addData}
                        saveData={saveData}
                        editData={editData}
                        deleteData={deleteData}
                        cancelData={cancelData}
                        loading={loading}
                      />
                    );
                  }
                    break;
                  case 'upload': {
                    const {
                      fileList,
                      sizeAllowed,
                      max,
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
                          max={max}
                          uploadExtensions={uploadExtensions}
                          uploadMaxFilesize={uploadMaxFilesize}
                          sizeAllowed={sizeAllowed}
                          onChange={onChange}
                          onRemove={onRemove}
                          baseUrl={`${baseUrl}/Attachment?action=save`}
                        />
                      </Field>
                    );
                  }
                    break;
                  case 'button': {
                    const {
                      buttonType,
                      htmlType,
                    } = current;
                    rowValue = (
                      <Button
                        type={buttonType}
                        htmlType={htmlType}
                      >
                        {label}
                      </Button>
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
