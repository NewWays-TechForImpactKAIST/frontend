import { useNavigate, useParams } from "react-router-dom";
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

const BANNED_METRO = ["제주특별자치도", "세종특별자치시"];

const BANNED_LOCAL = ["군위군"];

const vaildateLocalAndMetroName = (
  reportType: string,
  metroName: string,
  localName: string,
) => {
  if (
    reportType === "localCouncil" &&
    (BANNED_LOCAL.includes(localName) || BANNED_METRO.includes(metroName))
  ) {
    return false;
  }

  return true;
};
const MainPage = () => {
  const { reportType = "", metroName = "", localName = "" } = useParams();
  const navigate = useNavigate();
  if (!vaildateLocalAndMetroName(reportType, metroName, localName)) {
    navigate("/localCouncil", { replace: true });
  }

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
