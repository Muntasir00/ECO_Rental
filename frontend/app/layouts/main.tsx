import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
const MainLayout = () => {
  return (
    <div className='max-w-full  items-center mx-auto min-h-screen'>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
