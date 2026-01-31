import React from 'react';
import { Link } from 'react-router';

export default function CertifiedBrandSection() {
  return (
    <section className='bg-white py-20 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='max-w-7xl mx-auto'>
        {/* Grid Layout: Stacks on mobile, 2 columns on desktop */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>
          {/* =======================
              LEFT COLUMN
          ======================== */}
          <div className='flex flex-col justify-between items-start'>
            <h2 className='text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-[#1A1A1A] leading-[1.15] mb-10'>
              An internationally certified brand for finding your stay!
            </h2>

            <Link to='/rooms'>

            <button className='bg-[#B83E25] hover:bg-[#d4444b] text-white px-10 py-3.5 rounded-sm font-medium transition-colors shadow-sm'>
              Find Place
            </button>
            </Link>
          </div>

          {/* =======================
              RIGHT COLUMN
          ======================== */}
          <div className='flex flex-col justify-start pt-2 lg:pt-4'>
            {/* Award Badges Row */}
            <div className='flex flex-wrap gap-8 md:gap-12 mb-10 text-gray-400'>
              <AwardBadge
                title='HYPER BEST'
                subtitle='AWARD WINNING'
                stars={5}
              />
              <AwardBadge title='ULTRA' subtitle='PRESTIGIOUS' stars={5} />
              <AwardBadge title='ULTIMATE' subtitle='WINNER' stars={5} />
            </div>

            {/* Description Text */}
            <p className='text-gray-500 text-lg leading-relaxed max-w-xl'>
              Lorem ipsum dolor sit amet consectetur. Lacus ut enim turpis
              imperdiet. Lorem ipsum dolor sit amet consectetur. Lacus ut enim
              turpis imperdiet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Helper Component for the Laurel Wreath Icon ---
const AwardBadge = ({ title, subtitle, stars }: any) => {
  return (
    <div className='flex flex-col items-center justify-center opacity-80 hover:opacity-100 transition-opacity'>
      {/* Custom Laurel Wreath SVG */}
      <div className='relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center'>
        <svg
          viewBox='0 0 100 100'
          fill='currentColor'
          className='w-full h-full absolute inset-0 text-gray-300'
        >
          {/* Left Branch */}
          <path
            d='M50 85 C 30 85, 10 60, 10 30 C 10 25, 15 20, 20 25 C 15 30, 20 50, 35 60'
            stroke='currentColor'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
          />
          <path
            d='M15 35 C 10 40, 15 50, 25 55'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />
          <path
            d='M12 45 C 10 50, 15 60, 28 65'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />

          {/* Right Branch */}
          <path
            d='M50 85 C 70 85, 90 60, 90 30 C 90 25, 85 20, 80 25 C 85 30, 80 50, 65 60'
            stroke='currentColor'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
          />
          <path
            d='M85 35 C 90 40, 85 50, 75 55'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />
          <path
            d='M88 45 C 90 50, 85 60, 72 65'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />
        </svg>

        {/* Text Content inside the badge */}
        <div className='relative z-10 flex flex-col items-center pt-2'>
          {/* Stars */}
          <div className='flex gap-px mb-1'>
            {[...Array(stars)].map((_, i) => (
              <span key={i} className='text-[6px] text-gray-400'>
                ★
              </span>
            ))}
          </div>
          <span className='text-[8px] md:text-[10px] font-bold text-gray-500 uppercase leading-none text-center'>
            {title}
          </span>
          <span className='text-[6px] md:text-[7px] text-gray-400 uppercase leading-tight text-center mt-0.5'>
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};
