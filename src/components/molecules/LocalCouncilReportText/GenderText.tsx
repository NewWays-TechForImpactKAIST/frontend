import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export type GenderTextVariation = 1 | 2;

export interface GenderTextData {
  metroName: string;
  localName: string;
  now: {
    year: number;
    malePopulation: number;
    femalePopulation: number;
  };
  prev: {
    year: number;
    malePopulation: number;
    femalePopulation: number;
  };
  mean: {
    year: number;
    malePopulation: number;
    femalePopulation: number;
  };
}

const defaultData: GenderTextData = {
  metroName: "서울특별시",
  localName: "용산구",
  now: {
    year: 2020,
    malePopulation: 50,
    femalePopulation: 40,
  },
  prev: {
    year: 2016,
    malePopulation: 35,
    femalePopulation: 55,
  },
  mean: {
    year: 2020,
    malePopulation: 60,
    femalePopulation: 40,
  },
};

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: GenderTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: GenderTextData;
}

function calculatePercentage(a: number, b: number) {
  return Math.round((a / (a + b)) * 100);
}

function calculateGenderRatio(a: number, b: number) {
  return Math.max(a / b, b / a);
}

export const GenderText = ({ variation = 1, data = defaultData }: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const { metroName, localName, now, prev, mean } = data;
  const nowPercentage = calculatePercentage(
    now.femalePopulation,
    now.malePopulation,
  );
  const meanPercentage = calculatePercentage(
    mean.femalePopulation,
    mean.malePopulation,
  );
  const nowGenderRatio = calculateGenderRatio(
    now.femalePopulation,
    now.malePopulation,
  );
  const prevGenderRatio = calculateGenderRatio(
    prev.femalePopulation,
    prev.malePopulation,
  );

  if (variation === 1)
    return (
      <Paragraph>
        {now.year}년 지방선거 당선자의 성비는{" "}
        <Text strong>
          {nowGenderRatio > prevGenderRatio
            ? "퇴보했습니다."
            : nowGenderRatio === prevGenderRatio
            ? "변화하지 않았습니다"
            : "나아졌습니다."}
        </Text>{" "}
        <br /> <br />
        {now.year}년 지방선거에서 {metroName} {localName}의 당선자의 성별은 남성{" "}
        <Text strong>
          {now.malePopulation}명({100 - nowPercentage}%){" "}
        </Text>
        , 여성{" "}
        <Text strong>
          {now.femalePopulation}명({nowPercentage}%){" "}
        </Text>
        입니다. <br /> <br /> 전국 지역 의회는 평균적으로 남성이{" "}
        <Text strong>{100 - meanPercentage}%</Text>, 여성이{" "}
        <Text strong>{meanPercentage}%</Text>를 차지하고 있습니다. <br /> <br />
        해당 지역 의원 10명 중 남성은{" "}
        <Text strong>{10 - Math.round(nowPercentage / 10)}</Text>명, 여성은{" "}
        <Text strong>{Math.round(nowPercentage / 10)}</Text>명인 정도이기
        때문에,{" "}
        <Text strong>
          {nowGenderRatio > prevGenderRatio
            ? "전국 대비 성별 다양성이 충분하다고 보기는 어렵습니다."
            : nowGenderRatio === prevGenderRatio
            ? "전국 평균 수준입니다."
            : "전국 평균 대비 높은 수준입니다."}
        </Text>
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
