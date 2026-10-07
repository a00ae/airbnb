import { Outlet } from 'react-router';
import { Apt, Footer, Header, ListSearch } from '../components';


export default function RootLayout() {
  return (
    <>
      <Header />
      <Apt />
      <main className="main-content">
        <ListSearch />
        {/* المكون الفرعي المطابق للمسار الحالي سيحل محل Outlet */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}