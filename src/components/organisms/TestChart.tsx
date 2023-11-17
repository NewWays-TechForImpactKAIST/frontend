import { Line, type LineConfig } from "@ant-design/charts";
import { css } from "@emotion/react";

interface RawDataPoint {
  year: string;
  value: number;
}

interface DataPoint {
  연도: string;
  지표: number;
}

const defaultData: RawDataPoint[] = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

interface Props {
  data?: RawDataPoint[];
}

const TestChart = ({ data = defaultData }: Props) => {
  const transformKeys = (rawData: RawDataPoint[]): DataPoint[] =>
    rawData.map(rawDataPoint => ({
      연도: rawDataPoint.year,
      지표: rawDataPoint.value,
    }));

  const config: LineConfig = {
    data: transformKeys(data),
    xField: "연도",
    yField: "지표",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };
  return (
    <Line
      css={css`
        background: #f2f2f2;
      `}
      {...config}
    />
  );
};

export default TestChart;
