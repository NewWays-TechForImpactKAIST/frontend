import { Pie, type PieConfig } from "@ant-design/plots";
import { css } from "@emotion/react";

export interface PieChartData {
  type: string;
  value: number;
}

export interface Props {
  data: PieChartData[];
  colors: string[];
}

export const PieChart = ({ data, colors }: Props) => {
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    radius: 0.6,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    colorField: "type",
    color: colors,
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
