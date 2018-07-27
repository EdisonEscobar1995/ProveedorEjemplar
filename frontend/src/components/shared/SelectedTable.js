import React, { Component } from 'react';
// import { Table, Button, Tooltip } from 'antd';
// import styled from 'styled-components';
// import FormattedMessage from '../shared/FormattedMessage';
import LangIntl from '../../utils/translate';

// const TableStyle = styled(Table)`
//   margin: ${props => props.theme.spaces.main} 0;
// `;

// const { Column } = Table;

class SelectedTable extends Component {
  static translator;

  componentWillMount() {
    SelectedTable.translator = LangIntl.getIntl();
  }

  render() {
    return (
      // <TableStyle>

      // <TableStyle>
      <div>Hola</div>
    );
  }
}

export default SelectedTable;
