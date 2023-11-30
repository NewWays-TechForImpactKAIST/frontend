import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export type AgeTextVariation = 1 | 2;

export interface AgeTextData {
  metroId: number;
  localId: number;
  rankingParagraph: {
    ageDiversityIndex: number;
    allIndices: { localId: number; rank: number; ageDiversityIndex: number }[];
  };
  indexHistoryParagraph: {
    mostRecentYear: number;
    history: {
      year: number;
      unit: number;
      candidateCount: number;
      candidateDiversityIndex: number;
      electedDiversityIndex: number;
      electedDiversityRank: number;
    }[];
  };
  ageHistogramParagraph: {
    year: number;
    candidateCount: number;
    electedCount: number;
    firstQuintile: number;
    lastQuintile: number;
    divArea: {
      localId: number;
      firstQuintile: number;
      lastQuintile: number;
    };
    uniArea: {
      localId: number;
      firstQuintile: number;
      lastQuintile: number;
    };
  };
}

const getAgeEmojiFromAge = (age: number) => {
  if (age < 30) return "👶";
  if (age < 45) return "👦👧";
  if (age < 60) return "👨👩";
  return "👴👵";
};

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: AgeTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: AgeTextData;
  /** localId를 지역명으로 변환하는 함수입니다. */
  getNameFromId: (id: number) => [string, string] | undefined;
}

export const AgeText = ({
  variation = 1,
  data = undefined,
  getNameFromId,
}: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const {
    localId,
    // rankingParagraph,
    // indexHistoryParagraph,
    ageHistogramParagraph,
  } = data;
  if (variation === 1)
    return (
      <Paragraph>
        <Text strong>{ageHistogramParagraph.year}</Text>년 전국동시지방선거에서{" "}
        <Text strong>{getNameFromId(localId)?.join(" ")}</Text>
        에는 <Text strong>{ageHistogramParagraph.candidateCount}</Text>명이{" "}
        후보로 나와 <Text strong>{ageHistogramParagraph.electedCount}</Text>명이{" "}
        당선됐어요. 당선자의 20%가{" "}
        <Text strong>{ageHistogramParagraph.firstQuintile}</Text>세 이하
        {getAgeEmojiFromAge(ageHistogramParagraph.firstQuintile)}, 20%가{" "}
        <Text strong>{ageHistogramParagraph.lastQuintile}</Text>세 이상
        {getAgeEmojiFromAge(ageHistogramParagraph.lastQuintile)}이에요. 즉,{" "}
        나머지 60%는{" "}
        <Text strong>{ageHistogramParagraph.firstQuintile + 1}</Text>세에서{" "}
        <Text strong>{ageHistogramParagraph.lastQuintile - 1}</Text>세 사이에{" "}
        있어요.
        <br />
        <br />
        참고로 다양성 지표 전국 1위는 전체 인원의 20%가{" "}
        <Text strong>{ageHistogramParagraph.divArea.firstQuintile}</Text>세{" "}
        이하, 20%가{" "}
        <Text strong>{ageHistogramParagraph.divArea.lastQuintile}</Text>세{" "}
        이상인{" "}
        <Text strong>
          {getNameFromId(ageHistogramParagraph.divArea.localId)?.join(" ")}🏆
        </Text>
        , 전국 뒤에서 1위는 전체 인원의 20%가{" "}
        <Text strong>{ageHistogramParagraph.uniArea.firstQuintile}</Text>세
        이하, 20%가{" "}
        <Text strong>{ageHistogramParagraph.uniArea.lastQuintile}</Text>세
        이상인{" "}
        <Text strong>
          {getNameFromId(ageHistogramParagraph.uniArea.localId)?.join(" ")}😢
        </Text>
        예요.
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
