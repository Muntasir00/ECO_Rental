import React from 'react';
import Navbar from "~/layouts/Navbar";
import Footer from "~/layouts/Footer";
import PropertyListing from "~/pages/public/PropertyListing";
import StatsSection from "~/pages/public/StatsSection";
import FacilitiesList from "~/pages/public/FacilitiesList";
import Testimonial from "~/pages/public/Testimonial";
import BlogSection from "~/pages/public/BlogSection";
import { useAuthContext } from 'app/auth/hooks';
import HeroSlider from "~/pages/HeroSlider";
import BookingSearchBox from "~/pages/BookingSearchBox";

export default function IndexRedirect() {
    const { authenticated, loading } = useAuthContext();

    // Auth logic যদি দরকার হয় এখানে আনকমেন্ট (Uncomment) করতে পারেন

    return (
        <main>
            <Navbar />

            <div className="min-h-screen">
                <div className="relative w-full bg-[#FAFAFA] font-sans">

                    {/* Hero Section */}
                    <HeroSlider />

                    {/* Booking Form Overlay */}
                    <div className="pb-20">
                        <BookingSearchBox />

                        {/* Other Sections */}
                        <PropertyListing />
                        <StatsSection />
                        <FacilitiesList />
                        <Testimonial />
                        <BlogSection />
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}