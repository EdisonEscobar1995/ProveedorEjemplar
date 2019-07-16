import React, { Component } from 'react';
import {
  Row, Col, Form, Input, InputNumber, Select, Radio, Button, DatePicker, Spin, Switch,
} from 'antd';
import styled from 'styled-components';
import SubTitle from './SubTitle';
import Field from '../Supplier/Field';
import Upload from '../shared/Upload';
import SimpleTable from '../shared/SimpleTable';
import FormattedMessage from '../shared/FormattedMessage';
import { baseUrl } from '../../utils/api';
import LangIntl from '../../utils/translate';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Group } = Radio;

const ParagraphStyle = styled.p`
  margin-bottom: ${props => props.theme.spaces.main};
`;

const SelectStyle = styled(Select)`
  & .ant-select-selection-selected-value {
    position: absolute;
  }
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

class DinamicForm extends Component {
  static message;
  componentWillMount() {
    DinamicForm.message = LangIntl.getIntl().formatMessage({ id: 'Validation.requiredField' });
  }

  render() {
    const {
      content, getFieldDecorator, setFields, loadingModal, dontFormatMessage,
    } = this.props;
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
                    rules = current.whitespace ?
                      [{ whitespace: true, message: DinamicForm.message }] : [],
                    hidden,
                    size,
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
                    case 'switch':
                    case 'select': {
                      let fieldContent;
                      switch (type) {
                        case 'date': {
                          fieldContent = (<DatePicker
                            disabled={disabled}
                            onChange={(date, dateString) => {
                              if (handleChange) {
                                handleChange(date, dateString);
                              }
                            }}
                            style={{ width: '100%' }}
                            format={format}
                          />);
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
                            fieldContent =
                              (<TextArea
                                rows="4"
                                disabled={disabled}
                                onBlur={(inputValue) => {
                                  if (handleChange) {
                                    handleChange(inputValue.target.value);
                                  }
                                }}
                              />);
                          }
                          break;
                        case 'select': {
                          const {
                            valuesToClean,
                            mode,
                            noSearch,
                            autoComplete,
                            onSearch,
                            fetching,
                            handleSelect,
                            keyPress,
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
                            selectProps.filterOption = (input, option) => {
                              const word = option.props.children.props ?
                                option.props.children.props.id : option.props.children;
                              return word
                                .toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;
                            };
                          }
                          fieldContent = (
                            <SelectStyle
                              showSearch
                              mode={mode}
                              disabled={disabled}
                              allowClear={allowClear}
                              onInputKeyDown={(ev) => {
                                if (keyPress) {
                                  keyPress(ev);
                                }
                              }}
                              onChange={(selectValue) => {
                                if (valuesToClean) {
                                  setFields(valuesToClean);
                                }
                                if (handleChange) {
                                  handleChange(selectValue);
                                }
                              }}
                              onSelect={(selectValue) => {
                                if (valuesToClean) {
                                  setFields(valuesToClean);
                                }
                                if (handleSelect) {
                                  handleSelect(selectValue);
                                }
                              }}
                              {...selectProps}
                            >
                              {
                                options && options.length > 0 && options.map(option => (
                                  <Option
                                    key={option.id}
                                    value={option.id}
                                  >
                                    {
                                      dontFormatMessage ?
                                        option.name :
                                        <FormattedMessage id={option.name} />
                                    }
                                  </Option>
                                ))
                              }
                            </SelectStyle>
                          );
                        }
                          break;
                        case 'radio':
                          fieldContent = (<Group disabled={disabled} onChange={handleChange}>
                            {
                              options && options.map(option => (
                                <Radio
                                  key={option.id}
                                  value={option.id}
                                  size={size}
                                >
                                  {
                                    dontFormatMessage ?
                                      option.name :
                                      <FormattedMessage id={option.name} />
                                  }
                                </Radio>
                              ))
                            }
                          </Group>);
                          break;
                        case 'switch': {
                          const {
                            defaultChecked,
                          } = current;
                          fieldContent = (
                            <Switch
                              defaultChecked={defaultChecked}
                              checked={value}
                              size={size}
                              disabled={disabled}
                              onChange={handleChange}
                            />
                          );
                        }
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
                                      { required, message: DinamicForm.message },
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
                          key={key}
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
                        unique,
                        uploadMaxFilesize,
                        uploadExtensions,
                      } = current;
                      rowValue = (
                        <Field label={label} required={required} style={style}>
                          <Upload
                            datakey={key}
                            list={fileList}
                            disabled={disabled}
                            multiple
                            max={max}
                            unique={unique}
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
}
export default DinamicForm;
