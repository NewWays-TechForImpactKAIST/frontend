import React, { useEffect } from "react";
import { LocalCouncil, LocalCouncilReport } from "@/components/pages";
import { useParams } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import { Layout } from "../templates";

export default function MainPage() {
  const { metroId, localId } = useParams();
  useEffect(() => {
    if (!metroId || !localId) return;
    scroller.scrollTo("Report", {
      duration: 1000,
      delay: 50,
      smooth: "easeInOutQuart",
    });
  }, [metroId, localId]);
  return (
    <Layout>
      <LocalCouncil />
      <Element name="Report">
        {metroId && localId ? <LocalCouncilReport /> : <></>}
      </Element>
    </Layout>
  );
}