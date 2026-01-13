import React from 'react';
import { Link } from 'react-router'; // or your router
import { useAuthContext } from '~/auth/hooks';
import { Skeleton } from '~/components/ui/skeleton';
import { EditProfileDialog } from '~/pages/public/profile/EditProfileDialog';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Edit } from 'lucide-react';
// ইমপোর্ট করুন আমাদের বানানো ডায়ালগটি

const PersonalInfoPage = () => {
  const { user, loading } = useAuthContext();

  // 1. Data Mapping
  const infoFields = [
    {
      id: 'fullName',
      label: 'Legal Name',
      value: user?.fullName || user?.username || 'Not provided',
      isEditable: true,
    },
    {
      id: 'email',
      label: 'Email address',
      value: user?.email,
      isEditable: false, // ইমেইল সাধারণত এডিট করতে দেওয়া হয় না
    },
    {
      id: 'phoneNumber',
      label: 'Phone numbers',
      value: user?.phoneNumber || 'Add a number',
      isEditable: true,
    },
    {
      id: 'address',
      label: 'Address',
      value: user?.address || 'Add an address',
      isEditable: true,
    },
    {
      id: 'emergencyContact',
      label: 'Emergency contact',
      value: user?.emergencyContact || 'Add contact',
      isEditable: true,
    },
  ];

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto py-12 px-6'>
        <div className='space-y-4'>
          <Skeleton className='h-12 w-1/3' />
          <Skeleton className='h-[400px] w-full' />
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8'>
          <div>
            <h1 className='text-3xl md:text-4xl font-serif font-medium mb-2 text-[#191818]'>
              Personal Info
            </h1>
            <p className='text-[#7a7a7a] font-light'>
              Manage your personal details.
            </p>
          </div>

          {/* Main Edit Button (Optional) */}
          <EditProfileDialog
            triggerButton={
              <button className='flex items-center gap-1 cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium transition'>
                <Edit />
                Edit All Details
              </button>
            }
          />
        </div>

        <hr className='border-gray-200 mb-10' />

        {/* Info List */}
        <div className='flex flex-col gap-6'>
          {infoFields.map(item => (
            <div
              key={item.id}
              className='bg-white flex justify-between items-start md:items-center py-5 px-4 border-b border-gray-100 last:border-0 rounded-sm shadow-sm'
            >
              <div className='flex flex-col gap-1'>
                <h3 className='text-lg font-serif font-bold text-[#1A1A1A]'>
                  {item.label}
                </h3>
                <p className='text-sm text-gray-500 font-light'>{item.value}</p>
              </div>

              <div>
                {item.isEditable ? (
                  // আমরা একই ডায়ালগ রিইউজ করছি
                  <EditProfileDialog
                    triggerButton={
                      <button className='text-[#1A1A1A] text-sm font-medium underline underline-offset-4 decoration-1 hover:text-[#B83E25] hover:decoration-[#B83E25] transition-all'>
                        Edit
                      </button>
                    }
                  />
                ) : (
                  <span className='text-gray-400 text-sm cursor-not-allowed'>
                    Locked
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Identity Verification (Special Case) */}
          <div className='bg-white flex justify-between items-center py-5 px-4 border-b border-gray-100 rounded-sm shadow-sm'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-lg font-serif font-bold text-[#1A1A1A]'>
                Identity Verification
              </h3>
              <p className='text-sm text-gray-500 font-light'>
                {user?.isVerified ? 'Identity verified' : 'Not verified yet'}
              </p>
            </div>

            <div>
              {user?.isVerified ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className='cursor-pointer text-[#1A1A1A] text-sm font-medium underline hover:text-[#B83E25] outline-none'>
                      View
                    </button>
                  </DialogTrigger>

                  {/* Image Modal Content */}
                  <DialogContent className='sm:max-w-[600px] p-6'>
                    <DialogHeader>
                      <DialogTitle>Identity Document</DialogTitle>
                    </DialogHeader>

                    <div className='mt-4 flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-100'>
                      {user?.identityFile ? (
                        <img
                          src={user.identityFile}
                          alt='Identity Proof'
                          className='max-h-[60vh] w-auto object-contain rounded-md shadow-sm'
                        />
                      ) : (
                        <p className='text-sm text-gray-500 py-10'>
                          No document image found.
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <EditProfileDialog
                  triggerButton={
                    <button className='cursor-pointer text-[#1A1A1A] text-sm font-medium underline hover:text-[#B83E25]'>
                      Start Verification
                    </button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;

// import React from 'react';
// import { Link } from "react-router";
// import { useAuthContext } from "~/auth/hooks";
// import { Skeleton } from "~/components/ui/skeleton"; // Ensure this path is correct
//
// const PersonalInfoPage = () => {
//     const { user, loading } = useAuthContext();
//
//     // 1. Dynamic Data Mapping
//     // লোডিং ফলস হলে রিয়েল ডাটা দেখাবে, না থাকলে ডিফল্ট টেক্সট
//     const infoFields = [
//         {
//             id: 'fullName',
//             label: "Legal Name",
//             value: user?.fullName || user?.username || "Not provided",
//             action: "Edit"
//         },
//         {
//             id: 'email',
//             label: "Email address",
//             value: user?.email || "Not provided",
//             action: "Edit"
//         },
//         {
//             id: 'phone',
//             label: "Phone numbers",
//             value: user?.phoneNumber || "Add a number",
//             action: "Edit"
//         },
//         {
//             id: 'identity',
//             label: "Identity verification",
//             // চেক করা হচ্ছে ইউজার ভেরিফাইড কিনা
//             value: user?.isVerified ? "Identity Verified" : "Not verified yet",
//             action: user?.isVerified ? "View" : "Start"
//         },
//         {
//             id: 'address',
//             label: "Address",
//             value: user?.address || "Add an address",
//             action: "Edit"
//         },
//         {
//             id: 'emergency',
//             label: "Emergency contact",
//             value: user?.emergencyContact || "Add contact",
//             action: "Edit"
//         }
//     ];
//
//     // 2. Loading State (Skeleton)
//     if (loading) {
//         return (
//             <div className="bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-sans">
//                 <div className="max-w-7xl mx-auto">
//                     {/* Header Skeleton */}
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
//                         <div className="space-y-3">
//                             <Skeleton className="h-10 w-64 rounded-md" /> {/* Title */}
//                             <Skeleton className="h-5 w-48 rounded-md" />  {/* Subtitle */}
//                         </div>
//                         <Skeleton className="h-10 w-32 rounded-sm" />     {/* Button */}
//                     </div>
//
//                     <hr className="border-gray-200 mb-10" />
//
//                     {/* List Items Skeleton - 6 items loop */}
//                     <div className="flex flex-col gap-6">
//                         {[...Array(6)].map((_, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white flex justify-between items-center py-4 px-3 border-b border-gray-100"
//                             >
//                                 <div className="flex flex-col gap-2">
//                                     <Skeleton className="h-6 w-40 rounded-md" /> {/* Label */}
//                                     <Skeleton className="h-4 w-56 rounded-md" /> {/* Value */}
//                                 </div>
//                                 <div>
//                                     <Skeleton className="h-5 w-12 rounded-md" /> {/* Action Link */}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//
//     // 3. Real UI Render
//     return (
//         <div className="bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
//             <div className="max-w-7xl mx-auto">
//
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
//                     <div>
//                         <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2 text-[#191818]">
//                             Personal Info
//                         </h1>
//                         <p className="text-[#7a7a7a] font-light">
//                             Welcome {user?.fullName || user?.username}
//                         </p>
//                     </div>
//
//                     <Link to="/profile">
//                         <button
//                             className="cursor-pointer border border-[#B83E25] text-[#B83E25] hover:bg-red-50 px-8 py-2.5 rounded-sm font-medium transition-colors text-sm">
//                             Go to Profile
//                         </button>
//                     </Link>
//                 </div>
//
//                 {/* Divider Line */}
//                 <hr className="border-gray-200 mb-10" />
//
//                 <div className="flex flex-col gap-6">
//                     {infoFields.map((item) => (
//                         <div
//                             key={item.id}
//                             className="bg-white flex justify-between items-start md:items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-3 rounded-sm"
//                         >
//                             {/* Left Side: Label & Value */}
//                             <div className="flex flex-col gap-1">
//                                 <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
//                                     {item.label}
//                                 </h3>
//                                 <p className="text-sm text-gray-500 font-light">
//                                     {item.value}
//                                 </p>
//                             </div>
//
//                             {/* Right Side: Action Link */}
//                             <div>
//                                 <button
//                                     className="cursor-pointer text-[#1A1A1A] text-sm font-medium underline underline-offset-4 decoration-1 hover:text-[#B83E25] hover:decoration-[#B83E25] transition-all">
//                                     {item.action}
//                                 </button>
//                             </div>
//
//                         </div>
//                     ))}
//                 </div>
//
//             </div>
//         </div>
//     );
// };
//
// export default PersonalInfoPage;
