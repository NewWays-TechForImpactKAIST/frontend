import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { LocalCouncilReport } from "@/components/pages";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<LocalCouncilReport />} />,
  ]),
);

export default router;
