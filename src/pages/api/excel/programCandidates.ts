// pages/api/colleges.ts

import { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";
import { Readable } from "stream";
import { Candidate, CandidateProgramme } from "@/gql/graphql";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const zone: any = req.body.zone;
  const program: any = req.body.program;

  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(`Program List`);

    sheet.mergeCells("A1:D1");
    sheet.mergeCells("A2:D2");
    const mainTitle = sheet.getCell("A1");
    const programTitle = sheet.getCell("A2");
    mainTitle.value = "SHE FEST";
    mainTitle.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    mainTitle.border = {
      top: { style: "thick" },
      left: { style: "thick" },
      bottom: { style: "thick" },
      right: { style: "thick" },
    };
    mainTitle.font = {
      size: 48,
      bold:true,
    };
    
    programTitle.value = `${program.programCode}-${program.name}-${program.category.name}-${zone}`
    programTitle.alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    programTitle.border = {
      top: { style: "thick" },
      left: { style: "thick" },
      bottom: { style: "thick" },
      right: { style: "thick" },
    };
    programTitle.font = {
      size: 14,
      bold:true,
    };


    const headers = ["Reg. No", "Name", "Team", "Remarks"];
    const widths: any = {
      A: 12,
      B: 20,
      C: 50,
      D: 10,
    };
    Object.keys(widths).forEach((cell: any) => {
      const column = sheet.getColumn(cell);
      column.width = widths[cell];
    });
    const headerRow = sheet.addRow(headers);
    headerRow.eachCell((cell: any) => {
      cell.border = {
        top: { style: "thick" },
        left: { style: "thick" },
        bottom: { style: "thick" },
        right: { style: "thick" },
      };
      cell.font = {
        bold: true,
      };
    });

    program.candidateProgramme?.filter((candidateProgram: CandidateProgramme) => candidateProgram.candidate?.team?.zone?.name === zone).map((candidateProgramme: CandidateProgramme) => {  
      const subRow = sheet.addRow([
        candidateProgramme?.candidate?.chestNO,
        candidateProgramme?.candidate?.name,
        candidateProgramme?.candidate?.team?.name,
        "",
      ]);
      subRow.eachCell((cell: any) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

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
    console.log(error);
    res.status(500).json({ error: "Failed to generate Excel file." });
  }
};
