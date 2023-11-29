import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export type GenderTextVariation = 1 | 2;

export interface GenderTextData {
  metroId: number;
  current: {
    year: number;
    malePop: number;
    femalePop: number;
  };
  prev: {
    year: number;
    malePop: number;
    femalePop: number;
  };
  meanMalePop: number;
  meanFemalePop: number;
}

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: GenderTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: GenderTextData;
}

const defaultData: GenderTextData = {
  metroId: 1,
  current: {
    year: 2020,
    malePop: 50,
    femalePop: 40,
  },
  prev: {
    year: 2016,
    malePop: 35,
    femalePop: 55,
  },
  meanMalePop: 60,
  meanFemalePop: 40,
};

function calculatePercentage(a: number, b: number) {
  return Math.round((a / (a + b)) * 100);
}

function calculateGenderDiversity(a: number, b: number) {
  return Math.max(a / b, b / a);
}

function calculateFemaleRatio(femalePop: number, malePop: number) {
  return femalePop / (femalePop + malePop);
}

export const GenderText = ({ variation = 1, data = defaultData }: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const { current, prev, meanMalePop, meanFemalePop } = data;
  const nowPercentage = calculatePercentage(current.femalePop, current.malePop);
  const meanPercentage = calculatePercentage(meanFemalePop, meanMalePop);
  const nowGenderDiversity = calculateGenderDiversity(
    current.femalePop,
    current.malePop,
  );
  const prevGenderDiversity = calculateGenderDiversity(
    prev.femalePop,
    prev.malePop,
  );
  const nowGenderRatio = calculateFemaleRatio(
    current.femalePop,
    current.malePop,
  );
  const meanGenderRatio = calculateFemaleRatio(meanFemalePop, meanMalePop);

  if (variation === 1)
    return (
      <Paragraph>
        {current.year}년 총선 당선자의 성비는{" "}
        <Text strong>
          {nowGenderDiversity > prevGenderDiversity
            ? "퇴보했습니다."
            : nowGenderDiversity === prevGenderDiversity
            ? "변화하지 않았습니다."
            : "나아졌습니다."}
        </Text>{" "}
        <br /> <br />
        {current.year}년 총선에서 당선자의 성별은 남성{" "}
        <Text strong>
          {current.malePop}명({100 - nowPercentage}%)
        </Text>
        , 여성{" "}
        <Text strong>
          {current.femalePop}명({nowPercentage}%)
        </Text>
        입니다. <br />
        전체 국회의원 10명 중 남성은{" "}
        <Text strong>{10 - Math.round(nowPercentage / 10)}</Text>명, 여성은{" "}
        <Text strong>{Math.round(nowPercentage / 10)}</Text>명인 정도입니다.{" "}
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
