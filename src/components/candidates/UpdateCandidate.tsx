import {
  Candidate,
  Category,
  EditCandidateDocument,
  EditCandidateMutation,
  EditCandidateMutationVariables,
  Team,
} from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";
interface Props {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  selected: Candidate | null;
  categories: Category[];
  teams: Team[];
}
const UpdateCandidate = (props: Props) => {
  const [state, UpdateCandidateExecute] = useMutation(EditCandidateDocument);
  const [name, setName] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [chestNO, setChestNO] = React.useState<string>("");
  const [team, setTeam] = React.useState<string>("");

  const HandleSubmit = async () => {
    const datas: OperationResult<
      EditCandidateMutation,
      EditCandidateMutationVariables
    > = await UpdateCandidateExecute({
      id: props.selected?.id as number,
      name: name,
      category: category,
      chestNO: chestNO,
      team: team,
    });
    // console.log(datas);

    if (datas.data?.updateCandidate) {
      props.setCandidates([...props.candidates as Candidate[], datas.data.updateCandidate as Candidate]);
      props.setIsUpdate(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
        props.isUpdate ? 'block' : 'hidden'
      } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center max-w-[400px] text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleSubmit();
          }}
          className={`p-3 text-left`}
          >
          <p className="text-sm mt-3 font-bold text-brown">Chest No</p>
          <input
            type="text"
            className="border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={chestNO}
            onChange={(e) => setChestNO(e.target.value)}
            placeholder={`Chest Name`}
          />
          <p className="text-sm mt-3 font-bold text-brown">Name</p>
          <input
            type="text"
            className="border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Name`}
          />
          <p className="text-sm mt-3 font-bold text-brown">Category</p>
          <select
            className="border-2  border-brown rounded-md placeholder:text-sm p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {props.categories?.map((category, index) => (
              <option key={index} value={category.name as string}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-sm mt-3 font-bold text-brown">Team</p>
          <select
            className="border-2  border-brown rounded-md placeholder:text-sm p-2 w-full"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            <option value="">Select Team</option>
            {props.teams?.map((team, index) => (
              <option key={index} value={team.name as string}>
                {team.name}
              </option>
            ))}
          </select>
          <button className="w-full bg-brown text-white font-bold px-3 py-2 rounded-lg mt-3">
            Submit
          </button>
        </form>
        <button
          className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg"
          onClick={() => props.setIsUpdate(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateCandidate;
