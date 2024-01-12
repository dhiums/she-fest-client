import Programs from "@/components/programs/Programs";
import { Category, GetAllCandidateProgrammesDocument, GetAllCandidatesDocument, GetAllCandidatesQuery, GetAllCandidatesQueryVariables, GetAllCategoriesDocument, GetAllCategoriesQuery, GetAllCategoriesQueryVariables, GetAllFinalProgrammesDocument, GetAllFinalProgrammesQuery, GetAllFinalProgrammesQueryVariables, GetAllTeamsDocument, GetAllTeamsQuery, GetAllTeamsQueryVariables, GetAllZonesDocument, GetAllZonesQuery, GetAllZonesQueryVariables, Programme, Zone } from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function Page() {
  const { client } = getUrqlClient();
  
  const programmes = await client.query<
    GetAllFinalProgrammesQuery,
    GetAllFinalProgrammesQueryVariables
  >(GetAllFinalProgrammesDocument, {
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

  const zones = await client.query<
    GetAllZonesQuery,
    GetAllZonesQueryVariables
  >(GetAllZonesDocument, {
  });

  const teams = await client.query<
    GetAllTeamsQuery,
    GetAllTeamsQueryVariables
  >(GetAllTeamsDocument, {
    api_key: API_KEY,
  });

  return (
    <div>
      <Programs pageProps={1} team={teams.data?.teams} candidates={candidates.data?.candidates} categories={categories.data?.categories as Category[]}  programmes={programmes.data?.finalprogrammes as Programme[] } zones={zones.data?.zones as Zone[]} />
    </div>
  );
}
