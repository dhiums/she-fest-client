import { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";
import { Readable } from "stream";
import { CandidateWithPoint, TeamWithPoint } from "@/gql/graphql";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const topTeams: TeamWithPoint[] = req.body.topTeams;
  const topCandidates: CandidateWithPoint[] = req.body.topCandidates;
  const zone = req.body.zone;
  console.log(topTeams, topCandidates);

  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    //   console.log(workbook);

    const worksheet = workbook.addWorksheet("Toppers");

    // main heading
    worksheet.addRow(["SHEFEST'23-24"]);
    worksheet.addRow([`ZONE - ${zone}`]);

    // all champions section
    worksheet.addRow(["CHAMPIONS"]);
    worksheet.addRow(["POSITION", "INSTITUITION", "POINTS"]);
    for (let i = 0; i < topTeams.length; i++) {
      if (i === 3) {
        break;
      }
      const positions: any = {
        1: "FIRST",
        2: "SECOND",
        3: "THIRD",
      };
      worksheet.addRow([
        positions[i + 1],
        topTeams[i]?.teamName,
        topTeams[i]?.totalPoint,
      ]);
    }

    // category wise champions section

    // convert topTeams array to an object by category wise points
    var topperTeams: any = {};
    // Iterate over each team in the data
    topTeams.forEach((team) => {
      // Iterate over each categoryWisePoint in the team
      team.categoryWisePoint.forEach((categoryPoint) => {
        const categoryName = categoryPoint.categoryName;
        // Initialize an array for the categoryName if not present
        if (!topperTeams[categoryName]) {
          topperTeams[categoryName] = [];
        }
        // Push the formatted data to the array
        topperTeams[categoryName].push({
          teamName: team.teamName,
          categoryName: categoryName,
          categoryPoint: categoryPoint.categoryPoint,
        });
      });
    });
    // Sort the category-wise points in the topperTeams object
    for (const category in topperTeams) {
      topperTeams[category].sort(
        (a: any, b: any) => b.categoryPoint - a.categoryPoint
      );
    }
    // Iterate through each category in the topperTeams object
    for (const category in topperTeams) {
      // Keep only the first 3 objects for each category
      topperTeams[category] = topperTeams[category].slice(0, 3);
    }
    // Convert topperTeams object to array
    topperTeams = Object.keys(topperTeams).map((categoryName) => ({
      [categoryName]: topperTeams[categoryName],
    }));
    console.log(topperTeams[1]);

    topperTeams.forEach((category: any) => {
      const categoryName = Object.keys(category)[0];
      const categoryToppers: any = Object.values(category)[0];
      worksheet.addRow([`${categoryName} CHAMPIONS`.toUpperCase()]);
      worksheet.addRow(["POSITION", "INSTITUITION", "POINTS"]);
      categoryToppers.forEach((team: any, index: any) => {
        const positions: any = {
          1: "FIRST",
          2: "SECOND",
          3: "THIRD",
        };
        worksheet.addRow([
          positions[index + 1],
          team?.teamName,
          team?.categoryPoint,
        ]);
      });
    });

    // toppers section
    worksheet.addRow(["TOPPERS"]);
    worksheet.addRow(["CATEGORY", "CANDIDATE - INSTITUITION", "POINTS"]);

    // get first topper from each category
    const categoryTopperMap = new Map();
    topCandidates.forEach((candidate) => {
      const { categoryName } = candidate;
      if (
        !categoryTopperMap.has(categoryName) ||
        categoryTopperMap.get(categoryName).totalPoint < candidate.totalPoint
      ) {
        categoryTopperMap.set(categoryName, candidate);
      }
    });
    const categoryToppers = Array.from(
      categoryTopperMap.values(),
      (topper) => topper
    );

    categoryToppers.forEach((candidate, index) => {
      worksheet.addRow([
        candidate?.categoryName,
        `${candidate?.candidateName} - ${candidate?.teamName}`,
        candidate?.totalPoint, // #A23104
      ]);
    });
    const findAndBold = (text: any, wordToBold: any) => {
      const index = text.indexOf(wordToBold);
      if (index !== -1) {
        const font = { bold: true };
        // cellA1.value = { richText: [{ text: text.slice(0, index) }, { text: wordToBold, font }, { text: text.slice(index + wordToBold.length) }] };
      }
    };

    // findAndBold(cellA1.text, textToBold);

    // const makeCenter = (cellLetters: any) => {
    //   cellLetters.forEach((letter: any) => {
    //     for (let i = 1; i < 4; i++) {
    //       worksheet.getCell(letter + i).alignment = {
    //         vertical: "middle",
    //         horizontal: "center",
    //       };
    //       worksheet.getCell(letter + i).border = {
    //         top: { style: "thick" },
    //         left: { style: "thick" },
    //         bottom: { style: "thick" },
    //         right: { style: "thick" },
    //       };
    //       worksheet.getCell(letter + i).font = {
    //         bold: true,
    //       };
    //     }
    //   });
    // };

    // worksheet.mergeCells("A1:L1");
    // worksheet.mergeCells("A2:L2");
    // worksheet.mergeCells("B3:D3");
    // worksheet.mergeCells("E3:F3");
    // worksheet.mergeCells("G3:I3");
    // worksheet.mergeCells("J3:L3");
    // const mainTitle = worksheet.getCell("A1");
    // mainTitle.value = "SheFest'23-24";
    // const resultTitle = worksheet.getCell("A2");
    // resultTitle.value = `RESULTS  - ZONE ${zone}`;
    // worksheet.getCell("B3").value = "Programs";
    // worksheet.getCell("E3").value = "Results";
    // worksheet.getCell("G3").value = "Candidate";
    // worksheet.getCell("J3").value = "Score";
    // makeCenter(["A", "B", "E", "G", "K"]);

    // mainTitle.font = {
    //   size: 48,
    //   bold: true,
    // };
    // resultTitle.font = {
    //   size: 14,
    //   bold: true,
    // };

    // // Define the columns in the Excel sheet
    // const headers = [
    //   "SL. NO",
    //   "Code",
    //   "Program",
    //   "Category",
    //   "Position",
    //   "Grade",
    //   "Chest No",
    //   "Name",
    //   "Institution",
    //   "Grade",
    //   "Position",
    //   "Total",
    // ];
    // const widths: any = {
    //   A: 7,
    //   B: 6,
    //   C: 25,
    //   D: 11,
    //   E: 8,
    //   F: 6,
    //   G: 11,
    //   H: 30,
    //   I: 45,
    //   J: 6,
    //   K: 8,
    //   L: 6,
    // };

    // Object.keys(widths).forEach((cell: any) => {
    //   const column = worksheet.getColumn(cell);
    //   column.width = widths[cell];
    // });

    // const headerRow = worksheet.addRow(headers);
    // headerRow.eachCell((cell: any) => {
    //   cell.border = {
    //     top: { style: "thick" },
    //     left: { style: "thick" },
    //     bottom: { style: "thick" },
    //     right: { style: "thick" },
    //   };
    //   cell.font = {
    //     bold: true,
    //   };
    // });

    // const setBlackBackground = (
    //   worksheet: any,
    //   startCell: any,
    //   endCell: any,
    //   cellNumber: any
    // ) => {
    //   for (let i = startCell.charCodeAt(0); i <= endCell.charCodeAt(0); i++) {
    //     const columnLetter = String.fromCharCode(i);
    //     const cellAddress = `${columnLetter}${cellNumber}`;
    //     const cell = worksheet.getCell(cellAddress);

    //     // Set a black background for the cell
    //     cell.fill = {
    //       type: "pattern",
    //       pattern: "solid",
    //       fgColor: { argb: "000000" }, // Black background
    //     };
    //     cell.font = {
    //       color: { argb: "FFFFFF" }, // White text
    //     };
    //   }
    // };

    // var slno = 1;
    // data.forEach((item: any) => {
    //   console.log(item.programCode, item.checkCode);

    //   if (SelectedProgrammes.includes(item?.checkCode)) {
    //     const subRow = worksheet.addRow(Object.values(item));
    //     subRow.eachCell((cell: any, num: any) => {
    //       cell.border = {
    //         top: { style: "thin" },
    //         left: { style: "thin" },
    //         bottom: { style: "thin" },
    //         right: { style: "thin" },
    //       };
    //       if (num == 1 && cell.value) {
    //         cell.value = slno++;
    //       }
    //       if (num == 2 && cell.value) {
    //         console.log(cell.row);
    //         setBlackBackground(worksheet, "A", "L", cell.row);
    //       }
    //       if (num == 13) {
    //         cell.value = "";
    //         cell.border = {};
    //       }
    //     });
    //   }
    // });

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a stream to generate the Excel file
    const stream = new Readable();
    stream.push(buffer);

    stream.push(null);

    // Set the response headers to indicate an Excel file download
    res.setHeader("Content-Disposition", 'attachment; filename="data.xlsx"');
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Pipe the stream to the response
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate Excel file." });
  }
};
