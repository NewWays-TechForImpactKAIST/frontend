import {MapSVG, type MetroID, MetroInfo} from "@/../static/MapSVGData";
import {type ReactNode} from "react";
import {Dropdown, Flex} from "antd";
import {css} from "@emotion/react";

interface Props {
    selected: MetroID;
    onClick?: (local: string) => void;
}

const LocalSelector = ({
                           selected, onClick = () => {
    }
                       }: Props) => (
    <div
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Dropdown menu={{
            items: [
                {key: '1', label: 'One'},
                {key: '2', label: 'Two'},
                {type: 'divider'},
                {key: '3', label: 'Three'},
                {key: '4', label: 'Four'},
            ]
        }}>
            <div>
                <Flex vertical css={css`
                  background-color: aliceblue
                `}>
                    TODO: Dropdown으로 선택
                </Flex>
            </div>
        </Dropdown>
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox={MetroInfo[selected]?.viewBox || "0 0 509 716.1"}
            xmlSpace="preserve"
            style={{width: "40%"}}
        >
            <style type="text/css">
                {`
          .local{
            fill: ${MetroInfo[selected]?.color || "#1c3f64"};
            stroke: #1c3f64;
            stroke-width: 1.5px;
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
                    <g key={group.groupId}/>
                ),
            )}
        </svg>
    </div>
);
export default LocalSelector;
