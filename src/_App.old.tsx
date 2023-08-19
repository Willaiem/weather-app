import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import RootLayout from "./layout/RootLayout";
import getUser from "./utils/getUser";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} loader={getUser} />
      <Route path="/welcome" element={<Welcome />} loader={getUser} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);
const App = () => {
  return (
    
      <RouterProvider router={router} />
      
    
  );
};

export default App;
