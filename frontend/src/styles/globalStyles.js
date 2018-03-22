import { injectGlobal } from 'styled-components';
/* eslint-disable no-unused-expressions */
injectGlobal`
  body  > #root{
    min-height: 100%;
    display: flex;
  }
  .ant-table-tbody>tr>td, .ant-table-thead>tr>th{
    word-break: inherit;
  }
`;
