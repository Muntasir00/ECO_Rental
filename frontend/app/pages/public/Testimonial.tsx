import React from 'react';

const Testimonial = () => {
  return (
    <section className='bg-[#FAFAFA] py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row items-stretch bg-white shadow-sm md:shadow-none'>
          <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-20 bg-white order-2 md:order-1'>
            {/* Label */}
            <h4 className='text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-8'>
              What They Said
            </h4>

            {/* Quote */}
            <blockquote className='mb-8'>
              <p className='font-serif text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] leading-snug'>
                "A comfortable place to stay, minimalist and clean design makes
                it more comfortable. Complete facilities are also of high
                quality."
              </p>
            </blockquote>

            {/* Author */}
            <div className='mb-8'>
              <span className='text-sm font-bold text-gray-900 block'>
                Angelia Surminah
              </span>
            </div>

            {/* Progress/Slider Indicator */}
            <div className='w-full max-w-xs h-[2px] bg-gray-100 relative'>
              <div className='absolute left-0 top-0 h-full w-1/3 bg-[#B83E25]'></div>
            </div>
          </div>

          <div className='w-full md:w-1/2 min-h-[300px] md:min-h-[500px] order-1 md:order-2'>
            <img
              src='https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              alt='Modern Luxury Home at Sunset'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
