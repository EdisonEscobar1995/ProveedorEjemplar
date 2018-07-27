import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

const SelectStyle = styled(Select)`
  width: 100%;
  margin: 0 5px;

  & .ant-select-selection-selected-value {
    position: absolute;
  }
`;

const optionsSelect = (options, group, label) => {
  if (group) {
    return (
      <OptGroup label={label}>
        {
          options.map(option => (
            <Option
              key={option.id}
              value={option.id}
            >
              {
                option.name
              }
            </Option>))
        }
      </OptGroup>);
  }
  return (
    options.map(option => (
      <Option
        key={option.id}
        value={option.id}
      >
        {
          option.name
        }
      </Option>))
  );
};

const SimpleSelect = (
  {
    options = [],
    mode,
    handleChange,
    onDeselect,
    onSelect,
    style,
    group = false,
    labelOptions,
  }) =>
  (<SelectStyle
    showSearch
    mode={mode}
    style={style}
    placeholder="Buscar"
    onChange={(selectValue, optionsValue) =>
      handleChange && handleChange(selectValue, optionsValue)}
    onSelect={(selectValue, optionsValue) => onSelect && onSelect(selectValue, optionsValue)}
    onDeselect={(selectValue, optionsValue) => onDeselect && onDeselect(selectValue, optionsValue)}
    filterOption={
      (input, option) => {
        const word = option.props.children.props ?
          option.props.children.props.id : option.props.children;
        return word.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
  >
    {
      optionsSelect(options, group, labelOptions)
    }
  </SelectStyle>
  );

export default SimpleSelect;
