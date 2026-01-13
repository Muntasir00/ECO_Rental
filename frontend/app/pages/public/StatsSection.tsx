import React from 'react';
import { Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { id: 1, number: '100+', label: 'Comfortable', subLabel: 'room' },
    { id: 2, number: '5M+', label: 'Happy', subLabel: 'Customers' },
    { id: 3, number: '23+', label: 'Certificate of', subLabel: 'Merit' },
  ];

  return (
    <section className='bg-[#B83E25] w-full py-16 px-6 sm:px-8 lg:px-12 font-sans text-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20'>
          <div className='flex-1 w-full lg:w-auto text-center lg:text-left'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-normal leading-snug mb-6 max-w-md mx-auto lg:mx-0'>
              Rentals with the best service and quality always
            </h2>

            {/* Divider Line */}
            <div className='w-full h-[1px] bg-white/40 mb-6'></div>

            {/* Rating */}
            <div className='flex items-center justify-center lg:justify-start gap-4'>
              <div className='flex gap-1'>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className='w-6 h-6 fill-yellow-400 text-yellow-400'
                  />
                ))}
              </div>
              <span className='text-xl font-medium'>5.0</span>
            </div>
          </div>

          <div className='flex-1 flex justify-center items-center w-full'>
            <div className='relative flex items-center gap-[-40px]'>
              <div className='w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border border-white flex flex-col items-center justify-center text-white relative z-10'>
                <h2 className='text-2xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2'>
                  100+
                </h2>
                <p className='text-sm mt-2 text-center'>
                  Comfortable <br className='block sm:hidden' /> room
                </p>
              </div>
              <div className='w-28 h-28  md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border border-white flex flex-col items-center justify-center text-white -ml-4 sm:-ml-8 md:-ml-6 z-20'>
                <h2 className='text-2xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2'>
                  5M+
                </h2>
                <p className='text-sm mt-2 text-center'>
                  Happy <br className='block sm:hidden' /> Customers
                </p>
              </div>
              <div className='w-28 h-28  md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border border-white flex flex-col items-center justify-center text-white -ml-4 sm:-ml-8 md:-ml-6 z-10'>
                <h2 className='text-2xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2'>
                  23+
                </h2>
                <p className='text-sm mt-2 text-center'>
                  Certificate of <br className='block sm:hidden' /> Merit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
