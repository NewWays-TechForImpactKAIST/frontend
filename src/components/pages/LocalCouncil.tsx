import React from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";

import { Layout } from "@/components/templates";
import { MapSelector } from "@/components/organisms";

const LocalCouncil: React.FC = () => (
  <Layout>
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <MapSelector />
    </Flex>
  </Layout>
);

export default LocalCouncil;
