import React from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";

import { Layout } from "@/components/templates";
import { TestChart } from "@/components/organisms";

const Test: React.FC = () => (
  <Layout>
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <TestChart />
      <TestChart />
      <TestChart />
    </Flex>
  </Layout>
);

export default Test;
