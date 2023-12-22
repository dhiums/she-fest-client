"use client";

import { Programme } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  programs: Programme[];
}
export default function Publish(props: Props) {
  const [selectedPrograms, setSelectedPrograms] = useState<Programme[]>([]);
  const programs = [
    {
      id: 10,
      name: "QUR’AN TALENT SHOW",
      programCode: "TX1",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 11,
      name: "SPEECH MLM",
      programCode: "TX2",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 12,
      name: "SPEECH ENG",
      programCode: "TX3",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 13,
      name: "SPEECH ARB",
      programCode: "TX4",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 14,
      name: "MADH SONG MLM",
      programCode: "TX5",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 15,
      name: "SONG ARB",
      programCode: "TX6",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 16,
      name: "WORD FIGHT ENG",
      programCode: "TX7",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 17,
      name: "WORD FIGHT ARB",
      programCode: "TX8",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 18,
      name: "FACE THE BOOK",
      programCode: "TX9",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 19,
      name: "ESSAY MLM",
      programCode: "TY10",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 20,
      name: "SHORT STORY MLM",
      programCode: "TY11",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 21,
      name: "SHORT STORY ENG",
      programCode: "TY12",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 22,
      name: "SHORT STORY ARB",
      programCode: "TY13",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 23,
      name: "POEM WRITING MLM",
      programCode: "TY14",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 24,
      name: "TRANSLATION ARB TO MLM",
      programCode: "TY15",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 25,
      name: "TRANSLATION ENG TO MLM",
      programCode: "TY16",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 26,
      name: "PENCIL DRAWING",
      programCode: "TY17",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 27,
      name: "CALLIGRAPHY",
      programCode: "TY18",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 28,
      name: "PAINTING",
      programCode: "TY19",
      category: {
        name: "Thanawiyya",
      },
    },
    {
      id: 29,
      name: "QUR’AN TALENT SHOW",
      programCode: "AX1",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 30,
      name: "SPEECH ARB",
      programCode: "AX2",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 31,
      name: "SPEECH ENG",
      programCode: "AX3",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 32,
      name: "EXTEMPORE SPEECH MLM",
      programCode: "AX4",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 33,
      name: "SONG MLM",
      programCode: "AX5",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 34,
      name: "SONG ARB",
      programCode: "AX6",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 35,
      name: "WORD FIGHT ARB",
      programCode: "AX7",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 36,
      name: "WORD FIGHT ENG",
      programCode: "AX8",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 37,
      name: "MOTIVATIONAL TALK",
      programCode: "AX9",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 38,
      name: "FACE THE BOOK",
      programCode: "AX10",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 39,
      name: "ESSAY MLM",
      programCode: "AY11",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 40,
      name: "ESSAY ARB",
      programCode: "AY12",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 41,
      name: "ESSAY ENG",
      programCode: "AY13",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 42,
      name: "SHORT STORY MLM",
      programCode: "AY14",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 43,
      name: "SHORT STORY ARB",
      programCode: "AY15",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 44,
      name: "SHORT STORY ENG",
      programCode: "AY16",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 45,
      name: "POEM WRITING MLM",
      programCode: "AY17",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 46,
      name: "TRANSLATION ARB TO MLM AND VICE VERSA",
      programCode: "AY18",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 47,
      name: "TRANSLATION ENG TO MLM AND VICE VERSA",
      programCode: "AY19",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 48,
      name: "PENCIL DRAWING",
      programCode: "AY20",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 49,
      name: "CALLIGRAPHY",
      programCode: "AY21",
      category: {
        name: "Aliya",
      },
    },
    {
      id: 50,
      name: "MISS GENIUS",
      programCode: "KX1",
      category: {
        name: "Kulliyya",
      },
    },
    {
      id: 51,
      name: "GROUP QUIZ",
      programCode: "KX2",
      category: {
        name: "Kulliyya",
      },
    },
    {
      id: 52,
      name: "ISHQ MAJLIS",
      programCode: "KX3",
      category: {
        name: "Kulliyya",
      },
    },
    {
      id: 53,
      name: "BURDA",
      programCode: "KX4",
      category: {
        name: "Kulliyya",
      },
    },
    {
      id: 54,
      name: "MAGAZINE",
      programCode: "KY5",
      category: {
        name: "Kulliyya",
      },
    },
    {
      id: 55,
      name: "INSTANT NEWSPAPER",
      programCode: "KY6",
      category: {
        name: "Kulliyya",
      },
    },
    {
      id: 56,
      name: "PAINTING",
      programCode: "AY22",
      category: {
        name: "Aliya",
      },
    },
  ];
  return (
    <div className="py-5">
      <div className="flex justify-center items-center ">
        <p className="text-xl font-semibold ">selected {selectedPrograms.length} programs to publish</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        {programs?.map((program, index) => (
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
