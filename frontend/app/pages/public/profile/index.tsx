import React from 'react';
import {Link} from "react-router";

const PersonalInfoPage = () => {
    // Data for the rows to keep code clean and manageable
    const infoFields = [
        {
            id: 1,
            label: "Legal Name",
            value: "Aftab uz zaman",
            action: "Edit"
        },
        {
            id: 2,
            label: "Email address",
            value: "jerry73@aol.com",
            action: "Edit"
        },
        {
            id: 3,
            label: "Phone numbers",
            value: "Aftab uz zaman", // Assuming placeholder text from image, commonly this would be a number
            action: "Edit"
        },
        {
            id: 4,
            label: "Identity verification",
            value: "Aftab uz zaman", // Placeholder text from image
            action: "Start" // Note: This specific item has "Start" instead of "Edit"
        },
        {
            id: 5,
            label: "Address",
            value: "Aftab uz zaman",
            action: "Edit"
        },
        {
            id: 6,
            label: "Emergency contact",
            value: "Aftab uz zaman",
            action: "Edit"
        }
    ];

    return (
        <div className="bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2 text-[#191818]">
                            Personal Info
                        </h1>
                        <p className="text-[#7a7a7a] font-light">
                            Welcome Aftab uz zaman
                        </p>
                    </div>

                    <Link to="/profile">
                        <button
                            className="cursor-pointer border border-[#E5555C] text-[#E5555C] hover:bg-red-50 px-8 py-2.5 rounded-sm font-medium transition-colors text-sm">
                            Go to Profile
                        </button>
                    </Link>
                </div>

                {/* Divider Line */}
                <hr className="border-gray-200 mb-10"/>

                <div className="flex flex-col gap-6">
                    {infoFields.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white flex justify-between items-start md:items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-3 rounded-sm"
                        >

                            {/* Left Side: Label & Value */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
                                    {item.label}
                                </h3>
                                <p className="text-sm text-gray-500 font-light">
                                    {item.value}
                                </p>
                            </div>

                            {/* Right Side: Action Link */}
                            <div>
                                <button
                                    className="text-[#1A1A1A] text-sm font-medium underline underline-offset-4 decoration-1 hover:text-[#E5555C] hover:decoration-[#E5555C] transition-all">
                                    {item.action}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PersonalInfoPage;