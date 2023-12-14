import { useGlobalContext } from "@/context/context";
import {
  AddCandidateProgrammeDocument,
  AddCandidateProgrammeMutation,
  AddCandidateProgrammeMutationVariables,
  Candidate,
  CandidateProgramme,
  Category,
  DeleteCandidateProgrammeDocument,
  DeleteCandidateProgrammeMutation,
  DeleteCandidateProgrammeMutationVariables,
  Programme,
  Roles,
  Types,
  Zone,
} from "@/gql/graphql";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  programs: Programme[];
  setPrograms: React.Dispatch<React.SetStateAction<Programme[]>>;
  categories: Category[];
  selected: Programme;
  setSelected: React.Dispatch<React.SetStateAction<Programme>>;
  candidates: Candidate[];
  zones: Zone[];
  candidateProgrammes: CandidateProgramme[];
  setCandidateProgrammes: React.Dispatch<
    React.SetStateAction<CandidateProgramme[]>
  >;
}

const ViewProgram = (props: Props) => {
  const [state, ViewProgramExecute] = useMutation(
    AddCandidateProgrammeDocument
  );
  const [status, deleteCPExicute] = useMutation(
    DeleteCandidateProgrammeDocument
  );
  const [candidateProgrammes, setCandidateProgrammes] = React.useState<
    CandidateProgramme[]
  >(props.selected?.candidateProgramme as CandidateProgramme[]);
  const [name, setName] = React.useState<string>("");
  const [chestNo, setChestNo] = React.useState<string>("");
  const [zone, setZone] = React.useState<string>("");
  const [toDeleteCP, setToDeleteCP] = React.useState<CandidateProgramme>();
  const [candidates, setCandidates] = React.useState<Candidate[]>(
    props.candidates
  );
  const [p, setP] = useState([
    ...Array(props.selected?.candidateCount as number),
  ]);
  const [error, setError] = React.useState<string>("");
  const [zones, setZones] = React.useState<Zone[]>(props.zones);
  let filteredCandidate = candidates?.find((candidate) => {
    return candidate?.chestNO?.toLowerCase() == chestNo.toLowerCase();
  });
  const router = useRouter();
  const { data, setData } = useGlobalContext();

  useEffect(() => {}, [props.selected]);

  const handleInputChange = (index: number, value: any) => {
    const updatedP = [...p];
    updatedP[index] = parseFloat(value); // You can parse the input value as needed
    setP(updatedP);
  };

  const HandleSubmit = async () => {
    try {
      let datas: OperationResult<
        AddCandidateProgrammeMutation,
        AddCandidateProgrammeMutationVariables
      >;

      if (
        props.selected.type == Types.Group ||
        props.selected.type == Types.House
      ) {
        datas = await ViewProgramExecute({
          programCode: props.selected?.programCode as string,
          chestNO: ("CMS" + p[0]) as string,
          candidatesOfProgramme: p.map((chestNO) => {
            return ("CMS" + chestNO) as string;
          }),
        });
      } else {
        datas = await ViewProgramExecute({
          chestNO: chestNo,
          programCode: props.selected?.programCode as string,
        });
      }

      if (datas.data?.createCandidateProgramme) {
        const fetching = await fetch("/api/programs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const fetchedProgrammes = await fetching.json();
        props.setPrograms(fetchedProgrammes);
        props.setSelected(
          fetchedProgrammes.find(
            (program: Programme) => program.id === props.selected?.id
          )
        );
        setCandidateProgrammes(
          props.selected?.candidateProgramme as CandidateProgramme[]
        );

        // Clear the input
        setChestNo("");
      } else {
        setError(datas.error?.message.replace("[GraphQL]", "") as string);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const HandleDelete = async (id: number) => {
    try {
      // Delete candidate from program
      const datas: OperationResult<
        DeleteCandidateProgrammeMutation,
        DeleteCandidateProgrammeMutationVariables
      > = await deleteCPExicute({
        id: id as number,
      });

      if (datas.data?.removeCandidateProgramme) {
        const fetching = await fetch("/api/programs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const fetchedProgrammes = await fetching.json();
        props.setPrograms(fetchedProgrammes);
        props.setSelected(
          fetchedProgrammes.find(
            (program: Programme) => program.id === props.selected?.id
          )
        );
        setCandidateProgrammes(
          props.selected?.candidateProgramme as CandidateProgramme[]
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.isView ? "block" : "hidden"
      } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center ">
        <p className="text-lg mt-3 font-bold text-primary">
          <span className="text-xl ">{props.selected?.programCode}</span>{" "}
          {props.selected?.name}
        </p>
        {(data.admin?.roles == Roles.Admin ||
          data.admin?.roles == Roles.Controller ||
          data?.roles == Roles.Controller) && (
          <>
            {
              <>
                <p className="text-lg mt-3 font-bold text-brown">Candidates</p>
                <div className="flex w-full gap-1">
                  <input
                    type="text"
                    className="w-3/5 border-2  border-brown rounded-md placeholder:text-sm py-2 px-3 my-2"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      setCandidateProgrammes(
                        props.selected?.candidateProgramme?.filter((cp) => {
                          return (
                            cp.candidate?.name
                              ?.toLowerCase()
                              .includes(name.toLowerCase()) ||
                            cp.candidate?.chestNO
                              ?.toLowerCase()
                              .includes(name.toLowerCase())
                          );
                        }) as CandidateProgramme[]
                      );
                    }}
                    placeholder={`Search by name or chest number..`}
                  />
                  <select
                    className="w-2/5 border-2  border-brown rounded-md placeholder:text-sm py-2 px-3 my-2"
                    value={zone}
                    onChange={(e) => {
                      setZone(e.target.value);

                      setCandidateProgrammes(
                        props.selected?.candidateProgramme?.filter((cp) => {
                          return cp.candidate?.team?.zone?.name
                            ?.toLowerCase()
                            .includes(zone.toLowerCase());
                        }) as CandidateProgramme[]
                      );
                    }}
                  >
                    <option value="" className="text-center">
                      Select Zone
                    </option>
                    {zones?.map((zone, index) => (
                      <option
                        className="text-center"
                        key={index}
                        value={zone.name as string}
                      >
                        {zone.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full   overflow-y-auto">
                  {candidateProgrammes?.map((cp) => {
                    return (
                      <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                        <p className="text-white font-black text-2xl bg-primary rounded-md  mx-auto">
                          {cp.candidate?.chestNO}{" "}
                        </p>
                        <p className="text-primary font-bold">
                          {cp.candidate?.name}
                        </p>
                        <p className="text-primary font-semibold">
                          {cp.candidate?.team?.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            }
          </>
        )}

        {data.roles == Roles.TeamManager && (
          <div>
            {props.selected?.candidateProgramme?.map((cp, i) => {
              if (cp.candidate?.team?.name == data.team?.name) {
                return (
                  <div
                    key={i}
                    className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between"
                  >
                    <p className="text-white font-black text-2xl bg-primary rounded-md     mx-auto">
                      {cp.candidate?.chestNO}{" "}
                    </p>
                    <p className="text-primary font-bold">
                      {props.selected.type == Types.Group ||
                      props.selected.type == Types.House
                        ? cp.candidate?.name + " & Team"
                        : cp.candidate?.name}
                    </p>
                    <p className="text-primary font-semibold">
                      {cp.candidate?.team?.name}
                    </p>
                    <button
                      onClick={async () => {
                        setToDeleteCP(cp);
                        await HandleDelete(cp.id as number);
                      }}
                      className="bg-white border border-dashed border-primary rounded-xl px-4 py-2 "
                    >
                      {status.fetching ? (
                        <div>
                          <div className="flex justify-center items-center">
                            <div className="flex justify-center items-center relative">
                              <div className="absolute animate-ping w-5 h-5 rounded-full bg-red-400 opacity-75"></div>
                              <div className="relative w-5 h-5 rounded-full bg-red-600"></div>
                            </div>
                          </div>
                        </div>
                      ) : (
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
                      )}
                    </button>
                  </div>
                );
              }
            })}
          </div>
        )}
        {data &&
          data.roles == Roles.TeamManager &&
          (props.selected?.candidateProgramme?.filter((cp) => {
            return cp.candidate?.team?.name == data.team?.name;
          }).length as any) <
            (props.selected?.type == Types.Group ||
            props.selected?.type == Types.House
              ? (props.selected?.groupCount as any)
              : (props.selected?.candidateCount as any)) && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                HandleSubmit();
              }}
              className={`w-full p-3 text-left`}
            >
              <p className="text-lg mt-3 font-bold text-primary text-center">
                Add Candidates
              </p>
              <p className="text-sm mt-3 font-bold text-primary">Chest No</p>
              {props.selected.type == Types.Group ||
              props.selected.type == Types.House ? (
                // map input as much as props.selected.candidateCount

                <div className="flex flex-col gap-2">
                  {[...Array(props.selected.candidateCount as number)].map(
                    (_, index) => {
                      return (
                        <>
                          <input
                            key={index}
                            type="number"
                            className="w-full border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
                            value={p[index]}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            placeholder={`Chest No ${index + 1}`}
                          />
                          <p>
                            {
                              props.candidates?.find((candidate) => {
                                return candidate.chestNO == "CMS" + p[index];
                              })?.name
                            }
                          </p>
                        </>
                      );
                    }
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  className="w-full border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
                  value={chestNo}
                  onChange={(e) => {
                    setChestNo(e.target.value);
                  }}
                  placeholder={`Chest No`}
                />
              )}
              <p className="text-sm mt-1 font-bold text-primary">
                {chestNo.length > 0
                  ? !filteredCandidate
                    ? "No candidates font"
                    : filteredCandidate?.name
                  : ""}
              </p>
              {/* error */}
              <p className="text-sm mt-1 font-bold text-red-600">{error}</p>
              <button className="w-full bg-primary text-white font-bold px-3 py-2 rounded-lg mt-3">
                Add Candidate
              </button>
            </form>
          )}
        <button
          className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg mt-3"
          onClick={() => {
            props.setIsView(false);
            console.log(data);
            // set chest no to empty
            setChestNo("");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewProgram;
