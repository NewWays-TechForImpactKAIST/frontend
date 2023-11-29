import { Pie, type PieConfig } from "@ant-design/plots";
import { css } from "@emotion/react";

export interface PieChartData {
  type: string;
  value: number;
}

export interface Props {
  data: PieChartData[];
  colorMap: Map<string, string>;
}

export const PieChart = ({ data, colorMap }: Props) => {
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    height: 300,
    radius: 0.6,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    colorField: "type",
    color: data.map(({ type }) => colorMap.get(type) || "#888888"),
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
