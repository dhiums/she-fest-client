import Download from "@/components/programs/Download";
import {
  Candidate,
  Category,
  GetAllCandidatesDocument,
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables,
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

export default async function page() {
  const { client } = getUrqlClient();
  const programmes = await client.query<
    GetAllProgrammesQuery,
    GetAllProgrammesQueryVariables
  >(GetAllProgrammesDocument, {
    api_key: API_KEY,
  });

  const candidates = await client.query<
    GetAllCandidatesQuery,
    GetAllCandidatesQueryVariables
  >(GetAllCandidatesDocument, {
    api_key: API_KEY,
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
        candidates={candidates.data?.candidates as Candidate[]}
        categories={categories.data?.categories as Category[]}
      />
    </>
  );
}
