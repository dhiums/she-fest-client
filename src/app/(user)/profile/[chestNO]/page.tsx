import Profile from "@/components/profile/Profile";
import {
  Candidate,
  GetCandidateByChestNoDocument,
  GetCandidateByChestNoQuery,
  GetCandidateByChestNoQueryVariables,
  Types,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({
  params,
}: {
  params: { chestNO: string };
}) {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetCandidateByChestNoQuery,
    GetCandidateByChestNoQueryVariables
  >(GetCandidateByChestNoDocument, {
    api_key: API_KEY,
    chestNO: params.chestNO,
  });

  const error = result?.error?.message;
  const candidate: Candidate = result?.data?.candidateByChestNo as Candidate;

  // return <Profile error={error as string} candidate={candidate} />;
  return <>Updating soon...</>
}
