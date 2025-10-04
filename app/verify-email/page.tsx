'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setMessage('Invalid or missing token.');
        return;
      }

      try {
        const res = await axios.post('/api/email/verify', { token });

        if (res.status === 200) {
          setMessage('✅ Email verified! Redirecting to your profile...');
          setTimeout(() => {
            router.push('/members/account');
          }, 3000);
        } else {
          setMessage(res.data?.error ?? 'Something went wrong.');
        }
      } catch (error: any) {
        setMessage(error?.response?.data?.error || 'Verification failed.');
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
);
};

export default VerifyEmailPage;
