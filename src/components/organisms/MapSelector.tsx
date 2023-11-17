import { MapSVG } from "@/../static/MapSVGData";
import { type ReactNode } from "react";

const MetroColor = {
  제주특별자치도: "#4caff4",
  경상남도: "#4caff4",
  경상북도: "#4c6bf4",
  전라남도: "#4c6bf4",
  전라북도: "#9cc3ff",
  충청남도: "#4c4cf4",
  충청북도: "#4caff4",
  강원도: "#4c4cf4",
  경기도: "#9cc3ff",
  세종특별자치시: "#6c6cd4",
  울산광역시: "#6c6cd4",
  대전광역시: "#9cc3ff",
  광주광역시: "#6c6cd4",
  대구광역시: "#6c6cd4",
  인천광역시: "#c3e1ff",
  부산광역시: "#c3e1ff",
  서울특별시: "#c3e1ff",
};

const MetroSelector = () => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 509 716.1"
    xmlSpace="preserve"
  >
    <style type="text/css">
      {`
        .metro{
          -webkit-transition:
            fill 0.2s
        }
        .metro:hover{
          fill: #1c3f64;
          stroke: #1c3f64;
        }
      `}
    </style>
    {MapSVG.map<ReactNode>(group => (
      <g
        key={group.groupId}
        id={group.groupId}
        className="metro"
        style={{
          fill: MetroColor[group.groupId],
          stroke: MetroColor[group.groupId],
        }}
        onClick={() => {
          alert(group.groupId);
        }}
      >
        {group.component.map(shape => {
          if (shape.type === `path`) {
            return <path key={shape.id} id={shape.id} d={shape.data} />;
          }
          if (shape.type === `polygon`) {
            return <polygon key={shape.id} id={shape.id} points={shape.data} />;
          }
          throw new Error(`${shape.id} is not path or polygon`);
        })}
      </g>
    ))}
  </svg>
);

export { MetroSelector };
