import { selector } from "recoil";
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

export const idMapState = selector({
  key: "idMapState",
  get: async () => {
    const idMap = new Map<MetroID, Map<string, [number, number]>>();
    const response = await axios.get("/localCouncil/regionInfo");
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
    return idMap;
  },
});
