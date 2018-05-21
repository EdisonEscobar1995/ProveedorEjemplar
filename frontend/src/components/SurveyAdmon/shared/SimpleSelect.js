import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

const { Option } = Select;

const SelectStyle = styled(Select)`
  width: 100%;

  & .ant-select-selection-selected-value {
    position: absolute;
  }
`;

const SimpleSelect = ({ options = [], mode, handleChange }) => (
  <SelectStyle
    showSearch
    mode={mode}
    placeholder="Buscar"
    onChange={selectValue => handleChange && handleChange(selectValue)}
    filterOption={
      (input, option) => {
        const word = option.props.children.props ?
          option.props.children.props.id : option.props.children;
        return word.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
  >
    {
      options.map(option => (
        <Option
          key={option.id}
          value={option.id}
        >
          {
            option.name
          }
        </Option>
      ))
    }
  </SelectStyle>
);

export default SimpleSelect;
