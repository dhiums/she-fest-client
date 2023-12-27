import Publish from "@/components/publish/Publish";
import {
  GetAllProgrammesDocument,
  GetAllProgrammesQuery,
  GetAllProgrammesQueryVariables,
  GetAllZonesDocument,
  GetAllZonesQuery,
  GetAllZonesQueryVariables,
  Programme,
  Zone,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({ params, searchParams }: any) {
  const { client } = getUrqlClient();
  const programmes = await client.query<
    GetAllProgrammesQuery,
    GetAllProgrammesQueryVariables
  >(GetAllProgrammesDocument, {
    api_key: API_KEY,
  });

  const zone = searchParams.zone || 'A'

  const zones = await client.query<GetAllZonesQuery, GetAllZonesQueryVariables>(
    GetAllZonesDocument,
    {}
  );
  return (
    <>
      <Publish programs={programmes.data?.programmes as Programme[]} zones={zones.data?.zones as Zone[]} zone={zone}/>
    </>
  );
}
