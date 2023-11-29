import { useParams } from "react-router-dom";
import { Divider } from "antd";
import { Layout } from "@/components/templates";
import {
  LocalCouncilCard,
  MetroCouncilCard,
  ReportIntro,
} from "@/components/organisms";

const MainPage = () => {
  const { reportType } = useParams();

  return (
    <Layout>
      <ReportIntro />
      <Divider />
      {(() => {
        switch (reportType) {
          case "localCouncil":
            return <LocalCouncilCard />;
          case "metroCouncil":
            return <MetroCouncilCard />;
          default:
            return <LocalCouncilCard />;
        }
      })()}
    </Layout>
  );
};

export default MainPage;
