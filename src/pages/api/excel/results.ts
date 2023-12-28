import { NextApiRequest, NextApiResponse } from 'next';
import ExcelJS from 'exceljs';
import { Readable } from 'stream';

export default async (req: NextApiRequest, res: NextApiResponse) => {


 const data : any = req.body.data ;
 const zone : any = req.body.zone ;
 const SelectedProgrammes : any = req.body.SelectedProgrammes ;
 console.log(SelectedProgrammes);
 
  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
  //   console.log(workbook);
    
    const worksheet = workbook.addWorksheet("Results");
    
    const makeCenter = (cellLetters: any) => {
      cellLetters.forEach((letter: any) => {
        for (let i = 1; i < 4; i++) {
          worksheet.getCell(letter + i).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell(letter + i).border = {
            top: { style: "thick" },
            left: { style: "thick" },
            bottom: { style: "thick" },
            right: { style: "thick" },
          };
          worksheet.getCell(letter + i).font= {
            bold: true
          }
        }
      });
    };


    worksheet.mergeCells("A1:L1");
    worksheet.mergeCells("A2:L2");
    worksheet.mergeCells("B3:D3");
    worksheet.mergeCells("E3:F3");
    worksheet.mergeCells("G3:I3");
    worksheet.mergeCells("J3:L3");
    const mainTitle = worksheet.getCell("A1");
    mainTitle.value = "SheFest'23-24";
    const resultTitle = worksheet.getCell("A2");
    resultTitle.value = `RESULTS  - ZONE ${zone}`;
    worksheet.getCell("B3").value = "Programs";
    worksheet.getCell("E3").value = "Results";
    worksheet.getCell("G3").value = "Candidate";
    worksheet.getCell("J3").value = "Score";
    makeCenter(["A", "B", "E", "G", "K"]);

    mainTitle.font = {
      size: 48,
      bold:true,
    };
    resultTitle.font = {
      size: 14,
      bold:true,
    };

    // Define the columns in the Excel sheet
    const headers = [
      "SL. NO",
      "Code",
      "Program",
      "Category",
      "Position",
      "Grade",
      "Chest No",
      "Name",
      "Institution",
      "Grade",
      "Position",
      "Total",
    ];
    const widths: any = {
      A: 6,
      B: 7,
      C: 25,
      D: 16,
      E: 8,
      F: 6,
      G: 18,
      H: 30,
      I: 45,
      J: 6,
      K: 8,
      L: 6,
    };

    Object.keys(widths).forEach((cell: any) => {
      const column = worksheet.getColumn(cell);
      column.width = widths[cell];
    });

    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell:any) => {
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



    const setBlackBackground = (
      worksheet: any,
      startCell: any,
      endCell: any,
      cellNumber: any
    ) => {
      for (let i = startCell.charCodeAt(0); i <= endCell.charCodeAt(0); i++) {
        const columnLetter = String.fromCharCode(i);
        const cellAddress = `${columnLetter}${cellNumber}`;
        const cell = worksheet.getCell(cellAddress);

        // Set a black background for the cell
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "000000" }, // Black background
        };
        cell.font = {
          color: { argb: "FFFFFF" }, // White text
        };
      }
    }

    var slno = 1
    data.forEach((item: any) => {

      console.log(item.programCode ,  item.checkCode);

      if (SelectedProgrammes.includes(item?.checkCode)) {
        
        const subRow = worksheet.addRow(Object.values(item));
        subRow.eachCell((cell:any, num:any) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          if (num == 1 && cell.value){
            cell.value = slno++;
          }
          if (num == 2 && cell.value) {
            console.log(cell.row);
            setBlackBackground(worksheet, "A", "L", cell.row);
          }
          if (num == 13) {
            cell.value = "";
            cell.border = {};
          }
        });
      }

    });

  

    // Generate the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Create a stream to generate the Excel file
    const stream = new Readable();
    stream.push(buffer);

    console.log(buffer);
    
    stream.push(null);

    // Set the response headers to indicate an Excel file download
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Pipe the stream to the response
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate Excel file.' });
  }
};