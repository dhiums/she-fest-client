"use client";
import {
  Candidate,
  CandidateProgramme,
  Category,
  Programme,
  Roles,
  Team,
  Types,
  Zone,
} from "@/gql/graphql";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import CreateProgram from "./CreateProgram";
import DeleteProgramme from "./DeleteProgram";
import ViewProgram from "./ViewProgram";
import { useGlobalContext } from "@/context/context";
import { useRouter } from "next/navigation";
import axios from "axios";
import ResultUpload from "./ResultUpload";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";

interface Props {
  programmes: Programme[];
  categories: Category[];
  candidates: Candidate[];
  team: Team[];
  zones: Zone[];
}
function Programs(props: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [programs, setPrograms] = useState<Programme[]>(props.programmes);
  const [zone, setZone] = useState<string>(props.zones[0]?.name as string);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [team, setTeam] = useState<string>("");
  const [selected, setSelected] = useState<Programme>();
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [view, setIsView] = useState(false);
  const [candidateProgrammes, setCandidateProgrammes] = useState<
    CandidateProgramme[]
  >(selected?.candidateProgramme as CandidateProgramme[]);
  const router = useRouter();
  const { data } = useGlobalContext();

  const filteredData = programs?.filter((program) => {
    return (
      program?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program?.programCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    (async () => {
      axios
        .post("https://she-fest-api.vercel.app/graphql", {
          query: `{
          programmes(api_key:"abc"){
           id
            name
            programCode
            type
            mode
            candidateCount
            enteredA
            enteredB
            enteredC
            enteredD
            enteredE
            publishedA
            publishedB
            publishedC
            publishedD
            publishedE
            groupCount
            category {
              name
            }
            candidateProgramme{
              id
              zonalpoint
              candidate{
                chestNO
                name
                team{
                  name
                  zone{
                    name
                  }
                }
              }
              zonalposition{
                id
                name
              }
              zonalgrade{
                id
                name
              }
            }
          }
        }`,
        })
        .then((res) => {
          // console.log(res.data?.data?.programmes);
          setPrograms(res.data?.data?.programmes);
          setCandidateProgrammes(
            selected?.candidateProgramme as CandidateProgramme[]
          );
        });
    })();
  }, [props.programmes, selected]);

  useEffect(() => {
    const completed = programs?.filter((program) => {
      return program?.candidateProgramme?.filter((cp) => {
        return cp?.candidate?.team?.name == data?.team?.name;
      }).length;
    });

    setTotalCompleted(completed?.length);
  }, [programs, data?.team?.name]);

  const downloadExcel = async (program: Programme) => {
    try {
      const postData = {
        zone,
        program,
      };
      // console.log(postData);

      // Make a POST request to the Excel API route
      const response = await fetch("/api/excel/programCandidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Convert the response to a Blob and create a URL for downloading
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a download link and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = `${program.name}-${program.programCode}-${zone}.xlsx`;
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

  const downloadJudgeForm = (programme: Programme) => {

    const doc = new jsPDF("portrait", "px", "a4");
    // Load Montserrat font
    doc.addFont(
      "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf",
      "Montserrat",
      "normal"
    );

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    programs?.map((program, index) => {
      doc.addPage("a4");
      const backgroundImageUrl =
        program.mode == "STAGE"
          ? "/img/judgement/stage.jpg"
          : "/img/judgement/non-stage.jpg";
      doc.addImage(backgroundImageUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
      doc.setFontSize(11);

      doc.text(`${program.programCode}`, 115, 160);
      doc.text(`${program.name}`, 115, 175);
      doc.text(`${program.category?.name}`, 315, 160);
      doc.text(`${zone}`, 315, 175);

      // text all candidates of the zone in the program

      program?.candidateProgramme
        ?.filter((cp) => cp.candidate?.team?.zone?.name == zone)
        .map((cp, index) => {
          // console.log(cp.candidate?.chestNO + " " + cp.candidate?.team?.zone?.name);
          // if(cp.candidate?.team?.zone?.name == zone){}
          program.mode == "STAGE"
            ? doc.text(`${cp.candidate?.chestNO}`, 70, 225 + index * 15.7)
            : doc.text(`${cp.candidate?.chestNO}`, 70, 220 + index * 11.93);
        });
    });

    doc.deletePage(1);

    const pdfBlob = doc.output("blob");
    var filename = "Judjement Form";
    saveAs(pdfBlob, `${filename}.pdf`);
  };

  return (
    <>
      <div className="p-12 pt-0 lg:p-20">
        {/* card of dashboard to view the status of programs count */}
        <div className=" w-full flex items-center justify-center gap-4  ">
          <div className="flex flex-col">
            <select
              className="w-full border-2  border-brown  border-dashed rounded-md placeholder:text-sm py-2 px-3 my-2 remove-arrow"
              value={zone}
              onChange={(e) => {
                setZone(e.target.value);
              }}
            >
              {props?.zones?.map((zone, index) => (
                <option
                  className="text-center"
                  key={index}
                  value={zone.name as string}
                >
                  {zone.name}
                </option>
              ))}
            </select>
            <div className="line-clamp-2 border-2  p-3 my-2 border-primary flex items-center justify-center rounded-xl border-dashed ">
              <div className="bg-secondary rounded-xl p-6 flex flex-col gap-2 items-center justify-center">
                <p className="text-primary text-2xl font-semibold">
                  Registration status
                </p>
                <p className="text-brown text-4xl font-bold">
                  {totalCompleted + "/" + programs?.length}
                </p>

                {/* drop down to select team */}

                {(data.roles == Roles.Controller ||
                  data.roles == Roles.Admin) && (
                  <div className="flex flex-col gap-2">
                    <p className="text-primary text-xl font-semibold text-center">
                      Select Team
                    </p>
                    <select
                      className="w-72 px-4 py-2 rounded-xl border-2 border-dashed border-brown"
                      onChange={(e) => {
                        setTeam(e.target.value);
                      }}
                    >
                      <option value="">Select Team</option>
                      {props.team?.map((team, index) => (
                        <option key={index} value={team?.name as string}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {data.roles == Roles.TeamManager && (
                  <div
                    className="flex items-center justify-center gap-1 text-center font-semibold text-lg bg-brown text-white px-2 py-1 rounded-lg cursor-pointer"
                    onClick={() => {
                      router.push(
                        `/admin/programs/download?team=${data.team?.name}`
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p> Candidate's List</p>
                  </div>
                )}

                {data.roles != Roles.TeamManager && (
                  <div
                    className="flex items-center justify-center gap-1 text-center font-semibold text-lg bg-brown text-white px-2 py-1 rounded-lg cursor-pointer"
                    onClick={() => {
                      router.push(`/admin/programs/download?team=${team}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p> Candidate's List</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col">
            <p className="text-center font-extrabold text-3xl text-brown mb-2">
              Program Search
            </p>
          </div>
          <div className="md:w-2/3 flex gap-2">
            <input
              type="text"
              placeholder="Search by name or program code.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-dashed border-brown"
            />
            {(data.roles == Roles.Controller || data.roles == Roles.Admin) && (
              <button
                className="bg-primary rounded-xl px-4 py-2 "
                onClick={() => {
                  setIsCreate(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {filteredData?.map((program, index) => (
              <div className="w-72 bg-secondary p-6 rounded-xl cursor-pointer border border-brown">
                <div
                  onClick={() => {
                    setSelected(program);
                    setIsView(true);
                  }}
                  className="items-center justify-center flex flex-col gap-2"
                >
                  <p className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold">
                    {program.programCode}
                  </p>
                  <p className="line-clamp-2 text-center">{program.name}</p>

                  <div className="flex gap-1 flex-wrap justify-center items-center">
                    <p className="px-2 py-1 bg-primary text-xs inline rounded-lg text-white font-semibold">
                      {program.category?.name}
                    </p>
                    <p className="px-2 py-1 bg-primary text-xs inline rounded-lg text-white font-semibold">
                      {program.type as string}
                    </p>
                    <p className="px-2 py-1 bg-primary text-xs inline rounded-lg text-white font-semibold">
                      {program.mode?.replace("_", " ") as string}
                    </p>
                  </div>
                  <p className="text-primary font-semibold">
                    {data.roles == Roles.TeamManager
                      ? program.type == Types.Single
                        ? program.candidateProgramme?.filter((cp) => {
                            return cp.candidate?.team?.name == data.team?.name;
                          }).length +
                          "/" +
                          program.candidateCount
                        : program.candidateProgramme?.filter((cp) => {
                            return cp.candidate?.team?.name == data.team?.name;
                          }).length +
                          "/" +
                          program.groupCount
                      : program.type == Types.Single
                      ? program.candidateProgramme?.length +
                        "/" +
                        (program.candidateCount as number) * 60
                      : program.candidateProgramme?.length +
                        "/" +
                        (program.groupCount as number) * 60}
                  </p>
                </div>
                {(data.roles == Roles.Controller ||
                  data.roles == Roles.Admin) && (
                  <div className="flex w-full justify-between mt-3">
                    {/* <button
                      onClick={() => {
                        setIsUpdate(true);
                        setSelected(program);
                      }}
                      className="bg-white border border-dashed border-primary rounded-xl px-4 py-2 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-brown"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setIsDelete(true);
                        setSelected(program);
                      }}
                      className="bg-white border border-dashed border-primary rounded-xl px-4 py-2 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button> */}
                    <button
                      className="bg-white border border-dashed border-primary rounded-xl px-4 py-2"
                      onClick={() => {
                        setSelected(program);
                        downloadExcel(program);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-brown"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </button>
                    <button
                      className="bg-white border border-dashed border-primary rounded-xl px-4 py-2"
                      onClick={() => {
                        downloadJudgeForm(program);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-brown"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </button>
                    <button
                      className="bg-white border border-dashed border-primary rounded-xl px-4 py-2"
                      onClick={() => {
                        setIsResult(true);
                        setSelected(program);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-brown"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                    <div>
                      Status
                      <div className="flex gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            (program as any)[`entered${zone}`]
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <div
                          className={`w-4 h-4 rounded-full ${
                            (program as any)[`published${zone}`]
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ResultUpload
        isResult={isResult}
        setIsResult={setIsResult}
        selected={selected as Programme}
        setSelected={setSelected as any}
        programmes={programs}
        setProgrammes={setPrograms}
        candidateProgrammes={candidateProgrammes}
        setCandidateProgrammes={setCandidateProgrammes}
        zone={zone as string}
      />
      <CreateProgram
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        categories={props.categories}
        setPrograms={setPrograms}
        programs={programs}
      />
      <ViewProgram
        isView={view}
        setIsView={setIsView}
        categories={props.categories}
        setPrograms={setPrograms}
        programs={programs}
        selected={selected as Programme}
        setSelected={setSelected as any}
        candidates={props.candidates}
        zones={props.zones}
        candidateProgrammes={candidateProgrammes} // Pass updated state
        setCandidateProgrammes={setCandidateProgrammes} // Pass update function
        zone={zone as string}
      />
      <DeleteProgramme
        programmes={programs}
        setProgrammes={setPrograms}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        selected={selected as Programme}
      />
    </>
  );
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(Programs);
