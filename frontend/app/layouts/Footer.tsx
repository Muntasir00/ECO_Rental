const Footer = () => {
  return (
    <div className='bg-[#F4F4F4] pt-20 pb-5 px-30 flex flex-col  gap-15'>
      <div className='flex justify-between'>
        <div className='flex gap-20'>
          <div className='max-w-[230px]'>
            <p className='font-normal font-manrope text-[18px] text-[#7A7A7A] leading-[150%]'>
              2020 Massachusetts Ave NW, Washington, DC 20036
            </p>
          </div>
          <div className='flex flex-col gap-8'>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Rooms
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Facilities
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Offers
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Wedding
            </p>
          </div>

          <div className='flex flex-col gap-8'>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              About
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Blog
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Careers
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Location
            </p>
          </div>

          <div className='flex flex-col gap-8'>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Instagram
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              Twitter
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              YouTube
            </p>
            <p className='font-manrope font-medium text-[16px] text-[#1A1A1A] leading-[100%]'>
              TikTok
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-[50px]'>
          <p className='font-eb-garamond font-medium text-[24px] text-[#1A1A1A]'>
            Subscribe Our Newsletter
          </p>
        </div>
      </div>
      <div className='flex justify-between font-manrope text-[18px] font-normal text-[#7A7A7A]'>
        <p>@2025 Eco rental. All rights reserved</p>
        <div className='flex gap-8'>
          <p>Terms & Condditions</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
