import { MapSVG, type MetroID, MetroInfo } from "@/../static/MapSVGData";
import { type ReactNode, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { axios, hexToRgb, majorBlend, rgbToHex } from "@/utils";
import { Flex, Switch } from "antd";
import { useSearchParams } from "react-router-dom";

interface Props {
  selected: MetroID;
  idMap: Map<MetroID, Map<string, [number, number]>>;
  onClick?: (local: string) => void;
}

type Color = { r: number; g: number; b: number };

const LocalSelector = ({ selected, idMap, onClick = () => {} }: Props) => {
  const partyColorMap = new Map<string, Color>();
  const [coloring, setColoring] = useState<"none" | "party">("party");
  const [localPartyColor, setLocalPartyColor] = useState<Map<string, string>>();
  const [searchParams] = useSearchParams();
  const sgYear = searchParams.get("year") || "2022";
  const fetchPartyColor = async () => {
    await axios
      .get("localCouncil/partyInfo")
      .then(response => {
        const data = response.data as { name: string; color: string }[];
        partyColorMap.clear();
        data.forEach(({ name, color }) => {
          partyColorMap.set(name, hexToRgb(color));
        });
      })
      .catch(() => {
        throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const fetchPartyData = () => {
    idMap.get(selected)?.forEach((value, key) => {
      axios
        .get(
          `localCouncil/chart-data/${value[0]}/${value[1]}?factor=party&year=${sgYear}`,
        )
        .then(response => {
          setLocalPartyColor(prev => {
            const data = response.data.data as {
              party: string;
              count: number;
            }[];
            const blended = majorBlend(
              data.map(({ party, count }) => ({
                color: partyColorMap.get(party) ?? {
                  r: 0xff,
                  g: 0xff,
                  b: 0xff,
                },
                weight: count,
              })),
            );
            return new Map(
              Array.from(prev?.entries() || []).concat([
                [
                  key,
                  rgbToHex({
                    r: blended.r,
                    g: blended.g,
                    b: blended.b,
                  }),
                ],
              ]),
            );
          });
        })
        .catch(() => {
          throw new Error("네트워크 문제가 발생했습니다. 다시 시도해주세요.");
        });
    });
  };
  useEffect(() => {
    fetchPartyColor().then(fetchPartyData);
  }, [searchParams.get("year")]);
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      css={css`
        width: 100%;
      `}
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox={MetroInfo[selected]?.viewBox || "0 0 509 716.1"}
        xmlSpace="preserve"
        css={css`
          @media (max-width: 768px) {
            width: 80%;
          }
          width: 60%;

          fill: ${MetroInfo[selected]?.color || "#4CC9F0"};
          stroke: #080808;
          stroke-width: 1px;
          -webkit-transition:
            fill 0.2s,
            stroke 0.2s;

          ${coloring === "party"
            ? Array.from(localPartyColor?.entries() || [])
                ?.map(([key, value]) => `#${key} {fill: ${value};}`)
                .join(`\n`)
            : ""}

          hover {
            fill: #080808;
          }
        `}
      >
        {MapSVG.map<ReactNode>(group =>
          group.groupId === selected ? (
            <g key={group.groupId}>
              {group.component.map(shape => {
                if (shape.type === `path`) {
                  return (
                    <path
                      key={shape.id}
                      id={shape.id.split(`_`)[0]}
                      d={shape.data}
                      onClick={() => onClick(shape.id.split(`_`)[0])}
                    />
                  );
                }
                if (shape.type === `polygon`) {
                  return (
                    <polygon
                      key={shape.id}
                      id={shape.id.split(`_`)[0]}
                      points={shape.data}
                      className="local"
                      onClick={() => onClick(shape.id.split(`_`)[0])}
                    />
                  );
                }
                throw new Error(`${shape.id} is not path or polygon`);
              })}
            </g>
          ) : (
            <g key={group.groupId} />
          ),
        )}
      </svg>
      <Flex
        align="center"
        justify="flex-end"
        css={css`
          width: 100%;
        `}
      >
        <Switch
          size="default"
          defaultChecked
          checkedChildren="정당 보기"
          unCheckedChildren="단색 보기"
          onClick={checked => {
            setColoring(checked ? "party" : "none");
          }}
        />
      </Flex>
    </Flex>
  );
};
export default LocalSelector;
