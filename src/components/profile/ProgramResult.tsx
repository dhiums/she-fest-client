import { Programme } from "@/gql/graphql";
import React from "react";

interface Props {
  selectedProgram: Programme;
  programResultView: boolean;
  setProgramResultView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProgramResult(props: Props) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.programResultView ? "block" : "hidden"
      } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center ">
        <p className="font-semibold text-2xl">{props.selectedProgram?.name}</p>
        {props.selectedProgram?.candidateProgramme && props.selectedProgram?.candidateProgramme?.zonalpoint > 0 ? (
          // props.selectedProgram?.resultEntered ?
          props.selectedProgram?.candidateProgramme?.map((cp) => (
            <>
              <p>{cp.zonalposition?.name}</p>
              <p>{cp.candidate?.name}</p>
            </>
          ))
        ) : (
          <p>Result Not Published</p>
        )}
        <button
          className="bg-primary text-white rounded-lg p-2"
          onClick={() => {
            props.setProgramResultView(false);
            console.log(props.programResultView);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
