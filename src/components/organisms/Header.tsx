import { Col, Layout, Row } from "antd";
import { css } from "@emotion/react";
import { NewWaysLogo } from "@/assets";
import { Link } from "react-router-dom";

const { Header } = Layout;

const NewwaysHeader = () => (
  <Header
    css={css`
      padding: 0;
    `}
  >
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
        span={22}
      >
        <Link
          to="/"
          aria-label="메인 페이지로 이동"
          css={css`
            display: flex;
            justify-content: start;
            align-items: center;
          `}
        >
          <NewWaysLogo />
        </Link>
      </Col>
    </Row>
  </Header>
);

export default NewwaysHeader;
