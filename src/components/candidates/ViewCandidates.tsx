import { Candidate } from "@/gql/graphql";
import axios from "axios";
import React, { useEffect } from "react";

interface Props {
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Candidate;
  setSelected: React.Dispatch<React.SetStateAction<Candidate>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  registeredCandidatesCount: number;
  setRegisteredCandidatesCount: React.Dispatch<React.SetStateAction<number>>;
}

const ViewCandidates = (props: Props) => {


  const [file, setFile] = React.useState<File | null>(null);
  const [ready, setReady] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [iNeedFoodAndAccommodation, setINeedFoodAndAccommodation] = React.useState<boolean>(false);

  useEffect(() => {
    setFile(null);
    setReady(true);
    setIsLoading(false);
    setError("");
  }
  , [props.isView])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('chestNo', props.selected?.chestNO as string);
    formData.append('IamReady', ready.toString());
    formData.append('iNeedFoodAndAccommodation', iNeedFoodAndAccommodation.toString());

    axios.post('https://she-fest-api.vercel.app/candidates/avatar', formData , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res);
      setIsLoading(false);

      const selected = props.selected;
      selected.avatar = res.data.avatar || "avatar";
      selected.iamReady = ready;

      props.setSelected(selected);

      const candidates = props.candidates;
      const index = candidates.findIndex((c) => c.chestNO === props.selected.chestNO);
      candidates[index] = selected;

      props.setCandidates(candidates);

      const registered = candidates?.filter(
        (candidate) => candidate?.avatar != null && candidate.iamReady == true
      );

      props.setRegisteredCandidatesCount(registered?.length as number);


      setSuccess("Image uploaded successfully");
      setTimeout(() => {
        setSuccess("");
        props.setIsView(false);
      }, 5000);
    }
    ).catch((err) => {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
      setIsLoading(false);

      setTimeout(() => {
        setError("");
      }, 5000);
    })
    
  }


  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen max-h-[100vh] overflow-y-auto bg-black bg-opacity-50 flex justify-center  items-center  z-50 ${props.isView ? 'block' : 'hidden'
        } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[85vh] overflow-y-auto text-center ">
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

            <form className="border border-primary rounded-lg p-1 my-2 w-full justify-between" onSubmit={(e)=>{
              handleSubmit(e)
            }}>

                <div className="w-full flex items-start flex-col">
                  {/* please note */}
                  <p className="text-primary font-bold text-sm">Please note:</p>
                  {/* upload image less than i mb */}
                  <p className="text-primary  text-sm">1 -Upload the photo that has been taken in the last six months (less than 1 MB). </p>
                  {/* upload image less than i mb */}
                  <p className="text-primary  text-sm">2 -Photo of yourself wearing a HIJAB without NIQAB.</p>
                  {/* upload image less than i mb */}
                </div>

              {/* view image here in round shanpe at middle */}

              <div className="w-full flex items-center justify-center">
                <img src={
                  // if any file there show that file else show default image
                  file ? URL.createObjectURL(file) : props.selected?.avatar ? props.selected?.avatar : "/img/avatar.webp"
                } alt="" className="w-1/4 rounded-full" />
              </div>


                {/* i am ready for final */}
                <div className="flex w-full h-full items-center justify-center">
                  <input type="checkbox" defaultChecked   name="ready" id="ready"  onChange={()=>{
                    setReady(!ready);
                  }} />
                  <label htmlFor="ready" className="text-primary  text-sm font-bold pl-3"> {" "}I am ready for the She Fest Grand Finale</label>
                </div>
                  
                  {/* i need food and accommodation */} 
                  {/* <div className="flex w-full h-full items-center justify-center">
                  <input type="checkbox"    name="iNeedFoodAndAccommodation" id="iNeedFoodAndAccommodation"  onChange={()=>{
                    setINeedFoodAndAccommodation(!iNeedFoodAndAccommodation);
                  }} />
                  <label htmlFor="iNeedFoodAndAccommodation" className="text-primary  text-sm font-bold pl-3"> {" "}I need food and accommodation</label>
                </div> */}
              <input type="file" name="file" id="file" className="hidden" onChange={(e)=>{
                const file = e.target?.files && e.target?.files[0];
                setFile(file);
              }} />
              <label htmlFor="file" className="bg-primary text-white py-1 cursor-pointer px-2 rounded-md text-base ">Select Image</label>
              <input type="submit" value={` ${isLoading ? 'Loading' : 'Submit'} `} className="bg-primary text-white py-1 px-2 cursor-pointer rounded-md text-sm m-2" />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
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
