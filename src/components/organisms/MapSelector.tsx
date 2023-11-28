import { Button, Flex, Breadcrumb } from "antd";
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
  const { metroName, localName } = useParams();
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
      {metroName && type === "local" ? (
        <>
          <div
            css={css`
              text-align: left;
              width: 100%;
              font-size: 24pt;
            `}
          >
            <Breadcrumb
              items={(
                [
                  {
                    title: (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a>뉴웨이즈 다양성 리포트</a>
                    ),
                    onClick: () => navigate(`/localCouncil`),
                  },
                ] as { title: string | JSX.Element; onClick: () => void }[]
              )
                .concat(
                  metroName
                    ? [
                        {
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          title: <a>{metroName}</a>,
                          onClick: () => navigate(`/localCouncil/${metroName}`),
                        },
                      ]
                    : [],
                )
                .concat(
                  localName ? [{ title: localName, onClick: () => {} }] : [],
                )}
            />
          </div>
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
              onClick={local => {
                const idData = idMap.get(metroName as MetroID)?.get(local);
                if (!idData) return;
                navigate(`/localCouncil/${metroName}/${local}`);
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
            onClick={local => {
              const idData = idMap.get(metroName as MetroID)?.get(local);
              if (!idData) return;
              navigate(`/localCouncil/${metroName}/${local}`);
            }}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Flex>
  );
};

export default MapSelector;
