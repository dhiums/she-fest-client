"use client";
import { Programme } from "@/gql/graphql";
import { useEffect } from "react";

interface Props {
  selectedProgram: Programme;
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ViewResult(props: Props) {
  useEffect(() => {
    console.log(props.isView);
  }, [props.isView]);
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
          props.isView ? "block" : "hidden"
        } `}
      >
        <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center">
          <div className="overflow-y-auto">
            {props.selectedProgram?.candidateProgramme?.map((cp) => (
              <>
                <p>{cp.candidate?.chestNO}</p>
                <p>{cp.candidate?.name}</p>
                <p>{cp.zonalposition?.name}</p>
                <p>{cp.zonalgrade?.name}</p>
                <p>-------------------</p>
              </>
            ))}
          </div>
          <button
            className="bg-primary text-white rounded-lg p-2"
            onClick={() => {
              props.setIsView(false);
              console.log(props.isView);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
