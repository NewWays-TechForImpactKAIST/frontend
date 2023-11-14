import React from "react";
import { css } from "@emotion/react";

const Test: React.FC = () => (
  <>
    <h1
      css={css`
        color: red;
        font-size: 50px;
      `}
    >
      Test Page
    </h1>
    <button
      type="button"
      css={css`
        color: blue;
        font-size: 30px;
      `}
    >
      Test Button
    </button>
  </>
);

export default Test;
