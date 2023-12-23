"use client";
import { CandidateProgramme, CandidateWithPoint, Programme, TeamWithPoint, Zone } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import ViewResult from "./ViewResult";

interface Props {
  zones: Zone[];
  results: Programme[];
  zone: string;
  topTeams : TeamWithPoint[]
  topCandidates : CandidateWithPoint[]
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
      <div className="flex w-full h-screen items-center p-5">
        {/* <div className="fixed inset-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-white bg-primary rounded-full p-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>
      </div> */}
        <div className="flex flex-col h-[90vh] bg-primary min-w-[300px] rounded-3xl gap-4 p-3 ">
          <div className="flex justify-center mt-4">
            <p className="text-white text-2xl font-semibold">Results</p>
          </div>
          <div className="flex w-full justify-evenly">
            {props.zones.map((zone) => (
              <button
                onClick={() => {
                  setSelectedZone(zone?.name as string);
                  localStorage.setItem("selectedZone", zone?.name as string);
                }}
                className={`w-10 h-10 rounded-full ${
                  selectedZone === zone?.name
                    ? `bg-white text-primary`
                    : `bg-primary text-white border-2 border-white border-dashed`
                }`}
              >
                {zone?.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 justify-evenly items-center overflow-y-auto">
            {
              props.topTeams.length > 0 ? props.topTeams.map((item , index) => (
                <div className="flex text-white w-full p-2  border-2 border-white border-dashed rounded-lg">
                  <div className="flex flex-col w-3/6 gap-1">
                    <p className="font-bold text-lg">#0{index}</p>
                    <div className="flex items-end"> <span className="font-bold text-4xl">{item.totalPoint}</span>  <span className="font-bold text-md">{item.totalPercentage}%</span> </div>
                    <p className="font-semibold text-xs">
                      {item.teamName}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center w-3/6 text-xs font-semibold whitespace-nowrap gap-1">
                    {
                      item.categoryWisePoint.map((cw)=>(
                        <p>
                          <span className="w-6 h-w-6 mr-1 rounded-full bg-white">
                            ㅤ
                          </span>
                          {cw.categoryName} : {cw.categoryPoint}
                        </p>
                      ))
                    }
                  </div>
                </div>
              ))

              : 
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-2xl font-bold text-white">No Results Published.</p>
              </div>
            }
          </div>
        </div>
        <div className="flex flex-col w-3/4 h-[90vh] border-2 border-primary mx-5 rounded-3xl p-3">
          {
            props.results?.length > 0  ? (props.results?.map((program) => (
              <div
                className="border-2 border-primary cursor-pointer"
                onClick={() => {
                  setSelectedProgram(program);
                  setResultView(true);
                }}
              >
                <p>{program.programCode}</p>
                <p>{program.name}</p>
                <p>------------</p>
              </div>
            ))) : 
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-2xl font-bold text-primary">No Results Published.</p>
              <p className="text-lg font-semibold text-primary">Please wait for the results to be published...</p>
            </div>
          }
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
