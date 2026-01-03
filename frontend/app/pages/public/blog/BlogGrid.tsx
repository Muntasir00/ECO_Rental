import React from 'react';

// Mock data to replicate the exact content from the image
const blogPosts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Bathtub/Minimal Room
        title: "New facilities : Large golf course at the Zerra hotel",
        date: "25 May 2023"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1628120568237-995c54c75481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Twisted Architecture
        title: "Coming soon! a posh supermarket near the hotel",
        date: "12 May 2023"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern Lobby
        title: "Webinar event Mental training for young people to develop",
        date: "15 Apr 2023"
    },
    // Repeating the data to create the second row as shown in the screenshot
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "New facilities : Large golf course at the Zerra hotel",
        date: "25 May 2023"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1628120568237-995c54c75481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Coming soon! a posh supermarket near the hotel",
        date: "12 May 2023"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        title: "Webinar event Mental training for young people to develop",
        date: "15 Apr 2023"
    }
];

const BlogGrid = () => {
    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">

                    {blogPosts.map((post) => (
                        <article key={post.id} className="group cursor-pointer flex flex-col h-full">

                            {/* Image Container */}
                            <div className="overflow-hidden w-full h-64 mb-6 relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] leading-snug mb-4 group-hover:text-gray-600 transition-colors">
                                    {post.title}
                                </h3>

                                <time className="text-gray-500 text-sm font-normal mt-auto">
                                    {post.date}
                                </time>
                            </div>

                        </article>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default BlogGrid;