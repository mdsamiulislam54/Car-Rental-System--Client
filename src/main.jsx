import { StrictMode, Suspense } from "react";
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
import AddCars from "./Page/DashbordPage/DashbordHomePage/AddCars/AddCars.jsx";

import CarDetailsPage from "./Page/CarDetailsPage/CarDetailsPage.jsx";
import Loading from "./Components/Loader/loading.jsx";
import DashBoardLayout from "./Route/DashbordLayout/DashBoardLayout.jsx";
import MyCarsTable from "./Page/DashbordPage/MyCars/MyCars.jsx";
import DashboardHomePage from "./Page/DashbordPage/DashbordHomePage/DashboardHomePage.jsx";
import ManageBookingCar from "./Page/DashbordPage/DashbordHomePage/ManageBookingCar/ManageBookingCar.jsx";
import MyBooking from './Page/DashbordPage/MyBooking/MyBooking.jsx'
import BookingProvider from "./ContextApi/myBookingContext/BookingProvider.jsx";
import ManageUser from "./Page/DashbordPage/DashbordHomePage/ManageUser/ManageUser.jsx";
import AboutUs from "./Page/AboutUs/AboutUs.jsx";
import COntactUs from "./Page/ContactUs/ContactUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "available-cars", element: <AvailableCars /> },
      

      {
        path: "car-details/:id",
        loader: ({ params }) =>
          fetch(` http://localhost:5000/car-details/${params.id}`),
        element: <PrivateRoute><CarDetailsPage /></PrivateRoute>
      },
     {
      path:"/about-us",
      Component:AboutUs
     },
     {
      path:"/contact-us",
      Component:COntactUs
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
  {
    path: '/dashboard',
    Component: DashBoardLayout,

    children: [
      {
        index: true,
        element: <PrivateRoute>
          <DashboardHomePage />
        </PrivateRoute>
      },

      {
        path: "/dashboard/my-cars",
        element: (
          <PrivateRoute>
            <MyCarsTable />
          </PrivateRoute>
        ),
      },
       {
        path: "/dashboard/add-car",
        element: (
          <PrivateRoute>
            <AddCars />
          </PrivateRoute>
        ),
      },
      {
        path:"/dashboard/manage-booking",
        element:(
          <PrivateRoute>
            <ManageBookingCar/>
          </PrivateRoute>
        )
      },
       {
        path: '/dashboard/my-booking-cars',
        element: <PrivateRoute><MyBooking/></PrivateRoute>
      },
      {
        path:'/dashboard/manage/user',
        element:<ManageUser/>
      }


    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <BookingProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
      </BookingProvider>
    </UserProvider>

  </StrictMode>
);
