import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { Link } from "react-scroll";
import { MainPage, LocalCouncil, LocalCouncilReport } from "@/components/pages";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/localCouncil" element={<MainPage />} />,
    <Route
      path="/localCouncilReport/:metroId/:localId"
      element={<MainPage />}
    />,
    <Route path="*" element={<Navigate to="/localCouncil" />} />,
  ]),
);

export default router;
