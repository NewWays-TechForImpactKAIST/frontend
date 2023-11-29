import React from "react";
import { Col, ConfigProvider, Layout, Row, Card } from "antd";
import { css } from "@emotion/react";
import { Header, TabSelector, Footer } from "@/components/organisms";
import colors from "@/styles/colors";

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
          // Header, Footer의 배경색을 설정합니다.
          headerBg: colors.white,
          bodyBg: colors.black,
          footerBg: colors.white,
        },
      },
    }}
  >
    <Layout className="layout">
      <Header />
      <Row justify="center">
        {/* breakpoint: 768px */}
        <Col
          css={css`
            margin: 40px 0 40px 0;
          `}
          span={22}
          md={11}
        >
          <TabSelector />
          <Card
            bodyStyle={{
              backgroundColor: colors.white,
            }}
            css={css`
              border-radius: 0px;
              border: 0px;
            `}
          >
            <Content
              css={css`
                padding: 0;
              `}
            >
              {children}
            </Content>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Layout>
  </ConfigProvider>
);

export default NewwaysLayout;
