import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Test } from "./components/pages";

const router = createBrowserRouter(
  createRoutesFromElements([<Route path="/" element={<Test />} />]),
);

export default router;
