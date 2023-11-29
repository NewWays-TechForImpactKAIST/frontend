import React from "react";
import { Col, ConfigProvider, Layout, Row } from "antd";
import { css } from "@emotion/react";
import { Header, NavigationCard, Footer } from "@/components/organisms";

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
        fontSize: 16,
      },
      components: {
        Layout: {
          // Header, Content, Footer의 배경색을 설정합니다.
          headerBg: "#CCCCCC",
          bodyBg: "#F1F1F1",
          footerBg: "#CCCCCC",
        },
      },
    }}
  >
    <Layout className="layout">
      <Header />
      <Row justify="center">
        {/* breakpoint: 768px */}
        <Col span={22} md={11}>
          <NavigationCard />
          <Content
            css={css`
              padding: 0;
            `}
          >
            {children}
          </Content>
        </Col>
      </Row>
      <Footer />
    </Layout>
  </ConfigProvider>
);

export default NewwaysLayout;
