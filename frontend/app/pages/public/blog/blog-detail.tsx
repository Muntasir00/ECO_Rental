import React from 'react';
import RelatedBlogs from "~/pages/public/blog/RelatedBlogs";

const BlogDetail = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 font-sans">
            <article className="max-w-7xl mx-auto">

                {/* 1. Feature Image */}
                <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mb-10">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                        alt="Modern Interior Hallway"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 2. Header Section */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#191818] leading-tight mb-4">
                        Webinar event Mental training for young people to develop
                    </h1>
                    <time className="text-sm text-gray-500 font-normal">
                        15 Apr 2023
                    </time>
                </header>

                {/* 3. Content Body */}
                <div
                    className="text-base md:text-xl text-[#555555] leading-8 md:leading-9 font-medium space-y-8 text-justify md:text-left">

                    <p>
                        Lorem ipsum dolor sit amet consectetur. Nascetur mauris orci cursus mattis dui mauris. Mi
                        elementum enim elementum a vel sit mauris hac eu. Amet in interdum felis ut diam orci. Commodo
                        netus sed quis augue egestas senectus nunc. Fermentum id consequat commodo molestie amet sed.
                        Suspendisse vulputate nulla ultricies pharetra adipiscing. Imperdiet sed imperdiet at rhoncus
                        iaculis elit. Egestas ac ac euismod faucibus viverra phasellus id. Malesuada gravida sed magna
                        habitasse viverra. Luctus consectetur vitae risus vestibulum vel imperdiet orci mi commodo. Dui
                        interdum massa sit convallis a. Est magna risus eget eu condimentum fermentum. Venenatis magna
                        neque non magna posuere. Facilisi aliquet morbi scelerisque ullamcorper purus aliquam. Vel ut
                        integer ultrices imperdiet felis facilisi at massa.
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet consectetur. Nascetur mauris orci cursus mattis dui mauris. Mi
                        elementum enim elementum a vel sit mauris hac eu. Amet in interdum felis ut diam orci. Commodo
                        netus sed quis augue egestas senectus nunc. Fermentum id consequat commodo molestie amet sed.
                        Suspendisse vulputate nulla ultricies pharetra adipiscing. Imperdiet sed imperdiet at rhoncus
                        iaculis elit. Egestas ac ac euismod faucibus viverra phasellus id. Malesuada gravida sed magna
                        habitasse viverra. Luctus consectetur vitae risus vestibulum vel imperdiet orci mi commodo. Dui
                        interdum massa sit convallis a. Est magna risus eget eu condimentum fermentum. Venenatis magna
                        neque non magna posuere. Facilisi aliquet morbi scelerisque ullamcorper purus aliquam. Vel ut
                        integer ultrices imperdiet felis facilisi at massa.
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet consectetur. Nascetur mauris orci cursus mattis dui mauris. Mi
                        elementum enim elementum a vel sit mauris hac eu. Amet in interdum felis ut diam orci. Commodo
                        netus sed quis augue egestas senectus nunc. Fermentum id consequat commodo molestie amet sed.
                        Suspendisse vulputate nulla ultricies pharetra adipiscing. Imperdiet sed imperdiet at rhoncus
                        iaculis elit. Egestas ac ac euismod faucibus viverra phasellus id. Malesuada gravida sed magna
                        habitasse viverra. Luctus consectetur vitae risus vestibulum vel imperdiet orci mi commodo. Dui
                        interdum massa sit convallis a. Est magna risus eget eu condimentum fermentum. Venenatis magna
                        neque non magna posuere. Facilisi aliquet morbi scelerisque ullamcorper purus aliquam. Vel ut
                        integer ultrices imperdiet felis facilisi at massa.
                    </p>

                </div>

            </article>

            <RelatedBlogs/>

        </div>
    );
};

export default BlogDetail;