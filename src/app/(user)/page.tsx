"use client";
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export default function Page() {
  // const router = useRouter()
  // useEffect(() => {
  //   router.push('/login')
  // }
  // )
  return (
    <>
      <section className="min-h-screen justify-between flex flex-col">
        <div className="flex justify-between bg-h-line bg-contain h-40 items-center px-8">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="h-[120px]"
          />
          <img
            src="/img/logo/flowers/orange.svg"
            alt="orange flower"
            className="h-80 animate-spin-slow absolute -top-32 right-[35vw]"
          />
          <nav>
            <ul className="flex gap-2">
              <li>Home</li>
              <li>Home</li>
              <li>Home</li>
              <li>Home</li>
            </ul>
          </nav>
        </div>
        <p className="px-20 text-[6vw] leading-[6vw] font-bold text-center">
          Brushing <span className="bg-yellow  font-mono">Colours</span>, <br />{" "}
          <span className="text-brown font-serif animate-pulse">Bridging</span>{" "}
          Cultures
        </p>
        <div className="flex justify-between bg-h-line bg-contain h-40 items-end">
          <button className="bg-yellow ml-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            explore
          </button>
          <img
            src="/img/logo/flowers/blue.svg"
            alt="blue flower"
            className="h-80 animate-spin-slow absolute -bottom-32 -right-32"
          />
        </div>
      </section>
      <section className="h-screen relative flex flex-col justify-between">
        <div className="bg-h-line bg-contain h-40"></div>
        <img
          src="/img/logo/flowers/yellow.svg"
          alt="yellow flower"
          className="h-80 animate-spin-slow absolute -bottom-32 -left-32"
        />

        <div className="bg-h-line bg-contain h-40"></div>
      </section>
    </>
  );
}
