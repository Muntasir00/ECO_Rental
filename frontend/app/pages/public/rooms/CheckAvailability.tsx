import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { availability } from '~/pages/public/rooms/roomActions';
import { toast } from 'sonner';
import { useRouter } from '~/routes/hooks';

// 1. Define Schema with Validation
const FormSchema = z
  .object({
    checkIn: z.date(),
    checkOut: z.date(),
  })
  .refine(
    data => {
      // ডেট সিলেক্ট না থাকলে যেন ক্র্যাশ না করে
      if (!data.checkIn || !data.checkOut) return false;
      return data.checkOut > data.checkIn;
    },
    {
      message: 'Check-out must be after Check-in',
      path: ['checkOut'],
    }
  );

export const CheckAvailability = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 2. Initialize Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  // 3. Submit Handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      // 1. Format the dates to "YYYY-MM-DD"
      const formattedStart = format(data.checkIn, 'yyyy-MM-dd');
      const formattedEnd = format(data.checkOut, 'yyyy-MM-dd');
      // 2. Call the API
      const res = await availability(id, formattedStart, formattedEnd);
      if (!res.isAvailable) {
        toast.info('No rooms available');
      } else {
        if (res.totalGuests) {
          router.push(
            `/booking?roomId=${id}&start=${formattedStart}&end=${formattedEnd}&availableRooms=${res?.availableRooms}&totalGuests=${res.totalGuests}`
          );
        } else {
          router.push(
            `/booking?roomId=${id}&start=${formattedStart}&end=${formattedEnd}&availableRooms=${res?.availableRooms}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* CHECK IN FIELD */}
        <FormField
          control={form.control}
          name='checkIn'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='text-xs text-gray-500 mb-1'>
                Check in
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal h-12 bg-[#F3F4F6] border-none hover:bg-gray-200 text-gray-700',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    // Disable dates in the past
                    disabled={date =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CHECK OUT FIELD */}
        <FormField
          control={form.control}
          name='checkOut'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='text-xs text-gray-500 mb-1'>
                Check Out
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal h-12 bg-[#F3F4F6] border-none hover:bg-gray-200 text-gray-700',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    // Disable dates before check-in (optional logic) or past dates
                    disabled={date =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BUTTONS */}
        <div className='pt-4 space-y-4'>
          <Button
            type='submit'
            disabled={isLoading}
            className='w-full bg-[#F3F4F6] text-gray-600 hover:bg-gray-200 hover:text-gray-900 py-6 text-sm font-medium shadow-none border-none flex items-center justify-center gap-2'
          >
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Checking...
              </>
            ) : (
              'Check Availability'
            )}
          </Button>

          {/* Example of the second button (Booking) if you need it later */}
          {/*
          <Button
            type="button"
            className="w-full bg-[#B83E25] hover:bg-[#d4444b] text-white py-6"
          >
            Booking
          </Button>
          */}
        </div>
      </form>
    </Form>
  );
};

// import React from "react";
//
// export const CheckAvailability = () => {
//     return (
//         <form className="space-y-6">
//             {/* Check In */}
//             <div>
//                 <label className="block text-xs text-gray-500 mb-2">Check in</label>
//                 <div className="relative">
//                     <input
//                         type="date"
//                         className="w-full bg-[#F3F4F6] text-sm text-gray-700 p-4 rounded-sm outline-none focus:ring-1 focus:ring-gray-300 appearance-none"
//                     />
//                 </div>
//             </div>
//
//             {/* Check Out */}
//             <div>
//                 <label className="block text-xs text-gray-500 mb-2">Check Out</label>
//                 <div className="relative">
//                     <input
//                         type="date"
//                         className="w-full bg-[#F3F4F6] text-sm text-gray-700 p-4 rounded-sm outline-none focus:ring-1 focus:ring-gray-300 appearance-none"
//                     />
//                 </div>
//             </div>
//
//             {/* Buttons */}
//             <div className="pt-4 space-y-4">
//                 <button type="button"
//                         className="w-full bg-[#F3F4F6] text-gray-600 py-3 text-sm font-medium hover:bg-gray-200 transition-colors">
//                     Check Availability
//                 </button>
//
//                 {/*<button*/}
//                 {/*    type="button"*/}
//                 {/*    disabled={!roomData.available}*/}
//                 {/*    className={`w-full text-white py-3 text-sm font-medium transition-colors shadow-md ${*/}
//                 {/*        roomData.available*/}
//                 {/*            ? "bg-[#B83E25] hover:bg-[#d4444b]"*/}
//                 {/*            : "bg-gray-400 cursor-not-allowed"*/}
//                 {/*    }`}*/}
//                 {/*>*/}
//                 {/*    {roomData.available ? "Booking" : "Currently Unavailable"}*/}
//                 {/*</button>*/}
//             </div>
//         </form>
//     )
// }
