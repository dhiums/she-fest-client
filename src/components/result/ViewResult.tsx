import { Programme } from "@/gql/graphql";
import React from "react";

interface Props {
  selectedProgram: Programme;
  resultView: boolean;
  setResultView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewResult(props: Props) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.resultView ? "block" : "hidden"
      } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center ">
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
