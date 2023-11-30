import { useParams } from "react-router-dom";
import { Divider } from "antd";
import { Layout } from "@/components/templates";
import { Card } from "@/components/atoms";
import {
  LocalCouncilCard,
  MetroCouncilCard,
  NationalCouncilCard,
  ReportIntro,
  TabSelector,
} from "@/components/organisms";

const MainPage = () => {
  const { reportType = "" } = useParams();

  return (
    <Layout>
      <TabSelector />
      <Card>
        <ReportIntro reportType={reportType} />
        <Divider />
        {(() => {
          switch (reportType) {
            case "localCouncil":
              return <LocalCouncilCard />;
            case "metroCouncil":
              return <MetroCouncilCard />;
            case "nationalCouncil":
              return <NationalCouncilCard />;
            default:
              return <LocalCouncilCard />;
          }
        })()}
      </Card>
    </Layout>
  );
};

export default MainPage;
