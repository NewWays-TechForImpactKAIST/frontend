import React from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";

import { Layout } from "@/components/templates";
import { LocalSelector, MetroSelector } from "@/components/organisms";

const LocalCouncil: React.FC = () => (
  <Layout>
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <LocalSelector
        selected="서울특별시"
        onClick={id => {
          alert(id);
        }}
      />
      <MetroSelector
        onClick={id => {
          alert(id);
        }}
      />
    </Flex>
  </Layout>
);

export default LocalCouncil;
