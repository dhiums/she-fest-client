"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export default function Page() {
  // const router = useRouter()
  // useEffect(() => {
  //   router.push('/login')
  // }
  // )
  return (
    <div className=" w-screen">
      <section id="section-1" className="min-h-screen justify-between flex flex-col">
        <div className="flex justify-between bg-h-line bg-contain h-40 items-center px-8">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="md:h-24 h-16"
          />
          <img
            src="/img/logo/flowers/orange.svg"
            alt="orange flower"
            className="h-80 animate-spin-slow absolute -top-32 right-[35vw]"
          />
          <nav>
            <ul className="flex gap-2">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Result</li>
              <li className="cursor-pointer">Downloads</li>
              <li className="cursor-pointer">Profile</li>
            </ul>
          </nav>
        </div>
        <p className="px-20 text-[6vw] leading-[6vw] font-bold text-center">
          Brushing <span className="bg-yellow font-mono">Colours</span>, <br />
          <span className="text-brown font-serif animate-pulse">
            Bridging
          </span>{" "}
          Cultures
        </p>
        <div className="flex justify-between bg-h-line bg-contain h-40 items-end">
         <a href="#section-2">
         <button className="bg-yellow hover:bg-yellower transition-colors duration-300 ml-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
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
         </a>
          <img
            src="/img/logo/flowers/blue.svg"
            alt="blue flower"
            className="h-80 animate-spin-slow absolute -bottom-32 -right-32"
          />
        </div>
      </section>

      <section id="section-2" className="h-screen relative flex flex-col justify-between">
        <div className="bg-h-line bg-contain h-40 flex items-center justify-center">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="h-[120px]"
          />
        </div>

        <div className="flex justify-center gap-16">
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/alpha.svg"
              alt="one of three parts of the logo"
              className="h-40"
            />
            <div className="text-center">
              <p className="font-bold text-[70px] leading-[50px]">300</p>
              <p className="font-semibold text-lg">candidates</p>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/beta.svg"
              alt="one of three parts of the logo"
              className="h-40"
            />
            <div className="text-center">
              <p className="font-bold text-[70px] leading-[50px]">300</p>
              <p className="font-semibold text-lg">candidates</p>
            </div>
          </div>

          <div className="flex items-center gap-2 hover:scale-110 transition-transform duration-500 ease-in-out">
            <img
              src="/img/logo/parts/gamma.svg"
              alt="one of three parts of the logo"
              className="h-40"
            />
            <div className="text-center">
              <p className="font-bold text-[70px] leading-[50px]">300</p>
              <p className="font-semibold text-lg">candidates</p>
            </div>
          </div>
        </div>

        <div className="bg-h-line bg-contain h-40 flex items-end justify-end">
         <a href="#section-3"> <button className="bg-yellow hover:bg-yellower transition-colors duration-300 mr-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            explore
          </button></a>
        </div>
        <img
          src="/img/logo/flowers/yellow.svg"
          alt="yellow flower"
          className="h-80 animate-spin-slow absolute -bottom-32 -left-32"
        />
      </section>

      <section id="section-3" className="h-screen relative flex flex-col justify-between">
        <div className="bg-h-line bg-contain h-40 flex items-center justify-center">
          <img
            src="/img/logo/logo.svg"
            alt="she fest logo"
            className="h-[120px]"
          />
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-3">
            <div className="bg-blue w-72 h-20 hover:bg-bluer transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-10"
              >
                <path
                  fill="currentColor"
                  d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"
                ></path>
              </svg>
              Score Board
            </div>
            <div className="bg-blue w-72 h-20 hover:bg-bluer transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-10"
              >
                <path
                  fill="currentColor"
                  d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"
                ></path>
              </svg>
              Downloads Section{" "}
            </div>{" "}
          </div>

          <div className="flex gap-3">
            <div className="bg-blue w-72 h-20 hover:bg-bluer transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-10"
              >
                <path
                  fill="currentColor"
                  d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"
                ></path>
              </svg>
              Candidate Points
            </div>
            <div className="bg-blue w-72 h-20 hover:bg-bluer transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-10"
              >
                <path
                  fill="currentColor"
                  d="M224 80c0-26.5-21.5-48-48-48H80C53.5 32 32 53.5 32 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80zm0 256c0-26.5-21.5-48-48-48H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336zM288 80v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V336z"
                ></path>
              </svg>
              Institution Login
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-h-line bg-contain h-40 items-end">
         <a href="#section-1"> <button className="bg-yellow hover:bg-yellower transition-colors duration-300 ml-12 mb-10 flex items-center gap-1 animate-bounce text-lg px-3 py-2 border-black shadow-md border-2 rounded-md font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
            explore
          </button></a>
          <img
            src="/img/logo/flowers/orange.svg"
            alt="orange flower"
            className="h-80 animate-spin-slow absolute -bottom-32 -right-32"
          />
        </div>
      </section>
      
      <div id="section-4" className="flex flex-col text-center items-center lg:text-left lg:items-start lg:flex-row justify-between px-16 py-5">
        <div className="flex items-center my-auto">
          <img src="/img/logo/logo.svg" alt="logo" className="h-36" />
        </div>
        <div className="w-full px-4">
          <div className="flex flex-wrap sm:flex-nowrap items-top my-10 justify-center lg:justify-end xl:mr-32 gap-10">
            <div className="px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Features
              </span>
              <ul className="list-unstyled opacity-80">
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Sheets
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Organizations
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Docs
                  </Link>
                </li>
                {/* <li>
                <Link
                  className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                  href="/tea-stall"
                >
                  Tea Stall
                </Link>
              </li> */}
              </ul>
            </div>
            <div className="px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Resources
              </span>
              <ul className="list-unstyled opacity-80 ">
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
