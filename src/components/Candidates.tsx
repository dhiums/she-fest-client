"use client";
import { Candidate } from "@/gql/graphql";
import { useState } from "react";

interface Props {
  candidates: Candidate[];
}
export default function Candidates(props: Props) {
  const { candidates } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = candidates.filter((candidate) => {
    return (
      candidate?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <div className="p-12 pt-0 lg:p-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center font-extrabold text-3xl text-primary mb-3">
            Candidate Search
          </h1>
          <input
            type="text"
            placeholder="Search by CODE, Name, Dars Name, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-2/3 px-4 py-2 rounded-xl border-2 border-dashed border-primary"
          />

          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {filteredData.map((candidate, index) => (
              <div
                className="w-72 bg-secondary p-6 rounded-xl flex flex-col gap-2 items-start cursor-pointer"
                key={index}
                //   onClick={() => openPopup(item)}
              >
                <h1 className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold">
                  {candidate.chestNO}
                </h1>
                <p className="line-clamp-2 h-12">{candidate.name}</p>
              </div>
            ))}
          </div>
          {/* {selectedItem && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center">
              <div className="bg-white p-10 rounded-xl flex flex-col items-center max-w-[400px] text-center">
                <p className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold">
                  {selectedItem.code}
                </p>
                <p className="font-bold text-xl text-primary">
                  {selectedItem.name}
                </p>
                <p className="font-bold -mt-1 text-sm ">
                  {selectedItem.category} Category
                </p>

                <p className="text-sm mt-3 font-bold text-primary">Dars Name</p>
                <p className="font-bold -mt-1 mb-4">{selectedItem.darsname}</p>

                {selectedItem.stage1 ||
                selectedItem.stage2 ||
                selectedItem.stage3 ||
                selectedItem.groupstage1 ||
                selectedItem.groupstage2 ||
                selectedItem.groupstage3 ? (
                  <>
                    <p className="bg-primary text-sm text-white px-2 py-1 -mb-2 rounded-lg">
                      stage
                    </p>
                    <div className="border-2 border-dashed border-primary p-3 mb-2 rounded-xl text-center">
                      <p>{selectedItem.stage1}</p>
                      <p>{selectedItem.stage2}</p>
                      <p>{selectedItem.stage3}</p>
                      <p>{selectedItem.groupstage1}</p>
                      <p>{selectedItem.groupstage2}</p>
                      <p>{selectedItem.groupstage3}</p>
                    </div>
                  </>
                ) : null}

                {selectedItem.offstage1 ||
                selectedItem.offstage2 ||
                selectedItem.offstage3 ||
                selectedItem.groupoffstage ? (
                  <>
                    <p className="bg-primary text-sm text-white px-2 py-1 -mb-2 rounded-lg">
                      offstage
                    </p>
                    <div className="border-2 border-dashed border-primary p-3 mb-2 rounded-xl text-center">
                      <p>{selectedItem.offstage1}</p>
                      <p>{selectedItem.offstage2}</p>
                      <p>{selectedItem.offstage3}</p>
                      <p>{selectedItem.groupoffstage}</p>
                    </div>
                  </>
                ) : null}
                <p className="my-3 text-sm">for enquiries contact admin</p>
                <button
                  className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
