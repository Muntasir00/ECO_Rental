import React, {useEffect, useState} from 'react';
import {Heart, MapPin, BedDouble, Bath, Users} from 'lucide-react';
import {rooms} from "~/pages/public/rooms/roomActions";
import {Skeleton} from "~/components/ui/skeleton";
import {Link} from "react-router";

interface RoomImage {
    url: string;
    publicId: string;
    _id: string;
}

export interface Room {
    _id: string;
    name: string;
    location: string;
    size: number;
    bedroom: number;
    bathroom: number;
    balcony: boolean;
    availableRooms: number;
    pricePerNight: number;
    available: boolean;
    guest: number;
    images: RoomImage[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ApiResponse {
    rooms: Room[];
}

const PropertyListing = () => {

    const [roomsData, setRoomsData] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Function
    const fetchRooms = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const res: ApiResponse = await rooms(pageNumber);
            setRoomsData(res.rooms);
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial Load
    useEffect(() => {
        fetchRooms(1);
    }, []);

    return (
        <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                    {isLoading ? (
                        Array.from({length: 9}).map((_, index) => (
                            <div key={index} className="flex flex-col">
                                {/* Image Skeleton */}
                                <Skeleton className="w-full h-64 mb-4 rounded-none bg-gray-200"/>

                                {/* Text Skeleton */}
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-3/4 bg-gray-200"/>
                                    <Skeleton className="h-4 w-1/2 bg-gray-200"/>
                                </div>
                            </div>
                        ))
                    ) : (

                        roomsData.length > 0 ? (
                            roomsData.slice(0, 9).map((room) => (
                                <Link to={`/room/${room._id}`}>
                                    <div key={room._id} className="group cursor-pointer flex flex-col gap-4">

                                        {/* IMAGE CONTAINER */}
                                        <div
                                            className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm">

                                            {/* Main Image - JSON এর images array থেকে প্রথম ছবি নেওয়া হয়েছে */}
                                            <img
                                                src={room.images[0]?.url}
                                                alt={room.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* Heart Icon (Top Right) */}
                                            <button
                                                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors text-gray-700 hover:text-red-500">
                                                <Heart className="w-5 h-5"/>
                                            </button>

                                            {/* Profile Avatar (Bottom Left Overlay) - ডামি ইমেজ */}
                                            <div className="absolute bottom-4 left-4">
                                                <img
                                                    src="https://i.pravatar.cc/150?img=32"
                                                    alt="Host"
                                                    className="w-12 h-12 rounded-xl border-[3px] border-white object-cover shadow-md"
                                                />
                                            </div>
                                        </div>

                                        {/* TEXT CONTENT */}
                                        <div className="flex flex-col gap-2">

                                            {/* Rating & Title Row */}
                                            <div className="flex items-start gap-2">
                                                {/* Rating Badge - ডামি ভ্যালু */}
                                                <div
                                                    className="flex items-center gap-1 bg-pink-100 text-[#E5555C] px-2 py-1 rounded-md text-xs font-bold mt-1">
                                                    <span>★</span>
                                                    <span>4.8</span>
                                                </div>

                                                {/* Title - JSON এর name */}
                                                <h3 className="font-serif text-lg font-medium leading-tight group-hover:text-[#E5555C] transition-colors line-clamp-1">
                                                    {room.name}
                                                </h3>
                                            </div>

                                            {/* Address - JSON এর location */}
                                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                                                <MapPin className="w-4 h-4 text-gray-400"/>
                                                <span className="truncate">{room.location}</span>
                                            </div>

                                            {/* Amenities Row */}
                                            <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                                                <div className="flex items-center gap-1.5">
                                                    <BedDouble className="w-4 h-4 text-gray-400"/>
                                                    <span>{room.bedroom} beds</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Bath className="w-4 h-4 text-gray-400"/>
                                                    <span>{room.bathroom} baths</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-4 h-4 text-gray-400"/>
                                                    <span>{room?.guest} Guests</span>
                                                </div>
                                            </div>

                                            {/* Price Display (Optional - যেহেতু আপনার ডেটায় আছে) */}
                                            <div className="font-semibold text-lg mt-1">
                                                ${room.pricePerNight} <span
                                                className="text-gray-400 text-sm font-normal">/ night</span>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No rooms found.
                            </div>
                        )
                    )}
                </div>

                <div className="mt-20 flex flex-col items-center gap-4">
                    <p className="text-sm text-gray-500 font-medium">Would like to see more?</p>
                    <Link to="/rooms" className="cursor-pointer">
                        <button
                            className="cursor-pointer bg-[#E5555C] text-white px-8 py-3 rounded-md font-medium shadow-lg shadow-red-100 hover:bg-[#d4444b] transition-all transform active:scale-95">
                            Continue Browsing
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PropertyListing;