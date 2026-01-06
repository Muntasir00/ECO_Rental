import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";

// --- Validation Schema ---
const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

const ContactForm = () => {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            message: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values:any) {
        // Do something with the form values.
        console.log(values);
        alert("Message Sent! (Check console for data)");
    }

    // Common styles for the semi-transparent inputs
    const inputStyles = "bg-white/20 border-transparent text-white placeholder:text-white/70 focus-visible:ring-white/50 focus-visible:bg-white/30 transition-all duration-200";

    return (
        <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">

            {/* Red Container */}
            <div className="max-w-7xl mx-auto bg-[#E14453] rounded-lg shadow-lg overflow-hidden py-16 px-6 md:px-20">

                {/* Header Content */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-medium text-[#fafafa] mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-[#fafafa] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                        Please complete the following information and a member of our Customer Service Team will contact you
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white pl-1">
                                Full Name
                            </label>
                            <Input
                                placeholder="Enter your name"
                                {...form.register("fullName")}
                            />
                            {form.formState.errors.fullName && (
                                <p className="text-xs text-white/80 pl-1">{form.formState.errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white pl-1">
                                Email
                            </label>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                {...form.register("email")}
                            />
                            {form.formState.errors.email && (
                                <p className="text-xs text-white/80 pl-1">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white pl-1">
                            Message
                        </label>
                        <Textarea
                            placeholder="Enter your message"
                            {...form.register("message")}
                        />
                        {form.formState.errors.message && (
                            <p className="text-xs text-white/80 pl-1">{form.formState.errors.message.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8 flex justify-center">
                        <button
                            type="submit"
                            className="bg-white text-[#E5555C] hover:bg-gray-50 font-medium py-3 px-16 rounded-sm shadow-md transition-colors w-full md:w-auto text-center"
                        >
                            Send
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default ContactForm;