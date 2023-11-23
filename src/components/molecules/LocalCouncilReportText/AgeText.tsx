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

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: AgeTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: AgeTextData;
}

export const AgeText = ({ variation = 1, data = undefined }: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const {
    metroId,
    localId,
    // rankingParagraph,
    // indexHistoryParagraph,
    // ageHistogramParagraph,
  } = data;
  if (variation === 1)
    return (
      <Paragraph>
        이 지역의 metroId는 <Text strong>{metroId}</Text>, localId는{" "}
        <Text strong>{localId}</Text>입니다.
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
