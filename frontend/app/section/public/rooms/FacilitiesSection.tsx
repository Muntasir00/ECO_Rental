import React from 'react';
import {
    Phone,
    Bath,
    ShowerHead,
    Wifi,
    Tv,
    Coffee,
    CheckCircle2
} from 'lucide-react'; // Lucide icons ব্যবহার করা সহজ, না চাইলে SVG ই রাখতে পারেন

interface FacilityItem {
    name: string;
    description: string;
    _id: string;
}

export interface FacilityProps {
    _id: string;
    facilityType: string;
    facilityList: FacilityItem[];
    facilityDetails: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// আইকন ম্যাপিং অবজেক্ট (কোড ক্লিন রাখার জন্য)
const getIcon = (name: string) => {
    const iconStyle = {size: 32, strokeWidth: 1.5, className: "text-[#B83E25]"};

    switch (name.toLowerCase()) {
        case "telephone":
            return <Phone {...iconStyle} />;
        case "bathtub":
            return <Bath {...iconStyle} />;
        case "shower":
            return <ShowerHead {...iconStyle} />;
        case "fast wifi":
            return <Wifi {...iconStyle} />;
        // case "wifi": return <Wifi {...iconStyle} />;
        case "lcd television":
            return <Tv {...iconStyle} />;
        // case "television": return <Tv {...iconStyle} />;
        case "coffee maker":
            return <Coffee {...iconStyle} />;
        default:
            return <CheckCircle2 {...iconStyle} />; // ডিফল্ট আইকন
    }
};

const FacilitiesSection = ({facility}: { facility: FacilityProps }) => {
    if (!facility || !facility.facilityList) return null;

    return (
        <div className='bg-[#B83E25] rounded-sm py-8 px-6 md:px-12 mt-10'>
            {/* Header Title */}
            <div className='text-center mb-6'>
                <h2 className='text-white text-2xl md:text-3xl font-serif tracking-wide'>
                    Premium Deluxe Facilities
                </h2>
                {/*{facility.facilityDetails && (*/}
                {/*    <p className='text-white/80 text-sm mt-2 italic'>*/}
                {/*        {facility.facilityDetails}*/}
                {/*    </p>*/}
                {/*)}*/}
            </div>

            {/* White Content Box */}
            <div className='bg-white py-10 px-6 rounded-sm shadow-sm'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
                    {facility.facilityList.map(item => (
                        <div
                            key={item._id}
                            className='flex flex-col items-center justify-center group cursor-default transition-all'
                        >
                            <div
                                className='mb-3 transform transition-transform duration-300 group-hover:-translate-y-2'>
                                {getIcon(item.name)}
                            </div>

                            {/* Label */}
                            <span
                                className='text-gray-800 text-xs md:text-sm font-semibold text-center uppercase tracking-tight'>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacilitiesSection;