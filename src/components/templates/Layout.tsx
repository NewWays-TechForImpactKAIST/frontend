import React from "react";
import { Layout, ConfigProvider, theme } from "antd";
import { Header, Footer } from "@/components/organisms";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const NewwaysLayout = ({ children }: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        },
        components: {
          Layout: {
            headerBg: "#F0F0F0",
            bodyBg: "#00E9A1",
            footerBg: "#F0F0F0",
          },
        },
      }}
    >
      <Layout className="layout">
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <div
            className="site-layout-content"
            style={{ background: colorBgContainer }}
          >
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default NewwaysLayout;
