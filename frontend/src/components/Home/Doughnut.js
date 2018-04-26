import React, { Component } from 'react';
import styled from 'styled-components';
import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';
import { Radio } from 'antd';
import { ADMINISTRATOR, LIBERATOR, READER } from '../../utils/const';

const RadioGroup = Radio.Group;
ReactChartkick.addAdapter(Chart);

const RadioGroupStyle = styled(RadioGroup)`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

class Doughnut extends Component {
  state = {
    value: 'COMPANY_SIZE_FILTER',
  }
  onChange = (e) => {
    const value = e.target.value;
    this.setState({
      value,
    });
    this.props.getStatisticalData(value);
  }

  render() {
    const { dataUser, statisticalData } = this.props;
    const { axesStatisticData, totalSupplier } = statisticalData;
    const data = axesStatisticData;
    const options = {
      donut: true,
      data,
      legend: 'bottom',
      suffix: '%',
      colors: ['#8ebfb4', '#fdbb6a', '#99bd73', '#eae57b', '#f00', '#0f0', '00f'],
      messages: { empty: 'No hay datos' },
      library: {
        title: {
          display: true,
          text: [new Date().getFullYear(), `${totalSupplier} proveedores`],
          fontColor: '#37907c',
        },
      },
    };
    return (
      <span>
        <RadioGroupStyle onChange={this.onChange} value={this.state.value}>
          <Radio value="COMPANY_SIZE_FILTER">Por tamaño de empresa</Radio>
          <Radio value="SUPPLY_FILTER">Por tipo de empresa</Radio>
          {
            dataUser.rols
              && dataUser.rols.find(x => x).shortName === (ADMINISTRATOR || LIBERATOR || READER) &&
              (<Radio value="COUNTRY_FILTER">Por país</Radio>)
          }
        </RadioGroupStyle>
        <PieChart {...options} />
      </span>
    );
  }
}

export default Doughnut;
