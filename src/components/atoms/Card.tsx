import { type ReactNode } from "react";
import { Card as AntCard } from "antd";
import { css } from "@emotion/react";
import colors from "@/styles/colors";

interface Props {
  children: ReactNode;
  round?: boolean;
}

const Card = ({ children, round = false }: Props) => (
  <AntCard
    bodyStyle={
      {
        // backgroundColor: colors.white,
      }
    }
    css={css`
      background-color: ${colors.white};
      ${round ? "" : "border-radius: 0px;"}
      border: 0px;
    `}
  >
    {children}
  </AntCard>
);

export default Card;
