import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./Style/Style.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./Route/MainLayout/MainLayout.jsx";
import Home from "./Home/Home.jsx";
import UserProvider from "./ContextApi/UserContext/UserProvider.jsx";
import Login from "./Components/UserAuthentication/Login.jsx";
import Registration from "./Components/UserAuthentication/Registration.jsx";
import PageNotFound from "./Page/PageNotFound/PageNotFound.jsx";
import PlainLayOut from "./Route/PlainLayout/PlainLayOut.jsx";
import AvailableCars from "./Page/AvailableCars/AvailableCars.jsx";

import PrivateRoute from "./Page/PrivateRoute/PrivateRoute.jsx";
import AddCars from "./Page/AddCars/AddCars.jsx";
import MyCars from "./Page/MyCars/MyCars.jsx";
import CarDetailsPage from "./Page/CarDetailsPage/CarDetailsPage.jsx";
import MyBooking from "./Page/MyBooking/MyBooking.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "available-cars", element: <AvailableCars /> },
      {
        path: "add-cars",
        element: (
          <PrivateRoute>
            <AddCars />
          </PrivateRoute>
        ),
      },
      {
        path: "my-cars",
        element: (
          <PrivateRoute>
            <MyCars />
          </PrivateRoute>
        ),
      },
      {
        path:"car-details/:id",
        loader: ({ params }) =>
          fetch(`https://car-rental-system-server-beta.vercel.app/

car-details/${params.id}`),
        element:<CarDetailsPage/>
      },
      {
        path:'my-booking',
        element:<PrivateRoute><MyBooking/></PrivateRoute>
      }
    ],
  },
  {
    Component: PlainLayOut,
    children: [
      { path: "/*", element: <PageNotFound /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  </StrictMode>
);
