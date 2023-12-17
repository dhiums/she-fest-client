"use client";
import { useGlobalContext } from "@/context/context";
import {
  Candidate,
  CandidateProgramme,
  Category,
  Programme,
} from "@/gql/graphql";
import { useEffect, useState } from "react";

interface Props {
  programs: Programme[];
  candidates: Candidate[];
  categories: Category[];
}

export default function Download(props: Props) {
  const { data } = useGlobalContext();
  const [category, setCategory] = useState<string>("Thanawiyya");

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center gap-2 m-3 print:hidden">
        {props.categories.map((ctgry, index) =>
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
      <div className="self-center">
        <div className="flex w-full h-72">
          <div className="flex flex-col items-center justify-center h-72 w-[28rem] text-center font-semibold pl-2 border-[1px] border-black text-base gap-4">
            <p className="text-4xl">{category}</p>
            <p className="text-3xl">{data?.team?.name}</p>
          </div>
          <div className="">
            <div className="flex h-72">
              {props.programs
                .filter((program) => program.category?.name === category)
                .map((program, index) => (
                  <div className="w-6 even:bg-gray-200 font-bold border-[1px] border-black text-xs h-72 text-end">
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
              .filter((candidate) => candidate?.team?.name == data?.team?.name)
              .map((candidate, index) => (
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
                        .filter(
                          (program) => program.category?.name === category
                        )
                        .map((program, index) => (
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
              .filter((candidate) => candidate?.team?.name == data?.team?.name)
              .filter((candidate) => candidate?.category?.name === category)
              .map((candidate, index) => (
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
                        .filter(
                          (program) => program.category?.name === category
                        )
                        .map((program, index) => (
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
  );
}
