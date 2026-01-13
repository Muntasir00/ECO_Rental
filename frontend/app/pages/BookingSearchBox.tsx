import React, { useState } from 'react';
import { useRouter } from 'app/routes/hooks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ChevronDownIcon, Search } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";

// Helper to format date as YYYY-MM-DD (matches your API requirement)
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function BookingSearchBox() {
    const router = useRouter();

    const [location, setLocation] = useState("");
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);

    const [checkOutOpen, setCheckOutOpen] = useState(false);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);

    const [bedrooms, setBedrooms] = useState(""); // Maps to 'bedroom' param

    // -- Search Handler --
    const handleSearch = () => {
        // 1. Basic Validation
        if (!checkInDate || !checkOutDate) {
            // You can use toast.error("Please select dates") here
            console.warn("Please select check-in and check-out dates");
            return;
        }

        // 2. Construct Query Parameters
        const params = new URLSearchParams();

        if (location) params.append("location", location);
        // Your API expects 'bedroom', the select captures the number
        if (bedrooms) params.append("bedroom", bedrooms);

        params.append("checkIn", formatDate(checkInDate));
        params.append("checkOut", formatDate(checkOutDate));

        // Default pagination params (as seen in your Postman)
        params.append("page", "1");
        params.append("limit", "10");

        // 3. Navigate to Results Page
        // Assuming your listing page is at /rooms or /search
        // Adjust `paths.public.rooms` to your actual route path string
        const searchUrl = `/search?${params.toString()}`;

        console.log("Navigating to:", searchUrl); // For debugging
        router.push(searchUrl);
    };

    return (
        <div className="relative z-40 -mt-20 px-4 md:px-0">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">

                    {/* 1. Location Input */}
                    <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:pr-6">
                        <label className="text-gray-500 text-sm font-medium">Where</label>
                        <Input
                            placeholder="Place Name (e.g. Celina)"
                            className="w-full"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* 2. Checkin Date */}
                    <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:px-6">
                        <label className="text-gray-500 text-sm font-medium">Checkin</label>
                        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between font-normal border-0 shadow-none px-0 hover:bg-transparent text-left">
                                    {checkInDate ? checkInDate.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={checkInDate}
                                    onSelect={(date) => {
                                        setCheckInDate(date);
                                        setCheckInOpen(false);
                                    }}
                                    disabled={(date) => date < new Date()} // Disable past dates
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* 3. Checkout Date */}
                    <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:px-6">
                        <label className="text-gray-500 text-sm font-medium">Checkout</label>
                        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between font-normal border-0 shadow-none px-0 hover:bg-transparent text-left">
                                    {checkOutDate ? checkOutDate.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={checkOutDate}
                                    onSelect={(date) => {
                                        setCheckOutDate(date);
                                        setCheckOutOpen(false);
                                    }}
                                    disabled={(date) =>
                                        date < new Date() || (checkInDate ? date <= checkInDate : false)
                                    } // Disable dates before check-in
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* 4. Rooms & Button */}
                    <div className="flex flex-col md:flex-row items-center gap-4 lg:pl-6">
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-gray-500 text-sm font-medium">Rooms</label>
                            <Select onValueChange={setBedrooms}>
                                <SelectTrigger className="w-full !border-0 shadow-none px-0 focus:ring-0">
                                    <SelectValue placeholder="Total Room" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">01 Room</SelectItem>
                                    <SelectItem value="2">02 Rooms</SelectItem>
                                    <SelectItem value="3">03 Rooms</SelectItem>
                                    <SelectItem value="4">04 Rooms</SelectItem>
                                    <SelectItem value="5">05 Rooms</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <button
                            onClick={handleSearch}
                            className="cursor-pointer w-full md:w-auto bg-[#B83E25] hover:bg-[#d4444b] text-white font-medium py-3 px-8 rounded-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            <Search className="w-4 h-4" />
                            <span className="md:hidden lg:inline">Search</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}