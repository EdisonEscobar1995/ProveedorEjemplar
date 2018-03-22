import React from 'react';
import {
  Row, Col, Form, Input, InputNumber, Select, Radio, Button, DatePicker, Spin,
} from 'antd';
import styled from 'styled-components';
import SubTitle from './SubTitle';
import Field from '../Supplier/Field';
import Upload from '../shared/Upload';
import SimpleTable from '../shared/SimpleTable';
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

let timer;

function DinamicForm({ content, getFieldDecorator, setFields, loadingModal }) {
  return (
    <Spin spinning={loadingModal === true}>
      {
        content.map(item => (
          <Row key={item.key} justify={item.justify} align="middle" type="flex" gutter={24}>
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
                  style,
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
                      case 'inputNumber': {
                        const defaultFormatter = numberValue => `${numberValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        const defaultParser = numberValue => numberValue.replace(/\$\s?|(\.*)/g, '');
                        const {
                          formatter = defaultFormatter,
                          parser = defaultParser,
                          min = 0,
                          max,
                        } = current;
                        fieldContent = (
                          <InputNumberStyle
                            min={min}
                            max={max}
                            disabled={disabled}
                            formatter={formatter}
                            parser={parser}
                            onChange={handleChange}
                          />
                        );
                      }
                        break;
                      case 'textarea':
                        if (disabled) {
                          fieldContent = <TextStyle>{value}</TextStyle>;
                        } else {
                          fieldContent = <TextArea rows="4" disabled={disabled} />;
                        }
                        break;
                      case 'select': {
                        const {
                          valuesToClean, mode, noSearch, autoComplete, onSearch, fetching,
                        } = current;
                        const selectProps = {};
                        if (noSearch) {
                          selectProps.filterOption = selectValue =>
                            selectValue.startsWith(' ') || selectValue.endsWith(' ');
                        } else if (autoComplete) {
                          selectProps.defaultActiveFirstOption = false;
                          selectProps.showArrow = false;
                          selectProps.placeholder = 'Buscar';
                          selectProps.filterOption = false;
                          selectProps.notFoundContent = fetching ? <Spin size="small" /> : 'No se encontraron resultados';
                          selectProps.onSearch = (selectValue) => {
                            clearTimeout(timer);
                            if (onSearch && selectValue.length > 2) {
                              timer = setTimeout(() => {
                                onSearch(selectValue);
                              }, 500);
                            }
                          };
                        } else {
                          selectProps.filterOption = (input, option) =>
                            option.props.children.props.id
                              .toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }
                        fieldContent = (
                          <Select
                            showSearch
                            mode={mode}
                            disabled={disabled}
                            allowClear={allowClear}
                            onChange={(selectValue) => {
                              if (valuesToClean) {
                                setFields(valuesToClean);
                              }
                              if (handleChange) {
                                handleChange(selectValue);
                              }
                            }}
                            {...selectProps}
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
                          </Select>
                        );
                      }
                        break;
                      case 'radio':
                        fieldContent = (<Group disabled={disabled}>
                          {
                            options.map(option => (
                              <Radio key={option.id} value={option.id}>
                                <FormattedMessage id={option.name} />
                              </Radio>
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
                            <Field label={label} help={help} required={required} style={style}>
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
                      colummns,
                      addData,
                      deleteData,
                      loading,
                      updateField,
                    } = current;
                    rowValue = (
                      <SimpleTable
                        loading={loading}
                        data={value}
                        colummns={colummns}
                        disabled={disabled}
                        addData={addData}
                        deleteData={deleteData}
                        updateField={updateField}
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
                      handleclick,
                    } = current;
                    rowValue = (
                      <Button
                        type={buttonType}
                        htmlType={htmlType}
                        onClick={handleclick}
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
    </Spin>
  );
}
export default DinamicForm;
