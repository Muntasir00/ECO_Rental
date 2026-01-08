import React from "react";

export default function BookingHeader() {
    return (
        <header className="relative w-full h-[40vh] min-h-[300px]">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-4xl md:text-5xl font-serif drop-shadow-lg">Premium Deluxe</h1>
                <div className="flex gap-3 text-sm mt-3 opacity-90 font-light">
                    <span>50.5 m²</span> • <span>1 bed</span> • <span>1 bathroom</span> • <span>balcony</span>
                </div>
            </div>
        </header>
    )
}