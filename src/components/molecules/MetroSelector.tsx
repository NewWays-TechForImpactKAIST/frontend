import { MapSVG, MetroInfo } from "@/../static/MapSVGData";
import { type ReactNode, useState } from "react";
import { css } from "@emotion/react";

interface Props {
  onClick?: (local: string) => void;
}

const MetroSelector = ({ onClick = () => {} }: Props) => {
  const [hover, setHover] = useState<string>("");
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 509 716.1"
      xmlSpace="preserve"
      css={css`
        @media (max-width: 768px) {
          width: 80%;
        }
        width: 50%;

        .metro {
          -webkit-transition:
            fill 0.2s,
            stroke 0.2s;
        }
      `}
    >
      {MapSVG.map<ReactNode>(group => (
        <g
          key={group.groupId}
          id={group.groupId}
          className="metro"
          css={css`
            fill: ${hover !== group.groupId
              ? MetroInfo[group.groupId].color
              : "#060606"};
            stroke: ${hover !== group.groupId
              ? MetroInfo[group.groupId].color
              : "#060606"};
          `}
          onMouseEnter={() => {
            setHover(group.groupId);
          }}
          onMouseLeave={() => {
            setHover("");
          }}
          onClick={() => {
            onClick(group.groupId);
          }}
        >
          {group.component.map(shape => {
            if (shape.type === `path`) {
              return <path key={shape.id} id={shape.id} d={shape.data} />;
            }
            if (shape.type === `polygon`) {
              return (
                <polygon key={shape.id} id={shape.id} points={shape.data} />
              );
            }
            throw new Error(`${shape.id} is not path or polygon`);
          })}
        </g>
      ))}
    </svg>
  );
};

export default MetroSelector;
