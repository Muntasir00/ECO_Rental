import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router'; // or 'react-router-dom'
import { BadgeCheck, Bell, LogOut, Menu, User as UserIcon } from 'lucide-react';

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '~/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

// Auth & Routing
import { signOut } from 'app/auth/context/action';
import { useRouter } from 'app/routes/hooks';
import { paths } from 'app/routes/paths';
import { useAuthContext } from 'app/auth/hooks';
import { profiles } from '~/pages/public/profile/profileActions';
import type { ProfileApiResponse } from '~/auth/types';
import Logo from 'public/image/logo.png';

const Navbar = () => {
  const router = useRouter();
  const { authenticated, loading: authLoading, user } = useAuthContext();

  // State
  const [profileData, setProfileData] = useState<ProfileApiResponse | null>(
    null
  );
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact us', href: '/contact-us' },
  ];

  // 1. Professional Fetch Logic
  const fetchProfile = useCallback(async () => {
    if (!authenticated) return;

    setIsProfileLoading(true);
    try {
      // Explicitly typing the response
      const res = (await profiles()) as ProfileApiResponse;
      setProfileData(res);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    } finally {
      setIsProfileLoading(false);
    }
  }, [authenticated]);

  // 2. Effect with cleanup protection
  useEffect(() => {
    let isMounted = true;
    if (authenticated) {
      fetchProfile();
    }
    return () => {
      isMounted = false;
    };
  }, [authenticated, fetchProfile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = paths.auth.jwt.signIn;
    } catch (err) {
      console.error('Sign out failed', err);
      window.location.href = paths.auth.jwt.signIn;
    }
  };

  // 3. Helper variables for UI Display (Fallback logic)
  // Priority: Profile API > Auth Context > Fallback
  const displayName =
    profileData?.profile?.fullName ||
    profileData?.user?.username ||
    user?.username ||
    'User';
  const displayEmail = profileData?.user?.email || user?.email;
  const displayImage =
    profileData?.profile?.profileImage || 'https://github.com/shadcn.png';

  // Get Initials for Avatar Fallback
  const getInitials = (name: string) =>
    name?.substring(0, 2).toUpperCase() || 'UN';

  return (
    <nav className='w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* =======================
                        1. LOGO SECTION
                    ======================== */}
          <div
            className='flex-shrink-0 flex items-center gap-2 cursor-pointer'
            onClick={() => router.push('/')}
          >
            <div className='w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center'>
              <img src={Logo} />
            </div>
          </div>
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className='text-gray-600 hover:text-[#B83E25] font-medium transition-colors text-sm lg:text-base'
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className='hidden md:flex items-center gap-4'>
            {authLoading ? (
              <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse' />
            ) : authenticated ? (
              <div className='flex gap-3 items-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='cursor-pointer outline-none'>
                    <Avatar className='h-9 w-9 border border-gray-200 transition-transform hover:scale-105'>
                      <AvatarImage
                        src={displayImage}
                        alt={displayName}
                        className='object-cover'
                      />
                      <AvatarFallback className='bg-red-50 text-[#B83E25]'>
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className='w-56 rounded-xl shadow-lg border-gray-100 p-2'
                    align='end'
                    sideOffset={8}
                  >
                    <DropdownMenuLabel className='p-2 font-normal'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='h-9 w-9'>
                          <AvatarImage
                            src={displayImage}
                            alt={displayName}
                            className='object-cover'
                          />
                          <AvatarFallback>
                            {getInitials(displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col space-y-0.5 overflow-hidden'>
                          <span className='text-sm font-semibold truncate text-gray-900'>
                            {displayName}
                          </span>
                          <span className='text-xs text-gray-500 truncate'>
                            {displayEmail}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className='bg-gray-100 my-1' />

                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => router.push('/account')}
                        className='cursor-pointer rounded-lg hover:bg-red-50 hover:text-[#B83E25] focus:bg-red-50 focus:text-[#B83E25]'
                      >
                        <BadgeCheck className='mr-2 h-4 w-4' />
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push('/profile')}
                        className='cursor-pointer rounded-lg hover:bg-red-50 hover:text-[#B83E25] focus:bg-red-50 focus:text-[#B83E25]'
                      >
                        <UserIcon className='mr-2 h-4 w-4' />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push('/user-booking')}
                        className='cursor-pointer rounded-lg hover:bg-red-50 hover:text-[#B83E25] focus:bg-red-50 focus:text-[#B83E25]'
                      >
                        <Bell className='mr-2 h-4 w-4' />
                        Bookings
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className='bg-gray-100 my-1' />

                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className='cursor-pointer text-red-600 rounded-lg hover:bg-red-50 focus:bg-red-50'
                    >
                      <LogOut className='mr-2 h-4 w-4' />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button
                  variant='outline'
                  onClick={() => router.push(paths.auth.jwt.signUp)}
                  className='border-[#B83E25] text-[#B83E25] hover:bg-red-50 hover:text-[#B83E25] rounded-full px-6 font-medium transition-all'
                >
                  Sign up
                </Button>
                <Button
                  onClick={() => router.push(paths.auth.jwt.signIn)}
                  className='bg-[#B83E25] hover:bg-[#d4444b] text-white rounded-full px-6 font-medium shadow-md shadow-red-100 transition-all'
                >
                  Sign in
                </Button>
              </>
            )}
          </div>

          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-gray-600 hover:text-[#B83E25]'
                >
                  <Menu className='h-6 w-6' />
                </Button>
              </SheetTrigger>

              <SheetContent
                side='right'
                className='w-[300px] sm:w-[350px] bg-white border-l border-gray-100 flex flex-col h-full'
              >
                <div className='flex flex-col items-center mt-6 mb-8'>
                  <div className='w-16 h-16'>
                    <img src={Logo} className='' />
                  </div>
                </div>

                {/* Mobile Links */}
                <div className='flex flex-col gap-4 items-center flex-1'>
                  {navLinks.map(link => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        to={link.href}
                        className='text-lg font-medium text-gray-700 hover:text-[#B83E25] transition-colors py-2'
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className='flex flex-col gap-4 mt-auto mb-6 px-4'>
                  {authLoading ? null : authenticated ? (
                    <div className='flex flex-col gap-4 items-center w-full'>
                      <div className='flex items-center gap-3 w-full bg-gray-50 p-3 rounded-lg'>
                        <Avatar className='h-10 w-10'>
                          <AvatarImage
                            src={displayImage}
                            className='object-cover'
                          />
                          <AvatarFallback>
                            {getInitials(displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='font-medium text-sm'>
                            {displayName}
                          </span>
                          <span className='text-xs text-gray-500'>
                            {displayEmail}
                          </span>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-2 w-full'>
                        <Button
                          variant='outline'
                          onClick={() => {
                            router.push('/profile');
                            setIsOpen(false);
                          }}
                          className='w-full text-xs'
                        >
                          Profile
                        </Button>
                        <Button
                          variant='outline'
                          onClick={() => {
                            router.push('/user-booking');
                            setIsOpen(false);
                          }}
                          className='w-full text-xs'
                        >
                          Bookings
                        </Button>
                      </div>

                      <Button
                        className='w-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
                        variant='ghost'
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button
                          variant='outline'
                          onClick={() => router.push(paths.auth.jwt.signUp)}
                          className='w-full border-[#B83E25] text-[#B83E25] hover:bg-red-50 hover:text-[#B83E25] rounded-full h-11'
                        >
                          Sign up
                        </Button>
                      </SheetClose>

                      <SheetClose asChild>
                        <Button
                          onClick={() => router.push(paths.auth.jwt.signIn)}
                          className='w-full bg-[#B83E25] hover:bg-[#d4444b] text-white rounded-full h-11 shadow-md shadow-red-100'
                        >
                          Sign in
                        </Button>
                      </SheetClose>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
