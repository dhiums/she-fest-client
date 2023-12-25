"use client";
import {
  CandidateProgramme,
  CandidateWithPoint,
  Programme,
  TeamWithPoint,
  Zone,
} from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import ViewResult from "./ViewResult";

interface Props {
  zones: Zone[];
  results: Programme[];
  zone: string;
  topTeams: TeamWithPoint[];
  topCandidates: CandidateWithPoint[];
}
export default function Result(props: Props) {
  const router = useRouter();
  const [selectedZone, setSelectedZone] = useState<string>(
    props.zones[0]?.name as string
  );
  const [selectedProgram, setSelectedProgram] = useState<Programme>();
  const [resultView, setResultView] = useState<boolean>(false);
  const array = [1, 1, 1, 1];

  useEffect(() => {
    console.log(props.results);

    console.log(props.zone);

    localStorage.getItem("selectedZone")
      ? (setSelectedZone(localStorage.getItem("selectedZone") as string),
        router.push(`/result?zone=${selectedZone}`))
      : (localStorage.setItem("selectedZone", props.zones[0].name as string),
        setSelectedZone(localStorage.getItem("selectedZone") as string),
        router.push(`/result?zone=${selectedZone}`));
  }, [selectedZone]);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-screen items-center p-5">
        <div className="flex flex-col h-[90vh] min-w-[300px] rounded-3xl gap-4 p-3 ">
          <div className="flex justify-center mt-4">
            <p className=" text-4xl font-semibold">Zones</p>
          </div>
          <div className="flex w-full justify-center gap-4">
            {props.zones?.map((zone) => (
              <button
                onClick={() => {
                  setSelectedZone(zone?.name as string);
                  localStorage.setItem("selectedZone", zone?.name as string);
                }}
                className={`hover:bg-yellower transition-all duration-300  flex items-center gap-3 text-full px-3 py-1 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02] ${
                  selectedZone === zone?.name ? `bg-yellower` : `bg-yellow`
                }`}
              >
                {zone?.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 justify-evenly items-center overflow-y-auto">
            {props.topTeams?.length > 0 ? (
              props.topTeams.map((item, index) => (
                <div className="flex border hover:bg-ysmoke w-full p-4 transition-colors duration-300 rounded-lg">
                  <div className="flex flex-col w-3/6 gap-1">
                    <p className="font-bold text-lg">#0{index}</p>
                    <div className="flex items-end">
                      
                      <span className="font-bold text-4xl text-browner">
                        {item.totalPoint}
                      </span>
                      <span className="font-bold text-md">
                        ({(item.totalPercentage * 10000).toFixed(2)}%)
                      </span>
                    </div>
                    <p className="font-semibold text-xs">{item.teamName}</p>
                  </div>
                  <div className="flex flex-col justify-center w-3/6 text-xs font-semibold whitespace-nowrap gap-1">
                    {item.categoryWisePoint.map((cw) => (
                      <p>
                        <span className="bg-yellow px-2 rounded-full">
                          {cw.categoryName} : {cw.categoryPoint}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-2xl font-bold ">No Results Published.</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-3/4 h-[90vh] p-3">
          <div className="flex flex-wrap justify-center p-1 w-full gap-1 h-2/3">
            {props.results?.length > 0 ? (
              props.results?.map((program) => (
                <div
                  className="bg-yellow hover:bg-yellower transition-all duration-300 flex w-64 items-center gap-3 px-3 py-2 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.01] cursor-pointer"
                  onClick={() => {
                    setSelectedProgram(program);
                    setResultView(true);
                  }}
                >
                  <p>{program.programCode}</p>
                  <p>{program.name}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-2xl font-bold">No Results Published.</p>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:flex-row mt-8">
            <div>
              <p className="font-bold text-xl text-center">Aliya Toppers</p>
              <div className="flex flex-wrap p-3 overflow-x-scroll gap-2">
                {props.topCandidates?.filter(
                  (topper) => topper.categoryName == "Aliya"
                )?.length > 0 ? (
                  props.topCandidates
                    ?.filter((topper) => topper.categoryName == "Aliya")
                    ?.map((topper) => (
                      <div className="hover:bg-ysmoke p-3 border rounded-md w-full">
                        <p className="text-sm bg-yellow inline font-semibold p-1 rounded-md">{topper.chestNo}</p>
                        <p className="font-bold">{topper.candidateName}</p>
                        <p className="text-3xl font-bold">{topper.totalPoint} pts</p>
                        <p className="text-sm uppercase">{topper.categoryName} | {topper.teamName}</p>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-2xl font-bold text-primary">
                      No Results Published.
                    </p>

                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="font-bold text-xl text-center">
                Thanawiyya Toppers
              </p>
              <div className="flex flex-wrap gap-2 rounded-3xl p-3 overflow-x-scroll">
                {props.topCandidates?.filter(
                  (topper) => topper.categoryName == "Thanawiyya"
                )?.length > 0 ? (
                  props.topCandidates
                    ?.filter((topper) => topper.categoryName == "Thanawiyya")
                    .map((topper) => (
                      <div className="hover:bg-ysmoke p-3 border rounded-md w-full">
                        <p className="text-sm bg-yellow inline font-semibold p-1 rounded-md">{topper.chestNo}</p>
                        <p className="font-bold">{topper.candidateName}</p>
                        <p className="text-3xl font-bold">{topper.totalPoint} pts</p>
                        <p className="text-sm uppercase">{topper.categoryName} | {topper.teamName}</p>
                      </div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-2xl font-bold text-primary">
                      No Results Published.
                    </p>

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewResult
        selectedProgram={selectedProgram as Programme}
        resultView={resultView}
        setResultView={setResultView}
      />
    </>
  );
}
