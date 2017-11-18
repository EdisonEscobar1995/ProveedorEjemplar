import React from 'react';
import { Tabs, Steps, Spin } from 'antd';
import GeneralForm from './GeneralForm';
import ComercialForm from './ComercialForm';


const { TabPane } = Tabs;
const { Step } = Steps;

function Supplier({ loading, categories, companyTypes, societyTypes }) {
  return (
    <Spin spinning={loading}>
      <Steps current={0}>
        <Step />
        <Step />
      </Steps>
      <Tabs defaultActiveKey="2">
        <TabPane tab="Informacion General" key="1">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos commodi recusandae aliquid,
            tempora quia exercitationem quidem ullam ex corporis rerum! Amet quis molestias atque
            laborum numquam dolores esse, distinctio repudiandae?
            <GeneralForm
              categories={categories}
              companyTypes={companyTypes}
              societyTypes={societyTypes}
            />
          </div>
        </TabPane>
        <TabPane tab="Informacion Comercial" key="2">
          <ComercialForm />
        </TabPane>
      </Tabs>
    </Spin>
  );
}

export default Supplier;

