import Download from "@/components/programs/Download";
import {
  Candidate,
  Category,
  GetSearchCandidatesDocument,
  GetSearchCandidatesQuery,
  GetSearchCandidatesQueryVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllProgrammesDocument,
  GetAllProgrammesQuery,
  GetAllProgrammesQueryVariables,
  Programme,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({context}: any) {
  const { client } = getUrqlClient();

  const team = context.team;

  const programmes = await client.query<
    GetAllProgrammesQuery,
    GetAllProgrammesQueryVariables
  >(GetAllProgrammesDocument, {
    api_key: API_KEY,
  });

  const candidates = await client.query<
    GetSearchCandidatesQuery,
    GetSearchCandidatesQueryVariables
  >(GetSearchCandidatesDocument, {
    chestNo:" ",
    name:" ",
    limit: 260,
    teamName: team,
  });

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {
    api_key: API_KEY,
  });

  return (
    <>
      <Download
        programs={programmes.data?.programmes as Programme[]}
        candidates={candidates.data?.searchCandidates?.candidates as Candidate[]}
        categories={categories.data?.categories as Category[]}
      />
    </>
  );
}
