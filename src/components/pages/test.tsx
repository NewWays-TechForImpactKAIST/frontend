import React from "react";
import { css } from "@emotion/react";

const Test: React.FC = () => (
  <>
    <h1
      css={css`
        font-size: 50px;
      `}
    >
      Test Page
    </h1>
    <button
      type="button"
      css={css`
        font-size: 30px;
      `}
      // eslint-disable-next-line no-alert
      onClick={() => alert("Button pressed!")}
    >
      Test Button
    </button>
  </>
);

export default Test;
