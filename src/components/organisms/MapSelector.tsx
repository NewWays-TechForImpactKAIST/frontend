import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";
import { LocalSelector, MetroSelector } from "@/components/molecules";
import { useRecoilValue } from "recoil";
import { idMapState } from "@/recoil/idMap";
import { type MetroID } from "static/MapSVGData";
import { useNavigate, useParams } from "react-router-dom";

const LocalCouncil: React.FC = () => {
  const [metroId, setMetroId] = useState<MetroID>();
  const { metroId: metroParam } = useParams();
  const navigate = useNavigate();
  const idMap = useRecoilValue(idMapState);
  useEffect(() => {
    if (metroParam) {
      for (let [key, value] of idMap.entries()) {
        if (value) {
          if (value.values().next().value[0] == metroParam) {
            setMetroId(key as MetroID);
            break;
          }
        }
      }
    }
  }, [metroParam]);
  return (
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      {metroId ? (
        <LocalSelector
          selected={metroId}
          onClick={id => {
            const idData = idMap.get(metroId)?.get(id);
            if (!idData) return;
            navigate(`/localCouncilReport/${idData[0]}/${idData[1]}`);
          }}
        />
      ) : (
        <MetroSelector
          onClick={id => {
            setMetroId(id as MetroID);
          }}
        />
      )}
    </Flex>
  );
};

export default LocalCouncil;