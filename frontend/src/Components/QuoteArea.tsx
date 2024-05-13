import React from 'react';

const QuoteArea = () => {
  return (
    <div className='hidden md:flex h-screen items-center justify-center flex-col px-20 bg-gray-100'>
      <div className='text-2xl font-bold'>
        "The way to get started is to quit talking and begin doing"
      </div>
      <div className='flex flex-col items-start w-full mt-2'>
        <div className='font-semibold text-xl'>Walt Disney</div>
        <div className='text-gray-500'>CEO Disney</div>
      </div>
    </div>
  );
};

export default QuoteArea;
