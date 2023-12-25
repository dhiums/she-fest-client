import React from "react";
import Header from "@/components/Headers/NavHeader";
import Footer from "@/components/Footer";
import Link from "next/link";

const page = () => {
  return (
    <>
<div className="min-h-screen">
<Header />
      <div className="w-full flex justify-center">
        <h1 className=" text-2xl md:text-4xl lg:text-5xl text-center mt-10 mb-16 font-bold relative inline">
          Downloads
          <img
            src="/img/logo/flowers/orange.svg"
            alt="flower"
            className="w-8 absolute right-4 -bottom-2"
          />
        </h1>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex gap-3 flex-wrap items-center justify-center">
        <Link href="/download/CONCEPT_NOTE.pdf">
          <div className="bg-yellow cursor-pointer w-72 h-20 hover:bg-yellower transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
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
            Concept Note
          </div>
          </Link> 
          <Link href="/download/schedule.pdf">
          <div className="bg-yellow cursor-pointer w-72 h-20 hover:bg-yellower transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
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
            Program Schedule A
          </div>
          </Link>
        </div>

        <div className="flex gap-3 flex-wrap items-center justify-center">
          <div className="bg-yellow cursor-pointer w-72 h-20 hover:bg-yellower transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
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
            Kulliyya Programs
          </div>
          <div className="bg-yellow cursor-pointer w-72 h-20 hover:bg-yellower transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
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
            Aliya Programs
          </div>
        </div>
        <div className="flex gap-3 flex-wrap items-center justify-center">

          <div className="bg-yellow cursor-pointer w-72 h-20 hover:bg-yellower transition-all duration-300  flex items-center gap-2 text-xl px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02]">
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
            Thanawiya Programs
          </div>
        </div>
      </div>
</div>
      <Footer />
    </>
  );
};

export default page;
