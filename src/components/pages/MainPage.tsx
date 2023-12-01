import { Navigate, useParams } from "react-router-dom";
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

const METRO_NAMES: string[] = [
  "제주특별자치도",
  "경상남도",
  "경상북도",
  "전라남도",
  "전라북도",
  "충청남도",
  "충청북도",
  "강원도",
  "경기도",
  "세종특별자치시",
  "울산광역시",
  "대전광역시",
  "광주광역시",
  "대구광역시",
  "부산광역시",
  "인천광역시",
  "서울특별시",
  "",
];

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
  if (!METRO_NAMES.includes(metroName)) {
    return false;
  }

  return true;
};

const MainPage = () => {
  const { reportType = "", metroName = "", localName = "" } = useParams();
  if (!vaildateLocalAndMetroName(reportType, metroName, localName)) {
    return <Navigate to="/localCouncil" replace />;
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
