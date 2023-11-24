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
        const ret = {
          key: i,
          label: value,
        };
        return ret;
      }),
      onClick: ({ key }) => onClick(options[parseInt(key)]),
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
        width: 60%;
        height: 25pt;
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
