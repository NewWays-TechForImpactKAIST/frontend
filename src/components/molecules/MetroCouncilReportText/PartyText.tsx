import { Typography } from "antd";
import { bigParties } from "@/utils/constants";

const { Paragraph, Text } = Typography;

export type PartyTextVariation = 1 | 2;

export interface PartyTextData {
  /** 현재 연도 */
  nowYear: number;
  /** 지역의회 id */
  localId: number;
  /** 정당별 당선자 수 (이전 선거) */
  prevElectedPartyList: {
    party: string;
    count: number;
  }[];
  /** 정당별 후보자 수 (현 선거) */
  nowCandidatePartyList: {
    party: string;
    count: number;
  }[];
  /** 정당별 당선자 수 (현 선거) */
  nowElectedPartyList: {
    party: string;
    count: number;
  }[];
}

interface Props {
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: PartyTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: PartyTextData;
  /** localId로부터 지역의회 이름을 얻어내는 함수입니다. */
  getNameFromId: (id: number) => [string, string] | undefined;
}

export const PartyText = ({
  variation = 1,
  data = undefined,
  getNameFromId,
}: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const {
    nowYear,
    localId,
    prevElectedPartyList,
    nowCandidatePartyList,
    nowElectedPartyList,
  } = data;

  const minorPartyIncreased =
    nowElectedPartyList.length > prevElectedPartyList.length;
  const minorPartyList = nowElectedPartyList.filter(
    partyItem => bigParties.indexOf(partyItem.party) === -1,
  );
  const anonymousCount = nowElectedPartyList.filter(
    partyItem => partyItem.party === "무소속",
  ).length;

  if (variation === 1)
    return (
      <Paragraph>
        <Text strong>{nowYear}</Text>년 지방선거에서는{" "}
        <Text strong>{nowCandidatePartyList.length}</Text>개 정당에서 후보자가,{" "}
        <Text strong>{nowElectedPartyList.length}</Text>개 정당에서 당선자가{" "}
        나왔어요.
        <br />
        <br />
        {minorPartyIncreased ? (
          // 소수정당 당성자 수가 늘었다면 아래 텍스트 표시
          <Text>
            지난 선거에서는 <Text strong>{prevElectedPartyList.length}</Text>개{" "}
            정당에서만 당선자가 나왔던 걸 생각하면, 이번엔 진짜 다양한 목소리가{" "}
            들린다는 거죠! 여러분의{" "}
            <Text strong>{getNameFromId(localId)?.join(" ")}</Text>에서 다양성의{" "}
            바람이 솔솔~ 역대급 변화가 느껴지지 않나요?
          </Text>
        ) : (
          // 소수정당 당성자 수가 줄었다면 아래 텍스트 표시
          <Text>
            이번 선거는 군소정당과 무소속 후보에게 어려웠어요.. 두 거대 양당에서{" "}
            더 많은 당선자가! {bigParties[0]}에서는{" "}
            <Text strong>
              {
                nowElectedPartyList.filter(
                  partyItem => partyItem.party === bigParties[0],
                )[0].count
              }
            </Text>
            명의 당선자가, {bigParties[1]}에서는{" "}
            <Text strong>
              {
                nowElectedPartyList.filter(
                  partyItem => partyItem.party === bigParties[1],
                )[0].count
              }
            </Text>{" "}
            명의 당선자가 나왔어요. 지난 선거에 비하면 소수정당의 목소리가 좀{" "}
            줄어든 느낌이에요.
          </Text>
        )}
        {minorPartyList.length !== 0 ? (
          // 소수정당 당선자가 있으면 아래 텍스트 추가
          <>
            <br />
            <br />
            이번 지방선거에서는{" "}
            {minorPartyList
              .map(partyItem => partyItem.party)
              .join(", ")}에서도 {"각각 "}
            {minorPartyList.map(partyItem => partyItem.count).join("명, ")}
            명의 당선자가 나왔어요.{" "}
          </>
        ) : null}
        {anonymousCount !== 0 ? (
          // 무소속 당선자가 있으면 아래 텍스트 추가
          <>
            <br />
            <br />
            무소속 후보도 {anonymousCount}명이 당선됐어요.
          </>
        ) : null}
      </Paragraph>
    );
  return <Paragraph>존재하지 않는 템플릿입니다.</Paragraph>;
};
