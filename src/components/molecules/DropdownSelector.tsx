import { Dropdown, Flex } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";

interface Props {
  innerText: string;
  options: string[];
  onClick?: (value: string) => void;
}

const DropdownSelector = ({
  innerText,
  options,
  onClick = () => {},
}: Props) => (
  <Dropdown
    menu={{
      items: options.map((value, i) => {
        return {
          key: i,
          label: <div onClick={() => onClick(value)}>{value}</div>,
        };
      }),
    }}
  >
    <Flex
      justify="center"
      align="center"
      gap="small"
      css={css`
        @media (max-width: 768px) {
          width: 80%;
        }
        width: 50%;
        height: 20pt;
        border-radius: 5pt;
        background-color: white;
      `}
    >
      {innerText}
      <DownOutlined />
    </Flex>
  </Dropdown>
);
export default DropdownSelector;
