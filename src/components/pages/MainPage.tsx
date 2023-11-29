import { useParams } from "react-router-dom";
import { Layout } from "@/components/templates";

import { LocalCouncilCard, MetroCouncilCard } from "@/components/organisms";

const MainPage = () => {
  const { reportType } = useParams();

  return (
    <Layout>
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
