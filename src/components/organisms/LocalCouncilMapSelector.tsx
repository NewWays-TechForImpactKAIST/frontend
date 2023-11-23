import { useState, useEffect } from "react";
import { Flex } from "antd";
import { css } from "@emotion/react";
import { LocalSelector, MetroSelector } from "@/components/molecules";
import { type MetroID } from "static/MapSVGData";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  idMap: Map<MetroID, Map<string, [number, number]>>;
}

const LocalCouncilMapSelector = ({ idMap }: Props) => {
  const { metroName } = useParams();
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      {metroName ? (
        <LocalSelector
          selected={metroName as MetroID}
          onClick={localName => {
            const idData = idMap.get(metroName as MetroID)?.get(localName);
            if (!idData) return;
            navigate(`/localCouncil/${metroName}/${localName}`);
          }}
        />
      ) : (
        <MetroSelector
          onClick={newMetroName => {
            navigate(`/localCouncil/${newMetroName}`);
          }}
        />
      )}
    </Flex>
  );
};

export default LocalCouncilMapSelector;
