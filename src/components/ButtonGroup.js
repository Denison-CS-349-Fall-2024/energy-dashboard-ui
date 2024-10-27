import * as React from "react";
import Button from "@mui/joy/Button";
import { ButtonGroup as MuiButtonGroup } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import Settings from "@mui/icons-material/Settings";

export default function ButtonGroup(props) {
  const { currentChartType, setCurrentChartType } = props;

  const handleClick = (chartType) => {
    setCurrentChartType(chartType);
  };
  console.log("currentChartType", currentChartType);
  return (
    <MuiButtonGroup
      aria-label="radius button group"
      sx={{ "--ButtonGroup-radius": "40px" }}
    >
      {["D", "M", "Y", "All"].map((label) => (
        <Button
          key={label}
          className={`button ${currentChartType === label ? "active" : ""}`}
          onClick={() => handleClick(label)}
        >
          {label}
        </Button>
      ))}
    </MuiButtonGroup>
  );
}
