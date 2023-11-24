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
}

const LocalCouncilMapSelector = ({ idMap }: Props) => {
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
      {metroName ? (
        <>
          <Flex
            justify="center"
            align="center"
            css={css`
              width: 100%;
            `}
          >
            <DropdownSelector
              innerText="기초 의회를 선택하세요."
              options={[...(idMap.get(metroName as MetroID)?.keys() || [])]}
              onClick={localName => {
                const idData = idMap.get(metroName as MetroID)?.get(localName);
                if (!idData) return;
                navigate(`/localCouncil/${metroName}/${localName}`);
              }}
            />
            <div
              css={css`
                width: 5%;
              `}
            />
            <Button
              type="primary"
              css={css`
                height: 25pt;
              `}
              onClick={() => {
                navigate(`/localCouncil`);
              }}
            >
              <RollbackOutlined />
            </Button>
          </Flex>
          <LocalSelector
            selected={metroName as MetroID}
            onClick={localName => {
              const idData = idMap.get(metroName as MetroID)?.get(localName);
              if (!idData) return;
              navigate(`/localCouncil/${metroName}/${localName}`);
            }}
          />
        </>
      ) : (
        <>
          {" "}
          <DropdownSelector
            innerText="광역 의회를 선택하세요."
            options={[...idMap.keys()]}
            onClick={newMetroName => navigate(`/localCouncil/${newMetroName}`)}
          />{" "}
          <MetroSelector
            onClick={newMetroName => {
              navigate(`/localCouncil/${newMetroName}`);
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default LocalCouncilMapSelector;
