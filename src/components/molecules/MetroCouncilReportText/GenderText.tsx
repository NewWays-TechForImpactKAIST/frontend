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
  prevCandidate: {
    year: number;
    malePop: number;
    femalePop: number;
  };
  currentCandidate: {
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
  sgType: "elected" | "candidate";
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
  prevCandidate: {
    year: 2016,
    malePop: 35,
    femalePop: 55,
  },
  currentCandidate: {
    year: 2020,
    malePop: 50,
    femalePop: 40,
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

export const GenderText = ({
  variation = 1,
  data = defaultData,
  sgType,
}: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const {
    current,
    prev,
    meanMalePop,
    meanFemalePop,
    currentCandidate,
    prevCandidate,
  } = data;
  const femalePop =
    sgType === "elected" ? current.femalePop : currentCandidate.femalePop;
  const malePop =
    sgType === "elected" ? current.malePop : currentCandidate.malePop;
  const prevFemalePop =
    sgType === "elected" ? prev.femalePop : prevCandidate.femalePop;
  const prevMalePop =
    sgType === "elected" ? prev.malePop : prevCandidate.malePop;
  const nowPercentage = calculatePercentage(femalePop, malePop);
  const meanPercentage = calculatePercentage(meanFemalePop, meanMalePop);
  const nowGenderDiversity = calculateGenderDiversity(femalePop, malePop);
  const prevGenderDiversity = calculateGenderDiversity(
    prevFemalePop,
    prevMalePop,
  );
  const nowGenderRatio = calculateFemaleRatio(femalePop, malePop);
  const meanGenderRatio = calculateFemaleRatio(meanFemalePop, meanMalePop);

  if (variation === 1)
    return (
      <Paragraph>
        {current.year}년 지방선거 {sgType === "elected" ? "당선자" : "후보자"}의
        성비는{" "}
        <Text strong>
          {nowGenderDiversity > prevGenderDiversity
            ? "균형에서 더 멀어졌어요."
            : nowGenderDiversity === prevGenderDiversity
            ? "변화하지 않았어요."
            : "나아졌어요."}
        </Text>{" "}
        <br /> <br />
        {current.year}년 지방선거에서{" "}
        {sgType === "elected" ? "당선자" : "후보자"}의 성별은 남성{" "}
        <Text strong>
          {malePop}명({100 - nowPercentage}%)
        </Text>
        , 여성{" "}
        <Text strong>
          {femalePop}명({nowPercentage}%)
        </Text>
        이에요. <br />
        전국 지역 의회는 평균적으로 남성이{" "}
        <Text strong>{100 - meanPercentage}%</Text>, 여성이{" "}
        <Text strong>{meanPercentage}%</Text>를 차지하고 있어요. <br />
        해당 지역 {sgType === "elected" ? "당선자" : "후보자"} 10명 중 남성은{" "}
        <Text strong>{10 - Math.round(nowPercentage / 10)}</Text>명, 여성은{" "}
        <Text strong>{Math.round(nowPercentage / 10)}</Text>명인 정도이기
        때문에,{" "}
        <Text strong>
          {nowGenderRatio < meanGenderRatio
            ? "전국 대비 성별 다양성이 충분하다고 보기는 어려워요."
            : nowGenderRatio === meanGenderRatio
            ? "전국 평균 수준이에요."
            : "전국 평균 대비 높은 수준이에요."}
        </Text>
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
