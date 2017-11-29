import React from 'react';
import { Button, Row, Col } from 'antd';
import Confirm from '../shared/Confirm';

function FormButtons({ buttons, showConfirm, messageConfirm }) {
  return (
    <Row type="flex" justify="center">
      {
        buttons.map(button => (
          <Col span={4} key={button.key}>
            {
              showConfirm ?
                <Confirm title={messageConfirm} method={button.onClick}>
                  <Button
                    disabled={button.disabled}
                    type="primary"
                  >
                    {
                      button.text
                    }
                  </Button>
                </Confirm>
                :
                <Button
                  disabled={button.disabled}
                  type="primary"
                  onClick={button.onClick}
                >
                  {
                    button.text
                  }
                </Button>

            }
          </Col>
        ))
      }
    </Row>
  );
}
export default FormButtons;
