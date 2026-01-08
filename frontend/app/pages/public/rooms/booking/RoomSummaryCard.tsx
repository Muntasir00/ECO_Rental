import React from "react";

export const RoomSummaryCard = () => {
    return (
        <div className="lg:col-span-4 bg-white p-2">
            <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm sticky top-8">
                <div className="h-56 overflow-hidden relative">
                    <img
                        src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Room"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">Premium Deluxe</h3>
                    <p className="text-sm text-gray-500 mb-6 font-light">
                        60 m² • 1 bed • 1 bathroom • balcony
                    </p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[#E5555C] text-2xl font-bold">$1200</span>
                        <span className="text-gray-400 text-sm">/ Night</span>
                    </div>
                </div>
            </div>
        </div>
    );
};