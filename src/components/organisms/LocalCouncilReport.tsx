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
} from "@/components/molecules/LocalCouncilReportText";
import { AgeHistogram } from "@/components/organisms/Histogram";
import { PieChart } from "@/components/organisms/PieChart";

import {
  axios,
  sampleAgeHistogramData,
  samplePartyPieData,
  sampleGenderPieData,
} from "@/utils";

const { Title } = Typography;

interface Props {
  metroName: MetroID;
  localName: string;
  idMap: Map<MetroID, Map<string, [number, number]>>;
}

const LocalCouncilReport = ({ metroName, localName, idMap }: Props) => {
  const [metroId, localId] = idMap.get(metroName)?.get(localName) || [1, 1];
  const [ageTextData, setAgeTextData] = useState<AgeTextData>();
  const [genderTextData, setGenderTextData] = useState<GenderTextData>();
  const [partyTextData, setPartyTextData] = useState<PartyTextData>();

  // 백엔드로부터 텍스트 데이터를 가져옵니다.
  useEffect(() => {
    axios
      .get(`localCouncil/template-data/${metroId}/${localId}?factor=age`)
      .then(response => {
        setAgeTextData(response.data as AgeTextData);
      })
      .catch(() => {
        alert("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    axios
      .get(`localCouncil/template-data/${metroId}/${localId}?factor=gender`)
      .then(response => {
        setGenderTextData(response.data as GenderTextData);
      })
      .catch(() => {
        alert("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
    axios
      .get(`localCouncil/template-data/${metroId}/${localId}?factor=party`)
      .then(response => {
        setPartyTextData(response.data as PartyTextData);
      })
      .catch(() => {
        alert("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
  }, []);

  return (
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      <Title
        level={1}
      >{`${metroName} ${localName}의 지역의회 다양성 리포트`}</Title>
      <Title level={2}>연령 다양성</Title>
      <AgeHistogram data={sampleAgeHistogramData} />
      <AgeText data={ageTextData} />
      <Title level={2}>성별 다양성</Title>
      <PieChart
        data={sampleGenderPieData.data}
        colors={sampleGenderPieData.colors}
      />
      <GenderText data={genderTextData} />
      <Title level={2}>정당 다양성</Title>
      <PieChart
        data={samplePartyPieData.data}
        colors={samplePartyPieData.colors}
      />
      <PartyText data={partyTextData} />
    </Flex>
  );
};

export default LocalCouncilReport;
