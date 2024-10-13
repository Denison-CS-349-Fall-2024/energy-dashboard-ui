import React from 'react';
import { Select, Space } from 'antd';
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const QuickInsightsSelect = (props) => {
    const {quickInsightsType, setQuickInsightsType} = props

    return (
    <Space wrap>
        <Select
          defaultValue="Solar"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'Solar',
              label: 'Solar',
            },
            {
              value: 'Electric - Grid',
              label: 'Electric - Grid',
            },
            {
              value: 'Natural Gas',
              label: 'Natural Gas',
            },
          ]}
        />
      </Space>
      )
}

  
;
export default QuickInsightsSelect;