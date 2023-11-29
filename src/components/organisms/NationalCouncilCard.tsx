import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Element, scroller } from "react-scroll";

import { type MetroID } from "static/MapSVGData";
import axios from "@/utils/axios";
import MapSelector from "./MapSelector";
import NationalCouncilReport from "./NationalCouncilReport";
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

const NationalCouncilCard = () => {
  const { metroName, localName } = useParams();
  const [metroLocalMap, setMetroLocalMap] =
    useState<Map<MetroID, Map<string, [number, number]>>>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!metroName || !localName) return;
    scroller.scrollTo("Report", {
      duration: 1000,
      delay: 50,
      smooth: "easeInOutQuart",
    });
  }, [metroName, localName, isLoaded]);

  useEffect(() => {
    const idMap = new Map<MetroID, Map<string, [number, number]>>();
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
        });
      });
      setMetroLocalMap(idMap);
    });
  }, []);
  return metroLocalMap ? (
    <>
      <MapSelector idMap={metroLocalMap} />
      <Divider />
      <Element name="Report">
        {metroName && localName ? (
          <NationalCouncilReport
            metroName={metroName as MetroID}
            localName={localName}
            idMap={metroLocalMap}
            onLoaded={() => setIsLoaded(true)}
          />
        ) : null}
      </Element>
    </>
  ) : null;
};

export default NationalCouncilCard;
