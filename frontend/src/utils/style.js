import { Tabs } from 'antd';
import styled, { css } from 'styled-components';

const ErrorStyle = styled.p`
  color: ${props => props.theme.color.error};
`;

const ContentStyle = styled.div`
  padding: 7px 0 12px 0;
`;

const emptyArrow = css`
  content: " ";
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
`;
const backArrow = css`
  ${emptyArrow};
  left: -18px;
  border-left: 18px solid transparent;
`;
const forwardArrow = css`
  ${emptyArrow};
  right: -18px;
  border-top: 32px solid transparent;
  border-bottom: 32px solid transparent;
`;

const TabsStyle = styled(Tabs)`
  .ant-tabs-bar {
    border-bottom-color: rgba(217,217,217,.5);
    color: ${props => props.theme.color.normal};
    .ant-tabs-tab{
      margin-right: 20px;
      background-color: ${props => props.theme.color.tabNormal};
      &:hover{
        color: ${props => props.theme.color.normal};
      }
      &:before {
        ${backArrow}
        border-top: 32px solid ${props => props.theme.color.tabNormal};
        border-bottom: 32px solid ${props => props.theme.color.tabNormal};
      }
      &:after {
        ${forwardArrow}
        border-left: 18px solid ${props => props.theme.color.tabNormal};
      }
    }
    .ant-tabs-tab-active{
      background-color: ${props => props.theme.color.primary};
      color: ${props => props.theme.color.normal};
      &:before {
        ${backArrow}
        border-top: 32px solid ${props => props.theme.color.primary};
        border-bottom: 32px solid ${props => props.theme.color.primary};
      }
      &:after {
        ${forwardArrow}
        border-left: 18px solid ${props => props.theme.color.primary};
      }
    }
  }
`;

export {
  ErrorStyle,
  ContentStyle,
  TabsStyle,
};
