"use client";
import { AddManualUploadDocument, AddManualUploadMutation, AddManualUploadMutationVariables, CandidateProgramme, Programme } from "@/gql/graphql";
import React, { useEffect, useState } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  isResult: boolean;
  setIsResult: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Programme;
  setSelected: React.Dispatch<React.SetStateAction<Programme>>;
  programmes: Programme[];
  setProgrammes: React.Dispatch<React.SetStateAction<Programme[]>>;
  candidateProgrammes: CandidateProgramme[];
  setCandidateProgrammes: React.Dispatch<
    React.SetStateAction<CandidateProgramme[]>
  >;
  zone: string;
}

interface toUploadFormModal {
  chestNo: string
  grade: string | null
  position: string | null
  zonal: boolean
}

export default function ResultUpload(props: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const [toUploadForm, setToUploadForm] = useState<[toUploadFormModal]>([] as unknown as [toUploadFormModal])
  const [zonalCandidates, setZonalCandidates] = useState<CandidateProgramme[]>(props?.candidateProgrammes
    ?.filter((cp) => cp.candidate?.team?.zone?.name === props.zone) as CandidateProgramme[])
  const [error , setError] = useState("")

  const [state, addManualUploadExecute] = useMutation(AddManualUploadDocument);

  useEffect(() => {
  if (props?.candidateProgrammes && props.zone) {
    const updatedForm = props.candidateProgrammes?.map(item => ({
        chestNo: item.candidate?.chestNO || '', // Ensure proper default value if chestNo is undefined
        grade: null,
        position: null,
        zonal: true
      }));

    // Update the state once after all transformations
    setToUploadForm(updatedForm as unknown as [toUploadFormModal]);
  }
}, [props.isResult, props.candidateProgrammes, props.zone]);


  const uploadResult = async () => {
    const data: OperationResult<AddManualUploadMutation, AddManualUploadMutationVariables> =
      await addManualUploadExecute({
        programmeCode: props.selected.programCode as string,
        input: toUploadForm
      });
    // console.log(data);
    if (data.data?.uploadResultManually) {
      let finalData = data.data?.uploadResultManually;
      let editedDate = props.programmes.map((data, i) => {
        if (data.id == props.selected.id) {
          return {
            ...data,
            resultEntered: true,
            anyIssue: finalData.anyIssue
          }
        }
        return data
      })

      props.setProgrammes(editedDate)
      props.setIsResult(false);
    } else {
      setError(data.error?.message as string)
      setTimeout(() => {
        setError("")
      }
        , 5000)
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.isResult ? "block" : "hidden"
      } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center">
        <p className="text-lg mt-3 font-bold text-primary">
          <span className="text-xl ">{props.selected?.programCode}</span>
          {props.selected?.name}
        </p>
        <p className="text-2xl mt-3 font-bold text-brown">Result Upload</p>
        <input
          type="text"
          className="w-full border-2  border-brown rounded-md placeholder:text-sm py-2 px-3 my-2"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);

            props.setCandidateProgrammes(
              props.selected?.candidateProgramme?.filter(
                (cp) =>
                  cp.candidate?.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  cp.candidate?.chestNO
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
              ) as CandidateProgramme[]
            );
          }}
          placeholder={`Search by name or chest number..`}
        />
        <p className="text-red-500 text-sm">{error}</p>
        <div className="overflow-y-auto">
          {props?.candidateProgrammes
            ?.map((candidateProgramme) => {
                const uploadData = toUploadForm.find((data) => data.chestNo == candidateProgramme.candidate?.chestNO)
                // if( uploadData && candidateProgramme.zonalgrade?.name){
                //   uploadData.grade = candidateProgramme.zonalgrade?.name
                // }  
                // if( uploadData && candidateProgramme.zonalposition?.name){
                //   uploadData.position = candidateProgramme.zonalposition?.name
                // }
              return (
                (
                  <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                    <p className="text-white font-black text-2xl bg-primary rounded-md  mx-auto">
                      {candidateProgramme?.candidate?.chestNO}
                    </p>
                    <p className="text-primary font-bold">
                      {candidateProgramme?.candidate?.name}
                    </p>
                    <p className="text-primary font-semibold">
                      {candidateProgramme?.candidate?.team?.name}
                    </p>
                    <div className="flex justify-center gap-3 mt-3">
                      <select
                      value={uploadData?.position || "null"}
                        className="border-primary border-2 border-dashed rounded-xl px-4 py-2 text-primary font-semibold remove-arrow"
                        onChange={(e) => {
                          let editedToUploadForm: any = toUploadForm.map((data) => {
                            if (data.chestNo == candidateProgramme.candidate?.chestNO) {
                              let target: string | null = e.target.value
                              if (target == "null") {
                                target = null
                              }
                              return {
                                ...data,
                                position: target
                              }
                            }
                            return data
                          })
                          // editedToUploadForm.position = e.target.value ;
                          setToUploadForm(editedToUploadForm)
    
                          // console.log(editedToUploadForm, toUploadForm);

    
                        }}

                      >
                        <option value="null">NIL</option>
                        <option value="First">1st</option>
                        <option value="Second">2nd</option>
                        <option value="Third">3rd </option>
                      </select>
                      <select
                        className="border-primary border-2 border-dashed rounded-xl px-4 py-2 text-primary font-semibold remove-arrow"
                       value={uploadData?.grade || "null"}
                        onChange={(e) => {
                          let editedToUploadForm: any = toUploadForm.map((data) => {
                            if (data.chestNo == candidateProgramme.candidate?.chestNO) {
                              let target: string | null = e.target.value
                              if (target == "null") {
                                target = null
                              }
                              return {
                                ...data,
                                grade: target
                              }
                            }
                            return data
                          })
                          // editedToUploadForm.position = e.target.value ;
                          setToUploadForm(editedToUploadForm)
    
                          // console.log(editedToUploadForm, toUploadForm);
    
                        }}
                      >
                        <option value="null">NIL</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                  </div>
                )
              )
            }
            )}
        </div>
        <div className="flex gap-4">
        <button
          className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg mt-3"
          onClick={() => {
            props.setIsResult(false);
            setSearchQuery("");
            setZonalCandidates([]);
            setToUploadForm([] as unknown as [toUploadFormModal])
          }}
        >
          Close
        </button>
        <button
          className="bg-green-700 text-white font-bold px-3 py-2 rounded-lg mt-3"
          onClick={() => {
            uploadResult()
          }}
        >
          {
            state.fetching ? "Uploading..." : "Upload"
          }
        </button>
        </div>
      </div>
    </div>
  );
}
