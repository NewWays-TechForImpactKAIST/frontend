import { Typography } from "antd";
import { bigParties, type ElectionYears } from "@/utils/constants";

const { Paragraph, Text } = Typography;

export type PartyTextVariation = 1 | 2;

export interface PartyTextData {
  /** 광역시도 id */
  metroId: number;
  /** 다양성 지표 */
  partyDiversityIndex: number;
  /** 정당별 당선자 수 (이전 선거) */
  prevElected: {
    party: string;
    count: number;
  }[];
  /** 정당별 후보자 수 (현 선거) */
  currentCandidate: {
    party: string;
    count: number;
  }[];
  /** 정당별 당선자 수 (현 선거) */
  currentElected: {
    party: string;
    count: number;
  }[];
}

interface Props {
  /** 보고서 연도입니다. */
  sgYear: ElectionYears;
  /** text variation을 선택할 수 있습니다(기본값: 1). */
  variation?: PartyTextVariation;
  /** text에 들어갈 데이터입니다. */
  data?: PartyTextData;
}

const defaultData: PartyTextData = {
  metroId: 1,
  partyDiversityIndex: 0.5,
  prevElected: [
    { party: "국민의힘", count: 5 },
    { party: "더불어민주당", count: 5 },
  ],
  currentCandidate: [
    { party: "국민의힘", count: 10 },
    { party: "더불어민주당", count: 8 },
    { party: "정의당", count: 2 },
  ],
  currentElected: [
    { party: "국민의힘", count: 5 },
    { party: "더불어민주당", count: 4 },
    { party: "정의당", count: 1 },
  ],
};

export const PartyText = ({
  sgYear,
  variation = 1,
  data = defaultData,
}: Props) => {
  if (!data) return <Paragraph>데이터를 불러오는 중입니다..</Paragraph>;

  const { prevElected, currentCandidate, currentElected } = data;

  /** 소수정당 수(거대양당을 제외한 당선자의 정당 개수)가 이전 선거보다 늘었는지 여부입니다.
   * 2010년 선거는 이전 선거의 공개된 데이터가 없으므로 0과 비교합니다.
   */
  const minorPartyIncreased =
    currentElected.filter(
      ({ party }) => bigParties[sgYear].indexOf(party) === -1,
    ).length >
    (sgYear !== 2010
      ? prevElected.filter(
          ({ party }) =>
            bigParties[(sgYear - 4) as ElectionYears].indexOf(party) === -1,
        ).length
      : 0);
  const minorPartyList = currentElected.filter(
    partyItem => bigParties[sgYear].indexOf(partyItem.party) === -1,
  );
  const anonymousCount = currentElected.filter(
    partyItem => partyItem.party === "무소속",
  ).length;

  if (variation === 1)
    return (
      <Paragraph>
        <Text strong>{sgYear}</Text>년 지방선거에서는{" "}
        <Text strong>{currentCandidate.length}</Text>개 정당에서 후보자가,{" "}
        <Text strong>{currentElected.length}</Text>개 정당에서 당선자가{" "}
        나왔어요.
        <br />
        <br />
        {minorPartyIncreased ? (
          // 소수정당 당성자 수가 늘었다면 아래 텍스트 표시
          <Text>
            지난 선거에서는 <Text strong>{prevElected.length}</Text>개{" "}
            정당에서만 당선자가 나왔던 걸 생각하면, 이번엔 진짜 다양한 목소리가{" "}
            들린다는 거죠! 여러분의 광역의회에서 다양성의 바람이 솔솔~ 역대급
            변화가 느껴지지 않나요?
          </Text>
        ) : (
          // 소수정당 당성자 수가 줄었다면 아래 텍스트 표시
          <Text>
            이번 선거는 군소정당과 무소속 후보에게 어려웠어요.. 두 거대 양당에서{" "}
            더 많은 당선자가! {bigParties[sgYear][0]}에서{" "}
            <Text strong>
              {currentElected.filter(
                partyItem => partyItem.party === bigParties[sgYear][0],
              )[0]?.count || 0}
            </Text>
            명의 당선자가, {bigParties[sgYear][1]}에서{" "}
            <Text strong>
              {currentElected.filter(
                partyItem => partyItem.party === bigParties[sgYear][1],
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
