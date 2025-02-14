import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "./MainLayout";
import Child1 from "./Child1";
import Child2 from "./Child2";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<Child1 />} />
      <Route path="child2" element={<Child2 />} />
    </Route>
  )
);
