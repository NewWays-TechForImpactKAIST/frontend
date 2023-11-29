import React from "react";
import { Col, ConfigProvider, Layout, Row } from "antd";
import { css } from "@emotion/react";
import { Header, Footer } from "@/components/organisms";
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
        <Col
          css={css`
            margin: 40px 0 40px 0;
          `}
          // breakpoint 기준: https://ant.design/components/grid#col
          xs={22}
          sm={17}
          md={14}
          lg={14}
          xl={13}
        >
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
