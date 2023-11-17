import { Pie, type PieConfig } from "@ant-design/plots";
import { css } from "@emotion/react";

export interface PieChartData {
  type: string;
  value: number;
}

export interface Props {
  data: PieChartData[];
}

const PieChart = ({ data }: Props) => {
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.6,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return (
    <Pie
      css={css`
        background: #f2f2f2;
        padding: 20px;
      `}
      {...config}
    />
  );
};

export default PieChart;
