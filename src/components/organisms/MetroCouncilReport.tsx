import { useState, useEffect } from "react";
import { Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { type MetroID } from "static/MapSVGData";

import {
  AgeText,
  GenderText,
  PartyText,
  type AgeTextData,
  type GenderTextData,
  type PartyTextData,
} from "@/components/molecules/MetroCouncilReportText";
// import { Histogram } from "@/components/organisms/Histogram";
import { PieChart, type PieChartData } from "@/components/organisms/PieChart";

import { axios, useGetNameFromId } from "@/utils";

const { Title } = Typography;

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

const MetroCouncilReport = ({ metroName, localName, idMap }: Props) => {
  const [metroId] = idMap.get(metroName)?.get(localName) || [1, 1];
  const [ageTextData, setAgeTextData] = useState<AgeTextData>();
  const [genderTextData, setGenderTextData] = useState<GenderTextData>();
  const [genderPieChartData, setGenderPieChartData] =
    useState<PieChartData[]>();
  const [genderPieChartColorMap, setGenderPieChartColorMap] =
    useState<Map<string, string>>();
  const [partyPieChartData, setPartyPieChartData] = useState<PieChartData[]>();
  const [partyPieChartColorMap, setPartyPieChartColorMap] =
    useState<Map<string, string>>();
  const [partyTextData, setPartyTextData] = useState<PartyTextData>();

  const getNameFromId = useGetNameFromId(idMap);

  // 백엔드로부터 텍스트 데이터를 가져옵니다.
  const fetchTextData = () => {
    axios
      .get(`metroCouncil/template-data/${metroId}?factor=age`)
      .then(response => {
        setAgeTextData(response.data as AgeTextData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    axios
      .get(`metroCouncil/template-data/${metroId}?factor=gender`)
      .then(response => {
        setGenderTextData(response.data as GenderTextData);
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    axios
      .get(`metroCouncil/template-data/${metroId}?factor=party`)
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
      .get(`metroCouncil/chart-data/${metroId}?factor=gender`)
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
      .get(`metroCouncil/chart-data/${metroId}?factor=party`)
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
  }, [metroName]);

  return (
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <Title level={1}>{`${metroName}의 광역의회 다양성 리포트`}</Title>
      <Title level={2}>연령 다양성</Title>
      {/* <Histogram data={sampleAgeHistogramData} /> */}
      <AgeText data={ageTextData} getNameFromId={getNameFromId} />
      <Title level={2}>성별 다양성</Title>
      {genderPieChartData && genderPieChartColorMap ? (
        <PieChart data={genderPieChartData} colorMap={genderPieChartColorMap} />
      ) : null}
      <GenderText data={genderTextData} />
      <Title level={2}>정당 다양성</Title>
      {partyPieChartData && partyPieChartColorMap ? (
        <PieChart data={partyPieChartData} colorMap={partyPieChartColorMap} />
      ) : null}
      <PartyText data={partyTextData} />
    </Flex>
  );
};

export default MetroCouncilReport;
