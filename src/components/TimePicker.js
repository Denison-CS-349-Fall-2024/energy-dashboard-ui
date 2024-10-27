import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

export const TimePicker = (props) => {
  const { currentChartType, chartTime, setChartTime } = props;

  const chartTypeMap = {
    D: "",
    M: "month",
    Y: "year",
  };

  const onChange = (date, dateString) => {
    setChartTime(dateString);
  };

  return (
    <Space>
      <DatePicker
        defaultValue={dayjs(chartTime)}
        onChange={onChange}
        picker={chartTypeMap[currentChartType]}
        disabled={currentChartType == "All"}
      />
    </Space>
  );
};
