'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
const Links = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex flex-col md:flex-row gap-3">
        <div
          onClick={() => {
            router.push('/result/final');
          }}
          className="cursor-pointer bg-blue w-72 h-20 hover:bg-bluer transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-10 w-10"
          >
            <path
              fill="currentColor"
              d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"
            ></path>
          </svg>
          Score Board
        </div>
        <div
          onClick={() => {
            router.push('/download');
          }}
          className="cursor-pointer bg-orange w-72 h-20 hover:bg-oranger transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="20"
            viewBox="0 0 640 512"
            className="w-10 h-10"
          >
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
          </svg>
          Download Section
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row gap-3"
      >
        <div 
        onClick={() => {
          router.push('/profile');
        }} className="cursor-pointer bg-yellow w-72 h-20 hover:bg-yellower transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="18"
            viewBox="0 0 576 512"
            className="h-10 w-10"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
          </svg>
          Candidate Points
        </div>
        <div
          onClick={() => {
            router.push('/login');
          }}
          className="cursor-pointer bg-pink w-72 h-20 hover:bg-pinker transition-all duration-300  flex items-center gap-3 text-xl px-5 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
            className="h-10 w-10"
          >
            <path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8H32c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9V104l4.4-1.6L240.1 4.2zM64 224h64V416h40V224h64V416h48V224h64V416h40V224h64V420.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V224z" />
          </svg>
          Institution Login
        </div>
      </div>
    </div>
  );
};

export default Links;
