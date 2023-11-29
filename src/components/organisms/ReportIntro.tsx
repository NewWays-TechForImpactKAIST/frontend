import { Typography } from "antd";
import { css } from "@emotion/react";
import { useLocalElectionYears } from "@/utils";

const { Title, Paragraph, Text } = Typography;

const ReportIntro = () => {
  const localElectionYears = useLocalElectionYears();
  const firstElectionYear = localElectionYears[0];
  const lastElectionYear = localElectionYears[localElectionYears.length - 1];
  return (
    <>
      <Title
        level={1}
        css={css`
          word-break: keep-all;
        `}
      >
        우리동네 정치인 다양성 리포트
      </Title>
      <Paragraph>
        {lastElectionYear}년 지방선거가 막을 내렸어요.
        <br />
        <br />
        뉴웨이즈에서는 지난 {firstElectionYear}년 지방선거부터{" "}
        {lastElectionYear}년 지방선거까지의 후보자와 당선자 데이터를 다양성{" "}
        관점에서 분석해봤어요. 연령과 성별, 정당을 기준으로 각 지역의 다양성이{" "}
        지난 선거 때와 비교해 어떻게 변화했는지 살펴보았어요.
        <br />
        <br />
        과연 우리 동네는 어디까지 왔을까요?
        <br />
        <Text strong>
          새로운 시대, 새로운 물결이 밀려오고 있을까요?
          <br />
        </Text>
      </Paragraph>
    </>
  );
};

export default ReportIntro;
