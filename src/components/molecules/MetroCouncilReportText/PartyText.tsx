import { Typography } from "antd";
import { bigParties, type ElectionYears } from "@/utils/constants";

const { Paragraph, Text } = Typography;

export type PartyTextVariation = 1 | 2;

export interface PartyTextData {
  /** 현재 연도 */
  nowYear: ElectionYears;
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
}

const defaultData: PartyTextData = {
  nowYear: 2022,
  prevElectedPartyList: [
    { party: "국민의힘", count: 5 },
    { party: "더불어민주당", count: 5 },
  ],
  nowCandidatePartyList: [
    { party: "국민의힘", count: 10 },
    { party: "더불어민주당", count: 8 },
    { party: "정의당", count: 2 },
  ],
  nowElectedPartyList: [
    { party: "국민의힘", count: 5 },
    { party: "더불어민주당", count: 4 },
    { party: "정의당", count: 1 },
  ],
};

export const PartyText = ({ variation = 1, data = defaultData }: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const {
    nowYear,
    prevElectedPartyList,
    nowCandidatePartyList,
    nowElectedPartyList,
  } = data;

  const minorPartyIncreased =
    nowElectedPartyList.length > prevElectedPartyList.length;
  const minorPartyList = nowElectedPartyList.filter(
    partyItem => bigParties[nowYear].indexOf(partyItem.party) === -1,
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
            들린다는 거죠! 여러분의 광역의회에서 다양성의 바람이 솔솔~ 역대급
            변화가 느껴지지 않나요?
          </Text>
        ) : (
          // 소수정당 당성자 수가 줄었다면 아래 텍스트 표시
          <Text>
            이번 선거는 군소정당과 무소속 후보에게 어려웠어요.. 두 거대 양당에서{" "}
            더 많은 당선자가! {bigParties[nowYear][0]}에서{" "}
            <Text strong>
              {nowElectedPartyList.filter(
                partyItem => partyItem.party === bigParties[nowYear][0],
              )[0]?.count || 0}
            </Text>
            명의 당선자가, {bigParties[nowYear][1]}에서{" "}
            <Text strong>
              {nowElectedPartyList.filter(
                partyItem => partyItem.party === bigParties[nowYear][1],
              )[0]?.count || 0}
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
            <Text strong>
              {minorPartyList.map(partyItem => partyItem.party).join(", ")}
            </Text>
            에서도 {minorPartyList.length === 1 ? "" : "각각 "}
            <Text strong>
              {minorPartyList.map(partyItem => partyItem.count).join("명, ")}
            </Text>
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
