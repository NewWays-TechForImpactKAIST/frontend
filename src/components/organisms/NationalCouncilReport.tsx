import { useState, useEffect } from "react";
import { Flex, Switch, Typography } from "antd";
import { css } from "@emotion/react";
import { type MetroID } from "static/MapSVGData";

import { DropdownSelector } from "@/components/molecules";
import {
  GenderText,
  PartyText,
  type AgeTextData,
  type GenderTextData,
  type PartyTextData,
  AgeText,
} from "@/components/molecules/NationalCouncilReportText";
import {
  Histogram,
  type ColorGroup,
  type BinData,
} from "@/components/organisms/Histogram";
import { PieChart, type PieChartData } from "@/components/organisms/PieChart";

import {
  axios,
  // useGetMetroNameFromId,
  useNationalElectionYears,
  type NationalElectionYears,
} from "@/utils";

const { Title } = Typography;

interface AgeHistogramDataAPIResponse {
  metroId: number;
  localId: number;
  data: {
    minAge: number;
    maxAge: number;
    count: number;
    ageGroup: number;
  }[];
}

type Gender = "남" | "여";

type GenderPieChartDataAPIResponse = {
  gender: Gender;
  count: number;
}[];

type PartyPieChartColorAPIResponse = {
  name: string;
  color: string;
}[];

type PartyPieChartDataAPIResponse = {
  party: string;
  count: number;
}[];

interface Props {
  metroName: MetroID;
  localName: string;
  // idMap: Map<MetroID, Map<string, [number, number]>>;
  onLoaded: () => void;
}

const NationalCouncilReport = ({
  metroName,
  localName,
  // idMap,
  onLoaded,
}: Props) => {
  const nationalElectionYears = useNationalElectionYears();

  const [ageHistogramData, setAgeHistogramData] = useState<BinData[]>();
  const [ageTextData, setAgeTextData] = useState<AgeTextData>();

  const [genderTextData, setGenderTextData] = useState<GenderTextData>();
  const [sgType, setSgType] = useState<"elected" | "candidate">("elected");
  const [sgYear, setSgYear] = useState<number>(2020);

  const [genderPieChartData, setGenderPieChartData] =
    useState<PieChartData[]>();
  const [genderPieChartColorMap, setGenderPieChartColorMap] =
    useState<Map<string, string>>();

  const [partyPieChartData, setPartyPieChartData] = useState<PieChartData[]>();
  const [partyPieChartColorMap, setPartyPieChartColorMap] =
    useState<Map<string, string>>();
  const [partyTextData, setPartyTextData] = useState<PartyTextData>();

  // 백엔드로부터 텍스트 데이터를 가져옵니다.
  const fetchTextData = () => {
    axios
      .get(`nationalCouncil/template-data?factor=age&year=${sgYear}`)
      .then(response => {
        setAgeTextData(response.data as AgeTextData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    axios
      .get(`nationalCouncil/template-data?factor=gender&year=${sgYear}`)
      .then(response => {
        setGenderTextData(response.data as GenderTextData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    axios
      .get(`nationalCouncil/template-data?factor=party&year=${sgYear}`)
      .then(response => {
        setPartyTextData(response.data as PartyTextData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  // 백엔드로부터 그래프 색상들을 가져옵니다.
  const fetchGraphColors = () => {
    const newGenderPieChartColorMap = new Map<string, string>();
    const genderColors = [
      {
        type: "남성",
        color: "#289FD4",
      },
      {
        type: "여성",
        color: "#AE2D6C",
      },
    ];
    genderColors.forEach(({ type, color }) => {
      newGenderPieChartColorMap.set(type, color);
    });
    setGenderPieChartColorMap(newGenderPieChartColorMap);

    axios
      .get("localCouncil/partyInfo")
      .then(response => {
        const data = response.data as PartyPieChartColorAPIResponse;
        const newPartyPieChartColorMap = new Map<string, string>();
        data.forEach(({ name, color }) => {
          newPartyPieChartColorMap.set(name, color);
        });
        setPartyPieChartColorMap(newPartyPieChartColorMap);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  // 백엔드로부터 그래프 데이터를 가져옵니다.
  const fetchGraphData = () => {
    axios
      .get(`age-hist/?ageHistType=${sgType}&year=${sgYear}&method=equal`)
      .then(response => {
        const data = response.data as AgeHistogramDataAPIResponse;
        const newAgeHistogramData: BinData[] = [];

        // colorGroup이 백엔드에서 정렬되어 도착한다는 보장이 없습니다.
        // 예를 들어, 35세의 colorGroup이 1이지만, 36세의 colorGroup이 0일 수 있습니다.
        const colorGroupMap = new Map<ColorGroup, ColorGroup>();
        let lastColorGroup: ColorGroup = 0;

        data.data.forEach(({ minAge, maxAge, count, ageGroup }) => {
          if (!colorGroupMap.has(ageGroup as ColorGroup)) {
            colorGroupMap.set(ageGroup as ColorGroup, lastColorGroup);
            lastColorGroup += 1;
          }
          newAgeHistogramData.push({
            binMin: minAge,
            binMax: maxAge,
            count,
            colorGroup: colorGroupMap.get(ageGroup as ColorGroup) || 0,
          });
        });
        setAgeHistogramData(newAgeHistogramData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });

    if (sgType === "candidate") {
      axios
        .get(`nationalCouncil/template-data?year=${sgYear}&factor=party`)
        .then(response => {
          const data = response.data as PartyTextData;
          const newPartyPieChartData: PieChartData[] = [];
          data.currentCandidate.forEach(({ party, count }) => {
            newPartyPieChartData.push({
              type: party,
              value: count,
            });
          });
          setPartyPieChartData(newPartyPieChartData);
        })
        .catch(() => {
          throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
        });
      axios
        .get(`nationalCouncil/template-data?year=${sgYear}&factor=gender`)
        .then(response => {
          const data = response.data as GenderTextData;
          const newGenderPieChartData: PieChartData[] = [];
          newGenderPieChartData.push({
            type: `남성`,
            value: data.currentCandidate.malePop,
          });
          newGenderPieChartData.push({
            type: `여성`,
            value: data.currentCandidate.femalePop,
          });
          setGenderPieChartData(newGenderPieChartData);
        })
        .catch(() => {
          throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
        });
    } else {
      axios
        .get(`nationalCouncil/chart-data?factor=party&year=${sgYear}`)
        .then(response => {
          const data = response.data.data as PartyPieChartDataAPIResponse;
          const newPartyPieChartData: PieChartData[] = [];
          data.forEach(({ party, count }) => {
            newPartyPieChartData.push({
              type: party,
              value: count,
            });
          });
          setPartyPieChartData(newPartyPieChartData);
        })
        .catch(() => {
          throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
        });
      axios
        .get(`nationalCouncil/chart-data?factor=gender&year=${sgYear}`)
        .then(response => {
          const data = response.data.data as GenderPieChartDataAPIResponse;
          const newGenderPieChartData: PieChartData[] = [];
          data.forEach(({ gender, count }) => {
            newGenderPieChartData.push({
              type: `${gender}성`,
              value: count,
            });
          });
          setGenderPieChartData(newGenderPieChartData);
        })
        .catch(() => {
          throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
        });
    }
  };

  useEffect(fetchGraphColors, []);

  useEffect(() => {
    onLoaded();
    fetchTextData();
  }, [metroName, localName, sgYear]);

  useEffect(() => {
    fetchGraphData();
  }, [sgType, sgYear, metroName, localName]);

  return (
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <Title
        level={2}
        css={css`
          word-break: keep-all;
        `}
      >{`${sgYear}년도 ${
        sgType === "candidate" ? "후보자" : "당선자"
      } 총선 다양성 리포트`}</Title>
      <Flex
        css={css`
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 20px;
        `}
      >
        <DropdownSelector
          innerText="연도를 선택해주세요."
          options={nationalElectionYears
            .filter(election => election.year !== 2008)
            .map(election => `${election.year}년 (제${election.ordinal}대)`)}
          onClick={key => {
            // key: "YYYY년 (제NN대)"
            setSgYear(parseInt(key.split("년")[0]));
          }}
        />
        <Switch
          size="default"
          checkedChildren="당선자"
          unCheckedChildren="후보자"
          onClick={checked => {
            setSgType(checked ? "elected" : "candidate");
          }}
          defaultChecked
        />
      </Flex>
      <Title level={3}>연령 다양성</Title>
      {ageHistogramData ? <Histogram data={ageHistogramData} /> : null}
      <AgeText data={ageTextData} />
      <Title level={3}>성별 다양성</Title>
      {genderPieChartData && genderPieChartColorMap ? (
        <PieChart data={genderPieChartData} colorMap={genderPieChartColorMap} />
      ) : null}
      {genderTextData ? (
        <GenderText sgType={sgType} data={genderTextData} />
      ) : null}
      <Title level={3}>정당 다양성</Title>
      {partyPieChartData && partyPieChartColorMap ? (
        <PieChart data={partyPieChartData} colorMap={partyPieChartColorMap} />
      ) : null}
      {partyTextData ? (
        <PartyText
          sgYear={sgYear as NationalElectionYears}
          data={partyTextData}
        />
      ) : null}
    </Flex>
  );
};

export default NationalCouncilReport;
