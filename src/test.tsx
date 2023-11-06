import {css} from "@emotion/react";

export function Test() {
  return (
    <>
        <h1 css={css`
          color: red;
          font-size: 50px;
        `}>Test Page</h1>
        <button type="button" css={css`
            color: blue;
            font-size: 30px;
        `}>Test Button</button>
    </>
  );
}