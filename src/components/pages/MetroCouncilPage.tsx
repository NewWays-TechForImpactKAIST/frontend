import { useEffect, useState } from "react";
import {
  MapSelector,
  LocalCouncilReport,
  MetroCouncilReport,
} from "@/components/organisms";
import { useParams } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import { Layout } from "@/components/templates";
import { type MetroID } from "static/MapSVGData";
import axios from "@/utils/axios";

type RegionInfo = {
  id: number;
  name: MetroID;
  local: LocalInfo[];
};

type LocalInfo = {
  name: string;
  id: number;
};

const MetroCouncilPage = () => {
  const { metroName } = useParams();
  const [metroLocalMap, setMetroLocalMap] =
    useState<Map<MetroID, Map<string, [number, number]>>>();
  useEffect(() => {
    if (!metroName) return;
    scroller.scrollTo("Report", {
      duration: 1000,
      delay: 50,
      smooth: "easeInOutQuart",
    });
  }, [metroName]);
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
    <Layout>
      <MapSelector idMap={metroLocalMap} type={"metro"} />
      <Element name="Report">
        {metroName ? (
          <MetroCouncilReport
            metroName={metroName as MetroID}
            localName={"삼척"}
            idMap={metroLocalMap}
          />
        ) : null}
      </Element>
    </Layout>
  ) : null;
};

export default MetroCouncilPage;