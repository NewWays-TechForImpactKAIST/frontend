import React from "react";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";

import { Layout } from "@/components/templates";
import {
  AgeHistogram,
  PieChart,
  // type HistogramData,
  // type PieChartData,
} from "@/components/organisms";
import {
  sampleAgeHistogramData,
  samplePartyPieData,
  sampleSexPieData,
} from "@/utils";

const { Title } = Typography;

const LocalCouncilReport: React.FC = () => {
  const { metroId, localId } = useParams();

  return (
    <Layout>
      <Flex
        vertical
        gap={40}
        css={css`
          margin: 40px 0 40px 0;
        `}
      >
        <Title
          level={1}
        >{`MetroId(${metroId}) LocalId(${localId})의 지역의회 다양성 리포트`}</Title>
        <Title level={2}>연령 다양성</Title>
        <AgeHistogram data={sampleAgeHistogramData} />
        <Title level={2}>정당 다양성</Title>
        <PieChart
          data={samplePartyPieData.data}
          colors={samplePartyPieData.colors}
        />
        <Title level={2}>성별 다양성</Title>
        <PieChart
          data={sampleSexPieData.data}
          colors={sampleSexPieData.colors}
        />
      </Flex>
    </Layout>
  );
};

export default LocalCouncilReport;
