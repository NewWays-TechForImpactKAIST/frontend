import { MapSVG } from "@/../static/MapSVGData";
import { type ReactNode } from "react";

const MapSelector = () => (
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
          .piece{
            fill: #4caff4;
            stroke: #1c3f64;
            -webkit-transition:
              fill 0.2s
          }
          .piece:hover{
            fill: #1c3f64;
            stroke: #1c3f64;
          }
        `}
    </style>
    {MapSVG.map<ReactNode>(group => (
      <g id={group.groupId}>
        {group.component.map(shape => {
          if (shape.type === `path`) {
            return (
              <path
                key={shape.id}
                className="piece"
                id={shape.id}
                d={shape.data}
                onClick={() => {
                  alert(`Test click handle: ${shape.id}`);
                }}
              />
            );
          }
          if (shape.type === `polygon`) {
            return (
              <polygon
                key={shape.id}
                className="piece"
                id={shape.id}
                points={shape.data}
                onClick={() => {
                  alert(`Test click handle: ${shape.id}`);
                }}
              />
            );
          }
          throw new Error(`${shape.id} is not path or polygon`);
        })}
      </g>
    ))}
  </svg>
);

export default MapSelector;
