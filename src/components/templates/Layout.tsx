import React from "react";
import { Col, ConfigProvider, Layout, Row } from "antd";
import { css } from "@emotion/react";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "@/components/organisms";

const { Content } = Layout;

interface Props {
  children: React.ReactNode;
}

const NewwaysLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  return (
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
            headerBg: "#CCCCCC",
            bodyBg: "#EFEFEF",
            footerBg: "#CCCCCC",
          },
          Tabs: {
            horizontalMargin: "0px",
            itemColor: "#8C8C8C",
            itemSelectedColor: "#222222",
          },
        },
      }}
    >
      <Layout className="layout">
        <Header />
        <Row justify="center">
          {/* breakpoint: 768px */}
          <Col span={22} md={11}>
            <PageContainer
              tabList={[
                { tab: "지역의회", key: "localCouncil" },
                { tab: "광역의회", key: "metroCouncil" },
              ]}
              tabProps={{
                type: "line",
              }}
              onTabChange={key => {
                navigate(`/${key}`);
              }}
              tabActiveKey={window.location.pathname.split("/")[1]}
            >
              <ProCard color="#F2F2F2">
                <Content
                  css={css`
                    padding: 0;
                  `}
                >
                  {children}
                </Content>
              </ProCard>
            </PageContainer>
          </Col>
        </Row>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default NewwaysLayout;
