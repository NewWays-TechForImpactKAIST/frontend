import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { LocalCouncilPage, MetroCouncilPage } from "@/components/pages";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/localCouncil" element={<LocalCouncilPage />} />,
    <Route path="/localCouncil/:metroName" element={<LocalCouncilPage />} />,
    <Route
      path="/localCouncil/:metroName/:localName"
      element={<LocalCouncilPage />}
    />,
    <Route path="/metroCouncil" element={<MetroCouncilPage />} />,
    <Route path="/metroCouncil/:metroName" element={<MetroCouncilPage />} />,
    <Route path="*" element={<Navigate to="/localCouncil" replace />} />,
  ]),
);

export default router;
