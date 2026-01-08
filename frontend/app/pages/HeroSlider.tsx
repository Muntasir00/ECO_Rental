import React, { useEffect, useState } from 'react';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Welcome to Eco Rentals - Sustainable Living Made Easy",
        subtitle: "At EcoRentals, we believe in a world where sustainability and convenience go hand in hand."
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Reconnect with Nature",
        subtitle: "Escape the city and find peace in our curated selection of eco-friendly retreats."
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        title: "Experience the Outdoors",
        subtitle: "From hiking gear to camping essentials, rent everything you need for your next adventure."
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <img src={slide.image} alt="Hero Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
            ))}

            {/* Text Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-20 pt-16 md:pt-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight drop-shadow-lg max-w-5xl mb-6">
                    {slides[currentSlide].title}
                </h1>
                <p className="text-gray-200 text-sm md:text-lg max-w-2xl leading-relaxed drop-shadow-md">
                    {slides[currentSlide].subtitle}
                </p>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-24 md:bottom-32 left-0 right-0 z-30 flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}