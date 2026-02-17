import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { paths } from 'app/routes/paths';
import { useRouter } from 'app/routes/hooks';

import { signUp } from 'app/auth/context/action'; // updated action path
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Checkbox } from '~/components/ui/checkbox';
import { cn } from '~/lib/utils';
import { Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

// ----------------------------------------------------------------------
export const SignUpSchema = zod.object({
  username: zod.string().min(1, { message: 'Username is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

// ----------------------------------------------------------------------
export function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const defaultValues: SignUpSchemaType = {
    username: '',
    email: '',
    password: '',
  };

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(data: SignUpSchemaType) {
    try {
      setErrorMsg('');

      const ok = await signUp({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (ok) {
        // navigate to sign-in page on successful signup
        router.push(paths.auth.jwt.signIn);
        return;
      }

      // fallback message if signUp returned false (shouldn't happen)
      setErrorMsg('Signup did not complete. Please try again.');
    } catch (err) {
      console.error('Signup error:', err);
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(message);
    }
  }

  return (
    <>
      <div className='min-h-screen bg-gray-50 flex items-center justify-center sm:p-4 font-sans'>
        <div className='relative w-full max-w-6xl h-[900px] md:h-[850px] bg-black sm:rounded-[10px] overflow-hidden shadow-2xl'>
          {/* Background Image Layer */}
          <div className='absolute inset-0 z-0'>
            <img
              src='/image/bg.jpg' // Ensure this path is correct
              alt='Cabin Background'
              className='w-full h-full object-cover opacity-80'
            />
            {/* Dark Overlay */}
            <div className='absolute inset-0 bg-black/40'></div>
          </div>

          {/* Content Wrapper */}
          <div className='absolute inset-0 z-10 flex items-center justify-center p-3 sm:p-6 overflow-y-auto'>
            {/* Glass Card */}
            <div className='w-full max-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-3 sm:p-10 shadow-2xl relative overflow-hidden'>
              {/* Glossy Effect */}
              <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none'></div>

              <div className='relative z-10 flex flex-col items-center'>
                {/* 1. Logo Section */}
                <div className='flex items-center gap-3 mb-6 sm:mb-8'>
                  <div className='w-10 h-10 rounded-full border-2 border-[#B83E25] flex items-center justify-center p-1.5'>
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      className='w-full h-full text-[#B83E25]'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z' />
                      <circle cx='12' cy='10' r='3' />
                    </svg>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-white text-lg font-serif tracking-wider'>
                      LAND OF NOMADS
                    </span>
                    <span className='text-[#B83E25] text-[9px] font-bold tracking-[0.3em] uppercase'>
                      ECO RENTALS
                    </span>
                  </div>
                </div>

                {/* 2. Header */}
                <h2 className='text-3xl font-medium text-[#B83E25] mb-2'>
                  Welcome Back!
                </h2>
                <p className='text-gray-200 text-sm mb-8 font-light'>
                  New Here? Please Create Your Account
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full space-y-4 text-left'
                  >
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name='username'
                      render={({ field, fieldState }) => (
                        <FormItem className='space-y-1'>
                          <FormLabel className='text-xs text-white/90 ml-1'>
                            User Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='xyz'
                              type='text'
                              {...field}
                              className={cn(
                                'w-full bg-transparent border rounded-lg px-4 py-6 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all',
                                // Conditional Border Logic
                                fieldState.error
                                  ? 'border-red-500 focus-visible:border-red-500'
                                  : 'border-gray-300/60 focus-visible:border-[#B83E25]'
                              )}
                            />
                          </FormControl>
                          <FormMessage className='text-xs text-red-400 ml-1' />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field, fieldState }) => (
                        <FormItem className='space-y-1'>
                          <FormLabel className='text-xs text-white/90 ml-1'>
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='hikari@company.com'
                              type='email'
                              {...field}
                              className={cn(
                                'w-full bg-transparent border rounded-lg px-4 py-6 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all',
                                // Conditional Border Logic
                                fieldState.error
                                  ? 'border-red-500 focus-visible:border-red-500'
                                  : 'border-gray-300/60 focus-visible:border-[#B83E25]'
                              )}
                            />
                          </FormControl>
                          <FormMessage className='text-xs text-red-400 ml-1' />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field, fieldState }) => (
                        <FormItem className='space-y-1'>
                          <FormLabel className='text-xs text-white/90 ml-1'>
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <Input
                                placeholder='hikari123.'
                                type={showPassword ? 'text' : 'password'}
                                {...field}
                                className={cn(
                                  'w-full bg-transparent border rounded-lg px-4 py-6 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all pr-10',
                                  // Conditional Border Logic
                                  fieldState.error
                                    ? 'border-red-500 focus-visible:border-red-500'
                                    : 'border-gray-300/60 focus-visible:border-[#B83E25]'
                                )}
                              />
                              <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                              >
                                {showPassword ? (
                                  <Eye size={18} />
                                ) : (
                                  <EyeOff size={18} />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className='text-xs text-red-400 ml-1' />
                        </FormItem>
                      )}
                    />

                    {/* Checkbox & Links */}
                    <div className='flex justify-between items-center text-xs text-gray-200 mt-1 px-1'>
                      <FormField
                        // control={form.control}
                        name='rememberMe'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-center space-x-2 space-y-0 cursor-pointer group'>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className='w-4 h-4 border-gray-300 rounded bg-transparent data-[state=checked]:bg-[#B83E25] data-[state=checked]:border-[#B83E25] data-[state=checked]:text-white transition-all'
                              />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                              <FormLabel className='text-xs text-gray-200 group-hover:text-white transition-colors cursor-pointer font-normal'>
                                Remember Me
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Link
                        to='#'
                        className='hover:text-white hover:underline transition-colors'
                      >
                        Forgot Your Password?
                      </Link>
                    </div>

                    {/* Action Button */}
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-[#B83E25] hover:bg-[#d4444b] text-white font-medium py-6 rounded-lg shadow-lg shadow-red-900/20 transition-all active:scale-[0.98] mt-2'
                    >
                      {isSubmitting ? 'Submitting…' : 'SignUp now'}
                    </Button>
                  </form>
                </Form>

                {/* 4. Social Login */}
                <div className='w-full mt-6'>
                  <div className='relative flex items-center justify-center mb-6'>
                    <span className='relative text-xs text-gray-300 bg-transparent uppercase tracking-wider opacity-80'>
                      Or Login With
                    </span>
                  </div>

                  <div className='grid grid-cols-1 gap-4'>
                    {/* Google Button */}
                    <button className='cursor-pointer flex items-center justify-center gap-2 bg-[#FFD1D1] hover:bg-[#ffc2c2] text-[#5e4e4e] py-2.5 rounded-lg transition-colors font-medium text-sm'>
                      <svg className='w-4 h-4' viewBox='0 0 24 24'>
                        <path
                          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                          fill='#4285F4'
                        />
                        <path
                          d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                          fill='#34A853'
                        />
                        <path
                          d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                          fill='#FBBC05'
                        />
                        <path
                          d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                          fill='#EA4335'
                        />
                      </svg>
                      Google
                    </button>

                    {/* Apple Button */}
                    {/*<button className='cursor-pointer flex items-center justify-center gap-2 bg-[#FFD1D1] hover:bg-[#ffc2c2] text-[#5e4e4e] py-2.5 rounded-lg transition-colors font-medium text-sm'>*/}
                    {/*  <svg*/}
                    {/*    className='w-4 h-4 text-black'*/}
                    {/*    fill='currentColor'*/}
                    {/*    viewBox='0 0 24 24'*/}
                    {/*  >*/}
                    {/*    <path d='M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.67-1.06.83-.03 2.62.2 3.86 1.93-3.23 1.88-2.69 6.26.65 7.67-.67 1.69-1.59 3.35-3.26 3.69zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />*/}
                    {/*  </svg>*/}
                    {/*  Apple*/}
                    {/*</button>*/}
                  </div>
                </div>

                {/* 5. Footer Text */}
                <div className='mt-8 text-xs text-gray-300'>
                  Already Have An Account?{' '}
                  <Link
                    to={paths.auth.jwt.signIn}
                    className='text-white hover:text-[#B83E25] transition-colors font-medium'
                  >
                    Login Now.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
