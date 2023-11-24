import { useState, useEffect } from "react";
import { Button, Flex } from "antd";
import { css } from "@emotion/react";
import { LocalSelector, MetroSelector } from "@/components/molecules";
import { type MetroID } from "static/MapSVGData";
import { useNavigate, useParams } from "react-router-dom";
import DropdownSelector from "@/components/molecules/DropdownSelector";
import { RollbackOutlined } from "@ant-design/icons";

interface Props {
  idMap: Map<MetroID, Map<string, [number, number]>>;
}

const LocalCouncil = ({ idMap }: Props) => {
  const [metroId, setMetroId] = useState<MetroID>();
  const { metroId: metroParam } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (metroParam) {
      idMap.forEach((value, key) => {
        if (value) {
          if (value.values().next().value[0] === metroParam) {
            setMetroId(key as MetroID);
          }
        }
      });
    }
  }, [metroParam]);
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
      {metroId ? (
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
              options={[...(idMap.get(metroId)?.keys() || [])]}
              onClick={id => {
                const idData = idMap.get(metroId)?.get(id);
                if (!idData) return;
                navigate(`/localCouncilReport/${idData[0]}/${idData[1]}`);
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
                setMetroId(undefined);
                navigate(`/localCouncil`);
              }}
            >
              <RollbackOutlined />
            </Button>
          </Flex>
          <LocalSelector
            selected={metroId}
            onClick={id => {
              const idData = idMap.get(metroId)?.get(id);
              if (!idData) return;
              navigate(`/localCouncilReport/${idData[0]}/${idData[1]}`);
            }}
          />
        </>
      ) : (
        <>
          <DropdownSelector
            innerText="광역 의회를 선택하세요."
            options={[...idMap.keys()]}
            onClick={value => setMetroId(value as MetroID)}
          />
          <MetroSelector
            onClick={id => {
              setMetroId(id as MetroID);
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default LocalCouncil;
