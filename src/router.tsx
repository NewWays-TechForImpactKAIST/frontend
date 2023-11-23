import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { LocalCouncil } from "@/components/pages";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/localCouncil" element={<LocalCouncil />} />,
    <Route path="/localCouncil/:metroId" element={<LocalCouncil />} />,
    <Route
      path="/localCouncilReport/:metroId/:localId"
      element={<LocalCouncil />}
    />,
    <Route path="*" element={<Navigate to="/localCouncil" />} />,
  ]),
);

export default router;
