"use client";
import {
  Candidate,
  GetCandidateByChestNoQuery,
  Programme,
} from "@/gql/graphql";
import { useState } from "react";
import ProgramResult from "./ProgramResult";

interface Props {
  candidate: Candidate;
  error: string;
}
export default function Profile(props: Props) {
  const [programResultView, setProgramResultView] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] = useState<Programme>();
  return (
    <>
      {props?.error ? (
        <div className="flex flex-col justify-center items-center my-10 w-full">
          <p className="font-semibold text-2xl">
            {props?.error.replace("[GraphQL] ", "")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-10 w-full">
          <p className="font-semibold text-2xl">Details</p>
          <div className="flex flex-col items-center border-2 border-primary p-2 rounded-xl">
            <p className="font-semibold text-xl">{props?.candidate?.chestNO}</p>
            <p className="font-semibold text-xl">{props?.candidate?.name}</p>
            <p className="font-semibold text-xl">
              {props?.candidate?.category?.name}
            </p>
            <p className="font-semibold text-xl">
              {props?.candidate?.team?.name}
            </p>
            <p className="font-semibold text-xl">
              {props?.candidate?.individualPoint}
            </p>
          </div>
          <p className="font-semibold text-2xl">Programs</p>
          <div className="flex flex-col items-center border-2 border-primary p-2 rounded-xl gap-2">
            {props.candidate.candidateProgrammes?.map((candidateProgramme) => (
              <p
                onClick={() => {
                  setSelectedProgram(
                    candidateProgramme?.programme as Programme
                  );
                  setProgramResultView(true);
                }}
                className="font-semibold text-xl border-2 border-primary border-dashed rounded-xl p-2 w-full text-center cursor-pointer"
              >
                {candidateProgramme?.programme?.programCode} <br />
                {candidateProgramme.programme?.name}
              </p>
            ))}
          </div>
        </div>
      )}
      <ProgramResult
        selectedProgram={selectedProgram as Programme}
        programResultView={programResultView}
        setProgramResultView={setProgramResultView}
      />
    </>
  );
}
