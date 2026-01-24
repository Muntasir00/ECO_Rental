import React, {useEffect, useState} from 'react';
import {Link} from "react-router";
import {blogs} from "~/pages/public/blog/blogActions";
import {DateDisplay} from "~/utils/DateDisplay";
import {Skeleton} from "~/components/ui/skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";

// 2. Update Interface to match your API response
interface images {
    "url": string,
    "publicId": string,
    "_id": string
}

interface BlogPost {
    _id: string;
    title: string;
    images: images[];
    createdAt: string;
}

interface BlogResponse {
    blogs: BlogPost[];
    total: number;
    page: number;
    totalPages: number;
}

const BlogGrid = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 3. Add Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // 4. Update fetch function to accept page number
    async function fetchBlogPosts(page = 1) {
        setIsLoading(true);
        try {
            // NOTE: You need to ensure your `blogs()` action accepts a page parameter
            // e.g., blogs(page) or blogs({ page })
            const response: BlogResponse = await blogs(page);

            setBlogPosts(response.blogs || []);
            setCurrentPage(response.page);
            setTotalPages(response.totalPages);

            // Optional: Scroll to top when page changes
            window.scrollTo({top: 0, behavior: 'smooth'});
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    // Initial load
    useEffect(() => {
        fetchBlogPosts(1);
    }, []);

    // 5. Helper handler for page changes
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            fetchBlogPosts(page);
        }
    };

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col min-h-[80vh]">

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-12">
                    {isLoading ? (
                        Array.from({length: 6}).map((_, index) => (
                            <div key={index} className="flex flex-col h-full">
                                <Skeleton className="w-full h-64 mb-6 rounded-md"/>
                                <div className="flex flex-col flex-grow gap-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-7 w-full"/>
                                        <Skeleton className="h-7 w-2/3"/>
                                    </div>
                                    <Skeleton className="h-4 w-24 mt-auto"/>
                                </div>
                            </div>
                        ))
                    ) : (
                        blogPosts.length > 0 && blogPosts.map((post) => (
                            <article key={post._id} className="group cursor-pointer flex flex-col h-full">
                                <Link to={`/blog/${post._id}`} className="flex flex-col h-full">
                                    <div className="overflow-hidden w-full h-64 mb-6 relative rounded-md bg-gray-100">
                                        <img
                                            src={post.images[0].url}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xl md:text-2xl font-serif text-[#1A1A1A] leading-snug mb-4 group-hover:text-gray-600 transition-colors">
                                            {
                                                post.title.length > 25
                                                    ? `${post.title.substring(0, 25)}...`
                                                    : post.title
                                            }
                                        </h3>
                                        <DateDisplay
                                            value={post.createdAt}
                                            className="text-gray-500 text-sm font-normal mt-auto"
                                        />
                                    </div>
                                </Link>
                            </article>
                        ))
                    )}
                </div>

                {/* -------------------------------------------------------- */}
                {/* 6. PAGINATION UI                                         */}
                {/* -------------------------------------------------------- */}
                {!isLoading && totalPages > 1 && (
                    <div className="mt-auto pt-8 border-t border-gray-100">
                        <Pagination>
                            <PaginationContent>

                                {/* Previous Button */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage - 1);
                                        }}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {/* Page Numbers Loop */}
                                {Array.from({length: totalPages}).map((_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <PaginationItem key={pageNum}>
                                            <PaginationLink
                                                href="#"
                                                isActive={pageNum === currentPage}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    handlePageChange(pageNum);
                                                }}
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                {/* Next Button */}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(currentPage + 1);
                                        }}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                            </PaginationContent>
                        </Pagination>
                    </div>
                )}

            </div>
        </div>
    );
};

export default BlogGrid;