import React from "react"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"

const QuickInsightsSelect = (props) => {
  const {
    quickInsightsTypes,
    selectedQuickInsightsId,
    setSelectedQuickInsightsId,
  } = props

  const handleChange = (e, newValue) => {
    setSelectedQuickInsightsId(newValue)
  }

  return (
    <Select value={selectedQuickInsightsId} onChange={handleChange}>
      {quickInsightsTypes.map((data) => (
        <Option value={data.id}>{data.label}</Option>
      ))}
    </Select>
  )
}

export default QuickInsightsSelect
