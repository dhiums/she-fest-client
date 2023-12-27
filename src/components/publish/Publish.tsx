"use client";

import { CandidateProgramme, Programme, PublishResultsDocument, PublishResultsMutation, PublishResultsMutationVariables, Types, Zone } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  programs: Programme[];
  zones: Zone[];
  zone : string;
}

interface ToDownLoadData {
  sl: number | string;
  programCode: string;
  programmeName: string;
  category: string;
  position: number;
  grade: string;
  candidateChestNo: string;
  candidateName: string;
  candidateTeam: string;
  gradePoint: number;
  positionPoint: number;
  totalPoint: number;
  checkCode: string;
}

export default function Publish(props: Props) {
  const router = useRouter();
  const [toDownLoadData, setToDownLoadData] = useState<ToDownLoadData[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>(
    props.zones[0]?.name as string
  );
  // useEffect(() => {
  //   // change the program data to download data format

  //   let downloadData: ToDownLoadData[] = [];

  //   props.result?.forEach((programme, index) => {
  //     if (programme.resultPublished) {
  //       return;
  //     }
  //     programme.candidateProgramme?.sort(
  //       (a, b) => (b.point as number) - (a.point as number)
  //     );

  //     programme.candidateProgramme?.forEach((candidate, i) => {
  //       let sl = i == 0 ? index + 1 : "";
  //       let programName = i == 0 ? programme.name : "";
  //       let programCode = i == 0 ? programme.programCode : "";
  //       let category = i == 0 ? programme.category?.name : "";
  //       let gradePoint =
  //         programme.type == Types.Single
  //           ? candidate.grade?.pointSingle
  //           : programme.type == Types.Group
  //             ? candidate.grade?.pointGroup
  //             : programme.type == Types.House
  //               ? candidate.grade?.pointHouse
  //               : 0;
  //       let positionPoint =
  //         programme.type == Types.Single
  //           ? candidate.position?.pointSingle
  //           : programme.type == Types.Group
  //             ? candidate.position?.pointGroup
  //             : programme.type == Types.House
  //               ? candidate.position?.pointHouse
  //               : 0;

  //       let chestNo =
  //         programme.type == Types.House
  //           ? candidate.candidate?.chestNO?.slice(0, -2) + "00"
  //           : candidate.candidate?.chestNO;
  //       let candidateClass =
  //         programme.type == Types.Single ? candidate.candidate?.class : "-";
  //       let candidateName =
  //         programme.type == Types.Single
  //           ? candidate.candidate?.name
  //           : programme.type == Types.Group

  //             ? candidate.candidate?.name + " & Team"
  //             : programme.type == Types.House
  //               ? candidate.candidate?.team?.name
  //               : null;

  //       // if there no position or grade then not push

  //       if (candidate.position || candidate.grade) {
  //         downloadData.push({
  //           sl: sl,
  //           programCode: programCode as string,
  //           programmeName: programName as string,
  //           category: category as string,
  //           position: candidate.position?.value
  //             ? candidate.position?.value
  //             : ("" as any),
  //           grade: candidate.grade?.name
  //             ? candidate.grade?.name
  //             : ("" as string),
  //           candidateChestNo: chestNo as string,
  //           candidateName: candidateName as string,
  //           class: candidateClass as string,
  //           candidateTeam: candidate.candidate?.team?.name as string,

  //           gradePoint: gradePoint ? gradePoint : ("" as any),
  //           positionPoint: positionPoint ? positionPoint : ("" as any),
  //           totalPoint: candidate.point as number,
  //           checkCode: programme.programCode as string,
  //         });
  //       }
  //     });
  //   });

  //   setToDownLoadData(downloadData as ToDownLoadData[]);
  // }, []);

  const [selectedPrograms, setSelectedPrograms] = useState<Programme[]>([]);
  const [state, PublishResultExicute] = useMutation(PublishResultsDocument);

  useEffect(() => {
    // console.log(props.results);

    // console.log(props.zone);

    localStorage.getItem("selectedZone")
      ? (setSelectedZone(localStorage.getItem("selectedZone") as string),
        router.push(`/admin/publish?zone=${selectedZone}`))
      : (localStorage.setItem("selectedZone", props.zones[0].name as string),
        setSelectedZone(localStorage.getItem("selectedZone") as string),
        router.push(`/admin/publish?zone=${selectedZone}`));
  }, [selectedZone]);

  const handlePublish = async () => {
    console.log(selectedPrograms);
    const datas: OperationResult<
      PublishResultsMutation,
      PublishResultsMutationVariables
    > = await PublishResultExicute({
      programCodes: selectedPrograms.map((prg) => prg.programCode) as string[],
      zone: selectedZone
    });

    if (datas.data?.publishResults) {
      alert("Results Published");
    } else {
      alert("Error Occured");
    }
  };

  useEffect(() => {
    // change the program data to download data format

    let downloadData: ToDownLoadData[] = [];

    props.programs?.forEach((programme, index) => {
      // if (programme.resultPublished) {
      //   return;
      // }
      programme.candidateProgramme?.sort(
        (a, b) => (b.zonalpoint as number) - (a.zonalpoint as number)
      );

      programme.candidateProgramme?.filter((cp : CandidateProgramme)=> cp.candidate?.team?.zone?.name === props.zone).forEach((candidate, i) => {
        let sl = i == 0 ? index + 1 : "";
        let programName = i == 0 ? programme.name : "";
        let programCode = i == 0 ? programme.programCode : "";
        let category = i == 0 ? programme.category?.name : "";
        let gradePoint =
          programme.type == Types.Single
            ? candidate.zonalgrade?.pointSingle
            : programme.type == Types.Group
              ? candidate.zonalgrade?.pointGroup
              : programme.type == Types.House
                ? candidate.zonalgrade?.pointHouse
                : 0;
        let positionPoint =
          programme.type == Types.Single
            ? candidate.zonalposition?.pointSingle
            : programme.type == Types.Group
              ? candidate.zonalposition?.pointGroup
              : programme.type == Types.House
                ? candidate.zonalposition?.pointHouse
                : 0;

        let chestNo =
          programme.type == Types.House
            ? candidate.candidate?.chestNO?.slice(0, -2) + "00"
            : candidate.candidate?.chestNO;
        let candidateName =
          programme.type == Types.Single
            ? candidate.candidate?.name
            : programme.type == Types.Group

              ? candidate.candidate?.name + " & Team"
              : programme.type == Types.House
                ? candidate.candidate?.team?.name
                : null;

        // if there no position or grade then not push

        if (candidate.zonalposition || candidate.zonalgrade) {
          downloadData.push({
            sl: sl,
            programCode: programCode as string,
            programmeName: programName as string,
            category: category as string,
            position: candidate.zonalposition?.value
              ? candidate.zonalposition?.value
              : ("" as any),
            grade: candidate.zonalgrade?.name
              ? candidate.zonalgrade?.name
              : ("" as string),
            candidateChestNo: chestNo as string,
            candidateName: candidateName as string,
            candidateTeam: candidate.candidate?.team?.name as string,

            gradePoint: gradePoint ? gradePoint : ("" as any),
            positionPoint: positionPoint ? positionPoint : ("" as any),
            totalPoint: candidate.zonalpoint as number,
            checkCode: programme.programCode as string,
          });
        }
      });
    });

    setToDownLoadData(downloadData as ToDownLoadData[]);

  }, []);

  const handleDownload = async () => {
    try {
      const postData = {
        data: toDownLoadData,
        SelectedProgrammes: selectedPrograms.map((prg) => prg.programCode) as string[] ,
        zone : props.zone
      };
      // Make a POST request to the Excel API route
      const response = await fetch("/api/excel/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data
        },
        body: JSON.stringify(postData),
      });

      console.log(response);


      if (response.ok) {
        // Convert the response to a Blob and create a URL for downloading
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a download link and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.xlsx";
        a.click();


        // Clean up by revoking the URL

        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate Excel file.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="py-5">
      <div className="flex w-full justify-center gap-4">
            {props.zones?.map((zone) => (
              <button
                onClick={() => {
                  setSelectedZone(zone?.name as string);
                  localStorage.setItem("selectedZone", zone?.name as string);
                }}
                className={`hover:bg-oranger transition-all duration-300  flex items-center gap-3 text-full px-3 py-1 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02] ${
                  selectedZone === zone?.name ? `bg-oranger` : `bg-orange`
                }`}
              >
                {zone?.name}
              </button>
            ))}
          </div>
      <div className="flex justify-center items-center mt-5">
        <p className="text-xl font-semibold ">selected {selectedPrograms.length} programs to publish</p>
        <button className="
        bg-primary text-white px-3 py-1 rounded-lg ml-3
        "
          onClick={
            handleDownload
          }
        >
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
        {props.programs?.filter((prg =>
          (prg as any)[`published${selectedZone}`] != true &&
          (prg as any)[`entered${selectedZone}`] == true
          // prg.publishedD != true &&
          // prg.enteredA == true
        )).map((program, index) => (
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
            className={`w-72 bg-secondary p-6 rounded-xl cursor-pointer ${selectedPrograms.find(
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
