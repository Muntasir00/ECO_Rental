import React from 'react';
import FacilitiesSection from "~/section/public/rooms/FacilitiesSection";
import OtherRooms from "~/section/public/rooms/OtherRooms";

const RoomDetails = () => {
    return (
        <div className="font-sans text-[#1A1A1A] bg-white">

            <header className="relative w-full h-[60vh] mt-[88px] min-h-[400px]">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Premium Deluxe Room"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Centered Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 drop-shadow-md">
                        Premium Deluxe
                    </h1>
                    <div className="flex items-center flex-wrap gap-3 text-sm md:text-base font-medium tracking-wide opacity-90">
                        <span>50.5 m²</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>1 bed</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>1 bathroom</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>balcony</span>
                    </div>
                </div>
            </header>

            <div className="bg-[#FAFAFA] w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 ">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                        <div className="h-64 overflow-hidden rounded-sm">
                            <img
                                src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Room view 1"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="h-64 overflow-hidden rounded-sm">
                            <img
                                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Bathroom"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="h-64 overflow-hidden rounded-sm">
                            <img
                                src="https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Room view 2"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                        <div className="flex-1">
                            <h2 className="text-3xl font-serif font-medium mb-6">Description</h2>

                            <div className="text-gray-500 leading-relaxed space-y-6 mb-10 text-justify">
                                <p>
                                    Surround yourself with simple elegance in this 50.5 m2 beautifully appointed Deluxe
                                    Premium Room with some traditional touch. our 50.5 m2 is simply your perfect choice.
                                    This room also provides convenience with direct parking access in front of the room
                                    and terrace that make your stay more perfect.
                                </p>
                                <p>
                                    A comfortable room atmosphere with an elegant and modern
                                </p>
                            </div>

                            <button
                                className="border border-[#E5555C] text-[#E5555C] px-8 py-3 rounded-sm hover:bg-[#E5555C] hover:text-white transition-colors duration-300 font-medium text-sm">
                                Communicate with us
                            </button>
                        </div>

                        <div className="w-full lg:w-[400px] flex-shrink-0">
                            <div className="bg-white p-3 lg:p-4">

                                {/* Header: Title + Price */}
                                <div className="flex justify-between items-baseline mb-8">
                                    <h3 className="text-xl font-serif font-medium">Booking</h3>
                                    <div className="text-right">
                                        <span className="text-[#E5555C] text-xl font-bold">$1200</span>
                                        <span className="text-xs text-[#E5555C] font-normal"> / Night</span>
                                    </div>
                                </div>

                                {/* Form Inputs */}
                                <form className="space-y-6">

                                    {/* Check In */}
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-2">Check in</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full bg-[#F3F4F6] text-sm text-gray-700 p-4 rounded-sm outline-none focus:ring-1 focus:ring-gray-300 appearance-none"
                                                defaultValue="2023-05-20"
                                            />
                                            {/* Custom Calendar Icon Overlay (Visual only, relies on native picker) */}
                                            <div
                                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Check Out */}
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-2">Check Out</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full bg-[#F3F4F6] text-sm text-gray-700 p-4 rounded-sm outline-none focus:ring-1 focus:ring-gray-300 appearance-none"
                                                defaultValue="2023-05-21"
                                            />
                                            <div
                                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                     strokeLinejoin="round">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="pt-4 space-y-4">
                                        <button type="button"
                                                className="w-full bg-[#F3F4F6] text-gray-600 py-3 text-sm font-medium hover:bg-gray-200 transition-colors">
                                            Check menu
                                        </button>

                                        <button type="button"
                                                className="w-full bg-[#E5555C] text-white py-3 text-sm font-medium hover:bg-[#d4444b] transition-colors shadow-md">
                                            Booking
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>

                    </div>

                    <FacilitiesSection/>

                    <OtherRooms />

                </div>
            </div>
        </div>
    );
};

export default RoomDetails;