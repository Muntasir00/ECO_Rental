import React from 'react';
import about from '../../pages/public/about';
import {Button} from '~/components/ui/button';
import {Separator} from '~/components/ui/separator';
import MissionVisionSection from "~/section/public/MissionVisionSection";
import LocationSection from "~/pages/public/LocationSection";
import StatsSection from "~/pages/public/StatsSection";
import CertifiedBrandSection from "~/pages/public/CertifiedBrandSection";

const AboutPageView = () => {
    return (
        <div>
            {/*<div className='py-25 px-30 flex gap-20 justify-between'>*/}
            {/*    <div className='flex flex-col gap-20'>*/}
            {/*        <p className='font-eb-garamond font-medium text-[46px] leading-[150%] text-[#191818]'>*/}
            {/*            An internationally certified brand for finding your stay!*/}
            {/*        </p>*/}
            {/*        <Button className='bg-[#E14453] rounded-none w-fit'>*/}
            {/*            Find Place*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*    <div className='flex flex-col gap-20'>*/}
            {/*        <div className='flex gap-[50px]'>*/}
            {/*            <img src='/image/hyper.svg' alt=''/>*/}
            {/*            <img src='/image/ultra.svg' alt=''/>*/}
            {/*            <img src='/image/ultimate.svg' alt=''/>*/}
            {/*        </div>*/}

            {/*        <p className='font-manrope font-regular text-[20px] leading-[150%] text-[#7A7A7A]'>*/}
            {/*            Lorem ipsum dolor sit amet consectetur. Lacus ut enim turpis*/}
            {/*            imperdiet.Lorem ipsum dolor sit amet consectetur. Lacus ut enim*/}
            {/*            turpis imperdiet.*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className='bg-[#E14453] py-20 px-30 flex gap-8'>*/}
            {/*    <div className='flex flex-col gap-8'>*/}
            {/*        <p className='font-manrope font-medium text-[32px] leading-[150%] text-[#FAFAFA]'>*/}
            {/*            Hotels with the best service and quality always*/}
            {/*        </p>*/}
            {/*        <Separator/>*/}
            {/*        <div className='flex flex-col gap-2'>*/}
            {/*            <div className='flex gap-1 items-center'>*/}
            {/*                <img src='/image/star.svg' alt=''/>*/}
            {/*                <img src='/image/star.svg' alt=''/>*/}
            {/*                <img src='/image/star.svg' alt=''/>*/}
            {/*                <img src='/image/star.svg' alt=''/>*/}
            {/*                <img src='/image/star.svg' alt=''/>*/}
            {/*                <p className='font-manrope font-medium text-[24px] leading-[150%] text-[#FAFAFA]'>*/}
            {/*                    5.0*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*            <p className='font-manrope font-medium text-[18px] leading-[150%] text-[#AFAFAF]'>*/}
            {/*                a five-star hotel*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className='relative flex items-center gap-[-40px]'>*/}
            {/*        /!* Circle 1 *!/*/}
            {/*        <div*/}
            {/*            className='w-64 h-64 rounded-full border border-white flex flex-col items-center justify-center text-white relative z-10'>*/}
            {/*            <h2 className='text-5xl font-bold'>100+</h2>*/}
            {/*            <p className='text-sm mt-2'>Comfortable room</p>*/}
            {/*        </div>*/}

            {/*        /!* Circle 2 *!/*/}
            {/*        <div*/}
            {/*            className='w-64 h-64 rounded-full border border-white flex flex-col items-center justify-center text-white -ml-16 z-20'>*/}
            {/*            <h2 className='text-5xl font-bold'>5M+</h2>*/}
            {/*            <p className='text-sm mt-2'>Happy Customers</p>*/}
            {/*        </div>*/}

            {/*        /!* Circle 3 *!/*/}
            {/*        <div*/}
            {/*            className='w-64 h-64 rounded-full border border-white flex flex-col items-center justify-center text-white -ml-16 z-10'>*/}
            {/*            <h2 className='text-5xl font-bold'>23+</h2>*/}
            {/*            <p className='text-sm mt-2'>Certificate of Merit</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <CertifiedBrandSection />

            <StatsSection/>

            <MissionVisionSection/>

            <div className="w-full bg-[#fafafa]">
                <LocationSection bgColor="#fafafa"/>
            </div>

        </div>
    );
};

export default AboutPageView;
