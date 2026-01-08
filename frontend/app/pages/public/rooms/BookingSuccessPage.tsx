import React from "react";
import { Link, useLocation, Navigate } from "react-router";
import { CheckCircle2, Home, FileText, Calendar, User, Phone, Mail, Printer } from "lucide-react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";

interface BookingResult {
    booking: {
        _id: string;
        name: string;
        email: string;
        phoneNumber: string;
        checkIn: string;
        checkOut: string;
        totalGuest: number;
        totalPrice: number;
        status: string;
        roomsBooked: number;
    };
    pricing: {
        nights: number;
        pricePerNight: number;
        roomsBooked: number;
        totalPrice: number;
    };
}

const BookingSuccessPage = () => {
    const location = useLocation();
    const data = location.state as BookingResult;

    if (!data) {
        return <Navigate to="/" replace />;
    }
    const { booking, pricing } = data;



    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 flex justify-center items-start font-sans">
            <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* --- MAIN CARD --- */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

                    {/* Header Section */}
                    <div className="bg-[#E5555C] p-8 text-center text-white relative overflow-hidden">
                        {/* Decorative Background Circle */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                                <CheckCircle2 className="w-8 h-8 text-[#E5555C]" />
                            </div>
                            <h1 className="text-3xl font-serif font-bold mb-2">Booking Confirmed!</h1>
                            <p className="text-white/90 text-sm">
                                Your booking ID is <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">#{booking._id.slice(-6).toUpperCase()}</span>
                            </p>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* 1. TRIP DETAILS (Grid) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Check In */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Check In</p>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded text-[#E5555C]">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            {format(new Date(booking.checkIn), "dd MMM yyyy")}
                                        </p>
                                        <p className="text-xs text-gray-500">After 12:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Check Out */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Check Out</p>
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded text-[#E5555C]">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">
                                            {format(new Date(booking.checkOut), "dd MMM yyyy")}
                                        </p>
                                        <p className="text-xs text-gray-500">Before 11:00 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. PAYMENT SUMMARY (Receipt Style) */}
                        <div className="border border-dashed border-gray-300 rounded-lg p-6 mb-8 bg-[#FAFAFA]">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Payment Breakdown</h3>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Rate per night</span>
                                    <span>${pricing.pricePerNight}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Nights</span>
                                    <span>x {pricing.nights}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Rooms Booked</span>
                                    <span>x {pricing.roomsBooked}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Guests</span>
                                    <span>{booking.totalGuest} Person(s)</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-300 my-4"></div>

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                                <span className="font-bold text-[#E5555C] text-2xl">
                                    ${pricing.totalPrice}
                                </span>
                            </div>

                            <div className="mt-2 text-right">
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">
                                    {booking.status}
                                </span>
                            </div>
                        </div>

                        {/* 3. CUSTOMER INFO */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Customer Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{booking.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span>{booking.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span>{booking.phoneNumber}</span>
                                </div>
                            </div>
                        </div>

                        {/* 4. ACTIONS */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link to="/user/dashboard" className="flex-1">
                                <Button className="w-full bg-[#1A1A1A] hover:bg-black h-12">
                                    <FileText className="mr-2 h-4 w-4" />
                                    My Bookings
                                </Button>
                            </Link>

                            <Link to="/" className="flex-1">
                                <Button variant="secondary" className="w-full h-12 bg-gray-100 hover:bg-gray-200">
                                    <Home className="mr-2 h-4 w-4" />
                                    Home
                                </Button>
                            </Link>
                        </div>

                    </div>

                    {/* Footer Warning/Note */}
                    <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Please present this receipt or the booking ID upon arrival.
                            <br /> Need help? Contact us at <span className="text-[#E5555C]">support@hotelzerra.com</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingSuccessPage;