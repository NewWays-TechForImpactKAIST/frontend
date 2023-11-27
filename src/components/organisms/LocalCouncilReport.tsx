import { useState, useEffect } from "react";
import { Flex, Space, Switch, Typography } from "antd";
import { css } from "@emotion/react";
import { type MetroID } from "static/MapSVGData";

import {
  AgeText,
  GenderText,
  PartyText,
  type AgeTextData,
  type GenderTextData,
  // type PartyTextData,
} from "@/components/molecules/LocalCouncilReportText";
import {
  Histogram,
  type ColorGroup,
  type BinData,
} from "@/components/organisms/Histogram";
import { PieChart, type PieChartData } from "@/components/organisms/PieChart";

import { axios, useGetNameFromId } from "@/utils";
import { DropdownSelector } from "../molecules";

const { Title } = Typography;

interface AgeHistogramDataAPIResponse {
  LocalCouncil: number;
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
  idMap: Map<MetroID, Map<string, [number, number]>>;
}

const LocalCouncilReport = ({ metroName, localName, idMap }: Props) => {
  const defaultData: GenderTextData = {
    metroName: metroName,
    localName: localName,
    now: {
      year: 2020,
      malePopulation: 50,
      femalePopulation: 40,
    },
    prev: {
      year: 2016,
      malePopulation: 35,
      femalePopulation: 55,
    },
    mean: {
      year: 2020,
      malePopulation: 60,
      femalePopulation: 40,
    },
  };
  const [metroId, localId] = idMap.get(metroName)?.get(localName) || [1, 1];

  const [ageHistYear] = useState<number>(2022);
  const [ageHistogramData, setAgeHistogramData] = useState<BinData[]>();
  const [ageTextData, setAgeTextData] = useState<AgeTextData>();

  const [genderTextData, setGenderTextData] = useState<GenderTextData>();
  const [sgType, setSgType] = useState<"elected" | "candidate">("elected");
  const [sgYear, setSgYear] = useState<number>(2022);

  const [genderPieChartData, setGenderPieChartData] =
    useState<PieChartData[]>();
  const [genderPieChartColorMap, setGenderPieChartColorMap] =
    useState<Map<string, string>>();

  const [partyPieChartData, setPartyPieChartData] = useState<PieChartData[]>();
  const [partyPieChartColorMap, setPartyPieChartColorMap] =
    useState<Map<string, string>>();
  // const [partyTextData, setPartyTextData] = useState<PartyTextData>();

  const getNameFromId = useGetNameFromId(idMap);

  // 백엔드로부터 텍스트 데이터를 가져옵니다.
  const fetchTextData = () => {
    axios
      .get(`localCouncil/template-data/${metroId}/${localId}?factor=age`)
      .then(response => {
        setAgeTextData(response.data as AgeTextData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    axios
      .get(`localCouncil/template-data/${metroId}/${localId}?factor=gender`)
      .then(response => {
        setGenderTextData(response.data as GenderTextData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    // axios
    //   .get(`localCouncil/template-data/${metroId}/${localId}?factor=party`)
    //   .then(response => {
    //     setPartyTextData(response.data as PartyTextData);
    //   })
    //   .catch(() => {
    //     throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
    //   });
  };

  // 백엔드로부터 그래프 색상들을 가져옵니다.
  const fetchGraphColors = () => {
    const newGenderPieChartColorMap = new Map<string, string>();
    const genderColors = [
      {
        type: "남",
        color: "#289FD4",
      },
      {
        type: "여",
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
      .get(
        `age-hist/${metroId}/${localId}?ageHistType=elected&year=${ageHistYear}&method=equal`,
      )
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
            // colorGroup: ageGroup as ColorGroup,
          });
        });
        setAgeHistogramData(newAgeHistogramData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });

    axios
      .get(`localCouncil/chart-data/${metroId}/${localId}?factor=gender`)
      .then(response => {
        const data = response.data.data as GenderPieChartDataAPIResponse;
        const newGenderPieChartData: PieChartData[] = [];
        data.forEach(({ gender, count }) => {
          newGenderPieChartData.push({
            type: gender,
            value: count,
          });
        });
        setGenderPieChartData(newGenderPieChartData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });

    axios
      .get(`localCouncil/chart-data/${metroId}/${localId}?factor=party`)
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
  };

  useEffect(fetchGraphColors, []);

  useEffect(() => {
    fetchTextData();
    fetchGraphData();
  }, [metroName, localName]);

  return (
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <Flex
        css={css`
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 20px;
        `}
      >
        <DropdownSelector
          innerText="연도를 선택하세요."
          options={["2022", "2020", "2016", "2014"]}
          onClick={key => {
            setSgYear(parseInt(key));
          }}
        />
        <Switch
          size={"default"}
          checkedChildren="후보자"
          unCheckedChildren="당선자"
          onClick={checked => {
            setSgType(checked ? "candidate" : "elected");
          }}
          defaultChecked
        />
      </Flex>

      <Title
        level={1}
      >{`${metroName} ${localName}의 지역의회 다양성 리포트`}</Title>
      <Title level={2}>연령 다양성</Title>
      {ageHistogramData ? <Histogram data={ageHistogramData} /> : null}
      <AgeText data={ageTextData} getNameFromId={getNameFromId} />
      <Title level={2}>성별 다양성</Title>
      {genderPieChartData && genderPieChartColorMap ? (
        <PieChart data={genderPieChartData} colorMap={genderPieChartColorMap} />
      ) : null}
      <GenderText data={defaultData} />
      <Title level={2}>정당 다양성</Title>
      {partyPieChartData && partyPieChartColorMap ? (
        <PieChart data={partyPieChartData} colorMap={partyPieChartColorMap} />
      ) : null}
      <PartyText getNameFromId={getNameFromId} />
    </Flex>
  );
};

export default LocalCouncilReport;
