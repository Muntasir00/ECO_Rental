import React from 'react';
import about from '../../pages/public/about';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';

const AboutPageView = () => {
  return (
    <div>
      <div></div>

      <div className='py-25 px-30 flex gap-20 justify-between'>
        <div className='flex flex-col gap-20'>
          <p className='font-eb-garamond font-medium text-[46px] leading-[150%] text-[#191818]'>
            An internationally certified brand for finding your stay!
          </p>
          <Button className='bg-[#E14453] rounded-none w-fit'>
            Find Place
          </Button>
        </div>
        <div className='flex flex-col gap-20'>
          <div className='flex gap-[50px]'>
            <img src='/image/hyper.svg' alt='' />
            <img src='/image/ultra.svg' alt='' />
            <img src='/image/ultimate.svg' alt='' />
          </div>

          <p className='font-manrope font-regular text-[20px] leading-[150%] text-[#7A7A7A]'>
            Lorem ipsum dolor sit amet consectetur. Lacus ut enim turpis
            imperdiet.Lorem ipsum dolor sit amet consectetur. Lacus ut enim
            turpis imperdiet.
          </p>
        </div>
      </div>

      <div className='bg-[#E14453] py-20 px-30 flex gap-8'>
        <div className='flex flex-col gap-8'>
          <p className='font-manrope font-medium text-[32px] leading-[150%] text-[#FAFAFA]'>
            Hotels with the best service and quality always
          </p>
          <Separator />
          <div className='flex flex-col gap-2'>
            <div className='flex gap-1 items-center'>
              <img src='/image/star.svg' alt='' />
              <img src='/image/star.svg' alt='' />
              <img src='/image/star.svg' alt='' />
              <img src='/image/star.svg' alt='' />
              <img src='/image/star.svg' alt='' />
              <p className='font-manrope font-medium text-[24px] leading-[150%] text-[#FAFAFA]'>
                5.0
              </p>
            </div>
            <p className='font-manrope font-medium text-[18px] leading-[150%] text-[#AFAFAF]'>
              a five-star hotel
            </p>
          </div>
        </div>

        <div className='relative flex items-center gap-[-40px]'>
          {/* Circle 1 */}
          <div className='w-64 h-64 rounded-full border border-white flex flex-col items-center justify-center text-white relative z-10'>
            <h2 className='text-5xl font-bold'>100+</h2>
            <p className='text-sm mt-2'>Comfortable room</p>
          </div>

          {/* Circle 2 */}
          <div className='w-64 h-64 rounded-full border border-white flex flex-col items-center justify-center text-white -ml-16 z-20'>
            <h2 className='text-5xl font-bold'>5M+</h2>
            <p className='text-sm mt-2'>Happy Customers</p>
          </div>

          {/* Circle 3 */}
          <div className='w-64 h-64 rounded-full border border-white flex flex-col items-center justify-center text-white -ml-16 z-10'>
            <h2 className='text-5xl font-bold'>23+</h2>
            <p className='text-sm mt-2'>Certificate of Merit</p>
          </div>
        </div>
      </div>

      <div className='py-30 px-28'>
        <div className='flex flex-col gap-15'>
          <p className='font-eb-garamond font-medium text-[56px] leading-[150%] text-center'>
            Helping You Find The Most Comfortable Place
          </p>
          <div className='grid grid-cols-4 gap-4 items-stretch '>
            <div className='flex  flex-col gap-4 h-full'>
              <div className='bg-[#F4F4F4] flex flex-col items-start gap-3 rounded-[20px] py-9 px-6'>
                <p className='font-medium font-eb-garamond text-[24px] leading-[150%] text-[#000000]'>
                  Our Mission
                </p>
                <p className='font-medium font-eb-garamond text-[16px] leading-[150%] text-[#000000]'>
                  Lorem ipsum dolor sit amet consectetur. Lacus ut e.
                </p>
              </div>
              <img src='/image/about_1.png' alt='' />
            </div>

            <div className='flex flex-col gap-4 h-full'>
              <div className='bg-[#E14453] flex flex-col items-start gap-3 rounded-[20px] py-9 px-6'>
                <p className='font-bold font-manrope text-[20px] leading-[150%] text-[#000000]'>
                  Lorem ipsum dolor sit amet consectetur. Lacus ut enim turpis
                  imperdiet.Lorem ipsum dolor sit amet consectetur. Lacus ut
                  enim turpis imperdiet.
                </p>
              </div>
              <div className='bg-[#191818] rounded-[20px] relative aspect-4/3'>
                <img
                  src='/image/about_3.png'
                  alt=''
                  className='absolute bottom-3.5 right-3'
                />
              </div>
            </div>
            <div className='rounded-[20px] h-full'>
              <img src='/image/about_4.png' alt='' />
            </div>

            <div className='flex flex-col gap-4 w-full object-cover h-full'>
              <div className='rounded-[20px] bg-[#191818] py-10 px-5'>
                <p className='font-eb-garamond font-medium text-[24px] leading-[150%] text-white'>
                  Our Vision
                </p>
                <p className='font-manrope font-medium text-[16px] leading-[150%] text-white'>
                  Lorem ipsum dolor sit amet consectetur. Lacus ut e.
                </p>
              </div>
              <div className='rounded-[20px]'>
                <img src='/image/about_5.png' alt='' className='aspect-2/3' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-10 bg-[#F1F1F1] py-15 px-28 items-center'>
        <p className='font-eb-garamond font-medium text-[46px] text-[#191818]'>
          Visit our rentals and book a room!
        </p>
        <img src='/image/map.png' alt='' />
      </div>
    </div>
  );
};

export default AboutPageView;
