import {Avatar, AvatarFallback, AvatarImage} from '~/components/ui/avatar';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '~/components/ui/menubar';

import {Menu, X} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "~/components/ui/sheet";

import {signOut} from 'app/auth/context/action';
import {useRouter} from 'app/routes/hooks';
import {paths} from 'app/routes/paths';
import {useAuthContext} from 'app/auth/hooks';
import {Button} from "~/components/ui/button";
import {useState} from "react";
import {Link} from "react-router";

const Navbar = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {name: "Home", href: "/"},
        {name: "About", href: "/about-us"},
        {name: "Blogs", href: "/blogs"},
        {name: "Contact us", href: "/contact-us"},
    ];

    const {authenticated, loading} = useAuthContext();

    const {user = null} = useAuthContext();
    console.log(user);

    const handleSignOut = async () => {
        try {
            await signOut();
            // full page redirect to avoid SSR/routing races
            window.location.href = paths.auth.jwt.signIn;
        } catch (err) {
            console.error('Sign out failed', err);
            window.location.href = paths.auth.jwt.signIn;
        }
    };

    return (
        <>
            <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* =======================
              1. LOGO SECTION
          ======================== */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            {/* Logo Icon (SVG Replica) */}
                            <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                                     className="w-full h-full text-[#E5555C]">
                                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M50 20L75 80H25L50 20Z" fill="currentColor" opacity="0.2"/>
                                    <path d="M50 25L70 75H30L50 25Z" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M20 60 Q 50 80 80 60" stroke="currentColor" strokeWidth="2" fill="none"/>
                                </svg>
                            </div>

                            {/* Logo Text */}
                            <div className="flex-col items-start justify-center hidden md:flex">
                  <span
                      className="text-[#E5555C] font-serif text-lg md:text-sm lg:text-xl font-bold leading-none tracking-wide">
                    LAND OF NOMADS
                  </span>
                                <span
                                    className="text-[#E5555C] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] mt-1 w-full text-center">
                  ECO RENTALS
                </span>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-600 hover:text-[#E5555C] font-medium transition-colors text-sm lg:text-base"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            {loading ? null : authenticated ? (
                                    <div className='flex gap-3 items-center'>
                                        <Menubar>
                                            <MenubarMenu>
                                                <MenubarTrigger>
                                                    <img src='/image/menu.svg' alt=''/>
                                                </MenubarTrigger>
                                                <MenubarContent>
                                                    <MenubarItem>
                                                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                                    </MenubarItem>
                                                    <MenubarItem>New Window</MenubarItem>
                                                    <MenubarSeparator/>
                                                    <MenubarItem>Share</MenubarItem>
                                                    <MenubarSeparator/>
                                                    <MenubarItem onClick={handleSignOut}>Logout</MenubarItem>
                                                </MenubarContent>
                                            </MenubarMenu>
                                        </Menubar>

                                        <Avatar>
                                            <AvatarImage
                                                src='https://github.com/shadcn.png'
                                                alt='User'
                                                className='w-12'
                                            />
                                            <AvatarFallback>ACC</AvatarFallback>
                                        </Avatar>

                                        <p>{user?.username}</p>
                                    </div>
                                )
                                :
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(paths.auth.jwt.signUp)}
                                        className="border-[#E5555C] text-[#E5555C] hover:bg-red-50 hover:text-[#E5555C] rounded-full px-6 font-medium"
                                    >
                                        Sign up
                                    </Button>

                                    <Button
                                        onClick={() => router.push(paths.auth.jwt.signIn)}
                                        className="bg-[#E5555C] hover:bg-[#d4444b] text-white rounded-full px-6 font-medium shadow-md shadow-red-100"
                                    >
                                        Sign in
                                    </Button>
                                </>
                            }

                        </div>

                        {/* =======================
              4. MOBILE MENU (Sheet)
          ======================== */}
                        <div className="md:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#E5555C]">
                                        <Menu className="h-6 w-6"/>
                                    </Button>
                                </SheetTrigger>

                                <SheetContent side="right"
                                              className="w-[300px] sm:w-[350px] bg-white border-l border-gray-100">

                                    {/* Mobile Header (Logo) */}
                                    <div className="flex flex-col items-center mt-6 mb-10">
                                       <span className="text-[#E5555C] font-serif text-xl font-bold tracking-wide">
                                        LAND OF NOMADS
                                      </span>
                                        <span className="text-[#E5555C] text-[10px] uppercase tracking-[0.3em]">
                                        ECO RENTALS
                                      </span>
                                    </div>

                                    {/* Mobile Links */}
                                    <div className="flex flex-col gap-6 items-center">
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.name}>
                                                <a
                                                    href={link.href}
                                                    className="text-lg font-medium text-gray-700 hover:text-[#E5555C] transition-colors"
                                                >
                                                    {link.name}
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </div>

                                    {/* Mobile Buttons */}
                                    <div className="flex flex-col gap-4 mt-10 px-6">

                                        {loading ? null : authenticated ? (
                                                <div className='flex gap-3 flex-col items-center'>
                                                    <p>{user?.username}</p>
                                                    <Button className="cursor-pointer" variant="outline"
                                                            onClick={handleSignOut}>Logout</Button>

                                                </div>
                                            )
                                            :
                                            <>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => router.push(paths.auth.jwt.signUp)}
                                                    className="border-[#E5555C] text-[#E5555C] hover:bg-red-50 hover:text-[#E5555C] rounded-full px-6 font-medium"
                                                >
                                                    Sign up
                                                </Button>

                                                <Button
                                                    onClick={() => router.push(paths.auth.jwt.signIn)}
                                                    className="bg-[#E5555C] hover:bg-[#d4444b] text-white rounded-full px-6 font-medium shadow-md shadow-red-100"
                                                >
                                                    Sign in
                                                </Button>
                                            </>
                                        }

                                        {/*<SheetClose asChild>*/}
                                        {/*    <Button*/}
                                        {/*        variant="outline"*/}
                                        {/*        onClick={() => router.push(paths.auth.jwt.signUp)}*/}
                                        {/*        className="w-full border-[#E5555C] text-[#E5555C] hover:bg-red-50 hover:text-[#E5555C] rounded-full h-11"*/}
                                        {/*    >*/}
                                        {/*        Sign up*/}
                                        {/*    </Button>*/}
                                        {/*</SheetClose>*/}

                                        {/*<SheetClose asChild>*/}
                                        {/*    <Button*/}
                                        {/*        onClick={() => router.push(paths.auth.jwt.signIn)}*/}
                                        {/*        className="w-full bg-[#E5555C] hover:bg-[#d4444b] text-white rounded-full h-11 shadow-lg shadow-red-100"*/}
                                        {/*    >*/}
                                        {/*        Sign in*/}
                                        {/*    </Button>*/}
                                        {/*</SheetClose>*/}
                                    </div>

                                </SheetContent>
                            </Sheet>
                        </div>

                    </div>
                </div>
            </nav>


            {/*<div className='fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200'>*/}
            {/*  <div className='max-w-[1920px]  flex justify-between items-center px-6 py-3 mx-[100px]'>*/}
            {/*    <div className='flex gap-3 items-center justify-center'>*/}
            {/*      <img src='/image/eco_logo.svg' alt='' />*/}
            {/*    </div>*/}

            {/*    <ul className='flex justify-between items-center text-[16px] font-normal text-[#000000] gap-10 font-manrope'>*/}
            {/*      <li>*/}
            {/*        <a href='/home'>Home</a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='/blogs'>Blogs</a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='/about-us'>About</a>*/}
            {/*      </li>*/}
            {/*      <li>*/}
            {/*        <a href='/contact'>Contact Us</a>*/}
            {/*      </li>*/}
            {/*    </ul>*/}

            {/*    <div>*/}
            {/*      {loading ? null : authenticated ? (*/}
            {/*          <div className='flex gap-3 items-center'>*/}
            {/*            <Menubar>*/}
            {/*              <MenubarMenu>*/}
            {/*                <MenubarTrigger>*/}
            {/*                  <img src='/image/menu.svg' alt='' />*/}
            {/*                </MenubarTrigger>*/}
            {/*                <MenubarContent>*/}
            {/*                  <MenubarItem>*/}
            {/*                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>*/}
            {/*                  </MenubarItem>*/}
            {/*                  <MenubarItem>New Window</MenubarItem>*/}
            {/*                  <MenubarSeparator />*/}
            {/*                  <MenubarItem>Share</MenubarItem>*/}
            {/*                  <MenubarSeparator />*/}
            {/*                  <MenubarItem onClick={handleSignOut}>Logout</MenubarItem>*/}
            {/*                </MenubarContent>*/}
            {/*              </MenubarMenu>*/}
            {/*            </Menubar>*/}

            {/*            <Avatar>*/}
            {/*              <AvatarImage*/}
            {/*                  src='https://github.com/shadcn.png'*/}
            {/*                  alt='User'*/}
            {/*                  className='w-12'*/}
            {/*              />*/}
            {/*              <AvatarFallback>ACC</AvatarFallback>*/}
            {/*            </Avatar>*/}

            {/*            <p>{user?.username}</p>*/}
            {/*          </div>*/}
            {/*      ) : (*/}
            {/*          <div className='flex gap-2 font-mulish'>*/}
            {/*            <button*/}
            {/*                onClick={() => router.push(paths.auth.jwt.signIn)}*/}
            {/*                className='px-[18px] py-[9px] rounded-xl text-[16px] text-[#E14453] border border-[#E14453] font-normal'*/}
            {/*            >*/}
            {/*              Sign In*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                onClick={() => router.push(paths.auth.jwt.signUp)}*/}
            {/*                className='px-[18px] py-[9px] rounded-xl text-[16px] bg-[#E14453]  text-white font-normal'*/}
            {/*            >*/}
            {/*              Sign Up*/}
            {/*            </button>*/}
            {/*          </div>*/}
            {/*      )}*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

        </>
    );
};

export default Navbar;
