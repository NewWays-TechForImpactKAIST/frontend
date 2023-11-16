import { Layout } from "antd";
import { NewWaysLogo } from "@/assets";

const { Header } = Layout;

const NewwaysHeader = () => (
  <Header style={{ display: "flex", alignItems: "center" }}>
    <NewWaysLogo />
  </Header>
);

export default NewwaysHeader;
