import { ConfigProvider, Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/react";
import colors from "@/styles/colors";

const TabSelctor = () => {
  const { metroName, localName } = useParams();
  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            // 탭 버튼의 배경과 텍스트 색상을 설정합니다.
            horizontalMargin: "0px",
            cardBg: colors.gray220,
            itemColor: colors.black,
            itemSelectedColor: colors.black,
          },
        },
      }}
    >
      <Tabs
        css={css`
          .ant-tabs-tab-active {
            background-color: ${colors.white} !important;
            border-bottom-color: ${colors.white} !important;
          }
        `}
        items={[
          { label: "지역의회", key: "localCouncil" },
          { label: "광역의회", key: "metroCouncil" },
          { label: "국회", key: "nationalCouncil" },
        ]}
        onChange={key => {
          navigate(
            `/${key}${metroName ? `/${metroName}` : ""}${
              metroName && localName ? `/${localName}` : ""
            }`,
          );
        }}
        type="card"
        activeKey={window.location.pathname.split("/")[1]}
      />
    </ConfigProvider>
  );
};

export default TabSelctor;
