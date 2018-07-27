import React from 'react';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

function Tab({ dataTabs, defaultTab = '1' }) {
  return (
    <Tabs defaultActiveKey={defaultTab}>
      {dataTabs.map(data => (
        <TabPane tab={data.text} key={data.index}>
          {data.component}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default Tab;
