import React from 'react';
import { useSignup } from '../hooks/useSignup';

export const Signup = () => {
  const { isLogin } = useSignup();
  return (
    <div className='mt-5 p-4 Small shadow bg-light rounded'>
      <h1 className='mb-4 font-weight-bold-display-4'>
        {isLogin ? 'Welcome!' : 'Please wiat...'}
      </h1>
    </div>
  );
};
