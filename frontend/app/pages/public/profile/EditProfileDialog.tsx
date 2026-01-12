import React, {useState, useRef, use} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Loader2, Upload, Camera, X, FileText} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogDescription
} from "~/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";

import {useAuthContext} from "~/auth/hooks";
import {toast} from "sonner";
import {profileUpdate} from "~/pages/public/profile/profileActions";

const profileSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    emergencyContact: z.string().optional(),
    identityType: z.enum(["NID", "PASSPORT"], {
        message: "Please select a valid identity type",
    }),
    profileImage: z.any().optional(),
    identityFile: z.any().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function EditProfileDialog({triggerButton}: { triggerButton?: React.ReactNode }) {
    const {user, checkUserSession} = useAuthContext();
    const [open, setOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(user?.profileImage || null);
    const [identityPreview, setIdentityPreview] = useState<string | null>(
        user?.identityFile || null
    );

    const profileImageInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: user?.fullName || "",
            phoneNumber: user?.phoneNumber || "",
            address: user?.address || "",
            emergencyContact: user?.emergencyContact || "",
            identityType: user?.identityType || "NID", // Default value
            profileImage: user?.profileImage || undefined, // ফাইলের ডিফল্ট ভ্যালু আনডিফাইন্ড রাখা ভালো
            identityFile: user?.identityFile || undefined,
        },
    });

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("profileImage", file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleIdentityFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("identityFile", file);
            setPreviewImage(URL.createObjectURL(file));
            setIdentityPreview(URL.createObjectURL(file));
        }
    };

    const removeIdentityFile = () => {
        setIdentityPreview(null);
        form.setValue("identityFile", undefined); // ফর্ম থেকেও ফেলে দেওয়া হলো
    };

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            const formData = new FormData();

            formData.append("fullName", data.fullName);
            formData.append("phoneNumber", data.phoneNumber);
            formData.append("address", data.address);
            formData.append("emergencyContact", data.emergencyContact || "");
            formData.append("identityType", data.identityType);

            if (data.profileImage instanceof File) {
                formData.append("profileImage", data.profileImage);
            }

            if (data.identityFile instanceof File) {
                formData.append("identityFile", data.identityFile);
            }

            // API Call
            const res = await profileUpdate(formData);

            toast.success("Profile updated successfully.");

            if (checkUserSession) {
                await checkUserSession();
            }
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerButton || <Button variant="outline">Edit Profile</Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your personal information and documents.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">

                        {/* --- Profile Image Upload Section --- */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer"
                                 onClick={() => profileImageInputRef.current?.click()}>
                                <Avatar className="w-24 h-24 border-2 border-gray-100">
                                    <AvatarImage src={previewImage || ""} className="object-cover"/>
                                    <AvatarFallback className="text-2xl">
                                        {user?.fullName?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Hover Overlay Icon */}
                                <div
                                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="text-white w-8 h-8"/>
                                </div>
                            </div>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={profileImageInputRef}
                                className="hidden"
                                onChange={handleProfileImageChange}
                            />
                            <p className="text-xs text-gray-500">Click image to change profile photo</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Phone Number */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="017..." {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Address */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dhaka, Bangladesh" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Emergency Contact */}
                            <FormField
                                control={form.control}
                                name="emergencyContact"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Emergency Contact</FormLabel>
                                        <FormControl>
                                            <Input placeholder="017..." {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Identity Type */}
                            <FormField
                                control={form.control}
                                name="identityType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Identity Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select identity type"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="NID">NID</SelectItem>
                                                <SelectItem value="PASSPORT">Passport</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* --- Identity File Upload --- */}
                        <FormItem>
                            <FormLabel>Identity Document (File)</FormLabel>
                            {identityPreview ? (
                                <div
                                    className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group bg-gray-50 flex items-center justify-center">

                                    {/* --- Remove Button (Top Right) --- */}
                                    <button
                                        type="button"
                                        onClick={removeIdentityFile}
                                        className="cursor-pointer absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors z-10"
                                    >
                                        <X className="w-4 h-4"/>
                                    </button>

                                    {identityPreview.toLowerCase().endsWith(".pdf") ||
                                    form.watch("identityFile")?.type === "application/pdf" ? (
                                        // PDF View
                                        <div className="flex flex-col items-center text-gray-500">
                                            <FileText className="w-12 h-12 mb-2 text-red-400"/>
                                            <span className="text-sm font-medium">Document Selected</span>
                                            <span className="text-xs text-gray-400 max-w-[200px] truncate px-2">
                                                {form.watch("identityFile")?.name || "Existing PDF Document"}
                                            </span>
                                        </div>
                                    ) : (
                                        // Image Preview
                                        <img
                                            src={identityPreview}
                                            alt="Identity Preview"
                                            className="w-full h-full object-contain p-2"
                                        />
                                    )}

                                    {/* --- Change Button Overlay --- */}
                                    <div
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            className="cursor-pointer bg-white text-black px-4 py-2 rounded-full text-xs font-medium"
                                            onClick={() => {
                                                setIdentityPreview(null);
                                            }}
                                        >
                                            Change File
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative h-48">
                                    <Input
                                        type="file"
                                        accept=".pdf,.jpg,.png,.jpeg"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        onChange={handleIdentityFileChange}
                                    />
                                    <Upload className="w-8 h-8 text-gray-400 mb-2"/>
                                    <span className="text-sm text-gray-600 font-medium">
                                        Click to upload identity file
                                    </span>
                                    <span className="text-xs text-gray-400 mt-1">
                                        PDF, JPG or PNG (Max 5MB)
                                    </span>
                                </div>
                            )}
                            <FormMessage/>
                        </FormItem>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-[#E5555C] hover:bg-[#d4444b] text-white"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}