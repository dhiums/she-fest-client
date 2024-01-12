import Download from "@/components/programs/Download";
import {
  Candidate,
  Category,
  GetFinalSearchCandidatesDocument,
  GetFinalSearchCandidatesQuery,
  GetFinalSearchCandidatesQueryVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllFinalProgrammesDocument,
  GetAllFinalProgrammesQuery,
  GetAllFinalProgrammesQueryVariables,
  Programme,
  Mode,
  Modes,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({params , searchParams}: any) {
  const { client } = getUrqlClient();

  const team = searchParams.team;
  // console.log(team);
  

  const programmes = await client.query<
    GetAllFinalProgrammesQuery,
    GetAllFinalProgrammesQueryVariables
  >(GetAllFinalProgrammesDocument, {
    api_key: API_KEY,
  });

  const candidates = await client.query<
    GetFinalSearchCandidatesQuery,
    GetFinalSearchCandidatesQueryVariables
  >(GetFinalSearchCandidatesDocument, {
    chestNo:"",
    name:"",
    limit: 300,
    teamName: team,
  });

  // console.log(candidates);
  

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {
    api_key: API_KEY,
  });

  const finalprogrammes = programmes.data?.finalprogrammes?.filter((prg )=>{
    if(prg.mode == Modes.Stage){
      return prg;
    }else if(prg.name?.toLocaleUpperCase() == "CALLIGRAPHY".toLocaleUpperCase()){
      return prg;
    }
  })

  return (
    <>
      <Download
        teamName={team}
        programs={finalprogrammes as Programme[]}
        candidates={candidates.data?.searchFinalCandidates?.candidates as Candidate[]}
        categories={categories.data?.categories as Category[]}
      />
    </>
  );
}
