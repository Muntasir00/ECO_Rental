import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router"; // Use react-router-dom
import { ChevronDownIcon, Search } from 'lucide-react';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import {formatDate} from "~/utils/date-helper";

const SearchFilterBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Internal State (Initialize from URL if available)
    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [bedrooms, setBedrooms] = useState(searchParams.get("bedroom") || "");

    // Parse Dates from URL strings
    const initialCheckIn = searchParams.get("checkIn") ? new Date(searchParams.get("checkIn")!) : undefined;
    const initialCheckOut = searchParams.get("checkOut") ? new Date(searchParams.get("checkOut")!) : undefined;

    const [checkInDate, setCheckInDate] = useState<Date | undefined>(initialCheckIn);
    const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(initialCheckOut);

    // Popover states
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkOutOpen, setCheckOutOpen] = useState(false);

    // 2. Sync State if URL changes externally (e.g. Browser Back Button)
    useEffect(() => {
        setLocation(searchParams.get("location") || "");
        setBedrooms(searchParams.get("bedroom") || "");

        const inDate = searchParams.get("checkIn");
        const outDate = searchParams.get("checkOut");

        if (inDate) setCheckInDate(new Date(inDate));
        if (outDate) setCheckOutDate(new Date(outDate));
    }, [searchParams]);

    // 3. Handle Search (Update URL)
    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);

        if (location) params.set("location", location);
        else params.delete("location");

        if (bedrooms) params.set("bedroom", bedrooms);
        else params.delete("bedroom");

        if (checkInDate) params.set("checkIn", formatDate(checkInDate));
        else params.delete("checkIn");

        if (checkOutDate) params.set("checkOut", formatDate(checkOutDate));
        else params.delete("checkOut");

        // IMPORTANT: Reset to page 1 on new search
        params.set("page", "1");

        setSearchParams(params);
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 w-full">

                {/* Location */}
                <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:pr-6">
                    <label className="text-gray-500 text-sm font-medium">Where</label>
                    <Input
                        placeholder="Place Name"
                        className="w-full border-none shadow-none px-0 focus-visible:ring-0 font-semibold placeholder:font-normal"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                {/* Checkin */}
                <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:px-6">
                    <label className="text-gray-500 text-sm font-medium">Checkin</label>
                    <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between font-semibold border-0 shadow-none px-0 hover:bg-transparent text-left">
                                {checkInDate ? checkInDate.toLocaleDateString() : <span className="font-normal text-muted-foreground">Select date</span>}
                                <ChevronDownIcon className="h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={checkInDate}
                                onSelect={(date) => { setCheckInDate(date); setCheckInOpen(false); }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Checkout */}
                <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:px-6">
                    <label className="text-gray-500 text-sm font-medium">Checkout</label>
                    <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between font-semibold border-0 shadow-none px-0 hover:bg-transparent text-left">
                                {checkOutDate ? checkOutDate.toLocaleDateString() : <span className="font-normal text-muted-foreground">Select date</span>}
                                <ChevronDownIcon className="h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={checkOutDate}
                                onSelect={(date) => { setCheckOutDate(date); setCheckOutOpen(false); }}
                                disabled={(date) => date < (checkInDate || new Date())}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Rooms & Search Button */}
                <div className="flex flex-col md:flex-row items-center gap-4 lg:pl-6">
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-gray-500 text-sm font-medium">Rooms</label>
                        <Select value={bedrooms} onValueChange={setBedrooms}>
                            <SelectTrigger className="w-full border-none shadow-none px-0 focus:ring-0 font-semibold">
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Any Room</SelectItem>
                                <SelectItem value="1">01 Room</SelectItem>
                                <SelectItem value="2">02 Rooms</SelectItem>
                                <SelectItem value="3">03 Rooms</SelectItem>
                                <SelectItem value="4">04 Rooms</SelectItem>
                                <SelectItem value="5">05 Rooms</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={handleSearch}
                        className="w-full md:w-auto bg-[#E5555C] hover:bg-[#d4444b] text-white font-medium py-6 px-8 rounded-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Search className="w-4 h-4" />
                        <span className="md:hidden lg:inline">Search</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;