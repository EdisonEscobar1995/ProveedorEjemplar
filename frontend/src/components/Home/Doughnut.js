import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactChartkick, { PieChart } from 'react-chartkick';
import Chart from 'chart.js';
import { Radio } from 'antd';
import { ADMINISTRATOR, LIBERATOR, READER } from '../../utils/const';
import * as actions from '../../state/Home/action';
import FormattedMessage from '../shared/FormattedMessage';

const RadioGroup = Radio.Group;
ReactChartkick.addAdapter(Chart);

const RadioGroupStyle = styled(RadioGroup)`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

class Doughnut extends Component {
  state = {
    value: 'SUPPLY_FILTER',
  }

  componentDidMount() {
    this.props.getUserContext();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.dataUser !== nextProps.dataUser) {
      const { dataUser } = this.props;
      if (dataUser.rols
        && dataUser.rols.find(x => x).shortName !== 'SUPPLIER') {
        this.props.getStatisticalData();
      }
    }
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
    if (dataUser.rols
      && dataUser.rols.find(x => x).shortName === 'SUPPLIER') {
      return null;
    }
    return (
      <span>
        <RadioGroupStyle onChange={this.onChange} value={this.state.value}>
          <Radio value="SUPPLY_FILTER"><FormattedMessage id="Title.supplyType" /></Radio>
          <Radio value="COMPANY_SIZE_FILTER"><FormattedMessage id="Title.companySize" /></Radio>
          {
            dataUser.rols
              && dataUser.rols.find(x => x).shortName === (ADMINISTRATOR || LIBERATOR || READER) &&
              (<Radio value="COUNTRY_FILTER"><FormattedMessage id="Title.country" /></Radio>)
          }
        </RadioGroupStyle>
        <PieChart {...options} />
      </span>
    );
  }
}

const mapDispatchToProps = {
  ...actions,
};

const mapStateToProps = state => (
  {
    statisticalData: state.home.statisticalData,
    dataUser: state.main.data,
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Doughnut);
