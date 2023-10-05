import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<h1>Test Root Page</h1>} />,
  ]),
);

export default router;
