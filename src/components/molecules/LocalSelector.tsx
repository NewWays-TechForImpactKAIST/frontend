import { MapSVG, type MetroID, MetroInfo } from "@/../static/MapSVGData";
import { type ReactNode } from "react";
import { css } from "@emotion/react";

interface Props {
  selected: MetroID;
  onClick?: (local: string) => void;
}

const LocalSelector = ({ selected, onClick = () => {} }: Props) => (
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
      width: 50%;

      .local {
        fill: ${MetroInfo[selected]?.color || "#4CC9F0"};
        stroke: #080808;
        stroke-width: 1px;
        -webkit-transition:
          fill 0.2s,
          stroke 0.2s;
      }

      .local:hover {
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
                  className="local"
                  id={shape.id}
                  d={shape.data}
                  onClick={() => onClick(shape.id)}
                />
              );
            }
            if (shape.type === `polygon`) {
              return (
                <polygon
                  key={shape.id}
                  className="local"
                  id={shape.id}
                  points={shape.data}
                  onClick={() => onClick(shape.id)}
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
);
export default LocalSelector;
