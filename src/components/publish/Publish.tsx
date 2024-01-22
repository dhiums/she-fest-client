"use client";

import {
  CandidateProgramme,
  Programme,
  PublishResultsDocument,
  PublishResultsMutation,
  PublishResultsMutationVariables,
  Types,
  Zone,
} from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  programs: Programme[];
  zones: Zone[];
  zone: string;
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

  // useEffect(() => {
  //   // change the program data to download data format

  //   let downloadData: ToDownLoadData[] = [];

  //   props.programs?.forEach((programme, index) => {
  //     if (programme.resultPublished) {
  //       return;
  //     }
  //     programme.candidateProgramme?.sort(
  //       (a, b) => (b.finalpoint as number) - (a.finalpoint as number)
  //     );

  //     programme.candidateProgramme?.forEach((candidate, i) => {
  //       let sl = i == 0 ? index + 1 : "";
  //       let programName = i == 0 ? programme.name : "";
  //       let programCode = i == 0 ? programme.programCode : "";
  //       let category = i == 0 ? programme.category?.name : "";
  //       let gradePoint =
  //         programme.type == Types.Single
  //           ? candidate.finalgrade?.pointSingle
  //           : programme.type == Types.Group
  //             ? candidate.finalgrade?.pointGroup
  //             : programme.type == Types.House
  //               ? candidate.finalgrade?.pointHouse
  //               : 0;
  //       let positionPoint =
  //         programme.type == Types.Single
  //           ? candidate.finalposition?.pointSingle
  //           : programme.type == Types.Group
  //             ? candidate.finalposition?.pointGroup
  //             : programme.type == Types.House
  //               ? candidate.finalposition?.pointHouse
  //               : 0;

  //       let chestNo =
  //         programme.type == Types.House
  //           ? candidate.candidate?.chestNO?.slice(0, -2) + "00"
  //           : candidate.candidate?.chestNO;
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

  // useEffect(() => {
  //   // console.log(props.results);

  //   // console.log(props.zone);

  //   localStorage.getItem("selectedZone")
  //     ? (setSelectedZone(localStorage.getItem("selectedZone") as string),
  //       router.push(`/admin/publish?zone=${selectedZone}`))
  //     : (localStorage.setItem("selectedZone", props.zones[0].name as string),
  //       setSelectedZone(localStorage.getItem("selectedZone") as string),
  //       router.push(`/admin/publish?zone=${selectedZone}`));
  // }, [selectedZone]);

  const handlePublish = async () => {
    console.log(selectedPrograms);
    const datas: OperationResult<
      PublishResultsMutation,
      PublishResultsMutationVariables
    > = await PublishResultExicute({
      programCodes: selectedPrograms.map((prg) => prg.programCode) as string[]
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
      console.log(programme.name);

      // console.log(programme);
      
      // if (programme.resultPublished) {
      //   return;
      // }
      programme.candidateProgramme?.sort(
        (a, b) => (b.finalpoint as number) - (a.finalpoint as number)
      );

      if(programme.type != Types.House){
        
        programme.candidateProgramme
        ?.forEach((candidate, i) => {
          let sl = i == 0 ? index + 1 : "";
          let programName = i == 0 ? programme.name : "";
          let programCode = i == 0 ? programme.programCode : "";
          let category = i == 0 ? programme.category?.name : "";
          let gradePoint =
            programme.type == Types.Single
              ? candidate.finalgrade?.pointSingle
              : programme.type == Types.Group
              ? candidate.finalgrade?.pointGroup
              : programme.type == Types.House
              ? candidate.finalgrade?.pointHouse
              : 0;
          let positionPoint =
            programme.type == Types.Single
              ? candidate.finalposition?.pointSingle
              : programme.type == Types.Group
              ? candidate.finalposition?.pointGroup
              : programme.type == Types.House
              ? candidate.finalposition?.pointHouse
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

          if (candidate.finalposition || candidate.finalgrade) {
            downloadData.push({
              sl: sl,
              programCode: programCode as string,
              programmeName: programName as string,
              category: category as string,
              position: candidate.finalposition?.value
                ? candidate.finalposition?.value
                : ("" as any),
              grade: candidate.finalgrade?.name
                ? candidate.finalgrade?.name
                : ("" as string),
              candidateChestNo: chestNo as string,
              candidateName: candidateName as string,
              candidateTeam: candidate.candidate?.team?.name as string,

              gradePoint: gradePoint ? gradePoint : ("" as any),
              positionPoint: positionPoint ? positionPoint : ("" as any),
              totalPoint: candidate.finalpoint as number,
              checkCode: programme.programCode as string,
            });
          }
        });

      }else{
        console.log(programme);
        
        programme.candidateProgramme
        ?.forEach((candidate, i) => {
          
          candidate?.candidatesOfGroup?.forEach((cgp ,ind) => {

            let sl = i == 0 && ind == 0 ? index + 1 : "";
          let programName = i == 0 && ind == 0 ? programme.name : "";
          let programCode = i == 0 && ind == 0 ? programme.programCode : "";
          let category = i == 0 && ind == 0 ? programme.category?.name : "";
          let gradePoint =
            programme.type == Types.Single
              ? candidate.finalgrade?.pointSingle
              : programme.type == Types.Group
              ? candidate.finalgrade?.pointGroup
              : programme.type == Types.House
              ? candidate.finalgrade?.pointHouse
              : 0;
          let positionPoint =
            programme.type == Types.Single
              ? candidate.finalposition?.pointSingle
              : programme.type == Types.Group
              ? candidate.finalposition?.pointGroup
              : programme.type == Types.House
              ? candidate.finalposition?.pointHouse
              : 0;

          let chestNo = cgp?.chestNO;
          let candidateName = cgp?.name;

          // if there no position or grade then not push

          if (candidate.finalposition || candidate.finalgrade) {
            downloadData.push({
              sl: sl,
              programCode: programCode as string,
              programmeName: programName as string,
              category: category as string,
              position: candidate.finalposition?.value
                ? candidate.finalposition?.value
                : ("" as any),
              grade: candidate.finalgrade?.name
                ? candidate.finalgrade?.name
                : ("" as string),
              candidateChestNo: chestNo as string,
              candidateName: candidateName as string,
              candidateTeam: candidate.candidate?.team?.name as string,

              gradePoint: gradePoint ? gradePoint : ("" as any),
              positionPoint: positionPoint ? positionPoint : ("" as any),
              totalPoint: candidate.finalpoint as number,
              checkCode: programme.programCode as string,
            });
          }
        
          });

          });

      }

     
       

    });

    console.log(props.programs);
    

    setToDownLoadData(downloadData as ToDownLoadData[]);
  }, []);

  const handleDownload = async () => {
    console.log(toDownLoadData);
    
    try {
      const postData = {
        data: toDownLoadData,
        SelectedProgrammes: selectedPrograms.map(
          (prg) => prg.programCode
        ) as string[],
        zone: props.zone,
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
        a.download = "results.xlsx";
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

  // const findResultPublishedProgrammesByZone = async () => {
  //   try {
  //     const programmes = selectedPrograms;

  //     // find all teams of this zone and total thier zonalpoint

  //     //  create object of all teams with zone name and team name

  //     interface CategoryWisePoint {
  //       categoryName: string;
  //       categoryPoint: number;
  //     }
  //     interface teamWithPoint {
  //       totalPercentage: number;
  //       teamName: string;
  //       zoneName: string;
  //       totalPoint: number;
  //       categoryWisePoint: CategoryWisePoint[];
  //     }

  //     interface candidateWithPoint {
  //       candidateName: string;
  //       teamName: string;
  //       zoneName: string;
  //       totalPoint: number;
  //       categoryName: string;
  //       chestNo: string;
  //     }

  //     const teamsOfZone = selectedPrograms?.map((programme) => {
  //       return programme.candidateProgramme
  //         ?.filter(
  //           (cp: CandidateProgramme) =>
  //             cp.candidate?.team?.zone?.name === props.zone
  //         )
  //         .map((candidate: CandidateProgramme) => {
  //           return {
  //             name: candidate?.candidate?.team?.name,
  //             zone: candidate?.candidate?.team?.zone,
  //             isDegreeHave: candidate?.candidate?.team?.isDegreeHave,
  //           };
  //         });
  //     });
  //     const categories = Array.from(
  //       new Set(selectedPrograms?.map((programme) => programme?.category?.name))
  //     ).map((name) => ({ name }));
  //     console.log(categories);

  //     const teamsWithPoint: teamWithPoint[] = [];

  //     // looping the teams

  //     (teamsOfZone[0] as any).forEach((team: any) => {
  //       const teamWithPoint: teamWithPoint = {
  //         totalPercentage: 0,
  //         teamName: team.name,
  //         zoneName: team.zone.name,
  //         totalPoint: 0,
  //         categoryWisePoint: categories.map((category: any) => {
  //           return {
  //             categoryName: category.name,
  //             categoryPoint: 0,
  //           };
  //         }),
  //       };

  //       //   // looping the programmes

  //       programmes?.forEach((programme) => {
  //         programme?.candidateProgramme?.forEach((cp) => {
  //           if (cp.candidate?.team?.name === team.name) {
  //             teamWithPoint.totalPoint += cp.zonalpoint as number;
  //             if (team.isDegreeHave) {
  //               teamWithPoint.totalPercentage =
  //                 teamWithPoint.totalPoint / 418 / 100;
  //             } else {
  //               teamWithPoint.totalPercentage =
  //                 teamWithPoint.totalPoint / 242 / 100;
  //             }

  //             teamWithPoint.categoryWisePoint.forEach((categoryWisePoint) => {
  //               if (
  //                 categoryWisePoint.categoryName === programme?.category?.name
  //               ) {
  //                 categoryWisePoint.categoryPoint += cp.zonalpoint as number;
  //               }
  //             });
  //           }
  //         });
  //       });

  //       teamsWithPoint.push(teamWithPoint);
  //     });

  //     teamsWithPoint.sort((a, b) => {
  //       return b.totalPercentage - a.totalPercentage;
  //     });

  //     // finding top 5 candidates

  //     const topperCandidates: candidateWithPoint[] = [];

  //     programmes?.forEach((programme) => {
  //       if ((programme.type as string) == Type.Single) {
  //         programme?.candidateProgramme?.forEach((cp) => {
  //           // checking is candidate already in the topperCandidates array
  //           const isCandidateExist = topperCandidates.some(
  //             (candidate) => candidate.chestNo == cp?.candidate?.chestNO
  //           );

  //           if (isCandidateExist) {
  //             // add the point to the candidate
  //             topperCandidates.forEach((candidate) => {
  //               if (candidate.chestNo === cp?.candidate?.chestNO) {
  //                 candidate.totalPoint += cp?.zonalpoint as number;
  //               }
  //             });
  //           } else {
  //             const candidateWithPoint: candidateWithPoint = {
  //               candidateName: cp?.candidate?.name as string,
  //               teamName: cp?.candidate?.team?.name as string,
  //               zoneName: cp?.candidate?.team?.zone?.name as string,
  //               totalPoint: cp.zonalpoint as number,
  //               categoryName: programme?.category?.name as string,
  //               chestNo: cp?.candidate?.chestNO as string,
  //             };

  //             topperCandidates.push(candidateWithPoint);
  //           }
  //         });
  //       }
  //     });

  //     topperCandidates.sort((a, b) => {
  //       return b.totalPoint - a.totalPoint;
  //     });

  //     // taking top 5 candidates from a category on topperCandidates

  //     const top5Candidates: candidateWithPoint[] = [];

  //     categories.forEach((category: any) => {
  //       let count = 0;
  //       topperCandidates.forEach((candidate) => {
  //         if (candidate.categoryName === category?.name && count < 5) {
  //           top5Candidates.push(candidate);
  //           count++;
  //         }
  //       });
  //     });

  //     console.log(top5Candidates);

  //     return {
  //       programmes: programmes,
  //       topTeams: teamsWithPoint,
  //       topCandidates: top5Candidates,
  //     };
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className="py-5">
      <div className="flex w-full justify-center gap-4">
        {/* {props.zones?.map((zone) => (
          // <button
          //   onClick={() => {
          //     setSelectedZone(zone?.name as string);
          //     localStorage.setItem("selectedZone", zone?.name as string);
          //   }}
          //   className={`hover:bg-oranger transition-all duration-300  flex items-center gap-3 text-full px-3 py-1 border-black shadow-md border-2 rounded-xl font-semibold hover:scale-[1.02] ${
          //     selectedZone === zone?.name ? `bg-oranger` : `bg-orange`
          //   }`}
          // >
          //   {zone?.name}
          // </button>
        ))} */}
      </div>
      <div className="flex justify-center items-center mt-5">
        <p className="text-xl font-semibold ">
          selected {selectedPrograms.length} programs to publish
        </p>
        <button
          className="
        bg-primary text-white px-3 py-1 rounded-lg ml-3
        "
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          onClick={handlePublish}
          className="
        bg-primary text-white px-3 py-1 rounded-lg ml-3
        "
        >
          Publish
        </button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        {props.programs
          ?.filter(
            (prg) =>
              (prg as any)[`publishedFinal`] != true &&
              (prg as any)[`enteredFinal`] == true 
            // prg.publishedD != true &&
            // prg.enteredA == true
          )
          .map((program, index) => (
            <div
              onClick={async () => {
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
                // const newdata = await findResultPublishedProgrammesByZone();
                // console.log(newdata);
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
