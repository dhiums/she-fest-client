"use client";
import { useGlobalContext } from "@/context/context";
import {
  Candidate,
  CandidateProgramme,
  Category,
  Programme,
} from "@/gql/graphql";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface Props {
  programs: Programme[];
  candidates: Candidate[];
  categories: Category[];
  team : string;
}

export default function Download(props: Props) {
  const { data } = useGlobalContext();
  const [category, setCategory] = useState<string>("Thanawiyya");
  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF?.current || null,
    documentTitle: "PDF",
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center gap-2 m-3 print:hidden">
        {props.categories?.map((ctgry, index) =>
          category === ctgry.name ? (
            <p
              key={index}
              onClick={() => setCategory(ctgry?.name as string)}
              className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold cursor-pointer"
            >
              {ctgry?.name}
            </p>
          ) : (
            <p
              key={index}
              onClick={() => setCategory(ctgry?.name as string)}
              className="px-2 py-1 border-primary border-dashed border-2 inline rounded-lg text-primary font-semibold cursor-pointer"
            >
              {ctgry?.name}
            </p>
          )
        )}
      </div>
      <div className="flex px-2 py-2 bg-primary rounded-lg text-white font-semibold cursor-pointer justify-center gap-1 m-1 print:hidden w-32 self-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 font-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        <p
          onClick={() => {
            generatePDF();
          }}
        >
          Download
        </p>
      </div>
      <div ref={componentPDF as any} className="flex flex-col w-full mt-3 print:scale-x-[85%] print:scale-y-[95%]">
        <div className="self-center">
          <div className="flex w-full h-72">
            <div className="flex flex-col items-center justify-center h-72 w-[28rem] text-center font-semibold pl-2 border-[1px] border-black text-base gap-4">
              <p className="text-4xl">{category}</p>
              <p className="text-3xl">{props.team}</p>
            </div>
            <div className="">
              <div className="flex h-72">
                {props.programs
                  ?.filter((program) => program.category?.name === category)
                  ?.map((program, index) => (
                    <div className="w-6 even:bg-gray-200 font-bold border-[1px] border-black text-base h-72 text-end">
                      <p
                        key={index}
                        className=" whitespace-nowrap -rotate-90 mt-64 "
                      >
                        {program.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {category === "Kulliyya"
            ? props.candidates
                
                ?.map((candidate, index) => (
                  <div key={index} className="flex w-full ">
                    <p className="w-32 text-center line-clamp-1 font-semibold pl-2 border-[1px] border-black text-base">
                      {candidate.chestNO}
                    </p>
                    <p className="w-80 text-left line-clamp-1 font-semibold pl-2 border-[1px] border-black text-base">
                      {candidate.name}
                    </p>
                    <div className="">
                      <div className="flex">
                        {props.programs
                          ?.filter(
                            (program) => program.category?.name === category
                          )
                          ?.map((program, index) => (
                            <div className="w-6 even:bg-gray-200 font-bold border-[1px] border-black text-center text-base">
                              {(
                                candidate?.candidateProgrammes as CandidateProgramme[]
                              ).length > 0 ? (
                                <p key={index}>
                                  {candidate?.candidateProgrammes?.some(
                                    (candidateProgramme) =>
                                      candidateProgramme?.programme?.name ===
                                      program.name
                                  )
                                    ? "✓"
                                    : ""}
                                </p>
                              ) : (
                                <p key={index}>{"ㅤ"}</p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))
            : props.candidates
               
                ?.filter((candidate) => candidate?.category?.name === category)
                ?.map((candidate, index) => (
                  <div key={index} className="flex w-full ">
                    <p className="w-32 text-center line-clamp-1 font-semibold pl-2 border-[1px] border-black text-base">
                      {candidate.chestNO}
                    </p>
                    <p className="w-80 text-left line-clamp-1 font-semibold pl-2 border-[1px] border-black text-base">
                      {candidate.name}
                    </p>
                    <div className="">
                      <div className="flex">
                        {props.programs
                          ?.filter(
                            (program) => program.category?.name === category
                          )
                          ?.map((program, index) => (
                            <div className="w-6 even:bg-gray-200 font-bold border-[1px] border-black text-center text-base">
                              {(
                                candidate?.candidateProgrammes as CandidateProgramme[]
                              ).length > 0 ? (
                                <p key={index}>
                                  {candidate?.candidateProgrammes?.some(
                                    (candidateProgramme) =>
                                      candidateProgramme?.programme?.name ===
                                      program.name
                                  )
                                    ? "✓"
                                    : ""}
                                </p>
                              ) : (
                                <p key={index}>{"ㅤ"}</p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
}
