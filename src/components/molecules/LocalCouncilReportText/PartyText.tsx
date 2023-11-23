import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export type PartyTextVariation = 1 | 2;

export interface PartyTextData {
  partyDiversityIndex: number;
}

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: PartyTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: PartyTextData;
}

export const PartyText = ({ variation = 1, data = undefined }: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const { partyDiversityIndex } = data;
  if (variation === 1)
    return (
      <Paragraph>
        이 지역의 정당 다양성 지표의 값은{" "}
        <Text strong>{partyDiversityIndex}</Text>입니다.
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
