import React, {useState} from 'react';
import {Calendar as CalendarIcon, ChevronDown, ChevronDownIcon, ChevronRight} from 'lucide-react';
import {Input} from "~/components/ui/input";
import {Select, SelectTrigger, SelectItem, SelectContent, SelectValue} from "~/components/ui/select";
import {Field, FieldLabel} from "~/components/ui/field";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar"

const BookingPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [open1, setOpen1] = React.useState(false)
    const [date1, setDate1] = React.useState<Date | undefined>(undefined)

    // Stepper Data
    const steps = [
        {id: 1, label: "Personal data"},
        {id: 2, label: "Booking info"},
        {id: 3, label: "Summary"}
    ];

    // Navigation Handlers
    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
    // const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1)); // Optional if back button needed

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="min-h-screen bg-white font-sans text-[#1A1A1A]">

            {/* 1. HERO SECTION (From Screenshot 1) */}
            <header className="relative w-full h-[40vh] mt-[88px] min-h-[300px]">
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

            {/* 2. MAIN CONTENT GRID */}
            <main className="bg-[#FAFAFA]">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">

                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 md:gap-0">

                        {/* Left: Page Title */}
                        <h1 className="text-3xl font-serif font-medium text-gray-900 self-start md:self-auto">
                            Booking Room
                        </h1>

                        {/* Right: Stepper Component */}
                        <div
                            className="w-full md:w-auto flex items-center justify-center md:justify-end min-w-[300px] lg:min-w-[400px]">
                            {steps.map((step, index) => {
                                // Determine active state styling
                                const isActive = currentStep >= step.id;
                                const isCurrent = currentStep === step.id;

                                // Colors based on state
                                const borderColor = isActive || isCurrent ? 'border-black' : 'border-gray-200';
                                const textColor = isActive || isCurrent ? 'text-black' : 'text-gray-300';
                                const circleText = isActive || isCurrent ? 'text-black' : 'text-gray-300';
                                const lineColor = isActive && index < steps.length - 1 ? 'bg-black' : 'bg-gray-200';

                                return (
                                    <div key={step.id} className="flex-1 md:flex-none flex items-center relative">

                                        {/* Step Content */}
                                        <div className="flex flex-col items-center relative z-10 mx-2 lg:mx-4">
                                            {/* Circle */}
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg bg-white border ${borderColor} ${circleText} transition-colors duration-300 mb-2`}
                                            >
                                                {step.id}
                                            </div>
                                            {/* Label */}
                                            <span
                                                className={`text-xs md:text-sm font-medium whitespace-nowrap ${textColor}`}>
                                              {step.label}
                                            </span>
                                        </div>

                                        {/* Connecting Line (draw line to the next item) */}
                                        {index !== steps.length - 1 && (
                                            <div
                                                className="flex-grow h-[1px] bg-gray-200 w-12 md:w-20 lg:w-24 mt-[-24px]"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">

                        {/* --- LEFT COLUMN: ROOM SUMMARY CARD --- */}
                        <div className="lg:col-span-4 bg-white p-2">
                            {/*<h2 className="text-2xl font-serif mb-8 text-gray-900">Booking Room</h2>*/}

                            <div
                                className=" rounded-lg overflow-hidden border border-gray-100 shadow-sm sticky top-8">
                                {/* Image */}
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                                        alt="Room"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-serif font-medium text-gray-900 mb-2">Premium
                                        Deluxe</h3>
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


                        {/* --- RIGHT COLUMN: STEPPER FORM --- */}
                        <div className="lg:col-span-8">

                            {/* STEP CONTENT RENDERER */}
                            <div className="bg-white min-h-[400px] p-6">

                                {/* --- STEP 1: PERSONAL DATA --- */}
                                {currentStep === 1 && (
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <Field>
                                                <FieldLabel htmlFor="first-name">
                                                    First Name
                                                </FieldLabel>
                                                <Input
                                                    id="first-name"
                                                    placeholder="First Name"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="last-name">
                                                    Last Name
                                                </FieldLabel>
                                                <Input
                                                    id="last-name"
                                                    placeholder="Last Name"
                                                    required
                                                />
                                            </Field>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 mb-8">
                                            <Field>
                                                <FieldLabel htmlFor="email">
                                                    First Name
                                                </FieldLabel>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    placeholder="Email"
                                                    required
                                                />
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="phone-number">
                                                    First Name
                                                </FieldLabel>
                                                <Input
                                                    id="phone-number"
                                                    placeholder="Phone number"
                                                    type="tel"
                                                    required
                                                />
                                            </Field>
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                onClick={handleNext}
                                                className="bg-[#E5555C] text-white px-10 py-3 rounded-sm hover:bg-[#d4444b] transition-colors shadow-lg shadow-red-100 font-medium"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}


                                {/* --- STEP 2: BOOKING INFO --- */}
                                {currentStep === 2 && (
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                            <Field>
                                                <FieldLabel htmlFor="date">
                                                    Check in
                                                </FieldLabel>
                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            id="date"
                                                            className="w-48 justify-between font-normal"
                                                        >
                                                            {date ? date.toLocaleDateString() : "Select date"}
                                                            <ChevronDownIcon/>
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto overflow-hidden p-0"
                                                                    align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            captionLayout="dropdown"
                                                            onSelect={(date) => {
                                                                setDate(date)
                                                                setOpen(false)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="check-out">
                                                    Check out
                                                </FieldLabel>
                                                <Popover open={open1} onOpenChange={setOpen1}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            id="check-out"
                                                            className="w-48 justify-between font-normal"
                                                        >
                                                            {date1 ? date1.toLocaleDateString() : "Select date"}
                                                            <ChevronDownIcon/>
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto overflow-hidden p-0"
                                                                    align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            captionLayout="dropdown"
                                                            onSelect={(date) => {
                                                                setDate1(date)
                                                                setOpen1(false)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </Field>


                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <Field>
                                                <FieldLabel htmlFor="room">
                                                    Total Room
                                                </FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full" id="room">
                                                        <SelectValue placeholder="Total Room"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">01</SelectItem>
                                                        <SelectItem value="2">02</SelectItem>
                                                        <SelectItem value="3">03</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="guset">
                                                    Total Guest
                                                </FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-full" id="guest">
                                                        <SelectValue placeholder="Total Guest"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">01</SelectItem>
                                                        <SelectItem value="2">02</SelectItem>
                                                        <SelectItem value="3">03</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                        </div>

                                        <div className="mb-8">
                                            <Field>
                                                <FieldLabel htmlFor="referral">
                                                    Code Refferal
                                                </FieldLabel>
                                                <Input placeholder="Your Code Referral" id="referral"/>
                                            </Field>
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                onClick={handleNext}
                                                className="bg-[#E5555C] text-white px-10 py-3 rounded-sm hover:bg-[#d4444b] transition-colors shadow-lg shadow-red-100 font-medium"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}


                                {/* --- STEP 3: SUMMARY --- */}
                                {currentStep === 3 && (
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">

                                        {/* Summary List */}
                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Total Room</span>
                                                <span className="font-medium text-gray-900">1</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Total Guest</span>
                                                <span className="font-medium text-gray-900">2</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Check In</span>
                                                <span className="font-medium text-gray-900">20 May 2023</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Check Out</span>
                                                <span className="font-medium text-gray-900">21 May 2023</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Price</span>
                                                <span className="font-medium text-gray-900">$1200</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500">Discount</span>
                                                <span className="font-medium text-gray-900">-</span>
                                            </div>

                                            <hr className="border-gray-100 my-4"/>

                                            <div className="flex justify-between items-center">
                                                <span className="text-base font-medium text-gray-900">Total Price</span>
                                                <span className="text-xl font-bold text-[#E5555C]">$1200</span>
                                            </div>
                                        </div>

                                        {/* Payment Method Selector */}
                                        <div
                                            className="bg-[#FAFAFA] rounded-md p-4 mb-8 flex items-center justify-between cursor-pointer border border-transparent hover:border-gray-200 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <span
                                                    className="text-sm font-medium text-gray-600">Payment Method :</span>
                                                <div className="flex items-center gap-2">
                                                    {/* Mastercard Icon SVG */}
                                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="12" r="7" fill="#EB001B" fillOpacity="0.8"/>
                                                        <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/>
                                                    </svg>
                                                    <span
                                                        className="text-sm font-medium text-gray-900">Master Card</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400"/>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                className="bg-[#E5555C] text-white px-10 py-3 rounded-sm hover:bg-[#d4444b] transition-colors shadow-lg shadow-red-100 font-medium w-full md:w-auto"
                                            >
                                                Booking Now
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
};

export default BookingPage;