import React from 'react';
import {User, Shield, CreditCard, Bell} from 'lucide-react';
import {Link} from "react-router";
import {useAuthContext} from "~/auth/hooks";

const AccountPage = () => {
    const {user, loading} = useAuthContext();
    // Data for the option cards
    const accountOptions = [
        {
            id: 1,
            title: "Personal Info",
            description: "Provide personal details for contact and transparency",
            icon: <User className="w-6 h-6" strokeWidth={1.5}/>
        },
        {
            id: 2,
            title: "Login and security",
            description: "Update your password to secure your account",
            icon: <Shield className="w-6 h-6" strokeWidth={1.5}/>
        },
        {
            id: 3,
            title: "Payments",
            description: "Review payments, transaction history etc",
            icon: <CreditCard className="w-6 h-6" strokeWidth={1.5}/>
        },
        {
            id: 4,
            title: "Notifications",
            description: "Choose notification preferences",
            icon: <Bell className="w-6 h-6" strokeWidth={1.5}/>
        }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">
                            Account
                        </h1>
                        <p className="text-gray-500 font-light">
                            Welcome {user?.fullName}
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

                {/* =======================
            GRID SECTION
        ======================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {accountOptions.map((option) => (
                        <div
                            key={option.id}
                            className="bg-white p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-4 h-full"
                        >
                            {/* Icon */}
                            <div className="text-[#1A1A1A]">
                                {option.icon}
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="text-lg font-serif font-medium mb-2 text-[#1A1A1A]">
                                    {option.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-light">
                                    {option.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* =======================
            BOTTOM ACTION
        ======================== */}
                <div>
                    <button
                        className="bg-[#E5555C] text-white hover:bg-[#d4444b] px-8 py-3 rounded-md font-medium shadow-sm transition-colors text-sm">
                        Deactivate or delete account
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AccountPage;