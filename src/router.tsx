import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { LocalCouncilPage } from "@/components/pages";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/localCouncil" element={<LocalCouncilPage />} />,
    <Route path="/localCouncil/:metroName" element={<LocalCouncilPage />} />,
    <Route
      path="/localCouncil/:metroName/:localName"
      element={<LocalCouncilPage />}
    />,
    <Route path="*" element={<Navigate to="/localCouncil" replace={true} />} />,
  ]),
);

export default router;
