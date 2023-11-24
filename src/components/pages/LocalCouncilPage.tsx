import { useEffect, useState } from "react";
import {
  LocalCouncilMapSelector,
  LocalCouncilReport,
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

const LocalCouncil = () => {
  const { metroName, localName } = useParams();
  const [metroLocalMap, setMetroLocalMap] =
    useState<Map<MetroID, Map<string, [number, number]>>>();
  useEffect(() => {
    if (!metroName || !localName) return;
    scroller.scrollTo("Report", {
      duration: 1000,
      delay: 50,
      smooth: "easeInOutQuart",
    });
  }, [metroName, localName]);
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
      <LocalCouncilMapSelector idMap={metroLocalMap} />
      <Element name="Report">
        {metroName && localName ? (
          <LocalCouncilReport
            metroName={metroName as MetroID}
            localName={localName}
            idMap={metroLocalMap}
          />
        ) : null}
      </Element>
    </Layout>
  ) : null;
};

export default LocalCouncil;
