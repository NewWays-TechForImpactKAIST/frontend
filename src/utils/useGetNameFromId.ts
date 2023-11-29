import { type MetroID } from "static/MapSVGData";

/**
 *
 * @param idMap 백엔드로부터 가져온 ID 맵
 * @returns localId(Number)를 받아 metroName과 localName을 반환하는 함수
 */
export const useGetLocalNameFromId = (
  idMap: Map<MetroID, Map<string, [number, number]>>,
) => {
  // localId를 key로, [metroName, localName]을 value로 가지는 Map
  const reverseMap = new Map<number, [MetroID, string]>();

  idMap.forEach((localMap, metroName) => {
    localMap.forEach((localIds, localName) => {
      reverseMap.set(localIds[1], [metroName, localName]);
    });
  });

  const getNameFromId = (localId: number) => reverseMap.get(localId);
  return getNameFromId;
};

/**
 *
 * @param metroMap metroName을 받아 metroId(number)를 반환하는 Map
 * @returns metroId(Number)를 받아 metroName을 반환하는 함수
 */
export const useGetMetroNameFromId = (metroMap: Map<MetroID, number>) => {
  // localId를 key로, [metroName, localName]을 value로 가지는 Map
  const reverseMap = new Map<number, MetroID>();

  metroMap.forEach((metroId, metroName) => {
    reverseMap.set(metroId, metroName);
  });

  const getNameFromId = (metroId: number) => reverseMap.get(metroId);
  return getNameFromId;
};
