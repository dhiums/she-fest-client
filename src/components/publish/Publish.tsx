"use client";

import { Programme } from "@/gql/graphql";
import { useEffect, useState } from "react";


interface Props {
  programs: Programme[];
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
  class: string;
  candidateTeam: string;
  gradePoint: number;
  positionPoint: number;
  totalPoint: number;
  checkCode: string;
}

export default function Publish(props: Props) {
  const [toDownLoadData, setToDownLoadData] = useState<ToDownLoadData[]>([]);

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

  const newData = {
    "data": {
      "findResultEnteredProgrammesByZone": {
        "programmes": [
          {
            "id": 11,
            "name": "SPEECH MLM",
            "type": "SINGLE",
            "programCode": "TX2",
            "category": {
              "name": "Thanawiyya"
            },
            "candidateProgramme": [
              {
                "id": 146,
                "zonalpoint": 7,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 2,
                  "name": "Second"
                },
                "candidate": {
                  "name": "FATHIMATH HIRSHA KP",
                  "chestNO": "CMS227800",
                  "team": {
                    "name": "NISWA WOMENS COLLEGE, KOLAVAYAL",
                    "id": 284,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 148,
                "zonalpoint": 8,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 1,
                  "name": "First"
                },
                "candidate": {
                  "name": "HASEENA PP",
                  "chestNO": "CMS227020",
                  "team": {
                    "name": "ALWARDA WOMEN'S COLLEGE, KAITHAKKAD",
                    "id": 279,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 1015,
                "zonalpoint": 4,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 2,
                  "name": "B"
                },
                "zonalposition": {
                  "id": 3,
                  "name": "Third"
                },
                "candidate": {
                  "name": "MAJIDA. TK",
                  "chestNO": "CMS227831",
                  "team": {
                    "name": "AL FARABI GIRLS ACADEMY, VALAPATTANAM",
                    "id": 275,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 1522,
                "zonalpoint": 8,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 1,
                  "name": "First"
                },
                "candidate": {
                  "name": "FATHIMATH SUMAYYA",
                  "chestNO": "CMS227511",
                  "team": {
                    "name": "AFSAL-UL-ULAMA WOMEN'S COLLEGE, A K ROAD, BEKAL",
                    "id": 281,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 1561,
                "zonalpoint": 4,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 2,
                  "name": "B"
                },
                "zonalposition": {
                  "id": 3,
                  "name": "Third"
                },
                "candidate": {
                  "name": "FATHIMATH MAHNAZ",
                  "chestNO": "CMS238663",
                  "team": {
                    "name": "BEEVI KHADEEJA WOMEN'S COLLEGE , ULIYATHADUKA",
                    "id": 282,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2177,
                "zonalpoint": 3,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 2,
                  "name": "B"
                },
                "zonalposition": null,
                "candidate": {
                  "name": "FATHIMATH ZAKIYA",
                  "chestNO": "CMS228028",
                  "team": {
                    "name": "POSOAT JAMA-ATH MAHDIYYA WOMENS COLLEGE, POSOAT",
                    "id": 285,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2548,
                "zonalpoint": 3,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 2,
                  "name": "B"
                },
                "zonalposition": null,
                "candidate": {
                  "name": "NAFEESATH SAHLAH",
                  "chestNO": "CMS227664",
                  "team": {
                    "name": "DARUL HAMD SAHREEATH COLLEGE, HOSANGADI",
                    "id": 283,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2585,
                "zonalpoint": 7,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 2,
                  "name": "Second"
                },
                "candidate": {
                  "name": "SAHLA FATHIMA AM",
                  "chestNO": "CMS227701",
                  "team": {
                    "name": "AL HIDAYA ARABIC COLLEGE, TALIPARAMBA",
                    "id": 274,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2924,
                "zonalpoint": 3,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 2,
                  "name": "B"
                },
                "zonalposition": null,
                "candidate": {
                  "name": "FATHIMA NAJIYA C",
                  "chestNO": "CMS239048",
                  "team": {
                    "name": "CHM ARABIC COLLEGE, VARAM",
                    "id": 277,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              }
            ]
          },
          {
            "id": 12,
            "name": "SPEECH ENG",
            "type": "SINGLE",
            "programCode": "TX3",
            "category": {
              "name": "Thanawiyya"
            },
            "candidateProgramme": [
              {
                "id": 154,
                "zonalpoint": 7,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 2,
                  "name": "Second"
                },
                "candidate": {
                  "name": "ISMATH.KC",
                  "chestNO": "CMS227019",
                  "team": {
                    "name": "ALWARDA WOMEN'S COLLEGE, KAITHAKKAD",
                    "id": 279,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2182,
                "zonalpoint": 4,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 2,
                  "name": "B"
                },
                "zonalposition": {
                  "id": 3,
                  "name": "Third"
                },
                "candidate": {
                  "name": "MARIYAM HADIYA",
                  "chestNO": "CMS228034",
                  "team": {
                    "name": "POSOAT JAMA-ATH MAHDIYYA WOMENS COLLEGE, POSOAT",
                    "id": 285,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2592,
                "zonalpoint": 8,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 1,
                  "name": "First"
                },
                "candidate": {
                  "name": "THASNEEM C",
                  "chestNO": "CMS227723",
                  "team": {
                    "name": "AL HIDAYA ARABIC COLLEGE, TALIPARAMBA",
                    "id": 274,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              }
            ]
          },
          {
            "id": 30,
            "name": "SPEECH ARB",
            "type": "SINGLE",
            "programCode": "AX2",
            "category": {
              "name": "Aliya"
            },
            "candidateProgramme": [
              {
                "id": 670,
                "zonalpoint": 6,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 3,
                  "name": "Third"
                },
                "candidate": {
                  "name": "ZAINABA",
                  "chestNO": "CMS204498",
                  "team": {
                    "name": "ALWARDA WOMEN'S COLLEGE, KAITHAKKAD",
                    "id": 279,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 1072,
                "zonalpoint": 6,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 3,
                  "name": "Third"
                },
                "candidate": {
                  "name": "SAFIYATH. KV",
                  "chestNO": "CMS216787",
                  "team": {
                    "name": "AL FARABI GIRLS ACADEMY, VALAPATTANAM",
                    "id": 275,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 1628,
                "zonalpoint": 8,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 1,
                  "name": "First"
                },
                "candidate": {
                  "name": "MARIYAMATH THAHSEEN",
                  "chestNO": "CMS194185",
                  "team": {
                    "name": "BEEVI KHADEEJA WOMEN'S COLLEGE , ULIYATHADUKA",
                    "id": 282,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 1632,
                "zonalpoint": 5,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": null,
                "candidate": {
                  "name": "UMAIMATH",
                  "chestNO": "CMS192577",
                  "team": {
                    "name": "ZAINIYYA WOMEN'S ARABIC COLLEGE,PERUMPATTA",
                    "id": 278,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 1837,
                "zonalpoint": 5,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": null,
                "candidate": {
                  "name": "FATHIMATH FAHIZA.M",
                  "chestNO": "CMS205170",
                  "team": {
                    "name": "AFSAL-UL-ULAMA WOMEN'S COLLEGE, A K ROAD, BEKAL",
                    "id": 281,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2061,
                "zonalpoint": 5,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": null,
                "candidate": {
                  "name": "AYISHATH SHIFA",
                  "chestNO": "CMS216716",
                  "team": {
                    "name": "NISWA WOMENS COLLEGE, KOLAVAYAL",
                    "id": 284,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              },
              {
                "id": 2720,
                "zonalpoint": 7,
                "finalpoint": null,
                "finalgrade": null,
                "finalposition": null,
                "zonalgrade": {
                  "id": 1,
                  "name": "A"
                },
                "zonalposition": {
                  "id": 2,
                  "name": "Second"
                },
                "candidate": {
                  "name": "NAJIYA HAKEEM",
                  "chestNO": "CMS205514",
                  "team": {
                    "name": "AL HIDAYA ARABIC COLLEGE, TALIPARAMBA",
                    "id": 274,
                    "zone": {
                      "name": "A",
                      "id": 2
                    }
                  }
                }
              }
            ]
          }
        ],
        "topTeams": [],
        "topCandidates": [
          {
            "candidateName": "MARIYAMATH THAHSEEN",
            "chestNo": "CMS194185",
            "teamName": "BEEVI KHADEEJA WOMEN'S COLLEGE , ULIYATHADUKA",
            "zoneName": "A",
            "totalPoint": 8,
            "categoryName": "Aliya"
          },
          {
            "candidateName": "NAJIYA HAKEEM",
            "chestNo": "CMS205514",
            "teamName": "AL HIDAYA ARABIC COLLEGE, TALIPARAMBA",
            "zoneName": "A",
            "totalPoint": 7,
            "categoryName": "Aliya"
          },
          {
            "candidateName": "ZAINABA",
            "chestNo": "CMS204498",
            "teamName": "ALWARDA WOMEN'S COLLEGE, KAITHAKKAD",
            "zoneName": "A",
            "totalPoint": 6,
            "categoryName": "Aliya"
          },
          {
            "candidateName": "SAFIYATH. KV",
            "chestNo": "CMS216787",
            "teamName": "AL FARABI GIRLS ACADEMY, VALAPATTANAM",
            "zoneName": "A",
            "totalPoint": 6,
            "categoryName": "Aliya"
          },
          {
            "candidateName": "UMAIMATH",
            "chestNo": "CMS192577",
            "teamName": "ZAINIYYA WOMEN'S ARABIC COLLEGE,PERUMPATTA",
            "zoneName": "A",
            "totalPoint": 5,
            "categoryName": "Aliya"
          },
          {
            "candidateName": "HASEENA PP",
            "chestNo": "CMS227020",
            "teamName": "ALWARDA WOMEN'S COLLEGE, KAITHAKKAD",
            "zoneName": "A",
            "totalPoint": 8,
            "categoryName": "Thanawiyya"
          },
          {
            "candidateName": "FATHIMATH SUMAYYA",
            "chestNo": "CMS227511",
            "teamName": "AFSAL-UL-ULAMA WOMEN'S COLLEGE, A K ROAD, BEKAL",
            "zoneName": "A",
            "totalPoint": 8,
            "categoryName": "Thanawiyya"
          },
          {
            "candidateName": "THASNEEM C",
            "chestNo": "CMS227723",
            "teamName": "AL HIDAYA ARABIC COLLEGE, TALIPARAMBA",
            "zoneName": "A",
            "totalPoint": 8,
            "categoryName": "Thanawiyya"
          },
          {
            "candidateName": "FATHIMATH HIRSHA KP",
            "chestNo": "CMS227800",
            "teamName": "NISWA WOMENS COLLEGE, KOLAVAYAL",
            "zoneName": "A",
            "totalPoint": 7,
            "categoryName": "Thanawiyya"
          },
          {
            "candidateName": "SAHLA FATHIMA AM",
            "chestNo": "CMS227701",
            "teamName": "AL HIDAYA ARABIC COLLEGE, TALIPARAMBA",
            "zoneName": "A",
            "totalPoint": 7,
            "categoryName": "Thanawiyya"
          }
        ]
      }
    }
  }
  
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
