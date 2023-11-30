import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export type AgeTextVariation = 1 | 2;

export interface AgeTextData {
  metroId: number;
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
  };
}

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: AgeTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: AgeTextData;
}

export const AgeText = ({ variation = 1, data = undefined }: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const {
    // rankingParagraph,
    // indexHistoryParagraph,
    ageHistogramParagraph,
  } = data;
  if (variation === 1)
    return (
      <Paragraph>
        <Text strong>{ageHistogramParagraph.year}</Text>년 총선에서{" "}
        <Text strong>{ageHistogramParagraph.candidateCount}</Text>명이 후보로
        나와 <Text strong>{ageHistogramParagraph.electedCount}</Text>명이{" "}
        당선됐어요. 당선자의 20%가{" "}
        <Text strong>{ageHistogramParagraph.firstQuintile}</Text>세 이하, 20%가{" "}
        <Text strong>{ageHistogramParagraph.lastQuintile}</Text>세 이상이에요.
        <br />
        <br />
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
