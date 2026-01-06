// pages/index.tsx
import React, {useEffect, useState} from 'react';
import {useAuthContext} from 'app/auth/hooks';
import {useRouter} from 'app/routes/hooks';
import {paths} from 'app/routes/paths';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "~/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {ChevronDownIcon, Search} from "lucide-react";
import {Calendar} from "~/components/ui/calendar";
import PropertyListing from "~/pages/public/PropertyListing";
import StatsSection from "~/pages/public/StatsSection";
import FacilitiesList from "~/pages/public/FacilitiesList";
import Testimonial from "~/pages/public/Testimonial";
import BlogSection from "~/pages/public/BlogSection";
import Navbar from "~/layouts/Navbar";
import Footer from "~/layouts/Footer";

export default function IndexRedirect() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [open1, setOpen1] = React.useState(false)
    const [date1, setDate1] = React.useState<Date | undefined>(undefined)
    const {authenticated, loading} = useAuthContext();
    const router = useRouter();
    console.log("authenticated")

    // useEffect(() => {
    //     if (loading) return;
    //     if (authenticated) {
    //         console.log("loading", paths.home.root);
    //         router.replace(paths.home.root);
    //     } else {
    //         console.log("loading", paths.public.root);
    //         router.replace(paths.public.root);
    //     }
    // }, [authenticated, loading, router]);


    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Forest cabin
            title: "Welcome to Eco Rentals - Sustainable Living Made Easy",
            subtitle: "At EcoRentals, we believe in a world where sustainability and convenience go hand in hand. Our platform offers an eco-friendly way to rent high-quality products."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Nature landscape
            title: "Reconnect with Nature",
            subtitle: "Escape the city and find peace in our curated selection of eco-friendly retreats designed to minimize footprint and maximize comfort."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // Adventure
            title: "Experience the Outdoors",
            subtitle: "From hiking gear to camping essentials, rent everything you need for your next adventure without the waste of buying new."
        }
    ];

    // 2. Auto-play logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <main>
            <Navbar/>
            <div className="min-h-screen">
                <div className="relative w-full bg-[#FAFAFA] font-sans">

                    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">

                        {/* Slides */}
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                            >
                                {/* Background Image */}
                                <img
                                    src={slide.image}
                                    alt="Hero Background"
                                    className="w-full h-full object-cover"
                                />
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/50"></div>
                            </div>
                        ))}

                        {/* Text Content Layer */}
                        <div
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-20 pt-16 md:pt-0">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight drop-shadow-lg max-w-5xl mb-6 transition-all duration-700 transform translate-y-0">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-gray-200 text-sm md:text-lg max-w-2xl leading-relaxed drop-shadow-md">
                                {slides[currentSlide].subtitle}
                            </p>
                        </div>

                        {/* Pagination Dots (Custom Style from Image) */}
                        <div className="absolute bottom-24 md:bottom-32 left-0 right-0 z-30 flex justify-center gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? 'w-8 bg-white' // Active: Long pill
                                            : 'w-2 bg-white/50 hover:bg-white/80' // Inactive: Small dot
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>

                    <div className="relative z-40 -mt-20 pb-20">
                        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl p-6 mb-20 md:p-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">

                                {/* 1. Location Input */}
                                <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:pr-6">
                                    <label className="text-gray-500 text-sm font-medium">Where</label>
                                    <div className="flex items-center justify-between cursor-pointer group">
                                        <Select>
                                            <SelectTrigger className="w-full border-0 shadow-none" id="room">
                                                <SelectValue placeholder="Select Type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">01</SelectItem>
                                                <SelectItem value="2">02</SelectItem>
                                                <SelectItem value="3">03</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* 2. Checkin Date */}
                                <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:px-6">
                                    <label className="text-gray-500 text-sm font-medium">Checkin</label>
                                    <div className="flex items-center justify-between cursor-pointer group">
                                        <Popover open={open1} onOpenChange={setOpen1}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="check-out"
                                                    className="w-48 justify-between font-normal border-0 shadow-none"
                                                >
                                                    {date1 ? date1.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0"
                                                            align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setDate1(date)
                                                        setOpen1(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* 3. Checkout Date */}
                                <div className="flex flex-col gap-2 lg:border-r border-gray-200 lg:px-6">
                                    <label className="text-gray-500 text-sm font-medium">Checkout</label>
                                    <div className="flex items-center justify-between cursor-pointer group">
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="check-out"
                                                    className="w-48 justify-between font-normal border-0 shadow-none"
                                                >
                                                    {date ? date.toLocaleDateString() : "Select date"}
                                                    <ChevronDownIcon/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0"
                                                            align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        setDate(date)
                                                        setOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* 4. Rooms & Button */}
                                <div
                                    className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-4 lg:pl-6">
                                    {/* Rooms Dropdown */}
                                    <div className="w-full md:w-auto flex flex-col gap-2 flex-grow">
                                        <label className="text-gray-500 text-sm font-medium">Rooms</label>
                                        <div className="flex items-center justify-between cursor-pointer group">
                                            <Select>
                                                <SelectTrigger className="w-full !border-0 shadow-none" id="room ">
                                                    <SelectValue placeholder="Total Room"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">01 Room</SelectItem>
                                                    <SelectItem value="2">02 Rooms</SelectItem>
                                                    <SelectItem value="3">03 Rooms</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Search Button */}
                                    <button
                                        className="w-full md:w-auto bg-[#E5555C] hover:bg-[#d4444b] text-white font-medium py-3 px-8 rounded-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                                        <Search className="w-4 h-4 md:hidden"/>
                                        Search
                                    </button>
                                </div>

                            </div>


                        </div>

                        <PropertyListing/>

                        <StatsSection/>

                        <FacilitiesList/>

                        <Testimonial/>

                        <BlogSection/>

                    </div>

                </div>
            </div>
            <Footer/>
        </main>
    );
}
