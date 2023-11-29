import { PageContainer } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";

const NavigationCard = () => {
  const navigate = useNavigate();
  return (
    <PageContainer
      tabList={[
        { tab: "지역의회", key: "localCouncil" },
        { tab: "광역의회", key: "metroCouncil" },
      ]}
      onTabChange={key => {
        navigate(`/${key}`);
      }}
      tabActiveKey={window.location.pathname.split("/")[1]}
    />
  );
};

export default NavigationCard;
