import { Col, Layout, Row } from "antd";
import { css } from "@emotion/react";
import { NewWaysLogo } from "@/assets";

const { Header } = Layout;

const NewwaysHeader = () => (
  <Header>
    <Row
      justify="center"
      align="stretch"
      css={css`
        height: 100%;
      `}
    >
      <Col
        css={css`
          display: flex;
          justify-content: start;
          align-items: center;
        `}
        span={16}
      >
        <NewWaysLogo />
      </Col>
    </Row>
  </Header>
);

export default NewwaysHeader;
