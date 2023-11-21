import React, {useState} from "react";
import {Flex} from "antd";
import {css} from "@emotion/react";

import {Layout} from "@/components/templates";
import {LocalSelector, MetroSelector} from "@/components/organisms";
import {type MetroID} from "static/MapSVGData";
import {useNavigate} from "react-router-dom";

const LocalCouncil: React.FC = () => {
    const [metroId, setMetroId] = useState<MetroID>();
    const navigate = useNavigate();
    return (
        <Layout>
            <Flex
                vertical
                gap={40}
                css={css`
                  margin: 40px 0 40px 0;
                `}
            >
                {metroId ? (
                    <LocalSelector
                        selected={metroId}
                        onClick={id => {
                            navigate(`/localCouncilReport/${metroId}/${id}`);
                        }}
                    />
                ) : (
                    <MetroSelector
                        onClick={id => {
                            setMetroId(id as MetroID);
                        }}
                    />
                )}
            </Flex>
        </Layout>
    );
};

export default LocalCouncil;