import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '~/components/ui/menubar';

import { signOut } from 'app/auth/context/action';
import { useRouter } from 'app/routes/hooks';
import { paths } from 'app/routes/paths';
import { useAuthContext } from 'app/auth/hooks';

const Navbar = () => {
  const router = useRouter();

  const { authenticated, loading } = useAuthContext();

  const { user = null } = useAuthContext();
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
    <div className='fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200'>
      <div className='max-w-[1920px]  flex justify-between items-center px-6 py-3 mx-[100px]'>
        <div className='flex gap-3 items-center justify-center'>
          <img src='/image/eco_logo.svg' alt='' />
        </div>

        <ul className='flex justify-between items-center text-[16px] font-normal text-[#000000] gap-10 font-manrope'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/blogs'>Blogs</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <a href='/contact'>Contact Us</a>
          </li>
        </ul>

        <div>
          {loading ? null : authenticated ? (
            <div className='flex gap-3 items-center'>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <img src='/image/menu.svg' alt='' />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
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
          ) : (
            <div className='flex gap-2 font-mulish'>
              <button
                onClick={() => router.push(paths.auth.jwt.signIn)}
                className='px-[18px] py-[9px] rounded-xl text-[16px] text-[#E14453] border border-[#E14453] font-normal'
              >
                Sign In
              </button>
              <button
                onClick={() => router.push(paths.auth.jwt.signUp)}
                className='px-[18px] py-[9px] rounded-xl text-[16px] bg-[#E14453]  text-white font-normal'
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
