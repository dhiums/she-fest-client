import { CandidateProgramme, Programme } from "@/gql/graphql";
import React, { useEffect } from "react";

interface Props {
  selectedCP: CandidateProgramme;
  programResultView: boolean;
  setProgramResultView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProgramResult(props: Props) {

  useEffect(()=>{
   
   // console.log('====================================');
   // console.log(props.selectedCP);
   // console.log('====================================');
   
  })

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.programResultView ? "block" : "hidden"
      } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center ">
        <p className="font-semibold text-2xl">{props.selectedCP?.programme?.name}</p>
        {props?.selectedCP && (props.selectedCP?.zonalpoint as number) > 0  ? (
          // props.selectedProgram?.resultEntered ?
            <>
              <p>{props?.selectedCP?.zonalposition?.name}</p>
              <p>{props?.selectedCP?.zonalgrade?.name}</p>
            </>
        ) : props.selectedCP?.zonalpoint as number == 0 ? (
          <>
          <p>NIL</p>
          <p>NIL</p>
        </>
        ):(
          <p>Result Not Published</p>
        )}
        <button
          className="bg-primary text-white rounded-lg p-2"
          onClick={() => {
            props.setProgramResultView(false);
            // console.log(props.programResultView);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
