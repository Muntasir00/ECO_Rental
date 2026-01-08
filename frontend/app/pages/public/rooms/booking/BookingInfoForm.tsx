import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {cn} from "~/lib/utils";
import {format} from "date-fns";
import {Calendar, CalendarIcon} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Input} from "~/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const bookingInfoSchema = z.object({
    checkIn: z.date(),
    checkOut: z.date(),
    totalRoom: z.string().min(1, "Select at least 1 room"),
    totalGuest: z.string().min(1, "Select at least 1 guest"),
    referralCode: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
});


export const BookingInfoForm = ({
                                    defaultValues,
                                    totalRooms,
                                    totalGuests,
                                    onNext,
                                    onPrev,
                                }: {
    defaultValues: any;
    totalRooms: number | string | null | undefined;
    totalGuest: number | null | string | undefined;
    onNext: (data: any) => void;
    onPrev: () => void;
}) => {
    const form = useForm<z.infer<typeof bookingInfoSchema>>({
        resolver: zodResolver(bookingInfoSchema),
        defaultValues: defaultValues,
    });

    console.log(totalGuests)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onNext)}
                  className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Check In Date */}
                    <FormField
                        control={form.control}
                        name="checkIn"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Check in</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal h-10",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Check Out Date */}
                    <FormField
                        control={form.control}
                        name="checkOut"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Check out</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal h-10",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-baseline">
                    <FormField
                        control={form.control}
                        name="totalRoom"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Total Room</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select rooms"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Array.from({length: totalRooms}, (_, i) => (
                                            <SelectItem key={i} value={`${i + 1}`}>{i + 1}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="totalGuest"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Total Guest</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select guests"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {totalGuests === null || totalGuests === undefined ? (
                                            <SelectItem value="0">0</SelectItem>
                                        ) : (
                                            Array.from({length: Number(totalGuests)}, (_, i) => (
                                                <SelectItem key={i} value={`${i + 1}`}>
                                                    {i + 1}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-8">
                    <FormField
                        control={form.control}
                        name="referralCode"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Referral Code (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter code" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <Button type="button" onClick={onPrev} variant="outline"
                            className="px-10 py-6 border-[#E5555C] text-[#E5555C] hover:bg-red-50">
                        Prev
                    </Button>
                    <Button type="submit" className="bg-[#E5555C] text-white px-10 py-6 hover:bg-[#d4444b]">
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
};