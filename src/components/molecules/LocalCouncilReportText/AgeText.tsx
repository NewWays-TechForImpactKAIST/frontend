import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export type AgeTextVariation = 1 | 2;

export interface AgeTextData {
  foo: string;
  bar: string;
}

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  textVariation?: AgeTextVariation;
  /** text에 들어갈 데이터입니다. */
  textData: AgeTextData;
}

export const AgeText = ({ textVariation = 1, textData }: Props) => {
  const { foo, bar } = textData;

  if (textVariation === 1)
    return (
      <Paragraph>
        foo=<Text strong>{foo}</Text>
      </Paragraph>
    );
  return (
    <Paragraph>
      bar=<Text strong>{bar}</Text>
    </Paragraph>
  );
};
