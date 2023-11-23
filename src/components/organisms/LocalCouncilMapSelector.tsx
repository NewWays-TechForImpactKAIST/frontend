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
  const [metroName, setMetroName] = useState<MetroID>();
  const { metroId: metroParam } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (metroParam) {
      idMap.forEach((value, key) => {
        if (value) {
          if (value.values().next().value[0] === metroParam) {
            setMetroName(key as MetroID);
          }
        }
      });
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
      {metroName ? (
        <LocalSelector
          selected={metroName}
          onClick={localName => {
            const idData = idMap.get(metroName)?.get(localName);
            if (!idData) return;
            navigate(`/localCouncil/${metroName}/${localName}`);
          }}
        />
      ) : (
        <MetroSelector
          onClick={id => {
            setMetroName(id as MetroID);
          }}
        />
      )}
    </Flex>
  );
};

export default LocalCouncilMapSelector;
