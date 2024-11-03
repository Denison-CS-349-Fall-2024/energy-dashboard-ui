import React from "react"
import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { getFullDateInString } from "../helpers"

export const TimePicker = (props) => {
  const { chartType, chartDate, setChartDate } = props

  const chartTypeMap = {
    D: "",
    M: "month",
    Y: "year",
  }

  const onChange = (date, dateString) => {
    setChartDate(getFullDateInString(dateString))
  }

  return (
    <Space>
      <DatePicker
        defaultValue={dayjs(chartDate)}
        onChange={onChange}
        picker={chartTypeMap[chartType]}
        disabled={chartType == "All"}
      />
    </Space>
  )
}
