import Result from "@/components/result/Result";
import {
  CandidateWithPoint,
  GetAllZonesDocument,
  GetAllZonesQuery,
  GetAllZonesQueryVariables,
  GetPublishedProgrammesDocument,
  GetPublishedProgrammesQuery,
  GetPublishedProgrammesQueryVariables,
  Programme,
  TeamWithPoint,
  Zone,
} from "@/gql/graphql";
import { getUrqlClient } from "@/lib/urql";

export default async function page({ params, searchParams }: any) {
  const { client } = getUrqlClient();

  const zones = await client.query<GetAllZonesQuery, GetAllZonesQueryVariables>(
    GetAllZonesDocument,
    {}
  );

  const zone = searchParams.zone || 'A'

  const enteredProgrammes = await client.query<
    GetPublishedProgrammesQuery,
    GetPublishedProgrammesQueryVariables
  >(GetPublishedProgrammesDocument, {
    zone: zone,
  });

  return (
    <Result
      zones={zones.data?.zones as Zone[]}
      results={
        enteredProgrammes.data?.findResultPublishedProgrammesByZone?.programmes as Programme[]
      }
      zone={searchParams.zone}
      topCandidates={enteredProgrammes.data?.findResultPublishedProgrammesByZone?.topCandidates as CandidateWithPoint[]}
      topTeams={enteredProgrammes.data?.findResultPublishedProgrammesByZone?.topTeams as TeamWithPoint[]}
    />
    // <>
    // Updating soon...
    // </>
  );
}
