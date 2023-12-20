import Result from "@/components/result/Result";
import {
  GetAllProgrammesDocument,
  GetAllProgrammesQuery,
  GetAllProgrammesQueryVariables,
  GetAllZonesDocument,
  GetAllZonesQuery,
  GetAllZonesQueryVariables,
  FindResultEnteredProgrammesByZoneDocument,
  FindResultEnteredProgrammesByZoneQuery,
  FindResultEnteredProgrammesByZoneQueryVariables,
  Programme,
  Zone,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({ params, searchParams }: any) {
  const { client } = getUrqlClient();

  const zones = await client.query<GetAllZonesQuery, GetAllZonesQueryVariables>(
    GetAllZonesDocument,
    {}
  );

  const enteredProgrammes = await client.query<
    FindResultEnteredProgrammesByZoneQuery,
    FindResultEnteredProgrammesByZoneQueryVariables
  >(FindResultEnteredProgrammesByZoneDocument, {
    zone: searchParams.zone,
  });

  return (
    <Result
      zones={zones.data?.zones as Zone[]}
      enteredPrograms={
        enteredProgrammes.data?.findResultEnteredProgrammesByZone as Programme[]
      }
      zone={searchParams.zone}
    />
  );
}
