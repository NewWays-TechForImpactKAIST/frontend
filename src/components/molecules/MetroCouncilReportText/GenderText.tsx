import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export type GenderTextVariation = 1 | 2;

export interface GenderTextData {
  genderDiversityIndex: number;
}

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: GenderTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: GenderTextData;
}

export const GenderText = ({ variation = 1, data = undefined }: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const { genderDiversityIndex } = data;
  if (variation === 1)
    return (
      <Paragraph>
        {"2020"}년 지방선거 당선자의 성비는{" "}
        <Text strong>{"변화하지 않았습니다."}</Text> {"2024"}년 지방선거에서{" "}
        {"충청남도"}의 당선자의 성별은 남성{" "}
        <Text strong>
          {5}명({"60%"})
        </Text>
        , 여성{" "}
        <Text strong>
          {3}명({"40%"})
        </Text>
        입니다. <br /> <br /> 전국 지역 의회는 평균적으로 남성이{" "}
        <Text strong>{"60%"}</Text>, 여성이 <Text strong>{"40%"}</Text>를
        차지하고 있습니다. <br /> <br />
        해당 지역 의원 10명 중 남성은 <Text strong>{5}</Text>명, 여성은{" "}
        <Text strong>{3}</Text>명인 정도이기 때문에,{" "}
        <Text strong>{"전국 평균 대비 높은 수준입니다."}</Text>
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
