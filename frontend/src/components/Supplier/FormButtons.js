import React from 'react';
import { Button, Row, Col } from 'antd';
import styled from 'styled-components';
import FormattedMessage from '../shared/FormattedMessage';
import Confirm from '../shared/Confirm';

const ButtonStyle = styled(Button)`
  background: ${props => props.theme.color[props.buttoncolor]};
  color: ${props => props.theme.color.normal};
  width: 100%;
  &:hover, :focus {
    background: ${props => props.theme.color[props.buttoncolor]};
    color: ${props => props.theme.color.normal};
  }
`;
function FormButtons({ buttons }) {
  return (
    <Row type="flex" justify="center" gutter={5}>
      {
        buttons.map(button => (
          <Col span={2} key={button.key}>
            {
              button.showConfirm ?
                <Confirm title={button.messageConfirm} method={button.onClick}>
                  <ButtonStyle
                    disabled={button.disabled}
                    buttoncolor={button.buttoncolor}
                  >
                    <FormattedMessage id={button.text} />
                  </ButtonStyle>
                </Confirm>
                :
                <ButtonStyle
                  disabled={button.disabled}
                  onClick={button.onClick}
                  buttoncolor={button.buttoncolor}
                >
                  <FormattedMessage id={button.text} />
                </ButtonStyle>

            }
          </Col>
        ))
      }
    </Row>
  );
}
export default FormButtons;
