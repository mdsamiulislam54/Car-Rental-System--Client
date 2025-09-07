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
import MyBooking from './Page/DashbordPage/UserDashboard/MyBooking/MyBooking.jsx'
import BookingProvider from "./ContextApi/myBookingContext/BookingProvider.jsx";
import ManageUser from "./Page/DashbordPage/DashbordHomePage/ManageUser/ManageUser.jsx";
import AboutUs from "./Page/AboutUs/AboutUs.jsx";
import COntactUs from "./Page/ContactUs/ContactUs.jsx";
import AddBlogs from "./Page/DashbordPage/AdminDashboard/AddBlogs/AddBlogs.jsx";
import Blogs from "./Page/Blogs/Blogs.jsx";
import ContactUs from "./Page/ContactUs/ContactUs.jsx";
import BlogsDetails from "./Page/Blogs/BlogsDetails.jsx";
import ManageBlogs from "./Page/DashbordPage/AdminDashboard/ManageBlogs/ManageBlogs.jsx";

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
        element: <CarDetailsPage />
      },
      {
        path: "/about-us",
        Component: AboutUs
      },
      {
        path: "/contact-us",
        Component: ContactUs
      },
      {
        path: "/blog",
        Component: Blogs
      },
      {
        path: "blog/details/:id",
        loader: ({ params }) => fetch(` http://localhost:5000/blogs/${params.id}`),
        Component: BlogsDetails
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
    element: <PrivateRoute>
      <DashBoardLayout />
    </PrivateRoute>,

    children: [
      {
        index: true,
        Component: DashboardHomePage

      },

      {
        path: "/dashboard/my-cars",
        Component: MyCarsTable
      },
      {
        path: "/dashboard/add-car",
        Component: AddCars
      },
      {
        path: "/dashboard/manage-booking",
        Component: ManageBookingCar
      },
      {
        path: '/dashboard/my-booking-cars',
        Component: MyBooking
      },
      {
        path: '/dashboard/add/blogs',
        Component: AddBlogs
      },
      {
        path: '/dashboard/manage/blogs',
        Component: ManageBlogs
      },
      {
        path: '/dashboard/manage/user',
        Component: ManageUser
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
