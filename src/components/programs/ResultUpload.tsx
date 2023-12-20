"use client";
import { CandidateProgramme, Programme } from "@/gql/graphql";
import React, { useState } from "react";

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
}
export default function ResultUpload(props: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.isResult ? "block" : "hidden"
      } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center">
        <p className="text-lg mt-3 font-bold text-primary">
          <span className="text-xl ">{props.selected?.programCode}</span>{" "}
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
        <div className="overflow-y-auto">
          {props?.candidateProgrammes?.map((candidateProgramme) => (
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
                  className="border-primary border-2 border-dashed rounded-xl px-4 py-2 text-primary font-semibold remove-arrow"
                  onClick={() => {}}
                >
                  <option value="null">NIL</option>
                  <option value="First">1st</option>
                  <option value="Second">2nd</option>
                  <option value="Third">3rd </option>
                </select>
                <select
                  className="border-primary border-2 border-dashed rounded-xl px-4 py-2 text-primary font-semibold remove-arrow"
                  onClick={() => {}}
                >
                  <option value="null">NIL</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg mt-3"
          onClick={() => {
            props.setIsResult(false);
            setSearchQuery("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
