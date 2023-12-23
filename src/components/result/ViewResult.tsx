import { CandidateProgramme, Programme } from "@/gql/graphql";
import React, { useEffect, useState } from "react";

interface Props {
  selectedProgram: Programme;
  resultView: boolean;
  setResultView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewResult(props: Props) {
  const [sorted,setSorted] = useState<CandidateProgramme[]>(
    props.selectedProgram?.candidateProgramme?.sort((a : CandidateProgramme,b : CandidateProgramme)=>b?.zonalpoint as number - ( a?.zonalpoint  as number)
  ) as CandidateProgramme[])



  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.resultView ? "block" : "hidden"
      } `}
    >

     

      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center ">
      
      {
        sorted?.length > 0 ? sorted?.map((cp : CandidateProgramme)=>(
          <div className=" flex flex-col items-center justify-center border-2 rounded-md  border-black border-dashed">
          <p className="text-2xl font-semibold">{cp?.candidate?.name}</p>
          <p className="text-xl font-semibold">{cp?.candidate?.team?.name}</p>
          <div className="flex gap-3 ">
          <p className="text-xl font-semibold">{cp?.zonalpoint}</p> 
          <p className="text-xl font-semibold">{cp?.zonalposition?.name}</p> 
          <p className="text-xl font-semibold">{cp?.zonalgrade?.name}</p> 
          </div>
        </div>
        ))
        : 
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-2xl font-bold text-primary">No Results To view</p>
          <p className="text-lg font-semibold text-primary">Please wait for the results to be published...</p>
        </div>
      }


        <button
          className="bg-primary text-white rounded-lg p-2"
          onClick={() => {
            props.setResultView(false);
            console.log(props.resultView);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
