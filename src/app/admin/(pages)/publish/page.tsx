import Publish from "@/components/publish/Publish";
import {
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
  return (
    <>
      <Publish programs={programmes.data?.programmes as Programme[]} />
    </>
  );
}
