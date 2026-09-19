import { Outlet } from 'react-router';
import { Footer, Header } from '../components';


export default function RootLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {/* المكون الفرعي المطابق للمسار الحالي سيحل محل Outlet */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}