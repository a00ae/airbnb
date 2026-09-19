import { createBrowserRouter } from 'react-router';

import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
// import RoomDetailPage from '../pages/RoomDetailPage';
// import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/airbnb/',
    element: <RootLayout />, // التخطيط الرئيسي الحاوي للهيدر والفوتر
    errorElement: <NotFoundPage />, // في حال حدوث خطأ أثناء التحميل
    children: [
      {
        index: true, // يعني الصفحة الرئيسية عند المسار "/"
        element: <HomePage />,
      },
    //   {
    //     path: 'rooms/:id', // المسار الديناميكي للعقار "/rooms/123"
    //     element: <RoomDetailPage />,
    //   },
    //   {
    //     path: 'profile', // مسار الملف الشخصي "/profile"
    //     element: <ProfilePage />,
    //   },
      {
        path: '*', // يطابق أي رابط خاطئ داخل الـ Layout
        element: <NotFoundPage />,
      },
    ],
  },
]);
