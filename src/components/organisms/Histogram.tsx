import { useState, useEffect } from "react";
import {
  Histogram as AntHistogram,
  type HistogramConfig,
} from "@ant-design/plots";
import { css } from "@emotion/react";

export type ColorGroup = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface BinData {
  binMin: number;
  binMax: number;
  count: number;
  colorGroup: ColorGroup;
}

type HistogramData = {
  value: number;
}[];

interface Props {
  data: BinData[];
}

export const Histogram = ({ data }: Props) => {
  const [binWidth, setBinWidth] = useState<number>(
    data[0].binMax - data[0].binMin,
  );
  const [histogramData, setHistogramData] = useState<HistogramData>([]);

  useEffect(() => {
    const newHistogramData: HistogramData = [];
    data.forEach(({ binMin, count }) => {
      Array(count)
        .fill(0)
        .forEach(() => {
          newHistogramData.push({ value: binMin });
        });
    });
    setHistogramData(newHistogramData);
    setBinWidth(data[0].binMax - data[0].binMin);
  }, [data]);

  const config: HistogramConfig = {
    data: histogramData,
    binField: "value",
    binWidth,
    color: "#00BCE9",
    meta: {
      range: {
        tickInterval: 5,
      },
      count: {
        min: 0,
        max: 10,
        tickInterval: 1,
        nice: true,
      },
    },
  };

  return (
    <AntHistogram
      css={css`
        background: #f2f2f2;
        padding: 20px;
      `}
      {...config}
    />
  );
};
