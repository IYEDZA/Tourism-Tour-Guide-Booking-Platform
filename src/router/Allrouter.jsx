import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../pages/Home";
import Register from "../authentication/Register";
import Signin from "../authentication/Signin";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Privateroute from "../protectedroutes/Privateroute";
import CommunityPage from "../pages/CommunityPage";
import AboutUs from "../pages/AboutUs";
import TourGuideProfile from "../pages/TourGuideProfile";

import PackageDetailsPage from "../pages/PackageDetailsPage";
import DashboardHome from "./dashbord/DashboardHome";
import TouristDashboard from "./dashbord/TouristDashboard";
import TourGuideDashboard from "./dashbord/TourGuideDashboard";
import AdminDashboardPage from "./dashbord/AdminDashboardPage";
import packageBooking from "../pages/packageBooking";
import JoinAsTourGuide from "./dashbord/JoinAsTourGuide";
import UpadetTouriststotories from "./dashbord/UpadetTouriststotories";
import UpdaedTourGuideStoies from "./dashbord/alltourguidelist/UpdaedTourGuideStoies";
import PackagesDeatilesCard from "../pages/PackagesDeatilesCard";
import TourGuideCardTab from "../pages/TourGuideCardTab";
import AllStoriesCard from "../pages/AllStoriesCard";
import SingleTourGideDeatiles from "../pages/SingleTourGideDeatiles";
import TouristBookings from "./dashbord/TouristBookings";
import Payment from "../pages/Payment";
import Tripscommponet from "../pages/Tripscommponet";
import TravelOfferAnnouncement from "../pages/TravelOfferAnnouncement";
import Forbidden from "../pages/Forbidden";
import AdminRoute from "../protectedroutes/AdminRoute";
import TourGuideRoute from "../protectedroutes/TourGuideRoute";
import TouristRoute from "../protectedroutes/TouristRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      {
        index: true,
        Component: Home
      },

      {
         path: 'community',
        Component: CommunityPage,
    //     loader: () => fetch('./serviceCenter.json')
     },
       {
        path: 'trip',
        Component: Tripscommponet
     },

      {
        path: 'offers',
        Component: TravelOfferAnnouncement
     },
     {
        path: 'forbidden',
        Component: Forbidden
      },
      {
         path: 'about',
         Component:AboutUs
    //     element: <PrivateRoute><BeARider></BeARider></PrivateRoute>,
    //     loader: () => fetch('./serviceCenter.json')
      },

      {
        path:'/tourguide',
        Component:TourGuideProfile
      },
       {
        path:'/guide/:id',
        Component:TourGuideCardTab
      },

      {
        path:'/allStories',
        Component:AllStoriesCard
      },
      {
        path :'package',
        Component:PackageDetailsPage,
      },

      {
        path:'/pack/:id',
        Component:PackagesDeatilesCard
      },

       {
        path:'/tourGide/:id',
        Component:SingleTourGideDeatiles
      },
      {
        path :'/booking/:id',
        Component:packageBooking
      }
    //   {
    //     path: 'sendParcel',
    //     element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
    //     loader: () => fetch('./serviceCenter.json')
    //   }
    ]
  },

  
  


  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path:"/login", Component:Signin },
     { path:"/register", Component:Register },
    ]
  },


 {
    path: '/dashboard',
   element:<Privateroute><DashboardLayout></DashboardLayout></Privateroute> ,
    children: [
      {
       index: true,
        Component: DashboardHome
      },
      {
        path: 'tourist',
        element:<TouristRoute><TouristDashboard></TouristDashboard></TouristRoute> ,
      },

      {
        path: 'bookings',
        Component: TouristBookings
      },
       {
        path: 'editStory/:id',
        Component: UpadetTouriststotories
      },
       {
        path: 'edit/:id',
        Component: UpdaedTourGuideStoies
      },



      {
        path:'joinTourGuide',
        Component:JoinAsTourGuide
      },

      {
        path: 'guide',
        // Component: TourGuideDashboard
         element:<TourGuideRoute><TourGuideDashboard></TourGuideDashboard></TourGuideRoute> 
      },

      {
        path: 'admin',
        // Component: AdminDashboardPage
         element:<AdminRoute><AdminDashboardPage></AdminDashboardPage></AdminRoute>
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
//       {
//         path: 'paymentHistory',
//         Component: PaymentHistory
//       },
//       {
//         path: 'track',
//         Component: TrackParcel
//       },
//       // rider only routes
//       
//      
//       {
//         path: 'my-earnings',
//         element: <RiderRoute>
//           <MyEarnings></MyEarnings>
//         </RiderRoute>
//       },
//       // admin only routes
    
   

   ]
  }
]);