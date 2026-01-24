import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router'; // Works for v6 and v7
import RelatedBlogs from "~/pages/public/blog/RelatedBlogs";
import {DateDisplay} from "~/utils/DateDisplay";
import {Skeleton} from "~/components/ui/skeleton";
import {blog as singleBlog} from "~/pages/public/blog/blogActions"; // Assuming you have an API action
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "~/components/ui/carousel";

// 1. Define Interface
interface images {
    "url": string,
    "publicId": string,
    "_id": string
}

interface BlogPost {
    _id: string;
    title: string;
    content: string;
    images: images[];
    createdAt: string;
    updatedAt: string;
}

const BlogDetail = () => {
    const {id} = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    // 4. Fetch Data
    useEffect(() => {
        const fetchSingleBlog = async () => {
            if (!id) return;

            setIsLoading(true);
            try {
                const response = await singleBlog(id); // Update this URL
                console.log(response);

                setBlog(response);
            } catch (err) {
                console.error(err);
                setError("Failed to load blog details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSingleBlog();
    }, [id]);

    useEffect(() => {
        if (!api) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    // 5. Loading State (Skeleton)
    if (isLoading) {
        return (
            <div className="bg-white min-h-screen py-12 px-4 sm:px-6 font-sans">
                <article className="max-w-7xl mx-auto">
                    {/* Image Skeleton */}
                    <Skeleton className="w-full h-[300px] md:h-[400px] lg:h-[500px] mb-10 rounded-lg"/>

                    {/* Header Skeleton */}
                    <div className="mb-10 space-y-4">
                        <Skeleton className="h-10 md:h-12 w-3/4"/>
                        <Skeleton className="h-10 md:h-12 w-1/2"/>
                        <Skeleton className="h-4 w-32 mt-2"/>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-[90%]"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-[80%]"/>
                    </div>
                </article>
            </div>
        );
    }

    // 6. Error State
    if (error || !blog) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-red-500">
                {error || "Blog not found"}
            </div>
        );
    }

    // 7. Loaded State (Your UI)
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 font-sans">
            <article className="max-w-7xl mx-auto">

                {/* Feature Image */}
                {/*<div*/}
                {/*    className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mb-10 rounded-lg bg-gray-100">*/}
                {/*    <img*/}
                {/*        src={blog.images[0].url}*/}
                {/*        alt={blog.title}*/}
                {/*        className="w-full h-full object-cover"*/}
                {/*    />*/}
                {/*</div>*/}

                <div
                    className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm border bg-muted">
                    {/*{selectedSingleBlog?.imageUrl ? (*/}
                    {blog.images.length > 0 ? (
                        // ১. মাল্টিপল ইমেজ থাকলে ক্যারোসেল দেখাবে
                        <Carousel
                            setApi={setApi}
                            className="w-full h-full"
                            plugins={[
                                Autoplay({
                                    delay: 2000,
                                }),
                            ]}
                        >
                            <CarouselContent className="h-full">
                                {blog.images.map((img, index) => (
                                    <CarouselItem key={index} className="h-full">
                                        <img
                                            src={img.url}
                                            alt={`${blog.title} - ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* নেভিগেশন বাটন (ইমেজের উপরে ভাসমান) */}
                            <CarouselPrevious
                                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"/>
                            <CarouselNext
                                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"/>

                            {/* ডাইনামিক কাউন্টার */}
                            <div
                                className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                                {current} / {count}
                            </div>
                        </Carousel>
                    ) : (
                        // ২. সিঙ্গেল ইমেজ থাকলে সাধারণ img ট্যাগ (পারফরমেন্সের জন্য ভালো)
                        <>
                            <img
                                src={blog.images[0]?.url || "/placeholder.png"}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {/* ইমেজ না থাকলে বা ১টি থাকলে কাউন্টার দেখানোর দরকার নেই, অথবা চাইলে ১/১ দেখাতে পারেন */}
                        </>
                    )}
                </div>


                {/* Header Section */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#191818] leading-tight mb-4">
                        {blog.title}
                    </h1>

                    <DateDisplay
                        value={blog.createdAt}
                        className="text-sm text-gray-500 font-normal"
                    />
                </header>

                {/* Content Body */}
                <div
                    className="text-base md:text-xl text-[#555555] leading-8 md:leading-9 font-medium space-y-8 text-justify md:text-left">
                    {/*
                       NOTE: If your content is plain text (like "joy"), just render it.
                       If your content is HTML (from a rich text editor), use dangerouslySetInnerHTML:
                       <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    */}
                    <p>{blog.content}</p>
                </div>

            </article>

            {/* Pass current ID to exclude it from related list if needed */}
            <RelatedBlogs/>

        </div>
    );
};

export default BlogDetail;