import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { paths } from 'app/routes/paths';
import { useRouter } from 'app/routes/hooks';
import { RouterLink } from 'app/routes/components';

import { useBoolean } from 'app/hooks/use-boolean';

import { Form } from 'app/components/hook-form';

import { useAuthContext } from 'app/auth/hooks';
import { signIn } from 'app/auth/context';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const { checkUserSession, initSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState<string>('');

  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
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
      const dataRes = await signIn({
        email: data.email,
        password: data.password,
      });

      initSession?.(dataRes.user, dataRes.accessToken);
      router.push(paths.home.root);
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong!';

      setErrorMsg(errMsg);
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
              Log in to Your Account
            </p>

            {/* start */}
            <div className='flex flex-col gap-7 items-start w-full'>
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
                    autoComplete='current-password'
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

              <div className='flex justify-between w-full'>
                <div className='flex gap-1.5 items-center'>
                  <Checkbox />
                  <p className='font-normal font-inter-tight text-[14px] text-[#4F4F52]'>
                    Remember me
                  </p>
                </div>
                <a
                  className='font-normal font-inter-tight text-[14px] text-[#4F4F52] '
                  href={paths.auth.jwt.forgotPassword}
                >
                  Forgot Password
                </a>
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-3 px-6 bg-[#E14453]'
              >
                {' '}
                {isSubmitting ? 'Submitting…' : 'Log in now'}
              </Button>
            </div>

            <p className='font-normal font-inter-tight text-[14px] text-[#4F4F52] leading-[150%]'>
              or login with
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
              don’t have an account? {'  '}
              <a href={paths.auth.jwt.signUp}>register {'  '}</a>
              now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Error alert */}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
