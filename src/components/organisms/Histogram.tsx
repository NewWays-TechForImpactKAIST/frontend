import { useState, useEffect } from "react";
import {
  Histogram as AntHistogram,
  type HistogramConfig,
} from "@ant-design/plots";
import { css } from "@emotion/react";

export type ColorGroup = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface BinData {
  binMin: number;
  binMax: number;
  count: number;
  colorGroup: ColorGroup;
}

type HistogramData = {
  value: number;
  colorGroup?: ColorGroup;
}[];

interface Props {
  data: BinData[];
}

interface CustomHistogramConfig extends HistogramConfig {
  colorField: string;
}

export const Histogram = ({ data }: Props) => {
  const [countMax, setCountMax] = useState<number>(data[0].count);

  const [binWidth, setBinWidth] = useState<number>(
    data[0].binMax - data[0].binMin,
  );
  const [histogramData, setHistogramData] = useState<HistogramData>([]);

  const getColorGroup = (minAge: number): ColorGroup =>
    data.find(({ binMin }) => binMin === minAge)?.colorGroup ?? 0;

  const getColor = (colorGroup: ColorGroup): string => {
    const colors = [
      "#d55e00",
      "#e69f00",
      "#f0e442",
      "#009e73",
      "#56b4e9",
      "#0072b2",
      "#cc79a7",
    ];
    return colors[colorGroup];
  };

  useEffect(() => {
    const newHistogramData: HistogramData = [];
    let countMaxT = 0;
    data.forEach(({ binMin, count, colorGroup }) => {
      if (count > countMaxT) countMaxT = count;
      Array(count)
        .fill(0)
        .forEach(() => {
          newHistogramData.push({ value: binMin, colorGroup });
        });
    });
    setHistogramData(newHistogramData);
    setBinWidth(data[0].binMax - data[0].binMin);
    setCountMax(countMaxT);
  }, [data]);

  const config: CustomHistogramConfig = {
    data: histogramData,
    binField: "value",
    binWidth,
    height: 250,
    colorField: "type",
    color: param => {
      const [binMin] = param.range as [number, number];
      return getColor(getColorGroup(binMin));
    },
    meta: {
      range: {
        tickInterval: 1,
        nice: true,
      },
      count: {
        min: 0,
        max: countMax + 1,
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
