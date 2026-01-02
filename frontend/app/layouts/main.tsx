import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
const MainLayout = () => {
  return (
    <div className='max-w-[1920px] p-5  items-center mx-auto min-h-screen'>
      <Navbar />
      <div className='mt-15'>
      <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
