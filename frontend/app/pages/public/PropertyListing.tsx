import React from 'react';
import {Heart, MapPin, BedDouble, Bath, Users} from 'lucide-react';

const PropertyListing = () => {
    // Mock Data
    const properties = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "Serenity at Whispering Pines Retreat",
            address: "3091 Ranchview Dr. Richardson, California",
            beds: 5,
            baths: 6,
            guests: 6
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1600596542815-e32cbb1e3db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "Sunset Haven on the Emerald Bay",
            address: "1901 Thornridge Cir. Shiloh, Hawaii",
            beds: 4,
            baths: 5,
            guests: 4
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "Whispering Waters by the Seaside",
            address: "8391 Elgin St. Celina, Delaware",
            beds: 6,
            baths: 8,
            guests: 10
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "The Dreamy Escape at Golden Shores",
            address: "2118 Thornridge Cir. Syracuse, Connecticut",
            beds: 6,
            baths: 6,
            guests: 8
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "Enchanted Hideaway on Tranquil Hill",
            address: "4517 Washington Ave. Manchester, Kentucky",
            beds: 5,
            baths: 6,
            guests: 6
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "The Oasis by Crystal Clear Waters",
            address: "4140 Parker Rd. Allentown, New Mexico",
            beds: 4,
            baths: 5,
            guests: 5
        },
        // Adding more items to simulate the scrolling grid
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "Modern Retreat in the Mountains",
            address: "8821 West Fork St. Great Falls, Montana",
            beds: 3,
            baths: 2,
            guests: 4
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1569913486587-b93d497db307?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "Luxury Villa with Ocean View",
            address: "3421 Ocean Dr. Miami, Florida",
            beds: 7,
            baths: 8,
            guests: 12
        },
        {
            id: 9,
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            rating: "5.0",
            title: "Cozy Cottage by the Lake",
            address: "12 Lakeview Ln. Burlington, Vermont",
            beds: 2,
            baths: 1,
            guests: 3
        }
    ];

    return (
        <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                    {properties.map((property) => (
                        <div key={property.id} className="group cursor-pointer flex flex-col gap-4">

                            {/* IMAGE CONTAINER */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">

                                {/* Main Image */}
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Heart Icon (Top Right) */}
                                <button
                                    className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors text-gray-700 hover:text-red-500">
                                    <Heart className="w-5 h-5"/>
                                </button>

                                {/* Profile Avatar (Bottom Left Overlay) */}
                                <div className="absolute bottom-4 left-4">
                                    <img
                                        src={property.avatar}
                                        alt="Host"
                                        className="w-12 h-12 rounded-xl border-[3px] border-white object-cover shadow-md"
                                    />
                                </div>
                            </div>

                            {/* TEXT CONTENT */}
                            <div className="flex flex-col gap-2">

                                {/* Rating & Title Row */}
                                <div className="flex items-start gap-2">
                                    {/* Rating Badge */}
                                    <div
                                        className="flex items-center gap-1 bg-pink-100 text-[#E5555C] px-2 py-1 rounded-md text-xs font-bold mt-1">
                                        <span>★</span>
                                        <span>{property.rating}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-serif text-lg font-medium leading-tight group-hover:text-[#E5555C] transition-colors">
                                        {property.title}
                                    </h3>
                                </div>

                                {/* Address */}
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400"/>
                                    <span className="truncate">{property.address}</span>
                                </div>

                                {/* Amenities Row */}
                                <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                                    <div className="flex items-center gap-1.5">
                                        <BedDouble className="w-4 h-4 text-gray-400"/>
                                        <span>{property.beds} bedrooms</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Bath className="w-4 h-4 text-gray-400"/>
                                        <span>{property.baths} baths</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-gray-400"/>
                                        <span>{property.guests} Guests</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col items-center gap-4">
                    <p className="text-sm text-gray-500 font-medium">Would like to see more?</p>
                    <button
                        className="bg-[#E5555C] text-white px-8 py-3 rounded-md font-medium shadow-lg shadow-red-100 hover:bg-[#d4444b] transition-all transform active:scale-95">
                        Continue Browsing
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PropertyListing;