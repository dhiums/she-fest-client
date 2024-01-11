import { Candidate } from "@/gql/graphql";
import axios from "axios";
import React from "react";

interface Props {
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Candidate;
  setSelected: React.Dispatch<React.SetStateAction<Candidate>>;
}

const ViewCandidates = (props: Props) => {

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files&& e.target?.files[0];
    const formData = new FormData();
    formData.append('file', file as File);
    console.log(file);

    axios.post('http://localhost:4000/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full max-h-[100vh] overflow-y-auto bg-black bg-opacity-50 flex justify-center  items-center  ${props.isView ? 'block' : 'hidden'
        } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] overflow-y-auto text-center ">
        {/* <p className="text-xl font-bold text-primary">Candidate Details</p> */}

        {/* name */}

        <p className="text-primary font-bold text-base">{props.selected?.chestNO}</p>
        
        {/* chest no */}

        <p className="text-primary font-bold text-sm">{props.selected?.name}</p>

        {/* team */}

        <p className="text-primary text-sm">{props.selected?.team?.name}</p>
        
            {props.selected?.candidateProgrammes?.map((cp) => {
              return (
                <div className="border border-primary rounded-lg p-1 my-2 w-full justify-between">
                  <p className="text-white font-bold text-base bg-primary rounded-md  mx-auto">
                    {cp.programme?.programCode}
                  </p>
                  <p className="text-primary font-bold text-sm">{cp.programme?.name}</p>
                </div>
              );
            })}

            {/* form to register and image upload */}

            <form className="border border-primary rounded-lg p-1 my-2 w-full justify-between">

                <div className="w-full flex items-start flex-col">
                  {/* please note */}
                  <p className="text-primary font-bold text-sm">Please note:</p>
                  {/* upload image less than i mb */}
                  <p className="text-primary  text-sm">1 -Upload image less than 1 mb </p>
                  {/* upload image less than i mb */}
                  <p className="text-primary  text-sm">2 -Please submit a photo of yourself wearing a niqab.</p>
                  {/* upload image less than i mb */}
                </div>
                {/* i am ready for final */}
                <div className="flex w-full h-full items-center justify-center">
                  <input type="checkbox" name="ready" id="ready" />
                  <label htmlFor="ready" className="text-primary  text-sm font-bold pl-3"> {" "}I am Ready for Final Programs</label>
                </div>
              <input type="file" name="file" id="file" className="hidden" />
              <label htmlFor="file" className="bg-primary text-white py-1 px-2 rounded-md text-base ">Upload Image</label>
              <input type="submit" value="Submit" className="bg-primary text-white py-1 px-2 rounded-md text-sm m-2" />
            </form>

          <button
            className="bg-red-600 text-white py-1 px-2 rounded-md text-base"
            onClick={() => props.setIsView(false)}
          >
            Close
          </button>
        </div>
      </div>
  );
};

export default ViewCandidates;
