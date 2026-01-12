import { useMemo, useEffect, useCallback } from 'react';
import { useSetState } from 'app/hooks/use-set-state';
import axios from 'app/utils/axios'; // Ensure your axios instance is imported
import { STORAGE_KEY } from './constant';
import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import type {AuthState, ProfileApiResponse} from '../types';
import {profiles} from "~/pages/public/profile/profileActions";


type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  // =========================================================
  // CORE SESSION CHECKER (Updated with Profile API)
  // =========================================================
  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      // ১. প্রথমে চেক করি টোকেন আছে কিনা এবং তার মেয়াদ আছে কিনা (Client-side check)
      if (accessToken && isValidToken(accessToken)) {

        // ২. Axios Header এ টোকেন সেট করি
        setSession(accessToken);

        try {
          // ৩. সার্ভার থেকে লেটেস্ট ডেটা আনি
          // আপনার API Endpoint টি বসান (যেমন: /profiles/me অথবা /auth/me)
          const response:ProfileApiResponse = await profiles();

          const { user: apiUser, profile: apiProfile } = response;

          // ৪. User এবং Profile ডেটা মার্জ (Merge) করে স্টেটে রাখি
          // এতে আপনি auth.user.fullName এবং auth.user.email দুটোই এক্সেস করতে পারবেন
          const combinedUser = {
            ...apiUser,        // user fields (email, role, etc)
            ...apiProfile,     // profile fields (fullName, address, etc)
            id: apiUser._id,   // standardizing ID access
            accessToken,       // keep the token handy
          };

          setState({ user: combinedUser as any, loading: false });

        } catch (error) {
          console.error('Session validation failed:', error);
          // টোকেন ভ্যালিড কিন্তু সার্ভার এরর দিয়েছে (যেমন 401 Unauthorized)
          // তার মানে টোকেনটি সার্ভার সাইডে বাতিল হয়েছে, তাই লগআউট করাতে হবে
          doLogout();
        }
      } else {
        // টোকেন নেই বা মেয়াদ শেষ
        doLogout();
      }
    } catch (error) {
      console.error('Session check error:', error);
      doLogout();
    }
  }, [setState]);

  // Helper function to clear state
  const doLogout = () => {
    setSession(null);
    setState({ user: null, loading: false });
  };

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  // =========================================================
  // LOGIN / INIT SESSION
  // =========================================================
  const initSession = useCallback(
      async (userData: any, accessToken: string) => {
        try {
          setSession(accessToken);

          // অপশন ১: যদি লগইন রেসপন্সেই প্রোফাইল ডেটা থাকে, সরাসরি সেট করুন:
          // setState({ user: { ...userData, accessToken }, loading: false });

          // অপশন ২ (Recommended): লগইনের পরেও ফ্রেশ প্রোফাইল ডেটা আনতে checkUserSession কল করুন
          // এটি নিশ্চিত করে যে লগইন এবং রিলোড এর ডেটা স্ট্রাকচার একই থাকবে।
          await checkUserSession();

        } catch (err) {
          console.error('initSession error', err);
          doLogout();
        }
      },
      [checkUserSession] // depend on checkUserSession
  );

  // =========================================================
  // MEMOIZED CONTEXT VALUE
  // =========================================================
  const memoizedValue = useMemo(
      () => ({
        user: state.user ? { ...state.user } : null,
        checkUserSession,
        initSession,
        loading: status === 'loading',
        authenticated: status === 'authenticated',
        unauthenticated: status === 'unauthenticated',
      }),
      [checkUserSession, state.user, status, initSession]
  );

  return (
      <AuthContext.Provider value={memoizedValue}>
        {children}
      </AuthContext.Provider>
  );
}