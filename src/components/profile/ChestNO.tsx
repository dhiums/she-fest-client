"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChestNO() {
  const router = useRouter();
  const [chestNO, setchestNO] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center items-center w-full h-[80vh]">
      <input
        type="text"
        className="w-1/5 border-2 border-brown border-dashed rounded-xl h-14 text-lg p-2 uppercase text-center"
        onChange={(e) => setchestNO(e.target.value)}
      />
      <button
        className="mt-2 w-1/5 h-10 bg-brown rounded-xl text-white"
        // onClick={() => )}
        onClick={() => {
          router.push(`/profile/${chestNO}`);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }}
      >
        {loading ? `Checking...` : `Check Result`}
      </button>
    </div>
  );
}
