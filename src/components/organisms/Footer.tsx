import { Typography, Layout, Flex, Col, Row } from "antd";

import { SNSHomepage, SNSInstagram, SNSLinkedin, SNSYoutube } from "@/assets";

const { Title, Paragraph, Text } = Typography;
const { Footer } = Layout;

const FooterTitle = () => <Title level={5}>사단법인 뉴웨이즈(NEWWAYS)</Title>;

const FooterDescription = () => (
  <Flex vertical align="start" gap={0}>
    <Paragraph type="secondary">젊치인의 도전과 성장을 돕는 에이전시</Paragraph>
    <Text type="secondary">대표 박혜민</Text>
    <Text type="secondary">고유번호 767-82-00531</Text>
    <Text type="secondary">문의 build@newways.kr</Text>
  </Flex>
);

const FooterLinks = () => (
  <Flex align="start" gap="small">
    <a
      href="https://newways.kr"
      target="_blank"
      rel="noreferrer"
      aria-label="뉴웨이즈 홈페이지로 이동"
    >
      <SNSHomepage />
    </a>
    <a
      href="https://www.instagram.com/newways.kr/"
      target="_blank"
      rel="noreferrer"
      aria-label="뉴웨이즈 홈페이지로 이동"
    >
      <SNSInstagram />
    </a>
    <a
      href="https://kr.linkedin.com/company/newways-kr"
      target="_blank"
      rel="noreferrer"
      aria-label="뉴웨이즈 링크드인으로 이동"
    >
      <SNSLinkedin />
    </a>
    <a
      href="https://www.youtube.com/@newways_kr"
      target="_blank"
      rel="noreferrer"
      aria-label="뉴웨이즈 유튜브 채널로 이동"
    >
      <SNSYoutube />
    </a>
  </Flex>
);

const NewwaysFooter = () => (
  <Footer style={{ textAlign: "center" }}>
    <Row justify="center">
      <Col span={16}>
        <Flex vertical align="start" gap="large">
          <Flex vertical align="start" gap="mid">
            <FooterTitle />
            <FooterDescription />
          </Flex>
          <FooterLinks />
        </Flex>
      </Col>
    </Row>
  </Footer>
);

export default NewwaysFooter;
