import { Button, Flex } from "antd";
import { css } from "@emotion/react";
import {
  LocalSelector,
  MetroSelector,
  DropdownSelector,
} from "@/components/molecules";
import { type MetroID } from "static/MapSVGData";
import { useNavigate, useParams } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";

interface Props {
  idMap: Map<MetroID, Map<string, [number, number]>>;
  type?: "metro" | "local";
}

const MapSelector = ({ idMap, type = "local" }: Props) => {
  const { metroName } = useParams();
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      gap={40}
      css={css`
        margin: 40px 0 40px 0;
      `}
    >
      {" "}
      <DropdownSelector
        innerText="광역 의회를 선택하세요."
        options={[...idMap.keys()]}
        onClick={newMetroName =>
          type === "local"
            ? navigate(`/localCouncil/${newMetroName}`)
            : navigate(`/metroCouncil/${newMetroName}`)
        }
      />{" "}
      <MetroSelector
        onClick={newMetroName =>
          type === "local"
            ? navigate(`/localCouncil/${newMetroName}`)
            : navigate(`/metroCouncil/${newMetroName}`)
        }
      />
    </Flex>
  );
};

export default MapSelector;
