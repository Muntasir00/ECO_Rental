import React, {useEffect, useState} from 'react';
import {rooms} from "~/pages/public/rooms/roomActions";
import type {Room} from "~/pages/public/PropertyListing";
import {Skeleton} from "~/components/ui/skeleton";
import {Link} from "react-router";

interface ApiResponse {
    rooms: Room[];
}

const OtherRooms = () => {
    const [roomsData, setRoomsData] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Function
    const fetchRooms = async (pageNumber: number) => {
        setIsLoading(true);
        try {
            // @ts-ignore
            const res: ApiResponse = await rooms(pageNumber);
            if (res && res.rooms) {
                setRoomsData(res.rooms);
            }
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
        <section className="py-10">

            {/* Section Heading */}
            <h2 className="text-xl md:text-3xl font-serif text-[#191818] mb-8">
                Other Rooms
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            {/* Image Skeleton */}
                            <Skeleton className="w-full h-64 bg-gray-200 rounded-none"/>

                            {/* Content Skeleton */}
                            <div className="space-y-3">
                                <Skeleton className="h-8 w-3/4 bg-gray-200"/> {/* Title */}
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-12 bg-gray-200"/>
                                    <Skeleton className="h-4 w-12 bg-gray-200"/>
                                    <Skeleton className="h-4 w-12 bg-gray-200"/>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    roomsData.slice(0, 3).map((room) => (
                        <Link to={"/room/" + room._id} key={room._id}>
                            <div className="group cursor-pointer">

                                {/* Image Container */}
                                <div className="w-full h-64 overflow-hidden mb-5 bg-gray-100 relative">
                                    <img
                                        src={room.images?.[0]?.url || "https://via.placeholder.com/800x600?text=No+Image"}
                                        alt={room.name}
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-xl md:text-2xl font-serif text-[#191818] mb-3 font-medium group-hover:text-gray-600 transition-colors line-clamp-1">
                                        {room.name}
                                    </h3>

                                    {/* Details Row with Red Separators */}
                                    <div className="flex items-center text-sm text-[#7A7A7A] font-light gap-2">
                                        <span>{room.size} m²</span>

                                        <span className="text-[#B83E25] text-[8px]">●</span>

                                        <span>{room.bedroom} bed</span>

                                        <span className="text-[#B83E25] text-[8px]">●</span>

                                        <span>{room.bathroom} bath</span>

                                        {room.balcony && (
                                            <>
                                                <span className="text-[#B83E25] text-[8px]">●</span>
                                                <span>Balcony</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))
                )}

            </div>
        </section>
    );
};

export default OtherRooms;