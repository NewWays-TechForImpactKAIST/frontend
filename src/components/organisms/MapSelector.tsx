import { MapSVG, MetroInfo } from "@/../static/MapSVGData";
import { ReactNode, useState } from "react";

const MetroSelector = () => {
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
    >
      <style type="text/css">
        {`
        .metro{
          -webkit-transition:
            fill 0.2s,
            stroke 0.2s
        }
      `}
      </style>
      {MapSVG.map<ReactNode>(group => (
        <g
          key={group.groupId}
          id={group.groupId}
          className="metro"
          style={{
            fill:
              hover !== group.groupId
                ? MetroInfo[group.groupId].color
                : "#1c3f64",
            stroke:
              hover !== group.groupId
                ? MetroInfo[group.groupId].color
                : "#1c3f64",
          }}
          onMouseEnter={() => {
            setHover(group.groupId);
          }}
          onMouseLeave={() => {
            setHover("");
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

interface Props {
  selected: string;
  onClick?: (local: string) => void;
}

const LocalSelector = ({ selected, onClick = () => {} }: Props) => {
  if (!(selected in MetroInfo)) {
    throw new Error(`${selected} is not a metro`);
  }
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={MetroInfo[selected]?.viewBox || "0 0 509 716.1"}
      xmlSpace="preserve"
    >
      <style type="text/css">
        {`
          .local{
            fill: ${MetroInfo[selected]?.color || "#1c3f64"};
            stroke: #1c3f64;
            stroke-width: 0.5px;
            -webkit-transition:
              fill 0.2s,
              stroke 0.2s
          }
          .local:hover{
            fill: #1c3f64;
          }
        `}
      </style>
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
};
export { MetroSelector, LocalSelector };
