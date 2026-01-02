import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { paths } from 'app/routes/paths';
import { useRouter } from 'app/routes/hooks';

import { Form } from 'app/components/hook-form';

import { signUp } from 'app/auth/context/action'; // updated action path
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

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
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const defaultValues: SignUpSchemaType = {
    username: '',
    email: '',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async data => {
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
  });

  const renderForm = (
    <div className='py-20 px-30'>
      <div className="h-[920px] bg-[url('/image/hero.jpg')] bg-cover bg-center rounded-4xl py-20 px-55">
        <div className='bg-[#FFFFFF73] backdrop-blur-3xl flex flex-col rounded-[18px] gap-12 border border-[#FFFFFF] justify-center items-center mx-auto py-6'>
          <div className='flex gap-4 justify-center items-center'>
            <img src='/image/logo.svg' alt='' />
            <div className='flex flex-col gap-2'>
              {/* <p className='text-[#FFFFFF] text-3xl'></p> */}
              <img src='/image/logo_text.svg' alt='' />
              <img src='/image/logo_text_un.svg' alt='' className='h-3' />
            </div>
          </div>

          <div className='flex flex-col gap-3 justify-center items-center'>
            <p className='text-[40px] text-[#E14453] font-semibold text-center font-manrope'>
              Welcome Back!
            </p>
            <p className='font-normal text-[18px] font-manrope text-[#FFFFFF]'>
              Register to Your Account
            </p>

            {/* start */}
            <div className='flex flex-col gap-7 items-start w-full'>
              <div className='grid gap-2 w-full'>
                <Label
                  htmlFor='username'
                  className='mb-1  text-white font-inter-tight font-normal text-[12px]'
                >
                  User Name
                </Label>
                <Input
                  id='username'
                  type='text'
                  placeholder='Name'
                  autoComplete='name'
                  {...register('username')}
                  className='w-full'
                />
                {errors.username?.message && (
                  <p className='mt-1 text-sm text-red-600'>
                    {String(errors.username.message)}
                  </p>
                )}
              </div>

              <div className='grid gap-2 w-full'>
                <Label
                  htmlFor='email'
                  className='mb-1 text-white font-inter-tight font-normal text-[12px]'
                >
                  Enter Email
                </Label>
                <div className='flex gap-2'>
                  <Input
                    id='email'
                    type='email'
                    autoComplete='email'
                    placeholder='hikari@company.com'
                    {...register('email')}
                    className='w-full'
                  />
                </div>
                {errors.email?.message && (
                  <p className='mt-1 text-sm text-red-600'>
                    {String(errors.email.message)}
                  </p>
                )}
              </div>
              <div className='grid gap-2 w-full'>
                <Label
                  htmlFor='password'
                  className='mb-1 text-white font-inter-tight font-normal text-[12px]'
                >
                  Password
                </Label>
                <div className='flex gap-2'>
                  <Input
                    id='password'
                    type='password'
                    autoComplete='password'
                    placeholder='Password'
                    {...register('password')}
                    className='w-full'
                  />
                </div>
                {errors.password?.message && (
                  <p className='mt-1 text-sm text-red-600'>
                    {String(errors.password.message)}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-3 px-6 bg-[#E14453]'
              >
                {isSubmitting ? 'Submitting…' : 'SignUp now'}
              </Button>
            </div>

            <p className='font-normal font-inter-tight text-[14px] text-[#4F4F52] leading-[150%]'>
              or SignUp with
            </p>

            <div className='flex gap-3'>
              <div className='bg-[#FFCFD4] py-2 px-5 rounded-[12px] border-[1.5px] border-[#E7E7E7]'>
                <p className='text-[16px] text-[#545454] flex gap-1'>
                  <img src='/image/google.svg' alt='' /> Google
                </p>
              </div>

              <div className='bg-[#FFCFD4] py-2 px-5 rounded-[12px] border-[1.5px] border-[#E7E7E7]'>
                <p className='text-[16px] text-[#545454] flex gap-1'>
                  <img src='/image/apple.svg' alt='' /> Apple
                </p>
              </div>
            </div>

            <p className='font-normal font-inter-tight text-[14px] text-[#FFFFFF] '>
              Already have an account? {'  '}
              <a href={paths.auth.jwt.signIn}>Login {'  '}</a>
              now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
