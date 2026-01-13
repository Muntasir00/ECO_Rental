import { format } from 'date-fns';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '~/components/ui/button';

export const SummaryView = ({ data, onPrev, onSubmit, isLoading }: any) => {
  return (
    <div className='animate-in fade-in slide-in-from-right-4 duration-500'>
      <div className='space-y-4 mb-8'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500'>Name</span>
          <span className='font-medium text-gray-900'>
            {data.firstName} {data.lastName}
          </span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500'>Email</span>
          <span className='font-medium text-gray-900'>{data.email}</span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500'>Check In</span>
          <span className='font-medium text-gray-900'>
            {data.checkIn ? format(data.checkIn, 'dd MMM yyyy') : '-'}
          </span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500'>Check Out</span>
          <span className='font-medium text-gray-900'>
            {data.checkOut ? format(data.checkOut, 'dd MMM yyyy') : '-'}
          </span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500'>Total Room</span>
          <span className='font-medium text-gray-900'>{data.totalRoom}</span>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-500'>Total Guests</span>
          <span className='font-medium text-gray-900'>{data.totalGuest}</span>
        </div>
        {/*<div className="flex justify-between items-center text-sm">*/}
        {/*    <span className="text-gray-500">Price</span>*/}
        {/*    <span className="font-medium text-gray-900">$1200</span>*/}
        {/*</div>*/}

        {/*<hr className="border-gray-100 my-4"/>*/}

        {/*<div className="flex justify-between items-center">*/}
        {/*    <span className="text-base font-medium text-gray-900">Total Price</span>*/}
        {/*    <span className="text-xl font-bold text-[#B83E25]">$1200</span>*/}
        {/*</div>*/}
      </div>

      <div className='bg-[#FAFAFA] rounded-md p-4 mb-8 flex items-center justify-between cursor-pointer border border-transparent hover:border-gray-200 transition-colors'>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-medium text-gray-600'>
            Payment Method :
          </span>
          <div className='flex items-center gap-2'>
            <svg className='w-8 h-8' viewBox='0 0 24 24' fill='none'>
              <circle cx='9' cy='12' r='7' fill='#EB001B' fillOpacity='0.8' />
              <circle cx='15' cy='12' r='7' fill='#F79E1B' fillOpacity='0.8' />
            </svg>
            <span className='text-sm font-medium text-gray-900'>
              Master Card
            </span>
          </div>
        </div>
        <ChevronRight className='w-4 h-4 text-gray-400' />
      </div>

      <div className='flex justify-end gap-4 flex-wrap'>
        <Button
          type='button'
          onClick={onPrev}
          variant='outline'
          disabled={isLoading}
          className='px-10 py-6 border-[#B83E25] text-[#B83E25] hover:bg-red-50  w-full md:w-auto'
        >
          Prev
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className='bg-[#B83E25] text-white px-10 py-6 hover:bg-[#d4444b] w-full md:w-auto'
        >
          {isLoading ? <Loader2 className='animate-spin' /> : 'Booking Now'}
        </Button>
      </div>
    </div>
  );
};
