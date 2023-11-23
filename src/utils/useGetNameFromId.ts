import { type MetroID } from "static/MapSVGData";

/**
 *
 * @param idMap 백엔드로부터 가져온 ID 맵
 * @returns localId(Number)를 받아 metroName과 localName을 반환하는 함수
 */
const useGetNameFromId = (
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

export default useGetNameFromId;
