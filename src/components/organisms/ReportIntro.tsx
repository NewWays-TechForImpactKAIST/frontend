import { Typography } from "antd";
import { css } from "@emotion/react";
import { useLocalElectionYears, useNationalElectionYears } from "@/utils";

const { Title, Paragraph, Text } = Typography;

interface Props {
  reportType: string;
}

const ReportIntro = ({ reportType }: Props) => {
  const localElectionYears = useLocalElectionYears();
  const nationalElectionYears = useNationalElectionYears();
  const firstElection =
    reportType === "nationalCouncil"
      ? nationalElectionYears[0]
      : localElectionYears[0];
  const lastElection =
    reportType === "nationalCouncil"
      ? nationalElectionYears[nationalElectionYears.length - 1]
      : localElectionYears[localElectionYears.length - 1];
  return (
    <>
      <Title
        level={1}
        css={css`
          word-break: keep-all;
        `}
      >
        {reportType === "nationalCouncil"
          ? "대한민국 국회 다양성 리포트"
          : "우리동네 정치인 다양성 리포트"}
      </Title>
      {reportType === "nationalCouncil" ? (
        <Paragraph>
          {lastElection.year}년 제{lastElection.ordinal}회 총선이 막을 내렸어요.
          <br />
          <br />
          뉴웨이즈에서는 지난 {firstElection.year}년 총선부터{" "}
          {lastElection.year}년 총선까지의 후보자와 당선자 데이터를 다양성{" "}
          관점에서 분석해봤어요. 연령과 성별, 정당을 기준으로 각 지역의 다양성이
          지난 선거 때와 비교해 어떻게 변화했는지 살펴보았어요.
          <br />
          <br />
          과연 대한민국은 어디까지 왔을까요?
          <br />
          <Text strong>
            새로운 시대, 국회에도 새로운 물결이 밀려오고 있을까요?
            <br />
          </Text>
        </Paragraph>
      ) : (
        <Paragraph>
          {lastElection.year}년 제{lastElection.ordinal}회 전국동시지방선거가
          막을 내렸어요.
          <br />
          <br />
          뉴웨이즈에서는 지난 {firstElection.year}년 지방선거부터{" "}
          {lastElection.year}년 지방선거까지의 후보자와 당선자 데이터를 다양성{" "}
          관점에서 분석해봤어요. 연령과 성별, 정당을 기준으로 각 지역의 다양성이
          지난 선거 때와 비교해 어떻게 변화했는지 살펴보았어요.
          <br />
          <br />
          과연 우리 동네는 어디까지 왔을까요?
          <br />
          <Text strong>
            새로운 시대, 우리 동네에도 새로운 물결이 밀려오고 있을까요?
            <br />
          </Text>
        </Paragraph>
      )}
    </>
  );
};

export default ReportIntro;
