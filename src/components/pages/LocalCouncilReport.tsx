import React from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";

import { Layout } from "@/components/templates";
import { Histogram, PieChart } from "@/components/organisms";

import {
  sampleAgeHistogramData,
  samplePartyPieData,
  sampleSexPieData,
} from "@/utils";

const Test: React.FC = () => (
  <Layout>
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <Histogram data={sampleAgeHistogramData} />
      <PieChart data={samplePartyPieData} />
      <PieChart data={sampleSexPieData} />
    </Flex>
  </Layout>
);

export default Test;
