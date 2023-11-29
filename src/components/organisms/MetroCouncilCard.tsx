import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Element, scroller } from "react-scroll";

import { type MetroID } from "static/MapSVGData";
import axios from "@/utils/axios";
import MapSelector from "./MapSelector";
import MetroCouncilReport from "./MetroCouncilReport";
import { Divider } from "antd";

type RegionInfo = {
  id: number;
  name: MetroID;
  local: LocalInfo[];
};

type LocalInfo = {
  name: string;
  id: number;
};

const MetroCouncilCard = () => {
  const { metroName } = useParams();
  const [metroLocalMap, setMetroLocalMap] =
    useState<Map<MetroID, Map<string, [number, number]>>>();
  const [metroMap, setMetroMap] = useState<Map<MetroID, number>>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!metroName) return;
    scroller.scrollTo("Report", {
      duration: 1000,
      delay: 50,
      smooth: "easeInOutQuart",
    });
  }, [metroName, isLoaded]);
  useEffect(() => {
    const idMap = new Map<MetroID, Map<string, [number, number]>>();
    const metroAPIMap = new Map<MetroID, number>();
    axios.get("/localCouncil/regionInfo").then(response => {
      response.data.forEach((region: RegionInfo) => {
        region.local.forEach((local: LocalInfo) => {
          if (idMap.has(region.name)) {
            idMap.get(region.name)?.set(local.name, [region.id, local.id]);
            return;
          }
          idMap.set(
            region.name,
            new Map<string, [number, number]>([
              [local.name, [region.id, local.id]],
            ]),
          );
          metroAPIMap.set(region.name, region.id);
        });
      });
      setMetroLocalMap(idMap);
      setMetroMap(metroAPIMap);
    });
  }, []);
  return metroLocalMap ? (
    <>
      <MapSelector idMap={metroLocalMap} type="metro" />
      <Divider />
      <Element name="Report">
        {metroName && metroMap ? (
          <MetroCouncilReport
            metroName={metroName as MetroID}
            metroMap={metroMap}
            onLoaded={() => setIsLoaded(true)}
          />
        ) : null}
      </Element>
    </>
  ) : null;
};

export default MetroCouncilCard;
