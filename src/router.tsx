import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {Test} from "./test";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={Test()} />,
  ]),
);

export default router;
