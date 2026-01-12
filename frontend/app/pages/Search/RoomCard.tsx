import React from 'react';
import {Heart, MapPin, BedDouble, Bath, Users} from 'lucide-react';
import {Button} from "~/components/ui/button";
import {Link} from "react-router";

// Type definition based on your API
export interface Room {
    _id: string;
    name: string;
    location: string;
    size: number;
    bedroom: number;
    bathroom: number;
    guest: number;
    images: { url: string }[];
    pricePerNight: number;
}

interface RoomCardProps {
    data: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({data}) => {
    // Mock data for UI elements not present in API (Rating, User Image)
    const rating = 5.0;
    const userImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";

    return (
        <Link to={"/room/" + data._id} className="flex justify-center items-center gap-x-8 gap-y-10">
            <div className="group flex flex-col gap-3 bg-transparent">
                {/* Image Container */}
                <div className="relative h-[280px] w-full overflow-hidden rounded-2xl">
                    <img
                        src={data.images[0]?.url || "/placeholder.jpg"}
                        alt={data.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Heart Icon */}
                    <div className="absolute top-3 right-3">
                        <Button size="icon" variant="ghost"
                                className="h-10 w-10 rounded-full bg-white/70 hover:bg-white backdrop-blur-sm text-gray-700 hover:text-red-500">
                            <Heart className="h-5 w-5"/>
                        </Button>
                    </div>

                    {/* User Avatar (Overlay) */}
                    <div className="absolute bottom-4 left-4">
                        <div className="h-12 w-12 rounded-xl border-2 border-white overflow-hidden shadow-lg">
                            <img src={userImage} alt="Host" className="h-full w-full object-cover"/>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                    {/* Rating Badge */}
                    <div className="flex items-center gap-2">
                    <span
                        className="inline-flex items-center gap-1 rounded-sm bg-pink-100 px-2 py-0.5 text-xs font-bold text-pink-600">
                        ★ {rating.toFixed(1)}
                    </span>
                        <h3 className="font-serif text-lg font-semibold text-gray-900 truncate">
                            {data.name}
                        </h3>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-gray-400 mb-2">
                        <MapPin className="h-3 w-3"/>
                        <span className="text-xs font-light">{data.location}</span>
                    </div>

                    {/* Amenities Row */}
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <div className="flex items-center gap-1.5">
                            <BedDouble className="h-4 w-4 stroke-1"/>
                            <span className="text-xs">{data.bedroom} bedrooms</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Bath className="h-4 w-4 stroke-1"/>
                            <span className="text-xs">{data.bathroom} baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 stroke-1"/>
                            <span className="text-xs">{data.guest} Guests</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RoomCard;