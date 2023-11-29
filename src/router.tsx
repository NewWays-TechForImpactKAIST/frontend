import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { MainPage } from "@/components/pages";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Navigate to="/localCouncil" replace />} />,
    <Route path="/:reportType" element={<MainPage />} />,
    <Route path="/:reportType/:metroName" element={<MainPage />} />,
    <Route path="/:reportType/:metroName/:localName" element={<MainPage />} />,
    <Route path="*" element={<Navigate to="/localCouncil" replace />} />,
  ]),
);

export default router;
