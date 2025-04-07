'use client';

import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { extractUserFromToken } from '@/utils/auth'; // doğru yoldan import et

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('next-auth.session-token') as string;
    if (token) {
      const user = extractUserFromToken(token);
      dispatch(setUser({ token, user }));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
