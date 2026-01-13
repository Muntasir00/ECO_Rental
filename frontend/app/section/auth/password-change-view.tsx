import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { paths } from 'app/routes/paths';
import { useRouter, useSearchParams } from 'app/routes/hooks';
import { RouterLink } from 'app/routes/components';

import { useBoolean } from 'app/hooks/use-boolean';

import { Form } from 'app/components/hook-form';

import { useAuthContext } from 'app/auth/hooks';
import { changePassword, signIn } from 'app/auth/context';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';

// ----------------------------------------------------------------------

export type ChangePasswordInSchemaType = zod.infer<
  typeof ChangePasswordInSchema
>;

export const ChangePasswordInSchema = zod
  .object({
    newPassword: zod.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: zod
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

export function PasswordChangeView() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [errorMsg, setErrorMsg] = useState<string>('');

  const defaultValues: ChangePasswordInSchemaType = {
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm<ChangePasswordInSchemaType>({
    resolver: zodResolver(ChangePasswordInSchema),
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

      if (!email) {
        throw new Error('Email is missing in URL');
      }

      await changePassword({
        email: email,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      // Redirect to login page after success
      router.push(paths.auth.jwt.signIn);
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : String(error));
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
            <p className='text-[40px] text-[#B83E25] font-semibold text-center font-manrope'>
              Welcome Back!
            </p>
            <p className='font-normal text-[18px] font-manrope text-[#FFFFFF]'>
              Change your password to continue
            </p>

            {/* start */}
            <div className='flex flex-col gap-7 items-start w-full'>
              <div className='grid gap-2 w-full'>
                <Label
                  htmlFor='password'
                  className='mb-1 text-white font-inter-tight font-normal text-[12px]'
                >
                  New Password
                </Label>
                <div className='flex gap-2'>
                  <Input
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Password'
                    {...register('newPassword')}
                    className='w-full'
                  />
                </div>
                {errors.newPassword?.message && (
                  <p className='mt-1 text-sm text-red-600'>
                    {String(errors.newPassword.message)}
                  </p>
                )}
              </div>

              <div className='grid gap-2 w-full'>
                <Label
                  htmlFor='password'
                  className='mb-1 text-white font-inter-tight font-normal text-[12px]'
                >
                  Confirm Password
                </Label>
                <div className='flex gap-2'>
                  <Input
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    placeholder='Password'
                    {...register('confirmPassword')}
                    className='w-full'
                  />
                </div>
                {errors.confirmPassword?.message && (
                  <p className='mt-1 text-sm text-red-600'>
                    {String(errors.confirmPassword.message)}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-3 px-6 bg-[#B83E25]'
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
              Back to {'  '}
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
