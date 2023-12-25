"use client";

import { Programme, PublishResultsDocument, PublishResultsMutation, PublishResultsMutationVariables } from "@/gql/graphql";
import { useState } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  programs: Programme[];
}
export default function Publish(props: Props) {
  const [selectedPrograms, setSelectedPrograms] = useState<Programme[]>([]);
  const [state, PublishResultExicute] = useMutation(PublishResultsDocument);


  const handlePublish = async () => {
    console.log(selectedPrograms);
    const datas: OperationResult<
    PublishResultsMutation,
    PublishResultsMutationVariables
  > = await PublishResultExicute({
    programCodes: selectedPrograms.map((prg) => prg.programCode) as string[],
    zone : "A"
  });

  if (datas.data?.publishResults) {
    alert("Results Published");
  } else {
    alert("Error Occured");
  }
  };


  return (
    <div className="py-5">
      <div className="flex justify-center items-center ">
        <p className="text-xl font-semibold ">selected {selectedPrograms.length} programs to publish</p>
        <button className="
        bg-primary text-white px-3 py-1 rounded-lg ml-3
        ">
          Download
        </button>
        <button
          onClick={handlePublish}
        className="
        bg-primary text-white px-3 py-1 rounded-lg ml-3
        ">
          Publish
        </button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        {props.programs?.filter((prg => prg.publishedA != true && prg.enteredA == true)).map((program, index) => (
          <div
            onClick={() => {
              selectedPrograms.find(
                (selectedProgram) => selectedProgram.id === program.id
              )
                ? setSelectedPrograms(
                    selectedPrograms.filter(
                      (selectedProgram) => selectedProgram.id !== program.id
                    )
                  )
                : setSelectedPrograms([
                    ...selectedPrograms,
                    program as Programme,
                  ]);
            }}
            className={`w-72 bg-secondary p-6 rounded-xl cursor-pointer ${
              selectedPrograms.find(
                (selectedProgram) => selectedProgram.id === program.id
              )
                ? `border-4`
                : `border`
            } border-brown`}
          >
            <div className="items-center justify-center flex flex-col gap-2">
              <p className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold">
                {program.programCode}
              </p>
              <p className="line-clamp-2 text-center">{program.name}</p>

              <div className="flex gap-1 flex-wrap justify-center items-center">
                <p className="px-2 py-1 bg-primary text-xs inline rounded-lg text-white font-semibold">
                  {program.category?.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
