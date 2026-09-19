import { createBrowserRouter } from 'react-router';

import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
// import RoomDetailPage from '../pages/RoomDetailPage';
// import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import ErrorPage from '../pages/ErrorPage';
import { PopularApartments } from '../components/layout/Main/apartments/PopularApartments';

export const router = createBrowserRouter([
  {
    path: '/airbnb/',
    element: <RootLayout />, // التخطيط الرئيسي الحاوي للهيدر والفوتر
    errorElement: <ErrorPage />, // في حال حدوث خطأ أثناء التحميل
    children: [
      {
        index: true, // يعني الصفحة الرئيسية عند المسار "/"
        element: <HomePage />,
      },
      { path: 'city/:cityName', element: <PopularApartments /> },
      { path: '*', element: <NotFoundPage /> },
      {
        path: '*', // يطابق أي رابط خاطئ داخل الـ Layout
        element: <NotFoundPage />,
      },
    ],
  },
]);
