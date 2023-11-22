import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";

import { Layout } from "@/components/templates";
import { LocalSelector, MetroSelector } from "@/components/organisms";
import { useRecoilValue } from "recoil";
import { idMapState } from "@/recoil/idMap";
import { type MetroID } from "static/MapSVGData";
import { useNavigate } from "react-router-dom";

const LocalCouncil: React.FC = () => {
  const [metroId, setMetroId] = useState<MetroID>();

  const navigate = useNavigate();
  const idMap = useRecoilValue(idMapState);
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
