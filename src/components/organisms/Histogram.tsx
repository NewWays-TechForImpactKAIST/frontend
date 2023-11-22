import { Histogram, type HistogramConfig } from "@ant-design/plots";
import { css } from "@emotion/react";

export interface HistogramData {
  value: number;
}

interface Props {
  data: HistogramData[];
}

export const AgeHistogram = ({ data }: Props) => {
  const config: HistogramConfig = {
    data,
    binField: "value",
    binWidth: 10,
    color: "#00BCE9",
    meta: {
      range: {
        min: 0,
        tickInterval: 5,
      },
      count: {
        tickInterval: 1,
        nice: true,
      },
    },
  };

  return (
    <Histogram
      css={css`
        background: #f2f2f2;
        padding: 20px;
      `}
      {...config}
    />
  );
};
