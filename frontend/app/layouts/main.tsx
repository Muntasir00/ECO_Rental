import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import {Toaster} from "sonner";
const MainLayout = () => {
  return (
    <div className='max-w-full  items-center mx-auto min-h-screen'>
      <Navbar />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
        <Toaster position="top-center" richColors/>
    </div>
  );
};

export default MainLayout;
