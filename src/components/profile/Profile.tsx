"use client";
import {
  Candidate,
  CandidateProgramme,
  GetCandidateByChestNoQuery,
  Modes,
  Programme,
  Types,
} from "@/gql/graphql";
import { useState } from "react";
import ProgramResult from "./ProgramResult";

interface Props {
  candidate: Candidate;
  error: string;
}
export default function Profile(props: Props) {
  const [programResultView, setProgramResultView] = useState<boolean>(false);
  const [selectedCP, setSelectedCP] = useState<CandidateProgramme>();
  return (
    <>
      {props?.error ? (
        <div className="flex flex-col justify-center items-center my-10 w-full">
          <p className="font-semibold text-2xl">
            {props?.error.replace("[GraphQL] ", "")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-10 px-10 w-full">
          <p className="font-semibold bg-yellow px-2 py-1 rounded-md text-lg -mb-5 z-50">
            Details
          </p>
          <div className="flex flex-col items-center border-2 border-yellow p-5 rounded-xl">
            <p className="font-semibold text-xl text-center">
              {props?.candidate?.chestNO}
            </p>
            <p className="font-semibold text-xl text-center">
              {props?.candidate?.name}
            </p>
            <p className="font-semibold text-xl text-center">
              {props?.candidate?.category?.name}
            </p>
            <p className="font-semibold text-xl text-center">
              {props?.candidate?.team?.name}
            </p>
            <p className="font-semibold text-xl text-center">
              Total Points :{" "}
              {props?.candidate?.candidateProgrammes?.reduce((a, b) => {
                if (b?.programme?.type == Types.Single) {
                  return a + (b?.finalpoint as unknown as number);
                } else {
                  return a + 0;
                }
              }, 0)}
            </p>
          </div>
          {(props.candidate?.candidateProgrammes as CandidateProgramme[]).length > 0 && (
            <>
              <p className="font-semibold text-2xl mt-5">Programs</p>
              <div className="flex flex-col items-center mt-3 rounded-xl gap-2">
                {props.candidate.candidateProgrammes?.filter((prg , ind)=>{
                  if(prg?.programme?.mode == Modes.Stage && prg.zonalposition?.id as number <= 2){
                    return true
                  }else if(prg?.programme?.mode == Modes.NonStage && prg.zonalposition?.id as number == 1){
                    return true
                  }else{
                    return false
                  }
                })?.map(
                  (candidateProgramme) => (
                    <p
                      onClick={() => {
                        setSelectedCP(candidateProgramme as CandidateProgramme);
                        setProgramResultView(true);
                      }}
                      className="font-semibold text-xl border-2 border-primary border-dashed rounded-xl p-2 w-full text-center cursor-pointer"
                    >
                      {candidateProgramme?.programme?.programCode} <br />
                      {candidateProgramme.programme?.name}
                    </p>
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
      <ProgramResult
        selectedCP={selectedCP as CandidateProgramme}
        programResultView={programResultView}
        setProgramResultView={setProgramResultView}
      />
    </>
  );
}
