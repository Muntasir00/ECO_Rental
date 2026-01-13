import React from 'react';

const FacilitiesSection = () => {
  // Data for the facilities to make the code cleaner and easier to update
  const facilities = [
    {
      id: 1,
      name: 'Telephone',
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.03 12.03 0 0 0 2.81.57A2 2 0 0 1 22 16.92z'></path>
        </svg>
      ),
    },
    {
      id: 2,
      name: 'Bathtub',
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M9 6 6.5 3.5 M3 6h18 M2 10h20 M19 10v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9 M7 19h10'></path>
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Shower',
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polygon points='14 2 18 6 7 17 3 17 3 13 14 2'></polygon>
          <line x1='6.3' y1='13.7' x2='10.3' y2='17.7'></line>
          <path d='M14.5 6.5 18 10'></path>
          <path d='m16 17 4 4'></path>
          <path d='m19 14 2 2'></path>
          <path d='m13 20 2 2'></path>
        </svg>
      ),
    },
    {
      id: 4,
      name: 'Fast Wifi',
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M5 12.55a11 11 0 0 1 14.08 0'></path>
          <path d='M1.42 9a16 16 0 0 1 21.16 0'></path>
          <path d='M8.53 16.11a6 6 0 0 1 6.95 0'></path>
          <line x1='12' y1='20' x2='12.01' y2='20'></line>
        </svg>
      ),
    },
    {
      id: 5,
      name: 'LCD Television',
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='2' y='7' width='20' height='15' rx='2' ry='2'></rect>
          <polyline points='17 2 12 7 7 2'></polyline>
        </svg>
      ),
    },
    {
      id: 6,
      name: 'Coffee Maker',
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 8h1a4 4 0 0 1 0 8h-1'></path>
          <path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z'></path>
          <line x1='6' y1='1' x2='6' y2='4'></line>
          <line x1='10' y1='1' x2='10' y2='4'></line>
          <line x1='14' y1='1' x2='14' y2='4'></line>
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className='bg-[#B83E25] rounded-sm py-6 px-6 md:px-12 mt-10'>
        {/* Header Title */}
        <div className='text-center mb-4'>
          <h2 className='text-white text-2xl md:text-3xl font-medium tracking-wide'>
            Premium Deluxe Facilities
          </h2>
        </div>

        {/* White Content Box */}
        <div className='bg-white py-5 px-4 rounded-sm shadow-sm'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4'>
            {facilities.map(item => (
              <div
                key={item.id}
                className='flex flex-col items-center justify-center group cursor-default'
              >
                {/* Icon */}
                <div className='text-[#B83E25] mb-4 transform transition-transform duration-300 group-hover:-translate-y-1'>
                  {item.icon}
                </div>

                {/* Label */}
                <span className='text-gray-800 text-sm font-medium text-center'>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FacilitiesSection;
