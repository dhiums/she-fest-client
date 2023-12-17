"use client";
import {
  Candidate,
  CandidateProgramme,
  Category,
  Programme,
  Roles,
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

interface Props {
  programmes: Programme[];
  categories: Category[];
  candidates: Candidate[];
  zones: Zone[];
}
function Programs(props: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [programs, setPrograms] = useState<Programme[]>(props.programmes);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
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
      // const fetching = await fetch("/api/programs", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const fetchedProgrammes = await fetching.json();
      // setPrograms(fetchedProgrammes);
      // setCandidateProgrammes(
      //   selected?.candidateProgramme as CandidateProgramme[]
      // );
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
            groupCount
            category {
              name
            }
            candidateProgramme{
              id
              candidate{
                chestNO
                name
                team{
                  name
                }
              }
            }
          }
        }`,
        })
        .then((res) => {
          console.log(res.data?.data?.programmes);
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
        return cp?.candidate?.team?.name == data.team?.name;
      }).length;
    });

    setTotalCompleted(completed.length);
  }, [programs, data.team?.name]);

  return (
    <>
      <div className="p-12 pt-0 lg:p-20">
        {/* card of dashboard to view the status of programs count */}
        <div className=" w-full flex items-center justify-center gap-4  ">
          <div className="line-clamp-2 border-2  p-3 my-2 border-primary flex items-center justify-center rounded-xl border-dashed ">
            <div className="bg-secondary rounded-xl p-6 flex flex-col gap-2 items-center justify-center">
              <p className="text-primary text-2xl font-semibold">
                Registration status
              </p>
              <p className="text-brown text-4xl font-bold">
                {totalCompleted + "/" + programs?.length}
              </p>
             {
                data.roles == Roles.TeamManager &&  <div
                className="flex items-center justify-center gap-1 text-center font-semibold text-lg bg-brown text-white px-2 py-1 rounded-lg cursor-pointer"
                onClick={() => {
                  router.push(`/admin/programs/download?team=${data.team?.name}`);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
</svg>

                <p> Candidate's List</p>
              </div>
             }
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
                  <div className="flex w-full justify-between">
                    <button
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
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
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
