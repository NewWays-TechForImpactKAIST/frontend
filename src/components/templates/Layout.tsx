import React from "react";
import { Col, ConfigProvider, Layout, Row } from "antd";
import { Header, Footer } from "@/components/organisms";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const NewwaysLayout = ({ children }: Props) => (
  <ConfigProvider
    theme={{
      token: {
        // 기본 폰트는 Pretendard로 설정합니다.
        fontFamily:
          "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      },
      components: {
        Layout: {
          // Header, Content, Footer의 배경색을 설정합니다.
          headerBg: "#F0F0F0",
          bodyBg: "#00E9A1",
          footerBg: "#F0F0F0",
        },
      },
    }}
  >
    <Layout className="layout">
      <Header />
      <Row justify="center">
        <Col span={22}>
          <Content
            style={{ padding: "0", display: "flex", justifyContent: "center" }}
          >
            <div
              className="site-layout-content"
              style={{
                background: "#00E9A1",
                maxWidth: "700px",

                // alignItems: "center",
              }}
            >
              {children}
            </div>
          </Content>
        </Col>
      </Row>
      <Footer />
    </Layout>
  </ConfigProvider>
);

export default NewwaysLayout;
