import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Home, loader as homeLoader } from "./pages/Home";
import { Welcome, loader as welcomeLoader } from "./pages/Welcome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="/welcome" element={<Welcome />} loader={welcomeLoader} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

export const App = () => <RouterProvider router={router} />
