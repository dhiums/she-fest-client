"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChestNO() {
  const router = useRouter();
  const [chestNO, setchestNO] = useState<string>("");
  return (
    <div className="flex justify-center items-center  w-full h-[30vh] gap-1">
      <input
        type="text"
        className="w-full md:w-1/3 h-14 border-4 border-primary rounded-2xl  text-lg md:text-2xl text-center uppercase"
        value={chestNO}
        placeholder="Enter your Reg.No Here"
        onChange={(e) => setchestNO(e.target.value)}
      />
      <button
        className="flex justify-center items-center bg-primary h-14 w-14 rounded-2xl "
        onClick={() => {
          console.log(chestNO);
          router.push(`/profile/${chestNO}`);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
}
