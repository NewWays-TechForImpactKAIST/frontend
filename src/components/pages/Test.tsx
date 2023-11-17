import React from "react";
import { Layout, theme } from "antd";

import { TestChart } from "@/components/organisms";
import {
  LocalSelector,
  MetroSelector,
} from "@/components/organisms/MapSelector";

const { Header, Content, Footer } = Layout;

const Test: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <TestChart />
          <LocalSelector
            selected="서울특별시"
            onClick={id => {
              alert(id);
            }}
          />
          <MetroSelector />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Test;
